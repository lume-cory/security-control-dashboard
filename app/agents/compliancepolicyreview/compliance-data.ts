import { doraArticles } from '../../../data/regulations/dora';
import { criControls } from '../../../data/control-frameworks/cri-profile-v2';
import { ispSections } from '../../../data/policies/information-security-policy';
import { iso42001Controls } from '../../../data/control-frameworks/iso-42001';
import { aiPolicySections } from '../../../data/policies/ai-responsible-use-policy';
import { nistCsfV2Controls } from '../../../data/control-frameworks/nist-csf-v2';

export const options = {
  regulation: ['Digital Operational Resilience Act (DORA)', 'UK General Data Protection Regulation (UK GDPR)', 'EU General Data Protection Regulation (EU GDPR)', 'California Consumer Privacy Act (CCPA)', 'NIS2 Directive', 'EU AI Act','Federal Information Security Management Act (FISMA)', 'Payment Card Industry Data Security Standard (PCI DSS)', 'Health Insurance Portability and Accountability Act (HIPAA)'],
  securityControl: ['NIST Cybersecurity Framework (CSF) v2', 'Cyber Risk Institute (CRI) Profile v2.0','Center for Internet Security (CIS) Critical Security Controls v8.1', 'NIST AI RMF v1.0', 'NIST Cybersecurity Framework (CSF) v1.0', 'Center for Internet Security (CIS) Risk Assessment Method (RAM)', 'NIST Risk Management Framework (RMF)', 'SOC2 Type 1', 'SOC2 Type 2', 'ISO 31000 - Risk Management', 'ISO 42001 - AI Management Systems', 'ISO 27001'],
  companyPolicy: ['Information Security Policy v7', 'AI Responsible Use Policy v1.0','Data Privacy Policy', 'Incident Response Policy', 'Access Control Policy', 'Acceptable Use Policy'],
}

export interface Requirement {
  id: string;
  // Regulation fields (optional)
  article?: string;
  subArticle?: string;
  regulationText?: string;
  // Control fields (optional)
  controlId?: string | null;
  controlCategory?: string;
  controlSubCategory?: string;
  controlText?: string;
  // Policy fields (optional)
  policyId?: string | null;
  policyCategory?: string;
  suggestedPolicyCategory?: string;
  confidenceInterval?: number;
  policyText?: string;
  suggestedPolicyText?: string;
}

//Data for DORA, CRI Profile, and Acme Information Security Policy
export const doraCriRequirements: Requirement[] = [
  {
    id: '1',
    article: doraArticles[0].article,
    subArticle: doraArticles[0].subArticle,
    regulationText: doraArticles[0].text,
    controlId: criControls[8].profileId,
    controlCategory: criControls[8].category,
    controlText: criControls[8].diagnosticStatement,
    policyId: ispSections[0].policyId,
    policyCategory: ispSections[0].category,
    confidenceInterval: 95,
    policyText: ispSections[0].text
  },
  {
    id: '2',
    article: doraArticles[1].article,
    subArticle: doraArticles[1].subArticle,
    regulationText: doraArticles[1].text,
    controlId: criControls[14].profileId,
    controlCategory: criControls[14].category,
    controlText: criControls[14].diagnosticStatement,
    policyId: ispSections[1].policyId,
    policyCategory: ispSections[1].category,
    confidenceInterval: 92,
    policyText: ispSections[1].text
  },
  {
    id: '3',
    article: doraArticles[2].article,
    subArticle: doraArticles[2].subArticle,
    regulationText: doraArticles[2].text,
    controlId: 'N/A',
    controlCategory: 'N/A',
    controlText: 'PR.AT-01.01: All personnel receive cybersecurity awareness training upon hire and on a regular basis.',
    policyId: null,
    suggestedPolicyCategory: 'PROTECT / Awareness and Training / Security Awareness',
    confidenceInterval: 88,
    suggestedPolicyText: `1. Security Awareness Training Requirements
    1.1. All employees must complete security awareness training:
      - Upon hire (within 30 days of start date)
      - Annually thereafter
      - After significant policy or system changes
      - When security incidents indicate need for additional training
    1.2. Training content must include:
      - Current cybersecurity threats and risks
      - Security best practices
      - Incident reporting procedures
      - Compliance requirements`
  },
  {
    id: '4',
    article: doraArticles[3].article,
    subArticle: doraArticles[3].subArticle,
    regulationText: doraArticles[3].text,
    controlId: 'PR.PS-01.04',
    controlCategory: 'PROTECT',
    controlText: 'PR.PS-01.04: The organization documents its requirements for accurate and resilient time services.',
    policyId: null,
    suggestedPolicyCategory: 'PROTECT / Platform Security / Configuration Management',    
    confidenceInterval: 90,
    suggestedPolicyText: `1. Time Service Requirements
    1.1. All systems must:
      - Use approved time synchronization services
      - Maintain accurate time within defined tolerances
      - Log time synchronization events
    1.2. Time service infrastructure must:
      - Be redundant and resilient
      - Use secure protocols
      - Be monitored for accuracy`
  }, 
  {
    id: '5',
    article: doraArticles[5].article,
    subArticle: doraArticles[5].subArticle,
    regulationText: doraArticles[5].text,
    controlId: criControls[186].profileId,
    controlCategory: criControls[186].category,
    controlText: criControls[186].diagnosticStatement,
    policyId: ispSections[2].policyId,
    policyCategory: ispSections[2].category,
    confidenceInterval: 95,
    policyText: ispSections[2].text
  }
];

