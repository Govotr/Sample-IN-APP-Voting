# Vote POC Backend

A Node.js backend server for the vote-poc application that handles voting processes by integrating with external APIs.

## Features

- Express.js server with CORS support
- Environment variable configuration
- Secret key management
- External API integration for token retrieval
- Email and token sending functionality
- Comprehensive error handling
- Health check endpoint

## Setup Instructions

### 1. Install Dependencies

```bash
cd vote-poc-be
npm install
```

### 2. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Secret Key for authentication/security
SECRET_KEY=your-super-secret-key-here-change-in-production

# External API Configuration
EXTERNAL_API_URL=https://api.example.com/auth/token
SEND_ENDPOINT_URL=https://api.example.com/send

# Hardcoded email for the voting process
VOTER_EMAIL=voter@example.com
```

### 3. Run the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3001` (or the port specified in your `.env` file).

## API Endpoints

### Health Check
- **GET** `/health`
- Returns server status and timestamp

### Vote Process
- **POST** `/vote`
- Main endpoint that:
  1. Hits external API to get a token
  2. Sends hardcoded email and token to send endpoint
  3. Returns the URL from the send endpoint

#### Request Body
```json
{
  // No specific body required, but you can add any additional data
}
```

#### Response
```json
{
  "success": true,
  "message": "Vote process completed successfully",
  "url": "https://example.com/vote/abc123",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Configuration

### Environment Variables

- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment mode (development/production)
- `SECRET_KEY`: Secret key for API authentication
- `EXTERNAL_API_URL`: URL for token retrieval API
- `SEND_ENDPOINT_URL`: URL for sending email and token
- `VOTER_EMAIL`: Hardcoded email address for voting

### External API Requirements

The server expects the external APIs to follow these patterns:

#### Token API (`EXTERNAL_API_URL`)
- **Method**: POST
- **Request Body**: `{ "secret": "your-secret-key" }`
- **Response**: `{ "token": "generated-token" }`

#### Send API (`SEND_ENDPOINT_URL`)
- **Method**: POST
- **Request Body**: `{ "email": "voter@example.com", "token": "generated-token" }`
- **Response**: `{ "url": "https://example.com/vote/abc123" }`

## Error Handling

The server includes comprehensive error handling for:
- Network connectivity issues
- External API errors
- Invalid responses
- Internal server errors

## Development

### Project Structure
```
vote-poc-be/
├── server.js          # Main server file
├── package.json       # Dependencies and scripts
├── README.md         # This file
└── .env              # Environment variables (create this)
```

### Dependencies
- `express`: Web framework
- `axios`: HTTP client for API calls
- `dotenv`: Environment variable management
- `cors`: Cross-origin resource sharing
- `nodemon`: Development auto-restart (dev dependency)

## Testing

You can test the endpoints using curl or any HTTP client:

```bash
# Health check
curl http://localhost:3001/health

# Vote process
curl -X POST http://localhost:3001/vote \
  -H "Content-Type: application/json"
```

## Security Notes

- Change the `SECRET_KEY` in production
- Use HTTPS in production
- Validate and sanitize all inputs
- Implement proper authentication if needed
- Consider rate limiting for production use
