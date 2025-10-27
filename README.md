# 🪐 Orbit Match Pro: Holistic Strategy Engine

> **Enhanced Product:** Right Fit Matcher (MBA/MS Focus)
> **Deployed Demo:** _\[Add your frontend URL here\]_

## Video Demo

[Watch on Loom](https://www.loom.com/share/3910117d2f7b41a3a29f69f58de9109b)

## 🚀 Overview

**Orbit Match Pro** is a reimagined version of Orbit AI’s _Right Fit Matcher_, built as a **holistic strategy engine** that helps students dynamically balance **admission probability** and **financial ROI** using a personalized algorithm and interactive dashboard.

Instead of merely predicting admission chances, Orbit Match Pro **empowers users to optimize their profile strategy** — combining quantitative factors (GMAT, GPA, Work Experience) and qualitative insights (resume alignment, scholarship data).

## 💡 Product Choice & Strategic Rationale

- **Selected Product**Right Fit Matcher (MBA/MS Focus)
- **Rationale**Chosen to demonstrate robust algorithmic modeling, database design, and full-stack integration.
- **Enhancement Focus**Shifted from static recommendation engine to a
- **dynamic, strategy-driven system** that allows user-controlled balancing of priorities.
- **Mission Alignment**Reinforces Orbit AI’s mission of democratizing access to higher education by empowering students to maximize both
  **admission probability** and **financial aid potential**.

## ✨ Core Enhancements & Value

FeatureDescriptionOutcome

- **Strategy Slider (α)**Dynamic user control between _Admission Odds_ and _Financial ROI_.Personalized, real-time re-ranking of universities.
- **Holistic Algorithm**Integrates quantitative metrics + qualitative keyword matching.More realistic, context-aware results.
- **Profile Scan (AI Mock)**Parses uploaded resume to extract keywords and identify profile gaps.Enhances engagement and data quality.
- **Dynamic Dashboard**Real-time charts & metric comparisons via Recharts.Improves user understanding & visualization.
- **Dark Mode + Responsive Design**Tailwind-driven adaptive theming.Mobile- and accessibility-ready.
- **Production-ready Auth**Clerk.dev integration for secure login & session management.Enterprise-grade authentication.

## 🧩 Technical Architecture

LayerTechnologyPurpose

- **Frontend**Next.js 16 (App Router), TypeScriptModern, fast, and component-driven interface
- **Backend**Node.js + Express (TypeScript)RESTful API handling core logic and data operations
- **Database**PostgreSQL + Prisma ORMType-safe schema and optimized queries
- **State Management**ZustandLightweight, reactive global store
- **Authentication**Clerk.devSecure user identity and session management
- **Styling & Visualization**Tailwind CSS, lucide-react, rechartsSemantic UI and interactive charts
- **Deployment**Netlify (Frontend), Render (Backend)Cloud-deployed with environment variables

## 🧮 The 𝑺_total Algorithm

### Formula:

Stotal=α⋅Sadmit+(1−α)⋅Sscholarship+SqualitativeS\_{total} = \\alpha \\cdot S\_{admit} + (1 - \\alpha) \\cdot S\_{scholarship} + S\_{qualitative}Stotal​=α⋅Sadmit​+(1−α)⋅Sscholarship​+Squalitative​

### Components:

VariableDefinitionRange
**S_admit**Normalized inverse distance between user metrics (GMAT, GPA, Work Exp) and university medians.0.0 – 1.0
**S_scholarship**Weighted by average aid and applicant’s merit vs. median.0.0 – 1.0
**S_qualitative**Bonus for matching keywords (resume vs. program focus).0.0 – 0.1
**α (alpha)**User-chosen tradeoff (0–1): 1 → Admission Priority, 0 → ROI Priority.0.0 – 1.0

### Example:

If a user prioritizes ROI (α = 0.3), the system emphasizes scholarship-heavy programs while still considering admission likelihood.

## 🖥️ Frontend Implementation

**Framework:** Next.js 16 (App Router)
**Security:** Clerk-protected routes via middleware

**Frontend Highlights**

- Real-time validation in FormSteps.tsx
- Dynamic sorting via useMemo in MatchResultsDashboard.tsx
- Auth-protected routes under (main)/layout.tsx
- Global error/loading handling via Zustand

## ⚙️ Backend & API Endpoints

**Stack:** Express + TypeScript + Prisma + PostgreSQL

**Endpoints:**

EndpointMethodAuthFunction

- /api/matchPOST✅Executes the 𝑆_total algorithm and returns ranked results
- /api/profile/scanPOST✅Mock AI endpoint — extracts resume keywords
- /api/universitiesGET✅Fetches static university list (22 seeded records)

**Error Handling:**

- Centralized error middleware
- Validation via Zod schemas
- Proper HTTP status codes

## ⚡ Setup & Installation

### Prerequisites

- Node.js ≥ 18
- PostgreSQL running locally or remotely
- NPM or Yarn

### 1️⃣ Clone Repository

`git clone https://github.com/MDub3y/orbit-match-pro.git `
`cd orbit-match-pro`

### 2️⃣ Install Dependencies

`npm install  # or  yarn install`

### 3️⃣ Configure Environment Variables

Create .env in both frontend and backend folders:

#### Backend .env

`DATABASE_URL=postgresql://user:password@localhost:5432/orbitdb  CLERK_SECRET_KEY=your_clerk_backend_key  PORT=5000`

#### Frontend .env.local

`NEXT_PUBLIC_API_URL=http://localhost:5000  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_frontend_key`

### 4️⃣ Run the Development Servers

`# Backend  cd backend  npm run dev  # Frontend  cd frontend-new  npm run dev`

Frontend: [http://localhost:3000](http://localhost:3000)Backend: [http://localhost:3001](http://localhost:3001)

## 🌐 Deployment

ServiceRoleURL

- **Vercel**Frontend Hosting
- **Render / Railway**Backend API
- **Supabase / Neon / Railway**PostgreSQL Database

## 🧰 Bonus & Enhancements

- ✅ Clerk-based Authentication
- ✅ Zustand Global State
- ✅ Responsive Design
- ✅ Dark Mode
- ✅ Dynamic Sorting (Strategy Slider)
- ✅ Charts & Data Visualization (Recharts)
- ✅ Server + Client Validation
- ✅ Centralized Error Handling
- ✅ AI Resume Parsing (Mock API)

## 🔮 Future Enhancements

- Real integration with Orbit’s production API
- User analytics dashboard (trend of acceptances, ROI prediction)
- Profile optimization suggestions with ML (AI resume enhancement)
- Export results as PDF/CSV
- PWA offline capability
- University detail pages with richer metadata

## 🧑‍💻 Credits

**Developed by:** \[Your Name\]**Email:** \[Your Email\]**GitHub:** \[Your GitHub Link\]

### ⭐ If this project inspired you, give it a star!
