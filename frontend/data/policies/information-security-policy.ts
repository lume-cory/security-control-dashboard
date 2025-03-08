export interface PolicyRequirement {
  reqId: string;  // e.g., "01.1.1"
  name: string;   // e.g., "Technology Asset Inventory"
  text: string;   // The actual requirement text
}

export interface PolicyRequirementGroup {
  reqId: string;  // e.g., "01.1"
  name: string;   // e.g., "Technology Asset Management"
  requirements: PolicyRequirement[];
}

export interface PolicySection {
  id: string;
  policyId: string;
  type: string;
  category: string;
  subCategory: string;
  requirementGroups: PolicyRequirementGroup[];
}

export const ispSections: PolicySection[] = [
  {
    id: 'gov-1',
    policyId: 'GV.OC.SSE-01',
    type: 'GOVERN',
    category: 'GOVERN / Organizational Context / Stakeholder Service Expectations',
    subCategory: 'Stakeholder Service Expectations',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Establishment of Cyber Resilience Requirements",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Cyber Resilience Requirements Definition",
            text: "All critical services must have defined cyber resilience requirements that support their delivery across all operating states, including under duress/attack, during recovery, and normal operations."
          },
          {
            reqId: "01.1.2",
            name: "Requirements Documentation and Review",
            text: "Cyber resilience requirements must be documented and approved by the relevant Service Owner and reviewed annually."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Documentation of Critical Services and Dependencies",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Critical Services Inventory",
            text: "A comprehensive inventory of all critical services and their related dependencies (systems, applications, infrastructure, and third-party services) must be maintained."
          },
          {
            reqId: "01.2.2",
            name: "Inventory Update Frequency",
            text: "The inventory must be updated quarterly or upon significant changes and made accessible to authorized personnel."
          }
        ]
      },
      {
        reqId: "01.3",
        name: "Reasonable Scenarios Identification and Scenario Planning",
        requirements: [
          {
            reqId: "01.3.1",
            name: "Reasonable Scenarios Identification",
            text: "Reasonably expected scenarios and conditions of alternative operating states (e.g., ransomware attack, extended site recovery, site loss) must be identified and documented for each critical service."
          },
          {
            reqId: "01.3.2",
            name: "Scenario Planning and Impact Assessment",
            text: "Scenario planning must include impact assessments and response strategies."
          }
        ]
      },
      {
        reqId: "01.4",
        name: "Service Continuity Plan Development and Roles",
        requirements: [
          {
            reqId: "01.4.1",
            name: "Service Continuity Plan Development",
            text: "Service Continuity Plans (SCPs) must be developed for all critical services, outlining procedures to maintain or restore services during disruptions."
          },
          {
            reqId: "01.4.2",
            name: "SCP Roles and Responsibilities",
            text: "SCPs must include roles and responsibilities, communication plans, recovery objectives, and step-by-step recovery procedures."
          },
          {
            reqId: "01.4.3",
            name: "SCP Review, Update, and Approval",
            text: "SCPs must be reviewed, updated, and approved annually or when significant changes occur."
          }
        ]
      },
      {
        reqId: "01.5",
        name: "Resiliency Testing and Regular Inventory Management",
        requirements: [
          {
            reqId: "01.5.1",
            name: "Resiliency Testing Frequency",
            text: "Resiliency testing must be conducted at least annually for all critical services to validate the effectiveness of SCPs and cyber resilience measures."
          },
          {
            reqId: "01.5.2",
            name: "Testing Schedule Development",
            text: "A testing schedule must be developed, documented, and approved by the relevant stakeholders."
          },
          {
            reqId: "01.5.3",
            name: "Test Results Documentation and Reporting",
            text: "Test results, including identified gaps and remediation actions, must be documented and reported to senior management."
          }
        ]
      },
      {
        reqId: "01.6",
        name: "Regular Inventory Management Reports and Inventory Discrepancy Investigation",
        requirements: [
          {
            reqId: "01.6.1",
            name: "Regular Inventory Management Reports",
            text: "Regular inventory management reports must be generated to verify the accuracy and completeness of critical services and their dependencies."
          },
          {
            reqId: "01.6.2",
            name: "Inventory Discrepancy Investigation",
            text: "Discrepancies identified in the inventory must be investigated and corrected promptly."
          }
        ]
      },
      {
        reqId: "01.7",
        name: "Potential Resiliency Degradation Scenarios and Resiliency Degradation Plans",
        requirements: [
          {
            reqId: "01.7.1",
            name: "Potential Resiliency Degradation Scenarios Identification",
            text: "Potential resiliency degradation scenarios must be identified for each critical service."
          },
          {
            reqId: "01.7.2",
            name: "Resiliency Degradation Plans Development",
            text: "Plans to address resiliency degradation, including mitigation strategies and contingency options, must be developed and documented."
          },
          {
            reqId: "01.7.3",
            name: "Resiliency Degradation Plans Review and Update",
            text: "These scenarios and plans must be reviewed and updated annually."
          }
        ]
      }
    ]
  },
  {
    id: 'gov-2',
    policyId: 'GV.RMS.RMOA-01',
    type: 'GOVERN',
    category: 'GOVERN / Risk Management Strategy / Risk Management Objectives Agreement',
    subCategory: 'Risk Management Objectives Agreement',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Risk Management Framework Integration",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Risk Management Framework Integration",
            text: "Technology and cybersecurity risk management strategies must be formally documented and approved by the Board or designated committee."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Strategies Alignment with Business Objectives",
        requirements: [
          {
            reqId: "01.1.2",
            name: "Strategies Alignment with Business Objectives",
            text: "These strategies must align with and support the organization's overall business objectives."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-3',
    policyId: 'PR.DP.ENC-01',
    type: 'PROTECT',
    category: 'PROTECT / Data Protection / Encryption and Data Security',
    subCategory: 'Encryption and Data Security',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Data Encryption Standard and Key Management",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Data Encryption Standard",
            text: "All sensitive data stored in databases, file systems, or other storage media must be encrypted using industry-standard encryption algorithms (minimum AES-256)."
          },
          {
            reqId: "01.1.2",
            name: "Key Management",
            text: "Encryption keys must be stored separately from the encrypted data and managed through a secure key management system."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Cryptographic Standards and Prohibited Algorithms",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Cryptographic Standards",
            text: "Strong cryptographic algorithms and protocols must be used for all data encryption operations."
          },
          {
            reqId: "01.2.2",
            name: "Prohibited Encryption Algorithms",
            text: "Legacy or deprecated encryption algorithms (e.g., DES, 3DES, RC4) are prohibited."
          }
        ]
      },
      {
        reqId: "01.3",
        name: "Encryption Implementation Review and Key Rotation",
        requirements: [
          {
            reqId: "01.2.3",
            name: "Encryption Implementation Review",
            text: "Encryption implementations must be reviewed annually to ensure compliance with current security standards."
          },
          {
            reqId: "01.3.1",
            name: "Encryption Key Rotation",
            text: "Encryption keys must be rotated at least annually or immediately upon suspected compromise."
          }
        ]
      },
      {
        reqId: "01.4",
        name: "Access Control and Key Backup",
        requirements: [
          {
            reqId: "01.3.2",
            name: "Access Control",
            text: "Access to encryption keys must be strictly controlled and limited to authorized personnel only."
          },
          {
            reqId: "01.3.3",
            name: "Key Backup and Recovery Procedures",
            text: "Key backup and recovery procedures must be documented and tested regularly."
          }
        ]
      },
      {
        reqId: "01.5",
        name: "Data Classification and Additional Protection Measures",
        requirements: [
          {
            reqId: "01.4.1",
            name: "Data Classification and Encryption",
            text: "All data must be classified according to sensitivity levels and encrypted accordingly."
          },
          {
            reqId: "01.4.2",
            name: "Additional Protection Measures",
            text: "Highly sensitive data must utilize additional protection measures such as field-level encryption."
          }
        ]
      },
      {
        reqId: "01.6",
        name: "Regular Audits",
        requirements: [
          {
            reqId: "01.4.3",
            name: "Regular Audits",
            text: "Regular audits must be conducted to ensure proper encryption of classified data."
          }
        ]
      }
    ]
  },
  {
    id: 'gov-3',
    policyId: 'GV.OC.TECH-01',
    type: 'GOVERN',
    category: 'GOVERN / Organizational Context / Technology Dependencies',
    subCategory: 'Technology Dependencies',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Technology Asset Inventory and Dependency Mapping",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Technology Asset Inventory",
            text: "A comprehensive inventory of all technology assets must be maintained, including hardware, software, and cloud services."
          },
          {
            reqId: "01.1.2",
            name: "Technology Asset Dependency Mapping",
            text: "Dependencies between technology assets must be mapped and regularly reviewed."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Technology Lifecycle Management",
        requirements: [
          {
            reqId: "01.1.3",
            name: "Asset Criticality Levels Definition",
            text: "Asset criticality levels must be defined and documented based on business impact."
          },
          {
            reqId: "01.2.1",
            name: "Technology Lifecycle Management",
            text: "All technology assets must have defined lifecycle stages and associated management procedures."
          },
          {
            reqId: "01.2.2",
            name: "End-of-Life and End-of-Support Date Tracking",
            text: "End-of-life and end-of-support dates must be tracked and planned for."
          },
          {
            reqId: "01.2.3",
            name: "Technology Refresh Cycles",
            text: "Technology refresh cycles must be established and budgeted for critical systems."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-4',
    policyId: 'PR.AC.IAM-01',
    type: 'PROTECT',
    category: 'PROTECT / Access Control / Identity and Access Management',
    subCategory: 'Identity and Access Management',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Unique User Identifier and Regular Access Reviews",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Unique User Identifier",
            text: "All users must have unique identifiers for system access."
          },
          {
            reqId: "01.1.2",
            name: "Regular Access Reviews",
            text: "Regular access reviews must be conducted at least quarterly."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Privileged Access Control and Multi-Factor Authentication",
        requirements: [
          {
            reqId: "01.1.3",
            name: "Privileged Access Control",
            text: "Privileged access must be strictly controlled and monitored."
          },
          {
            reqId: "01.2.1",
            name: "Multi-Factor Authentication",
            text: "Multi-factor authentication is mandatory for all privileged access and remote access."
          }
        ]
      },
      {
        reqId: "01.3",
        name: "Password Policies and Failed Login Attempts Monitoring",
        requirements: [
          {
            reqId: "01.2.2",
            name: "Password Policies",
            text: "Password policies must enforce complexity and regular rotation."
          },
          {
            reqId: "01.2.3",
            name: "Failed Login Attempts Monitoring",
            text: "Failed login attempts must be monitored and accounts locked after threshold exceeded."
          }
        ]
      }
    ]
  },
  {
    id: 'det-1',
    policyId: 'DE.CM.MON-01',
    type: 'DETECT',
    category: 'DETECT / Continuous Monitoring / Security Monitoring',
    subCategory: 'Security Monitoring',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Security Monitoring Systems Implementation",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Security Monitoring Systems Implementation",
            text: "Security monitoring systems must be implemented across all critical infrastructure."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Real-Time Alerting Configuration and Log Retention Periods",
        requirements: [
          {
            reqId: "01.1.2",
            name: "Real-Time Alerting Configuration",
            text: "Real-time alerting must be configured for security incidents."
          },
          {
            reqId: "01.1.3",
            name: "Log Retention Periods",
            text: "Log retention periods must align with compliance requirements."
          }
        ]
      },
      {
        reqId: "01.3",
        name: "Automated Threat Detection Systems and Regular Vulnerability Scanning",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Automated Threat Detection Systems",
            text: "Automated threat detection systems must be implemented and maintained."
          },
          {
            reqId: "01.2.2",
            name: "Regular Vulnerability Scanning",
            text: "Regular vulnerability scanning must be performed on all systems."
          }
        ]
      },
      {
        reqId: "01.4",
        name: "Threat Intelligence Incorporation",
        requirements: [
          {
            reqId: "01.2.3",
            name: "Threat Intelligence Incorporation",
            text: "Threat intelligence must be incorporated into detection processes."
          }
        ]
      }
    ]
  },
  {
    id: 'rsp-1',
    policyId: 'RS.RP.INC-01',
    type: 'RESPOND',
    category: 'RESPOND / Response Planning / Incident Response',
    subCategory: 'Incident Response',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Incident Response Plan Maintenance and Team Designation",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Incident Response Plan Maintenance",
            text: "An incident response plan must be maintained and tested annually."
          },
          {
            reqId: "01.1.2",
            name: "Incident Response Team Designation",
            text: "Incident response teams must be designated and trained."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Communication Procedures Establishment and Security Incident Documentation",
        requirements: [
          {
            reqId: "01.1.3",
            name: "Communication Procedures Establishment",
            text: "Communication procedures must be established for security incidents."
          },
          {
            reqId: "01.2.1",
            name: "Security Incident Documentation",
            text: "All security incidents must be documented and tracked."
          }
        ]
      },
      {
        reqId: "01.3",
        name: "Post-Incident Review Conduct and Lessons Learned Incorporation",
        requirements: [
          {
            reqId: "01.2.2",
            name: "Post-Incident Review Conduct",
            text: "Post-incident reviews must be conducted for significant incidents."
          },
          {
            reqId: "01.2.3",
            name: "Lessons Learned Incorporation",
            text: "Lessons learned must be incorporated into security processes."
          }
        ]
      }
    ]
  },
  {
    id: 'rec-1',
    policyId: 'RC.RP.REC-01',
    type: 'RECOVER',
    category: 'RECOVER / Recovery Planning / Business Continuity',
    subCategory: 'Business Continuity',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Recovery Planning",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Recovery Planning",
            text: "Business continuity plans must be developed for all critical services."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Recovery Time Objectives Definition and Backup and Restoration Procedures Documentation",
        requirements: [
          {
            reqId: "01.1.2",
            name: "Recovery Time Objectives Definition",
            text: "Recovery time objectives (RTOs) must be defined and tested."
          },
          {
            reqId: "01.1.3",
            name: "Backup and Restoration Procedures Documentation",
            text: "Backup and restoration procedures must be documented and tested."
          }
        ]
      },
      {
        reqId: "01.3",
        name: "Regular Business Impact Analysis and Recovery Priorities Establishment",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Regular Business Impact Analysis",
            text: "Regular business impact analyses must be conducted."
          },
          {
            reqId: "01.2.2",
            name: "Recovery Priorities Establishment",
            text: "Recovery priorities must be established based on business impact."
          }
        ]
      },
      {
        reqId: "01.4",
        name: "Dependencies Consideration",
        requirements: [
          {
            reqId: "01.2.3",
            name: "Dependencies Consideration",
            text: "Dependencies must be considered in recovery planning."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-5',
    policyId: 'PR.IP.CFG-01',
    type: 'PROTECT',
    category: 'PROTECT / Information Protection / Configuration Management',
    subCategory: 'Configuration Management',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Baseline Configurations",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Standard Baseline Configurations",
            text: "Standard baseline configurations must be established and maintained for all IT systems, including cloud services and infrastructure."
          },
          {
            reqId: "01.1.2",
            name: "Configuration Documentation",
            text: "Baseline configurations must be documented and version controlled."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Configuration Change Control",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Change Management Process",
            text: "All configuration changes must follow the established change management process."
          },
          {
            reqId: "01.2.2",
            name: "Configuration Monitoring",
            text: "Systems must be monitored for unauthorized configuration changes."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-6',
    policyId: 'PR.SC.SUP-01',
    type: 'PROTECT',
    category: 'PROTECT / Supply Chain / Third Party Security',
    subCategory: 'Supply Chain Security',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Supplier Assessment",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Initial Security Assessment",
            text: "All new suppliers must undergo a security assessment before being granted access to systems or data."
          },
          {
            reqId: "01.1.2",
            name: "Periodic Re-assessment",
            text: "Supplier security assessments must be conducted annually or upon significant changes to their environment."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Contract Requirements",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Security Requirements in Contracts",
            text: "Security requirements must be explicitly defined in supplier contracts and agreements."
          },
          {
            reqId: "01.2.2",
            name: "Right to Audit",
            text: "Contracts must include right-to-audit clauses and security compliance verification requirements."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-7',
    policyId: 'PR.AC.NET-01',
    type: 'PROTECT',
    category: 'PROTECT / Access Control / Network Security',
    subCategory: 'Network Security Controls',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Network Segmentation",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Network Zones",
            text: "Networks must be segmented into security zones based on data sensitivity and operational requirements."
          },
          {
            reqId: "01.1.2",
            name: "Zone Access Control",
            text: "Access between network zones must be controlled through firewalls and access control lists."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Remote Access Security",
        requirements: [
          {
            reqId: "01.2.1",
            name: "VPN Requirements",
            text: "Remote access must be secured using enterprise VPN solutions with strong encryption."
          },
          {
            reqId: "01.2.2",
            name: "Remote Access Monitoring",
            text: "All remote access sessions must be logged and monitored for suspicious activity."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-8',
    policyId: 'PR.IP.APP-01',
    type: 'PROTECT',
    category: 'PROTECT / Information Protection / Application Security',
    subCategory: 'Application Security',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Secure Development Lifecycle",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Security Requirements",
            text: "Security requirements must be defined and validated during the application design phase."
          },
          {
            reqId: "01.1.2",
            name: "Secure Coding Standards",
            text: "Development teams must follow documented secure coding standards and guidelines."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Application Testing",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Security Testing",
            text: "Applications must undergo security testing, including SAST, DAST, and penetration testing before production deployment."
          },
          {
            reqId: "01.2.2",
            name: "Third-Party Components",
            text: "All third-party components and dependencies must be scanned for vulnerabilities and kept up to date."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-9',
    policyId: 'PR.DS.CLD-01',
    type: 'PROTECT',
    category: 'PROTECT / Data Security / Cloud Security',
    subCategory: 'Cloud Security Controls',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Cloud Service Security",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Cloud Configuration",
            text: "Cloud services must be configured according to security best practices and compliance requirements."
          },
          {
            reqId: "01.1.2",
            name: "Cloud Access Control",
            text: "Access to cloud services must be controlled through centralized identity and access management."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Data Protection in Cloud",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Data Classification",
            text: "Data stored in cloud services must be classified and protected according to sensitivity levels."
          },
          {
            reqId: "01.2.2",
            name: "Encryption Requirements",
            text: "Sensitive data must be encrypted both in transit and at rest when stored in cloud services."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-10',
    policyId: 'PR.IP.AST-01',
    type: 'PROTECT',
    category: 'PROTECT / Information Protection / Asset Management',
    subCategory: 'Asset Management',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Asset Inventory Management",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Asset Discovery",
            text: "Automated asset discovery tools must be implemented to maintain an accurate inventory of all IT assets."
          },
          {
            reqId: "01.1.2",
            name: "Asset Classification",
            text: "All assets must be classified based on criticality and data sensitivity levels."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Asset Lifecycle Management",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Asset Procurement",
            text: "All asset procurement must follow security requirements and standards defined by Information Security."
          },
          {
            reqId: "01.2.2",
            name: "Asset Decommissioning",
            text: "Formal procedures must be followed for secure decommissioning and disposal of assets."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-11',
    policyId: 'PR.IP.VUL-01',
    type: 'PROTECT',
    category: 'PROTECT / Information Protection / Vulnerability Management',
    subCategory: 'Vulnerability Management',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Vulnerability Assessment",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Scanning Frequency",
            text: "Vulnerability scans must be performed at least monthly on all systems and more frequently for critical systems."
          },
          {
            reqId: "01.1.2",
            name: "Vulnerability Prioritization",
            text: "Vulnerabilities must be prioritized based on risk level, exploitability, and asset criticality."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Patch Management",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Critical Patches",
            text: "Critical security patches must be applied within 30 days of release, or compensating controls must be implemented."
          },
          {
            reqId: "01.2.2",
            name: "Patch Testing",
            text: "All patches must be tested in a non-production environment before deployment to production systems."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-12',
    policyId: 'PR.AT.AWR-01',
    type: 'PROTECT',
    category: 'PROTECT / Awareness and Training / Security Awareness',
    subCategory: 'Security Awareness and Training',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Security Awareness Program",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Training Requirements",
            text: "All employees must complete security awareness training upon hiring and annually thereafter."
          },
          {
            reqId: "01.1.2",
            name: "Role-Based Training",
            text: "Additional role-based security training must be provided for employees with elevated privileges or security responsibilities."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Security Communications",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Security Updates",
            text: "Regular security updates and alerts must be communicated to all employees about current threats and best practices."
          },
          {
            reqId: "01.2.2",
            name: "Phishing Simulations",
            text: "Regular phishing simulation exercises must be conducted to test and reinforce security awareness."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-13',
    policyId: 'PR.AC.PHY-01',
    type: 'PROTECT',
    category: 'PROTECT / Access Control / Physical Security',
    subCategory: 'Physical Security Controls',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Physical Access Control",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Access Control Systems",
            text: "Physical access control systems must be implemented for all facilities containing critical systems or sensitive data."
          },
          {
            reqId: "01.1.2",
            name: "Visitor Management",
            text: "A visitor management system must be maintained to log and track all visitors to secure areas."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Environmental Controls",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Environmental Monitoring",
            text: "Environmental monitoring systems must be implemented to detect and alert on conditions that could affect system operations."
          },
          {
            reqId: "01.2.2",
            name: "Power Systems",
            text: "Backup power systems must be maintained and tested regularly for all critical infrastructure."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-14',
    policyId: 'PR.AC.MOB-01',
    type: 'PROTECT',
    category: 'PROTECT / Access Control / Mobile Device Security',
    subCategory: 'Mobile Device Security',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Mobile Device Management",
        requirements: [
          {
            reqId: "01.1.1",
            name: "MDM Implementation",
            text: "All corporate mobile devices must be enrolled in the organization's Mobile Device Management (MDM) solution."
          },
          {
            reqId: "01.1.2",
            name: "Device Configuration",
            text: "Standard security configurations must be enforced on all managed mobile devices including encryption and passcode requirements."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "BYOD Controls",
        requirements: [
          {
            reqId: "01.2.1",
            name: "BYOD Policy",
            text: "Personal devices accessing corporate resources must comply with BYOD security policies and be enrolled in MDM."
          },
          {
            reqId: "01.2.2",
            name: "Data Separation",
            text: "Corporate data on personal devices must be containerized and separately encrypted from personal data."
          }
        ]
      }
    ]
  },
  {
    id: 'pro-15',
    policyId: 'PR.IP.AIM-01',
    type: 'PROTECT',
    category: 'PROTECT / Information Protection / AI and ML Security',
    subCategory: 'AI and ML Security Controls',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "AI Model Security",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Model Access Control",
            text: "Access to AI/ML models and training data must be strictly controlled and monitored."
          },
          {
            reqId: "01.1.2",
            name: "Model Validation",
            text: "AI models must undergo security validation testing before deployment to detect potential vulnerabilities or biases."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Training Data Protection",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Data Privacy",
            text: "Training data used for AI/ML models must be anonymized and protected according to data privacy requirements."
          },
          {
            reqId: "01.2.2",
            name: "Data Lineage",
            text: "Complete data lineage must be maintained for all AI/ML training datasets including sources and transformations."
          }
        ]
      }
    ]
  },
  {
    id: 'gov-4',
    policyId: 'GV.MT.SEC-01',
    type: 'GOVERN',
    category: 'GOVERN / Metrics / Security Performance',
    subCategory: 'Security Metrics and Reporting',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Security Performance Metrics",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Key Performance Indicators",
            text: "Key security performance indicators must be defined, tracked, and reported monthly to senior management."
          },
          {
            reqId: "01.1.2",
            name: "Metrics Review",
            text: "Security metrics must be reviewed quarterly to ensure they accurately reflect current security objectives and risks."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Security Reporting",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Executive Reporting",
            text: "Monthly security status reports must be provided to executive management including key metrics and significant incidents."
          },
          {
            reqId: "01.2.2",
            name: "Board Reporting",
            text: "Quarterly security updates must be provided to the Board including risk posture, major initiatives, and significant changes."
          }
        ]
      }
    ]
  },
  {
    id: 'det-2',
    policyId: 'DE.AE.INC-01',
    type: 'DETECT',
    category: 'DETECT / Anomalies and Events / Incident Metrics',
    subCategory: 'Incident Response Metrics',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Incident Response Metrics",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Response Time Tracking",
            text: "Mean time to detect (MTTD) and mean time to respond (MTTR) must be tracked for all security incidents."
          },
          {
            reqId: "01.1.2",
            name: "Incident Classification",
            text: "All security incidents must be classified by severity and type for trend analysis and reporting."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Incident Analysis",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Root Cause Analysis",
            text: "Root cause analysis must be performed for all high-severity incidents and documented in incident reports."
          },
          {
            reqId: "01.2.2",
            name: "Trend Analysis",
            text: "Monthly trend analysis must be performed on incident data to identify patterns and areas for improvement."
          }
        ]
      }
    ]
  },
  {
    id: 'gov-5',
    policyId: 'GV.SA.ARC-01',
    type: 'GOVERN',
    category: 'GOVERN / Security Architecture / Design Requirements',
    subCategory: 'Security Architecture Requirements',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Architecture Design",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Security Architecture Principles",
            text: "Security architecture principles must be documented and applied to all new system designs and major changes."
          },
          {
            reqId: "01.1.2",
            name: "Architecture Review",
            text: "Security architecture reviews must be conducted for all new systems and significant changes to existing systems."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Zero Trust Architecture",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Zero Trust Implementation",
            text: "Zero trust principles must be implemented for all new systems and progressively applied to existing systems."
          },
          {
            reqId: "01.2.2",
            name: "Identity-Based Access",
            text: "Access to resources must be based on verified identity and context rather than network location."
          }
        ]
      }
    ]
  },
  {
    id: 'gov-6',
    policyId: 'GV.TPM.RIS-01',
    type: 'GOVERN',
    category: 'GOVERN / Third Party Management / Risk Assessment',
    subCategory: 'Third Party Risk Management',
    requirementGroups: [
      {
        reqId: "01.1",
        name: "Third Party Risk Assessment Process",
        requirements: [
          {
            reqId: "01.1.1",
            name: "Initial Risk Assessment",
            text: "A comprehensive risk assessment must be performed before engaging with any new third-party vendor or service provider."
          },
          {
            reqId: "01.1.2",
            name: "Risk Categorization",
            text: "Third parties must be categorized based on risk level considering data access, system integration, and business impact."
          }
        ]
      },
      {
        reqId: "01.2",
        name: "Continuous Monitoring",
        requirements: [
          {
            reqId: "01.2.1",
            name: "Ongoing Assessment",
            text: "High-risk third parties must undergo security assessments at least annually, with medium-risk vendors assessed every two years."
          },
          {
            reqId: "01.2.2",
            name: "Security Ratings",
            text: "Third-party security ratings must be monitored continuously using automated security rating services."
          }
        ]
      },
      {
        reqId: "01.3",
        name: "Contract Requirements",
        requirements: [
          {
            reqId: "01.3.1",
            name: "Security Requirements",
            text: "Contracts must include specific security requirements based on the vendor's risk level and type of service provided."
          },
          {
            reqId: "01.3.2",
            name: "Incident Reporting",
            text: "Vendors must report security incidents affecting our data or services within 24 hours of discovery."
          }
        ]
      },
      {
        reqId: "01.4",
        name: "Due Diligence",
        requirements: [
          {
            reqId: "01.4.1",
            name: "Security Documentation",
            text: "Vendors must provide current security documentation including certifications, audit reports, and security questionnaire responses."
          },
          {
            reqId: "01.4.2",
            name: "Subcontractor Management",
            text: "Vendors must disclose and obtain approval for all subcontractors who will have access to company data or systems."
          }
        ]
      },
      {
        reqId: "01.5",
        name: "Access Management",
        requirements: [
          {
            reqId: "01.5.1",
            name: "Access Controls",
            text: "Third-party access to systems and data must be limited to the minimum necessary and reviewed quarterly."
          },
          {
            reqId: "01.5.2",
            name: "Remote Access",
            text: "Third-party remote access must be secured through multi-factor authentication and monitored VPN connections."
          }
        ]
      },
      {
        reqId: "01.6",
        name: "Termination Procedures",
        requirements: [
          {
            reqId: "01.6.1",
            name: "Offboarding Process",
            text: "A formal offboarding process must be followed when terminating vendor relationships, including access removal and data return."
          },
          {
            reqId: "01.6.2",
            name: "Data Disposal",
            text: "Vendors must provide certification of data destruction when relationship is terminated or upon request."
          }
        ]
      }
    ]
  }
];
