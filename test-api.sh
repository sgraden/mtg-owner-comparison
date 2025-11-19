#!/bin/bash

# Test API endpoints
BASE_URL="http://localhost:8787"

echo "Testing MTG Card Comparison API..."
echo ""

# Test 1: Upload primary list
echo "1. Uploading primary card list..."
curl -X POST "$BASE_URL/api/upload-primary" \
  -F "file=@test-primary.csv" \
  -s | jq .
echo ""

# Test 2: Get data
echo "2. Getting current data..."
curl -s "$BASE_URL/api/data" | jq '.primaryList | length'
echo "cards in primary list"
echo ""

# Test 3: Upload Alice's list
echo "3. Uploading Alice's card list..."
curl -X POST "$BASE_URL/api/upload-owned" \
  -F "file=@test-alice.csv" \
  -F "uploaderName=Alice" \
  -s | jq .
echo ""

# Test 4: Upload Bob's list
echo "4. Uploading Bob's card list..."
curl -X POST "$BASE_URL/api/upload-owned" \
  -F "file=@test-bob.csv" \
  -F "uploaderName=Bob" \
  -s | jq .
echo ""

# Test 5: Get full data
echo "5. Getting full data..."
curl -s "$BASE_URL/api/data" | jq .
echo ""

echo "API tests complete!"
