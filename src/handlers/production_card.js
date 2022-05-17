class ProductionCardHandlers {
  /**
   * @constructor
   * @param {psqlConnection} пул подключений к бд PSQL из библиотеки PG
   */
  constructor(psqlConnection) {
    this.psqlPool = psqlConnection;
  }

  PSQLSearchByCardId = "SELECT * FROM equipment WHERE equipment_id=$1";

  PSQLDeleteByCardId =
    "DELETE FROM equipment WHERE equipment_id=$1 RETURNING equipment_id";

  PSQLCreateCard = `INSERT INTO equipment (equipment_number, factory_number, delivery_date,
                    depreciation_period, equipment_type, equipment_department_id, price)
                    VALUES
                    ($1,$2,$3,$4,$5,$6,$7) RETURNING equipment_id`;

  PSQLUpdateCard = `UPDATE equipment SET
                    equipment_number = $1, 
                    factory_number = $2, 
                    delivery_date = $3,
                    depreciation_period = $4,
                    equipment_type = $5,
                    price = $6 
                    WHERE
                    equipment_id = $7
                    RETURNING equipment_id`;

  PSQLSearchByDepartmentId =
    "SELECT * FROM equipment WHERE equipment_department_id=$1";

  searchProdCardByDepartmentId = (pool, equipment_department_id) => {
    let query = new Promise((resolve, reject) => {
      pool.query(
        this.PSQLSearchByDepartmentId,
        [equipment_department_id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results) resolve(results.rows);
          else {
            resolve([]);
          }
        }
      );
    });
    return query;
  };

  searchProdCardByCardId = (pool, equipment_id) => {
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLSearchByCardId, [equipment_id], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results) resolve(results.rows);
        else {
          resolve([]);
        }
      });
    });
    return query;
  };

  deleteProdCardByCardId = (pool, equipment_id) => {
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLDeleteByCardId, [equipment_id], (error, results) => {
        if (error) {
          reject(error);
        }
        if (results) resolve(results.rows);
        else {
          resolve([]);
        }
      });
    });
    return query;
  };

  createProdCard = (
    pool,
    equipment_number,
    factory_number,
    delivery_date,
    depreciation_period,
    equipment_type,
    equipment_department_id,
    price
  ) => {
    let query = new Promise((resolve, reject) => {
      console.log(equipment_department_id);
      pool.query(
        this.PSQLCreateCard,
        [
          equipment_number,
          factory_number,
          delivery_date,
          depreciation_period,
          equipment_type,
          equipment_department_id,
          price,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results) resolve(results.rows);
          else {
            resolve([]);
          }
        }
      );
    });
    return query;
  };

  updateProdCard = (
    pool,
    equipment_number,
    factory_number,
    delivery_date,
    depreciation_period,
    equipment_type,
    price,
    equipment_id
  ) => {
    console.log(equipment_id);
    let query = new Promise((resolve, reject) => {
      // console.log(equipment_department_id);
      pool.query(
        this.PSQLUpdateCard,
        [
          equipment_number,
          factory_number,
          delivery_date,
          depreciation_period,
          equipment_type,
          price,
          equipment_id,
        ],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results) resolve(results.rows);
          else {
            resolve([]);
          }
        }
      );
    });
    return query;
  };

  handler = (request, response) => {
    if (request.query.equipment_id)
      this.searchByCardId(request, response, request.query.equipment_id);
    else if (request.query.equipment_department_id)
      this.searchByProdId(
        request,
        response,
        request.query.equipment_department_id
      );
    else {
      response.status(404).json("Параметр поиска не указан");
    }
  };

  deleteHandler = (request, response) => {
    console.log(request.body.equipment_id);
    this.deleteByCardId(request, response, request.body.equipment_id);
  };

  createHandler = (request, response) => {
    console.log("qewrewqrqwe");
    this.createCardId(
      request,
      response,
      request.body.equipment_number,
      request.body.factory_number,
      request.body.delivery_date,
      request.body.depreciation_period,
      request.body.equipment_type,
      request.body.equipment_department_id,
      request.body.price
    );
  };

  updateHandler = (request, response) => {
    console.log(request.body);

    // console.log("dasdsa")
    this.updateCardId(
      request,
      response,
      request.body.equipment_number,
      request.body.factory_number,
      request.body.delivery_date,
      request.body.depreciation_period,
      request.body.equipment_type,
      request.body.price,
      request.body.equipment_id
    );
  };

  createCardId = (
    request,
    response,
    equipment_number,
    factory_number,
    delivery_date,
    depreciation_period,
    equipment_type,
    equipment_department_id,
    price
  ) => {
    this.createProdCard(
      this.psqlPool,
      equipment_number,
      factory_number,
      delivery_date,
      depreciation_period,
      equipment_type,
      equipment_department_id,
      price
    ).then(
      (result) => {
        console.log(result);
        if (result.length !== 0) response.status(200).json(result);
        else response.status(404).json(`Не получилось добавить запись`);
      },
      (error) => {
        response.status(500);
        throw error;
      }
    );
  };

  updateCardId = (
    request,
    response,
    equipment_number,
    factory_number,
    delivery_date,
    depreciation_period,
    equipment_type,
    price,
    equipment_id
  ) => {
    this.updateProdCard(
      this.psqlPool,
      equipment_number,
      factory_number,
      delivery_date,
      depreciation_period,
      equipment_type,
      price,
      equipment_id
    ).then(
      (result) => {
        console.log(result);
        if (result.length !== 0) response.status(200).json(result);
        else response.status(404).json(`Не получилось обновить запись`);
      },
      (error) => {
        response.status(500);
        throw error;
      }
    );
  };

  deleteByCardId = (request, response, equipment_id) => {
    this.deleteProdCardByCardId(this.psqlPool, equipment_id).then(
      (result) => {
        console.log(result);
        if (result.length !== 0) response.status(200).json(result);
        else
          response
            .status(404)
            .json(`Производственная карточка с id ${equipment_id} не найдена`);
      },
      (error) => {
        response.status(500);
        throw error;
      }
    );
  };

  searchByCardId = (request, response, equipment_id) => {
    this.searchProdCardByCardId(this.psqlPool, equipment_id).then(
      (result) => {
        console.log(result);
        if (result.length !== 0) response.status(200).json(result);
        else
          response
            .status(404)
            .json(`Производственная карточка с id ${equipment_id} не найдена`);
      },
      (error) => {
        response.status(500);
        throw error;
      }
    );
  };

  searchByProdId = (request, response, equipment_department_id) => {
    this.searchProdCardByDepartmentId(
      this.psqlPool,
      equipment_department_id
    ).then(
      (result) => {
        console.log(result);
        if (result.length !== 0) response.status(200).json(result);
        else
          response
            .status(404)
            .json(
              `Производственных карточек производственного участка с id ${equipment_department_id} не найдено`
            );
      },
      (error) => {
        response.status(500);
        throw error;
      }
    );
  };
}

export { ProductionCardHandlers };
