/* Parte 1 - Identificar Violações: Para cada princípio (LSP, ISP, DIP), liste:
1. Qual trecho do código viola o princípio  */

/* LSP */

interface Funcionario {
trabalhar(): void;
registrarPonto(): void;
receberSalario(): void;
gerenciarEquipe(): void;
escreverCodigo(): void;
}

/* ISP */

escreverCodigo(): void {
throw new Error("Gerente não escreve código");
}
gerenciarEquipe(): void {
throw new Error("Dev não gerencia equipe");
}
receberSalario(): void {
throw new Error("Estagiário recebe bolsa, não salário");
}
gerenciarEquipe(): void {
throw new Error("Estagiário não gerencia");

}

/* DIP */

interface Funcionario {
gerenciarEquipe(): void;
escreverCodigo(): void;
}

/* Exercícios 2 e 3 da parte 1, texto via GitHub*/ 