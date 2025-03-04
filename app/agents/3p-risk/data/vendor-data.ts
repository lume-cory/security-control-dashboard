import { getRelativeDate, DemoDateOffsets } from "@/app/utils/date-utils";
import { vendorPolicyMappings } from './vendor-policy-mappings'

type VendorStatus = 
  | 'MORE_INFO_REQUESTED' 
  | 'COMPLIANT' 
  | 'NON_COMPLIANT' 
  | 'COMPLIANT_WITH_EXCEPTION' 
  | 'PENDING_REVIEW'
  | 'SUSPENDED'
  | 'UNCONFIRMED';

type ComplianceStatus = 'EXCEEDED' | 'MET' | 'NOT_MET' | 'NOT_ASSESSED' | 'EXCEPTION';

type EvidenceType = 'QUESTIONNAIRE' | 'RFI' | 'CERTIFICATION' | 'ATTESTATION' | 'POLICY';
type EvidenceStatus = 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT';

interface Evidence {
  id: string;
  name: string;
  type: EvidenceType;
  url?: string;
  description: string;
  collectedDate: string;
  isNew?: boolean;
  status?: EvidenceStatus;
  responses?: Array<{
    question: string;
    response: string;
    status: 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT';
  }>;
}

interface VendorCertification {
  name: string;
  issuer: string;
  validUntil: string;
  documentUrl?: string;
  lastVerified: string;
}

interface PolicyCompliance {
  policyId: string;
  status: ComplianceStatus;
  lastAssessed: string;
  evidence?: string[];
  gaps?: string[];
  actionPlan?: {
    description: string;
    dueDate: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
    assignedTo: string;
  };
}

interface VendorDocument {
  id: string;
  type: 'QUESTIONNAIRE' | 'RFI' | 'CERTIFICATION' | 'ATTESTATION' | 'POLICY';
  name: string;
  url: string;
  uploadDate: string;
  lastVerified: string;
  status: 'CURRENT' | 'EXPIRED' | 'PENDING_REVIEW';
}

interface VendorPolicyMapping {
  policyId: string;
  policyName: string;
  requirementGroups: Array<{
    groupId: string;
    groupName: string;
    status: ComplianceStatus;
    lastAssessed: string;
    evidence?: Evidence[];
    gaps?: string[];
    actionPlan?: {
      description: string;
      dueDate: string;
      lastUpdated: string;
      status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
      assignedTo: string;
    };
  }>;
}

interface Vendor {
  id: string;
  name: string;
  description: string;
  website: string;
  trustCenterUrl?: string;
  pointOfContact: {
    name: string;
    email: string;
    phone?: string;
  };
  riskLevel: 'High' | 'Medium' | 'Low';
  status: VendorStatus;
  category: string;
  lastReviewDate: string;
  submittedBy?: {
    name: string;
    type: 'AI Agent' | 'Employee' | 'System';
    source?: string;
    date: string;
  };
  assessmentStatus: {
    lastAssessment: string;
    nextAssessmentDue: string;
    assessmentFrequency: 'ANNUAL' | 'SEMI_ANNUAL' | 'QUARTERLY';
  };
  certifications: VendorCertification[];
  documents: VendorDocument[];
  policyCompliance: Array<{
    policyId: string;
    policyName: string;
    requirementGroups: Array<{
      groupId: string;
      groupName: string;
      status: ComplianceStatus;
      lastAssessed: string;
      evidence?: Evidence[];
      gaps?: string[];
      actionPlan?: {
        description: string;
        dueDate: string;
        lastUpdated: string;
        status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
        assignedTo: string;
      };
    }>;
  }>;
  criticalDates: {
    contractRenewal: string;
    nextAssessment: string;
    certificationRenewals: Array<{
      certificationType: string;
      dueDate: string;
    }>;
  };
  questionnaires: Array<{
    id: string;
    sentDate: string;
    dueDate: string;
    status: 'SENT' | 'RESPONDED' | 'REVIEWED' | 'ACCEPTED' | 'REJECTED';
    responses?: Array<{
      questionId: string;
      response: string;
      status: 'QUALIFIED' | 'UNQUALIFIED' | 'NEEDS_REVIEW';
    }>;
  }>;
  actionPlans: Array<{
    id: string;
    issue: string;
    riskLevel: 'High' | 'Medium' | 'Low';
    status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED';
    type: 'ISOLATION' | 'SUSPENSION' | 'EXCEPTION_REQUEST' | 'REMEDIATION';
    dueDate: string;
    assignedTo: string;
    description: string;
    lastUpdated: string;
  }>;
}

