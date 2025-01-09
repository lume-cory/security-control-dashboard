'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/subframe/components/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, MessageSquare, Mail, Ticket, Phone, Fish, ArrowUpDown, CheckIcon, XIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion } from "@/subframe/components/Accordion";


interface RequestForm {
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

interface VendorTrustInfo {
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

interface VendorRequest {
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

interface VendorCompletedRequest {
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

interface PolicyOwner {
  team: string;
  teamEmail: string;
  teamConfidence: Confidence;
  contact: string;
  email: string;
  contactConfidence: Confidence;
  signOffStatus?: 'Yes' | 'No' | 'Pending' | 'N/A';
}

interface Confidence {
  level: 'high' | 'medium' | 'low';
  reasons: string[];
}

const VendorRequests: VendorRequest[] = [
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

const VendorCompletedRequests: VendorCompletedRequest[] = [
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

interface ConfirmedAssociations {
  [questionId: number]: {
    [docName: string]: boolean;
  };
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export function QuestionsTable() {
  const [showResolved, setShowResolved] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<VendorRequest | VendorCompletedRequest | null>(null)
  const [response, setResponse] = useState('')
  const [confirmedAssociations, setConfirmedAssociations] = useState<ConfirmedAssociations>({})
  const [selectedTriage, setSelectedTriage] = useState<string>('')
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [isTeamExpanded, setIsTeamExpanded] = useState(false)
  const [isContactExpanded, setIsContactExpanded] = useState(false)

  const requests = showResolved ? VendorCompletedRequests : VendorRequests

  const handleUseResponse = () => {
    if (selectedRequest && 'suggestedResponse' in selectedRequest) {
      setResponse(selectedRequest.suggestedResponse)
    }
  }

  const handleModifyResponse = () => {
    if (selectedRequest && 'suggestedResponse' in selectedRequest) {
      setResponse(selectedRequest.suggestedResponse)
    }
  }

  const handleConfirmAssociation = (questionId: number, docName: string, isAssociated: boolean) => {
    setConfirmedAssociations(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [docName]: isAssociated
      }
    }))
    // Here you would typically send this information back to your AI model or backend
    console.log(`Document "${docName}" is ${isAssociated ? '' : 'not '}associated with question ${questionId}`)
  }

  const getSLAStatus = (request: VendorRequest) => {
    const due = new Date(request.dueDate)
    const now = new Date()
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    const slaHours = {
      urgent: 72,
      high: 150,
      medium: 300,
      low: 720
    }
    
    const triage = request.triage || 'medium'
    const targetHours = slaHours[triage as keyof typeof slaHours]
    
    return {
      hours: targetHours,
      onTrack: diffHours > 0,
      remaining: Math.abs(Math.round(diffHours))
    }
  }

  const sortRequests = (requests: (VendorRequest | VendorCompletedRequest)[]): (VendorRequest | VendorCompletedRequest)[] => {
    if (!sortConfig) return requests

    return [...requests].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a]
      const bValue = b[sortConfig.key as keyof typeof b]

      if (aValue === bValue) return 0
      
      if (sortConfig.direction === 'asc') {
        return (aValue ?? '') < (bValue ?? '') ? -1 : 1
      } else {
        return (aValue ?? '') > (bValue ?? '') ? -1 : 1
      }
    })
  }

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }

  const filterRequests = (requests: (VendorRequest | VendorCompletedRequest)[]) => {
    if (!selectedTriage) return requests
    return requests.filter(q => q.triage === selectedTriage)
  }

