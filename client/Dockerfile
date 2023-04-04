# Use uma imagem de Node.js como base
FROM node:18-alpine

# Cria um diretório de trabalho para a aplicação
WORKDIR /app

# Copia o arquivo `package.json` e `yarn.lock` para o container
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o conteúdo do projeto para o container
COPY . .

# Expõe a porta 3000, que é a porta padrão usada pelo React
EXPOSE 3000

# Inicia o servidor de desenvolvimento quando o container é executado
CMD ["npm", "start"]
