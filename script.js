(function () {
  "use strict";

  var header = document.querySelector("[data-header]");
  var navLinks = Array.from(document.querySelectorAll('.desktop-nav a[href^="#"]'));
  var sections = Array.from(document.querySelectorAll("main section[id]"));
  var year = document.querySelector("[data-year]");

  if (year) year.textContent = new Date().getFullYear();

  function updateHeader() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if ("IntersectionObserver" in window && navLinks.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-38% 0px -55%", threshold: 0.01 });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  var launcher = document.querySelector("[data-assistant-launcher]");
  var panel = document.querySelector("[data-assistant-panel]");
  var closeButton = document.querySelector("[data-assistant-close]");
  var messages = document.querySelector("[data-assistant-messages]");
  var suggestions = document.querySelector("[data-assistant-suggestions]");
  var form = document.querySelector("[data-assistant-form]");
  var input = document.querySelector("[data-assistant-input]");

  if (!launcher || !panel || !messages || !form || !input) return;

  var knowledge = [
    {
      terms: ["current", "currently", "now", "doing", "overview", "about", "who"],
      answer: "Akshaj is a Georgia Tech computer science student with a 4.0 GPA. He is currently a software engineering intern at Travelers, the founder and lead developer of Signifi, a Georgia Tech aerospace robotics researcher, and a project lead in Big Data Big Impact."
    },
    {
      terms: ["travelers", "internship", "intern", "ticket", "servicenow", "bedrock", "support", "enterprise"],
      answer: "At Travelers, Akshaj is building a serverless multi-agent system for a 150+ user data platform that processes more than 8,000 jobs per day. The system uses Amazon Bedrock, Lambda, API Gateway, S3, DynamoDB, and RAG to reduce ticket diagnosis from about 60 minutes to under 5."
    },
    {
      terms: ["ria", "advisory", "billing", "etl", "random", "forest", "oracle", "first internship"],
      answer: "At RIA Advisory, Akshaj built Python ETL pipelines on AWS Lambda and S3 for Oracle billing workflows. He also trained an anomaly model with 0.88 precision and 0.79 recall that identified 21 misbilled records, and developed Spring Boot/MySQL pricing APIs."
    },
    {
      terms: ["signifi", "startup", "founder", "prd", "requirements", "product management", "create-x", "pilot"],
      answer: "Akshaj founded Signifi, an AI-native requirements platform that converts raw notes and product ideas into structured technical specifications. He built a planner-worker pipeline spanning 15+ linked agent steps, serves 3 pilot teams, received $25K in Microsoft for Startups funding, and reached the Klaus Startup Challenge finals."
    },
    {
      terms: ["research", "space", "spacecraft", "aerospace", "ros2", "mujoco", "fuel", "simulation", "lab"],
      answer: "In Georgia Tech's Aerospace Robotics Lab, Akshaj built a ROS2 and MuJoCo multi-agent spacecraft simulator coordinating 8 agents at 500 Hz. He trained decentralized models across roughly 500 rollouts, reducing simulated fuel cost by about 20%."
    },
    {
      terms: ["graption", "caption", "accessibility", "speaker", "multimodal", "bdbi", "big data"],
      answer: "Akshaj leads ML system design for Graption, a speaker-aware live-captioning platform built by a 15-person Big Data Big Impact team. The active-speaker model reached 0.74 F1 on 8 hours of audio-video, and the real-time pipeline runs at 30 FPS with under 1.5 seconds of latency."
    },
    {
      terms: ["buywise", "buy", "wait", "retail", "price", "shopping", "chrome"],
      answer: "BuyWise is a Big Data Big Impact project that forecasts retail price trends and gives shoppers a buy-or-wait recommendation through a Chrome extension. Akshaj contributed to the project's data and product work."
    },
    {
      terms: ["talking", "fingers", "asl", "sign language", "camera", "confidence", "ios club"],
      answer: "For Georgia Tech iOS Club's Talking Fingers app, Akshaj built the graded signing camera view in SwiftUI. It connects the live camera session to sign comparison and streams recognition-confidence updates back to the lesson flow on iOS and macOS."
    },
    {
      terms: ["skillswap", "skill swap", "ios club", "firebase", "swiftui", "mobile app"],
      answer: "SkillSwap is a Georgia Tech iOS Club app that helps students exchange skills: each user can find someone who teaches what they want to learn and offer a skill in return. Akshaj contributed to its SwiftUI/Firebase team codebase and product implementation."
    },
    {
      terms: ["hackathon", "hackathons", "won", "wins", "awards", "recognition", "finalist", "finalists"],
      answer: "Akshaj has four hackathon wins: Graption at Hacklytics, FinMate at codeLinc10, Best Use of Vultr for Gridly at EnergyHack, and Capital One Best Financial Hack for PPP Pocket at HackGT. He was also a HackGT 2025 Capital One Track finalist and a YHack 2026 K2 Think V2 Track finalist with Veritas."
    },
    {
      terms: ["finmate", "codelinc", "benefits", "financial assistant"],
      answer: "FinMate is an AI financial-benefits assistant built with a Bedrock RAG pipeline, Claude Sonnet, Titan embeddings, Lambda, API Gateway, and S3. It answered 13 of 15 questions on the team's internal evaluation and won codeLinc10."
    },
    {
      terms: ["gridly", "energyhack", "vultr", "smart plug", "carbon", "energy"],
      answer: "Gridly is a smart-plug platform with bidirectional WebSocket control and AI scheduling around user needs and lower-carbon grid windows. The team used a Vultr VPS, Vultr AI Agents, PostgreSQL, and Electricity Maps data, winning Best Use of Vultr at EnergyHack."
    },
    {
      terms: ["ppp", "pocket", "hackgt", "purchasing power", "budget", "capital one"],
      answer: "PPP Pocket combines a purchasing-power score, geographic budgeting, spending insights, and shareable reports. It earned Capital One Best Financial Hack and was selected as a Capital One Track finalist at HackGT 2025."
    },
    {
      terms: ["veritas", "yhack", "yale", "k2", "medical", "bill", "dispute"],
      answer: "Veritas analyzes medical bills and insurance documents, explains suspected errors, and coordinates email, legal-research, and voice agents to support disputes. It was a K2 Think V2 Track finalist at YHack 2026."
    },
    {
      terms: ["skills", "stack", "technology", "technologies", "languages", "python", "java", "aws"],
      answer: "Akshaj works primarily with Python, Java, C++, TypeScript, SQL, and Swift. His broader stack includes PyTorch, Scikit-learn, LangGraph, AWS Bedrock/Lambda/EKS, Docker, Terraform, Next.js, FastAPI, Spring Boot, React Native, Angular, and Supabase."
    },
    {
      terms: ["education", "school", "college", "georgia tech", "gpa", "graduate", "graduation"],
      answer: "Akshaj is pursuing a B.S. in Computer Science at Georgia Tech, expects to graduate in May 2028, and has a 4.0/4.0 GPA."
    },
    {
      terms: ["contact", "email", "github", "linkedin", "devpost", "resume", "reach"],
      answer: "You can reach Akshaj at akshajnadn@gmail.com. His GitHub is github.com/akshajnad, LinkedIn is linkedin.com/in/akshaj-nadimpalli, and Devpost is devpost.com/akshajnad. His resume is linked at the top of this page."
    }
  ];

  var stopWords = ["a", "an", "and", "are", "about", "did", "do", "does", "he", "his", "how", "i", "in", "is", "me", "of", "on", "tell", "the", "to", "what", "with"];

  function normalize(value) {
    return value.toLowerCase().replace(/[^a-z0-9+\-\s]/g, " ").replace(/\s+/g, " ").trim();
  }

  function answerQuestion(question) {
    var normalized = normalize(question);
    var words = normalized.split(" ").filter(function (word) {
      return word.length > 1 && stopWords.indexOf(word) === -1;
    });

    var best = null;
    var bestScore = 0;

    knowledge.forEach(function (item) {
      var score = 0;
      item.terms.forEach(function (term) {
        var normalizedTerm = normalize(term);
        if (normalized.indexOf(normalizedTerm) !== -1) score += normalizedTerm.indexOf(" ") !== -1 ? 5 : 3;
        words.forEach(function (word) {
          if (normalizedTerm === word) score += 2;
          else if (word.length > 4 && normalizedTerm.indexOf(word) !== -1) score += 1;
        });
      });
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    });

    if (!best || bestScore < 2) {
      return "I do not have a verified answer for that yet. Try asking about Akshaj's internships, research, Signifi, Georgia Tech projects, technical stack, or hackathon results.";
    }

    return best.answer;
  }

  function addMessage(text, type) {
    var message = document.createElement("div");
    message.className = "assistant-message assistant-message-" + type;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }

  function submitQuestion(question) {
    var cleaned = question.trim();
    if (!cleaned) return;
    addMessage(cleaned, "user");
    addMessage(answerQuestion(cleaned), "system");
    input.value = "";
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

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitQuestion(input.value);
  });

  if (suggestions) {
    suggestions.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") submitQuestion(event.target.textContent || "");
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) closeAssistant();
  });
})();