//Data for CRI Profile and Information Security Policy only
export const criIspRequirements: Requirement[] = [
  {
    id: '1',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: criControls[8].profileId,
    controlCategory: criControls[8].category,
    controlText: criControls[8].diagnosticStatement,
    policyId: ispSections[0].policyId,
    policyCategory: ispSections[0].category,
    confidenceInterval: 95,
    policyText: ispSections[0].text
  },
  {
    id: '2',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: criControls[14].profileId,
    controlCategory: criControls[14].category,
    controlText: criControls[14].diagnosticStatement,
    policyId: ispSections[1].policyId,
    policyCategory: ispSections[1].category,
    confidenceInterval: 92,
    policyText: ispSections[1].text
  }, 
  {
    id: '3',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: criControls[186].profileId,
    controlCategory: criControls[186].category,
    controlText: criControls[186].diagnosticStatement,
    policyId: ispSections[2].policyId,
    policyCategory: ispSections[2].category,
    confidenceInterval: 95,
    policyText: ispSections[2].text
  }, 
  {
    id: '4',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: 'PR.PS-01.04',
    controlCategory: 'PROTECT',
    controlText: 'PR.PS-01.04: The organization documents its requirements for accurate and resilient time services.',
    suggestedPolicyCategory: 'PROTECT / Platform Security / Configuration Management',    
    confidenceInterval: 97,
    suggestedPolicyText: `1. Time Service Requirements
    1.1. All systems must:
      - Use approved time synchronization services
      - Maintain accurate time within defined tolerances
      - Log time synchronization events
    1.2. Time service infrastructure must:
      - Be redundant and resilient
      - Use secure protocols
      - Be monitored for accuracy`
  }
];

