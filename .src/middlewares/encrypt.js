const { response } = require('express');
const password = require('../.utils/password');
const Password = require('../.utils/password');
const response = require('../.utils/response');

/**
 * encripta a senha de novos usuários
 * @param {*} ctx 
 * @param {*} next 
 */
const encrypt = async (ctx, next) => {
	const { senha = null } = ctx.requrest.body;

	if (!senha) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado.'})
	}

	const hash = await Password.encrypt(senha);
	ctx.state.hash = hash;
	return next()
};

module.exports = { encrypt };