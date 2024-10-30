// Função construtora para Retângulo
function Retangulo(base, altura) {
  this.base = base;
  this.altura = altura;

  this.calcularArea = function() {
    return this.base * this.altura;
  };
}

// Função para calcular a área do retângulo
function calcularArea() {
  const base = document.getElementById("base").value;
  const altura = document.getElementById("altura").value;
  const retangulo = new Retangulo(base, altura);
  const area = retangulo.calcularArea();
  document.getElementById("area-retangulo").textContent = area;
}

// Classe Conta
class Conta {
  constructor(nomeCorrentista, banco, numeroConta, saldo) {
    this.nomeCorrentista = nomeCorrentista;
    this.banco = banco;
    this.numeroConta = numeroConta;
    this.saldo = saldo;
  }

  get getNomeCorrentista() {
    return this.nomeCorrentista;
  }

  set setNomeCorrentista(novoNome) {
    this.nomeCorrentista = novoNome;
  }

  get getBanco() {
    return this.banco;
  }

  set setBanco(novoBanco) {
    this.banco = novoBanco;
  }

  get getNumeroConta() {
    return this.numeroConta;
  }

  set setNumeroConta(novoNumero) {
    this.numeroConta = novoNumero;
  }

  get getSaldo() {
    return this.saldo;
  }

  set setSaldo(novoSaldo) {
    this.saldo = novoSaldo;
  }
}

// Classe Conta Corrente
class ContaCorrente extends Conta {
  constructor(nomeCorrentista, banco, numeroConta, saldo, saldoEspecial) {
    super(nomeCorrentista, banco, numeroConta, saldo);
    this.saldoEspecial = saldoEspecial;
  }
}

// Classe Conta Poupança
class ContaPoupanca extends Conta {
  constructor(nomeCorrentista, banco, numeroConta, saldo, juros, dataVencimento) {
    super(nomeCorrentista, banco, numeroConta, saldo);
    this.juros = juros;
    this.dataVencimento = dataVencimento;
  }
}

// Função para criar as contas
function criarConta() {
  const nomeCorrentista = document.getElementById("nome-correntista").value;
  const nomeBanco = document.getElementById("nome-banco").value;
  const numeroConta = document.getElementById("numero-conta").value;
  const saldo = parseFloat(document.getElementById("saldo").value);

  const contaCorrente = new ContaCorrente(nomeCorrentista, nomeBanco, numeroConta, saldo, 500);
  const contaPoupanca = new ContaPoupanca(nomeCorrentista, nomeBanco, numeroConta, saldo, 0.05, "2024-12-31");

  document.getElementById("conta-corrente").textContent = `Conta Corrente: Nome do Correntista: ${contaCorrente.getNomeCorrentista}, Banco: ${contaCorrente.getBanco}, Número da Conta: ${contaCorrente.getNumeroConta}, Saldo: R$ ${contaCorrente.getSaldo.toFixed(2)}, Saldo Especial: R$ ${contaCorrente.saldoEspecial.toFixed(2)}`;
  document.getElementById("conta-poupanca").textContent = `Conta Poupança: Nome do Correntista: ${contaPoupanca.getNomeCorrentista}, Banco: ${contaPoupanca.getBanco}, Número da Conta: ${contaPoupanca.getNumeroConta}, Saldo: R$ ${contaPoupanca.getSaldo.toFixed(2)}, Juros: ${(contaPoupanca.juros * 100).toFixed(2)}%, Data de Vencimento: ${contaPoupanca.dataVencimento}`;
}
