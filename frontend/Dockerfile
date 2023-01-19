FROM node:18.13-bullseye-slim

WORKDIR /app

#Environment variables.
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV="development"

COPY package*.json /app/

RUN npm install
COPY ./ /app/

CMD ["npm", "start"]