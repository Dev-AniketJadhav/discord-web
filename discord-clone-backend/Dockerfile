FROM node:18.14.2

WORKDIR /

COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

COPY . . 

ENV PORT=5002
ENV MONGO_URI=mongodb+srv://admin:admin123@cluster0.5jryzak.mongodb.net/discord?retryWrites=true&w=majorit

EXPOSE 5002

CMD ["npm", "start"]

