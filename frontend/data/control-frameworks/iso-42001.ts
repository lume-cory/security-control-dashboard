export interface Iso42001Control {
  id: number;
  controlId: string;
  category: string;
  text: string;
}

export const iso42001Controls: Iso42001Control[] = [
  {
    id: 1,
    controlId: 'AI.GOV.1.1',
    category: 'AI Governance',
    text: 'The organization shall establish, implement and maintain an AI management system that includes the policies, processes and procedures necessary for improving AI outcomes.'
  },
  {
    id: 2,
    controlId: 'AI.GOV.1.2',
    category: 'AI Governance',
    text: 'The organization shall define and document the scope of its AI management system, considering internal and external factors that affect its ability to achieve intended outcomes.'
  },
  {
    id: 3,
    controlId: 'AI.GOV.1.3',
    category: 'AI Governance',
    text: 'Top management shall demonstrate leadership and commitment to the AI management system by ensuring integration of requirements into business processes.'
  },
  {
    id: 4,
    controlId: 'AI.ETH.2.1',
    category: 'AI Ethics',
    text: 'The organization shall define and implement ethical principles for AI development and deployment, ensuring transparency, fairness, and accountability.'
  },
  {
    id: 5,
    controlId: 'AI.ETH.2.2',
    category: 'AI Ethics',
    text: 'The organization shall establish processes to identify and assess ethical risks associated with AI systems throughout their lifecycle.'
  },
  {
    id: 6,
    controlId: 'AI.ETH.2.3',
    category: 'AI Ethics',
    text: 'The organization shall implement mechanisms for regular ethical impact assessments of AI systems and ensure appropriate mitigation measures.'
  },
  {
    id: 7,
    controlId: 'AI.DEV.3.1',
    category: 'AI Development',
    text: 'The organization shall implement controls to ensure AI systems are developed with appropriate safeguards for testing, validation, and monitoring of performance.'
  },
  {
    id: 8,
    controlId: 'AI.DEV.3.2',
    category: 'AI Development',
    text: 'The organization shall establish and maintain documented procedures for AI system development, including requirements for data quality and model validation.'
  },
  {
    id: 9,
    controlId: 'AI.DEV.3.3',
    category: 'AI Development',
    text: 'The organization shall implement processes to ensure AI systems are developed with appropriate security controls and privacy protections.'
  },
  {
    id: 10,
    controlId: 'AI.OPS.4.1',
    category: 'AI Operations',
    text: 'The organization shall establish operational controls for AI systems to ensure reliable and consistent performance in production environments.'
  },
  {
    id: 11,
    controlId: 'AI.OPS.4.2',
    category: 'AI Operations',
    text: 'The organization shall implement monitoring mechanisms to detect and respond to AI system performance degradation or anomalies.'
  },
  {
    id: 12,
    controlId: 'AI.OPS.4.3',
    category: 'AI Operations',
    text: 'The organization shall maintain documented procedures for AI system maintenance, updates, and version control.'
  },
  {
    id: 13,
    controlId: 'AI.RISK.5.1',
    category: 'AI Risk Management',
    text: 'The organization shall establish and maintain a risk management framework specific to AI systems and their impacts.'
  },
  {
    id: 14,
    controlId: 'AI.RISK.5.2',
    category: 'AI Risk Management',
    text: 'The organization shall conduct regular risk assessments of AI systems and implement appropriate risk treatment measures.'
  },
  {
    id: 15,
    controlId: 'AI.RISK.5.3',
    category: 'AI Risk Management',
    text: 'The organization shall maintain documented information about AI risk assessments, treatments, and residual risks.'
  },
  {
    id: 16,
    controlId: 'AI.COMP.6.1',
    category: 'AI Compliance',
    text: 'The organization shall identify and comply with applicable legal, regulatory, and other requirements related to AI systems.'
  },
  {
    id: 17,
    controlId: 'AI.COMP.6.2',
    category: 'AI Compliance',
    text: 'The organization shall establish processes to monitor and evaluate compliance with AI-related requirements.'
  },
  {
    id: 18,
    controlId: 'AI.COMP.6.3',
    category: 'AI Compliance',
    text: 'The organization shall maintain records demonstrating compliance with AI-related requirements and take corrective actions for non-compliance.'
  },
  {
    id: 19,
    controlId: 'AI.PERF.7.1',
    category: 'AI Performance Evaluation',
    text: 'The organization shall establish metrics and methods to evaluate the performance of AI systems and the effectiveness of the AI management system.'
  },
  {
    id: 20,
    controlId: 'AI.PERF.7.2',
    category: 'AI Performance Evaluation',
    text: 'The organization shall conduct regular internal audits to assess conformity to AI management system requirements.'
  },
  {
    id: 21,
    controlId: 'AI.PERF.7.3',
    category: 'AI Performance Evaluation',
    text: 'Top management shall review the AI management system at planned intervals to ensure its continuing suitability, adequacy, and effectiveness.'
  }
];