//Data for ISO 42001 and AI Responsible Use Policy
export const iso42001AiPolicyRequirements: Requirement[] = [
  {
    id: '1',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[0].controlId,
    controlCategory: iso42001Controls[0].category,
    controlText: iso42001Controls[0].text,
    policyId: aiPolicySections[0].policyId,
    policyCategory: aiPolicySections[0].category,
    confidenceInterval: 95,
    policyText: aiPolicySections[0].text
  },
  {
    id: '2',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[1].controlId,
    controlCategory: iso42001Controls[1].category,
    controlText: iso42001Controls[1].text,
    policyId: aiPolicySections[1].policyId,
    policyCategory: aiPolicySections[1].category,
    confidenceInterval: 93,
    policyText: aiPolicySections[1].text
  },
  {
    id: '3',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[2].controlId,
    controlCategory: iso42001Controls[2].category,
    controlText: iso42001Controls[2].text,
    policyId: aiPolicySections[2].policyId,
    policyCategory: aiPolicySections[2].category,
    confidenceInterval: 94,
    policyText: aiPolicySections[2].text
  },
  {
    id: '4',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[3].controlId,
    controlCategory: iso42001Controls[3].category,
    controlText: iso42001Controls[3].text,
    policyId: aiPolicySections[3].policyId,
    policyCategory: aiPolicySections[3].category,
    confidenceInterval: 92,
    policyText: aiPolicySections[3].text
  },
  {
    id: '5',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[4].controlId,
    controlCategory: iso42001Controls[4].category,
    controlText: iso42001Controls[4].text,
    policyId: aiPolicySections[4].policyId,
    policyCategory: aiPolicySections[4].category,
    confidenceInterval: 91,
    policyText: aiPolicySections[4].text
  },
  {
    id: '6',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[5].controlId,
    controlCategory: iso42001Controls[5].category,
    controlText: iso42001Controls[5].text,
    policyId: aiPolicySections[5].policyId,
    policyCategory: aiPolicySections[5].category,
    confidenceInterval: 90,
    policyText: aiPolicySections[5].text
  },
  {
    id: '7',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[6].controlId,
    controlCategory: iso42001Controls[6].category,
    controlText: iso42001Controls[6].text,
    policyId: aiPolicySections[6].policyId,
    policyCategory: aiPolicySections[6].category,
    confidenceInterval: 89,
    policyText: aiPolicySections[6].text
  },
  {
    id: '8',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[7].controlId,
    controlCategory: iso42001Controls[7].category,
    controlText: iso42001Controls[7].text,
    policyId: aiPolicySections[7].policyId,
    policyCategory: aiPolicySections[7].category,
    confidenceInterval: 88,
    policyText: aiPolicySections[7].text
  },
  {
    id: '9',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[8].controlId,
    controlCategory: iso42001Controls[8].category,
    controlText: iso42001Controls[8].text,
    policyId: aiPolicySections[8].policyId,
    policyCategory: aiPolicySections[8].category,
    confidenceInterval: 87,
    policyText: aiPolicySections[8].text
  },
  {
    id: '10',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[9].controlId,
    controlCategory: iso42001Controls[9].category,
    controlText: iso42001Controls[9].text,
    policyId: aiPolicySections[9].policyId,
    policyCategory: aiPolicySections[9].category,
    confidenceInterval: 86,
    policyText: aiPolicySections[9].text
  },
  {
    id: '11',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[10].controlId,
    controlCategory: iso42001Controls[10].category,
    controlText: iso42001Controls[10].text,
    policyId: null,
    suggestedPolicyCategory: aiPolicySections[10].category,
    confidenceInterval: 85,
    suggestedPolicyText: `1. AI Operations Management
    1.1. The organization shall establish:
    - Real-time monitoring mechanisms
    - Performance baselines and thresholds
    - Incident response procedures
    1.2. Implement automated monitoring for:
    - System availability
    - Performance metrics
    - Anomaly detection`
  },
  {
    id: '12',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[11].controlId,
    controlCategory: iso42001Controls[11].category,
    controlText: iso42001Controls[11].text,
    policyId: aiPolicySections[11].policyId,
    policyCategory: aiPolicySections[11].category,
    confidenceInterval: 84,
    policyText: aiPolicySections[11].text
  },
  {
    id: '13',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[12].controlId,
    controlCategory: iso42001Controls[12].category,
    controlText: iso42001Controls[12].text,
    policyId: null,
    suggestedPolicyCategory: 'AI Risk Management / Framework',
    confidenceInterval: 87,
    suggestedPolicyText: `1. AI Risk Management Framework
    1.1. Establish comprehensive risk assessment methodology:
    - Risk identification procedures
    - Impact assessment criteria
    - Risk treatment options
    1.2. Maintain risk register including:
    - Known risks and impacts
    - Mitigation measures
    - Residual risk tracking`
  },
  {
    id: '14',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[13].controlId,
    controlCategory: iso42001Controls[13].category,
    controlText: iso42001Controls[13].text,
    policyId: aiPolicySections[13].policyId,
    policyCategory: aiPolicySections[13].category,
    confidenceInterval: 82,
    policyText: aiPolicySections[13].text
  },
  {
    id: '15',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[14].controlId,
    controlCategory: iso42001Controls[14].category,
    controlText: iso42001Controls[14].text,
    policyId: aiPolicySections[14].policyId,
    policyCategory: aiPolicySections[14].category,
    confidenceInterval: 81,
    policyText: aiPolicySections[14].text
  },
  {
    id: '16',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[15].controlId,
    controlCategory: iso42001Controls[15].category,
    controlText: iso42001Controls[15].text,
    policyId: aiPolicySections[15].policyId,
    policyCategory: aiPolicySections[15].category,
    confidenceInterval: 80,
    policyText: aiPolicySections[15].text
  },
  {
    id: '17',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[16].controlId,
    controlCategory: iso42001Controls[16].category,
    controlText: iso42001Controls[16].text,
    policyId: aiPolicySections[16].policyId,
    policyCategory: aiPolicySections[16].category,
    confidenceInterval: 79,
    policyText: aiPolicySections[16].text
  },
  {
    id: '18',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[17].controlId,
    controlCategory: iso42001Controls[17].category,
    controlText: iso42001Controls[17].text,
    policyId: aiPolicySections[17].policyId,
    policyCategory: aiPolicySections[17].category,
    confidenceInterval: 78,
    policyText: aiPolicySections[17].text
  },
  {
    id: '19',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[18].controlId,
    controlCategory: iso42001Controls[18].category,
    controlText: iso42001Controls[18].text,
    policyId: null,
    suggestedPolicyCategory: 'AI Performance Evaluation / Metrics',
    confidenceInterval: 88,
    suggestedPolicyText: `1. AI Performance Evaluation
1.1. Define and track key performance indicators:
  - System accuracy metrics
  - Reliability measures
  - Resource utilization
1.2. Establish evaluation framework:
  - Regular performance reviews
  - Improvement tracking
  - Stakeholder feedback mechanisms`
  },
  {
    id: '21',
    article: '',
    subArticle: '',
    regulationText: '',
    controlId: iso42001Controls[20].controlId,
    controlCategory: iso42001Controls[20].category,
    controlText: iso42001Controls[20].text,
    policyId: aiPolicySections[20].policyId,
    policyCategory: aiPolicySections[20].category,
    confidenceInterval: 75,
    policyText: aiPolicySections[20].text
  }
];

