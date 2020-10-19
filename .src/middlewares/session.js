const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = async (ctx, next) => {
	const [, token] = ctx.headers.authorization.split(' ');
	const verification = await jwt.verify(token, process, env.JWT_SECRET);

	ctx.state.userID = verification.id;
	ctx.state.userEmail = verification.email;
	return next();
};

module.exports = { verify }