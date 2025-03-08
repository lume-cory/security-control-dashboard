export interface PolicyException {
  policy: string;
  description: string;
  exceptions: Array<{
    name: string;
    requirement: string;
    compliant: boolean;
    evidence: string;
  }>;
  policyLanguage: string;
}

export const mockPolicyExceptions: PolicyException[] = [
  {
    policy: "Data Backup Policy",
    description: "Data backup frequency and durability requirements",
    policyLanguage: "Data backups must occur every 4 hours with 99.99% durability",
    exceptions: [
      {
        name: "TechGiant Inc",
        requirement: "Requires hourly backups with 99.999% durability",
        compliant: false,
        evidence: "Current backup schedule is every 4 hours"
      }
    ]
  },
  {
    policy: "Data Retention Policy",
    description: "Data retention duration requirements",
    policyLanguage: "Data must be retained for 1 year",
    exceptions: [
      {
        name: "Acme Corp",
        requirement: "Requires 3-months data retention period",
        compliant: false,
        evidence: "Current retention period is 1 year"
      },
      {
        name: "Tech Giant Inc",
        requirement: "Requires 3-years data retention period",
        compliant: false,
        evidence: "Current retention period is 1 year"
      },
      {
        name: "Secure Data Ltd",
        requirement: "Requires 5-years data retention period",
        compliant: false,
        evidence: "Current retention period is 1 year"
      }
    ]
  },
  {
    policy: "Secret Management Policy",
    description: "Requirements for cryptographic key storage",
    policyLanguage: "Software-based key storage with encryption",
    exceptions: [
      {
        name: "Tech Inc",
        requirement: "Requires hardware security modules on client premises for key storage",
        compliant: false,
        evidence: "Current key storage method is software-based"
      },
      {
        name: "Acme Corp",
        requirement: "Requires hardware security modules in Acme Corp's AWS KMS for key storage",
        compliant: false,
        evidence: "Current key storage method is software-based"
      }
    ]
  }
] 
