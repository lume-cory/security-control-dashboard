'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { hippaArticles } from '@/data/regulations/hippa'
import { useState } from 'react'
import { ArticleDetailView } from './article-detail-view'

interface HippaArticle {
  id: string;
  name: string;
  text: string;
  policies: Array<{ name: string; description: string; link: string }>;
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

export const enrichedHippaArticles = [
  // Administrative Safeguards
  {
    ...hippaArticles.find(a => a.id === '164.308.a.1'),
    policies: [
      {
        name: 'Security Risk Assessment Policy',
        description: 'Annual security risk assessment procedures and documentation requirements',
        link: '/policies/security-risk-assessment-v2.pdf'
      },
      {
        name: 'Security Incident Response Plan',
        description: 'Procedures for identifying, responding to, and documenting security incidents',
        link: '/policies/incident-response-v1.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Patient Portal',
        type: 'Product',
        repository: 'github.com/company/patient-portal',
        team: 'Healthcare Platform',
        teamContact: 'healthcare-platform@company.com'
      },
      {
        name: 'Auth Service',
        type: 'Service',
        repository: 'github.com/company/auth-service',
        team: 'Security',
        teamContact: 'security-team@company.com'
      }
    ],
    nonCompliantInstances: [], // Empty because compliant
    supportingEvidence: {
      configurations: [
        {
          tool: "Crowdstrike",
          type: "EDR",
          evidence: {
            policyName: "Healthcare-PHI-Protection",
            settings: [
              { name: "Real-time File Monitoring", value: "Enabled" },
              { name: "USB Device Control", value: "Block-By-Default" },
              { name: "Network Isolation on Alert", value: "Enabled" }
            ],
            lastUpdated: "2024-02-15",
            version: "2.4.1"
          }
        },
        {
          tool: "SentinelOne",
          type: "SIEM",
          evidence: {
            policyName: "HIPAA-Compliance-Monitoring",
            settings: [
              { name: "PHI Access Logging", value: "Verbose" },
              { name: "Retention Period", value: "7 years" },
              { name: "Alert Threshold", value: "Medium" }
            ],
            lastUpdated: "2024-03-01",
            version: "3.1.0"
          }
        }
      ],
      metrics: [
        {
          name: "Security Risk Assessment Coverage",
          current: 98.5,
          target: 95,
          trend: "increasing",
          history: [
            { date: "2024-01", value: 97.2 },
            { date: "2024-02", value: 98.1 },
            { date: "2024-03", value: 98.5 }
          ]
        },
        {
          name: "Security Incident Response Time",
          current: 45, // minutes
          target: 60,
          trend: "stable",
          history: [
            { date: "2024-01", value: 48 },
            { date: "2024-02", value: 46 },
            { date: "2024-03", value: 45 }
          ]
        },
        {
          name: "Risk Assessment Findings Remediation",
          current: 94.3,
          target: 90,
          trend: "increasing",
          history: [
            { date: "2024-01", value: 91.5 },
            { date: "2024-02", value: 93.1 },
            { date: "2024-03", value: 94.3 }
          ]
        }
      ],
      audits: [
        {
          date: "2024-02-15",
          type: "Internal",
          scope: "Security Management Process Review",
          findings: "No major findings. Minor recommendation to increase scanning frequency.",
          auditor: "Internal Audit Team"
        },
        {
          date: "2023-11-01",
          type: "External",
          scope: "Annual HIPAA Security Assessment",
          findings: "Fully compliant with Security Management Process requirements",
          auditor: "Healthcare Compliance Partners LLC"
        }
      ]
    }
  },
  {
    ...hippaArticles.find(a => a.id === '164.308.a.2'),
    policies: [
      {
        name: 'Security Officer Responsibilities',
        description: 'Defines roles and responsibilities of the Security Officer',
        link: '/policies/security-officer-duties-v1.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Security Operations Center',
        type: 'Service',
        repository: 'github.com/company/soc',
        team: 'Security',
        teamContact: 'security-team@company.com'
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [
        {
          tool: "SecurityHub",
          type: "Security Management",
          evidence: {
            policyName: "Security-Officer-Controls",
            settings: [
              { name: "Access Level", value: "Administrator" },
              { name: "Alert Notifications", value: "Enabled" },
              { name: "Audit Logging", value: "Comprehensive" }
            ],
            lastUpdated: "2024-02-28",
            version: "1.8.0"
          }
        }
      ],
      metrics: [
        {
          name: "Security Officer Response Time",
          current: 25,
          target: 30,
          trend: "improving",
          history: [
            { date: "2024-01", value: 32 },
            { date: "2024-02", value: 28 },
            { date: "2024-03", value: 25 }
          ]
        }
      ],
      audits: [
        {
          date: "2024-01-15",
          type: "Internal",
          scope: "Security Officer Role Review",
          findings: "All responsibilities being met effectively",
          auditor: "Compliance Team"
        }
      ]
    }
  },
  {
    ...hippaArticles.find(a => a.id === '164.308.a.3'),
    policies: [
      {
        name: 'Access Control Policy',
        description: 'Procedures for granting and revoking system access',
        link: '/policies/access-control-v3.pdf'
      },
      {
        name: 'Employee Termination Procedures',
        description: 'Protocol for removing access upon employee departure',
        link: '/policies/termination-procedures-v2.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'HR System',
        type: 'Service',
        repository: 'github.com/company/hr-system',
        team: 'HR Tech',
        teamContact: 'hr-tech@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Employee Provisioning',
          type: 'Service',
          repository: 'github.com/company/hr-system',
          team: 'IT',
          teamContact: 'it@company.com'
        },
        issue: 'Delayed access termination for departed employees',
        mitigation: 'Implement automated access revocation system',
        status: 'In Progress',
        dueDate: '2024-05-15'
      },
      {
        system: {
          name: 'Contractor Portal',
          type: 'Product',
          repository: 'github.com/company/contractor-portal',
          team: 'Sec Ops',
          teamContact: 'operations@company.com'
        },
        issue: 'Missing periodic access review process',
        mitigation: 'Implement quarterly access review workflow',
        status: 'Planned',
        dueDate: '2024-06-30'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: "Okta",
          type: "IAM",
          evidence: {
            policyName: "Access-Control-Policy",
            settings: [
              { name: "MFA Enforcement", value: "Required" },
              { name: "Password Policy", value: "Strict" },
              { name: "Session Timeout", value: "8 hours" }
            ],
            lastUpdated: "2024-03-10",
            version: "4.2.1"
          }
        }
      ],
      metrics: [
        {
          name: "Access Termination Time",
          current: 4.2,
          target: 24,
          trend: "stable",
          history: [
            { date: "2024-01", value: 4.5 },
            { date: "2024-02", value: 4.3 },
            { date: "2024-03", value: 4.2 }
          ]
        }
      ],
      audits: [
        {
          date: "2024-02-01",
          type: "External",
          scope: "Access Control Review",
          findings: "Some delays in access termination noted",
          auditor: "SecurityAudit Corp"
        }
      ]
    }
  },
  // Physical Safeguards
  {
    ...hippaArticles.find(a => a.id === '164.310.a.1'),
    policies: [
      {
        name: 'Facility Security Plan',
        description: 'Physical security measures for protected health information',
        link: '/policies/facility-security-v2.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Physical Access Control System',
        type: 'Service',
        repository: 'github.com/company/access-control',
        team: 'Facilities',
        teamContact: 'facilities@company.com'
      }
    ],
    nonCompliantInstances: []
  },
  {
    ...hippaArticles.find(a => a.id === '164.310.b'),
    policies: [
      {
        name: 'Workstation Security Policy',
        description: 'Guidelines for secure workstation usage and placement',
        link: '/policies/workstation-security-v1.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Device Management System',
        type: 'Service',
        repository: 'github.com/company/device-management',
        team: 'IT Operations',
        teamContact: 'it-ops@company.com'
      }
    ],
    nonCompliantInstances: []
  },
  // Technical Safeguards
  {
    ...hippaArticles.find(a => a.id === '164.312.a.1'),
    policies: [
      {
        name: 'Authentication Standards',
        description: 'Technical requirements for system authentication',
        link: '/policies/authentication-standards-v3.pdf'
      },
      {
        name: 'Automatic Logoff Policy',
        description: 'Requirements for automatic session termination',
        link: '/policies/auto-logoff-v1.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'User Authentication Service',
        type: 'Service',
        repository: 'github.com/company/auth-service',
        team: 'Security',
        teamContact: 'security-team@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Admin Portal - Support',
          type: 'Product',
          repository: 'github.com/company/admin-portal',
          team: 'Platform Engineering',
          teamContact: 'platform-engineering@company.com'
        },
        issue: 'Missing MFA implementation for admin access',
        mitigation: 'Implement OAuth2 with MFA support using company SSO',
        status: 'In Progress',
        dueDate: '2024-04-30'
      },
      {
        system: {
          name: 'Mobile App',
          type: 'Product',
          repository: 'github.com/company/mobile-app',
          team: 'Mobile',
          teamContact: 'mobile-team@company.com'
        },
        issue: 'Session timeout not enforced properly',
        mitigation: 'Update session management to force logout after inactivity',
        status: 'In Progress',
        dueDate: '2024-05-15'
      },
      {
        system: {
          name: 'MyChart API',
          type: 'API',
          repository: 'github.com/company/healthcare-api',
          team: 'Partner Integration',
          teamContact: 'partner-integration@company.com'
        },
        issue: 'Weak password policy implementation',
        mitigation: 'Enforce stronger password requirements and rotation policy',
        status: 'Planned',
        dueDate: '2024-06-01'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: "Azure AD",
          type: "Identity Provider",
          evidence: {
            policyName: "Healthcare-Access-Controls",
            settings: [
              { name: "Conditional Access", value: "Enabled" },
              { name: "MFA Required", value: "True" },
              { name: "Session Lifetime", value: "8 hours" }
            ],
            lastUpdated: "2024-03-15",
            version: "3.2.1"
          }
        },
        {
          tool: "HashiCorp Vault",
          type: "Secrets Management",
          evidence: {
            policyName: "PHI-Access-Policy",
            settings: [
              { name: "Key Rotation", value: "30 days" },
              { name: "Access Audit", value: "Verbose" },
              { name: "Emergency Access", value: "Break-Glass-Only" }
            ],
            lastUpdated: "2024-03-10",
            version: "1.13.2"
          }
        }
      ],
      metrics: [
        {
          name: "MFA Adoption Rate",
          current: 98.7,
          target: 100,
          trend: "increasing",
          history: [
            { date: "2024-01", value: 95.3 },
            { date: "2024-02", value: 97.1 },
            { date: "2024-03", value: 98.7 }
          ]
        },
        {
          name: "Failed Login Attempts",
          current: 0.5, // percentage
          target: 1,
          trend: "stable",
          history: [
            { date: "2024-01", value: 0.8 },
            { date: "2024-02", value: 0.6 },
            { date: "2024-03", value: 0.5 }
          ]
        }
      ],
      audits: [
        {
          date: "2024-02-15",
          type: "External",
          scope: "Access Control Systems",
          findings: "MFA implementation meets standards; recommended strengthening password complexity requirements",
          auditor: "Deloitte Healthcare Security"
        },
        {
          date: "2024-03-01",
          type: "Internal",
          scope: "Authentication Controls",
          findings: "All critical systems properly secured; some non-critical systems pending MFA implementation",
          auditor: "Internal Security Team"
        }
      ]
    }
  },
  {
    ...hippaArticles.find(a => a.id === '164.312.b'),
    policies: [
      {
        name: 'Audit Logging Standards',
        description: 'Requirements for system activity logging and monitoring',
        link: '/policies/audit-logging-v2.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Logging Service',
        type: 'Service',
        repository: 'github.com/company/logging-service',
        team: 'Platform',
        teamContact: 'platform@company.com'
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: 'Logging Service',
          type: 'Service',
          repository: 'github.com/company/logging-service',
          team: 'Platform Engineering',
          teamContact: 'platform-engineering@company.com'
        },
        issue: 'Incomplete audit trail for PHI access',
        mitigation: 'Enhance logging to capture all PHI access events',
        status: 'In Progress',
        dueDate: '2024-05-30'
      },
      {
        system: {
          name: 'Analytics Dashboard',
          type: 'Product',
          repository: 'github.com/company/analytics-dashboard',
          team: 'Analytics',
          teamContact: 'analytics@company.com'
        },
        issue: 'Missing log retention configuration',
        mitigation: 'Configure log retention policy to meet HIPAA requirements',
        status: 'Planned',
        dueDate: '2024-06-15'
      }
    ],
    supportingEvidence: {
      configurations: [
        {
          tool: "Splunk",
          type: "SIEM",
          evidence: {
            policyName: "PHI-Access-Audit",
            settings: [
              { name: "Log Retention", value: "7 years" },
              { name: "Real-time Alerting", value: "Enabled" },
              { name: "Access Pattern Analysis", value: "AI-Powered" }
            ],
            lastUpdated: "2024-03-05",
            version: "9.1.0"
          }
        },
        {
          tool: "CloudWatch",
          type: "Monitoring",
          evidence: {
            policyName: "Healthcare-Audit-Policy",
            settings: [
              { name: "API Access Logging", value: "Comprehensive" },
              { name: "Log Encryption", value: "AES-256" },
              { name: "Archive Policy", value: "Glacier after 90 days" }
            ],
            lastUpdated: "2024-03-12",
            version: "2.4.0"
          }
        }
      ],
      metrics: [
        {
          name: "Audit Log Coverage",
          current: 99.9,
          target: 99.9,
          trend: "stable",
          history: [
            { date: "2024-01", value: 99.8 },
            { date: "2024-02", value: 99.9 },
            { date: "2024-03", value: 99.9 }
          ]
        },
        {
          name: "Average Log Processing Time",
          current: 2.3, // seconds
          target: 5,
          trend: "improving",
          history: [
            { date: "2024-01", value: 3.1 },
            { date: "2024-02", value: 2.7 },
            { date: "2024-03", value: 2.3 }
          ]
        },
        {
          name: "Suspicious Activity Detection Rate",
          current: 99.5,
          target: 98,
          trend: "stable",
          history: [
            { date: "2024-01", value: 99.3 },
            { date: "2024-02", value: 99.4 },
            { date: "2024-03", value: 99.5 }
          ]
        }
      ],
      audits: [
        {
          date: "2024-03-10",
          type: "External",
          scope: "Audit Controls Assessment",
          findings: "Comprehensive logging implementation exceeds requirements",
          auditor: "KPMG Healthcare"
        },
        {
          date: "2024-02-01",
          type: "Internal",
          scope: "Log Management Review",
          findings: "All systems properly configured for audit logging; recommended increasing real-time alert coverage",
          auditor: "Security Operations Team"
        }
      ]
    }
  },
  // Organizational Requirements
  {
    ...hippaArticles.find(a => a.id === '164.314.a'),
    policies: [
      {
        name: 'Business Associate Agreement Template',
        description: 'Standard agreement for business associates handling PHI',
        link: '/policies/baa-template-v4.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Vendor Management Portal',
        type: 'Product',
        repository: 'github.com/company/vendor-portal',
        team: 'Legal',
        teamContact: 'legal@company.com'
      }
    ],
    nonCompliantInstances: []
  },
  // Policies and Documentation
  {
    ...hippaArticles.find(a => a.id === '164.316.a'),
    policies: [
      {
        name: 'Policy Management Framework',
        description: 'Standards for creating and maintaining security policies',
        link: '/policies/policy-framework-v1.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Policy Management System',
        type: 'Product',
        repository: 'github.com/company/policy-manager',
        team: 'Compliance',
        teamContact: 'compliance@company.com'
      }
    ],
    nonCompliantInstances: []
  },
  // Breach Notification
  {
    ...hippaArticles.find(a => a.id === '164.400'),
    policies: [
      {
        name: 'Breach Notification Procedures',
        description: 'Steps to follow in case of a data breach',
        link: '/policies/breach-notification-v2.pdf'
      },
      {
        name: 'Incident Response Plan',
        description: 'Comprehensive guide for handling security incidents',
        link: '/policies/incident-response-v3.pdf'
      }
    ],
    impactedSystems: [
      {
        name: 'Incident Response System',
        type: 'Service',
        repository: 'github.com/company/incident-response',
        team: 'Security',
        teamContact: 'security-team@company.com'
      },
      {
        name: 'Customer Communication Platform',
        type: 'Service',
        repository: 'github.com/company/customer-comms',
        team: 'Communications',
        teamContact: 'communications@company.com'
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [
        {
          tool: "PagerDuty",
          type: "Incident Management",
          evidence: {
            policyName: "Breach-Response-Protocol",
            settings: [
              { name: "Escalation Policy", value: "Multi-tier" },
              { name: "Response SLA", value: "15 minutes" },
              { name: "Notification Channels", value: "All" }
            ],
            lastUpdated: "2024-03-15",
            version: "2.1.0"
          }
        }
      ],
      metrics: [
        {
          name: "Average Incident Response Time",
          current: 12,
          target: 15,
          trend: "stable",
          history: [
            { date: "2024-01", value: 13 },
            { date: "2024-02", value: 12 },
            { date: "2024-03", value: 12 }
          ]
        }
      ],
      audits: [
        {
          date: "2024-03-01",
          type: "Internal",
          scope: "Breach Response Readiness",
          findings: "All procedures up to date and team well-prepared",
          auditor: "Security Response Team"
        }
      ]
    }
  }
]

