# 多阶段构建：Next.js 静态导出 → nginx 托管
FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# 部署到域名根路径时无需 BASE_PATH；子路径部署构建时注入
# docker build --build-arg BASE_PATH=/your-path
ARG BASE_PATH=""
ARG SITE_URL="https://example.com"
ENV MIAODA_CLIENT_BASE_PATH=$BASE_PATH
ENV NEXT_PUBLIC_SITE_URL=$SITE_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
