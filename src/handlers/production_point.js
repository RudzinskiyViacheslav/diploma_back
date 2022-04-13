class ProductionPointHandlers {
  /**
   * @constructor 
   * @param {psqlConnection} пул подключений к бд PSQL из библиотеки PG
  */
  constructor(psqlConnection) {
    this.psqlPool = psqlConnection
  }

  PSQLSearchByCapfkid = "SELECT * FROM departments WHERE department_capfk_id=$1"

  searchProdPointByCapfkId = (pool, capfk_id) => {
    console.log(1234)
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLSearchByCapfkid,[capfk_id], (error, results) => {
        if (error) {
          reject(error)
        }
        console.log(results)
        if (results) resolve(results.rows)
        else {resolve([])}
      })
    });
    return query
  }

  handler = (request, response) => {
    console.log(request.query.capfk_id)
    if (request.query.capfk_id) this.search(request,response,request.query.capfk_id)
    else {response.status(404).json('Параметр поиска не указан')}
  }

  search = (request, response, capfk_id) => {
    this.searchProdPointByCapfkId(this.psqlPool, capfk_id).then(
      (result) => {
        console.log(result)
        if(result.length!==0) response.status(200).json(result);
        else response.status(404).json(`Производственный участок филиала с id ${capfk_id} не найден`)
      },
      (error) => {
        response.status(500);
        throw error;
      }
    )
    
  };

};

export { ProductionPointHandlers }