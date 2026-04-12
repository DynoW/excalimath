FROM node:20-alpine AS builder

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install dependencies (workspaces will be linked automatically)
RUN npm install

# Build the core package and the demo app
RUN npm run build

# Use Nginx to serve the static built files
FROM nginx:alpine

# Copy the built app from the builder stage
COPY --from=builder /app/apps/demo/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
