var AuthController = require('./controllers/AuthController')
var AuthPolicy = require('./policies/AuthPolicy')
var ArticlesController = require('./controllers/ArticlesController')
var isAuthenticated = require('./policies/isAuthenticated')

module.exports = function (app) {
  // process the login form   =========================
  app.post('/api/users/login',
    AuthController.login)
  // process the signup form  =========================
  app.post('/api/users',
    AuthPolicy.signup,
    AuthController.signup)
  // process the Index        =========================
  app.post('/index',
    isAuthenticated)
  // process the article form =========================
  app.get('/articles',
    ArticlesController.index)
  app.get('/articles/:articleId',
    ArticlesController.show)
  app.post('/articles',
    ArticlesController.post)
  app.put('/articles/:articleId',
    ArticlesController.put)
  app.delete('/articles/:articleId',
    ArticlesController.delete)
}
