export interface LackOfDocumentation {
  id: number;
  question: string;
  suggestedUpdate: string;
  status: 'pending' | 'accepted' | 'modified' | 'rejected';
  modifiedContent: string;
  prbStatus?: 'Pending' | 'Approved' | 'Rejected';
}

export interface ConflictingRequirement {
  id: number;
  requirement: string;
  baselineControl: {
    name: string;
    content: string;
  };
  otherControlGroups: {
    name: string;
    content: string;
  }[];
  status: 'pending' | 'accepted' | 'modified' | 'rejected';
  suggestedModification: string;
  modifiedContent: string;
  prbStatus?: 'Pending' | 'Approved' | 'Rejected';
}

export interface BestPracticeImprovement {
  id: number;
  currentPractice: string;
  suggestedImprovement: string;
  framework: string;
  status: 'pending' | 'accepted' | 'modified' | 'rejected';
  modifiedContent: string;
  prbStatus?: 'Pending' | 'Approved' | 'Rejected';
}

export interface OutdatedDoc {
  id: number;
  name: string;
  lastUpdated: string;
  replacementDoc: string;
  suggestedHeaderText: string;
  status: 'pending' | 'accepted' | 'modified' | 'rejected';
  note: string;
  modifiedContent: string;
  url: string;
  prbStatus?: 'Pending' | 'Approved' | 'Rejected';
}

export const lackOfDocumentation: LackOfDocumentation[] = [
  {
    id: 1,
    question: "How do I request access to production systems for an emergency fix?",
    suggestedUpdate: "Create an Emergency Access Procedure document covering: approval process, temporary access duration, audit logging requirements, and post-incident documentation requirements.",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 2,
    question: "What's the process for reporting a potential insider threat?",
    suggestedUpdate: "Develop an Insider Threat Reporting Guide that outlines: confidential reporting channels, required information, investigation process, and protection for whistleblowers.",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 3,
    question: "How do we handle security for BYOD devices?",
    suggestedUpdate: "Create a BYOD Security Policy covering: required security controls, approved apps/services, data handling requirements, and remote wipe procedures.",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 4,
    question: "What's the process for conducting security reviews of new vendors?",
    suggestedUpdate: "Develop a Vendor Security Assessment Guide including: assessment questionnaire, required security controls, compliance requirements, and approval workflow.",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 5,
    question: "How do we handle security incidents during non-business hours?",
    suggestedUpdate: "Create an After-Hours Security Incident Response document covering: on-call procedures, escalation paths, emergency contacts, and severity classification guidelines.",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 6,
    question: "What are the requirements for storing customer PII data?",
    suggestedUpdate: "Develop a PII Handling Guide covering: approved storage locations, encryption requirements, access controls, retention periods, and deletion procedures.",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
  }
]

export const conflictingRequirements: ConflictingRequirement[] = [
  {
    id: 1,
    requirement: "Password complexity",
    baselineControl: {
      name: "User Authentication Policy",
      content: "Passwords must be at least 8 characters long."
    },
    otherControlGroups: [
      {
        name: "High Risk Users",
        content: "Passwords must be at least 12 characters long."
      }
    ],
    status: 'pending',
    suggestedModification: "Update all password requirements to enforce a minimum of 12 characters...",
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 2,
    requirement: "Multi-Factor Authentication Reset",
    baselineControl: {
      name: "User Authentication Policy",
      content: "Help desk can reset MFA after verifying employee ID and manager approval."
    },
    otherControlGroups: [
      {
        name: "Finance Team",
        content: "MFA reset requires in-person verification with photo ID."
      }
    ],
    status: 'pending',
    suggestedModification: "Update procedures to require video call verification for remote employees, in-person verification for office employees, and manager approval in all cases. Emergency procedures should require CISO team approval.",
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 3,
    requirement: "Software Installation Rights",
    baselineControl: {
      name: "Endpoint Security Policy",
      content: "Users must not have local admin rights on company devices."
    },
    otherControlGroups: [
      {
        name: "Development Team",
        content: "Development team members require local admin access for tools and testing."
      }
    ],
    status: 'pending',
    suggestedModification: "Implement privileged access management system for temporary elevated rights. Standard users have no admin rights, developers can request time-limited admin access with automatic revocation.",
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 4,
    requirement: "Remote Access VPN",
    baselineControl: {
      name: "Remote Work Policy",
      content: "VPN must be active whenever accessing company resources."
    },
    otherControlGroups: [
      {
        name: "Cloud Services Team",
        content: "Cloud applications should be accessed directly through SSO without VPN."
      }
    ],
    status: 'pending',
    suggestedModification: "Update policies to clarify: VPN required for accessing internal network resources, SSO-enabled cloud apps can be accessed directly. Add network segmentation requirements and conditional access policies based on risk level.",
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 5,
    requirement: "Guest Network Access",
    baselineControl: {
      name: "Visitor NetworkAccess Policy",
      content: "Guests must register with reception for wifi access."
    },
    otherControlGroups: [
      {
        name: "Undefined",
        content: "Guest wifi password changes monthly and is posted in meeting rooms."
      }
    ],
    status: 'pending',
    suggestedModification: "Implement unified guest access system: Visitors register through reception portal, receive time-limited access codes via SMS, and must agree to acceptable use policy. Remove all posted wifi passwords.",
    modifiedContent: '',
    prbStatus: undefined
  },
  {
    id: 6,
    requirement: "Mobile Device Enrollment",
    baselineControl: {
      name: "Mobile Endpoint Security Policy",
      content: "Personal devices must be enrolled in MDM to access email."
    },
    otherControlGroups: [
      {
        name: "Contractor Group",
        content: "Mobile email access available through web portal without enrollment."
      }
    ],
    status: 'pending',
    suggestedModification: "Update all documentation to reflect: MDM enrollment required for native email apps, web-only access permitted without enrollment but with enhanced MFA requirements. Add risk warnings for web-only access.",
    modifiedContent: '',
    prbStatus: undefined
  }
]

