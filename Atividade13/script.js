const imagemJanela = document.getElementById('imagem-janela');
const estadoJanela = document.getElementById('estado-janela');

imagemJanela.addEventListener('mouseover', () => {
    imagemJanela.src = 'img/aberta.png';
    estadoJanela.textContent = 'Janela Aberta';
});

imagemJanela.addEventListener('mouseout', () => {
    imagemJanela.src = 'img/fechada.jpg';
    estadoJanela.textContent = 'Janela Fechada';
});

imagemJanela.addEventListener('click', () => {
    imagemJanela.src = 'img/quebrada.jpg';
    estadoJanela.textContent = 'Janela Quebrada';
});
