/*
  Bind Mounts In Production
  - dev mode: we need to bind the source code
    -> allow instant update without restarting the container
  - prod: we don't use bind mounts 
    -> use COPY (dockerfile)


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Connecting to an EC2 Instance
  - pic
  - Launch a new instance
    # Choose AMI = Amazon Linux 2 or Ubuntu -> in this case Amazon Linux 2
    # Instance Type = t2.micro
    # Network = VPC xxxxx
    # Click Launch -> Key Pair -> Create Key Pair -> Download Key Pair -> 🎈 Just can download once
    # Done 
    🎈 remember the ip of the server -> <18.218.126.91>
  - connect using SSH or Putty
    # Instance up and running -> Click on Connect -> Steps to connect -> SSH -> Done


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Installing Docker on a Virtual Machine
  - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-docker.html
  - yum: package manager for linux 
  - apt: package manager for debian
  - 'sudo yum update' -y or 'sudo apt-get update' or 'sudo apt update'.

  - install docker
    -> 'sudo amazon-linux-extras install docker' or 'sudo yum install -y docker'
  - start docker
    -> sudo service docker start


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Pushing our local Image to the Cloud
  - 2 options:
    # Option 1: push code to EC2 -> docker build -> docker run
      -> unnecessary complexity
    # Option 2: build image -> push image to EC2 -> docker run 
      -> avoid unnecessary remote server work 
    => we will choose option 2

  1. DockerHub -> Create Repository 
  2. docker build -t username/repo:tag
    -> without tag -> tag === latest
  3. docker login
  4. docker push username/repo:tag


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Running & Publishing the App (on EC2)
  - EC2:
    -> sudo docker run -d --rm -p 80:80 username/repo -> no need to login, since this is public repo
  - Go to <18.218.126.91> -> not work -> since we did not open the port 80
  - setup security group -> pic
    -> inbound -> from somewhere else to our instance -> add new rule -> port 80


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Managing & Updating the Container Image
  1. update our code in local machine -> we want to push that code to server
  2. docker build -t username/repo:tag
    -> without tag -> tag === latest
  3. docker login
  4. docker push username/repo:tag

  EC2: 
  1. stop current container 
  2. sudo docker <pull> -> update the latest from DockerHub to EC2
  3. sudo docker run -d --rm -p 80:80 username/repo


  ❎❎ After done with the EC2 instance -> remember to terminate 
    # select the instance 
    # actions -> Terminate

  
\\\\\\\\\\\\\\\\\\\\\\\\\\

  Disadvantage of this Setup
  - Easy to setup but:
    # we need to setup docker manually 
    # config everything manually 
    # need to keeps essential softwares updated
    # need to manage network and security group + firewall -> security
    => not ideal for multi containers app 

  ❎ Great if we know what we are doing -> we need to have experience -> admin / cloud expert



*/

const path = require('path')

const express = require('express')

const app = express()

app.use(express.static('public'))

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'welcome.html')
  res.sendFile(filePath)
})

app.listen(80)
