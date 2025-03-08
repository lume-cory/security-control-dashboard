import { Button } from "@/subframe/components/Button"
import { Table } from "@/subframe/components/Table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Accordion } from "@/subframe/components/Accordion";
import { ExternalLink, Check, X, MessageSquare, Mail, Ticket } from 'lucide-react'

interface Question {
  id: number;
  question: string;
  user: string;
  team: string;
  stage: string;
  source: string;
  sourceLink: string;
  triage?: 'urgent' | 'high' | 'medium' | 'low';
  followUpQuestions: string[];
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

interface ConfirmedAssociations {
  [questionId: number]: {
    [docName: string]: boolean;
  };
}

const outstandingQuestions: OutstandingQuestion[] = [
  {
    id: 1,
    question: "What are the security implications of using a third-party authentication service?",
    user: "John Doe",
    team: "Mobile App",
    stage: "Architecture Review",
    dueDate: new Date(Date.now() + (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
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
    suggestedResponse: "Using a third-party authentication service can have both benefits and risks. Benefits include reduced development time and potentially more robust security measures. However, risks include potential data breaches at the third-party provider, loss of control over the authentication process, and potential service outages. It's crucial to thoroughly vet the provider, understand their security measures, and have contingency plans in place.",
    supportingDocs: [
      { name: "IAM Design Document #DESIGN-AUTH-001", link: "https://docs.company.com/security/DESIGN-AUTH-001" },
      { name: "Prior Review #PR-789", link: "https://reviews.company.com/PR-789" }
    ],
    otherDocs: [
      { name: "User Authentication Flow", link: "https://docs.company.com/auth/flow" },
      { name: "Third-Party Integration Guidelines", link: "https://docs.company.com/integration/guidelines" }
    ],
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000200",
    followUpQuestions: [
      "What specific third-party service are you considering?",
      "What types of user data will be handled by this service?",
      "What is your fallback authentication mechanism?",
      "How will you handle service outages?",
      "What compliance requirements apply to your user authentication?"
    ],
  },
  {
    id: 2,
    question: "How should we implement data encryption for user data at rest?",
    user: "Jane Smith",
    team: "Data Platform",
    stage: "Development",
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Data Security Team",
      teamEmail: "datasecurity@company.com",
      contact: "Liam Brown",
      email: "liam.brown@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team responsible for data encryption policies`, `Frequent contributors to encryption discussions`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Primary contact for encryption-related queries`, `Authored key encryption guidelines`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "For data encryption at rest, we recommend using AES-256 encryption. The implementation should include: 1) Use of a secure key management system to generate, store, and rotate encryption keys. 2) Encryption of data before it's written to disk. 3) Proper access controls to limit who can access the encrypted data and decryption keys. 4) Regular audits of the encryption process and key management. 5) Consideration of hardware-based encryption for additional security.",
    supportingDocs: [
      { name: "Encryption Guidelines #ENC-002", link: "https://docs.company.com/security/ENC-002" },
      { name: "Security Ticket #SEC-234", link: "https://jira.company.com/browse/SEC-234" }
    ],
    otherDocs: [
      { name: "Data Encryption Implementation", link: "https://docs.company.com/implementation/encryption" },
      { name: "Key Management Best Practices", link: "https://docs.company.com/security/key-management" }
    ],
    source: "Email to security-review alias",
    sourceLink: "mailto:security-review@company.com?subject=Data%20Encryption%20Question",
    followUpQuestions: [
      "What classification levels exist for your user data?",
      "Where is the data physically stored?",
      "Who needs access to the encrypted data?",
      "What is your key rotation strategy?",
      "How will you handle key compromise scenarios?"
    ],
  },
  {
    id: 3,
    question: "Static analysis found multiple SQL injection vulnerabilities in the reporting service. What's the recommended approach for parameterized queries?",
    user: "Alex Chen",
    team: "Analytics",
    stage: "Implementation",
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Database Security Team",
      teamEmail: "dbsecurity@company.com",
      contact: "Sophia Lee",
      email: "sophia.lee@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team handles database security`, `Involved in previous SQL injection mitigations`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Lead on recent database security projects`, `Regularly presents on SQL security`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "All database queries must use parameterized queries or ORMs. Replace string concatenation with prepared statements. For the reporting service specifically: 1) Use TypeORM's built-in query builder with parameters, 2) Implement input validation at API boundaries, 3) Add SQL injection testing to the CI pipeline using SQLMap.",
    supportingDocs: [
      { name: "Secure Coding Guidelines #DESIGN-SQL-001", link: "https://docs.company.com/security/DESIGN-SQL-001" },
      { name: "Static Analysis Report #SA-456", link: "https://security.company.com/reports/SA-456" }
    ],
    otherDocs: [
      { name: "TypeORM Security Best Practices", link: "https://docs.company.com/frameworks/typeorm-security" },
      { name: "Input Validation Patterns", link: "https://docs.company.com/security/input-validation" }
    ],
    source: "SonarQube Security Gate",
    sourceLink: "https://sonar.company.com/project/issues?id=reporting-service",
    followUpQuestions: [
      "Which ORM/database access layer are you using?",
      "What types of queries need to be parameterized?",
      "Are there any dynamic SQL requirements?",
      "What input validation exists at the API layer?",
      "How are database permissions configured for the service?"
    ],
  },
  {
    id: 4,
    question: "What are the security requirements for implementing WebSocket connections in our real-time trading platform?",
    user: "Sarah Kim",
    team: "Real-time Systems",
    stage: "Architecture Review",
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "Network Security Team",
      teamEmail: "networking@company.com",
      contact: "Ethan Wright",
      email: "ethan.wright@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team responsible for real-time systems security`, `Authored WebSocket security standards`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Key contributor to WebSocket security discussions`, `Lead on real-time security projects`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "WebSocket security requirements include: 1) TLS 1.3 for all connections, 2) Token-based authentication with short-lived JWTs, 3) Rate limiting per client, 4) Message size limits, 5) Input validation for all messages, 6) Automatic connection termination after 15 minutes of inactivity.",
    supportingDocs: [
      { name: "Network Security Standard #NW-001", link: "https://docs.company.com/security/WS-001" },
      { name: "Real-time Systems Security", link: "https://docs.company.com/security/realtime" }
    ],
    otherDocs: [
      { name: "Trading Platform Architecture", link: "https://docs.company.com/architecture/trading" },
      { name: "WebSocket Implementation Guide", link: "https://docs.company.com/development/websocket" }
    ],
    source: "Architecture Review Board",
    sourceLink: "https://jira.company.com/browse/ARB-789",
    followUpQuestions: [
      "What is the expected message throughput?",
      "How are you handling message replay attacks?",
      "What client authentication mechanisms are needed?",
      "How will you monitor connection health?",
      "What data validation exists for WebSocket messages?"
    ],
  },
  {
    id: 5,
    question: "How should we implement secure CI/CD pipelines for our new Kubernetes-based microservices?",
    user: "Mike Johnson",
    team: "DevOps",
    stage: "DevOps Design",
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    policyOwner: {
      team: "DevSecOps Team",
      teamEmail: "devsecops@company.com",
      contact: "Olivia Davis",
      email: "olivia.davis@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team leads CI/CD security initiatives`, `Developed CI/CD security controls`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Primary contact for CI/CD security`, `Regularly updates CI/CD security policies`]
      },
      signOffStatus: 'Pending'
    },
    suggestedResponse: "Secure CI/CD implementation requires: 1) Signed commits and container images, 2) SLSA Level 3 compliance, 3) Automated container scanning, 4) Secret scanning in pipeline, 5) IaC security scanning, 6) Automated SBOM generation and vulnerability tracking, 7) Separate credentials per environment.",
    supportingDocs: [
      { name: "CI/CD Security Controls #CICD-002", link: "https://docs.company.com/security/CICD-002" },
      { name: "Container Security Policy", link: "https://docs.company.com/security/containers" }
    ],
    otherDocs: [
      { name: "Kubernetes Security Hardening", link: "https://docs.company.com/platform/k8s-security" },
      { name: "Pipeline Templates", link: "https://docs.company.com/cicd/templates" }
    ],
    source: "DevSecOps Planning",
    sourceLink: "https://jira.company.com/browse/DEVSEC-456",
    followUpQuestions: [
      "What environments are in your deployment pipeline?",
      "How are deployment credentials managed?",
      "What security scanning tools are currently in use?",
      "How are container images stored and verified?",
      "What is your secret rotation strategy in Kubernetes?"
    ],
  }
]

