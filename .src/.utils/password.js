const bcrypt = require('bcrypt');

/**
 * verifica se a senha fornecida é a correta
 * @param {string} password 
 * @param {string} hash 
 */
const check = async (password, hash) => {
	const comparison = await bcrypt.compare(password, hash);
	return comparison;
};

/**
 * encripta uma nova senha
 * @param {string} password 
 */
const encrypt = async (password) => {
	const hash = bcrypt.hash(password, 10);
	return hash
};

module.exports = { check, encrypt };