const { builtinModules } = require('module');
const response = require('../.utils/response')
const jogosRepositories = require('../repositories/jogos');

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

	if (rodada < 1 || rodada > 20) {
		return response(ctx, 400, { mensagem: 'Rodada inválida' })
	}

	const jogosDaRodada = await jogosRepositories.obterJogosPorRodada(rodada);

	return response(ctx, 200, { jogosDaRodada })
}

module.exports = {
	buscarJogoPorRodada,
}