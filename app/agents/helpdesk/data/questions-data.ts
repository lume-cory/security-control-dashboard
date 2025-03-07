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
  sourceTool: string;
  triage?: 'urgent' | 'high' | 'medium' | 'low';
  suggestedResponse: Array<ResponseSection>;
  policyOwner: PolicyOwner;
  dueDate?: string;
}

export type SubmissionMethod = 'AI_AGENT' | 'APPLICATION' | 'PERSON';

export interface RequestContext {
  type: 'email' | 'slack' | 'meeting_notes' | 'code_review' | 'ticket' | 'phishing_email' | 'call_summary';
  content: string;
  timestamp: string;
  participants?: string[];
  threadId?: string;
  attachments?: Array<{ name: string; link: string }>;
}

export interface OutstandingQuestion extends Question {
  dueDate: string;
  supportingDocs: Array<{ name: string; link: string }>;
  otherDocs: Array<{ name: string; link: string }>;
  policyOwner: PolicyOwner;
  followUpQuestions?: string[];
  submissionMethod: SubmissionMethod;
  aiSummary?: string;
  aiNextSteps?: string[];
  requestContext: RequestContext;
  createdDate: string;
  lastUpdatedDate: string;
  lastReplyBy: 'requestor' | 'security_team';
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

// Helper function to calculate relative dates
function getRelativeDates(dueDate: string, triage: 'urgent' | 'high' | 'medium' | 'low' | undefined) {
  const dueDateObj = new Date(dueDate);
  
  // Set creation date based on triage level
  const creationDateObj = new Date(dueDateObj);
  switch(triage) {
    case 'urgent':
      // Urgent: 1-2 days before due date
      creationDateObj.setDate(dueDateObj.getDate() - Math.floor(Math.random() * 2) - 1);
      break;
    case 'high':
      // High: 3-5 days before due date
      creationDateObj.setDate(dueDateObj.getDate() - Math.floor(Math.random() * 3) - 3);
      break;
    case 'medium':
      // Medium: 5-10 days before due date
      creationDateObj.setDate(dueDateObj.getDate() - Math.floor(Math.random() * 6) - 5);
      break;
    case 'low':
      // Low: 10-14 days before due date
      creationDateObj.setDate(dueDateObj.getDate() - Math.floor(Math.random() * 5) - 10);
      break;
    default:
      // Default to medium
      creationDateObj.setDate(dueDateObj.getDate() - Math.floor(Math.random() * 6) - 5);
  }
  
  // Set last updated date between creation and due date
  const lastUpdatedObj = new Date(creationDateObj);
  const daysBetween = Math.max(1, Math.floor((dueDateObj.getTime() - creationDateObj.getTime()) / (1000 * 60 * 60 * 24)));
  const updateOffset = Math.floor(Math.random() * daysBetween);
  lastUpdatedObj.setDate(creationDateObj.getDate() + updateOffset);
  
  return {
    createdDate: creationDateObj.toISOString().split('T')[0],
    lastUpdatedDate: lastUpdatedObj.toISOString().split('T')[0]
  };
}

export const outstandingQuestions: OutstandingQuestion[] = [
  {
    id: 1,
    question: "What are the security implications of using a third-party authentication service?",
    user: "John Doe",
    stage: "Architecture Review",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200",
    sourceTool: "Slack",
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
    aiSummary: "Request submitted by John Doe from Platform Engineering team via Slack. Seeking guidance on third-party auth service security implications. Pending sign-off from Maya Patel. Due in 2 days.",
    aiNextSteps: ["Send a reminder to Maya", "Update the third-party integration guidelines to include this information"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'slack',
      timestamp: '2023-07-12T14:23:45Z',
      threadId: 'C01234567/p1623456789000200',
      participants: ['John Doe', 'Maya Patel', 'Thomas Lee'],
      content: `*John Doe*: @security-team What are the security implications of using a third-party authentication service? We're considering Auth0 for our new project.

*Maya Patel*: Hi John, that's a good question. There are several considerations here. When are you planning to implement this?

*John Doe*: We're in the architecture review phase right now, so probably within the next sprint if approved.

*Thomas Lee*: I'd be interested in the answer too - we're looking at similar options for the mobile app.`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").lastUpdatedDate,
    lastReplyBy: "requestor"
  },
  {
    id: 2,
    question: "I want to host a website for our team project. Can I register a .org domain and set it up myself?",
    user: "Sarah Chen",
    stage: "Planning",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/website-inquiry-july12",
    sourceTool: "Email",
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
    aiSummary: "Website hosting request from Sarah Chen, submitted via email. Medium priority request for self-hosting approval. No sign-off required. Due tomorrow.",
    aiNextSteps: ["Send a reminder to Chris", "Update the website request form with a link to the domain management guidelines"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'email',
      timestamp: '2023-07-13T09:15:22Z',
      participants: ['Sarah Chen', 'security-helpdesk@company.com'],
      content: `From: Sarah Chen <sarah.chen@company.com>
To: security-helpdesk@company.com
Subject: Question about team website hosting

Hello Security Team,

I want to host a website for our team project. Can I register a .org domain and set it up myself? This would be for our internal hackathon project to showcase our work to other teams.

The site would only contain project descriptions and demo videos, no sensitive data.

Thanks,
Sarah Chen
Senior Developer, Platform Team`,
      attachments: [
        { name: 'project_outline.pdf', link: 'https://company.sharepoint.com/sites/security/project_outline.pdf' }
      ]
    },
    createdDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").lastUpdatedDate,
    lastReplyBy: "security_team"
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
    sourceTool: "Slack",
    aiSummary: "Travel security request from Michael Rodriguez regarding Mexico business trip. No sign-off needed. Due today.",
    aiNextSteps: ["Post this response in Slack", "Send a travel security reminder to #team-all in Slack"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'slack',
      timestamp: '2023-07-15T10:42:18Z',
      threadId: 'C01234567/p1623456789000400',
      participants: ['Michael Rodriguez', 'Sarah O\'Connor', 'Raj Patel', '#ask-security'],
      content: `*Michael Rodriguez*: @security-travel I'm traveling to Mexico next week for the conference. Can I bring my work phone? Are there any special security measures I need to take?

*Raj Patel*: @Michael I went last year and had to do some special setup. Let's see what the security team says.

*Sarah O'Connor*: Hi Michael, there are specific requirements for Mexico travel. When exactly are you leaving?

*Michael Rodriguez*: Thanks Sarah. I'm leaving next Wednesday, so I have about a week to prepare.`,
    },
    createdDate: getRelativeDates(new Date().toISOString().split('T')[0], "low").createdDate,
    lastUpdatedDate: getRelativeDates(new Date().toISOString().split('T')[0], "low").lastUpdatedDate,
    lastReplyBy: "requestor"
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
    sourceTool: "Email",
    aiSummary: "Request submitted by Alex Kumar from Data Protection team via email. Seeking guidance on external data sharing policy compliance. Pending sign-off from James Wilson. Due yesterday.",
    aiNextSteps: ["Send a reminder to James"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'email',
      timestamp: '2023-07-10T15:33:27Z',
      participants: ['Alex Kumar', 'security-helpdesk@company.com'],
      content: `From: Alex Kumar <alex.kumar@company.com>
To: security-helpdesk@company.com
Subject: External file sharing with auditors

Hello Security Team,

Our team needs to share some sensitive financial documents with external auditors for the upcoming quarterly review. These include financial statements, transaction logs, and some customer data (anonymized).

What's the approved process for this? The auditors need access by the end of next week.

Thanks,
Alex Kumar
Finance Department`,
      attachments: [
        { name: 'audit_requirements.pdf', link: 'https://company.sharepoint.com/sites/finance/audit_requirements.pdf' }
      ]
    },
    createdDate: getRelativeDates(new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").lastUpdatedDate,
    lastReplyBy: "security_team"
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
    sourceTool: "Slack",
    aiSummary: "Request submitted by Patricia Wong from Identity & Access Management team via Slack. Created tickets for IAM team to add contractors to AD/Okta and IT to provision devices. Due yesterday.",
    aiNextSteps: ["Follow up with IT to provision devices", "Follow up with IAM team to add contractors to AD/Okta"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'slack',
      timestamp: '2023-07-08T09:17:42Z',
      threadId: 'C01234567/p1623456789000500',
      participants: ['Patricia Wong', 'Maya Patel', 'David Chen', '#ask-security'],
      content: `*Patricia Wong*: @security-team We're hiring contractors next week and need to get them laptop access. What's the process for this? We have 3 developers joining the mobile team.

*David Chen*: I think there's a special process for contractors vs. full-time employees.

*Maya Patel*: @Patricia Yes, there's a different process. How long will these contractors be with us?

*Patricia Wong*: They'll be here for 6 months initially, with possible extension.

*Maya Patel*: @Patricia I'll have the security assistant kick off the process and link you into the supporting tickets. Let me know if you need anything else.`,
    },
    createdDate: getRelativeDates(new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").lastUpdatedDate,
    lastReplyBy: "requestor"
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
    sourceTool: "Zendesk",
    aiSummary: "Request submitted by Tom Mitchell from Identity & Access Management team via Zendesk. Pending sign-off from Maya Patel. Due in 3 days.",
    aiNextSteps: ["Post this response in the Zendesk ticket"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'ticket',
      timestamp: '2023-07-18T11:05:33Z',
      participants: ['Tom Mitchell', 'Security Helpdesk'],
      content: `Ticket #SEC-2023-789
Submitted by: Tom Mitchell
Department: Engineering
Priority: Urgent

Subject: Team password sharing solution needed

Description:
Our team currently has several shared accounts for various development services. We've been using a shared document to track these credentials, but I know this isn't secure.

Can we use personal LastPass accounts to share team credentials? Several team members already have personal accounts.

If not, what's the recommended solution for sharing team credentials securely? We need something immediately as we're onboarding new team members this week.`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "urgent").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "urgent").lastUpdatedDate,
    lastReplyBy: "requestor"
  },
  {
    id: 7,
    question: "Reporting suspicious emails with DocuSign links",
    user: "Lionel Lee",
    stage: "Active Incident",
    dueDate: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    source: "Phishing report button",
    sourceLink: "https://phishing.company.com/reports/2023-15",
    sourceTool: "Abnormal Security",
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
    aiSummary: "Request submitted by Security Operations agent. Currently assigned to email security team with urgent priority.",
    aiNextSteps: ["Ask SOC if they need additional context", "Send email to Abnormal Security representative to see if this can be blocked in the future"],
    submissionMethod: 'APPLICATION',
    requestContext: {
      type: 'phishing_email',
      timestamp: '2023-07-07T08:22:15Z',
      participants: ['Security Operations', 'Multiple Recipients'],
      content: `From: docusign.notification@doc-sign-secure.com
To: [Multiple Recipients]
Subject: ACTION REQUIRED: Please review and sign important document

Dear Valued Employee,

You have received an important document that requires your immediate signature. This document contains updated company policies that must be acknowledged by all employees.

Document: Company_Policy_Update_July2023.pdf
Sender: John Smith, HR Director
Due Date: July 8, 2023

[SIGN DOCUMENT NOW] <- Suspicious URL: hxxps://docusign-secure.signin.net/document/78945

If you have any questions about this document, please contact HR directly.

Thank you,
DocuSign Notification Service`,
      attachments: [
        { name: 'phishing_headers.txt', link: 'https://company.sharepoint.com/sites/security/phishing/headers_2023-15.txt' },
        { name: 'screenshot.png', link: 'https://company.sharepoint.com/sites/security/phishing/screenshot_2023-15.png' }
      ]
    },
    createdDate: getRelativeDates(new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "urgent").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "urgent").lastUpdatedDate,
    lastReplyBy: "security_team"
  },
  {
    id: 8,
    question: "Data center fire alarm triggered - Emergency response needed",
    user: "Jenny Henry",
    stage: "Fire Alert System",
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
    sourceTool: "Emergency Hotline",
    aiSummary: "Request submitted by the fire alert system. Seeking guidance on data center fire alarm response. Currently assigned to Infrastructure & Facilities team with urgent priority.",
    aiNextSteps: ["Check the fire alarm system logs", "Escalate to management once issue confirmed"],
    submissionMethod: 'APPLICATION',
    requestContext: {
      type: 'call_summary',
      timestamp: '2023-07-19T14:03:22Z',
      participants: ['Fire Alert System', 'Emergency Response Team', 'Sarah Johnson'],
      content: `EMERGENCY CALL TRANSCRIPT
Time: 14:03:22
Alert Type: Fire Alarm - Data Center B
Location: Server Room 4, Rack Section C-12

Automated Message: "Warning: Fire detection system has been triggered in Data Center B, Server Room 4. This is not a drill. Please follow emergency protocols."

Emergency Response Team Notes:
- Initial smoke detection in HVAC system near Rack C-12
- Temperature sensors showing rapid increase in ambient temperature
- Automatic fire suppression system countdown initiated
- Facility manager Sarah Johnson notified and en route
- IT emergency shutdown procedures should be initiated immediately
- Estimated arrival of fire department: 8 minutes

Priority: CRITICAL - Immediate response required
Action: Security team to coordinate with IT for emergency shutdown procedures and data protection protocols`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "urgent").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "urgent").lastUpdatedDate,
    lastReplyBy: "requestor"
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
    source: "Slack #eng-all channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200",
    sourceTool: "Slack",
    followUpQuestions: [
      "What specific third-party service are you considering?",
      "What types of user data will be handled by this service?",
      "What is your fallback authentication mechanism?",
      "How will you handle service outages?",
      "What compliance requirements apply to your user authentication?"
    ],
    aiSummary: "Request submitted by John Doe from Platform Engineering team via Slack. Seeking guidance on third-party auth service security implications. Currently assigned to IAM team with low priority. Pending sign-off from Maya Patel. Due in 1 day.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'slack',
      timestamp: '2023-07-17T13:45:29Z',
      threadId: 'C01234567/p1623456789000200',
      participants: ['John Doe', 'Maya Patel', '#eng-all'],
      content: `*John Doe*: @security-team What are the security implications of using a third-party authentication service? We're considering Auth0 for our new project.

*Maya Patel*: Hi John, that's a good question. There are several considerations here. When are you planning to implement this?

*John Doe*: We're in the architecture review phase right now, so probably within the next sprint if approved.

*John Doe*: To provide more context, we're building a customer portal that will need to integrate with our existing systems but also support social logins. We're considering Auth0 because it seems to handle this well, but we want to understand any security concerns before proceeding.

*Maya Patel*: Thanks for the additional context. Let me get back to you with a comprehensive response.`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").lastUpdatedDate,
    lastReplyBy: "requestor"
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
    sourceTool: "Google Meet",
    followUpQuestions: [
      "What type of data will be stored in this database?",
      "What is your key rotation strategy?",
      "Will you need to search on encrypted data?",
      "What is your backup strategy for encrypted data?",
      "How will you handle key recovery scenarios?"
    ],
    aiSummary: "Request submitted by Jennifer Lee from Data Security team via architecture review meeting. Seeking guidance on data encryption at rest policy compliance. Currently assigned to Data Security team with low priority. Pending sign-off from David Chen. Due in 2 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'meeting_notes',
      timestamp: '2023-07-18T10:30:00Z',
      participants: ['Jennifer Lee', 'David Chen', 'Architecture Review Board'],
      content: `Architecture Review Meeting - July 18, 2023
Topic: Customer Data Platform Security Review
Attendees: Jennifer Lee (Data Engineering), David Chen (Security), Alex Wong (Platform), Sarah Miller (Product)

Meeting Notes:
10:30 - Jennifer presented the new customer data platform architecture
10:45 - Discussion of data flow and storage requirements
11:00 - Security considerations raised

Jennifer Lee: "For the new database that will store customer profile data, what encryption standard should we use for data at rest? We're planning to use PostgreSQL on AWS RDS."

David Chen: "That's an important question. What classification of data will be stored there?"

Jennifer Lee: "It will contain PII including names, addresses, and purchase history. Some financial data like last 4 digits of payment cards. No full payment details."

David Chen: "Given the sensitivity, we'll need strong encryption. Let me check our current standards and get back to you with the specific requirements."

Action Items:
- David to provide encryption standards for the database by Friday
- Jennifer to share detailed data schema with security team
- Alex to document AWS security controls already in place`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").lastUpdatedDate,
    lastReplyBy: "security_team"
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
    source: "PR #39535 Code Review",
    sourceLink: "https://github.company.com/reporting-service/pull/123",
    sourceTool: "GitHub",
    followUpQuestions: [
      "What database technology are you using?",
      "Are you using an ORM or raw SQL queries?",
      "What input validation is currently in place?",
      "Do you have automated security testing?",
      "What types of reports will users be able to generate?"
    ],
    aiSummary: "Request submitted by Alex Rodriguez from Application Security team via code review. Seeking guidance on SQL injection prevention in new reporting service. Currently assigned to Application Security team with medium priority. No sign-off needed. Due in 3 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'code_review',
      timestamp: '2023-07-19T09:15:42Z',
      threadId: 'github.company.com/reporting-service/pull/123',
      participants: ['Alex Rodriguez', 'Rachel Kim', 'Dev Team'],
      content: `Pull Request #123: Add custom report generation API
Repository: reporting-service
Author: Alex Rodriguez
Reviewers: Rachel Kim, Michael Chen

Rachel Kim commented:
> In ReportController.ts, line 78-92, I see you're constructing SQL queries using string concatenation with user input. This could lead to SQL injection vulnerabilities. How do we prevent SQL injection in our new reporting service?

Alex Rodriguez replied:
> Good catch. I was planning to sanitize the inputs before constructing the query. What's the recommended approach?

Rachel Kim commented:
> String sanitization isn't sufficient protection. We should use parameterized queries or an ORM.

Alex Rodriguez replied:
> I'll need some guidance on implementing this properly. Can the security team provide specific recommendations for our TypeScript/Node.js backend?

Code snippet from PR:
\`\`\`typescript
function generateCustomReport(filters: any) {
  const query = "SELECT * FROM customer_data WHERE region = '" + filters.region + 
                "' AND signup_date > '" + filters.startDate + 
                "' ORDER BY " + filters.sortField;
  return db.execute(query);
}
\`\`\``,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").lastUpdatedDate,
    lastReplyBy: "requestor"
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
    sourceTool: "Zendesk",
    followUpQuestions: [
      "What type of data will be transmitted over WebSockets?",
      "How many concurrent connections do you expect?",
      "Will you need to support reconnection scenarios?",
      "What client platforms need to be supported?",
      "How will you handle message validation?"
    ],
    aiSummary: "Request submitted by Samantha Taylor from Network Security team via architecture review ticket. Seeking guidance on WebSocket security requirements. Currently assigned to Network Security team with low priority. Pending sign-off from James Wilson. Due in 2 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'ticket',
      timestamp: '2023-07-16T16:22:37Z',
      participants: ['Samantha Taylor', 'James Wilson', 'Architecture Team'],
      content: `Ticket #ARCH-789
Type: Architecture Review
Component: Real-time Notification Service
Submitted by: Samantha Taylor

Description:
We're designing a new WebSocket service for real-time notifications and updates to users. This will replace our current polling mechanism and provide immediate updates for critical alerts, chat messages, and system notifications.

Question:
What security requirements should we implement for our new WebSocket service? We need guidance on authentication, message validation, rate limiting, and any other security considerations specific to WebSockets.

Technical Details:
- Backend: Node.js with Socket.IO
- Frontend: React with Socket.IO client
- Expected concurrent connections: ~5,000
- Will transmit: User notifications, system alerts, chat messages
- Some notifications may contain sensitive information

Timeline:
Design phase now, implementation starts in 2 weeks`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").lastUpdatedDate,
    lastReplyBy: "requestor"
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
    sourceTool: "Microsoft Teams",
    followUpQuestions: [
      "What environments are in your deployment pipeline?",
      "How are deployment credentials managed?",
      "What security scanning tools are currently in use?",
      "How are container images stored and verified?",
      "What is your secret rotation strategy in Kubernetes?"
    ],
    aiSummary: "Request submitted by Mike Johnson from DevSecOps team via devsecops planning meeting. Seeking guidance on secure CI/CD pipelines for new Kubernetes-based microservices. Currently assigned to DevSecOps team with low priority. No sign-off needed. Due in 4 days.",
    aiNextSteps: ["Post this response in the Slack channel"],
    submissionMethod: 'PERSON',
    requestContext: {
      type: 'meeting_notes',
      timestamp: '2023-07-20T13:00:00Z',
      participants: ['Mike Johnson', 'Olivia Davis', 'DevOps Team', 'Security Team'],
      content: `DevSecOps Planning Meeting - July 20, 2023
Topic: Secure CI/CD Pipeline for Kubernetes Microservices
Attendees: Mike Johnson (DevOps), Olivia Davis (Security), Team Leads

Meeting Notes:
13:00 - Mike presented the new microservices architecture
13:15 - Discussion of deployment pipeline requirements
13:30 - Security considerations for CI/CD

Mike Johnson: "We're moving to a Kubernetes-based microservices architecture and need to redesign our CI/CD pipelines. How should we implement secure CI/CD pipelines for our new Kubernetes-based microservices?"

Olivia Davis: "That's a comprehensive question. What specific security concerns are you most worried about?"

Mike Johnson: "Several areas: securing container images, protecting secrets in the pipeline, ensuring secure deployments across environments, and maintaining compliance with our security standards."

Olivia Davis: "We'll need to address all of those. Let me prepare a comprehensive set of requirements that covers the full pipeline."

Action Items:
- Olivia to document secure CI/CD requirements by next week
- Mike to share current pipeline design for security review
- Schedule follow-up workshop to implement security controls
- Create security testing plan for the pipeline`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "low").lastUpdatedDate,
    lastReplyBy: "requestor"
  },
  {
    id: 14,
    question: "Can we store authentication tokens in AsyncStorage for our mobile app?",
    user: "Security Assistant (Agent)",
    stage: "Design Discussion",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Mobile Security Team",
      teamEmail: "mobilesec@company.com",
      contact: "Lisa Zhang",
      email: "lisa.zhang@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [
          `Team owns mobile security standards`,
          `Prior involvement in mobile authentication design`,
          `Team maintains mobile security guidelines`
        ]
      },
      contactConfidence: {
        level: 'high',
        reasons: [
          `Author of mobile security guidelines`,
          `Led previous mobile auth implementations`,
          `Regular contributor to mobile security reviews`
        ]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "AsyncStorage is not secure for storing sensitive data like auth tokens. Use the platform-specific secure storage: Keychain for iOS and EncryptedSharedPreferences for Android.",
        supportingDocs: [
          { name: "Mobile Security Guidelines", link: "https://docs.company.com/security/mobile-security" }
        ]
      },
      {
        text: "Implement biometric authentication as an additional layer before accessing stored credentials. This follows our mobile app security requirements.",
        supportingDocs: [
          { name: "Authentication Standards", link: "https://docs.company.com/security/auth-standards" }
        ]
      },
      {
        text: "For temporary storage during app usage, consider using in-memory storage with proper app lifecycle management.",
        supportingDocs: [
          { name: "Mobile Data Storage Policy", link: "https://docs.company.com/security/mobile-storage" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Mobile Security Guidelines", link: "https://docs.company.com/security/mobile-security" },
      { name: "Authentication Standards", link: "https://docs.company.com/security/auth-standards" }
    ],
    otherDocs: [
      { name: "React Native Security Best Practices", link: "https://docs.company.com/mobile/react-native-security" },
      { name: "Mobile App Architecture", link: "https://docs.company.com/mobile/architecture" }
    ],
    source: "Slack #mobile-engineering channel",
    sourceLink: "https://slack.company.com/archives/C01234567/p1623456789000600",
    sourceTool: "Slack",
    aiSummary: "AI detected security-relevant discussion in mobile engineering channel regarding token storage. High priority due to sensitive data handling implications. Requires security team review.",
    aiNextSteps: [
      "Share response in #mobile-engineering channel",
      "Schedule mobile security review session",
      "Update mobile security guidelines with specific examples"
    ],
    submissionMethod: 'AI_AGENT',
    requestContext: {
      type: 'slack',
      timestamp: '2023-07-21T11:37:14Z',
      threadId: 'C01234567/p1623456789000600',
      participants: ['Dev Team', 'Security Assistant (Agent)', 'Lisa Zhang'],
      content: `*Ryan Chen*: Hey team, I'm working on the authentication flow for our React Native app. I'm thinking of storing the JWT in AsyncStorage for persistence. Any concerns with that approach?

*Jamie Wong*: I think that should work. AsyncStorage is pretty standard for React Native.

*Tyler Smith*: Not sure if there are security implications though. @security-assistant what do you think?

*Security Assistant (Agent)*: I noticed you're discussing token storage in mobile apps. Storing authentication tokens in AsyncStorage might present security risks as it's not encrypted storage. Can we store authentication tokens in AsyncStorage for our mobile app?

*Lisa Zhang*: Good catch @security-assistant. AsyncStorage is not secure for sensitive data like auth tokens. Let me prepare a proper response with the recommended approach.`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").lastUpdatedDate,
    lastReplyBy: "requestor"
  },
  {
    id: 15,
    question: "Hardcoded API keys found in frontend code repository",
    user: "Security Assistant (Agent)",
    stage: "Code Review",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Application Security Team",
      teamEmail: "appsec@company.com",
      contact: "David Chen",
      email: "david.chen@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [
          `Team owns secure coding standards`,
          `Previous similar issues assigned to this team`,
          `Team manages secret scanning tools`
        ]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [
          `Lead for secure coding initiatives`,
          `Responded to similar issues in the past`
        ]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "I noticed hardcoded API keys in the frontend repository. This violates our secure coding policy as these keys are visible in the client-side code and can be extracted by users.",
        supportingDocs: [
          { name: "Secure Coding Standards", link: "https://docs.company.com/security/secure-coding" }
        ]
      },
      {
        text: "Please move these API keys to environment variables on the server side and use a backend API to make authenticated requests. For frontend-only applications, consider implementing token exchange or proxying through a backend service.",
        supportingDocs: [
          { name: "API Security Guidelines", link: "https://docs.company.com/security/api-security" }
        ]
      },
      {
        text: "Additionally, these exposed keys should be rotated immediately as they should be considered compromised.",
        supportingDocs: [
          { name: "Secret Management Policy", link: "https://docs.company.com/security/secret-management" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Secure Coding Standards", link: "https://docs.company.com/security/secure-coding" },
      { name: "API Security Guidelines", link: "https://docs.company.com/security/api-security" }
    ],
    otherDocs: [
      { name: "Secret Management Policy", link: "https://docs.company.com/security/secret-management" },
      { name: "Frontend Security Checklist", link: "https://docs.company.com/security/frontend-checklist" }
    ],
    source: "PR #42891 Code Review",
    sourceLink: "https://github.company.com/customer-portal/pull/42891",
    sourceTool: "GitHub",
    followUpQuestions: [
      "How should we handle existing deployments with the exposed keys?",
      "What's the recommended approach for frontend authentication to APIs?"
    ],
    aiSummary: "Security Assistant identified hardcoded API keys in frontend code during automated PR scanning. High priority due to potential credential exposure. Requires immediate key rotation and architectural changes.",
    aiNextSteps: [
      "Contact repository owner directly",
      "Create Jira ticket for tracking remediation",
      "Schedule security review of related repositories"
    ],
    submissionMethod: 'AI_AGENT',
    requestContext: {
      type: 'code_review',
      timestamp: '2023-07-22T09:45:12Z',
      threadId: 'github.company.com/customer-portal/pull/42891',
      participants: ['Emma Johnson', 'Tyler Smith', 'Security Assistant (Agent)'],
      content: `Pull Request #42891: Add customer profile dashboard
Repository: customer-portal
Author: Emma Johnson
Reviewers: Tyler Smith

Security Assistant (Agent) commented:
> I've detected hardcoded API keys in the following files:
> 
> src/services/api.js:
> \`\`\`javascript
> const API_KEY = 'ak_live_7f4bJ92KPoV8Lp21qwEfG9Hs';
> const API_SECRET = 'ask_live_NqK8fT2xR5vBpL7zD1jH3mYs';
> 
> export const fetchCustomerData = async (customerId) => {
>   const response = await fetch(\`https://api.analytics.com/v2/customers/\${customerId}\`, {
>     headers: {
>       'Authorization': \`Bearer \${API_KEY}\`,
>       'X-Api-Secret': API_SECRET
>     }
>   });
>   return response.json();
> };
> \`\`\`
> 
> This is a security issue as these API keys are exposed in client-side code and can be extracted by users. Please move these to environment variables on the server side.

Emma Johnson replied:
> Thanks for catching this! I was using these for testing and forgot to remove them. I'll update the code to use our backend API instead.

Tyler Smith commented:
> @Emma we should also rotate these keys immediately since they've been committed to the repo.`
    },
    createdDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").lastUpdatedDate,
    lastReplyBy: "security_team"
  },
  {
    id: 16,
    question: "Insecure file upload implementation in customer support portal",
    user: "Security Assistant (Agent)",
    stage: "Design Review",
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Application Security Team",
      teamEmail: "appsec@company.com",
      contact: "Lisa Zhang",
      email: "lisa.zhang@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [
          `Team owns secure design standards`,
          `Previous file upload security reviews performed by this team`,
          `Team manages web application security standards`
        ]
      },
      contactConfidence: {
        level: 'high',
        reasons: [
          `Author of file upload security guidelines`,
          `Led previous file upload security reviews`,
          `Subject matter expert for web security`
        ]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "I noticed the design for the new file upload feature in the customer support portal lacks several security controls. The current implementation doesn't validate file types, doesn't scan for malware, and stores files with user-controlled names.",
        supportingDocs: [
          { name: "Secure File Upload Guidelines", link: "https://docs.company.com/security/file-upload" }
        ]
      },
      {
        text: "Please implement the following controls: 1) Server-side file type validation using content inspection, not just extension checking, 2) File size limits, 3) Malware scanning via our security gateway, 4) Randomized file names for storage, and 5) Proper access controls on the storage bucket.",
        supportingDocs: [
          { name: "Cloud Storage Security Standards", link: "https://docs.company.com/security/cloud-storage" }
        ]
      },
      {
        text: "Additionally, consider implementing a separate domain for serving user-uploaded content to prevent XSS attacks.",
        supportingDocs: [
          { name: "Web Application Security Checklist", link: "https://docs.company.com/security/webapp-checklist" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Secure File Upload Guidelines", link: "https://docs.company.com/security/file-upload" },
      { name: "Cloud Storage Security Standards", link: "https://docs.company.com/security/cloud-storage" }
    ],
    otherDocs: [
      { name: "Web Application Security Checklist", link: "https://docs.company.com/security/webapp-checklist" },
      { name: "OWASP File Upload Cheat Sheet", link: "https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html" }
    ],
    source: "Slack #support-portal-dev channel",
    sourceLink: "https://slack.company.com/archives/C01234567/p1623456789000700",
    sourceTool: "Slack",
    followUpQuestions: [
      "What malware scanning solution should we integrate with?",
      "Are there specific file types that should be blocked entirely?"
    ],
    aiSummary: "Security Assistant identified insecure file upload design in customer support portal during Slack conversation monitoring. Medium priority issue requiring implementation of multiple security controls before feature release.",
    aiNextSteps: [
      "Schedule design review meeting with support portal team",
      "Share file upload security guidelines with development team",
      "Create security requirements document for this feature"
    ],
    submissionMethod: 'AI_AGENT',
    requestContext: {
      type: 'slack',
      timestamp: '2023-07-20T14:22:37Z',
      threadId: 'C01234567/p1623456789000700',
      participants: ['Rachel Kim', 'Jason Park', 'Support Portal Team', 'Security Assistant (Agent)'],
      content: `*Rachel Kim*: Hey team, I've pushed the initial implementation of the file upload feature for the support portal. Customers can now attach files to their support tickets.

*Jason Park*: Nice! How are we handling the uploads? Are they going straight to S3?

*Rachel Kim*: Yeah, we're using presigned URLs to upload directly to the support-uploads bucket. The frontend gets the URL from our API, then posts the file directly to S3.

*Jason Park*: Cool. What about file types? Are we restricting what they can upload?

*Rachel Kim*: Right now we're checking the file extension on the frontend and only allowing common document types (.pdf, .docx, .xlsx, .png, .jpg). We store them with the original filename in a folder structure based on the ticket ID.

*Security Assistant (Agent)*: I noticed you're discussing file uploads for the support portal. The current implementation may have security risks: 1) Frontend-only extension checking can be bypassed, 2) Using original filenames can lead to path traversal issues, 3) No mention of malware scanning. Would you like guidance on secure file upload implementation?

*Rachel Kim*: Oh, good catch @security-assistant! Yes, we'd appreciate guidance on making this more secure before we release it.`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").lastUpdatedDate,
    lastReplyBy: "requestor"
  },
  {
    id: 17,
    question: "Excessive permissions in IAM roles for data analytics team",
    user: "Security Assistant (Agent)",
    stage: "Cloud Security Review",
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Cloud Security Team",
      teamEmail: "cloudsec@company.com",
      contact: "Marcus Johnson",
      email: "marcus.johnson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [
          `Team owns cloud security standards`,
          `Team manages IAM policies and reviews`,
          `Previous similar issues assigned to this team`
        ]
      },
      contactConfidence: {
        level: 'high',
        reasons: [
          `Cloud security architect`,
          `Author of least privilege access guidelines`,
          `Regular reviewer of IAM configurations`
        ]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "I've identified overly permissive IAM roles for the data analytics team in our AWS environment. The current role has full access to all S3 buckets, when only specific data buckets are needed for their work.",
        supportingDocs: [
          { name: "Cloud IAM Security Standards", link: "https://docs.company.com/security/cloud-iam" }
        ]
      },
      {
        text: "Please implement least privilege access by: 1) Creating a new role with access only to required buckets, 2) Implementing resource-level permissions with specific actions (GetObject, ListBucket), and 3) Adding condition keys to restrict access to specific paths within buckets.",
        supportingDocs: [
          { name: "Least Privilege Access Guidelines", link: "https://docs.company.com/security/least-privilege" }
        ]
      },
      {
        text: "Additionally, implement CloudTrail monitoring for sensitive data access and regular access reviews for these roles.",
        supportingDocs: [
          { name: "Cloud Monitoring Standards", link: "https://docs.company.com/security/cloud-monitoring" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Cloud IAM Security Standards", link: "https://docs.company.com/security/cloud-iam" },
      { name: "Least Privilege Access Guidelines", link: "https://docs.company.com/security/least-privilege" }
    ],
    otherDocs: [
      { name: "Cloud Monitoring Standards", link: "https://docs.company.com/security/cloud-monitoring" },
      { name: "AWS Security Best Practices", link: "https://docs.company.com/security/aws-best-practices" }
    ],
    source: "Architecture Review Meeting",
    sourceLink: "https://meetings.company.com/recordings/arch-review-july21",
    sourceTool: "Otter.ai",
    followUpQuestions: [
      "What specific S3 buckets does the data analytics team need access to?",
      "Should we implement temporary elevated access for special projects?"
    ],
    aiSummary: "Security Assistant identified excessive IAM permissions during architecture review meeting. Data analytics team has broader S3 access than needed, violating least privilege principle. Medium priority requiring IAM role refinement.",
    aiNextSteps: [
      "Schedule meeting with data analytics team lead to understand access requirements",
      "Create Jira ticket for IAM remediation",
      "Develop least privilege access template for analytics roles"
    ],
    submissionMethod: 'AI_AGENT',
    requestContext: {
      type: 'meeting_notes',
      timestamp: '2023-07-21T10:00:00Z',
      participants: ['Alex Wong', 'Sophia Chen', 'Data Analytics Team', 'Cloud Architecture Team', 'Security Assistant (Agent)'],
      content: `Architecture Review Meeting - July 21, 2023
Topic: Data Analytics Platform Expansion
Attendees: Alex Wong (Data Analytics), Sophia Chen (Cloud Architecture), Team Members

Meeting Notes:
10:00 - Alex presented the data analytics platform expansion plans
10:15 - Discussion of new data sources and processing requirements
10:30 - Cloud resource requirements and access patterns

Alex Wong: "For the new data sources, we'll need access to the customer transaction data in S3. We currently have a role called 'data-analytics-prod' that our team uses."

Sophia Chen: "Let me check that role... It looks like data-analytics-prod has S3:* permissions on all buckets. That's pretty broad access."

Alex Wong: "Yeah, it was set up that way initially to make development easier. We really only need access to the 'customer-transactions', 'marketing-analytics', and 'product-usage' buckets."

Sophia Chen: "And what operations do you need to perform on those buckets?"

Alex Wong: "Mostly read operations - GetObject, ListBucket. For the 'marketing-analytics' bucket we also need PutObject for our processed results."

Security Assistant (Agent) [automated transcript analysis]: "Potential security issue detected: The data-analytics-prod IAM role has excessive permissions (S3:* on all buckets) when only specific buckets and operations are required. This violates least privilege principle from our cloud security standards."

Sophia Chen: "We should probably refine those permissions to follow least privilege. I'll make a note to update the IAM policies."

Alex Wong: "That makes sense. We don't need access to everything."`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").lastUpdatedDate,
    lastReplyBy: "requestor"
  },
  {
    id: 18,
    question: "Unencrypted PII data in development database",
    user: "Security Assistant (Agent)",
    stage: "Data Security",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Data Security Team",
      teamEmail: "datasec@company.com",
      contact: "Olivia Davis",
      email: "olivia.davis@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [
          `Team owns data protection standards`,
          `Previous PII handling issues assigned to this team`,
          `Team manages data classification policy`
        ]
      },
      contactConfidence: {
        level: 'high',
        reasons: [
          `Data protection officer`,
          `Author of PII handling guidelines`,
          `Regular reviewer of data security issues`
        ]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "I've identified unencrypted Personally Identifiable Information (PII) in the development database 'customer-dev-db1'. This includes full names, addresses, phone numbers, and email addresses stored in plaintext.",
        supportingDocs: [
          { name: "Data Protection Policy", link: "https://docs.company.com/security/data-protection" }
        ]
      },
      {
        text: "This violates our data security policy which requires all PII to be encrypted at rest, even in development environments. Additionally, development environments should use anonymized or synthetic data rather than actual customer information.",
        supportingDocs: [
          { name: "PII Handling Guidelines", link: "https://docs.company.com/security/pii-handling" }
        ]
      },
      {
        text: "Please implement the following: 1) Enable database encryption for the development database, 2) Replace real customer data with anonymized data using our data masking tool, and 3) Review other development databases for similar issues.",
        supportingDocs: [
          { name: "Database Security Standards", link: "https://docs.company.com/security/database-security" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Data Protection Policy", link: "https://docs.company.com/security/data-protection" },
      { name: "PII Handling Guidelines", link: "https://docs.company.com/security/pii-handling" }
    ],
    otherDocs: [
      { name: "Database Security Standards", link: "https://docs.company.com/security/database-security" },
      { name: "Data Masking Guidelines", link: "https://docs.company.com/security/data-masking" }
    ],
    source: "Slack #dev-database channel",
    sourceLink: "https://slack.company.com/archives/C01234567/p1623456789000800",
    sourceTool: "Slack",
    followUpQuestions: [
      "How should we handle the existing unencrypted data?",
      "What data masking solution should we use for development?"
    ],
    aiSummary: "Security Assistant identified unencrypted PII in development database during Slack conversation monitoring. High priority due to potential regulatory compliance issues. Requires immediate encryption and data anonymization.",
    aiNextSteps: [
      "Contact database administrators immediately",
      "Create high-priority Jira ticket for remediation",
      "Schedule data protection training for development team"
    ],
    submissionMethod: 'AI_AGENT',
    requestContext: {
      type: 'slack',
      timestamp: '2023-07-19T16:38:42Z',
      threadId: 'C01234567/p1623456789000800',
      participants: ['Daniel Lee', 'Priya Patel', 'Dev Team', 'Security Assistant (Agent)'],
      content: `*Daniel Lee*: Hey team, I've restored a fresh copy of the production database to customer-dev-db1 for our testing. It has the latest customer data as of yesterday.

*Priya Patel*: Thanks! That will help with debugging the address validation issue we're seeing.

*Daniel Lee*: Yeah, it's much easier working with real customer data. I've granted everyone on the team read/write access to the database.

*Priya Patel*: Perfect. I'll start querying the customer_profiles table to find examples with international addresses.

*Security Assistant (Agent)*: I noticed you're discussing copying production customer data to a development environment. This may violate our data protection policy which requires PII to be encrypted at rest and anonymized in non-production environments. Would you like guidance on properly handling customer data in development?

*Daniel Lee*: Oh, I didn't realize we weren't supposed to use real customer data in dev. @security-assistant yes, please provide guidance on the proper approach.`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "high").lastUpdatedDate,
    lastReplyBy: "requestor"
  },
  {
    id: 19,
    question: "Missing security headers on customer-facing web applications",
    user: "Security Assistant (Agent)",
    stage: "Web Security",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Application Security Team",
      teamEmail: "appsec@company.com",
      contact: "James Wilson",
      email: "james.wilson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [
          `Team owns web application security standards`,
          `Previous security header issues assigned to this team`,
          `Team manages web security scanning tools`
        ]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [
          `Web security specialist`,
          `Contributor to security header guidelines`,
          `Has reviewed similar issues previously`
        ]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "I've identified missing security headers on our customer-facing web applications. Specifically, the customer portal, support site, and account management applications are missing critical headers like Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security.",
        supportingDocs: [
          { name: "Web Security Headers Policy", link: "https://docs.company.com/security/security-headers" }
        ]
      },
      {
        text: "These headers are required by our web security standards and help prevent common attacks like XSS, clickjacking, and SSL stripping. The absence of these headers was identified in an automated scan of our public endpoints.",
        supportingDocs: [
          { name: "Web Application Security Standards", link: "https://docs.company.com/security/webapp-security" }
        ]
      },
      {
        text: "Please implement the required headers as specified in our security header policy. Consider using a web application firewall or CDN configuration to apply these headers consistently across all applications.",
        supportingDocs: [
          { name: "Security Header Implementation Guide", link: "https://docs.company.com/security/header-implementation" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Web Security Headers Policy", link: "https://docs.company.com/security/security-headers" },
      { name: "Web Application Security Standards", link: "https://docs.company.com/security/webapp-security" }
    ],
    otherDocs: [
      { name: "Security Header Implementation Guide", link: "https://docs.company.com/security/header-implementation" },
      { name: "OWASP Secure Headers Project", link: "https://owasp.org/www-project-secure-headers/" }
    ],
    source: "DevSecOps Planning Meeting",
    sourceLink: "https://meetings.company.com/recordings/devsecops-july18",
    sourceTool: "Microsoft Teams",
    followUpQuestions: [
      "Should we implement these headers at the application level or infrastructure level?",
      "What is the recommended Content-Security-Policy configuration for our applications?"
    ],
    aiSummary: "Security Assistant identified missing security headers on customer-facing web applications during automated scanning. Medium priority issue affecting multiple applications. Requires implementation of standard security headers to comply with web security policy.",
    aiNextSteps: [
      "Share findings with web platform team",
      "Create Jira tickets for each affected application",
      "Schedule security header implementation workshop"
    ],
    submissionMethod: 'AI_AGENT',
    requestContext: {
      type: 'meeting_notes',
      timestamp: '2023-07-18T14:00:00Z',
      participants: ['Mike Johnson', 'Olivia Davis', 'Web Platform Team', 'Security Assistant (Agent)'],
      content: `DevSecOps Planning Meeting - July 18, 2023
Topic: Web Platform Security Improvements
Attendees: Mike Johnson (DevOps), Olivia Davis (Security), Web Platform Team

Meeting Notes:
14:00 - Discussion of current web platform architecture
14:15 - Review of recent deployments and changes
14:30 - Planning for security improvements

Mike Johnson: "We've deployed the new customer portal last week and it's been stable so far. We're planning to migrate the support site to the same architecture next month."

Olivia Davis: "That's good progress. Have we run security scans on the new portal yet?"

Mike Johnson: "We ran the basic vulnerability scan before deployment and fixed the critical issues, but we haven't done a comprehensive assessment yet."

Team Member: "The account management application is also due for an update. We're planning to modernize the frontend next quarter."

Security Assistant (Agent) [automated transcript analysis]: "Security scan results for customer portal available: Missing security headers detected including Content-Security-Policy, X-Frame-Options, Strict-Transport-Security. Similar issues exist on support site and account management applications based on last scan (July 10)."

Olivia Davis: "We should make sure all our customer-facing applications have the proper security headers. That's an easy win for security."

Mike Johnson: "Good point. We could implement those at the CDN level to ensure consistency across all applications."`,
    },
    createdDate: getRelativeDates(new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").createdDate,
    lastUpdatedDate: getRelativeDates(new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0], "medium").lastUpdatedDate,
    lastReplyBy: "requestor"
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
    sourceTool: "Zendesk",
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
    sourceTool: "Slack",
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
    sourceTool: "Email",
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
    sourceTool: "Emergency Hotline",
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
    sourceTool: "Zendesk",
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
    sourceTool: "Abnormal Security",
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
    sourceTool: "Slack",
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