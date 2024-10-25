/*
  Setup 
  - image: postgres
    ports:
      - '6543:5432'

  🌲 nodejs and postgres are in same docker-compose.yaml -> connect with port 5432 + host=postgresdb
  🌲 from local machine (like pgadmin) -> use 6543 + host=localhost


\\\\\\\\\\\\\\\\\\\\\\\\\

  docker-compose up --build
  docker-compose down -v -> remove the volumes


  🍡 No need to setup networks -> docker will create it for us


*/

const express = require('express')
const app = express()
const { Pool } = require('pg')

const pool = new Pool({
  host: 'postgresdb',
  user: 'postgres',
  password: '121212',
  database: 'test_db',
  port: 5432,
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  try {
    await pool.query(
      'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(255), age INT)'
    )
    res.send('Success!')
  } catch (error) {
    console.log(error)
  }
})

app.post('/users', async (req, res) => {
  const { name, age } = req.body
  console.log(req.body)
  console.log(name, age)
  try {
    const response = await pool.query(
      'INSERT INTO users (name, age) VALUES ($1, $2)',
      [name, age]
    )
    res.send('success')
  } catch (error) {
    console.log(error)
  }
})

app.get('/users', async (req, res) => {
  try {
    const response = await pool.query('SELECT * FROM users')
    res.send(response.rows)
  } catch (error) {
    console.log(error)
  }
})

const PORT = 5000
app.listen(PORT, () => console.log(`🚀 Server has started on port: ${PORT}`))
