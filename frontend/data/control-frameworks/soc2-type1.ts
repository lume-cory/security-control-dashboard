export interface SOC2Control {
  id: string;
  category: string;
  subCategory: string;
  subCategoryStatement: string;
  controlId: string;
  controlStatement: string;
  implementationGuidance: string;
}

export const soc2Type1Controls: SOC2Control[] = [
  {
    id: "CC1.1",
    category: "Control Environment",
    subCategory: "Integrity and Ethical Values",
    subCategoryStatement: "The entity demonstrates a commitment to integrity and ethical values.",
    controlId: "CC1.1",
    controlStatement: "The entity has defined and communicated its commitment to integrity and ethical values.",
    implementationGuidance: "Establish and maintain a code of conduct, ethics policies, and reporting procedures. Ensure regular training and communication of ethical expectations."
  },
  {
    id: "CC1.2",
    category: "Control Environment",
    subCategory: "Board Oversight",
    subCategoryStatement: "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.",
    controlId: "CC1.2",
    controlStatement: "Board oversight includes regular review of the control environment and risk assessment processes.",
    implementationGuidance: "Maintain board independence, establish oversight committees, and document board review of control effectiveness."
  },
  {
    id: "CC2.1",
    category: "Communication and Information",
    subCategory: "Information Quality",
    subCategoryStatement: "The entity uses relevant, quality information to support the functioning of internal control.",
    controlId: "CC2.1",
    controlStatement: "Information used to support control objectives is accurate, complete, and timely.",
    implementationGuidance: "Implement data quality controls, validation processes, and regular review of information accuracy."
  },
  {
    id: "CC3.1",
    category: "Risk Assessment",
    subCategory: "Risk Identification",
    subCategoryStatement: "The entity specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives.",
    controlId: "CC3.1",
    controlStatement: "Risk assessment processes identify and analyze risks to achieve objectives.",
    implementationGuidance: "Document risk assessment methodology, maintain risk register, and regularly update risk assessments."
  },
  {
    id: "CC4.1",
    category: "Monitoring Activities",
    subCategory: "Evaluation and Communication",
    subCategoryStatement: "The entity selects, develops, and performs ongoing evaluations to ascertain whether components of internal control are present and functioning.",
    controlId: "CC4.1",
    controlStatement: "The entity monitors the effectiveness of controls and communicates deficiencies.",
    implementationGuidance: "Establish monitoring procedures, conduct regular assessments, and maintain communication channels for control deficiencies."
  },
  {
    id: "CC5.1",
    category: "Control Activities",
    subCategory: "Security Policies",
    subCategoryStatement: "The entity selects and develops control activities that contribute to the mitigation of risks.",
    controlId: "CC5.1",
    controlStatement: "Security policies define information security requirements.",
    implementationGuidance: "Develop comprehensive security policies, ensure regular updates, and communicate requirements to stakeholders."
  },
  {
    id: "CC6.1",
    category: "Logical and Physical Access",
    subCategory: "Access Security",
    subCategoryStatement: "The entity implements logical and physical access security software, infrastructure, and architectures.",
    controlId: "CC6.1",
    controlStatement: "Access to systems and data is restricted to authorized users.",
    implementationGuidance: "Implement access controls, authentication mechanisms, and regular access reviews."
  },
  {
    id: "CC7.1",
    category: "System Operations",
    subCategory: "Operations Management",
    subCategoryStatement: "The entity manages system operations to maintain the achievement of objectives.",
    controlId: "CC7.1",
    controlStatement: "System operations are monitored and issues are identified and resolved.",
    implementationGuidance: "Establish monitoring procedures, incident response processes, and operational metrics."
  },
  {
    id: "CC8.1",
    category: "Change Management",
    subCategory: "Change Control",
    subCategoryStatement: "The entity implements policies and procedures to manage changes affecting systems and data.",
    controlId: "CC8.1",
    controlStatement: "Changes to system components follow change management processes.",
    implementationGuidance: "Document change management procedures, maintain change logs, and perform impact assessments."
  },
  {
    id: "CC9.1",
    category: "Risk Mitigation",
    subCategory: "Business Disruption",
    subCategoryStatement: "The entity identifies, develops, and implements activities to mitigate risks.",
    controlId: "CC9.1",
    controlStatement: "Business continuity and disaster recovery plans are developed and tested.",
    implementationGuidance: "Develop and maintain BC/DR plans, conduct regular testing, and update based on test results."
  }
]; 