FROM node:22-alpine AS builder

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm build

RUN pnpm prune --prod --ignore-scripts

FROM node:22-alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

COPY --from=builder node_modules ./node_modules
COPY --from=builder dist ./dist
COPY --from=builder package.json ./package.json
COPY --from=builder pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder generated ./generated
COPY --from=builder prisma ./prisma
COPY --from=builder users-mock.json ./dist/users-mock.json
COPY --from=builder docker-entrypoint.sh ./docker-entrypoint.sh
COPY --from=builder public ./public

RUN chmod +x ./docker-entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["./docker-entrypoint.sh"]