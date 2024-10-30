function abrirCurso() {
    const selecaoCurso = document.getElementById("selecao-curso").value;

    if (selecaoCurso) {
        /* Bloco de confirmação antes de abrir o Pop Up
        const confirmar = confirm("Deseja abrir informações sobre o curso selecionado?");
        if (confirmar)
        */
        
        {


            let conteudo = "";

            if (selecaoCurso === "ADS") {
                conteudo = "<h2>Análise e Desenvolvimento de Sistemas</h2><p>O tecnólogo em Análise e Desenvolvimento de Sistemas analisa, projeta, documenta, especifica, testa, implanta e mantém sistemas computacionais de informação...</p><p>Coordenação: Profº Me. Antonio Cesar de Barros Munari<br>Email: f003.ads@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "Fabricacao") {
                conteudo = "<h2>Fabricação Mecânica</h2><p>O tecnólogo em Fabricação Mecânica atua no segmento de fabricação, envolvendo usinagem, conformação, soldagem, montagem e outros processos mecânicos...</p><p>Coordenação: Profº Me. Amilton Cordeiro de Freitas<br>Email: f003fmec@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "GestaoEmp") {
                conteudo = "<h2>Gestão Empresarial - Ensino a Distância</h2><p>O Tecnólogo em Gestão Empresarial elabora e implementa planos de negócios, utilizando métodos e técnicas de gestão...</p>";
            } else if (selecaoCurso === "Qualidade") {
                conteudo = "<h2>Gestão da Qualidade</h2><p>O Tecnólogo em Gestão da Qualidade será um profissional que planeja, implementa e audita sistemas de gestão da qualidade...</p><p>Coordenação: Profº Dr. Délvio Venanzi<br>Email: f003.qualidade@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "Logistica") {
                conteudo = "<h2>Logística</h2><p>O tecnólogo em Logística é o profissional especializado em armazenagem, distribuição e transporte...</p><p>Coordenação: Prof Me. Marcos Lopes<br>Email: f003.logistica@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "Manufatura") {
                conteudo = "<h2>Manufatura Avançada</h2><p>O aluno aprenderá a transformar ambientes de manufatura convencional em ambientes mais tecnológicos...</p><p>Coordenação: Prof. Me. Samuel Mendes Franco<br>Email: f003.mava@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "Metalurgia") {
                conteudo = "<h2>Processos Metalúrgicos</h2><p>O tecnólogo em Processos Metalúrgicos utiliza os fenômenos envolvidos em processos como: tratamentos térmicos, fundição...</p><p>Coordenação: Prof. Me. Igor Pereira Franco<br>Email: f003.metal@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "Polimeros") {
                conteudo = "<h2>Polímeros</h2><p>Esse profissional trabalha na fabricação dos Polímeros, compostos químicos utilizados na fabricação de produtos como o plástico...</p><p>Coordenação: Profª Ma. Cécile Chaves Hernandez Garcia<br>Email: f003.polimeros@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "ProjetosMecanicos") {
                conteudo = "<h2>Projetos Mecânicos</h2><p>O tecnólogo em Projetos Mecânicos está habilitado a realizar projetos, com detalhamento técnico de sistemas mecânicos...</p><p>Coordenação: Prof. Dr. José Carlos Moura<br>Email: f003.pmec@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "Biomedicos") {
                conteudo = "<h2>Sistemas Biomédicos</h2><p>O tecnólogo em Sistemas Biomédicos é responsável por planejar, gerenciar, implantar e manter equipamentos clínicos e médico-hospitalares...</p><p>Coordenação: Profª Me. Joseli Vergara Marins<br>Email: f003.biomedicos@fatec.sp.gov.br</p>";
            } else if (selecaoCurso === "Automotiva") {
                conteudo = "<h2>Eletrônica Automotiva</h2><p>O tecnólogo em Eletrônica Automotiva participa de equipes de desenvolvimento de novos produtos, novas tecnologias e subsistemas na área automotiva...</p><p>Coordenação: Prof. Me. Fernando César Miranda<br>Email: f003.automotiva@fatec.sp.gov.br</p>";
            }

            const novaJanela = window.open("", "_blank", "width=600,height=300");
            novaJanela.document.write("<html><head><title>Informações do Curso</title></head><body>" + conteudo + "</body></html>");
        }
    }
}