# React Chat Application

A modern real-time chat application built with React, Firebase, Zustand, and Vite. Users can register, log in, chat with others, block users, and manage their profile.

## Features

- User authentication (register & login) with Firebase Auth
- Real-time chat using Firestore
- User blocking/unblocking
- Emoji picker for messages
- Responsive and modern UI
- Toast notifications for feedback
- User search and chat list management

## Tech Stack

- React
- Firebase (Auth, Firestore)
- Zustand
- Vite
- React Toastify
- Emoji Picker React

## Project Structure

```
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
index.css, App.css     # Global and app styles
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A Firebase project

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd react-chat-application
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - In the Firebase project, enable **Authentication** (Email/Password sign-in method).
  - In **Firestore Database**, make sure you have enabled Firestore in your Firebase project. The following collections are created automatically by the application as you use it:
    - `users`
    - `userChats`
    - `chats`
  - Go to **Project Settings > General > Your Apps** and register a new web app to get your Firebase config.

> **Note:** Profile editing is not included in the current version, but can be added in a later version if needed.
