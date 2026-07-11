(function (global) {
  "use strict";

  var ENTITIES = [
    {
      id: "profile",
      name: "Akshaj Nadimpalli",
      type: "profile",
      aliases: ["akshaj", "about akshaj", "bio", "background", "overview", "who is he", "who is akshaj"],
      tags: ["software engineer", "student", "founder", "researcher", "georgia tech", "computer science", "applied ai"],
      summary: "Akshaj is a Georgia Tech computer science student who builds applied AI systems, backend infrastructure, product experiences, and robotics software.",
      details: [
        "He is currently a software engineering intern at Travelers, founder and lead developer of Signifi, a Georgia Tech aerospace robotics researcher, and a project lead in Big Data Big Impact.",
        "His work usually spans the full path from model or prototype to evaluation, infrastructure, human approval, and a usable interface.",
        "He is open to software engineering, applied AI, and research opportunities."
      ],
      metrics: ["4.0 Georgia Tech GPA", "10+ AI products and applications built", "$25K in startup cloud funding", "4 hackathon wins and 2 track finalist finishes"],
      stack: ["Python", "Java", "C++", "TypeScript", "SQL", "Swift", "AWS", "Docker", "Terraform", "React Native", "FastAPI"],
      links: [
        { label: "GitHub", href: "https://github.com/akshajnad" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/akshaj-nadimpalli/" },
        { label: "Resume", href: "resume.pdf" }
      ],
      section: "#about",
      related: ["travelers", "signifi", "aerospace", "graption"],
      suggestions: ["What is Akshaj building now?", "What makes him stand out?", "Which roles fit him best?"]
    },
    {
      id: "travelers",
      name: "Travelers internship",
      type: "experience",
      aliases: ["travelers", "current internship", "software engineering intern", "servicenow agent", "ticket agent", "support ticket system", "enterprise ai"],
      tags: ["internship", "enterprise", "insurance", "support", "ticket triage", "agentic workflow", "human in the loop", "platform engineering"],
      summary: "At Travelers, Akshaj is building a serverless agent system that classifies, diagnoses, and drafts resolutions for ServiceNow tickets from a 150+ user data platform processing 8,000+ jobs each day.",
      details: [
        "EventBridge and Lambda route tickets across six root-cause categories to a Bedrock supervisor that delegates retrieval and diagnosis work.",
        "Step Functions and API Gateway callbacks keep a human approval gate before resolution notes are written back to ServiceNow or added to the knowledge base.",
        "The system is instrumented with Dynatrace and Graylog and delivered across dev, UAT, and production through EKS, Terraform, and GitHub Actions."
      ],
      metrics: ["150+ platform users", "8,000+ jobs per day", "Diagnosis reduced from roughly 60 minutes to under 5", "Routine-ticket path designed for about 40% of request work"],
      stack: ["AWS Bedrock", "Lambda", "EventBridge", "Step Functions", "API Gateway", "DynamoDB", "EKS", "Terraform", "GitHub Actions", "Dynatrace", "Graylog", "ServiceNow"],
      links: [{ label: "View experience section", href: "#experience" }],
      section: "#experience",
      related: ["skills", "signifi", "ria"],
      suggestions: ["How does the Travelers system work?", "What impact did it have?", "What AWS services did he use?"]
    },
    {
      id: "signifi",
      name: "Signifi",
      type: "startup",
      aliases: ["signifi", "startup", "founder", "requirements platform", "prd generator", "product requirements", "create x", "create-x"],
      tags: ["founder", "product", "requirements", "prototypes", "artifact graph", "schema validation", "ai product", "pilot teams"],
      summary: "Signifi is an AI-native requirements platform that turns raw notes and transcripts into linked PRDs, user stories, test cases, timelines, and interactive prototypes.",
      details: [
        "A 50+ node artifact graph links outputs back to their source requirements, so edits propagate to the correct artifacts instead of regenerating everything.",
        "Schema-constrained outputs and a PatternRegistry keep generated interfaces inside valid application patterns and reduce design drift.",
        "Atomic patches update only the affected requirements and prototype components."
      ],
      metrics: ["3 pilot teams", "$25K in Microsoft for Startups funding", "50+ linked artifact nodes", "Klaus Startup Challenge finalist"],
      stack: ["TypeScript", "Next.js", "AI structured outputs", "Schema validation", "Artifact graphs", "PatternRegistry"],
      links: [{ label: "Visit Signifi", href: "https://www.signifi.tech/" }],
      section: "#work",
      related: ["profile", "travelers", "skills"],
      suggestions: ["How does Signifi avoid AI drift?", "What traction does Signifi have?", "Compare Signifi and the Travelers system"]
    },
    {
      id: "aerospace",
      name: "Multi-agent spacecraft research",
      type: "research",
      aliases: ["aerospace robotics lab", "spacecraft", "space research", "multi agent spacecraft", "ros2 simulation", "mujoco", "formation control", "robotics research"],
      tags: ["research", "robotics", "spacecraft", "simulation", "decentralized learning", "formation control", "gnc", "autonomy"],
      summary: "In Georgia Tech's Aerospace Robotics Lab, Akshaj built a ROS2 and MuJoCo spacecraft simulator where eight agents run independent perception and control loops at 500 Hz.",
      details: [
        "The simulator coordinates physics, guidance-navigation-control, onboard vision, and formation control without requiring expensive physical test data.",
        "It generated structured rollouts for decentralized training and collision-free coordination."
      ],
      metrics: ["8 independently controlled agents", "500 Hz simulation", "Roughly 500 training rollouts", "About 20% lower simulated fuel cost"],
      stack: ["ROS2", "MuJoCo", "Python", "C++", "Machine learning", "Simulation"],
      links: [{ label: "View research work", href: "#work" }],
      section: "#work",
      related: ["graption", "skills", "profile"],
      suggestions: ["How does the spacecraft simulator work?", "What was the research impact?", "What robotics tools does he know?"]
    },
    {
      id: "graption",
      name: "Graption",
      type: "project",
      aliases: ["graption", "captioning", "live captions", "speaker aware captions", "active speaker", "accessibility project", "hacklytics"],
      tags: ["accessibility", "multimodal ai", "computer vision", "speech", "real time", "bdbi", "project lead"],
      summary: "Graption is a speaker-aware live-captioning platform that identifies who is speaking from audio, lip movement, and gestures, then places captions near that person.",
      details: [
        "A React Native client receives captions from FastAPI over WebSockets while OpenCV, MediaPipe, Whisper, and audio events contribute active-speaker signals.",
        "A retrieval layer stores the transcript and surrounding conversation so users can ask what they missed.",
        "Akshaj leads the 15-person Big Data Big Impact team turning the hackathon prototype into a persistent platform."
      ],
      metrics: ["0.74 F1 on 8 hours of audio-video", "30 FPS", "Under 1.5 seconds end-to-end latency", "Hacklytics winner"],
      stack: ["React Native", "FastAPI", "WebSockets", "PostgreSQL", "OpenCV", "MediaPipe", "Whisper", "Python"],
      links: [{ label: "View repository", href: "https://github.com/akshajnad/hacklytics-2026" }],
      section: "#work",
      related: ["buywise", "aerospace", "awards"],
      suggestions: ["How does Graption identify the speaker?", "What were Graption's metrics?", "Which hackathon did Graption win?"]
    },
    {
      id: "ria",
      name: "RIA Advisory internship",
      type: "experience",
      aliases: ["ria", "ria advisory", "first internship", "billing internship", "oracle billing", "ormb", "etl internship"],
      tags: ["internship", "fintech", "billing", "etl", "anomaly detection", "backend", "data engineering"],
      summary: "At RIA Advisory, Akshaj automated recurring revenue and billing workflows in Oracle ORMB through Python ETL pipelines on AWS Lambda and S3.",
      details: [
        "He built reconciliation checks and staging-data validation to catch incomplete or inconsistent records before production billing.",
        "He also developed Spring Boot and MySQL pricing APIs plus SQL and ORMB templates for new billing scenarios."
      ],
      metrics: ["Random forest reached 0.88 precision", "0.79 recall", "21 misbilled records identified"],
      stack: ["Python", "AWS Lambda", "S3", "Oracle ORMB", "SQL", "Spring Boot", "Java", "MySQL", "Scikit-learn"],
      links: [{ label: "View experience section", href: "#experience" }],
      section: "#experience",
      related: ["travelers", "finmate", "skills"],
      suggestions: ["What did he build at RIA?", "How did the anomaly model perform?", "Compare his two internships"]
    },
    {
      id: "gridly",
      name: "Gridly",
      type: "project",
      aliases: ["gridly", "energyhack", "smart plug", "carbon scheduling", "low carbon", "vultr project"],
      tags: ["iot", "energy", "websocket", "hardware", "carbon", "hackathon", "scheduling"],
      summary: "Gridly controls a physical smart plug and schedules device use around user deadlines and lower-carbon grid windows.",
      details: [
        "The team controlled a smart plug in Kennesaw from a web app in Atlanta through a bidirectional WebSocket channel.",
        "A Vultr-hosted service combined Electricity Maps data with user constraints and returned structured schedules."
      ],
      metrics: ["Real hardware test across two Georgia cities", "Best Use of Vultr at EnergyHack"],
      stack: ["WebSockets", "Vultr VPS", "Vultr AI Agents", "PostgreSQL", "Electricity Maps API", "IoT"],
      links: [{ label: "View repository", href: "https://github.com/akshajnad/energyhacks-gt" }],
      section: "#work",
      related: ["awards", "ppp-pocket", "finmate"],
      suggestions: ["How did Gridly control real hardware?", "What did Gridly win?", "Show his other hackathon projects"]
    },
    {
      id: "finmate",
      name: "FinMate",
      type: "project",
      aliases: ["finmate", "codelinc", "benefits assistant", "financial benefits", "financial ai"],
      tags: ["financial ai", "rag", "tool calling", "guardrails", "hackathon", "aws"],
      summary: "FinMate is a financial-benefits assistant that retrieves policy context from S3, generates grounded answers with Claude on Bedrock, and can call tools to update a user's dashboard.",
      details: [
        "The RAG pipeline used Titan embeddings, Bedrock Guardrails, Lambda, API Gateway, and CloudWatch tracing.",
        "It was designed to take actions rather than only return text."
      ],
      metrics: ["13 of 15 grounded-answer evaluation score", "codeLinc10 winner"],
      stack: ["AWS Bedrock", "Claude", "Titan embeddings", "S3", "Lambda", "API Gateway", "CloudWatch", "RAG", "Tool calling"],
      links: [{ label: "View Devpost", href: "https://devpost.com/akshajnad" }],
      section: "#work",
      related: ["awards", "travelers", "ria"],
      suggestions: ["How was FinMate grounded?", "What did FinMate win?", "Which projects use AWS Bedrock?"]
    },
    {
      id: "ppp-pocket",
      name: "PPP Pocket",
      type: "project",
      aliases: ["ppp pocket", "ppp", "purchasing power", "capital one hack", "geobudget", "smart spend"],
      tags: ["fintech", "budgeting", "purchasing power", "hackathon", "capital one"],
      summary: "PPP Pocket combines a purchasing-power score, geographic budgeting, spending insights, and shareable reports to make personal finances easier to interpret across locations.",
      details: ["The product included GeoBudget and Smart-Spend experiences backed by account and transaction data."],
      metrics: ["Capital One Best Financial Hack", "HackGT 2025 Capital One Track finalist"],
      stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Edge Functions", "TypeScript"],
      links: [{ label: "View Devpost", href: "https://devpost.com/akshajnad" }],
      section: "#recognition",
      related: ["awards", "finmate", "gridly"],
      suggestions: ["What did PPP Pocket win?", "How did PPP Pocket work?", "Show all hackathon projects"]
    },
    {
      id: "veritas",
      name: "Veritas",
      type: "project",
      aliases: ["veritas", "yhack", "yale hacks", "medical bill", "insurance dispute", "k2 think"],
      tags: ["healthcare", "multi agent", "document analysis", "medical bills", "hackathon"],
      summary: "Veritas analyzes medical bills and insurance documents, explains suspected errors, and coordinates email, legal-research, and voice agents to support disputes.",
      details: ["It was built as a multi-agent workflow around document understanding and dispute support."],
      metrics: ["YHack 2026 K2 Think V2 Track finalist"],
      stack: ["AI agents", "Document analysis", "Email automation", "Voice agents", "Legal research"],
      links: [{ label: "View Devpost", href: "https://devpost.com/akshajnad" }],
      section: "#recognition",
      related: ["awards", "finmate", "signifi"],
      suggestions: ["How does Veritas work?", "What recognition did it receive?", "Show other AI projects"]
    },
    {
      id: "talking-fingers",
      name: "Talking Fingers",
      type: "project",
      aliases: ["talking fingers", "asl app", "sign language app", "apple vision hands", "ios club vision project"],
      tags: ["ios", "accessibility", "computer vision", "sign language", "on device", "apple vision"],
      summary: "Talking Fingers is a Georgia Tech iOS Club app that scores live sign-language practice from Apple Vision hand and body observations.",
      details: [
        "Hand and body observations become normalized SignFrame references.",
        "Static signs use geometric joint matching, while dynamic signs use dynamic time warping over handshape and shoulder-relative wrist trajectories.",
        "A graded SwiftUI camera view streams confidence into the lesson experience."
      ],
      metrics: ["37 reference signs", "Includes dynamic J and Z motions"],
      stack: ["Swift", "SwiftUI", "Apple Vision", "Computer vision", "Dynamic time warping"],
      links: [{ label: "View repository", href: "https://github.com/gtiosclub/Talking-Fingers" }],
      section: "#work",
      related: ["skillswap", "graption", "skills"],
      suggestions: ["How does Talking Fingers score a sign?", "What iOS work has he done?", "Compare Talking Fingers and Graption"]
    },
    {
      id: "skillswap",
      name: "SkillSwap",
      type: "project",
      aliases: ["skillswap", "skill swap", "peer learning app", "ios club learning app"],
      tags: ["ios", "education", "on device ai", "lesson plans", "quizzes", "peer learning"],
      summary: "SkillSwap is a Georgia Tech iOS Club peer-learning app where on-device models turn a selected skill into structured lesson plans and quizzes.",
      details: [
        "Akshaj worked on the AI generation pipeline using Core ML and Apple Foundation Models.",
        "Completion data connects generated lessons and quizzes to personalized progress statistics in the SwiftUI experience."
      ],
      metrics: ["On-device generation", "Structured lesson, quiz, and progress flow"],
      stack: ["Swift", "SwiftUI", "Core ML", "Apple Foundation Models", "Firebase", "MVVM"],
      links: [{ label: "View selected work", href: "#work" }],
      section: "#work",
      related: ["talking-fingers", "skills", "graption"],
      suggestions: ["What did Akshaj build in SkillSwap?", "What iOS technologies does he know?", "Compare SkillSwap and Talking Fingers"]
    },
    {
      id: "buywise",
      name: "BuyWise",
      type: "project",
      aliases: ["buywise", "buy wise", "price forecast", "buy or wait", "keepa", "shopping extension"],
      tags: ["retail", "forecasting", "chrome extension", "time series", "bdbi", "shopping"],
      summary: "BuyWise is a Chrome extension that turns Keepa product-price histories into time-series features and gives shoppers a buy-or-wait recommendation on the product page.",
      details: ["The product was designed to explain the timing signal rather than show only a score."],
      metrics: ["Recommendation appears without leaving the product page"],
      stack: ["Chrome extension", "Keepa API", "Time-series features", "Forecasting", "JavaScript"],
      links: [{ label: "View BDBI projects", href: "https://www.gtbigdatabigimpact.com/projects" }],
      section: "#work",
      related: ["graption", "skills", "signifi"],
      suggestions: ["How does BuyWise make a recommendation?", "What BDBI projects has he worked on?", "Show data-focused projects"]
    },
    {
      id: "education",
      name: "Georgia Tech education",
      type: "education",
      aliases: ["education", "school", "college", "georgia tech", "gpa", "graduation", "class of 2028", "degree"],
      tags: ["student", "computer science", "atlanta", "undergraduate"],
      summary: "Akshaj is pursuing a B.S. in Computer Science at the Georgia Institute of Technology and expects to graduate in May 2028.",
      details: ["He currently has a 4.0 / 4.0 GPA."],
      metrics: ["Expected graduation: May 2028", "GPA: 4.0 / 4.0"],
      stack: [],
      links: [{ label: "View about section", href: "#about" }],
      section: "#about",
      related: ["profile", "skills"],
      suggestions: ["What is his GPA?", "What does he study?", "What technical skills does he have?"]
    },
    {
      id: "skills",
      name: "Technical skills",
      type: "skills",
      aliases: ["skills", "tech stack", "technology", "technologies", "languages", "tools", "frameworks", "what does he know"],
      tags: ["programming", "machine learning", "cloud", "backend", "frontend", "mobile", "devops"],
      summary: "Akshaj works across programming languages, AI and data tooling, cloud infrastructure, backend systems, mobile, and product development.",
      details: [
        "Languages: Python, Java, C++, TypeScript, SQL, Swift, and Bash.",
        "AI and data: PyTorch, Scikit-learn, Hugging Face, LangGraph, and Pinecone.",
        "Systems: AWS, Docker, Terraform, EKS, GitHub Actions, REST, and GraphQL.",
        "Product: Next.js, React Native, Angular, FastAPI, Spring Boot, and Supabase."
      ],
      metrics: [],
      stack: ["Python", "Java", "C++", "TypeScript", "SQL", "Swift", "Bash", "PyTorch", "Scikit-learn", "Hugging Face", "LangGraph", "Pinecone", "AWS", "Docker", "Terraform", "EKS", "GitHub Actions", "REST", "GraphQL", "Next.js", "React Native", "Angular", "FastAPI", "Spring Boot", "Supabase"],
      links: [{ label: "View toolkit", href: "#about" }],
      section: "#about",
      related: ["travelers", "signifi", "aerospace"],
      suggestions: ["Where has he used Python?", "Which projects use AWS?", "What mobile development has he done?"]
    },
    {
      id: "awards",
      name: "Hackathon awards and recognition",
      type: "recognition",
      aliases: ["awards", "recognition", "hackathons", "wins", "winner", "finalist", "prizes", "accomplishments"],
      tags: ["hackathon", "competition", "winner", "finalist"],
      summary: "Akshaj has four hackathon wins and two track finalist finishes, plus Signifi was a Klaus Startup Challenge finalist.",
      details: [
        "Hacklytics winner for Graption.",
        "codeLinc10 winner for FinMate.",
        "Best Use of Vultr at EnergyHack for Gridly.",
        "Capital One Best Financial Hack at HackGT for PPP Pocket.",
        "YHack K2 Think V2 Track finalist for Veritas and HackGT Capital One Track finalist for PPP Pocket.",
        "Klaus Startup Challenge finalist for Signifi."
      ],
      metrics: ["4 hackathon wins", "2 track finalist finishes", "1 startup challenge finalist finish"],
      stack: [],
      links: [{ label: "View recognition", href: "#recognition" }, { label: "View Devpost", href: "https://devpost.com/akshajnad" }],
      section: "#recognition",
      related: ["graption", "finmate", "gridly", "ppp-pocket", "veritas"],
      suggestions: ["Which project won Hacklytics?", "Tell me about FinMate", "Show all hackathon projects"]
    },
    {
      id: "contact",
      name: "Contact information",
      type: "contact",
      aliases: ["contact", "email", "reach", "linkedin", "github", "devpost", "resume", "connect", "hire"],
      tags: ["contact", "social", "resume"],
      summary: "Akshaj can be reached at akshajnadn@gmail.com and is open to software engineering, applied AI, and research opportunities.",
      details: [],
      metrics: [],
      stack: [],
      links: [
        { label: "Email Akshaj", href: "mailto:akshajnadn@gmail.com" },
        { label: "GitHub", href: "https://github.com/akshajnad" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/akshaj-nadimpalli/" },
        { label: "Devpost", href: "https://devpost.com/akshajnad" },
        { label: "Resume", href: "resume.pdf" }
      ],
      section: "#contact-title",
      related: ["profile", "education"],
      suggestions: ["Why should a recruiter hire him?", "Which roles fit him best?", "What is he building now?"]
    },
    {
      id: "hobbies",
      name: "Interests outside engineering",
      type: "personal",
      aliases: ["hobbies", "outside engineering", "fun", "personal interests", "tennis", "violin", "hiking"],
      tags: ["tennis", "violin", "hiking"],
      summary: "Outside engineering, Akshaj plays tennis and violin and enjoys hiking.",
      details: [],
      metrics: [],
      stack: [],
      links: [{ label: "View about section", href: "#about" }],
      section: "#about",
      related: ["profile"],
      suggestions: ["Tell me about Akshaj", "What is he building now?", "How can I contact him?"]
    },
    {
      id: "publications",
      name: "Earlier publications",
      type: "research",
      aliases: ["publications", "papers", "research papers", "published", "swarm intelligence", "startup success study"],
      tags: ["research", "paper", "swarm intelligence", "startups"],
      summary: "The site links two earlier publications: one on adaptive collective strategies for swarm intelligence and one studying factors in startup success.",
      details: [],
      metrics: [],
      stack: [],
      links: [
        { label: "Swarm intelligence paper", href: "Adaptive_Collective_Strategies_for_Swarm_Intelligence_Applications.pdf" },
        { label: "Startup success study", href: "The Influence of Various Factors in a Startup’s Success_ A Comprehensive Study.pdf" }
      ],
      section: "#recognition",
      related: ["aerospace", "signifi"],
      suggestions: ["Tell me about his robotics research", "What is Signifi?", "What research work has he done?"]
    }
  ];

  var STOP_WORDS = new Set([
    "a", "an", "and", "are", "as", "at", "be", "been", "but", "by", "can", "could", "did", "do", "does", "for", "from", "had", "has", "have", "he", "her", "him", "his", "how", "i", "in", "is", "it", "its", "me", "more", "of", "on", "or", "please", "she", "tell", "than", "that", "the", "their", "them", "they", "this", "to", "us", "was", "were", "what", "when", "where", "which", "who", "why", "will", "with", "would", "you"
  ]);

  var LOW_SIGNAL = new Set(["ai", "app", "build", "built", "project", "work", "system", "software", "tech", "technical"]);

  var SYNONYMS = {
    internship: ["intern", "internships", "job", "jobs", "employment", "experience", "role", "roles"],
    project: ["projects", "product", "products", "application", "applications", "app", "apps", "build", "built"],
    skills: ["skill", "stack", "technology", "technologies", "tools", "framework", "frameworks", "languages", "programming"],
    awards: ["award", "recognition", "win", "wins", "won", "winner", "finalist", "hackathon", "hackathons", "prize", "prizes"],
    education: ["school", "college", "degree", "gpa", "graduation", "student", "university"],
    current: ["currently", "now", "today", "present", "latest"],
    impact: ["metric", "metrics", "result", "results", "outcome", "outcomes", "performance", "improvement", "improvements"],
    contact: ["email", "reach", "connect", "linkedin", "github", "devpost"],
    research: ["lab", "paper", "papers", "publication", "publications", "robotics"],
    compare: ["comparison", "versus", "vs", "difference", "different"],
    strongest: ["best", "top", "most impressive", "standout", "strongest", "biggest"],
    recruiter: ["hire", "recruiter", "fit", "candidate", "qualified", "qualification", "strength", "strengths"]
  };

  var UNIQUE_ENTITY_TERMS = {
    "travelers": ["travelers", "servicenow"],
    "signifi": ["signifi"],
    "aerospace": ["spacecraft", "aerospace robotics", "formation control"],
    "graption": ["graption", "hacklytics"],
    "ria": ["ria advisory", "oracle ormb", "ormb"],
    "gridly": ["gridly", "energyhack"],
    "finmate": ["finmate", "codelinc"],
    "ppp-pocket": ["ppp pocket", "geobudget"],
    "veritas": ["veritas", "yhack", "k2 think"],
    "talking-fingers": ["talking fingers"],
    "skillswap": ["skillswap", "skill swap"],
    "buywise": ["buywise", "buy wise", "keepa"],
    "education": ["georgia tech"],
    "awards": ["hackathon awards"],
    "publications": ["swarm intelligence paper", "startup success study"]
  };

  var TECH_ALIASES = {
    "Python": ["python"],
    "Java": ["java"],
    "C++": ["c++", "cpp", "c plus plus"],
    "TypeScript": ["typescript", "type script"],
    "SQL": ["sql"],
    "Swift": ["swift"],
    "SwiftUI": ["swiftui", "swift ui"],
    "AWS": ["aws", "amazon web services"],
    "AWS Bedrock": ["bedrock", "aws bedrock"],
    "Lambda": ["lambda", "aws lambda"],
    "EventBridge": ["eventbridge", "event bridge"],
    "Step Functions": ["step functions", "step function"],
    "API Gateway": ["api gateway"],
    "EKS": ["eks", "kubernetes"],
    "Docker": ["docker", "containers", "containerization"],
    "Terraform": ["terraform", "infrastructure as code", "iac"],
    "GitHub Actions": ["github actions", "ci cd", "cicd", "continuous integration"],
    "React Native": ["react native", "reactnative"],
    "Next.js": ["next.js", "nextjs", "next js"],
    "FastAPI": ["fastapi", "fast api"],
    "Spring Boot": ["spring boot", "springboot"],
    "Supabase": ["supabase"],
    "PostgreSQL": ["postgresql", "postgres"],
    "MySQL": ["mysql"],
    "ROS2": ["ros2", "ros 2"],
    "MuJoCo": ["mujoco"],
    "OpenCV": ["opencv", "open cv"],
    "MediaPipe": ["mediapipe", "media pipe"],
    "Whisper": ["whisper"],
    "WebSockets": ["websocket", "websockets", "web sockets"],
    "PyTorch": ["pytorch", "torch"],
    "Scikit-learn": ["scikit learn", "scikit-learn", "sklearn"],
    "Core ML": ["core ml", "coreml"],
    "Apple Vision": ["apple vision", "vision framework"],
    "Firebase": ["firebase"],
    "RAG": ["rag", "retrieval augmented generation", "retrieval"],
    "Machine learning": ["machine learning", "ml", "model", "models"]
  };

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[’']/g, "")
      .replace(/c\s*\+\s*\+/g, "c++")
      .replace(/[^a-z0-9+.#\-\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function stem(word) {
    var value = word;
    if (value.length > 5 && value.endsWith("ies")) value = value.slice(0, -3) + "y";
    else if (value.length > 5 && value.endsWith("ing")) value = value.slice(0, -3);
    else if (value.length > 4 && value.endsWith("ed")) value = value.slice(0, -2);
    else if (value.length > 4 && value.endsWith("es")) value = value.slice(0, -2);
    else if (value.length > 3 && value.endsWith("s") && !value.endsWith("ss")) value = value.slice(0, -1);
    return value;
  }

  function tokenize(value, keepStopWords) {
    return normalize(value).split(" ").filter(function (word) {
      return word && (keepStopWords || !STOP_WORDS.has(word));
    }).map(stem);
  }

  function unique(values) {
    return Array.from(new Set(values.filter(Boolean)));
  }

  function expandTokens(tokens) {
    var expanded = tokens.slice();
    Object.keys(SYNONYMS).forEach(function (canonical) {
      var forms = [canonical].concat(SYNONYMS[canonical]).map(normalize);
      if (forms.some(function (form) { return tokens.indexOf(stem(form)) !== -1; })) expanded.push(canonical);
    });
    return unique(expanded);
  }

  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var previous = new Array(b.length + 1);
    var current = new Array(b.length + 1);
    for (var j = 0; j <= b.length; j += 1) previous[j] = j;
    for (var i = 1; i <= a.length; i += 1) {
      current[0] = i;
      for (j = 1; j <= b.length; j += 1) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          current[j] = Math.min(current[j], previous[j - 2] + cost);
        }
      }
      var swap = previous;
      previous = current;
      current = swap;
    }
    return previous[b.length];
  }

  function includesPhrase(haystack, needle) {
    var normalizedNeedle = normalize(needle);
    if (!normalizedNeedle) return false;
    return (" " + normalize(haystack) + " ").indexOf(" " + normalizedNeedle + " ") !== -1;
  }

  function recordText(record) {
    return [record.name, record.type]
      .concat(record.aliases || [], record.tags || [], record.stack || [], record.details || [], record.metrics || [], [record.summary || ""])
      .join(" ");
  }

  function scoreRecord(record, query) {
    var normalizedQuery = normalize(query);
    var queryTokens = expandTokens(tokenize(query));
    var score = 0;
    var name = normalize(record.name);
    var aliases = (record.aliases || []).map(normalize);
    var titleTokens = tokenize(record.name, true);
    var aliasTokens = tokenize((record.aliases || []).join(" "), true);
    var tagTokens = tokenize((record.tags || []).join(" "), true);
    var stackTokens = tokenize((record.stack || []).join(" "), true);
    var bodyTokens = tokenize(recordText(record), true);

    if (normalizedQuery === name) score += 80;
    if (includesPhrase(normalizedQuery, name)) score += 45;

    aliases.forEach(function (alias) {
      if (normalizedQuery === alias) score += 70;
      else if (includesPhrase(normalizedQuery, alias)) score += alias.indexOf(" ") !== -1 ? 35 : 24;
    });

    queryTokens.forEach(function (token) {
      var multiplier = LOW_SIGNAL.has(token) ? 0.45 : 1;
      if (titleTokens.indexOf(token) !== -1) score += 12 * multiplier;
      if (aliasTokens.indexOf(token) !== -1) score += 9 * multiplier;
      if (tagTokens.indexOf(token) !== -1) score += 6 * multiplier;
      if (stackTokens.indexOf(token) !== -1) score += 6 * multiplier;
      if (bodyTokens.indexOf(token) !== -1) score += 2 * multiplier;

      if (token.length >= 5 && bodyTokens.indexOf(token) === -1) {
        var candidates = unique(titleTokens.concat(aliasTokens, tagTokens, stackTokens)).filter(function (candidate) {
          return candidate.length >= 4 && Math.abs(candidate.length - token.length) <= 2;
        });
        var fuzzyMatch = candidates.some(function (candidate) {
          var maxDistance = token.length >= 8 ? 2 : 1;
          return editDistance(token, candidate) <= maxDistance;
        });
        if (fuzzyMatch) score += 3 * multiplier;
      }
    });

    if (/\b(current|currently|now|present|latest)\b/.test(normalizedQuery) && record.id === "travelers") score += 16;
    if (/\b(founder|startup)\b/.test(normalizedQuery) && record.id === "signifi") score += 18;
    if (/\b(research|robotics|space|spacecraft)\b/.test(normalizedQuery) && record.id === "aerospace") score += 12;
    if (/\b(ios|swift|mobile)\b/.test(normalizedQuery) && ["talking-fingers", "skillswap"].indexOf(record.id) !== -1) score += 10;
    if (/\b(hackathon|award|won|winner|finalist)\b/.test(normalizedQuery) && record.id === "awards") score += 14;
    if (/\b(email|contact|linkedin|github|resume)\b/.test(normalizedQuery) && record.id === "contact") score += 20;

    return score;
  }

  function rankEntities(query) {
    return ENTITIES.map(function (record) {
      return { record: record, score: scoreRecord(record, query) };
    }).sort(function (a, b) { return b.score - a.score; });
  }

  function detectIntent(query) {
    var q = normalize(query);
    if (/\b(compare|versus|vs|difference|different)\b/.test(q)) return "compare";
    if (/\b(stack|tech|technology|technologies|tools|frameworks|languages|programming language|tech used|use to build|built with)\b/.test(q)) return "stack";
    if (/\b(impact|metrics|results|outcomes|performance|perform|performed|accuracy|precision|recall|latency|improve|improved|reduce|reduced|how many|numbers)\b/.test(q)) return "impact";
    if (/\b(how does|how did|how was|architecture|pipeline|technical|under the hood|work|works|built)\b/.test(q)) return "how";
    if (/\b(why|purpose|problem|goal)\b/.test(q)) return "why";
    if (/\b(link|repository|repo|website|devpost|github|resume|where can i see|show me)\b/.test(q)) return "link";
    if (/\b(when|date|year|where|location|role|position|responsibilities|responsibility)\b/.test(q)) return "role";
    if (/\b(list|all|every|which projects|what projects|what internships|experience does|hackathons)\b/.test(q)) return "list";
    return "general";
  }

  function detectTechnologies(query) {
    var q = normalize(query);
    var matches = Object.keys(TECH_ALIASES).filter(function (name) {
      return TECH_ALIASES[name].some(function (alias) { return includesPhrase(q, alias); });
    });
    if (matches.indexOf("AWS Bedrock") !== -1) matches = matches.filter(function (name) { return name !== "AWS"; });
    if (matches.indexOf("SwiftUI") !== -1) matches = matches.filter(function (name) { return name !== "Swift"; });
    return matches;
  }

  function findNamedEntities(query) {
    var q = normalize(query);
    return ENTITIES.filter(function (record) {
      var terms = UNIQUE_ENTITY_TERMS[record.id] || [];
      return terms.some(function (term) { return includesPhrase(q, term); });
    });
  }

  function linkForSection(record) {
    if (!record.section) return null;
    return { label: "Jump to this section", href: record.section };
  }

  function compactStack(stack, limit) {
    if (!stack || !stack.length) return [];
    var max = typeof limit === "number" ? limit : 8;
    var values = stack.slice(0, max);
    if (stack.length > max) values.push("and more");
    return values;
  }

  function entityResponse(record, intent) {
    var response = {
      heading: record.name,
      paragraphs: [record.summary],
      bullets: [],
      links: (record.links || []).slice(0, 3),
      suggestions: record.suggestions || [],
      entityIds: [record.id],
      intent: intent
    };

    if (intent === "stack") {
      if (record.stack && record.stack.length) {
        response.paragraphs = ["The main technologies connected to " + record.name + " are:"];
        response.bullets = compactStack(record.stack, 12);
      } else {
        response.paragraphs.push("The portfolio does not list a dedicated stack for this item.");
      }
    } else if (intent === "impact") {
      response.bullets = (record.metrics && record.metrics.length) ? record.metrics.slice() : (record.details || []).slice(0, 3);
      if (!response.bullets.length) response.paragraphs.push("The site describes the work, but does not publish a separate metric for it.");
    } else if (intent === "how") {
      response.bullets = (record.details || []).slice(0, 4);
      if (record.stack && record.stack.length) response.paragraphs.push("Core stack: " + compactStack(record.stack, 8).join(" · ") + ".");
    } else if (intent === "why") {
      response.bullets = (record.details || []).slice(0, 3);
      if (record.metrics && record.metrics.length) response.bullets.push("Evidence: " + record.metrics.slice(0, 2).join("; ") + ".");
    } else if (intent === "role") {
      response.bullets = (record.details || []).slice(0, 3);
    } else if (intent === "link") {
      response.paragraphs = ["Here are the most relevant links for " + record.name + "."];
      if (!response.links.length) {
        var sectionLink = linkForSection(record);
        if (sectionLink) response.links.push(sectionLink);
      }
    } else {
      response.bullets = (record.details || []).slice(0, 3);
      if (record.metrics && record.metrics.length) response.bullets.push("Key proof: " + record.metrics.slice(0, 3).join(" · "));
    }

    return response;
  }

  function compareResponse(records) {
    return {
      heading: records[0].name + " vs. " + records[1].name,
      paragraphs: ["They show different sides of Akshaj's work:"],
      bullets: records.map(function (record) {
        var proof = record.metrics && record.metrics.length ? " Key proof: " + record.metrics.slice(0, 2).join(", ") + "." : "";
        return record.name + ": " + record.summary + proof;
      }),
      links: records.reduce(function (links, record) {
        if (record.links && record.links[0]) links.push(record.links[0]);
        return links;
      }, []).slice(0, 3),
      suggestions: ["Which one is more technically complex?", "Which work is strongest for recruiters?", "What technologies overlap?"],
      entityIds: records.map(function (record) { return record.id; }),
      intent: "compare"
    };
  }

  function categoryResponse(category) {
    var groups = {
      experience: ["travelers", "ria"],
      projects: ["signifi", "graption", "aerospace", "gridly", "finmate", "ppp-pocket", "veritas", "talking-fingers", "skillswap", "buywise"],
      ios: ["talking-fingers", "skillswap"],
      bdbi: ["graption", "buywise"],
      ai: ["travelers", "signifi", "graption", "finmate", "veritas", "skillswap", "aerospace"],
      research: ["aerospace", "publications"],
      hackathons: ["graption", "finmate", "gridly", "ppp-pocket", "veritas"]
    };
    var ids = groups[category] || [];
    var records = ids.map(function (id) { return ENTITIES.find(function (item) { return item.id === id; }); }).filter(Boolean);
    var headings = {
      experience: "Professional experience",
      projects: "Selected projects",
      ios: "iOS work",
      bdbi: "Big Data Big Impact work",
      ai: "AI and ML work",
      research: "Research work",
      hackathons: "Hackathon projects"
    };
    return {
      heading: headings[category] || "Portfolio work",
      paragraphs: [category === "projects" ? "The site highlights these projects and systems:" : "The strongest matching work is:"],
      bullets: records.map(function (record) {
        var proof = record.metrics && record.metrics[0] ? " — " + record.metrics[0] : "";
        return record.name + ": " + record.summary + proof;
      }),
      links: [{ label: category === "experience" ? "View experience" : "View selected work", href: category === "experience" ? "#experience" : "#work" }],
      suggestions: category === "experience" ? ["Compare his two internships", "What is he building now?", "What technologies has he used professionally?"] : ["Which project is strongest for recruiters?", "Which projects use AI?", "Show his awards"],
      entityIds: ids,
      intent: "list"
    };
  }

  function recruiterResponse(kind) {
    if (kind === "roles") {
      return {
        heading: "Best-fit roles",
        paragraphs: ["Based on the work shown on this site, Akshaj is strongest for roles where software engineering meets applied AI and real systems."],
        bullets: [
          "Software engineering internships focused on backend, platform, or cloud systems.",
          "Applied AI or ML systems roles involving RAG, agents, evaluation, and production integration.",
          "Product engineering roles where one person owns both technical architecture and user-facing delivery.",
          "Robotics or autonomy research roles involving simulation, perception, and multi-agent control."
        ],
        links: [{ label: "Open resume", href: "resume.pdf" }, { label: "Email Akshaj", href: "mailto:akshajnadn@gmail.com" }],
        suggestions: ["Why should a recruiter hire him?", "What is his strongest project?", "What professional experience does he have?"],
        entityIds: ["profile", "skills"],
        intent: "recruiter"
      };
    }

    return {
      heading: kind === "standout" ? "What makes Akshaj stand out" : "Why Akshaj is a strong candidate",
      paragraphs: ["His strongest signal is that he repeatedly takes ambiguous ideas past the demo stage and turns them into measurable, end-to-end systems."],
      bullets: [
        "Production-minded AI: the Travelers system includes routing, retrieval, human approval, observability, and deployment rather than only an LLM prompt.",
        "Technical range with depth: his work spans enterprise cloud systems, multimodal accessibility, iOS, fintech, and multi-agent robotics.",
        "Ownership and leadership: he founded Signifi and leads a 15-person Big Data Big Impact project team.",
        "Measurable outcomes: examples include sub-5-minute ticket diagnosis, 0.74 F1 at 30 FPS, about 20% lower simulated fuel cost, and four hackathon wins."
      ],
      links: [{ label: "Open resume", href: "resume.pdf" }, { label: "View selected work", href: "#work" }],
      suggestions: ["Which roles fit him best?", "What is his strongest project?", "How can I contact him?"],
      entityIds: ["profile", "travelers", "signifi", "graption", "aerospace"],
      intent: "recruiter"
    };
  }

  function strongestResponse() {
    return {
      heading: "Strongest work by signal",
      paragraphs: ["There is not one objectively strongest item, but three stand out for different recruiter signals:"],
      bullets: [
        "Travelers is the strongest production-engineering signal because it combines enterprise scale, AWS orchestration, human approval, observability, and deployment.",
        "Signifi is the strongest ownership and product signal because Akshaj founded it, designed the artifact architecture, reached pilot teams, and secured startup funding.",
        "Graption is the strongest real-time ML project signal because it combines multimodal modeling, a mobile streaming system, measured F1 and latency, and team leadership."
      ],
      links: [{ label: "View experience", href: "#experience" }, { label: "View selected work", href: "#work" }],
      suggestions: ["Tell me about Travelers", "Tell me about Signifi", "Tell me about Graption"],
      entityIds: ["travelers", "signifi", "graption"],
      intent: "recruiter"
    };
  }

  function currentResponse() {
    return {
      heading: "What Akshaj is building now",
      paragraphs: ["His current work spans enterprise AI, a startup, accessibility, and robotics research."],
      bullets: [
        "Travelers: a ServiceNow ticket-triage and resolution agent for a 150+ user platform processing 8,000+ jobs per day.",
        "Signifi: an AI-native requirements engine with linked product artifacts and prototypes for three pilot teams.",
        "Graption: leading a 15-person team developing speaker-aware live captions and missed-context retrieval.",
        "Aerospace Robotics Lab: multi-agent spacecraft simulation and decentralized coordination research."
      ],
      links: [{ label: "View experience", href: "#experience" }, { label: "View selected work", href: "#work" }],
      suggestions: ["How does the Travelers system work?", "What is Signifi?", "What robotics research is he doing?"],
      entityIds: ["travelers", "signifi", "graption", "aerospace"],
      intent: "current"
    };
  }

  function technologyResponse(technologies) {
    var matches = ENTITIES.filter(function (record) {
      if (["skills", "profile", "contact", "education", "awards"].indexOf(record.id) !== -1) return false;
      var text = normalize((record.stack || []).join(" ") + " " + (record.tags || []).join(" ") + " " + recordText(record));
      return technologies.some(function (tech) {
        return TECH_ALIASES[tech].some(function (alias) { return includesPhrase(text, alias); });
      });
    });

    if (!matches.length) {
      return {
        heading: "Technology not found",
        paragraphs: ["That technology is not explicitly tied to a project in the verified portfolio content."],
        bullets: [],
        links: [{ label: "View full toolkit", href: "#about" }],
        suggestions: ["Which projects use AWS?", "Where has he used Python?", "What is his full tech stack?"],
        entityIds: ["skills"],
        intent: "stack"
      };
    }

    return {
      heading: "Where Akshaj used " + technologies.join(" and "),
      paragraphs: ["The verified portfolio connects that technology to these projects or roles:"],
      bullets: matches.slice(0, 6).map(function (record) {
        var overlap = (record.stack || []).filter(function (item) {
          var itemText = normalize(item);
          return technologies.some(function (tech) { return TECH_ALIASES[tech].some(function (alias) { return includesPhrase(itemText, alias); }); });
        });
        return record.name + (overlap.length ? " — " + overlap.join(", ") : "") + ": " + record.summary;
      }),
      links: [{ label: "View full toolkit", href: "#about" }],
      suggestions: matches.slice(0, 3).map(function (record) { return "Tell me about " + record.name; }),
      entityIds: matches.slice(0, 6).map(function (record) { return record.id; }),
      intent: "stack"
    };
  }

  function greetingResponse() {
    return {
      heading: "Portfolio assistant",
      paragraphs: ["Ask about Akshaj's experience, projects, research, skills, awards, or fit for a role. I can also compare projects and answer follow-up questions."],
      bullets: [],
      links: [],
      suggestions: ["What is Akshaj building now?", "What makes him stand out?", "Which projects use AWS?"],
      entityIds: [],
      intent: "help"
    };
  }

  function fallbackResponse(query, ranking) {
    var candidates = ranking.filter(function (item) { return item.score >= 7; }).slice(0, 3);
    if (candidates.length > 1 && candidates[0].score - candidates[1].score < 4) {
      return {
        heading: "Which one did you mean?",
        paragraphs: ["I found a few close matches for “" + query.trim() + ".”"],
        bullets: candidates.map(function (item) { return item.record.name; }),
        links: [],
        suggestions: candidates.map(function (item) { return "Tell me about " + item.record.name; }),
        entityIds: candidates.map(function (item) { return item.record.id; }),
        intent: "clarify"
      };
    }

    return {
      heading: "I could not verify that from the site",
      paragraphs: ["I only answer from Akshaj's published portfolio content, so I will not guess. Try asking about a role, project, technology, award, education, or contact information."],
      bullets: [],
      links: [],
      suggestions: ["What is Akshaj building now?", "List his projects", "What makes him stand out?"],
      entityIds: [],
      intent: "fallback"
    };
  }

  function createEngine() {
    var state = { lastEntityIds: [], lastIntent: "", turns: 0 };

    function recordsFromIds(ids) {
      return (ids || []).map(function (id) { return ENTITIES.find(function (record) { return record.id === id; }); }).filter(Boolean);
    }

    function ask(question) {
      var raw = String(question || "").trim();
      var q = normalize(raw);
      var ranking = rankEntities(raw);
      var intent = detectIntent(raw);
      var technologies = detectTechnologies(raw);
      var namedEntities = findNamedEntities(raw);
      var response;

      if (!q) return greetingResponse();
      if (/^(hi|hello|hey|yo|good morning|good afternoon|good evening)\b/.test(q)) response = greetingResponse();
      else if (/\b(thanks|thank you|appreciate it)\b/.test(q)) {
        response = { heading: "Glad to help", paragraphs: ["Ask another portfolio question whenever you are ready."], bullets: [], links: [], suggestions: ["What is his strongest project?", "Which roles fit him best?", "How can I contact him?"], entityIds: state.lastEntityIds, intent: "thanks" };
      } else if (/\b(help|what can you do|examples|suggestions)\b/.test(q)) response = greetingResponse();
      else if (/\b(clear|reset|start over)\b/.test(q)) {
        state.lastEntityIds = [];
        state.lastIntent = "";
        response = greetingResponse();
      } else if (/\b(what is he doing now|what is akshaj doing now|currently building|building now|current work|current roles|right now|latest work)\b/.test(q)) response = currentResponse();
      else if (/\b(best fit|which roles|what roles|role should|position should|career fit|good fit)\b/.test(q)) response = recruiterResponse("roles");
      else if (/\b(why hire|hire him|strong candidate|recruiter|qualified|candidate)\b/.test(q)) response = recruiterResponse("hire");
      else if (/\b(stand out|unique|different from|what makes him|strengths)\b/.test(q)) response = recruiterResponse("standout");
      else if (/\b(strongest|best project|most impressive|top project|best work|biggest project)\b/.test(q)) response = strongestResponse();
      else if (/\b(all projects|list projects|what projects|project list|everything built|things built)\b/.test(q)) response = categoryResponse("projects");
      else if (/\b(internships|professional experience|work experience|jobs|where has he worked|companies)\b/.test(q) && !/\b(compare|vs|versus)\b/.test(q)) response = categoryResponse("experience");
      else if (/\b(ios work|ios projects|mobile projects|swift projects)\b/.test(q)) response = categoryResponse("ios");
      else if (/\b(big data big impact|bdbi projects|bdbi work)\b/.test(q)) response = categoryResponse("bdbi");
      else if (/\b(ai projects|ml projects|machine learning projects|artificial intelligence work)\b/.test(q)) response = categoryResponse("ai");
      else if (/\b(research work|research projects|research experience)\b/.test(q) && ranking[0].score < 20) response = categoryResponse("research");
      else if (/\b(hackathon projects|all hackathons|hackathon work)\b/.test(q)) response = categoryResponse("hackathons");
      else if (technologies.length && /\b(where|which|what|experience|used|use|know|projects|apps|built|work)\b/.test(q) && namedEntities.length === 0) response = technologyResponse(technologies);
      else {
        var explicit = ranking.filter(function (item) { return item.score >= 11; });
        var contextual = [];
        var isFollowUp = /\b(it|that|this|they|them|those|more|also|impact|stack|technology|work|how|why|link|repo|metrics)\b/.test(q) || tokenize(raw).length <= 3;

        if (!explicit.length && isFollowUp && state.lastEntityIds.length) contextual = recordsFromIds(state.lastEntityIds);

        if (intent === "compare") {
          var compareRecords = explicit.slice(0, 2).map(function (item) { return item.record; });
          if (compareRecords.length < 2 && state.lastEntityIds.length >= 2) compareRecords = recordsFromIds(state.lastEntityIds).slice(0, 2);
          response = compareRecords.length >= 2 ? compareResponse(compareRecords) : fallbackResponse(raw, ranking);
        } else if (technologies.length && /\b(where|which|what|experience|used|use|know|projects|apps|built|work)\b/.test(q) && namedEntities.length === 0) {
          response = technologyResponse(technologies);
        } else if (explicit.length) {
          var top = explicit[0];
          var second = explicit[1];
          var likelyAmbiguous = second && top.score < 25 && top.score - second.score < 3 && top.record.id !== second.record.id;
          if (likelyAmbiguous) response = fallbackResponse(raw, ranking);
          else response = entityResponse(top.record, intent);
        } else if (contextual.length) {
          response = contextual.length >= 2 && intent === "compare" ? compareResponse(contextual.slice(0, 2)) : entityResponse(contextual[0], intent === "general" ? state.lastIntent || "general" : intent);
        } else {
          response = fallbackResponse(raw, ranking);
        }
      }

      state.turns += 1;
      state.lastEntityIds = response.entityIds || [];
      state.lastIntent = response.intent || intent;
      return response;
    }

    function reset() {
      state.lastEntityIds = [];
      state.lastIntent = "";
      state.turns = 0;
    }

    return { ask: ask, reset: reset, state: state };
  }

  global.PortfolioAssistantEngine = {
    createEngine: createEngine,
    entities: ENTITIES,
    normalize: normalize,
    scoreRecord: scoreRecord
  };

  if (typeof document === "undefined") return;

  var header = document.querySelector("[data-header]");
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav]");
  var navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
  var sections = Array.from(document.querySelectorAll("main section[id]"));
  var reveals = Array.from(document.querySelectorAll(".reveal"));
  var year = document.querySelector("[data-year]");

  if (year) year.textContent = new Date().getFullYear();

  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

    reveals.forEach(function (element) { revealObserver.observe(element); });
  } else {
    reveals.forEach(function (element) { element.classList.add("is-visible"); });
  }

  if ("IntersectionObserver" in window && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-38% 0px -55%", threshold: 0.01 });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  var launcher = document.querySelector("[data-assistant-launcher]");
  var panel = document.querySelector("[data-assistant-panel]");
  var closeButton = document.querySelector("[data-assistant-close]");
  var clearButton = document.querySelector("[data-assistant-clear]");
  var messages = document.querySelector("[data-assistant-messages]");
  var suggestions = document.querySelector("[data-assistant-suggestions]");
  var form = document.querySelector("[data-assistant-form]");
  var input = document.querySelector("[data-assistant-input]");

  if (!launcher || !panel || !messages || !form || !input) return;

  var assistant = createEngine();
  var initialMessage = messages.firstElementChild ? messages.firstElementChild.cloneNode(true) : null;

  function createTextElement(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function addUserMessage(text) {
    var message = createTextElement("div", "assistant-message assistant-message-user", text);
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function addTypingIndicator() {
    var indicator = document.createElement("div");
    indicator.className = "assistant-message assistant-message-system assistant-typing";
    indicator.setAttribute("aria-label", "Assistant is preparing an answer");
    for (var i = 0; i < 3; i += 1) indicator.appendChild(document.createElement("span"));
    messages.appendChild(indicator);
    messages.scrollTop = messages.scrollHeight;
    return indicator;
  }

  function renderResponse(response) {
    var message = document.createElement("div");
    message.className = "assistant-message assistant-message-system assistant-message-rich";

    if (response.heading) message.appendChild(createTextElement("strong", "assistant-message-title", response.heading));
    (response.paragraphs || []).forEach(function (paragraph) {
      message.appendChild(createTextElement("p", "", paragraph));
    });

    if (response.bullets && response.bullets.length) {
      var list = document.createElement("ul");
      response.bullets.forEach(function (bullet) { list.appendChild(createTextElement("li", "", bullet)); });
      message.appendChild(list);
    }

    if (response.links && response.links.length) {
      var links = document.createElement("div");
      links.className = "assistant-message-links";
      response.links.forEach(function (item) {
        var link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.label + " ↗";
        if (/^https?:\/\//.test(item.href) || item.href.endsWith(".pdf")) {
          link.target = "_blank";
          link.rel = "noopener";
        }
        links.appendChild(link);
      });
      message.appendChild(links);
    }

    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    setSuggestions(response.suggestions || []);
  }

  function setSuggestions(items) {
    if (!suggestions) return;
    suggestions.textContent = "";
    items.slice(0, 4).forEach(function (text) {
      var button = createTextElement("button", "", text);
      button.type = "button";
      suggestions.appendChild(button);
    });
  }

  function submitQuestion(question) {
    var cleaned = String(question || "").trim();
    if (!cleaned) return;
    addUserMessage(cleaned);
    input.value = "";
    input.disabled = true;
    form.classList.add("is-thinking");
    var indicator = addTypingIndicator();
    var response = assistant.ask(cleaned);

    window.setTimeout(function () {
      indicator.remove();
      renderResponse(response);
      input.disabled = false;
      form.classList.remove("is-thinking");
      input.focus();
    }, Math.min(420, 170 + cleaned.length * 3));
  }

  function resetConversation() {
    assistant.reset();
    messages.textContent = "";
    if (initialMessage) messages.appendChild(initialMessage.cloneNode(true));
    setSuggestions(["What is Akshaj building now?", "What makes him stand out?", "Which projects use AWS?"]);
    input.value = "";
    input.focus();
  }

  function openAssistant() {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    document.body.classList.add("assistant-open");
    window.setTimeout(function () { input.focus(); }, 30);
  }

  function closeAssistant() {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    document.body.classList.remove("assistant-open");
    launcher.focus();
  }

  launcher.addEventListener("click", function () {
    if (panel.hidden) openAssistant();
    else closeAssistant();
  });

  if (closeButton) closeButton.addEventListener("click", closeAssistant);
  if (clearButton) clearButton.addEventListener("click", resetConversation);

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitQuestion(input.value);
  });

  if (suggestions) {
    suggestions.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (button) submitQuestion(button.textContent || "");
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) closeAssistant();
    if ((event.metaKey || event.ctrlKey) && event.key === "/") {
      event.preventDefault();
      openAssistant();
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
