<?php
// Configurações do banco de dados
$servidor = 'localhost';
$usuario = 'root';
$senha = '';
$bancoDados = 'maicondearruda_db';

// Criar conexão e banco de dados
$conexao = new mysqli($servidor, $usuario, $senha);
$conexao->query("CREATE DATABASE IF NOT EXISTS {$bancoDados}");
$conexao->select_db($bancoDados);

// Criar tabela com campos adicionais
$sqlTabela = "CREATE TABLE IF NOT EXISTS tarefas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_inicio DATE,
    hora_inicio TIME,
    data_fim DATE,
    hora_fim TIME,
    prioridade ENUM('baixa', 'media', 'alta') DEFAULT 'media',
    status ENUM('fazer', 'andamento', 'concluido') DEFAULT 'fazer',
    responsavel VARCHAR(100),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
$conexao->query($sqlTabela);

// Processamento das ações
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    switch ($_POST['acao']) {
        case 'adicionar':
            $stmt = $conexao->prepare("INSERT INTO tarefas (titulo, descricao, data_inicio, hora_inicio, data_fim, hora_fim, prioridade, status, responsavel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param(
                "sssssssss",
                $_POST['titulo'],
                $_POST['descricao'],
                $_POST['data_inicio'],
                $_POST['hora_inicio'],
                $_POST['data_fim'],
                $_POST['hora_fim'],
                $_POST['prioridade'],
                $_POST['status'],
                $_POST['responsavel']
            );
            $stmt->execute();
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
            break;

        case 'editar':
            $stmt = $conexao->prepare("UPDATE tarefas SET titulo = ?, descricao = ?, data_inicio = ?, hora_inicio = ?, data_fim = ?, hora_fim = ?, prioridade = ?, responsavel = ? WHERE id = ?");
            $stmt->bind_param(
                "ssssssssi",
                $_POST['titulo'],
                $_POST['descricao'],
                $_POST['data_inicio'],
                $_POST['hora_inicio'],
                $_POST['data_fim'],
                $_POST['hora_fim'],
                $_POST['prioridade'],
                $_POST['responsavel'],
                $_POST['tarefa_id']
            );
            $stmt->execute();
            header('Location: ' . $_SERVER['PHP_SELF']);
            exit;
            break;

        case 'excluir':
            $stmt = $conexao->prepare("DELETE FROM tarefas WHERE id = ?");
            $stmt->bind_param("i", $_POST['tarefa_id']);
            $stmt->execute();
            echo json_encode(['sucesso' => true]);
            exit;
            break;

        case 'mover':
            $stmt = $conexao->prepare("UPDATE tarefas SET status = ? WHERE id = ?");
            $stmt->bind_param("si", $_POST['novo_status'], $_POST['tarefa_id']);
            $stmt->execute();
            echo json_encode(['sucesso' => true]);
            exit;
            break;
    }
}

// Buscar todas as tarefas
$tarefas = $conexao->query("SELECT * FROM tarefas ORDER BY prioridade DESC, criado_em DESC");
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kanban Tarefas - Maicon de Arruda Rodrigues</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="stylesheet/css/kanban_maicon.css">
</head>

