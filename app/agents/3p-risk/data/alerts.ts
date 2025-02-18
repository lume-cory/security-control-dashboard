import { getRelativeDate, DemoDateOffsets } from '../utils/date-utils'

type AlertType = 
  | 'NEW_APP_FOUND'
  | 'RENEWAL_DUE'
  | 'QUESTIONNAIRE_RESPONSE'
  | 'EVIDENCE_REVIEW'
  | 'COMPLIANCE_STATUS'
  | 'CERTIFICATION_EXPIRY';

type AlertSeverity = 'LOW' | 'MEDIUM' | 'HIGH';

interface Alert {
  id: string;
  type: AlertType;
  title: string;
  description: string;
  vendorId?: string;
  severity: AlertSeverity;
  date: string;
  status: 'NEW' | 'VIEWED' | 'DISMISSED';
  source?: string;
  actionRequired?: boolean;
  link?: {
    text: string;
    url: string;
  };
  slackThread?: {
    channel: string;
    timestamp: string;
    messages: {
      user: string;
      role: string;
      content: string;
      timestamp: string;
    }[];
  };
}

export const alerts: Alert[] = [
  {
    id: "alert1",
    type: "NEW_APP_FOUND",
    title: "New App Found",
    description: "Engineering team discussing use of MongoDB Atlas in #eng-infrastructure",
    severity: "MEDIUM",
    date: getRelativeDate(DemoDateOffsets.alertCreated),
    status: "NEW",
    source: "Slack",
    actionRequired: true,
    link: {
      text: "View Discussion",
      url: "#"
    }, 
    slackThread: {
      channel: "#eng-infrastructure",
      timestamp: getRelativeDate(DemoDateOffsets.alertCreated - 5),
      messages: [
        {
          user: "Sarah Chen",
          role: "Senior Backend Engineer",
          content: "Hey team, we've set up MongoDB Atlas for the new user analytics service. Currently using M10 cluster with automatic scaling enabled.",
          timestamp: "2024-03-01T10:15:00Z"
        },
        {
          user: "James Wilson",
          role: "DevOps Lead",
          content: "Can you share details about the configuration? We need to ensure it has the proper architecture in production.",
          timestamp: "2024-03-01T10:20:00Z"
        },
        {
          user: "Sarah Chen",
          role: "Senior Backend Engineer",
          content: "Current setup:\n- Region: AWS us-east-1\n- Network Access: IP Whitelist\n- Authentication: SCRAM with X.509\n- Encryption at rest enabled\n- Daily backups configured\n\nWe're using it for storing user behavior analytics and feature usage metrics.",
          timestamp: "2024-03-01T10:25:00Z"
        },
        {
          user: "Michael Patel",
          role: "Security Engineer",
          content: "⚠️ OOC, has this hasn't gone through security review yet?",
          timestamp: "2024-03-01T10:30:00Z"
        },
        {
          user: "Sarah Chen",
          role: "Senior Backend Engineer",
          content: "Currently only test data in the system. We'll wait for security review. Can you help expedite the assessment? This is blocking our Q2 analytics rollout.",
          timestamp: "2024-03-01T10:35:00Z"
        },
        {
          user: "Alex Thompson",
          role: "Engineering Director",
          content: "I'll work with the security team to fast-track the review. @Michael, can we set up a meeting to go through the requirements? We need this for the Q2 OKRs.",
          timestamp: "2024-03-01T10:40:00Z"
        }
      ]
    }
  },
  {
    id: "alert2",
    type: "RENEWAL_DUE",
    title: "Contract Renewal Due",
    description: "Acme Cloud Services contract renewal due in 3 months",
    vendorId: "1",
    severity: "HIGH",
    date: getRelativeDate(DemoDateOffsets.alertCreated - 2),
    status: "VIEWED",
    actionRequired: true,
    link: {
      text: "View Contract",
      url: "#"
    }
  },
  {
    id: "alert3",
    type: "QUESTIONNAIRE_RESPONSE",
    title: "Questionnaire Response Review",
    description: "Acme Cloud Services questionnaire has been automatically reviewed. 1 response is insufficient.",
    vendorId: "1",
    severity: "HIGH",
    date: getRelativeDate(DemoDateOffsets.alertCreated - 1),
    status: "NEW",
    actionRequired: true,
    link: {
      text: "Review Response",
      url: "#"
    }
  },
  {
    id: "alert4",
    type: "CERTIFICATION_EXPIRY",
    title: "Certification Expiring",
    description: "SecureAuth Solutions ISO 27001 certification expires in 45 days",
    vendorId: "2",
    severity: "MEDIUM",
    date: getRelativeDate(DemoDateOffsets.alertCreated - 3),
    status: "NEW",
    actionRequired: false,
    link: {
      text: "View Certification",
      url: "#"
    }
  }
]

export type { Alert, AlertType, AlertSeverity } 