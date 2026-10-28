# ETAPA 1: preparar las dependencias
FROM node:22-alpine3.23 AS deps

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev


# ETAPA 2: ejecutar la aplicación
FROM alpine:3.23

RUN apk add --no-cache libstdc++

RUN addgroup -S node && adduser -S -G node node

WORKDIR /app

COPY --from=deps --chown=node:node /usr/local/bin/node /usr/local/bin/node

COPY --from=deps --chown=node:node /app/node_modules ./node_modules

COPY --chown=node:node server.js app.js ./

ENV NODE_ENV=production

USER node

EXPOSE 3000

CMD ["node", "server.js"]