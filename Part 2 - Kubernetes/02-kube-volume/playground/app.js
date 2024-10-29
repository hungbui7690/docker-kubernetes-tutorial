/*
  Understanding the CSI Volume Type
  - https://kubernetes.io/docs/concepts/storage/volumes/#csi
  - csi = Container Storage Interface

  - suppose we want to use Amazon Elastic File System (EFS) service
    -> there's no EFS built in type in Kube Volume 
    -> the EFS team will setup the CSI driver for Kube
    
  - CSI allows us to use any storage service 


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  From Volumes to Persistent Volumes
  - those volume types that we've learned so far will be deleted when the Pod is removed 
  - the hostPath just works when we have 1 Node environment (like minikube)
  
  - so, we need persistent volumes
    -> Pod & Node independent
    -> AWS EFS, Azure, GCP, etc. will have the same type of volume -> they store volume in a specific place

  - Cluster 
    -> Node
      # Pod 
      # Pod
      # PV Claim
    -> Node
    ....
    -> Persistent Volume (PV)
    -> Persistent Volume (PV)


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

















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