//Data for NIST CSF v2 and Information Security Policy
export const nistCsfIspRequirements: Requirement[] = [
    {
      id: '1',
      article: '',
      subArticle: '',
      regulationText: '',
      controlId: nistCsfV2Controls[0].controlId,
      controlCategory: nistCsfV2Controls[0].category,
      controlText: nistCsfV2Controls[0].controlStatement,
      policyId: ispSections[0].policyId,
      policyCategory: 'GOVERN / Organizational Context',
      confidenceInterval: 95,
      policyText: ispSections[0].text
    },
    {
      id: '2',
      article: '',
      subArticle: '',
      regulationText: '',
      controlId: nistCsfV2Controls[38].controlId,
      controlCategory: nistCsfV2Controls[38].category,
      controlText: nistCsfV2Controls[38].controlStatement,
      policyId: null,
      suggestedPolicyCategory: 'IDENTIFY / Risk Assessment',
      confidenceInterval: 90,
      suggestedPolicyText: `1. Risk Assessment Framework
  1.1. Risk Assessment Requirements:
  - Conduct regular risk assessments of critical assets and systems
  - Document and prioritize identified risks
  - Develop and implement risk mitigation strategies`
    },
    {
      id: '3',
      article: '',
      subArticle: '',
      regulationText: '',
      controlId: nistCsfV2Controls[32].controlId,
      controlCategory: nistCsfV2Controls[32].category,
      controlText: nistCsfV2Controls[32].controlStatement,
      policyId: null,
      suggestedPolicyCategory: 'IDENTIFY / Asset Management',
      confidenceInterval: 88,
      suggestedPolicyText: `1. Asset Management Program
  1.1. Asset Inventory Requirements:
  - Maintain comprehensive inventory of all IT assets
  - Regular updates and validation of asset inventory
  - Classification of assets based on criticality`
    },
    {
      id: '4',
      article: '',
      subArticle: '',
      regulationText: '',
      controlId: nistCsfV2Controls[56].controlId,
      controlCategory: nistCsfV2Controls[56].category,
      controlText: nistCsfV2Controls[56].controlStatement,
      policyId: null,
      suggestedPolicyCategory: 'PROTECT / Access Control',
      confidenceInterval: 92,
      suggestedPolicyText: `1. Access Control Policy
  1.1. Access Management Requirements:
  - Implement role-based access control
  - Regular access reviews and updates
  - Secure authentication mechanisms`
    },
    {
      id: '5',
      article: '',
      subArticle: '',
      regulationText: '',
      controlId: nistCsfV2Controls[60].controlId,
      controlCategory: nistCsfV2Controls[60].category,
      controlText: nistCsfV2Controls[60].controlStatement,
      policyId: null,
      suggestedPolicyCategory: 'PROTECT / Data Security',
      confidenceInterval: 94,
      suggestedPolicyText: `1. Data Protection Standards
  1.1. Data Security Requirements:
  - Encryption of sensitive data at rest and in transit
  - Regular data backup and validation
  - Secure data disposal procedures`
    }
  ];

export function getRequirements(regulation: string | null, securityControl: string | null, companyPolicy: string | null): Requirement[] {
  if (regulation === 'Digital Operational Resilience Act (DORA)' && 
      securityControl === 'Cyber Risk Institute (CRI) Profile v2.0' && 
      companyPolicy === 'Information Security Policy v7') {
    return doraCriRequirements;
  } else if (regulation === null && 
             securityControl === 'Cyber Risk Institute (CRI) Profile v2.0' && 
             companyPolicy === 'Information Security Policy v7') {
    return criIspRequirements;
  } else if (regulation === null &&
             securityControl === 'ISO 42001 - AI Management Systems' &&
             companyPolicy === 'AI Responsible Use Policy v1.0') {
    return iso42001AiPolicyRequirements;
  } else if (regulation === null &&
             securityControl === 'NIST Cybersecurity Framework (CSF) v2' &&
             companyPolicy === 'Information Security Policy v7') {
    return nistCsfIspRequirements;
  }
  return [];
}