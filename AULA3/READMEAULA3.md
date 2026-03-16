# ATIVIDADE PRÁTICA - AULA 3 - 16/03/2026
**Alunos:** Fernando Meira, Gabriel Bosse, Matheus Duarte, Natália Terra.

### Parte 1 - Identificar Violações: Para cada princípio (LSP, ISP, DIP), liste:

1.  Qual trecho do código viola o princípio
2. Por que é uma violação
3. Qual o impacto no sistema

### Parte 2 - Refatorar o Código: Reescreva o sistema aplicando:

1. ISP: Crie interfaces segregadas (ex: Gerenciavel, Programavel, Assalariado, etc.)
2. LSP: Garanta que nenhuma classe precise lançar Error
3. DIP: Crie uma classe SistemaRH que dependa de abstrações e receba dependências via construtor

### Parte 3 - Adicionar novo tipo: Após a refatoração, adicione a classe Freelancer:

- Trabalha e escreve código
- Não registra ponto
- Não recebe salário fixo (recebe por projeto)
- Não gerencia equipe

## **RESPOSTAS PARTE 1**

**1. *(vide arquivo parte1.ts)***

**2. Por que é uma violação**

O ISP diz que: uma classe não deve ser obrigada a implementar métodos que não usa.
No exemplo, Gerente é obrigado a implementar "escreverCodigo()" mesmo não sendo uma função dele. 
Assim como da mesma maneira Desenvolvedor é obrigado a implementar "gerenciarEquipe()" e Estagiário é obrigado a implementar "receberSalario()"  métodos os quais não fazem parte da responsabilidade dessas classes, então elas implementam métodos inúteis que lançam erro.
A LSP diz que: Objetos de uma classe filha devem poder substituir objetos da classe pai sem quebrar o comportamento do programa. 
Se algo é declarado funcionário, qualquer tipo de funcionário deve funcionar ali, ao criar uma abstração que todo funcionário consegue executar tais métodos, o problema surge quando a classe segregada estagiário é incapaz de receber salário, já que estagiário recebe bolsa.
O DIP diz: Módulos de alto nível não devem depender de módulos de baixo nível, ambos devem depender de abstrações. 
A interface Funcionário mistura muitas responsabilidades concretas, como Programar, Gerenciar, Receber salário ou Registrar ponto. 
Ou seja, qualquer sistema que dependa de Funcionário acaba dependendo indiretamente de comportamentos específicos. 
Como o acoplamento que todo funcionário recebe salário, mas nem todo funcionário recebe salário. 
Ou seja o módulo de pagamento depende de uma abstração mal definida.

**3. Qual o impacto no sistema**

A violação do Interface Segregation Principle (ISP), mencionada no exemplo acima, causa vários impactos negativos no sistema. 
Dentre eles estão: uma maior chance de erro em tempo de execução, quebra de contrato da  interface, baixa coesão, dificuldade de manutenção, e torna o código mais difícil de ser reutilizado.
A violação do Laskov Substitution Principle (LSP), mencionada no segundo exemplo, faz com que ocorra quebras do comportamento esperado do sistema, 
além de também causar uma necessidade de condicionais para tratar subclasses, 
perda da confiabilidade da abstração, fragilidade da arquitetura, e bugs se tornam mais difíceis de identificar.
Por fim, a violação do Dependancy Inversion Principle (DIP), que diz que módulos de alto nível não devem depender de módulos de baixo nível, causa impactos como: alto acoplamento entre módulos, dificuldade de evoluir o sistema, interfaces pouco reutilizáveis, uma maior propagação de erros no sistema, e uma arquitetura menos modular.
