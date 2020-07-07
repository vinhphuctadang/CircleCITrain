FROM node:10.21
COPY . /src
RUN npm install
WORKDIR /src
CMD ["node", "index.js"]
