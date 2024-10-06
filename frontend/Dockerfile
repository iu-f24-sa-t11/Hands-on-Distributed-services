FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DOMAIN

RUN sed -i "s/{domain-here}/$DOMAIN/g" ./src/config.ts

RUN npm run build

FROM nginx

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
