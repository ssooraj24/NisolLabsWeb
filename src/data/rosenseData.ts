export const ROSENSE_DATA = {
  name: "RoSense AI",
  tagline: "Enterprise Conversation Intelligence Platform",
  heroHeadline: "Turn 18 Hours of Strategy into Immediate Execution.",
  heroSubheadline: "RoSense AI captures conversations, extracts decisions and commitments, and builds a searchable organizational memory—privately, securely, and at enterprise scale.",
  
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
      description: "You own all vector embeddings, transcripts, and master encryption keys.",
      icon: "Database"
    }
  ],

  pipelineSteps: [
    {
      stepNumber: "01",
      id: "listen",
      title: "Listen",
      subtitle: "Multi-Hour Audio Ingestion & Speaker Diarization",
      techBadge: "WhisperX + Pyannote 3.1",
      description: "Upload multi-hour recordings, boardroom sessions, or multi-day workshop audio. RoSense accurately transcribes and identifies every speaker without context degradation.",
      features: [
        "Handles 18+ hour recordings with zero context degradation",
        "Pyannote 3.1 speaker diarization pinpoints exactly who spoke when",
        "RAM-only audio decryption guarantees strict data confidentiality",
        "Supports direct zoom bot ingestion, phone PWA recording, and multi-format upload"
      ],
      executionSnippet: {
        stage: "STAGE 01 EXECUTION",
        status: "Complete",
        detailHeader: "▶ Ingesting 14.3GB Audio Stream",
        detailSub: "File: Executive_Offsite_FullDay.m4a (18h 45m)",
        speakers: [
          "Speaker 01: CEO (34% talk time)",
          "Speaker 02: VP Engineering (28% talk time)",
          "Speaker 03: Lead Counsel (18% talk time)"
        ]
      }
    },
    {
      stepNumber: "02",
      id: "structure",
      title: "Structure",
      subtitle: "Zero-Shot Decision & Commitment Extraction",
      techBadge: "Mamba-3 2.8B SSM Engine",
      description: "Proprietary State Space Model (SSM) processes infinite context windows in O(1) constant memory. Automatically categorizes raw transcripts into verified business outputs.",
      features: [
        "Extracts structured JSON: Decisions, Objections, Commitments, and Action Owners",
        "Constant O(1) memory footprint eliminates Transformer OOM crashes on long sessions",
        "Exact timestamp audio proofs linked to every extracted decision",
        "Hallucination-free extraction validated by local evaluation loops"
      ],
      executionSnippet: {
        stage: "STAGE 02 EXTRACTION",
        status: "Processing",
        detailHeader: "▶ Mamba-3 State Machine Active",
        detailSub: "State Checkpoint: /checkpoints/job_93a1.pt",
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
      title: "Deliver",
      subtitle: "Executive Memory & Workflow Integration",
      techBadge: "Supabase pgvector + AWS Cloud API",
      description: "Stores vectorized semantic memory for instant natural language search. Streams real-time webhooks into Nisol Studio, Slack, Teams, or custom enterprise ERPs.",
      features: [
        "High-performance cosine vector search over 1M+ embedding segments",
        "Automated Webhooks with exponential backoff into enterprise CRMs & ERPs",
        "Role-Based Access Control (RBAC) ensuring strict departmental privacy",
        "Board-ready Executive Summaries generated in minutes post-session"
      ],
      executionSnippet: {
        stage: "STAGE 03 DELIVER",
        status: "Syncing",
        detailHeader: "▶ Vector Indexing Complete",
        detailSub: "Table: rosense_embeddings (bge-large-en-v1.5 1024-dim)",
        speakers: [
          "Webhook Delivered -> Nisol Transformation Portal",
          "Executive Summary Generated -> Board PDF",
          "Vector Search Ready -> Sub-10ms response"
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
      title: "RoSense Cloud (AWS Native)",
      badge: "CLOUD SCALABLE",
      description: "Deployed on AWS EC2/ECS container clusters, AWS S3 audio vaults, and Supabase Cloud vector storage.",
      specs: [
        "Serverless microservice architecture",
        "AWS S3 audio encryption & storage buckets",
        "FastAPI + Celery + Redis scale-out pool",
        "Supabase pgvector sub-10ms similarity search"
      ]
    },
    {
      title: "RoSense Box (On-Prem Appliance)",
      badge: "AIR-GAPPED APPLIANCE",
      description: "Turnkey hardware appliance running locally inside your secure facility with zero external network connectivity.",
      specs: [
        "Private Ryzen 9 + NVIDIA RTX GPU Hardware",
        "100% local model execution (WhisperX + Mamba-3)",
        "Local Docker + Supabase container stack",
        "Zero data transmission outside your firewall"
      ]
    }
  ],

  awsIntegration: {
    title: "Enterprise AWS Cloud Infrastructure Stack",
    description: "RoSense AI is built natively for AWS Cloud deployment, combining high-throughput GPU compute with resilient managed storage and security services.",
    services: [
      {
        name: "AWS Bedrock",
        role: "LLM Orchestration & Guardrails",
        description: "Enforces enterprise security guardrails and fine-tuned model evaluation across all structured extractions."
      },
      {
        name: "AWS Textract",
        role: "Multi-Modal Document Processing",
        description: "Extracts tables, forms, and handwritten slides attached during executive strategy sessions."
      },
      {
        name: "AWS EC2 & ECS",
        role: "High-Throughput Container Clusters",
        description: "Runs Dockerized WhisperX, Pyannote, and FastAPI microservices with auto-scaling GPU instances."
      },
      {
        name: "AWS S3 Vault",
        role: "Encrypted Audio & Asset Vault",
        description: "AES-256 encrypted object storage for raw audio streams, state checkpoints, and generated transcripts."
      }
    ]
  }
};
