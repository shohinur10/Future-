#!/bin/bash
# Quick deploy script to fix image issues

echo "🚀 Quick Deploy - Fixing Image Issues"
echo "======================================"

# Build the project
echo "📦 Building project..."
yarn run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Restart PM2 process
    echo "🔄 Restarting PM2 process..."
    pm2 stop "future-furniture" || true
    pm2 delete "future-furniture" || true
    pm2 start "yarn run start:prod" --name "future-furniture"
    pm2 save
    
    echo "✅ Deployment complete!"
    echo "🌐 Your site should now be available at: http://72.60.108.222/"
    echo "🖼️  Images should now be loading correctly!"
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi

