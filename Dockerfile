FROM node:20-alpine AS build

ENV PORT=3000

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./


ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "dist/main"]