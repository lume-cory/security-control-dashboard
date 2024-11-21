export interface AiPolicySection {
  id: string;
  policyId: string;
  category: string;
  text: string;
}

export const aiPolicySections: AiPolicySection[] = [
  {
    id: 'ai-gov-1',
    policyId: 'AI.GOV.POL.1',
    category: 'AI Governance / Policy Framework',
    text: `1. AI Management System Framework
1.1. The organization must establish and maintain a comprehensive AI management system that includes:
  - Documented policies and procedures
  - Risk assessment methodologies
  - Performance monitoring mechanisms
  - Continuous improvement processes
1.2. The AI management system shall be integrated with existing organizational governance structures.
1.3. Top management shall demonstrate active commitment through:
  - Resource allocation
  - Regular system reviews
  - Integration with business strategy`
  },
  {
    id: 'ai-gov-2',
    policyId: 'AI.GOV.POL.2',
    category: 'AI Governance / Scope Definition',
    text: `2. AI Management System Scope
2.1. The organization shall maintain documentation defining the scope of the AI management system, including:
  - Internal factors: organizational structure, roles, and responsibilities
  - External factors: regulatory requirements, industry standards, and stakeholder expectations
2.2. Regular reviews and updates of the scope documentation shall be conducted.`
  },
  {
    id: 'ai-gov-3',
    policyId: 'AI.GOV.POL.3',
    category: 'AI Governance / Leadership',
    text: `3. Leadership Commitment
3.1. Top management shall demonstrate leadership through:
  - Setting AI governance objectives
  - Ensuring integration of AI management requirements
  - Promoting continuous improvement
3.2. Regular leadership reviews of AI initiatives and their alignment with business goals.`
  },
  {
    id: 'ai-eth-1',
    policyId: 'AI.ETH.PRIN.1',
    category: 'AI Ethics / Ethical Principles',
    text: `4. AI Ethical Framework
4.1. All AI systems must adhere to the following ethical principles:
  - Transparency in decision-making processes
  - Fairness in outcomes and impact
  - Accountability for system decisions
4.2. Regular ethical reviews of AI systems shall be conducted.`
  },
  {
    id: 'ai-eth-2',
    policyId: 'AI.ETH.RISK.1',
    category: 'AI Ethics / Risk Assessment',
    text: `5. Ethical Risk Management
5.1. The organization shall:
  - Conduct ethical risk assessments for all AI systems
  - Document potential ethical impacts
  - Implement mitigation strategies
5.2. Regular monitoring of ethical risks and effectiveness of controls.`
  },
  {
    id: 'ai-eth-3',
    policyId: 'AI.ETH.IMPACT.1',
    category: 'AI Ethics / Impact Assessment',
    text: `6. Ethical Impact Assessment
6.1. Regular impact assessments shall:
  - Evaluate potential societal impacts
  - Assess fairness and bias
  - Document mitigation measures
6.2. Implementation of corrective actions based on assessment findings.`
  },
  {
    id: 'ai-dev-1',
    policyId: 'AI.DEV.CTRL.1',
    category: 'AI Development / Controls',
    text: `7. Development Controls
7.1. AI system development must include:
  - Comprehensive testing protocols
  - Validation procedures
  - Performance monitoring frameworks
7.2. Regular review and updates of development controls.`
  },
  {
    id: 'ai-dev-2',
    policyId: 'AI.DEV.PROC.1',
    category: 'AI Development / Procedures',
    text: `8. Development Procedures
8.1. Documented procedures for:
  - Data quality assurance
  - Model validation
  - Testing requirements
8.2. Regular updates to development procedures based on lessons learned.`
  },
  {
    id: 'ai-dev-3',
    policyId: 'AI.DEV.SEC.1',
    category: 'AI Development / Security',
    text: `9. Security Controls
9.1. Implementation of:
  - Security controls throughout development
  - Privacy protection measures
  - Access control mechanisms
9.2. Regular security assessments and updates.`
  },
  {
    id: 'ai-ops-1',
    policyId: 'AI.OPS.CTRL.1',
    category: 'AI Operations / Controls',
    text: `10. Operational Controls
10.1. Implementation of:
  - Performance monitoring
  - Reliability measures
  - Consistency checks
10.2. Regular review of operational effectiveness.`
  },
  {
    id: 'ai-ops-2',
    policyId: 'AI.OPS.MON.1',
    category: 'AI Operations / Monitoring',
    text: `11. Performance Monitoring
11.1. Establishment of:
  - Performance metrics
  - Anomaly detection
  - Response procedures
11.2. Regular review of monitoring effectiveness.`
  },
  {
    id: 'ai-ops-3',
    policyId: 'AI.OPS.MAIN.1',
    category: 'AI Operations / Maintenance',
    text: `12. System Maintenance
12.1. Documentation of:
  - Maintenance procedures
  - Update processes
  - Version control
12.2. Regular review of maintenance effectiveness.`
  },
  {
    id: 'ai-risk-1',
    policyId: 'AI.RISK.FRM.1',
    category: 'AI Risk Management / Framework',
    text: `13. Risk Management Framework
13.1. Establishment of:
  - Risk assessment methodology
  - Risk treatment procedures
  - Monitoring processes
13.2. Regular review of framework effectiveness.`
  },
  {
    id: 'ai-risk-2',
    policyId: 'AI.RISK.ASS.1',
    category: 'AI Risk Management / Assessment',
    text: `14. Risk Assessment
14.1. Regular assessment of:
  - System risks
  - Impact potential
  - Treatment effectiveness
14.2. Documentation of assessment findings.`
  },
  {
    id: 'ai-risk-3',
    policyId: 'AI.RISK.DOC.1',
    category: 'AI Risk Management / Documentation',
    text: `15. Risk Documentation
15.1. Maintenance of:
  - Risk assessment records
  - Treatment plans
  - Residual risk documentation
15.2. Regular review of documentation completeness.`
  },
  {
    id: 'ai-comp-1',
    policyId: 'AI.COMP.REQ.1',
    category: 'AI Compliance / Requirements',
    text: `16. Compliance Requirements
16.1. Identification and documentation of:
  - Legal requirements
  - Regulatory obligations
  - Industry standards
16.2. Regular review of compliance status.`
  },
  {
    id: 'ai-comp-2',
    policyId: 'AI.COMP.MON.1',
    category: 'AI Compliance / Monitoring',
    text: `17. Compliance Monitoring
17.1. Implementation of:
  - Monitoring processes
  - Evaluation procedures
  - Reporting mechanisms
17.2. Regular review of monitoring effectiveness.`
  },
  {
    id: 'ai-comp-3',
    policyId: 'AI.COMP.REC.1',
    category: 'AI Compliance / Records',
    text: `18. Compliance Records
18.1. Maintenance of:
  - Compliance documentation
  - Audit records
  - Corrective action plans
18.2. Regular review of record completeness.`
  },
  {
    id: 'ai-perf-1',
    policyId: 'AI.PERF.EVAL.1',
    category: 'AI Performance / Evaluation',
    text: `19. Performance Evaluation
19.1. Establishment of:
  - Performance metrics
  - Evaluation methods
  - Effectiveness measures
19.2. Regular review of evaluation processes.`
  },
  {
    id: 'ai-perf-2',
    policyId: 'AI.PERF.AUD.1',
    category: 'AI Performance / Audit',
    text: `20. Internal Audit
20.1. Implementation of:
  - Audit procedures
  - Conformity assessments
  - Reporting mechanisms
20.2. Regular review of audit effectiveness.`
  },
  {
    id: 'ai-perf-3',
    policyId: 'AI.PERF.REV.1',
    category: 'AI Performance / Review',
    text: `21. Management Review
21.1. Regular review of:
  - System performance
  - Resource adequacy
  - Improvement opportunities
21.2. Documentation of review outcomes.`
  }
];
