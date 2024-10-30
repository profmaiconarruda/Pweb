function calcularMedia() {
    let nome = prompt("Digite o nome do aluno:");
    if (nome === null) return; // Se cancelar, sai da função

    let notas = [];
    for (let i = 1; i <= 4; i++) {
        let nota = prompt(`Digite a ${i}ª nota de ${nome}:`);
        if (nota === null) return; // Se cancelar, sai da função

        nota = parseFloat(nota);
        if (isNaN(nota)) {
            alert("Por favor, digite um número válido!");
            return;
        }
        notas.push(nota);
    }

    let soma = notas.reduce((a, b) => a + b, 0);
    let media = soma / 4;

    let mensagem = `Nome do aluno: ${nome}\n`;
    mensagem += `Notas: ${notas.join(', ')}\n`;
    mensagem += `Média: ${media.toFixed(2)}`;

    alert(mensagem);

    let aprovado = media >= 6;
    let resultado = confirm(`O aluno ${nome} ${aprovado ? 'foi aprovado' : 'foi reprovado'}.\nDeseja calcular outra média?`);

    if (resultado) {
        calcularMedia();
    }
}