export const bestPracticeImprovements: BestPracticeImprovement[] = [
    {
    id: 1,
    currentPractice: "Password resets require phone call to help desk",
    suggestedImprovement: "Implement self-service password reset portal with MFA verification, automated identity verification, and audit logging. Help desk should only handle exceptional cases.",
    framework: "NIST Digital Identity Guidelines",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
    },
    {
    id: 2,
    currentPractice: "Manual ticket creation for security incidents",
    suggestedImprovement: "Deploy automated incident ticket creation from email reports, phishing button alerts, and security tools. Include severity classification, required fields, and automatic routing based on incident type.",
    framework: "ITIL Service Management",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
    },
    {
    id: 3,
    currentPractice: "Access requests handled through email",
    suggestedImprovement: "Implement identity governance platform with self-service access requests, automated approvals for standard access, and integration with HR systems for role-based access control.",
    framework: "ISO 27001",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
    },
    {
    id: 4,
    currentPractice: "Federated search knowledge base for security FAQs",
    suggestedImprovement: "Develop interactive security knowledge base with guided troubleshooting, video tutorials, and AI-powered search. Include feedback mechanism and automatic updates based on new incidents.",
    framework: "HDI Support Center Certification",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
    },
    {
    id: 5,
    currentPractice: "Manual software approval process",
    suggestedImprovement: "Create automated software request portal with pre-approved software catalog, security scanning integration, and automated deployment through endpoint management system.",
    framework: "CIS Controls",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
    },
    {
    id: 6,
    currentPractice: "Basic security incident templates",
    suggestedImprovement: "Implement dynamic incident response playbooks with automated data collection, guided resolution steps, and integration with security tools for rapid response.",
    framework: "SANS Incident Handler's Handbook",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
    }, 
    {
    id: 1,
    currentPractice: "Annual penetration testing",
    suggestedImprovement: "Implement continuous penetration testing using automated tools, supplemented by quarterly manual penetration tests.",
    framework: "NIST Cybersecurity Framework",
    status: 'pending',
    modifiedContent: '',
    prbStatus: undefined
    }
]

export const outdatedDocs: OutdatedDoc[] = [
    {
    id: 1,
    name: "Password Reset Procedures",
    lastUpdated: "2021-05-15",
    replacementDoc: "Self-Service Identity Management Guide",
    suggestedHeaderText: "NOTICE: This document is outdated...",
    note: "",
    status: 'pending',
    modifiedContent: '',
    url: '#',
    prbStatus: undefined
    },
    {
    id: 2,
    name: "Remote Access Troubleshooting Guide",
    lastUpdated: "2020-11-30",
    replacementDoc: "Hybrid Workforce Access Guide 2024",
    suggestedHeaderText: "WARNING: This guide predates our current remote access infrastructure. For current VPN, SSO, and conditional access troubleshooting, consult the 'Hybrid Workforce Access Guide 2024'.",
    note: "",
    status: 'pending',
    modifiedContent: '',
    url: '#',
    prbStatus: undefined
    },
    {
    id: 3,
    name: "Mobile Device Support Guide v1",
    lastUpdated: "2019-03-20",
    replacementDoc: "Enterprise Mobility Management Handbook",
    suggestedHeaderText: "DEPRECATED: This document doesn't reflect current MDM policies and BYOD procedures. Please refer to the 'Enterprise Mobility Management Handbook' for current mobile device support.",
    note: "",
    status: 'pending',
    modifiedContent: '',
    url: '#',
    prbStatus: undefined
    },
    {
    id: 4,
    name: "Security Incident Response Procedures",
    lastUpdated: "2022-08-10",
    replacementDoc: "Security Operations Playbook 2024",
    suggestedHeaderText: "OUTDATED: This document doesn't include current incident classification and automated response procedures. Please use the 'Security Operations Playbook 2024' for updated guidance.",
    note: "",
    status: 'pending',
    modifiedContent: '',
    url: '#',
    prbStatus: undefined
    },
    {
    id: 5,
    name: "Help Desk Security Escalation Guide",
    lastUpdated: "2022-01-15",
    replacementDoc: "Security Incident Triage Framework",
    suggestedHeaderText: "NOTICE: This escalation guide is outdated. For current security incident classification and escalation procedures, please refer to the 'Security Incident Triage Framework'.",
    note: "",
    status: 'pending',
    modifiedContent: '',
    url: '#',
    prbStatus: undefined
    }
]
