'use client';

// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import React, { useState, useMemo } from "react";
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { Button } from "@/subframe/components/Button";
import { useRouter } from "next/navigation";

export default function CriComplianceReport() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const profileControls = {
    govern: [
      {
        id: "GV.RM-01.01",
        name: "Risk Management Program",
        description: "Establish and maintain a comprehensive risk management program that includes policies, procedures, and processes to identify, assess, and manage technology and cybersecurity risks.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Regular review and update of risk management policies and procedures.",
        evidence: "Risk management policy document, risk register, audit reports"
      },
      {
        id: "GV.GV-01.01",
        name: "Governance Framework",
        description: "Establish a governance framework that defines roles, responsibilities, and accountability for managing technology and cybersecurity risks.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Regular review and update of governance framework, clear communication of roles and responsibilities.",
        evidence: "Governance framework document, organizational charts, role descriptions"
      }
    ],
    identify: [
      {
        id: "GV.RM-02.01",
        name: "Risk Assessment",
        description: "Conduct regular risk assessments to identify and evaluate risks associated with the organization's information systems and data.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Quarterly risk assessments conducted by internal audit team.",
        evidence: "Risk assessment reports, action plans, follow-up documentation"
      }
    ],
    protect: [
      {
        id: "PR.AC-01.01",
        name: "Access Control Policy",
        description: "Develop and implement an access control policy that restricts access to information systems and data based on the principle of least privilege.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Regular review of access rights, implementation of multi-factor authentication.",
        evidence: "Access control policy document, access logs, audit trails"
      },
      {
        id: "PR.DS-01.01",
        name: "Data Protection",
        description: "Implement measures to protect data at rest and in transit, ensuring its confidentiality, integrity, and availability.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Encryption of data at rest and in transit, regular backup and recovery tests.",
        evidence: "Encryption certificates, backup logs, recovery test reports"
      },
      {
        id: "PR.IP-01.01",
        name: "Security Awareness and Training",
        description: "Establish a security awareness and training program to ensure personnel are aware of and adhere to security policies and procedures.",
        status: "Partially Compliant",
        progress: "70%",
        risk: "Moderate",
        mitigation: "Developing comprehensive training program with regular updates and assessments.",
        evidence: "Training materials, attendance records, assessment results"
      }
    ],
    detect: [
      {
        id: "DE.CM-01.01",
        name: "Continuous Monitoring",
        description: "Implement continuous monitoring to detect anomalous activities and potential cybersecurity events.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "24/7 security operations center, automated alert system.",
        evidence: "Monitoring logs, incident reports, system configuration documentation"
      }
    ],
    respond: [
      {
        id: "RS.RP-01.01",
        name: "Incident Response Plan",
        description: "Develop and maintain an incident response plan to guide the organization in responding to and recovering from cybersecurity incidents.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Regular updates to the incident response plan, conduct of tabletop exercises.",
        evidence: "Incident response plan document, exercise reports, post-incident reviews"
      }
    ],
    recover: [
      {
        id: "RC.RP-01.01",
        name: "Recovery Planning",
        description: "Establish recovery plans to restore critical systems and data following a disruption or incident.",
        status: "Partially Compliant",
        progress: "80%",
        risk: "Moderate",
        mitigation: "Enhancing recovery plans with detailed procedures for all critical systems and conducting regular testing.",
        evidence: "Recovery plan documents, test schedules, test results"
      }
    ],
    extend: [
      {
        id: "EX.TP-01.01",
        name: "Third-Party Risk Management",
        description: "Implement a third-party risk management program to assess and manage risks associated with third-party service providers.",
        status: "Compliant",
        progress: "100%",
        risk: "Low",
        mitigation: "Regular assessments of third-party vendors, contractual security requirements.",
        evidence: "Vendor assessment reports, contracts with security clauses, ongoing monitoring reports"
      }
    ]
  }

  const outstandingVulnerabilities = [
    {
      type: "SQL Injection",
      id: "VUL-2024-001",
      found: "2024-02-15",
      tool: "Dynamic Application Security Testing (DAST)",
      plan: "Implement input validation and parameterized queries in the primary application. Conduct a thorough code review to identify and fix similar vulnerabilities.",
      progress: "30% complete. Initial patches applied, comprehensive review in progress."
    },
    {
      type: "Unencrypted Customer Data",
      id: "VUL-2024-002",
      found: "2024-02-28",
      tool: "Internal Data Audit",
      plan: "Implement end-to-end encryption for all customer data at rest and in transit. Update data handling policies and procedures.",
      progress: "40% complete. Encryption implementation started, policy updates in draft."
    },
    {
      type: "Critical CVE in Veeam Backup",
      id: "VUL-2024-003",
      found: "2024-03-05",
      tool: "Vulnerability Scanner",
      plan: "Apply the latest security patch to Veeam data backup system. Review and update patch management processes.",
      progress: "70% complete. Patch tested in staging environment, scheduled for production deployment."
    },
    {
      type: "Increased Phishing Susceptibility",
      id: "VUL-2024-004",
      found: "2024-03-10",
      tool: "Phishing Simulation Campaign",
      plan: "Conduct targeted phishing awareness training for the finance team. Implement additional email filtering rules.",
      progress: "20% complete. Training materials prepared, scheduling in progress."
    },
    {
      type: "Excessive AWS S3 Bucket Permissions",
      id: "VUL-2024-005",
      found: "2024-03-12",
      tool: "Cloud Security Posture Management (CSPM)",
      plan: "Review and adjust AWS S3 bucket permissions following the principle of least privilege. Implement regular audits of cloud resource permissions.",
      progress: "50% complete. Initial review completed, permission adjustments in progress."
    }
  ]

  return (
    <DefaultPageLayout>
    <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6">
      <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6">
        <IconWithBackground size="medium" icon="FeatherRocket" />
        <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center">
          Acme Inc
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <Breadcrumbs>
          <Breadcrumbs.Item onClick={() => router.push('/reports')}>
            Reports
          </Breadcrumbs.Item>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active={true}>
            Vulnerability Resolution
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="flex items-center gap-2">
          <Button
            disabled={false}
            variant="brand-primary"
            size="medium"
            icon="FeatherShare"
            loading={false}
            onClick={() => setIsDialogOpen(true)}
            >
            Share Report
          </Button>
          <Button
            disabled={false}
            variant="brand-primary"
            size="medium"
            icon="FeatherDownload"
            loading={false}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Download Report
          </Button>
        </div>
      </div>
    <div className="w-full p-4 bg-background">
      <Card className="w-full">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <CardTitle className="text-2xl font-bold">Regulatory Compliance Report - CRI Profile v2.0</CardTitle>
          </div>
          <div className="flex justify-between items-center">
            <CardDescription>Documented adherence to CRI profiles and supporting evidence</CardDescription>
            <p className="text-sm text-muted-foreground italic">Data last updated: 2024-03-15</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Profile Controls</h2>
            {Object.entries(profileControls).map(([type, controls]) => (
              <div key={type} className="mb-4">
                <h3 className="text-lg font-body capitalize mb-2">{type}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {controls.map((control, index) => (
                    <AccordionItem value={`${type}-${index}`} key={index}>
                      <AccordionTrigger className="flex justify-between">
                        <span className="font-body">{control.id}: {control.name}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          control.status === 'Compliant' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {control.status}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          <p><strong>Description:</strong> {control.description}</p>
                          <p><strong>Compliance Status:</strong> {control.status}</p>
                          <p><strong>Progress:</strong> {control.progress}</p>
                          <p><strong>Risk Assessment:</strong> {control.risk}</p>
                          <p><strong>Mitigation Strategies:</strong> {control.mitigation}</p>
                          <p><strong>Supporting Evidence:</strong> {control.evidence}</p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </section>

          <Separator />

          <section>
            <h2 className="text-xl font-semibold mb-2">Outstanding Vulnerabilities</h2>
            <Accordion type="single" collapsible className="w-full">
              {outstandingVulnerabilities.map((vulnerability, index) => (
                <AccordionItem value={`vuln-${index}`} key={index}>
                  <AccordionTrigger>
                    <span className="font-body">{vulnerability.type} ({vulnerability.id})</span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <p><strong>Found:</strong> {vulnerability.found}</p>
                      <p><strong>Detection Tool:</strong> {vulnerability.tool}</p>
                      <p><strong>Mitigation Plan:</strong> {vulnerability.plan}</p>
                      <p><strong>Progress:</strong> {vulnerability.progress}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </CardContent>
      </Card>
      </div>
    </div>
    </DefaultPageLayout>
  )
}