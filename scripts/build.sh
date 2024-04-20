#! /bin/bash
# This script should only be executed by Cloud Build

REPOSITORY="gcr.io/althaea/$SERVICE"

TAGGED_IMAGE="$REPOSITORY:$SHORT_SHA"
LATEST_IMAGE="$REPOSITORY:latest"

echo "Pulling $LATEST_IMAGE from cache..."
docker pull $LATEST_IMAGE

echo "Building $SERVICE..."
docker build ./services/$SERVICE -t $TAGGED_IMAGE -t $LATEST_IMAGE --cache-from $LATEST_IMAGE

echo "Pushing $SERVICE to $TAGGED_IMAGE..."
docker push $REPOSITORY
