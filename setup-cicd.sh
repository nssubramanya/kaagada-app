#!/bin/bash

echo "🔧 Vercel CI/CD Setup Helper"
echo "============================"
echo ""

echo "📋 Required GitHub Secrets:"
echo "1. VERCEL_TOKEN"
echo "2. VERCEL_ORG_ID"
echo "3. VERCEL_PROJECT_ID"
echo ""

echo "🔑 How to get these values:"
echo ""

echo "1. VERCEL_TOKEN:"
echo "   - Go to: https://vercel.com/account/tokens"
echo "   - Create a new token"
echo "   - Copy the token value"
echo ""

echo "2. VERCEL_ORG_ID:"
echo "   - Run: vercel whoami"
echo "   - Or check your Vercel dashboard URL"
echo ""

echo "3. VERCEL_PROJECT_ID:"
echo "   - Go to your project in Vercel dashboard"
echo "   - Settings → General → Project ID"
echo "   - Or run: vercel project ls"
echo ""

echo "📝 Add to GitHub:"
echo "   GitHub Repo → Settings → Secrets and variables → Actions → New repository secret"
echo ""

echo "✅ After adding secrets:"
echo "   Push to main branch to trigger automatic deployment!"