import { Button } from "@/subframe/components/Button"
import { Table } from "@/subframe/components/Table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ExternalLink, Check, X, MessageSquare, Mail, Ticket } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ComplianceRequirement {
  regulation: string;
  articleId: string;
  summary: string;
  policyLink: string;
  policyName: string;
}

interface Vulnerability {
  id: string;
  title: string;
  description: string;
  source: 'GitHub' | 'Snyk' | 'AWS' | 'Google Cloud' | 'Wiz';
  sourceLink: string;
  sourceId: string;
  product: string;
  team: string;
  vulnType: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  priority: 'P0' | 'P1' | 'P2' | 'P3';
  compliance: ComplianceRequirement[];
  dueDate: string;
  createdDate: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Won\'t Fix';
  mitigation?: {
    recommendation: string;
    steps: string[];
    resources: Array<{ name: string; link: string }>;
  };
  assignee?: string;
  lastUpdated: string;
}

const vulnerabilities: Vulnerability[] = [
  {
    id: "GH-2023-001",
    title: "Exposed AWS Access Key in GitHub Repository",
    description: "AWS access key and secret found in plaintext within application configuration file",
    source: "GitHub",
    sourceLink: "https://github.com/company/repo/security/alerts/1",
    sourceId: "GHSA-2023-001",
    product: "Payment Service",
    team: "Payments",
    vulnType: "Secret Exposure",
    severity: "Critical",
    priority: "P0",
    compliance: [
      {
        regulation: "PCI-DSS",
        articleId: "3.4",
        summary: "Render PAN unreadable anywhere it is stored by using: strong cryptography with associated key management processes and procedures.",
        policyLink: "https://internal.company.com/policies/security/pci-dss-compliance#3.4",
        policyName: "Information Security Policy - Date Protection"
      },
      {
        regulation: "SOC2",
        articleId: "CC6.1",
        summary: "Logical access security software, infrastructure, and architectures have been implemented to support secure authentication.",
        policyLink: "https://internal.company.com/policies/security/soc2-compliance#cc6.1",
        policyName: "Information Security Policy - Access Control"
      }
    ],
    dueDate: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "Open",
    mitigation: {
      recommendation: "Immediately rotate the exposed AWS credentials and move them to AWS Secrets Manager",
      steps: [
        "Rotate AWS access key and secret",
        "Remove credentials from repository",
        "Update application to use AWS Secrets Manager",
        "Verify no unauthorized usage of exposed credentials"
      ],
      resources: [
        { name: "AWS Secrets Manager Guide", link: "https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html" },
        { name: "Security Incident Response", link: "https://internal.company.com/security/incident-response" }
      ]
    },
    assignee: "john.doe@company.com",
    lastUpdated: new Date(Date.now() - (12 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "SNYK-2023-002",
    title: "Critical SQL Injection in Database Connector",
    description: "Vulnerable version of database connector allows SQL injection attacks through unvalidated input",
    source: "Snyk",
    sourceLink: "https://app.snyk.io/vuln/SNYK-JS-CONNECTOR-1234",
    sourceId: "SNYK-JS-CONNECTOR-1234",
    product: "User Management System",
    team: "Identity",
    vulnType: "SQL Injection",
    severity: "High",
    priority: "P1",
    compliance: [
      {
        regulation: "SOC2",
        articleId: "CC6.1",
        summary: "Logical access security software, infrastructure, and architectures have been implemented to support secure authentication.",
        policyLink: "https://internal.company.com/policies/security/soc2-compliance#cc6.1",
        policyName: "Information Security Policy - Access Control"
      },
      {
        regulation: "ISO27001",
        articleId: "A.12.1.2",
        summary: "Implement a process for identifying, assessing, and treating information security vulnerabilities.",
        policyLink: "https://internal.company.com/policies/security/iso27001-compliance#a.12.1.2",
        policyName: "Information Security Policy - Vulnerability Management"
      }
    ],
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "In Progress",
    mitigation: {
      recommendation: "Upgrade database connector to latest version and implement prepared statements",
      steps: [
        "Update dependency to version 2.1.0 or higher",
        "Test application functionality",
        "Deploy in staging environment",
        "Schedule production deployment"
      ],
      resources: [
        { name: "Secure SQL Queries Guide", link: "https://internal.company.com/security/sql-security" },
        { name: "Deployment Runbook", link: "https://internal.company.com/devops/deployment" }
      ]
    },
    assignee: "jane.smith@company.com",
    lastUpdated: new Date(Date.now() - (4 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "GH-2023-003",
    title: "Database Credentials Exposed in Application Code",
    description: "Production database credentials found in plaintext within backend service code",
    source: "GitHub",
    sourceLink: "https://github.com/company/repo/security/alerts/3",
    sourceId: "GHSA-2023-003",
    product: "Patient Portal",
    team: "Clinical Systems",
    vulnType: "Secret Exposure",
    severity: "Critical",
    priority: "P0",
    compliance: [
      {
        regulation: "HIPAA",
        articleId: "164.312(a)(1)",
        summary: "Implement technical policies and procedures for electronic information systems that maintain electronic protected health information to allow access only to those persons or software programs that have been granted access rights.",
        policyLink: "https://internal.company.com/policies/security/hipaa-compliance#164.312",
        policyName: "HIPAA Security Rule - Access Control"
      }
    ],
    dueDate: new Date(Date.now() + (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "Open",
    mitigation: {
      recommendation: "Move database credentials to secure secret management system",
      steps: [
        "Remove credentials from codebase",
        "Store credentials in HashiCorp Vault",
        "Update application configuration",
        "Rotate database credentials"
      ],
      resources: [
        { name: "Secrets Management Guide", link: "https://internal.company.com/security/secrets-management" },
        { name: "Database Credential Rotation", link: "https://internal.company.com/security/credential-rotation" }
      ]
    },
    assignee: "sarah.dev@company.com",
    lastUpdated: new Date(Date.now() - (8 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "SNYK-2023-004",
    title: "Hardcoded AWS S3 Access Keys in Dependencies",
    description: "AWS S3 access keys discovered in third-party dependency configuration files",
    source: "Snyk",
    sourceLink: "https://app.snyk.io/vuln/SNYK-JS-S3-5678",
    sourceId: "SNYK-JS-S3-5678",
    product: "Document Management System",
    team: "Infrastructure",
    vulnType: "Secret Exposure",
    severity: "High",
    priority: "P1",
    compliance: [
      {
        regulation: "SOC2",
        articleId: "CC6.1",
        summary: "Protect credentials used to access system components",
        policyLink: "https://internal.company.com/policies/security/soc2-compliance#cc6.1",
        policyName: "Access Control Policy"
      }
    ],
    dueDate: new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (3 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "In Progress",
    mitigation: {
      recommendation: "Replace hardcoded keys with AWS IAM roles and temporary credentials",
      steps: [
        "Identify affected dependencies",
        "Implement AWS IAM roles",
        "Update dependency configurations",
        "Revoke exposed AWS credentials"
      ],
      resources: [
        { name: "AWS IAM Best Practices", link: "https://internal.company.com/security/aws-iam" },
        { name: "Dependency Security Guide", link: "https://internal.company.com/security/dependencies" }
      ]
    },
    assignee: "devops.team@company.com",
    lastUpdated: new Date(Date.now() - (16 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "AWS-2023-005",
    title: "Overly Permissive Security Group with S3 Access",
    description: "Unused security group detected with broad access to production data in S3 buckets",
    source: "AWS",
    sourceLink: "https://console.aws.amazon.com/securityhub/home?region=us-east-1#/findings",
    sourceId: "AWS-SG-2023-005",
    product: "Data Lake",
    team: "Data Platform",
    vulnType: "Access Control",
    severity: "High",
    priority: "P1",
    compliance: [
      {
        regulation: "GDPR",
        articleId: "32",
        summary: "Implement appropriate technical measures to ensure appropriate security of personal data",
        policyLink: "https://internal.company.com/policies/security/gdpr-compliance#32",
        policyName: "Data Protection Policy"
      }
    ],
    dueDate: new Date(Date.now() + (10 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "Open",
    mitigation: {
      recommendation: "Remove unused security group and implement least-privilege access",
      steps: [
        "Audit security group usage",
        "Document required access patterns",
        "Create new restricted security groups",
        "Remove unused security group"
      ],
      resources: [
        { name: "AWS Security Groups Guide", link: "https://internal.company.com/security/aws-security-groups" },
        { name: "S3 Access Control", link: "https://internal.company.com/security/s3-security" }
      ]
    },
    assignee: "cloud.security@company.com",
    lastUpdated: new Date(Date.now() - (24 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "WIZ-2023-006",
    title: "Missing KMS Encryption for Production Kubernetes Cluster",
    description: "Production Kubernetes cluster running without Google Cloud KMS encryption enabled",
    source: "Wiz",
    sourceLink: "https://app.wiz.io/findings/123",
    sourceId: "WIZ-GKE-2023-006",
    product: "Healthcare API Platform",
    team: "Platform",
    vulnType: "Encryption",
    severity: "Critical",
    priority: "P0",
    compliance: [
      {
        regulation: "HIPAA",
        articleId: "164.312(a)(2)(iv)",
        summary: "Implement a mechanism to encrypt and decrypt electronic protected health information",
        policyLink: "https://internal.company.com/policies/security/hipaa-compliance#encryption",
        policyName: "Data Encryption Policy"
      }
    ],
    dueDate: new Date(Date.now() + (5 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (1 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "In Progress",
    mitigation: {
      recommendation: "Enable Google Cloud KMS encryption for the production Kubernetes cluster",
      steps: [
        "Create KMS key ring and keys",
        "Configure cluster encryption settings",
        "Test application functionality",
        "Schedule maintenance window for encryption implementation"
      ],
      resources: [
        { name: "GCP KMS Setup Guide", link: "https://internal.company.com/security/gcp-kms" },
        { name: "Kubernetes Encryption Guide", link: "https://internal.company.com/security/k8s-encryption" }
      ]
    },
    assignee: "platform.lead@company.com",
    lastUpdated: new Date(Date.now() - (6 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "WIZ-2023-007",
    title: "Missing Audit Logging in PatientLLM Feature",
    description: "Audit logging not implemented for patient data access in new LLM feature",
    source: "Wiz",
    sourceLink: "https://app.wiz.io/findings/456",
    sourceId: "WIZ-AUDIT-2023-007",
    product: "Clinical AI Assistant",
    team: "ML Platform",
    vulnType: "Audit Logging",
    severity: "High",
    priority: "P1",
    compliance: [
      {
        regulation: "HIPAA",
        articleId: "164.312(b)",
        summary: "Implement hardware, software, and/or procedural mechanisms that record and examine activity in information systems that contain or use electronic protected health information",
        policyLink: "https://internal.company.com/policies/security/hipaa-compliance#audit",
        policyName: "Audit Controls Policy"
      }
    ],
    dueDate: new Date(Date.now() + (15 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "Open",
    mitigation: {
      recommendation: "Implement comprehensive audit logging for all patient data access",
      steps: [
        "Design audit logging schema",
        "Implement logging middleware",
        "Configure log retention",
        "Set up monitoring alerts"
      ],
      resources: [
        { name: "Audit Logging Standards", link: "https://internal.company.com/security/audit-logging" },
        { name: "HIPAA Compliance Guide", link: "https://internal.company.com/security/hipaa-guide" }
      ]
    },
    assignee: "ml.security@company.com",
    lastUpdated: new Date(Date.now() - (48 * 60 * 60 * 1000)).toISOString()
  },
  {
    id: "VAR-2023-008",
    title: "Unencrypted PHI in Customer Support Tool",
    description: "Protected Health Information (PHI) stored without encryption in internal support tool database",
    source: "Wiz",
    sourceLink: "https://portal.varonis.com/findings/789",
    sourceId: "VAR-PHI-2023-008",
    product: "Customer Support Portal",
    team: "Support Systems",
    vulnType: "Data Protection",
    severity: "Critical",
    priority: "P0",
    compliance: [
      {
        regulation: "HIPAA",
        articleId: "164.312(a)(2)(iv)",
        summary: "Implement a mechanism to encrypt and decrypt electronic protected health information",
        policyLink: "https://internal.company.com/policies/security/hipaa-compliance#encryption",
        policyName: "PHI Encryption Policy"
      },
      {
        regulation: "HITECH",
        articleId: "13402",
        summary: "Notification in the case of breach of unsecured protected health information",
        policyLink: "https://internal.company.com/policies/security/hitech-compliance#breach",
        policyName: "Breach Notification Policy"
      }
    ],
    dueDate: new Date(Date.now() + (4 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    createdDate: new Date(Date.now() - (2 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
    status: "In Progress",
    mitigation: {
      recommendation: "Implement encryption at rest and in transit for all PHI data",
      steps: [
        "Identify all PHI data storage locations",
        "Implement database encryption",
        "Update data access patterns",
        "Verify encryption coverage",
        "Conduct security review"
      ],
      resources: [
        { name: "PHI Security Guidelines", link: "https://internal.company.com/security/phi-protection" },
        { name: "Database Encryption Guide", link: "https://internal.company.com/security/database-encryption" },
        { name: "Incident Response Plan", link: "https://internal.company.com/security/incident-response" }
      ]
    },
    assignee: "security.architect@company.com",
    lastUpdated: new Date(Date.now() - (12 * 60 * 60 * 1000)).toISOString()
  }
];

export default function VulnerabilitiesTable() {
  const [selectedVuln, setSelectedVuln] = useState<Vulnerability | null>(null);
  
  // Add handler for updating vulnerability fields
  const handleVulnUpdate = (field: keyof Vulnerability, value: any) => {
    if (selectedVuln) {
      setSelectedVuln({ ...selectedVuln, [field]: value });
      // TODO: Add API call to update vulnerability
    }
  };
  
  return (
    <>
      
      <div className="flex w-full flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
       <div className="flex w-full items-center gap-2">
        <span className="line-clamp-1 grow shrink-0 basis-0 text-heading-3 font-heading-3 text-default-font">
          Vulnerabilities
        </span>
       </div>
        <Table>
          <Table.HeaderRow>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Source</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Severity</Table.HeaderCell>
            <Table.HeaderCell>Priority</Table.HeaderCell>
            <Table.HeaderCell>Due Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.HeaderRow>
          {vulnerabilities.map((vuln) => (
            <Table.Row
              key={vuln.id}
              className="cursor-pointer hover:bg-muted"
              onClick={() => setSelectedVuln(vuln)}
            >
              <Table.Cell>{vuln.title}</Table.Cell>
              <Table.Cell>{vuln.source}</Table.Cell>
              <Table.Cell>{vuln.product}</Table.Cell>
              <Table.Cell>{vuln.team}</Table.Cell>
              <Table.Cell>{vuln.vulnType}</Table.Cell>
              <Table.Cell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  vuln.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                  vuln.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                  vuln.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {vuln.severity}
                </span>
              </Table.Cell>
              <Table.Cell>{vuln.priority}</Table.Cell>
              <Table.Cell>{vuln.dueDate}</Table.Cell>
              <Table.Cell>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  vuln.status === 'Open' ? 'bg-red-100 text-red-800' :
                  vuln.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  vuln.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {vuln.status}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </div>

      {/* Dialog for vulnerability details */}
      {selectedVuln && (
        <Dialog open={!!selectedVuln} onOpenChange={() => setSelectedVuln(null)}>
          <DialogContent className="max-w-[800px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">{selectedVuln.title}</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                ID: {selectedVuln.id} | Created: {selectedVuln.createdDate} | Last Updated: {new Date(selectedVuln.lastUpdated).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Source</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {selectedVuln.source}
                    <a href={selectedVuln.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Source ID</Label>
                  <div className="mt-1">{selectedVuln.sourceId}</div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Severity</Label>
                  <Select
                    value={selectedVuln.severity}
                    onValueChange={(value) => handleVulnUpdate('severity', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Priority</Label>
                  <Select
                    value={selectedVuln.priority}
                    onValueChange={(value) => handleVulnUpdate('priority', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="P0">P0</SelectItem>
                      <SelectItem value="P1">P1</SelectItem>
                      <SelectItem value="P2">P2</SelectItem>
                      <SelectItem value="P3">P3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-sm font-medium">Status</Label>
                  <Select
                    value={selectedVuln.status}
                    onValueChange={(value) => handleVulnUpdate('status', value)}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Open">Open</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                      <SelectItem value={"Won&apos;t Fix"}>Won&apos;t Fix</SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
                <div>
                  <Label className="text-sm font-medium">Due Date</Label>
                  <input
                    type="date"
                    value={selectedVuln.dueDate}
                    onChange={(e) => handleVulnUpdate('dueDate', e.target.value)}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium">Assignee</Label>
                  <div className="mt-1">{selectedVuln.assignee || 'Unassigned'}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <Label className="text-sm font-medium">Description</Label>
                <p className="mt-1 text-sm text-gray-700">{selectedVuln.description}</p>
              </div>

              {/* Compliance & Metadata */}
                <div>
                  <Label className="text-sm font-medium">Product & Team</Label>
                  <div className="mt-1">
                    {selectedVuln.product} ({selectedVuln.team})
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Compliance Requirements</Label>
                  <div className="mt-2 space-y-4">
                    {selectedVuln.compliance.map((req) => (
                      <div key={`${req.regulation}-${req.articleId}`} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              {req.regulation} {req.articleId}
                      </span>
                          </div>
                          <a 
                            href="#" 
                            className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                            onClick={(e) => {
                              e.preventDefault()
                              console.log('Policy link clicked:', req.policyName)
                            }}
                          >
                            {req.policyName}
                            <ExternalLink className="h-4 w-4 ml-1" />
                          </a>
                        </div>
                        <p className="mt-2 text-sm text-gray-700">
                          {req.summary}
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Mitigation Details */}
              {selectedVuln.mitigation && (
                <Accordion type="single" collapsible>
                  <AccordionItem value="mitigation">
                    <AccordionTrigger className="font-medium">
                      Mitigation Plan
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        <div>
                          <Label className="text-sm font-medium">Recommendation</Label>
                          <p className="mt-1 text-sm text-gray-700">{selectedVuln.mitigation.recommendation}</p>
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium">Steps to Remediate</Label>
                          <ul className="mt-1 list-disc list-inside space-y-1">
                            {selectedVuln.mitigation.steps.map((step, index) => (
                              <li key={index} className="text-sm text-gray-700">{step}</li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <Label className="text-sm font-medium">Resources</Label>
                          <div className="mt-1 space-y-2">
                            {selectedVuln.mitigation.resources.map((resource, index) => (
                              <a
                                key={index}
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700"
                              >
                                <ExternalLink className="h-4 w-4" />
                                {resource.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}

              {/* Action Buttons */}
              <DialogFooter className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="brand-primary" size="small" icon="FeatherMessageSquare">
                    Add Comment
                  </Button>
                  <Button variant="brand-primary" size="small" icon="FeatherMail">
                    Notify Team
                  </Button>
                  <Button variant="brand-primary" size="small" icon="FeatherTicket">
                    Create Ticket
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="brand-primary" size="small" icon="FeatherCheck">
                    Update Vulnerability
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}