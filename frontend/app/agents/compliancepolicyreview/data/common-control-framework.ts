import { getRelativeDate, DemoDateOffsets } from "@/app/utils/date-utils";
import { contractualObligations } from "./contractual-obligations";
import { securityControlGroups, SecurityControlGroup } from '../../controlgroups/data/security-control-groups'


export interface CCFRequirement {
  id: string;
  name: string;
  summary: string;
  associatedRegulations: Array<{
    name: string;
    articleId: string;
    summary: string;
    link: string;
  }>;
  associatedContractualObligations: Array<{
    entity: string;
    type: string;
    category: string;
    summary: string;
    text: string[];
    link: string;
  }>;
  policies: Array<{
    id: string;
    name: string;
    description: string;
    policyText: string;
    link: string;
    status: 'active' | 'suggested';
  }>;
  impactedSystems: Array<{
    name: string;
    type: string;
    repository: string;
    team: string;
    teamContact: string;
  }>;
  nonCompliantInstances: Array<{
    system: { name: string; type: string; repository: string; team: string; teamContact: string };
    issue: string;
    mitigation: string;
    status: string;
    dueDate: string;
  }>;
  supportingEvidence?: {
    configurations: Array<{
      tool: string;
      type: string;
      evidence: {
        policyName: string;
        settings: Array<{ name: string; value: string }>;
        lastUpdated: string;
        version: string;
      };
    }>;
    metrics: Array<{
      name: string;
      current: number;
      target: number;
      trend: string;
      status: 'good' | 'bad' | 'neutral';
      breakdown?: {
        critical: number;
        high: number;
        medium: number;
        low: number;
      };
      history: Array<MetricHistory>;
    }>;
    audits: Array<{
      date: string;
      type: string;
      scope: string;
      findings: string;
      auditor: string;
    }>;
  };
  securityGroups: number[]; // Array of indices into securityControlGroups
  vulnerabilities: Array<{
    source: string;
    summary: string;
    vulnerabilities: Array<{
      name: string;
      category: string;
      date: string;
      text: string;
      impact: 'Critical' | 'High' | 'Medium' | 'Low';
      remediationSteps: string[];
      status: 'Open' | 'In Progress' | 'Resolved' | 'Accepted';
    }>;
  }>;
}

interface MetricHistory {
  date: string;
  value: number;
  breakdown?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
}

