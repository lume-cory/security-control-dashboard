export interface RequestForm {
  overview: {
    appName: string;
    reasonForAccess: string;
  };
  financial: {
    cost: number;
    existingLicense: boolean;
    managerApproval: boolean;
    costCenterApproved: boolean;
  };
  users: {
    numberOfUsers: number;
    teamRoles: string[];
  };
  resource: {
    accessDuration: string;
  };
  security: {
    loginMethod: string;
    integrations: string[];
    sso: boolean;
    scim: boolean;
    dataIngestion: 'Manual' | 'API';
    dataType: string;
    dataClassification: 'Internal' | 'Financial' | 'Confidential' | 'Public';
  };
  documentation: {
    designDocs?: { name: string; link: string }[];
    procurementDocs?: { name: string; link: string }[];
    assessmentDocs?: { name: string; link: string }[];
    toolNeedsDocs?: { name: string; link: string }[];
  };
}

export interface VendorTrustInfo {
  compliance: Array<{
    framework: string;
    status: string;
    link: string;
    lastUpdated: string;
  }>;
  dataRetention: {
    policy: string;
    link: string;
  };
  dataProtection: {
    policy: string;
    link: string;
  };
  uptime: {
    percentage: string;
    link: string;
  };
  riskLevel?: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface ConversationMessage {
  sender: 'AI Agent' | string;
  message: string;
  timestamp: string;
}

export interface VendorRequest {
  id: number;
  appName: string;
  requestor: string;
  type: 'New Vendor' | 'New User' | 'Renewal';
  stage: 'New Request' | 'Requestor Followup' | 'Vendor Assessment' | 'Pending' | 'Approved' | 'Denied';
  triage: 'urgent' | 'high' | 'medium' | 'low';
  users: string;
  slaStatus: string;
  dueDate: string;
  policyOwner?: PolicyOwner;
  suggestedResponse: string;
  supportingDocs: Array<{ name: string; link: string }>;
  requestForm: RequestForm;
  otherDocs?: Array<{ name: string; link: string }>;
  residualRisk?: 'High' | 'Medium' | 'Low';
  decision?: string;
  trustInfo: VendorTrustInfo;
  conversation: ConversationMessage[];
}

export interface VendorCompletedRequest {
  id: number;
  appName: string;
  requestor: string;
  type: 'New Vendor' | 'New User' | 'Renewal';
  stage: 'New Request' | 'Requestor Followup' | 'Vendor Assessment' | 'Pending' | 'Approved' | 'Denied';
  triage: 'urgent' | 'high' | 'medium' | 'low';
  users: string;
  slaStatus: string;
  dueDate: string;
  policyOwner?: PolicyOwner;
  suggestedResponse: string;
  supportingDocs: Array<{ name: string; link: string }>;
  requestForm: RequestForm;
  otherDocs?: Array<{ name: string; link: string }>;
  residualRisk?: 'High' | 'Medium' | 'Low';
  decision?: string;
  trustInfo: VendorTrustInfo;
  conversation?: ConversationMessage[];
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

export interface Confidence {
  level: 'high' | 'medium' | 'low';
  reasons: string[];
}

export const VendorRequests: VendorRequest[] = [
  {
    id: 1,
    appName: "Salesforce",
    requestor: "John Doe",
    type: "New Vendor",
    stage: "Vendor Assessment",
    users: "25",
    triage: "high",
    slaStatus: "At Risk",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    suggestedResponse: "Based on initial assessment, Salesforce meets our security requirements but will need to confirm the purchase has been approved by the cost center",
    supportingDocs: [
      { name: "Security Policy #PROTECT-014", link: "https://docs.company.com/security/AUTH-001" },
      { name: "Security Policy #DS-023", link: "https://docs.company.com/security/AUTH-001" },
      { name: "Prior Vendor Review #VR-789", link: "https://reviews.company.com/PR-789" }
    ],
    requestForm: {
      overview: {
        appName: "Salesforce",
        reasonForAccess: "Need CRM solution for sales team"
      },
      financial: {
        cost: 15000,
        existingLicense: false,
        managerApproval: true,
        costCenterApproved: true
      },
      users: {
        numberOfUsers: 25,
        teamRoles: ["Sales Rep", "Sales Manager", "Admin"]
      },
      resource: {
        accessDuration: "12 months"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["Slack", "Gmail", "Calendar"],
        sso: true,
        scim: true,
        dataIngestion: "API",
        dataType: "Customer Data",
        dataClassification: "Confidential"
      },
      documentation: {
        designDocs: [
          { name: "Salesforce Implementation Design", link: "https://docs.company.com/design/salesforce-impl" },
          { name: "CRM Architecture", link: "https://docs.company.com/design/crm-arch" }
        ],
        procurementDocs: [
          { name: "Salesforce Contract", link: "https://docs.company.com/procurement/sf-contract" },
          { name: "Cost Analysis", link: "https://docs.company.com/procurement/sf-cost" }
        ],
        assessmentDocs: [
          { name: "Previous Salesforce Assessment", link: "https://kb.company.com/vendor/salesforce" },
          { name: "CRM Security Guidelines", link: "https://kb.company.com/security/crm" }
        ],
        toolNeedsDocs: [
          { name: "Sales Team Requirements", link: "https://docs.company.com/needs/sales-crm" }
        ]
      }
    },
    trustInfo: {
      compliance: [
        { framework: "SOC 2", status: "Compliant", link: "https://compliance.salesforce.com/en/soc-2", lastUpdated: "2024-11-25" },
        { framework: "ISO 27001", status: "Compliant", link: "https://compliance.salesforce.com/en/iso-27001", lastUpdated: "2024-08-13" },
        { framework: "HIPAA", status: "Compliant", link: "https://compliance.salesforce.com/en/hipaa", lastUpdated: "2024-11-19" },
        { framework: "PCI-DSS", status: "Compliant", link: "https://compliance.salesforce.com/en/pci-dss", lastUpdated: "2024-11-21" },
        { framework: "GDPR", status: "Compliant", link: "https://compliance.salesforce.com/en/gdpr", lastUpdated: "2024-08-14" }
      ],
      dataRetention: {
        policy: "Data Retention Policy",
        link: "https://www.salesforce.com/company/privacy/data-retention-policy/"
      },
      dataProtection: {
        policy: "Data Protection Policy",
        link: "https://www.salesforce.com/company/privacy/data-protection-policy/"
      },
      uptime: {
        percentage: "99.99%",
        link: "https://trust.salesforce.com/en/trust-status/"
      }
    },
    conversation: [
      {
        sender: 'AI Agent',
        message: 'Hi there! I see you\'re requesting access to Acme Analytics. Could you tell me why your team needs this tool?',
        timestamp: '2023-06-15T10:00:00Z'
      },
      {
        sender: 'Jane Smith',
        message: 'We need it for data visualization and reporting for our quarterly business reviews.',
        timestamp: '2023-06-15T10:02:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks! How many users will need access to this tool?',
        timestamp: '2023-06-15T10:03:00Z'
      },
      {
        sender: 'Jane Smith',
        message: 'About 12 people from our team.',
        timestamp: '2023-06-15T10:05:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Got it. What type of data will you be storing or processing in Acme Analytics?',
        timestamp: '2023-06-15T10:06:00Z'
      },
      {
        sender: 'Jane Smith',
        message: 'We\'ll be working with business metrics data, classified as Internal Only.',
        timestamp: '2023-06-15T10:08:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for that information. Do you have budget approval for this tool? It costs approximately $5,000.',
        timestamp: '2023-06-15T10:09:00Z'
      },
      {
        sender: 'Jane Smith',
        message: 'Yes, my manager has approved it and the cost center is ready.',
        timestamp: '2023-06-15T10:11:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Perfect! I\'ve compiled all this information into your request form. The security team will review your request and get back to you soon.',
        timestamp: '2023-06-15T10:12:00Z'
      }
    ]
  },
  {
    id: 2,
    appName: "Zoom",
    requestor: "Sarah Chen",
    type: "New User",
    stage: "New Request",
    users: "125",
    triage: "medium",
    slaStatus: "On Track",
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Infrastructure Security Team",
      teamEmail: "infrasec@company.com",
      contact: "Chris Martinez",
      email: "chris.martinez@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Team handles collaboration tools`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Primary contact for video conferencing tools`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Zoom is an approved vendor. New user request can be processed after cost center approval...",
    supportingDocs: [
      { name: "Zoom Security Review", link: "https://docs.company.com/security/zoom-review" }
    ],
    requestForm: {
      overview: {
        appName: "Zoom",
        reasonForAccess: "Need video conferencing for client meetings"
      },
      financial: {
        cost: 200,
        existingLicense: true,
        managerApproval: true,
        costCenterApproved: false
      },
      users: {
        numberOfUsers: 1,
        teamRoles: ["Account Manager"]
      },
      resource: {
        accessDuration: "Indefinite"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["Calendar"],
        sso: true,
        scim: false,
        dataIngestion: "Manual",
        dataType: "Meeting Recordings",
        dataClassification: "Internal"
      },
      documentation: {
        designDocs: [
          { name: "Zoom Integration Design", link: "https://docs.company.com/design/zoom-integration" }
        ],
        procurementDocs: [
          { name: "Zoom Enterprise Agreement", link: "https://docs.company.com/procurement/zoom-ea" }
        ],
        assessmentDocs: [
          { name: "Video Conferencing Security Guidelines", link: "https://kb.company.com/security/video-conf" }
        ],
        toolNeedsDocs: [
          { name: "Remote Meeting Requirements", link: "https://docs.company.com/needs/remote-meetings" }
        ]
      }
    },
    trustInfo: {
      compliance: [],
      dataRetention: {
        policy: "",
        link: ""
      },
      dataProtection: {
        policy: "",
        link: ""
      },
      uptime: {
        percentage: "",
        link: ""
      }
    },
    conversation: [
      {
        sender: 'AI Agent',
        message: 'Hi Sarah, I see you\'re requesting access to Zoom. Can you tell me why you need this tool?',
        timestamp: '2023-07-10T09:30:00Z'
      },
      {
        sender: 'Sarah Chen',
        message: 'I need it for video conferencing with clients. Our team is expanding client relationships.',
        timestamp: '2023-07-10T09:32:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks! I see we already have an enterprise license. How many users need access?',
        timestamp: '2023-07-10T09:33:00Z'
      },
      {
        sender: 'Sarah Chen',
        message: 'Just me for now, but we might add more team members later.',
        timestamp: '2023-07-10T09:35:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Got it. Will you be recording meetings and storing sensitive data?',
        timestamp: '2023-07-10T09:36:00Z'
      },
      {
        sender: 'Sarah Chen',
        message: 'Yes, we\'ll record some client meetings with their permission.',
        timestamp: '2023-07-10T09:38:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for the information. I\'ve added this to your request form for the security team to review.',
        timestamp: '2023-07-10T09:39:00Z'
      }
    ]
  },
  {
    id: 3,
    appName: "MongoDB Atlas",
    requestor: "James Wilson",
    type: "New Vendor",
    stage: "Vendor Assessment",
    users: "15",
    triage: "high",
    slaStatus: "At Risk",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Cloud Infrastructure Security",
      teamEmail: "cloud-security@company.com",
      contact: "Alex Rivera",
      email: "alex.rivera@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ['Team manages cloud infrastructure security', 'Previous experience with MongoDB deployments']
      },
      contactConfidence: {
        level: 'high',
        reasons: ['Primary reviewer for database security', 'Led previous MongoDB on-prem security reviews']
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "MongoDB Atlas meets our security requirements for cloud databases. Need to verify SCIM integration setup and complete SOC 2 review.",
    supportingDocs: [
      { name: "Database Security Policy #DB-001", link: "https://docs.company.com/security/DB-001" },
      { name: "Cloud Security Framework", link: "https://docs.company.com/security/CSF-100" }
    ],
    requestForm: {
      overview: {
        appName: "MongoDB Atlas",
        reasonForAccess: "Need managed MongoDB service for new microservices architecture"
      },
      financial: {
        cost: 25000,
        existingLicense: false,
        managerApproval: true,
        costCenterApproved: true
      },
      users: {
        numberOfUsers: 15,
        teamRoles: ["DevOps Engineer", "Database Admin", "Developer"]
      },
      resource: {
        accessDuration: "12 months"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["AWS", "GitHub", "DataDog"],
        sso: true,
        scim: false,
        dataIngestion: "API",
        dataType: "Application Data",
        dataClassification: "Confidential"
      },
      documentation: {
        designDocs: [
          { name: "Microservices Architecture", link: "https://docs.company.com/design/microservices" },
          { name: "Database Migration Plan", link: "https://docs.company.com/design/db-migration" }
        ],
        procurementDocs: [
          { name: "MongoDB Atlas Pricing", link: "https://docs.company.com/procurement/mongodb-pricing" }
        ],
        assessmentDocs: [
          { name: "Cloud Database Security Framework", link: "https://kb.company.com/security/cloud-db" },
          { name: "Previous MongoDB Assessment", link: "https://kb.company.com/vendor/mongodb" }
        ],
        toolNeedsDocs: [
          { name: "Engineering Database Requirements", link: "https://docs.company.com/needs/eng-db-reqs" }
        ]
      }
    },
    trustInfo: {
      compliance: [
        { framework: "SOC 2", status: "Compliant", link: "https://www.mongodb.com/cloud/trust", lastUpdated: "2024-01-15" },
        { framework: "ISO 27001", status: "Compliant", link: "https://www.mongodb.com/cloud/trust", lastUpdated: "2024-02-20" }
      ],
      dataRetention: {
        policy: "Cloud Data Retention Policy",
        link: "https://www.mongodb.com/legal/data-retention"
      },
      dataProtection: {
        policy: "Data Protection Policy",
        link: "https://www.mongodb.com/legal/data-protection"
      },
      uptime: {
        percentage: "99.995%",
        link: "https://status.mongodb.com"
      }
    },
    conversation: [
      {
        sender: 'AI Agent',
        message: 'Hello James, I see you\'re requesting MongoDB Atlas. Can you explain why your team needs this service?',
        timestamp: '2023-08-05T14:20:00Z'
      },
      {
        sender: 'James Wilson',
        message: 'We\'re moving to a microservices architecture and need a managed MongoDB service that scales well.',
        timestamp: '2023-08-05T14:23:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for the context. What kind of data will you be storing in MongoDB Atlas?',
        timestamp: '2023-08-05T14:24:00Z'
      },
      {
        sender: 'James Wilson',
        message: 'Application data including user preferences, configuration, and some transactional data.',
        timestamp: '2023-08-05T14:26:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Got it. And how many team members will need access to this service?',
        timestamp: '2023-08-05T14:27:00Z'
      },
      {
        sender: 'James Wilson',
        message: 'About 15 people across DevOps, database administration, and development teams.',
        timestamp: '2023-08-05T14:29:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for the information. I\'ve compiled this into your request form for the security team to review.',
        timestamp: '2023-08-05T14:30:00Z'
      }
    ]
  },
  {
    id: 4,
    appName: "Snowflake",
    requestor: "Rachel Kim",
    type: "New Vendor",
    stage: "New Request",
    users: "30",
    triage: "high",
    slaStatus: "On Track",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Data Security",
      teamEmail: "data-security@company.com",
      contact: "Michael Chang",
      email: "michael.chang@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ['Primary team for data warehouse security', 'Handles all data classification reviews']
      },
      contactConfidence: {
        level: 'medium',
        reasons: ['Recent transfer to data security team', 'Has reviewed similar data platforms']
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Initial review indicates Snowflake meets our security requirements. Need to complete data classification review and verify encryption settings.",
    supportingDocs: [
      { name: "Data Warehouse Security Standard", link: "https://docs.company.com/security/DW-100" },
      { name: "Data Classification Policy", link: "https://docs.company.com/security/DC-200" }
    ],
    requestForm: {
      overview: {
        appName: "Snowflake",
        reasonForAccess: "Enterprise data warehouse for analytics and reporting"
      },
      financial: {
        cost: 75000,
        existingLicense: false,
        managerApproval: true,
        costCenterApproved: false
      },
      users: {
        numberOfUsers: 30,
        teamRoles: ["Data Analyst", "Data Engineer", "Data Scientist"]
      },
      resource: {
        accessDuration: "12 months"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["Tableau", "Looker", "dbt"],
        sso: true,
        scim: true,
        dataIngestion: "API",
        dataType: "Enterprise Data",
        dataClassification: "Confidential"
      },
      documentation: {
        designDocs: [
          { name: "Data Warehouse Architecture", link: "https://docs.company.com/design/data-warehouse" },
          { name: "Analytics Platform Design", link: "https://docs.company.com/design/analytics-platform" }
        ],
        procurementDocs: [
          { name: "Snowflake Enterprise Agreement", link: "https://docs.company.com/procurement/snowflake-ea" },
          { name: "Data Warehouse Cost Analysis", link: "https://docs.company.com/procurement/dw-cost-analysis" }
        ],
        assessmentDocs: [
          { name: "Snowflake Security Assessment", link: "https://kb.company.com/vendor/snowflake" },
          { name: "Data Warehouse Security Guidelines", link: "https://kb.company.com/security/data-warehouse" }
        ],
        toolNeedsDocs: [
          { name: "Analytics Team Requirements", link: "https://docs.company.com/needs/analytics-reqs" }
        ]
      }
    },
    trustInfo: {
      compliance: [
        { framework: "SOC 2", status: "Compliant", link: "https://www.snowflake.com/trust-center/", lastUpdated: "2024-03-01" },
        { framework: "ISO 27001", status: "Compliant", link: "https://www.snowflake.com/trust-center/", lastUpdated: "2024-02-15" },
        { framework: "HIPAA", status: "Compliant", link: "https://www.snowflake.com/trust-center/", lastUpdated: "2024-01-20" }
      ],
      dataRetention: {
        policy: "Data Retention Policy",
        link: "https://www.snowflake.com/legal/data-retention"
      },
      dataProtection: {
        policy: "Data Protection",
        link: "https://www.snowflake.com/legal/data-protection"
      },
      uptime: {
        percentage: "99.99%",
        link: "https://status.snowflake.com"
      }
    },
    conversation: [
      {
        sender: 'AI Agent',
        message: 'Hi Rachel, I see you\'re requesting access to Snowflake. Could you explain why your team needs this data warehouse solution?',
        timestamp: '2023-09-12T10:15:00Z'
      },
      {
        sender: 'Rachel Kim',
        message: 'We need a cloud data warehouse for our analytics and reporting. Our current solution doesn\'t scale well with our growing data needs.',
        timestamp: '2023-09-12T10:18:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for the context. What kind of data will you be storing in Snowflake?',
        timestamp: '2023-09-12T10:19:00Z'
      },
      {
        sender: 'Rachel Kim',
        message: 'Mostly business analytics data, some customer data for reporting, and financial metrics.',
        timestamp: '2023-09-12T10:21:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Got it. And approximately how many users will need access to Snowflake?',
        timestamp: '2023-09-12T10:22:00Z'
      },
      {
        sender: 'Rachel Kim',
        message: 'About 30 people across data science, analytics, and business intelligence teams.',
        timestamp: '2023-09-12T10:24:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Will you need to integrate Snowflake with any other systems or tools?',
        timestamp: '2023-09-12T10:25:00Z'
      },
      {
        sender: 'Rachel Kim',
        message: 'Yes, we\'ll need to integrate with our BI tools like Tableau and our ETL pipelines.',
        timestamp: '2023-09-12T10:27:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for all this information. I\'ve compiled it into your request form for the security team to review.',
        timestamp: '2023-09-12T10:28:00Z'
      }
    ]
  },
  {
    id: 5,
    appName: "DocuSign",
    requestor: "Tom Baker",
    type: "New Vendor",
    stage: "Requestor Followup",
    users: "100",
    triage: "medium",
    slaStatus: "On Track",
    dueDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Legal Operations Security",
      teamEmail: "legal-security@company.com",
      contact: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ['Manages all legal tool security reviews', 'Previous experience with e-signature platforms']
      },
      contactConfidence: {
        level: 'high',
        reasons: ['Primary contact for legal technology security', 'Led previous e-signature vendor assessments']
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "DocuSign meets legal and security requirements. Need clarification on retention policies and API integration plans.",
    supportingDocs: [
      { name: "E-Signature Security Policy", link: "https://docs.company.com/security/ES-001" },
      { name: "Legal Tools Security Standard", link: "https://docs.company.com/security/LT-100" }
    ],
    requestForm: {
      overview: {
        appName: "DocuSign",
        reasonForAccess: "Enterprise e-signature platform for legal and HR documents"
      },
      financial: {
        cost: 45000,
        existingLicense: false,
        managerApproval: true,
        costCenterApproved: true
      },
      users: {
        numberOfUsers: 100,
        teamRoles: ["Legal Team", "HR Team", "Sales Team", "Procurement"]
      },
      resource: {
        accessDuration: "12 months"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["Salesforce", "Microsoft Teams"],
        sso: true,
        scim: true,
        dataIngestion: "API",
        dataType: "Legal Documents",
        dataClassification: "Confidential"
      },
      documentation: {
        designDocs: [
          { name: "E-Signature Workflow Design", link: "https://docs.company.com/design/e-signature-workflow" }
        ],
        procurementDocs: [
          { name: "DocuSign Contract", link: "https://docs.company.com/procurement/docusign-contract" },
          { name: "Legal Tools Budget", link: "https://docs.company.com/procurement/legal-tools-budget" }
        ],
        assessmentDocs: [
          { name: "E-Signature Security Guidelines", link: "https://kb.company.com/security/e-signature" },
          { name: "DocuSign Prior Assessment", link: "https://kb.company.com/vendor/docusign" }
        ],
        toolNeedsDocs: [
          { name: "Legal Department Requirements", link: "https://docs.company.com/needs/legal-tools" },
          { name: "HR Document Processing Requirements", link: "https://docs.company.com/needs/hr-docs" }
        ]
      }
    },
    trustInfo: {
      compliance: [
        { framework: "SOC 2", status: "Compliant", link: "https://www.docusign.com/trust", lastUpdated: "2024-02-28" },
        { framework: "ISO 27001", status: "Compliant", link: "https://www.docusign.com/trust", lastUpdated: "2024-01-15" }
      ],
      dataRetention: {
        policy: "Document Retention Policy",
        link: "https://www.docusign.com/legal/retention"
      },
      dataProtection: {
        policy: "Security and Privacy",
        link: "https://www.docusign.com/legal/security"
      },
      uptime: {
        percentage: "99.99%",
        link: "https://status.docusign.com"
      }
    },
    conversation: [
      {
        sender: 'AI Agent',
        message: 'Hello Michael, I see you\'re requesting DocuSign. Can you tell me why your team needs this e-signature solution?',
        timestamp: '2023-10-05T13:40:00Z'
      },
      {
        sender: 'Michael Johnson',
        message: 'Our legal team needs a secure e-signature platform for contracts and agreements. We\'re trying to go paperless.',
        timestamp: '2023-10-05T13:43:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for the context. What types of documents will you be processing through DocuSign?',
        timestamp: '2023-10-05T13:44:00Z'
      },
      {
        sender: 'Michael Johnson',
        message: 'Primarily legal contracts, NDAs, employment agreements, and some vendor agreements.',
        timestamp: '2023-10-05T13:46:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Got it. And approximately how many users will need access to DocuSign?',
        timestamp: '2023-10-05T13:47:00Z'
      },
      {
        sender: 'Michael Johnson',
        message: 'About 20 people, mostly from legal and HR departments.',
        timestamp: '2023-10-05T13:49:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Will you need to integrate DocuSign with any other systems like Salesforce or your document management system?',
        timestamp: '2023-10-05T13:50:00Z'
      },
      {
        sender: 'Michael Johnson',
        message: 'Yes, we\'ll need to integrate with our SharePoint and potentially with Salesforce later.',
        timestamp: '2023-10-05T13:52:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for all this information. I\'ve added it to your request form for the security team to review.',
        timestamp: '2023-10-05T13:53:00Z'
      }
    ]
  },
  {
    id: 6,
    appName: "Notion",
    requestor: "Priya Patel",
    type: "New Vendor",
    stage: "New Request",
    users: "250",
    triage: "medium",
    slaStatus: "On Track",
    dueDate: new Date(Date.now() + (6 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Collaboration Tools Security",
      teamEmail: "collab-security@company.com",
      contact: "David Lee",
      email: "david.lee@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: ['Handles collaboration tool security', 'New team structure in progress']
      },
      contactConfidence: {
        level: 'high',
        reasons: ['Primary reviewer for collaboration platforms', 'Experience with similar tools']
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Initial assessment shows Notion meets basic requirements. Need to review data export capabilities and retention policies.",
    supportingDocs: [
      { name: "Collaboration Tools Security Standard", link: "https://docs.company.com/security/CT-001" },
      { name: "Data Sharing Policy", link: "https://docs.company.com/security/DS-100" }
    ],
    requestForm: {
      overview: {
        appName: "Notion",
        reasonForAccess: "Team collaboration and documentation platform"
      },
      financial: {
        cost: 30000,
        existingLicense: false,
        managerApproval: true,
        costCenterApproved: false
      },
      users: {
        numberOfUsers: 250,
        teamRoles: ["Product", "Engineering", "Design", "Marketing"]
      },
      resource: {
        accessDuration: "12 months"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["Slack", "Google Drive", "Jira"],
        sso: true,
        scim: true,
        dataIngestion: "Manual",
        dataType: "Internal Documentation",
        dataClassification: "Internal"
      },
      documentation: {
        designDocs: [
          { name: "Collaboration Platform Architecture", link: "https://docs.company.com/design/collab-platform" },
          { name: "Knowledge Management Strategy", link: "https://docs.company.com/design/km-strategy" }
        ],
        procurementDocs: [
          { name: "Notion Enterprise Pricing", link: "https://docs.company.com/procurement/notion-pricing" }
        ],
        assessmentDocs: [
          { name: "Collaboration Tools Security Framework", link: "https://kb.company.com/security/collab-tools" }
        ],
        toolNeedsDocs: [
          { name: "Product Team Documentation Requirements", link: "https://docs.company.com/needs/product-docs" },
          { name: "Cross-functional Collaboration Requirements", link: "https://docs.company.com/needs/cross-func-collab" }
        ]
      }
    },
    trustInfo: {
      compliance: [
        { framework: "SOC 2", status: "Compliant", link: "https://www.notion.so/security", lastUpdated: "2024-02-10" },
        { framework: "ISO 27001", status: "In Progress", link: "https://www.notion.so/security", lastUpdated: "2024-03-01" }
      ],
      dataRetention: {
        policy: "Data Retention Guidelines",
        link: "https://www.notion.so/privacy"
      },
      dataProtection: {
        policy: "Security Practices",
        link: "https://www.notion.so/security"
      },
      uptime: {
        percentage: "99.9%",
        link: "https://status.notion.so"
      }
    },
    conversation: [
      {
        sender: 'AI Agent',
        message: 'Hi Emily, I see you\'re requesting access to Notion. Could you explain why your team needs this tool?',
        timestamp: '2023-11-18T09:10:00Z'
      },
      {
        sender: 'Emily Rodriguez',
        message: 'We need a better collaboration and documentation platform for our product team. Our current tools are fragmented.',
        timestamp: '2023-11-18T09:13:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for the context. What kind of information will you be storing in Notion?',
        timestamp: '2023-11-18T09:14:00Z'
      },
      {
        sender: 'Emily Rodriguez',
        message: 'Product roadmaps, project documentation, meeting notes, and some internal process documentation.',
        timestamp: '2023-11-18T09:16:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Got it. And approximately how many users will need access to Notion?',
        timestamp: '2023-11-18T09:17:00Z'
      },
      {
        sender: 'Emily Rodriguez',
        message: 'About 40 people across product management, design, and engineering teams.',
        timestamp: '2023-11-18T09:19:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Will you need to integrate Notion with any other tools your team uses?',
        timestamp: '2023-11-18T09:20:00Z'
      },
      {
        sender: 'Emily Rodriguez',
        message: 'Yes, we\'d like to integrate with Slack, Jira, and Figma if possible.',
        timestamp: '2023-11-18T09:22:00Z'
      },
      {
        sender: 'AI Agent',
        message: 'Thanks for all this information. I\'ve compiled it into your request form for the security team to review.',
        timestamp: '2023-11-18T09:23:00Z'
      }
    ]
  }
];

export const VendorCompletedRequests: VendorCompletedRequest[] = [
  {
    id: 1,
    appName: "Salesforce",
    requestor: "John Doe",
    type: "New Vendor",
    stage: "Vendor Assessment",
    users: "25",
    triage: "high",
    slaStatus: "At Risk",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Manager of prior policy owner`, `Has answered similar questions on previous tickets`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Based on initial assessment, Salesforce meets our security requirements but requires additional vendor assessment...",
    supportingDocs: [
      { name: "Security Policy #AUTH-001", link: "https://docs.company.com/security/AUTH-001" },
      { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
    ],
    requestForm: {
      overview: {
        appName: "Salesforce",
        reasonForAccess: "Need CRM solution for sales team"
      },
      financial: {
        cost: 15000,
        existingLicense: false,
        managerApproval: true,
        costCenterApproved: true
      },
      users: {
        numberOfUsers: 25,
        teamRoles: ["Sales Rep", "Sales Manager", "Admin"]
      },
      resource: {
        accessDuration: "12 months"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["Slack", "Gmail", "Calendar"],
        sso: true,
        scim: true,
        dataIngestion: "API",
        dataType: "Customer Data",
        dataClassification: "Confidential"
      },
      documentation: {
        designDocs: [
          { name: "Salesforce Implementation Design", link: "https://docs.company.com/design/salesforce-impl" }
        ],
        procurementDocs: [
          { name: "Salesforce Contract", link: "https://docs.company.com/procurement/sf-contract" }
        ],
        assessmentDocs: [
          { name: "Previous Salesforce Assessment", link: "https://kb.company.com/vendor/salesforce" }
        ],
        toolNeedsDocs: [
          { name: "Sales Team Requirements", link: "https://docs.company.com/needs/sales-crm" }
        ]
      }
    },
    trustInfo: {
      compliance: [],
      dataRetention: {
        policy: "",
        link: ""
      },
      dataProtection: {
        policy: "",
        link: ""
      },
      uptime: {
        percentage: "",
        link: ""
      }
    }, 
    residualRisk: 'Low'
  },
  {
    id: 2,
    appName: "Zoom",
    requestor: "Sarah Chen",
    type: "New User",
    stage: "New Request",
    users: "125",
    triage: "medium",
    slaStatus: "On Track",
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Infrastructure Security Team",
      teamEmail: "infrasec@company.com",
      contact: "Chris Martinez",
      email: "chris.martinez@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Team handles collaboration tools`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Primary contact for video conferencing tools`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Zoom is an approved vendor. New user request can be processed after cost center approval...",
    supportingDocs: [
      { name: "Zoom Security Review", link: "https://docs.company.com/security/zoom-review" }
    ],
    requestForm: {
      overview: {
        appName: "Zoom",
        reasonForAccess: "Need video conferencing for client meetings"
      },
      financial: {
        cost: 200,
        existingLicense: true,
        managerApproval: true,
        costCenterApproved: false
      },
      users: {
        numberOfUsers: 1,
        teamRoles: ["Account Manager"]
      },
      resource: {
        accessDuration: "Indefinite"
      },
      security: {
        loginMethod: "SSO",
        integrations: ["Calendar"],
        sso: true,
        scim: false,
        dataIngestion: "Manual",
        dataType: "Meeting Recordings",
        dataClassification: "Internal"
      },
      documentation: {
        designDocs: [
          { name: "Zoom Integration Design", link: "https://docs.company.com/design/zoom-integration" }
        ],
        procurementDocs: [
          { name: "Zoom Enterprise Agreement", link: "https://docs.company.com/procurement/zoom-ea" }
        ],
        assessmentDocs: [
          { name: "Video Conferencing Security Guidelines", link: "https://kb.company.com/security/video-conf" }
        ],
        toolNeedsDocs: [
          { name: "Remote Meeting Requirements", link: "https://docs.company.com/needs/remote-meetings" }
        ]
      }
    },
    trustInfo: {
      compliance: [],
      dataRetention: {
        policy: "",
        link: ""
      },
      dataProtection: {
        policy: "",
        link: ""
      },
      uptime: {
        percentage: "",
        link: ""
      }
    }, 
    residualRisk: 'Low'
  }
];