/*
  Bind 
  - manage by us
  - docker run -d -p --rm 3000:80 --name feedback-container -v "playground:/app/feedback" feedback:volumes
    -> we mount /playground from local machine to /app/feedback in container


\\\\\\\\\\\\\\\\\\\\\\\\\\\\  

  - Docker Desktop -> Settings -> Resources -> File Sharing
    -> list of shared folders


\\\\\\\\\\\\\\\\\\\\\\\\\\\\  

  - docker logs feedback-container
    -> see the error/logs inside container


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Combining & Merging Different Volumes
  - we can have multiple volumes
  - Volume: /some-path
    # app data will store here
  - Bind Mount: /some-other-path
    # can store code 

  - docker run -d -p --rm 3000:80 --name feedback-container -v "playground:/app/feedback" -v "node_modules:/app/node_modules" feedback:volumes
    # Volume 1 -> -v /app/node_modules
      -> similar to VOLUME [ "/app/node_modules" ]
    # Volume 2 -> -v "playground:/app/feedback"


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Summary
  - Anonymous Volumes
    # docker run -v /app/data
    # cannot be shared between containers
    # specific to a container
  - Named Volumes
    # docker run -v data:/app/data
    # can be shared
    # not tied to any container
  - Bind Mount
    # docker run -v path/code:/app/code


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Read Only Volumes
  - docker run -v path/code:/app:ro


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Manage Docker Volumes
  - docker volume --help
  - docker volume ls
  - docker volume create --help
  - docker volume create <volume-name>
  - docker volume prune 
  - docker volume rm <volume-name>
  - docker volume inspect <volume-name>
    -> MountPoint

  - docker stop feedback-container
    -> volume still there


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  .dockerignore
  - node_modules

    # don't copy node_modules


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Env Variables
  - args -> set at docker build
  - env -> set at docker run
    # if we use process.env.PORT -> we can set in Dockerfile or docker run
    # Dockerfile 
        ENV PORT 80
        EXPOSE $PORT
    # docker run
        --env PORT=80
        -e PORT=80
        --env-file ./.env


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Arguments 
  - docker built --build-arg DEFAULT_PORT=80 .


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
