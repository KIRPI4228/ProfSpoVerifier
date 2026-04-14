FROM node:24.13.0-alpine as stage1
WORKDIR /ProfSpoVerifier
COPY package.json ./
RUN npm ci --only=production

FROM node:24.13.0-alpine as stage2
WORKDIR /ProfSpoVerifier
ENV GENERATE_SOURCEMAP false
COPY src ./src
COPY --from=stage1 /ProfSpoVerifier ./
RUN npm run build

FROM node:24.13.0-alpine as stage3
WORKDIR /ProfSpoVerifier
COPY --from=stage2 /ProfSpoVerifier/build ./build
RUN npm install -g serve

CMD [ "serve", "-s", "build" ]