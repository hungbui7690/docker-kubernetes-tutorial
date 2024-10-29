/*
  Infrastructure
  - Kubermatic: help create resources for Kuber -> create remote machines, instances, etc.
    -> https://www.kubermatic.com/
  - EKS: Amazon Elastic Kubernetes Service -> do the same things as Kubermatic -> but for AWS


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Kubernetes Required Setup & Installation Steps
  - Cluster
  - Master Node or Control Plane
  - Worker Node
  => all of the above must have all software installed

  - other than that, in our Local Machine -> we need to install <kubectl> 
    -> to send instructions to <Cluster> (e.g. create a new deployment / delete a deployment etc.) -> Cluster is the one who execute these instructions

  - to install Cluster 
    -> in the real world -> we need to config and install Cluster by ourself
    -> since we are learning right now -> use <minikube>
      # minikube quickly sets up a local Kubernetes cluster on macOS, Linux, and Windows.
      # minikube is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.


----------------------

  Install Chocolatey
  - windows package manager
  - cmd -> <systeminfo> -> A hypervisor has been detected...
    -> https://chocolatey.org/install
    -> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))


----------------------

  Install Kubectl
  - choco install kubernetes-cli


----------------------

  Setup Kubectl
  - verify: 
    -> kubectl version --client
  - terminal: 
    # cd %USERPROFILE%
    # mkdir .kube
    # cd .kube
    # New-Item config -type file
      -> create config file


----------------------

  Install Virtual Box (or not)
  - if we have Docker setup -> dont need 


----------------------
  
  Install Minikube
  - <minikube> -> choco install minikube


----------------------

  Start Minikube
  - https://minikube.sigs.k8s.io/docs/handbook/controls/

  - minikube <start> --driver=docker
    -> start our local cluster
    -> can start minikube with driver (Docker, VirtualBox...) -> https://minikube.sigs.k8s.io/docs/drivers/
    ❎ Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
  - minikube <config> set driver docker
    -> make docker default driver
  - minikube <status>
    # minikube
      type: Control Plane
      host: Running
      kubelet: Running
      apiserver: Running
      kubeconfig: Configured
    -> Cluster and MasterNode (with Control Plane) are setup and running
  - minikube <dashboard>
    => open dashboard -> used to manage pods, jobs, etc.
  - minikube <stop>
  - minikube <delete>


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Kubernetes Objects (Resources)
  - pods 
    # hold 1 or more containers
    # has a cluster-internal IP by default
    # containers inside a pod can communicate with each other via "localhost"
  - deployments
    # controls pods -> define which pods and containers to run and # of instances
    # deployments can be paused, deleted, and rolled back
    # can be scaled easily -> can change # of pods at any time
  ...


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  First Deployment
  - https://minikube.sigs.k8s.io/docs/handbook/deploying/
  - https://kubernetes.io/docs/tutorials/hello-minikube/

  - start docker desktop
  - docker build -t <kube-first-app> .


----------------------

  - minikube delete
  - minikube <start> --driver=docker
    🧨 create Master Node with control plane
  - minikube <status>
    # type: Control Plane
      host: Running
      kubelet: Running
      apiserver: Running
      kubeconfig: Configured
    ❎ minikube is up and runner -> cluster is set


----------------------

  - kubectl: send instructions to cluster
  - kubectl help
  - kubectl create -> get help with create command
  - kubectl <create> <deployment> <first-app> --image=kube-first-app
    -> when we run this command -> deployment + pod will be created
  - kubectl <get> <deployments>
    -> READY=0/1 -> FAILED
  - kubectl <get> <pods>
    -> READY=0/1
    -> STATUS=<ErrImagePull>
  ❌ the command will be sent to cluster -> cluster will execute it 
    # in this case, the image exists in our local machine, but not in the cluster -> --image=kube-first-app NOT WORK

  - kubectl <delete> <deployment> <first-app>
  - kubectl get pods
    -> no pods anymore

----------------------

  - create repo 
  - add tag
    ❎ docker <tag> kube-first-app hungbui7690/kube-first-app
  - push image
    -> docker <push> hungbui7690/kube-first-app
  - create deployment
    -> kubectl create deployment first-app --image=hungbui7690/kube-first-app
  - kubectl get deployments -> READY=1/1
  - kubectl get pods -> READY=1/1 + STATUS=Running

  - minikube <dashboard>
    -> view info about our deployments + pods
    -> click on Pods menu -> IP -> Internal IP inside this cluster -> not work if we try to access from outside the cluster


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  kubectl Behind The Scenes
  - kubectl send the instructions to create a deployment to cluster
  - cluster directly sends that to MasterNode
  - MasterNode 
    -> will create the pod 
    -> has <Scheduler> which analyzes the the currently running pods and finds the best Worker Node to run the pod 
  - WorkerNode
    -> has <kubelet> which manage the pod and containers -> create the pod and containers based on the image we passed in


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Kubernetes Objects -> Services
  - to reach the pod and containers -> we need services
  - responsible for exposing ports to the outside world or to other pods
  - the pods have the internal IP -> which <changes> overtime -> not good 
  - service group Pods together and give them a shared IP which NOT CHANGE OVER TIME


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Exposing a Pod as a Kube Service
  - kubectl create service -> we don't use this command
  - kubectl <expose> <deployment> first-app --port=8080 --type=LoadBalancer
    -> create Kube Service with type LoadBalancer
    -> expose a pod created by a deployment
      # --type=ClusterIP -> access from inside the cluster
      # --type=NodePort -> access from the outside 
      # --type=LoadBalancer -> load balancer generates a unique address for this service (we need to create Load Balancer from providers, and providers must support Load Balancer as well) -> will work when we have multiple pods
  - kubectl <get> <services>
  - kubectl <get> <svc>
    ⛳ when we deploy the app -> EXTERNAL-IP will show the IP -> but since we run locally -> alway PENDING

  - since we don't deploy the app right now -> we need to use minikube service
    -> minikube <service> <first-app>
    -> will connect to the pod created by the deployment


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Auto Restarting Containers
  - app.get('/error', (req, res) => {
      process.exit(1)
    })
    -> this will crash the app
    -> but then the pod will be recreated and start again

  1. go to /error
  2. go to / -> still can access
  3. kubectl get pods
    -> RESTARTS=1
    ❎ we can see it in the dashboard as well


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Scaling in Action
  - kubectl <scale> <deployment> <first-app> --replicas=3 
    or 
    kubectl <scale> <deployment/first-app> --replicas=3
    # replica -> instance of a pod
  - kubectl get pods 
    # we will see 3 pods
  => now, if we go to /error 2 times -> we will see the pods will be restarted



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
