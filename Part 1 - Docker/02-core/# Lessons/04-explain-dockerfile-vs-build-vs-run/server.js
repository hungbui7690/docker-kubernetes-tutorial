/*
  Run a Docker container
  - docker run node
    -> download latest node image and run it as a container
    -> then exit
  - docker ps -a
  - docker run -it node
    -> interactive mode
      # node -v


\\\\\\\\\\\\\\\\\\\\\\\\\

  Image
  - existing -> via DockerHub
  - custom -> write your own Dockerfile based on another image


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  1. create Dockerfile


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Build Image from Dockerfile
  1. docker build .
    -> return id of the image
  2. docker run <image_id>
  - localhost -> not see the website
    -> not setup port mapping

  - docker ps 
  3. docker stop <image_id>
  - docker ps -a 
  4. docker run -p 3000:80 <image_id>
    -> -p: publish
  
  - localhost:3000

  🌲 If we change the code below -> image is not reflected
    -> we need to re-build the image


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - layer based structure
  - layers are cached


\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Avoid running "npm install" many times
  - From: 
      COPY . .
      RUN npm install

  - To: 
      COPY package.json .
      RUN npm install
      COPY . .

  - docker stop <image_id>
  - docker build .
    -> very fast




*/

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

let userGoal = 'Learn Docker!'

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
      </head>
      <body>
        <section>
          <h2>My Course Goal</h2>
          <h3>${userGoal}</h3>
        </section>
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Course Goal</label>
            <input type="text" name="goal">
          </div>
          <button>Set Course Goal</button>
        </form>
      </body>
    </html>
  `)
})

app.post('/store-goal', (req, res) => {
  const enteredGoal = req.body.goal
  console.log(enteredGoal)
  userGoal = enteredGoal
  res.redirect('/')
})

app.listen(80)
