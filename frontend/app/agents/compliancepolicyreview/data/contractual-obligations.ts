import { getRelativeDate, DemoDateOffsets } from "@/app/utils/date-utils";

export interface ContractualObligation {
  id: string;
  entity: string;
  name: string;
  category: 'Customer' | 'Insurance' | 'Other';
  contractId: string;
  effectiveDate: string;
  reviewDate: string;
  status: 'active' | 'pending' | 'expired';
  doc_link: string;
  obligations: Array<{
    type: 'SLA' | 'MSA' | 'DPA' | 'SOW' | 'Underwriting' | 'Risk Management' | 'Disclosure' | 'Compliance' |'Other';
    category: 'Access Control' | 'Data Protection' | 'Vulnerability Management' | 'Incident Response' | 'Data Retention' | 'Training Awareness' | 'Risk Management' | 'AI Risk' | 'Other';
    summary: string;
    text: string[];
    link: string;
  }>;
}

export const contractualObligations: ContractualObligation[] = [
  {
    id: "FSDPA-2024-01",
    entity: "FinServ Inc",
    name: "Enterprise Data Protection",
    category: "Customer",
    contractId: "FSDPA-2024-01",
    effectiveDate: getRelativeDate(-180),
    reviewDate: getRelativeDate(180),
    status: "active",
    doc_link: "/contracts/finserv/dpa-2024.pdf",
    obligations: [
      {
        type: "DPA",
        category: "Data Protection",
        summary: "Customer data handling and privacy requirements",
        text: [
          "Must encrypt all data at rest using AES-256",
          "Must maintain audit logs for 1 year",
          "Must notify of breaches within 24 hours"
        ],
        link: "/contracts/finserv/dpa-2024.pdf"
      },
      {
        type: "SLA",
        category: "Incident Response",
        summary: "Security incident response requirements",
        text: [
          "Must respond to critical security incidents within 30 minutes",
          "Must provide root cause analysis within 48 hours",
          "Must conduct quarterly incident response drills"
        ],
        link: "/contracts/finserv/sla-2024.pdf"
      },
      {
        type: "Compliance",
        category: "Training Awareness",
        summary: "Security awareness training requirements",
        text: [
          "All employees must complete security awareness training quarterly",
          "Must maintain training completion records for 2 years",
          "Must update training content based on emerging threats"
        ],
        link: "/contracts/finserv/training-2024.pdf"
      },
      {
        type: "DPA",
        category: "Data Retention",
        summary: "Data retention and disposal requirements",
        text: [
          "Must retain customer data for minimum of 7 years",
          "Must securely dispose of data after retention period",
          "Must maintain data disposal audit logs"
        ],
        link: "/contracts/finserv/retention-2024.pdf"
      }
    ]
  },
  {
    id: "HCSLA-2024-01",
    entity: "Healthcare Provider",
    name: "Healthcare System Availability",
    category: "Customer",
    contractId: "HCSLA-2024-01",
    effectiveDate: getRelativeDate(-90),
    reviewDate: getRelativeDate(275),
    status: "active",
    doc_link: "/contracts/healthcare/sla-2024.pdf",
    obligations: [
      {
        type: "SLA",
        category: "Incident Response",
        summary: "99.99% uptime and incident response requirements",
        text: [
          "Must maintain 99.99% system availability",
          "Must respond to critical incidents within 15 minutes",
          "Must provide monthly availability reports"
        ],
        link: "/contracts/healthcare/sla-2024.pdf"
      },
      {
        type: "DPA",
        category: "Data Protection",
        summary: "PHI data protection requirements",
        text: [
          "Must encrypt all PHI data in transit and at rest",
          "Must implement role-based access control",
          "Must maintain HIPAA compliance"
        ],
        link: "/contracts/healthcare/dpa-2024.pdf"
      },
      {
        type: "Risk Management",
        category: "Vulnerability Management",
        summary: "Security testing requirements",
        text: [
          "Must perform monthly vulnerability scans",
          "Must remediate critical vulnerabilities within 15 days",
          "Must conduct annual penetration testing"
        ],
        link: "/contracts/healthcare/security-2024.pdf"
      },
      {
        type: "DPA",
        category: "Data Retention",
        summary: "Healthcare data retention requirements",
        text: [
          "Must retain PHI records for minimum of 10 years",
          "Must implement automated data archival process",
          "Must maintain HIPAA-compliant disposal procedures"
        ],
        link: "/contracts/healthcare/retention-2024.pdf"
      }
    ]
  },
  {
    id: "BMSA-2024-01",
    entity: "Global Bank Corp",
    name: "Financial Data Processing",
    category: "Customer",
    contractId: "BMSA-2024-01",
    effectiveDate: getRelativeDate(-30),
    reviewDate: getRelativeDate(335),
    status: "active",
    doc_link: "/contracts/bank/msa-2024.pdf",
    obligations: [
      {
        type: "MSA",
        category: "Data Protection",
        summary: "Terms for processing financial transactions",
        text: [
          "Must process transactions within 2 seconds",
          "Must maintain PCI DSS compliance",
          "Must perform quarterly security assessments"
        ],
        link: "/contracts/bank/msa-2024.pdf"
      },
      {
        type: "Compliance",
        category: "Access Control",
        summary: "Access control requirements",
        text: [
          "Must implement MFA for all access",
          "Must review access quarterly",
          "Must maintain privileged access audit logs"
        ],
        link: "/contracts/bank/access-2024.pdf"
      },
      {
        type: "Risk Management",
        category: "AI Risk",
        summary: "AI model risk requirements",
        text: [
          "Must validate AI models quarterly",
          "Must monitor for model drift",
          "Must maintain model risk documentation"
        ],
        link: "/contracts/bank/ai-risk-2024.pdf"
      },
      {
        type: "MSA",
        category: "Data Retention",
        summary: "Financial data retention requirements",
        text: [
          "Must retain transaction records for minimum of 5 years",
          "Must implement data lifecycle management",
          "Must maintain compliance with GDPR retention limits"
        ],
        link: "/contracts/bank/retention-2024.pdf"
      },
      {
        type: "MSA",
        category: "Risk Management",
        summary: "Third-party risk management requirements",
        text: [
          "Must assess all third-party vendors annually",
          "Must maintain vendor risk assessment documentation",
          "Must implement continuous vendor monitoring",
          "Must enforce security requirements in vendor contracts"
        ],
        link: "/contracts/bank/vendor-risk-2024.pdf"
      }
    ]
  },
  {
    id: "CYINS-2024-01",
    entity: "Cyber Shield Insurance",
    name: "Cyber Insurance Policy",
    category: "Insurance",
    contractId: "CYINS-2024-01",
    effectiveDate: getRelativeDate(-45),
    reviewDate: getRelativeDate(320),
    status: "active",
    doc_link: "/contracts/insurance/cyber-2024.pdf",
    obligations: [
      {
        type: "MSA",
        category: "Risk Management",
        summary: "Enpoint detection and response requirements",
        text: [
          "Must maintain EDR on all endpoints",
          "Must implement network segmentation",
          "Must conduct quarterly security assessments"
        ],
        link: "/contracts/insurance/controls-2024.pdf"
      },
      {
        type: "Disclosure",
        category: "Incident Response",
        summary: "Incident reporting requirements",
        text: [
          "Must report security incidents within 24 hours",
          "Must maintain incident response plan",
          "Must conduct annual incident response exercises"
        ],
        link: "/contracts/insurance/incident-2024.pdf"
      },
      {
        type: "Compliance",
        category: "Training Awareness",
        summary: "Security training requirements",
        text: [
          "Must provide security awareness training to all employees",
          "Must conduct phishing simulations quarterly",
          "Must maintain training records for audit"
        ],
        link: "/contracts/insurance/training-2024.pdf"
      },
      {
        type: "Risk Management",
        category: "Vulnerability Management",
        summary: "Vulnerability management and patching requirements",
        text: [
          "Must perform monthly vulnerability scans",
          "Must remediate critical vulnerabilities within 15 days",
          "Must conduct annual penetration testing"
        ],
        link: "/contracts/insurance/training-2024.pdf"
      }
    ]
  }
]; 