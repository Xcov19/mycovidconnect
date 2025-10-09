# Use official Node 18 LTS base image (Debian Bullseye)
FROM node:18-bullseye

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH=/app/node_modules/.bin:$PATH

# clean any previous caches (noop in fresh container)
RUN if [ -f "package-lock.json" ]; then rm package-lock.json; fi; \
    if [ -d "node_modules" ]; then rm -rf node_modules; fi; \
    if [ -d "~/.npm/_cacache" ]; then rm -rf ~/.npm/_cacache; fi;

# install packages
COPY package.json ./
RUN npm i

# add app
COPY public ./public
COPY src ./src
COPY .babelrc ./
COPY .jshintrc ./
COPY .whitesource ./
COPY tsconfig.json ./

# build
RUN npm run build

# start app
CMD ["npm", "start"]
