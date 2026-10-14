# ---- Build Stage ----
FROM node:22-alpine AS builder

WORKDIR /app

# Install OpenSSL (required by Prisma)
RUN apk add --no-cache openssl

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

COPY prisma ./prisma/
RUN pnpm exec prisma generate

COPY . .
RUN pnpm run build

# Isolated Prisma CLI install so the runner image gets its full dependency closure
RUN npm install --prefix /prisma-cli --no-save "prisma@$(node -p 'require("/app/node_modules/prisma/package.json").version')" dotenv

# ---- Production Stage ----
FROM node:22-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl && \
    addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /prisma-cli /prisma-cli

# Set correct permissions for standalone output
RUN mkdir -p /app/.next
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

RUN rm -rf /app/node_modules/prisma /app/node_modules/dotenv && \
    ln -sf /prisma-cli/node_modules/.bin/prisma /usr/local/bin/prisma && \
    ln -sfn /prisma-cli/node_modules/prisma /app/node_modules/prisma && \
    ln -sfn /prisma-cli/node_modules/dotenv /app/node_modules/dotenv

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

CMD ["node", "server.js"]
