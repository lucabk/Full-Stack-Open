FROM node:20
ENV NODE_ENV production

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci --only=production
COPY --chown=node:node build ./build

USER node

CMD ["npm", "run", "start"]