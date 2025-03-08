export interface ComplianceSource {
  id: string;
  name: string;
  type: 'REGULATION' | 'STANDARD' | 'FRAMEWORK' | 'POLICY';
  description: string;
  authority: string;
  applicableRegions: string[];
  lastUpdated: string;
  nextReview: string;
  requirements: Array<{
    id: string;
    description: string;
    category: string;
    controls: string[];
  }>;
}

export const complianceSources: ComplianceSource[] = [
  {
    id: "REG-001",
    name: "GDPR",
    type: "REGULATION",
    description: "General Data Protection Regulation",
    authority: "European Union",
    applicableRegions: ["EU", "EEA"],
    lastUpdated: "2023-12-01",
    nextReview: "2024-12-01",
    requirements: [
      {
        id: "GDPR-001",
        description: "Data Protection by Design and Default",
        category: "Privacy",
        controls: ["Control-001", "Control-002"]
      }
    ]
  },
  {
    id: "REG-002",
    name: "NIS2",
    type: "REGULATION",
    description: "Network and Information Security Directive 2",
    authority: "European Union",
    applicableRegions: ["EU"],
    lastUpdated: "2024-01-15",
    nextReview: "2024-12-31",
    requirements: [
      {
        id: "NIS2-001",
        description: "Critical Infrastructure Security Requirements",
        category: "Security",
        controls: ["Control-003", "Control-004"]
      }
    ]
  },
  {
    id: "REG-003",
    name: "DORA",
    type: "REGULATION",
    description: "Digital Operational Resilience Act",
    authority: "European Union",
    applicableRegions: ["EU"],
    lastUpdated: "2024-01-01",
    nextReview: "2024-12-31",
    requirements: [
      {
        id: "DORA-001",
        description: "ICT Risk Management Requirements",
        category: "Resilience",
        controls: ["Control-005", "Control-006"]
      }
    ]
  },
  {
    id: "REG-004",
    name: "US IoT Cybersecurity Act",
    type: "REGULATION",
    description: "Federal IoT security requirements for government contracts",
    authority: "US Government",
    applicableRegions: ["USA"],
    lastUpdated: "2023-12-15",
    nextReview: "2024-12-15",
    requirements: [
      {
        id: "IOTCSA-001",
        description: "IoT Device Security Requirements",
        category: "Security",
        controls: ["Control-011", "Control-012"]
      }
    ]
  },
  {
    id: "STD-001",
    name: "ISO 27001",
    type: "STANDARD",
    description: "Information Security Management System Standard",
    authority: "ISO",
    applicableRegions: ["GLOBAL"],
    lastUpdated: "2023-11-15",
    nextReview: "2024-11-15",
    requirements: [
      {
        id: "ISO27001-001",
        description: "Information Security Controls",
        category: "Security",
        controls: ["Control-007", "Control-008"]
      }
    ]
  },
  {
    id: "STD-002",
    name: "ETSI EN 303 645",
    type: "STANDARD",
    description: "Cyber Security for Consumer Internet of Things",
    authority: "ETSI",
    applicableRegions: ["EU", "GLOBAL"],
    lastUpdated: "2023-11-01",
    nextReview: "2024-11-01",
    requirements: [
      {
        id: "ETSI-001",
        description: "Baseline Security Requirements for IoT",
        category: "Security",
        controls: ["Control-013", "Control-014"]
      }
    ]
  },
  {
    id: "STD-003",
    name: "IEC 62443",
    type: "STANDARD",
    description: "Industrial Communication Networks - IT Security",
    authority: "IEC",
    applicableRegions: ["GLOBAL"],
    lastUpdated: "2023-10-15",
    nextReview: "2024-10-15",
    requirements: [
      {
        id: "IEC-001",
        description: "Industrial IoT Security Requirements",
        category: "Security",
        controls: ["Control-015", "Control-016"]
      }
    ]
  },
  {
    id: "FRM-001",
    name: "NIST IoT Security Framework",
    type: "FRAMEWORK",
    description: "Security Framework for IoT Devices",
    authority: "NIST",
    applicableRegions: ["GLOBAL"],
    lastUpdated: "2024-01-01",
    nextReview: "2024-12-31",
    requirements: [
      {
        id: "NIST-001",
        description: "IoT Device Cybersecurity Requirements",
        category: "Security",
        controls: ["Control-017", "Control-018"]
      }
    ]
  },
  {
    id: "POL-001",
    name: "IoT Security Policy",
    type: "POLICY",
    description: "Internal IoT security requirements and controls",
    authority: "Security Team",
    applicableRegions: ["INTERNAL"],
    lastUpdated: "2024-01-01",
    nextReview: "2024-06-30",
    requirements: [
      {
        id: "IOT-001",
        description: "IoT Device Security Requirements",
        category: "Security",
        controls: ["Control-009", "Control-010"]
      }
    ]
  },
  {
    id: "POL-002",
    name: "IoT Privacy Policy",
    type: "POLICY",
    description: "Internal requirements for IoT data privacy",
    authority: "Privacy Team",
    applicableRegions: ["INTERNAL"],
    lastUpdated: "2024-01-15",
    nextReview: "2024-07-15",
    requirements: [
      {
        id: "PRIV-001",
        description: "IoT Data Privacy Requirements",
        category: "Privacy",
        controls: ["Control-019", "Control-020"]
      }
    ]
  },
  {
    id: "POL-003",
    name: "AI/ML Security Policy",
    type: "POLICY",
    description: "Internal requirements for AI/ML model security",
    authority: "AI Security Team",
    applicableRegions: ["INTERNAL"],
    lastUpdated: "2024-01-10",
    nextReview: "2024-07-10",
    requirements: [
      {
        id: "AI-001",
        description: "AI Model Security Requirements",
        category: "Security",
        controls: ["Control-021", "Control-022"]
      }
    ]
  }
]; 