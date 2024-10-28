/*
  Sharing Images
  - slide
  - push image to docker hub
  - or share the code + Dockerfile


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Pushing Images to DockerHub
  - sign up on DockerHub
  - docker login
  - docker build -t <hostname>/<name>:<tag> .
  - docker push <hostname>/<name>:<tag>
  - docker pull <hostname>/<name>:<tag>
  - docker logout

  - docker run -p 3000:3000 <hostname>/<name>:<tag>








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
