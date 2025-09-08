#!/bin/bash
# Setup environment for production deployment

echo "Setting up production environment..."

# Create .env.production file
cat > .env.production << EOF
REACT_APP_SERVER_API=http://72.60.108.222:3003
EOF

echo "Created .env.production with server API: http://72.60.108.222:3003"

# Make deploy script executable
chmod +x deploy.sh

echo "Environment setup complete!"
echo "Run './deploy.sh' to deploy to production"

