Artesanatos da Vovó - E-commerce Premium

Projeto desenvolvido como Tarefa Pré-Avaliação para a disciplina de Projeto Integrador IV.

Desenvolvedor
Enzo Almeida Cortes Villar - Full Stack Developer

Resumo do Projeto
O Artesanatos da Vovó é uma solução de e-commerce focada no mercado de nicho de artesanato de luxo. A aplicação permite a navegação por categorias, visualização detalhada de produtos e um sistema de carrinho de compras persistente integrado ao banco de dados.

Dimensão Técnica (Tecnologias)
- Framework: Next.js 14+ (App Router)
- Estilização: Tailwind CSS (Foco em UI/UX Premium)
- Banco de Dados & Auth: Supabase (PostgreSQL)
- Ícones: Lucide React
- Linguagem: TypeScript

Organização do Projeto

A estrutura de ficheiros foi organizada seguindo as boas práticas do Next.js (App Router):

* `app/`: Contém as rotas principais da aplicação (ex: `/carrinho`, `/checkout`, `/login`, `/produto/[id]`).
* `actions/`: Ficheiros dedicados aos Server Actions (`auth.ts` e `cart.ts`), responsáveis pela comunicação segura com a base de dados sem expor chaves no cliente.
* `components/`: Componentes reutilizáveis de UI (ex: Header, Footer, Cards de Produtos).
* `lib/`: Configurações de clientes do Supabase (`supabase.server.ts` e `supabase.client.ts`).

Estrutura da Base de Dados (Supabase/PostgreSQL)

O sistema utiliza um modelo relacional simples e eficiente:

1.  **Tabela `produtos`**: Armazena o catálogo.
    * Colunas: `id_produtos` (PK), `nome`, `descricao`, `preco`, `imagem_url`, `categoria`, `estoque`.
2.  **Tabela `carrinho`**: Gere os itens adicionados pelos utilizadores de forma persistente.
    * Colunas: `id_carrinho` (PK), `usuario_id` (FK - ligado à Autenticação), `produto_id` (FK - ligado a produtos), `quantidade`.


Como executar
1. `npm install`
2. Configure as chaves do Supabase no `.env.local`
3. `npm run dev`
