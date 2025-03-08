export interface Chat {
  id: string;
  title: string;
  timestamp: string;
  preview?: string;
  question: string;
  conversation: Array<{
    role: string;
    content: string;
  }>;
}

export const previousChats: Chat[] = [
  {
    id: "1",
    question: "Can I use personal cloud storage (e.g., Google Drive) for work files?",
    title: "Personal Cloud Storage Usage",
    timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    conversation: [
      { role: "user", content: "Can I use personal cloud storage (e.g., Google Drive) for work files?" },
      { role: "assistant", content: "No, personal cloud storage should not be used for work files. Here's what you should use instead:\n\n1. Approved Storage Solutions:\n   - Company OneDrive for Business\n   - SharePoint Online\n   - Internal document management system\n\n2. Why personal storage is prohibited:\n   - Data sovereignty concerns\n   - No corporate data protection\n   - Security policy violations\n   - Compliance risks\n\nPlease contact IT Support to set up access to approved storage solutions." },
      { role: "user", content: "What if I need to access files from my personal device?" },
      { role: "assistant", content: "For accessing work files from personal devices:\n\n1. Use our Mobile Device Management (MDM) solution:\n   - Download Company Portal app\n   - Enroll your device\n   - Access files through secure container\n\n2. Alternative options:\n   - Use web-based Office 365 portal\n   - Remote desktop access\n   - Company VPN\n\nContact IT Support (support@company.com) for setup assistance." }
    ]
  },
  {
    id: "2",
    question: "What should I do if I forgot my password?",
    title: "Password Reset Process",
    timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    conversation: [
      { role: "user", content: "What should I do if I forgot my password?" },
      { role: "assistant", content: "Here's how to reset your password:\n\n1. Self-Service Options:\n   - Visit password.company.com\n   - Click 'Forgot Password'\n   - Verify identity using:\n     * Company mobile app MFA\n     * Security questions\n     * SMS verification\n\n2. If self-service doesn't work:\n   - Contact IT Help Desk (888-555-0123)\n   - Submit ticket at help.company.com\n   - Visit IT Support desk (9am-5pm, Building A)" },
      { role: "user", content: "How can I prevent getting locked out in the future?" },
      { role: "assistant", content: "To prevent future password issues:\n\n1. Use Password Manager:\n   - Download approved password manager\n   - Store credentials securely\n   - Enable auto-fill\n\n2. Set up backup authentication:\n   - Register multiple MFA methods\n   - Update recovery phone number\n   - Set up security questions\n\n3. Best practices:\n   - Change password every 90 days\n   - Use password generator\n   - Don't reuse passwords" }
    ]
  },
  {
    id: "3",
    question: "How can I securely share sensitive documents with customers?",
    title: "Secure Document Sharing",
    timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    conversation: [
      { role: "user", content: "How can I securely share sensitive documents with customers?" },
      { role: "assistant", content: "Use these approved methods for secure document sharing:\n\n1. Company Secure File Share:\n   - secure.company.com/share\n   - Auto-expiring links\n   - Password protection\n   - Access logging\n\n2. For classified data:\n   - Use encrypted transfer portal\n   - Require recipient verification\n   - Enable download tracking\n\nNever use:\n- Personal email\n- Public file sharing services\n- Unencrypted attachments" },
      { role: "user", content: "What about very large files?" },
      { role: "assistant", content: "For large file transfers:\n\n1. Enterprise File Transfer Service:\n   - Access via transfer.company.com\n   - Supports files up to 100GB\n   - Includes encryption and compression\n\n2. Alternative options:\n   - Split into smaller encrypted archives\n   - Use secure FTP service\n   - Request IT support for custom solution\n\nContact security@company.com for special requirements." }
    ]
  },
  {
    id: "4",
    question: "How can I request approval for using new software?",
    title: "Software Approval Process",
    timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    conversation: [
      { role: "user", content: "How can I request approval for using new software?" },
      { role: "assistant", content: "Follow these steps for software approval:\n\n1. Submit Request:\n   - Visit software.company.com/request\n   - Fill out risk assessment form\n   - Provide business justification\n   - List alternative solutions considered\n\n2. Review Process:\n   - Security team assessment\n   - Legal/compliance review\n   - IT compatibility check\n   - Cost analysis\n\n3. Timeline:\n   - Standard review: 5-10 business days\n   - Emergency requests: 24-48 hours" },
      { role: "user", content: "What if I need the software urgently?" },
      { role: "assistant", content: "For urgent software requests:\n\n1. Emergency Process:\n   - Contact IT Emergency Desk\n   - Submit expedited review form\n   - Provide urgency justification\n\n2. Temporary Solutions:\n   - Check approved software catalog\n   - Use pre-approved alternatives\n   - Request temporary exception\n\nNote: Security requirements cannot be bypassed even for urgent requests." }
    ]
  },
  {
    id: "5",
    question: "I received an email that seems suspicious, but it looks like it's from a trusted contact. What should I do?",
    title: "Suspicious Email Handling",
    timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    conversation: [
      { role: "user", content: "I received an email that seems suspicious, but it looks like it's from a trusted contact. What should I do?" },
      { role: "assistant", content: "Take these immediate steps:\n\n1. Don't:\n   - Click any links\n   - Download attachments\n   - Reply to the email\n   - Enter credentials\n\n2. Do:\n   - Forward to phishing@company.com\n   - Use 'Report Phishing' button\n   - Contact sender through different channel\n   - Alert Security Operations Center\n\n3. Warning signs:\n   - Urgent requests\n   - Grammar/spelling errors\n   - Unusual sender address\n   - Unexpected attachments" },
      { role: "user", content: "I already clicked a link in the email. What now?" },
      { role: "assistant", content: "If you clicked a link, take these actions immediately:\n\n1. Emergency Response:\n   - Disconnect from network\n   - Call IT Security (ext. 911)\n   - Don't log into any accounts\n\n2. Required Steps:\n   - Change passwords\n   - Enable extra MFA\n   - Monitor accounts\n\n3. Report Incident:\n   - Log ticket at security.company.com\n   - Document your actions\n   - Preserve the email\n\nSecurity team will contact you within 15 minutes." }
    ]
  },
  {
    id: "6",
    question: "I received this question from a prospective customer. What is our data retention period? Can it be customized for them?",
    title: "Customer Data Retention Policy",
    timestamp: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    conversation: [
      { role: "user", content: "I received this question from a prospective customer. What is our data retention period? Can it be customized for them?" },
      { role: "assistant", content: "Here's our data retention policy and customization options:\n\n1. Standard Retention Periods:\n   - Active customer data: 7 years\n   - Audit logs: 3 years\n   - Backup data: 1 year\n   - Transaction records: 7 years\n\n2. Customization Options:\n   - Enterprise customers: Up to 10 years\n   - Regulated industries: Compliance-based retention\n   - Custom retention requires:\n     * Legal review\n     * Additional costs\n     * Technical assessment\n\n3. Important Notes:\n   - Must involve Legal team for custom terms\n   - May affect pricing\n   - Subject to regulatory minimums\n\nPlease direct customer to their account executive for formal discussion." },
      { role: "user", content: "The customer is in healthcare. Are there special considerations?" },
      { role: "assistant", content: "Yes, healthcare customers have specific requirements:\n\n1. HIPAA Compliance:\n   - Minimum retention: 6 years\n   - State laws may require longer\n   - Audit trails: 7 years\n   - PHI special handling\n\n2. Available Options:\n   - HIPAA-compliant storage\n   - Encrypted data at rest\n   - Segregated data storage\n   - Custom deletion workflows\n\n3. Next Steps:\n   - Engage Healthcare Compliance team (healthcare-compliance@company.com)\n   - Schedule solution architecture review\n   - Request pricing from Enterprise Sales\n\nRefer customer to our healthcare solutions team (healthcare-sales@company.com) for detailed discussion." },
      { role: "user", content: "Where can I find our official data retention documentation?" },
      { role: "assistant", content: "Access our data retention documentation here:\n\n1. Internal Resources:\n   - Policy Portal: policies.company.com/data-retention\n   - Sales Wiki: wiki.company.com/sales/data-policies\n   - Compliance Framework: compliance.company.com/retention\n\n2. Customer-Facing Documents:\n   - Public Policy: company.com/privacy/retention\n   - Technical Docs: docs.company.com/enterprise/retention\n   - Industry Certifications: company.com/compliance\n\n3. Supporting Materials:\n   - Standard contract language\n   - Industry comparison matrix\n   - Regulatory compliance guides\n\nFor additional help, contact the Policy team (policy@company.com)" }
    ]
  }
] 