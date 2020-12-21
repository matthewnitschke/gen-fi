FROM node:12.1.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN yarn global add parcel-bundler


# -- Client --

COPY auth-client auth-client

WORKDIR client

# deps
COPY client/package.json package.json
RUN yarn install

# build
COPY client .
RUN yarn build:prod

# -- Server --

WORKDIR ../server
COPY server/package.json package.json
RUN yarn install

COPY server .

CMD ["yarn", "serve"]