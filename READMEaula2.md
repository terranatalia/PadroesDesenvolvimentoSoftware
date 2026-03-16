ATIVIDADE PRÁTICA AULA 2 - PADRÕES DE DESENVOLVIMENTO DE SOFTWARE - INSTRUÇÕES

**Parte 1 — Análise (vide PDF)**

**Parte 2 — Refatoração**
1. Aplique o SRP: separe cada responsabilidade em sua própria classe
Aplique o OCP no cálculo de imposto: crie uma interface CalculoImposto e
implemente ImpostoEletronico, ImpostoAlimento, ImpostoVestuario.

2. Aplique o OCP no pagamento: crie uma interface ProcessadorPagamento e
implemente PagamentoCartao, PagamentoBoleto, PagamentoPix.

3. Crie uma classe PedidoService que orquestra o fluxo completo.

**Parte 3 — Extensão**
1. Adicione produto LIVRO com imposto de 0% sem modificar nenhuma
classe existente.

2. Adicione pagamento CRIPTOMOEDA sem modificar nenhuma classe
existente.
