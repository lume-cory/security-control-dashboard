export interface HippaArticle {
  id: string;
  name: string;
  article: string;
  subArticle: string;
  text: string;
  type: string;
}

export const hippaArticles: HippaArticle[] = [
  // Administrative Safeguards
  {
    id: '164.308.a.1',
    name: 'Security Management Process',
    article: '§164.308',
    subArticle: '(a)(1)',
    text: 'Implement policies to prevent, detect, and correct security violations, including risk analysis, risk management, and implementing sanctions for non-compliance.',
    type: 'Administrative Safeguards'
  },
  {
    id: '164.308.a.2',
    name: 'Assigned Security Responsibility',
    article: '§164.308',
    subArticle: '(a)(2)',
    text: 'Designate a security official to oversee the development and implementation of security policies and procedures.',
    type: 'Administrative Safeguards'
  },
  {
    id: '164.308.a.3',
    name: 'Workforce Security',
    article: '§164.308',
    subArticle: '(a)(3)',
    text: 'Ensure only authorized personnel have access to ePHI. Includes access authorization, clearance procedures, and workforce termination policies.',
    type: 'Administrative Safeguards'
  },
  // Physical Safeguards
  {
    id: '164.310.a.1',
    name: 'Facility Access Controls',
    article: '§164.310',
    subArticle: '(a)(1)',
    text: 'Implement policies to limit physical access to systems storing ePHI, ensuring only authorized individuals can access sensitive locations.',
    type: 'Physical Safeguards'
  },
  {
    id: '164.310.b',
    name: 'Workstation Use and Security',
    article: '§164.310',
    subArticle: '(b)',
    text: 'Specify appropriate use of workstations to protect ePHI, including location and physical safeguards.',
    type: 'Physical Safeguards'
  },
  // Technical Safeguards
  {
    id: '164.312.a.1',
    name: 'Access Control',
    article: '§164.312',
    subArticle: '(a)(1)',
    text: 'Implement technical measures to ensure that only authorized individuals can access ePHI. Includes unique user identification, emergency access, and automatic logoff.',
    type: 'Technical Safeguards'
  },
  {
    id: '164.312.b',
    name: 'Audit Controls',
    article: '§164.312',
    subArticle: '(b)',
    text: 'Implement hardware, software, or procedural mechanisms to record and examine access to ePHI.',
    type: 'Technical Safeguards'
  },
  // Organizational Requirements
  {
    id: '164.314.a',
    name: 'Business Associate Contracts',
    article: '§164.314',
    subArticle: '(a)',
    text: 'Ensure contracts or agreements with business associates include terms that require them to comply with HIPAA security standards.',
    type: 'Organizational Requirements'
  },
  // Policies and Documentation
  {
    id: '164.316.a',
    name: 'Policies and Procedures',
    article: '§164.316',
    subArticle: '(a)',
    text: 'Develop and implement policies and procedures to comply with HIPAA Security Rule requirements.',
    type: 'Policies and Documentation'
  },
  // Breach Notification
  {
    id: '164.400',
    name: 'Breach Notification Rule',
    article: '§164.400-414',
    subArticle: 'Breach Notification',
    text: 'Notify affected individuals, the Department of Health and Human Services (HHS), and in some cases, the media, when a breach of ePHI occurs.',
    type: 'Breach Notification'
  }
]; 