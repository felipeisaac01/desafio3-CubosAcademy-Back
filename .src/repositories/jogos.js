const db = require('../.utils/database');

/**
 * busca todos os jogos de uma dada rodada
 * @param {Number} rodada 
 */
const obterJogosPorRodada = async (rodada) => {
	const query = {
		text: `SELECT * FROM jogos
		WHERE rodada = $1`,
		values: [rodada]
	}

	const response = await db.query(query);
	return response.rows;
};

const obterTodosOsJogos = async () => {
	const query = {
		text: `SELECT * from jogos`
	}

	const response = await db.query(query);
	return response.rows
}

const atualizarJogo = async (id, golsCasa, golsVisitante) => {
	const query = {
		text: `UPDATE jogos
		SET gols_casa = $1,
		gols_visitante = $2
		where id = $3 RETURNING *`,
		values: [golsCasa, golsVisitante, id]
	}

	const response = await db.query(query);
	return response.rows.shift();
}

module.exports = {
	obterJogosPorRodada,
	obterTodosOsJogos,
	atualizarJogo
}