const formulario = document.getElementById('formulario-aluno');
const resultadosDiv = document.getElementById('resultados');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const ra = document.getElementById('ra').value;
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    if (nome === '' || !nome.includes(' ')) {
        alert('Por favor, insira um nome completo válido.');
        return;
    }

    if (ra.length !== 5 || isNaN(ra)) {
        alert('Por favor, insira um RA válido (5 dígitos).');
        return;
    }

    if ([nota1, nota2, nota3].some(nota => nota < 0 || nota > 10)) {
        alert('Por favor, insira notas entre 0 e 10.');
        return;
    }

    const media = ((nota1 + nota2 + nota3) / 3).toFixed(2);
    resultadosDiv.innerHTML += `<p>Nome: ${nome}, RA: ${ra}, Média: ${media}</p>`;
});
