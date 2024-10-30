function validar() {
    const nome = document.formulario.elements["nome"].value;
    const email = document.formulario.elements["email"].value;
    const comentario = document.formulario.elements["comentario"].value;
    const primeiraVez = document.formulario.elements["primeiravez"];

    // 1º Validação do campo Nome se ele tem pelo menos 10 char's
    if (nome.length < 10) {
        alert("O nome deve ter pelo menos 10 caracteres.");
        return false;
    }

    // Validação do campo Comentário
    if (comentario.length < 20) {
        alert("O comentário deve ter pelo menos 20 caracteres.");
        return false;
    }

    // Validação do campo Pesquisa
    let pesquisaSelecionada = "";
    for (let i = 0; i < primeiraVez.length; i++) {
        if (primeiraVez[i].checked) {
            pesquisaSelecionada = primeiraVez[i].value;
            break;
        }
    }

    if (pesquisaSelecionada === "Não") {
        alert("Que bom que você voltou a visitar esta página!");
    } else if (pesquisaSelecionada === "Sim") {
        alert("Volte sempre à esta página!");
    } else {
        alert("Por favor, responda à pesquisa.");
        return false;
    }

    return true; // se validado envia o form
}
