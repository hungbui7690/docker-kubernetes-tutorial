/*
  From Manual Deployment to Managed Services
  - Automated Approach -> instead of <EC2>, we use <ECS> (Elastic Container Service)
  - For Azure -> Containers services/products are similar 
  - Benefits: 
    # create, manage, update is handled automatically
    # monitoring and scaling is simplified


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  AWS ECS - A Managed Docker Container Service
  - pic


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ 

  Updating Managed Containers
  - code update -> push to docker hub 
  - ECS -> Task Definitions -> Choose the Task -> Create new Revision -> Create ... -> pic
  
  🎋 we can also Create Task in ECS using AWS-CLI: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_AWSCLI_Fargate.html


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
