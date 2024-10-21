'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AccessManagementDetailsComponent() {
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
      title: "Increase in After-Hours Access Attempts",
      finding: "25% increase in unauthorized access attempts during weekends and non-business hours.",
      response: "Implement stricter access controls during off-hours by requiring additional authentication steps.",
      impact: "High"
    },
    {
      title: "High Number of Inactive Accounts",
      finding: "18% of user accounts have not been accessed in over 90 days.",
      response: "Conduct an audit to identify and disable inactive accounts; establish an automated review process.",
      impact: "Medium"
    },
    {
      title: "Low Multi-Factor Authentication Adoption",
      finding: "Only 60% of users have enabled Multi-Factor Authentication (MFA).",
      response: "Mandate MFA enrollment for all users, prioritizing high-risk and privileged accounts.",
      impact: "Critical"
    },
    {
      title: "Delayed De-Provisioning of Access",
      finding: "Average of 7 days to revoke access for terminated employees.",
      response: "Integrate HR systems with IAM tools to automate the de-provisioning process.",
      impact: "High"
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
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Access Management Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="nist">NIST CSF Controls</TabsTrigger>
            <TabsTrigger value="resources">Security Resources</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
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
        </Tabs>
      </CardContent>
    </Card>
  )
}