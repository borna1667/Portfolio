#!/bin/bash

# Production deployment script for DigitalOcean

echo "🚀 Starting deployment process..."

# Build the application
echo "📦 Building the application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
else
    echo "❌ Build failed. Exiting..."
    exit 1
fi

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t my-portfolio:latest .

# Check if Docker build was successful
if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
else
    echo "❌ Docker build failed. Exiting..."
    exit 1
fi

# Stop and remove existing container if running
echo "🔄 Stopping existing container..."
docker stop my-portfolio 2>/dev/null || true
docker rm my-portfolio 2>/dev/null || true

# Run the new container
echo "🎯 Starting new container..."
docker run -d --name my-portfolio -p 80:80 --restart unless-stopped my-portfolio:latest

# Check if container is running
if [ $? -eq 0 ]; then
    echo "✅ Container started successfully!"
    echo "🌐 Your portfolio is now live at http://your-domain.com"
else
    echo "❌ Failed to start container. Exiting..."
    exit 1
fi

echo "🎉 Deployment completed successfully!"
