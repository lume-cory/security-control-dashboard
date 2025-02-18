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