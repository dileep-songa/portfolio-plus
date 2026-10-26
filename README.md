# Dileep Songa â€” Personal Data Analyst Portfolio

A high-performance, dark premium glassmorphic personal portfolio website designed for **Data Analyst and Data Analytics Intern** opportunities.

**Live URL:** [https://dileep-songa.github.io/portfolio-plus/](https://dileep-songa.github.io/portfolio-plus/)
**LinkedIn:** [https://www.linkedin.com/in/dileepsonga/](https://www.linkedin.com/in/dileepsonga/)
**GitHub:** [https://github.com/dileep-songa/](https://github.com/dileep-songa/)
**Email:** [dileepsonga23@gmail.com](mailto:dileepsonga23@gmail.com)

---

## ðŸŽ¯ Overview & Positioning

This repository contains the official personal portfolio of **Dileep Songa**, Computer Science student at NRI Institute of Technology.

The portfolio is structured specifically for technical recruiters, analytics managers, and engineering teams, highlighting verified competencies in:
- **Data Cleaning & Wrangling:** Transforming raw, messy event logs and relational tables into standardized, query-ready datasets.
- **Exploratory Data Analysis (EDA):** Detecting statistical anomalies, distribution variances, and correlation patterns.
- **Data Warehousing & Modeling:** Google BigQuery staging architectures, schema contract validations, and dbt automated data tests.
- **Process Mining:** Discovering real-world workflow bottlenecks and Directly-Follows Graphs (DFG) using Python and PM4Py.
- **Deterministic Analytics Architecture:** Designing sandboxed execution kernels that isolate probabilistic AI planning from mathematical calculation.

---

## ðŸŽ¨ Visual Design & UX Philosophy

- **Dark Premium Glassmorphism:** Deep navy canvas (`#050811`, `#090e1a`) layered with subtle violet and cyan ambient gradients.
- **Translucent UI Surfaces:** Frosted backdrop blur (`16px`), ultra-fine borders (`rgba(255, 255, 255, 0.08)`), and restrained elevation shadows.
- **Accessibility & Performance:**
  - Semantic HTML5 landmark structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
  - WCAG AA contrast compliance with clear `:focus-visible` focus indicators for full keyboard navigation.
  - Native skip navigation link (`Skip to main content`).
  - Reduced-motion support via `@media (prefers-reduced-motion: reduce)`.
  - Zero heavy third-party framework dependencies; lightning-fast initial load times.

---

## ðŸ“‚ Project Structure

```text
portfolio-plus/
â”œâ”€â”€ index.html                   # Semantic HTML5 single-page application
â”œâ”€â”€ css/
â”‚   â”œâ”€â”€ theme.css               # Color tokens, glassmorphism parameters, typography
â”‚   â”œâ”€â”€ style.css               # Core layout, components, buttons, hero, modals
â”‚   â””â”€â”€ responsive.css          # Breakpoints (mobile, tablet, desktop, print)
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ data.js                 # Centralized single-source-of-truth profile & project data
â”‚   â””â”€â”€ main.js                 # Navigation drawer, modal controller, copy utilities
â”œâ”€â”€ public/
â”‚   â”œâ”€â”€ images/
â”‚   â”‚   â””â”€â”€ dileep-profile.png   # Your personal profile photo (with graceful monogram fallback)
â”‚   â””â”€â”€ resume/
â”‚       â””â”€â”€ Dileep_Songa_Resume.pdf # Your real resume PDF (activates direct Download button)
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ images/
â”‚   â”‚   â””â”€â”€ projects/
â”‚   â”‚       â””â”€â”€ careflow-dfg.png # Actual PM4Py DFG visualization from CareFlow project
â”‚   â””â”€â”€ icons/                  # Visual icons
â”œâ”€â”€ ASSET_UPDATE_GUIDE.md        # Dedicated step-by-step guide for updating photos & resumes
â”œâ”€â”€ LICENSE                      # MIT License
â””â”€â”€ README.md                    # Project documentation
```

---

## ðŸš€ Featured Projects

### 1. CareFlow â€” Clinical Pathway Process Mining
- **Summary:** Discovered emergency department patient workflows, waiting intervals, and bottlenecks from event logs.
- **Verified Metrics:** Analyzed 500 patient journeys (3,140 chronological events); discovered 7 distinct clinical activities and 6 care pathway variants; mean journey duration: 202.54 minutes.
- **Warehouse Testing:** Materialized `careflow_staging.stg_hospital_events` view in Google BigQuery; **20 dbt data tests passed** (validating primary keys, not-null constraints, and accepted values).
- **Stack:** Python, Pandas, PM4Py, Google BigQuery, dbt, SQL.
- **Integrity Note:** Event logs are deterministically simulated synthetic records to protect patient confidentiality; does not claim live hospital deployment or clinical outcomes.
- **Repository:** [careflow-clinical-pathway](https://github.com/dileep-songa/careflow-clinical-pathway)

### 2. AI DataOS â€” Autonomous Data Analytics Platform
- **Summary:** Engineered an enterprise-grade autonomous data analytics engine designed to separate LLM reasoning from deterministic calculation.
- **Verified Implementation:** Deterministic SQL/Python sandboxed execution runtime, Abstract Syntax Tree (AST) safety validator (blocking destructive `DROP` or `DELETE` queries), multi-engine connector adapters (PostgreSQL and CSV/Parquet files), and schema profiling contracts.
- **Stack:** Python, FastAPI, PostgreSQL, LangGraph, Pydantic, Redis.
- **Integrity Note:** Clearly separates verified execution kernel and database adapters from roadmap features (browser WASM sandboxing and interactive visual DAGs).

### 3. Flipkart Sales & Customer Analytics
- **Summary:** Retail transaction analysis and customer segmentation methodology framework.
- **Analytical Scope:** Category revenue distribution, discount elasticity modeling, Recency-Frequency-Monetary (RFM) segmentation, and cohort retention queries.
- **Stack:** Python, Pandas, SQL, Microsoft Excel.
- **Status:** Analytical framework structured; repository and dataset ingestion pipeline currently prepared for publication.

---

## ðŸ›  Local Development & Testing

### Option 1: Direct File Open
Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Python Local Server (Recommended)
```bash
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: Node.js HTTP Server
```bash
npx http-server -p 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## âš™ï¸ Personal Asset Updates & Configuration

For full details, see the dedicated [**ASSET_UPDATE_GUIDE.md**](ASSET_UPDATE_GUIDE.md).

### 1. Central Configuration (`js/data.js`)
All asset paths, profile details, and project data are centralized in `js/data.js`:
```javascript
const PORTFOLIO_CONFIG = {
  assets: {
    profilePhotoPath: "public/images/dileep-profile.png",
    resumePdfPath: "public/resume/Dileep_Songa_Resume.pdf",
    resumeDownloadFilename: "Dileep_Songa_Resume.pdf"
  }
};
```

### 2. Adding / Updating Your Profile Photo
Place your photo at: `public/images/dileep-profile.png`.
The site automatically detects and displays your headshot with a glowing glassmorphism frame. If the file is not yet placed, the site gracefully falls back to the stylized monogram avatar (`DS`).

### 3. Adding / Updating Your Resume PDF
Place your resume PDF at: `public/resume/Dileep_Songa_Resume.pdf`.
The site automatically detects the real PDF and activates the **â€œDownload Resumeâ€** button. If the file is missing, the site gracefully prevents broken links by displaying a **â€œRequest Resumeâ€** contact button and a local development notice.

---

## ðŸš¢ Deployment

### Deploy to GitHub Pages
1. Ensure your changes are committed on your working branch.
2. Merge the feature branch into `main` after review:
   ```bash
   git checkout main
   git merge dev-portfolio
   git push origin main
   ```
3. In your GitHub repository:
   - Navigate to **Settings** â†’ **Pages**.
   - Under **Build and deployment** > **Branch**, select `main` and `/ (root)`.
   - Click **Save**.
4. Your website will be live at `https://dileep-songa.github.io/portfolio-plus/`.

---

## ðŸ“ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
