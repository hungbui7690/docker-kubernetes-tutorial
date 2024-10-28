/*
  Infrastructure
  - Kubermatic: help create resources for Kuber -> create remote machines, instances, etc.
    -> https://www.kubermatic.com/
  - EKS: Amazon Elastic Kubernetes Service -> do the same things as Kubermatic -> but for AWS


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Kubernetes Required Setup & Installation Steps
  - Cluster
  - Master Node
  - Worker Node
  => all of the above must have all software installed

  - other than that, in our Local Machine -> we need to install <kubectl> 
    -> to send instructions to <Cluster> (e.g. create a new deployment / delete a deployment etc.) -> Cluster is the one who execute these instructions

  - to install Cluster -> use <minikube>
    -> https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download
    -> minikube is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.


*********************************

  - cmd -> <systeminfo> -> A hypervisor has been detected...
  - Chocolatey -> windows package manager
    -> https://chocolatey.org/install
    -> Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))


*********************************

  - <kubectl> 
    -> choco install kubernetes-cli
  - verify: 
    -> kubectl version --client
  - terminal: 
    # cd %USERPROFILE%
    # mkdir .kube
    # cd .kube
    # New-Item config -type file
      -> create config file


*********************************

  Install Virtual Box (or not)
  - if we have Docker setup -> dont need 


*********************************
  

  - <minikube> -> choco install minikube
  - minikube start --driver=docker
    -> can start minikube with driver (Docker, VirtualBox...) -> https://minikube.sigs.k8s.io/docs/drivers/
    ❎ Done! kubectl is now configured to use "minikube" cluster and "default" namespace by default
  - minikube config set driver docker
    -> make docker default driver
  - minikube status
    # minikube
      type: Control Plane
      host: Running
      kubelet: Running
      apiserver: Running
      kubeconfig: Configured
  - minikube dashboard
    => open dashboard -> used to manage pods, jobs, etc.


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Understanding Kubernetes Objects (Resources)








*/
