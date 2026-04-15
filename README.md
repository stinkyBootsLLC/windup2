
# WIndUp 2.0 Dance Events Website Design

A high-performance, edge-deployed talent registration system designed for the performing arts industry. This application streamlines the collection of performer data, professional disciplines, and high-resolution media assets.

## Technical Highlights

* **Edge-First Architecture:** Built on **Vercel Edge Functions** and **Turso (libSQL)** to ensure sub-100ms database latency globally.
* **Binary Data Pipeline:** Implemented a custom **chunked Base64 encoding** algorithm to handle large file uploads (headshots/resumes) within the memory constraints of serverless edge runtimes, preventing stack overflow errors.
* **State Machine UI:** Utilized a centralized **status-based state machine** in React to manage the submission lifecycle, eliminating "impossible states" and providing a polished UX.
* **Defensive Engineering:** Comprehensive input sanitization and shared validation logic to ensure data integrity and security against XSS and injection.

## The Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Vercel Edge Functions (TypeScript) |
| **Database** | Turso (SQLite/libSQL) |
| **Accessibility** | WCAG 2 AA compliance |

---

## System Architecture

1.  **Client-Side Validation:** Immediate feedback on data types, string lengths, and file constraints.
2.  **Binary Processing:** Files are converted into binary-safe strings using a chunked array-processing method to protect the JS call stack.
3.  **Edge API:** A secure POST endpoint sanitizes inputs and interfaces with the Turso HTTP bridge.
4.  **Persistent Storage:** Data is stored in a relational schema with BLOB support for media assets.

## Getting Started

### Environment Variables
To run this project locally, create a `.env` file with the following:
```bash
windup_TURSO_DATABASE_URL=your_database_url
windup_TURSO_AUTH_TOKEN=your_auth_token
```

### Installation
1. Clone the repository.
2. Install dependencies: `npm install`.
3. Run the development server via Vercel CLI: `vercel dev`.

---

## License


