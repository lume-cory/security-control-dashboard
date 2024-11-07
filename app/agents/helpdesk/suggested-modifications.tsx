'use client'

import { useState } from 'react'
import { Button } from "@/subframe/components/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, XCircle, Edit, ExternalLink } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function SuggestedModifications({ onBack }: { onBack: () => void }) {

  const [dialogOpen, setDialogOpen] = useState<{ [key: string]: boolean }>({})

  const [lackOfDocumentation, setLackOfDocumentation] = useState([
    {
      id: 1,
      question: "How do I request access to production systems for an emergency fix?",
      suggestedUpdate: "Create an Emergency Access Procedure document covering: approval process, temporary access duration, audit logging requirements, and post-incident documentation requirements.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      question: "What's the process for reporting a potential insider threat?",
      suggestedUpdate: "Develop an Insider Threat Reporting Guide that outlines: confidential reporting channels, required information, investigation process, and protection for whistleblowers.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 3,
      question: "How do we handle security for BYOD devices?",
      suggestedUpdate: "Create a BYOD Security Policy covering: required security controls, approved apps/services, data handling requirements, and remote wipe procedures.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 4,
      question: "What's the process for conducting security reviews of new vendors?",
      suggestedUpdate: "Develop a Vendor Security Assessment Guide including: assessment questionnaire, required security controls, compliance requirements, and approval workflow.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 5,
      question: "How do we handle security incidents during non-business hours?",
      suggestedUpdate: "Create an After-Hours Security Incident Response document covering: on-call procedures, escalation paths, emergency contacts, and severity classification guidelines.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 6,
      question: "What are the requirements for storing customer PII data?",
      suggestedUpdate: "Develop a PII Handling Guide covering: approved storage locations, encryption requirements, access controls, retention periods, and deletion procedures.",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const [conflictingRequirements, setConflictingRequirements] = useState([
    {
      id: 1,
      requirement: "Password complexity",
      baselineControl: {
        name: "User Authentication Policy",
        content: "Passwords must be at least 8 characters long."
      },
      otherControlGroups: [
        {
          name: "High Risk Users",
          content: "Passwords must be at least 12 characters long."
        }
      ],
      status: 'pending',
      suggestedModification: "Update all password requirements to enforce a minimum of 12 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.",
      modifiedContent: ''
    },
    {
      id: 2,
      requirement: "Multi-Factor Authentication Reset",
      baselineControl: {
        name: "User Authentication Policy",
        content: "Help desk can reset MFA after verifying employee ID and manager approval."
      },
      otherControlGroups: [
        {
          name: "Finance Team",
          content: "MFA reset requires in-person verification with photo ID."
        }
      ],
      status: 'pending',
      suggestedModification: "Update procedures to require video call verification for remote employees, in-person verification for office employees, and manager approval in all cases. Emergency procedures should require CISO team approval.",
      modifiedContent: ''
    },
    {
      id: 3,
      requirement: "Software Installation Rights",
      baselineControl: {
        name: "Endpoint Security Policy",
        content: "Users must not have local admin rights on company devices."
      },
      otherControlGroups: [
        {
          name: "Development Team",
          content: "Development team members require local admin access for tools and testing."
        }
      ],
      status: 'pending',
      suggestedModification: "Implement privileged access management system for temporary elevated rights. Standard users have no admin rights, developers can request time-limited admin access with automatic revocation.",
      modifiedContent: ''
    },
    {
      id: 4,
      requirement: "Remote Access VPN",
      baselineControl: {
        name: "Remote Work Policy",
        content: "VPN must be active whenever accessing company resources."
      },
      otherControlGroups: [
        {
          name: "Cloud Services Team",
          content: "Cloud applications should be accessed directly through SSO without VPN."
        }
      ],
      status: 'pending',
      suggestedModification: "Update policies to clarify: VPN required for accessing internal network resources, SSO-enabled cloud apps can be accessed directly. Add network segmentation requirements and conditional access policies based on risk level.",
      modifiedContent: ''
    },
    {
      id: 5,
      requirement: "Guest Network Access",
      baselineControl: {
        name: "Visitor NetworkAccess Policy",
        content: "Guests must register with reception for wifi access."
      },
      otherControlGroups: [
        {
          name: "Undefined",
          content: "Guest wifi password changes monthly and is posted in meeting rooms."
        }
      ],
      status: 'pending',
      suggestedModification: "Implement unified guest access system: Visitors register through reception portal, receive time-limited access codes via SMS, and must agree to acceptable use policy. Remove all posted wifi passwords.",
      modifiedContent: ''
    },
    {
      id: 6,
      requirement: "Mobile Device Enrollment",
      baselineControl: {
        name: "Mobile Endpoint Security Policy",
        content: "Personal devices must be enrolled in MDM to access email."
      },
      otherControlGroups: [
        {
          name: "Contractor Group",
          content: "Mobile email access available through web portal without enrollment."
        }
      ],
      status: 'pending',
      suggestedModification: "Update all documentation to reflect: MDM enrollment required for native email apps, web-only access permitted without enrollment but with enhanced MFA requirements. Add risk warnings for web-only access.",
      modifiedContent: ''
    }
  ])

  const [outdatedDocs, setOutdatedDocs] = useState([
    {
      id: 1,
      name: "Password Reset Procedures",
      lastUpdated: "2021-05-15",
      replacementDoc: "Self-Service Identity Management Guide",
      suggestedHeaderText: "NOTICE: This document is outdated...",
      note: "",
      status: 'pending',
      modifiedContent: '',
      url: '#'
    },
    {
      id: 2,
      name: "Remote Access Troubleshooting Guide",
      lastUpdated: "2020-11-30",
      replacementDoc: "Hybrid Workforce Access Guide 2024",
      suggestedHeaderText: "WARNING: This guide predates our current remote access infrastructure. For current VPN, SSO, and conditional access troubleshooting, consult the 'Hybrid Workforce Access Guide 2024'.",
      note: "",
      status: 'pending',
      modifiedContent: '',
      url: '#'
    },
    {
      id: 3,
      name: "Mobile Device Support Guide v1",
      lastUpdated: "2019-03-20",
      replacementDoc: "Enterprise Mobility Management Handbook",
      suggestedHeaderText: "DEPRECATED: This document doesn't reflect current MDM policies and BYOD procedures. Please refer to the 'Enterprise Mobility Management Handbook' for current mobile device support.",
      note: "",
      status: 'pending',
      modifiedContent: '',
      url: '#'
    },
    {
      id: 4,
      name: "Security Incident Response Procedures",
      lastUpdated: "2022-08-10",
      replacementDoc: "Security Operations Playbook 2024",
      suggestedHeaderText: "OUTDATED: This document doesn't include current incident classification and automated response procedures. Please use the 'Security Operations Playbook 2024' for updated guidance.",
      note: "",
      status: 'pending',
      modifiedContent: '',
      url: '#'
    },
    {
      id: 5,
      name: "Help Desk Security Escalation Guide",
      lastUpdated: "2022-01-15",
      replacementDoc: "Security Incident Triage Framework",
      suggestedHeaderText: "NOTICE: This escalation guide is outdated. For current security incident classification and escalation procedures, please refer to the 'Security Incident Triage Framework'.",
      note: "",
      status: 'pending',
      modifiedContent: '',
      url: '#'
    }
  ])

  const [bestPracticeImprovements, setBestPracticeImprovements] = useState([
    {
      id: 1,
      currentPractice: "Password resets require phone call to help desk",
      suggestedImprovement: "Implement self-service password reset portal with MFA verification, automated identity verification, and audit logging. Help desk should only handle exceptional cases.",
      framework: "NIST Digital Identity Guidelines",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      currentPractice: "Manual ticket creation for security incidents",
      suggestedImprovement: "Deploy automated incident ticket creation from email reports, phishing button alerts, and security tools. Include severity classification, required fields, and automatic routing based on incident type.",
      framework: "ITIL Service Management",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 3,
      currentPractice: "Access requests handled through email",
      suggestedImprovement: "Implement identity governance platform with self-service access requests, automated approvals for standard access, and integration with HR systems for role-based access control.",
      framework: "ISO 27001",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 4,
      currentPractice: "Federated search knowledge base for security FAQs",
      suggestedImprovement: "Develop interactive security knowledge base with guided troubleshooting, video tutorials, and AI-powered search. Include feedback mechanism and automatic updates based on new incidents.",
      framework: "HDI Support Center Certification",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 5,
      currentPractice: "Manual software approval process",
      suggestedImprovement: "Create automated software request portal with pre-approved software catalog, security scanning integration, and automated deployment through endpoint management system.",
      framework: "CIS Controls",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 6,
      currentPractice: "Basic security incident templates",
      suggestedImprovement: "Implement dynamic incident response playbooks with automated data collection, guided resolution steps, and integration with security tools for rapid response.",
      framework: "SANS Incident Handler's Handbook",
      status: 'pending',
      modifiedContent: ''
    }, 
    {
      id: 1,
      currentPractice: "Annual penetration testing",
      suggestedImprovement: "Implement continuous penetration testing using automated tools, supplemented by quarterly manual penetration tests.",
      framework: "NIST Cybersecurity Framework",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const getOutdatedPolicyDocs = () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return outdatedDocs.filter(doc => {
      const lastUpdated = new Date(doc.lastUpdated);
      return lastUpdated < oneYearAgo;
    });
  }

  const handleAction = (id: number, action: string, category: string, groupIndex?: number, value?: string) => {
    switch (category) {
      case 'conflictingRequirements':
        setConflictingRequirements(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action === 'accepted' ? 'accepted' : item.status,
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent,
                  baselineControl: groupIndex === -1 && action === 'modified'
                    ? { ...item.baselineControl, content: value || item.baselineControl.content }
                    : item.baselineControl,
                  otherControlGroups: groupIndex !== undefined && groupIndex >= 0 && action === 'modified'
                    ? item.otherControlGroups.map((group, index) =>
                        index === groupIndex
                          ? { ...group, content: value || group.content }
                          : group
                      )
                    : item.otherControlGroups
                }
              : item
          )
        )
        break;
      case 'lackOfDocumentation':
        setLackOfDocumentation(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action,
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent
                }
              : item
          )
        )
        break;
      case 'outdatedDocs':
        setOutdatedDocs(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action,
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent,
                  note: action === 'modified' ? (value || item.note) : item.note
                }
              : item
          )
        )
        break;
      case 'bestPracticeImprovements':
        setBestPracticeImprovements(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action,
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent
                }
              : item
          )
        )
        break;
    }
  }

  const renderUpdateDialog = (item: any, groupIndex: number, isBaseline: boolean) => {
    const dialogKey = `${item.id}-${isBaseline ? 'baseline' : groupIndex}`

    return (
      <>
        <Button
          size="medium"
          variant="brand-secondary"
          onClick={() => setDialogOpen(prev => ({ ...prev, [dialogKey]: true }))}
          icon="FeatherEdit"
        >
          Update Control
        </Button>
        <Dialog open={dialogOpen[dialogKey]} onOpenChange={(open) => setDialogOpen(prev => ({ ...prev, [dialogKey]: open }))}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update {isBaseline ? 'Baseline' : 'Other'} Control</DialogTitle>
              <DialogDescription>Make changes to the control content.</DialogDescription>
            </DialogHeader>
            <Textarea
              value={isBaseline ? item.baselineControl.content : item.otherControlGroups[groupIndex].content}
              onChange={(e) => handleAction(item.id, 'modified', 'conflictingRequirements', groupIndex, e.target.value)}
            />
            <DialogFooter>
              <Button 
                size="medium"
                variant="brand-primary"
                onClick={() => {
                  handleAction(item.id, 'modified', 'conflictingRequirements', groupIndex)
                  setDialogOpen(prev => ({ ...prev, [dialogKey]: false }))
              }}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  const renderActionButtons = (
    item: any, 
    category: 'lackOfDocumentation' | 'conflictingRequirements' | 'outdatedDocs' | 'bestPracticeImprovements'
  ) => (
    <div className="flex space-x-2 mt-2">
      <Button 
        size="small"
        icon="FeatherCheckCircle"
        variant={item.status === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
        onClick={() => handleAction(item.id, 'accepted', category)}
      >
        Accept
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="small" variant="brand-secondary" icon="FeatherEdit">
            Modify
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Suggestion</DialogTitle>
            <DialogDescription>Make changes to the suggested update.</DialogDescription>
          </DialogHeader>
          <Textarea 
            value={item.modifiedContent || item.suggestedHeaderText || item.suggestedModification || item.suggestedUpdate || item.note} 
            onChange={(e) => handleAction(item.id, 'modified', category, undefined, e.target.value)}
          />
          <DialogFooter>
            <Button onClick={() => handleAction(item.id, 'modified', category)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button 
        size="small" 
        variant={item.status === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
        onClick={() => handleAction(item.id, 'rejected', category)}
        icon="FeatherXCircle"
      >
        Reject
      </Button>
    </div>
  )

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suggested Modifications to Security Documentation</h1>
      </div>
      
      <Tabs defaultValue="lack-of-documentation">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="lack-of-documentation">Lack of Documentation</TabsTrigger>
          <TabsTrigger value="conflicting-requirements">Conflicting Requirements</TabsTrigger>
          <TabsTrigger value="outdated-docs">Outdated Documentation</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practice Improvements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lack-of-documentation">
          <Card>
            <CardHeader>
              <CardTitle>Lack of Documentation</CardTitle>
              <CardDescription>Suggestions for updates to security policies or design review docs to fill gaps.</CardDescription>
            </CardHeader>
            <CardContent>
              {lackOfDocumentation.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="mb-2">{item.suggestedUpdate}</p>
                  {renderActionButtons(item, 'lackOfDocumentation')}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conflicting-requirements">
          <Card>
            <CardHeader>
              <CardTitle>Conflicting Requirements</CardTitle>
              <CardDescription>Resolve conflicts between different documentation and suggest modifications.</CardDescription>
            </CardHeader>
            <CardContent>
              {conflictingRequirements.map((item) => (
                <div key={item.id} className="mb-8 p-4 border rounded">
                  <h3 className="font-semibold mb-4">{item.requirement}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">Baseline Control: {item.baselineControl.name}</h4>
                      {renderUpdateDialog(item, -1, true)}
                    </div>
                    <p>{item.baselineControl.content}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Other Control Groups:</h4>
                    {item.otherControlGroups.map((group, index) => (
                      <div key={index} className="mb-4 ml-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold">{group.name}</h5>
                          <div className="flex space-x-2">
                            <Button
                              size="medium"
                              variant={item.status === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                              onClick={() => handleAction(item.id, 'accepted', 'conflictingRequirements')}
                              icon="FeatherCheckCircle"
                            >
                              Accept Differences
                            </Button>
                            {renderUpdateDialog(item, index, false)}
                          </div>
                        </div>
                        <p>{group.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold mb-2">Suggested Modification:</h4>
                    <p>{item.suggestedModification}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="outdated-docs">
          <Card>
            <CardHeader>
              <CardTitle>Outdated Documentation</CardTitle>
              <CardDescription>Review and update outdated policy documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-4">Outdated Policy Docs</h3>
                <p className="mb-2">Policy documents not updated in the past year:</p>
                <ul className="list-disc pl-5 space-y-2">
                  {getOutdatedPolicyDocs().map(doc => (
                    <li key={doc.id} className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <a href={doc.url} className="text-primary hover:underline">
                        {doc.name} (Last updated: {doc.lastUpdated})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Outdated Doc Updates</h3>
                <p className="mb-2">Suggested modifications to stale or outdated docs:</p>
                {outdatedDocs.map((item) => (
                  <div key={item.id} className="mb-8 p-4 border rounded">
                    <h4 className="font-semibold mb-2">{item.name}</h4>
                    <p className="mb-2">Last Updated: {item.lastUpdated}</p>
                    <p className="mb-2">Replacement: {item.replacementDoc}</p>
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Suggested Header Text:</h5>
                      <p className="mb-2 p-2 bg-yellow-100 border border-yellow-100 rounded">{item.suggestedHeaderText}</p>
                      {renderActionButtons(item, 'outdatedDocs')}
                    </div>
                    <div className="mt-4">
                      <h5 className="font-semibold mb-2">Additional Note:</h5>
                      <Textarea
                        placeholder="Add a note for users of this document..."
                        value={item.note}
                        onChange={(e) => handleAction(item.id, 'modified', 'outdatedDocs', undefined, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="best-practices">
          <Card>
            <CardHeader>
              <CardTitle>Best Practice Improvements</CardTitle>
              <CardDescription>Suggestions for aligning with industry best practices.</CardDescription>
            </CardHeader>
            <CardContent>
              {bestPracticeImprovements.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.currentPractice}</h3>
                  <p className="mb-2">{item.suggestedImprovement}</p>
                  <p className="mb-2 text-sm text-gray-600">Framework: {item.framework}</p>
                  {renderActionButtons(item, 'bestPracticeImprovements')}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
