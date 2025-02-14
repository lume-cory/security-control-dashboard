export interface AuditChat {
  id: string;
  title: string;
  timestamp: string;
  question: string;
  conversation: Array<{
    role: string;
    content: string;
  }>;
}

export const auditChatHistory: AuditChat[] = [
  {
    id: "1",
    title: "BYOD Policy & Evidence",
    timestamp: new Date().toISOString().split('T')[0],
    question: "What is your policy on accessing internal company resources on a personal phone? Can you show supporting evidence for that?",
    conversation: [
      { 
        role: "user", 
        content: "What is your policy on accessing internal company resources on a personal phone? Can you show supporting evidence for that?" 
      },
      {
        role: "assistant",
        content: "Our BYOD (Bring Your Own Device) policy requires all personal devices to be enrolled in our Mobile Device Management (MDM) system before accessing company resources. Here's the specific evidence:\n\n1. Policy Document:\n- Policy ID: SEC-MOB-001\n- Last Updated: 2024-02-15\n- Location: security-policies/mobile/byod.pdf\n\n2. Technical Controls:\n- MDM Solution: Microsoft Intune\n- Enforced policies:\n  * Device encryption\n  * PIN requirement\n  * Remote wipe capability\n\n3. Audit Logs:\n- Last MDM compliance scan: 2024-03-10\n- 98% device compliance rate\n\nWould you like me to pull up the full policy document or MDM configuration details?"
      },
      {
        role: "user",
        content: "Yes, please show me the MDM configuration details"
      },
      {
        role: "assistant",
        content: "Here are the current MDM configuration settings:\n\n1. Device Security Requirements:\n- Minimum PIN length: 6 digits\n- Maximum PIN attempts: 5\n- Device encryption: Required\n- Biometric authentication: Allowed\n\n2. Application Controls:\n- Work profile separation: Enforced\n- Allowed apps: Company Portal, Outlook, Teams\n- Blocked apps: File sharing apps\n\n3. Network Security:\n- VPN requirement: Always-on\n- Wi-Fi security: WPA2 Enterprise\n\n4. Compliance Monitoring:\n- Device check-in: Every 8 hours\n- Compliance grace period: 24 hours\n\nThis configuration was last reviewed by Security Team on 2024-03-01 (Ticket: SEC-2024-156)"
      }
    ]
  },
  {
    id: "2",
    title: "Data Retention Evidence",
    timestamp: new Date().toISOString().split('T')[0],
    question: "Can you provide evidence of our data retention practices for customer data?",
    conversation: [
      {
        role: "user",
        content: "Can you provide evidence of our data retention practices for customer data?"
      },
      {
        role: "assistant",
        content: "Here's our data retention implementation evidence:\n\n1. Policy Framework:\n- Policy ID: DAT-RET-002\n- Retention periods:\n  * Customer data: 7 years\n  * Transaction logs: 5 years\n  * Audit trails: 3 years\n\n2. Technical Implementation:\n- Storage systems: AWS S3 + Glacier\n- Lifecycle policies: Automated archival\n- Deletion workflows: Documented in SEC-WF-023\n\n3. Recent Audits:\n- Internal audit: January 2024\n- External audit: November 2023\n- Findings: All compliant\n\nWould you like to see the specific AWS lifecycle configurations or audit reports?"
      }
    ]
  }
]; 