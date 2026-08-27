export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  openingDate: string;
  description: string;
  responsibilities: string[];
  requirements: {
    experience: string;
    education: string;
    technical: string[];
    niceToHave?: string[];
  };
};

export const jobs: Job[] = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    location: "Remote / Tampa, FL",
    type: "Full-time",
    openingDate: "2025-09-01",
    description: "Build and productionize agentic systems that investigate, reason and produce cited evidence for financial crime teams. You will own model design, evaluation harnesses, and the feedback loop from investigator actions back into the system. This role sits at the intersection of research and production, with a strong emphasis on explainability, safety and auditability.",
    responsibilities: [
      "Design and implement LLM-powered agents for alert triage, evidence assembly and narrative generation",
      "Build evaluation frameworks that measure precision, recall and hallucination rates on real cases",
      "Own the RAG pipeline for watchlists, case files and internal knowledge with strict provenance",
      "Collaborate with compliance experts to define success metrics and guardrails",
      "Ship production services with monitoring, rollback and A/B testing",
    ],
    requirements: {
      experience: "5+ years building LLM-powered systems in production, with at least 2 years in a senior/lead capacity",
      education: "MS or PhD in Computer Science, ML, or related field, or equivalent industry experience",
      technical: [
        "Python expertise and production experience with PyTorch / JAX",
        "Strong background in RAG, tool use, agent orchestration and prompt engineering",
        "Experience with vector databases, feature stores and model serving at scale",
        "Track record of shipping models with measurable business impact",
      ],
      niceToHave: [
        "Publications or open-source contributions in NLP/Agents",
        "Experience in financial services, fraud or compliance",
      ],
    },
  },
  {
    id: "lead-data-scientist",
    title: "Lead Data Scientist",
    location: "Tampa, FL / Remote",
    type: "Full-time",
    openingDate: "2025-08-20",
    description: "Lead modeling for fraud, AML and entity resolution across the platform. You will define metrics, run experiments, and translate domain risk into models that are explainable and auditable for regulators.",
    responsibilities: [
      "Lead model development for real-time scoring and graph-based entity resolution",
      "Design experiments and A/B tests to measure business impact",
      "Partner with product and compliance to define success metrics",
      "Mentor junior data scientists and set modeling standards",
    ],
    requirements: {
      experience: "7+ years in data science, with 5+ years leading modeling teams in risk/fintech",
      education: "MS or PhD in Data Science, Statistics, Mathematics or related",
      technical: [
        "Expertise in graph ML, anomaly detection and evaluation design",
        "Python, SQL, and experience with large-scale feature stores",
        "Strong statistics and experimental design skills",
      ],
      niceToHave: [
        "Experience with financial crime modeling",
        "Knowledge of model risk management and SR 11-7",
      ],
    },
  },
  {
    id: "java-ai-engineer",
    title: "Java AI Engineer",
    location: "Remote / Abu Dhabi",
    type: "Full-time",
    openingDate: "2025-09-05",
    description: "Bridge Java services and AI workloads for real-time screening and scoring. Build high-throughput services, integrate models into Java microservices, and ensure low-latency inference at scale.",
    responsibilities: [
      "Design Java microservices for screening, scoring and orchestration",
      "Integrate Python models into JVM services with low latency",
      "Build observability and model monitoring pipelines",
    ],
    requirements: {
      experience: "5+ years Java backend development with AI/ML integration experience",
      education: "BS in Computer Science or equivalent",
      technical: [
        "Spring Boot, Kafka, and distributed systems",
        "Familiarity with model serving, feature stores and observability",
        "Experience with CI/CD and cloud deployment",
      ],
    },
  },
  {
    id: "forward-deployment-engineer",
    title: "Forward Deployment Engineer",
    location: "Tampa, FL / Dubai / Abu Dhabi",
    type: "Full-time",
    openingDate: "2025-08-28",
    description: "Be the technical face of SqAId in customer environments. Lead shadow deployments, tune systems to real traffic, and work with compliance teams to prove outcomes before cutover.",
    responsibilities: [
      "Lead shadow deployments and performance baselining",
      "Run technical workshops and tune systems to customer data",
      "Partner with solutions and customer success for production cutover",
    ],
    requirements: {
      experience: "5+ years in field engineering, solutions architecture, or professional services",
      education: "BS in CS, Engineering or related",
      technical: [
        "Deep understanding of financial crime workflows",
        "Strong communication and workshop delivery skills",
        "Willingness to travel 30-50% within region",
      ],
    },
  },
  {
    id: "bd-director",
    title: "Business Development Director",
    location: "Abu Dhabi / Dubai / India / Tampa, FL",
    type: "Full-time",
    openingDate: "2025-09-10",
    description: "Own pipeline and strategic accounts across MENA and APAC. Work closely with product and solutions to design proof-of-value engagements that convert to production.",
    responsibilities: [
      "Build and manage $1M+ ARR pipeline",
      "Lead executive sales cycles and POC design",
      "Develop regional partner ecosystem",
    ],
    requirements: {
      experience: "8+ years B2B SaaS sales in fintech, regtech or risk",
      education: "Bachelor's degree required",
      technical: [
        "Existing network in financial crime leadership",
        "Track record of building enterprise pipelines",
        "Excellent presentation and negotiation skills",
      ],
    },
  },
  {
    id: "sales-engineer",
    title: "Sales Engineer",
    location: "Remote / Dubai / India",
    type: "Full-time",
    openingDate: "2025-09-03",
    description: "Technical selling for SqAId. Run demos, build proof-of-value prototypes, and translate customer risk problems into platform solutions.",
    responsibilities: [
      "Run technical demos and proof-of-value engagements",
      "Build quick prototypes to illustrate customer scenarios",
      "Partner with sales on technical discovery",
    ],
    requirements: {
      experience: "5+ years as SE in security, fraud or compliance",
      education: "BS in CS, Engineering or related",
      technical: [
        "Strong demo and whiteboarding skills",
        "Understanding of AML, fraud and case management",
        "Comfort with Python or Java for quick prototypes",
      ],
    },
  },
];
