# Pull Docker Hub base image
FROM node:14.16.0-alpine3.10 as builder
# Set working directory
WORKDIR /usr/app
# Install app dependencies
COPY package*.json ./
RUN npm install 
# Copy app to container
COPY . .
# Run the "dev" script in package.json
RUN npm run build:prod

FROM nginx
EXPOSE 3000
COPY ./nginx.conf /etc/nginx/conf.d/default.conf 
COPY --from=builder /usr/app/build /usr/share/nginx/html
