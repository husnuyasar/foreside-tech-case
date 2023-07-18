FROM node:latest

WORKDIR /app/beer_service/
COPY package*.json ./
COPY start.sh .
RUN npm install
COPY . .
EXPOSE 3002

CMD ["./start.sh"]