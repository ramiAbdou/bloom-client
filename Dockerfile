## Start from a base image which is Node 12.
FROM node:12-alpine as build

## Set the working directory of the Docker containner to /usr/app.
WORKDIR /usr/app

## Copy both package.json and package-lock.json to /usr/app.
COPY package*.json ./

## Exposes port 3000 in the Docker container.
EXPOSE 3000

## TARGET: STAGE
FROM build as stage
ENV NODE_ENV production
RUN npm ci --only=production
COPY . ./
RUN npm run build:stage
CMD ["npm", "run", "start:stage"]

## TARGET: PROD
FROM build as prod
ENV NODE_ENV production
RUN npm ci --only=production
COPY . ./
RUN npm run build:prod
CMD ["npm", "run", "start:prod"]
