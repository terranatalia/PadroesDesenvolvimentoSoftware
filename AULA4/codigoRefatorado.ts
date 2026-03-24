enum StatusLivro {
  DISPONIVEL = "DISPONIVEL",
  EMPRESTADO = "EMPRESTADO"
}

class ISBN {
  constructor(private readonly valor: string) {
    if (!valor || valor.trim() === "") throw new Error("ISBN inválido");
  }

  equals(outro: ISBN): boolean {
    return this.valor === outro.valor;
  }

  toString(): string {
    return this.valor;
  }
}

class Email {
  constructor(private readonly valor: string) {
    if (!valor.includes("@")) throw new Error("Email inválido");
  }

  equals(outro: Email): boolean {
    return this.valor === outro.valor;
  }

  toString(): string {
    return this.valor;
  }
}

class RequisicaoEmprestimo {
  constructor(
    public readonly isbn: ISBN,
    public readonly email: Email
  ) {}
}

class Livro {
  private status: StatusLivro = StatusLivro.DISPONIVEL;

  constructor(
    public readonly titulo: string,
    public readonly autor: string,
    public readonly isbn: ISBN
  ) {}

  estaDisponivel(): boolean {
    return this.status === StatusLivro.DISPONIVEL;
  }

  marcarComoEmprestado(): void {
    if (!this.estaDisponivel()) throw new Error("Livro indisponível");
    this.status = StatusLivro.EMPRESTADO;
  }

  getStatus(): StatusLivro {
    return this.status;
  }
}

abstract class Usuario {
  private livrosEmprestados: number = 0;

  constructor(
    public readonly nome: string,
    public readonly email: Email
  ) {}

  abstract getLimite(): number;

  atingiuLimite(): boolean {
    return this.livrosEmprestados >= this.getLimite();
  }

  incrementarEmprestimos(): void {
    if (this.atingiuLimite()) throw new Error("Limite de empréstimos atingido");
    this.livrosEmprestados++;
  }

  getLivrosEmprestados(): number {
    return this.livrosEmprestados;
  }
}

class UsuarioComum extends Usuario {
  getLimite(): number { return 3; }
}

class Professor extends Usuario {
  getLimite(): number { return 10; }
}

class Funcionario extends Usuario {
  getLimite(): number { return 5; }
}

class Emprestimo {
  public readonly dataEmprestimo: Date;
  public ativo: boolean = true;

  constructor(public readonly requisicao: RequisicaoEmprestimo) {
    this.dataEmprestimo = new Date();
  }

  pertenceA(requisicao: RequisicaoEmprestimo): boolean {
    return (
      this.requisicao.isbn.equals(requisicao.isbn) &&
      this.requisicao.email.equals(requisicao.email) &&
      this.ativo
    );
  }
}

interface INotificadorEmail {
  enviarEmail(dest: Email, assunto: string, mensagem: string): void;
}

interface INotificadorSms {
  enviarSms(dest: string, mensagem: string): void;
}

interface ILivroService {
  adicionarLivro(livro: Livro): void;
  buscarPorIsbn(isbn: ISBN): Livro | undefined;
  listar(): Livro[];
}

interface IUsuarioService {
  cadastrar(usuario: Usuario): void;
  buscarPorEmail(email: Email): Usuario | undefined;
  listar(): Usuario[];
}

interface IEmprestimoService {
  realizarEmprestimo(livro: Livro, usuario: Usuario): void;
  listar(): Emprestimo[];
}

interface IRelatorioFactory {
  criarRelatorioLivros(livros: Livro[]): Relatorio;
  criarRelatorioUsuarios(usuarios: Usuario[]): Relatorio;
  criarRelatorioEmprestimos(emprestimos: Emprestimo[]): Relatorio;
}

interface IEmprestimoFactory {
  criar(livro: Livro, usuario: Usuario): Emprestimo;
}

interface IEmailAdminProvider {
  getEmailAdmin(): Email;
}

interface Relatorio {
  gerar(): string;
}

class EmailService implements INotificadorEmail {
  enviarEmail(dest: Email, assunto: string, mensagem: string): void {
    console.log(`[EMAIL] Para: ${dest} | ${assunto} | ${mensagem}`);
  }
}

class SmsService implements INotificadorSms {
  enviarSms(dest: string, mensagem: string): void {
    console.log(`[SMS] Para: ${dest} | ${mensagem}`);
  }
}

class EmprestimoFactory implements IEmprestimoFactory {
  criar(livro: Livro, usuario: Usuario): Emprestimo {
    return new Emprestimo(new RequisicaoEmprestimo(livro.isbn, usuario.email));
  }
}

class LivroService implements ILivroService {
  private livros: Livro[] = [];

  adicionarLivro(livro: Livro): void {
    this.livros.push(livro);
  }

  buscarPorIsbn(isbn: ISBN): Livro | undefined {
    return this.livros.find(l => l.isbn.equals(isbn));
  }

  listar(): Livro[] {
    return [...this.livros];
  }
}

class UsuarioService implements IUsuarioService {
  private usuarios: Usuario[] = [];

