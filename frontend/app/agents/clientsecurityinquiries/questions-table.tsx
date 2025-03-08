'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/subframe/components/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, MessageSquare, Mail, Ticket, Phone, Users, ArrowUpDown, FileText, PanelTop, ChevronDown, ChevronUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion } from "@/subframe/components/Accordion";

interface Question {
  id: number;
  company: string;
  question: string;
  user: string;
  email: string;
  stage: string;
  source: string;
  sourceLink: string;
  triage?: 'urgent' | 'high' | 'medium' | 'low';
}

interface OutstandingQuestion extends Question {
  dueDate: string;
  suggestedResponse: string;
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
    company: "TechCorp",
    question: "What are your company's security measures for protecting customer data?",
    user: "Jane Smith",
    email: "jane.smith@techcorp.com",
    stage: "Customer Inquiry",
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Data Protection Team",
      teamEmail: "dataprotection@company.com",
      contact: "James Wilson",
      email: "james.wilson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Team handles data protection queries", "Team is listed as the owner of relevant policies", "KB articles link back to this team"]
      },
      contactConfidence: {
        level: 'medium',
        reasons: ["Has answered similar queries", "KB articles authored by this contact"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Our company follows best practices to secure customer data, including encryption in transit and at rest, multi-factor authentication for access, and regular security audits. We also comply with GDPR and CCPA regulations to ensure customer data privacy and protection.",
    supportingDocs: [
      { name: "Data Protection Policy", link: "https://docs.company.com/security/DATA-001" },
      { name: "Customer Data Handling Procedures", link: "https://docs.company.com/data-handling" }
    ],
    otherDocs: [
      { name: "Data Encryption Overview", link: "https://docs.company.com/encryption/overview" },
      { name: "Security Audit Summary", link: "https://docs.company.com/audits/summary" }
    ],
    source: "Customer via Helpdesk",
    sourceLink: "https://mail.company.com/threads/security-inquiry-techcorp"
  },
  {
    id: 2,
    company: "FinServe",
    question: "What controls are in place to ensure compliance with GDPR?",
    user: "Mark Johnson",
    email: "mark.johnson@finserve.com",
    stage: "Regulatory Inquiry",
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Compliance Team",
      teamEmail: "compliance@company.com",
      contact: "Emily Davis",
      email: "emily.davis@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Compliance Team is responsible for GDPR compliance", "Previous GDPR inquiries have been handled by this team"]
      },
      contactConfidence: {
        level: 'high',
        reasons: ["Emily Davis is listed as GDPR compliance contact", "Authored compliance documentation"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Our organization has implemented GDPR compliance through various measures, including data minimization, encryption, pseudonymization, and data subject rights management. We have a dedicated Data Protection Officer and conduct regular data protection impact assessments (DPIAs) to ensure ongoing compliance.",
    supportingDocs: [
      { name: "GDPR Compliance Policy", link: "https://docs.company.com/compliance/gdpr" },
      { name: "DPIA Procedures", link: "https://docs.company.com/dpia/procedures" }
    ],
    otherDocs: [
      { name: "Data Retention Policy", link: "https://docs.company.com/compliance/data-retention" },
      { name: "Customer Rights Management", link: "https://docs.company.com/compliance/customer-rights" }
    ],
    source: "Regulator Inquiry via hello@company.com",
    sourceLink: "https://mail.company.com/threads/gdpr-inquiry-finserve"
  },
  {
    id: 3,
    company: "GlobalBank",
    question: "How do you handle incident response in the case of a data breach?",
    user: "Sophie Lee",
    email: "sophie.lee@globalbank.com",
    stage: "Client Security Assessment",
    dueDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "medium",
    policyOwner: {
      team: "Incident Response Team",
      teamEmail: "ir@company.com",
      contact: "John Brown",
      email: "john.brown@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Team manages incident response procedures", "Listed as owner in incident response playbook"]
      },
      contactConfidence: {
        level: 'medium',
        reasons: ["John Brown is the primary incident response contact", "Participated in recent tabletop exercises"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "In the event of a data breach, we follow our Incident Response Plan which includes immediate containment, eradication of threats, and recovery procedures. Notifications to affected parties and regulators occur in line with legal requirements. Our IR team is trained for rapid response and performs regular drills.",
    supportingDocs: [
      { name: "Incident Response Plan", link: "https://docs.company.com/ir/response-plan" },
      { name: "Breach Notification Guidelines", link: "https://docs.company.com/ir/breach-notification" }
    ],
    otherDocs: [
      { name: "Tabletop Exercise Reports", link: "https://docs.company.com/ir/tabletop-reports" },
      { name: "Incident Logging Procedures", link: "https://docs.company.com/ir/logging" }
    ],
    source: "Client Questionnaire",
    sourceLink: "https://clientportal.globalbank.com/security-assessment"
  },
  {
    id: 4,
    company: "HealthNet",
    question: "What controls do you have in place for HIPAA compliance?",
    user: "Robert Chen",
    email: "r.chen@healthnet.com",
    stage: "Compliance Review",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Healthcare Compliance Team",
      teamEmail: "healthcare-compliance@company.com",
      contact: "Sarah Miller",
      email: "sarah.miller@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Dedicated HIPAA compliance team", "Handles all healthcare-related inquiries"]
      },
      contactConfidence: {
        level: 'high',
        reasons: ["HIPAA compliance officer", "Primary contact for healthcare customers"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Our HIPAA compliance program includes comprehensive PHI protection measures, including end-to-end encryption, access controls, audit logging, and regular compliance training. We maintain BAAs with all subprocessors and conduct annual HIPAA risk assessments.",
    supportingDocs: [
      { name: "HIPAA Compliance Framework", link: "https://docs.company.com/compliance/hipaa" },
      { name: "PHI Handling Guidelines", link: "https://docs.company.com/healthcare/phi" }
    ],
    otherDocs: [
      { name: "Access Control Policy", link: "https://docs.company.com/security/access-control" },
      { name: "Audit Log Standards", link: "https://docs.company.com/security/audit-logs" }
    ],
    source: "Trust Center Portal Form",
    sourceLink: "https://compliance.healthnet.com/vendor-assessment"
  },
  {
    id: 5,
    company: "PaymentPro",
    question: "Can you provide details about your PCI DSS certification level and controls?",
    user: "Lisa Wong",
    email: "l.wong@paymentpro.com",
    stage: "Security Assessment",
    dueDate: new Date(Date.now() + (6 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Payment Security Team",
      teamEmail: "payment-security@company.com",
      contact: "Michael Torres",
      email: "m.torres@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Dedicated PCI compliance team", "Manages all payment security certifications"]
      },
      contactConfidence: {
        level: 'medium',
        reasons: ["Recently appointed as PCI lead", "Still transitioning into role"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "We maintain PCI DSS Level 1 certification, verified annually by a QSA. Our controls include network segmentation, encryption of CHD, strict access controls, and continuous monitoring. We can provide our AOC upon execution of an NDA.",
    supportingDocs: [
      { name: "PCI Compliance Overview", link: "https://docs.company.com/compliance/pci" },
      { name: "Cardholder Data Environment", link: "https://docs.company.com/security/cde" }
    ],
    otherDocs: [
      { name: "Network Segmentation", link: "https://docs.company.com/security/network" },
      { name: "Monitoring Standards", link: "https://docs.company.com/security/monitoring" }
    ],
    source: "Trust Center Portal Form",
    sourceLink: "https://vendors.paymentpro.com/security"
  },
  {
    id: 6,
    company: "RelianceSys",
    question: "What is your uptime? Do you have data from your last recovery test?",
    user: "Amanda Patel",
    email: "a.patel@reliancesys.com", 
    stage: "Technical Due Diligence",
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "Site Reliability Engineering",
      teamEmail: "sre@company.com",
      contact: "Kevin Zhang",
      email: "k.zhang@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Owns uptime SLAs", "Manages disaster recovery program", "Conducts all recovery testing"]
      },
      contactConfidence: {
        level: 'high',
        reasons: ["SRE Team Lead", "Personally oversees DR tests", "Authors monthly availability reports"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "We maintain 99.99% uptime (measured monthly) with our primary production environment. Our most recent disaster recovery test was conducted on March 15, 2024, achieving full recovery within our 4-hour RTO target. The test included full failover to our secondary region and validation of all critical business services.",
    supportingDocs: [
      { name: "Uptime Reports - Last 12 Months", link: "https://docs.company.com/sre/uptime-2024" },
      { name: "DR Test Results - Q1 2024", link: "https://docs.company.com/sre/dr-test-q1-2024" }
    ],
    otherDocs: [
      { name: "Business Continuity Plan", link: "https://docs.company.com/sre/bcp" },
      { name: "SLA Commitments", link: "https://docs.company.com/sre/sla-terms" }
    ],
    source: "Client Meeting",
    sourceLink: "https://meetings.company.com/reliancesys-dd"
  },
  {
    id: 7,
    company: "SecureBank",
    question: "How at risk are you to ransomware? How quickly can you recover from a ransomware event?",
    user: "Marcus Thompson",
    email: "m.thompson@securebank.com",
    stage: "Security Assessment",
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "urgent",
    policyOwner: {
      team: "Security Operations",
      teamEmail: "secops@company.com",
      contact: "Diana Martinez",
      email: "d.martinez@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Manages ransomware prevention program", "Leads incident response for malware events", "Conducts regular tabletop exercises"]
      },
      contactConfidence: {
        level: 'high',
        reasons: ["Head of Security Operations", "Created ransomware playbook", "Leads IR team"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "We maintain robust ransomware defenses including immutable backups, network segmentation, and advanced EDR. Our last ransomware tabletop exercise demonstrated recovery within 6 hours. Key controls include offline backups with 15-minute RPO, air-gapped critical systems, and automated malware detection/response capabilities.",
    supportingDocs: [
      { name: "Ransomware Prevention Controls", link: "https://docs.company.com/security/ransomware-controls" },
      { name: "Backup & Recovery Strategy", link: "https://docs.company.com/security/backup-strategy" }
    ],
    otherDocs: [
      { name: "Latest Tabletop Results", link: "https://docs.company.com/security/tabletop-2024" },
      { name: "EDR Implementation", link: "https://docs.company.com/security/edr-overview" }
    ],
    source: "Security Review Meeting",
    sourceLink: "https://meetings.company.com/securebank-security"
  },
  {
    id: 8,
    company: "DataFirst",
    question: "Are you using my data to train your algorithms? How do you ensure that my data is safe if you are using cloud AI models?",
    user: "Sarah O'Connor",
    email: "s.oconnor@datafirst.com",
    stage: "Privacy Review",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    triage: "high",
    policyOwner: {
      team: "AI Governance & Privacy",
      teamEmail: "ai-privacy@company.com",
      contact: "Dr. Alex Kumar",
      email: "a.kumar@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Dedicated AI governance team", "Oversees all AI/ML data usage", "Authors AI privacy policies"]
      },
      contactConfidence: {
        level: 'high',
        reasons: ["AI Ethics Officer", "PhD in Privacy-Preserving ML", "Leads AI governance program"]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Customer data is never used for training our AI models without explicit consent. For cloud AI services, we use Azure OpenAI with Azure Confidential Computing, ensuring data remains encrypted in use. We maintain complete data isolation and implement prompt sanitization to prevent data leakage. All AI processing occurs in dedicated, access-controlled environments.",
    supportingDocs: [
      { name: "AI Data Usage Policy", link: "https://docs.company.com/ai/data-usage" },
      { name: "Cloud AI Security Controls", link: "https://docs.company.com/ai/security-controls" }
    ],
    otherDocs: [
      { name: "AI Privacy Impact Assessment", link: "https://docs.company.com/privacy/ai-pia" },
      { name: "Data Isolation Architecture", link: "https://docs.company.com/security/data-isolation" }
    ],
    source: "Client Questionnaire",
    sourceLink: "https://privacy.datafirst.com/assessment"
  }
];

const resolvedQuestions: ResolvedQuestion[] = [
  {
    id: 1,
    company: "MediSecure",
    question: "Does your organization encrypt all patient data?",
    user: "Dr. Alice Brown",
    email: "alice.brown@medisecure.com",
    stage: "Compliance Verification",
    resolvedDate: "2024-01-15",
    triage: "high",
    response: "Yes, we encrypt all patient data both in transit and at rest, using industry-standard AES-256 encryption. Our encryption protocols are regularly reviewed and updated to ensure they meet current best practices.",
    decision: "Confirmed compliance with encryption standards",
    documentationLink: "/security/policies/data-encryption",
    source: "Client Questionnaire",
    sourceLink: "https://compliance.medisecure.com/questions/enc-2024",
    policyOwner: {
      team: "Data Protection Team",
      teamEmail: "dataprotection@company.com",
      contact: "James Wilson",
      email: "james.wilson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Team owns data encryption policies", "James Wilson has answered previous inquiries on encryption"]
      },
      contactConfidence: {
        level: 'high',
        reasons: ["Primary contact for encryption policy", "Authored recent encryption guideline updates"]
      },
      signOffStatus: 'Yes'
    }
  },
  {
    id: 2,
    company: "RetailSolutions",
    question: "How frequently do you conduct vulnerability assessments?",
    user: "Tom Harris",
    email: "tom.harris@retailsolutions.com",
    stage: "Customer Due Diligence",
    resolvedDate: "2024-01-13",
    triage: "medium",
    response: "We conduct vulnerability assessments monthly, and perform comprehensive penetration testing annually. This ensures that any vulnerabilities are identified and mitigated in a timely manner, reducing the risk of exploitation.",
    decision: "Added to customer-facing security FAQs",
    documentationLink: "/security/operations/vulnerability-assessment",
    source: "Trust Center Portal Form",
    sourceLink: "https://security.retailsolutions.com/dd-form",
    policyOwner: {
      team: "Vulnerability Management Team",
      teamEmail: "vuln-mgmt@company.com",
      contact: "Emma Taylor",
      email: "emma.taylor@company.com",
      teamConfidence: {
        level: 'high',
        reasons: ["Team manages all vulnerability assessments", "Emma Taylor leads the vulnerability assessment efforts"]
      },
      contactConfidence: {
        level: 'medium',
        reasons: ["Primary contact for vulnerability queries", "Frequently mentioned in vulnerability reports"]
      },
      signOffStatus: 'Yes'
    }
  }
];


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
      setResponse(selectedQuestion.suggestedResponse)
    }
  }

  const handleModifyResponse = () => {
    if (selectedQuestion && 'suggestedResponse' in selectedQuestion) {
      setResponse(selectedQuestion.suggestedResponse)
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
      case 'Customer via Helpdesk':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Regulator Inquiry via hello@company.com':
        return <Mail className="h-4 w-4 mr-2" />  
      case 'Trust Center Portal Form':
        return <PanelTop className="h-4 w-4 mr-2" />
      case 'Client Questionnaire':
        return <FileText className="h-4 w-4 mr-2" />
      case 'Client Meeting':
        return <Phone className="h-4 w-4 mr-2" />
      case 'Security Review Meeting':
        return <Users className="h-4 w-4 mr-2" />
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
            <TableHead onClick={() => handleSort('company')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Company</span>
                {sortConfig?.key === 'company' && (
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
              <TableCell>{question.company}</TableCell>
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
        <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
          <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedQuestion.question}</DialogTitle>
              <DialogDescription>Review and respond to this security question</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Submitted by:</Label>
                <span className="col-span-3">{selectedQuestion.user}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Company:</Label>
                <span className="col-span-3">{selectedQuestion.company}</span>
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
                    <div className="col-span-3 space-y-2">
                      {'suggestedResponse' in selectedQuestion && (
                        <>
                          <p>{selectedQuestion.suggestedResponse}</p>
                          <div className="flex space-x-2">
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
                      {'supportingDocs' in selectedQuestion && selectedQuestion.supportingDocs.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                          <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                            {doc.name}
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
            <DialogFooter>
              {!showResolved && <Button type="submit">Submit Response</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
