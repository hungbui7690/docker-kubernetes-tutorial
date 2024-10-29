/*
  A First Volume The emptyDir Type
  - https://kubernetes.io/docs/tasks/configure-pod-container/configure-volume-storage/
  - <spec.containers.volumeMounts>
  - kube supports multi types of volumes:
    # aws: awsElasticBlockStore (EBS)
    # azure: azureDisk 
    ...
  - we will use "emptyDir", "hostPath", "csi"...

  

----------------------------

  emptyDir
  - https://kubernetes.io/docs/concepts/storage/volumes/#emptydir
  - simplest volume type
  - initially empty -> {}
  - all containers in the Pod can read and write the same files in the emptyDir volume, though that volume can be mounted at the same or different paths in each container. 
  - when a <Pod> is <removed> from a node for any reason, the data in the emptyDir is deleted permanently.


----------------------------

  - before add volume 
    -> <test.http> -> add story -> go to /error -> go to /story -> everything is deleted
  - after add emptyDir volume -> do the same test -> data is persist


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Downside
  - if we have 2 replicas -> 2 pods 
    # /story -> get data
    # /error 
    # /story -> NO DATA








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
