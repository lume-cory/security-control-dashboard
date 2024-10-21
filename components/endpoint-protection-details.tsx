'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"

export function EndpointProtectionDetailsComponent() {
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
              description: "Data-at-rest is protected",
              details: "Ensures that data stored on endpoints is encrypted and secure."
            },
            {
              id: "PR.DS-5",
              description: "Protections against data leaks are implemented",
              details: "Implements measures to prevent unauthorized data exfiltration from endpoints."
            }
          ]
        },
        {
          name: "Information Protection Processes and Procedures (PR.IP)",
          controls: [
            {
              id: "PR.IP-1",
              description: "A baseline configuration of information technology/industrial control systems is created and maintained incorporating security principles (e.g. concept of least functionality)",
              details: "Establishes and maintains secure configurations for endpoint devices."
            },
            {
              id: "PR.IP-3",
              description: "Configuration change control processes are in place",
              details: "Ensures that changes to endpoint configurations are controlled and documented."
            }
          ]
        }
      ]
    },
    {
      function: "Detect (DE)",
      categories: [
        {
          name: "Security Continuous Monitoring (DE.CM)",
          controls: [
            {
              id: "DE.CM-4",
              description: "Malicious code is detected",
              details: "Implements antivirus and anti-malware solutions on endpoints to detect threats."
            },
            {
              id: "DE.CM-5",
              description: "Unauthorized mobile code is detected",
              details: "Detects and prevents execution of unauthorized code on mobile devices and laptops."
            }
          ]
        }
      ]
    }
  ]

  const resources = [
    { category: "Endpoint Detection and Response (EDR)", tools: ["CrowdStrike Falcon", "Carbon Black"], details: "Provides real-time monitoring and response capabilities for endpoints." },
    { category: "Antivirus/Anti-malware", tools: ["Symantec Endpoint Protection", "McAfee Endpoint Security"], details: "Protects against known malware and viruses." },
    { category: "Mobile Device Management (MDM)", tools: ["Microsoft Intune", "VMware Workspace ONE"], details: "Manages and secures mobile devices accessing corporate resources." },
    { category: "Endpoint Encryption", tools: ["BitLocker", "FileVault"], details: "Encrypts data on endpoint devices to protect against unauthorized access." },
    { category: "Patch Management", tools: ["Microsoft SCCM", "Ivanti Patch for Windows"], details: "Ensures endpoints are up-to-date with the latest security patches." },
    { category: "Network Access Control (NAC)", tools: ["Cisco Identity Services Engine (ISE)", "Forescout CounterACT"], details: "Controls which devices can access the network based on their security posture." }
  ]

  const metrics = [
    { category: "Endpoint Compliance", value: "92%", description: "Percentage of endpoints compliant with security policies", trend: "up" },
    { category: "Malware Incidents", value: "17", description: "Number of malware incidents detected in the last 30 days", trend: "down" },
    { category: "Patch Compliance", value: "88%", description: "Percentage of endpoints with up-to-date patches", trend: "up" },
    { category: "Encryption Adoption", value: "95%", description: "Percentage of endpoints with full-disk encryption enabled", trend: "up" },
    { category: "Unauthorized Software", value: "23", description: "Number of unauthorized software installations detected", trend: "down" },
    { category: "EDR Alert Resolution Time", value: "45 min", description: "Average time to resolve EDR alerts", trend: "down" },
    { category: "Mobile Device Compliance", value: "87%", description: "Percentage of mobile devices compliant with MDM policies", trend: "up" },
    { category: "Endpoint Vulnerabilities", value: "156", description: "Number of high-risk vulnerabilities detected across all endpoints", trend: "down" },
    { category: "Failed Login Attempts", value: "34", description: "Number of failed login attempts on endpoints in the last 7 days", trend: "down" }
  ]

  const analysis = [
    {
      title: "Increase in Ransomware Attempts",
      finding: "20% increase in ransomware attempts targeting endpoint devices in the last quarter.",
      response: "Implement advanced EDR solutions with AI-powered threat detection and automated response capabilities.",
      impact: "Critical"
    },
    {
      title: "Outdated Operating Systems",
      finding: "15% of endpoints are running outdated or unsupported operating systems.",
      response: "Accelerate OS upgrade program and implement compensating controls for devices that cannot be immediately upgraded.",
      impact: "High"
    },
    {
      title: "Mobile Device Security Gaps",
      finding: "30% of mobile devices have outdated MDM profiles or disabled security features.",
      response: "Enforce stricter MDM policies and conduct user awareness training on mobile device security.",
      impact: "Medium"
    },
    {
      title: "Unauthorized Software Installations",
      finding: "Increase in unauthorized software installations, particularly on remote work devices.",
      response: "Strengthen application whitelisting policies and implement more robust software installation controls.",
      impact: "High"
    },
    {
      title: "Delayed Patch Application",
      finding: "Critical patches are taking an average of 15 days to be applied across all endpoints.",
      response: "Streamline patch management process and consider automated patch deployment for critical vulnerabilities.",
      impact: "Critical"
    },
    {
      title: "Insufficient Endpoint Visibility",
      finding: "20% of endpoints have intermittent or no reporting to central management consoles.",
      response: "Improve endpoint visibility through network access control and regular connectivity checks.",
      impact: "High"
    },
    {
      title: "Low Patch Compliance in Specific Departments",
      finding: "The Sales Department has a patch compliance rate of 65%, significantly lower than the organizational average of 90%.",
      response: "Schedule dedicated patch deployment sessions for the Sales Department, possibly during non-peak hours, and implement automated patch management tools to ensure timely updates on their devices.",
      impact: "High"
    },
    {
      title: "High Malware Rate on Unmanaged Devices",
      finding: "Unmanaged devices (e.g., contractor laptops) account for 50% of malware infections despite representing only 10% of total endpoints.",
      response: "Enforce a policy requiring all devices to meet security standards before network access, including the installation of approved endpoint protection software; implement Network Access Control (NAC) to restrict network access for non-compliant devices.",
      impact: "Critical"
    },
    {
      title: "Increase in Unauthorized Software Installs",
      finding: "There is a 30% increase in unauthorized software installations over the last quarter.",
      response: "Deploy application whitelisting tools to prevent the execution of unapproved software and enhance user training on software policies; conduct regular audits and enforce disciplinary measures for violations.",
      impact: "High"
    },
    {
      title: "Outdated Endpoint Protection Software",
      finding: "15% of endpoints are running outdated versions of the protection software.",
      response: "Configure automatic updates for all endpoint protection software and perform an immediate update sweep to bring all endpoints to the latest version; set up compliance reporting to monitor and address future discrepancies.",
      impact: "High"
    },
    {
      title: "High Rate of Protection Alerts Ignored",
      finding: "40% of critical alerts from endpoint protection systems are not investigated within the required SLA.",
      response: "Revise incident response procedures to prioritize critical alerts, increase staffing or reallocate resources to ensure timely investigations, and implement automated alert triage to filter and escalate important alerts.",
      impact: "Critical"
    },
    {
      title: "Users Disabling Endpoint Protection",
      finding: "There are 50 instances of users disabling endpoint protection software in the past month.",
      response: "Restrict user permissions to prevent tampering with security software, communicate strict policies against disabling protections, and initiate disciplinary actions for non-compliance.",
      impact: "High"
    },
    {
      title: "Ineffective Endpoint Backup Procedures",
      finding: "25% of endpoints have not completed successful backups in the past month.",
      response: "Deploy centralized backup solutions to ensure regular and successful backups, monitor backup logs, and address failures promptly to prevent data loss.",
      impact: "High"
    },
    {
      title: "MTTR/MTTD by Region or Country",
      finding: "The Asia-Pacific region has a Mean Time to Detect (MTTD) of 72 hours, which is 50% higher than the global average.",
      response: "Investigate regional disparities by assessing local security team capabilities and resource allocations. Provide additional training or augment staff in underperforming regions to improve detection times. Consider centralizing monitoring efforts or implementing standardized processes across all regions.",
      impact: "High"
    },
    {
      title: "Incident Frequency by Location",
      finding: "There is a higher incident frequency in the Phillipines, accounting for 35% of total incidents.",
      response: "Assess the local regulatory environment and compliance requirements that may impact security measures. Enhance security protocols in that location, and adapt policies to align with regional regulations. Engage with local authorities if necessary to improve compliance.",
      impact: "High"
    },
    {
      title: "Incident Rates by Department",
      finding: "The Finance Department experiences 40% more security incidents compared to other departments.",
      response: "Provide targeted security awareness training to the Finance team, emphasizing phishing and malware threats. Review and adjust access privileges to ensure they align with the principle of least privilege. Standardize operational practices by aligning them with organizational security policies.",
      impact: "High"
    },
    {
      title: "Incidents Over Time and Seasonal Patterns",
      finding: "There is a spike in incidents during holiday seasons, with incidents increasing by 50%.",
      response: "Adjust staffing schedules to ensure adequate coverage during peak times, including holidays. Increase monitoring efforts during these periods. Conduct pre-holiday security briefings to heighten awareness among remaining staff.",
      impact: "Medium"
    },
    {
      title: "Incidents by Network Segment",
      finding: "The Demilitarized Zone (DMZ) network segment accounts for 60% of detected threats.",
      response: "Assess and enhance network segmentation to contain threats more effectively. Implement additional access controls and security measures in the DMZ. Regularly review firewall and IDS/IPS configurations to ensure they are up to date and effective.",
      impact: "Critical"
    },
    {
      title: "Incidents Linked to Third Parties",
      finding: "15% of security incidents are linked to the Akaunting accounting software tool.",
      response: "Strengthen vendor management practices by incorporating stringent security requirements into contracts and SLAs. Conduct regular security audits of third-party vendors. Limit vendor access to necessary systems and monitor their activities closely.",
      impact: "High"
    }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Endpoint Protection Details</CardTitle>
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
                        item.impact === 'Critical' ?   'text-red-500' :
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