function establishPSQLConnection() {
  const Pool = require("pg").Pool;

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