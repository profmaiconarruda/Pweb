function calcularIMC() {
    // Obter valores dos inputs
    const altura = parseFloat(document.getElementById('altura').value);
    const peso = parseFloat(document.getElementById('peso').value);
    
    // Validar inputs
    if (isNaN(altura) || isNaN(peso) || altura <= 0 || peso <= 0) {
        document.getElementById('resultado').innerHTML = 
            'Por favor, insira valores válidos para altura e peso.';
        document.getElementById('resultado').style.backgroundColor = '#ffe6e6';
        removerDestaqueTabela();
        return;
    }
    
    // Calcular IMC
    const imc = peso / (altura * altura);
    let classificacao = '';
    let grau = '';
    let linhaIndex = 0;
    
    // Classificar IMC
    if (imc < 18.5) {
        classificacao = 'MAGREZA';
        grau = '0';
        linhaIndex = 0;
    } else if (imc < 25) {
        classificacao = 'NORMAL';
        grau = '0';
        linhaIndex = 1;
    } else if (imc < 30) {
        classificacao = 'SOBREPESO';
        grau = 'I';
        linhaIndex = 2;
    } else if (imc < 40) {
        classificacao = 'OBESIDADE';
        grau = 'II';
        linhaIndex = 3;
    } else {
        classificacao = 'OBESIDADE GRAVE';
        grau = 'III';
        linhaIndex = 4;
    }
    
    // Exibir resultado
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = `
        Seu IMC é: ${imc.toFixed(2)}<br>
        Classificação: ${classificacao}<br>
        Grau de Obesidade: ${grau}
    `;
    resultadoDiv.style.backgroundColor = '#e3f2fd';
    
    // Destacar linha na tabela
    destacarLinhaTabela(linhaIndex);
}

function destacarLinhaTabela(index) {
    // Remover destaque anterior
    removerDestaqueTabela();
    
    // Adicionar destaque à linha correspondente
    const linhas = document.querySelector('.imc-table tbody').getElementsByTagName('tr');
    if (linhas[index]) {
        linhas[index].classList.add('destaque');
    }
}

function removerDestaqueTabela() {
    const linhas = document.querySelector('.imc-table tbody').getElementsByTagName('tr');
    for (let linha of linhas) {
        linha.classList.remove('destaque');
    }
}
