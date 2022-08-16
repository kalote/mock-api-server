FROM node:18
WORKDIR /app-root/src
COPY package* .
RUN npm ci
COPY . /app-root/src

ENV PORT 3100
ENV NODE_ENV production

CMD ["npm", "run", "mocks"]
