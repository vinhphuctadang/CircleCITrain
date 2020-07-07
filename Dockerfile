FROM node:10.21
COPY . /src
WORKDIR /src
RUN npm install

CMD ["node", "index.js"]
