FROM node:latest

WORKDIR /app

COPY package* /app/

RUN npm install

COPY app.js /app/

ENV PORT=3000

EXPOSE 3000

#ENTRYPOINT ["node", "app.js"]

CMD npm start