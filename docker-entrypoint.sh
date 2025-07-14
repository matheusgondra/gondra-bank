#!/bin/sh

echo "Aplicando migrações Prisma..."

pnpm dlx prisma migrate deploy
echo "Migrações aplicadas com sucesso."

echo "Executando seed de dados..."
node dist/src/seed.js
echo "Seed concluído."

echo "Iniciando a aplicação..."
pnpm start