export function calculateVendorComplianceSummary(vendor: Vendor) {
  const allRequirements = vendor.policyCompliance.flatMap(policy =>
    policy.requirementGroups.map(group => group.status)
  );

  return {
    exceeded: allRequirements.filter(status => status === 'EXCEEDED').length,
    met: allRequirements.filter(status => status === 'MET').length,
    notMet: allRequirements.filter(status => status === 'NOT_MET').length,
    notAssessed: allRequirements.filter(status => status === 'NOT_ASSESSED').length,
    exception: allRequirements.filter(status => status === 'EXCEPTION').length
  };
}

export const vendors: Vendor[] = [
  {
    id: "1",
    name: "Amazon Web Services",
    description: "Cloud infrastructure provider",
    website: "https://acmecloud.com",
    trustCenterUrl: "https://acmecloud.com/trust",
    pointOfContact: {
      name: "John Smith",
      email: "john@acmecloud.com",
      phone: "555-0123"
    },
    riskLevel: "High",
    status: "NON_COMPLIANT",
    category: "Infrastructure",
    lastReviewDate: getRelativeDate(DemoDateOffsets.lastReviewDate),
    submittedBy: {
      name: "VendorSecurity AI",
      type: "AI Agent",
      source: "Slack #devops-infra",
      date: getRelativeDate(DemoDateOffsets.alertCreated)
    },
    assessmentStatus: {
      lastAssessment: getRelativeDate(DemoDateOffsets.lastAssessment),
      nextAssessmentDue: getRelativeDate(DemoDateOffsets.nextAssessmentDue),
      assessmentFrequency: "SEMI_ANNUAL"
    },
    certifications: [
      {
        name: "SOC 2 Type I",
        issuer: "Ernst & Young",
        validUntil: getRelativeDate(DemoDateOffsets.certificationExpiry),
        documentUrl: "https://acmecloud.com/security/soc2",
        lastVerified: getRelativeDate(DemoDateOffsets.documentLastVerified)
      }, 
      {
        name: "ISO 27001",
        issuer: "Consilium Labs",
        validUntil: getRelativeDate(DemoDateOffsets.certificationExpiry),
        documentUrl: "https://acmecloud.com/security/soc2",
        lastVerified: getRelativeDate(DemoDateOffsets.documentLastVerified)
      }
    ],
    documents: [
      {
        id: "doc1",
        type: "QUESTIONNAIRE",
        name: "Security Assessment Q4 2023",
        url: "/documents/acme/security-assessment-2023q4.pdf",
        uploadDate: getRelativeDate(DemoDateOffsets.documentUploaded),
        lastVerified: getRelativeDate(DemoDateOffsets.documentLastVerified),
        status: "CURRENT"
      }, 
      {
        id: "doc2",
        type: "QUESTIONNAIRE",
        name: "Questionnaire Response - Acme Inc.",
        url: "/documents/acme/questionnaire-response.pdf",
        uploadDate: getRelativeDate(DemoDateOffsets.alertCreated),
        lastVerified: getRelativeDate(DemoDateOffsets.alertCreated),
        status: "CURRENT"
      }
    ],
    policyCompliance: vendorPolicyMappings.find(m => m.vendorId === "1")?.mappings || [],
    criticalDates: {
      contractRenewal: getRelativeDate(DemoDateOffsets.contractRenewal),
      nextAssessment: getRelativeDate(DemoDateOffsets.nextAssessmentDue),
      certificationRenewals: [
        {
          certificationType: "SOC 2 Type II",
          dueDate: getRelativeDate(DemoDateOffsets.certificationExpiry)
        }
      ]
    },
    questionnaires: [
      {
        id: "q1",
        sentDate: "2024-01-15",
        dueDate: "2024-02-15",
        status: "RESPONDED",
        responses: [
          {
            questionId: "q1a",
            response: "Qualified",
            status: "QUALIFIED"
          },
          {
            questionId: "q1b",
            response: "Unqualified",
            status: "UNQUALIFIED"
          }
        ]
      }
    ],
    actionPlans: [
      {
        id: "ap1",
        issue: "Data Security",
        riskLevel: "High",
        status: "COMPLETED",
        type: "REMEDIATION",
        dueDate: "2024-03-01",
        assignedTo: "Security Team",
        description: "Implement encryption for data in transit and at rest",
        lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated)
      }
    ]
  },
  {
    id: "2",
    name: "Okta",
    description: "Identity and access management provider",
    website: "https://secureauth.com",
    trustCenterUrl: "https://secureauth.com/security",
    pointOfContact: {
      name: "Sarah Johnson",
      email: "sarah@secureauth.com"
    },
    riskLevel: "Medium",
    status: "COMPLIANT",
    category: "IAM",
    lastReviewDate: getRelativeDate(DemoDateOffsets.lastReviewDate - 5),
    submittedBy: {
      name: "Jane Doe",
      type: "Employee",
      source: "Direct",
      date: getRelativeDate(DemoDateOffsets.alertCreated)
    },
    assessmentStatus: {
      lastAssessment: getRelativeDate(DemoDateOffsets.lastAssessment - 10),
      nextAssessmentDue: getRelativeDate(DemoDateOffsets.nextAssessmentDue + 30),
      assessmentFrequency: "SEMI_ANNUAL"
    },
    certifications: [
      {
        name: "ISO 27001",
        issuer: "International Organization for Standardization",
        validUntil: getRelativeDate(DemoDateOffsets.certificationExpiry + 45),
        documentUrl: "https://secureauth.com/security/iso27001",
        lastVerified: getRelativeDate(DemoDateOffsets.documentLastVerified - 3)
      }
    ],
    documents: [
      {
        id: "doc2",
        type: "CERTIFICATION",
        name: "ISO 27001 Certification",
        url: "/documents/secureauth/iso27001-certification.pdf",
        uploadDate: getRelativeDate(DemoDateOffsets.documentUploaded - 15),
        lastVerified: getRelativeDate(DemoDateOffsets.documentLastVerified - 3),
        status: "CURRENT"
      }
    ],
    policyCompliance: vendorPolicyMappings.find(m => m.vendorId === "2")?.mappings || [],
    criticalDates: {
      contractRenewal: getRelativeDate(DemoDateOffsets.contractRenewal + 60),
      nextAssessment: getRelativeDate(DemoDateOffsets.nextAssessmentDue + 30),
      certificationRenewals: [
        {
          certificationType: "ISO 27001",
          dueDate: getRelativeDate(DemoDateOffsets.certificationExpiry + 45)
        }
      ]
    },
    questionnaires: [
      {
        id: "q2",
        sentDate: getRelativeDate(DemoDateOffsets.questionnaireSent - 5),
        dueDate: getRelativeDate(DemoDateOffsets.questionnaireDue + 7),
        status: "RESPONDED",
        responses: [
          {
            questionId: "q2a",
            response: "Qualified",
            status: "QUALIFIED"
          },
          {
            questionId: "q2b",
            response: "Unqualified",
            status: "UNQUALIFIED"
          }
        ]
      }
    ],
    actionPlans: [
      {
        id: "ap2",
        issue: "Data Security",
        riskLevel: "High",
        status: "COMPLETED",
        type: "REMEDIATION",
        dueDate: "2024-03-01",
        assignedTo: "Security Team",
        description: "Implement encryption for data in transit and at rest",
        lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated)
      }
    ]
  },
  {
    id: "3",
    name: "Snowflake",
    description: "Enterprise backup and storage solutions",
    website: "https://datavault.com",
    pointOfContact: {
      name: "Mike Wilson",
      email: "mike@datavault.com",
      phone: "555-0456"
    },
    riskLevel: "Low",
    status: "PENDING_REVIEW",
    category: "Storage",
    lastReviewDate: getRelativeDate(DemoDateOffsets.lastReviewDate - 12),
    submittedBy: {
      name: "John Smith",
      type: "Employee",
      source: "Direct",
      date: getRelativeDate(DemoDateOffsets.alertCreated)
    },
    assessmentStatus: {
      lastAssessment: getRelativeDate(DemoDateOffsets.lastAssessment - 23),
      nextAssessmentDue: getRelativeDate(DemoDateOffsets.nextAssessmentDue - 32),
      assessmentFrequency: "SEMI_ANNUAL"
    },
    certifications: [
      {
        name: "ISO 27001",
        issuer: "International Organization for Standardization",
        validUntil: getRelativeDate(DemoDateOffsets.certificationExpiry - 45),
        documentUrl: "https://datavault.com/security/iso27001",
        lastVerified: getRelativeDate(DemoDateOffsets.documentLastVerified - 5)
      }
    ],
    documents: [
      {
        id: "doc3",
        type: "CERTIFICATION",
        name: "ISO 27001 Certification",
        url: "/documents/datavault/iso27001-certification.pdf",
        uploadDate: getRelativeDate(DemoDateOffsets.documentUploaded - 15),
        lastVerified: getRelativeDate(DemoDateOffsets.documentLastVerified - 3),
        status: "CURRENT"
      }
    ],
    policyCompliance: vendorPolicyMappings.find(m => m.vendorId === "3")?.mappings || [],
    criticalDates: {
      contractRenewal: getRelativeDate(DemoDateOffsets.contractRenewal + 90),
      nextAssessment: getRelativeDate(DemoDateOffsets.nextAssessmentDue + 60),
      certificationRenewals: [
        {
          certificationType: "ISO 27001",
          dueDate: getRelativeDate(DemoDateOffsets.certificationExpiry + 45)
        }
      ]
    },
    questionnaires: [
      {
        id: "q3",
        sentDate: getRelativeDate(DemoDateOffsets.questionnaireSent - 3),
        dueDate: getRelativeDate(DemoDateOffsets.questionnaireDue + 5),
        status: "RESPONDED",
        responses: [
          {
            questionId: "q3a",
            response: "Qualified",
            status: "QUALIFIED"
          },
          {
            questionId: "q3b",
            response: "Unqualified",
            status: "UNQUALIFIED"
          }
        ]
      }
    ],
    actionPlans: [
      {
        id: "ap3",
        issue: "Data Security",
        riskLevel: "High",
        status: "COMPLETED",
        type: "REMEDIATION",
        dueDate: "2024-03-01",
        assignedTo: "Security Team",
        description: "Implement encryption for data in transit and at rest",
        lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated)
      }
    ]
  },
  {
    id: "4",
    name: "MongoDB Atlas",
    description: "Cloud database service for modern applications",
    website: "https://www.mongodb.com/atlas",
    trustCenterUrl: "https://www.mongodb.com/trust",
    pointOfContact: {
      name: "Sarah Chen",
      email: "sarah.chen@company.com"
    },
    riskLevel: "Medium",
    status: "UNCONFIRMED",
    category: "Database",
    lastReviewDate: getRelativeDate(DemoDateOffsets.alertCreated),
    submittedBy: {
      name: "VendorSecurity AI",
      type: "AI Agent",
      source: "Slack #eng-infrastructure",
      date: getRelativeDate(DemoDateOffsets.alertCreated)
    },
    assessmentStatus: {
      lastAssessment: "Not assessed",
      nextAssessmentDue: getRelativeDate(DemoDateOffsets.alertCreated + 14),
      assessmentFrequency: "ANNUAL"
    },
    certifications: [
      {
        name: "SOC 2 Type II",
        issuer: "AICPA",
        validUntil: getRelativeDate(DemoDateOffsets.certificationExpiry + 120),
        documentUrl: "https://www.mongodb.com/cloud/trust/compliance/soc",
        lastVerified: getRelativeDate(DemoDateOffsets.alertCreated)
      },
      {
        name: "ISO 27001",
        issuer: "BSI",
        validUntil: getRelativeDate(DemoDateOffsets.certificationExpiry + 90),
        documentUrl: "https://www.mongodb.com/cloud/trust/compliance/iso-27001",
        lastVerified: getRelativeDate(DemoDateOffsets.alertCreated)
      },
      {
        name: "HIPAA",
        issuer: "Coalfire",
        validUntil: getRelativeDate(DemoDateOffsets.certificationExpiry + 180),
        documentUrl: "https://www.mongodb.com/cloud/trust/compliance/hipaa",
        lastVerified: getRelativeDate(DemoDateOffsets.alertCreated)
      }
    ],
    documents: [
      {
        id: "doc-mongo-1",
        type: "CERTIFICATION",
        name: "SOC 2 Type II Report",
        url: "https://www.mongodb.com/cloud/trust/compliance/soc",
        uploadDate: getRelativeDate(DemoDateOffsets.alertCreated),
        lastVerified: getRelativeDate(DemoDateOffsets.alertCreated),
        status: "CURRENT"
      },
      {
        id: "doc-mongo-2",
        type: "POLICY",
        name: "MongoDB Atlas Security Controls",
        url: "https://www.mongodb.com/cloud/trust/security-controls",
        uploadDate: getRelativeDate(DemoDateOffsets.alertCreated),
        lastVerified: getRelativeDate(DemoDateOffsets.alertCreated),
        status: "CURRENT"
      },
      {
        id: "doc-mongo-3",
        type: "ATTESTATION",
        name: "MongoDB Atlas Data Processing Addendum",
        url: "https://www.mongodb.com/cloud/trust/dpa",
        uploadDate: getRelativeDate(DemoDateOffsets.alertCreated),
        lastVerified: getRelativeDate(DemoDateOffsets.alertCreated),
        status: "CURRENT"
      }
    ],
    policyCompliance: [
      {
        policyId: "SEC-DB-001",
        policyName: "Database Security Policy",
        requirementGroups: [
          {
            groupId: "SEC-DB-001-01",
            groupName: "Access Control",
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.alertCreated),
            evidence: [
              {
                id: "ev-mongo-1",
                name: "MongoDB Atlas Access Controls",
                type: "POLICY",
                description: "Documentation on MongoDB Atlas access control mechanisms",
                collectedDate: getRelativeDate(DemoDateOffsets.alertCreated),
                isNew: true,
                status: "NEEDS_REVIEW"
              }
            ]
          },
          {
            groupId: "SEC-DB-001-02",
            groupName: "Encryption",
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.alertCreated),
            evidence: [
              {
                id: "ev-mongo-2",
                name: "MongoDB Atlas Encryption",
                type: "POLICY",
                description: "Documentation on MongoDB Atlas encryption capabilities",
                collectedDate: getRelativeDate(DemoDateOffsets.alertCreated),
                isNew: true,
                status: "NEEDS_REVIEW"
              }
            ]
          },
          {
            groupId: "SEC-DB-001-03",
            groupName: "Backup and Recovery",
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.alertCreated),
            evidence: [
              {
                id: "ev-mongo-3",
                name: "MongoDB Atlas Backup",
                type: "POLICY",
                description: "Documentation on MongoDB Atlas backup capabilities",
                collectedDate: getRelativeDate(DemoDateOffsets.alertCreated),
                isNew: true,
                status: "NEEDS_REVIEW"
              }
            ]
          }
        ]
      },
      {
        policyId: "SEC-CLOUD-001",
        policyName: "Cloud Services Security Policy",
        requirementGroups: [
          {
            groupId: "SEC-CLOUD-001-01",
            groupName: "Cloud Provider Security",
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.alertCreated),
            evidence: [
              {
                id: "ev-mongo-4",
                name: "MongoDB Atlas Security Architecture",
                type: "POLICY",
                description: "Documentation on MongoDB Atlas security architecture",
                collectedDate: getRelativeDate(DemoDateOffsets.alertCreated),
                isNew: true,
                status: "NEEDS_REVIEW"
              }
            ]
          },
          {
            groupId: "SEC-CLOUD-001-02",
            groupName: "Data Residency",
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.alertCreated),
            evidence: [
              {
                id: "ev-mongo-5",
                name: "MongoDB Atlas Data Residency",
                type: "POLICY",
                description: "Documentation on MongoDB Atlas data residency options",
                collectedDate: getRelativeDate(DemoDateOffsets.alertCreated),
                isNew: true,
                status: "NEEDS_REVIEW"
              }
            ]
          }
        ]
      }
    ],
    criticalDates: {
      contractRenewal: "Not established",
      nextAssessment: getRelativeDate(DemoDateOffsets.alertCreated + 14),
      certificationRenewals: [
        {
          certificationType: "SOC 2 Type II",
          dueDate: getRelativeDate(DemoDateOffsets.certificationExpiry + 120)
        },
        {
          certificationType: "ISO 27001",
          dueDate: getRelativeDate(DemoDateOffsets.certificationExpiry + 90)
        }
      ]
    },
    questionnaires: [
      {
        id: "q-mongo-1",
        sentDate: getRelativeDate(DemoDateOffsets.alertCreated),
        dueDate: getRelativeDate(DemoDateOffsets.alertCreated + 14),
        status: "SENT",
        responses: []
      }
    ],
    actionPlans: [
      {
        id: "ap-mongo-1",
        issue: "Initial Security Assessment",
        riskLevel: "Medium",
        status: "OPEN",
        type: "REMEDIATION",
        dueDate: getRelativeDate(DemoDateOffsets.alertCreated + 14),
        assignedTo: "Security Team",
        description: "Complete initial security assessment for MongoDB Atlas based on Slack conversation",
        lastUpdated: getRelativeDate(DemoDateOffsets.alertCreated)
      },
      {
        id: "ap-mongo-2",
        issue: "Verify Data Classification Requirements",
        riskLevel: "Medium",
        status: "OPEN",
        type: "REMEDIATION",
        dueDate: getRelativeDate(DemoDateOffsets.alertCreated + 7),
        assignedTo: "Sarah Chen",
        description: "Verify data classification requirements for the user analytics service",
        lastUpdated: getRelativeDate(DemoDateOffsets.alertCreated)
      }
    ]
  }
]

export type { Vendor, VendorStatus, ComplianceStatus, Evidence, EvidenceType, EvidenceStatus } 