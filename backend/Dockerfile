FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies)
RUN npm ci --production=false

# Copy source code
COPY . .

# Make the test server executable
RUN chmod +x test-server.js

# Expose port
EXPOSE 3333

# Start command - use test server for now to debug
CMD ["npm", "run", "start:test"] 