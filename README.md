# Sample In-App Voting Implementation

A complete sample implementation demonstrating how to integrate voting functionality into your React Native application using the govotr SDK. This project includes both a Node.js backend server and a React Native mobile application.

## 🏗️ Project Structure

```
Sample-IN-APP-Voting/
├── vote-poc-be/              # Node.js Backend Server
│   ├── server.js             # Main server file
│   ├── package.json          # Backend dependencies
│   └── README.md             # Backend-specific documentation
├── vote-now-poc/             # React Native Mobile App
│   ├── app/                  # App screens and navigation
│   ├── components/           # Reusable UI components
│   ├── assets/               # Images and static files
│   ├── govotr-vote-sdk-1.0.0.tgz  # govotr SDK package
│   └── package.json          # Mobile app dependencies
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo CLI** (`npm install -g @expo/cli`)
- **React Native development environment** (for mobile development)
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)

### 1. Backend Setup

Navigate to the backend directory and set up the server:

```bash
cd vote-poc-be
npm install
```

Create a `.env` file in the `vote-poc-be` directory:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# OAuth API Configuration
OAUTH_API_URL=https://your-oauth-api.com/auth/token
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret

# Data Endpoint Configuration
DATA_ENDPOINT_URL=https://your-data-api.com/send
```

Start the backend server:

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The backend server will be available at `http://localhost:3001`

### 2. React Native App Setup

Navigate to the mobile app directory:

```bash
cd vote-now-poc
npm install
npm install ./govotr-vote-react-native-1.0.0.tgz --legacy-peer-deps
```

Start the Expo development server:

```bash
npx expo start
```

This will open the Expo development tools. You can then:

- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Scan the QR code with Expo Go app on your physical device

## 📱 Mobile App Features

The React Native application includes:

- **Authentication Screen**: Simple login interface
- **Dashboard**: Portfolio overview with voting integration
- **Voting Integration**: Ready for govotr SDK implementation
- **Modern UI**: Dark/light theme support
- **Responsive Design**: Optimized for mobile devices

### App Navigation

- **Login Screen** (`/login`): User authentication
- **Dashboard** (`/(tabs)/dashboard`): Main portfolio view
- **Portfolio** (`/(tabs)/portfolio`): Detailed portfolio management

## 🔧 Backend API

### Endpoints

#### Health Check

- **GET** `/health`
- Returns server status and timestamp

#### Vote Process

- **POST** `/vote`
- Initiates the voting process by:
  1. Getting OAuth token from external API
  2. Sending email and eventId to data endpoint
  3. Returning the voting URL

**Request Body:**

```json
{
  // No specific body required
}
```

**Response:**

```json
{
  "success": true,
  "message": "Vote process completed successfully",
  "url": "https://example.com/vote/abc123",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Environment Variables

| Variable            | Description                 | Required |
| ------------------- | --------------------------- | -------- |
| `PORT`              | Server port (default: 3001) | No       |
| `NODE_ENV`          | Environment mode            | No       |
| `OAUTH_API_URL`     | OAuth token endpoint URL    | Yes      |
| `CLIENT_ID`         | OAuth client ID             | Yes      |
| `CLIENT_SECRET`     | OAuth client secret         | Yes      |
| `DATA_ENDPOINT_URL` | Data sending endpoint URL   | Yes      |

## 🗳️ govotr SDK Integration

The project includes the govotr voting SDK for React Native integration.

### SDK Package

- **Package**: `govotr-vote-react-native-1.0.0.tgz`
- **Location**: `govotr-vote-react-native-1.0.0.tgz`
- **Dependencies**: Already included in `package.json`

### SDK Usage

The SDK is configured in the mobile app's `package.json`:

```json
{
  "dependencies": {
    "@govotr/vote-sdk": "file:govotr-vote-sdk-1.0.0.tgz"
  }
}
```

### Integration Steps

1. **Install SDK**: The SDK is already included in the project
2. **Import SDK**: Import the SDK in your React Native components
3. **Initialize**: Set up the SDK with your configuration
4. **Implement Voting**: Add voting functionality to your app

### Sample Implementation

```typescript
import { VoteNowButton } from "@govotr/vote-react-native";

