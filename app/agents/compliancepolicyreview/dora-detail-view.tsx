'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from 'react'
import { ArticleDetailView } from './article-detail-view'
import { doraArticles as baseDoraArticles } from '@/data/regulations/dora'

interface DoraArticle {
  id: string;
  name: string;
  text: string;
  article: string;
  subArticle: string;
  type: string;
  status: 'Active' | 'Suggested';
  policies: Array<PolicyItem>;
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

type ArticleType = Parameters<typeof ArticleDetailView>[0]['article'];

interface PolicyItem {
  id: string;
  name: string;
  description: string;
  link: string;
  policyText: string;
  status: 'active' | 'suggested';
}

export const enrichedDoraArticles = [
  {
    id: '4.1',
    name: 'ICT Risk Management Framework',
    text: baseDoraArticles.find(a => a.id === '4.1')?.text || '',
    article: 'Article 4',
    subArticle: '4.1',
    type: 'Risk Management',
    status: 'Active',
    policies: [
      {
        id: "VM-001",
        name: "Enterprise Risk Management Policy",
        description: "Comprehensive risk management including ICT risks",
        policyText: "The organization shall maintain a comprehensive risk management framework that includes identification, assessment, and mitigation of ICT risks across all business units.",
        link: "/policies/enterprise-risk-v3.pdf",
        status: "active"
      },
      {
        id: "IS-002",
        name: "ICT Risk Assessment Framework",
        description: "Framework for ICT risk identification and management",
        policyText: "All ICT systems must undergo quarterly risk assessments following the NIST framework, with findings documented and tracked in the risk register.",
        link: "/policies/ict-risk-framework.pdf",
        status: "active"
      },
      {
        id: "IS-007",
        name: "ICT Resilience Testing Policy",
        description: "Regular testing of ICT system resilience",
        policyText: "The organization shall conduct regular resilience testing of critical ICT systems, including stress testing and recovery scenarios, at least bi-annually.",
        link: "",
        status: "suggested"
      }
    ],
    impactedSystems: [
      {
        name: "Risk Management Platform",
        type: "Service",
        repository: "github.com/company/risk-platform",
        team: "Risk Management",
        teamContact: "risk@company.com"
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: "Legacy Trading System",
          type: "Application",
          repository: "github.com/company/trading-legacy",
          team: "Trading Tech",
          teamContact: "trading@company.com"
        },
        issue: "No documented ICT risk assessment",
        mitigation: "Implement ICT risk assessment framework",
        status: "In Progress",
        dueDate: "2024-06-30"
      }
    ],
    supportingEvidence: {
      configurations: [{
        tool: "Risk Assessment Tool",
        type: "SaaS",
        evidence: {
          policyName: "Risk Assessment Policy",
          settings: [
            { name: "Assessment Frequency", value: "Quarterly" },
            { name: "Risk Scoring Method", value: "CVSS v3.1" }
          ],
          lastUpdated: "2024-03-15",
          version: "2.1.0"
        }
      }],
      metrics: [{
        name: "Risk Assessment Coverage",
        current: 85,
        target: 100,
        trend: "increasing",
        history: [
          { date: "2024-01", value: 75 },
          { date: "2024-02", value: 80 },
          { date: "2024-03", value: 85 }
        ]
      }],
      audits: [{
        date: "2024-02-15",
        type: "Internal",
        scope: "ICT Risk Management Framework",
        findings: "Minor gaps in risk assessment documentation",
        auditor: "Internal Audit Team"
      },
      {
        date: "2023-11-20",
        type: "External",
        scope: "DORA Compliance Assessment",
        findings: "Need to improve resilience testing frequency",
        auditor: "PwC"
      }]
    }
  },
  {
    id: '5.1',
    name: 'ICT Governance',
    text: baseDoraArticles.find(a => a.id === '5.1')?.text || '',
    article: 'Article 5',
    subArticle: '5.1',
    type: 'Governance',
    status: 'Active',
    policies: [
      {
        id: "GOV-001",
        name: "ICT Governance Framework",
        description: "Internal governance structure for ICT risk management",
        policyText: "The organization shall establish and maintain a governance structure that clearly defines roles and responsibilities for ICT risk management at all levels.",
        link: "/policies/ict-governance.pdf",
        status: "active"
      },
      {
        id: "IS-008",
        name: "ICT Risk Committee Charter",
        description: "Establishment of dedicated ICT risk committee",
        policyText: "A dedicated ICT Risk Committee shall be established to oversee ICT risk management activities and report directly to the board.",
        link: "",
        status: "suggested"
      }
    ],
    impactedSystems: [],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [{
        tool: "ServiceNow GRC",
        type: "SaaS",
        evidence: {
          policyName: "ICT Governance Controls",
          settings: [
            { name: "Control Framework", value: "COBIT 2019" },
            { name: "Review Frequency", value: "Monthly" }
          ],
          lastUpdated: "2024-03-01",
          version: "3.2.1"
        }
      }],
      metrics: [{
        name: "Governance Meeting Attendance",
        current: 92,
        target: 95,
        trend: "increasing",
        history: [
          { date: "2024-01", value: 88 },
          { date: "2024-02", value: 90 },
          { date: "2024-03", value: 92 }
        ]
      }],
      audits: [{
        date: "2024-01-15",
        type: "External",
        scope: "ICT Governance Framework Review",
        findings: "Governance structure well-defined, minor improvements needed in documentation",
        auditor: "Deloitte"
      }]
    }
  },
  {
    id: '5.4',
    name: 'Security Awareness',
    text: baseDoraArticles.find(a => a.id === '5.4')?.text || '',
    article: 'Article 5',
    subArticle: '5.4',
    type: 'Training',
    status: 'Active',
    policies: [
      {
        id: "TR-001",
        name: "Security Awareness Program",
        description: "Comprehensive security awareness training program",
        policyText: "All employees must complete annual security awareness training covering ICT risks, incident reporting, and best practices.",
        link: "/policies/security-awareness.pdf",
        status: "active"
      }
    ],
    impactedSystems: [
      {
        name: "Learning Management System",
        type: "Service",
        repository: "github.com/company/lms",
        team: "Learning & Development",
        teamContact: "learning@company.com"
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: "Contractor Portal",
          type: "Application",
          repository: "github.com/company/contractor-portal",
          team: "External Services",
          teamContact: "external@company.com"
        },
        issue: "Contractors not included in security awareness program",
        mitigation: "Extend training program to contractors",
        status: "Planned",
        dueDate: "2024-07-15"
      }
    ],
    supportingEvidence: {
      configurations: [],
      metrics: [{
        name: "Training Completion Rate",
        current: 89,
        target: 100,
        trend: "stable",
        history: [
          { date: "2024-01", value: 88 },
          { date: "2024-02", value: 89 },
          { date: "2024-03", value: 89 }
        ]
      }],
      audits: []
    }
  },
  {
    id: '7.1',
    name: 'ICT Systems Reliability',
    text: baseDoraArticles.find(a => a.id === '7.1')?.text || '',
    article: 'Article 7',
    subArticle: '7.1',
    type: 'Operations',
    status: 'Active',
    policies: [
      {
        id: "OPS-001",
        name: "System Reliability Standards",
        description: "Standards for system reliability and performance",
        policyText: "Critical systems must maintain 99.99% uptime and handle 200% of peak load without degradation.",
        link: "/policies/reliability-standards.pdf",
        status: "active"
      },
      {
        id: "OPS-003",
        name: "Stress Testing Policy",
        description: "Regular stress testing of critical systems",
        policyText: "Critical systems shall undergo quarterly stress testing to validate performance under peak conditions.",
        link: "",
        status: "suggested"
      }
    ],
    impactedSystems: [
      {
        name: "Trading Platform",
        type: "Service",
        repository: "github.com/company/trading-platform",
        team: "Trading Tech",
        teamContact: "trading@company.com"
      }
    ],
    nonCompliantInstances: [],
    supportingEvidence: {
      configurations: [],
      metrics: [],
      audits: []
    }
  },
  {
    id: '9.2',
    name: 'ICT Security Measures',
    text: baseDoraArticles.find(a => a.id === '9.2')?.text || '',
    article: 'Article 9',
    subArticle: '9.2',
    type: 'Security',
    status: 'Active',
    policies: [
      {
        id: "DS-001",
        name: "Data Security Controls",
        description: "Controls for data protection across lifecycle",
        policyText: "All sensitive data must be encrypted at rest and in transit using approved algorithms and key management procedures.",
        link: "/policies/data-security.pdf",
        status: "active"
      },
      {
        id: "DS-004",
        name: "Advanced Encryption Standards",
        description: "Enhanced encryption requirements",
        policyText: "Implementation of quantum-resistant encryption algorithms for critical data storage and transmission.",
        link: "",
        status: "suggested"
      }
    ],
    impactedSystems: [
      {
        name: "Data Lake",
        type: "Service",
        repository: "github.com/company/data-lake",
        team: "Data Platform",
        teamContact: "data@company.com"
      }
    ],
    nonCompliantInstances: [
      {
        system: {
          name: "Legacy Storage System",
          type: "Infrastructure",
          repository: "github.com/company/storage-legacy",
          team: "Infrastructure",
          teamContact: "infra@company.com"
        },
        issue: "Using deprecated encryption standards",
        mitigation: "Upgrade to approved encryption algorithms",
        status: "In Progress",
        dueDate: "2024-08-30"
      }
    ],
    supportingEvidence: {
      configurations: [],
      metrics: [],
      audits: []
    }
  }
];

