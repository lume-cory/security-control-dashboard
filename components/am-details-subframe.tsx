"use client";

import React, { useState } from "react";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/subframe/components/IconButton";
import { Badge } from "@/subframe/components/Badge";
import { Button } from "@/subframe/components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DetailViewWithActivityProps {
  onClose: () => void;
}

const AccessManagementDetailsView: React.FC<DetailViewWithActivityProps> = ({ onClose }) => {
  const compliance = [
    {
      function: "Protect (PR)",
      categories: [
        {
          name: "Access Control (PR.AC)",
          controls: [
            {
              id: "PR.AC-1",
              description: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users, and processes.",
              details: "Ensures proper management of user identities and access credentials throughout their lifecycle."
            },
            {
              id: "PR.AC-2",
              description: "Physical access to assets is managed and protected.",
              details: "Controls physical access to systems and facilities."
            },
            {
              id: "PR.AC-3",
              description: "Remote access is managed.",
              details: "Regulates how users access systems remotely, ensuring secure connections."
            },
            {
              id: "PR.AC-4",
              description: "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.",
              details: "Assigns access rights based on necessity, reducing unnecessary permissions."
            },
            {
              id: "PR.AC-5",
              description: "Network integrity is protected, incorporating network segregation where appropriate.",
              details: "Uses network segmentation to limit access to sensitive areas."
            }
          ]
        }
      ]
    },
    {
      function: "Identify (ID)",
      categories: [
        {
          name: "Asset Management (ID.AM)",
          controls: [
            {
              id: "ID.AM-3",
              description: "Organizational communication and data flows are mapped.",
              details: "Understands how data moves through the organization to secure access points."
            }
          ]
        }
      ]
    },
    {
      function: "Detect (DE)",
      categories: [
        {
          name: "Anomalies and Events (DE.AE)",
          controls: [
            {
              id: "DE.AE-1",
              description: "A baseline of network operations and expected data flows for users and systems is established and managed.",
              details: "Establishes normal access patterns to detect anomalies."
            }
          ]
        }
      ]
    },
    {
      function: "Respond (RS)",
      categories: [
        {
          name: "Mitigation (RS.MI)",
          controls: [
            {
              id: "RS.MI-3",
              description: "Newly identified vulnerabilities are mitigated or documented as accepted risks.",
              details: "Addresses access-related vulnerabilities promptly."
            }
          ]
        }
      ]
    }
  ]

  const resources = [
    { category: "Identity and Access Management (IAM) Solutions", tools: ["Okta"], details: "Centralizes identity management and enforces access policies." },
    { category: "Privileged Access Management (PAM) Tools", tools: ["CyberArk"], details: "Secures, manages, and monitors privileged accounts." },
    { category: "Multi-Factor Authentication (MFA) Solutions", tools: ["RSA SecurID"], details: "Adds an extra layer of authentication to verify user identities." },
    { category: "Single Sign-On (SSO) Solutions", tools: ["Okta SSO"], details: "Simplifies user authentication across multiple applications." },
    { category: "Network Access Control (NAC) Solutions", tools: ["Cisco Identity Services Engine (ISE)"], details: "Controls device and user access to the network." },
    { category: "User and Entity Behavior Analytics (UEBA)", tools: ["Exabeam"], details: "Detects anomalous access behaviors that may indicate threats." },
    { category: "Security Information and Event Management (SIEM) Systems", tools: ["Splunk"], details: "Aggregates and analyzes access logs for security events." },
    { category: "Directory Services", tools: ["Microsoft Active Directory"], details: "Manages user credentials and permissions centrally." },
    { category: "Password Management Tools", tools: ["LastPass Enterprise"], details: "Secures and manages user passwords." }
  ]

  const metrics = [
    { category: "Unauthorized Access Attempts", value: "152", description: "Number of unauthorized access attempts in the last 30 days", trend: "down" },
    { category: "MFA Adoption", value: "78%", description: "Percentage of users with Multi-Factor Authentication enabled", trend: "up" },
    { category: "Access Review Completion", value: "92%", description: "Percentage of access reviews completed on time", trend: "up" },
    { category: "Privileged Account Count", value: "43", description: "Number of active privileged accounts", trend: "down" },
    { category: "Password Policy Compliance", value: "96%", description: "Percentage of users compliant with password policy", trend: "up" },
    { category: "Access Provisioning Time", value: "1.8 days", description: "Average time to provision new access", trend: "down" },
    { category: "Failed Login Attempts", value: "287", description: "Number of failed login attempts in the last 7 days", trend: "down" },
    { category: "Inactive Account Detection", value: "24", description: "Number of inactive accounts detected", trend: "down" },
    { category: "Access Violation Incidents", value: "7", description: "Number of access violation incidents in the last 30 days", trend: "down" }
  ]

  const analysis = [
    {
      title: "Low Multi-Factor Authentication Adoption",
      finding: "Only 60% of users in the sales and marketing team have enabled Multi-Factor Authentication (MFA). The company average is 92% for other business units.",
      response: "Mandate MFA enrollment for all users, prioritizing high-risk and privileged accounts.",
      impact: "Critical",
      businessContext: {
        description: "MFA adoption directly impacts our zero trust security strategy and cyber insurance requirements. This is crucial for maintaining our security certifications and customer trust.",
        strategyLink: "/strategy/zero-trust-security.pdf#mfa",
        strategyName: "Zero Trust Security Implementation"
      }
    },
    {
      title: "Delayed De-Provisioning of Access",
      finding: "Average of 7 days to revoke access for terminated employees. It appears this is largely due to a delay between the HR team's submission of termination requests and the IAM team's revocation of access.",
      response: "Check with the IT team to see what their ticketing and de-provisioning process is and if there is any way to automate it.",
      impact: "High",
      businessContext: {
        description: "Efficient de-provisioning is essential for our HR compliance and data protection KPIs. This impacts our ability to maintain SOX compliance and protect intellectual property.",
        strategyLink: "/strategy/access-lifecycle.pdf#offboarding",
        strategyName: "Access Lifecycle Management"
      }
    },
    {
      title: "High Number of Inactive Accounts",
      finding: "18% of user accounts have not been accessed in over 90 days.",
      response: "Conduct an audit to identify and disable inactive accounts; establish an automated review process.",
      impact: "Medium",
      businessContext: {
        description: "Account cleanup affects our license management efficiency and security posture KPIs. This is tied to our cost optimization strategy for SaaS applications.",
        strategyLink: "/strategy/license-optimization.pdf#inactive-accounts",
        strategyName: "SaaS License Optimization Strategy"
      }
    },
    {
      title: "Privileged Accounts Without Regular Review",
      finding: "12% of privileged accounts not reviewed in the past 6 months.",
      response: "Establish a mandatory quarterly review process for all privileged accounts.",
      impact: "Critical",
      businessContext: {
        description: "Privileged access management is crucial for our SOX compliance and audit readiness goals. This directly impacts our regulatory compliance strategy.",
        strategyLink: "/strategy/privileged-access.pdf#review-process",
        strategyName: "Privileged Access Management Framework"
      }
    },
    {
      title: "Excessive Privileges Granted",
      finding: "22% of users have access permissions exceeding their job requirements.",
      response: "Implement role-based access controls (RBAC) to align user permissions with job functions.",
      impact: "High",
      businessContext: {
        description: "Right-sized access is key to our least privilege initiative and compliance requirements. This affects our overall risk management strategy and audit findings.",
        strategyLink: "/strategy/least-privilege.pdf#rbac",
        strategyName: "Least Privilege Access Strategy"
      }
    },
    {
      title: "Increase in After-Hours Access Attempts",
      finding: "25% increase in unauthorized access attempts during weekends and non-business hours.",
      response: "Implement stricter access controls during off-hours by requiring additional authentication steps.",
      impact: "High",
      businessContext: {
        description: "After-hours security directly impacts our fraud prevention KPIs and operational security goals. This is crucial for protecting our 24/7 global operations.",
        strategyLink: "/strategy/global-security.pdf#after-hours",
        strategyName: "Global Operations Security Framework"
      }
    }
  ]

  const securityPolicies = [
    {
      id: "SP-1",
      title: "Access Control Policy",
      description: "Defines the requirements for access control to ensure that only authorized users have access to sensitive information.",
      approvalStatus: "Approved",
      approvalDate: "2023-01-15",
      version: "1.0",
      requirements: [
        {
          id: "AC-1",
          title: "Identity Management",
          description: "Requirements for managing digital identities within the organization",
          subRequirements: [
            { id: "AC-1.1", description: "All user accounts must be uniquely identifiable" },
            { id: "AC-1.2", description: "Regular review of user access rights must be conducted quarterly" },
            { id: "AC-1.3", description: "Immediate revocation of access upon employee termination" }
          ]
        },
        {
          id: "AC-2",
          title: "Authentication Controls",
          description: "Standards for authentication mechanisms",
          subRequirements: [
            { id: "AC-2.1", description: "Multi-factor authentication required for all privileged access" },
            { id: "AC-2.2", description: "Password complexity requirements must be enforced" },
            { id: "AC-2.3", description: "Password rotation every 90 days" }
          ]
        }
      ]
    },
    {
      id: "SP-2",
      title: "Data Protection Policy",
      description: "Outlines the measures for protecting sensitive data from unauthorized access and breaches.",
      approvalStatus: "Approved",
      approvalDate: "2023-02-20",
      version: "1.1",
      requirements: [
        {
          id: "DP-1",
          title: "Data Classification",
          description: "Requirements for data classification and handling",
          subRequirements: [
            { id: "DP-1.1", description: "All data must be classified according to sensitivity level" },
            { id: "DP-1.2", description: "Handling procedures must be defined for each classification level" }
          ]
        },
        {
          id: "DP-2",
          title: "Data Encryption",
          description: "Standards for data encryption",
          subRequirements: [
            { id: "DP-2.1", description: "All sensitive data must be encrypted at rest" },
            { id: "DP-2.2", description: "Encryption key management procedures must be documented" }
          ]
        }
      ]
    },
    {
      id: "SP-3",
      title: "Incident Response Policy",
      description: "Details the procedures for responding to security incidents and breaches.",
      approvalStatus: "Pending",
      approvalDate: "2023-03-10",
      version: "0.9",
      requirements: [
        {
          id: "IR-1",
          title: "Incident Detection",
          description: "Requirements for detecting security incidents",
          subRequirements: [
            { id: "IR-1.1", description: "Automated monitoring systems must be in place" },
            { id: "IR-1.2", description: "Incident detection procedures must be documented" }
          ]
        },
        {
          id: "IR-2",
          title: "Incident Response",
          description: "Procedures for responding to incidents",
          subRequirements: [
            { id: "IR-2.1", description: "Incident response team must be established" },
            { id: "IR-2.2", description: "Response procedures must be tested annually" }
          ]
        }
      ]
    },
    {
      id: "SP-4",
      title: "Remote Access Policy",
      description: "Establishes guidelines for secure remote access to company resources.",
      approvalStatus: "Approved",
      approvalDate: "2023-04-05",
      version: "1.2",
      requirements: [
        {
          id: "RA-1",
          title: "Remote Connection Security",
          description: "Requirements for secure remote connections",
          subRequirements: [
            { id: "RA-1.1", description: "VPN must be used for all remote access" },
            { id: "RA-1.2", description: "Remote sessions must timeout after 30 minutes of inactivity" }
          ]
        },
        {
          id: "RA-2",
          title: "Device Security",
          description: "Requirements for remote devices",
          subRequirements: [
            { id: "RA-2.1", description: "All remote devices must have current antivirus software" },
            { id: "RA-2.2", description: "Remote devices must maintain current security patches" }
          ]
        }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState("compliance");

  const sortByImpactLevel = (items: any[]) => {
    const impactOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
    return [...items].sort((a, b) => {
      const aOrder = impactOrder[a.impact as keyof typeof impactOrder] ?? 4;
      const bOrder = impactOrder[b.impact as keyof typeof impactOrder] ?? 4;
      return aOrder - bOrder;
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-start bg-default-background">
      <div className="flex w-full flex-col items-start gap-8 px-6 py-6">
        <div className="flex w-full flex-wrap items-start gap-4">
          <IconButton
            icon="FeatherX"
            onClick={onClose}
          />
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 pt-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-start gap-2">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  Access Management
                </span>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </div>
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <IconButton
                size="small"
                icon="FeatherMoreHorizontal"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="end"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem icon="FeatherMessageCircle">
                    Message
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon="FeatherCalendar">
                    Schedule Meeting
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon="FeatherPlusCircle">
                    Assign to Project
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon="FeatherUser">
                    View Full Profile
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
        <Button
          className="h-10 w-full flex-none"
          size="large"
          icon="FeatherShare"
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
        >
          Share Report
        </Button>
      </div>
      <div className="flex w-full grow shrink-0 basis-0 flex-col items-start">
        <div className="flex w-full items-end">
          <div className="flex h-px w-6 flex-none flex-col items-center gap-2 bg-neutral-200" />
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="compliance">Frameworks</TabsTrigger>
              <TabsTrigger value="security-policies">Policies</TabsTrigger>
              <TabsTrigger value="resources">Security Resources</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="compliance">
              {compliance.map((func, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{func.function}</h3>
                  {func.categories.map((category, catIndex) => (
                    <div key={catIndex} className="ml-4 mb-2">
                      <h4 className="text-md font-medium mb-1">{category.name}</h4>
                      <ul className="list-disc list-inside ml-4">
                        {category.controls.map((control, controlIndex) => (
                          <li key={controlIndex} className="text-sm mb-2">
                            <strong>{control.id}:</strong> {control.description}
                            <p className="ml-6 text-muted-foreground">{control.details}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </TabsContent>
            <TabsContent value="resources">
              {resources.map((resource, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">{resource.category}</h3>
                  <ul className="list-disc list-inside ml-4">
                    {resource.tools.map((tool, toolIndex) => (
                      <li key={toolIndex} className="text-sm mb-1">
                        {tool}
                        <p className="ml-6 text-muted-foreground">{resource.details}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="metrics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {metrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{metric.category}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                      <p className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {metric.trend === 'up' ? '↑' : '↓'} Trend
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortByImpactLevel(analysis).map((item, index) => (
                  <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                        <Badge variant={
                          item.impact === 'Critical' ? 'error' :
                          item.impact === 'High' ? 'warning' :
                          item.impact === 'Medium' ? 'neutral' :
                          'success'
                        }>
                          {item.impact}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted/50 p-3 rounded-md">
                          <p className="text-sm font-medium">Finding</p>
                          <p className="text-sm text-muted-foreground">{item.finding}</p>
                        </div>
                        
                        <div className="bg-muted/50 p-3 rounded-md">
                          <p className="text-sm font-medium">Response</p>
                          <p className="text-sm text-muted-foreground">{item.response}</p>
                        </div>

                        <div className="bg-muted/50 p-3 rounded-md">
                          <p className="text-sm font-medium">Business Context</p>
                          <p className="text-sm text-muted-foreground">{item.businessContext.description}</p>
                          <div className="mt-2">
                            <a 
                              href={item.businessContext.strategyLink}
                              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="text-primary">📄</span>
                              {item.businessContext.strategyName}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex gap-2">
                        <Button className="w-full" variant="brand-secondary">
                          View Details
                        </Button>
                        <Button className="w-full" variant="brand-primary">
                          Take Action
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="security-policies">
              <div className="grid grid-cols-1 gap-4">
                {securityPolicies.map((policy, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm"><strong>Description:</strong> {policy.description}</p>
                          <p className="text-sm"><strong>Approval Status:</strong> {policy.approvalStatus}</p>
                          <p className="text-sm"><strong>Approval Date:</strong> {policy.approvalDate}</p>
                          <p className="text-sm"><strong>Version:</strong> {policy.version}</p>
                        </div>
                        
                        <div className="space-y-4">
                          {policy.requirements.map((req, reqIndex) => (
                            <div key={reqIndex} className="bg-muted/50 p-4 rounded-lg">
                              <h4 className="font-medium mb-2">{req.id}: {req.title}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{req.description}</p>
                              <ul className="list-disc list-inside space-y-1">
                                {req.subRequirements.map((subReq, subReqIndex) => (
                                  <li key={subReqIndex} className="text-sm text-muted-foreground">
                                    {subReq.id}: {subReq.description}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AccessManagementDetailsView;
