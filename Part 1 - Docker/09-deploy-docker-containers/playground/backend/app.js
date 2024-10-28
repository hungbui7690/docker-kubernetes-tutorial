/*
  Setup for Multi-Containers 
  - ECS -> Services -> delete the default service
  - docker-compose.yaml -> great when we work on the same machine -> but with multi-containers -> we want to deploy to multiple hosts -> hard 

***************************

  BackEnd 
  - docker build 
  - docker-compose -> we muse service name as the host
    -> mongoose.connect(`mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@<mongodb>:27017...)
  - in AWS ECS -> need to be in the <same_task> -> same machine so that we can use -> <localhost> -> since ECS does not create docker network for us
    -> but most of the projects will be deployed to multiple machines
  - change from @<mongodb> to @<process.env.MONGO_URL>
  - add ENV to dockerfile -> ENV MONGODB_URL=mongodb

  - docker build -t goals-node ./backend
  - dockerhub -> create repo -> goals-node
  - push 


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Configuring the NodeJS Backend Container
  - ECS -> Cluster -> Create Cluster -> pic


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Deploying a Second Container & A Load Balance
  - pic


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Using a Load Balancer for a Stable Domain









*/

const fs = require('fs')
const path = require('path')

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Goal = require('./models/goal')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/goals', async (req, res) => {
  console.log('TRYING TO FETCH GOALS')
  try {
    const goals = await Goal.find()
    res.status(200).json({
      goals: goals.map((goal) => ({
        id: goal.id,
        text: goal.text,
      })),
    })
    console.log('FETCHED GOALS')
  } catch (err) {
    console.error('ERROR FETCHING GOALS')
    console.error(err.message)
    res.status(500).json({ message: 'Failed to load goals.' })
  }
})

app.post('/goals', async (req, res) => {
  console.log('TRYING TO STORE GOAL')
  const goalText = req.body.text

  if (!goalText || goalText.trim().length === 0) {
    console.log('INVALID INPUT - NO TEXT')
    return res.status(422).json({ message: 'Invalid goal text.' })
  }

  const goal = new Goal({
    text: goalText,
  })

  try {
    await goal.save()
    res
      .status(201)
      .json({ message: 'Goal saved', goal: { id: goal.id, text: goalText } })
    console.log('STORED NEW GOAL')
  } catch (err) {
    console.error('ERROR FETCHING GOALS')
    console.error(err.message)
    res.status(500).json({ message: 'Failed to save goal.' })
  }
})

app.delete('/goals/:id', async (req, res) => {
  console.log('TRYING TO DELETE GOAL')
  try {
    await Goal.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: 'Deleted goal!' })
    console.log('DELETED GOAL')
  } catch (err) {
    console.error('ERROR FETCHING GOALS')
    console.error(err.message)
    res.status(500).json({ message: 'Failed to delete goal.' })
  }
})

mongoose.connect(
  `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGO_URL}:27017/course-goals?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.error('FAILED TO CONNECT TO MONGODB')
      console.error(err)
    } else {
      console.log('CONNECTED TO MONGODB!!')
      app.listen(80)
    }
  }
)
