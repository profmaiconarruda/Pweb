/*
    Projeto: Atividade8 Profa. Denilce - Ref.: Pesquisa    
    Data: 02-10-2024
    Author1: David Tobias Nunes
    Author2: Maicon de Arruda Rodrigues
    File: pesquisa.js
    src: ./script/js/
 
*/

const respostas = {
    idade: [],
    sexo: { masculino: 0, feminino: 0 },
    opiniao: { otimo: 0, bom: 0, regular: 0, pessimo: 0 }
};

function processarFormulario() {
    const idade = document.getElementById('idade').value;
    const sexo = document.getElementById('sexo').value;
    const opiniao = document.getElementById('opiniao').value;

    if (idade && sexo && opiniao) {
        respostas.idade.push(parseInt(idade));
        respostas.sexo[sexo]++;
        respostas.opiniao[opiniao]++;
        atualizarResultados();
        limparFormulario();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function limparFormulario() {
    document.getElementById('idade').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('opiniao').value = '';
}

function atualizarResultados() {
    const totalRespostas = respostas.idade.length;
    let resultadosHTML = '<h2>Resultados:</h2>';

    // Cálculo da média de idade
    const somaIdades = respostas.idade.reduce((a, b) => a + b, 0);
    const mediaIdade = somaIdades / totalRespostas;
    const mediaIdadeArredondada = Math.floor(mediaIdade + (mediaIdade % 1 >= 0.5 ? 1 : 0));
    resultadosHTML += `<h3>Média de Idade:</h3><p>${mediaIdadeArredondada}</p>`;

    for (const categoria in respostas) {
        if (categoria !== 'idade') {
            resultadosHTML += `<h3>${categoria.charAt(0).toUpperCase() + categoria.slice(1)}:</h3>`;
            for (const opcao in respostas[categoria]) {
                const quantidade = respostas[categoria][opcao];
                const porcentagem = Math.round((quantidade / totalRespostas) * 100) || 0;
                resultadosHTML += `<p>${opcao.charAt(0).toUpperCase() + opcao.slice(1)}: ${quantidade} (${porcentagem}%)</p>`;
            }
        }
    }

    document.getElementById('resultados').innerHTML = resultadosHTML;
}