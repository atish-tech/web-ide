# Use Node.js 18 alpine as the base image
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps
RUN npm install --force

# Copy the rest of the application code
COPY . .

# Expose the development port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Start the Next.js app in development mode
CMD ["sh", "-c", "npx prisma generate && npm run dev"]
