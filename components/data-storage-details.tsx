'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DataStorageDetailsComponent() {
  const [activeTab, setActiveTab] = useState("nist")

  const nistControls = [
    {
      function: "Protect (PR)",
      categories: [
        {
          name: "Data Security (PR.DS)",
          controls: [
            {
              id: "PR.DS-1",
              description: "Data-at-rest is protected.",
              details: "Implements encryption and access controls for stored data."
            },
            {
              id: "PR.DS-5",
              description: "Protections against data leaks are implemented.",
              details: "Utilizes Data Loss Prevention (DLP) tools to prevent unauthorized data exfiltration."
            },
            {
              id: "PR.DS-6",
              description: "Integrity checking mechanisms are used to verify software, firmware, and information integrity.",
              details: "Ensures the integrity of stored data and systems."
            },
            {
              id: "PR.DS-7",
              description: "The development and testing environment(s) are separate from the production environment.",
              details: "Maintains separation between development, testing, and production data environments."
            }
          ]
        },
        {
          name: "Access Control (PR.AC)",
          controls: [
            {
              id: "PR.AC-3",
              description: "Remote access is managed.",
              details: "Controls and monitors remote access to data storage systems."
            },
            {
              id: "PR.AC-4",
              description: "Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.",
              details: "Implements role-based access control for data storage systems."
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
              id: "ID.AM-1",
              description: "Physical devices and systems within the organization are inventoried.",
              details: "Maintains an inventory of all data storage devices and systems."
            },
            {
              id: "ID.AM-2",
              description: "Software platforms and applications within the organization are inventoried.",
              details: "Keeps track of all software used for data storage and management."
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
              id: "DE.AE-2",
              description: "Detected events are analyzed to understand attack targets and methods.",
              details: "Analyzes events related to data access and storage for potential security threats."
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
              details: "Addresses vulnerabilities in data storage systems promptly."
            }
          ]
        }
      ]
    }
  ]

  const resources = [
    { category: "Data Loss Prevention (DLP) Solutions", tools: ["Symantec DLP"], details: "Prevents unauthorized data transfers and leaks." },
    { category: "Cloud Access Security Brokers (CASB)", tools: ["Microsoft Cloud App Security"], details: "Provides visibility and control over data in cloud storage." },
    { category: "Endpoint Protection Platforms (EPP)", tools: ["CrowdStrike Falcon"], details: "Protects endpoints where data may be stored or accessed." },
    { category: "Security Information and Event Management (SIEM) Systems", tools: ["Splunk"], details: "Monitors and analyzes data access and storage activities." },
    { category: "User and Entity Behavior Analytics (UEBA)", tools: ["Exabeam"], details: "Detects anomalous data access patterns." },
    { category: "Data Classification and Labeling  Tools", tools: ["Microsoft Azure Information Protection"], details: "Classifies and labels data for appropriate handling." },
    { category: "File Activity Monitoring (FAM)", tools: ["Varonis DatAdvantage"], details: "Monitors file access and changes in data storage systems." }
  ]

  const metrics = [
    { category: "Data Encryption", value: "95%", description: "Percentage of sensitive data encrypted at rest", trend: "up" },
    { category: "Access Control Violations", value: "23", description: "Number of unauthorized data access attempts in the last 30 days", trend: "down" },
    { category: "Data Classification", value: "78%", description: "Percentage of data classified and labeled", trend: "up" },
    { category: "DLP Incidents", value: "12", description: "Number of Data Loss Prevention incidents in the last 30 days", trend: "down" },
    { category: "Cloud Storage Compliance", value: "89%", description: "Percentage of cloud storage meeting compliance requirements", trend: "up" },
    { category: "Data Backup Success Rate", value: "99.9%", description: "Percentage of successful data backups in the last 30 days", trend: "up" },
    { category: "Data Recovery Time", value: "4.2 hours", description: "Average time to recover critical data", trend: "down" },
    { category: "Sensitive Data Exposure", value: "3", description: "Number of incidents involving sensitive data exposure", trend: "down" },
    { category: "Storage Capacity Utilization", value: "72%", description: "Percentage of total storage capacity in use", trend: "up" }
  ]

  const analysis = [
    {
      title: "Unencrypted Sensitive Data",
      finding: "5% of sensitive data remains unencrypted in certain storage locations.",
      response: "Implement comprehensive encryption for all sensitive data at rest and in transit.",
      impact: "Critical"
    },
    {
      title: "Excessive Access Permissions",
      finding: "20% of users have unnecessarily broad access to data storage systems.",
      response: "Review and implement least privilege access controls across all data storage systems.",
      impact: "High"
    },
    {
      title: "Incomplete Data Classification",
      finding: "22% of stored data lacks proper classification and labeling.",
      response: "Accelerate data classification efforts and implement automated classification tools.",
      impact: "Medium"
    },
    {
      title: "Cloud Storage Misconfigurations",
      finding: "Several cloud storage buckets found with public access enabled.",
      response: "Conduct a comprehensive review of cloud storage configurations and implement strict access controls.",
      impact: "Critical"
    },
    {
      title: "Inadequate Data Backup Verification",
      finding: "Data backup integrity checks are performed inconsistently.",
      response: "Implement automated, regular integrity checks for all data backups.",
      impact: "High"
    },
    {
      title: "Shadow IT Data Storage",
      finding: "Employees using unauthorized cloud storage services for work data.",
      response: "Enhance DLP and CASB implementations to detect and prevent use of unauthorized storage services.",
      impact: "High"
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Storage Details</CardTitle>
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