export const commonControlFrameworkData: CCFRequirement[] = [
  {
    id: 'CCF-001',
    name: 'Access Control and Authentication',
    summary: 'Secure access and authentication to organizational systems and data.',
    associatedRegulations: [
      { name: 'HIPPA', summary: 'HIPPA placeholder', link: '/regulations/hipaa/access-control', articleId: 'HIPPA-001' },
      { name: 'GDPR', summary: 'GDPR placeholder', link: '/regulations/gdpr/authentication', articleId: 'GDPR-001' },
      { name: 'SOC2 Type 1', summary: 'SOC2 Type 1 placeholder', link: '/frameworks/soc2/access', articleId: 'SOC2-001' },
      { name: 'ISO 27001', summary: 'ISO 27001 placeholder', link: '/frameworks/iso27001/access-control', articleId: 'ISO27001-001' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[2].obligations[1],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-001',
        name: 'Multi-Factor Authentication Policy',
        description: 'Requirements for MFA implementation across systems',
        policyText: 'All users must use MFA for accessing sensitive data. Biometric or hardware token required for privileged access.',
        link: '/policies/access/mfa-policy.pdf',
        status: 'active'
      },
      {
        id: 'POL-002',
        name: 'Password Management Policy',
        description: 'Password complexity and rotation requirements',
        policyText: 'Passwords must be at least 12 characters with mixed case, numbers, and symbols.',
        link: '/policies/access/password-policy.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'SSO',
        type: 'Service',
        repository: 'github.com/company/idp',
        team: 'IAM Team',
        teamContact: 'iam@company.com'
      },
      {
        name: 'Customer Portal',
        type: 'Application',
        repository: 'github.com/company/customer-portal',
        team: 'Customer Experience',
        teamContact: 'cx@company.com'
      },
      {
        name: 'Employee Portal',
        type: 'Web Application',
        repository: 'github.com/company/employee-portal',
        team: 'Internal Tools',
        teamContact: 'internal-tools@company.com'
      },
      {
        name: 'API Gateway',
        type: 'Service',
        repository: 'github.com/company/api-gateway',
        team: 'Platform',
        teamContact: 'platform@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Legacy Admin Portal',
          type: 'Application',
          repository: 'github.com/company/admin-portal',
          team: 'Platform',
          teamContact: 'platform@company.com'
        },
        issue: 'Single factor authentication only',
        mitigation: 'Implement MFA using corporate IdP',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      },
      {
        system: {
          name: 'Employee Portal',
          type: 'Web Application',
          repository: 'github.com/company/employee-portal',
          team: 'Internal Tools',
          teamContact: 'internal-tools@company.com'
        },
        issue: 'Password complexity requirements not enforced',
        mitigation: 'Update authentication service to enforce new password policy',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      },
      {
        system: {
          name: 'API Gateway',
          type: 'Service',
          repository: 'github.com/company/api-gateway',
          team: 'Platform',
          teamContact: 'platform@company.com'
        },
        issue: 'API key rotation not automated',
        mitigation: 'Implement automated key rotation system',
        status: 'Planned',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Okta',
          type: 'Identity Provider',
          evidence: {
            policyName: 'Global MFA Policy',
            settings: [
              { name: 'MFA Required', value: 'Yes' },
              { name: 'Allowed Factors', value: 'Biometric, Hardware Token' },
              { name: 'Session Length', value: '8 hours' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '2.1'
          }
        },
        {
          tool: 'Azure AD',
          type: 'Identity Provider',
          evidence: {
            policyName: 'Conditional Access',
            settings: [
              { name: 'Risk-based MFA', value: 'Enabled' },
              { name: 'Location-based Access', value: 'Enforced' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '3.0'
          }
        }
      ],
      metrics: [
        {
          name: 'MFA Adoption Rate',
          current: 94,
          target: 100,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 85 },
            { date: getRelativeDate(-60), value: 90 },
            { date: getRelativeDate(-30), value: 94 }
          ]
        },
        {
          name: 'Failed Authentication Attempts',
          current: 2.3,
          target: 5,
          trend: 'decreasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 4.2 },
            { date: getRelativeDate(-60), value: 3.1 },
            { date: getRelativeDate(-30), value: 2.3 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Internal',
          scope: 'Access Control Review',
          findings: 'MFA compliance at 94%. Legacy system remediation in progress.',
          auditor: 'Security Team'
        },
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'External',
          scope: 'SOC2 Type 1',
          findings: 'Access control policies meet SOC2 requirements. Minor findings in legacy systems.',
          auditor: 'Ernst & Young'
        }
      ]
    },
    securityGroups: [0, 5], // References "Access Management" and "Provisioning"
    vulnerabilities: [
      {
        source: 'SonarQube',
        summary: 'Authentication Bypass',
        vulnerabilities: [
          {
            name: 'CVE-2023-1234',
            category: 'Authentication Bypass',
            date: getRelativeDate(-15),
            text: 'Authentication bypass in SSO service due to improper session validation',
            impact: 'Critical',
            remediationSteps: [
              'Update session validation logic in auth middleware',
              'Implement session fingerprinting',
              'Add IP-based session binding',
              'Deploy hotfix to SSO service'
            ],
            status: 'In Progress'
          },
          {
            name: 'CVE-2023-5678',
            category: 'Plain Text Credentials',
            date: getRelativeDate(-10),
            text: 'Plaintext passwords exposed in Employee Portal logs',
            impact: 'High',
            remediationSteps: [
              'Update logging filters to mask sensitive data',
              'Rotate exposed credentials',
              'Implement log sanitization middleware',
              'Audit existing logs for exposure'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Snyk',
        summary: 'Weak Authentication',
        vulnerabilities: [
          {
            name: 'SNYK-JS-AUTH-789',
            category: 'Weak Password Policy',
            date: getRelativeDate(-5),
            text: 'Password policy in Customer Portal allows weak passwords',
            impact: 'High',
            remediationSteps: [
              'Update password validation rules',
              'Force password reset for non-compliant accounts',
              'Enable password strength meter',
              'Add breached password check'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-002',
    name: 'Data Encryption and Protection',
    summary: 'Ensure secure encryption and protection of organizational and stakeholder data.',
    associatedRegulations: [
      { name: 'HIPPA', summary: 'HIPPA placeholder', link: '/regulations/hipaa/encryption', articleId: 'HIPPA-002' },
      { name: 'GDPR', summary: 'GDPR placeholder', link: '/regulations/gdpr/data-protection', articleId: 'GDPR-002' },
      { name: 'NIS2', summary: 'NIS2 placeholder', link: '/regulations/nis2/encryption', articleId: 'NIS2-001' },
      { name: 'DORA', summary: 'DORA placeholder', link: '/regulations/dora/data-security', articleId: 'DORA-001' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[0].obligations[1],
        entity: contractualObligations[0].entity
      },
      {
        ...contractualObligations[1].obligations[1],
        entity: contractualObligations[1].entity
      },
      {
        ...contractualObligations[2].obligations[0],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-003',
        name: 'Data Encryption Standards',
        description: 'Requirements for data encryption at rest and in transit',
        policyText: 'All sensitive data must be encrypted using AES-256 at rest and TLS 1.3 in transit.',
        link: '/policies/security/encryption-standards.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Data Lake',
        type: 'Service',
        repository: 'github.com/company/data-lake',
        team: 'Data Platform',
        teamContact: 'data-platform@company.com'
      },
      {
        name: 'Payment Processing Service',
        type: 'Service',
        repository: 'github.com/company/payment-service',
        team: 'Financial Systems',
        teamContact: 'finance-systems@company.com'
      },
      {
        name: 'Backup System',
        type: 'Infrastructure',
        repository: 'github.com/company/backup-system',
        team: 'Infrastructure',
        teamContact: 'infra@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Data Lake',
          type: 'Service',
          repository: 'github.com/company/data-lake',
          team: 'Data Platform',
          teamContact: 'data-platform@company.com'
        },
        issue: 'Legacy TLS 1.2 still in use',
        mitigation: 'Upgrade to TLS 1.3 across all endpoints',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      },
      {
        system: {
          name: 'Payment Processing Service',
          type: 'Service',
          repository: 'github.com/company/payment-service',
          team: 'Financial Systems',
          teamContact: 'finance-systems@company.com'
        },
        issue: 'Legacy TLS 1.2 still in use',
        mitigation: 'Upgrade to TLS 1.3 across all endpoints',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      },
      {
        system: {
          name: 'Backup System',
          type: 'Infrastructure',
          repository: 'github.com/company/backup-system',
          team: 'Infrastructure',
          teamContact: 'infra@company.com'
        },
        issue: 'Backup encryption keys not rotated regularly',
        mitigation: 'Implement automated key rotation schedule',
        status: 'Not Started',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'AWS KMS',
          type: 'Encryption Service',
          evidence: {
            policyName: 'Key Rotation Policy',
            settings: [
              { name: 'Automatic Rotation', value: 'Enabled' },
              { name: 'Rotation Period', value: '90 days' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.2'
          }
        }
      ],
      metrics: [
        {
          name: 'Encryption Coverage',
          current: 100,
          target: 100,
          trend: 'stable',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 100 },
            { date: getRelativeDate(-60), value: 100 },
            { date: getRelativeDate(-30), value: 100 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Automated',
          scope: 'Encryption Configuration',
          findings: 'All systems compliant with encryption standards',
          auditor: 'Security Automation'
        }
      ]
    },
    securityGroups: [1, 6, 7], // References data protection, endpoint protection and data storage
    vulnerabilities: [
      {
        source: 'Qualys',
        summary: 'Encryption Weaknesses',
        vulnerabilities: [
          {
            name: 'CVE-2023-7890',
            category: 'Weak Encryption',
            date: getRelativeDate(-12),
            text: 'Legacy TLS 1.2 in use on payment processing endpoints',
            impact: 'High',
            remediationSteps: [
              'Upgrade to TLS 1.3',
              'Update cipher suite configuration',
              'Disable legacy protocols',
              'Test payment processing after upgrade'
            ],
            status: 'In Progress'
          },
          {
            name: 'CVE-2023-8901',
            category: 'Key Management',
            date: getRelativeDate(-8),
            text: 'Encryption keys not rotated according to policy',
            impact: 'Critical',
            remediationSteps: [
              'Implement automated key rotation',
              'Update key management service',
              'Rotate all existing keys',
              'Verify no service disruption'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'AWS Security Hub',
        summary: 'Data Protection',
        vulnerabilities: [
          {
            name: 'AWS-KMS-001',
            category: 'Data at Rest',
            date: getRelativeDate(-5),
            text: 'Unencrypted S3 buckets containing sensitive data',
            impact: 'Critical',
            remediationSteps: [
              'Enable default encryption',
              'Encrypt existing objects',
              'Update bucket policies',
              'Monitor encryption status'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-003',
    name: 'Vulnerability Management and Patch Management',
    summary: 'Ensuring timely identification and remediation of system vulnerabilities through regular scanning and patch updates.',
    associatedRegulations: [
      { name: 'NIST CSF 2.0', summary: 'Guidelines for vulnerability identification and remediation', link: '/regulations/nist/vulnerability', articleId: 'NISTCSF-003' },
      { name: 'ISO 27001', summary: 'Standards for vulnerability management', link: '/frameworks/iso27001/vulnerability', articleId: 'ISO27001-002' },
      { name: 'SOC2 Type 1', summary: 'Requirements for vulnerability scanning', link: '/frameworks/soc2/vulnerability', articleId: 'SOC2-002' },
      { name: 'NIS2', summary: 'Vulnerability management in critical infrastructure', link: '/regulations/nis2/vulnerability', articleId: 'NIS2-002' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[1].obligations[2],
        entity: contractualObligations[1].entity
      },
      {
        ...contractualObligations[3].obligations[3],
        entity: contractualObligations[3].entity
      },
    ],
    policies: [
      {
        id: 'POL-004',
        name: 'Vulnerability Scanning and Remediation Policy',
        description: 'Policy outlining regular vulnerability scans and remediation timelines.',
        policyText: 'All systems must undergo vulnerability scans at least weekly with remediation of critical issues within 7 days.',
        link: '/policies/security/vulnerability-policy.pdf',
        status: 'active'
      },
      {
        id: 'POL-005',
        name: 'Patch Management Policy',
        description: 'Standards for applying security patches in a timely manner.',
        policyText: 'Patches for critical vulnerabilities must be applied within 48 hours, and non-critical patches within 30 days.',
        link: '/policies/security/patch-policy.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'Enterprise Scanner',
        type: 'Tool',
        repository: 'github.com/company/enterprise-scanner',
        team: 'Security Operations',
        teamContact: 'secops@company.com'
      },
      {
        name: 'Web Application',
        type: 'Application',
        repository: 'github.com/company/web-app',
        team: 'Web Team',
        teamContact: 'web@company.com'
      }, 
      {
        name: 'iOS Application',
        type: 'Mobile Application',
        repository: 'github.com/company/mobile-app',
        team: 'Mobile Team',
        teamContact: 'mobile-dev@company.com'
      }, 
      {
        name: 'Authentication Service',
        type: 'IAM',
        repository: 'github.com/company/auth-service',
        team: 'IAM Development',
        teamContact: 'iam-dev@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Web Application',
          type: 'Application',
          repository: 'github.com/company/web-app',
          team: 'Web Team',
          teamContact: 'web@company.com'
        },
        issue: 'Outdated patch levels observed on several endpoints',
        mitigation: 'Schedule immediate patch updates and verify with automated scanning',
        status: 'Not Started',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Veracode',
          type: 'Static Application Security Testing',
          evidence: {
            policyName: 'Enterprise SAST Policy',
            settings: [
              { name: 'Scan Frequency', value: 'On every merge to main' },
              { name: 'Critical Severity Gate', value: 'Block deployment' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '2.1'
          }
        },
        {
          tool: 'Black Duck',
          type: 'Software Composition Analysis',
          evidence: {
            policyName: 'SCA Policy',
            settings: [
              { name: 'License Compliance', value: 'Enabled' },
              { name: 'Vulnerability Scanning', value: 'Daily' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '3.0'
          }
        },
        {
          tool: 'External Penetration Testing',
          type: 'Security Assessment',
          evidence: {
            policyName: 'Annual Pentest Program',
            settings: [
              { name: 'Frequency', value: 'Annual' },
              { name: 'Scope', value: 'All external-facing systems' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Vulnerability MTTR',
          current: 5.2,
          target: 3,
          trend: 'decreasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 6.8 },
            { date: getRelativeDate(-60), value: 5.9 },
            { date: getRelativeDate(-30), value: 5.2 }
          ]
        },
        {
          name: 'High Vulnerability MTTR',
          current: 12.4,
          target: 7,
          trend: 'stable',
          status: 'neutral',
          history: [
            { date: getRelativeDate(-90), value: 12.1 },
            { date: getRelativeDate(-60), value: 12.6 },
            { date: getRelativeDate(-30), value: 12.4 }
          ]
        },
        {
          name: 'Medium Vulnerability MTTR',
          current: 25.8,
          target: 15,
          trend: 'increasing',
          status: 'bad',
          history: [
            { date: getRelativeDate(-90), value: 22.3 },
            { date: getRelativeDate(-60), value: 24.1 },
            { date: getRelativeDate(-30), value: 25.8 }
          ]
        },
        {
          name: 'Low Vulnerability MTTR',
          current: 45.2,
          target: 30,
          trend: 'stable',
          status: 'neutral',
          history: [
            { date: getRelativeDate(-90), value: 44.8 },
            { date: getRelativeDate(-60), value: 45.5 },
            { date: getRelativeDate(-30), value: 45.2 }
          ]
        },
        {
          name: 'SLA Breached Vulnerabilities',
          current: 23,
          target: 0,
          trend: 'increasing',
          status: 'bad',
          history: [
            { date: getRelativeDate(-90), value: 18 },
            { date: getRelativeDate(-60), value: 21 },
            { date: getRelativeDate(-30), value: 23 }
          ]
        },
        {
          name: 'SLA Breached by Severity',
          current: 23,
          target: 0,
          trend: 'increasing',
          status: 'bad',
          breakdown: {
            critical: 2,
            high: 7,
            medium: 9,
            low: 5
          },
          history: [
            { date: getRelativeDate(-90), value: 18, breakdown: { critical: 1, high: 5, medium: 8, low: 4 } },
            { date: getRelativeDate(-60), value: 21, breakdown: { critical: 2, high: 6, medium: 8, low: 5 } },
            { date: getRelativeDate(-30), value: 23, breakdown: { critical: 2, high: 7, medium: 9, low: 5 } }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'External',
          scope: 'Security Controls',
          findings: 'Minor findings in encryption key rotation',
          auditor: 'Security Team'
        }
      ]
    },
    securityGroups: [3, 6], // References incident response and enpoint protection
    vulnerabilities: [
      {
        source: 'Tenable',
        summary: 'Patch Management Issues',
        vulnerabilities: [
          {
            name: 'CVE-2023-4567', 
            category: 'Missing Security Updates',
            date: getRelativeDate(-15),
            text: 'Critical security patches missing on multiple production servers',
            impact: 'Critical',
            remediationSteps: [
              'Deploy latest security patches',
              'Update patch management system',
              'Verify patch installation',
              'Document exceptions'
            ],
            status: 'In Progress'
          },
          {
            name: 'CVE-2023-4568',
            category: 'Outdated Software',
            date: getRelativeDate(-10),
            text: 'End-of-life software versions running in production',
            impact: 'High',
            remediationSteps: [
              'Identify all EOL software',
              'Create upgrade schedule',
              'Test upgrades in staging',
              'Deploy to production'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Rapid7',
        summary: 'System Vulnerabilities',
        vulnerabilities: [
          {
            name: 'CVE-2023-4569',
            category: 'System Configuration',
            date: getRelativeDate(-7),
            text: 'Misconfigured security settings on development servers',
            impact: 'Medium',
            remediationSteps: [
              'Review security baselines',
              'Update system configurations',
              'Implement configuration monitoring',
              'Document changes'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-004',
    name: 'Incident Response and Reporting',
    summary: 'A structured approach for the timely detection, response, and communication of security incidents.',
    associatedRegulations: [
      { name: 'DORA', summary: 'Incident management and reporting requirements', link: '/regulations/dora/incident-response', articleId: 'DORA-002' },
      { name: 'NY DFS', summary: 'Guidelines for incident response protocols', link: '/regulations/nydfs/incident', articleId: 'NYDFS-001' },
      { name: 'EU Cyber Resilience Act', summary: 'Standards for cyber incident management', link: '/regulations/eu-cyber/incident', articleId: 'EUCRA-001' },
      { name: 'NIST CSF 2.0', summary: 'Incident response guidelines', link: '/regulations/nist/incident-response', articleId: 'NISTCSF-004' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[0].obligations[1],
        entity: contractualObligations[0].entity
      },
      {
        ...contractualObligations[1].obligations[0],
        entity: contractualObligations[1].entity
      },
      {
        ...contractualObligations[3].obligations[1],
        entity: contractualObligations[3].entity
      },
    ],
    policies: [
      {
        id: 'POL-006',
        name: 'Incident Response Policy',
        description: 'Outlines the roles, responsibilities, and procedures for incident response.',
        policyText: 'All incidents must be reported within 15 minutes of detection. Incident response teams will assess and mitigate issues immediately.',
        link: '/policies/incident/response-policy.pdf',
        status: 'active'
      },
      {
        id: 'POL-007',
        name: 'Security Breach Notification Policy',
        description: 'Guidelines for notifying stakeholders in the event of a breach.',
        policyText: 'Breach notifications must be sent to affected parties within 72 hours as per regulatory requirements.',
        link: '/policies/incident/notification-policy.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'SIEM System',
        type: 'System',
        repository: 'github.com/company/siem',
        team: 'Security Operations',
        teamContact: 'secops@company.com'
      },
      {
        name: 'Incident Management Portal',
        type: 'Application',
        repository: 'github.com/company/incident-portal',
        team: 'IT Operations',
        teamContact: 'ops@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Incident Management Portal',
          type: 'Application',
          repository: 'github.com/company/incident-portal',
          team: 'IT Operations',
          teamContact: 'ops@company.com'
        },
        issue: 'Delayed incident reporting and lack of automated alerts',
        mitigation: 'Upgrade logging system and integrate automated alerting',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Splunk',
          type: 'SIEM',
          evidence: {
            policyName: 'Incident Logging Configuration',
            settings: [
              { name: 'Alert Sensitivity', value: 'High' },
              { name: 'Response Automation', value: 'Enabled' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '2.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Mean Time to Respond (MTTR)',
          current: 45,
          target: 30,
          trend: 'decreasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 60 },
            { date: getRelativeDate(-60), value: 50 },
            { date: getRelativeDate(-30), value: 45 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Internal',
          scope: 'Incident Response Drill',
          findings: 'Response times improved; recommendations made to further automate detection.',
          auditor: 'Security Team'
        }
      ]
    },
    securityGroups: [3], // References incident response
    vulnerabilities: [
      {
        source: 'Splunk',
        summary: 'Alert Management',
        vulnerabilities: [
          {
            name: 'SPLK-2023-001',
            category: 'Alert Latency',
            date: getRelativeDate(-7),
            text: 'Critical alert notifications delayed by up to 15 minutes',
            impact: 'Critical',
            remediationSteps: [
              'Optimize alert pipeline configuration',
              'Increase alert processing resources',
              'Implement redundant notification paths',
              'Add alert delivery monitoring'
            ],
            status: 'In Progress'
          },
          {
            name: 'SPLK-2023-002',
            category: 'Log Coverage',
            date: getRelativeDate(-5),
            text: 'Missing log sources from critical systems',
            impact: 'High',
            remediationSteps: [
              'Deploy log forwarders to all critical systems',
              'Verify log ingestion paths',
              'Update log source inventory',
              'Configure log completeness monitoring'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'PagerDuty',
        summary: 'Incident Response',
        vulnerabilities: [
          {
            name: 'PD-2023-123',
            category: 'Response Time',
            date: getRelativeDate(-3),
            text: 'Incident escalation paths not following SLA requirements',
            impact: 'High',
            remediationSteps: [
              'Update escalation policies',
              'Configure SLA-based auto-escalation',
              'Train response teams on new procedures',
              'Implement response time tracking'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-005',
    name: 'Data Retention and Secure Disposal',
    summary: 'Guidelines for retaining data in compliance with legal requirements and ensuring secure disposal of outdated data.',
    associatedRegulations: [
      { name: 'GDPR', summary: 'Data retention guidelines for personal data', link: '/regulations/gdpr/retention', articleId: 'GDPR-003' },
      { name: 'CCPA', summary: 'Consumer data retention and disposal requirements', link: '/regulations/ccpa/retention', articleId: 'CCPA-001' },
      { name: 'HIPPA', summary: 'Retention of protected health information', link: '/regulations/hipaa/retention', articleId: 'HIPPA-003' },
      { name: 'UK GDPR', summary: 'Retention and secure deletion standards for personal data', link: '/regulations/uk-gdpr/retention', articleId: 'UKGDPR-001' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[0].obligations[3],
        entity: contractualObligations[0].entity
      },
      {
        ...contractualObligations[1].obligations[3],
        entity: contractualObligations[1].entity
      },
      {
        ...contractualObligations[2].obligations[3],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-008',
        name: 'Data Retention Policy',
        description: 'Policy for retaining data in accordance with regulatory requirements.',
        policyText: 'Data must be retained for a minimum period defined by regulatory standards and securely disposed thereafter.',
        link: '/policies/data/retention-policy.pdf',
        status: 'active'
      },
      {
        id: 'POL-009',
        name: 'Data Disposal Procedure',
        description: 'Procedure for the secure disposal of data that is no longer required.',
        policyText: 'Data marked for disposal must be sanitized or physically destroyed based on its classification.',
        link: '/policies/data/disposal-procedure.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'Data Warehouse',
        type: 'Database',
        repository: 'github.com/company/data-warehouse',
        team: 'Data Management',
        teamContact: 'datamanagement@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Data Warehouse',
          type: 'Database',
          repository: 'github.com/company/data-warehouse',
          team: 'Data Management',
          teamContact: 'datamanagement@company.com'
        },
        issue: 'Data retention schedules are not enforced automatically',
        mitigation: 'Implement automated deletion scripts based on retention policy',
        status: 'Not Started',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Informatica',
          type: 'Data Management',
          evidence: {
            policyName: 'Data Lifecycle Configuration',
            settings: [
              { name: 'Retention Period', value: '5 years' },
              { name: 'Disposal Method', value: 'Automated Script' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Data Disposal Compliance',
          current: 80,
          target: 100,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 70 },
            { date: getRelativeDate(-60), value: 75 },
            { date: getRelativeDate(-30), value: 80 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'External',
          scope: 'Data Retention Review',
          findings: 'Retention schedules are defined; execution needs improvement.',
          auditor: 'External Auditor'
        }
      ]
    },
    securityGroups: [7], // References data storage
    vulnerabilities: [
      {
        source: 'Forcepoint - DLP',
        summary: 'Data Retention Issues',
        vulnerabilities: [
          {
            name: 'DLP-2023-001',
            category: 'Data Lifecycle',
            date: getRelativeDate(-20),
            text: 'Customer data retained beyond retention period in analytics database',
            impact: 'High',
            remediationSteps: [
              'Identify affected data records',
              'Execute deletion scripts',
              'Verify data removal',
              'Document deletion process'
            ],
            status: 'Open'
          },
          {
            name: 'DLP-2023-002', 
            category: 'Data Classification',
            date: getRelativeDate(-15),
            text: 'Sensitive data stored in non-compliant storage locations',
            impact: 'Critical',
            remediationSteps: [
              'Scan for misplaced sensitive data',
              'Move data to approved storage',
              'Update data handling procedures',
              'Train teams on proper storage'
            ],
            status: 'In Progress'
          }
        ]
      },
      {
        source: 'Atlan - Data Governance',
        summary: 'Data Management Compliance',
        vulnerabilities: [
          {
            name: 'DG-2023-003',
            category: 'Data Disposal',
            date: getRelativeDate(-10),
            text: 'Automated data disposal scripts failing on legacy systems',
            impact: 'Medium',
            remediationSteps: [
              'Debug disposal script errors',
              'Update scripts for legacy systems',
              'Test disposal process',
              'Monitor execution'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-006',
    name: 'Third-Party Risk Management and Vendor Security',
    summary: 'Assessment and management of risks associated with third-party vendors and supply chain partners.',
    associatedRegulations: [
      { name: 'SOC2 Type 1', summary: 'Vendor risk assessment requirements', link: '/frameworks/soc2/vendor-risk', articleId: 'SOC2-003' },
      { name: 'ISO 27001', summary: 'Third-party security requirements', link: '/frameworks/iso27001/third-party', articleId: 'ISO27001-003' },
      { name: 'NIS2', summary: 'Supply chain security guidelines', link: '/regulations/nis2/supply-chain', articleId: 'NIS2-003' },
      { name: 'SEBI', summary: 'Outsourcing and vendor oversight standards', link: '/regulations/sebi/vendor-risk', articleId: 'SEBI-001' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[2].obligations[5],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-010',
        name: 'Vendor Risk Assessment Policy',
        description: 'Policy for evaluating and managing risks from third-party vendors.',
        policyText: 'All vendors must undergo a security assessment prior to engagement and on an annual basis thereafter.',
        link: '/policies/vendor/vendor-risk-policy.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Vendor Management System',
        type: 'Application',
        repository: 'github.com/company/vendor-mgmt',
        team: 'Procurement',
        teamContact: 'procurement@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Vendor Management System',
          type: 'Application',
          repository: 'github.com/company/vendor-mgmt',
          team: 'Procurement',
          teamContact: 'procurement@company.com'
        },
        issue: 'Incomplete vendor security assessments in system records',
        mitigation: 'Review outstanding assessments and update risk scores',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'ServiceNow',
          type: 'GRC Tool',
          evidence: {
            policyName: 'Vendor Risk Configuration',
            settings: [
              { name: 'Assessment Frequency', value: 'Annual' },
              { name: 'Risk Scoring Model', value: 'Automated' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.1'
          }
        }
      ],
      metrics: [
        {
          name: 'Third-Party Assessment Completion',
          current: 70,
          target: 100,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 60 },
            { date: getRelativeDate(-60), value: 65 },
            { date: getRelativeDate(-30), value: 70 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Internal',
          scope: 'Vendor Risk Management',
          findings: 'Several vendors pending assessments; process improvements recommended.',
          auditor: 'Internal Audit Team'
        }
      ]
    },
    securityGroups: [0, 1, 3, 4, 5, 7], // References security awareness, data storage, access management and provisioning, data protection, endpoint protection and incident response
    vulnerabilities: [
      {
        source: 'OneTrust - Vendor Risk Management',
        summary: 'Vendor Access Control Issues',
        vulnerabilities: [
          {
            name: 'CVE-2023-9901',
            category: 'Access Control',
            date: getRelativeDate(-20),
            text: 'Vendor portal lacking proper access restrictions',
            impact: 'Critical',
            remediationSteps: [
              'Implement role-based access control',
              'Add MFA requirement for vendor access',
              'Review and revoke unnecessary access',
              'Update access policies'
            ],
            status: 'In Progress'
          },
          {
            name: 'CVE-2023-9902', 
            category: 'Third Party Risk',
            date: getRelativeDate(-15),
            text: 'Incomplete vendor security assessment records',
            impact: 'High',
            remediationSteps: [
              'Complete missing vendor assessments',
              'Update risk scoring model',
              'Document vendor security requirements',
              'Implement continuous monitoring'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Internal Audit',
        summary: 'Vendor Management Gaps',
        vulnerabilities: [
          {
            name: 'AUDIT-2023-112',
            category: 'Process',
            date: getRelativeDate(-10),
            text: 'Inconsistent vendor offboarding procedures',
            impact: 'Medium',
            remediationSteps: [
              'Document offboarding checklist',
              'Automate access revocation',
              'Implement vendor exit reviews',
              'Create audit trail requirements'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-007',
    name: 'Change Management and Configuration Control',
    summary: 'Formal procedures for managing changes to IT systems and configurations to ensure security and operational stability.',
    associatedRegulations: [
      { name: 'NIST CSF 2.0', summary: 'Change management guidelines', link: '/regulations/nist/change-management', articleId: 'NISTCSF-005' },
      { name: 'ISO 27001', summary: 'Configuration management requirements', link: '/frameworks/iso27001/configuration', articleId: 'ISO27001-004' },
      { name: 'DORA', summary: 'Change control protocols for operational resilience', link: '/regulations/dora/change-control', articleId: 'DORA-003' }
    ],
    associatedContractualObligations: [],
    policies: [
      {
        id: 'POL-011',
        name: 'Change Management Policy',
        description: 'Policy outlining procedures for initiating, reviewing, and approving changes to IT systems.',
        policyText: 'All changes must follow the defined approval workflow with documented risk assessments and post-implementation reviews.',
        link: '/policies/change/change-management.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Configuration Management Database (CMDB)',
        type: 'Database',
        repository: 'github.com/company/cmdb',
        team: 'IT Operations',
        teamContact: 'ops@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'CMDB',
          type: 'Database',
          repository: 'github.com/company/cmdb',
          team: 'IT Operations',
          teamContact: 'ops@company.com'
        },
        issue: 'Untracked configuration changes leading to drift',
        mitigation: 'Implement automated change logging and reconciliation',
        status: 'Not Started',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'ServiceNow',
          type: 'Change Management Module',
          evidence: {
            policyName: 'Change Control Settings',
            settings: [
              { name: 'Approval Workflow', value: 'Enabled' },
              { name: 'Emergency Change Process', value: 'Documented' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '2.2'
          }
        }
      ],
      metrics: [
        {
          name: 'Change Implementation Success Rate',
          current: 95,
          target: 100,
          trend: 'stable',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 93 },
            { date: getRelativeDate(-60), value: 94 },
            { date: getRelativeDate(-30), value: 95 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Internal',
          scope: 'Change Management Review',
          findings: 'Minor deviations in emergency changes; overall process effective.',
          auditor: 'Change Advisory Board'
        }
      ]
    },
    securityGroups: [2], // References network security
    vulnerabilities: [
      {
        source: 'ServiceNow Vulnerability Response',
        summary: 'Change Management Issues',
        vulnerabilities: [
          {
            name: 'CHG-2023-001',
            category: 'Change Control',
            date: getRelativeDate(-15),
            text: 'Unauthorized changes detected in production environment',
            impact: 'High',
            remediationSteps: [
              'Review change management process',
              'Implement automated change detection',
              'Enforce approval workflows',
              'Audit unauthorized changes'
            ],
            status: 'In Progress'
          },
          {
            name: 'CHG-2023-002',
            category: 'Configuration Management',
            date: getRelativeDate(-10),
            text: 'Configuration drift detected across multiple systems',
            impact: 'Medium',
            remediationSteps: [
              'Deploy configuration management tool',
              'Establish baseline configurations',
              'Implement drift detection',
              'Schedule regular audits'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'BMC Helix',
        summary: 'Process Compliance',
        vulnerabilities: [
          {
            name: 'ITIL-2023-003',
            category: 'Change Documentation',
            date: getRelativeDate(-7),
            text: 'Incomplete change documentation for emergency changes',
            impact: 'Medium',
            remediationSteps: [
              'Update emergency change procedure',
              'Train staff on documentation requirements',
              'Implement post-change review process',
              'Monitor compliance'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-008',
    name: 'AI System Governance and Ethical Standards',
    summary: 'Governance framework for AI systems ensuring ethical usage, transparency, and compliance with emerging AI regulations.',
    associatedRegulations: [
      { name: 'EU AI Act', summary: 'Regulations for high-risk AI systems and transparency', link: '/regulations/eu-ai/act', articleId: 'EUAI-001' },
      { name: 'ISO 42001', summary: 'Standards for AI governance and risk management', link: '/frameworks/iso42001/ai-governance', articleId: 'ISO42001-001' },
      { name: 'NIST AI RMF', summary: 'AI risk management framework guidelines', link: '/regulations/nist-ai/rmf', articleId: 'NIST-AIRM-001' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[2].obligations[2],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-012',
        name: 'AI Governance Policy',
        description: 'Policy for overseeing the development and deployment of AI systems.',
        policyText: 'All AI systems must undergo ethical review, include explainability features, and adhere to transparency guidelines as defined by the organization.',
        link: '/policies/ai/ai-governance.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'AI Analytics Platform',
        type: 'Application',
        repository: 'github.com/company/ai-platform',
        team: 'Data Science',
        teamContact: 'datascience@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'AI Analytics Platform',
          type: 'Application',
          repository: 'github.com/company/ai-platform',
          team: 'Data Science',
          teamContact: 'datascience@company.com'
        },
        issue: 'Lack of transparency in AI decision logs',
        mitigation: 'Integrate comprehensive audit logging for AI decision processes',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'TensorFlow Extended',
          type: 'ML Ops',
          evidence: {
            policyName: 'AI Audit Logging Config',
            settings: [
              { name: 'Log Retention', value: '180 days' },
              { name: 'Anomaly Detection', value: 'Enabled' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.0'
          }
        }
      ],
      metrics: [
        {
          name: 'AI Explainability Score',
          current: 65,
          target: 90,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 50 },
            { date: getRelativeDate(-60), value: 58 },
            { date: getRelativeDate(-30), value: 65 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'External',
          scope: 'AI Ethics Review',
          findings: 'Policy aligns with EU AI Act; improvements needed in transparency metrics.',
          auditor: 'Independent AI Auditor'
        }
      ]
    },
    securityGroups: [0, 1, 4, 5, 7], 
    vulnerabilities: [
      {
        source: 'Liminal',
        summary: 'AI Model Vulnerabilities',
        vulnerabilities: [
          {
            name: 'AI-2023-001',
            category: 'Model Security',
            date: getRelativeDate(-25),
            text: 'Insufficient access controls on AI model training data',
            impact: 'Critical',
            remediationSteps: [
              'Implement role-based access control for training data',
              'Add audit logging for data access',
              'Encrypt training datasets at rest',
              'Review access permissions'
            ],
            status: 'In Progress'
          },
          {
            name: 'AI-2023-002',
            category: 'Model Transparency',
            date: getRelativeDate(-20),
            text: 'Lack of explainability metrics for critical AI decisions',
            impact: 'High',
            remediationSteps: [
              'Implement SHAP value tracking',
              'Add feature importance logging',
              'Create decision audit trail',
              'Document model logic'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Microsoft Azure ML',
        summary: 'Model Governance Issues',
        vulnerabilities: [
          {
            name: 'MLG-2023-003',
            category: 'Compliance',
            date: getRelativeDate(-15),
            text: 'AI model versioning and tracking not meeting audit requirements',
            impact: 'Medium',
            remediationSteps: [
              'Implement model version control',
              'Add model performance tracking',
              'Create model deployment logs',
              'Document model lineage'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-009',
    name: 'Security Training and Awareness',
    summary: 'A comprehensive program to educate employees on security best practices and threat awareness.',
    associatedRegulations: [
      { name: 'SOC2 Type 1', summary: 'Employee security training requirements', link: '/frameworks/soc2/training', articleId: 'SOC2-004' },
      { name: 'ISO 27001', summary: 'Information security awareness training', link: '/frameworks/iso27001/training', articleId: 'ISO27001-005' },
      { name: 'NIST CSF 2.0', summary: 'Security training and education guidelines', link: '/regulations/nist/training', articleId: 'NISTCSF-006' },
      { name: 'CCPA', summary: 'Privacy awareness training for handling consumer data', link: '/regulations/ccpa/training', articleId: 'CCPA-002' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[0].obligations[2],
        entity: contractualObligations[0].entity
      },
      {
        ...contractualObligations[3].obligations[2],
        entity: contractualObligations[3].entity
      },
    ],
    policies: [
      {
        id: 'POL-013',
        name: 'Security Awareness Training Policy',
        description: 'Policy outlining mandatory security awareness training for all employees.',
        policyText: 'All employees must complete security awareness training annually with refresher courses as needed.',
        link: '/policies/training/security-awareness.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Learning Management System',
        type: 'Application',
        repository: 'github.com/company/lms',
        team: 'HR',
        teamContact: 'hr@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Learning Management System',
          type: 'Application',
          repository: 'github.com/company/lms',
          team: 'HR',
          teamContact: 'hr@company.com'
        },
        issue: 'Incomplete training records for several departments',
        mitigation: 'Enroll remaining employees in the mandatory security training course',
        status: 'Not Started',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Cornerstone OnDemand',
          type: 'Training Platform',
          evidence: {
            policyName: 'Training Compliance Settings',
            settings: [
              { name: 'Course Completion Requirement', value: '100%' },
              { name: 'Reminder Frequency', value: 'Weekly' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.3'
          }
        }
      ],
      metrics: [
        {
          name: 'Employee Training Completion Rate',
          current: 85,
          target: 100,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 70 },
            { date: getRelativeDate(-60), value: 78 },
            { date: getRelativeDate(-30), value: 85 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Internal',
          scope: 'Training Compliance Audit',
          findings: 'Improvement in training participation observed; record-keeping issues remain.',
          auditor: 'HR Audit Team'
        }
      ]
    },
    securityGroups: [4], // References security awareness
    vulnerabilities: [
      {
        source: 'KnowBe4 Security Awareness Platform',
        summary: 'Training Compliance Issues',
        vulnerabilities: [
          {
            name: 'TRAIN-2023-001',
            category: 'Training Compliance',
            date: getRelativeDate(-20),
            text: 'Multiple departments below required security awareness training completion thresholds',
            impact: 'High',
            remediationSteps: [
              'Generate department-level completion reports',
              'Send escalation notices to department heads',
              'Schedule makeup training sessions',
              'Track completion progress weekly'
            ],
            status: 'In Progress'
          },
          {
            name: 'TRAIN-2023-002',
            category: 'Training Records',
            date: getRelativeDate(-15), 
            text: 'Missing training completion records for new employees',
            impact: 'Medium',
            remediationSteps: [
              'Audit onboarding training records',
              'Update training enrollment automation',
              'Backfill missing records',
              'Verify training system integration'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Cornerstone LMS Analytics',
        summary: 'Training Platform Issues',
        vulnerabilities: [
          {
            name: 'LMS-2023-003',
            category: 'System Configuration',
            date: getRelativeDate(-10),
            text: 'Automated reminders not triggering for overdue training',
            impact: 'Medium',
            remediationSteps: [
              'Debug reminder workflow configuration',
              'Test reminder system functionality',
              'Update notification templates',
              'Monitor reminder delivery'
            ],
            status: 'Open'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-010',
    name: 'Business Continuity and Disaster Recovery',
    summary: 'Strategies and plans to ensure operational continuity and rapid recovery in the event of a disruption.',
    associatedRegulations: [
      { name: 'DORA', summary: 'Operational resilience and recovery plan requirements', link: '/regulations/dora/continuity', articleId: 'DORA-004' },
      { name: 'NIST CSF 2.0', summary: 'Guidelines for business continuity planning', link: '/regulations/nist/continuity', articleId: 'NISTCSF-007' },
      { name: 'NY DFS', summary: 'Disaster recovery and resilience standards', link: '/regulations/nydfs/disaster-recovery', articleId: 'NYDFS-002' }
    ],
    associatedContractualObligations: [],
    policies: [
      {
        id: 'POL-014',
        name: 'Business Continuity Plan',
        description: 'Plan to ensure critical operations continue during and after a disruptive event.',
        policyText: 'The Business Continuity Plan (BCP) outlines processes for maintaining essential functions during crises.',
        link: '/policies/bcp/business-continuity.pdf',
        status: 'active'
      },
      {
        id: 'POL-015',
        name: 'Disaster Recovery Policy',
        description: 'Procedures for restoring IT systems following a disruption.',
        policyText: 'Disaster Recovery procedures must be tested quarterly with documented recovery time objectives (RTO) and recovery point objectives (RPO).',
        link: '/policies/bcp/disaster-recovery.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'Disaster Recovery Site',
        type: 'Facility',
        repository: 'Internal',
        team: 'IT Operations',
        teamContact: 'ops@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Disaster Recovery Site',
          type: 'Facility',
          repository: 'Internal',
          team: 'IT Operations',
          teamContact: 'ops@company.com'
        },
        issue: 'Outdated recovery procedures not reflecting current infrastructure',
        mitigation: 'Revise the recovery plan and conduct a full failover test',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Veeam',
          type: 'Backup Solution',
          evidence: {
            policyName: 'Backup Configuration',
            settings: [
              { name: 'Backup Frequency', value: 'Hourly' },
              { name: 'Offsite Replication', value: 'Enabled' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '3.5'
          }
        }
      ],
      metrics: [
        {
          name: 'Recovery Time Objective (RTO) in hours',
          current: 4,
          target: 2,
          trend: 'decreasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 6 },
            { date: getRelativeDate(-60), value: 5 },
            { date: getRelativeDate(-30), value: 4 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'External',
          scope: 'Disaster Recovery Drill',
          findings: 'DR plan effective with minor gaps in failover times identified.',
          auditor: 'Disaster Recovery Consultant'
        }
      ]
    },
    securityGroups: [2, 3, 7], // References network security, incident response and data storage
    vulnerabilities: [
      {
        source: 'Veeam ONE',
        summary: 'Backup and Recovery Issues',
        vulnerabilities: [
          {
            name: 'BCK-2023-001',
            category: 'Backup Configuration',
            date: getRelativeDate(-20),
            text: 'Backup retention policies not aligned with compliance requirements',
            impact: 'High',
            remediationSteps: [
              'Review retention requirements',
              'Update backup policies',
              'Verify backup schedules',
              'Test recovery procedures'
            ],
            status: 'In Progress'
          },
          {
            name: 'BCK-2023-002',
            category: 'Disaster Recovery',
            date: getRelativeDate(-15),
            text: 'Recovery time objectives not being met in failover tests',
            impact: 'Critical',
            remediationSteps: [
              'Optimize recovery procedures',
              'Upgrade backup infrastructure',
              'Conduct failover testing',
              'Document performance metrics'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Zerto Analytics',
        summary: 'Replication Issues',
        vulnerabilities: [
          {
            name: 'REP-2023-003',
            category: 'Data Replication',
            date: getRelativeDate(-10),
            text: 'Offsite replication delays exceeding SLA thresholds',
            impact: 'Medium',
            remediationSteps: [
              'Analyze network bandwidth',
              'Optimize replication schedule',
              'Monitor replication lag',
              'Update SLA documentation'
            ],
            status: 'In Progress'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-011',
    name: 'AI Model Risk Assessment and Validation',
    summary: 'Framework for assessing and validating AI models to ensure compliance with EU AI Act requirements.',
    associatedRegulations: [
      { name: 'EU AI Act', summary: 'Requirements for high-risk AI systems', link: '/regulations/eu-ai/model-risk', articleId: 'EUAI-002' },
      { name: 'ISO 42001', summary: 'Model validation standards', link: '/frameworks/iso42001/validation', articleId: 'ISO42001-002' },
      { name: 'NIST AI RMF', summary: 'AI model risk assessment guidelines', link: '/frameworks/nist-ai/model-risk', articleId: 'NIST-AIRM-002' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[2].obligations[2],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-016',
        name: 'AI Model Validation Policy',
        description: 'Requirements for validating AI models before deployment',
        policyText: 'All high-risk AI models must undergo validation testing, bias assessment, and performance evaluation before deployment.',
        link: '/policies/ai/model-validation.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Model Registry',
        type: 'Service',
        repository: 'github.com/company/model-registry',
        team: 'ML Platform',
        teamContact: 'ml-platform@company.com'
      },
      {
        name: 'Model Validation Pipeline',
        type: 'Pipeline',
        repository: 'github.com/company/validation-pipeline',
        team: 'ML Platform',
        teamContact: 'ml-platform@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Model Registry',
          type: 'Service',
          repository: 'github.com/company/model-registry',
          team: 'ML Platform',
          teamContact: 'ml-platform@company.com'
        },
        issue: 'Missing automated bias detection in validation pipeline',
        mitigation: 'Implement fairness metrics and bias detection',
        status: 'In Progress',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'MLflow',
          type: 'Model Registry',
          evidence: {
            policyName: 'Model Validation Config',
            settings: [
              { name: 'Bias Detection', value: 'Enabled' },
              { name: 'Performance Thresholds', value: 'Strict' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '2.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Model Validation Pass Rate',
          current: 75,
          target: 95,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 60 },
            { date: getRelativeDate(-60), value: 68 },
            { date: getRelativeDate(-30), value: 75 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Internal',
          scope: 'AI Model Validation',
          findings: 'Validation process needs enhancement for bias detection',
          auditor: 'AI Governance Team'
        }
      ]
    },
    securityGroups: [0, 1, 4, 5, 7], 
    vulnerabilities: [
      {
        source: 'Amazon SageMaker Model Monitor',
        summary: 'Model Validation Issues',
        vulnerabilities: [
          {
            name: 'MOD-2023-001',
            category: 'Data Quality',
            date: getRelativeDate(-25),
            text: 'Data drift detected in production model features',
            impact: 'High',
            remediationSteps: [
              'Analyze feature distribution changes',
              'Retrain model with updated data',
              'Implement automated drift detection',
              'Update data validation pipeline'
            ],
            status: 'In Progress'
          },
          {
            name: 'MOD-2023-002', 
            category: 'Model Bias',
            date: getRelativeDate(-20),
            text: 'Gender bias detected in model predictions',
            impact: 'Critical',
            remediationSteps: [
              'Audit training data for bias',
              'Implement fairness metrics',
              'Retrain with debiased dataset',
              'Add bias monitoring checks'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'MLflow Model Registry',
        summary: 'Model Governance Issues',
        vulnerabilities: [
          {
            name: 'MLF-2023-003',
            category: 'Model Validation',
            date: getRelativeDate(-15),
            text: 'Missing validation steps in model deployment pipeline',
            impact: 'Medium',
            remediationSteps: [
              'Update CI/CD pipeline',
              'Add validation test suite',
              'Implement quality gates',
              'Document validation process'
            ],
            status: 'In Progress'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-012',
    name: 'AI Data Management and Privacy',
    summary: 'Standards for managing training data and ensuring privacy in AI systems.',
    associatedRegulations: [
      { name: 'EU AI Act', summary: 'Data quality and privacy requirements', link: '/regulations/eu-ai/data-privacy', articleId: 'EUAI-003' },
      { name: 'ISO 42001', summary: 'AI data management standards', link: '/frameworks/iso42001/data-management', articleId: 'ISO42001-003' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[0].obligations[0],
        entity: contractualObligations[0].entity
      },
      {
        ...contractualObligations[1].obligations[1],
        entity: contractualObligations[1].entity
      },
      {
        ...contractualObligations[2].obligations[2],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-017',
        name: 'AI Training Data Policy',
        description: 'Guidelines for collecting and managing AI training data',
        policyText: 'Training data must be properly labeled, versioned, and screened for PII/sensitive information.',
        link: '/policies/ai/training-data.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Feature Store',
        type: 'Service',
        repository: 'github.com/company/feature-store',
        team: 'Data Platform',
        teamContact: 'data-platform@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Feature Store',
          type: 'Service',
          repository: 'github.com/company/feature-store',
          team: 'Data Platform',
          teamContact: 'data-platform@company.com'
        },
        issue: 'Incomplete data lineage tracking',
        mitigation: 'Implement comprehensive data provenance system',
        status: 'Planned',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Feast',
          type: 'Feature Store',
          evidence: {
            policyName: 'Data Privacy Config',
            settings: [
              { name: 'PII Detection', value: 'Enabled' },
              { name: 'Data Versioning', value: 'Required' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.5'
          }
        }
      ],
      metrics: [
        {
          name: 'Data Quality Score',
          current: 88,
          target: 95,
          trend: 'stable',
          status: 'neutral',
          history: [
            { date: getRelativeDate(-90), value: 87 },
            { date: getRelativeDate(-60), value: 88 },
            { date: getRelativeDate(-30), value: 88 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'External',
          scope: 'Data Privacy Review',
          findings: 'Data handling practices align with EU AI Act requirements',
          auditor: 'Privacy Consultant'
        }
      ]
    },
    securityGroups: [0, 1, 4, 5, 7], 
    vulnerabilities: [
      {
        source: 'Datadog',
        summary: 'Data Quality and Monitoring Issues',
        vulnerabilities: [
          {
            name: 'DQ-2023-001',
            category: 'Data Quality',
            date: getRelativeDate(-20),
            text: 'Missing data quality metrics for critical ML features',
            impact: 'High',
            remediationSteps: [
              'Implement data quality monitoring',
              'Set up metric thresholds',
              'Create automated alerts',
              'Document quality SLAs'
            ],
            status: 'In Progress'
          },
          {
            name: 'DQ-2023-002',
            category: 'Model Monitoring',
            date: getRelativeDate(-15),
            text: 'Insufficient monitoring coverage for production ML models',
            impact: 'Critical',
            remediationSteps: [
              'Deploy model performance monitors',
              'Set up prediction drift detection',
              'Implement data drift alerts',
              'Create monitoring dashboards'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Prometheus',
        summary: 'Model Performance Issues',
        vulnerabilities: [
          {
            name: 'ML-2023-003',
            category: 'Performance Monitoring',
            date: getRelativeDate(-10),
            text: 'Model latency spikes exceeding SLA thresholds',
            impact: 'Medium',
            remediationSteps: [
              'Analyze performance bottlenecks',
              'Optimize model inference',
              'Scale infrastructure resources',
              'Update monitoring thresholds'
            ],
            status: 'In Progress'
          }
        ]
      }
    ]
  },
  {
    id: 'CCF-013',
    name: 'AI System Monitoring and Reporting',
    summary: 'Continuous monitoring and reporting requirements for AI systems as per NIST AI RMF.',
    associatedRegulations: [
      { name: 'NIST AI RMF', summary: 'AI system monitoring guidelines', link: '/frameworks/nist-ai/monitoring', articleId: 'NIST-AIRM-003' },
      { name: 'ISO 42001', summary: 'AI performance monitoring standards', link: '/frameworks/iso42001/monitoring', articleId: 'ISO42001-004' }
    ],
    associatedContractualObligations: [
      {
        ...contractualObligations[2].obligations[2],
        entity: contractualObligations[2].entity
      },
    ],
    policies: [
      {
        id: 'POL-018',
        name: 'AI Monitoring Policy',
        description: 'Requirements for monitoring AI system performance and behavior',
        policyText: 'All production AI systems must be continuously monitored for drift, performance degradation, and unexpected behaviors.',
        link: '/policies/ai/monitoring.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'AI Monitoring Dashboard',
        type: 'Application',
        repository: 'github.com/company/ai-monitoring',
        team: 'ML Ops',
        teamContact: 'mlops@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'AI Monitoring Dashboard',
          type: 'Application',
          repository: 'github.com/company/ai-monitoring',
          team: 'ML Ops',
          teamContact: 'mlops@company.com'
        },
        issue: 'Lack of automated alerting for model drift',
        mitigation: 'Implement drift detection and alert system',
        status: 'Not Started',
        dueDate: getRelativeDate(DemoDateOffsets.actionPlanDue)
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Prometheus',
          type: 'Monitoring',
          evidence: {
            policyName: 'AI Monitoring Config',
            settings: [
              { name: 'Drift Detection', value: 'Enabled' },
              { name: 'Alert Thresholds', value: 'Configured' }
            ],
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
            version: '1.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Model Performance Stability',
          current: 92,
          target: 95,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: getRelativeDate(-90), value: 85 },
            { date: getRelativeDate(-60), value: 89 },
            { date: getRelativeDate(-30), value: 92 }
          ]
        }
      ],
      audits: [
        {
          date: getRelativeDate(DemoDateOffsets.lastAssessment),
          type: 'Internal',
          scope: 'AI System Monitoring',
          findings: 'Monitoring coverage adequate; alerting needs improvement',
          auditor: 'ML Ops Team'
        }
      ]
    },
    securityGroups: [0, 1, 4, 5, 7], 
    vulnerabilities: [
      {
        source: 'Datadog ML Monitoring',
        summary: 'Model Performance Issues',
        vulnerabilities: [
          {
            name: 'ML-2023-001',
            category: 'Model Drift',
            date: getRelativeDate(-20),
            text: 'Significant feature drift detected in production model inputs',
            impact: 'High',
            remediationSteps: [
              'Analyze input distribution changes',
              'Retrain model with recent data',
              'Adjust drift detection thresholds',
              'Update monitoring alerts'
            ],
            status: 'In Progress'
          },
          {
            name: 'ML-2023-002',
            category: 'Model Performance',
            date: getRelativeDate(-15),
            text: 'Model accuracy degradation beyond acceptable threshold',
            impact: 'Critical', 
            remediationSteps: [
              'Investigate performance drop root cause',
              'Collect additional training data',
              'Tune model hyperparameters',
              'Deploy model retraining pipeline'
            ],
            status: 'Open'
          }
        ]
      },
      {
        source: 'Amazon SageMaker Model Monitor',
        summary: 'Data Quality Issues',
        vulnerabilities: [
          {
            name: 'MLQ-2023-003',
            category: 'Data Quality',
            date: getRelativeDate(-10),
            text: 'Missing values detected in critical model features',
            impact: 'Medium',
            remediationSteps: [
              'Audit data preprocessing pipeline',
              'Implement data quality checks',
              'Add missing value handling',
              'Update data validation rules'
            ],
            status: 'In Progress'
          }
        ]
      }
    ]
  }
];
