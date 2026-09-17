# 🚀 CareerCraft AI — Production-Ready AI-Powered Career SaaS Platform

A full-stack, enterprise-grade AI Career SaaS platform built with the **MERN Stack** (MongoDB, Express.js, React, Node.js), **Google Gemini API** (via the modern `@google/genai` SDK), and **Razorpay Subscriptions** for recurring billing.

CareerCraft AI empowers job seekers to build **100% ATS-compliant resumes** and analyze existing resumes against target job descriptions with **instant AI-generated ATS compatibility scores**, gap analyses, and automated metric-driven bullet point enhancements.

---

## 🌟 Core Features

### 1. 🔐 Authentication & Role Management
- **Secure JWT Flow**: Short-lived access tokens with automatic 401 refresh token rotation.
- **Bcrypt Hashing**: 10-round salted password encryption.
- **Tier-Based Access**: Multi-tier permissions (`free` vs `premium`) with automatic quota tracking.

### 2. 📝 Multi-Step AI Resume Builder
- **7-Step Guided Wizard**: Personal Info → Summary → Work Experience → Education → Skills → Projects → Certifications.
- **✨ Google X-Y-Z Bullet Point Quantifier**: Rewrites vague job duties into high-impact metric statements (*"Accomplished [X] as measured by [Y], by doing [Z]"*).
- **✨ Professional Summary Generator**: AI generates a compelling 3-line executive elevator pitch tailored to your target title.
- **✨ In-Demand Skill Recommender**: Recommends missing technical keywords for your role.
- **3 ATS-Safe Resume Templates**:
  - *Classic ATS Professional*: 100% single-column layout optimized for Workday, Taleo, Greenhouse.
  - *Modern Tech Minimalist*: Clean dark-accented layout with technology tags for software engineers.
  - *Executive Elite*: High-density layout with executive banner for senior leadership roles.
- **Real-Time Live Preview Pane**: Dynamic zoom controls and live synchronization with cloud drafts.
- **Vector PDF Export**: Generates crisp, selectable, vector-based ATS-parseable PDFs.

### 3. 🔍 AI Resume Analyzer & ATS Scoring Suite
- **PDF File Parsing**: Extract and sanitize text directly from uploaded PDFs via `pdf-parse`.
- **Target Job Matcher**: Paste any job description to evaluate keyword coverage and detect missing competencies.
- **6-Dimension Scoring Breakdown**:
  - 🎨 *Formatting & Parseability* (0–100)
  - 🔑 *Keyword Match Density* (0–100)
  - 📊 *Quantified Impact & Numbers* (0–100)
  - ⚡ *Action Verb Strength* (0–100)
  - 📏 *Length & Structural Hierarchy* (0–100)
  - 📇 *Contact Completeness* (0–100)
- **Interactive Breakdown Visualizers**: SVG Circular Score Gauge, Recharts Radar Chart, and Progress Bars.
- **Actionable AI Recommendations**: Specific before/after rewrite examples with priority badges.
- **Grammar & Clarity Checker**: Detects phrasing inconsistencies and verb-tense errors.
- **Historical Tracking**: Stores past analyses in MongoDB to monitor ATS score improvement over time.

### 4. 💳 Subscription & Billing Engine (Razorpay)
- **Free Tier Quota**: 1 active resume + 2 ATS scans per month (automatically resets monthly).
- **Pro Tier ($9 / ₹499 monthly or $79 / ₹3,999 annual)**: Unlimited resumes, unlimited scans, all templates, priority AI processing.
- **Secure Webhook Verification**: HMAC SHA256 signature verification (`x-razorpay-signature`) for payments, renewals, and cancellations.
- **Usage Limit Middleware**: Blocks requests exceeding monthly allowances with `403 UPGRADE_REQUIRED`.
- **Dev Test Mode**: Includes 1-click test upgrade helper for offline development.

### 5. 📊 Candidate Dashboard & Analytics
- **Summary Metrics**: Saved resumes, total analyses run, average ATS score, and current plan status.
- **Score Trend Chart**: Recharts Area chart tracking score progression over time.
- **Resume Management**: Edit, duplicate, download PDF, or delete saved resumes.
- **Analysis History**: View past reports with score badges and timestamp details.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18 (Vite), Tailwind CSS, React Router v6, Zustand, Axios, Recharts, Lucide React, Canvas-Confetti, jsPDF / html2canvas |
| **Backend** | Node.js, Express.js, MongoDB with Mongoose, JWT (`jsonwebtoken`), Bcrypt.js, Multer, `pdf-parse`, `express-rate-limit`, `morgan` |
| **AI Intelligence** | Google Gemini API (`gemini-3.7-flash` / `gemini-2.5-flash`) via official `@google/genai` SDK |
| **Payments** | Razorpay Subscriptions API, Razorpay Webhook Signatures, Razorpay Checkout SDK |
| **Testing** | Jest, Supertest |

---

## 📁 Architecture & Directory Structure

