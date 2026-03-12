import { ProcessadorPagamento } from '../interface/ProcessadorPagamento';

export class PagamentoCartao implements ProcessadorPagamento {
    processar(valor: number): void { console.log(`Cartão: R$ ${valor}`); }
}

export class PagamentoBoleto implements ProcessadorPagamento {
    processar(valor: number): void { console.log(`Boleto: R$ ${valor}`); }
}

export class PagamentoPix implements ProcessadorPagamento {
    processar(valor: number): void { console.log(`PIX: R$ ${valor}`); }
}

export class PagamentoCripto implements ProcessadorPagamento {
    processar(valor: number): void { console.log(`Cripto: R$ ${valor}`); }
}