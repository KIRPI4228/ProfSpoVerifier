FROM node:24-alpine as stage1
WORKDIR /ProfSpoVerifier
COPY package.json ./
RUN npm install

FROM node:24-alpine as stage2
WORKDIR /ProfSpoVerifier
COPY src ./src
COPY --from=stage1 /ProfSpoVerifier ./

CMD [ "node", "src/main.js"]