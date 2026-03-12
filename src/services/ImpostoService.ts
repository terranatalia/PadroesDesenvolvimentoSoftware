import { CalculoImposto } from '../interface/CalculoImposto';

export class ImpostoEletronico implements CalculoImposto {
    calcular(preco: number, qtd: number): number { return (preco * qtd) * 0.15; }
}

export class ImpostoAlimento implements CalculoImposto {
    calcular(preco: number, qtd: number): number { return (preco * qtd) * 0.05; }
}

export class ImpostoVestuario implements CalculoImposto {
    calcular(preco: number, qtd: number): number { return (preco * qtd) * 0.10; }
}

export class ImpostoLivro implements CalculoImposto {
    calcular(preco: number, qtd: number): number { return (preco * qtd); }
}