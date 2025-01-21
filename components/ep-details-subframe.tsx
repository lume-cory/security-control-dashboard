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

const EndpointProtectionDetailsView: React.FC<DetailViewWithActivityProps> = ({ onClose }) => {
  const compliance = [
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
      title: "MTTR/MTTD by Region or Country",
      finding: "The Asia-Pacific region has a Mean Time to Detect (MTTD) of 72 hours, which is 50% higher than the global average.",
      response: "Investigate regional disparities by assessing local security team capabilities and resource allocations. Provide additional training or augment staff in underperforming regions to improve detection times. Consider centralizing monitoring efforts or implementing standardized processes across all regions.",
      impact: "High",
      businessContext: {
        description: "Slow detection times directly impact our APAC expansion strategy and customer trust KPIs. Improving MTTD is crucial for maintaining our service level agreements with enterprise clients in the region.",
        strategyLink: "/strategy/apac-expansion-2024.pdf#security-metrics",
        strategyName: "APAC Market Expansion Strategy 2024"
      }
    },
    {
      title: "Incident Frequency by Location",
      finding: "There is a higher incident frequency in the Phillipines, accounting for 35% of total incidents.",
      response: "Assess the local regulatory environment and compliance requirements that may impact security measures. Enhance security protocols in that location, and adapt policies to address specific regional threats.",
      impact: "High",
      businessContext: {
        description: "High incident rates in the Philippines affect our operational efficiency KPI and market penetration goals. This metric is key to our Southeast Asian market growth strategy.",
        strategyLink: "/strategy/sea-market-expansion.pdf#risk-assessment",
        strategyName: "SEA Growth & Risk KPIs"
      }
    },
    {
      title: "Incident Rates by Department",
      finding: "The Finance Department experiences 40% more security incidents compared to other departments.",
      response: "Provide targeted security awareness training to the Finance team, emphasizing phishing and malware threats. Review and adjust access privileges to ensure they align with the principle of least privilege. Standardize operational practices by aligning them with organizational security policies.",
      impact: "High",
      businessContext: {
        description: "Finance department security directly impacts our SOX compliance and financial data integrity KPIs. Reducing incidents is crucial for maintaining investor confidence and regulatory compliance.",
        strategyLink: "/strategy/financial-controls-2024.pdf#security",
        strategyName: "Financial Controls & Compliance Strategy"
      }
    },
    {
      title: "Incidents Over Time and Seasonal Patterns",
      finding: "There is a spike in incidents during holiday seasons, with incidents increasing by 50%.",
      response: "Adjust staffing schedules to ensure adequate coverage during peak times, including holidays. Increase monitoring efforts during these periods. Conduct pre-holiday security briefings to heighten awareness among remaining staff.",
      impact: "Medium",
      businessContext: {
        description: "Holiday season security impacts our Q4 revenue targets and customer satisfaction KPIs. Maintaining security during peak business periods is essential for our retail strategy.",
        strategyLink: "/strategy/retail-success.pdf#seasonal-planning",
        strategyName: "Retail Success Metrics & Planning"
      }
    },
    {
      title: "Incidents by Network Segment",
      finding: "The Demilitarized Zone (DMZ) network segment accounts for 60% of detected threats.",
      response: "Assess and enhance network segmentation to contain threats more effectively. Implement additional access controls and security measures in the DMZ. Regularly review firewall and IDS/IPS configurations to ensure they are up to date and effective.",
      impact: "Critical",
      businessContext: {
        description: "DMZ security directly affects our cloud services availability SLA and customer-facing services. This aligns with our cloud-first infrastructure strategy and reliability targets.",
        strategyLink: "/strategy/cloud-infrastructure.pdf#reliability",
        strategyName: "Cloud Infrastructure Reliability Goals"
      }
    },
    {
      title: "Incidents Linked to Third Parties",
      finding: "15% of security incidents are linked to the Akaunting accounting software tool.",
      response: "Strengthen vendor management practices by incorporating stringent security requirements into contracts and SLAs. Conduct regular security audits of third-party vendors. Limit vendor access to necessary systems and monitor their activities closely.",
      impact: "High",
      businessContext: {
        description: "Third-party risk management is key to our supply chain resilience strategy and vendor management KPIs. This impacts our overall operational risk profile.",
        strategyLink: "/strategy/vendor-management.pdf#risk",
        strategyName: "Vendor Risk Management Framework"
      }
    },
    {
      title: "Increase in Ransomware Attempts",
      finding: "20% increase in ransomware attempts targeting endpoint devices in the last quarter.",
      response: "Implement advanced EDR solutions with AI-powered threat detection and automated response capabilities.",
      impact: "Critical",
      businessContext: {
        description: "Ransomware protection is crucial for our business continuity goals and cyber insurance requirements. This directly impacts our operational resilience strategy.",
        strategyLink: "/strategy/cyber-resilience.pdf#ransomware",
        strategyName: "Cyber Resilience Strategy"
      }
    },
    {
      title: "Outdated Operating Systems",
      finding: "15% of endpoints are running outdated or unsupported operating systems.",
      response: "Accelerate OS upgrade program and implement compensating controls for devices that cannot be immediately upgraded.",
      impact: "High",
      businessContext: {
        description: "OS modernization is part of our digital workplace transformation strategy. This impacts our technology debt reduction KPIs and operational efficiency goals.",
        strategyLink: "/strategy/digital-workplace.pdf#modernization",
        strategyName: "Digital Workplace Transformation"
      }
    },
    {
      title: "Mobile Device Security Gaps",
      finding: "30% of mobile devices have outdated MDM profiles or disabled security features.",
      response: "Enforce stricter MDM policies and conduct user awareness training on mobile device security.",
      impact: "Medium",
      businessContext: {
        description: "Mobile security directly impacts our remote work enablement strategy and BYOD program success metrics. This is crucial for our workforce mobility initiatives.",
        strategyLink: "/strategy/mobile-workforce.pdf#security",
        strategyName: "Mobile Workforce Strategy"
      }
    },
    {
      title: "Unauthorized Software Installations",
      finding: "Increase in unauthorized software installations, particularly on remote work devices.",
      response: "Strengthen application whitelisting policies and implement more robust software installation controls.",
      impact: "High",
      businessContext: {
        description: "Software control is essential for our IT governance and compliance strategy. This affects our security posture KPIs and software license management goals.",
        strategyLink: "/strategy/it-governance.pdf#software-control",
        strategyName: "IT Governance Framework"
      }
    },
    {
      title: "Delayed Patch Application",
      finding: "Critical patches are taking an average of 15 days to be applied across all endpoints.",
      response: "Streamline patch management process and consider automated patch deployment for critical vulnerabilities.",
      impact: "Critical",
      businessContext: {
        description: "Patch management efficiency impacts our vulnerability management KPIs and cyber insurance requirements. This is crucial for maintaining our security certifications.",
        strategyLink: "/strategy/vulnerability-management.pdf#patching",
        strategyName: "Vulnerability Management Program"
      }
    },
    {
      title: "Insufficient Endpoint Visibility",
      finding: "20% of endpoints have intermittent or no reporting to central management consoles.",
      response: "Improve endpoint visibility through network access control and regular connectivity checks.",
      impact: "High",
      businessContext: {
        description: "Endpoint visibility is key to our Zero Trust security strategy and asset management KPIs. This impacts our overall security monitoring capabilities.",
        strategyLink: "/strategy/zero-trust.pdf#endpoint-visibility",
        strategyName: "Zero Trust Security Framework"
      }
    },
    {
      title: "Low Patch Compliance in Specific Departments",
      finding: "The Sales Department has a patch compliance rate of 65%, significantly lower than the organizational average of 90%.",
      response: "Schedule dedicated patch deployment sessions for the Sales Department, possibly during non-peak hours, and implement automated patch management tools to ensure timely updates on their devices.",
      impact: "High",
      businessContext: {
        description: "Sales department security affects our customer data protection goals and sales enablement strategy. This impacts our ability to maintain industry certifications needed for enterprise sales.",
        strategyLink: "/strategy/sales-enablement.pdf#security",
        strategyName: "Sales Enablement Security Requirements"
      }
    },
    {
      title: "High Malware Rate on Unmanaged Devices",
      finding: "Unmanaged devices (e.g., contractor laptops) account for 50% of malware infections despite representing only 10% of total endpoints.",
      response: "Enforce a policy requiring all devices to meet security standards before network access, including the installation of approved endpoint protection software; implement Network Access Control (NAC) to restrict network access for non-compliant devices.",
      impact: "Critical",
      businessContext: {
        description: "Contractor device security is crucial for our external workforce management strategy. This impacts our third-party risk management KPIs and compliance requirements.",
        strategyLink: "/strategy/contractor-management.pdf#security",
        strategyName: "Contractor Security Standards"
      }
    },
    {
      title: "Increase in Unauthorized Software Installs",
      finding: "There is a 30% increase in unauthorized software installations over the last quarter.",
      response: "Deploy application whitelisting tools to prevent the execution of unapproved software and enhance user training on software policies; conduct regular audits and enforce disciplinary measures for violations.",
      impact: "High",
      businessContext: {
        description: "Software control is essential for our IT governance and compliance strategy. This affects our security posture KPIs and software license management goals.",
        strategyLink: "/strategy/it-governance.pdf#software-control",
        strategyName: "IT Governance Framework"
      }
    },
    {
      title: "Outdated Endpoint Protection Software",
      finding: "15% of endpoints are running outdated versions of the protection software.",
      response: "Prioritize the implementaiton of Island to these endpoints that are running outdated software.",
      impact: "Medium",
      businessContext: {
        description: "We've made the decision to leverage Island Enterprise Browser on all endpoints as a primary alternative to endpoint AV protection software.",
        strategyLink: "/strategy/vulnerability-management.pdf#endpoint-protection",
        strategyName: "Vulnerability Management Program"
      }
    },
    {
      title: "High Rate of Protection Alerts Ignored",
      finding: "40% of critical alerts from endpoint protection systems are not investigated within the required SLA.",
      response: "Revise incident response procedures to prioritize critical alerts, increase staffing or reallocate resources to ensure timely investigations, and implement automated alert triage to filter and escalate important alerts.",
      impact: "Critical",
      businessContext: {
        description: "Alert response time is a key metric in our incident management strategy and SOC 2 compliance. This directly affects our mean time to respond (MTTR) KPIs.",
        strategyLink: "/strategy/incident-management.pdf#sla",
        strategyName: "Incident Management SLAs"
      }
    },
    {
      title: "Users Disabling Endpoint Protection",
      finding: "There are 50 instances of users disabling endpoint protection software in the past month.",
      response: "Restrict user permissions to prevent tampering with security software, communicate strict policies against disabling protections, and initiate disciplinary actions for non-compliance.",
      impact: "High",
      businessContext: {
        description: "User compliance with security controls is essential for our security awareness program KPIs and cyber insurance requirements. This impacts our security culture initiatives.",
        strategyLink: "/strategy/security-culture.pdf#compliance",
        strategyName: "Security Culture & Awareness Program"
      }
    },
    {
      title: "Ineffective Endpoint Backup Procedures",
      finding: "25% of endpoints have not completed successful backups in the past month.",
      response: "Deploy centralized backup solutions to ensure regular and successful backups, monitor backup logs, and address failures promptly to prevent data loss.",
      impact: "High",
      businessContext: {
        description: "Endpoint backup completion rates affect our data protection strategy and business continuity KPIs. This is crucial for maintaining our recovery point objectives (RPO).",
        strategyLink: "/strategy/data-protection.pdf#backup",
        strategyName: "Data Protection & Recovery Strategy"
      }
    }
  ]

  const securityPolicies = [
    {
      id: "EPP-1",
      title: "Endpoint Data Protection Policy",
      description: "Comprehensive policy for protecting data on endpoint devices through encryption and security controls.",
      approvalStatus: "Approved",
      approvalDate: "2024-02-15",
      version: "2.0",
      requirements: [
        {
          id: "EPP-1.1",
          title: "Endpoint Data Security",
          description: "Requirements for protecting data stored on endpoints",
          subRequirements: [
            { id: "EPP-1.1.1", description: "Full disk encryption must be enabled on all endpoint devices" },
            { id: "EPP-1.1.2", description: "Regular backup of endpoint data to approved storage locations" },
            { id: "EPP-1.1.3", description: "Implementation of data loss prevention controls" }
          ]
        },
        {
          id: "EPP-1.2",
          title: "Data Leak Prevention",
          description: "Controls to prevent unauthorized data exfiltration from endpoints",
          subRequirements: [
            { id: "EPP-1.2.1", description: "USB device control and monitoring must be implemented" },
            { id: "EPP-1.2.2", description: "File transfer monitoring and restrictions" },
            { id: "EPP-1.2.3", description: "Cloud storage access controls and monitoring" }
          ]
        }
      ]
    },
    {
      id: "EPP-2",
      title: "Endpoint Configuration Management Policy",
      description: "Standards for maintaining secure configurations on endpoint devices.",
      approvalStatus: "Approved",
      approvalDate: "2024-01-30",
      version: "1.4",
      requirements: [
        {
          id: "EPP-2.1",
          title: "Baseline Configurations",
          description: "Requirements for endpoint baseline security configurations",
          subRequirements: [
            { id: "EPP-2.1.1", description: "Standard secure configuration templates must be maintained" },
            { id: "EPP-2.1.2", description: "Regular validation of endpoint configurations" },
            { id: "EPP-2.1.3", description: "Automated configuration compliance monitoring" }
          ]
        },
        {
          id: "EPP-2.2",
          title: "Change Management",
          description: "Procedures for managing configuration changes",
          subRequirements: [
            { id: "EPP-2.2.1", description: "All configuration changes must follow change management process" },
            { id: "EPP-2.2.2", description: "Documentation of approved configuration changes" },
            { id: "EPP-2.2.3", description: "Regular review of configuration change effectiveness" }
          ]
        }
      ]
    },
    {
      id: "EPP-3",
      title: "Malicious Code Protection Policy",
      description: "Requirements for detecting and preventing malicious code on endpoints.",
      approvalStatus: "Approved",
      approvalDate: "2024-02-01",
      version: "2.1",
      requirements: [
        {
          id: "EPP-3.1",
          title: "Malware Detection",
          description: "Requirements for malware detection capabilities",
          subRequirements: [
            { id: "EPP-3.1.1", description: "Approved antivirus software must be installed and active" },
            { id: "EPP-3.1.2", description: "Real-time scanning of files and downloads" },
            { id: "EPP-3.1.3", description: "Regular updates to malware signatures" }
          ]
        },
        {
          id: "EPP-3.2",
          title: "Mobile Code Security",
          description: "Controls for managing mobile code execution",
          subRequirements: [
            { id: "EPP-3.2.1", description: "Implementation of application whitelisting" },
            { id: "EPP-3.2.2", description: "Mobile code execution restrictions" },
            { id: "EPP-3.2.3", description: "Regular monitoring of unauthorized code execution attempts" }
          ]
        }
      ]
    },
    {
      id: "EPP-4",
      title: "Endpoint Monitoring and Response Policy",
      description: "Guidelines for continuous monitoring and incident response on endpoints.",
      approvalStatus: "Approved",
      approvalDate: "2024-01-25",
      version: "1.2",
      requirements: [
        {
          id: "EPP-4.1",
          title: "Continuous Monitoring",
          description: "Requirements for endpoint monitoring",
          subRequirements: [
            { id: "EPP-4.1.1", description: "Implementation of endpoint detection and response (EDR) solutions" },
            { id: "EPP-4.1.2", description: "Regular review of endpoint security logs" },
            { id: "EPP-4.1.3", description: "Automated alerting for suspicious activities" }
          ]
        },
        {
          id: "EPP-4.2",
          title: "Incident Response",
          description: "Procedures for responding to endpoint security incidents",
          subRequirements: [
            { id: "EPP-4.2.1", description: "Defined incident response procedures for endpoint threats" },
            { id: "EPP-4.2.2", description: "Regular testing of incident response procedures" },
            { id: "EPP-4.2.3", description: "Documentation of incident handling and lessons learned" }
          ]
        }
      ]
    }
  ];

  const sortByImpactLevel = (items: any[]) => {
    const impactOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
    return [...items].sort((a, b) => {
      const aOrder = impactOrder[a.impact as keyof typeof impactOrder] ?? 4;
      const bOrder = impactOrder[b.impact as keyof typeof impactOrder] ?? 4;
      return aOrder - bOrder;
    });
  };

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
                  Endpoint Protection
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
            <TabsContent value="policies">
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

export default EndpointProtectionDetailsView;
