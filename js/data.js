/**
 * ==============================================================================
 * PORTFOLIO CONFIGURATION - PERSONAL ASSET PATHS & PROFILE SETTINGS
 * ==============================================================================
 * Central configuration file for Dileep Songa's portfolio.
 * 
 * To update your personal photo or resume:
 * 1. Place your photo at:  public/images/dileep-profile.png
 * 2. Place your resume at: public/resume/Dileep_Songa_Resume.pdf
 * 
 * If you prefer different file names, simply update the paths below.
 * For complete step-by-step instructions, see: ASSET_UPDATE_GUIDE.md
 */

const PORTFOLIO_CONFIG = {
  assets: {
    // Path to your profile picture (Supported: PNG, JPG, WebP)
    profilePhotoPath: "public/images/dileep-profile.png",

    // Path to your real resume PDF
    resumePdfPath: "public/resume/Dileep_Songa_Resume.pdf",

    // Suggested filename when downloaded by recruiters
    resumeDownloadFilename: "Dileep_Songa_Resume.pdf"
  }
};

/**
 * ==============================================================================
 * PORTFOLIO DATA - SINGLE SOURCE OF TRUTH
 * ==============================================================================
 */
const PORTFOLIO_DATA = {
  profile: {
    name: "Dileep Songa",
    headline: "Aspiring Data Analyst",
    subheadline: "Python | SQL | Google BigQuery | dbt | Exploratory Analytics",
    statusBadge: "Available for Data Analyst & Intern Roles",
    bio: "Computer Science student at NRI Institute of Technology focused on transforming raw, ambiguous datasets into reliable business insights. I specialize in reproducible data cleaning, exploratory analysis, SQL modeling, BigQuery warehousing, and workflow process mining.",
    education: {
      institution: "NRI Institute of Technology",
      degree: "Bachelor of Technology in Computer Science & Engineering",
      status: "Undergraduate Student",
      focusAreas: "Data Structures, Database Management Systems (DBMS), Python Programming, Statistical Computing"
    },
    contact: {
      email: "dileepsonga23@gmail.com",
      linkedin: "https://www.linkedin.com/in/dileepsonga/",
      github: "https://github.com/dileep-songa/",
      profileImagePath: PORTFOLIO_CONFIG.assets.profilePhotoPath,
      resumePdfPath: PORTFOLIO_CONFIG.assets.resumePdfPath
    }
  },

  skills: [
    {
      category: "Programming & Scripting",
      icon: "code",
      items: [
        { name: "Python", level: "Core", note: "Pandas, NumPy, data manipulation, automation" },
        { name: "C Language", level: "Foundational", note: "Algorithms, structured problem solving, memory basics" }
      ]
    },
    {
      category: "Analytics & Methodology",
      icon: "activity",
      items: [
        { name: "Data Cleaning & Wrangling", level: "Core", note: "Schema validation, null handling, type casting" },
        { name: "Exploratory Data Analysis (EDA)", level: "Core", note: "Hypothesis checks, outlier detection, correlations" },
        { name: "Descriptive Statistics", level: "Demonstrable", note: "Mean, median, distributions, variance, quartiles" },
        { name: "Process Mining", level: "Demonstrable", note: "Directly-Follows Graphs (DFG), pathway variants" }
      ]
    },
    {
      category: "Data Querying & Warehousing",
      icon: "database",
      items: [
        { name: "SQL", level: "Core", note: "Aggregations, joins, window functions, CTEs" },
        { name: "Google BigQuery", level: "Demonstrable", note: "Partitioned datasets, staging schemas, cloud analytics" },
        { name: "dbt (Data Build Tool)", level: "Demonstrable", note: "Staging views, schema testing, automated constraints" }
      ]
    },
    {
      category: "Visualization & BI Tools",
      icon: "bar-chart",
      items: [
        { name: "Microsoft Excel", level: "Demonstrable", note: "Pivot tables, lookups (XLOOKUP/VLOOKUP), summaries" },
        { name: "Power BI", level: "Foundational", note: "Dimensional modeling, visual metrics, report layouts" },
        { name: "PM4Py & Matplotlib", level: "Demonstrable", note: "Process flow visualizers, statistical plotting" }
      ]
    },
    {
      category: "Developer Tools & Version Control",
      icon: "git-branch",
      items: [
        { name: "Git & GitHub", level: "Core", note: "Branch management, semantic commits, PR reviews" },
        { name: "VS Code & Terminals", level: "Core", note: "PowerShell, Bash, Python venv, linting" }
      ]
    }
  ],

  projects: [
    {
      id: "careflow",
      title: "CareFlow — Clinical Pathway Process Mining",
      tagline: "Emergency Department Workflow & Bottleneck Analytics",
      status: "Verified Implementation",
      badgeType: "badge-verified",
      category: "Healthcare Process Analytics",
      problem: "Emergency healthcare departments frequently suffer from patient congestion, non-standard re-triage cycles, and prolonged waiting times between consultation and diagnostic labs.",
      dataset: {
        source: "Synthetic EHR patient encounter generator (`src/data_generator.py`)",
        volume: "500 patient journeys | 3,140 chronological events",
        provenance: "Synthetically simulated to protect patient confidentiality while modeling real-world ED bottlenecks."
      },
      tools: ["Python", "Pandas", "PM4Py", "Google BigQuery", "dbt", "SQL"],
      methods: [
        "Chronological patient lifecycle simulation with intentional bottleneck loops.",
        "Offline BigQuery schema contract validation (`src/bq_loader.py`).",
        "dbt staging view modeling (`careflow_staging.stg_hospital_events`).",
        "Warehouse integrity testing: 20 dbt data tests executed and passed.",
        "PM4Py Directly-Follows Graph (DFG) discovery and pathway variant classification."
      ],
      verifiedFindings: [
        "Discovered 7 distinct emergency activities across 6 structural care pathways.",
        "Top variant (Standard ED pathway) accounts for 40% of cases (200 encounters).",
        "Average patient journey duration measured at 202.54 minutes (median: 211.0 min; min: 95.0 min; max: 354.0 min).",
        "Re-triage loopbacks and diagnostic delays (Lab/X-Ray) contribute up to 58% of overall wait-time expansion."
      ],
      limitations: "Analyzed event data is purely synthetic/simulated. It is designed for operational methodology validation and does NOT claim real hospital clinical outcomes or production clinical deployment.",
      githubUrl: "https://github.com/dileep-songa/careflow-clinical-pathway",
      demoUrl: null,
      image: "assets/images/projects/careflow-dfg.png",
      hasVisualArtifact: true
    },
    {
      id: "ai-dataos",
      title: "AI DataOS — Autonomous Data Analytics Platform",
      tagline: "Deterministic Execution Kernel for Transparent Data Analytics",
      status: "Verified Core Architecture",
      badgeType: "badge-verified",
      category: "Analytics Platform & Architecture",
      problem: "Traditional conversational AI tools hallucinate database numbers and lack operational security when connecting directly to enterprise warehouses.",
      dataset: {
        source: "Multi-engine enterprise connectors (PostgreSQL schemas & local CSV/Parquet files)",
        volume: "Structured relational tables and analytical flat files",
        provenance: "Metadata graph extraction with zero raw data retention by default."
      },
      tools: ["Python", "FastAPI", "PostgreSQL", "LangGraph", "Pydantic", "Redis"],
      methods: [
        "Separation of probabilistic query planning (LLM orchestrator) from deterministic calculation (SAK executor).",
        "AST (Abstract Syntax Tree) static analysis to prevent destructive SQL operations (`DROP`, `DELETE`).",
        "Federated database connector adapters for PostgreSQL and tabular file streams.",
        "Human-in-the-Loop (HITL) risk tiering engine for approval-gated transformations."
      ],
      verifiedFindings: [
        "Guaranteed mathematical trust by delegating all arithmetic and aggregations to sandboxed execution environments.",
        "Prevented unauthorized table drops and recursive execution escapes through AST security validation.",
        "Standardized schema profiling contracts across both relational databases and tabular file formats."
      ],
      limitations: "Core Python execution kernel and adapters are verified. Browser-based WASM sandboxing and interactive visual lineage DAG are active roadmap items.",
      githubUrl: "https://github.com/dileep-songa",
      demoUrl: null,
      image: null,
      hasVisualArtifact: false
    },
    {
      id: "flipkart-analytics",
      title: "Flipkart Sales & Customer Analytics",
      tagline: "E-Commerce Transaction Patterns & Segmentation Framework",
      status: "Analytical Case Study",
      badgeType: "badge-case-study",
      category: "Retail E-Commerce Analytics",
      problem: "Evaluating category profitability, discount sensitivity, and repeat purchase patterns across dynamic retail transactions.",
      dataset: {
        source: "E-commerce transactional records and product category listings",
        volume: "Multi-category retail orders (pricing, discounts, customer IDs, timestamps)",
        provenance: "Curated retail analytics dataset for exploratory methodology study."
      },
      tools: ["Python", "Pandas", "SQL", "Microsoft Excel"],
      methods: [
        "Data hygiene & cleaning: standardizing currency fields, parsing dates, handling missing category attributes.",
        "Exploratory Data Analysis (EDA) on order distributions, average basket values, and discount ranges.",
        "Recency, Frequency, Monetary (RFM) customer segmentation framework.",
        "Category contribution margin and seasonal trend modeling."
      ],
      verifiedFindings: [
        "Established analytical framework for evaluating discount elasticity across high-volume product categories.",
        "Modeled repeatable SQL queries for cohort analysis and monthly customer retention metrics."
      ],
      limitations: "Analytical framework and data transformation methodology documented; open-source repository release and dataset pipeline currently being prepared for publication.",
      githubUrl: "https://github.com/dileep-songa",
      demoUrl: null,
      image: null,
      hasVisualArtifact: false
    }
  ],

  educationTimeline: [
    {
      title: "B.Tech in Computer Science & Engineering",
      institution: "NRI Institute of Technology",
      period: "Undergraduate Program",
      description: "Rigorous coursework in Data Structures, Database Systems, Computer Networks, and Statistical Programming. Practical emphasis on Python, SQL, and analytical problem-solving."
    }
  ]
};

// Export for module systems or attach to window for browser usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PORTFOLIO_CONFIG, PORTFOLIO_DATA };
} else {
  window.PORTFOLIO_CONFIG = PORTFOLIO_CONFIG;
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
