const Router = require('koa-routes')

const AuthControllers = require('./controllers/auth');
const JogosControllers = require('./controllers/jogos')

const routes = new Router();

routes.post('/auth', AuthControllers.autenticar);

routes.get('/rodada/:id', JogosControllers.buscarJogoPorRodada);

module.exports = routes;