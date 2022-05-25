import webpackNodeExternals from "webpack-node-externals";

class UserHandlers {
  constructor(psqlConnection) {
    this.psqlPool = psqlConnection;
  }

  PSQLCreateUser = `INSERT INTO users (first_name, last_name, middle_name,
                    birth_date, adress, mobile_phone, employee_id,
                    passport, email, password, position)
                    VALUES
                    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING user_id`;

  PSQLSearchUser = `SELECT * FROM users WHERE email=$1 and password=$2`;

  // PSQLGetCurrent = 'SELECT * FROM user WHERE email=$1'

  createUser = (
    pool,
    first_name,
    last_name,
    middle_name,
    birth_date,
    adress,
    mobile_phone,
    employee_id,
    passport,
    email,
    password,
    position
  ) => {
    let query = new Promise((resolve, reject) => {
      pool.query(
        this.PSQLCreateUser,
        [
          first_name,
          last_name,
          middle_name,
          birth_date,
          adress,
          mobile_phone,
          employee_id,
          passport,
          email,
          password,
          position,
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

  createHandler = (request, response) => {
    this.createUserId(
      request,
      response,
      request.body.first_name,
      request.body.last_name,
      request.body.middle_name,
      request.body.birth_date,
      request.body.adress,
      request.body.mobile_phone,
      request.body.employee_id,
      request.body.passport,
      request.body.email,
      request.body.password,
      request.body.position
    );
  };
  createUserId = (
    request,
    response,
    first_name,
    last_name,
    middle_name,
    birth_date,
    adress,
    mobile_phone,
    employee_id,
    passport,
    email,
    password,
    position
  ) => {
    this.createUser(
      this.psqlPool,
      first_name,
      last_name,
      middle_name,
      birth_date,
      adress,
      mobile_phone,
      employee_id,
      passport,
      email,
      password,
      position
    ).then(
      (result) => {
        if (result.length !== 0) response.status(200).json(result);
        else response.status(404).json(`Не получилось создать пользователя`);
      },
      (error) => {
        response.status(500);
        throw error;
      }
    );
  };

  handler = (request, response) => {
    if (request.body.email && request.body.password)
      this.searchUser(
        request,
        response,
        request.body.email,
        request.body.password
      );
    else {
      response.status(404).json("Данные для входа не указаны");
    }
  };

  getcurrenthandler = (request, response) => {
    // console.log(request.headers.cookie);
    if (request.headers.cookie) {
      let cok = request.headers.cookie.split(";");
      // console.log(cok);
      cok = cok[0].split("=");
      console.log(cok[1]);
      // console.log(response.cookie());
      // if (request..email) return response.json(result.body.email);
      // this.getcurrentUser(request, response, cok[1]);
      // else {
      response.status(200).json(cok[1]);
    } else {
      response.status(200).json("");
    }
    // }
  };

  exithandler = (request, response) => {
    // console.log(request.headers.cookie);
    // request.clearCookie("logincookie");
    // console.log(request.headers.cookie);
    response.cookie("logincookie", "qwe", {
      maxAge: -1,
      httpOnly: true,
    });
    // console.log(12);
    response.end();
  };

  getcurrentUser = (request, response, email) => {
    this.getUserByLogin(this.psqlPool, email).then(
      (result) => {
        if (result.length !== 0) {
          response.status(200).json(result);
        } else response.status(500).json(`Неверный логин или пароль`);
      },
      (error) => {
        response.status(500);
        // throw error;
      }
    );
  };

  searchUserByLogin = (pool, email) => {
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLSearchUser, [email], (error, results) => {
        if (error) {
          console.log(error);
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

  searchUser = (request, response, email, password) => {
    this.searchUserByLogin(this.psqlPool, email, password).then(
      (result) => {
        if (result.length !== 0) {
          // console.log(request.cookies);
          let cookie = request.cookies;
          if (cookie == undefined) {
            // let randomNumber = Math.random().toString();
            // randomNumber = randomNumber.substring(2, randomNumber.length);
            response.cookie("logincookie", email, {
              maxAge: 9000000000000000000000000000,
              httpOnly: true,
            });
            console.log("cookie created successfully");
          } else {
            console.log("cookie exists", cookie);
          }
          response.status(200).json(result);
        } else response.status(500).json(`Неверный логин или пароль`);
      },
      (error) => {
        response.status(500);
        // throw error;
      }
    );
  };

  searchUserByLogin = (pool, email, password) => {
    let query = new Promise((resolve, reject) => {
      pool.query(this.PSQLSearchUser, [email, password], (error, results) => {
        if (error) {
          console.log(error);
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
}

export { UserHandlers };
