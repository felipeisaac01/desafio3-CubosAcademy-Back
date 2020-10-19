const Router = require('koa-routes')

const AuthController = require('./controllers/auth');

const routes = new Router();

routes.post('/auth', AuthController.autenticar);

module.exports = routes;