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
      evidence?: string[];
      gaps?: string[];
      actionPlan?: {
        description: string;
        dueDate: string;
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
            status: "MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            evidence: [
              "SOC 2 Type II - Access Control Section",
              "Role-based access implementation"
            ]
          },
          {
            groupId: ispSections[0].requirementGroups[1].reqId,
            groupName: ispSections[0].requirementGroups[1].name,
            status: "NOT_MET",
            lastAssessed: getRelativeDate(DemoDateOffsets.lastAssessment),
            gaps: ["Missing encryption requirements documentation"],
            actionPlan: {
              description: "Request encryption documentation and implement compensating controls",
              dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue),
              status: "IN_PROGRESS",
              assignedTo: "Security Team"
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
              "24/7 SOC",
              "Automated incident response playbooks",
              "Dedicated IR team"
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
              "ISO 27001 certification",
              "Zero Trust Architecture implementation",
              "MFA everywhere"
            ]
          },
          {
            groupId: ispSections[2].requirementGroups[1].reqId,
            groupName: ispSections[2].requirementGroups[1].name,
            status: "MET",
            lastAssessed: "2024-01-15",
            evidence: [
              "GDPR compliance documentation",
              "Data encryption in transit and at rest"
            ]
          }
        ]
      }
      // ... add more policy group mappings
    ]
  }
  // ... add mapping for DataVault Storage
] 