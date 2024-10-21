'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DecentralizedProvisioningDetailsComponent() {
  const [activeTab, setActiveTab] = useState("nist")

  const nistControls = [
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
      impact: "High"
    },
    {
      title: "Delayed De-Provisioning",
      finding: "30% of user accounts remain active for >10 days after employee departure.",
      response: "Integrate HR systems with IAM tools to automate de-provisioning process.",
      impact: "Critical"
    },
    {
      title: "High Number of Orphaned Accounts",
      finding: "150 active accounts without associated users identified.",
      response: "Conduct audit to disable orphaned accounts and establish regular reconciliation.",
      impact: "High"
    },
    {
      title: "Provisioning Errors",
      finding: "15% of provisioning requests result in incorrect access levels.",
      response: "Introduce automated workflows with predefined role templates.",
      impact: "Medium"
    },
    {
      title: "Lack of Visibility",
      finding: "Security team lacks comprehensive view of user access rights.",
      response: "Deploy access governance tool for centralized visibility and control.",
      impact: "High"
    },
    {
      title: "Non-Compliance with Policies",
      finding: "40% of provisioning activities bypass formal approval processes.",
      response: "Enforce mandatory policies through centralized IAM system and staff training.",
      impact: "Critical"
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Provisioning Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="nist">NIST CSF Controls</TabsTrigger>
            <TabsTrigger value="resources">Security Resources</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          <div className="mt-2">
            <TabsContent value="nist">
              {nistControls.map((func, index) => (
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}