<body>
    <div class="container">
        <header>
            <h1>Kanban Tarefas</h1>
            <p>Maicon de Arruda Rodrigues</p>
        </header>

        <main class="kanban">
            <?php
            $colunas = [
                'fazer' => ['titulo' => 'A Fazer', 'icone' => 'fa-list-check'],
                'andamento' => ['titulo' => 'Em Andamento', 'icone' => 'fa-spinner'],
                'concluido' => ['titulo' => 'Concluído', 'icone' => 'fa-check-double']
            ];

            foreach ($colunas as $status => $coluna):
                $contadorTarefas = 0;
                ?>
                <section class="coluna" data-status="<?= $status ?>">
                    <div class="coluna-cabecalho">
                        <h2 class="coluna-titulo">
                            <i class="fas <?= $coluna['icone'] ?>"></i>
                            <?= $coluna['titulo'] ?>
                        </h2>
                        <span class="contador-tarefas" id="contador-<?= $status ?>">0</span>
                    </div>

                    <button class="botao-novo" onclick="abrirModal('<?= $status ?>')">
                        <i class="fas fa-plus"></i> Nova Tarefa
                    </button>

                    <?php
                    $tarefas->data_seek(0);
                    while ($tarefa = $tarefas->fetch_assoc()):
                        if ($tarefa['status'] === $status):
                            $contadorTarefas++;
                            $agora = new DateTime();
                            $fim = new DateTime($tarefa['data_fim'] . ' ' . $tarefa['hora_fim']);
                            $diff = $agora->diff($fim);
                            ?>
                            <article class="cartao" draggable="true" data-id="<?= $tarefa['id'] ?>">
                                <div class="cartao-cabecalho">
                                    <h3 class="cartao-titulo"><?= htmlspecialchars($tarefa['titulo']) ?></h3>
                                    <div class="cartao-acoes">
                                        <button class="botao-acao botao-editar" onclick="editarTarefa(<?= $tarefa['id'] ?>)">
                                            <i class="fas fa-edit"></i>
                                        </button>
                                        <button class="botao-acao botao-excluir" onclick="excluirTarefa(<?= $tarefa['id'] ?>)">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>

                                <div class="cartao-conteudo">
                                    <p><?= nl2br(htmlspecialchars($tarefa['descricao'])) ?></p>

                                    <div class="cartao-meta">
                                        <i class="fas fa-user"></i>
                                        <span><?= htmlspecialchars($tarefa['responsavel']) ?></span>
                                    </div>

                                    <div class="cartao-meta">
                                        <i class="fas fa-calendar"></i>
                                        <span>Início:
                                            <?= date('d/m/Y H:i', strtotime($tarefa['data_inicio'] . ' ' . $tarefa['hora_inicio'])) ?></span>
                                    </div>

                                    <div class="cartao-meta">
                                        <i class="fas fa-clock"></i>
                                        <span>Término:
                                            <?= date('d/m/Y H:i', strtotime($tarefa['data_fim'] . ' ' . $tarefa['hora_fim'])) ?></span>
                                    </div>

                                    <span class="etiqueta prioridade-<?= $tarefa['prioridade'] ?>">
                                        <i class="fas fa-flag"></i>
                                        <?= ucfirst($tarefa['prioridade']) ?>
                                    </span>
                                </div>
                            </article>
                            <?php
                        endif;
                    endwhile;
                    ?>
                    <script>
                        document.getElementById('contador-<?= $status ?>').textContent = '<?= $contadorTarefas ?>';
                    </script>
                </section>
            <?php endforeach; ?>
        </main>
    </div>

    <!-- Modal para adicionar/editar tarefa -->
    <div class="modal" id="modalTarefa">
        <div class="modal-conteudo">
            <form method="POST" id="formTarefa">
                <input type="hidden" name="acao" id="formAcao" value="adicionar">
                <input type="hidden" name="tarefa_id" id="tarefaId">
                <input type="hidden" name="status" id="statusTarefa">

                <div class="formulario-grupo">
                    <label for="titulo">Título da Tarefa</label>
                    <input type="text" id="titulo" name="titulo" required>
                </div>

                <div class="formulario-grupo">
                    <label for="descricao">Descrição</label>
                    <textarea id="descricao" name="descricao" rows="3"></textarea>
                </div>

                <div class="formulario-grupo">
                    <label for="responsavel">Responsável</label>
                    <input type="text" id="responsavel" name="responsavel" required>
                </div>

                <div class="formulario-grupo">
                    <label for="prioridade">Prioridade</label>
                    <select id="prioridade" name="prioridade" required>
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>

                <div class="formulario-grupo">
                    <label for="dataInicio">Data de Início</label>
                    <input type="date" id="dataInicio" name="data_inicio" required>
                </div>

                <div class="formulario-grupo">
                    <label for="horaInicio">Hora de Início</label>
                    <input type="time" id="horaInicio" name="hora_inicio" required>
                </div>

                <div class="formulario-grupo">
                    <label for="dataFim">Data de Término</label>
                    <input type="date" id="dataFim" name="data_fim" required>
                </div>

                <div class="formulario-grupo">
                    <label for="horaFim">Hora de Término</label>
                    <input type="time" id="horaFim" name="hora_fim" required>
                </div>

                <div class="botoes-grupo">
                    <button type="button" class="botao botao-secundario" onclick="fecharModal()">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button type="submit" class="botao botao-primario">
                        <i class="fas fa-save"></i> Salvar
                    </button>
                </div>
            </form>
        </div>
    </div>

    <script src="./script/js/funcoes_js-kanbanMaicon.js"></script>

    


</body>

</html>