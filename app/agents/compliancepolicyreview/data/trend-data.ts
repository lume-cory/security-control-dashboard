// Static months array to prevent hydration mismatch
export const months = [
  'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'
];

export const trendValues = [
  { 'HIPPA': 95, 'UK GDPR': 95, 'EU GDPR': 98, 'CCPA': 98, /* ... */ },
  { 'HIPPA': 98, 'UK GDPR': 95, 'EU GDPR': 98, 'CCPA': 98, 'SOC2 Type 1': 98, 'NIST CSF 2.0': 94, 'ISO 27001': 96, 'SEBI': 87},
  { 'HIPPA': 100, 'UK GDPR': 95, 'EU GDPR': 98, 'CCPA': 98, 'SOC2 Type 1': 98, 'NIST CSF 2.0': 98, 'ISO 27001': 99, 'SEBI': 88},
  { 'HIPPA': 97, 'UK GDPR': 98, 'EU GDPR': 100, 'CCPA': 100, 'SOC2 Type 1': 98, 'NIST CSF 2.0': 98, 'ISO 27001': 99, 'SEBI': 89},
  { 'HIPPA': 93, 'UK GDPR': 100, 'EU GDPR': 100, 'CCPA': 100, 'SOC2 Type 1': 100, 'NIST CSF 2.0': 98, 'ISO 27001': 98, 'SEBI': 89},
  { 'HIPPA': 95, 'UK GDPR': 100, 'EU GDPR': 100, 'CCPA': 100, 'SOC2 Type 1': 100, 'NIST CSF 2.0': 99, 'ISO 27001': 98, 'SEBI': 89},
  { 'HIPPA': 98, 'UK GDPR': 100, 'EU GDPR': 100, 'CCPA': 100, 'SOC2 Type 1': 99, 'NIST CSF 2.0': 97, 'ISO 27001': 98, 'SEBI': 89},
  { 'HIPPA': 94, 'UK GDPR': 95, 'EU GDPR': 96, 'CCPA': 97, 'SOC2 Type 1': 98, 'NIST CSF 2.0': 96, 'ISO 27001': 95, 'SEBI': 85},
  { 'HIPPA': 96, 'UK GDPR': 100, 'EU GDPR': 98, 'CCPA': 92, 'SOC2 Type 1': 98, 'NIST CSF 2.0': 96, 'ISO 27001': 96, 'SEBI': 86},
  { 'HIPPA': 99, NIS2: 74, DORA: 73, 'UK GDPR': 100, 'EU GDPR': 100, 'CCPA': 100, 'SOC2 Type 1': 99, 'NIST CSF 2.0': 98, 'ISO 27001': 98, 'SEBI': 87},
  { 'HIPPA': 97, NIS2: 86, DORA: 78, 'UK GDPR': 100, 'EU GDPR': 100, 'CCPA': 100, 'SOC2 Type 1': 99, 'NIST CSF 2.0': 98, 'ISO 27001': 98, 'SEBI': 89},
  { 'HIPPA': 96, NIS2: 92, DORA: 88, 'UK GDPR': 99, 'EU GDPR': 99, 'CCPA': 99, 'SOC2 Type 1': 99, 'NIST CSF 2.0': 97, 'ISO 27001': 97, 'SEBI': 89}
];

export const alignmentOverTime = months.map((month, index) => ({
  month,
  ...trendValues[index]
})); 