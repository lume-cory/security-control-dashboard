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
      }
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
      }
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
      }
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
      }
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
      }
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
      }
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
  