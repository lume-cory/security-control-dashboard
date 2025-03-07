import { getRelativeDate } from "@/app/utils/date-utils";
import { dataSources } from "./data-sources";
import { complianceSources } from "./compliance-sources";

export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type RiskTrend = 'INCREASING' | 'DECREASING' | 'STABLE';
export type RiskStatus = 'ON_TRACK' | 'AT_RISK' | 'OFF_TRACK' | 'NOT_STARTED';

interface RiskMetric {
  name: string;
  value: number;
  target: number;
  trend: RiskTrend;
  dataSource: string;
  lastUpdated: string;
}

interface MitigationActivity {
  id: string;
  description: string;
  status: RiskStatus;
  owner: string;
  dueDate: string;
  progress: number;
  lastUpdated: string;
  relatedSources?: string[];
}

interface OwnerUpdateEvidence {
  sourceId: string;
  sourceName: string;
  description: string;
  date: string;
  relevance: string;
}

interface Report {
    summary: string;
    businessContext: string;
    evidence: OwnerUpdateEvidence[];
    impact: {
      operational: string;
      financial: string;
      strategic: string;
    };
    recommendations: {
      rationale: string;
      timeline: string;
      nextSteps: string[];
    };
}

interface OwnerUpdateReport {
  id: string;
  status: 'OPEN' | 'AWAITING_RESPONSE' | 'RESPONSE_RECEIVED';
  requestDate: string;
  responseDeadline: string;
  lastFollowUp: string;
  requestThreadId: string;
  report: Report;
}

export interface Risk {
  id: string;
  category: string;
  description: string;
  severity: RiskSeverity;
  trend: RiskTrend;
  owner: {
    team: string;
    name: string;
    email: string;
    slack: string;
  };
  ownerUpdateReport?: OwnerUpdateReport;
  metrics: RiskMetric[];
  mitigationActivities: MitigationActivity[];
  lastAssessment: string;
  nextAssessment: string;
  relatedPolicies: string[];
  relatedRegulations: string[];
  dataSources: string[];
  aiSummary?: string;
  aiRecommendations?: string[];
}

