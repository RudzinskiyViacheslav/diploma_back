class ProductionPointHandlers {
  /**
   * @constructor 
   * @param {psqlConnection} пул подключений к бд PSQL из библиотеки PG
  */
  constructor(psqlConnection) {
    this.psqlPool = psqlConnection
  }

  handler = (request, response) => {
    response.status(200).json("Еще не написано")
  }
};

export { ProductionPointHandlers }