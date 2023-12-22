FROM node:20.9.0

RUN mkdir -p /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

ARG NUXT_PUBLIC_API_BASE
ENV NUXT_PUBLIC_API_BASE ${NUXT_PUBLIC_API_BASE}
ENV NODE_ENV=production

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]