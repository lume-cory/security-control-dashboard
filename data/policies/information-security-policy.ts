export interface PolicySection {
  id: string;
  policyId: string;
  category: string;
  text: string;
}

export const ispSections: PolicySection[] = [
  {
    id: 'gov-1',
    policyId: 'GV.OC.SSE-01',
    category: 'GOVERN / Organizational Context / Stakeholder Service Expectations',
    text: `01.1. Establishment of Cyber Resilience Requirements
01.1.1. All critical services must have defined cyber resilience requirements that support their delivery across all operating states, including under duress/attack, during recovery, and normal operations.
01.1.2. Cyber resilience requirements must be documented and approved by the relevant Service Owner and reviewed annually.

01.2. Documentation of Critical Services and Dependencies
01.2.1. A comprehensive inventory of all critical services and their related dependencies (systems, applications, infrastructure, and third-party services) must be maintained.
01.2.2. The inventory must be updated quarterly or upon significant changes and made accessible to authorized personnel.

01.3. Alternative Operating Scenarios
01.3.1. Reasonably expected scenarios and conditions of alternative operating states (e.g., ransomware attack, extended site recovery, site loss) must be identified and documented for each critical service.
01.3.2. Scenario planning must include impact assessments and response strategies.

01.4. Service Continuity Plans
01.4.1. Service Continuity Plans (SCPs) must be developed for all critical services, outlining procedures to maintain or restore services during disruptions.
01.4.2. SCPs must include roles and responsibilities, communication plans, recovery objectives, and step-by-step recovery procedures.
01.4.3. SCPs must be reviewed, updated, and approved annually or when significant changes occur.

01.5. Resiliency Testing Plans and Schedule
01.5.1. Resiliency testing must be conducted at least annually for all critical services to validate the effectiveness of SCPs and cyber resilience measures.
01.5.2. A testing schedule must be developed, documented, and approved by the relevant stakeholders.
01.5.3. Test results, including identified gaps and remediation actions, must be documented and reported to senior management.

01.6. Inventory Management Reporting
01.6.1. Regular inventory management reports must be generated to verify the accuracy and completeness of critical services and their dependencies.
01.6.2. Discrepancies identified in the inventory must be investigated and corrected promptly.

01.7. Resiliency Degradation Scenarios
01.7.1. Potential resiliency degradation scenarios must be identified for each critical service.
01.7.2. Plans to address resiliency degradation, including mitigation strategies and contingency options, must be developed and documented.
01.7.3. These scenarios and plans must be reviewed and updated annually.`
  },
  {
    id: 'gov-2',
    policyId: 'GV.RMS.RMOA-01',
    category: 'GOVERN / Risk Management Strategy / Risk Management Objectives Agreement',
    text: `01.1. Risk Management Framework Integration
01.1.1. Technology and cybersecurity risk management strategies must be formally documented and approved by the Board or designated committee.
01.1.2. These strategies must align with and support the organization's overall business objectives.`
  }
];
