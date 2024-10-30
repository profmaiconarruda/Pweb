// Objeto original de exponenciação
let obj = {
    x: 10,
    y: 2,
    z: function () {
        return this.x ** this.y;
    }
};

// 1ª Forma: Notação literal de objeto
let funcionario1 = {
    matricula: "F001",
    nome: "João Silva",
    funcao: "Desenvolvedor",
    mostrarDados: function () {
        return `Matrícula: ${this.matricula}, Nome: ${this.nome}, Função: ${this.funcao}`;
    }
};

// 2ª Forma: Usando função construtora
function Funcionario(matricula, nome, funcao) {
    this.matricula = matricula;
    this.nome = nome;
    this.funcao = funcao;
    this.mostrarDados = function () {
        return `Matrícula: ${this.matricula}, Nome: ${this.nome}, Função: ${this.funcao}`;
    };
}

let funcionario2 = new Funcionario("F002", "Maria Santos", "Analista");

// 3ª Forma: Usando Object.create()
let funcionario3 = Object.create(Object.prototype, {
    matricula: {
        value: "F003",
        writable: true,
        enumerable: true,
        configurable: true
    },
    nome: {
        value: "Pedro Costa",
        writable: true,
        enumerable: true,
        configurable: true
    },
    funcao: {
        value: "Gerente",
        writable: true,
        enumerable: true,
        configurable: true
    },
    mostrarDados: {
        value: function () {
            return `Matrícula: ${this.matricula}, Nome: ${this.nome}, Função: ${this.funcao}`;
        },
        writable: true,
        enumerable: true,
        configurable: true
    }
});

// Funções para interação com a página
function mostrarResultadoExponenciacao() {
    document.getElementById('resultado-exp').innerHTML =
        `Resultado de ${obj.x}^${obj.y} = ${obj.z()}`;
}

function mostrarFuncionario1() {
    document.getElementById('func1').innerHTML = funcionario1.mostrarDados();
}

function mostrarFuncionario2() {
    document.getElementById('func2').innerHTML = funcionario2.mostrarDados();
}

function mostrarFuncionario3() {
    document.getElementById('func3').innerHTML = funcionario3.mostrarDados();
}

function modificarFuncionario() {
    const funcionarioSelecionado = document.getElementById('selectFuncionario').value;
    const novoNome = document.getElementById('novoNome').value;
    let funcionarioModificado;

    switch (funcionarioSelecionado) {
        case "1":
            funcionario1.nome = novoNome;
            funcionarioModificado = funcionario1;
            break;
        case "2":
            funcionario2.nome = novoNome;
            funcionarioModificado = funcionario2;
            break;
        case "3":
            funcionario3.nome = novoNome;
            funcionarioModificado = funcionario3;
            break;
    }

    document.getElementById('resultado-mod').innerHTML =
        `Funcionário modificado: ${funcionarioModificado.mostrarDados()}`;

    // Atualizar a exibição do funcionário modificado
    mostrarFuncionario1();
    mostrarFuncionario2();
    mostrarFuncionario3();
}