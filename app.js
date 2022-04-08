const express = require("express");
const app = express();
const port = 3000;

import { establishPSQLConnection } from './framework/database/psql/connection.js'
import { Handlers } from './src/handlers/handlers.js'

const conn = establishPSQLConnection()

let handlers = new Handlers(conn)

// Пока оставлю для проверки сервера
app.get("/", (req, res) => {
  console.log(req);
  res.send(`Ohh shit, it really works! ${req}`);
});

app.get("/main", handlers.mainsc); 

// app.get('/register',  register) //Registration

// app.get('/capfk',  capfk) //Screen with all CAPFK

// app.get('/capfk/prod_cards',  prod_cards) //Screen with all production cards

// app.get('/capfk/prod_cards/card',  card) //Production card screen

// app.get('/info',  info) //Information screen (after main screen)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
