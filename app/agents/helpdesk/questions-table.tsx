'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/subframe/components/Button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, MessageSquare, Mail, Ticket, Phone, Fish, ArrowUpDown, CheckIcon, XIcon, ChevronDown, ChevronUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion } from "@/subframe/components/Accordion";
import { ScrollArea } from "@/components/ui/scroll-area"

interface ResponseSection {
  text: string;
  supportingDocs: Array<{
    name: string;
    link: string;
  }>;
}

interface Question {
  id: number;
  question: string;
  user: string;
  stage: string;
  source: string;
  sourceLink: string;
  triage?: 'urgent' | 'high' | 'medium' | 'low';
  suggestedResponse: Array<ResponseSection>;
}

interface OutstandingQuestion extends Question {
  dueDate: string;
  supportingDocs: Array<{ name: string; link: string }>;
  otherDocs: Array<{ name: string; link: string }>;
  policyOwner: PolicyOwner;
}

interface ResolvedQuestion extends Question {
  resolvedDate: string;
  response: string;
  decision: string;
  documentationLink: string;
  policyOwner: PolicyOwner;
  suggestedResponse: Array<ResponseSection>;
}

interface Confidence {
  level: 'high' | 'medium' | 'low';
  reasons: string[];
}

interface PolicyOwner {
  team: string;
  teamEmail: string;
  teamConfidence: Confidence;
  contact: string;
  email: string;
  contactConfidence: Confidence;
  signOffStatus?: 'Yes' | 'No' | 'Pending' | 'N/A';
}

