ARG APP_HOME=/app

# Use an official Node.js runtime as a parent image
FROM --platform=linux/amd64 node:14 as build

# Set the working directory in the container
WORKDIR ${APP_HOME}

# Copy package.json and package-lock.json to the working directory
COPY . ${APP_HOME}

# Install dependencies
RUN npm install

# Build the React app for production
RUN npm run build

# Use an official Nginx image as the base image for serving the React app
FROM --platform=linux/amd64 nginx:alpine

# Copy the build output to the Nginx html directory
COPY --from=build ${APP_HOME}/build /var/www

COPY ./nginx /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
