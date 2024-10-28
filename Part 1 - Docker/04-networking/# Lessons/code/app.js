/*
  Case 1 Container to WWW Communication
  - https://swapi.dev/api/films


*****************************

  Case 2 Container to Local Host Machine Communication
  - mongoose.connect('mongodb://localhost:27017/swfavorites')
    -> mongodb is setup in local machine


*****************************

  Case 3 Container to Container Communication
  - we can setup SQL Database in a container


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  - docker build -t favorites-node .
  - docker run --rm --name favorites -p 3000:3000 favorites-node
    ❌ from container -> cannot connect to mongodb in local machine
    🍉 still can access to https://strapi.dev


*****************************

  Container to Local Host Machine Communication
  ❌ mongoose.connect('mongodb://<localhost>:27017/swfavorites')
  🥫 mongoose.connect('mongodb://<host.docker.internal>:27017/swfavorites')


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Container to Container Communication
  1. docker run -d --name <mongodb> <mongo>
  2. docker container inspect <mongodb>
    -> Network Settings -> IpAddress -> 172.17.0.x
  3. mongoose.connect('mongodb://<127.0.0.x>:27017/swfavorites')

  🍳 The problem with this is everytime we work on it, we need to check the IPAddress of the mongodb container


*****************************

  # Docker Network
  - docker run --network my_network...
    # Network
        container1
        container2
        container3
        ...
    => with docker network, all containers can communicate with each other and IPs are auto resolved
    
  - docker network --help

    1. docker network create favorite_net
    2. docker run -d --name <mongodb> --network favorite_net <mongo>
    3. docker run --rm --name favorites --network favorite_net favorites-node
    4. mongoose.connect('mongodb://<mongodb>:27017/swfavorites')
      -> now, we use mongodb (container name) as host (domain)

  - docker logs favorite-node



*/

const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios').default
const mongoose = require('mongoose')

const Favorite = require('./models/favorite')

const app = express()

app.use(bodyParser.json())

app.get('/favorites', async (req, res) => {
  const favorites = await Favorite.find()
  res.status(200).json({
    favorites: favorites,
  })
})

app.post('/favorites', async (req, res) => {
  const favName = req.body.name
  const favType = req.body.type
  const favUrl = req.body.url

  try {
    if (favType !== 'movie' && favType !== 'character') {
      throw new Error('"type" should be "movie" or "character"!')
    }
    const existingFav = await Favorite.findOne({ name: favName })
    if (existingFav) {
      throw new Error('Favorite exists already!')
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  })

  try {
    await favorite.save()
    res
      .status(201)
      .json({ message: 'Favorite saved!', favorite: favorite.toObject() })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

app.get('/movies', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films')
    res.status(200).json({ movies: response.data })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

app.get('/people', async (req, res) => {
  try {
    const response = await axios.get('https://swapi.dev/api/people')
    res.status(200).json({ people: response.data })
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong.' })
  }
})

mongoose.connect(
  'mongodb://mongodb:27017/swfavorites',
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      app.listen(3000)
    }
  }
)
