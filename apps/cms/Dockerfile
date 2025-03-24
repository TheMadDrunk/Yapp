FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install SQLite for runtime support
RUN apk add --no-cache sqlite

# Copy package files
COPY . .

# Install production dependencies only
RUN npm install --production


# Set production environment
ENV NODE_ENV=production

# Expose Strapi port
EXPOSE 1337

# Start Strapi
CMD ["yarn", "start"]