export const organizationalRisks: Risk[] = [
  {
    id: "RISK-001",
    category: "Regulatory Compliance",
    description: "Non-compliance with global IoT security and privacy laws (GDPR, NIS2, DORA, US IoT Cybersecurity Act) leading to fines and reputational damage",
    severity: "HIGH",
    trend: "INCREASING",
    owner: {
      team: "Legal & Compliance",
      name: "Sarah Chen",
      email: "compliance@company.com",
      slack: "#legal-compliance"
    },
    metrics: [
      {
        name: "Regulatory Violations",
        value: 2,
        target: 0,
        trend: "INCREASING",
        dataSource: "DS-001",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Compliance Coverage",
        value: 85,
        target: 98,
        trend: "STABLE",
        dataSource: "DS-001",
        lastUpdated: getRelativeDate(-1)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-001",
        description: "Implement automated compliance monitoring system",
        status: "ON_TRACK",
        owner: "Sarah Chen",
        dueDate: getRelativeDate(30),
        progress: 65,
        lastUpdated: getRelativeDate(-2),
        relatedSources: ["DS-001", "DS-002"]
      },
      {
        id: "MIT-002",
        description: "Enhance security by design program for IoT devices",
        status: "ON_TRACK",
        owner: "Michael Rodriguez",
        dueDate: getRelativeDate(45),
        progress: 40,
        lastUpdated: getRelativeDate(-3),
        relatedSources: ["DS-002", "DS-008"]
      }
    ],
    lastAssessment: getRelativeDate(-30),
    nextAssessment: getRelativeDate(60),
    relatedPolicies: ["POL-001", "POL-002"],
    relatedRegulations: ["REG-001", "REG-002", "REG-003", "REG-004"],
    dataSources: ["DS-001", "DS-002", "DS-008"],
    aiSummary: "Regulatory compliance risk has increased due to new updates in IoT security regulations. Key focus areas include compliance with ETSI EN 303 645 and the US IoT Cybersecurity Act.",
    aiRecommendations: [
      "Implement automated compliance tracking system",
      "Increase regulatory monitoring coverage",
      "Enhance security-by-design practices"
    ],
    ownerUpdateReport: {
      id: "OWN-001",
      status: "AWAITING_RESPONSE",
      requestDate: getRelativeDate(-2),
      responseDeadline: getRelativeDate(3),
      lastFollowUp: getRelativeDate(-1),
      requestThreadId: "1234567890.123",
      report: {
        summary: "Critical update regarding our regulatory compliance risk posture and recommended organizational changes to address increasing global IoT security regulations.",
        businessContext: `Our regulatory compliance risk has elevated due to two key factors:
          1. Expanded scope of IoT security regulations in key markets (EU, US)
          2. Increased complexity of compliance requirements demanding specialized oversight

          Current compliance metrics show a concerning trend with violations increasing by 40% this quarter, while our compliance coverage (85%) remains below target (98%).`,
        evidence: [
          {
            sourceId: "DS-001",
            sourceName: "Regulatory Compliance Report",
            description: "Two new regulatory violations identified in EU market related to device security requirements",
            date: getRelativeDate(-15),
            relevance: "Demonstrates immediate need for enhanced regulatory oversight"
          },
          {
            sourceId: "DS-002",
            sourceName: "Security-by-design Compliance Report",
            description: "Security-by-design compliance gap analysis reveals 35% of controls require IoT-specific expertise",
            date: getRelativeDate(-10),
            relevance: "Highlights specialized knowledge requirements for effective risk management"
          },
          {
            sourceId: "DS-008",
            sourceName: "IoT Security Assessment Report",
            description: "Recent IoT security assessment identified 3 high-priority compliance gaps in device monitoring",
            date: getRelativeDate(-5),
            relevance: "Indicates need for technical IoT security leadership in compliance processes"
          }
        ],
        impact: {
          operational: "Current structure creates delays in compliance validation, averaging 45 days for new requirement implementation versus industry standard of 30 days",
          financial: "Potential exposure to increased fines under new regulations (up to 4% of global revenue) if gaps aren't addressed within 90 days",
          strategic: "Risk of losing competitive position in EU market where 60% of our IoT revenue originates"
        },
        recommendations: {
          rationale: "As IoT Security Director, Michael brings: 1) Deep technical understanding of IoT security controls, 2) Established relationships with regulatory bodies, 3) Successful track record implementing compliance frameworks",
          timeline: "Critical to transition within 30 days to address immediate compliance gaps and upcoming regulatory deadlines",
          nextSteps: [
            "Board approval for organizational change",
            "Initiate compliance gap remediation program",
            "Establish enhanced compliance monitoring framework",
            "Update regulatory reporting structure"
          ]
        }
      }
    }
  },
  {
    id: "RISK-002",
    category: "Product Security",
    description: "Vulnerabilities in IoT firmware/software leading to exploits, botnet infections, or unauthorized access",
    severity: "MEDIUM",
    trend: "DECREASING",
    owner: {
      team: "Product Security",
      email: "productsec@company.com",
      slack: "#product-security"
    },
    metrics: [
      {
        name: "Critical Vulnerabilities",
        value: 3,
        target: 0,
        trend: "DECREASING",
        dataSource: "DS-009",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "SBOM Coverage",
        value: 95,
        target: 100,
        trend: "INCREASING",
        dataSource: "DS-010",
        lastUpdated: getRelativeDate(-1)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-003",
        description: "Implement automated firmware security testing",
        status: "ON_TRACK",
        owner: "David Chen",
        dueDate: getRelativeDate(15),
        progress: 85,
        lastUpdated: getRelativeDate(-1),
        relatedSources: ["DS-009"]
      }
    ],
    lastAssessment: getRelativeDate(-15),
    nextAssessment: getRelativeDate(75),
    relatedPolicies: ["POL-001"],
    relatedRegulations: ["REG-004", "STD-002"],
    dataSources: ["DS-009", "DS-010"],
    aiSummary: "Product security risk is decreasing due to improved automated testing and SBOM tracking. Focus remains on firmware security.",
    aiRecommendations: [
      "Expand automated security testing coverage",
      "Implement real-time vulnerability scanning",
      "Enhance firmware update process"
    ]
  },
  {
    id: "RISK-003",
    category: "Supply Chain Security",
    description: "Dependence on third-party components (chipsets, sensors) with potential security vulnerabilities or geopolitical restrictions",
    severity: "HIGH",
    trend: "INCREASING",
    owner: {
      team: "Supply Chain Security",
      email: "supplychain@company.com",
      slack: "#supply-chain-security"
    },
    metrics: [
      {
        name: "Supplier Security Incidents",
        value: 5,
        target: 0,
        trend: "INCREASING",
        dataSource: "DS-003",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Supplier Security Score",
        value: 72,
        target: 85,
        trend: "STABLE",
        dataSource: "DS-003",
        lastUpdated: getRelativeDate(-2)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-004",
        description: "Implement supplier security assessment program",
        status: "AT_RISK",
        owner: "Jennifer Lee",
        dueDate: getRelativeDate(45),
        progress: 35,
        lastUpdated: getRelativeDate(-5),
        relatedSources: ["DS-003", "DS-010"]
      }
    ],
    lastAssessment: getRelativeDate(-45),
    nextAssessment: getRelativeDate(45),
    relatedPolicies: ["POL-001"],
    relatedRegulations: ["REG-002", "REG-004"],
    dataSources: ["DS-003", "DS-010"],
    aiSummary: "Supply chain security risk has increased due to recent third-party incidents and geopolitical concerns.",
    aiRecommendations: [
      "Accelerate supplier security assessments",
      "Implement component diversity strategy",
      "Enhance third-party monitoring"
    ]
  },
  {
    id: "RISK-004",
    category: "Data Privacy Compliance",
    description: "Mishandling of user data (collection, processing, storage) leading to regulatory fines or consumer lawsuits",
    severity: "MEDIUM",
    trend: "DECREASING",
    owner: {
      team: "Privacy Team",
      email: "privacy@company.com",
      slack: "#privacy-team"
    },
    metrics: [
      {
        name: "Privacy Incidents",
        value: 1,
        target: 0,
        trend: "DECREASING",
        dataSource: "DS-004",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Privacy Impact Assessment Coverage",
        value: 92,
        target: 100,
        trend: "INCREASING",
        dataSource: "DS-004",
        lastUpdated: getRelativeDate(-1)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-005",
        description: "Implement AI-driven data minimization",
        status: "ON_TRACK",
        owner: "Emma Davis",
        dueDate: getRelativeDate(20),
        progress: 75,
        lastUpdated: getRelativeDate(-2),
        relatedSources: ["DS-004", "DS-005"]
      }
    ],
    lastAssessment: getRelativeDate(-20),
    nextAssessment: getRelativeDate(70),
    relatedPolicies: ["POL-002"],
    relatedRegulations: ["REG-001"],
    dataSources: ["DS-004", "DS-008"],
    aiSummary: "Data privacy risk is decreasing due to improved data handling practices and automated controls.",
    aiRecommendations: [
      "Complete data minimization implementation",
      "Enhance consent management system",
      "Expand privacy impact assessments"
    ]
  },
  {
    id: "RISK-005",
    category: "AI/ML Model Integrity",
    description: "Bias, adversarial attacks, or data poisoning in AI-driven IoT analytics impacting product performance",
    severity: "HIGH",
    trend: "INCREASING",
    owner: {
      team: "AI/ML Team",
      email: "aiml@company.com",
      slack: "#ai-security"
    },
    metrics: [
      {
        name: "Model Drift Incidents",
        value: 4,
        target: 0,
        trend: "INCREASING",
        dataSource: "DS-005",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Model Security Coverage",
        value: 78,
        target: 95,
        trend: "STABLE",
        dataSource: "DS-005",
        lastUpdated: getRelativeDate(-2)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-006",
        description: "Implement robust model monitoring system",
        status: "AT_RISK",
        owner: "Alex Wong",
        dueDate: getRelativeDate(25),
        progress: 45,
        lastUpdated: getRelativeDate(-3),
        relatedSources: ["DS-005"]
      }
    ],
    lastAssessment: getRelativeDate(-25),
    nextAssessment: getRelativeDate(65),
    relatedPolicies: ["POL-003"],
    relatedRegulations: ["REG-002", "REG-003"],
    dataSources: ["DS-005"],
    aiSummary: "AI/ML model integrity risk has increased due to detected adversarial attacks and model drift issues.",
    aiRecommendations: [
      "Implement adversarial training",
      "Enhance model monitoring",
      "Improve data validation"
    ]
  },
  {
    id: "RISK-006",
    category: "Operational Resilience",
    description: "Service downtime due to cyberattacks (DDoS, ransomware) or system failures affecting device connectivity",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "IT Operations",
      email: "itops@company.com",
      slack: "#it-ops"
    },
    metrics: [
      {
        name: "Service Availability",
        value: 99.95,
        target: 99.99,
        trend: "STABLE",
        dataSource: "DS-006",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Security Incidents",
        value: 2,
        target: 0,
        trend: "STABLE",
        dataSource: "DS-006",
        lastUpdated: getRelativeDate(-1)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-007",
        description: "Implement zero-trust architecture",
        status: "ON_TRACK",
        owner: "Robert Kim",
        dueDate: getRelativeDate(40),
        progress: 60,
        lastUpdated: getRelativeDate(-4),
        relatedSources: ["DS-006", "DS-011"]
      }
    ],
    lastAssessment: getRelativeDate(-30),
    nextAssessment: getRelativeDate(60),
    relatedPolicies: ["POL-001"],
    relatedRegulations: ["REG-003"],
    dataSources: ["DS-006", "DS-011"],
    aiSummary: "Operational resilience risk remains stable with continued focus on zero-trust implementation.",
    aiRecommendations: [
      "Complete zero-trust rollout",
      "Enhance DDoS protection",
      "Improve incident response automation"
    ]
  },
  {
    id: "RISK-007",
    category: "Third-Party Integrations",
    description: "Security risks from API integrations with cloud services or third-party platforms",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "API Security",
      email: "apisec@company.com",
      slack: "#api-security"
    },
    metrics: [
      {
        name: "API Security Issues",
        value: 3,
        target: 0,
        trend: "STABLE",
        dataSource: "DS-007",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "API Security Coverage",
        value: 88,
        target: 100,
        trend: "INCREASING",
        dataSource: "DS-007",
        lastUpdated: getRelativeDate(-2)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-008",
        description: "Deploy API security gateway",
        status: "ON_TRACK",
        owner: "Lisa Chen",
        dueDate: getRelativeDate(35),
        progress: 70,
        lastUpdated: getRelativeDate(-3),
        relatedSources: ["DS-007"]
      }
    ],
    lastAssessment: getRelativeDate(-25),
    nextAssessment: getRelativeDate(65),
    relatedPolicies: ["POL-001"],
    relatedRegulations: ["REG-002", "REG-003"],
    dataSources: ["DS-007", "DS-011"],
    aiSummary: "Third-party integration risk remains stable with improvements in API security controls.",
    aiRecommendations: [
      "Complete API gateway deployment",
      "Implement API security testing",
      "Enhance integration monitoring"
    ]
  },
  {
    id: "RISK-008",
    category: "Misuse of IoT Devices",
    description: "IoT devices being leveraged for malicious purposes (e.g., botnets, unauthorized surveillance)",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "IoT Security",
      email: "iotsec@company.com",
      slack: "#iot-security"
    },
    metrics: [
      {
        name: "Device Compromise Attempts",
        value: 156,
        target: 0,
        trend: "STABLE",
        dataSource: "DS-008",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Device Security Score",
        value: 87,
        target: 95,
        trend: "INCREASING",
        dataSource: "DS-008",
        lastUpdated: getRelativeDate(-1)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-009",
        description: "Implement device behavior monitoring",
        status: "ON_TRACK",
        owner: "Marcus Johnson",
        dueDate: getRelativeDate(30),
        progress: 80,
        lastUpdated: getRelativeDate(-2),
        relatedSources: ["DS-008", "DS-009"]
      }
    ],
    lastAssessment: getRelativeDate(-15),
    nextAssessment: getRelativeDate(75),
    relatedPolicies: ["POL-001"],
    relatedRegulations: ["REG-004", "STD-002"],
    dataSources: ["DS-008", "DS-009"],
    aiSummary: "Device misuse risk remains stable with improved detection capabilities. Focus on anomaly detection and secure bootstrapping.",
    aiRecommendations: [
      "Complete behavior monitoring rollout",
      "Enhance device authentication",
      "Implement automated response capabilities"
    ]
  },
  {
    id: "RISK-009",
    category: "Intellectual Property Theft",
    description: "Reverse engineering of IoT products leading to loss of competitive advantage",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "Product Security",
      email: "productsec@company.com",
      slack: "#product-security"
    },
    metrics: [
      {
        name: "IP Theft Attempts",
        value: 12,
        target: 0,
        trend: "STABLE",
        dataSource: "DS-009",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Product Security Score",
        value: 82,
        target: 90,
        trend: "INCREASING",
        dataSource: "DS-009",
        lastUpdated: getRelativeDate(-2)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-010",
        description: "Implement hardware security modules",
        status: "ON_TRACK",
        owner: "Rachel Kim",
        dueDate: getRelativeDate(45),
        progress: 55,
        lastUpdated: getRelativeDate(-3),
        relatedSources: ["DS-009"]
      }
    ],
    lastAssessment: getRelativeDate(-20),
    nextAssessment: getRelativeDate(70),
    relatedPolicies: ["POL-001"],
    relatedRegulations: [],
    dataSources: ["DS-009"],
    aiSummary: "IP theft risk remains stable with continued focus on hardware security and code obfuscation.",
    aiRecommendations: [
      "Complete HSM implementation",
      "Enhance code obfuscation",
      "Implement IP monitoring system"
    ]
  },
  {
    id: "RISK-010",
    category: "Financial & Insurance Risk",
    description: "Increased cyber insurance costs and financial losses from security incidents",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "Risk Management",
      email: "risk@company.com",
      slack: "#risk-management"
    },
    metrics: [
      {
        name: "Insurance Premium Increase",
        value: 15,
        target: 5,
        trend: "STABLE",
        dataSource: "DS-001",
        lastUpdated: getRelativeDate(-1)
      },
      {
        name: "Security Incident Costs",
        value: 250000,
        target: 100000,
        trend: "DECREASING",
        dataSource: "DS-001",
        lastUpdated: getRelativeDate(-2)
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-011",
        description: "Implement cyber risk quantification",
        status: "ON_TRACK",
        owner: "Thomas Lee",
        dueDate: getRelativeDate(50),
        progress: 40,
        lastUpdated: getRelativeDate(-4),
        relatedSources: ["DS-001", "DS-006"]
      }
    ],
    lastAssessment: getRelativeDate(-30),
    nextAssessment: getRelativeDate(60),
    relatedPolicies: ["POL-001"],
    relatedRegulations: ["REG-003"],
    dataSources: ["DS-001", "DS-006"],
    aiSummary: "Financial risk remains stable with focus on quantifying and reducing cyber insurance costs.",
    aiRecommendations: [
      "Complete risk quantification implementation",
      "Enhance incident cost tracking",
      "Improve insurance data reporting"
    ]
  }
]; 