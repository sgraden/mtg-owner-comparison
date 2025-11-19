#!/bin/bash

# MTG Card Comparison Tool - Setup Script
# This script helps you set up the application for deployment

set -e

echo "🃏 MTG Card Comparison Tool - Setup"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi

echo "✅ npm $(npm --version) found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if wrangler is installed globally
if ! command -v wrangler &> /dev/null; then
    echo ""
    echo "⚠️  Wrangler CLI not found globally. Installing locally..."
    npm install -g wrangler
fi

echo "✅ Wrangler CLI ready"

# Check if user is logged in to Cloudflare
echo ""
echo "🔐 Checking Cloudflare authentication..."
if wrangler whoami &> /dev/null; then
    echo "✅ Already logged in to Cloudflare"
else
    echo "⚠️  Not logged in to Cloudflare. Running login..."
    wrangler login
fi

# Create R2 bucket
echo ""
echo "📦 Creating R2 bucket..."
if wrangler r2 bucket list | grep -q "mtg-owner-comparison"; then
    echo "✅ R2 bucket 'mtg-owner-comparison' already exists"
else
    echo "Creating new R2 bucket..."
    wrangler r2 bucket create mtg-owner-comparison
    echo "✅ R2 bucket created"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Test locally: npm run dev"
echo "2. Deploy: npm run deploy"
echo "3. Share the URL with your friends!"
echo ""
