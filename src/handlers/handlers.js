
class Handlers {
  constructor(psqlConnection) {
    this.pool = psqlConnection
  }
  /**
   * Получаем обработка запроса на главную страницу
  */
  mainsc = (request, response) => {
    this.pool.query("SELECT * FROM pakrmk", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };


  register = (request, response) => {
    this.pool.query("SELECT * FROM pakrmk", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };


  capfk = (request, response) => {
    this.pool.query("SELECT * FROM pakrmk", (error, results) => {
    if (error) {
      throw error;
      }
      response.status(200).json(results.rows);
    });
  };

  prod_cards = (request, response) => {
    this.pool.query("SELECT * FROM pakrmk", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
  };
  card = (request, response) => {
    this.pool.query("SELECT * FROM pakrmk", (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    });
};
info = (request, response) => {
  this.pool.query("SELECT * FROM pakrmk", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};
}

export { Handlers };
