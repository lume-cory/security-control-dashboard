export interface companyPolicies {
    id: string;
    policyVersion: string;
    policyApprovalStatus: string;
    policyApprovalDate: string;
    policyApprovalBy: string;
    policyDocName: string;
    policyDocLink: string;
    policyCategoryID: string;
    policyCategoryName: string;
    policySubCategoryID: string;
    policySubCategoryName: string;
    policyText: string;
  }
  
  export const mockClientRequirements: companyPolicies[] = [
{
    id: "1",
    policyVersion: "1.0",
    policyApprovalStatus: "Approved",
    policyApprovalDate: "2024-01-01",
    policyApprovalBy: "John Doe",
    policyDocName: "Policy Document",
    policyDocLink: "/policies/policy-document.pdf",
    policyCategoryID: "1",
    policyCategoryName: "Category 1",
    policySubCategoryID: "1",
    policySubCategoryName: "Subcategory 1",
    policyText: "This is the policy text.",
}
  ]
