const testarExistenciaDoTime = (arrayDeTimes, nomeDoTime) => {
	let timeExistente = false;

	for (objtime of arrayDeTimes) {
		if (nomeDoTime === objtime.time) {
			timeExistente = true;
		}	
	}
	// usar o find

	if (!timeExistente) {
		const novoTime = {
			time: nomeDoTime, 
			jogos: 0,
			pontos: 0,
			vitorias: 0,
			empates: 0,
			derrotas: 0,
			golsFeitos: 0,
			golsSofridos: 0,
		};

		arrayDeTimes.push(novoTime);
		/* // arrayDeTimes[${nomeDoTime}] = {
			time: nomeDoTime, 
			jogos: 0,
			pontos: 0,
			vitorias: 0,
			empates: 0,
			derrotas: 0,
			golsFeitos: 0,
			golsSofridos: 0,
		}; */
	}
};


const distribuirPontuacao = (arrayDeTimes, nomeDoTime, golsFeitos, golsSofridos) => {
	testarExistenciaDoTime(arrayDeTimes, nomeDoTime);
	
	// procurar indice como valor de propriedade
	// arrayDeTimes[`${nomeDoTime}`].
	arrayDeTimes.forEach((objTime, indice) => {
		let vitoria = 0;
		let derrota = 0;
		let empate = 0;
		let pontos = 0;
		
		if (golsFeitos > golsSofridos) {
			vitoria = 1;
			pontos = 3
		} else if (golsFeitos < golsSofridos) {
			derrota = 1;
		} else {
			empate = 1;
			pontos = 1
		}

		if (objTime.time === nomeDoTime) {
			arrayDeTimes[indice].jogos += 1;
			arrayDeTimes[indice].pontos += pontos;
			arrayDeTimes[indice].vitorias += vitoria;
			arrayDeTimes[indice].empates += empate;
			arrayDeTimes[indice].derrotas += derrota;
			arrayDeTimes[indice].golsFeitos += golsFeitos;
			arrayDeTimes[indice].golsSofridos += golsSofridos;
			arrayDeTimes[indice].saldoDeGols = arrayDeTimes[indice].golsFeitos - arrayDeTimes[indice].golsSofridos;
		}
	})
}

const funcaoDeOrdenacao = (a, b) => {
	if (a.pontos !== b.pontos) {
		return b.pontos - a.pontos
	} else if (a.vitorias !== b.vitorias) {
		return b.vitorias - a.vitorias
	} else if (a.saldoDeGols !== b.saldoDeGols) {
		return b.saldoDeGols - a.saldoDeGols
	} else if (a.golsFeitos !== b.golsFeitos) {
		return b.golsFeitos - a.golsFeitos
	} else {
		return a.time.localeCompare(b.time)
	}
}

const ordernarTabela = (arrayDeTimes, jogos) => {
	jogos.forEach((jogo) => {
		distribuirPontuacao(arrayDeTimes, jogo.time_casa, jogo.gols_casa, jogo.gols_visitante);
		distribuirPontuacao(arrayDeTimes, jogo.time_visitante, jogo.gols_visitante, jogo.gols_casa);	
	})

	arrayDeTimes.sort(funcaoDeOrdenacao)

	arrayDeTimes.forEach((time, indice) => time.colocacao = indice+1)

	return arrayDeTimes
};

module.exports = {
	ordernarTabela,
}