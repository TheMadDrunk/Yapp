FROM node:20-alpine AS development-dependencies-env
# Copy the root workspace files
COPY ../../package.json ../../yarn.lock /app/
COPY ../../.yarnrc.yml /app/.yarnrc.yml
# Copy the web app package.json
COPY ./package.json /app/apps/web/
WORKDIR /app
RUN yarn install

FROM node:20-alpine AS production-dependencies-env
# Copy the root workspace files
COPY ../../package.json ../../yarn.lock /app/
COPY ../../.yarnrc.yml /app/.yarnrc.yml
# Copy the web app package.json
COPY ./package.json /app/apps/web/
WORKDIR /app
RUN yarn workspaces focus @yapp/web --production

FROM node:20-alpine AS build-env
# Copy all source files
COPY ../../ /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN yarn workspace @yapp/web build

FROM node:20-alpine
# Copy the root workspace files
COPY ../../package.json ../../yarn.lock /app/
COPY ../../.yarnrc.yml /app/.yarnrc.yml
# Copy the web app package.json
COPY ./package.json /app/apps/web/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/apps/web/build /app/apps/web/build
WORKDIR /app/apps/web

# Create a default .env file if none exists
COPY .env.example /app/apps/web/.env.example
RUN cp /app/apps/web/.env.example /app/apps/web/.env

# Make the entrypoint script that will handle env vars
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["yarn", "start"]