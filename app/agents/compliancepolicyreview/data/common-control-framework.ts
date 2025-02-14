export interface CCFRequirement {
  id: string;
  name: string;
  summary: string;
  associatedRegulations: Array<{
    name: string;
    summary: string;
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
      history: Array<{ date: string; value: number }>;
    }>;
    audits: Array<{
      date: string;
      type: string;
      scope: string;
      findings: string;
      auditor: string;
    }>;
  };
}

export const commonControlFrameworkData: CCFRequirement[] = [
  {
    id: 'CCF-001',
    name: 'Access Control and Authentication',
    summary: 'Access Control and Authentication placeholder',
    associatedRegulations: [
      { name: 'HIPPA', summary: 'HIPPA placeholder', link: '/regulations/hipaa/access-control' },
      { name: 'GDPR', summary: 'GDPR placeholder', link: '/regulations/gdpr/authentication' },
      { name: 'SOC2 Type 1', summary: 'SOC2 Type 1 placeholder', link: '/frameworks/soc2/access' },
      { name: 'ISO 27001', summary: 'ISO 27001 placeholder', link: '/frameworks/iso27001/access-control' }
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
        name: 'Identity Provider',
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
        dueDate: '2024-06-30'
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
            lastUpdated: '2024-03-15',
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
            lastUpdated: '2024-03-10',
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
          history: [
            { date: '2024-01', value: 85 },
            { date: '2024-02', value: 90 },
            { date: '2024-03', value: 94 }
          ]
        },
        {
          name: 'Failed Authentication Attempts',
          current: 2.3,
          target: 5,
          trend: 'decreasing',
          history: [
            { date: '2024-01', value: 4.2 },
            { date: '2024-02', value: 3.1 },
            { date: '2024-03', value: 2.3 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-03-01',
          type: 'Internal',
          scope: 'Access Control Review',
          findings: 'MFA compliance at 94%. Legacy system remediation in progress.',
          auditor: 'Security Team'
        },
        {
          date: '2024-02-15',
          type: 'External',
          scope: 'SOC2 Type 1',
          findings: 'Access control policies meet SOC2 requirements. Minor findings in legacy systems.',
          auditor: 'Ernst & Young'
        }
      ]
    }
  },
  {
    id: 'CCF-002',
    name: 'Data Encryption and Protection',
    summary: 'Data Encryption and Protection placeholder',
    associatedRegulations: [
      { name: 'HIPPA', summary: 'HIPPA placeholder', link: '/regulations/hipaa/encryption' },
      { name: 'GDPR', summary: 'GDPR placeholder', link: '/regulations/gdpr/data-protection' },
      { name: 'NIS2', summary: 'NIS2 placeholder', link: '/regulations/nis2/encryption' },
      { name: 'DORA', summary: 'DORA placeholder', link: '/regulations/dora/data-security' }
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
      }
    ],
    nonCompliantInstances: [],
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
            lastUpdated: '2024-03-01',
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
          history: [
            { date: '2024-01', value: 100 },
            { date: '2024-02', value: 100 },
            { date: '2024-03', value: 100 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-03-15',
          type: 'Automated',
          scope: 'Encryption Configuration',
          findings: 'All systems compliant with encryption standards',
          auditor: 'Security Automation'
        }
      ]
    }
  }
]; 