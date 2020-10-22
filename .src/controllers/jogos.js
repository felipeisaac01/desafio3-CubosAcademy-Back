const { builtinModules } = require('module');
const response = require('../.utils/response')
const jogosRepositories = require('../repositories/jogos');
const Funcoes = require('../.utils/funcoes');

/**
 * busca os jogos de uma dada rodada
 * @param {*} ctx 
 */
const buscarJogoPorRodada = async (ctx) => {
	const rodada = Number(ctx.params.id);

	if (!rodada) {
		return response(ctx, 400, { mensagem: 'Não foi fornecida uma rodada' });
	}

	if (Number.isNaN(rodada)) {
		return response(ctx, 400, { mensagem: "Rodada inválida" })
	}

	if (rodada < 1 || rodada > 38) {
		return response(ctx, 400, { mensagem: 'Rodada inválida' })
	}

	const jogosDaRodada = await jogosRepositories.obterJogosPorRodada(rodada);

	return response(ctx, 200, { jogosDaRodada })
}

/**
 * retorna a tabela ja em ordem de classificação
 * @param {*} ctx 
 */
const obterTabelaDeClassificação = async (ctx) => {
	const todosOsJogos = await jogosRepositories.obterTodosOsJogos();

	let tabelaOrdenada = []
	tabelaOrdenada = Funcoes.ordernarTabela(tabelaOrdenada, todosOsJogos);

	return response(ctx, 200, { tabelaOrdenada })
}

const editarPlacar = async (ctx) => {
	const { id = null, golsCasa = null, golsVisitante = null} = ctx.request.body;
	
	if (id === null || golsCasa === null || golsVisitante === null) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado' })
	}

	const jogoAtualizado = await jogosRepositories.atualizarJogo(id, golsCasa, golsVisitante);
	
	const todosOsJogos = await jogosRepositories.obterTodosOsJogos();
	let tabelaAtualizada = []
	tabelaAtualizada = Funcoes.ordernarTabela(tabelaAtualizada, todosOsJogos);


	return response(ctx, 200, { jogoAtualizado, tabelaAtualizada })
}

module.exports = {
	buscarJogoPorRodada,
	obterTabelaDeClassificação,
	editarPlacar
}