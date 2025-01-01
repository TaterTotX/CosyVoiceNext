# 构建阶段
FROM node:23-alpine3.20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# 复制所有文件，包括.env.local
COPY . .

RUN npm run build

# 运行阶段
FROM node:23-alpine3.20 AS runner

WORKDIR /app

# 复制配置文件
COPY --from=builder /app/.env.local ./.env.local
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["node", "server.js"]