import { ispSections } from "@/data/policies/information-security-policy"
import type { ComplianceStatus } from "./vendor-data"
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
      evidence?: {
        id: string;
        name: string;
        type: string;
        url?: string;
        description: string;
        collectedDate: string;
        isNew?: boolean;
        status: 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT';
        responses?: Array<{
          question: string;
          response: string;
          status: 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT';
        }>;
      }[];
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
            lastAssessed: "2024-01-15",
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
          }
        ]
      }
      // ... continue with other policies
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
      }
      // ... add more policy group mappings
    ]
  }
  // ... add mapping for DataVault Storage
] 