// Initialize the SDK
const handleVoteClick = async () => {
  setIsLoading(true);

  try {
    const response = await fetch("BACKEND URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success && data.url) {
      setVotingUrl(data.url);
    }
  } catch (error) {
  } finally {
    setIsLoading(false);
  }
};

// Start voting process
<VoteNowButton
  URL={votingUrl}
  label="Vote Now"
  buttonStyle={styles.voteNowButton}
  textStyle={styles.voteNowButtonText}
  onPress={handleVoteClick}
  isLoading={false}
  onSuccess={() => {
    console.log("success");
  }}
  onBack={() => {
    console.log("back");
  }}
  onError={(error) => {
    console.log(error);
  }}
/>;
```

## 🔄 Development Workflow

### Backend Development

1. Make changes to `server.js`
2. The server will auto-restart in development mode
3. Test endpoints using curl or Postman

### Mobile App Development

1. Make changes to files in the `app/` directory
2. The Expo development server will hot-reload changes
3. Test on emulator/simulator or physical device

### Testing the Integration

1. Start the backend server (`npm run dev` in `vote-poc-be/`)
2. Start the mobile app (`npx expo start` in `vote-now-poc/`)
3. Navigate to the voting functionality in the app
4. Verify the backend API calls work correctly

## 🛠️ Customization

### Backend Customization

- **API Endpoints**: Modify `server.js` to add new endpoints
- **Authentication**: Implement proper user authentication
- **Database**: Add database integration for persistent storage
- **Validation**: Add request validation and sanitization

### Mobile App Customization

- **UI/UX**: Customize the theme and styling in `constants/theme.ts`
- **Navigation**: Modify the navigation structure in `app/_layout.tsx`
- **Components**: Add new components in the `components/` directory
- **Screens**: Create new screens in the `app/` directory

## 📋 Client Implementation Notes

This is a **sample implementation** designed to help clients understand how to integrate voting functionality into their applications. Key points for client implementation:

### What's Included

- ✅ Complete backend server with voting API
- ✅ React Native app with modern UI
- ✅ govotr SDK integration
- ✅ Environment configuration
- ✅ Error handling and logging
- ✅ CORS support for cross-origin requests

### What Clients Need to Do

1. **Configure Environment Variables**: Set up your actual API endpoints and credentials
2. **Customize UI**: Adapt the mobile app UI to match your brand
3. **Implement Authentication**: Add proper user authentication system
4. **Add Business Logic**: Implement your specific voting logic
5. **Deploy**: Deploy backend to your preferred hosting platform
6. **Test**: Thoroughly test the integration with your systems

### Security Considerations

- Change default secret keys in production
- Use HTTPS for all API communications
- Implement proper input validation
- Add rate limiting for production use
- Consider implementing user authentication
- Validate all external API responses

## 🐛 Troubleshooting

### Common Issues

**Backend won't start:**

- Check if port 3001 is available
- Verify all environment variables are set
- Ensure all dependencies are installed

**Mobile app won't load:**

- Make sure Expo CLI is installed globally
- Check if the development server is running
- Verify device/emulator is connected

**SDK integration issues:**

- Ensure the SDK package is properly installed
- Check SDK configuration parameters
- Verify API endpoints are accessible

### Getting Help

- Check the individual README files in `vote-poc-be/` and `vote-now-poc/`
- Review the console logs for detailed error messages
- Ensure all prerequisites are properly installed

## 📄 License

This is a sample implementation for demonstration purposes. Please refer to your govotr SDK license for usage terms and conditions.

## 🤝 Support

For technical support and questions about the govotr SDK integration, please contact the govotr support team.

---

**Note**: This is a sample implementation. Make sure to customize it according to your specific requirements and security needs before deploying to production.
