# PathFinder AI (Client)

A retro-styled, AI-powered career counseling application. It helps users discover their ideal career path through an immersive terminal-like interface.

## 🖥️ Visual Style: Retro Terminal

The application features a high-contrast **Black & White** theme with CRT scanline effects to mimic an old-school computer terminal.

- **Monospace Typography**: Uses `Courier New` for that authentic code-look.
- **CRT Effect**: Global scanline overlay for immersion.
- **Retro Components**: Custom borders, blocky buttons, and terminal-style inputs.

## 🚀 Features

### 1. Authentication & Onboarding

- **Login**: Secure entry point with a "system access" aesthetic.
- **Register**: New user initialization protocol (`/register`).
- **Onboarding**: "User Configuration" step to capture education and interests.

### 2. Dashboard & Chat

- **Terminal Chat Interface**: Interact with the AI Counselor in a command-line style interface.
  - **User Commands**: `> USER_INPUT`
  - **System Responses**: `> SYSTEM_RESPONSE`
- **End Session**: Terminate execution and return to the login screen securely.

### 3. Landing Page

- **Hero Section**: "CAREER_PATH_OPTIMIZER" introduction.
- **Manual**: Detailed "Operation Manual" (How to Use) and "System Capabilities" (About).

## 🛠️ Setup & Installation

### Prerequisites

- Node.js installed
- Backend server running (see `../server`)

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

Start the development server:

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173`.

## 📂 Project Structure

- `src/components`: Reusable retro components (Hero, Navbar, ChatInterface, etc.)
- `src/pages`: Main application views (Landing, Login, Register, Dashboard, Onboarding).
- `src/index.css`: Global styles including variables for the Retro Theme and CRT effects.

---

_Initiated by PathFinder AI Systems._
