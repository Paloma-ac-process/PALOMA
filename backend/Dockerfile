FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built application from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/start ./start
COPY --from=builder /app/ace ./ace
COPY --from=builder /app/adonisrc.ts ./
COPY --from=builder /app/tsconfig.json ./

# Expose port
EXPOSE 3333

# Start command
CMD ["npm", "start"] 