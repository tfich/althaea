#! /bin/bash
# This script should only be executed by Cloud Build

gke-deploy run -f=kubernetes/services/api.yaml -i=gcr.io/althaea/api:$SHORT_SHA -c=althaea -n=$_ENV -l=us-central1-c -o=output/api
