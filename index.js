/* 

2) precisa MESMO botar eslint e prettier? 

3) mesmo tendo o schema, ainda precisa botar a query de criar tabela no repositories?

4) como terminar a sessao?

5) editar o placar de um jogo n seria PUT nao?

6) nao estou conseguindo verificar a sessao
*/

const Koa = require('koa')
const bodyparser = require('koa-bodyparser');
const router = require('./.src/routes');

require('dotenv').config();

const PORT = process.env.PORT || 8081;

const server = new Koa()

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

server.listen(PORT, console.log(`Servidor rodando na porta ${PORT}!`))

