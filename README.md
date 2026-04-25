# WEEDHACK STEALER : THREAT INTELLIGENCE DASHBOARD

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white)

A single-page, interactive threat intelligence platform detailing the "WeedHack" infostealer campaign targeting the global Minecraft modding ecosystem. 

Designed for security researchers, incident responders, and community moderators, this dashboard moves beyond static PDF reports. It provides deep technical reverse engineering data alongside dynamic network visualizations and automated response tooling.

Developed by [Satwik Bajpai](https://github.com/sxwik).

---

## ARCHITECTURE & FEATURES

### 1. Technical Malware Analysis
* **Execution Chain Breakdown:** Step-by-step analysis of the Java loader obfuscation, payload extraction (C# / .NET), and system profiling.
* **Persistence Mechanisms:** Documentation of registry modifications and scheduled task abuse used by the threat actor to maintain access.
* **Data Theft Telemetry:** Granular breakdown of targeted assets, including Microsoft/Minecraft session tokens, Discord LevelDB extraction, browser SQLite decryption, and cryptocurrency wallet targeting.

### 2. Network & Infrastructure Operations
* **Distribution Vectors:** Visual mapping (via Chart.js) of primary infection vectors, including compromised Discord servers, fake YouTube tutorials, and malicious GitHub forks.
* **Indicators of Compromise (IOCs):** A structured, accessible table containing highly realistic simulated file hashes (SHA256), known domains, and registry keys for firewall and EDR ingestion.

### 3. Automated Tooling (Gemini LLM Integration)
The dashboard interfaces directly with the Google Gemini API to provide real-time operational support for analysts:
* **Executive Briefing Compiler:** Distills deep technical findings into prioritized, non-technical business risk summaries for C-Suite reporting.
* **Heuristic Artifact Analyzer:** Evaluates user-inputted file paths or registry keys against the WeedHack operational profile to provide instant risk assessments.
* **Dynamic YARA Synthesizer:** Automatically compiles known on-page IOCs into deployable, syntactically valid YARA rules for threat hunting.
* **Contextual IR Playbook Generator:** Drafts prioritized, step-by-step emergency response and revocation procedures based on the specific role of the infected victim.

---

## DEPLOYMENT INSTRUCTIONS

This tool is built as a pure Single Page Application (SPA). There are no build steps, Node.js dependencies, or complex backend requirements.

### Installation

Clone the repository to your local machine:

```bash
git clone https://github.com/sxwik/weedhack-threat-intel.git
cd weedhack-threat-intel
```

### API Configuration

To enable the automated analysis and YARA generation tools, a Google Gemini API key is required.

1. Obtain a free API key from Google AI Studio.
2. Open `index.html` in your text editor.
3. Locate the `apiKey` constant in the JavaScript section (near the bottom of the file).
4. Insert your key:

```javascript
const apiKey = "YOUR_API_KEY_HERE"; 
```
###  Security Note
 This is a client-side application. If deploying this dashboard publicly (e.g., via GitHub Pages or Vercel), do not hardcode your production API key directly into the source file. It is recommended to route these requests through a secure backend proxy or serverless function to protect your credentials.

### Execution
 Run the application by opening index.html directly in any modern web browser, or serve it locally using a tool like VSCode Live Server.

### DISCLAIMER
 This dashboard and the intelligence contained within are provided strictly for educational, defensive research, and threat hunting purposes. Simulated data and hashes have been utilized to demonstrate functionality without distributing live malware signatures.

 The integrated automated tooling relies on Large Language Models. Analysts must manually verify all generated YARA rules, scripts, and response playbooks prior to deployment in a production environment.

### LICENSE
 Copyright 2026-2027 Satwik Bajpai. All rights reserved.
 Unauthorized reproduction or distribution without attribution is prohibited.