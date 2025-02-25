import { getRelativeDate, DemoDateOffsets } from "@/app/utils/date-utils";

export interface AuditChatEvidence {
  policies?: Array<{
    id: string;
    name: string;
    description: string;
    link: string;
    lastUpdated: string;
  }>;
  metrics?: Array<{
    name: string;
    current: number;
    target: number;
    trend: 'increasing' | 'decreasing' | 'stable';
    status: 'good' | 'bad' | 'neutral';
    history: Array<{ date: string; value: number }>;
  }>;
  configurations?: Array<{
    tool: string;
    type: string;
    evidence: {
      policyName: string;
      settings: Array<{ name: string; value: string }>;
      lastUpdated: string;
      version: string;
    };
  }>;
  contracts?: Array<{
    customer: string;
    requirement: string;
    link: string;
    details: string;
  }>;
}

export interface AuditChat {
  id: string;
  title: string;
  timestamp: string;
  question: string;
  conversation: Array<{
    role: string;
    content: string;
    evidence?: AuditChatEvidence;
  }>;
}

export const auditChatHistory: AuditChat[] = [
  {
    id: "1",
    title: "BYOD Policy & Evidence",
    timestamp: getRelativeDate(0),
    question: "What is our policy on accessing internal company resources on a personal phone?",
    conversation: [
      { 
        role: "user", 
        content: "What is our policy on accessing internal company resources on a personal phone?" 
      },
      {
        role: "assistant",
        content: "Our BYOD policy requires all personal devices to be enrolled in our MDM system before accessing company resources. Here's the relevant documentation and evidence:",
        evidence: {
          policies: [{
            id: "SEC-MOB-001",
            name: "BYOD Security Policy",
            description: "Requirements for personal device usage",
            link: "/policies/security/byod.pdf",
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified)
          }],
          metrics: [{
            name: "MDM Compliance Rate",
            current: 92,
            target: 95,
            trend: "stable",
            status: "neutral",
            history: [
              { date: getRelativeDate(-90), value: 97 },
              { date: getRelativeDate(-60), value: 98 },
              { date: getRelativeDate(-30), value: 92 }
            ]
          }],
          configurations: [{
            tool: "Microsoft Intune",
            type: "MDM",
            evidence: {
              policyName: "BYOD Security Controls",
              settings: [
                { name: "Device Encryption", value: "Required" },
                { name: "PIN Length", value: "6 digits" },
                { name: "Max PIN Attempts", value: "5" }
              ],
              lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
              version: "2.4"
            }
          }]
        }
      },
      {
        role: "user",
        content: "Why has the compliance rate dropped recently?"
      },
      {
        role: "assistant",
        content: "The recent drop in MDM compliance is due to the rollout of a new email app that requires updated device configurations. Here's the current remediation status:",
        evidence: {
          metrics: [{
            name: "Email App Migration",
            current: 65,
            target: 100,
            trend: "increasing",
            status: "neutral",
            history: [
              { date: getRelativeDate(-30), value: 0 },
              { date: getRelativeDate(-15), value: 45 },
              { date: getRelativeDate(0), value: 65 }
            ]
          }]
        }
      }
    ]
  },
  {
    id: "2",
    title: "Data Retention Evidence",
    timestamp: getRelativeDate(0),
    question: "Can you provide evidence of our data retention practices for customer data?",
    conversation: [
      {
        role: "user",
        content: "Can you provide evidence of our data retention practices for customer data?"
      },
      {
        role: "assistant",
        content: "Here's our data retention implementation evidence and current compliance status:",
        evidence: {
          policies: [{
            id: "DAT-RET-002",
            name: "Data Retention Policy",
            description: "Requirements for data lifecycle management",
            link: "/policies/data/retention.pdf",
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified)
          }],
          configurations: [{
            tool: "AWS S3",
            type: "Storage",
            evidence: {
              policyName: "Lifecycle Rules",
              settings: [
                { name: "Customer Data Retention", value: "7 years" },
                { name: "Archive Tier", value: "Glacier after 90 days" },
                { name: "Encryption", value: "AES-256" }
              ],
              lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
              version: "1.2"
            }
          }],
          contracts: [{
            customer: "FinServ Inc.",
            requirement: "3 year retention required",
            link: "/contracts/customer-a/data-requirements.pdf",
            details: "Section 8.2 - Data Lifecycle"
          }, 
          {
            customer: "Design Co.",
            requirement: "1 year retention required",
            link: "/contracts/customer-b/data-requirements.pdf",
            details: "Section 13.4 - Data Management"
          }
        ]
        }
      }
    ]
  },
  {
    id: "3",
    title: "Customer Incident Reporting",
    timestamp: getRelativeDate(0),
    question: "What are our incident reporting SLAs for different customers?",
    conversation: [
      {
        role: "user",
        content: "What are our incident reporting SLAs for different customers?"
      },
      {
        role: "assistant",
        content: "Here are our customer incident reporting requirements and current SLA performance:",
        evidence: {
          policies: [{
            id: "INC-001",
            name: "Incident Response Policy",
            description: "Customer notification requirements",
            link: "/policies/security/incident-response.pdf",
            lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified)
          }],
          metrics: [{
            name: "SLA Compliance Rate",
            current: 98,
            target: 100,
            trend: "stable",
            status: "good",
            history: [
              { date: getRelativeDate(-90), value: 97 },
              { date: getRelativeDate(-60), value: 98 },
              { date: getRelativeDate(-30), value: 98 }
            ]
          }],
          contracts: [
            {
              customer: "Financial Services A",
              requirement: "Critical incidents within 1 hour",
              link: "/contracts/fs-a/sla.pdf",
              details: "Exhibit C - Incident Response"
            },
            {
              customer: "Healthcare Provider B",
              requirement: "All incidents within 24 hours",
              link: "/contracts/hc-b/requirements.pdf",
              details: "Section 4.3 - Security Incidents"
            }
          ]
        }
      },
      {
        role: "user",
        content: "How do we track different severity levels?"
      },
      {
        role: "assistant",
        content: "We track incident response times by severity level. Here's the current breakdown:",
        evidence: {
          metrics: [
            {
              name: "Critical MTTR",
              current: 42,
              target: 60,
              trend: "decreasing",
              status: "good",
              history: [
                { date: getRelativeDate(-90), value: 55 },
                { date: getRelativeDate(-60), value: 48 },
                { date: getRelativeDate(-30), value: 42 }
              ]
            },
            {
              name: "High MTTR",
              current: 180,
              target: 240,
              trend: "stable",
              status: "good",
              history: [
                { date: getRelativeDate(-90), value: 185 },
                { date: getRelativeDate(-60), value: 178 },
                { date: getRelativeDate(-30), value: 180 }
              ]
            }
          ],
          configurations: [{
            tool: "PagerDuty",
            type: "Incident Management",
            evidence: {
              policyName: "SLA Tracking",
              settings: [
                { name: "Critical Alert", value: "15 min warning" },
                { name: "High Alert", value: "1 hour warning" },
                { name: "Escalation Path", value: "3 levels" }
              ],
              lastUpdated: getRelativeDate(DemoDateOffsets.documentLastVerified),
              version: "2.0"
            }
          }]
        }
      }
    ]
  }
]; 