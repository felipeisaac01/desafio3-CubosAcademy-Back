const bcrypt = require('bcrypt');

const check = async (password, hash) => {
	const comparison = await bcrypt.compare(password, hash);
	return comparison;
};

const encrypt = async (password) => {
	const hash = bcrypt.hash(password, 10);
	return hash
};

module.exports = { check, encrypt };