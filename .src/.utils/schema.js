const database = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS jogos (
		id SERIAL,
		time_casa VARCHAR(255),
		time_visitante VARCHAR(255),
		gols_casa INT,
		gols_visitante INT,
		rodada INT,
	);`,
	2: `CREATE TABLE IF NOT EXISTS users (
		id SERIAL,
		email: VARCHAR(255),
		senha: VARCHAR(255),
	);`
}

const drop = async (table) => {
	if (table) {
		await database.query(`DROP TABLE ${table};`);
		console.log('Tabela dropada!')
	}
};

const up = async (number = null) => {
	if (!number) {
		for (value of schema) {
			await database.query({ text: schema[value] })
		};
	} else {
		await database.query({ text: schema[number] });
	}
	console.log('Migração rodada!')
};

up();