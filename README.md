# Lazaros-Front

Aplicação web desenvolvida com Angular para consumo da API RESTful [Lazaros-API-Test](https://github.com/seu-usuario/Lazaros-API-Test), permitindo o gerenciamento de usuários e seus respectivos perfis de sistema.

## 🧩 Funcionalidades

- Visualização de usuários e perfis
- Criação, edição e exclusão de:
  - Perfis de Sistema
    - Campos: `id`, `descrição`
  - Usuários
    - Campos: `id`, `nome`, `perfis` (lista de perfis)
- Interface amigável com:
  - Tabelas dinâmicas e reutilizáveis
  - Modais para edição/criação
  - Validações de formulário

## 🛠️ Tecnologias Utilizadas

- Angular 17+
- TypeScript
- Angular Material
- RxJS

## ▶️ Como Rodar o Projeto Localmente

### 1. Pré-requisitos

- Node.js 18+
- Angular CLI
- Yarn ou NPM

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar a aplicação

```bash
ng serve
```

Acesse no navegador:  
[http://localhost:4200](http://localhost:4200)

## 📖 Observações

- Essa aplicação depende da [API Lazaros](https://github.com/seu-usuario/Lazaros-API-Test) para funcionar corretamente.
- Os dados são persistidos em PostgreSQL através da API.
- Certifique-se de que a API esteja rodando antes de usar o front.