  cadastrar(usuario: Usuario): void {
    this.usuarios.push(usuario);
  }

  buscarPorEmail(email: Email): Usuario | undefined {
    return this.usuarios.find(u => u.email.equals(email));
  }

  listar(): Usuario[] {
    return [...this.usuarios];
  }
}

class EmprestimoService implements IEmprestimoService {
  private emprestimos: Emprestimo[] = [];

  constructor(private readonly emprestimoFactory: IEmprestimoFactory) {}

  realizarEmprestimo(livro: Livro, usuario: Usuario): void {
    livro.marcarComoEmprestado();
    usuario.incrementarEmprestimos();
    this.emprestimos.push(this.emprestimoFactory.criar(livro, usuario));
  }

  listar(): Emprestimo[] {
    return [...this.emprestimos];
  }
}

class RelatorioLivros implements Relatorio {
  constructor(private readonly livros: Livro[]) {}

  gerar(): string {
    return this.livros
      .map(l => `${l.titulo} | ${l.autor} | ${l.getStatus()}`)
      .join("\n");
  }
}

class RelatorioUsuarios implements Relatorio {
  constructor(private readonly usuarios: Usuario[]) {}

  gerar(): string {
    return this.usuarios
      .map(u => `${u.nome} | ${u.email}`)
      .join("\n");
  }
}

class RelatorioEmprestimos implements Relatorio {
  constructor(private readonly emprestimos: Emprestimo[]) {}

  gerar(): string {
    return this.emprestimos
      .map(e => `ISBN: ${e.requisicao.isbn} | Usuário: ${e.requisicao.email}`)
      .join("\n");
  }
}

class RelatorioFactory implements IRelatorioFactory {
  criarRelatorioLivros(livros: Livro[]): Relatorio {
    return new RelatorioLivros(livros);
  }

  criarRelatorioUsuarios(usuarios: Usuario[]): Relatorio {
    return new RelatorioUsuarios(usuarios);
  }

  criarRelatorioEmprestimos(emprestimos: Emprestimo[]): Relatorio {
    return new RelatorioEmprestimos(emprestimos);
  }
}

class EmailAdminProvider implements IEmailAdminProvider {
  constructor(private readonly emailAdmin: Email) {}

  getEmailAdmin(): Email {
    return this.emailAdmin;
  }
}

class SistemaBiblioteca {
  constructor(
    private readonly livroService: ILivroService,
    private readonly usuarioService: IUsuarioService,
    private readonly emprestimoService: IEmprestimoService,
    private readonly notificador: INotificadorEmail,
    private readonly relatorioFactory: IRelatorioFactory,
    private readonly emailAdminProvider: IEmailAdminProvider
  ) {}

  adicionarLivro(titulo: string, autor: string, isbn: ISBN): void {
    const livro = new Livro(titulo, autor, isbn);
    this.livroService.adicionarLivro(livro);
    this.notificador.enviarEmail(
      this.emailAdminProvider.getEmailAdmin(),
      "Novo Livro",
      `Novo livro: ${titulo}`
    );
  }

  cadastrarUsuario(usuario: Usuario): void {
    this.usuarioService.cadastrar(usuario);
    this.notificador.enviarEmail(usuario.email, "Bem-vindo", "Cadastro realizado!");
  }

  realizarEmprestimo(requisicao: RequisicaoEmprestimo): void {
    const livro = this.livroService.buscarPorIsbn(requisicao.isbn);
    const usuario = this.usuarioService.buscarPorEmail(requisicao.email);

    if (!livro) throw new Error("Livro não encontrado");
    if (!usuario) throw new Error("Usuário não encontrado");

    this.emprestimoService.realizarEmprestimo(livro, usuario);
    this.notificador.enviarEmail(
      usuario.email,
      "Empréstimo",
      `Você pegou: ${livro.titulo}`
    );
  }

  gerarRelatorioLivros(): string {
    return this.relatorioFactory
      .criarRelatorioLivros(this.livroService.listar())
      .gerar();
  }

  gerarRelatorioUsuarios(): string {
    return this.relatorioFactory
      .criarRelatorioUsuarios(this.usuarioService.listar())
      .gerar();
  }

  gerarRelatorioEmprestimos(): string {
    return this.relatorioFactory
      .criarRelatorioEmprestimos(this.emprestimoService.listar())
      .gerar();
  }
}

const sistema = new SistemaBiblioteca(
  new LivroService(),
  new UsuarioService(),
  new EmprestimoService(new EmprestimoFactory()),
  new EmailService(),
  new RelatorioFactory(),
  new EmailAdminProvider(new Email("admin@biblioteca.com"))
);

const user1 = new UsuarioComum("Matheus", new Email("matheus@email.com"));
const user2 = new Professor("Ana", new Email("ana@email.com"));

sistema.adicionarLivro("Clean Code", "Robert Martin", new ISBN("123"));
sistema.cadastrarUsuario(user1);
sistema.cadastrarUsuario(user2);

sistema.realizarEmprestimo(
  new RequisicaoEmprestimo(new ISBN("123"), new Email("matheus@email.com"))
);

console.log(sistema.gerarRelatorioLivros());