import { PedidoService } from './services/PedidoService';
import { ImpostoEletronico, ImpostoAlimento, ImpostoVestuario, ImpostoLivro } from './services/ImpostoService';
import { PagamentoPix, PagamentoCartao, PagamentoBoleto, PagamentoCripto } from './services/PagamentoService';

const pedidoService = new PedidoService();


pedidoService.processar(1000, 1, new ImpostoEletronico(), new PagamentoPix(), "fernandinho_x@email.com");
pedidoService.processar(50, 2, new ImpostoAlimento(), new PagamentoCartao(), "cliente2@email.com");
pedidoService.processar(2000, 4, new ImpostoVestuario(), new PagamentoBoleto(), "cliente3@email.com");
pedidoService.processar(100, 1, new ImpostoLivro(), new PagamentoPix(), "cliente4@email.com");
pedidoService.processar(755, 3, new ImpostoLivro(), new PagamentoCripto(), "cliente5@email.com");