FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install ALL dependencies (including dev dependencies for runtime)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Keep all dependencies (don't prune dev dependencies)
# RUN npm prune --production

# Expose port
EXPOSE 3333

# Start command
CMD ["npm", "start"] 