FROM node:17

WORKDIR /

COPY package*.json ./

RUN npm install

RUN npm install neo4j-driver 

RUN npm install @babel/core @babel/node @babel/preset-env dotenv

RUN npm install express nanoid bcrypt nanode

RUN npm install -g nodemon

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]