const resolvedQuestions: ResolvedQuestion[] = [
  {
    id: 1,
    question: "What is our policy on password complexity?",
    user: "Alice Johnson",
    team: "Dashboard Back End",
    stage: "Implementation",
    resolvedDate: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    response: "Our password policy requires a minimum of 12 characters, including uppercase and lowercase letters, numbers, and special characters. We also implement a password strength meter to encourage even stronger passwords.",
    decision: "Implemented in User Authentication Module",
    documentationLink: "/security/policies/password-policy",
    policyOwner: {
      team: "Identity Management Team",
      teamEmail: "identity@company.com",
      contact: "Noah Wilson",
      email: "noah.wilson@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team manages identity policies`, `Frequently updates password policies`]
      },
      contactConfidence: {
        level: 'medium',
        reasons: [`Involved in password policy discussions`, `Contributed to password policy documentation`]
      },
      signOffStatus: 'Yes'
    },
    source: "Security review ticket",
    sourceLink: "https://jira.company.com/browse/SEC-001",
    followUpQuestions: [
      "How often will passwords need to be changed?",
      "What password recovery mechanisms are in place?",
      "How are password requirements communicated to users?",
      "What MFA options are available?",
      "How are password policy exceptions handled?"
    ],
  },
  {
    id: 2,
    question: "How often should we conduct security audits?",
    user: "Bob Williams",
    team: "Eng Leadership",
    stage: "Operations",
    resolvedDate: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    response: "We conduct comprehensive security audits on a quarterly basis, with continuous monitoring and smaller checks performed weekly. This schedule balances thorough review with operational efficiency.",
    decision: "Added to Security Operations Calendar",
    documentationLink: "/security/operations/audit-schedule",
    policyOwner: {
      team: "Security Operations Team",
      teamEmail: "secops@company.com",
      contact: "Emma Martinez",
      email: "emma.martinez@company.com",
      teamConfidence: {
        level: 'high',
        reasons: [`Team responsible for security audits`, `Leads audit scheduling`]
      },
      contactConfidence: {
        level: 'high',
        reasons: [`Primary contact for audit-related queries`, `Authored audit schedule`]
      },
      signOffStatus: 'Yes'
    },
    source: "Slack #ask-security channel",
    sourceLink: "https://slack.com/archives/C01234567/p1623456789000300",
    followUpQuestions: [
      "What metrics are tracked during security audits?",
      "Who reviews the audit results?",
      "How are audit findings prioritized?",
      "What is the remediation timeline for audit findings?",
      "How are audit reports distributed?"
    ],
  }
]

