FROM node:lts-alpine as build
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/dist
RUN chmod -R 777 /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install 
# RUN npm ci
COPY . .
RUN npm run build


FROM nginx:latest as prod
# copy from dist/ from build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80/tcp
CMD ["/usr/sbin/nginx", "-g", "daemon off;"]