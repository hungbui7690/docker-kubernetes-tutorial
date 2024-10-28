/*
  Interactive Mode
  - python file
  - docker run --help
    -> -t -> --tty
    -> -i -> --interactive
  - docker run -it <id>
  - after finish -> container will stop 
  - docker run -a <id>
    -> starts with interactive mode again -> but not exit after done 
  - docker start -a -i <it>


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Delete Containers & Images
  - docker rm <id>
    -> not work if container is running
  - docker stop <id>
    -> docker rm <id> <id> ... <id>
  - docker container prune
    -> remove all stopped containers

  - docker images 
    -> list all images and their layers
  - docker rmi <id> ... <id>
    -> remove image and its layers
  - docker image prune
    -> remove all unused images -> not used by any container


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Removing Stopped Containers Automatically
  - docker run --help
  - docker run --rm -d 3000:80 <id>
    -> remove remove container when we stop it
  - docker stop <id>
    -> container is removed automatically


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Inspect Image
  - docker image inspect <id>
    




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
