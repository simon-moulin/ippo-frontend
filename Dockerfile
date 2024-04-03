FROM node:18-alpine

# Copy Dir
COPY . ./app

# Work to Dir
WORKDIR /app
RUN rm -rf node_modules/

# install simple http server for serving static content
RUN npm install -g serve
RUN npm install -g pnpm
RUN npm install -g dotenv

# Install Node Package
RUN pnpm install

# build app for production with minification
RUN pnpm run build

EXPOSE 5000
CMD [ "serve", "-s", "dist", "-l", "5000" ]
