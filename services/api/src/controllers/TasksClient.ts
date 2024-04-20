import { CloudTasksClient } from '@google-cloud/tasks'
import env from '../env'
import { Task } from '../types/Tasks'
import googleAuth from '../utils/googleAuth'

const client = new CloudTasksClient({ auth: googleAuth as any })
const parent = client.queuePath(env.GCP_PROJECT_ID, env.GCP_REGION, env.CLOUD_TASKS_QUEUE)

export class TasksClient {
  public static async create(taskBody: Task, date: Date) {
    const [task] = await client.createTask({
      parent: parent,
      task: {
        httpRequest: {
          httpMethod: 'POST',
          url: `${env.API_BASE_URL}/tasks/handler`,
          headers: {
            'Content-Type': 'application/json'
          },
          body: Buffer.from(JSON.stringify(taskBody)).toString('base64')
        },
        scheduleTime: { seconds: date.getTime() / 1000 }
      }
    })

    return task
  }
}
