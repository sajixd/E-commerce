# Stage 1: Build Stage (Vite Build)
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Vite build command, ye 'dist' folder banata hai
RUN npm run build 

# Stage 2: Serve Stage (Nginx for serving static files)
FROM nginx:stable-alpine
# Remove default Nginx config
RUN rm /etc/nginx/conf.d/default.conf
# Copy a custom Nginx config (we will create this in the next step)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the built React app from 'build' stage into Nginx
COPY --from=build /app/dist /usr/share/nginx/html 
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]