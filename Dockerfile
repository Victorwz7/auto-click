# Usar a imagem oficial do Puppeteer que já vem com o Chrome
FROM ghcr.io/puppeteer/puppeteer:22.10.0

# Mudar para o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de definição do projeto
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o resto do código
COPY . .

# Definir o comando para iniciar o script
CMD ["node", "index.js"]