const teamNonComplianceData = enrichedDoraArticles.reduce((acc: Record<string, { team: string, count: number }>, article) => {
  article.nonCompliantInstances.forEach(instance => {
    const team = instance.system.team;
    if (!acc[team]) {
      acc[team] = { team, count: 0 };
    }
    acc[team].count += 1;
  });
  return acc;
}, {});

export const DoraDetailView: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<(typeof enrichedDoraArticles)[0] | null>(null);

  const handleOpenArticle = (article: (typeof enrichedDoraArticles)[0]) => {
    setSelectedArticle(article);
  };

  if (selectedArticle) {
    const enrichedArticle = {
      ...selectedArticle,
      policies: selectedArticle.policies.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        policyText: p.policyText || '',
        status: p.status || 'active',
        link: p.link
      })),
      impactedSystems: selectedArticle.impactedSystems || [],
      nonCompliantInstances: selectedArticle.nonCompliantInstances || [],
      supportingEvidence: {
        configurations: selectedArticle.supportingEvidence?.configurations || [],
        metrics: selectedArticle.supportingEvidence?.metrics || [],
        audits: selectedArticle.supportingEvidence?.audits || []
      }
    };
    
    return <ArticleDetailView 
      article={enrichedArticle}
      onClose={() => setSelectedArticle(null)} 
    />;
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-[calc(100vh-2rem)]">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Digital Operational Resilience Act (DORA)</h2>
          
          {/* Policy Status Overview */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Policy Status Overview</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {enrichedDoraArticles.reduce((count, article) => 
                        count + article.policies.filter(policy => policy.status === 'active').length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Active Policies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {enrichedDoraArticles.reduce((count, article) => 
                        count + article.policies.filter(policy => policy.status === 'suggested').length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Suggested Policies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {enrichedDoraArticles.reduce((count, article) => 
                        count + article.nonCompliantInstances.length, 0
                      )}
                    </div>
                    <div className="text-sm text-gray-500">Non-compliant Systems</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-sm text-gray-500">Overall Alignment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Non compliant articles */}
        <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Non-Compliant Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {enrichedDoraArticles
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
                  {Object.values(teamNonComplianceData).map(item => (
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
            <h3 className="text-lg font-semibold mb-4">DORA Articles & Company Policy</h3>
            <div className="space-y-6">
              {enrichedDoraArticles.map(article => (
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
                          <AccordionTrigger>
                            <span className="flex items-center gap-2">
                              <span>{policy.name}</span>
                              <span className="text-sm text-muted-foreground">({policy.id})</span>
                              {policy.status === 'suggested' && (
                                <span className="text-sm text-yellow-600">(Suggested)</span>
                              )}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm text-gray-500 mb-2">{policy.description}</p>
                            <p className="text-sm text-gray-700 mb-2">{policy.policyText}</p>
                            {policy.status === 'active' && (
                              <a 
                                href={policy.link}
                                className="text-sm text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Policy Document
                              </a>
                            )}
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
  );
}; 