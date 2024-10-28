/*
  Dockerize Node JS App
  - docker built .
    -> return id of the image
  - docker run -p 3000:3000 <id>
  - docker ps 


*/

import express from 'express'

import connectToDatabase from './helpers.mjs'

const app = express()

app.get('/', (req, res) => {
  res.send('<h2>Hi there!</h2>')
})

await connectToDatabase()

app.listen(3000)
