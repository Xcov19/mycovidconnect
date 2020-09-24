# pull official base image
FROM node:14.11.0

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# export keys to env file
COPY .env ./

# install app dependencies
COPY package.json ./

# install packages
RUN npm cache verify && npm i --force --no-package-lock && npm audit fix

# add app
COPY . ./

# build
RUN npm run build

# start app
CMD ["npm", "start"]