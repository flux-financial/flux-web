FROM node:alpine

# set working directory
WORKDIR /usr/src/app

# Copy package and install
COPY package*.json ./
RUN npm install

# get assets
COPY . .

# start
CMD ["npm", "start"]