FROM node:20-alpine

# Install dependencies required for building SQLite
RUN apk add --no-cache build-base python3 sqlite

# Create app directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy source files
COPY . .

# Build Strapi
RUN yarn build

# Expose the port Strapi runs on
EXPOSE 1337

# Start Strapi
CMD ["yarn", "start"] 