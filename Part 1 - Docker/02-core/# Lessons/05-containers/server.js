/*
  Manage Images & Containers
  - slides
  - images
    # tags -> -t
    # list
    # analyzed -> image inspect
    # removed -> rmi, prune
    ...
  - containers 
    # named -> --name
    # list -> ps
    # removed -> rm
    # --help


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Stopping & Restarting Containers
  - docker ps --help
  - docker ps -a
  - docker start <id>
    -> start a stopped container
  - docker ps


\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Understanding Attached & Detached Containers
  - docker run node
    -> attached mode
  - docker run -d node
    -> detached mode
    -> not block the terminal
  - docker --help
    -> attach command
    -> log
    -> follow
    ...
  - docker run -d node
  - docker logs -f <id>
  - docker start -a <id>
    -> attached mode








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
