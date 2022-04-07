const express = require('express')
const app = express()
const port = 3000

import {requests} from './src/repository/requests.js'

const pg = require('pg')

// Пока оставлю для проверки сервера
app.get('/', (req, res) => {
    console.log(req)
    res.send(`Ohh shit, it really works! ${req}`)
})

app.get('/main',  requests.mainsc) //Main screen

app.get('/register',  requests.register) //Registration

app.get('/capfk',  requests.capfk) //Screen with all CAPFK

app.get('/capfk/prod_cards',  requests.prod_cards) //Screen with all production cards

app.get('/capfk/prod_cards/card',  requests.card) //Production card screen

app.get('/info',  requests.info) //Information screen (after main screen)

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