export default function EngSecurityReviewQuestionsTable() {

  const [showResolved, setShowResolved] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<OutstandingQuestion | ResolvedQuestion | null>(null)
  const [response, setResponse] = useState('')
  const [confirmedAssociations, setConfirmedAssociations] = useState<ConfirmedAssociations>({})

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
      case 'Slack #ask-security channel':
        return <MessageSquare className="h-4 w-4 mr-2" />
      case 'Email to security-review alias':
        return <Mail className="h-4 w-4 mr-2" />
      case 'Security review ticket':
        return <Ticket className="h-4 w-4 mr-2" />
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

  return (
    <>
      <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm" >
        <div className="flex w-full items-center gap-2" >
          <span className="grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font" >
            Questions
          </span>
          < div className="flex grow shrink-0 basis-0 items-center justify-end gap-2" >
            <Button
              className="h-auto w-auto flex-none self-stretch"
              variant={!showResolved ? 'brand-secondary' : 'neutral-secondary'}
              icon={!showResolved ? "FeatherCheck" : undefined}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => { setShowResolved(false) }}
            >
              Oustanding
            </Button>
            < Button
              className="h-auto w-auto flex-none self-stretch"
              variant={showResolved ? 'brand-secondary' : 'neutral-secondary'}
              icon={showResolved ? "FeatherCheck" : undefined}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => { setShowResolved(true) }}
            >
              Resolved
            </Button>
          </div>
        </div>
        < div className="flex w-full flex-col items-start gap-6 overflow-hidden overflow-auto" >
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>Question</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>SLA Status</Table.HeaderCell>
                <Table.HeaderCell>
                  {showResolved ? "Resolved Date" : "Due Date"}
                </Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            {questions.map((question) => (
              <Table.Row
                key={question.id}
                className="cursor-pointer hover:bg-muted"
                onClick={() => setSelectedQuestion(question)}
              >
                <Table.Cell>
                  <span className="text-body-bold font-body-bold text-gray-600">
                    {question.question}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-gray-600">
                    {question.user}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-gray-600">
                    {question.stage}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-gray-600">
                    {question.team || "N/A"}
                  </span>
                </Table.Cell>
                <Table.Cell>
                {(() => {
                    if ('dueDate' in question) {
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
                    } else if ('resolvedDate' in question) {
                      // Logic for resolved questions
                      return (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">
                            Met SLA
                          </span>
                        </div>
                      )
                    }
                    return null;
                })()}
                </Table.Cell>
                <Table.Cell>
                  <span className="text-body font-body text-gray-600">
                    {"resolvedDate" in question
                      ? question.resolvedDate
                      : question.dueDate}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </div>
      </div>
      {selectedQuestion && (
        <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
          <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
              <DialogTitle>{selectedQuestion.question}</DialogTitle>
              <DialogDescription>Review and respond to this security question</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Submitted by:</Label>
                <span className="col-span-3">{selectedQuestion.user}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Type:</Label>
                <span className="col-span-3">{selectedQuestion.stage}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">{showResolved ? 'Resolved on:' : 'Due by:'}</Label>
                <span className="col-span-3">
                  {showResolved ?
                    ('resolvedDate' in selectedQuestion ? selectedQuestion.resolvedDate : '') :
                    ('dueDate' in selectedQuestion ? selectedQuestion.dueDate : '')}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-semibold">Source:</Label>
                <div className="col-span-3 flex items-center">
                  {getSourceIcon(selectedQuestion.source)}
                  <a href={selectedQuestion.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                    {selectedQuestion.source}
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-4 items-start gap-4 mt-4">
                <Label className="text-right">
                  <span className="font-semibold">Follow-up Questions:</span>
                  <span className="block text-sm text-gray-500">Recommended questions to gather more context</span>
                </Label>
                <div className="col-span-3">
                  <ul className="list-disc list-inside space-y-2">
                    {selectedQuestion.followUpQuestions.map((question, index) => (
                      <li key={index} className="text-gray-700">{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {!showResolved && (
                <>
                  <div className="border-t pt-4 mt-4">
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right font-semibold">Suggested Response:</Label>
                    <div className="col-span-3 space-y-2">
                      {'suggestedResponse' in selectedQuestion && (
                        <>
                          <p>{selectedQuestion.suggestedResponse}</p>
                          <div className="flex space-x-2">
                            <Button variant="brand-secondary" onClick={handleUseResponse}>Use This Response</Button>
                            <Button variant="neutral-primary" onClick={handleModifyResponse}>Modify Response</Button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4 mt-4">
                    <Label className="text-right">
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
                  <div className="grid grid-cols-4 items-start gap-4 mt-4">
                    <Label className="text-right">
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
                              variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === true ? "brand-primary" : "neutral-primary"}
                              onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, true)}
                              icon="FeatherCheck"
                            >
                            </Button>
                            <Button
                              size="small"
                              variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === false ? "brand-primary" : "neutral-primary"}
                              onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, false)}
                              icon="FeatherX"
                            >
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                    <div className="grid grid-cols-4 items-center gap-4 mt-4">
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
                                    variant="neutral-primary"
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
                  <Label htmlFor="response">Your Response:</Label>
                  <Textarea
                    id="response"
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter your response here..."
                  />
                </div>
              )}
            </div>
            <DialogFooter className="sticky bottom-0 bg-white z-10 pt-4 border-t">
              {!showResolved && <Button type="submit">Approve Response</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}