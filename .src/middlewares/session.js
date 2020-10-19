const jwt = require('jsonwebtoken');
const response = require('../.utils/response');
require('dotenv').config();

/**
 * verifica a sessão de um usuário
 * @param {*} ctx 
 * @param {*} next 
 */
const verify = async (ctx, next) => {
	const [, token] = ctx.headers.authorization.split(' ');
	
	try {
		const verification = await jwt.verify(token, process.env.JWT_SECRET);
		
		ctx.state.userID = verification.id;
		ctx.state.userEmail = verification.email;
	} catch (err) {
		console.log(err);
		return response(ctx, 403, { mensagem: 'Ação proibida' })
	}
	
	return next();
};

module.exports = { verify };