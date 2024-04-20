import { AppsV1Api, KubeConfig } from '@kubernetes/client-node'
import { v4 as uuidv4 } from 'uuid'
import { NumCustomInstancesDocument, Query } from './graphql'
import apolloClient from './utils/apolloClient'
import env from './utils/env'

const STATEFUL_SET_NAME = 'bot'
const NAMESPACE = env.NODE_ENV

const main = async () => {
  const { data } = await apolloClient.query<Query>({ query: NumCustomInstancesDocument })
  if (!data) {
    throw Error('Could not query num instances!')
  }

  const totalInstances = data.numCustomInstances + 1 // + 1 for main bot instance

  const kubeConfig = new KubeConfig()

  if (env.isDev) {
    kubeConfig.loadFromDefault()
  } else {
    kubeConfig.loadFromCluster()
  }

  const k8sApi = kubeConfig.makeApiClient(AppsV1Api)

  const { body: statefulSets } = await k8sApi.listNamespacedStatefulSet(NAMESPACE)

  const botStatefulSet = statefulSets.items.find(({ metadata }) => metadata?.name === STATEFUL_SET_NAME)

  if (!botStatefulSet) {
    throw Error(`Could not find StatefulSet with name ${STATEFUL_SET_NAME}!`)
  }

  if (totalInstances === botStatefulSet.spec?.replicas) {
    console.log(`Number of instances matches StatefulSet replicas (${totalInstances}), no scaling occured!`)
    return null
  }

  const newContainer = botStatefulSet.spec!.template.spec!.containers[0]

  // change deploy id, causing all pods to restart
  newContainer!.env!.push({ name: 'DEPLOY_ID', value: uuidv4() })

  await k8sApi.patchNamespacedStatefulSet(
    STATEFUL_SET_NAME,
    NAMESPACE,
    {
      spec: {
        replicas: totalInstances,
        template: {
          spec: {
            containers: [newContainer]
          }
        }
      }
    },
    undefined,
    undefined,
    undefined,
    undefined,
    {
      headers: {
        'Content-Type': 'application/merge-patch+json'
      }
    }
  )
  console.log(`StatefulSet ${STATEFUL_SET_NAME} scaled to ${totalInstances} replicas!`)
}

main()
