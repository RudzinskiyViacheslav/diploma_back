
class UserHandlers {

  constructor(psqlConnection) {
    this.psqlPool = psqlConnection;
  }

  PSQLCreateUser = `INSERT INTO users (first_name, last_name, middle_name,
                    birth_date, adress, mobile_phone, employee_id,
                    passport, email, position)
                    VALUES
                    ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING user_id`;

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
    position
  ) => {
      //onsole.log(last_name);
    let query = new Promise((resolve, reject) => {
      console.log(198);
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
    console.log(request.body.first_name);
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
              position
          ).then(
              (result) => {
                  console.log(result);
                  if (result.length !== 0) response.status(200).json(result);
                  else response.status(404).json(`Не получилось создать пользователя`);
              },
              (error) => {
                  response.status(500);
                  throw error;
              }
          );
      };
}

export { UserHandlers };
