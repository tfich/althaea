#! /bin/bash

ENVIRONMENTS=("production" "staging")

gen_env() {
  command_args=""
  for pair in $(grep -v "^#\|^$" ./environments/.env.$1 | xargs -0); do
    command_args+="--from-literal=${pair//\"/} "
  done

  {
    echo [$1] Attempting to delete secret env:$1 if it exists...
    kubectl delete secret env --namespace=$1
  } || true

  kubectl create secret generic env $command_args --namespace=$1
  echo [$1] Environment variables applied to secret env:$1
}

restart_deployments() {
  deployments=$(kubectl get deployments --namespace=$1 | tail -n +2 | cut -d " " -f 1)
  for deployment in $deployments; do
    echo [$1] Restarting deployments/$deployment...
    kubectl rollout restart deployments/$deployment --namespace=$1
  done
}

for environment in ${ENVIRONMENTS[@]}; do
  gen_env $environment
  echo
  if [ "$1" = "--restart" ]; then
    restart_deployments $environment
  fi
done
