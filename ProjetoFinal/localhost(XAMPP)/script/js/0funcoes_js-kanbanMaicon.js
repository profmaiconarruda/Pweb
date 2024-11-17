const modal = document.getElementById('modalTarefa');
const form = document.getElementById('formTarefa');

function abrirModal(status, tarefa = null) {
    const agora = new Date();
    const dataFormatada = agora.toISOString().split('T')[0];
    const horaFormatada = agora.toTimeString().slice(0, 5);

    document.getElementById('formAcao').value = tarefa ? 'editar' : 'adicionar';
    document.getElementById('statusTarefa').value = status;
    document.getElementById('tarefaId').value = tarefa ? tarefa.id : '';

    if (!tarefa) {
        form.reset();
        document.getElementById('dataInicio').value = dataFormatada;
        document.getElementById('horaInicio').value = horaFormatada;
    } else {
        document.getElementById('titulo').value = tarefa.titulo;
        document.getElementById('descricao').value = tarefa.descricao;
        document.getElementById('responsavel').value = tarefa.responsavel;
        document.getElementById('prioridade').value = tarefa.prioridade;
        document.getElementById('dataInicio').value = tarefa.data_inicio;
        document.getElementById('horaInicio').value = tarefa.hora_inicio;
        document.getElementById('dataFim').value = tarefa.data_fim;
        document.getElementById('horaFim').value = tarefa.hora_fim;
    }

    modal.style.display = 'flex';
}

function fecharModal() {
    modal.style.display = 'none';
    form.reset();
}

function editarTarefa(id) {
    fetch(`buscar_tarefa.php?id=${id}`)
        .then(response => response.json())
        .then(tarefa => abrirModal(tarefa.status, tarefa));
}

function excluirTarefa(id) {
    if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
        fetch(window.location.href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `acao=excluir&tarefa_id=${id}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.sucesso) {
                    window.location.reload();
                }
            });
    }
}

// Configuração do arrastar e soltar
document.querySelectorAll('.cartao').forEach(cartao => {
    cartao.addEventListener('dragstart', e => {
        e.dataTransfer.setData('text/plain', e.target.dataset.id);
        cartao.classList.add('arrastando');
    });

    cartao.addEventListener('dragend', () => {
        cartao.classList.remove('arrastando');
    });
});

document.querySelectorAll('.coluna').forEach(coluna => {
    coluna.addEventListener('dragover', e => {
        e.preventDefault();
        const arrastando = document.querySelector('.arrastando');
        if (arrastando) {
            const cartoes = [...coluna.querySelectorAll('.cartao:not(.arrastando)')];
            const posicaoAtual = e.clientY;
            const cartaoDestino = cartoes.reduce((closest, cartao) => {
                const box = cartao.getBoundingClientRect();
                const offset = posicaoAtual - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: cartao };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;

            if (cartaoDestino) {
                cartaoDestino.parentNode.insertBefore(arrastando, cartaoDestino);
            } else {
                coluna.appendChild(arrastando);
            }
        }
    });

    coluna.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const novoStatus = coluna.dataset.status;

        fetch(window.location.href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `acao=mover&tarefa_id=${id}&novo_status=${novoStatus}`
        })
            .then(response => response.json())
            .then(data => {
                if (data.sucesso) {
                    window.location.reload();
                }
            });
    });
});

// Fechar modal ao clicar fora
window.onclick = function (event) {
    if (event.target === modal) {
        fecharModal();
    }
}

// Validação de datas
form.addEventListener('submit', function (e) {
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const dataFim = new Date(document.getElementById('dataFim').value);

    if (dataFim < dataInicio) {
        e.preventDefault();
        alert('A data de término não pode ser anterior à data de início!');
    }
});