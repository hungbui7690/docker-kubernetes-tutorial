/*
  Project Intro
  - Extension: Rest Client
  - /store 
    -> read and write to /story/text.txt
  - docker-compose.yaml
    -> volumes:
        - stories:/app/story

  - docker-compose up
  - docker-compose down -v
  - <test.http>


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Kubernetes & Volumes - More Than Docker Volumes
  - <state>: data which is created and used by our app which must not be lost
    # user generated data, user accounts... 
      -> database
      -> file
    # intermediate results derived by the app
      -> memory
      -> tempt database tables or files
    => volumes

  - kube runs our containers -> not docker / docker-compose
    ❌ we can't add -v flag like when we run "docker run"  
    ❎ we need to config Kube to add volumes to our containers


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Kubernetes Volumes Theory & Docker Comparison
  - volume types: 
    # local volumes
    # cloud provider volumes 
  - also there is a type of volumes which lifetime depends on the pod lifetime (default) -> since volumes are part of the pods
    # volumes survive when the containers restart 
    # volumes are removed when pods are destroyed

  
--------------------------

  Docker Volume: 
  - no driver/type support
  - volumes persist until manually deleted
  - volumes survive when containers restart and remove

  Kube Volume:
  - supports many diff drivers/types
  - volumes are not necessary persistent -> survive when containers restart, but not pods restart (default)
  - volumes survive when containers restart and remove


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Creating a New Deployment & Service
  - create <deployment.yaml> & <service.yaml>

  - create hub repo 
  - docker build -t hungbui7690/kube-data-demo .
  - docker push hungbui7690/kube-data-demo
  - kubectl apply -f service.yaml -f deployment.yaml


*/

const path = require('path')
const fs = require('fs')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const filePath = path.join(__dirname, 'story', 'text.txt')

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

// READ FILE
app.get('/story', (req, res) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to open file.' })
    }
    res.status(200).json({ story: data.toString() })
  })
})

// WRITE FILE
app.post('/story', (req, res) => {
  const newText = req.body.text
  if (newText.trim().length === 0) {
    return res.status(422).json({ message: 'Text must not be empty!' })
  }
  fs.appendFile(filePath, newText + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Storing the text failed.' })
    }
    res.status(201).json({ message: 'Text was stored!' })
  })
})

app.get('/error', () => {
  process.exit(1)
})

app.listen(3000)
