const express = require('express')
const app = express()
const port = 3000

const pg = require('pg');

const getpakrmk = (request, response) => {
  pool.query('SELECT * FROM pakrmk', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

app.get('/', (req, res) => {
    console.log(req)
    res.send(`Slava Super! ${req}`)
})

app.get('/pakrmk',  getpakrmk)

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'monarch',
  host: 'localhost',
  database: 'diploma',
  password: 'helpbycrbq',
  port: 5432,
})

 app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
 })

