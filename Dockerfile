FROM node:alpine

# set working directory
WORKDIR /usr/src/app

# Copy package and install
COPY package*.json ./
RUN npm install --production

# get assets
COPY . .

# Get Bulma and node-sass
RUN npm install --no-save bulma node-sass
RUN node ./tools/makeCSS.js
RUN npm prune --production

# start
CMD ["npm", "start"]