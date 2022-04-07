
// Получаем урл главной страницы
let requests

requests.mainsc = (request, response) => {
    pool.query('SELECT * FROM pakrmk', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  // Тут для регистрации пользователя
  requests.register = (request, response) => {
    pool.query('SELECT * FROM pakrmk', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  // Тут для перечня всех ЦАПФК
  requests.capfk = (request, response) => {
    pool.query('SELECT * FROM pakrmk', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  // А тут для всех прозвод. карточек
  requests.prod_cards = (request, response) => {
    pool.query('SELECT * FROM pakrmk', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  // Чисто инфа по картчоке
  requests.card = (request, response) => {
    pool.query('SELECT * FROM pakrmk', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  // Второй экран после главного
  requests.info = (request, response) => {
    pool.query('SELECT * FROM pakrmk', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  export default requests