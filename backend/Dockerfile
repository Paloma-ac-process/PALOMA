FROM node:20-alpine

WORKDIR /app

# Install ts-node globally
RUN npm install -g ts-node

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci --production=false

# Copy source code
COPY . .

# Make the production start scripts executable
RUN chmod +x start-production.js start-server-only.js start-simple.js start-simple-adonis.js test-server.js

# Build the application (skip for now to debug)
# RUN npm run build

# Expose port
EXPOSE 3333

# Start command - use simple AdonisJS server
CMD ["npm", "run", "start:simple-adonis"] 