import { CalculoImposto } from '../interface/CalculoImposto';
import { ProcessadorPagamento } from '../interface/ProcessadorPagamento';
import { EmailService } from './EmailService';

export class PedidoService {
    private emailService = new EmailService();

    processar(preco: number, qtd: number, imposto: CalculoImposto, pagamento: ProcessadorPagamento, destinatario: string): void {
        const subtotal = preco * qtd;
        const valorImposto = imposto.calcular(preco, qtd);
        const total = subtotal + valorImposto;

        pagamento.processar(total);
        const mensagem = `O pedido no valor de R$ ${total} foi processado com sucesso!`;
        this.emailService.enviar(mensagem, destinatario);
    }
}       