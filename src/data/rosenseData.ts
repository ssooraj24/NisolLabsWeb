export const ROSENSE_DATA = {
  name: "RoSense AI",
  tagline: "Enterprise Intelligence & Strategy Engine",
  heroHeadline: "Turn Boardroom Conversations Into Immediate Execution.",
  heroSubheadline: "RoSense AI captures executive offsites and strategic meetings with absolute privacy, transforming spoken dialogue into structured decision blueprints and searchable organizational memory.",
  
  safeguards: [
    {
      title: "Zero Model Training",
      description: "Your proprietary conversation data is never used to train public AI models.",
      icon: "Shield"
    },
    {
      title: "Air-Gapped Ready",
      description: "Runs 100% offline on your private hardware appliance with zero internet dependency.",
      icon: "Cpu"
    },
    {
      title: "AES-256 Encrypted",
      description: "RAM-only audio decryption and enterprise zero-trust key management.",
      icon: "Lock"
    },
    {
      title: "DPDP & GDPR Compliant",
      description: "Built-in right to erasure and zero-retention ephemeral processing.",
      icon: "FileCheck"
    },
    {
      title: "100% Data Sovereignty",
      description: "You own all vector memory, transcripts, and master encryption keys.",
      icon: "Database"
    }
  ],

  pipelineSteps: [
    {
      stepNumber: "01",
      id: "listen",
      title: "Listen & Absorb",
      subtitle: "High-Fidelity Audio Ingestion & Speaker Identification",
      techBadge: "Intelligence Engine",
      description: "Upload multi-hour recordings, boardroom sessions, or multi-day workshop audio. RoSense accurately transcribes and identifies every speaker without missing detail.",
      features: [
        "Handles 18+ hour recordings without context degradation",
        "Speaker identification pinpoints exactly who made key commitments",
        "RAM-only audio processing guarantees strict data confidentiality",
        "Supports direct meeting ingestion, mobile recording, and multi-format audio"
      ],
      executionSnippet: {
        stage: "STAGE 01 EXECUTION",
        status: "Complete",
        detailHeader: "▶ Ingesting Executive Audio Stream",
        detailSub: "Session: Executive_Offsite_FullDay.m4a (18h 45m)",
        speakers: [
          "Speaker 01: CEO (34% talk time)",
          "Speaker 02: VP Operations (28% talk time)",
          "Speaker 03: Lead Counsel (18% talk time)"
        ]
      }
    },
    {
      stepNumber: "02",
      id: "structure",
      title: "Structure & Extract",
      subtitle: "Automated Decision & Commitment Extraction",
      techBadge: "Zero-Loss Reasoning",
      description: "Our intelligence engine processes full context windows to automatically categorize raw transcripts into verified, actionable business outputs.",
      features: [
        "Extracts structured outputs: Decisions, Objections, Commitments, and Action Owners",
        "Constant O(1) memory footprint eliminates system crashes on long sessions",
        "Exact audio timestamps linked to every extracted decision for 100% auditability",
        "Hallucination-free extraction validated by automated evaluation loops"
      ],
      executionSnippet: {
        stage: "STAGE 02 EXTRACTION",
        status: "Processing",
        detailHeader: "▶ Decision Extraction Active",
        detailSub: "Session Checkpoint: /checkpoints/session_93a1.pt",
        speakers: [
          "Decision #01: Q4 European expansion approved",
          "Commitment #04: Security audit by Aug 15 (Owner: Priya)",
          "Risk Alert: Legacy API latency overhead identified"
        ]
      }
    },
    {
      stepNumber: "03",
      id: "deliver",
      title: "Deliver & Secure",
      subtitle: "Executive Memory & Workflow Integration",
      techBadge: "Private Cloud",
      description: "Stores searchable organizational memory for instant query responses. Integrates seamlessly into your enterprise portals, Slack, Teams, or ERP systems.",
      features: [
        "Instant natural language search across years of executive decision history",
        "Automated integration into enterprise CRMs & ERP systems",
        "Role-Based Access Control (RBAC) ensuring strict departmental privacy",
        "Board-ready Executive Summaries generated in minutes post-session"
      ],
      executionSnippet: {
        stage: "STAGE 03 DELIVER",
        status: "Syncing",
        detailHeader: "▶ Organizational Memory Sync",
        detailSub: "Table: enterprise_memory_vault",
        speakers: [
          "Delivered -> Nisol Transformation Portal",
          "Executive Summary Generated -> Board PDF",
          "Search Index Ready -> Instant query response"
        ]
      }
    }
  ],

  useCases: [
    {
      badge: "C-Suite & Boardroom",
      title: "Executive Leadership",
      description: "Turn 18-hour board meetings, strategy offsites, and quarterly reviews into 5-minute executive summaries.",
      items: [
        "Board of Directors Meetings",
        "Annual Strategy Offsites",
        "Executive Committee Reviews",
        "M&A Evaluation Discussions"
      ]
    },
    {
      badge: "Consulting & Services",
      title: "Discovery Workshops",
      description: "Capture every client workshop and discovery session without missing key requirements or deliverables.",
      items: [
        "Multi-Day Client Workshops",
        "Strategy & Architecture Discovery",
        "Digital Transformation Programs",
        "Stakeholder Interview Series"
      ]
    },
    {
      badge: "100% On-Premise",
      title: "Government & Defense",
      description: "Ensure complete compliance, data sovereignty, and auditability for policy committees and public reviews.",
      items: [
        "Policy & Governance Committees",
        "Air-Gapped Confidential Reviews",
        "Regulatory Compliance Audits",
        "Public Hearing Records"
      ]
    },
    {
      badge: "Cross-Functional",
      title: "Large Enterprises",
      description: "Align cross-functional Product, Engineering, Finance, and Legal teams across enterprise silos.",
      items: [
        "Cross-Departmental Alignment",
        "Product Requirement Gathering",
        "Vendor Negotiation Audits",
        "Post-Mortem Incident Reviews"
      ]
    }
  ],

  deployments: [
    {
      title: "Private Cloud Managed Engine",
      badge: "CLOUD SCALABLE",
      description: "Deployed in your enterprise tenant on AWS, Azure, or Google Cloud with auto-scaling compute and encrypted storage.",
      specs: [
        "Cloud-native microservice architecture",
        "Encrypted audio vaults & asset storage",
        "Auto-scaling compute clusters",
        "Sub-second similarity search across historical memory"
      ]
    },
    {
      title: "On-Premise Appliance",
      badge: "AIR-GAPPED APPLIANCE",
      description: "Turnkey hardware appliance running locally inside your secure facility with zero external network connectivity.",
      specs: [
        "High-performance local GPU hardware",
        "100% local model execution & transcription",
        "Local containerized memory stack",
        "Zero data transmission outside your firewall"
      ]
    }
  ],

  awsIntegration: {
    title: "Enterprise Infrastructure & Security Architecture",
    description: "RoSense AI is built natively for enterprise cloud and hybrid on-premise deployment, combining scalable compute with resilient storage and security.",
    services: [
      {
        name: "Enterprise Cloud Compute",
        role: "Scalable Processing Clusters",
        description: "Runs containerized intelligence microservices with auto-scaling compute capacity."
      },
      {
        name: "Document Intelligence",
        role: "Multi-Modal Document Processing",
        description: "Extracts tables, forms, and slides presented during executive strategy sessions."
      },
      {
        name: "Container Orchestration",
        role: "High-Throughput Clusters",
        description: "Runs Dockerized transcription and intelligence engines with zero downtime."
      },
      {
        name: "Encrypted Storage Vault",
        role: "Encrypted Audio & Asset Vault",
        description: "AES-256 encrypted object storage for raw audio streams, decision checkpoints, and transcripts."
      }
    ]
  }
};
