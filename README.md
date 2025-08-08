# 📱 Catálogo Mobile - React Native

Um aplicativo mobile desenvolvido em React Native com Expo para exibir um catálogo de produtos organizados por categoria (masculino/feminino).

## 🚀 Tecnologias Utilizadas

- **React Native** com **Expo**
- **Expo Router** para navegação
- **Redux Toolkit** para gerenciamento de estado
- **Axios** para consumo da API REST
- **TypeScript** para tipagem
- **API**: DummyJSON (https://dummyjson.com)

## 📋 Funcionalidades

### ✅ Implementadas
- **Tela de Login**: Validação de formulário e simulação de autenticação
- **Tela Principal**: Listagem de produtos com tabs (Masculino/Feminino)
- **Tela de Detalhes**: Informações completas do produto
- **Logout**: Funcionalidade para deslogar e limpar dados
- **Gerenciamento de Estado**: Redux Toolkit para dados globais
- **Tratamento de Erros**: Loading states e error handling
- **Consumo de API**: Integração com DummyJSON API via Axios

### 📱 Categorias de Produtos
**Masculinas:**
- mens-shirts (Camisas)
- mens-shoes (Sapatos)
- mens-watches (Relógios)

**Femininas:**
- womens-bags (Bolsas)
- womens-dresses (Vestidos)
- womens-jewellery (Joias)
- womens-shoes (Sapatos)
- womens-watches (Relógios)

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js 16+
- npm ou yarn
- Expo CLI
- Dispositivo móvel com Expo Go ou emulador

### Passos para executar:

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd catalogo-mobile
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Execute o projeto**
```bash
npx expo start
```

4. **Abra no dispositivo**
- Escaneie o QR Code com o app Expo Go
- Ou pressione `a` para Android emulator
- Ou pressione `i` para iOS simulator

## 📁 Estrutura do Projeto

```
catalogo-mobile/
├── app/                    # Screens com Expo Router
│   ├── _layout.tsx        # Layout principal
│   ├── index.tsx          # Tela de Login
│   ├── home.tsx           # Tela principal com tabs
│   └── product/
│       └── [id].tsx       # Tela de detalhes
├── src/
│   ├── store/             # Redux Toolkit
│   │   ├── store.ts       # Configuração da store
│   │   ├── userSlice.ts   # Slice do usuário
│   │   └── productsSlice.ts # Slice dos produtos
│   └── services/
│       └── api.ts         # Configuração Axios
├── package.json
└── README.md
```

## 🎯 Fluxo da Aplicação

1. **Login**: Usuário insere email e senha (validação local)
2. **Home**: Visualiza produtos em tabs (masculino/feminino)
3. **Detalhes**: Clica em um produto para ver informações completas
4. **Logout**: Botão para sair e voltar ao login

## 🔧 Configurações da API

A aplicação consome a API DummyJSON:
- **Base URL**: https://dummyjson.com
- **Endpoints utilizados**:
  - `GET /products/category/{categoria}` - Lista produtos por categoria
  - `GET /products/{id}` - Detalhes de um produto específico

## 🎨 Design System

### Cores Principais
- **Primária**: #4285F4 (Azul Google)
- **Erro**: #FF5252 (Vermelho)
- **Fundo**: #F5F5F5 (Cinza claro)
- **Texto**: #333 (Cinza escuro)

### Componentes
- Cards responsivos para produtos
- Tabs customizadas para categorias
- Loading states com ActivityIndicator
- Error handling com mensagens amigáveis

## 📱 Screenshots

### Tela de Login
- Campo de email com validação
- Campo de senha com validação
- Botão de login estilizado
- Design responsivo

### Tela Principal
- Header com boas-vindas e logout
- Tabs para masculino/feminino
- Grid de produtos (2 colunas)
- Preços e descontos destacados

### Tela de Detalhes
- Imagem do produto em destaque
- Informações completas (nome, marca, preço, descrição)
- Avaliação e estoque
- Botão de voltar

## 🚦 Estados da Aplicação

### Loading States
- Spinner durante carregamento dos produtos
- Loading na tela de detalhes
- Feedback visual para o usuário

### Error Handling
- Mensagens de erro amigáveis
- Retry automático em caso de falha
- Validação de formulários

## 🧪 Validações Implementadas

### Login
- Email obrigatório e formato válido
- Senha obrigatória (mínimo 6 caracteres)
- Feedback visual para erros

### Navegação
- Proteção de rotas (apenas usuários logados)
- Navegação com parâmetros
- Histórico de navegação

## 📈 Possíveis Melhorias

- [ ] Implementar cache de imagens
- [ ] Adicionar pull-to-refresh
- [ ] Implementar busca de produtos
- [ ] Adicionar filtros por preço/marca
- [ ] Implementar wishlist/favoritos
- [ ] Adicionar animações de transição
- [ ] Implementar modo escuro
- [ ] Adicionar testes unitários

## 👨‍💻 Desenvolvimento

Este projeto foi desenvolvido seguindo as boas práticas de:
- **Clean Code**: Código limpo e bem documentado
- **Componentização**: Componentes reutilizáveis
- **TypeScript**: Tipagem forte para melhor manutenibilidade
- **Redux Pattern**: Estado global organizado
- **Error Boundaries**: Tratamento de erros robusto

## 📄 Licença

Este projeto é para fins educacionais e está disponível sob a licença MIT.
