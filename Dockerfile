FROM imbios/bun-node:1.2.19-20-slim AS base
WORKDIR /usr/src/app

FROM base AS deps
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun ci

FROM base AS builder
COPY --from=deps /temp/dev/node_modules node_modules
COPY . .

RUN bun run build

FROM nginx:1.29.0-alpine AS runner
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
COPY env.sh /env.sh
RUN chmod +x /env.sh
CMD [ "/env.sh" ]
