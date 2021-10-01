FROM node:latest

WORKDIR /app

COPY package* /app/

RUN npm install

COPY index.js /app/

ENV PORT=3000

EXPOSE $PORT

ENTRYPOINT ["node", "app.js"]

#CMD npm start