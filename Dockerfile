# syntax=docker/dockerfile:1

# ---------- base ----------
FROM node:20-alpine AS base
WORKDIR /app
# dumb-init makes node PID 1 signal-safe (clean SIGTERM on `docker stop`)
RUN apk add --no-cache dumb-init

# ---------- production dependencies ----------
FROM base AS deps
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---------- development (hot reload, full deps incl. sequelize-cli) ----------
FROM base AS development
ENV NODE_ENV=development
COPY package*.json ./
# nodemon is not in package.json, so install it here instead of pulling it at runtime
RUN npm ci && npm install -g nodemon@3
COPY . .
EXPOSE 3000
CMD ["dumb-init", "--", "nodemon", "src/index.js"]

# ---------- migrations / seeders (needs sequelize-cli from devDependencies) ----------
FROM development AS migrate
CMD ["dumb-init", "--", "npx", "sequelize-cli", "db:migrate"]

# ---------- production ----------
FROM base AS production
ENV NODE_ENV=production \
    PORT=3000

COPY --from=deps --chown=node:node /app/node_modules ./node_modules
COPY --chown=node:node . .

USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)+'/api/v1/info').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/index.js"]
