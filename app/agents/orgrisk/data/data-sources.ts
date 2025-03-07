export interface DataSource {
  id: string;
  name: string;
  type: 'AUTOMATED' | 'MANUAL' | 'HYBRID';
  description: string;
  owner: string;
  updateFrequency: string;
  lastUpdate: string;
  reliability: number;
  integrations: string[];
}

export const dataSources: DataSource[] = [
  {
    id: "DS-001",
    name: "Regulatory Compliance Tracker",
    type: "AUTOMATED",
    description: "Automated tracking of regulatory compliance status and violations",
    owner: "Legal & Compliance Team",
    updateFrequency: "Daily",
    lastUpdate: new Date().toISOString(),
    reliability: 0.95,
    integrations: ["Jira", "ServiceNow", "GRC Platform"]
  },
  {
    id: "DS-002",
    name: "Product Security Scanner",
    type: "AUTOMATED",
    description: "Continuous security scanning of IoT firmware and software",
    owner: "Product Security Team",
    updateFrequency: "Hourly",
    lastUpdate: new Date().toISOString(),
    reliability: 0.98,
    integrations: ["GitHub", "Jenkins", "Snyk", "SonarQube"]
  },
  {
    id: "DS-003",
    name: "Supply Chain Risk Monitor",
    type: "HYBRID",
    description: "Monitoring of supplier security posture and geopolitical risks",
    owner: "Procurement Security",
    updateFrequency: "Daily",
    lastUpdate: new Date().toISOString(),
    reliability: 0.90,
    integrations: ["SAP", "RiskRecon", "BitSight"]
  },
  {
    id: "DS-004",
    name: "Privacy Impact Assessments",
    type: "MANUAL",
    description: "Tracking of privacy assessments and data handling practices",
    owner: "Privacy Team",
    updateFrequency: "Weekly",
    lastUpdate: new Date().toISOString(),
    reliability: 0.85,
    integrations: ["OneTrust", "SharePoint"]
  },
  {
    id: "DS-005",
    name: "AI Model Monitor",
    type: "AUTOMATED",
    description: "Monitoring of AI/ML model performance and security",
    owner: "AI/ML Team",
    updateFrequency: "Real-time",
    lastUpdate: new Date().toISOString(),
    reliability: 0.92,
    integrations: ["MLflow", "Weights & Biases", "Datadog"]
  },
  {
    id: "DS-006",
    name: "Service Availability Monitor",
    type: "AUTOMATED",
    description: "IoT service uptime and performance monitoring",
    owner: "IT Operations",
    updateFrequency: "Real-time",
    lastUpdate: new Date().toISOString(),
    reliability: 0.99,
    integrations: ["PagerDuty", "Grafana", "Prometheus"]
  },
  {
    id: "DS-007",
    name: "API Security Gateway",
    type: "AUTOMATED",
    description: "Monitoring of API security and usage patterns",
    owner: "API Security Team",
    updateFrequency: "Real-time",
    lastUpdate: new Date().toISOString(),
    reliability: 0.97,
    integrations: ["Kong", "Apigee", "Splunk"]
  },
  {
    id: "DS-008",
    name: "IoT Device Telemetry",
    type: "AUTOMATED",
    description: "Real-time monitoring of IoT device security and performance metrics",
    owner: "IoT Platform Team",
    updateFrequency: "Real-time",
    lastUpdate: new Date().toISOString(),
    reliability: 0.98,
    integrations: ["Azure IoT Hub", "AWS IoT Core", "ThingsBoard"]
  },
  {
    id: "DS-009",
    name: "Firmware Security Scanner",
    type: "AUTOMATED",
    description: "Binary analysis and vulnerability scanning of IoT firmware",
    owner: "Product Security Team",
    updateFrequency: "Daily",
    lastUpdate: new Date().toISOString(),
    reliability: 0.95,
    integrations: ["Binwalk", "FACT", "BAP"]
  },
  {
    id: "DS-010",
    name: "Third-Party Component Analyzer",
    type: "AUTOMATED",
    description: "Security analysis of third-party libraries and components",
    owner: "Supply Chain Security",
    updateFrequency: "Daily",
    lastUpdate: new Date().toISOString(),
    reliability: 0.93,
    integrations: ["OWASP Dependency Track", "WhiteSource", "Black Duck"]
  },
  {
    id: "DS-011",
    name: "Cloud Security Posture",
    type: "AUTOMATED",
    description: "Monitoring of cloud infrastructure security settings",
    owner: "Cloud Security Team",
    updateFrequency: "Hourly",
    lastUpdate: new Date().toISOString(),
    reliability: 0.97,
    integrations: ["AWS Security Hub", "Azure Security Center", "GCP Security Command"]
  },
  {
    id: "DS-012",
    name: "Security Training Tracker",
    type: "HYBRID",
    description: "Tracking of security awareness and training compliance",
    owner: "Security Education Team",
    updateFrequency: "Weekly",
    lastUpdate: new Date().toISOString(),
    reliability: 0.88,
    integrations: ["Workday", "KnowBe4", "SAP SuccessFactors"]
  }
]; 