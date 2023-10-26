FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY dist/ dist/

COPY .env ./

USER node

CMD ["npm", "start"]

EXPOSE 9000
