# Use official Node.js 20.19.2 image
FROM node:20.19.2

# Set working directory
WORKDIR /app

# Copy files
COPY ./app/package*.json ./
RUN npm install

COPY ./app ./app

# Expose the port your app runs on
EXPOSE 3001

# Start the app
CMD ["npm", "start"]