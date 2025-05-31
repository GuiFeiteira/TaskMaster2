#!/bin/bash

# Build the Docker image
docker build -t web-ui:latest .

# Apply the Kubernetes deployment
kubectl apply -f ../k8s/web-ui-deployment.yaml

# Update the ingress
kubectl apply -f ../k8s/ingress.yaml

echo "Web UI deployment completed!" 