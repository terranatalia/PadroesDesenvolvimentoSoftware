export interface ProcessadorPagamento {
    processar(valor: number): void;
}