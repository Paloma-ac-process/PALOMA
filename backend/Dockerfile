FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Make the production start scripts executable
RUN chmod +x start-production.js start-server-only.js

# Build the application
RUN npm run build

# Keep all dependencies (including dev dependencies needed for runtime)
# RUN npm prune --production

# Expose port
EXPOSE 3333

# Start command
CMD ["npm", "start"] 