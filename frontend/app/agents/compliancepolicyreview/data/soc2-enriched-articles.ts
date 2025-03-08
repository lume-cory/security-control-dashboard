import { soc2Type1Controls } from '@/data/control-frameworks/soc2-type1';

export interface enrichedSOC2Article {
  id: string;
  name: string;
  text: string;
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
    system: {
      name: string;
      type: string;
      repository: string;
      team: string;
      teamContact: string;
    };
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

export const enrichedSOC2Articles: enrichedSOC2Article[] = [
  {
    ...soc2Type1Controls.find(c => c.id === 'CC1.1')!,
    name: 'Control Environment',
    text: soc2Type1Controls.find(c => c.id === 'CC1.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-020",
        name: 'Code of Conduct',
        description: 'Company-wide ethical standards and behavior guidelines',
        policyText: 'All employees must adhere to ethical business practices, maintain confidentiality, and report violations through appropriate channels.',
        link: '/policies/code-of-conduct-v3.pdf',
        status: 'active'
      },
      {
        id: "POL-021",
        name: 'Ethics Training Program',
        description: 'Annual ethics and compliance training requirements',
        policyText: 'Employees must complete annual ethics training covering data protection, privacy, and security responsibilities.',
        link: '/policies/ethics-training-v2.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'HR Portal',
        type: 'Internal Service',
        repository: 'github.com/company/hr-portal',
        team: 'People Ops',
        teamContact: 'people-ops@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'HR Portal',
          type: 'Internal Service',
          repository: 'github.com/company/hr-portal',
          team: 'People Ops',
          teamContact: 'people-ops@company.com'
        },
        issue: 'Ethics training completion tracking not implemented',
        mitigation: 'Implementing automated tracking system',
        status: 'In Progress',
        dueDate: '2024-05-15'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Training LMS',
          type: 'Training Platform',
          evidence: {
            policyName: 'Ethics Training Delivery',
            settings: [
              { name: 'Completion Tracking', value: 'Enabled' },
              { name: 'Minimum Score', value: '80%' },
              { name: 'Annual Renewal', value: 'Required' }
            ],
            lastUpdated: '2024-03-15',
            version: '2.1'
          }
        }
      ],
      metrics: [
        {
          name: 'Training Completion Rate',
          current: 87,
          target: 100,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: '2024-01', value: 75 },
            { date: '2024-02', value: 82 },
            { date: '2024-03', value: 87 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-02-01',
          type: 'Internal',
          scope: 'Ethics Program Review',
          findings: 'Training program effective but tracking needs improvement',
          auditor: 'Internal Audit Team'
        }
      ]
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC6.1')!,
    name: 'Logical and Physical Access',
    text: soc2Type1Controls.find(c => c.id === 'CC6.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-023",
        name: 'Access Control Policy',
        description: 'Requirements for system and data access control',
        policyText: 'Access to systems and data must be restricted based on job function and follow the principle of least privilege.',
        link: '/policies/access-control-v1.pdf',
        status: 'active'
      },
      {
        id: "POL-024",
        name: 'Multi-Factor Authentication Policy',
        description: 'MFA requirements for system access',
        policyText: 'Multi-factor authentication must be enabled for all user accounts accessing critical systems.',
        link: '/policies/mfa-policy-v1.pdf',
        status: 'suggested'
      }
    ],
    impactedSystems: [
      {
        name: 'Identity Provider',
        type: 'Security Service',
        repository: 'github.com/company/idp-service',
        team: 'Security',
        teamContact: 'security-team@company.com'
      },
      {
        name: 'Customer Portal',
        type: 'External Service',
        repository: 'github.com/company/customer-portal',
        team: 'Customer Experience',
        teamContact: 'cx-team@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Customer Portal',
          type: 'External Service',
          repository: 'github.com/company/customer-portal',
          team: 'Customer Experience',
          teamContact: 'cx-team@company.com'
        },
        issue: 'MFA not enforced for administrative accounts',
        mitigation: 'Implementing mandatory MFA for all admin access',
        status: 'In Progress',
        dueDate: '2024-04-30'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Okta',
          type: 'Identity Provider',
          evidence: {
            policyName: 'Global Access Policy',
            settings: [
              { name: 'Password Complexity', value: 'High' },
              { name: 'Session Timeout', value: '8 hours' },
              { name: 'Failed Login Attempts', value: '5' }
            ],
            lastUpdated: '2024-03-01',
            version: '3.0'
          }
        }
      ],
      metrics: [
        {
          name: 'MFA Adoption Rate',
          current: 82,
          target: 100,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: '2024-01', value: 65 },
            { date: '2024-02', value: 75 },
            { date: '2024-03', value: 82 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-03-15',
          type: 'External',
          scope: 'Access Control Review',
          findings: 'MFA adoption improving but not yet at target levels',
          auditor: 'Security Audit Partners LLC'
        }
      ]
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC3.1')!,
    name: 'Risk Assessment',
    text: soc2Type1Controls.find(c => c.id === 'CC3.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-030",
        name: 'Risk Assessment Policy',
        description: 'Framework for identifying and assessing risks',
        policyText: 'Regular risk assessments must be conducted to identify threats and vulnerabilities to organizational assets.',
        link: '/policies/risk-assessment-v1.pdf',
        status: 'active'
      },
      {
        id: "POL-031",
        name: 'Risk Treatment Plan',
        description: 'Guidelines for risk mitigation strategies',
        policyText: 'All identified risks must have documented treatment plans with clear ownership and timelines.',
        link: '/policies/risk-treatment-v1.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Risk Management Platform',
        type: 'Internal Service',
        repository: 'github.com/company/risk-platform',
        team: 'Security',
        teamContact: 'security@company.com'
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [
        {
          tool: 'GRC Platform',
          type: 'Risk Management',
          evidence: {
            policyName: 'Risk Assessment Framework',
            settings: [
              { name: 'Assessment Frequency', value: 'Quarterly' },
              { name: 'Risk Scoring Method', value: 'FAIR' }
            ],
            lastUpdated: '2024-03-01',
            version: '1.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Risk Assessment Coverage',
          current: 95,
          target: 100,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: '2024-01', value: 85 },
            { date: '2024-02', value: 90 },
            { date: '2024-03', value: 95 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-02-15',
          type: 'Internal',
          scope: 'Risk Assessment Process',
          findings: 'Process is effective but documentation needs improvement',
          auditor: 'Internal Audit Team'
        }
      ]
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC2.1')!,
    name: 'Communication and Information',
    text: soc2Type1Controls.find(c => c.id === 'CC2.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-040",
        name: 'Information Quality Policy',
        description: 'Standards for information accuracy and reliability',
        policyText: 'All business-critical information must be validated for accuracy, completeness, and timeliness.',
        link: '/policies/info-quality-v2.pdf',
        status: 'active'
      },
      {
        id: "POL-041",
        name: 'Data Governance Framework',
        description: 'Framework for data management and quality',
        policyText: 'Implement comprehensive data governance including quality metrics and review processes.',
        link: '/policies/data-governance-v1.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Data Quality Platform',
        type: 'Internal Service',
        repository: 'github.com/company/dq-platform',
        team: 'Data Platform',
        teamContact: 'data-platform@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Data Quality Platform',
          type: 'Internal Service',
          repository: 'github.com/company/dq-platform',
          team: 'Data Platform',
          teamContact: 'data-platform@company.com'
        },
        issue: 'Data quality metrics not consistently tracked',
        mitigation: 'Implementing automated data quality monitoring',
        status: 'In Progress',
        dueDate: '2024-06-30'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Data Quality Monitor',
          type: 'Monitoring',
          evidence: {
            policyName: 'Data Quality Rules',
            settings: [
              { name: 'Validation Frequency', value: 'Hourly' },
              { name: 'Quality Threshold', value: '99.9%' }
            ],
            lastUpdated: '2024-03-10',
            version: '2.0'
          }
        }
      ],
      metrics: [
        {
          name: 'Data Quality Score',
          current: 98,
          target: 99.9,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: '2024-01', value: 97 },
            { date: '2024-02', value: 97.5 },
            { date: '2024-03', value: 98 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-03-01',
          type: 'Internal',
          scope: 'Data Quality Controls',
          findings: 'Controls effective but monitoring needs enhancement',
          auditor: 'Data Governance Team'
        }
      ]
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC4.1')!,
    name: 'Monitoring Activities',
    text: soc2Type1Controls.find(c => c.id === 'CC4.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-050",
        name: 'Control Monitoring Policy',
        description: 'Requirements for monitoring control effectiveness',
        policyText: 'Controls must be continuously monitored with regular effectiveness assessments.',
        link: '/policies/monitoring-v1.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Monitoring Platform',
        type: 'Security Service',
        repository: 'github.com/company/monitoring',
        team: 'Security',
        teamContact: 'security@company.com'
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Control Monitor',
          type: 'Monitoring',
          evidence: {
            policyName: 'Control Effectiveness',
            settings: [
              { name: 'Monitoring Interval', value: 'Continuous' },
              { name: 'Alert Threshold', value: 'Critical' }
            ],
            lastUpdated: '2024-03-20',
            version: '1.5'
          }
        }
      ],
      metrics: [
        {
          name: 'Control Coverage',
          current: 92,
          target: 100,
          trend: 'stable',
          status: 'neutral',
          history: [
            { date: '2024-01', value: 90 },
            { date: '2024-02', value: 91 },
            { date: '2024-03', value: 92 }
          ]
        }
      ],
      audits: []
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC5.1')!,
    name: 'Control Activities',
    text: soc2Type1Controls.find(c => c.id === 'CC5.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-060",
        name: 'Security Policy Framework',
        description: 'Comprehensive security policy structure',
        policyText: 'Maintain a comprehensive set of security policies covering all aspects of information security.',
        link: '/policies/security-framework-v2.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Policy Management System',
        type: 'Internal Service',
        repository: 'github.com/company/policy-mgmt',
        team: 'Compliance',
        teamContact: 'compliance@company.com'
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Policy Manager',
          type: 'GRC',
          evidence: {
            policyName: 'Policy Management',
            settings: [
              { name: 'Review Cycle', value: 'Annual' },
              { name: 'Approval Workflow', value: 'Enabled' }
            ],
            lastUpdated: '2024-02-28',
            version: '2.1'
          }
        }
      ],
      metrics: [
        {
          name: 'Policy Review Status',
          current: 100,
          target: 100,
          trend: 'stable',
          status: 'good',
          history: [
            { date: '2024-01', value: 100 },
            { date: '2024-02', value: 100 },
            { date: '2024-03', value: 100 }
          ]
        }
      ],
      audits: []
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC7.1')!,
    name: 'System Operations',
    text: soc2Type1Controls.find(c => c.id === 'CC7.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-070",
        name: 'Operations Management Policy',
        description: 'Standards for system operations and monitoring',
        policyText: 'System operations must be monitored 24/7 with defined incident response procedures.',
        link: '/policies/operations-mgmt-v1.pdf',
        status: 'active'
      },
      {
        id: "POL-071",
        name: 'System Performance Standards',
        description: 'Performance monitoring requirements',
        policyText: 'Critical systems must maintain 99.9% uptime with comprehensive performance monitoring.',
        link: '/policies/performance-standards-v1.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Operations Dashboard',
        type: 'Internal Service',
        repository: 'github.com/company/ops-dashboard',
        team: 'Operations',
        teamContact: 'ops@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Operations Dashboard',
          type: 'Internal Service',
          repository: 'github.com/company/ops-dashboard',
          team: 'Operations',
          teamContact: 'ops@company.com'
        },
        issue: 'Performance monitoring gaps in legacy systems',
        mitigation: 'Implementing unified monitoring solution',
        status: 'In Progress',
        dueDate: '2024-07-15'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: 'Datadog',
          type: 'Monitoring',
          evidence: {
            policyName: 'System Monitoring',
            settings: [
              { name: 'Alert Thresholds', value: 'Configured' },
              { name: 'Monitoring Interval', value: '1 minute' }
            ],
            lastUpdated: '2024-03-05',
            version: '2.0'
          }
        }
      ],
      metrics: [
        {
          name: 'System Uptime',
          current: 99.95,
          target: 99.9,
          trend: 'stable',
          status: 'good',
          history: [
            { date: '2024-01', value: 99.93 },
            { date: '2024-02', value: 99.94 },
            { date: '2024-03', value: 99.95 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-02-28',
          type: 'Internal',
          scope: 'Operations Review',
          findings: 'Operations generally effective, some monitoring gaps identified',
          auditor: 'Operations Team'
        }
      ]
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC8.1')!,
    name: 'Change Management',
    text: soc2Type1Controls.find(c => c.id === 'CC8.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-080",
        name: 'Change Management Policy',
        description: 'Requirements for managing system changes',
        policyText: 'All system changes must follow the defined change management process with appropriate approvals.',
        link: '/policies/change-mgmt-v2.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'Change Management System',
        type: 'Internal Service',
        repository: 'github.com/company/change-mgmt',
        team: 'DevOps',
        teamContact: 'devops@company.com'
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [
        {
          tool: 'ServiceNow',
          type: 'ITSM',
          evidence: {
            policyName: 'Change Management Process',
            settings: [
              { name: 'Approval Workflow', value: 'Enabled' },
              { name: 'Change Calendar', value: 'Active' }
            ],
            lastUpdated: '2024-03-01',
            version: '3.2'
          }
        }
      ],
      metrics: [
        {
          name: 'Change Success Rate',
          current: 98,
          target: 95,
          trend: 'increasing',
          status: 'good',
          history: [
            { date: '2024-01', value: 96 },
            { date: '2024-02', value: 97 },
            { date: '2024-03', value: 98 }
          ]
        }
      ],
      audits: []
    }
  },
  {
    ...soc2Type1Controls.find(c => c.id === 'CC9.1')!,
    name: 'Risk Mitigation',
    text: soc2Type1Controls.find(c => c.id === 'CC9.1')?.subCategoryStatement || '',
    policies: [
      {
        id: "POL-090",
        name: 'Business Continuity Policy',
        description: 'Requirements for business continuity and disaster recovery',
        policyText: 'Maintain and regularly test business continuity and disaster recovery plans.',
        link: '/policies/bcp-v1.pdf',
        status: 'active'
      },
      {
        id: "POL-091",
        name: 'Crisis Management Plan',
        description: 'Procedures for crisis response',
        policyText: 'Define and maintain procedures for managing crisis situations affecting business operations.',
        link: '/policies/crisis-mgmt-v1.pdf',
        status: 'active'
      }
    ],
    impactedSystems: [
      {
        name: 'DR Management System',
        type: 'Internal Service',
        repository: 'github.com/company/dr-mgmt',
        team: 'Infrastructure',
        teamContact: 'infra@company.com'
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [
        {
          tool: 'DR Orchestrator',
          type: 'DR Management',
          evidence: {
            policyName: 'DR Testing',
            settings: [
              { name: 'Test Frequency', value: 'Quarterly' },
              { name: 'RTO Target', value: '4 hours' }
            ],
            lastUpdated: '2024-02-15',
            version: '1.5'
          }
        }
      ],
      metrics: [
        {
          name: 'DR Test Success Rate',
          current: 100,
          target: 100,
          trend: 'stable',
          status: 'good',
          history: [
            { date: '2024-01', value: 100 },
            { date: '2024-02', value: 100 },
            { date: '2024-03', value: 100 }
          ]
        }
      ],
      audits: [
        {
          date: '2024-01-15',
          type: 'External',
          scope: 'DR Readiness Assessment',
          findings: 'DR processes well-defined and tested regularly',
          auditor: 'Business Continuity Partners'
        }
      ]
    }
  }
];

export const enrichedSoc2Articles = enrichedSOC2Articles.map(article => ({
  ...article,
  nonCompliantInstances: article.nonCompliantInstances || [],
  supportingEvidence: article.supportingEvidence || {
    configurations: [],
    metrics: [],
    audits: []
  }
})); 