/*
  Intro
  - Deploy docker containers to EC2 and ECS is a pain
    # manage software update 
    # manage error logs
    # monitoring
    # security configs
    # app down -> manually restart
    ...
  - Kuber: for containerized apps
    # auto deployment
    # scaling
    # managing 
  - Not a software -> collection of tools


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  More Problems with Manual Deployment
  - manually deploy -> container might crash or go down -> we want to replace it with a new container -> start app again
  - heavy traffics -> come to only 1 container -> stuck -> can't handle next task
    -> drive the traffic to other containers
    -> distribute traffic evenly
  - less traffics -> remove containers

  🎈 docker -> we can run many containers using the same image


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Why Kubernetes
  - ECS supports: 
    # Health Check
    # Auto Scaling -> might need more container instances upon traffic spikes
    # Load Balancer -> split traffic evenly
    -> we can take advantage of it

  🎈 the downside of these providers is:
    #  whatever providers we use, we are locked to that provider -> which means that we cannot use those config in other providers (Azure, Google Cloud)
    => when we switch to another provider, we have to learn how to setup again

  ❎ Kubernetes can help us solve these problems


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  What Is Kubernetes Exactly
  - is like "docker-compose" for multiple machines


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 

  Kubernetes Architecture & Core Concepts
  - Cluster
    -> <Master-Node>: contains <control_plane> to control worker nodes 
        - Worker Node
          Worker Node
          Worker Node
            # Pod (container)
            # Proxy/Config

  - <pod>: smallest unit in Kubernetes world
    -> hold container
  - pod runs inside a <Worker-Node> 
    -> think it as a VM
    -> a remote machine is a "worker node"
    -> can run more than one pod
  - proxy: control network traffic between pods on work node


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Kubernetes will NOT manage your Infrastructure!
  - Devs need to setup these resources
    # setup cluster
    # setup Master Node + Worker
    # install all Kuber tools on these nodes 
    # config everything depends on the Cloud Provider -> Load Balancer, File Systems
  - Kuber takes advantage of these res -> create the object (pods) & manage them


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Worker Nodes
  - host 1 or more containers & their volumes using Pod 
  - can have Docker install in the Worker Node as well
  - need to have <kubelet> -> communicate between Master & Worker Nodes
  - <kube-proxy> -> handling incoming & outgoing traffic -> manage networking communication


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Master Node
  - talk directly to the Cloud Provider API 
  - container API Server -> to communicate with Worker Nodes through the <kubelet>
  - <scheduler> -> watching for new pods -> select the right worker node to run 
  - <kube-controller-manager> -> watch & control worker nodes -> correct # of pods & more
  - <cloud-controller-manager> -> doing the same thing as <kube-controller-manager> -> but to the cloud provider -> know how to interact with the Cloud Provider resources


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Terms
  - Cluster: a set of Node (machines) which are running Containerized Apps (Worker Nodes) or control other Nodes (Master Node)
  - Nodes: Physical or VM with certain hardware -> host one or more containers and communicate with Clusters
    # Master Node: Control Plane -> manage the Pods across the Worker Nodes 
    # Worker Node: Host Pods -> run containers
  - Pods: hold actual containers + resources -> volumes, etc.
  - Containers: docker containers
  - Services: sets of pods with independent ip address -> help to reaching our pods & containers 


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  🎈 To practice Kube, use 
    # minikube
    # https://labs.play-with-k8s.com/


*/
