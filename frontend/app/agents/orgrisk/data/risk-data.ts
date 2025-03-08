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
  dataSourceName: string;
  dataSourceLink: string;
  lastUpdated: string;
  context: string;
  system: string;
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
  ticketId: string;
  ticketSystem: string;
  ticketLink: string;
  affectedSystem: string;
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
  ownerUpdateReport: OwnerUpdateReport;
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
        dataSourceName: "Compliance Monitoring Dashboard",
        dataSourceLink: "https://compliance.internal/dashboard/violations",
        lastUpdated: getRelativeDate(-1),
        context: "Two new regulatory violations identified in EU market related to ETSI EN 303 645 device security requirements",
        system: "ComplianceTracker Pro"
      },
      {
        name: "Compliance Coverage",
        value: 85,
        target: 98,
        trend: "STABLE",
        dataSource: "DS-002",
        dataSourceName: "Security Controls Assessment",
        dataSourceLink: "https://securitycontrols.internal/compliance/coverage",
        lastUpdated: getRelativeDate(-1),
        context: "Security-by-design compliance gap analysis reveals 35% of controls require IoT-specific expertise",
        system: "GRC Platform"
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
        relatedSources: ["DS-001", "DS-002"],
        ticketId: "COMP-1234",
        ticketSystem: "Jira",
        ticketLink: "https://jira.internal/browse/COMP-1234",
        affectedSystem: "ComplianceTracker Pro"
      },
      {
        id: "MIT-002",
        description: "Enhance security by design program for IoT devices",
        status: "ON_TRACK",
        owner: "Michael Rodriguez",
        dueDate: getRelativeDate(45),
        progress: 40,
        lastUpdated: getRelativeDate(-3),
        relatedSources: ["DS-002", "DS-008"],
        ticketId: "SEC-5678",
        ticketSystem: "Jira",
        ticketLink: "https://jira.internal/browse/SEC-5678",
        affectedSystem: "DevSecOps Pipeline"
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
      name: "Mike Decker",
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
        dataSourceName: "Security Vulnerability Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Three critical vulnerabilities identified in IoT firmware/software",
        system: "DS-009"
      },
      {
        name: "SBOM Coverage",
        value: 95,
        target: 100,
        trend: "INCREASING",
        dataSource: "DS-010",
        dataSourceName: "Software Bill of Materials",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "95% of software components in IoT devices are covered by SBOM",
        system: "DS-010"
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
        relatedSources: ["DS-009"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-009"
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
    ],
    ownerUpdateReport: {
      id: "OWN-002",
      status: "RESPONSE_RECEIVED",
      requestDate: getRelativeDate(-15),
      responseDeadline: getRelativeDate(-5),
      lastFollowUp: getRelativeDate(-10),
      requestThreadId: "1234567890.124",
      report: {
        summary: "Product security vulnerability management improvements and firmware security testing automation results",
        businessContext: `Our product security risk has shown improvement this quarter due to:
          1. Implementation of automated firmware security testing
          2. Increased SBOM coverage across product lines
          3. Reduction in critical vulnerabilities from 7 to 3

          While our trend is positive, we still have 3 critical vulnerabilities that require remediation and our SBOM coverage (95%) remains below our target (100%).`,
        evidence: [
          {
            sourceId: "DS-009",
            sourceName: "Firmware Security Scan Results",
            description: "Automated firmware scanning identified 3 critical vulnerabilities in legacy device firmware",
            date: getRelativeDate(-12),
            relevance: "Demonstrates effectiveness of new scanning tools but highlights remaining security gaps"
          },
          {
            sourceId: "DS-010",
            sourceName: "SBOM Coverage Report",
            description: "SBOM coverage increased to 95% across all product lines, with remaining gaps in acquired technology",
            date: getRelativeDate(-8),
            relevance: "Shows progress in component visibility but identifies areas requiring further attention"
          },
          {
            sourceId: "DS-002",
            sourceName: "Security-by-Design Assessment",
            description: "Security-by-design principles now incorporated in 85% of new product development processes",
            date: getRelativeDate(-7),
            relevance: "Indicates cultural shift in development practices but highlights need for complete adoption"
          }
        ],
        impact: {
          operational: "Automated firmware testing has reduced security validation time from 14 days to 3 days per release",
          financial: "Vulnerability remediation costs decreased by 35% due to earlier detection in development cycle",
          strategic: "Improved security posture strengthens our competitive position in enterprise IoT markets where security certification is required"
        },
        recommendations: {
          rationale: "To address remaining critical vulnerabilities and achieve 100% SBOM coverage, we need to: 1) Accelerate legacy firmware patching, 2) Complete integration of acquired technology into security processes, 3) Automate component analysis in CI/CD pipeline",
          timeline: "Critical vulnerabilities should be remediated within 30 days; SBOM coverage gaps closed within 60 days",
          nextSteps: [
            "Deploy emergency patches for 3 critical vulnerabilities",
            "Complete SBOM generation for acquired technology products",
            "Integrate component analysis into CI/CD pipeline",
            "Implement automated vulnerability correlation with threat intelligence"
          ]
        }
      }
    }
  },
  {
    id: "RISK-003",
    category: "Supply Chain Security",
    description: "Dependence on third-party components (chipsets, sensors) with potential security vulnerabilities or geopolitical restrictions",
    severity: "HIGH",
    trend: "INCREASING",
    owner: {
      team: "Supply Chain Security",
      name: "Loni Davis",
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
        dataSourceName: "Supplier Security Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Five supplier security incidents reported in the last quarter",
        system: "DS-003"
      },
      {
        name: "Supplier Security Score",
        value: 72,
        target: 85,
        trend: "STABLE",
        dataSource: "DS-003",
        dataSourceName: "Supplier Risk Assessment",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-2),
        context: "Supplier security score remains stable at 72 out of 100",
        system: "DS-003"
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
        relatedSources: ["DS-003", "DS-010"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-003"
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
    ],
    ownerUpdateReport: {
      id: "OWN-003",
      status: "AWAITING_RESPONSE",
      requestDate: getRelativeDate(-5),
      responseDeadline: getRelativeDate(5),
      lastFollowUp: getRelativeDate(-2),
      requestThreadId: "1234567890.125",
      report: {
        summary: "Critical supply chain security concerns requiring immediate attention due to increasing supplier incidents and geopolitical risks",
        businessContext: `Our supply chain security risk has elevated significantly due to:
          1. 40% increase in supplier security incidents (from 3 to 5 this quarter)
          2. Geopolitical tensions affecting key component suppliers in Asia
          3. New regulatory requirements for supply chain transparency

          Supplier security scores remain stagnant at 72 (target: 85) despite remediation efforts, indicating systemic issues.`,
        evidence: [
          {
            sourceId: "DS-003",
            sourceName: "Supplier Security Incident Report",
            description: "Five security incidents reported across tier 1 and 2 suppliers, including one data breach affecting our component specifications",
            date: getRelativeDate(-10),
            relevance: "Demonstrates increasing threat activity targeting our supply chain"
          },
          {
            sourceId: "DS-010",
            sourceName: "Component Risk Analysis",
            description: "23% of critical components sourced from high-risk geopolitical regions with increasing export restrictions",
            date: getRelativeDate(-8),
            relevance: "Highlights dependency on potentially unreliable supply sources"
          },
          {
            sourceId: "DS-003",
            sourceName: "Supplier Assessment Program Results",
            description: "Supplier security assessment program implementation delayed, with only 35% completion against 75% target",
            date: getRelativeDate(-6),
            relevance: "Shows significant gaps in our visibility into supplier security practices"
          }
        ],
        impact: {
          operational: "Component shortages from security-related disruptions have delayed two product launches by an average of 45 days",
          financial: "Supply chain incidents have increased production costs by approximately $2.3M this quarter",
          strategic: "Continued disruptions threaten our ability to meet contractual obligations with three major enterprise customers"
        },
        recommendations: {
          rationale: "To address critical supply chain risks, we need to: 1) Accelerate supplier security assessment program, 2) Diversify high-risk component sourcing, 3) Implement continuous monitoring of supplier security posture",
          timeline: "Immediate action required - assessment program acceleration within 30 days, sourcing diversification plan within 60 days",
          nextSteps: [
            "Allocate additional resources to supplier assessment program",
            "Identify alternative suppliers for high-risk components",
            "Implement real-time monitoring for critical supplier security metrics",
            "Develop contingency plans for potential supply disruptions"
          ]
        }
      }
    }
  },
  {
    id: "RISK-004",
    category: "Data Privacy Compliance",
    description: "Mishandling of user data (collection, processing, storage) leading to regulatory fines or consumer lawsuits",
    severity: "MEDIUM",
    trend: "DECREASING",
    owner: {
      team: "Privacy Team",
      name: "Nina Smith",
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
        dataSourceName: "Privacy Incident Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "One privacy incident reported in the last quarter",
        system: "DS-004"
      },
      {
        name: "Privacy Impact Assessment Coverage",
        value: 92,
        target: 100,
        trend: "INCREASING",
        dataSource: "DS-004",
        dataSourceName: "Privacy Impact Assessment",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "92% of data handling practices are covered by privacy impact assessments",
        system: "DS-004"
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
        relatedSources: ["DS-004", "DS-005"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-004"
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
    ],
    ownerUpdateReport: {
      id: "OWN-004",
      status: "OPEN",
      requestDate: getRelativeDate(-1),
      responseDeadline: getRelativeDate(6),
      lastFollowUp: getRelativeDate(-1),
      requestThreadId: "1234567890.126",
      report: {
        summary: "Privacy compliance improvements needed to address data handling practices and upcoming regulatory changes",
        businessContext: `Our privacy compliance risk is decreasing but requires continued attention due to:
          1. Improved data handling practices reducing privacy incidents by 30%
          2. Upcoming regulatory changes in key markets (EU AI Act, US state privacy laws)
          3. Increasing customer demands for privacy transparency

          While our privacy assessment score has improved to 78 (target: 90), we still have gaps in data minimization and consent management.`,
        evidence: [
          {
            sourceId: "DS-004",
            sourceName: "Privacy Impact Assessment Results",
            description: "Privacy impact assessments completed for 78% of data processing activities, identifying 12 high-risk processes requiring remediation",
            date: getRelativeDate(-15),
            relevance: "Shows progress in privacy governance but highlights remaining high-risk areas"
          },
          {
            sourceId: "DS-004",
            sourceName: "Regulatory Tracking Report",
            description: "Five new privacy regulations identified that will impact our operations in the next 12 months",
            date: getRelativeDate(-10),
            relevance: "Indicates increasing regulatory complexity requiring proactive compliance planning"
          },
          {
            sourceId: "DS-008",
            sourceName: "Device Data Flow Analysis",
            description: "IoT devices collecting 35% more data than required for core functionality, creating unnecessary privacy risk",
            date: getRelativeDate(-7),
            relevance: "Highlights opportunities for data minimization to reduce compliance scope"
          }
        ],
        impact: {
          operational: "Privacy compliance validation adds 20 days to product release cycles, above industry average of 12 days",
          financial: "Current privacy remediation efforts costing approximately $1.2M annually, with potential regulatory fines of up to $25M if not addressed",
          strategic: "Enhanced privacy capabilities represent potential competitive advantage in privacy-sensitive markets (healthcare, education)"
        },
        recommendations: {
          rationale: "To strengthen privacy compliance, we need to: 1) Implement privacy-by-design in all product development, 2) Enhance data minimization practices, 3) Automate consent management across all customer touchpoints",
          timeline: "High-risk process remediation within 60 days, privacy-by-design implementation within 90 days",
          nextSteps: [
            "Complete remediation of 12 high-risk data processing activities",
            "Implement data minimization review in product development process",
            "Deploy enhanced consent management system",
            "Develop privacy compliance dashboard for executive visibility"
          ]
        }
      }
    }
  },
  {
    id: "RISK-005",
    category: "AI/ML Model Integrity",
    description: "Bias, adversarial attacks, or data poisoning in AI-driven IoT analytics impacting product performance",
    severity: "HIGH",
    trend: "INCREASING",
    owner: {
      team: "AI/ML Team",
      name: "Ridge Hargrave",
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
        dataSourceName: "Model Drift Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Four model drift incidents reported in the last quarter",
        system: "DS-005"
      },
      {
        name: "Model Security Coverage",
        value: 78,
        target: 95,
        trend: "STABLE",
        dataSource: "DS-005",
        dataSourceName: "Model Security Assessment",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-2),
        context: "78% of model security controls are effective",
        system: "DS-005"
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
        relatedSources: ["DS-005"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-005"
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
    ],
    ownerUpdateReport: {
      id: "OWN-005",
      status: "AWAITING_RESPONSE",
      requestDate: getRelativeDate(-3),
      responseDeadline: getRelativeDate(4),
      lastFollowUp: getRelativeDate(-1),
      requestThreadId: "1234567890.127",
      report: {
        summary: "Urgent attention needed for AI/ML ethics and safety risks as deployment accelerates across product lines",
        businessContext: `Our AI/ML ethics and safety risk has increased significantly due to:
          1. Accelerated AI deployment across 65% of our product portfolio (up from 40%)
          2. Emerging regulatory requirements for AI transparency and accountability
          3. Increasing public scrutiny of AI ethics in consumer products

          Our AI ethics assessment score remains concerning at 65 (target: 90), with particular gaps in bias testing and explainability.`,
        evidence: [
          {
            sourceId: "DS-005",
            sourceName: "AI Model Risk Assessment",
            description: "Comprehensive assessment of 23 production AI models found 7 with high bias risk and 12 with insufficient explainability",
            date: getRelativeDate(-15),
            relevance: "Identifies specific high-risk models requiring immediate remediation"
          },
          {
            sourceId: "DS-005",
            sourceName: "AI Incident Report",
            description: "Three AI-related incidents reported in customer deployments, including one case of demographic performance disparity",
            date: getRelativeDate(-10),
            relevance: "Demonstrates real-world impact of AI ethics gaps"
          },
          {
            sourceId: "DS-001",
            sourceName: "Regulatory Horizon Scan",
            description: "EU AI Act and similar regulations in 5 key markets will require comprehensive AI documentation and testing within 12 months",
            date: getRelativeDate(-5),
            relevance: "Highlights urgent need for compliance preparation"
          }
        ],
        impact: {
          operational: "AI ethics reviews currently adding 30+ days to AI feature releases due to manual processes",
          financial: "Remediation of high-risk AI models estimated at $3.5M, with potential regulatory penalties of $10M+ if not addressed",
          strategic: "AI ethics leadership opportunity to differentiate in market and build trust with enterprise customers"
        },
        recommendations: {
          rationale: "To address AI ethics and safety risks, we need to: 1) Implement comprehensive AI governance framework, 2) Deploy automated bias testing and monitoring, 3) Enhance model documentation and explainability",
          timeline: "Critical - remediation of high-risk models within 45 days, governance framework implementation within 90 days",
          nextSteps: [
            "Establish AI Ethics Review Board with executive sponsorship",
            "Implement automated bias testing in AI development pipeline",
            "Develop model cards and documentation for all production AI systems",
            "Create AI transparency reports for customer-facing applications"
          ]
        }
      }
    }
  },
  {
    id: "RISK-006",
    category: "Operational Resilience",
    description: "Service downtime due to cyberattacks (DDoS, ransomware) or system failures affecting device connectivity",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "IT Operations",
      name: "Anne Thompson",
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
        dataSourceName: "Service Availability Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Service availability remains stable at 99.95%",
        system: "DS-006"
      },
      {
        name: "Security Incidents",
        value: 2,
        target: 0,
        trend: "STABLE",
        dataSource: "DS-006",
        dataSourceName: "Security Incident Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Two security incidents reported in the last quarter",
        system: "DS-006"
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
        relatedSources: ["DS-006", "DS-011"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-006"
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
    ],
    ownerUpdateReport: {
      id: "OWN-006",
      status: "RESPONSE_RECEIVED",
      requestDate: getRelativeDate(-20),
      responseDeadline: getRelativeDate(-10),
      lastFollowUp: getRelativeDate(-15),
      requestThreadId: "1234567890.128",
      report: {
        summary: "Operational resilience improvements through zero-trust architecture implementation and enhanced DDoS protection",
        businessContext: `Our operational resilience risk remains stable with positive progress in key areas:
          1. Service availability maintained at 99.95% (target: 99.99%)
          2. Zero-trust architecture implementation 60% complete
          3. Enhanced DDoS protection deployed for critical services

          While security incidents remain at acceptable levels (2 this quarter), we need to continue strengthening our resilience against sophisticated attacks.`,
        evidence: [
          {
            sourceId: "DS-006",
            sourceName: "Service Availability Report",
            description: "Service availability consistently maintained at 99.95%, with two minor outages resolved within SLA",
            date: getRelativeDate(-15),
            relevance: "Demonstrates overall stability but highlights need for further improvement"
          },
          {
            sourceId: "DS-006",
            sourceName: "Incident Response Analysis",
            description: "Two security incidents successfully contained with no service impact, average detection time reduced to 45 minutes",
            date: getRelativeDate(-12),
            relevance: "Shows improved detection capabilities but ongoing threat activity"
          },
          {
            sourceId: "DS-011",
            sourceName: "Zero-Trust Implementation Report",
            description: "Zero-trust architecture implementation 60% complete, with identity-based access controls deployed across core systems",
            date: getRelativeDate(-8),
            relevance: "Indicates significant progress in security architecture transformation"
          }
        ],
        impact: {
          operational: "Zero-trust implementation has reduced lateral movement risk by 70% in protected environments",
          financial: "Security incident response costs reduced by 35% due to improved automation and containment",
          strategic: "Enhanced resilience supports our reliability claims for critical infrastructure customers"
        },
        recommendations: {
          rationale: "To further strengthen operational resilience, we should: 1) Complete zero-trust implementation across all environments, 2) Enhance automated incident response capabilities, 3) Implement advanced threat hunting",
          timeline: "Zero-trust implementation completion within 60 days, enhanced automation within 45 days",
          nextSteps: [
            "Complete zero-trust architecture implementation for remaining systems",
            "Deploy enhanced DDoS protection for secondary services",
            "Implement automated incident response playbooks",
            "Conduct resilience testing through advanced red team exercises"
          ]
        }
      }
    }
  },
  {
    id: "RISK-007",
    category: "Third-Party Integrations",
    description: "Security risks from API integrations with cloud services or third-party platforms",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "API Security",
      name: "Lori Daniels",
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
        dataSourceName: "API Security Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Three API security issues reported in the last quarter",
        system: "DS-007"
      },
      {
        name: "API Security Coverage",
        value: 88,
        target: 100,
        trend: "INCREASING",
        dataSource: "DS-007",
        dataSourceName: "API Security Assessment",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-2),
        context: "88% of API security controls are effective",
        system: "DS-007"
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
        relatedSources: ["DS-007"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-007"
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
    ],
    ownerUpdateReport: {
      id: "OWN-007",
      status: "OPEN",
      requestDate: getRelativeDate(-2),
      responseDeadline: getRelativeDate(5),
      lastFollowUp: getRelativeDate(-1),
      requestThreadId: "1234567890.129",
      report: {
        summary: "API security enhancements needed to address integration risks with third-party services and cloud platforms",
        businessContext: `Our third-party integration risk remains stable but requires attention due to:
          1. Increasing number of API integrations (35% growth year-over-year)
          2. Three API security issues identified in recent assessments
          3. API security coverage at 88% (target: 100%)

          While our API gateway deployment is progressing well (70% complete), we need to address remaining gaps in API security coverage.`,
        evidence: [
          {
            sourceId: "DS-007",
            sourceName: "API Security Assessment",
            description: "Assessment of 45 production APIs identified 3 with security vulnerabilities and 12 with insufficient monitoring",
            date: getRelativeDate(-10),
            relevance: "Highlights specific security gaps requiring remediation"
          },
          {
            sourceId: "DS-007",
            sourceName: "API Usage Analysis",
            description: "API call volume increased 35% year-over-year, with 28% of traffic to/from third-party services",
            date: getRelativeDate(-8),
            relevance: "Demonstrates growing integration footprint and potential attack surface"
          },
          {
            sourceId: "DS-011",
            sourceName: "Cloud Security Review",
            description: "Cloud service integrations lack consistent security controls, with 22% missing proper authentication",
            date: getRelativeDate(-5),
            relevance: "Identifies specific gap in cloud integration security"
          }
        ],
        impact: {
          operational: "API security issues causing an average of 3 integration incidents per month requiring developer intervention",
          financial: "Manual API security remediation costing approximately $450K annually due to lack of automation",
          strategic: "Secure API platform critical for our partner ecosystem strategy and marketplace growth"
        },
        recommendations: {
          rationale: "To enhance API security, we need to: 1) Complete API gateway deployment across all services, 2) Implement consistent authentication standards, 3) Deploy automated API security testing",
          timeline: "API gateway completion within 45 days, authentication standardization within 60 days",
          nextSteps: [
            "Complete API gateway deployment for remaining services",
            "Implement OAuth 2.0 across all external-facing APIs",
            "Deploy automated API security testing in CI/CD pipeline",
            "Enhance API monitoring and anomaly detection"
          ]
        }
      }
    }
  },
  {
    id: "RISK-008",
    category: "Employee Risk",
    description: "Risks associated with employee conduct including conflicts of interest, insider trading, anti-bribery violations, and potential insider threats",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "Ethics & Compliance",
      name: "Jennifer Wong",
      email: "ethics@company.com",
      slack: "#ethics-compliance"
    },
    metrics: [
      {
        name: "Policy Violations",
        value: 8,
        target: 0,
        trend: "DECREASING",
        dataSource: "DS-012",
        dataSourceName: "Ethics Compliance Dashboard",
        dataSourceLink: "https://ethics.internal/dashboard",
        lastUpdated: getRelativeDate(-3),
        context: "Eight policy violations reported in the last quarter, down from 12 in the previous quarter",
        system: "Ethics Management System"
      },
      {
        name: "Training Completion",
        value: 92,
        target: 100,
        trend: "INCREASING",
        dataSource: "DS-012",
        dataSourceName: "Training Compliance Report",
        dataSourceLink: "https://training.internal/compliance",
        lastUpdated: getRelativeDate(-2),
        context: "92% of employees have completed required ethics and compliance training",
        system: "Learning Management System"
      }
    ],
    mitigationActivities: [
      {
        id: "MIT-009",
        description: "Implement enhanced conflict of interest monitoring",
        status: "ON_TRACK",
        owner: "Jennifer Wong",
        dueDate: getRelativeDate(45),
        progress: 70,
        lastUpdated: getRelativeDate(-5),
        relatedSources: ["DS-012", "DS-004"],
        ticketId: "ETH-2345",
        ticketSystem: "Jira",
        ticketLink: "https://jira.internal/browse/ETH-2345",
        affectedSystem: "Ethics Management Platform"
      },
      {
        id: "MIT-010",
        description: "Deploy insider threat detection system",
        status: "AT_RISK",
        owner: "Marcus Johnson",
        dueDate: getRelativeDate(30),
        progress: 45,
        lastUpdated: getRelativeDate(-3),
        relatedSources: ["DS-011", "DS-012"],
        ticketId: "SEC-7890",
        ticketSystem: "Jira",
        ticketLink: "https://jira.internal/browse/SEC-7890",
        affectedSystem: "User Behavior Analytics Platform"
      }
    ],
    lastAssessment: getRelativeDate(-20),
    nextAssessment: getRelativeDate(70),
    relatedPolicies: ["POL-003", "POL-004", "POL-005"],
    relatedRegulations: ["REG-005", "REG-006"],
    dataSources: ["DS-012", "DS-004", "DS-011"],
    aiSummary: "Employee risk remains stable with improvements in training completion rates. Focus areas include enhancing conflict of interest monitoring and deploying insider threat detection capabilities.",
    aiRecommendations: [
      "Complete insider threat detection system implementation",
      "Enhance anti-bribery training for high-risk roles",
      "Implement automated conflict of interest disclosure process",
      "Develop real-time trading activity monitoring for insider trading prevention"
    ],
    ownerUpdateReport: {
      id: "OWN-008",
      status: "OPEN",
      requestDate: getRelativeDate(-1),
      responseDeadline: getRelativeDate(6),
      lastFollowUp: getRelativeDate(-1),
      requestThreadId: "1234567890.130",
      report: {
        summary: "Employee conduct risk assessment focusing on conflicts of interest and insider threat detection",
        businessContext: `Our employee risk remains stable with some positive indicators:
          1. Policy violations decreased from 12 to 8 this quarter
          2. Training completion rate improved to 92% (target: 100%)
          3. Conflict of interest monitoring implementation 70% complete

          While trends are positive, we need to accelerate insider threat detection capabilities which are currently at risk.`,
        evidence: [
          {
            sourceId: "DS-012",
            sourceName: "Ethics Compliance Dashboard",
            description: "Eight policy violations reported in Q2, down from 12 in Q1, primarily related to disclosure requirements",
            date: getRelativeDate(-10),
            relevance: "Shows improving trend but continued need for policy enforcement"
          },
          {
            sourceId: "DS-012",
            sourceName: "Training Compliance Report",
            description: "Ethics training completion at 92%, with gaps primarily in recently acquired business units",
            date: getRelativeDate(-7),
            relevance: "Indicates good progress but remaining gaps in key areas"
          },
          {
            sourceId: "DS-011",
            sourceName: "Insider Threat Assessment",
            description: "Insider threat detection system implementation delayed due to integration challenges with HR systems",
            date: getRelativeDate(-5),
            relevance: "Highlights critical capability gap requiring attention"
          }
        ],
        impact: {
          operational: "Manual conflict of interest reviews creating 15-day delays in onboarding for sensitive positions",
          financial: "Policy violations resulted in approximately $350K in investigation and remediation costs this quarter",
          strategic: "Enhanced employee risk management critical for maintaining regulatory compliance and customer trust"
        },
        recommendations: {
          rationale: "To strengthen employee risk management, we need to: 1) Complete conflict of interest monitoring implementation, 2) Accelerate insider threat detection deployment, 3) Extend ethics training to all business units",
          timeline: "COI monitoring completion within 30 days, insider threat detection recovery plan within 15 days",
          nextSteps: [
            "Resolve HR system integration blockers for insider threat detection",
            "Complete conflict of interest monitoring rollout",
            "Extend ethics training to newly acquired business units",
            "Implement automated policy compliance monitoring"
          ]
        }
      }
    }
  },
  {
    id: "RISK-009",
    category: "Intellectual Property Theft",
    description: "Reverse engineering of IoT products leading to loss of competitive advantage",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "Product Security",
      name: "Michael Chen",
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
        dataSourceName: "IP Theft Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Twelve IP theft attempts reported in the last quarter",
        system: "DS-009"
      },
      {
        name: "Product Security Score",
        value: 82,
        target: 90,
        trend: "INCREASING",
        dataSource: "DS-009",
        dataSourceName: "Product Security Assessment",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-2),
        context: "Product security score has improved to 82 out of 100",
        system: "DS-009"
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
        relatedSources: ["DS-009"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-009"
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
    ],
    ownerUpdateReport: {
      id: "OWN-009",
      status: "AWAITING_RESPONSE",
      requestDate: getRelativeDate(-4),
      responseDeadline: getRelativeDate(3),
      lastFollowUp: getRelativeDate(-1),
      requestThreadId: "1234567890.131",
      report: {
        summary: "Intellectual property protection enhancements needed to address reverse engineering and competitive threats",
        businessContext: `Our intellectual property theft risk remains stable but requires continued vigilance due to:
          1. Twelve IP theft attempts identified this quarter
          2. Increasing sophistication of reverse engineering techniques
          3. Product security score improved to 82 (target: 90)

          While our hardware security module implementation is progressing (55% complete), we need additional measures to protect our core IP.`,
        evidence: [
          {
            sourceId: "DS-009",
            sourceName: "IP Threat Intelligence Report",
            description: "Analysis of recovered counterfeit devices shows evidence of successful firmware extraction and analysis",
            date: getRelativeDate(-12),
            relevance: "Demonstrates actual IP compromise requiring immediate response"
          },
          {
            sourceId: "DS-009",
            sourceName: "Product Security Assessment",
            description: "Security assessment of flagship products identified 5 vulnerabilities that could facilitate IP theft",
            date: getRelativeDate(-8),
            relevance: "Highlights specific technical weaknesses requiring remediation"
          },
          {
            sourceId: "DS-003",
            sourceName: "Market Intelligence Report",
            description: "Three competitors launched products with features suspiciously similar to our proprietary technology",
            date: getRelativeDate(-5),
            relevance: "Indicates potential successful IP theft with market impact"
          }
        ],
        impact: {
          operational: "IP protection measures adding complexity to supply chain and increasing manufacturing costs by 8%",
          financial: "Estimated $15M annual revenue impact from counterfeit products and accelerated competitive responses",
          strategic: "Continued IP leakage threatens our innovation leadership position in key markets"
        },
        recommendations: {
          rationale: "To enhance IP protection, we need to: 1) Complete hardware security module implementation, 2) Enhance code and design obfuscation, 3) Implement robust anti-counterfeiting measures",
          timeline: "HSM implementation completion within 60 days, obfuscation enhancements within 45 days",
          nextSteps: [
            "Complete hardware security module deployment across product lines",
            "Implement advanced code obfuscation techniques",
            "Deploy cryptographic authentication for genuine parts verification",
            "Enhance legal enforcement against identified counterfeiters"
          ]
        }
      }
    }
  },
  {
    id: "RISK-010",
    category: "Financial & Insurance Risk",
    description: "Increased cyber insurance costs and financial losses from security incidents",
    severity: "MEDIUM",
    trend: "STABLE",
    owner: {
      team: "Risk Management",
      name: "Michael Scott",
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
        dataSourceName: "Insurance Premium Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-1),
        context: "Insurance premium has increased by 15%",
        system: "DS-001"
      },
      {
        name: "Security Incident Costs",
        value: 250000,
        target: 100000,
        trend: "DECREASING",
        dataSource: "DS-001",
        dataSourceName: "Security Incident Cost Report",
        dataSourceLink: "",
        lastUpdated: getRelativeDate(-2),
        context: "Security incident costs have decreased by 50%",
        system: "DS-001"
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
        relatedSources: ["DS-001", "DS-006"],
        ticketId: "",
        ticketSystem: "",
        ticketLink: "",
        affectedSystem: "DS-001"
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
    ],
    ownerUpdateReport: {
      id: "OWN-010",
      status: "RESPONSE_RECEIVED",
      requestDate: getRelativeDate(-25),
      responseDeadline: getRelativeDate(-15),
      lastFollowUp: getRelativeDate(-20),
      requestThreadId: "1234567890.132",
      report: {
        summary: "Financial risk management improvements through cyber risk quantification and enhanced insurance strategy",
        businessContext: `Our financial and insurance risk remains stable with positive developments in key areas:
          1. Security incident costs decreased by 50% (from $500K to $250K)
          2. Cyber risk quantification implementation 40% complete
          3. Insurance premium increases stabilized at 15% (target: 5%)

          While we've made progress in reducing incident costs, we need to continue improving our risk quantification to optimize insurance coverage.`,
        evidence: [
          {
            sourceId: "DS-001",
            sourceName: "Security Incident Cost Analysis",
            description: "Detailed analysis shows 50% reduction in security incident costs due to improved detection and response",
            date: getRelativeDate(-15),
            relevance: "Demonstrates effectiveness of security investments in reducing financial impact"
          },
          {
            sourceId: "DS-001",
            sourceName: "Insurance Premium Assessment",
            description: "Cyber insurance premium increases stabilized at 15%, compared to industry average of 25%",
            date: getRelativeDate(-12),
            relevance: "Shows relative improvement but continued financial pressure"
          },
          {
            sourceId: "DS-006",
            sourceName: "Risk Quantification Pilot Results",
            description: "Initial cyber risk quantification pilot identified $3.2M in potential risk reduction opportunities",
            date: getRelativeDate(-8),
            relevance: "Highlights value of data-driven approach to risk management"
          }
        ],
        impact: {
          operational: "Improved risk data enabling more targeted security investments and resource allocation",
          financial: "Potential $1.8M annual savings through optimized insurance coverage and focused risk reduction",
          strategic: "Enhanced risk quantification strengthens board and investor confidence in our risk management"
        },
        recommendations: {
          rationale: "To further improve financial risk management, we should: 1) Complete cyber risk quantification implementation, 2) Develop enhanced insurance data reporting, 3) Implement targeted risk reduction initiatives based on quantification results",
          timeline: "Risk quantification completion within 90 days, enhanced reporting within 60 days",
          nextSteps: [
            "Complete cyber risk quantification implementation across all business units",
            "Develop enhanced insurance data reporting for underwriters",
            "Implement top three risk reduction initiatives identified in quantification",
            "Renegotiate cyber insurance coverage based on improved risk data"
          ]
        }
      }
    }
  }
]; 