# ScienceVerse - Interactive Educational Platform

ScienceVerse is a modern, space-themed educational website for science subjects, inspired by platforms like Duolingo and Brainly. This project features an immersive UI with stunning space visuals created with Three.js and smooth animations powered by Framer Motion.

## Features

- **Interactive 3D Space Theme**: Immersive space-themed backgrounds created with Three.js
- **Smooth Animations**: Polished UI transitions and interactions using Framer Motion
- **Responsive Design**: Mobile-first approach that works on all devices
- **User Authentication**: Complete login/signup system with secure authentication
- **Course Management**: Track course progress and continue where you left off
- **Interactive Lessons**: Engaging lesson formats for optimal learning

## Tech Stack

### Frontend
- React.js
- Three.js (for 3D graphics)
- Framer Motion (for animations)
- React Router (for routing)
- Axios (for API calls)
- TailwindCSS (for styling)

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Project Structure

```
scienceverse/
├── client/                   # React frontend
│   ├── public/               # Static files
│   └── src/
│       ├── components/       # Reusable components
│       ├── pages/            # App pages
│       ├── context/          # Context providers
│       ├── hooks/            # Custom hooks
│       ├── animations/       # Framer motion animations
│       ├── utils/            # Utility functions
│       ├── services/         # API services
│       └── styles/           # CSS files
├── server/                   # Node.js backend
│   ├── controllers/          # Request handlers
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   ├── middleware/           # Custom middleware
│   ├── config/               # Configuration
│   └── utils/                # Utility functions
└── README.md                 # Project documentation
```

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Setting Up the Project

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scienceverse.git
cd scienceverse
```

2. Install dependencies for all parts of the project:
```bash
npm run install-all
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Configure your MongoDB connection and other environment variables

```bash
cd server
cp .env.example .env
# Edit the .env file with your credentials
```

4. Start the development servers:

```bash
# From the root directory
npm run dev
```

This will start both the backend server and frontend development server concurrently.

5. Your app should now be running:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## Development Mode Features

In development mode, the application includes:

- **DevTools**: A component for toggling development features
- **Mock Authentication**: For testing without a database connection
- **Mock Data**: Predefined courses and lessons

## Main UI Components

### 1. Login/Signup Page
- User authentication interface
- Space-themed background with particles
- Form validation and error handling

### 2. Landing Page
- Space-themed background with observatory
- Information about the platform
- Call-to-action buttons

### 3. Dashboard/Home
- Overview of courses
- Progress tracking
- Recommended lessons

### 4. Lesson View
- Interactive lesson content
- Progress indicators
- Navigation controls

### 5. Discover Page
- Browse available courses
- Filter by category and difficulty
- Course previews

## Color Theme

The project uses a space-inspired color palette:
- Dutch White: `#EFDFBB`
- Wine: `#722F37`
- Space Blue: `#0B1026`
- Space Purple: `#1E0538`
- Accent Orange: `#E85A4F`

## Deployment

### Frontend Deployment
The React frontend can be built for production:

```bash
cd client
npm run build
```

### Backend Deployment
The Node.js backend can be deployed to various platforms:

```bash
cd server
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.