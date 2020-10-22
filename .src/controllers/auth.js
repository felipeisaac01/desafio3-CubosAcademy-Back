const jwt = require('jsonwebtoken');
const response = require('../.utils/response');
const Password = require('../.utils/password');
const UsuarioRepositorie = require('../repositories/usuario');

require('dotenv').config();

/**
 * cria uma nova sessão
 * @param {*} ctx 
 */
const autenticar = async (ctx) => {
	const { email = null, senha = null} = ctx.request.body;

	if (!email || !senha) {
		return response(ctx, 400, { mensagem: 'Pedido mal formatado.' });
	}

	const usuario = await UsuarioRepositorie.procurarUsuario('email', email);

	if (!usuario) {
		return response(ctx, 200, { mensagem: 'Email incorreto' })
	}

	const comparison = await Password.check(senha, usuario.senha);
	if (!comparison) {
		return response(ctx, 200, { mensagem: 'Senha incorreta.' })
	}

	const token = await jwt.sign(
		{ id: usuario.id, email: usuario.email },
		process.env.JWT_SECRET || 'desafio3',
		{
			expiresIn: '1h',
		},
	)
	return response(ctx, 200, { token })
};

module.exports = { autenticar }