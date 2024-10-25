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
      impact: "Critical"
    },
    {
      title: "Delayed De-Provisioning of Access",
      finding: "Average of 7 days to revoke access for terminated employees. It appears this is largely due to a delay between the HR team's submission of termination requests and the IAM team's revocation of access.",
      response: "Check with the IT team to see what their ticketing and de-provisioning process is and if there is any way to automate it.",
      impact: "High"
    },
    {
      title: "High Number of Inactive Accounts",
      finding: "18% of user accounts have not been accessed in over 90 days.",
      response: "Conduct an audit to identify and disable inactive accounts; establish an automated review process.",
      impact: "Medium"
    },
    {
      title: "Privileged Accounts Without Regular Review",
      finding: "12% of privileged accounts not reviewed in the past 6 months.",
      response: "Establish a mandatory quarterly review process for all privileged accounts.",
      impact: "Critical"
    },
    {
      title: "Excessive Privileges Granted",
      finding: "22% of users have access permissions exceeding their job requirements.",
      response: "Implement role-based access controls (RBAC) to align user permissions with job functions.",
      impact: "High"
    },
    {
      title: "Increase in After-Hours Access Attempts",
      finding: "25% increase in unauthorized access attempts during weekends and non-business hours.",
      response: "Implement stricter access controls during off-hours by requiring additional authentication steps.",
      impact: "High"
    }
  ]

  const [activeTab, setActiveTab] = useState("compliance");

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
          {/* <Tabs>
            <Tabs.Item active={true}>Findings (6)</Tabs.Item>
            <Tabs.Item active={false}>Metrics (9)</Tabs.Item>
            <Tabs.Item>Resources (6)</Tabs.Item>
            <Tabs.Item>Compliance (3)</Tabs.Item> */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="compliance">Frameworks</TabsTrigger>
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
                  {analysis.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2"><strong>Finding:</strong> {item.finding}</p>
                        <p className="text-sm mb-2"><strong>Response:</strong> {item.response}</p>
                        <p className={`text-sm font-semibold ${
                          item.impact === 'Critical' ? 'text-red-500' :
                          item.impact === 'High' ? 'text-orange-500' :
                          item.impact === 'Medium' ? 'text-yellow-500' :
                          'text-green-500'
                        }`}>
                          Impact: {item.impact}
                        </p>
                        <Button className="w-full mt-4 px-4 py-2" variant="brand-secondary">
                          Take Action
                        </Button>
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
