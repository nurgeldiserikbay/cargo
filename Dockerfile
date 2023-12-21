FROM node:20.9.0

RUN mkdir -p /usr/src/nuxt-app

WORKDIR /usr/src/nuxt-app

COPY package*.json .

RUN yarn

COPY . .

ARG API_URL
ENV NUXT_PUBLIC_API_BASE ${API_URL}

ARG API_URL
ENV NUXT_PUBLIC_API_BASE ${API_URL}

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]