  const filteredRequests = filterRequests(requests)
  const sortedRequests = sortRequests(filteredRequests)

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Security Help Desk Questions</h2>
        < div className="flex grow shrink-0 basis-0 items-center justify-end gap-2" >
              <Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "brand-secondary" : "neutral-secondary"}
                icon={!showResolved ? "FeatherCheck" : undefined}
                onClick={() => setShowResolved(false)}
              >
                Oustanding
              </Button>
              < Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "neutral-secondary" : "brand-secondary"}
                icon={!showResolved ? undefined : "FeatherCheck"}
                onClick={() => setShowResolved(true)}
              >
                Resolved
              </Button>
            </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('appName')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Vendor</span>
                {sortConfig?.key === 'appName' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('requestor')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Requestor</span>
                {sortConfig?.key === 'requestor' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('type')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Type</span>
                {sortConfig?.key === 'type' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('stage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Stage</span>
                {sortConfig?.key === 'stage' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('triage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Triage</span>
                {sortConfig?.key === 'triage' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            {!showResolved && (
              <TableHead onClick={() => handleSort('dueDate')} className="cursor-pointer hover:bg-muted">
                <div className="flex items-center space-x-1">
                  <span>SLA Status</span>
                  {sortConfig?.key === 'triage' && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
            )}
            <TableHead 
              onClick={() => handleSort(showResolved ? 'resolvedDate' : 'dueDate')} 
              className="cursor-pointer hover:bg-muted"
            >
              <div className="flex items-center space-x-1">
                <span>{showResolved ? 'Resolved Date' : 'Due By'}</span>
                {sortConfig?.key === (showResolved ? 'resolvedDate' : 'dueDate') && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedRequests.map((request) => (
            <TableRow key={request.id} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedRequest(request)}>
              <TableCell>{request.appName}</TableCell>
              <TableCell>{request.requestor}</TableCell>
              <TableCell>{request.type}</TableCell>
              <TableCell>{request.stage}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  request.triage === 'urgent' ? 'bg-red-100 text-red-800' :
                  request.triage === 'high' ? 'bg-orange-100 text-orange-800' :
                  request.triage === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {request.triage || 'medium'}
                </span>
              </TableCell>
              {!showResolved && 'dueDate' in request && (
                <TableCell>
                  {(() => {
                    const status = getSLAStatus(request)
                    return (
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${status.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                          {status.onTrack ? '✓' : '⚠'}
                        </span>
                        <span className="text-sm text-gray-600">
                          {status.onTrack ? 
                            `${status.remaining}hrs left` : 
                            `${status.remaining}hrs over`
                          }
                        </span>
                      </div>
                    )
                  })()}
                </TableCell>
              )}
              <TableCell>
                {String('resolvedDate' in request ? request.resolvedDate : request.dueDate)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedRequest && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedRequest.appName}</DialogTitle>
              <DialogDescription>Review and respond this request to use this vendor</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold self-start pt-1">Requested by:</Label>
                <span className="col-span-3">{selectedRequest.requestor}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold self-start pt-1">Stage:</Label>
                <div className="col-span-3">
                  <Select 
                    value={selectedRequest.stage} 
                    onValueChange={(value: "New Request" | "Requestor Followup" | "Vendor Assessment" | "Pending" | "Approved" | "Denied") => 
                      setSelectedRequest(prev => prev ? {...prev, stage: value} : prev)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New Request">New Request</SelectItem>
                      <SelectItem value="Requestor Followup">Requestor Followup</SelectItem>
                      <SelectItem value="Vendor Assessment">Vendor Assessment</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Approved">Approved</SelectItem>
                      <SelectItem value="Denied">Denied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold self-start pt-1">Type:</Label>
                <div className="col-span-3">
                  <Select 
                    value={selectedRequest.type} 
                    onValueChange={(value: 'New Vendor' | 'New User' | 'Renewal') => 
                      setSelectedRequest(prev => prev ? {...prev, type: value} : prev)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New Vendor">New Vendor</SelectItem>
                      <SelectItem value="New User">New User</SelectItem>
                      <SelectItem value="Renewal">Renewal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold self-start pt-1">Users:</Label>
                <a href="#" className="col-span-3 text-blue-500 hover:underline" onClick={() => alert(selectedRequest.users)}>{selectedRequest.users} users</a>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold self-start pt-1">{showResolved ? 'Resolved on:' : 'Due by:'}</Label>
                <span className="col-span-3">
                  {showResolved ? 
                    ('resolvedDate' in selectedRequest ? String(selectedRequest.resolvedDate) : '') : 
                    ('dueDate' in selectedRequest ? String(selectedRequest.dueDate) : '')}
                </span>
              </div>
              {!showResolved && (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-semibold self-start pt-1">Triage Level:</Label>
                    <div className="col-span-3">
                      <Select 
                        value={selectedTriage || (selectedRequest?.triage || 'medium')} 
                        onValueChange={setSelectedTriage}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select triage level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  {!showResolved && 'dueDate' in selectedRequest && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold self-start pt-1">SLA Status:</Label>
                      <div className="col-span-3">
                        {(() => {
                          const status = getSLAStatus(selectedRequest)
                          return (
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${status.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                                {status.onTrack ? '✓ On Track' : '⚠ SLA Missed'}
                              </span>
                              <span className="text-gray-600">
                                ({status.hours}hr SLA, {status.onTrack ? `${status.remaining}hrs remaining` : `${status.remaining}hrs overdue`})
                              </span>
                            </div>
                          )
                        })()}
                      </div>
                    </div>
                  )}
                  <hr className="border-t border-gray-200 my-4" />
                  <div className="pt-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold self-start pt-1">Request Form:</Label>
                      <div className="col-span-3">
                        <div className="space-y-4">
                          <div>
                            <strong>Overview:</strong>
                            <p>{selectedRequest.requestForm.overview.appName} - {selectedRequest.requestForm.overview.reasonForAccess}</p>
                          </div>
                          <div>
                            <strong>Financial:</strong>
                            <p>Cost: ${selectedRequest.requestForm.financial.cost}</p>
                            <p>Existing License: {selectedRequest.requestForm.financial.existingLicense ? 'Yes' : 'No'}</p>
                            <p>Manager Approval: {selectedRequest.requestForm.financial.managerApproval ? 'Yes' : 'No'}</p>
                            <p>Cost Center Approved: {selectedRequest.requestForm.financial.costCenterApproved ? 'Yes' : 'No'}</p>
                          </div>
                          <div>
                            <strong>Users:</strong>
                            <p>Number of Users: {selectedRequest.requestForm.users.numberOfUsers}</p>
                            <p>Team Roles: {selectedRequest.requestForm.users.teamRoles.join(', ')}</p>
                          </div>
                          <div>
                            <strong>Resource:</strong>
                            <p>Access Duration: {selectedRequest.requestForm.resource.accessDuration}</p>
                          </div>
                          <div>
                            <strong>Security:</strong>
                            <p>Login Method: {selectedRequest.requestForm.security.loginMethod}</p>
                            <p>Integrations: {selectedRequest.requestForm.security.integrations.join(', ')}</p>
                            <p>SSO: {selectedRequest.requestForm.security.sso ? 'Yes' : 'No'}</p>
                            <p>SCIM: {selectedRequest.requestForm.security.scim ? 'Yes' : 'No'}</p>
                            <p>Data Ingestion: {selectedRequest.requestForm.security.dataIngestion}</p>
                            <p>Data Type: {selectedRequest.requestForm.security.dataType}</p>
                            <p>Data Classification: {selectedRequest.requestForm.security.dataClassification}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4 mt-4">
                      <Label className="text-right font-semibold self-start pt-1">Follow-up Questions:</Label>
                      <div className="col-span-3">
                        <Textarea
                          placeholder="Ask follow-up questions or request more information..."
                          className="w-full"
                        />
                        <Button type="submit" variant="brand-secondary" className="mt-2">Submit</Button>
                      </div>
                    </div>
                  </div>
                  
                  <hr className="border-t border-gray-200 my-4" />
                  <div className="pt-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold self-start pt-1">Vendor Trust Info:</Label>
                      <div className="col-span-3 space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Compliance Frameworks</h4>
                          {selectedRequest.trustInfo.compliance.map((framework, idx) => (
                            <div key={idx} className="mb-2">
                              <a href={framework.link} target="_blank" rel="noopener noreferrer" 
                                 className="text-blue-600 hover:underline flex items-center">
                                {framework.framework} - {framework.status}
                                <ExternalLink className="h-4 w-4 ml-1" />
                              </a>
                              <span className="text-sm text-gray-500">Last updated: {framework.lastUpdated}</span>
                            </div>
                          ))}
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Data Policies</h4>
                          <div className="space-y-2">
                            <div>
                              <span className="text-sm font-medium">Retention: </span>
                              <a href={selectedRequest.trustInfo.dataRetention.link} target="_blank" 
                                 rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {selectedRequest.trustInfo.dataRetention.policy}
                              </a>
                            </div>
                            <div>
                              <span className="text-sm font-medium">Protection: </span>
                              <a href={selectedRequest.trustInfo.dataProtection.link} target="_blank" 
                                 rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                {selectedRequest.trustInfo.dataProtection.policy}
                              </a>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Service Level</h4>
                          <a href={selectedRequest.trustInfo.uptime.link} target="_blank" 
                             rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Uptime: {selectedRequest.trustInfo.uptime.percentage}
                          </a>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Risk Assessment</h4>
                          <Select 
                            value={selectedRequest.trustInfo.riskLevel} 
                            onValueChange={(value: 'Low' | 'Medium' | 'High' | 'Critical') => 
                              setSelectedRequest(prev => prev ? {...prev, trustInfo: {...prev.trustInfo, riskLevel: value}} : prev)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select risk level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Button
                            variant="brand-secondary"
                            onClick={() => {
                              // Add your security questionnaire generation logic here
                              console.log('Generating security questionnaire');
                            }}
                          >
                            Generate Security Questionnaire
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>                  
                  <div className="border-t pt-4">
                    {selectedRequest.policyOwner && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold self-start pt-1">Policy Owner:</Label>
                        <div className="col-span-3 space-y-4">
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center gap-4">
                                  <label className="text-sm font-semibold text-gray-600">Team</label>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedRequest.policyOwner.teamConfidence.level === 'high' ? 'bg-green-100 text-green-800' :
                                  selectedRequest.policyOwner.teamConfidence.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                  }`}>
                                  {selectedRequest.policyOwner.teamConfidence.level} confidence
                                  </span>
                              </div>
                              <p>
                                {selectedRequest.policyOwner.team} (
                                <a href={`mailto:${selectedRequest.policyOwner.teamEmail}`} className="text-blue-600 hover:underline">
                                  {selectedRequest.policyOwner.teamEmail}
                                </a>)
                              </p>
                            </div>
                            <Accordion
                                  trigger={
                                  <div>
                                      <span className="grow shrink-0 basis-0 text-body font-body text-primary">
                                      Why this team?
                                      </span>
                                      <Accordion.Chevron />
                                  </div>
                                  }
                                  defaultOpen={false}
                                  >
                                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-6 pb-6">
                                      <ul className="list-disc list-inside">
                                          {selectedRequest.policyOwner.teamConfidence.reasons.map((reason, i) => (
                                          <li key={i}>{reason}</li>
                                          ))}
                                      </ul>
                                      <Button
                                          variant="brand-secondary"
                                          onClick={() => null}
                                      >
                                          Update team?
                                      </Button>
                                  </div>
                            </Accordion>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center gap-4">
                                  <label className="text-sm font-semibold text-gray-600">Contact</label>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedRequest.policyOwner.contactConfidence.level === 'high' ? 'bg-green-100 text-green-800' :
                                  selectedRequest.policyOwner.contactConfidence.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                  }`}>
                                  {selectedRequest.policyOwner.contactConfidence.level} confidence
                                  </span>
                              </div>
                              <p>
                                {selectedRequest.policyOwner.contact} (
                                <a href={`mailto:${selectedRequest.policyOwner.email}`} className="text-blue-600 hover:underline">
                                  {selectedRequest.policyOwner.email}
                                </a>)
                              </p>
                            </div>
                            <Accordion
                                  trigger={
                                  <div>
                                      <span className="grow shrink-0 basis-0 text-body font-body text-primary">
                                      Why this contact?
                                      </span>
                                      <Accordion.Chevron />
                                  </div>
                                  }
                                  defaultOpen={false}
                                  >
                                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-6 pb-6">
                                      <ul className="list-disc list-inside">
                                          {selectedRequest.policyOwner.contactConfidence.reasons.map((reason, i) => (
                                          <li key={i}>{reason}</li>
                                          ))}
                                      </ul>
                                      <Button
                                          variant="brand-secondary"
                                          onClick={() => null}
                                      >
                                          Update contact?
                                      </Button>
                                  </div>
                            </Accordion>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4 mt-4">
                              <div className="col-span-3 flex items-center gap-4">
                                  <label className="text-sm font-semibold text-gray-600">Sign Off Status:</label>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedRequest.policyOwner.signOffStatus === 'Yes' ? 'bg-green-100 text-green-800' :
                                  selectedRequest.policyOwner.signOffStatus === 'No' ? 'bg-red-100 text-red-800' :
                                  selectedRequest.policyOwner.signOffStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                  }`}>
                                  {selectedRequest.policyOwner.signOffStatus || 'Pending'}
                                  </span>
                              </div>
                              <div className="col-span-3 flex items-center gap-2">
                                  <Button
                                      variant="brand-secondary"
                                      disabled={selectedRequest.policyOwner.signOffStatus === 'Yes'}
                                      onClick={() => {
                                          // Add your request sign off logic here
                                          console.log('Requesting sign off');
                                      }}
                                      >
                                      Request Sign Off
                                  </Button>
                                  <Button
                                  variant="neutral-secondary"
                                  disabled={selectedRequest.policyOwner.signOffStatus === 'N/A'}
                                  onClick={() => {
                                      // Add your not needed logic here
                                      console.log('Sign off not needed');
                                  }}
                                  >
                                  Not Required
                              </Button>
                              </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-semibold self-start pt-1">Suggested Response:</Label>
                    <div className="col-span-3 space-y-2">
                      {'suggestedResponse' in selectedRequest && (
                        <>
                          <p>{selectedRequest.suggestedResponse}</p>
                          <div className="flex space-x-2">
                            <Button variant="brand-secondary" onClick={handleUseResponse}>Use This Response</Button>
                            <Button variant="neutral-secondary" onClick={handleModifyResponse}>Modify Response</Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right self-start pt-1">
                      <span className="font-semibold">Supporting Content:</span>
                      <span className="block text-sm text-gray-500">Content that was referenced to create this response</span>
                    </Label>
                    <div className="col-span-3">
                      {'supportingDocs' in selectedRequest && selectedRequest.supportingDocs.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                            {doc.name}
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {showResolved ? (
                <>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Response:</Label>
                    <span className="col-span-3">{'response' in selectedRequest ? String(selectedRequest.response) : ''}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Decision:</Label>
                    <span className="col-span-3">{typeof selectedRequest.decision === 'string' ? selectedRequest.decision : ''}</span>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Documentation:</Label>
                    {'documentationLink' in selectedRequest && (
                      <a href={String(selectedRequest.documentationLink)} className="col-span-3 text-blue-500 hover:underline flex items-center">
                        {String(selectedRequest.documentationLink)}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <div className="grid gap-2">
                  <Label htmlFor="response" className="font-semibold">Your Response:</Label>
                  <Textarea
                    id="response"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response here..."
                  />
                  <Label htmlFor="residualRisk" className="font-semibold">Residual Risk:</Label>
                  <Select
                    value={selectedRequest.residualRisk} 
                    onValueChange={(value: 'Low' | 'Medium' | 'High') => 
                      setSelectedRequest(prev => prev ? {...prev, residualRisk: value} : prev)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            <DialogFooter>
              {!showResolved && 
                <>
                  <Button type="submit">Approve</Button>
                  <Button type="submit">Deny</Button>
                </>
              }
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
