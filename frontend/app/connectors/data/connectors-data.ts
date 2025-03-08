export interface Connector {
  id: string;
  name: string;
  description: string;
  category: string;
  status: 'connected' | 'available' | 'coming-soon';
  logo?: string;
}

export const connectors: Connector[] = [
  // Compliance tools
  { id: "vanta", name: "Vanta", description: "Automated compliance monitoring and reporting", category: "Compliance Tools", status: "connected", logo: "/logos/vanta.svg" },
  { id: "drata", name: "Drata", description: "Security compliance automation platform", category: "Compliance Tools", status: "available", logo: "/logos/drata.svg" },
  { id: "secureframe", name: "SecureFrame", description: "Compliance automation for SOC 2, HIPAA, and more", category: "Compliance Tools", status: "available", logo: "/logos/secureframe.svg" },
  { id: "safebase", name: "SafeBase", description: "Security review automation platform", category: "Compliance Tools", status: "coming-soon", logo: "/logos/safebase.svg" },
  
  // Security Meeting Notes
  { id: "otter", name: "Otter.ai", description: "AI meeting transcription and notes", category: "Security Meeting Notes", status: "connected", logo: "/logos/otter.svg" },
  { id: "fireflies", name: "Fireflies.ai", description: "AI meeting assistant and transcription", category: "Security Meeting Notes", status: "available", logo: "/logos/fireflies.svg" },
  { id: "sharepoint-notes", name: "SharePoint", description: "Microsoft document management and storage", category: "Security Meeting Notes", status: "connected", logo: "/logos/sharepoint.svg" },
  { id: "gdrive", name: "Google Drive", description: "Cloud file storage and synchronization", category: "Security Meeting Notes", status: "connected", logo: "/logos/gdrive.svg" },
  { id: "confluence-notes", name: "Confluence", description: "Team collaboration and knowledge sharing", category: "Security Meeting Notes", status: "available", logo: "/logos/confluence-icon.webp" },
  { id: "notion-notes", name: "Notion", description: "All-in-one workspace for notes and docs", category: "Security Meeting Notes", status: "available", logo: "/logos/notion.svg" },
  
  // Knowledge Base
  { id: "confluence-kb", name: "Confluence", description: "Team collaboration and knowledge sharing", category: "Knowledge Base", status: "connected", logo: "/logos/confluence-icon.webp" },
  { id: "notion-kb", name: "Notion", description: "All-in-one workspace for notes and docs", category: "Knowledge Base", status: "available", logo: "/logos/notion.svg" },
  
  // Company Chat
  { id: "slack", name: "Slack", description: "Business communication platform", category: "Company Chat", status: "connected", logo: "/logos/slack-icon.png" },
  { id: "teams", name: "Microsoft Teams", description: "Business communication platform", category: "Company Chat", status: "available", logo: "/logos/msft-teams-icon.png" },
  { id: "gchat", name: "Google Chat", description: "Messaging platform for teams", category: "Company Chat", status: "available", logo: "/logos/gchat.svg" },
  
  // Insurance Policy & Claims
  { id: "chubb", name: "Chubb", description: "Insurance policy management", category: "Insurance Policy & Claims", status: "available", logo: "/logos/chubb.svg" },
  { id: "aig", name: "AIG", description: "Insurance policy and claims management", category: "Insurance Policy & Claims", status: "available", logo: "/logos/aig.svg" },
  { id: "insurance-repo", name: "Files Repository", description: "Internal storage for insurance documents", category: "Insurance Policy & Claims", status: "connected", logo: "/logos/files.svg" },
  
  // Engineering Design Review Docs
  { id: "design-repo", name: "File Repository", description: "Internal storage for design documents", category: "Engineering Design Review Docs", status: "connected", logo: "/logos/files.svg" },
  { id: "design-kb", name: "Knowledge Base", description: "Internal knowledge base for design docs", category: "Engineering Design Review Docs", status: "connected", logo: "/logos/kb.svg" },
  { id: "jira-design", name: "JIRA", description: "Issue and project tracking for design reviews", category: "Engineering Design Review Docs", status: "connected", logo: "/logos/jira-icon.png" },
  
  // Info Sec Policies
  { id: "vanta-policies", name: "Vanta", description: "Security policy management", category: "Info Sec Policies", status: "connected", logo: "/logos/vanta.svg" },
  { id: "drata-policies", name: "Drata", description: "Security policy automation", category: "Info Sec Policies", status: "available", logo: "/logos/drata.svg" },
  { id: "policy-repo", name: "Files Repository", description: "Internal storage for security policies", category: "Info Sec Policies", status: "connected", logo: "/logos/files.svg" },
  { id: "hyperproof", name: "Hyperproof", description: "Compliance operations platform", category: "Info Sec Policies", status: "coming-soon", logo: "/logos/hyperproof.svg" },
  
  // Security Questionnaires
  { id: "vanta-quest", name: "Vanta", description: "Security questionnaire management", category: "Security Questionnaires", status: "connected", logo: "/logos/vanta.svg" },
  { id: "drata-quest", name: "Drata", description: "Security questionnaire automation", category: "Security Questionnaires", status: "available", logo: "/logos/drata.svg" },
  { id: "secureframe-quest", name: "SecureFrame", description: "Security questionnaire management", category: "Security Questionnaires", status: "available", logo: "/logos/secureframe.svg" },
  { id: "conveyor", name: "Conveyor", description: "Security questionnaire automation", category: "Security Questionnaires", status: "coming-soon", logo: "/logos/conveyor.svg" },
  
  // Security & IT Tickets
  { id: "servicenow-tickets", name: "ServiceNow", description: "IT service management platform", category: "Security & IT Tickets", status: "connected", logo: "/logos/servicenow.svg" },
  { id: "jira-tickets", name: "JIRA", description: "Issue and project tracking", category: "Security & IT Tickets", status: "connected", logo: "/logos/jira-icon.png" },
  { id: "zendesk-tickets", name: "Zendesk", description: "Customer service and engagement platform", category: "Security & IT Tickets", status: "available", logo: "/logos/zendesk-logo.png" },
  
  // Customer Support
  { id: "servicenow-support", name: "ServiceNow", description: "Customer service management", category: "Customer Support", status: "connected", logo: "/logos/servicenow.svg" },
  { id: "zendesk-support", name: "Zendesk", description: "Customer support platform", category: "Customer Support", status: "available", logo: "/logos/zendesk-logo.png" },
  
  // Critical Assets
  { id: "snowflake", name: "Snowflake", description: "Cloud data platform", category: "Critical Assets", status: "connected", logo: "/logos/snowflake.svg" },
  { id: "sharepoint-assets", name: "SharePoint", description: "Document management and storage", category: "Critical Assets", status: "connected", logo: "/logos/sharepoint.svg" },
  { id: "github", name: "GitHub", description: "Code hosting platform", category: "Critical Assets", status: "connected", logo: "/logos/github.svg" },
  { id: "bigquery", name: "BigQuery", description: "Cloud data warehouse", category: "Critical Assets", status: "available", logo: "/logos/bigquery.svg" },
  { id: "onedrive", name: "OneDrive", description: "File hosting service", category: "Critical Assets", status: "available", logo: "/logos/onedrive.svg" },
  { id: "azure", name: "Azure", description: "Cloud computing service", category: "Critical Assets", status: "connected", logo: "/logos/azure.svg" },
  { id: "gcp", name: "Google Cloud", description: "Cloud computing services", category: "Critical Assets", status: "available", logo: "/logos/gcp.svg" },
  { id: "aws", name: "AWS", description: "Cloud computing platform", category: "Critical Assets", status: "connected", logo: "/logos/aws.svg" },
  
  // Security Tools
  { id: "okta", name: "Okta", description: "Identity and access management", category: "Security Tools", status: "connected", logo: "/logos/okta.svg" },
  { id: "cobalt", name: "Cobalt", description: "Pentesting as a service", category: "Security Tools", status: "available", logo: "/logos/cobalt.svg" },
  { id: "sentinelone", name: "SentinelOne", description: "Endpoint protection platform", category: "Security Tools", status: "connected", logo: "/logos/sentinelone.svg" },
  { id: "crowdstrike", name: "Crowdstrike", description: "Endpoint protection platform", category: "Security Tools", status: "available", logo: "/logos/crowdstrike.svg" },
  { id: "rapid7", name: "Rapid7", description: "Security analytics and automation", category: "Security Tools", status: "connected", logo: "/logos/rapid7-logo.png" },
  { id: "snyk", name: "Snyk", description: "Developer security platform", category: "Security Tools", status: "connected", logo: "/logos/snyk.svg" },
  { id: "blackduck", name: "Black Duck", description: "Open source security and compliance", category: "Security Tools", status: "available", logo: "/logos/blackduck.svg" },
  { id: "paloalto", name: "Palo Alto Networks", description: "Cybersecurity solutions", category: "Security Tools", status: "connected", logo: "/logos/paloaltonetworks.png" },
  { id: "wiz", name: "Wiz", description: "Cybersecurity solutions", category: "Security Tools", status: "connected", logo: "/logos/wiz-logo.png" },

  
  // Approval & Change Management
  { id: "servicenow-change", name: "ServiceNow", description: "Change management platform", category: "Approval & Change Management", status: "connected", logo: "/logos/servicenow.svg" },
  { id: "sap", name: "SAP", description: "Enterprise resource planning", category: "Approval & Change Management", status: "available", logo: "/logos/sap.svg" },
  { id: "tanium", name: "Tanium", description: "Endpoint management and security", category: "Approval & Change Management", status: "coming-soon", logo: "/logos/tanium.svg" },
  { id: "asana", name: "Asana", description: "Work management platform", category: "Approval & Change Management", status: "available", logo: "/logos/asana.svg" },
  { id: "jira-change", name: "JIRA", description: "Issue and project tracking", category: "Approval & Change Management", status: "connected", logo: "/logos/jira-icon.png" },
];

export const categories = Array.from(new Set(connectors.map(c => c.category))); 