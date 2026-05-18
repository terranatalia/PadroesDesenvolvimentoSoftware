interface DescontoStrategy {
  calcularDesconto(valorCompra: number): number;
}

class DescontoVIP implements DescontoStrategy {
  calcularDesconto(valorCompra: number): number {
    const desconto = valorCompra * 0.20;
    const freteGratis = 15;

    return desconto + freteGratis;
  }
}

class DescontoClienteNovo implements DescontoStrategy {
  calcularDesconto(valorCompra: number): number {
    return valorCompra * 0.10;
  }
}

class DescontoFuncionario implements DescontoStrategy {
  calcularDesconto(valorCompra: number): number {
    const desconto = valorCompra * 0.30;

    if (desconto > 100) {
      return 100;
    }

    return desconto;
  }
}

class DescontoBlackFriday implements DescontoStrategy {
  calcularDesconto(valorCompra: number): number {
    return valorCompra * 0.50;
  }
}

class Carrinho {
  constructor(private estrategiaDesconto: DescontoStrategy) {}

  calcularValorFinal(valorCompra: number): void {
    const desconto = this.estrategiaDesconto.calcularDesconto(valorCompra);
    const valorFinal = valorCompra - desconto;

    console.log(`Valor da compra: R$ ${valorCompra.toFixed(2)}`);
    console.log(`Desconto aplicado: R$ ${desconto.toFixed(2)}`);
    console.log(`Valor final: R$ ${valorFinal.toFixed(2)}`);
    console.log("-----------------------------");
  }
}


const valorCompra = 500;

console.log("Cliente VIP");
const carrinhoVIP = new Carrinho(new DescontoVIP());
carrinhoVIP.calcularValorFinal(valorCompra);

console.log("Cliente Novo");
const carrinhoClienteNovo = new Carrinho(new DescontoClienteNovo());
carrinhoClienteNovo.calcularValorFinal(valorCompra);

console.log("Cliente Funcionário");
const carrinhoFuncionario = new Carrinho(new DescontoFuncionario());
carrinhoFuncionario.calcularValorFinal(valorCompra);

console.log("Black Friday");
const carrinhoBlackFriday = new Carrinho(new DescontoBlackFriday());
carrinhoBlackFriday.calcularValorFinal(valorCompra);