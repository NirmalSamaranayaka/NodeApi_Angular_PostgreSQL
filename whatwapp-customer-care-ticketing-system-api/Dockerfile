FROM node:22-alpine AS node
RUN mkdir -p /app
WORKDIR /app

FROM node AS build
COPY package.json package-lock.json /app/
RUN npm ci
COPY . /app/
RUN npm run build

FROM node AS final
ENV NODE_ENV production
COPY package.json package-lock.json /app/
RUN npm ci --production
COPY --from=build /app/migrations /migrations/
COPY --from=build /app/dist /app/
COPY --from=build /app/src/seed/data.json /app/seed/data.json

EXPOSE 8000
CMD [ "node", "/app/index.js" ]
