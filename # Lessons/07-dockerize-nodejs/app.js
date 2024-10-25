/*
  Dockerize NodeJS with Postgres
  1. Dockerfile
  2. .dockerignore


*/

const express = require('express')
const app = express()
const { Pool } = require('pg')

var pool

pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '121212',
  port: '6543',
  database: 'test_db',
})

const port = 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  await pool.query(
    'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), age INT)'
  )
  res.send('Success!')
})

app.post('/users', async (req, res) => {
  const { name, age } = req.body
  console.log(req.body)
  console.log(name, age)

  const response = await pool.query(
    'INSERT INTO users (name, age) VALUES ($1, $2)',
    [name, age]
  )
  res.send('success')
})

app.get('/users', async (req, res) => {
  const response = await pool.query('SELECT * FROM users')
  res.send(response.rows)
})

const PORT = 5000
app.listen(PORT, () => console.log(`🚀 Server has started on port: ${PORT}`))