const teamNonComplianceData = enrichedHippaArticles.reduce((acc: { team: string, count: number }[]) => {
  // Get all non-compliant instances across all articles
  const allNonCompliantInstances = enrichedHippaArticles.flatMap(article => article.nonCompliantInstances);
  
  // Count unique teams
  const teamCounts = allNonCompliantInstances.reduce((teamAcc: Record<string, number>, instance) => {
    const team = instance.system.team;
    teamAcc[team] = (teamAcc[team] || 0) + 1;
    return teamAcc;
  }, {});

  // Convert to array format
  return Object.entries(teamCounts).map(([team, count]) => ({ team, count }));
}, []);

export const HippaDetailView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<typeof enrichedHippaArticles[0] | null>(null);

  const handleOpenArticle = (article: typeof enrichedHippaArticles[0]) => {
    setSelectedArticle(article);
  };

  if (selectedArticle) {
    return (
      <ArticleDetailView 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-6">HIPPA Compliance</h2>
      
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6">

        {/* Non compliant articles */}
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Non-Compliant Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrichedHippaArticles
                .filter(article => article.nonCompliantInstances.length > 0)
                .map(article => (
                  <Card key={article.id} className="cursor-pointer">
                    <CardHeader>
                      <CardTitle className="text-base">{article.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Non-compliant instances</span>
                        <span className="text-lg font-bold text-red-600">
                          {article.nonCompliantInstances.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

        {/* Non compliant teams */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Non-Compliance by Team</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {teamNonComplianceData.map(item => (
                    <div key={item.team} className="text-center">
                      <div className="text-2xl font-bold text-red-600">{item.count}</div>
                      <div className="text-sm text-gray-500">{item.team}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Articles and company policies */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Articles & Company Policy</h3>
            <div className="space-y-6">
              {enrichedHippaArticles.map(article => (
                <Card key={article.id} className="cursor-default">
                  <CardHeader
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleOpenArticle(article)}
                  >
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{article.name}</CardTitle>
                      {article.nonCompliantInstances.length > 0 && (
                        <span className="text-sm font-bold text-red-600">
                          {article.nonCompliantInstances.length} non-compliant
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{article.text}</p>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible>
                      {article.policies.map((policy, index) => (
                        <AccordionItem key={index} value={`${article.id}-policy-${index}`}>
                          <AccordionTrigger>{policy.name}</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-gray-500 mb-2">{policy.description}</p>
                            <a 
                              href={policy.link}
                              className="text-sm text-blue-600 hover:underline"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Policy Document
                            </a>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="h-8" />
        </div>
      </ScrollArea>
    </div>
  )
} 