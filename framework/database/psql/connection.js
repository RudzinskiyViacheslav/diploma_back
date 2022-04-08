import pkg from "pg";
const { Pool } = pkg

function establishPSQLConnection() {

  const pool = new Pool({
    user: "monarch",
    host: "localhost",
    database: "diploma",
    password: "helpbycrbq",
    port: 5432,
  });
  return pool;
};


export { establishPSQLConnection };