/**
 * cria um padrão de resposta
 * @param {*} ctx 
 * @param {number} code 
 * @param {object} dados 
 */
const response = (ctx, code, dados) => {
	ctx.status = code;
	ctx.body = {
		status: code >= 200 && code <= 399 ? 'Sucesso' : 'Erro',
		dados,
	}
}

module.exports = response;