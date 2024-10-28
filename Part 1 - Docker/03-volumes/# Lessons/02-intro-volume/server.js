/*
  Intro Volumes
  - folders on host machine hard drive which are mounted (mapped) to container 
    -> /some-path -> app/user-data
  - persist if a container shuts down 
  - container can write / read data in a volume
  - manage by dockers


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Analyze Our App
  - save data to /feedback


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Anonymous Volumes
  - Dockerfile 
    -> VOLUME [ "/app/feedback" ]
    -> add anonymous volume
    -> great for data which should be persistent but which we don't need to edit directly
  - docker build -t feedback:volumes .
  - docker run -d -p --rm 3000:80 --name feedback-container feedback:volumes
  - NOT WORK
    -> await fs.rename(tempFilePath, finalFilePath)
    -> this line cause err
  - CHANGE TO
    -> await fs.copyFile(tempFilePath, finalFilePath)
    -> await fs.unlink(tempFilePath)
  - docker rmi feedback:volumes
  - stop container
  - then run again -> data disappears


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Docker Volumes Commands
  - docker volume ls
  - remove: VOLUME [ "/app/feedback" ] from Dockerfile

  1. docker run -d -p --rm 3000:80 --name feedback-container -v <feedback:/app/feedback> feedback:volumes
    -> add volume -> -v feedback:/app/feedback
  2. stop container
  - then run again -> data is there



*/

const fs = require('fs').promises
const exists = require('fs').exists
const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static('public'))
app.use('/feedback', express.static('feedback'))

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html')
  res.sendFile(filePath)
})

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html')
  res.sendFile(filePath)
})

app.post('/create', async (req, res) => {
  const title = req.body.title
  const content = req.body.text

  const adjTitle = title.toLowerCase()

  const tempFilePath = path.join(__dirname, 'temp', adjTitle + '.txt')
  const finalFilePath = path.join(__dirname, 'feedback', adjTitle + '.txt')

  await fs.writeFile(tempFilePath, content)
  exists(finalFilePath, async (exists) => {
    if (exists) {
      res.redirect('/exists')
    } else {
      // await fs.rename(tempFilePath, finalFilePath)

      // change to this
      await fs.copyFile(tempFilePath, finalFilePath)
      await fs.unlink(tempFilePath)
      res.redirect('/')
    }
  })
})

app.listen(80)
