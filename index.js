const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./.src/routes');
const cors = require('@koa/cors');

require('dotenv').config();

const PORT = process.env.PORT || 8081;

const server = new Koa();

server.use(cors());
server.use(bodyparser());
server.use(router.routes());

server.use(ctx => {
	ctx.status = 404;
	ctx.body = {
		status: 'erro',
		dados: {
			mensagem: 'Caminho não encontrado.'
		},
	};
});

server.listen(PORT, console.log(`Servidor rodando na porta ${PORT}!`));

