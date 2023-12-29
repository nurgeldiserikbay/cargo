FROM node:20-alpine

RUN mkdir -p /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app

COPY package.json .
COPY yarn.lock .

RUN yarn install --production && yarn cache clean

COPY . .

ARG NUXT_PUBLIC_API_BASE
ARG NUXT_PUBLIC_API_URL
ENV NODE_ENV=production
ENV NUXT_PUBLIC_API_BASE ${NUXT_PUBLIC_API_BASE}
ENV NUXT_PUBLIC_API_URL ${NUXT_PUBLIC_API_URL}
ENV NODE_ENV=production

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]