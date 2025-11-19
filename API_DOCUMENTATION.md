# API Documentation

Complete reference for all API endpoints in the MTG Card Comparison application.

## Base URL

**Local Development**: `http://localhost:8787`

**Production**: `https://mtg-owner-comparison.your-subdomain.workers.dev`

---

## Endpoints

### 1. Get HTML Interface

**GET** `/`

Returns the complete HTML interface.

**Response**: HTML document (text/html)

**Example**:
```bash
curl http://localhost:8787/
```

---

### 2. Upload Primary Card List

**POST** `/api/upload-primary`

Upload the primary list of cards that need to be compared.

**Request**:
- Content-Type: `multipart/form-data`
- Parameters:
  - `file` (required): CSV or text file with card list

**File Format**:
```
Card Name,Quantity
Black Lotus,1
Mox Jet,2
```

Or line-separated:
```
Black Lotus
Mox Jet
Mox Jet
```

**Response**: JSON
```json
{
  "success": true,
  "count": 10
}
```

**Error Response**:
```json
{
  "error": "No file provided"
}
```

**Example**:
```bash
curl -X POST http://localhost:8787/api/upload-primary \
  -F "file=@primary-list.csv"
```

**Status Codes**:
- `200`: Success
- `400`: Missing file
- `500`: Server error

---

### 3. Upload Owned Cards List

**POST** `/api/upload-owned`

Upload a person's owned cards list.

**Request**:
- Content-Type: `multipart/form-data`
- Parameters:
  - `file` (required): CSV or text file with card list
  - `uploaderName` (required): Name of the person uploading

**File Format**: Same as primary list

**Response**: JSON
```json
{
  "success": true,
  "count": 5
}
```

**Error Response**:
```json
{
  "error": "File and uploader name required"
}
```

**Example**:
```bash
curl -X POST http://localhost:8787/api/upload-owned \
  -F "file=@alice-cards.csv" \
  -F "uploaderName=Alice"
```

**Status Codes**:
- `200`: Success
- `400`: Missing file or uploader name
- `500`: Server error

**Notes**:
- Uploading with the same `uploaderName` replaces the previous list
- Names are case-sensitive

---

### 4. Get All Data

**GET** `/api/data`

Retrieve all stored data (primary list and all uploaded lists).

**Response**: JSON
```json
{
  "primaryList": [
    { "name": "Black Lotus", "count": 1 },
    { "name": "Mox Jet", "count": 2 }
  ],
  "uploadedLists": [
    {
      "uploaderName": "Alice",
      "cards": [
        { "name": "Black Lotus", "count": 1 },
        { "name": "Mox Jet", "count": 1 }
      ],
      "uploadedAt": "2024-01-01T12:00:00Z"
    },
    {
      "uploaderName": "Bob",
      "cards": [
        { "name": "Mox Sapphire", "count": 1 }
      ],
      "uploadedAt": "2024-01-01T12:05:00Z"
    }
  ]
}
```

**Example**:
```bash
curl http://localhost:8787/api/data | jq .
```

**Status Codes**:
- `200`: Success

---

### 5. Delete Primary List

**DELETE** `/api/primary`

Clear the primary card list.

**Response**: JSON
```json
{
  "success": true
}
```

**Example**:
```bash
curl -X DELETE http://localhost:8787/api/primary
```

**Status Codes**:
- `200`: Success
- `500`: Server error

---

### 6. Delete Owned List

**DELETE** `/api/list/:uploaderName`

Remove a person's uploaded card list.

**Parameters**:
- `uploaderName` (URL parameter): Name of the person whose list to delete

**Response**: JSON
```json
{
  "success": true
}
```

**Example**:
```bash
curl -X DELETE http://localhost:8787/api/list/Alice
```

**URL Encoding**:
If the name contains special characters, URL-encode it:
```bash
curl -X DELETE "http://localhost:8787/api/list/Alice%20Smith"
```

**Status Codes**:
- `200`: Success
- `500`: Server error

---

## Data Structures

### Card Object
```json
{
  "name": "Black Lotus",
  "count": 1
}
```

### Uploaded List Object
```json
{
  "uploaderName": "Alice",
  "cards": [
    { "name": "Card Name", "count": 1 }
  ],
  "uploadedAt": "2024-01-01T12:00:00Z"
}
```

### Complete Data Structure
```json
{
  "primaryList": [
    { "name": "Card Name", "count": 1 }
  ],
  "uploadedLists": [
    {
      "uploaderName": "Alice",
      "cards": [
        { "name": "Card Name", "count": 1 }
      ],
      "uploadedAt": "2024-01-01T12:00:00Z"
    }
  ]
}
```

