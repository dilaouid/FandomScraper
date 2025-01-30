FROM node:20-slim as builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./

# Install ALL dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build
RUN pnpm build
# Vérifier que le build a bien été créé
RUN ls -la dist/

# Production image
FROM node:20-slim

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod --frozen-lockfile

# Copy built files
COPY --from=builder /app/dist ./dist
# Vérifier que les fichiers sont bien copiés
RUN ls -la dist/

# Expose port
EXPOSE 3000

# Start avec le chemin complet et le type module
CMD ["node", "--experimental-specifier-resolution=node", "dist/app.js"]