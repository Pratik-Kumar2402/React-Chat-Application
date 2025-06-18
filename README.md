# React Chat Application

A modern real-time chat application built with React, Firebase, Zustand, and Vite. Users can register, log in, chat with others, send images, block users, and manage their profile.

Features
User authentication (register & login) with Firebase Auth
Real-time chat using Firestore
Image upload and sharing via Firebase Storage
User blocking/unblocking
Emoji picker for messages
Responsive and modern UI
Toast notifications for feedback
User search and chat list management

Tech Stack
React
Firebase (Auth, Firestore, Storage)
Zustand
Vite
React Toastify
Emoji Picker React

Project Structure
public/
  *.png                # Static assets (icons, background)
src/
  App.jsx              # Main app component
  main.jsx             # Entry point
  components/          # UI components (Chat, List, Detail, Login, Notification)
  lib/                 # State stores and Firebase utilities
    firebase.js        # Firebase config and exports
    userStore.js       # Zustand store for user state
    chatStore.js       # Zustand store for chat state
    upload.js          # Image upload helper
index.css, App.css     # Global and app styles

Getting Started
Prerequisites
Node.js (v18+ recommended)
Firebase project (see below)

Setup

Clone the repository:
git clone <repo-url>
cd react-chat-application

Install dependencies:
npm install

Configure Firebase:

Create a .env file in the root directory.
Add your Firebase config variables:
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGE_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

Run the development server:
npm run dev

Open the app:

Visit http://localhost:5173 in your browser.

Scripts
npm run dev – Start the development server
npm run build – Build for production
npm run preview – Preview the production build
npm run lint – Run ESLint
License
This project is licensed under the GNU GPL v3.

License
This project is licensed under the GNU GPL v3.

Note: For Firebase setup, ensure you have enabled Email/Password authentication and created the required Firestore collections (users, userChats, chats).5. Open the app:

Visit http://localhost:5173 in your browser.
Scripts
npm run dev – Start the development server
npm run build – Build for production
npm run preview – Preview the production build
npm run lint – Run ESLint
License
This project is licensed under the GNU GPL v3.

Note: For Firebase setup, ensure you have enabled Email/Password authentication and created the required Firestore collections (users, userChats, chats).