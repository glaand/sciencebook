ARG NODE_VERSION=18.14.2

FROM node:${NODE_VERSION}-slim as base

ENV NODE_ENV=development

WORKDIR /src/frontend

# Build
FROM base as build

COPY --link frontend/package.json frontend/yarn.lock .
RUN yarn install

# Run
FROM base

COPY --from=build /src/frontend/node_modules /src/frontend/node_modules

CMD [ "yarn", "dev" ]