"use client";

import React from "react";
import { useState } from 'react';
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

const ProvisioningDetailsView: React.FC<DetailViewWithActivityProps> = ({ onClose }) => {
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
              details: "Ensures centralized management of identities and access rights."
            },
            {
              id: "PR.AC-4",
              description: "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.",
              details: "Prevents over-provisioning and enforces consistent access policies."
            },
            {
              id: "PR.AC-5",
              description: "Network integrity is protected, incorporating network segregation where appropriate.",
              details: "Limits unauthorized access through network controls."
            }
          ]
        }
      ]
    },
    {
      function: "Identify (ID)",
      categories: [
        {
          name: "Governance (ID.GV)",
          controls: [
            {
              id: "ID.GV-2",
              description: "Cybersecurity roles and responsibilities are coordinated and aligned with internal roles and external partners.",
              details: "Clarifies roles in provisioning processes to avoid decentralization."
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
              details: "Helps detect anomalies from improper provisioning."
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
              details: "Addresses risks arising from decentralized provisioning practices."
            }
          ]
        }
      ]
    }
  ]

  const resources = [
    { category: "Identity and Access Management (IAM) Solutions", tools: ["Okta"], details: "Centralizes user provisioning and access management." },
    { category: "Privileged Access Management (PAM) Tools", tools: ["CyberArk"], details: "Controls and audits provisioning of privileged accounts." },
    { category: "User Provisioning and Lifecycle Management Tools", tools: ["Oracle Identity Governance"], details: "Automates provisioning and de-provisioning processes." },
    { category: "Workflow Automation Tools", tools: ["ServiceNow"], details: "Standardizes provisioning requests and approvals." },
    { category: "Role-Based Access Control (RBAC) Systems", tools: ["Microsoft Active Directory RBAC", "AWS IAM Roles"], details: "Assigns access based on roles to enforce consistency." },
    { category: "Security Information and Event Management (SIEM) Systems", tools: ["Splunk"], details: "Monitors provisioning activities and detects anomalies." }
  ]

  const metrics = [
    { category: "Provisioning Efficiency", value: "3.2 days", description: "Average time to provision new accounts", trend: "down" },
    { category: "De-provisioning Efficiency", value: "1.5 days", description: "Average time to de-provision accounts", trend: "up" },
    { category: "Provisioning Errors", value: "5.2%", description: "Percentage of provisioning requests with errors", trend: "down" },
    { category: "Role Compliance", value: "82%", description: "Percentage of access rights aligned with roles", trend: "up" },
    { category: "Orphaned Accounts", value: "127", description: "Number of active accounts without associated users", trend: "down" },
    { category: "Policy Compliance", value: "91%", description: "Compliance rate with provisioning policies", trend: "up" },
    { category: "Automation Level", value: "68%", description: "Percentage of provisioning processes automated", trend: "up" },
    { category: "User Satisfaction", value: "4.2/5", description: "User satisfaction score with provisioning process", trend: "up" },
    { category: "Audit Findings", value: "7", description: "Number of audit findings related to provisioning", trend: "down" }
  ]

  const analysis = [
    {
      title: "Inconsistent Access Rights",
      finding: "Users in different departments with the same roles have varying access rights.",
      response: "Implement centralized RBAC system to standardize access rights across departments.",
      impact: "High",
      businessContext: {
        description: "Access standardization is crucial for our operational efficiency and compliance strategy. This impacts our ability to maintain consistent security controls across departments.",
        strategyLink: "/strategy/access-standardization.pdf#rbac",
        strategyName: "Access Control Standardization"
      }
    },
    {
      title: "Delayed De-Provisioning",
      finding: "30% of user accounts remain active for >10 days after employee departure.",
      response: "Integrate HR systems with IAM tools to automate de-provisioning process.",
      impact: "Critical",
      businessContext: {
        description: "Timely de-provisioning is essential for our HR compliance and data security strategy. This directly impacts our ability to protect intellectual property during employee transitions.",
        strategyLink: "/strategy/employee-lifecycle.pdf#offboarding",
        strategyName: "Employee Lifecycle Security"
      }
    },
    {
      title: "High Number of Orphaned Accounts",
      finding: "150 active accounts without associated users identified.",
      response: "Conduct audit to disable orphaned accounts and establish regular reconciliation.",
      impact: "High",
      businessContext: {
        description: "Account hygiene affects our license management efficiency and security posture KPIs. This is tied to our cost optimization and compliance initiatives.",
        strategyLink: "/strategy/account-management.pdf#orphaned",
        strategyName: "Account Management Framework"
      }
    },
    {
      title: "Provisioning Errors",
      finding: "15% of provisioning requests result in incorrect access levels.",
      response: "Introduce automated workflows with predefined role templates.",
      impact: "Medium",
      businessContext: {
        description: "Accurate provisioning is key to our employee productivity and security compliance goals. This impacts our operational efficiency KPIs and user satisfaction metrics.",
        strategyLink: "/strategy/user-provisioning.pdf#automation",
        strategyName: "User Provisioning Automation"
      }
    },
    {
      title: "Lack of Visibility",
      finding: "Security team lacks comprehensive view of user access rights.",
      response: "Deploy access governance tool for centralized visibility and control.",
      impact: "High",
      businessContext: {
        description: "Access visibility is fundamental to our security governance and audit readiness strategy. This affects our ability to demonstrate compliance and manage access risks.",
        strategyLink: "/strategy/access-governance.pdf#visibility",
        strategyName: "Access Governance Program"
      }
    }
  ]

  const securityPolicies = [
    {
      id: "UPP-1",
      title: "Identity and Access Management Policy",
      description: "Core policy governing the management of user identities and access rights across the organization.",
      approvalStatus: "Approved",
      approvalDate: "2024-02-10",
      version: "2.2",
      requirements: [
        {
          id: "UPP-1.1",
          title: "Identity Management",
          description: "Requirements for managing user identities",
          subRequirements: [
            { id: "UPP-1.1.1", description: "Unique identifiers required for all user accounts" },
            { id: "UPP-1.1.2", description: "Regular validation of user identity information" },
            { id: "UPP-1.1.3", description: "Automated identity lifecycle management processes" }
          ]
        },
        {
          id: "UPP-1.2",
          title: "Access Control",
          description: "Standards for managing access rights",
          subRequirements: [
            { id: "UPP-1.2.1", description: "Implementation of role-based access control (RBAC)" },
            { id: "UPP-1.2.2", description: "Regular access rights review and certification" },
            { id: "UPP-1.2.3", description: "Enforcement of least privilege principle" }
          ]
        }
      ]
    },
    {
      id: "UPP-2",
      title: "User Lifecycle Management Policy",
      description: "Guidelines for managing the complete lifecycle of user accounts from creation to termination.",
      approvalStatus: "Approved",
      approvalDate: "2024-01-25",
      version: "1.5",
      requirements: [
        {
          id: "UPP-2.1",
          title: "Account Provisioning",
          description: "Requirements for new account creation",
          subRequirements: [
            { id: "UPP-2.1.1", description: "Standardized process for account requests and approval" },
            { id: "UPP-2.1.2", description: "Integration with HR systems for automated provisioning" },
            { id: "UPP-2.1.3", description: "Documentation of all provisioning actions" }
          ]
        },
        {
          id: "UPP-2.2",
          title: "Account Deprovisioning",
          description: "Requirements for account termination",
          subRequirements: [
            { id: "UPP-2.2.1", description: "Immediate access revocation upon termination" },
            { id: "UPP-2.2.2", description: "Automated deprovisioning workflow" },
            { id: "UPP-2.2.3", description: "Regular audit of deprovisioning effectiveness" }
          ]
        }
      ]
    },
    {
      id: "UPP-3",
      title: "Privileged Account Management Policy",
      description: "Specific requirements for managing accounts with elevated privileges.",
      approvalStatus: "Approved",
      approvalDate: "2024-02-01",
      version: "2.0",
      requirements: [
        {
          id: "UPP-3.1",
          title: "Privileged Access Control",
          description: "Requirements for privileged account management",
          subRequirements: [
            { id: "UPP-3.1.1", description: "Enhanced approval process for privileged access" },
            { id: "UPP-3.1.2", description: "Time-limited privileged access grants" },
            { id: "UPP-3.1.3", description: "Regular review of privileged account usage" }
          ]
        },
        {
          id: "UPP-3.2",
          title: "Privileged Session Management",
          description: "Controls for privileged account sessions",
          subRequirements: [
            { id: "UPP-3.2.1", description: "Session recording for privileged account activities" },
            { id: "UPP-3.2.2", description: "Enhanced monitoring of privileged sessions" },
            { id: "UPP-3.2.3", description: "Automatic session termination after inactivity" }
          ]
        }
      ]
    },
    {
      id: "UPP-4",
      title: "Access Monitoring and Compliance Policy",
      description: "Requirements for monitoring user access patterns and ensuring compliance.",
      approvalStatus: "Approved",
      approvalDate: "2024-01-20",
      version: "1.3",
      requirements: [
        {
          id: "UPP-4.1",
          title: "Access Monitoring",
          description: "Requirements for monitoring user access",
          subRequirements: [
            { id: "UPP-4.1.1", description: "Continuous monitoring of access patterns" },
            { id: "UPP-4.1.2", description: "Automated detection of unusual access attempts" },
            { id: "UPP-4.1.3", description: "Regular access activity reporting" }
          ]
        },
        {
          id: "UPP-4.2",
          title: "Compliance Reporting",
          description: "Requirements for access compliance reporting",
          subRequirements: [
            { id: "UPP-4.2.1", description: "Regular compliance status reporting" },
            { id: "UPP-4.2.2", description: "Automated compliance checking" },
            { id: "UPP-4.2.3", description: "Documentation of compliance exceptions" }
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
                  Provisioning
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
              <TabsTrigger value="policies">Policies</TabsTrigger>
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
                          'brand'
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
            <TabsContent value="policies">
              <div className="grid grid-cols-1 gap-4">
                {securityPolicies.map((policy, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{policy.title}</CardTitle>
                        <span className="text-sm text-muted-foreground">({policy.id})</span>
                      </div>
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

export default ProvisioningDetailsView;
