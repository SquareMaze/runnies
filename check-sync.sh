#!/bin/bash

# Bundle Page Sync Checker
# Run this script to quickly check if your latest changes are synced

echo "🔍 Bundle Page Sync Checker"
echo "=========================="
echo ""

# Check current version in VERSION_TRACKER
CURRENT_VERSION=$(grep "Current Version:" VERSION_TRACKER.md | cut -d' ' -f3)
echo "📋 Current Version: $CURRENT_VERSION"
echo ""

# Check version comments in files
echo "🔍 Checking version comments in files:"
echo ""

# Check templates
echo "📄 Templates:"
if grep -q "Bundle Page v" templates/product.bundle.json 2>/dev/null; then
    TEMPLATE_VERSION=$(grep "Bundle Page v" templates/product.bundle.json | head -1)
    echo "  ✅ product.bundle.json: $TEMPLATE_VERSION"
else
    echo "  ❌ product.bundle.json: No version comment found"
fi

if grep -q "Bundle Page v" templates/page.bundle.json 2>/dev/null; then
    PAGE_VERSION=$(grep "Bundle Page v" templates/page.bundle.json | head -1)
    echo "  ✅ page.bundle.json: $PAGE_VERSION"
else
    echo "  ❌ page.bundle.json: No version comment found"
fi

echo ""

# Check sections
echo "🧩 Sections:"
if grep -q "Bundle Product Hero Section v" sections/bundle-product-hero.liquid 2>/dev/null; then
    HERO_VERSION=$(grep "Bundle Product Hero Section v" sections/bundle-product-hero.liquid | head -1)
    echo "  ✅ bundle-product-hero.liquid: $HERO_VERSION"
else
    echo "  ❌ bundle-product-hero.liquid: No version comment found"
fi

if grep -q "Bundle Hero Section v" sections/bundle-hero.liquid 2>/dev/null; then
    STANDALONE_VERSION=$(grep "Bundle Hero Section v" sections/bundle-hero.liquid | head -1)
    echo "  ✅ bundle-hero.liquid: $STANDALONE_VERSION"
else
    echo "  ❌ bundle-hero.liquid: No version comment found"
fi

echo ""

# Check git status
echo "📦 Git Status:"
if git status --porcelain | grep -q .; then
    echo "  ⚠️  You have uncommitted changes"
    echo "  📝 Uncommitted files:"
    git status --porcelain | sed 's/^/    /'
else
    echo "  ✅ All changes are committed"
fi

echo ""

# Check if files are pushed
echo "🚀 Push Status:"
LOCAL_COMMITS=$(git rev-list --count origin/main..HEAD 2>/dev/null || echo "0")
if [ "$LOCAL_COMMITS" -gt 0 ]; then
    echo "  ⚠️  You have $LOCAL_COMMITS unpushed commits"
    echo "  💡 Run: git push origin main"
else
    echo "  ✅ All commits are pushed to GitHub"
fi

echo ""
echo "🎯 Quick Sync Check:"
echo "1. Go to Shopify Admin → Online Store → Themes → Edit Code"
echo "2. Open any bundle file and look for version comments"
echo "3. If you see '$CURRENT_VERSION', your changes are synced!"
echo ""
echo "🔧 If not synced, try:"
echo "   - Manual upload in Shopify theme editor"
echo "   - Force GitHub sync in Shopify admin"
echo "   - Wait 5-10 minutes for automatic sync"
