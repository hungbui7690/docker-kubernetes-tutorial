/*
  The Imperative vs The Declarative Approach
  - <imperative> approach:
    # similar to docker build, docker run
    # kubectl create deployment ...
  - <declarative> approach:
    # similar to docker-compose
    # kubectl apply -f config.yaml ...


--------------

  @ Imperative
  - use Resource Definition File -> similar to docker-compose.yaml


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Creating a Deployment Configuration File (Declarative Approach)
  - https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#deployment-v1-apps
  - API: https://kubernetes.io/docs/concepts/<workloads>/controllers/<deployment>/
  - create deployment.yaml
    -> define the deployment

      <apiVersion>: apps/v1
      <kind>: Deployment
      <metadata>:
        name: first-app-deployment


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Adding Pod and Container Specs
  - API: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#deploymentspec-v1-apps
  - spec -> specification 
    -> define the pods
  - spec.template.spec.container -> define the container in the pod 
    

---------------------

      spec:
        <replicas>: 1
        <template>:
          metadata:
            labels:
              app: first-app 
              tier: backend
          spec:
            containers:
              - name: first-node 
                image: hungbui7690/kube-first-app:1

  - Labels within Kubernetes are the core means of identifying objects. A controller controls pods based on their label instead of their name. In this particular case they are meant to identify the pods belonging to the deployment’s replica set.


---------------------

  - kubectl <apply> -f deployment.yaml
    -> error -> missing "selector"


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Working with Labels & Selectors
  - API: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#labelselector-v1-meta
  - we want to tell the deployment to control pods with the labels definition in the <spec.template.metadata.labels> through <spec.selector>
  - other pods that does not match the labels definition are not managed by the deployment.

    spec:
      replicas:
      template:
      <selector>:
        matchLabels:
          app: first-app 
          tier: backend
        # matchExpressions:

  - kubectl <apply> -f deployment.yaml
  - kubectl get deployments
  - kubectl get pods


---------------------

  - <spec.selector> field is used by Deployment/ReplicaSet controllers. It must be a subset of the labels specified in the podTemplate. That is why you may have additional labels in your pods. But they will still be managed by the deployment.
  - <spec.selector> is also used to check is any existing ReplicaSet already matched these conditions. If the Deployment controller found an orphan ReplicaSet, it will be used by the deployment instead of creating a new one.

  - <spec.template>: is created by the deployment -> has <template.meta.labels>
    -> pod will be created after the deployment is applied 
    -> deployment is dynamic in Kube -> it means that if we scale the app -> then the new pods that are created from scaling still be managed by the existing deployment 
    -> deployment watches for the pods and sees which pods it should control 
    -> and it selects the controlled pods through the <spec.selector>


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Creating a Service Declaratively
  - https://kubernetes.io/docs/concepts/services-networking/service/
  - API: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#-strong-service-apis-strong-
  - create service.yaml
    -> define the service for our deployment

    apiVersion: <v1>
    kind: <Service>
    metadata:
      name: backend
    spec:
      <selector>:
        app: first-app
      <ports>:
        - protocol: 'TCP'
          port: 80
          targetPort: 8080
        # - protocol: 'TCP'
        #   port: 443
        #   targetPort: 443
      <type>: LoadBalancer

  - kubectl <apply> -f service.yaml
  - minikube <service> backend


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Updating & Deleting Resources
  - just make some changes in the deployment.yaml 
    -> replicas: 2
  - then run: 
    -> kubectl <apply> -f deployment.yaml


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Merge Config Files
  - create master-deployment.yaml
    -> copy both deployment.yaml & service.yaml to this file


---------------------

  - delete deployment
    -> kubectl <delete> deployment/first-app
    -> kubectl <delete> service/backend
  - or 
    - kubectl <delete> -f deployment.yaml -f service.yaml

  - kubectl <apply> -f master-deployment.yaml
  - minikube <service> backend


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  More on Labels & Selectors
  - <spec.selector>
  - https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#labelselectorrequirement-v1-meta

    selector:
      matchLabels: 
        app: first-app
        tier: backend
      <matchExpressions>:
        - {key: app, operator: NotIn, values: [second-app, first-app]}

  - we can delete by labels -> -l
    -> kubectl <delete> <pods> -l app=first-app
    -> kubectl <delete> <deployments> -l app=first-app


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Liveness Probes
  - <spec.template.spec.containers.livenessProbe>
  - is a diagnostic tool used to inspect the health of a running container within a pod. The primary purpose of a liveness probe is to inform the kubelet about the status of the application. If the application is not running as expected, the kubelet will restart the container, ensuring the application remains available.
  - API: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.26/#container-v1-core

    spec:
      containers:
        - name: second-node
          image: hungbui7690/kube-first-app:1
          <livenessProbe>: #
            httpGet:
              path: /
              port: 8080
            periodSeconds: 10
            initialDelaySeconds: 5


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  A Closer Look at the Configuration Options
  - image: hungbui7690/kube-first-app:latest
    -> should provide the latest tag
  - imagePullPolicy: Always 
    -> force pull the latest image










*/

const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello from this NodeJS app!</h1>
    <p>Try sending a request to /error and see what happens</p>
  `)
})

app.get('/error', (req, res) => {
  process.exit(1)
})

app.listen(8080)
