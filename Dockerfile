# Usar a imagem oficial e estável do Node.js v20
FROM node:20-slim

# Criar e definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json para o diretório de trabalho
COPY package.json .

# Rodar o comando para instalar as dependências
RUN npm install

# Copiar o resto do código da sua aplicação
COPY . .

# Definir o comando para iniciar a aplicação
CMD ["node", "index.js"]
