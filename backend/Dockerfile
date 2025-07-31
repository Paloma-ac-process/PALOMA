FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci --production=false

# Copy source code
COPY . .

# Make the production start scripts executable
RUN chmod +x start-production.js start-server-only.js start-simple.js test-server.js

# Build the application
RUN npm run build

# Expose port
EXPOSE 3333

# Start command - use production server
CMD ["npm", "start"] 