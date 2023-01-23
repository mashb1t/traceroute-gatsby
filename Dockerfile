FROM node:18-alpine as builder

WORKDIR /app

RUN apk add g++ make py3-pip

COPY package.json .
RUN npm install
COPY . .
RUN ["npm", "run", "build"]

FROM nginx
EXPOSE 80
COPY --from=builder /app/public /usr/share/nginx/html