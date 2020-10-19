const db = require('../.utils/database');


/**
 * Cria a tabela usuários, caso não tenha sido criada ainda
 */
const criarTabelaUsuarios = async () => {
	const query =  `CREATE TABLE IF NOT EXISTS jogos (
		id SERIAL,
		time_casa VARCHAR(255),
		time_visitante VARCHAR(255),
		gols_casa INT,
		gols_visitante INT,
		rodada INT,
	);`

	return db.query(query);
};

/**
 * procura um usuário a partir de um dado e um valor referente fornecidos
 * @param {string} dado 
 * @param {*} valor 
 */
const procurarUsuario = async (dado, valor) => {
	const query = {
		text: `SELECT * FROM users
		WHERE ${dado} = $1;`,
		values: [valor],
	};
	
	const response = await db.query(query);
	return response.rows.shift();
} ;

module.exports = {
	criarTabelaUsuarios,
	procurarUsuario,
}