import express from 'express';
import { establishPSQLConnection } from './framework/database/psql/connection.js'
import { CapfkHandlers } from './src/handlers/capfk.js'
import { ProductionCardHandlers } from './src/handlers/production_card.js';
import { ProductionPointHandlers } from './src/handlers/production_point.js';

const app = express();

const port = 3000;

const conn = establishPSQLConnection()

const apiVersion = 'v1'


let capfk = new CapfkHandlers(conn)
let prodPoint = new ProductionPointHandlers(conn)
let prodcard = new ProductionCardHandlers(conn)


// Пока оставлю для проверки сервера
app.get("/", (req, res) => {
  console.log(req);
  res.send(`Ohh shit, it really works! ${req}`);
});

app.get(`/api/${apiVersion}/capfk`, capfk.handler);
app.get(`/api/${apiVersion}/production_point`, prodPoint.handler);
app.get(`/api/${apiVersion}/production_card`, prodcard.handler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
