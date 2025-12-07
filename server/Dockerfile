# Stage 1: Build Stage (Dependencies Install)
FROM node:18-alpine AS dependency-installer
WORKDIR /app
COPY package*.json ./
# Install production dependencies only (no dev dependencies)
RUN npm install --omit=dev 

# Stage 2: Final Production Image
FROM node:18-alpine
WORKDIR /app
# Copy installed dependencies from the first stage
COPY --from=dependency-installer /app/node_modules ./node_modules
# Copy the application code
COPY . . 
# Express app runs on 5000
EXPOSE 5000
# Use 'npm start' to run the app, assuming 'npm start' is defined in package.json
CMD ["npm", "start"]