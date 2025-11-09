FROM node:24-slim

WORKDIR /app

# copy package metadata first for caching
COPY package.json package-lock.json* ./

# install deps
RUN npm ci --quiet

# copy rest of the repo
COPY . .

ENV PORT=8080
EXPOSE 8080

# run using local tsx binary
CMD ["npx", "tsx", "main.ts"]
