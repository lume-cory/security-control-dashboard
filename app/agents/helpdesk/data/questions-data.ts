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
  policyOwner: PolicyOwner;
  dueDate?: string;
}

export type SubmissionMethod = 'AI_AGENT' | 'APPLICATION' | 'PERSON';

export interface OutstandingQuestion extends Question {
  dueDate: string;
  supportingDocs: Array<{ name: string; link: string }>;
  otherDocs: Array<{ name: string; link: string }>;
  policyOwner: PolicyOwner;
  followUpQuestions?: string[];
  submissionMethod: SubmissionMethod;
  aiSummary?: string;
  aiNextSteps?: string[];
}

export interface ResolvedQuestion extends Question {
  resolvedDate: string;
  response: string;
  decision: string;
  documentationLink: string;
  supportingDocs?: Array<{ name: string; link: string }>;
  otherDocs?: Array<{ name: string; link: string }>;
  submissionMethod: SubmissionMethod;
  followUpQuestions?: string[];
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
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200",
    aiSummary: "Request submitted by John Doe from Platform Engineering team via Slack. Seeking guidance on third-party auth service security implications. Pending sign-off from Maya Patel. Due in 2 days.",
    aiNextSteps: ["Send a reminder to Maya", "Update the third-party integration guidelines to include this information"],
    submissionMethod: 'PERSON'
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
    sourceLink: "https://mail.company.com/threads/website-inquiry-july12",
    aiSummary: "Website hosting request from Sarah Chen, submitted via email. Medium priority request for self-hosting approval. No sign-off required. Due tomorrow.",
    aiNextSteps: ["Send a reminder to Chris", "Update the website request form with a link to the domain management guidelines"],
    submissionMethod: 'PERSON'
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
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000400",
    aiSummary: "Travel security request from Michael Rodriguez regarding Mexico business trip. No sign-off needed. Due today.",
    aiNextSteps: ["Post this response in Slack", "Send a travel security reminder to #team-all in Slack"],
    submissionMethod: 'PERSON'
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
      { name: "Slack - #james-wilson", link: "https://slack.com/archives/C01234567/p1623456789000200" },
      { name: "Auditor Security Requirements", link: "https://docs.company.com/security/audit-requirements" }
    ],
    otherDocs: [
      { name: "SecureShare User Guide", link: "https://docs.company.com/tools/secureshare" },
      { name: "Data Classification Guidelines", link: "https://docs.company.com/security/data-classification" }
    ],
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/external-sharing-query",
    aiSummary: "Request submitted by Alex Kumar from Data Protection team via email. Seeking guidance on external data sharing policy compliance. Pending sign-off from James Wilson. Due yesterday.",
    aiNextSteps: ["Send a reminder to James"],
    submissionMethod: 'PERSON'
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
      { name: "JIRA (UP-1234) - Contractor User Provisioning", link: "https://jira.company.com/security/CONTRACTOR-001" },
      { name: "JIRA (UP-1235) - Device Provisioning", link: "https://jira.company.com/security/device-access" }
    ],
    otherDocs: [
      { name: "BYOD Guidelines", link: "https://docs.company.com/security/byod" },
      { name: "Security Training Portal", link: "https://training.company.com/security" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000500",
    aiSummary: "Request submitted by Patricia Wong from Identity & Access Management team via Slack. Created tickets for IAM team to add contractors to AD/Okta and IT to provision devices. Due yesterday.",
    aiNextSteps: ["Follow up with IT to provision devices", "Follow up with IAM team to add contractors to AD/Okta"],
    submissionMethod: 'PERSON'
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
    sourceLink: "https://zendesk.company.com/tickets/SEC-2023-789",
    aiSummary: "Request submitted by Tom Mitchell from Identity & Access Management team via Zendesk. Pending sign-off from Maya Patel. Due in 3 days.",
    aiNextSteps: ["Post this response in the Zendesk ticket"],
    submissionMethod: 'PERSON'
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
      { name: "JIRA (SEC-2023-789) - Phishing Report", link: "https://jira.company.com/security/email-controls" }
    ],
    otherDocs: [
      { name: "Security Awareness Training", link: "https://docs.company.com/training/security" },
      { name: "DocuSign Security Guidelines", link: "https://docs.company.com/security/docusign" }
    ],
    source: "Phishing report button",
    sourceLink: "https://phishing.company.com/reports/2023-15",
    aiSummary: "Request submitted by Security Operations agent. Currently assigned to email security team with urgent priority.",
    aiNextSteps: ["Ask SOC if they need additional context", "Send email to Abnormal Security representative to see if this can be blocked in the future"],
    submissionMethod: 'AI_AGENT'
  },
  {
    id: 8,
    question: "Data center fire alarm triggered - Emergency response needed",
    user: "Fire Alert System",
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
    sourceLink: "https://incidents.company.com/DC-2023-89",
    aiSummary: "Request submitted by the fire alert system. Seeking guidance on data center fire alarm response. Currently assigned to Infrastructure & Facilities team with urgent priority.",
    aiNextSteps: ["Check the fire alarm system logs", "Escalate to management once issue confirmed"],
    submissionMethod: 'APPLICATION'
  },
  {
    id: 9,
    question: "What are the security implications of using a third-party authentication service?",
    user: "John Doe",
    stage: "Architecture Review",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "low",
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
          { name: "IAM Design Document #DESIGN-AUTH-001", link: "https://docs.company.com/security/DESIGN-AUTH-001" }
        ]
      },
      {
        text: "However, risks include potential data breaches at the third-party provider, loss of control over the authentication process, and potential service outages.",
        supportingDocs: [
          { name: "Third-Party Risk Assessment Template", link: "https://docs.company.com/security/third-party-risk" }
        ]
      },
      {
        text: "It's crucial to thoroughly vet the provider, understand their security measures, and have contingency plans in place.",
        supportingDocs: [
          { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
        ]
      }
    ],
    supportingDocs: [
      { name: "IAM Design Document #DESIGN-AUTH-001", link: "https://docs.company.com/security/DESIGN-AUTH-001" },
      { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
    ],
    otherDocs: [
      { name: "User Authentication Flow", link: "https://docs.company.com/auth/flow" },
      { name: "Third-Party Integration Guidelines", link: "https://docs.company.com/integration/guidelines" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200",
    followUpQuestions: [
      "What specific third-party service are you considering?",
      "What types of user data will be handled by this service?",
      "What is your fallback authentication mechanism?",
      "How will you handle service outages?",
      "What compliance requirements apply to your user authentication?"
    ],
    aiSummary: "Request submitted by John Doe from Platform Engineering team via Slack. Seeking guidance on third-party auth service security implications. Currently assigned to IAM team with low priority. Pending sign-off from Maya Patel. Due in 1 day.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON'
  },
  {
    id: 10,
    question: "What encryption standard should we use for data at rest in our new database?",
    user: "Jennifer Lee",
    stage: "Implementation",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "low",
    policyOwner: {
      team: "Data Security Team",
      teamEmail: "datasec@company.com",
      contact: "David Chen",
      email: "david.chen@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team owns data security standards`, `Mentioned in policy documentation`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Author of encryption standards`, `Regular contributor to data security discussions`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "For data encryption at rest, we recommend using AES-256 encryption. The implementation should include: 1) Use of a secure key management system to generate, store, and rotate encryption keys.",
        supportingDocs: [
          { name: "Encryption Guidelines #ENC-002", link: "https://docs.company.com/security/ENC-002" }
        ]
      },
      {
        text: "2) Encryption of data before it's written to disk. 3) Proper access controls to limit who can access the encrypted data and decryption keys.",
        supportingDocs: [
          { name: "Security Ticket #SEC-234", link: "https://jira.company.com/browse/SEC-234" }
        ]
      },
      {
        text: "4) Regular audits of the encryption process and key management. 5) Consideration of hardware-based encryption for additional security.",
        supportingDocs: [
          { name: "Data Protection Standard", link: "https://docs.company.com/security/data-protection" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Encryption Guidelines #ENC-002", link: "https://docs.company.com/security/ENC-002" },
      { name: "Security Ticket #SEC-234", link: "https://jira.company.com/browse/SEC-234" }
    ],
    otherDocs: [
      { name: "Data Protection Standard", link: "https://docs.company.com/security/data-protection" },
      { name: "Key Management Procedures", link: "https://docs.company.com/security/key-management" }
    ],
    source: "Architecture Review Meeting",
    sourceLink: "https://meetings.company.com/arch-review-db-123",
    followUpQuestions: [
      "What type of data will be stored in this database?",
      "What is your key rotation strategy?",
      "Will you need to search on encrypted data?",
      "What is your backup strategy for encrypted data?",
      "How will you handle key recovery scenarios?"
    ],
    aiSummary: "Request submitted by Jennifer Lee from Data Security team via architecture review meeting. Seeking guidance on data encryption at rest policy compliance. Currently assigned to Data Security team with low priority. Pending sign-off from David Chen. Due in 2 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON'
  },
  {
    id: 11,
    question: "How do we prevent SQL injection in our new reporting service?",
    user: "Alex Rodriguez",
    stage: "Implementation",
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Application Security Team",
      teamEmail: "appsec@company.com",
      contact: "Rachel Kim",
      email: "rachel.kim@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team responsible for secure coding standards`, `Mentioned in policy documentation`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Regular contributor to secure coding guidelines`, `Conducts SQL injection training`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "All database queries must use parameterized queries or ORMs. Replace string concatenation with prepared statements.",
        supportingDocs: [
          { name: "Secure Coding Guidelines #DESIGN-SQL-001", link: "https://docs.company.com/security/DESIGN-SQL-001" }
        ]
      },
      {
        text: "For the reporting service specifically: 1) Use TypeORM's built-in query builder with parameters, 2) Implement input validation at API boundaries.",
        supportingDocs: [
          { name: "Static Analysis Report #SA-456", link: "https://security.company.com/reports/SA-456" }
        ]
      },
      {
        text: "3) Add SQL injection testing to the CI pipeline using SQLMap.",
        supportingDocs: [
          { name: "CI/CD Security Integration", link: "https://docs.company.com/security/cicd-security" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Secure Coding Guidelines #DESIGN-SQL-001", link: "https://docs.company.com/security/DESIGN-SQL-001" },
      { name: "Static Analysis Report #SA-456", link: "https://security.company.com/reports/SA-456" }
    ],
    otherDocs: [
      { name: "OWASP SQL Injection Prevention Cheat Sheet", link: "https://owasp.org/www-project-cheat-sheets/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html" },
      { name: "TypeORM Documentation", link: "https://typeorm.io/" }
    ],
    source: "Code Review",
    sourceLink: "https://github.company.com/reporting-service/pull/123",
    followUpQuestions: [
      "What database technology are you using?",
      "Are you using an ORM or raw SQL queries?",
      "What input validation is currently in place?",
      "Do you have automated security testing?",
      "What types of reports will users be able to generate?"
    ],
    aiSummary: "Request submitted by Alex Rodriguez from Application Security team via code review. Seeking guidance on SQL injection prevention in new reporting service. Currently assigned to Application Security team with medium priority. No sign-off needed. Due in 3 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON'
  },
  {
    id: 12,
    question: "What security requirements should we implement for our new WebSocket service?",
    user: "Samantha Taylor",
    stage: "Design",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "low",
    policyOwner: {
      team: "Network Security Team",
      teamEmail: "netsec@company.com",
      contact: "James Wilson",
      email: "james.wilson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team responsible for network security standards`, `Mentioned in policy documentation`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Has reviewed similar designs`, `Member of network security team`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "WebSocket security requirements include: 1) TLS 1.3 for all connections, 2) Token-based authentication with short-lived JWTs.",
        supportingDocs: [
          { name: "Network Security Standard #NW-001", link: "https://docs.company.com/security/WS-001" }
        ]
      },
      {
        text: "3) Rate limiting per client, 4) Message size limits, 5) Input validation for all messages.",
        supportingDocs: [
          { name: "Real-time Systems Security", link: "https://docs.company.com/security/realtime" }
        ]
      },
      {
        text: "6) Automatic connection termination after 15 minutes of inactivity.",
        supportingDocs: [
          { name: "Session Management Guidelines", link: "https://docs.company.com/security/session-management" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Network Security Standard #NW-001", link: "https://docs.company.com/security/WS-001" },
      { name: "Real-time Systems Security", link: "https://docs.company.com/security/realtime" }
    ],
    otherDocs: [
      { name: "WebSocket Protocol RFC", link: "https://tools.ietf.org/html/rfc6455" },
      { name: "OWASP WebSocket Security Cheat Sheet", link: "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html#websocket-implementation" }
    ],
    source: "Architecture Review Ticket",
    sourceLink: "https://jira.company.com/browse/ARCH-789",
    followUpQuestions: [
      "What type of data will be transmitted over WebSockets?",
      "How many concurrent connections do you expect?",
      "Will you need to support reconnection scenarios?",
      "What client platforms need to be supported?",
      "How will you handle message validation?"
    ],
    aiSummary: "Request submitted by Samantha Taylor from Network Security team via architecture review ticket. Seeking guidance on WebSocket security requirements. Currently assigned to Network Security team with low priority. Pending sign-off from James Wilson. Due in 2 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON'
  },
  {
    id: 13,
    question: "How should we implement secure CI/CD pipelines for our new Kubernetes-based microservices?",
    user: "Mike Johnson",
    stage: "DevOps Design",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "low",
    policyOwner: {
      team: "DevSecOps Team",
      teamEmail: "devsecops@company.com",
      contact: "Olivia Davis",
      email: "olivia.davis@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team leads CI/CD security initiatives`, `Developed CI/CD security controls`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Primary contact for CI/CD security`, `Regularly updates CI/CD security policies`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "Secure CI/CD implementation requires: 1) Signed commits and container images, 2) SLSA Level 3 compliance.",
        supportingDocs: [
          { name: "CI/CD Security Controls #CICD-002", link: "https://docs.company.com/security/CICD-002" }
        ]
      },
      {
        text: "3) Automated container scanning, 4) Secret scanning in pipeline, 5) IaC security scanning.",
        supportingDocs: [
          { name: "Container Security Policy", link: "https://docs.company.com/security/containers" }
        ]
      },
      {
        text: "6) Automated SBOM generation and vulnerability tracking, 7) Separate credentials per environment.",
        supportingDocs: [
          { name: "Pipeline Security Best Practices", link: "https://docs.company.com/security/pipeline-security" }
        ]
      }
    ],
    supportingDocs: [
      { name: "CI/CD Security Controls #CICD-002", link: "https://docs.company.com/security/CICD-002" },
      { name: "Container Security Policy", link: "https://docs.company.com/security/containers" }
    ],
    otherDocs: [
      { name: "Kubernetes Security Hardening", link: "https://docs.company.com/platform/k8s-security" },
      { name: "Pipeline Templates", link: "https://docs.company.com/cicd/templates" }
    ],
    source: "DevSecOps Planning Meeting",
    sourceLink: "https://meetings.company.com/devsecops-planning-2024-03",
    followUpQuestions: [
      "What environments are in your deployment pipeline?",
      "How are deployment credentials managed?",
      "What security scanning tools are currently in use?",
      "How are container images stored and verified?",
      "What is your secret rotation strategy in Kubernetes?"
    ],
    aiSummary: "Request submitted by Mike Johnson from DevSecOps team via devsecops planning meeting. Seeking guidance on secure CI/CD pipelines for new Kubernetes-based microservices. Currently assigned to DevSecOps team with low priority. No sign-off needed. Due in 4 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON'
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
    suggestedResponse: [],
    submissionMethod: 'PERSON'
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
    suggestedResponse: [],
    submissionMethod: 'PERSON'
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
    suggestedResponse: [],
    submissionMethod: 'PERSON'
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
    suggestedResponse: [],
    submissionMethod: 'PERSON'
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
    suggestedResponse: [],
    submissionMethod: 'PERSON'
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
    suggestedResponse: [],
    submissionMethod: 'PERSON'
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
    suggestedResponse: [],
    submissionMethod: 'PERSON'
  }
] 