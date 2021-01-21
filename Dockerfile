# syntax=docker/dockerfile:1.0.0-experimental
# Stage 0, "build-stage" to build and compile the app
FROM node:14.15.0-alpine as build-stage

RUN apk update && \
    apk upgrade && \
    apk add git && \
    apk add openssh-client

WORKDIR /app

# METHOD: TOKEN FOR PRIVATE GITHUB NPM REGISTRY ref: https://blog.risingstack.com/private-npm-with-docker/
# ARG NPM_TOKEN  
# COPY .npmrc .npmrc  
# COPY package.json package.json  
# RUN npm install  
# RUN rm -f .npmrc

# METHOD: SSH KEY
COPY package.json /app/
COPY package-lock.json /app/
RUN mkdir -p -m 0600 ~/.ssh && ssh-keyscan github.com >> ~/.ssh/known_hosts
RUN --mount=type=ssh,id=github npm install


COPY ./ /app/

RUN npm run build

CMD ["npm", "start" ]
