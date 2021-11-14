# pull official base image
FROM fkrull/multi-python:focal

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install curl
RUN apt-get update && apt-get install -y --no-install-recommends curl && apt-get clean && rm -rf /var/lib/apt/lists/*

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.11.0
RUN mkdir -p $NVM_DIR

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.35.3/install.sh | bash

# install node and npm
RUN . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# confirm installation
RUN node -v
RUN npm -v

# export keys to env file
ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN if [ -f ".env" ]; then echo "paste env var values to .env"; else touch .env; fi;

ADD "https://www.random.org/cgi-bin/randbyte?nbytes=10&format=h" skipcache
RUN if [ -d "node_modules" ]; then rm -rf node_modules; fi;
RUN if [ -d "~/.npm/_cacache" ]; then rm -rf ~/.npm/_cacache; fi;

# install packages
COPY package.json /app
RUN npm i --package-lock-only && npm audit fix
COPY package-lock.json /app
RUN npm i

# add app
COPY public /app/public
COPY src /app/src
COPY .babelrc /app
COPY .jshintrc /app
COPY .whitesource /app
COPY tsconfig.json /app

# build
RUN npm run build

# start app
CMD ["npm", "start"]