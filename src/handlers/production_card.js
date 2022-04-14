import { response } from "express"
import { request } from "express"
import { query } from "express"
import { error } from "webpack-node-externals/utils"

class ProductionCardHandlers {
  /**
   * @constructor 
   * @param {psqlConnection} пул подключений к бд PSQL из библиотеки PG
  */
  constructor(psqlConnection) {
    this.psqlPool = psqlConnection
  }

  PSQLSearchByCardId = "SELECT * FROM equipment WHERE equipment_id=$1"

  PSQLSearchByDepartmentId = "SELECT * FROM equipment WHERE department_id=$1"

  searchProdCardByDepartmentId = (pool,department_id) => {
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

  searchProdCardByCardId = (pool, equipment_id) => {
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLSearchByCardId,[equipment_id], (error, results) => {
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
    if (request.query.equipment_id) this.searchByCardId(request,response,request.query.equipment_id)
    else if (request.query.department_id) this.searchByProdId(request, response, request.query.department_id)
    else {response.status(404).json('Параметр поиска не указан')}
  }

  searchByCapfkId = (request, response, equipment_id) => {
    this.searchcardPointByCardId(this.psqlPool, equipment_id).then(
      (result) => {
        console.log(result)
        if(result.length!==0) response.status(200).json(result);
        else response.status(404).json(`Производственная карточка с id ${equipment_id} не найдена`)
      },
      (error) => {
        response.status(500);
        throw error;
      }
    )
    
  };

  searchByProdId = (request, response, department_id) => {
    this.searchProdCardByDepartmentId(this.psqlPool, department_id).then(
      (result) => {
        console.log(result)
        if(result.length!==0) response.status(200).json(result);
        else response.status(404).json(`Производственных карточек производственных участок с id ${department_id} не найдено`)
      },
      (error) => {
        response.status(500);
        throw error;
      }
    )
  }

};

export { ProductionCardHandlers }