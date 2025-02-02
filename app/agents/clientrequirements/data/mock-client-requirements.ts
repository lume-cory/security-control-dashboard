export interface ClientRequirement {
  id: string;
  name: string;
  status: 'active' | 'pending' | 'inactive';
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
    frameworkAssociations?: Array<{
      framework: string;
      article: string;
      description: string;
      link: string;
    }>;
    regulationAssociations?: Array<{
      regulation: string;
      article: string;
      description: string;
      link: string;
    }>;
  }>;
}

export const mockClientRequirements: ClientRequirement[] = [
  {
    id: "client1",
    name: "Acme Corp",
    status: 'pending',
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
        policy: "Encryption Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.DS-1",
            description: "Data-at-rest is protected",
            link: "/frameworks/nist-csf/pr-ds-1"
          },
          {
            framework: "ISO 27001",
            article: "A.10.1.1",
            description: "Policy on the use of cryptographic controls",
            link: "/frameworks/iso27001/a-10-1-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 32",
            description: "Security of processing - encryption of personal data",
            link: "/regulations/gdpr/article-32"
          },
          {
            regulation: "HIPAA",
            article: "§164.312(a)(2)(iv)",
            description: "Encryption and decryption requirements",
            link: "/regulations/hipaa/164-312"
          }
        ]
      },
      {
        id: "req3",
        category: "Access Control",
        description: "Multi-factor authentication required for all access",
        status: "met",
        evidence: "MFA implemented across all systems",
        policyLink: "/policies/access-control",
        policyLanguage: "Multi-factor authentication is required for all user accounts",
        policy: "Access Control Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.AC-7",
            description: "Users, devices, and other assets are authenticated",
            link: "/frameworks/nist-csf/pr-ac-7"
          },
          {
            framework: "CIS Controls",
            article: "Control 6.5",
            description: "Require MFA for administrative access",
            link: "/frameworks/cis/control-6-5"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 8.3",
            description: "Secure all individual non-console administrative access using MFA",
            link: "/regulations/pci-dss/req-8-3"
          }
        ]
      },
      {
        id: "req4",
        category: "Password Policy",
        description: "Minimum 12 character passwords with complexity requirements",
        status: "met",
        evidence: "Password policy enforced through IAM",
        policyLink: "/policies/password-policy",
        policyLanguage: "Passwords must be minimum 12 characters with special characters",
        policy: "Password Policy",
        frameworkAssociations: [
          {
            framework: "NIST SP 800-63B",
            article: "5.1.1",
            description: "Memorized Secret Authenticators",
            link: "/frameworks/nist-sp-800-63b/5-1-1"
          },
          {
            framework: "CIS Controls",
            article: "Control 5.2",
            description: "Use Unique Passwords",
            link: "/frameworks/cis/control-5-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 8.2.3",
            description: "Password/Passphrase Requirements",
            link: "/regulations/pci-dss/req-8-2-3"
          }
        ]
      },
      {
        id: "req5",
        category: "Network Security",
        description: "All external traffic must pass through WAF",
        status: "met",
        evidence: "WAF implemented on all public endpoints",
        policyLink: "/policies/network-security",
        policyLanguage: "Web Application Firewall required for all external traffic",
        policy: "Network Security Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.PT-4",
            description: "Communications and control networks are protected",
            link: "/frameworks/nist-csf/pr-pt-4"
          },
          {
            framework: "ISO 27001",
            article: "A.13.1.1",
            description: "Network controls",
            link: "/frameworks/iso27001/a-13-1-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 6.6",
            description: "Address web application vulnerabilities - WAF requirement",
            link: "/regulations/pci-dss/req-6-6"
          }
        ]
      },
      {
        id: "req6",
        category: "Logging",
        description: "All system access must be logged",
        status: "met",
        evidence: "Centralized logging system implemented",
        policyLink: "/policies/logging",
        policyLanguage: "All system access events must be logged and retained",
        policy: "Logging Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.PT-1",
            description: "Audit/log records are determined, documented, implemented, and reviewed",
            link: "/frameworks/nist-csf/pr-pt-1"
          },
          {
            framework: "ISO 27001",
            article: "A.12.4.1",
            description: "Event logging",
            link: "/frameworks/iso27001/a-12-4-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "SOX",
            article: "Section 404",
            description: "System activity logging requirements",
            link: "/regulations/sox/section-404"
          },
          {
            regulation: "HIPAA",
            article: "§164.308(a)(1)(ii)(D)",
            description: "Information system activity review",
            link: "/regulations/hipaa/164-308"
          }
        ]
      },
      {
        id: "req7",
        category: "Security Audits",
        description: "Annual third-party security audits required",
        status: "unmet",
        evidence: "No current policy for third-party audits",
        policyLink: "/policies/security-audits",
        suggestion: "Implement annual third-party security audit requirement",
        suggestedPolicy: "Security Audits Policy",
        frameworkAssociations: [
          {
            framework: "ISO 27001",
            article: "A.18.2.1",
            description: "Independent review of information security",
            link: "/frameworks/iso27001/a-18-2-1"
          },
          {
            framework: "NIST CSF",
            article: "ID.RA-2",
            description: "Cyber threat intelligence is received from information sharing forums and sources",
            link: "/frameworks/nist-csf/id-ra-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "SOC 2",
            article: "CC4.1",
            description: "COSO Principle 16: Organization performs ongoing and/or separate evaluations",
            link: "/regulations/soc2/cc4-1"
          }
        ]
      }
    ]
  },
  {
    id: "client2",
    name: "TechGiant Inc",
    status: 'active',
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
        policy: "Encryption Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.DS-2",
            description: "Data in transit is protected",
            link: "/frameworks/nist-csf/pr-ds-2"
          },
          {
            framework: "ISO 27001",
            article: "A.10.1.2",
            description: "Key management",
            link: "/frameworks/iso27001/a-10-1-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "CCPA",
            article: "Section 1798.150",
            description: "Data security requirement",
            link: "/regulations/ccpa/1798-150"
          }
        ]
      },
      {
        id: "req2",
        category: "Access Reviews",
        description: "Quarterly access reviews required",
        status: "met",
        evidence: "Automated quarterly access reviews implemented",
        policyLink: "/policies/access-reviews",
        policyLanguage: "Access reviews must be conducted quarterly",
        policy: "Access Reviews Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.AC-4",
            description: "Access permissions and authorizations are managed",
            link: "/frameworks/nist-csf/pr-ac-4"
          },
          {
            framework: "ISO 27001",
            article: "A.9.2.5",
            description: "Review of user access rights",
            link: "/frameworks/iso27001/a-9-2-5"
          }
        ],
        regulationAssociations: [
          {
            regulation: "SOX",
            article: "Section 302",
            description: "Access review requirements",
            link: "/regulations/sox/section-302"
          }
        ]
      },
      {
        id: "req3",
        category: "Vulnerability Scanning",
        description: "Weekly vulnerability scans required",
        status: "met",
        evidence: "Automated weekly scans configured",
        policyLink: "/policies/vulnerability-management",
        policyLanguage: "Vulnerability scans must be performed weekly",
        policy: "Vulnerability Scanning Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "DE.CM-8",
            description: "Vulnerability scans are performed",
            link: "/frameworks/nist-csf/de-cm-8"
          },
          {
            framework: "CIS Controls",
            article: "Control 7.3",
            description: "Perform automated vulnerability scanning",
            link: "/frameworks/cis/control-7-3"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 11.2",
            description: "Run internal and external network vulnerability scans",
            link: "/regulations/pci-dss/req-11-2"
          }
        ]
      },
      {
        id: "req4",
        category: "Security Training",
        description: "Annual security awareness training",
        status: "met",
        evidence: "Training program implemented with tracking",
        policyLink: "/policies/security-training",
        policyLanguage: "All employees must complete annual security training",
        policy: "Security Training Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.AT-1",
            description: "All users are informed and trained",
            link: "/frameworks/nist-csf/pr-at-1"
          },
          {
            framework: "ISO 27001",
            article: "A.7.2.2",
            description: "Information security awareness, education and training",
            link: "/frameworks/iso27001/a-7-2-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "HIPAA",
            article: "§164.308(a)(5)",
            description: "Security awareness and training",
            link: "/regulations/hipaa/164-308"
          }
        ]
      },
      {
        id: "req5",
        category: "Incident Response",
        description: "24-hour incident response time required",
        status: "met",
        evidence: "Current initial response times are set to 24 hours",
        policyLink: "/policies/incident-response",
        policyLanguage: "Incident response policy must guarantee 24-hour response time",
        policy: "Incident Response Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "RS.RP-1",
            description: "Response plan is executed during or after an incident",
            link: "/frameworks/nist-csf/rs-rp-1"
          },
          {
            framework: "ISO 27001",
            article: "A.16.1.1",
            description: "Responsibilities and procedures",
            link: "/frameworks/iso27001/a-16-1-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 33",
            description: "Notification of personal data breach to supervisory authority",
            link: "/regulations/gdpr/article-33"
          }
        ]
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
      },
      {
        id: "req7",
        category: "Encryption",
        description: "Data must be encrypted at rest with AES-256",
        status: "met",
        evidence: "Using AES-256 encryption across all storage systems",
        policyLink: "/policies/encryption",
        policyLanguage: "All data must be encrypted at rest using AES-256",
        policy: "Encryption Policy"
      }
    ]
  },
  {
    id: "client3",
    name: "Bravo Corp",
    status: 'active',
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
        policy: "Data Classification Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "ID.AM-5",
            description: "Resources are prioritized based on classification",
            link: "/frameworks/nist-csf/id-am-5"
          },
          {
            framework: "ISO 27001",
            article: "A.8.2.1",
            description: "Classification of information",
            link: "/frameworks/iso27001/a-8-2-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 30",
            description: "Records of processing activities",
            link: "/regulations/gdpr/article-30"
          }
        ]
      },
      {
        id: "req2",
        category: "Device Management",
        description: "All devices must be encrypted and managed",
        status: "met",
        evidence: "MDM solution deployed across all devices",
        policyLink: "/policies/device-management",
        policyLanguage: "All devices must be enrolled in MDM",
        policy: "Device Management Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.AC-3",
            description: "Remote access is managed",
            link: "/frameworks/nist-csf/pr-ac-3"
          },
          {
            framework: "CIS Controls",
            article: "Control 7.1",
            description: "Ensure use of only fully supported mobile devices",
            link: "/frameworks/cis/control-7-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "HIPAA",
            article: "§164.310(d)(1)",
            description: "Device and media controls",
            link: "/regulations/hipaa/164-310"
          }
        ]
      },
      {
        id: "req3",
        category: "Cloud Security",
        description: "Cloud services must be configured to enterprise security standards",
        status: "met",
        evidence: "Some cloud services lack security baselines",
        policyLink: "/policies/cloud-security",
        policyLanguage: "All cloud services must follow SOC2 compliance standards",
        policy: "Cloud Security Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "ID.AM-4",
            description: "External information systems are catalogued",
            link: "/frameworks/nist-csf/id-am-4"
          },
          {
            framework: "ISO 27001",
            article: "A.15.1.2",
            description: "Addressing security within supplier agreements",
            link: "/frameworks/iso27001/a-15-1-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "FedRAMP",
            article: "AC-2",
            description: "Account Management",
            link: "/regulations/fedramp/ac-2"
          }
        ]
      },
      {
        id: "req4",
        category: "Network Monitoring",
        description: "24/7 network monitoring required",
        status: "met",
        evidence: "SOC monitoring implemented",
        policyLink: "/policies/network-monitoring",
        policyLanguage: "Networks must be monitored 24/7 by SOC",
        policy: "Network Monitoring Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "DE.CM-1",
            description: "The network is monitored to detect potential cybersecurity events",
            link: "/frameworks/nist-csf/de-cm-1"
          },
          {
            framework: "ISO 27001",
            article: "A.12.4.1",
            description: "Event logging and monitoring",
            link: "/frameworks/iso27001/a-12-4-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 10.6",
            description: "Review logs and security events for all system components",
            link: "/regulations/pci-dss/req-10-6"
          }
        ]
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
      },
      {
        id: "req6",
        category: "Encryption",
        description: "Data must be encrypted at rest with AES-256",
        status: "met",
        evidence: "Using AES-256 encryption across all storage systems",
        policyLink: "/policies/encryption",
        policyLanguage: "All data must be encrypted at rest using AES-256",
        policy: "Encryption Policy"
      }
    ]
  },
  {
    id: "client4",
    name: "Tech Inc",
    status: 'active',
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
        policy: "API Security Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.AC-3",
            description: "Remote access is managed",
            link: "/frameworks/nist-csf/pr-ac-3"
          },
          {
            framework: "OWASP ASVS",
            article: "V4.0",
            description: "Authentication Architecture Requirements",
            link: "/frameworks/owasp-asvs/v4-0"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PSD2",
            article: "Article 97",
            description: "Authentication and secure communication",
            link: "/regulations/psd2/article-97"
          }
        ]
      },
      {
        id: "req2",
        category: "Container Security",
        description: "Container vulnerability scanning required",
        status: "met",
        evidence: "Container scanning implemented in CI/CD",
        policyLink: "/policies/container-security",
        policyLanguage: "All containers must be scanned for vulnerabilities",
        policy: "Container Security Policy",
        frameworkAssociations: [
          {
            framework: "NIST SP 800-190",
            article: "4.1.1",
            description: "Image vulnerabilities",
            link: "/frameworks/nist-sp-800-190/4-1-1"
          },
          {
            framework: "CIS Docker Benchmark",
            article: "4.6",
            description: "Container Images and Build File",
            link: "/frameworks/cis-docker/4-6"
          }
        ],
        regulationAssociations: [
          {
            regulation: "FedRAMP",
            article: "RA-5",
            description: "Vulnerability Scanning",
            link: "/regulations/fedramp/ra-5"
          }
        ]
      },
      {
        id: "req3",
        category: "Code Security",
        description: "Static code analysis required",
        status: "met",
        evidence: "SAST tools implemented in pipeline",
        policyLink: "/policies/code-security",
        policyLanguage: "All code must pass SAST analysis",
        policy: "Code Security Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "DE.CM-4",
            description: "Malicious code is detected",
            link: "/frameworks/nist-csf/de-cm-4"
          },
          {
            framework: "OWASP SAMM",
            article: "V2.0",
            description: "Security Testing",
            link: "/frameworks/owasp-samm/v2-0"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 6.3.2",
            description: "Code review requirements",
            link: "/regulations/pci-dss/req-6-3-2"
          }
        ]
      },
      {
        id: "req4",
        category: "Secret Management",
        description: "Hardware security modules required for key storage",
        status: "met",
        evidence: "Currently using software-based key storage",
        policyLink: "/policies/secret-management",
        policyLanguage: "Hardware security modules required for key storage",
        policy: "Secret Management Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.DS-5",
            description: "Protections against data leaks are implemented",
            link: "/frameworks/nist-csf/pr-ds-5"
          },
          {
            framework: "ISO 27001",
            article: "A.10.1.2",
            description: "Key management",
            link: "/frameworks/iso27001/a-10-1-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 3.5",
            description: "Cryptographic key storage",
            link: "/regulations/pci-dss/req-3-5"
          }
        ]
      },
      {
        id: "req5",
        category: "Encryption",
        description: "Data must be encrypted at rest with AES-256",
        status: "met",
        evidence: "Using AES-256 encryption across all storage systems",
        policyLink: "/policies/encryption",
        policyLanguage: "All data must be encrypted at rest using AES-256",
        policy: "Encryption Policy"
      }
    ]
  },
  {
    id: "client5",
    name: "SecureData Ltd",
    status: 'active',
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
        policy: "Data Sovereignty Policy",
        frameworkAssociations: [
          {
            framework: "ISO 27001",
            article: "A.18.1.4",
            description: "Privacy and protection of personally identifiable information",
            link: "/frameworks/iso27001/a-18-1-4"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 44",
            description: "General principle for transfers",
            link: "/regulations/gdpr/article-44"
          },
          {
            regulation: "Schrems II",
            article: "Data Transfer Impact Assessment",
            description: "Requirements for international data transfers",
            link: "/regulations/schrems-ii/transfer-impact"
          }
        ]
      },
      {
        id: "req2",
        category: "Encryption Key Rotation",
        description: "Monthly key rotation required",
        status: "met",
        evidence: "Automated key rotation implemented",
        policyLink: "/policies/key-management",
        policyLanguage: "Encryption keys must be rotated monthly",
        policy: "Encryption Key Rotation Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.DS-5",
            description: "Key management and rotation procedures",
            link: "/frameworks/nist-csf/pr-ds-5"
          },
          {
            framework: "ISO 27001",
            article: "A.10.1.2",
            description: "Key management - key lifecycle",
            link: "/frameworks/iso27001/a-10-1-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 3.6.4",
            description: "Cryptographic key changes for keys that have reached the end of their cryptoperiod",
            link: "/regulations/pci-dss/req-3-6-4"
          }
        ]
      },
      {
        id: "req3",
        category: "Access Logging",
        description: "All access attempts must be logged",
        status: "met",
        evidence: "Comprehensive logging implemented",
        policyLink: "/policies/access-logging",
        policyLanguage: "All access attempts must be logged and reviewed",
        policy: "Access Logging Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.PT-1",
            description: "Audit/log records are determined, documented, implemented, and reviewed",
            link: "/frameworks/nist-csf/pr-pt-1"
          },
          {
            framework: "CIS Controls",
            article: "Control 8.5",
            description: "Collect Detailed Audit Logs",
            link: "/frameworks/cis/control-8-5"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 32(1)(d)",
            description: "Process for regularly testing, assessing and evaluating security measures",
            link: "/regulations/gdpr/article-32"
          }
        ]
      },
      {
        id: "req4",
        category: "Data Masking",
        description: "PII must be masked in non-production environments",
        status: "met",
        evidence: "Data masking implemented in all non-production environments",
        policyLink: "/policies/data-masking",
        policyLanguage: "PII must be masked in non-production environments",
        policy: "Data Masking Policy",
        frameworkAssociations: [
          {
            framework: "NIST SP 800-53",
            article: "SC-28",
            description: "Protection of Information at Rest",
            link: "/frameworks/nist-sp-800-53/sc-28"
          },
          {
            framework: "ISO 27001",
            article: "A.14.3.1",
            description: "Protection of test data",
            link: "/frameworks/iso27001/a-14-3-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 25",
            description: "Data protection by design and by default",
            link: "/regulations/gdpr/article-25"
          },
          {
            regulation: "CCPA",
            article: "Section 1798.140",
            description: "Definitions - Personal Information",
            link: "/regulations/ccpa/1798-140"
          }
        ]
      },
      {
        id: "req5",
        category: "Backup Encryption",
        description: "All backups must be encrypted",
        status: "met",
        evidence: "Backup encryption implemented",
        policyLink: "/policies/backup-security",
        policyLanguage: "All backups must be encrypted at rest",
        policy: "Backup Encryption Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.DS-1",
            description: "Data-at-rest is protected",
            link: "/frameworks/nist-csf/pr-ds-1"
          },
          {
            framework: "ISO 27001",
            article: "A.12.3.1",
            description: "Information backup",
            link: "/frameworks/iso27001/a-12-3-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "HIPAA",
            article: "§164.312(a)(2)(iv)",
            description: "Encryption and decryption",
            link: "/regulations/hipaa/164-312"
          }
        ]
      },
      {
        id: "req6",
        category: "Data Loss Prevention",
        description: "DLP solution required for all data transfers",
        status: "unmet",
        evidence: "DLP not implemented for all channels",
        policyLink: "/policies/dlp",
        suggestion: "Implement comprehensive DLP solution",
        suggestedPolicy: "Data Loss Prevention Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.DS-5",
            description: "Protections against data leaks are implemented",
            link: "/frameworks/nist-csf/pr-ds-5"
          },
          {
            framework: "ISO 27001",
            article: "A.13.2.1",
            description: "Information transfer policies and procedures",
            link: "/frameworks/iso27001/a-13-2-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 32",
            description: "Security of processing",
            link: "/regulations/gdpr/article-32"
          },
          {
            regulation: "CCPA",
            article: "Section 1798.150",
            description: "Private right of action for data breaches",
            link: "/regulations/ccpa/1798-150"
          }
        ]
      },
      {
        id: "req7",
        category: "Encryption",
        description: "Data must be encrypted at rest with AES-256",
        status: "met",
        evidence: "Using AES-256 encryption across all storage systems",
        policyLink: "/policies/encryption",
        policyLanguage: "All data must be encrypted at rest using AES-256",
        policy: "Encryption Policy"
      }
    ]
  },
  {
    id: "client6",
    name: "Design Co",
    status: 'active',
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
        policy: "Asset Management Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "ID.AM-1",
            description: "Physical devices and systems are inventoried",
            link: "/frameworks/nist-csf/id-am-1"
          },
          {
            framework: "ISO 27001",
            article: "A.8.1.1",
            description: "Inventory of assets",
            link: "/frameworks/iso27001/a-8-1-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "SOX",
            article: "Section 404",
            description: "Asset management and control requirements",
            link: "/regulations/sox/section-404"
          }
        ]
      },
      {
        id: "req2",
        category: "Remote Access",
        description: "VPN required for remote access",
        status: "met",
        evidence: "VPN implemented for all remote access",
        policyLink: "/policies/remote-access",
        policyLanguage: "VPN required for all remote access",
        policy: "Remote Access Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.AC-3",
            description: "Remote access is managed",
            link: "/frameworks/nist-csf/pr-ac-3"
          },
          {
            framework: "ISO 27001",
            article: "A.6.2.2",
            description: "Teleworking",
            link: "/frameworks/iso27001/a-6-2-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "HIPAA",
            article: "§164.312(e)(1)",
            description: "Transmission Security",
            link: "/regulations/hipaa/164-312"
          }
        ]
      },
      {
        id: "req3",
        category: "Mobile Security",
        description: "Mobile app security testing required",
        status: "met",
        evidence: "Mobile app security testing automated",
        policyLink: "/policies/mobile-security",
        policyLanguage: "Mobile app security testing must be tested by QA before production deployments",
        policy: "Mobile Security Policy",
        frameworkAssociations: [
          {
            framework: "OWASP MASVS",
            article: "V1.0",
            description: "Architecture, Design and Threat Modeling Requirements",
            link: "/frameworks/owasp-masvs/v1-0"
          },
          {
            framework: "NIST SP 800-124",
            article: "4.2",
            description: "Mobile Device Security Policy",
            link: "/frameworks/nist-sp-800-124/4-2"
          }
        ],
        regulationAssociations: [
          {
            regulation: "PCI DSS",
            article: "Requirement 6.5",
            description: "Address common coding vulnerabilities",
            link: "/regulations/pci-dss/req-6-5"
          }
        ]
      },
      {
        id: "req4",
        category: "Encryption",
        description: "Data must be encrypted at rest with AES-256",
        status: "met",
        evidence: "Using AES-256 encryption across all storage systems",
        policyLink: "/policies/encryption",
        policyLanguage: "All data must be encrypted at rest using AES-256",
        policy: "Encryption Policy",
        frameworkAssociations: [
          {
            framework: "NIST CSF",
            article: "PR.DS-1",
            description: "Data-at-rest is protected",
            link: "/frameworks/nist-csf/pr-ds-1"
          },
          {
            framework: "ISO 27001",
            article: "A.10.1.1",
            description: "Policy on the use of cryptographic controls",
            link: "/frameworks/iso27001/a-10-1-1"
          }
        ],
        regulationAssociations: [
          {
            regulation: "GDPR",
            article: "Article 32",
            description: "Security of processing - encryption of personal data",
            link: "/regulations/gdpr/article-32"
          }
        ]
      }
    ]
  }
] 