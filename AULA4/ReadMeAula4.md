# ATIVIDADE PRÁTICA - AULA 4 - 23/03/2026
**Alunos:** Eduardo Rezende, Fernando Meira, Gabriel Bosse, Matheus Duarte, Natália Terra e Vinícius Naiser.

## Parte 1 — Identificação
Identifique todos os code smells presentes. 
Para cada um, indique: qual é o code smell, onde está (método/trecho), e por que é um problema.

### 1. God Class

A classe SistemaBiblioteca fazia tudo: gerenciava livros, gerenciava usuários, fazia empréstimos, calculava multa, etc. 
Depois de refatorado essa responsabilidade foi quebrada em várias classes especializadas, aumentando a coesão e deixando com baixo acoplamento.

Parte refatorada:

    class SistemaBiblioteca {
      constructor(
        private readonly livroService: ILivroService,
        private readonly usuarioService: IUsuarioService,
        private readonly emprestimoService: IEmprestimoService,
        private readonly notificador: INotificadorEmail,
        private readonly relatorioFactory: IRelatorioFactory,
        private readonly emailAdminProvider: IEmailAdminProvider
      ) {}
    }


### 2. Feature Envy

Os métodos manipulavam diretamente dados de outras estruturas (como arrays de livros e usuários), acessando índices e modificando valores. 
Após a refatoração, cada classe passou a ser responsável por seu próprio comportamento, respeitando o encapsulamento.

Parte refatorada:

    livro.marcarComoEmprestado();
    usuario.incrementarEmprestimos();


### 3. Long Method

Métodos como realizarEmprestimo e gerarRelatorio eram muito longos e faziam várias coisas ao mesmo tempo. 
Após a refatoração, as responsabilidades foram divididas em métodos menores e distribuídas entre diferentes classes.

Parte refatorada:

    realizarEmprestimo(requisicao: RequisicaoEmprestimo): void {
      const livro = this.livroService.buscarPorIsbn(requisicao.isbn);
      const usuario = this.usuarioService.buscarPorEmail(requisicao.email);
    
      if (!livro) throw new Error("Livro não encontrado");
      if (!usuario) throw new Error("Usuário não encontrado");
    
      this.emprestimoService.realizarEmprestimo(livro, usuario);
    }

### 4. Shotgun Surgery

Qualquer mudança (como adicionar um novo tipo de usuário) exigia alterações em vários pontos do código. 
Após a refatoração, o uso de herança e polimorfismo centralizou essas mudanças em um único local.

Parte refatorada:

    abstract class Usuario {
      abstract getLimite(): number;
    }
    
    class Professor extends Usuario {
      getLimite(): number { return 10; }
    }

### 5. Duplicate Code

Havia repetição de código, principalmente em loops e geração de relatórios. 
Após a refatoração, foram criadas classes específicas e factories para reutilização de lógica.

Parte refatorada:

    class RelatorioFactory implements IRelatorioFactory {
      criarRelatorioLivros(livros: Livro[]): Relatorio {
        return new RelatorioLivros(livros);
      }
    }


### 6. Primitive Obsession

O sistema utilizava muitos tipos primitivos como string e arrays para representar entidades complexas (livros, usuários, etc). 
Após a refatoração, foram criados objetos específicos que encapsulam esses dados.

Parte refatorada:

    class ISBN {
      constructor(private readonly valor: string) {
        if (!valor || valor.trim() === "") throw new Error("ISBN inválido");
      }
    }


### 7. Data Clumps

Certos dados (como ISBN e email) apareciam sempre juntos em vários métodos. 
Após a refatoração, esses dados foram agrupados em uma classe específica.

Parte refatorada:

    class RequisicaoEmprestimo {
      constructor(
        public readonly isbn: ISBN,
        public readonly email: Email
      ) {}
    }


### 8. Switch Statements

O código utilizava estruturas condicionais (if/else) para determinar comportamento com base no tipo de usuário. 
Após a refatoração, isso foi substituído por polimorfismo.

Parte refatorada:

    class UsuarioComum extends Usuario {
      getLimite(): number { return 3; }
    }
    
    class Funcionario extends Usuario {
      getLimite(): number { return 5; }
    }

## Parte 2 e 3 — Proposta de Refatoração
*(vide código e parte 1)*

