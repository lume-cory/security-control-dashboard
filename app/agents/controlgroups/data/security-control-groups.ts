export interface SecurityControlGroup {
  name: string;
  effectiveness: number;
  controls: number;
  resources: number;
  metrics: number;
  findings: number;
  criticalFinding: string;
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
}

export const securityControlGroups: SecurityControlGroup[] = [
  {
    name: "Access Management",
    effectiveness: 85,
    controls: 9,
    resources: 9,
    metrics: 9,
    findings: 6,
    criticalFinding: "Only 60% of users have enabled Multi-Factor Authentication (MFA).",
    impact: "Critical"
  },
  {
    name: "Data Protection",
    effectiveness: 71,
    controls: 7,
    resources: 6,
    metrics: 8,
    findings: 5,
    criticalFinding: "15% of sensitive data remains unencrypted, risking unauthorized access and data breaches.",
    impact: "Critical"
  },
  {
    name: "Network Security",
    effectiveness: 92,
    controls: 8,
    resources: 7,
    metrics: 9,
    findings: 4,
    criticalFinding: "20% of firewall rules are obsolete, potentially allowing unauthorized network access.",
    impact: "High"
  },
  {
    name: "Incident Response",
    effectiveness: 91,
    controls: 6,
    resources: 5,
    metrics: 7,
    findings: 5,
    criticalFinding: "Average time to contain security incidents is 8 hours, exceeding the 4-hour target.",
    impact: "High"
  },
  {
    name: "Security Awareness & Training",
    effectiveness: 65,
    controls: 5,
    resources: 4,
    metrics: 6,
    findings: 4,
    criticalFinding: "25% of employees failed the latest phishing simulation test.",
    impact: "High"
  },
  {
    name: "Provisioning",
    effectiveness: 65,
    controls: 7,
    resources: 6,
    metrics: 9,
    findings: 6,
    criticalFinding: "30% of user accounts remain active for >10 days after employee departure.",
    impact: "Critical"
  },
  {
    name: "Endpoint Protection",
    effectiveness: 85,
    controls: 6,
    resources: 6,
    metrics: 9,
    findings: 6,
    criticalFinding: "20% increase in ransomware attempts targeting endpoint devices in the last quarter.",
    impact: "Critical"
  },
  {
    name: "Data Storage",
    effectiveness: 92,
    controls: 10,
    resources: 7,
    metrics: 9,
    findings: 6,
    criticalFinding: "5% of sensitive data remains unencrypted in certain storage locations.",
    impact: "Critical"
  }
]; 