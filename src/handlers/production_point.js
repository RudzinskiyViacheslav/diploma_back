
class ProductionPointHandlers {
  /**
   * @constructor 
   * @param {psqlConnection} пул подключений к бд PSQL из библиотеки PG
  */
  constructor(psqlConnection) {
    this.psqlPool = psqlConnection
  }

  PSQLSearchByCapfkid = "SELECT * FROM departments WHERE department_capfk_id=$1"

  PSQLSearchByDepartmentId = "SELECT * FROM departments WHERE department_id=$1"

  searchProdPointByDepartmentId = (pool,department_id) => {
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLSearchByDepartmentId, [department_id], (error, results) => {
        if (error) {
          reject(error)
        }
        if (results) resolve(results.rows)
        else {resolve([])}
      })
    });
    return query
  }

  searchProdPointByCapfkId = (pool, capfk_id) => {
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLSearchByCapfkid,[capfk_id], (error, results) => {
        if (error) {
          reject(error)
        }
        if (results) resolve(results.rows)
        else {resolve([])}
      })
    });
    return query
  }

  handler = (request, response) => {
    if (request.query.capfk_id) this.searchByCapfkId(request,response,request.query.capfk_id)
    else if (request.query.department_id) this.searchByProdId(request, response, request.query.department_id)
    else {response.status(404).json('Параметр поиска не указан')}
  }

  searchByCapfkId = (request, response, capfk_id) => {
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

  searchByProdId = (request, response, department_id) => {
    this.searchProdPointByDepartmentId(this.psqlPool, department_id).then(
      (result) => {
        console.log(result)
        if(result.length!==0) response.status(200).json(result);
        else response.status(404).json(`Производственный участок с id ${department_id} не найден`)
      },
      (error) => {
        response.status(500);
        throw error;
      }
    )
  }

};

export { ProductionPointHandlers }