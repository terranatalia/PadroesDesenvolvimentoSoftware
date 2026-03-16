/* PARTES 2 E 3: ABSTRAÇÕES, IMPLEMENTAÇÕES E NOVO TIPO (FREELANCER) */

/* ABSTRAÇÕES (ISP & DIP) */

interface Funcionario {
    trabalhar(): void;
}

interface Programavel {
    escreverCodigo(): void;
}

interface Gerenciavel {
    gerenciarEquipe(): void;
}

interface Pontuavel {
    registrarPonto(): void;
}

interface Remuneravel {
    receberPagamento(): void;
}

/* IMPLEMENTAÇÕES (LSP) */

class Gerente implements Funcionario, Pontuavel, Remuneravel, Gerenciavel {
    trabalhar() { console.log("Gerente planejando..."); }
    registrarPonto() { console.log("Ponto de gerente batido."); }
    receberPagamento() { console.log("Salário de gerente recebido."); }
    gerenciarEquipe() { console.log("Gerenciando o time."); }
}

class Desenvolvedor implements Funcionario, Pontuavel, Remuneravel, Programavel {
    trabalhar() { console.log("Dev codando..."); }
    registrarPonto() { console.log("Ponto de dev batido."); }
    receberPagamento() { console.log("Salário de dev recebido."); }
    escreverCodigo() { console.log("Escrevendo código limpo."); }
}

class Estagiario implements Funcionario, Pontuavel, Programavel {
    trabalhar() { console.log("Estagiário aprendendo..."); }
    registrarPonto() { console.log("Ponto de estagiário batido."); }

    escreverCodigo() { console.log("Escrevendo código com auxílio."); }
}

/* NOVO TIPO: FREELANCER (Parte 3)*/

class Freelancer implements Funcionario, Programavel {
    trabalhar() { console.log("Freelancer iniciando projeto..."); }
    escreverCodigo() { console.log("Codando para o cliente."); }
}

/*SISTEMA DE ALTO NÍVEL (DIP)*/

class SistemaRH {
    constructor(private funcionario: Funcionario) {}

    executarJornada() {
        this.funcionario.trabalhar();
    }
}

/*USO*/
const dev = new Desenvolvedor();
const free = new Freelancer();

const rh1 = new SistemaRH(dev);
const rh2 = new SistemaRH(free);

rh1.executarJornada();
rh2.executarJornada();