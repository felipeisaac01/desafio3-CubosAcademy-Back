const Router = require('koa-routes')

const AuthControllers = require('./controllers/auth');
const JogosControllers = require('./controllers/jogos');
const SessionMiddleware = require('./middlewares/session');

const routes = new Router();

routes.post('/auth', AuthControllers.autenticar);

routes.get('/rodada/:id', JogosControllers.buscarJogoPorRodada);
routes.get('/classificacao', JogosControllers.obterTabelaDeClassificação);
routes.put('/jogos',/*  SessionMiddleware.verify, */ JogosControllers.editarPlacar);

module.exports = routes;