```
ai-career-saas/
├── client/                     # React + Vite Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/
│   │   │   ├── analyzer/       # AtsScoreGauge, ScoreRadar, KeywordsCard, SuggestionsCard, GrammarCard
│   │   │   ├── auth/           # AuthModal, ProtectedRoute
│   │   │   ├── common/         # Navbar, Footer, Modal, Badge, Toast
│   │   │   ├── resume-builder/ # Wizard forms (PersonalInfo, Summary, Experience, Education, Skills, Projects, Certs), LivePreviewPane
│   │   │   ├── subscription/   # UpgradeModal, PricingCards
│   │   │   └── templates/      # ClassicAtsTemplate, ModernTechTemplate, ExecutiveEliteTemplate, TemplateRenderer
│   │   ├── pages/              # LandingPage, DashboardPage, BuilderPage, AnalyzerPage, PricingPage, AuthPage, NotFoundPage
│   │   ├── services/           # axiosClient, authApi, resumeApi, analysisApi, subscriptionApi, userApi
│   │   ├── store/              # authStore, resumeStore, analysisStore, uiStore (Zustand)
│   │   ├── utils/              # exportPdf, constants
│   │   ├── App.jsx             # Main router
│   │   ├── index.css           # Tailwind + ATS print styles
│   │   └── main.jsx            # React root
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Express.js + Node.js Backend
│   ├── config/                 # db.js, gemini.js, razorpay.js, constants.js
│   ├── controllers/            # authController, resumeController, analysisController, subscriptionController, userController
│   ├── middleware/             # auth.js, usageLimit.js, rateLimiter.js, upload.js, errorHandler.js
│   ├── models/                 # User.js, Resume.js, Analysis.js, Subscription.js
│   ├── routes/                 # authRoutes, resumeRoutes, analysisRoutes, subscriptionRoutes, userRoutes
│   ├── utils/                  # geminiClient.js, geminiPrompts.js, pdfParser.js, sampleData.js
│   ├── tests/                  # auth.test.js, atsParser.test.js, usageLimit.test.js
│   ├── server.js               # Express application entry
│   ├── package.json
│   ├── .env                    # Local runtime variables
│   └── .env.example            # Environment template
│
├── package.json                # Monorepo runner
└── README.md
```

---

## ⚙️ Environment Variables (`server/.env`)

Create a `.env` file in the `server/` directory:

```env
# Server Port & Client URL
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# MongoDB Connection String (Local or MongoDB Atlas)
MONGODB_URI=mongodb://127.0.0.1:27017/ai-career-saas

# JWT Authentication
JWT_SECRET=super_secret_jwt_access_key_career_saas_2026
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=super_secret_jwt_refresh_key_career_saas_2026
JWT_REFRESH_EXPIRES_IN=30d

# Google Gemini AI (Get free key from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.7-flash

# Razorpay Subscriptions & Webhooks (Test mode)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret

# Free Tier Usage Thresholds
FREE_TIER_MAX_RESUMES=1
FREE_TIER_MAX_ANALYSES_PER_MONTH=2
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** v18+ (Node v20 or v24 recommended)
- **npm** v9+
- **MongoDB** (Local instance or free MongoDB Atlas cluster)

### 2. Installation
Clone the repository and install all dependencies:

```bash
# Install root, backend, and frontend packages
npm run install-all
```

Or install manually:
```bash
# Server packages
cd server
npm install

# Client packages
cd ../client
npm install
```

### 3. Run Backend Server
```bash
cd server
npm run dev
```
The API server starts on **`http://localhost:5000`** (Health check: `http://localhost:5000/api/health`).

### 4. Run Frontend Client
```bash
cd client
npm run dev
```
The React application starts on **`http://localhost:5173`**.

---

## 🧪 Running Automated Tests

Run backend unit and integration tests:

```bash
cd server
npm test
```

Test coverage includes:
- `atsParser.test.js`: Validates PDF buffer parser and structured Gemini JSON schemas.
- `auth.test.js`: Validates registration, credential hashing, and JWT authorization.
- `usageLimit.test.js`: Validates free tier usage gating and Pro role bypasses.

---

## 📡 API Reference

### Auth Endpoints (`/api/auth`)
- `POST /register`: Create new user account.
- `POST /login`: Sign in with email and password.
- `POST /refresh`: Refresh expired JWT access token.
- `GET /me`: Fetch authenticated user profile and usage counters.
- `POST /logout`: Invalidate session.

### Resume Builder Endpoints (`/api/resumes`)
- `GET /`: Get all resumes for current user.
- `POST /`: Create a new resume draft (enforces free tier limit).
- `GET /:id`: Get specific resume by ID.
- `PUT /:id`: Save/update resume sections and title.
- `DELETE /:id`: Delete resume.
- `POST /:id/duplicate`: Duplicate resume.
- `POST /enhance-section`: Call Gemini AI to enhance summary, quantify bullets, or suggest skills.

### ATS Analyzer Endpoints (`/api/analysis`)
- `POST /upload-and-analyze`: Upload PDF or paste text + target job description for full ATS scoring.
- `GET /history`: Get chronological list of past ATS scans.
- `GET /:id`: Get detailed ATS analysis report by ID.
- `DELETE /:id`: Delete analysis record.

### Subscription Endpoints (`/api/subscription`)
- `GET /plans`: List active subscription plans.
- `POST /create-order`: Initialize Razorpay checkout order.
- `POST /verify-payment`: Verify payment signature and activate Pro tier.
- `POST /webhook`: Razorpay webhook handler for automated recurring billing.
- `POST /test-upgrade`: 1-Click instant test upgrade helper for local development.

### User Analytics Endpoints (`/api/user`)
- `GET /dashboard-stats`: Aggregate metrics, score trends for Recharts, and quota usage.
- `PUT /profile`: Update candidate name/profile.

---

## 🚢 Production Deployment

### Frontend (Vercel / Netlify)
1. Push `client/` to GitHub.
2. Link project to Vercel/Netlify.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Set environment variable: `VITE_API_BASE_URL=https://your-backend.railway.app/api`

### Backend (Render / Railway)
1. Push `server/` to GitHub.
2. Link repository to Render/Railway.
3. Build command: `npm install`
4. Start command: `node server.js`
5. Set environment variables in dashboard (`MONGODB_URI`, `GEMINI_API_KEY`, `JWT_SECRET`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `CLIENT_URL`).

---

## 📄 License
MIT License. Built for job seekers and career accelerators.
