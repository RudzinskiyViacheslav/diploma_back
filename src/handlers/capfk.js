class CapfkHandlers {
  /**
   * @constructor
   * @param {psqlConnection} пул подключений к бд PSQL из библиотеки PG
   */
  constructor(psqlConnection) {
    this.psqlPool = psqlConnection;
  }

  /**
   * @description Запрос который возвращает все записи из таблицы ЦАПФК
   */
  PSQLSearchByNameQuerry =
    "SELECT * FROM capfk WHERE LOWER(capfk_name) LIKE LOWER($1)";

  /**
   * @description Запрос на получение всех ЦАПФК с именем из $1
   * @param {String} "$1" - имя для поиска совпадений
   */
  PSQLAllQuerry = "SELECT * FROM capfk";

  /**
   * @description Возвращает все ЦАПФК
   * @param {pool} пул - пул подлкючений к базе данных PSQL (часть PG)
   * @returns {Promise} - возвращает промис из которого можно получить result с найденными строками в таблице ЦАПФК
   */
  getAllCapfks = (pool) => {
    let query = new Promise((resolve, reject) => {
      pool.query("SELECT * FROM capfk", (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      });
    });
    return query;
  };

  sortCapfks = (pool) => {
    let query = new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM capfk ORDER BY departments_quantity ASC",
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results.rows);
        }
      );
    });
    return query;
  };
  /**
   * @description Ищет по заданному пулу ЦАПФК c именем name (не строго)
   * @param {pool} пул - пул подлкючений к базе данных PSQL (часть PG)
   * @param {name} имя по которому необходимо найти
   * @returns {Promise} - возвращает промис из которого можно получить result с найденными строками
   */
  searchCapfksByName = (pool, name) => {
    let query = new Promise((resolve, reject) => {
      pool.query(
        this.PSQLSearchByNameQuerry,
        [`%${name}%`],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(results.rows);
        }
      );
    });
    return query;
  };

  /**
   * Основной хендлер запросов для сущеости ЦАПФК, раскидывает запросы на
   * другие методы класса и передает им request и response
   * @param {request} фзапрос - Обработчик запроса
   * @param {response} ответ - Обработчик ответа=
   */
  handler = (request, response) => {
    if (request.body.name) {
      this.search(request, response, request.body.name);
    } else {
      this.all(request, response);
    }
  };

  sorthandler = (request, response) => {
    this.sort(request, response, request.query.name);
  };

  sort = (request, response) => {
    this.sortCapfks(this.psqlPool).then(
      (result) => {
        response.status(200).json(result);
      },
      (error) => {
        response.status(500);
      }
    );
  };

  /**
   * Выводит все цапфк и отвечает на response
   * @param {request} фзапрос - Обработчик запроса
   * @param {response} ответ - Обработчик ответа=
   */
  all = (request, response) => {
    this.getAllCapfks(this.psqlPool).then(
      (result) => {
        response.status(200).json(result);
      },
      (error) => {
        response.status(500);
      }
    );
  };
  /**
   * Ищет по name в таблице ЦАПФК и отвечает на response
   * @param {request} запрос - Обработчик запроса
   * @param {response} ответ - Обработчик ответа=
   * @param {name} имя - имя цапфк для поиска
   */
  search = (request, response, name) => {
    this.searchCapfksByName(this.psqlPool, name).then(
      (result) => {
        // console.log(result);
        if (result.length !== 0) response.status(200).json(result);
        else response.status(404).json(`ЦАПФК с названием ${name} не найден`);
      },
      (error) => {
        response.status(500);
      }
    );
  };
}

export { CapfkHandlers };
