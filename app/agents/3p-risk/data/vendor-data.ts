import { getRelativeDate, DemoDateOffsets } from "@/app/utils/date-utils";
import { vendorPolicyMappings } from './vendor-policy-mappings'

type VendorStatus = 
  | 'MORE_INFO_REQUESTED' 
  | 'COMPLIANT' 
  | 'NON_COMPLIANT' 
  | 'COMPLIANT_WITH_EXCEPTION' 
  | 'PENDING_REVIEW'
  | 'SUSPENDED';

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
  }
]

export type { Vendor, VendorStatus, ComplianceStatus, Evidence, EvidenceType, EvidenceStatus } 