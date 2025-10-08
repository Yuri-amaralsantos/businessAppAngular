# Sistema de Controle de Estoque e Movimentações

Um sistema desenvolvido em Angular 20 utilizando Angular Material e Chart.js para gerenciamento de produtos, estoque e movimentações de um negócio.

## Demonstração:
[site](https://business-app-angular.vercel.app/home)

## Funcionalidades

Dashboard resumido: Cards com total de produtos, itens em estoque e movimentações.

Gráficos interativos: Estoque por produto e Movimentações (Entradas x Saídas)

Cadastro de produtos: Adição, edição e remoção de produtos.

Controle de estoque: Visualização de quantidade disponível de cada produto.

Movimentações: Registro de entradas e saídas, com quantidade, preço unitário e observações.

Filtragem e pesquisa: Busca por produto, tipo ou observação nas movimentações.

Paginação: Para tabelas grandes, utilizando MatPaginator.

## Tecnologias Utilizadas

Angular 20 (Standalone Components)

Angular Material (componentes UI modernos)

Chart.js / ng2-charts (gráficos dinâmicos)

TypeScript

CSS / Flexbox para layout e responsividade

## Estrutura do Projeto

product-list: Tela de produtos com pesquisa, adição, edição e exclusão.

movement-list: Tela de movimentações com filtros e registro de entradas/saídas.

dashboard: Cards resumidos e gráficos para análise rápida do estoque.

services/product.service.ts: Gerencia produtos usando signal do Angular.

services/movement.service.ts: Gerencia movimentações e cálculos de estoque.

## Cadastro de Produto / Movimentação

Utiliza dialogs (MatDialog) com forms reativos / template-driven

Campos com validação obrigatória

Input com máscara de moeda (currencyMask)

Hints e placeholders para melhorar UX

## Instalação

### Clone o repositório

git clone <repo-url>
cd nome-do-projeto

### Instale as dependências

npm install

### Execute o projeto

ng serve

### O sistema estará disponível em http://localhost:4200.

Observações

Todas as tabelas possuem paginador e ordenação.

A filtragem é dinâmica e considera nome, categoria, tipo e observações.

O layout é totalmente responsivo usando Flexbox e Angular Material.

Gráficos são dinâmicos e atualizam conforme produtos e movimentações são alterados.
