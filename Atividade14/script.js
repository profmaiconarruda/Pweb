const campoTexto = document.getElementById('campo-texto');
const radioMaiusculo = document.getElementById('radio-maiusculo');
const radioMinusculo = document.getElementById('radio-minusculo');

//função que ao ser chamada transforma o texto
function transformarTexto() {
    if (radioMaiusculo.checked) {
        campoTexto.value = campoTexto.value.toUpperCase();
    } else if (radioMinusculo.checked) {
        campoTexto.value = campoTexto.value.toLowerCase();
    }
}

// transformação ao selecionar o rádio
radioMaiusculo.addEventListener('change', transformarTexto);
radioMinusculo.addEventListener('change', transformarTexto);
