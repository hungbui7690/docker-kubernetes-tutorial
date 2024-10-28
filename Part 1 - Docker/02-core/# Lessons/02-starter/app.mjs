/*
  To run this app:
  - npm install 
  - node app.mjs

\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Extension: Docker


*/

import express from 'express'

import connectToDatabase from './helpers.mjs'

const app = express()

app.get('/', (req, res) => {
  res.send('<h2>Hi there!</h2>')
})

await connectToDatabase()

app.listen(3000)
