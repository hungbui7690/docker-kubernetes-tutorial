/*
  From Development To Production
  - Blind Mounts shouldn't be used in production
  - App like React need additional build steps to be run -> optimize code
  - multiple container projects might need to be split across multiple hosts/remote machines 


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Deployment Process & Providers
  - gg: docker hosting providers 
    # AWS -> we will use this
    # Google Cloud
    # Microsoft Azure
  - basic example -> just nodejs -> no db 
  - install docker on remote host (AWS EC2) via SSH
  - push and pull image 
  - run container on remote host 


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Getting Started With An Example
  - create and launch EC2 instance, VPC and security group
  - config security group to expose all required ports to WWW
  - connect to instance (ssh) -> install docker -> launch container

    1. docker build -t myapp .
    2. docker run -d --rm --name myapp -p 80:80 myapp


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