const outstandingQuestions: OutstandingQuestion[] = [
  {
    id: 1,
    question: "What are the security implications of using a third-party authentication service?",
    user: "John Doe",
    stage: "Architecture Review",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Manager of prior policy owner`, `Has answered similar questions on previous tickets`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "Using a third-party authentication service can have both benefits and risks. Benefits include reduced development time and potentially more robust security measures.",
        supportingDocs: [
          { name: "Security Policy #AUTH-001", link: "https://docs.company.com/security/AUTH-001" }
        ]
      },
      {
        text: "However, risks include potential data breaches at the third-party provider, loss of control over the authentication process, and potential service outages.",
        supportingDocs: [
          { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
        ]
      },
      {
        text: "It's crucial to thoroughly vet the provider, understand their security measures, and have contingency plans in place.",
        supportingDocs: [
          { name: "Third-Party Integration Guidelines", link: "https://docs.company.com/integration/guidelines" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Security Policy #AUTH-001", link: "https://docs.company.com/security/AUTH-001" },
      { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
    ],
    otherDocs: [
      { name: "User Authentication Flow", link: "https://docs.company.com/auth/flow" },
      { name: "Third-Party Integration Guidelines", link: "https://docs.company.com/integration/guidelines" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200"
  },
  {
    id: 2,
    question: "I want to host a website for our team project. Can I register a .org domain and set it up myself?",
    user: "Sarah Chen",
    stage: "Planning",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Infrastructure Security Team",
      teamEmail: "infrasec@company.com",
      contact: "Chris Martinez",
      email: "chris.martinez@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Contributors from prior tickets belong to this team`]
      },
      contactConfidence: {
        level: 'low',
        reasons: [`Manager of assumed policy ownning team`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "All external websites must go through our Website Governance Process. This includes domain registration (which must be done through IT) and security assessment of the hosting platform.",
        supportingDocs: [
          { name: "Website Governance Policy", link: "https://docs.company.com/security/WEB-001" }
        ]
      },
      {
        text: "Self-hosted solutions are not permitted due to security and maintenance concerns. Please submit a Website Request Form to initiate this process.",
        supportingDocs: [
          { name: "Domain Management Guidelines", link: "https://docs.company.com/it/domains" }
        ]
      },
      {
        text: "Our approved hosting platforms provide necessary security controls and monitoring capabilities required for company websites.",
        supportingDocs: [
          { name: "Cloud Hosting Standards", link: "https://docs.company.com/cloud/standards" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Website Governance Policy", link: "https://docs.company.com/security/WEB-001" },
      { name: "Domain Management Guidelines", link: "https://docs.company.com/it/domains" }
    ],
    otherDocs: [
      { name: "Cloud Hosting Standards", link: "https://docs.company.com/cloud/standards" },
      { name: "Website Request Form", link: "https://forms.company.com/website-request" }
    ],
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/website-inquiry-july12"
  },
  {
    id: 3,
    question: "I'm traveling to Mexico next week for the conference. Can I bring my work phone?",
    user: "Michael Rodriguez",
    stage: "Pre-travel",
    dueDate: new Date().toISOString().split('T')[0],
    triage: "low",
    policyOwner: {
      team: "Physical Security & Travel Team",
      teamEmail: "travelsec@company.com",
      contact: "Sarah O'Connor",
      email: "sarah.oconnor@company.com",
      teamConfidence: {
        level: 'low',
        reasons: ['Email alias for this team found on policy docs']
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "Yes, you can bring your work phone to Mexico, but specific security measures are required. You must: 1) Enable full disk encryption, 2) Install our travel VPN profile.",
        supportingDocs: [
          { name: "Device Protection Guidelines", link: "https://docs.company.com/security/devices" }
        ]
      },
      {
        text: "You must also: 3) Enable remote wipe capability, and 4) Register your travel in the Travel Security Portal.",
        supportingDocs: [
          { name: "International Travel Security Policy", link: "https://docs.company.com/security/TRAVEL-002" }
        ]
      },
      {
        text: "Avoid using public WiFi and consider a travel burner phone for personal use. Use our travel VPN when connecting to any network.",
        supportingDocs: [
          { name: "VPN Configuration Guide", link: "https://docs.company.com/vpn/setup" },
          { name: "Country-Specific Security Advisories", link: "https://docs.company.com/security/advisories" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Device Protection Guidelines", link: "https://docs.company.com/security/devices" },
      { name: "International Travel Security Policy", link: "https://docs.company.com/security/TRAVEL-002" }
    ],
    otherDocs: [
      { name: "VPN Configuration Guide", link: "https://docs.company.com/vpn/setup" },
      { name: "Country-Specific Security Advisories", link: "https://docs.company.com/security/advisories" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000400"
  },
  {
    id: 4,
    question: "Our team needs to share some sensitive financial documents with external auditors.",
    user: "Alex Kumar",
    stage: "Planning",
    dueDate: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Data Protection Team",
      teamEmail: "dataprotection@company.com",
      contact: "James Wilson",
      email: "james.wilson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Manager of prior policy owner`, `Has the same role as the prior policy owner`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "External file sharing must use our approved secure file transfer solution (SecureShare). You'll need to: 1) Request access through IT Service Portal, 2) Complete the External Sharing Agreement form.",
        supportingDocs: [
          { name: "External Data Sharing Policy", link: "https://docs.company.com/security/DATA-002" }
        ]
      },
      {
        text: "All shared documents must be logged in the Data Sharing Register and use time-limited links (max 7 days).",
        supportingDocs: [
          { name: "Auditor Security Requirements", link: "https://docs.company.com/security/audit-requirements" }
        ]
      },
      {
        text: "Enable download tracking and ensure all documents are properly classified according to our data classification guidelines.",
        supportingDocs: [
          { name: "Data Classification Guidelines", link: "https://docs.company.com/security/data-classification" }
        ]
      }
    ],
    supportingDocs: [
      { name: "External Data Sharing Policy", link: "https://docs.company.com/security/DATA-002" },
      { name: "Auditor Security Requirements", link: "https://docs.company.com/security/audit-requirements" }
    ],
    otherDocs: [
      { name: "SecureShare User Guide", link: "https://docs.company.com/tools/secureshare" },
      { name: "Data Classification Guidelines", link: "https://docs.company.com/security/data-classification" }
    ],
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/external-sharing-query"
  },
  {
    id: 5,
    question: "We're hiring contractors next week and need to get them laptop access.",
    user: "Patricia Wong",
    stage: "Onboarding",
    dueDate: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'No'
    },
    suggestedResponse: [
      {
        text: "Contractor device access requires: 1) Completed Contractor Security Agreement, 2) Background check confirmation from HR.",
        supportingDocs: [
          { name: "Contractor Security Policy", link: "https://docs.company.com/security/CONTRACTOR-001" }
        ]
      },
      {
        text: "Device must be company-issued or meet our BYOD requirements. Submit requests through Contractor Access Portal at least 3 business days before start date.",
        supportingDocs: [
          { name: "Device Access Requirements", link: "https://docs.company.com/security/device-access" }
        ]
      },
      {
        text: "All contractors must complete Security Awareness Training before access is granted.",
        supportingDocs: [
          { name: "Security Training Portal", link: "https://training.company.com/security" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Contractor Security Policy", link: "https://docs.company.com/security/CONTRACTOR-001" },
      { name: "Device Access Requirements", link: "https://docs.company.com/security/device-access" }
    ],
    otherDocs: [
      { name: "BYOD Guidelines", link: "https://docs.company.com/security/byod" },
      { name: "Security Training Portal", link: "https://training.company.com/security" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000500"
  },
  {
    id: 6,
    question: "Can we use personal LastPass accounts to share team credentials?",
    user: "Tom Mitchell",
    stage: "Operations",
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: [
      {
        text: "No, personal password managers cannot be used for company credentials under any circumstances. This violates our security policy and creates significant risks.",
        supportingDocs: [
          { name: "Password Management Policy", link: "https://docs.company.com/security/PASS-001" }
        ]
      },
      {
        text: "For temporary credential sharing, use the approved interim solution (KeyPass with encrypted file on approved share).",
        supportingDocs: [
          { name: "Credential Sharing Guidelines", link: "https://docs.company.com/security/cred-sharing" }
        ]
      },
      {
        text: "Enterprise password manager rollout is scheduled for completion in 2 weeks.",
        supportingDocs: [
          { name: "Enterprise Password Manager Rollout Plan", link: "https://docs.company.com/projects/password-manager" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Password Management Policy", link: "https://docs.company.com/security/PASS-001" },
      { name: "Credential Sharing Guidelines", link: "https://docs.company.com/security/cred-sharing" }
    ],
    otherDocs: [
      { name: "Enterprise Password Manager Rollout Plan", link: "https://docs.company.com/projects/password-manager" },
      { name: "Approved Tools List", link: "https://docs.company.com/security/approved-tools" }
    ],
    source: "Zendesk ticket",
    sourceLink: "https://zendesk.company.com/tickets/SEC-2023-789"
  },
  {
    id: 7,
    question: "Reporting suspicious emails with DocuSign links",
    user: "Security Operations",
    stage: "Active Incident",
    dueDate: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Security Operations Team",
      teamEmail: "secops@company.com",
      contact: "Alex Rivera",
      email: "alex.rivera@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: [
      {
        text: "1) Block sender domains immediately via email gateway, 2) Send company-wide alert about DocuSign phishing campaign.",
        supportingDocs: [
          { name: "Phishing Response Playbook", link: "https://docs.company.com/security/phishing-response" },
          { name: "Email Security Controls", link: "https://docs.company.com/security/email-controls" }
        ]
      },
      {
        text: "3) Check email logs for click-throughs, 4) Reset passwords for any affected accounts.",
        supportingDocs: [
          { name: "Email Security Controls", link: "https://docs.company.com/security/email-controls" }
        ]
      },
      {
        text: "5) Update phishing detection rules to catch similar patterns.",
        supportingDocs: [
          { name: "DocuSign Security Guidelines", link: "https://docs.company.com/security/docusign" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Phishing Response Playbook", link: "https://docs.company.com/security/phishing-response" },
      { name: "Email Security Controls", link: "https://docs.company.com/security/email-controls" }
    ],
    otherDocs: [
      { name: "Security Awareness Training", link: "https://docs.company.com/training/security" },
      { name: "DocuSign Security Guidelines", link: "https://docs.company.com/security/docusign" }
    ],
    source: "Phishing report button",
    sourceLink: "https://phishing.company.com/reports/2023-15"
  },
  {
    id: 8,
    question: "Data center fire alarm triggered - Emergency response needed",
    user: "NOC Team",
    stage: "Critical Incident",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Infrastructure & Facilities",
      teamEmail: "facilities@company.com",
      contact: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: [
      {
        text: "Immediate actions required: 1) Verify fire suppression system activation, 2) Initiate emergency shutdown procedures for affected racks.",
        supportingDocs: [
          { name: "Data Center Emergency Procedures", link: "https://docs.company.com/facilities/dc-emergency" }
        ]
      },
      {
        text: "3) Notify on-call facilities team, 4) Activate disaster recovery procedures if needed.",
        supportingDocs: [
          { name: "Business Continuity Plan", link: "https://docs.company.com/security/bcp" }
        ]
      },
      {
        text: "5) Prepare for failover to backup data center if situation escalates.",
        supportingDocs: [
          { name: "Emergency Contact List", link: "https://docs.company.com/facilities/emergency-contacts" }
        ]
      }
    ],
    supportingDocs: [
      { name: "Data Center Emergency Procedures", link: "https://docs.company.com/facilities/dc-emergency" },
      { name: "Business Continuity Plan", link: "https://docs.company.com/security/bcp" }
    ],
    otherDocs: [
      { name: "Data Center Layout", link: "https://docs.company.com/facilities/dc-layout" },
      { name: "Emergency Contact List", link: "https://docs.company.com/facilities/emergency-contacts" }
    ],
    source: "Emergency hotline",
    sourceLink: "https://incidents.company.com/DC-2023-89"
  }
]

const resolvedQuestions: ResolvedQuestion[] = [
  {
    id: 1,
    question: "What is our policy on password complexity?",
    user: "Alice Johnson",
    stage: "Implementation",
    resolvedDate: "2024-01-14",
    triage: "medium",
    response: "Our password policy requires a minimum of 12 characters, including uppercase and lowercase letters, numbers, and special characters. We also implement a password strength meter to encourage even stronger passwords.",
    decision: "Implemented in User Authentication Module",
    documentationLink: "/security/policies/password-policy",
    source: "Security review ticket",
    sourceLink: "https://jira.company.com/browse/SEC-001",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 2,
    question: "How often should we conduct security audits?",
    user: "Bob Williams",
    stage: "Operations",
    resolvedDate: "2024-01-13",
    triage: "low",
    response: "We conduct comprehensive security audits on a quarterly basis, with continuous monitoring and smaller checks performed weekly. This schedule balances thorough review with operational efficiency.",
    decision: "Added to Security Operations Calendar",
    documentationLink: "/security/operations/audit-schedule",
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000300",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Contributors from prior tickets belong to this team`]
      },
      contactConfidence: {
        level: 'low',
        reasons: [`Manager of team assumed to own policy`]
      },
      signOffStatus: 'N/A'
    },
    suggestedResponse: []
  },
  {
    id: 3,
    question: "Can I use my personal iPhone to access work email while on vacation?",
    user: "Maria Garcia",
    stage: "Access Management",
    resolvedDate: "2024-01-14",
    triage: "medium",
    response: "Yes, you can access work email on personal iOS devices if they meet our BYOD requirements: 1) Latest iOS version, 2) Device passcode enabled, 3) Installation of our MDM profile, 4) Acceptance of remote wipe capability. Install our Mobile Access Portal app to get started.",
    decision: "Approved with standard BYOD controls",
    documentationLink: "/security/byod/mobile-access",
    source: "Email to security-helpdesk alias",
    sourceLink: "https://mail.company.com/threads/mobile-access-request",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'medium',
        reasons: [`Contributors from prior tickets belong to this team`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 4,
    question: "Lost my laptop in a taxi - what do I need to do immediately?",
    user: "David Chen",
    stage: "Incident Response",
    resolvedDate: "2024-01-14",
    triage: "urgent",
    response: "Remote wipe initiated within 15 minutes of report. Device tracking enabled. User credentials reset. New laptop issued with restored backup from previous day. Incident report filed and no sensitive data was compromised due to disk encryption.",
    decision: "Incident closed - no data breach",
    documentationLink: "/security/incidents/LOST-2023-45",
    source: "Emergency hotline",
    sourceLink: "https://incidents.company.com/LOST-2023-45",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 5,
    question: "Need approval for using Zoom with external clients - is this allowed?",
    user: "Rachel Thompson",
    stage: "Software Approval",
    resolvedDate: "2024-01-13",
    triage: "medium",
    response: "Zoom is approved for external client meetings with required settings: SSO authentication, waiting rooms enabled, meeting passwords required, cloud recording disabled. Use company Zoom account only, not personal.",
    decision: "Approved with security controls",
    documentationLink: "/security/approved-software/video-conferencing",
    source: "Zendesk ticket",
    sourceLink: "https://zendesk.company.com/tickets/SEC-2023-089",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 6,
    question: "Received suspicious email claiming to be from CEO - what should I do?",
    user: "James Wilson",
    stage: "Phishing Report",
    resolvedDate: "2024-01-14",
    triage: "high",
    response: "Confirmed phishing attempt. Email reported to security team, blocked sender domain, updated email filters. All employees notified of phishing campaign. Reminder sent about CEO impersonation red flags.",
    decision: "Phishing attempt blocked and documented",
    documentationLink: "/security/incidents/PHISH-2023-12",
    source: "Phishing report button",
    sourceLink: "https://phishing.company.com/reports/2023-12",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  },
  {
    id: 7,
    question: "Do we need to encrypt USB drives used in the office?",
    user: "Emma Davis",
    stage: "Policy Clarification",
    resolvedDate: "2024-01-13",
    triage: "medium",
    response: "Yes, all removable storage devices must use hardware encryption. Only company-issued encrypted USB drives are permitted. Available from IT with department manager approval. Personal USB devices are not allowed.",
    decision: "Policy reinforced - no exceptions",
    documentationLink: "/security/policies/removable-media",
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000400",
    policyOwner: {
      team: "Identity & Access Management Team",
      teamEmail: "iam@company.com",
      contact: "Maya Patel",
      email: "maya.patel@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Contributors from prior tickets belong to this team`, `Email alias for this team found on policy docs`, `Members of this team often respond to similar questions on Slack`, `Team owns KB article for this policy`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Prior contributor to similar tickets`, `Author of KB articles for similar issues`, `Has answered similar questions on previous tickets`, `Author on a design doc for this policy area`]
      },
      signOffStatus: 'Yes'
    },
    suggestedResponse: []
  }
]

interface ConfirmedAssociations {
  [questionId: number]: {
    [docName: string]: boolean;
  };
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export function QuestionsTable() {
  const [showResolved, setShowResolved] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<OutstandingQuestion | ResolvedQuestion | null>(null)
  const [response, setResponse] = useState('')
  const [confirmedAssociations, setConfirmedAssociations] = useState<ConfirmedAssociations>({})
  const [selectedTriage, setSelectedTriage] = useState<string>('')
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [isTeamExpanded, setIsTeamExpanded] = useState(false)
  const [isContactExpanded, setIsContactExpanded] = useState(false)

  const questions = showResolved ? resolvedQuestions : outstandingQuestions

  const handleUseResponse = () => {
    if (selectedQuestion && 'suggestedResponse' in selectedQuestion) {
      setResponse(selectedQuestion.suggestedResponse.map(section => section.text).join('\n'))
    }
  }

  const handleModifyResponse = () => {
    if (selectedQuestion && 'suggestedResponse' in selectedQuestion) {
      setResponse(selectedQuestion.suggestedResponse.map(section => section.text).join('\n'))
    }
  }

  const handleConfirmAssociation = (questionId: number, docName: string, isAssociated: boolean) => {
    setConfirmedAssociations(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [docName]: isAssociated
      }
    }))
    // Here you would typically send this information back to your AI model or backend
    console.log(`Document "${docName}" is ${isAssociated ? '' : 'not '}associated with question ${questionId}`)
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Slack #ask-security channel':
        return <MessageSquare className="h-4 w-4 mr-2" />
      case 'Email to security-helpdesk alias':
        return <Mail className="h-4 w-4 mr-2" />  
      case 'Security review ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Zendesk ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Phishing report button':
        return <Fish className="h-4 w-4 mr-2" />
      case 'Emergency hotline':
        return <Phone className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  const getSLAStatus = (question: OutstandingQuestion) => {
    const due = new Date(question.dueDate)
    const now = new Date()
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    const slaHours = {
      urgent: 72,
      high: 150,
      medium: 300,
      low: 720
    }
    
    const triage = question.triage || 'medium'
    const targetHours = slaHours[triage as keyof typeof slaHours]
    
    return {
      hours: targetHours,
      onTrack: diffHours > 0,
      remaining: Math.abs(Math.round(diffHours))
    }
  }

  const sortQuestions = (questions: (OutstandingQuestion | ResolvedQuestion)[]) => {
    if (!sortConfig) return questions

    return [...questions].sort((a, b) => {
      const aValue = a[sortConfig.key as keyof typeof a]
      const bValue = b[sortConfig.key as keyof typeof b]

      if (aValue === bValue) return 0
      
      if (sortConfig.direction === 'asc') {
        return (aValue ?? '') < (bValue ?? '') ? -1 : 1
      } else {
        return (aValue ?? '') > (bValue ?? '') ? -1 : 1
      }
    })
  }

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }

  const filterQuestions = (questions: (OutstandingQuestion | ResolvedQuestion)[]) => {
    if (!selectedTriage) return questions
    return questions.filter(q => q.triage === selectedTriage)
  }

  const filteredQuestions = filterQuestions(questions)
  const sortedQuestions = sortQuestions(filteredQuestions)

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Security Help Desk Questions</h2>
        < div className="flex grow shrink-0 basis-0 items-center justify-end gap-2" >
              <Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "brand-secondary" : "neutral-secondary"}
                icon={!showResolved ? "FeatherCheck" : undefined}
                onClick={() => setShowResolved(false)}
              >
                Oustanding
              </Button>
              < Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "neutral-secondary" : "brand-secondary"}
                icon={!showResolved ? undefined : "FeatherCheck"}
                onClick={() => setShowResolved(true)}
              >
                Resolved
              </Button>
            </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('question')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Question</span>
                {sortConfig?.key === 'question' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('user')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>User</span>
                {sortConfig?.key === 'user' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('stage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Type</span>
                {sortConfig?.key === 'stage' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('triage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Triage</span>
                {sortConfig?.key === 'triage' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            {!showResolved && (
              <TableHead onClick={() => handleSort('dueDate')} className="cursor-pointer hover:bg-muted">
                <div className="flex items-center space-x-1">
                  <span>SLA Status</span>
                  {sortConfig?.key === 'dueDate' && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
            )}
            <TableHead 
              onClick={() => handleSort(showResolved ? 'resolvedDate' : 'dueDate')} 
              className="cursor-pointer hover:bg-muted"
            >
              <div className="flex items-center space-x-1">
                <span>{showResolved ? 'Resolved Date' : 'Due By'}</span>
                {sortConfig?.key === (showResolved ? 'resolvedDate' : 'dueDate') && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('source')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Source</span>
                {sortConfig?.key === 'source' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedQuestions.map((question) => (
            <TableRow key={question.id} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedQuestion(question)}>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.user}</TableCell>
              <TableCell>{question.stage}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  question.triage === 'urgent' ? 'bg-red-100 text-red-800' :
                  question.triage === 'high' ? 'bg-orange-100 text-orange-800' :
                  question.triage === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {question.triage || 'medium'}
                </span>
              </TableCell>
              {!showResolved && 'dueDate' in question && (
                <TableCell>
                  {(() => {
                    const status = getSLAStatus(question)
                    return (
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${status.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                          {status.onTrack ? '✓' : '⚠'}
                        </span>
                        <span className="text-sm text-gray-600">
                          {status.onTrack ? 
                            `${status.remaining}hrs left` : 
                            `${status.remaining}hrs over`
                          }
                        </span>
                      </div>
                    )
                  })()}
                </TableCell>
              )}
              <TableCell>
                {'resolvedDate' in question ? question.resolvedDate : question.dueDate}
              </TableCell>
              <TableCell className="flex items-center">
                {getSourceIcon(question.source)}
                {question.source}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedQuestion && (
        <Sheet open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
          <SheetContent 
            style={{ maxWidth: 'min(50vw, 800px)' }} 
            className="w-full" 
            side="right"
          >
            <SheetHeader>
              <SheetTitle>{selectedQuestion.question}</SheetTitle>
              <SheetDescription>Review and respond to this security question</SheetDescription>
            </SheetHeader>

            <ScrollArea className="h-[calc(100vh-250px)]">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Submitted by:</Label>
                  <span className="col-span-3">{selectedQuestion.user}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Stage:</Label>
                  <span className="col-span-3">{selectedQuestion.stage}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">{showResolved ? 'Resolved on:' : 'Due by:'}</Label>
                  <span className="col-span-3">
                    {showResolved ? 
                      ('resolvedDate' in selectedQuestion ? selectedQuestion.resolvedDate : '') : 
                      ('dueDate' in selectedQuestion ? selectedQuestion.dueDate : '')}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Source:</Label>
                  <div className="col-span-3 flex items-center">
                    {getSourceIcon(selectedQuestion.source)}
                    <a href={selectedQuestion.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                      {selectedQuestion.source}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
                {!showResolved && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Triage Level:</Label>
                      <div className="col-span-3">
                        <Select 
                          value={selectedTriage || (selectedQuestion?.triage || 'medium')} 
                          onValueChange={setSelectedTriage}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select triage level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {!showResolved && 'dueDate' in selectedQuestion && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">SLA Status:</Label>
                        <div className="col-span-3">
                          {(() => {
                            const status = getSLAStatus(selectedQuestion)
                            return (
                              <div className="flex items-center space-x-2">
                                <span className={`font-medium ${status.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                                  {status.onTrack ? '✓ On Track' : '⚠ SLA Missed'}
                                </span>
                                <span className="text-gray-600">
                                  ({status.hours}hr SLA, {status.onTrack ? `${status.remaining}hrs remaining` : `${status.remaining}hrs overdue`})
                                </span>
                              </div>
                            )
                          })()}
                        </div>
                      </div>
                    )}
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold self-start pt-1">Policy Owner:</Label>
                        <div className="col-span-3 space-y-4">
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center gap-4">
                                  <label className="text-sm font-semibold text-gray-600">Team</label>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedQuestion.policyOwner.teamConfidence.level === 'high' ? 'bg-green-100 text-green-800' :
                                  selectedQuestion.policyOwner.teamConfidence.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                  }`}>
                                  {selectedQuestion.policyOwner.teamConfidence.level} confidence
                                  </span>
                              </div>
                              <p>
                                {selectedQuestion.policyOwner.team} (
                                <a href={`mailto:${selectedQuestion.policyOwner.teamEmail}`} className="text-blue-600 hover:underline">
                                  {selectedQuestion.policyOwner.teamEmail}
                                </a>)
                              </p>
                            </div>
                            <Accordion
                                  trigger={
                                  <div>
                                      <span className="grow shrink-0 basis-0 text-body font-body text-primary">
                                      Why this team?
                                      </span>
                                      <Accordion.Chevron />
                                  </div>
                                  }
                                  defaultOpen={false}
                                  >
                                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-6 pb-6">
                                      <ul className="list-disc list-inside">
                                          {selectedQuestion.policyOwner.teamConfidence.reasons.map((reason, i) => (
                                          <li key={i}>{reason}</li>
                                          ))}
                                      </ul>
                                      <Button
                                          variant="brand-secondary"
                                          onClick={() => null}
                                      >
                                          Update team?
                                      </Button>
                                  </div>
                            </Accordion>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center gap-4">
                                  <label className="text-sm font-semibold text-gray-600">Contact</label>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                  selectedQuestion.policyOwner.contactConfidence.level === 'high' ? 'bg-green-100 text-green-800' :
                                  selectedQuestion.policyOwner.contactConfidence.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                  }`}>
                                  {selectedQuestion.policyOwner.contactConfidence.level} confidence
                                  </span>
                              </div>
                              <p>
                                {selectedQuestion.policyOwner.contact} (
                                <a href={`mailto:${selectedQuestion.policyOwner.email}`} className="text-blue-600 hover:underline">
                                  {selectedQuestion.policyOwner.email}
                                </a>)
                              </p>
                            </div>
                            <Accordion
                                  trigger={
                                  <div>
                                      <span className="grow shrink-0 basis-0 text-body font-body text-primary">
                                      Why this contact?
                                      </span>
                                      <Accordion.Chevron />
                                  </div>
                                  }
                                  defaultOpen={false}
                                  >
                                  <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-6 pb-6">
                                      <ul className="list-disc list-inside">
                                          {selectedQuestion.policyOwner.contactConfidence.reasons.map((reason, i) => (
                                          <li key={i}>{reason}</li>
                                          ))}
                                      </ul>
                                      <Button
                                          variant="brand-secondary"
                                          onClick={() => null}
                                      >
                                          Update contact?
                                      </Button>
                                  </div>
                            </Accordion>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4 mt-4">
                              <div className="col-span-3 flex items-center gap-4">
                                  <label className="text-sm font-semibold text-gray-600">Sign Off Status:</label>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                      selectedQuestion.policyOwner.signOffStatus === 'Yes' ? 'bg-green-100 text-green-800' :
                                      selectedQuestion.policyOwner.signOffStatus === 'No' ? 'bg-red-100 text-red-800' :
                                      selectedQuestion.policyOwner.signOffStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-gray-100 text-gray-800'
                                  }`}>
                                      {selectedQuestion.policyOwner.signOffStatus || 'Pending'}
                                  </span>
                              </div>
                              <div className="col-span-3 flex items-center gap-2">
                                  <Button
                                      variant="brand-secondary"
                                      disabled={selectedQuestion.policyOwner.signOffStatus === 'Yes'}
                                      onClick={() => {
                                          // Add your request sign off logic here
                                          console.log('Requesting sign off');
                                      }}
                                      >
                                      Request Sign Off
                                      </Button>
                                      <Button
                                      variant="neutral-secondary"
                                      disabled={selectedQuestion.policyOwner.signOffStatus === 'N/A'}
                                      onClick={() => {
                                          // Add your not needed logic here
                                          console.log('Sign off not needed');
                                      }}
                                      >
                                      Not Required
                                  </Button>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold self-start pt-1">Suggested Response:</Label>
                      <div className="col-span-3 space-y-4">
                        {'suggestedResponse' in selectedQuestion && (
                          <>
                            {selectedQuestion.suggestedResponse.map((section, index) => (
                              <div key={index} className="space-y-2">
                                <p className="text-sm text-gray-700">{section.text}</p>
                                <div className="flex gap-2">
                                  {section.supportingDocs.map((doc, docIndex) => (
                                    <a 
                                      key={docIndex}
                                      href={doc.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-xs text-blue-500 hover:underline flex items-center bg-blue-50 px-2 py-1 rounded"
                                    >
                                      <span>{doc.name}</span>
                                      <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <div className="flex space-x-2 mt-4">
                              <Button variant="brand-secondary" onClick={handleUseResponse}>Use This Response</Button>
                              <Button variant="neutral-secondary" onClick={handleModifyResponse}>Modify Response</Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right self-start pt-1">
                        <span className="font-semibold">Supporting Content:</span>
                        <span className="block text-sm text-gray-500">Content that was referenced to create this response</span>
                      </Label>
                      <div className="col-span-3">
                        {'suggestedResponse' in selectedQuestion && selectedQuestion.suggestedResponse.map((section, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <a href={section.supportingDocs[0].link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                              {section.supportingDocs[0].name}
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right self-start pt-1">
                        <span className="font-semibold">Other Content:</span>
                        <span className="block text-sm text-gray-500">This content may be related, but was not used. Should it be referenced for topics like this in the future?</span>
                      </Label>
                      <div className="col-span-3">
                        {'otherDocs' in selectedQuestion && selectedQuestion.otherDocs.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between mb-2">
                            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                              {doc.name}
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="small"
                                icon="FeatherCheck"
                                variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === true ? "brand-primary" : "brand-secondary"}
                                onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, true)}
                              >
                              </Button>
                              <Button
                                size="small"
                                icon="FeatherX"
                                variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === false ? "brand-primary" : "brand-secondary"}
                                onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, false)}
                              >
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {showResolved ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Response:</Label>
                      <span className="col-span-3">{'response' in selectedQuestion ? selectedQuestion.response : ''}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Decision:</Label>
                      <span className="col-span-3">{'decision' in selectedQuestion ? selectedQuestion.decision : ''}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Documentation:</Label>
                      {'documentationLink' in selectedQuestion && (
                        <a href={selectedQuestion.documentationLink} className="col-span-3 text-blue-500 hover:underline flex items-center">
                          {selectedQuestion.documentationLink}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="response" className="font-semibold">Your Response:</Label>
                    <Textarea
                      id="response"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Enter your response here..."
                    />
                  </div>
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="flex justify-end gap-4 border-t pt-4 mt-4">
              <Button
                variant="neutral-secondary"
                onClick={() => setSelectedQuestion(null)}
              >
                Cancel
              </Button>
              <Button
                variant="brand-primary"
                onClick={() => {
                  // Add approval logic here
                  console.log('Approving question:', selectedQuestion?.id);
                  setSelectedQuestion(null);
                }}
              >
                Post Response to Source
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
