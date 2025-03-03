export interface ResponseSection {
  text: string;
  supportingDocs: Array<{
    name: string;
    link: string;
  }>;
}

export interface Question {
  id: number;
  question: string;
  user: string;
  stage: string;
  source: string;
  sourceLink: string;
  triage?: 'urgent' | 'high' | 'medium' | 'low';
  suggestedResponse: Array<ResponseSection>;
}

export interface OutstandingQuestion extends Question {
  dueDate: string;
  supportingDocs: Array<{ name: string; link: string }>;
  otherDocs: Array<{ name: string; link: string }>;
  policyOwner: PolicyOwner;
}

export interface ResolvedQuestion extends Question {
  resolvedDate: string;
  response: string;
  decision: string;
  documentationLink: string;
  policyOwner: PolicyOwner;
  suggestedResponse: Array<ResponseSection>;
}

export interface Confidence {
  level: 'high' | 'medium' | 'low';
  reasons: string[];
}

export interface PolicyOwner {
  team: string;
  teamEmail: string;
  teamConfidence: Confidence;
  contact: string;
  email: string;
  contactConfidence: Confidence;
  signOffStatus?: 'Yes' | 'No' | 'Pending' | 'N/A';
}

export const outstandingQuestions: OutstandingQuestion[] = [
  {
    id: 1,
    question: "What are the security implications of using a third-party authentication service?",
    user: "John Doe",
    stage: "Architecture Review",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Manager of prior policy owner`, `Has answered similar questions on previous tickets`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "Using a third-party authentication service can have both benefits and risks. Benefits include reduced development time and potentially more robust security measures.",
        supportingDocs: [
          { name: "Security Policy #AUTH-001", link: "https://docs.company.com/security/AUTH-001" }
        ]
      },
      {
        text: "However, risks include potential data breaches at the third-party provider, loss of control over the authentication process, and potential service outages.",
        supportingDocs: [
          { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
        ]
      },
      {
        text: "It's crucial to thoroughly vet the provider, understand their security measures, and have contingency plans in place.",
        supportingDocs: [
          { name: "Third-Party Integration Guidelines", link: "https://docs.company.com/integration/guidelines" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Security Policy #AUTH-001", link: "https://docs.company.com/security/AUTH-001" },
      { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
    ],
    otherDocs: [
      { name: "User Authentication Flow", link: "https://docs.company.com/auth/flow" },
      { name: "Third-Party Integration Guidelines", link: "https://docs.company.com/integration/guidelines" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200"
  },
  {
    id: 2,
    question: "I want to host a website for our team project. Can I register a .org domain and set it up myself?",
    user: "Sarah Chen",
    stage: "Planning",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Infrastructure Security Team",
      teamEmail: "infrasec@company.com",
      contact: "Chris Martinez",
      email: "chris.martinez@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Contributors from prior tickets belong to this team`]
      },
      contactConfidence: {
        level: 'low',
        reasons: [`Manager of assumed policy ownning team`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "All external websites must go through our Website Governance Process. This includes domain registration (which must be done through IT) and security assessment of the hosting platform.",
        supportingDocs: [
          { name: "Website Governance Policy", link: "https://docs.company.com/security/WEB-001" }
        ]
      },
      {
        text: "Self-hosted solutions are not permitted due to security and maintenance concerns. Please submit a Website Request Form to initiate this process.",
        supportingDocs: [
          { name: "Domain Management Guidelines", link: "https://docs.company.com/it/domains" }
        ]
      },
      {
        text: "Our approved hosting platforms provide necessary security controls and monitoring capabilities required for company websites.",
        supportingDocs: [
          { name: "Cloud Hosting Standards", link: "https://docs.company.com/cloud/standards" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Website Governance Policy", link: "https://docs.company.com/security/WEB-001" },
      { name: "Domain Management Guidelines", link: "https://docs.company.com/it/domains" }
    ],
    otherDocs: [
      { name: "Cloud Hosting Standards", link: "https://docs.company.com/cloud/standards" },
      { name: "Website Request Form", link: "https://forms.company.com/website-request" }
    ],
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/website-inquiry-july12"
  },
  {
    id: 3,
    question: "I'm traveling to Mexico next week for the conference. Can I bring my work phone?",
    user: "Michael Rodriguez",
    stage: "Pre-travel",
    dueDate: new Date().toISOString().split('T')[0],
    triage: "low",
    policyOwner: {
      team: "Physical Security & Travel Team",
      teamEmail: "travelsec@company.com",
      contact: "Sarah O'Connor",
      email: "sarah.oconnor@company.com",
      teamConfidence: {
        level: 'low',
        reasons: ['Email alias for this team found on policy docs']
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "Yes, you can bring your work phone to Mexico, but specific security measures are required. You must: 1) Enable full disk encryption, 2) Install our travel VPN profile.",
        supportingDocs: [
          { name: "Device Protection Guidelines", link: "https://docs.company.com/security/devices" }
        ]
      },
      {
        text: "You must also: 3) Enable remote wipe capability, and 4) Register your travel in the Travel Security Portal.",
        supportingDocs: [
          { name: "International Travel Security Policy", link: "https://docs.company.com/security/TRAVEL-002" }
        ]
      },
      {
        text: "Avoid using public WiFi and consider a travel burner phone for personal use. Use our travel VPN when connecting to any network.",
        supportingDocs: [
          { name: "VPN Configuration Guide", link: "https://docs.company.com/vpn/setup" },
          { name: "Country-Specific Security Advisories", link: "https://docs.company.com/security/advisories" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Device Protection Guidelines", link: "https://docs.company.com/security/devices" },
      { name: "International Travel Security Policy", link: "https://docs.company.com/security/TRAVEL-002" }
    ],
    otherDocs: [
      { name: "VPN Configuration Guide", link: "https://docs.company.com/vpn/setup" },
      { name: "Country-Specific Security Advisories", link: "https://docs.company.com/security/advisories" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000400"
  },
  {
    id: 4,
    question: "Our team needs to share some sensitive financial documents with external auditors.",
    user: "Alex Kumar",
    stage: "Planning",
    dueDate: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Data Protection Team",
      teamEmail: "dataprotection@company.com",
      contact: "James Wilson",
      email: "james.wilson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Manager of prior policy owner`, `Has the same role as the prior policy owner`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "External file sharing must use our approved secure file transfer solution (SecureShare). You'll need to: 1) Request access through IT Service Portal, 2) Complete the External Sharing Agreement form.",
        supportingDocs: [
          { name: "External Data Sharing Policy", link: "https://docs.company.com/security/DATA-002" }
        ]
      },
      {
        text: "All shared documents must be logged in the Data Sharing Register and use time-limited links (max 7 days).",
        supportingDocs: [
          { name: "Auditor Security Requirements", link: "https://docs.company.com/security/audit-requirements" }
        ]
      },
      {
        text: "Enable download tracking and ensure all documents are properly classified according to our data classification guidelines.",
        supportingDocs: [
          { name: "Data Classification Guidelines", link: "https://docs.company.com/security/data-classification" }
        ]
      }
    ],
    supportingDocs: [
      { name: "External Data Sharing Policy", link: "https://docs.company.com/security/DATA-002" },
      { name: "Auditor Security Requirements", link: "https://docs.company.com/security/audit-requirements" }
    ],
    otherDocs: [
      { name: "SecureShare User Guide", link: "https://docs.company.com/tools/secureshare" },
      { name: "Data Classification Guidelines", link: "https://docs.company.com/security/data-classification" }
    ],
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/external-sharing-query"
  },
  {
    id: 5,
    question: "We're hiring contractors next week and need to get them laptop access.",
    user: "Patricia Wong",
    stage: "Onboarding",
    dueDate: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'No'
    },
    suggestedResponse: [
      {
        text: "Contractor device access requires: 1) Completed Contractor Security Agreement, 2) Background check confirmation from HR.",
        supportingDocs: [
          { name: "Contractor Security Policy", link: "https://docs.company.com/security/CONTRACTOR-001" }
        ]
      },
      {
        text: "Device must be company-issued or meet our BYOD requirements. Submit requests through Contractor Access Portal at least 3 business days before start date.",
        supportingDocs: [
          { name: "Device Access Requirements", link: "https://docs.company.com/security/device-access" }
        ]
      },
      {
        text: "All contractors must complete Security Awareness Training before access is granted.",
        supportingDocs: [
          { name: "Security Training Portal", link: "https://training.company.com/security" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Contractor Security Policy", link: "https://docs.company.com/security/CONTRACTOR-001" },
      { name: "Device Access Requirements", link: "https://docs.company.com/security/device-access" }
    ],
    otherDocs: [
      { name: "BYOD Guidelines", link: "https://docs.company.com/security/byod" },
      { name: "Security Training Portal", link: "https://training.company.com/security" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000500"
  },
  {
    id: 6,
    question: "Can we use personal LastPass accounts to share team credentials?",
    user: "Tom Mitchell",
    stage: "Operations",
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "No, personal password managers cannot be used for company credentials under any circumstances. This violates our security policy and creates significant risks.",
        supportingDocs: [
          { name: "Password Management Policy", link: "https://docs.company.com/security/PASS-001" }
        ]
      },
      {
        text: "For temporary credential sharing, use the approved interim solution (KeyPass with encrypted file on approved share).",
        supportingDocs: [
          { name: "Credential Sharing Guidelines", link: "https://docs.company.com/security/cred-sharing" }
        ]
      },
      {
        text: "Enterprise password manager rollout is scheduled for completion in 2 weeks.",
        supportingDocs: [
          { name: "Enterprise Password Manager Rollout Plan", link: "https://docs.company.com/projects/password-manager" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Password Management Policy", link: "https://docs.company.com/security/PASS-001" },
      { name: "Credential Sharing Guidelines", link: "https://docs.company.com/security/cred-sharing" }
    ],
    otherDocs: [
      { name: "Enterprise Password Manager Rollout Plan", link: "https://docs.company.com/projects/password-manager" },
      { name: "Approved Tools List", link: "https://docs.company.com/security/approved-tools" }
    ],
    source: "Zendesk ticket",
    sourceLink: "https://zendesk.company.com/tickets/SEC-2023-789"
  },
  {
    id: 7,
    question: "Reporting suspicious emails with DocuSign links",
    user: "Security Operations",
    stage: "Active Incident",
    dueDate: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Security Operations Team",
      teamEmail: "secops@company.com",
      contact: "Alex Rivera",
      email: "alex.rivera@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: [
      {
        text: "1) Block sender domains immediately via email gateway, 2) Send company-wide alert about DocuSign phishing campaign.",
        supportingDocs: [
          { name: "Phishing Response Playbook", link: "https://docs.company.com/security/phishing-response" },
          { name: "Email Security Controls", link: "https://docs.company.com/security/email-controls" }
        ]
      },
      {
        text: "3) Check email logs for click-throughs, 4) Reset passwords for any affected accounts.",
        supportingDocs: [
          { name: "Email Security Controls", link: "https://docs.company.com/security/email-controls" }
        ]
      },
      {
        text: "5) Update phishing detection rules to catch similar patterns.",
        supportingDocs: [
          { name: "DocuSign Security Guidelines", link: "https://docs.company.com/security/docusign" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Phishing Response Playbook", link: "https://docs.company.com/security/phishing-response" },
      { name: "Email Security Controls", link: "https://docs.company.com/security/email-controls" }
    ],
    otherDocs: [
      { name: "Security Awareness Training", link: "https://docs.company.com/training/security" },
      { name: "DocuSign Security Guidelines", link: "https://docs.company.com/security/docusign" }
    ],
    source: "Phishing report button",
    sourceLink: "https://phishing.company.com/reports/2023-15"
  },
  {
    id: 8,
    question: "Data center fire alarm triggered - Emergency response needed",
    user: "NOC Team",
    stage: "Critical Incident",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Infrastructure & Facilities",
      teamEmail: "facilities@company.com",
      contact: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "Immediate actions required: 1) Verify fire suppression system activation, 2) Initiate emergency shutdown procedures for affected racks.",
        supportingDocs: [
          { name: "Data Center Emergency Procedures", link: "https://docs.company.com/facilities/dc-emergency" }
        ]
      },
      {
        text: "3) Notify on-call facilities team, 4) Activate disaster recovery procedures if needed.",
        supportingDocs: [
          { name: "Business Continuity Plan", link: "https://docs.company.com/security/bcp" }
        ]
      },
      {
        text: "5) Prepare for failover to backup data center if situation escalates.",
        supportingDocs: [
          { name: "Emergency Contact List", link: "https://docs.company.com/facilities/emergency-contacts" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Data Center Emergency Procedures", link: "https://docs.company.com/facilities/dc-emergency" },
      { name: "Business Continuity Plan", link: "https://docs.company.com/security/bcp" }
    ],
    otherDocs: [
      { name: "Data Center Layout", link: "https://docs.company.com/facilities/dc-layout" },
      { name: "Emergency Contact List", link: "https://docs.company.com/facilities/emergency-contacts" }
    ],
    source: "Emergency hotline",
    sourceLink: "https://incidents.company.com/DC-2023-89"
  }
]

export const resolvedQuestions: ResolvedQuestion[] = [
  {
    id: 1,
    question: "What is our policy on password complexity?",
    user: "Alice Johnson",
    stage: "Implementation",
    resolvedDate: "2024-01-14",
    triage: "medium",
    response: "Our password policy requires a minimum of 12 characters, including uppercase and lowercase letters, numbers, and special characters. We also implement a password strength meter to encourage even stronger passwords.",
    decision: "Implemented in User Authentication Module",
    documentationLink: "/security/policies/password-policy",
    source: "Security review ticket",
    sourceLink: "https://jira.company.com/browse/SEC-001",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 2,
    question: "How often should we conduct security audits?",
    user: "Bob Williams",
    stage: "Operations",
    resolvedDate: "2024-01-13",
    triage: "low",
    response: "We conduct comprehensive security audits on a quarterly basis, with continuous monitoring and smaller checks performed weekly. This schedule balances thorough review with operational efficiency.",
    decision: "Added to Security Operations Calendar",
    documentationLink: "/security/operations/audit-schedule",
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000300",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Contributors from prior tickets belong to this team`]
      },
      contactConfidence: {
        level: 'low',
        reasons: [`Manager of team assumed to own policy`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: []
  },
  {
    id: 3,
    question: "Can I use my personal iPhone to access work email while on vacation?",
    user: "Maria Garcia",
    stage: "Access Management",
    resolvedDate: "2024-01-14",
    triage: "medium",
    response: "Yes, you can access work email on personal iOS devices if they meet our BYOD requirements: 1) Latest iOS version, 2) Device passcode enabled, 3) Installation of our MDM profile, 4) Acceptance of remote wipe capability. Install our Mobile Access Portal app to get started.",
    decision: "Approved with standard BYOD controls",
    documentationLink: "/security/byod/mobile-access",
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/mobile-access-request",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Contributors from prior tickets belong to this team`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 4,
    question: "Lost my laptop in a taxi - what do I need to do immediately?",
    user: "David Chen",
    stage: "Incident Response",
    resolvedDate: "2024-01-14",
    triage: "urgent",
    response: "Remote wipe initiated within 15 minutes of report. Device tracking enabled. User credentials reset. New laptop issued with restored backup from previous day. Incident report filed and no sensitive data was compromised due to disk encryption.",
    decision: "Incident closed - no data breach",
    documentationLink: "/security/incidents/LOST-2023-45",
    source: "Emergency hotline",
    sourceLink: "https://incidents.company.com/LOST-2023-45",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 5,
    question: "Need approval for using Zoom with external clients - is this allowed?",
    user: "Rachel Thompson",
    stage: "Software Approval",
    resolvedDate: "2024-01-13",
    triage: "medium",
    response: "Zoom is approved for external client meetings with required settings: SSO authentication, waiting rooms enabled, meeting passwords required, cloud recording disabled. Use company Zoom account only, not personal.",
    decision: "Approved with security controls",
    documentationLink: "/security/approved-software/video-conferencing",
    source: "Zendesk ticket",
    sourceLink: "https://zendesk.company.com/tickets/SEC-2023-089",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 6,
    question: "Received suspicious email claiming to be from CEO - what should I do?",
    user: "James Wilson",
    stage: "Phishing Report",
    resolvedDate: "2024-01-14",
    triage: "high",
    response: "Confirmed phishing attempt. Email reported to security team, blocked sender domain, updated email filters. All employees notified of phishing campaign. Reminder sent about CEO impersonation red flags.",
    decision: "Phishing attempt blocked and documented",
    documentationLink: "/security/incidents/PHISH-2023-12",
    source: "Phishing report button",
    sourceLink: "https://phishing.company.com/reports/2023-12",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 7,
    question: "Do we need to encrypt USB drives used in the office?",
    user: "Emma Davis",
    stage: "Policy Clarification",
    resolvedDate: "2024-01-13",
    triage: "medium",
    response: "Yes, all removable storage devices must use hardware encryption. Only company-issued encrypted USB drives are permitted. Available from IT with department manager approval. Personal USB devices are not allowed.",
    decision: "Policy reinforced - no exceptions",
    documentationLink: "/security/policies/removable-media",
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000400",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  }
] 