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
    summary: 'This requirement outlines the necessary measures for ensuring secure access and authentication to company systems and data.',
    associatedRegulations: [
      { name: 'HIPPA', summary: 'HIPPA placeholder', link: '/regulations/hipaa/access-control', articleId: 'HIPPA-001' },
      { name: 'GDPR', summary: 'GDPR placeholder', link: '/regulations/gdpr/authentication', articleId: 'GDPR-001' },
      { name: 'SOC2 Type 1', summary: 'SOC2 Type 1 placeholder', link: '/frameworks/soc2/access', articleId: 'SOC2-001' },
      { name: 'ISO 27001', summary: 'ISO 27001 placeholder', link: '/frameworks/iso27001/access-control', articleId: 'ISO27001-001' }
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
        dueDate: '2024-06-30'
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
        dueDate: '2024-05-15'
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
        dueDate: '2024-06-01'
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
    summary: 'This requirement outlines the necessary measures for ensuring secure encryption and protection of company data.',
    associatedRegulations: [
      { name: 'HIPPA', summary: 'HIPPA placeholder', link: '/regulations/hipaa/encryption', articleId: 'HIPPA-002' },
      { name: 'GDPR', summary: 'GDPR placeholder', link: '/regulations/gdpr/data-protection', articleId: 'GDPR-002' },
      { name: 'NIS2', summary: 'NIS2 placeholder', link: '/regulations/nis2/encryption', articleId: 'NIS2-001' },
      { name: 'DORA', summary: 'DORA placeholder', link: '/regulations/dora/data-security', articleId: 'DORA-001' }
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
        dueDate: '2024-05-30'
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
        dueDate: '2024-05-30'
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
        dueDate: '2024-07-15'
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
        dueDate: '2024-05-15'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Qualys',
          type: 'Vulnerability Scanner',
          evidence: {
            policyName: 'Automated Scanning Configuration',
            settings: [
              { name: 'Scan Frequency', value: 'Daily' },
              { name: 'Alert Threshold', value: 'Medium' }
            ],
            lastUpdated: '2024-04-01',
            version: '1.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Vulnerabilities Detected',
          current: 15,
          target: 0,
          trend: 'decreasing',
          history: [
            { date: '2024-01', value: 40 },
            { date: '2024-02', value: 25 },
            { date: '2024-03', value: 15 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-10',
          type: 'Internal',
          scope: 'Vulnerability Management Review',
          findings: 'Scanning frequency meets requirements; patch management improvements needed.',
          auditor: 'Security Operations'
        }
      ]
    }
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
        dueDate: '2024-07-01'
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
            lastUpdated: '2024-04-05',
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
          history: [
            { date: '2024-01', value: 60 },
            { date: '2024-02', value: 50 },
            { date: '2024-03', value: 45 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-15',
          type: 'Internal',
          scope: 'Incident Response Drill',
          findings: 'Response times improved; recommendations made to further automate detection.',
          auditor: 'Security Team'
        }
      ]
    }
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
        dueDate: '2024-08-15'
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
            lastUpdated: '2024-03-20',
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
          history: [
            { date: '2024-01', value: 70 },
            { date: '2024-02', value: 75 },
            { date: '2024-03', value: 80 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-20',
          type: 'External',
          scope: 'Data Retention Review',
          findings: 'Retention schedules are defined; execution needs improvement.',
          auditor: 'External Auditor'
        }
      ]
    }
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
        dueDate: '2024-09-30'
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
            lastUpdated: '2024-03-25',
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
          history: [
            { date: '2024-01', value: 60 },
            { date: '2024-02', value: 65 },
            { date: '2024-03', value: 70 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-05',
          type: 'Internal',
          scope: 'Vendor Risk Management',
          findings: 'Several vendors pending assessments; process improvements recommended.',
          auditor: 'Internal Audit Team'
        }
      ]
    }
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
        dueDate: '2024-10-01'
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
            lastUpdated: '2024-04-08',
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
          history: [
            { date: '2024-01', value: 93 },
            { date: '2024-02', value: 94 },
            { date: '2024-03', value: 95 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-12',
          type: 'Internal',
          scope: 'Change Management Review',
          findings: 'Minor deviations in emergency changes; overall process effective.',
          auditor: 'Change Advisory Board'
        }
      ]
    }
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
        dueDate: '2024-11-15'
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
            lastUpdated: '2024-04-02',
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
          history: [
            { date: '2024-01', value: 50 },
            { date: '2024-02', value: 58 },
            { date: '2024-03', value: 65 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-18',
          type: 'External',
          scope: 'AI Ethics Review',
          findings: 'Policy aligns with EU AI Act; improvements needed in transparency metrics.',
          auditor: 'Independent AI Auditor'
        }
      ]
    }
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
        dueDate: '2024-12-01'
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
            lastUpdated: '2024-04-10',
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
          history: [
            { date: '2024-01', value: 70 },
            { date: '2024-02', value: 78 },
            { date: '2024-03', value: 85 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-22',
          type: 'Internal',
          scope: 'Training Compliance Audit',
          findings: 'Improvement in training participation observed; record-keeping issues remain.',
          auditor: 'HR Audit Team'
        }
      ]
    }
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
        dueDate: '2025-01-15'
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
            lastUpdated: '2024-04-12',
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
          history: [
            { date: '2024-01', value: 6 },
            { date: '2024-02', value: 5 },
            { date: '2024-03', value: 4 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-25',
          type: 'External',
          scope: 'Disaster Recovery Drill',
          findings: 'DR plan effective with minor gaps in failover times identified.',
          auditor: 'Disaster Recovery Consultant'
        }
      ]
    }
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
        dueDate: '2024-06-15'
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
            lastUpdated: '2024-04-01',
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
          history: [
            { date: '2024-01', value: 60 },
            { date: '2024-02', value: 68 },
            { date: '2024-03', value: 75 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-10',
          type: 'Internal',
          scope: 'AI Model Validation',
          findings: 'Validation process needs enhancement for bias detection',
          auditor: 'AI Governance Team'
        }
      ]
    }
  },
  {
    id: 'CCF-012',
    name: 'AI Data Management and Privacy',
    summary: 'Standards for managing training data and ensuring privacy in AI systems.',
    associatedRegulations: [
      { name: 'EU AI Act', summary: 'Data quality and privacy requirements', link: '/regulations/eu-ai/data-privacy', articleId: 'EUAI-003' },
      { name: 'ISO 42001', summary: 'AI data management standards', link: '/frameworks/iso42001/data-management', articleId: 'ISO42001-003' }
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
        dueDate: '2024-07-30'
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
            lastUpdated: '2024-03-15',
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
          history: [
            { date: '2024-01', value: 87 },
            { date: '2024-02', value: 88 },
            { date: '2024-03', value: 88 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-03-20',
          type: 'External',
          scope: 'Data Privacy Review',
          findings: 'Data handling practices align with EU AI Act requirements',
          auditor: 'Privacy Consultant'
        }
      ]
    }
  },
  {
    id: 'CCF-013',
    name: 'AI System Monitoring and Reporting',
    summary: 'Continuous monitoring and reporting requirements for AI systems as per NIST AI RMF.',
    associatedRegulations: [
      { name: 'NIST AI RMF', summary: 'AI system monitoring guidelines', link: '/frameworks/nist-ai/monitoring', articleId: 'NIST-AIRM-003' },
      { name: 'ISO 42001', summary: 'AI performance monitoring standards', link: '/frameworks/iso42001/monitoring', articleId: 'ISO42001-004' }
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
        dueDate: '2024-08-15'
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
            lastUpdated: '2024-04-05',
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
          history: [
            { date: '2024-01', value: 85 },
            { date: '2024-02', value: 89 },
            { date: '2024-03', value: 92 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-04-15',
          type: 'Internal',
          scope: 'AI System Monitoring',
          findings: 'Monitoring coverage adequate; alerting needs improvement',
          auditor: 'ML Ops Team'
        }
      ]
    }
  }
];
