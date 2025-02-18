import { ispSections } from "@/data/policies/information-security-policy"
import type { ComplianceStatus, Evidence } from "./vendor-data"
import { getRelativeDate, DemoDateOffsets } from '../utils/date-utils'

interface VendorPolicyMapping {
  vendorId: string;
  mappings: Array<{
    policyId: string;  // Maps to ispSections[x].id
    policyName: string;  // Maps to ispSections[x].name
    requirementGroups: Array<{
      groupId: string;  // Maps to ispSections[x].requirementGroups[y].id
      groupName: string;  // Maps to ispSections[x].requirementGroups[y].name
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
}

export const vendorPolicyMappings: VendorPolicyMapping[] = [
  {
    vendorId: "1", // Acme Cloud Services
    mappings: [
      {
        policyId: ispSections[0].policyId,
        policyName: ispSections[0].type,
        requirementGroups: [
          {
            groupId: ispSections[0].requirementGroups[0].reqId,
            groupName: ispSections[0].requirementGroups[0].name,
            status: "NOT_MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev1",
                name: "SOC 2 Type II Report",
                type: "CERTIFICATION",
                url: "https://acmecloud.com/security/soc2",
                description: "Access Control section demonstrates implementation of role-based access controls",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev2",
                name: "Security Questionnaire Response",
                type: "QUESTIONNAIRE",
                description: "Detailed responses about access control implementation",
                collectedDate: getRelativeDate(DemoDateOffsets.questionnaireSent),
                isNew: true,
                status: "INSUFFICIENT",
                responses: [
                  {
                    question: "Describe your role-based access implementation",
                    response: "We use Azure AD with custom RBAC policies...",
                    status: "INSUFFICIENT"
                  },
                  {
                    question: "How often are access reviews conducted?",
                    response: "Quarterly for all privileged access",
                    status: "ACCEPTABLE"
                  }
                ]
              }
            ]
          },
          {
            groupId: ispSections[0].requirementGroups[1].reqId,
            groupName: ispSections[0].requirementGroups[1].name,
            status: "EXCEPTION",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            gaps: ["Missing encryption requirements documentation"],
            actionPlan: {
              description: "CTO signed off on an exception for this requirement",
              dueDate: getRelativeDate(DemoDateOffsets.lastAssessment),
              lastUpdated: getRelativeDate(DemoDateOffsets.lastAssessment),
              status: "COMPLETED",
              assignedTo: "Engineering Team"
            }
          },
          {
            groupId: ispSections[0].requirementGroups[2].reqId,
            groupName: ispSections[0].requirementGroups[2].name,
            status: "NOT_MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            gaps: ["Missing data retention policy documentation", "No data classification scheme"],
            actionPlan: {
              description: "Vendor needs to implement (or provide evidence of) data classification and retention policies",
              dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue),
              lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated),
              status: "IN_PROGRESS",
              assignedTo: "Data Governance Team"
            }
          },
          {
            groupId: ispSections[0].requirementGroups[3].reqId,
            groupName: ispSections[0].requirementGroups[3].name,
            status: "NOT_ASSESSED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            actionPlan: {
              description: "Request evidcence of backup and recovery procedures from the vendor",
              dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue + 15),
              lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated - 2),
              status: "OPEN",
              assignedTo: "Security Assessment Team"
            }
          }
        ]
      },
      {
        policyId: ispSections[1].policyId,
        policyName: ispSections[1].type,
        requirementGroups: [
          {
            groupId: ispSections[1].requirementGroups[0].reqId,
            groupName: ispSections[1].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev3",
                name: "24/7 SOC Operations",
                type: "ATTESTATION",
                description: "Vendor maintains a 24/7 Security Operations Center with dedicated staff",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev4",
                name: "Incident Response Documentation",
                type: "POLICY",
                url: "https://acmecloud.com/security/ir-playbooks",
                description: "Automated incident response playbooks and procedures",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev5",
                name: "IR Team Structure",
                type: "RFI",
                description: "Documentation of dedicated Incident Response team structure and capabilities",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          },
          {
            groupId: ispSections[1].requirementGroups[0].reqId,
            groupName: ispSections[1].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev11",
                name: "Encryption Standards",
                type: "POLICY",
                description: "Advanced encryption implementation exceeding industry standards",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev12",
                name: "Key Management",
                type: "ATTESTATION",
                description: "Automated key rotation and management procedures",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          },
          {
            groupId: ispSections[1].requirementGroups[1].reqId,
            groupName: ispSections[1].requirementGroups[1].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev13",
                name: "Backup Procedures",
                type: "POLICY",
                description: "Comprehensive backup and recovery procedures",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[3].policyId,
        policyName: ispSections[3].type,
        requirementGroups: [
          {
            groupId: ispSections[3].requirementGroups[0].reqId,
            groupName: ispSections[3].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev14",
                name: "Change Management Process",
                type: "POLICY",
                description: "Automated change management workflow with multiple approval gates",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[4].policyId,
        policyName: ispSections[4].type,
        requirementGroups: [
          {
            groupId: ispSections[4].requirementGroups[0].reqId,
            groupName: ispSections[4].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev15",
                name: "Vulnerability Management Program",
                type: "POLICY",
                description: "Automated vulnerability scanning and remediation process",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev16",
                name: "Penetration Test Results",
                type: "CERTIFICATION",
                description: "Annual third-party penetration test with quarterly follow-ups",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          },
          {
            groupId: ispSections[4].requirementGroups[1].reqId,
            groupName: ispSections[4].requirementGroups[1].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev17",
                name: "Security Training Program",
                type: "ATTESTATION",
                description: "Comprehensive security awareness training program",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[5].policyId,
        policyName: ispSections[5].type,
        requirementGroups: [
          {
            groupId: ispSections[5].requirementGroups[0].reqId,
            groupName: ispSections[5].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev18",
                name: "Business Continuity Plan",
                type: "POLICY",
                description: "Comprehensive BCP with quarterly testing",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev19",
                name: "Disaster Recovery Procedures",
                type: "ATTESTATION",
                description: "Automated DR processes with RPO < 15min",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[6].policyId,
        policyName: ispSections[6].type,
        requirementGroups: [
          {
            groupId: ispSections[6].requirementGroups[0].reqId,
            groupName: ispSections[6].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev20",
                name: "Data Privacy Framework",
                type: "POLICY",
                description: "Comprehensive data privacy controls exceeding GDPR requirements",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[7].policyId,
        policyName: ispSections[7].type,
        requirementGroups: [
          {
            groupId: ispSections[7].requirementGroups[0].reqId,
            groupName: ispSections[7].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev21",
                name: "Asset Management System",
                type: "ATTESTATION",
                description: "Automated asset discovery and classification system",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[8].policyId,
        policyName: ispSections[8].type,
        requirementGroups: [
          {
            groupId: ispSections[8].requirementGroups[0].reqId,
            groupName: ispSections[8].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev22",
                name: "Cloud Security Architecture",
                type: "CERTIFICATION",
                description: "Advanced cloud security controls with zero-trust implementation",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[9].policyId,
        policyName: ispSections[9].type,
        requirementGroups: [
          {
            groupId: ispSections[9].requirementGroups[0].reqId,
            groupName: ispSections[9].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev23",
                name: "Supply Chain Security",
                type: "POLICY",
                description: "Vendor risk assessment and continuous monitoring program",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[10].policyId,
        policyName: ispSections[10].type,
        requirementGroups: [
          {
            groupId: ispSections[10].requirementGroups[0].reqId,
            groupName: ispSections[10].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev24",
                name: "API Security Controls",
                type: "ATTESTATION",
                description: "Advanced API security with rate limiting and anomaly detection",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[11].policyId,
        policyName: ispSections[11].type,
        requirementGroups: [
          {
            groupId: ispSections[11].requirementGroups[0].reqId,
            groupName: ispSections[11].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev25",
                name: "Container Security",
                type: "POLICY",
                description: "Container security and orchestration controls",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[12].policyId,
        policyName: ispSections[12].type,
        requirementGroups: [
          {
            groupId: ispSections[12].requirementGroups[0].reqId,
            groupName: ispSections[12].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev26",
                name: "DevSecOps Implementation",
                type: "ATTESTATION",
                description: "Automated security testing in CI/CD pipeline",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[13].policyId,
        policyName: ispSections[13].type,
        requirementGroups: [
          {
            groupId: ispSections[13].requirementGroups[0].reqId,
            groupName: ispSections[13].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev27",
                name: "Network Segmentation",
                type: "POLICY",
                description: "Network isolation and micro-segmentation implementation",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[14].policyId,
        policyName: ispSections[14].type,
        requirementGroups: [
          {
            groupId: ispSections[14].requirementGroups[0].reqId,
            groupName: ispSections[14].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev28",
                name: "Data Loss Prevention",
                type: "CERTIFICATION",
                description: "Advanced DLP with machine learning capabilities",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[15].policyId,
        policyName: ispSections[15].type,
        requirementGroups: [
          {
            groupId: ispSections[15].requirementGroups[0].reqId,
            groupName: ispSections[15].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev29",
                name: "Secure Software Development",
                type: "POLICY",
                description: "Secure SDLC with automated code scanning",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    vendorId: "2", // SecureAuth Solutions
    mappings: [
      {
        policyId: ispSections[2].policyId,
        policyName: ispSections[2].type,
        requirementGroups: [
          {
            groupId: ispSections[2].requirementGroups[0].reqId,
            groupName: ispSections[2].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: "2024-01-15",
            evidence: [
              {
                id: "ev6",
                name: "ISO 27001 Certification",
                type: "CERTIFICATION",
                url: "https://secureauth.com/security/iso27001",
                description: "Current ISO 27001 certification covering all security operations",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev7",
                name: "Zero Trust Implementation",
                type: "ATTESTATION",
                description: "Zero Trust Architecture implementation details and controls",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev8",
                name: "MFA Configuration",
                type: "QUESTIONNAIRE",
                description: "Multi-factor authentication implementation across all services",
                collectedDate: getRelativeDate(DemoDateOffsets.questionnaireSent),
                isNew: true,
                status: "NEEDS_REVIEW",
                responses: [
                  {
                    question: "What MFA methods are supported?",
                    response: "TOTP, FIDO2, SMS, Email",
                    status: "ACCEPTABLE"
                  },
                  {
                    question: "Is MFA required for all privileged access?",
                    response: "Yes, with no exceptions",
                    status: "ACCEPTABLE"
                  }
                ]
              }
            ]
          },
          {
            groupId: ispSections[2].requirementGroups[1].reqId,
            groupName: ispSections[2].requirementGroups[1].name,
            status: "MET",
            lastAssessed: "2024-01-15",
            evidence: [
              {
                id: "ev9",
                name: "GDPR Compliance Documentation",
                type: "POLICY",
                description: "Documentation demonstrating GDPR compliance controls and procedures",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev10",
                name: "Encryption Implementation",
                type: "ATTESTATION",
                description: "Documentation of data encryption implementation for both transit and rest",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[3].policyId,
        policyName: ispSections[3].type,
        requirementGroups: [
          {
            groupId: ispSections[3].requirementGroups[0].reqId,
            groupName: ispSections[3].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev30",
                name: "Identity Lifecycle Management",
                type: "POLICY",
                description: "Automated identity provisioning and deprovisioning workflows",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[4].policyId,
        policyName: ispSections[4].type,
        requirementGroups: [
          {
            groupId: ispSections[4].requirementGroups[0].reqId,
            groupName: ispSections[4].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev31",
                name: "Authentication Standards",
                type: "CERTIFICATION",
                description: "FIDO2 certified authentication implementation",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[5].policyId,
        policyName: ispSections[5].type,
        requirementGroups: [
          {
            groupId: ispSections[5].requirementGroups[0].reqId,
            groupName: ispSections[5].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev18",
                name: "Business Continuity Plan",
                type: "POLICY",
                description: "Comprehensive BCP with quarterly testing",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              },
              {
                id: "ev19",
                name: "Disaster Recovery Procedures",
                type: "ATTESTATION",
                description: "Automated DR processes with RPO < 15min",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[6].policyId,
        policyName: ispSections[6].type,
        requirementGroups: [
          {
            groupId: ispSections[6].requirementGroups[0].reqId,
            groupName: ispSections[6].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev20",
                name: "Data Privacy Framework",
                type: "POLICY",
                description: "Comprehensive data privacy controls exceeding GDPR requirements",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[7].policyId,
        policyName: ispSections[7].type,
        requirementGroups: [
          {
            groupId: ispSections[7].requirementGroups[0].reqId,
            groupName: ispSections[7].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev21",
                name: "Asset Management System",
                type: "ATTESTATION",
                description: "Automated asset discovery and classification system",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[8].policyId,
        policyName: ispSections[8].type,
        requirementGroups: [
          {
            groupId: ispSections[8].requirementGroups[0].reqId,
            groupName: ispSections[8].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev22",
                name: "Cloud Security Architecture",
                type: "CERTIFICATION",
                description: "Advanced cloud security controls with zero-trust implementation",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[9].policyId,
        policyName: ispSections[9].type,
        requirementGroups: [
          {
            groupId: ispSections[9].requirementGroups[0].reqId,
            groupName: ispSections[9].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev23",
                name: "Supply Chain Security",
                type: "POLICY",
                description: "Vendor risk assessment and continuous monitoring program",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[10].policyId,
        policyName: ispSections[10].type,
        requirementGroups: [
          {
            groupId: ispSections[10].requirementGroups[0].reqId,
            groupName: ispSections[10].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev24",
                name: "API Security Controls",
                type: "ATTESTATION",
                description: "Advanced API security with rate limiting and anomaly detection",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[11].policyId,
        policyName: ispSections[11].type,
        requirementGroups: [
          {
            groupId: ispSections[11].requirementGroups[0].reqId,
            groupName: ispSections[11].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev25",
                name: "Container Security",
                type: "POLICY",
                description: "Container security and orchestration controls",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[12].policyId,
        policyName: ispSections[12].type,
        requirementGroups: [
          {
            groupId: ispSections[12].requirementGroups[0].reqId,
            groupName: ispSections[12].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev26",
                name: "DevSecOps Implementation",
                type: "ATTESTATION",
                description: "Automated security testing in CI/CD pipeline",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[13].policyId,
        policyName: ispSections[13].type,
        requirementGroups: [
          {
            groupId: ispSections[13].requirementGroups[0].reqId,
            groupName: ispSections[13].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev27",
                name: "Network Segmentation",
                type: "POLICY",
                description: "Network isolation and micro-segmentation implementation",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[14].policyId,
        policyName: ispSections[14].type,
        requirementGroups: [
          {
            groupId: ispSections[14].requirementGroups[0].reqId,
            groupName: ispSections[14].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev28",
                name: "Data Loss Prevention",
                type: "CERTIFICATION",
                description: "Advanced DLP with machine learning capabilities",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[15].policyId,
        policyName: ispSections[15].type,
        requirementGroups: [
          {
            groupId: ispSections[15].requirementGroups[0].reqId,
            groupName: ispSections[15].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev29",
                name: "Secure Software Development",
                type: "POLICY",
                description: "Secure SDLC with automated code scanning",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[16].policyId,
        policyName: ispSections[16].type,
        requirementGroups: [
          {
            groupId: ispSections[16].requirementGroups[0].reqId,
            groupName: ispSections[16].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev32",
                name: "MFA Implementation",
                type: "CERTIFICATION",
                description: "Passwordless authentication with biometric and hardware token support",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[17].policyId,
        policyName: ispSections[17].type,
        requirementGroups: [
          {
            groupId: ispSections[17].requirementGroups[0].reqId,
            groupName: ispSections[17].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev33",
                name: "Privileged Access Management",
                type: "POLICY",
                description: "Just-in-time privileged access with automated approval workflows",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[18].policyId,
        policyName: ispSections[18].type,
        requirementGroups: [
          {
            groupId: ispSections[18].requirementGroups[0].reqId,
            groupName: ispSections[18].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev34",
                name: "SSO Federation Standards",
                type: "ATTESTATION",
                description: "Support for SAML 2.0, OIDC, and WS-Federation protocols",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[19].policyId,
        policyName: ispSections[19].type,
        requirementGroups: [
          {
            groupId: ispSections[19].requirementGroups[0].reqId,
            groupName: ispSections[19].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev35",
                name: "Access Certification",
                type: "POLICY",
                description: "Automated access reviews with ML-based anomaly detection",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[20].policyId,
        policyName: ispSections[20].type,
        requirementGroups: [
          {
            groupId: ispSections[20].requirementGroups[0].reqId,
            groupName: ispSections[20].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev36",
                name: "Directory Services",
                type: "CERTIFICATION",
                description: "High-availability directory services with real-time replication",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    vendorId: "3", // DataVault Storage
    mappings: [
      {
        policyId: ispSections[0].policyId,
        policyName: ispSections[0].type,
        requirementGroups: [
          {
            groupId: ispSections[0].requirementGroups[0].reqId,
            groupName: ispSections[0].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev40",
                name: "Data Encryption Framework",
                type: "CERTIFICATION",
                description: "End-to-end encryption with customer-managed keys",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[1].policyId,
        policyName: ispSections[1].type,
        requirementGroups: [
          {
            groupId: ispSections[1].requirementGroups[0].reqId,
            groupName: ispSections[1].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev41",
                name: "Data Access Controls",
                type: "POLICY",
                description: "Column-level security and dynamic data masking implementation",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[2].policyId,
        policyName: ispSections[2].type,
        requirementGroups: [
          {
            groupId: ispSections[2].requirementGroups[0].reqId,
            groupName: ispSections[2].requirementGroups[0].name,
            status: "NOT_MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev42",
                name: "Data Lineage Controls",
                type: "POLICY",
                description: "Data lineage tracking implementation needs improvement",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "INSUFFICIENT"
              }
            ],
            gaps: ["Missing end-to-end data lineage tracking", "No automated data classification"],
            actionPlan: {
              description: "Implement comprehensive data lineage tracking system",
              dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue),
              lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated),
              status: "OPEN",
              assignedTo: "Data Engineering Team"
            }
          }
        ]
      },
      {
        policyId: ispSections[3].policyId,
        policyName: ispSections[3].type,
        requirementGroups: [
          {
            groupId: ispSections[3].requirementGroups[0].reqId,
            groupName: ispSections[3].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev43",
                name: "Data Sharing Controls",
                type: "CERTIFICATION",
                description: "Secure data sharing with granular access controls and encryption",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[4].policyId,
        policyName: ispSections[4].type,
        requirementGroups: [
          {
            groupId: ispSections[4].requirementGroups[0].reqId,
            groupName: ispSections[4].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev44",
                name: "Storage Optimization",
                type: "ATTESTATION",
                description: "Automated data lifecycle management and compression",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[5].policyId,
        policyName: ispSections[5].type,
        requirementGroups: [
          {
            groupId: ispSections[5].requirementGroups[0].reqId,
            groupName: ispSections[5].requirementGroups[0].name,
            status: "NOT_ASSESSED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            actionPlan: {
              description: "Review data retention policies and implementation",
              dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue + 15),
              lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated),
              status: "OPEN",
              assignedTo: "Compliance Team"
            }
          }
        ]
      },
      {
        policyId: ispSections[6].policyId,
        policyName: ispSections[6].type,
        requirementGroups: [
          {
            groupId: ispSections[6].requirementGroups[0].reqId,
            groupName: ispSections[6].requirementGroups[0].name,
            status: "EXCEEDED",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev45",
                name: "Query Audit Logging",
                type: "POLICY",
                description: "Real-time query monitoring and access pattern analysis",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      },
      {
        policyId: ispSections[7].policyId,
        policyName: ispSections[7].type,
        requirementGroups: [
          {
            groupId: ispSections[7].requirementGroups[0].reqId,
            groupName: ispSections[7].requirementGroups[0].name,
            status: "NOT_MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev46",
                name: "Data Residency Controls",
                type: "ATTESTATION",
                description: "Geographic data controls need enhancement",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "INSUFFICIENT"
              }
            ],
            gaps: ["Incomplete data residency tracking", "Missing cross-border transfer controls"],
            actionPlan: {
              description: "Implement comprehensive data residency controls",
              dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue + 30),
              lastUpdated: getRelativeDate(DemoDateOffsets.actionPlanLastUpdated),
              status: "IN_PROGRESS",
              assignedTo: "Data Governance Team"
            }
          }
        ]
      },
      {
        policyId: ispSections[8].policyId,
        policyName: ispSections[8].type,
        requirementGroups: [
          {
            groupId: ispSections[8].requirementGroups[0].reqId,
            groupName: ispSections[8].requirementGroups[0].name,
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              {
                id: "ev47",
                name: "Time Travel Backups",
                type: "CERTIFICATION",
                description: "Point-in-time data recovery capabilities",
                collectedDate: getRelativeDate(DemoDateOffsets.documentLastVerified),
                status: "ACCEPTABLE"
              }
            ]
          }
        ]
      }
    ]
  }
] 