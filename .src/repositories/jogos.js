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

module.exports = {
	obterJogosPorRodada,
}