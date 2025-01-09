'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { hippaArticles } from '@/data/regulations/hippa'
import { useState } from 'react'
import { ArticleDetailView } from './article-detail-view'


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
    nonCompliantInstances: [] // Empty because compliant
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
    nonCompliantInstances: []
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
    ]
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
    ]
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
    ]
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
    nonCompliantInstances: []
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
                <Card 
                  key={article.id} 
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => handleOpenArticle(article)}
                >
                  <CardHeader>
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