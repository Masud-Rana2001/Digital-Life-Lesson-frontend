# Digital Life Lesson — Frontend

This repository contains the frontend application for Digital Life Lesson — a React + Vite single-page app that connects to the project's backend API, handles user authentication via Firebase, and integrates Stripe for payments.

This README documents the frontend-specific setup, development workflow, environment variables, and deployment notes.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
	- [Prerequisites](#prerequisites)
	- [Install & Run](#install--run)
- [Environment Variables](#environment-variables)
- [Development Notes](#development-notes)
- [Testing](#testing)
- [Building & Deployment](#building--deployment)
- [Linting & Formatting](#linting--formatting)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License & Authors](#license--authors)

---

## Project Overview

The frontend is a Vite-powered React application that provides the full user interface for the Digital Life Lesson platform. It includes pages for browsing lessons, viewing lesson details, creating/updating lessons (for creators), dashboard views, and admin interfaces.

Key responsibilities:

- Provide secure authentication flows (Firebase)
- Call backend endpoints for lessons, users, payments, and admin actions
- Render interactive UI components (likes, favorites, comments)
- Handle client-side routing, form validation, and local state

## Tech Stack

- React 18
- Vite
- React Router
- Axios for HTTP requests
- Firebase (client SDK) for authentication
- Stripe.js for payments
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js >= 14
- npm or yarn
- Access to the project's backend server (local or deployed)
- Firebase project credentials
- Stripe publishable key for client-side checkout

## 📁 Project Structure

```
DigitalLifeLession/
── backend/
   ├── index.js                 # Main server file with all routes
   ├── serviceKeyConverter.js   # Firebase service key utility
   ├── package.json             # Backend dependencies
   └── .env                     # Environment variables (not tracked)
   |--readme.md


 frontend/
   ├── src/
   │   ├── components/          # Reusable React components
   │   │   ├── Dashboard/       # Admin/Creator dashboard components
   │   │   ├── Form/            # Form components (Add/Update Lesson)
   │   │   ├── Home/            # Home page components
   │   │   ├── Modal/           # Modal dialogs
   │   │   ├── profile/         # User profile components
   │   │   ├── Shared/          # Shared UI components
   │   │   └── TopContributors/ # Top contributors display
   │   ├── pages/               # Page components
   │   │   ├── Dashboard/       # Dashboard pages by role
   │   │   ├── Home/            # Home page
   │   │   ├── Lessons/         # Lesson pages
   │   │   ├── Login/           # Authentication pages
   │   │   ├── Payment/         # Payment pages
   │   │   └── SignUp/          # Registration pages
   │   ├── hooks/               # Custom React hooks
   │   ├── providers/           # Context providers
   │   ├── routes/              # Route definitions
   │   ├── firebase/            # Firebase configuration
   │   ├── utils/               # Utility functions
   │   ├── main.jsx             # React entry point
   │   └── index.css            # Global styles   ├── vite.config.js           # Vite configuration
   ├── eslint.config.js         # ESLint configuration
   ├── package.json             # Frontend dependencies
   └── .env.local               # Environment variables (not tracked)

```

### Install & Run

1. From the repository root, change to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file (see next section), then start the dev server:

```bash
npm run dev
```

The app will be available at the Vite dev server address (default `http://localhost:5173`).

## Environment Variables

Create `frontend/.env.local` with the following variables (replace values):

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Stripe
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx

# Backend API
VITE_API_BASE_URL=http://localhost:3000
```

Notes:

- Vite exposes vars prefixed with `VITE_` to the client bundle.
- Do not commit `.env.local` to source control.

## Development Notes

- Authentication: the app uses Firebase client SDK to sign-in users. Tokens from Firebase are sent in the `Authorization` header as `Bearer <idToken>` for backend requests.
- API client: `src/hooks/useAxiosSecure.jsx` wraps Axios with an interceptor that attaches auth tokens and handles 401/403 flows.
- Routes: `src/routes/Routes.jsx` organizes public, private, and admin routes. Update here when adding pages.
- Forms: prefer controlled components and validate inputs before submission. Reuse shared components under `src/components/Shared`.

## Testing

- If the project includes tests, run:

```bash
npm run test
```

If no tests are configured, consider adding unit tests with Jest and React Testing Library.

## Building & Deployment

Build the production bundle:

```bash
npm run build
```

The output lands in `dist/`; serve it via a static host (Netlify, Vercel, Surge) or serve it behind your chosen backend.

Deployment tips:

- Set the same `VITE_API_BASE_URL` on the host environment to point to your backend URL.
- Configure Stripe redirect URLs and webhook endpoints to match your deployment domain.
- Use secure HTTPS in production.

## Linting & Formatting

This project includes ESLint configuration (`eslint.config.js`). Run linting with:

```bash
npm run lint
```

Add Prettier if you want automatic formatting on save/commit.

## Troubleshooting

- Blank page / bundle errors: ensure `VITE_*` environment variables are present and valid.
- Auth issues: check Firebase config and ensure backend verifies tokens via Firebase Admin SDK.
- CORS errors: confirm backend `CLIENT_DOMAIN` matches the frontend origin and backend CORS config allows it.

## Contributing

Please follow the repository contribution guidelines in the root `README.md`:

1. Fork the repo
2. Create a descriptive branch
3. Make small, testable changes with clear commits
4. Open a pull request with a concise description and testing notes

## License & Authors

This frontend is part of the Digital Life Lesson project and follows the repository license (MIT). See `LICENSE` at the repository root.

Maintained by MASUD RANA / DS Technology.

---

If you'd like, I can also:

- Add a minimal `frontend/CONTRIBUTING.md` with frontend-specific guidelines
- Create CI config for linting and testing (GitHub Actions)

Please tell me which you'd prefer next.

