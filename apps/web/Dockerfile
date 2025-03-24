FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json ./
RUN yarn install --production

# Copy the pre-built application (built outside Docker)
COPY ./build ./build

# Set production environment
ENV NODE_ENV=production

# Expose the port
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]