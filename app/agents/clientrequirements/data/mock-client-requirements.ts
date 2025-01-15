export interface ClientRequirement {
  id: string;
  name: string;
  contractLink: string;
  totalRequirements: number;
  metRequirements: number;
  unmetRequirements: number;
  requirements: Array<{
    id: string;
    category: string;
    description: string;
    status: 'met' | 'unmet';
    evidence?: string;
    policy?: string;
    policyLink?: string;
    policyLanguage?: string;
    suggestedPolicy?: string;
    suggestedPolicyLink?: string;
    suggestion?: string;
    exceedsFramework?: boolean;
    exceedingFrameworks?: string[];
  }>;
}

export const mockClientRequirements: ClientRequirement[] = [
  {
    id: "client1",
    name: "Acme Corp",
    contractLink: "/contracts/acme-corp-2024.pdf",
    totalRequirements: 7,
    metRequirements: 5,
    unmetRequirements: 2,
    requirements: [
      {
        id: "req1",
        category: "Data Retention",
        description: "All data must be retained for 5 years",
        status: "unmet",
        evidence: "Current retention policy set to 1 year",
        suggestedPolicy: "Data Retention Policy",
        suggestedPolicyLink: "/policies/data-retention",
        suggestion: "Update Data Retention policy to extend retention period to 5 years",
        exceedsFramework: true,
        exceedingFrameworks: ["NIST CSF", "CIS RAM"]
      },
      {
        id: "req2",
        category: "Encryption",
        description: "Data must be encrypted at rest with AES-256",
        status: "met",
        evidence: "Using AES-256 encryption across all storage systems",
        policyLink: "/policies/encryption",
        policyLanguage: "All data must be encrypted at rest using AES-256",
        policy: "Encryption Policy"
      },
      {
        id: "req3",
        category: "Access Control",
        description: "Multi-factor authentication required for all access",
        status: "met",
        evidence: "MFA implemented across all systems",
        policyLink: "/policies/access-control",
        policyLanguage: "Multi-factor authentication is required for all user accounts",
        policy: "Access Control Policy"
      },
      {
        id: "req4",
        category: "Password Policy",
        description: "Minimum 12 character passwords with complexity requirements",
        status: "met",
        evidence: "Password policy enforced through IAM",
        policyLink: "/policies/password-policy",
        policyLanguage: "Passwords must be minimum 12 characters with special characters",
        policy: "Password Policy"
      },
      {
        id: "req5",
        category: "Network Security",
        description: "All external traffic must pass through WAF",
        status: "met",
        evidence: "WAF implemented on all public endpoints",
        policyLink: "/policies/network-security",
        policyLanguage: "Web Application Firewall required for all external traffic",
        policy: "Network Security Policy"
      },
      {
        id: "req6",
        category: "Logging",
        description: "All system access must be logged",
        status: "met",
        evidence: "Centralized logging system implemented",
        policyLink: "/policies/logging",
        policyLanguage: "All system access events must be logged and retained",
        policy: "Logging Policy"
      },
      {
        id: "req7",
        category: "Security Audits",
        description: "Annual third-party security audits required",
        status: "unmet",
        evidence: "No current policy for third-party audits",
        policyLink: "/policies/security-audits",
        suggestion: "Implement annual third-party security audit requirement",
        suggestedPolicy: "Security Audits Policy"
      }
    ]
  },
  {
    id: "client2",
    name: "TechGiant Inc",
    contractLink: "/contracts/techgiant-2024.pdf",
    totalRequirements: 6,
    metRequirements: 5,
    unmetRequirements: 1,
    requirements: [
      {
        id: "req1",
        category: "Data Encryption",
        description: "All data must be encrypted in transit and at rest",
        status: "met",
        evidence: "End-to-end encryption implemented",
        policyLink: "/policies/encryption",
        policyLanguage: "All data must be encrypted in transit and at rest",
        policy: "Encryption Policy"
      },
      {
        id: "req2",
        category: "Access Reviews",
        description: "Quarterly access reviews required",
        status: "met",
        evidence: "Automated quarterly access reviews implemented",
        policyLink: "/policies/access-reviews",
        policyLanguage: "Access reviews must be conducted quarterly",
        policy: "Access Reviews Policy"
      },
      {
        id: "req3",
        category: "Vulnerability Scanning",
        description: "Weekly vulnerability scans required",
        status: "met",
        evidence: "Automated weekly scans configured",
        policyLink: "/policies/vulnerability-management",
        policyLanguage: "Vulnerability scans must be performed weekly",
        policy: "Vulnerability Scanning Policy"
      },
      {
        id: "req4",
        category: "Security Training",
        description: "Annual security awareness training",
        status: "met",
        evidence: "Training program implemented with tracking",
        policyLink: "/policies/security-training",
        policyLanguage: "All employees must complete annual security training",
        policy: "Security Training Policy"
      },
      {
        id: "req5",
        category: "Incident Response",
        description: "24-hour incident response time required",
        status: "met",
        evidence: "Current initial response times are set to 24 hours",
        policyLink: "/policies/incident-response",
        policyLanguage: "Incident response policy must guarantee 24-hour response time",
        policy: "Incident Response Policy"
      },
      {
        id: "req6",
        category: "Data Backup",
        description: "Hourly data backups with 99.999% durability",
        status: "unmet",
        evidence: "Current backup schedule is every 4 hours",
        policyLink: "/policies/data-backup",
        suggestion: "Upgrade backup infrastructure to support hourly backups",
        exceedsFramework: true,
        exceedingFrameworks: ["ISO 27001"],
        suggestedPolicy: "Data Backup Policy"
      }
    ]
  },
  {
    id: "client3",
    name: "Bravo Corp",
    contractLink: "/contracts/bravo-corp-2024.pdf",
    totalRequirements: 5,
    metRequirements: 4,
    unmetRequirements: 1,
    requirements: [
      {
        id: "req1",
        category: "Data Classification",
        description: "All data must be classified according to sensitivity",
        status: "met",
        evidence: "Data classification system implemented",
        policyLink: "/policies/data-classification",
        policyLanguage: "All data must be classified as Public, Internal, or Confidential",
        policy: "Data Classification Policy"
      },
      {
        id: "req2",
        category: "Device Management",
        description: "All devices must be encrypted and managed",
        status: "met",
        evidence: "MDM solution deployed across all devices",
        policyLink: "/policies/device-management",
        policyLanguage: "All devices must be enrolled in MDM",
        policy: "Device Management Policy"
      },
      {
        id: "req3",
        category: "Cloud Security",
        description: "Cloud services must be configured to enterprise security standards",
        status: "met",
        evidence: "Some cloud services lack security baselines",
        policyLink: "/policies/cloud-security",
        policyLanguage: "All cloud services must follow SOC2 compliance standards",
        policy: "Cloud Security Policy"
      },
      {
        id: "req4",
        category: "Network Monitoring",
        description: "24/7 network monitoring required",
        status: "met",
        evidence: "SOC monitoring implemented",
        policyLink: "/policies/network-monitoring",
        policyLanguage: "Networks must be monitored 24/7 by SOC",
        policy: "Network Monitoring Policy"
      },
      {
        id: "req5",
        category: "Change Management",
        description: "All changes must follow change management process",
        status: "met",
        evidence: "Change management process documented and followed",
        policyLink: "/policies/change-management",
        policyLanguage: "All changes must be approved through change management",
        policy: "Change Management Policy"
      }
    ]
  },
  {
    id: "client4",
    name: "Tech Inc",
    contractLink: "/contracts/tech-inc-2024.pdf",
    totalRequirements: 4,
    metRequirements: 3,
    unmetRequirements: 1,
    requirements: [
      {
        id: "req1",
        category: "API Security",
        description: "All APIs must use OAuth 2.0",
        status: "met",
        evidence: "OAuth 2.0 implemented across all APIs",
        policyLink: "/policies/api-security",
        policyLanguage: "OAuth 2.0 required for all API authentication",
        policy: "API Security Policy"
      },
      {
        id: "req2",
        category: "Container Security",
        description: "Container vulnerability scanning required",
        status: "met",
        evidence: "Container scanning implemented in CI/CD",
        policyLink: "/policies/container-security",
        policyLanguage: "All containers must be scanned for vulnerabilities",
        policy: "Container Security Policy"
      },
      {
        id: "req3",
        category: "Code Security",
        description: "Static code analysis required",
        status: "met",
        evidence: "SAST tools implemented in pipeline",
        policyLink: "/policies/code-security",
        policyLanguage: "All code must pass SAST analysis",
        policy: "Code Security Policy"
      },
      {
        id: "req4",
        category: "Secret Management",
        description: "Hardware security modules required for key storage",
        status: "met",
        evidence: "Currently using software-based key storage",
        policyLink: "/policies/secret-management",
        policyLanguage: "Hardware security modules required for key storage",
        policy: "Secret Management Policy"
      }
    ]
  },
  {
    id: "client5",
    name: "SecureData Ltd",
    contractLink: "/contracts/securedata-2024.pdf",
    totalRequirements: 6,
    metRequirements: 3,
    unmetRequirements: 3,
    requirements: [
      {
        id: "req1",
        category: "Data Sovereignty",
        description: "EU resident data must remain within EU borders",
        status: "met",
        evidence: "All EU resident data is stored in EU regions",
        policyLink: "/policies/data-sovereignty",
        policyLanguage: "EU resident data must remain within EU borders",
        policy: "Data Sovereignty Policy"
      },
      {
        id: "req2",
        category: "Encryption Key Rotation",
        description: "Monthly key rotation required",
        status: "met",
        evidence: "Automated key rotation implemented",
        policyLink: "/policies/key-management",
        policyLanguage: "Encryption keys must be rotated monthly",
        policy: "Encryption Key Rotation Policy"
      },
      {
        id: "req3",
        category: "Access Logging",
        description: "All access attempts must be logged",
        status: "met",
        evidence: "Comprehensive logging implemented",
        policyLink: "/policies/access-logging",
        policyLanguage: "All access attempts must be logged and reviewed",
        policy: "Access Logging Policy"
      },
      {
        id: "req4",
        category: "Data Masking",
        description: "PII must be masked in non-production environments",
        status: "met",
        evidence: "Data masking implemented in all non-production environments",
        policyLink: "/policies/data-masking",
        policyLanguage: "PII must be masked in non-production environments",
        policy: "Data Masking Policy"
      },
      {
        id: "req5",
        category: "Backup Encryption",
        description: "All backups must be encrypted",
        status: "met",
        evidence: "Backup encryption implemented",
        policyLink: "/policies/backup-security",
        policyLanguage: "All backups must be encrypted at rest",
        policy: "Backup Encryption Policy"
      },
      {
        id: "req6",
        category: "Data Loss Prevention",
        description: "DLP solution required for all data transfers",
        status: "unmet",
        evidence: "DLP not implemented for all channels",
        policyLink: "/policies/dlp",
        suggestion: "Implement comprehensive DLP solution",
        suggestedPolicy: "Data Loss Prevention Policy"
      }
    ]
  },
  {
    id: "client6",
    name: "Design Co",
    contractLink: "/contracts/design-co-2024.pdf",
    totalRequirements: 3,
    metRequirements: 2,
    unmetRequirements: 1,
    requirements: [
      {
        id: "req1",
        category: "Asset Management",
        description: "All assets must be inventoried",
        status: "met",
        evidence: "Asset management system implemented",
        policyLink: "/policies/asset-management",
        policyLanguage: "All assets must be tracked in inventory",
        policy: "Asset Management Policy"
      },
      {
        id: "req2",
        category: "Remote Access",
        description: "VPN required for remote access",
        status: "met",
        evidence: "VPN implemented for all remote access",
        policyLink: "/policies/remote-access",
        policyLanguage: "VPN required for all remote access",
        policy: "Remote Access Policy"
      },
      {
        id: "req3",
        category: "Mobile Security",
        description: "Mobile app security testing required",
        status: "met",
        evidence: "Mobile app security testing automated",
        policyLink: "/policies/mobile-security",
        policyLanguage: "Mobile app security testing must be tested by QA before production deployments",
        policy: "Mobile Security Policy"
      }
    ]
  }
] 