---

## Error Handling

All errors return JSON with an `error` field:

```json
{
  "error": "Error message here"
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| `No file provided` | File parameter missing | Include `file` in form data |
| `File and uploader name required` | Missing required fields | Include both `file` and `uploaderName` |
| `Server error` | Internal error | Check server logs, retry request |

---

## Rate Limiting

- **Local Development**: No rate limiting
- **Production**: Cloudflare Workers free tier: 100,000 requests/day
- **R2 Storage**: Free tier: 1M read/write operations/month

---

## CORS

The API supports CORS requests from:
- `http://localhost:*` (local development)
- Same origin (production)

---

## Content Types

### Request
- `multipart/form-data` for file uploads
- No body for GET/DELETE requests

### Response
- `application/json` for API endpoints
- `text/html; charset=utf-8` for HTML endpoint

---

## Examples

### Complete Workflow

```bash
# 1. Upload primary list
curl -X POST http://localhost:8787/api/upload-primary \
  -F "file=@primary.csv"

# 2. Upload Alice's cards
curl -X POST http://localhost:8787/api/upload-owned \
  -F "file=@alice.csv" \
  -F "uploaderName=Alice"

# 3. Upload Bob's cards
curl -X POST http://localhost:8787/api/upload-owned \
  -F "file=@bob.csv" \
  -F "uploaderName=Bob"

# 4. Get all data
curl http://localhost:8787/api/data | jq .

# 5. Delete Alice's list
curl -X DELETE http://localhost:8787/api/list/Alice

# 6. Get updated data
curl http://localhost:8787/api/data | jq .

# 7. Clear primary list
curl -X DELETE http://localhost:8787/api/primary
```

### Using JavaScript

```javascript
// Upload primary list
const formData = new FormData();
formData.append('file', fileInput.files[0]);

const response = await fetch('/api/upload-primary', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result); // { success: true, count: 10 }

// Get all data
const data = await fetch('/api/data').then(r => r.json());
console.log(data.primaryList);
console.log(data.uploadedLists);

// Delete a list
await fetch('/api/list/Alice', { method: 'DELETE' });
```

### Using Python

```python
import requests

# Upload primary list
with open('primary.csv', 'rb') as f:
    files = {'file': f}
    response = requests.post('http://localhost:8787/api/upload-primary', files=files)
    print(response.json())

# Upload owned list
with open('alice.csv', 'rb') as f:
    files = {'file': f}
    data = {'uploaderName': 'Alice'}
    response = requests.post('http://localhost:8787/api/upload-owned', files=files, data=data)
    print(response.json())

# Get all data
response = requests.get('http://localhost:8787/api/data')
print(response.json())
```

---

## Pagination

Not implemented. All data is returned in a single response.

For large datasets (>10,000 cards), consider:
- Splitting into multiple primary lists
- Using the frontend filtering instead of API queries

---

## Versioning

Current API version: `1.0.0`

No versioning in URLs. Breaking changes will increment the major version.

---

## Monitoring

Monitor API usage with:

```bash
wrangler tail
```

This shows real-time logs of all API requests.

---

## Troubleshooting

### 404 Not Found
- Check endpoint URL spelling
- Verify HTTP method (GET, POST, DELETE)
- Check base URL is correct

### 400 Bad Request
- Verify all required parameters are included
- Check file format is CSV or text
- Ensure form data is properly formatted

### 500 Server Error
- Check server logs: `wrangler tail`
- Verify R2 bucket exists and is accessible
- Try request again

### CORS Error
- Verify request is from allowed origin
- Check browser console for full error message
- Ensure Content-Type header is correct

---

## API Limits

- **File Size**: < 10MB per upload
- **Card Names**: < 255 characters each
- **Uploader Names**: < 100 characters
- **Total Cards**: Unlimited (depends on R2 storage)
- **Concurrent Requests**: Unlimited (Cloudflare Workers handles scaling)

---

## Security

- No authentication required
- Data is public to anyone with the URL
- HTTPS only (Cloudflare Workers)
- No sensitive data stored
- Safe to share URL with trusted users

---

## Support

For API issues:
1. Check this documentation
2. Review error message
3. Check Cloudflare status: https://www.cloudflarestatus.com
4. Check server logs: `wrangler tail`

---

**Last Updated**: 2024
**API Version**: 1.0.0
**Status**: Production Ready
