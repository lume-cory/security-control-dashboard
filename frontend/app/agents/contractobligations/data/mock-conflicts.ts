export const mockConflicts = [
  { 
    requirement: "Data Retention", 
    customers: [
      { name: "Acme Corp", requirement: "3 months", compliant: true, evidence: "Retention policy set to 90 days in data management tool" },
      { name: "TechGiant Inc", requirement: "3 years", compliant: false, evidence: "Current retention period set to 1 year in data management tool" },
      { name: "SecureData Ltd", requirement: "5 years", compliant: false, evidence: "Current retention period set to 1 year in data management tool" }
    ],
    currentPolicy: "All data must be retained for a minimum of 1 year."
  },
  { 
    requirement: "Password Policy", 
    customers: [
      { name: "SecureData Ltd", requirement: "90 days expiration", compliant: true, evidence: "Password expiration set to 90 days in IAM system" },
      { name: "Acme Corp", requirement: "30 days expiration", compliant: false, evidence: "Current password expiration set to 90 days in IAM system" }
    ],
    currentPolicy: "Passwords must be changed every 90 days."
  }
]
