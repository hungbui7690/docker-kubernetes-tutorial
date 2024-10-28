/*
  Add PgAdmin to docker-compose.yaml

  🌲 With this setup, we don't need to install anything related to Postgres in our computer -> Docker will install PostgresDB & PGAdmin for us.
  🍡 we need to create .env file -> ${PG_USER} ${PG_PASSWORD} ${PG_DB}
  🍀 since they are in the same docker-compose -> docker will generate the virtual network -> we can use the service name to connect


\\\\\\\\\\\\\\\\\\\\\\\\\\
  
  From PGAdmin Local Machine
  # host: localhost
  # port: 6543
  # db: test_db


\\\\\\\\\\\\\\\\\\\\\\\\\\

  From PGAdmin Container 
  - browser -> http://localhost:5050/
    # Host: <postgresdb>
    # Port: <5432>
    # Database: <test_db> or postgres (default db)


\\\\\\\\\\\\\\\\\\\\\\\\\\

  Test
    CREATE TABLE test (id INT, name VARCHAR(255));
    INSERT INTO test VALUES (1, 'postgres');
    INSERT INTO test VALUES (2, 'pg-admin');
    INSERT INTO test VALUES (3, 'docker');
    SELECT * FROM test;


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
