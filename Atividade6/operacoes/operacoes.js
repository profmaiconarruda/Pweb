function realizarOperacoes() {
    let num1 = prompt("Digite o primeiro número:");
    if (num1 === null) return;

    let num2 = prompt("Digite o segundo número:");
    if (num2 === null) return;

    // Converte para números pois toda entrada no prompt entra como string
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    // Verifica se são números válidos conforme função que foi ensinada em aula
    if (isNaN(num1) || isNaN(num2)) {
        alert("Por favor, digite números válidos!");
        return;
    }

    // Calcula as operações
    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let multiplicacao = num1 * num2;
    let divisao = num1 / num2;
    let resto = num1 % num2;

    // Monta a mensagem com os resultados
    let mensagem = "Resultados:\n\n";
    mensagem += `Soma: ${num1} + ${num2} = ${soma}\n`;
    mensagem += `Subtração: ${num1} - ${num2} = ${subtracao}\n`;
    mensagem += `Multiplicação: ${num1} x ${num2} = ${multiplicacao}\n`;
    mensagem += `Divisão: ${num1} ÷ ${num2} = ${divisao.toFixed(2)}\n`;
    mensagem += `Resto: ${num1} % ${num2} = ${resto}`;

    alert(mensagem);

    // Pergunta se quer fazer novo cálculo
    let novocalculo = confirm("Deseja realizar outro cálculo?");
    if (novocalculo) {
        realizarOperacoes();
    }
}