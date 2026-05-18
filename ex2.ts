interface Observer {
  notificar(produto: string, quantidade: number): void;
}

interface Subject {
  inscrever(o: Observer): void;
  desinscrever(o: Observer): void;
  notificarTodos(): void;
}

class Produto implements Subject {
  private observers: Observer[] = [];

  constructor(
    private nome: string,
    private quantidade: number
  ) {}

  inscrever(o: Observer): void {
    this.observers.push(o);
  }

  desinscrever(o: Observer): void {
    this.observers = this.observers.filter(observer => observer !== o);
  }

  notificarTodos(): void {
    for (const observer of this.observers) {
      observer.notificar(this.nome, this.quantidade);
    }
  }

  reporEstoque(quantidade: number): void {
    this.quantidade += quantidade;
    console.log(`\nEstoque reposto: ${this.nome} agora possui ${this.quantidade} unidades.`);
    this.notificarTodos();
  }
}

class NotificacaoEmail implements Observer {
  notificar(produto: string, quantidade: number): void {
    console.log(`[EMAIL] Produto disponível: ${produto} | Quantidade: ${quantidade}`);
  }
}

class NotificacaoSMS implements Observer {
  notificar(produto: string, quantidade: number): void {
    console.log(`[SMS] Produto disponível: ${produto} | Quantidade: ${quantidade}`);
  }
}

class NotificacaoPush implements Observer {
  notificar(produto: string, quantidade: number): void {
    console.log(`[PUSH] Produto disponível: ${produto} | Quantidade: ${quantidade}`);
  }
}

// Desafio extra
class NotificacaoWhatsApp implements Observer {
  notificar(produto: string, quantidade: number): void {
    console.log(`[WHATSAPP] Produto disponível: ${produto} | Quantidade: ${quantidade}`);
  }
}

// Programa principal
const produto = new Produto("PlayStation 5", 0);

const email = new NotificacaoEmail();
const sms = new NotificacaoSMS();
const push = new NotificacaoPush();
const whatsapp = new NotificacaoWhatsApp();

produto.inscrever(email);
produto.inscrever(sms);
produto.inscrever(push);
produto.inscrever(whatsapp);

produto.reporEstoque(20);

produto.desinscrever(sms);

produto.reporEstoque(10);