export const analyzeContract = (_content: File) => {
    // Mock contract analysis function
    return {
      totalRequirements: 5,
      metRequirements: 3,
      unmetRequirements: 2,
      details: [
        { 
          requirement: "Data encryption",
          requirementText: "All customer data must be encrypted at rest and in transit.",
          status: "Met", 
          policy: "Encryption", 
          policyLanguage: "All data must be encrypted at rest and in transit using industry-standard protocols.",
          policyLink: "/policies/encryption"
        },
        { 
          requirement: "Multi-factor authentication",
          requirementText: "Multi-factor authentication must be implemented for all user accounts.",
          status: "Met", 
          policy: "Access Control",
          policyLanguage: "Multi-factor authentication is required for all user accounts.",
          policyLink: "/policies/access-control"
        },
        { 
          requirement: "Annual security audit",
          requirementText: "An independent third-party security audit must be conducted annually.",
          status: "Unmet", 
          suggestion: "Add annual third-party security audit to policies",
          suggestedPolicy: "Security Audit",
          suggestedPolicyLink: "/policies/security-audit",
          exceedsFramework: false
        },
        { 
          requirement: "Data retention for 5 years",
          requirementText: "All customer data must be retained for a minimum of 5 years.",
          status: "Unmet", 
          suggestion: "Update Data Retention policy to extend retention period to 5 years",
          suggestedPolicy: "Data Retention",
          suggestedPolicyLink: "/policies/data-retention",
          exceedsFramework: true,
          exceedingFrameworks: ["NIST CSF", "CIS RAM"]
        },
        { 
          requirement: "Access logs retention",
          requirementText: "Access logs must be retained for at least 1 year.",
          status: "Met", 
          policy: "Data Retention",
          policyLanguage: "All data must be retained for a minimum of 1 year.",
          policyLink: "/policies/data-retention"
        }
      ]
    }
  }