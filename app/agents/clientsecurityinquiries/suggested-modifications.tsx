'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, XCircle, Edit } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function SuggestedModifications({ onBack }: { onBack: () => void }) {
  const [lackOfDocumentation, setLackOfDocumentation] = useState([
    {
      id: 1,
      question: "What controls do you have in place for HIPAA compliance?",
      suggestedUpdate: "Create a comprehensive HIPAA Compliance Overview document covering: PHI handling procedures, technical safeguards, encryption standards, access controls, audit logging, and business associate requirements. Include specific sections on data retention, disposal, and breach notification procedures.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      question: "How do you handle incident response in the case of a data breach?",
      suggestedUpdate: "Develop a Customer-Facing Incident Response Guide that outlines: breach notification timelines, communication procedures, incident severity classifications, customer data impact assessment process, and post-incident reporting protocols.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 3,
      question: "Are you using my data to train your algorithms? How do you ensure data safety with cloud AI models?",
      suggestedUpdate: "Create an AI Data Governance Policy covering: data usage restrictions, AI model training controls, data isolation mechanisms, cloud AI security measures, and customer opt-out procedures. Include specific sections on data privacy in machine learning pipelines.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 4,
      question: "What is your uptime? Do you have data from your last recovery test?",
      suggestedUpdate: "Develop a Service Reliability Document including: SLA commitments, historical uptime metrics, disaster recovery test results, RTO/RPO objectives, and failover procedures. Include customer communication protocols during outages.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 5,
      question: "How at risk are you to ransomware? How quickly can you recover?",
      suggestedUpdate: "Create a Ransomware Resilience Overview covering: prevention controls, backup strategies, recovery procedures, isolation capabilities, and customer data protection measures. Include recent tabletop exercise results and recovery time metrics.",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 6,
      question: "Can you provide details about your PCI DSS certification level and controls?",
      suggestedUpdate: "Develop a PCI Compliance Overview document covering: certification level, scope of certification, cardholder data environment details, security controls, and annual assessment procedures. Include roles and responsibilities for maintaining compliance.",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const [conflictingRequirements, setConflictingRequirements] = useState([
    {
      id: 1,
      requirement: "Data Retention for GDPR Compliance",
      doc1: { name: "GDPR Data Handling Policy", content: "Personal data must be deleted after 2 years of inactivity." },
      doc2: { name: "Data Retention Guidelines", content: "Customer data must be retained for 5 years for business continuity." },
      selectedDoc: undefined as string | undefined,
      status: 'pending',
      suggestedModification: "Update policies to implement data minimization: retain only necessary data fields for 5 years, anonymize personal data after 2 years, implement automated data lifecycle management with customer consent tracking.",
      modifiedContent: ''
    },
    {
      id: 2,
      requirement: "AI Model Training Data Usage",
      doc1: { name: "AI Privacy Policy", content: "Customer data may be used for model training with anonymization." },
      doc2: { name: "Data Processing Agreement", content: "Customer data shall not be used for any purpose other than service delivery." },
      selectedDoc: undefined as string | undefined,
      status: 'pending',
      suggestedModification: "Revise policies to require explicit customer opt-in for AI training, implement data isolation for non-consenting customers, and provide transparency reports on data usage in AI systems.",
      modifiedContent: ''
    },
    {
      id: 3,
      requirement: "Incident Response Notification",
      doc1: { name: "Security Incident Playbook", content: "Notify customers within 72 hours of confirmed breach." },
      doc2: { name: "Customer SLA", content: "All security incidents must be reported within 24 hours." },
      selectedDoc: undefined as string | undefined,
      status: 'pending',
      suggestedModification: "Implement tiered notification system: critical incidents within 24 hours, potential breaches within 48 hours, confirmed breaches with full impact assessment within 72 hours. Add automated notification workflows.",
      modifiedContent: ''
    },
    {
      id: 4,
      requirement: "Backup Retention for Ransomware Recovery",
      doc1: { name: "Backup Policy", content: "Maintain 30 days of backups with weekly testing." },
      doc2: { name: "Ransomware Playbook", content: "Keep 90 days of immutable backups for ransomware recovery." },
      selectedDoc: undefined as string | undefined,
      status: 'pending',
      suggestedModification: "Standardize on 90-day retention for immutable backups, implement weekly recovery testing of random samples, maintain separate backup copies in air-gapped storage, and add blockchain verification of backup integrity.",
      modifiedContent: ''
    },
    {
      id: 5,
      requirement: "PHI Data Access Controls",
      doc1: { name: "HIPAA Controls", content: "All PHI access requires multi-factor authentication." },
      doc2: { name: "Access Management Policy", content: "Healthcare data access permitted with SSO authentication." },
      selectedDoc: undefined as string | undefined,
      status: 'pending',
      suggestedModification: "Implement unified access control: require MFA for all PHI access, add contextual authentication for high-risk operations, implement session recording for PHI access, and enhance audit logging.",
      modifiedContent: ''
    },
    {
      id: 6,
      requirement: "PCI Data Processing",
      doc1: { name: "PCI DSS Requirements", content: "All cardholder data must be encrypted at rest and in transit." },
      doc2: { name: "Payment Processing Guide", content: "Tokenization required for all card data storage." },
      selectedDoc: undefined as string | undefined,
      status: 'pending',
      suggestedModification: "Implement both encryption and tokenization: encrypt all data in transit, tokenize for storage, maintain separate encryption keys for different environments, and implement key rotation schedule.",
      modifiedContent: ''
    }
  ])

  const [outdatedDocs, setOutdatedDocs] = useState([
    {
      id: 1,
      name: "Customer Data Protection Overview",
      lastUpdated: "2022-05-15",
      replacementDoc: "Enhanced Data Security Framework 2024",
      suggestedHeaderText: "NOTICE: This document is outdated. Please refer to the 'Enhanced Data Security Framework 2024' for current data protection controls, including AI safeguards and cloud security measures.",
      note: "",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      name: "GDPR Compliance Guide",
      lastUpdated: "2021-11-30",
      replacementDoc: "EU Data Protection Framework 2024",
      suggestedHeaderText: "WARNING: This guide predates recent GDPR updates. For current data protection requirements, international transfers, and privacy controls, consult the 'EU Data Protection Framework 2024'.",
      note: "",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 3,
      name: "Disaster Recovery Procedures",
      lastUpdated: "2022-03-20",
      replacementDoc: "Business Continuity and Recovery Playbook",
      suggestedHeaderText: "DEPRECATED: This document doesn't reflect current recovery capabilities and SLAs. Please refer to the 'Business Continuity and Recovery Playbook' for current procedures and uptime guarantees.",
      note: "",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 4,
      name: "Security Incident Response Plan",
      lastUpdated: "2022-08-10",
      replacementDoc: "Integrated Security Operations Guide 2024",
      suggestedHeaderText: "OUTDATED: This document doesn't include current incident classification, ransomware response, and customer notification procedures. Please use the 'Integrated Security Operations Guide 2024'.",
      note: "",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 5,
      name: "AI Data Processing Guidelines",
      lastUpdated: "2023-01-15",
      replacementDoc: "AI Governance and Privacy Framework",
      suggestedHeaderText: "NOTICE: This guide predates current AI privacy controls. For current AI data handling, model training policies, and customer data protection measures, please refer to the 'AI Governance and Privacy Framework'.",
      note: "",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const [bestPracticeImprovements, setBestPracticeImprovements] = useState([
    {
      id: 1,
      currentPractice: "Annual penetration testing and vulnerability assessments",
      suggestedImprovement: "Implement continuous security testing program with monthly penetration tests, daily automated scanning, and real-time vulnerability management. Include customer-specific scope testing.",
      framework: "NIST Cybersecurity Framework",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 2,
      currentPractice: "Basic incident response with email notifications",
      suggestedImprovement: "Deploy automated incident response platform with real-time customer notifications, impact assessments, and status updates. Include API integration for customer security teams.",
      framework: "ISO 27035",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 3,
      currentPractice: "Standard backup and recovery procedures",
      suggestedImprovement: "Implement zero-trust backup architecture with immutable storage, blockchain verification, and automated recovery testing. Provide customer-specific recovery time reporting.",
      framework: "NIST SP 800-34",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 4,
      currentPractice: "Traditional data encryption methods",
      suggestedImprovement: "Deploy quantum-safe encryption with automated key rotation, hardware security modules, and end-to-end encryption for all customer data. Include customer-managed encryption keys.",
      framework: "PCI DSS 4.0",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 5,
      currentPractice: "Manual compliance documentation and reporting",
      suggestedImprovement: "Create automated compliance dashboard with real-time control monitoring, automated evidence collection, and customer-specific compliance reporting for GDPR, HIPAA, and PCI.",
      framework: "ISO 27001",
      status: 'pending',
      modifiedContent: ''
    },
    {
      id: 6,
      currentPractice: "Basic AI model security controls",
      suggestedImprovement: "Implement comprehensive AI governance with privacy-preserving ML, federated learning capabilities, and automated data protection controls. Include customer data isolation guarantees.",
      framework: "AI Risk Management Framework",
      status: 'pending',
      modifiedContent: ''
    }
  ])

  const handleAction = (
    id: number,
    action: 'accepted' | 'rejected' | 'modified' | 'selected',
    category: 'lackOfDocumentation' | 'conflictingRequirements' | 'outdatedDocs' | 'bestPracticeImprovements',
    modifiedContent = ''
  ) => {
    switch (category) {
      case 'lackOfDocumentation':
        setLackOfDocumentation(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
      case 'conflictingRequirements':
        setConflictingRequirements(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
      case 'outdatedDocs':
        setOutdatedDocs(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
      case 'bestPracticeImprovements':
        setBestPracticeImprovements(prev => prev.map(item => 
          item.id === id ? { ...item, status: action, modifiedContent: modifiedContent || item.modifiedContent } : item
        ))
        break
    }
  }

  const renderActionButtons = (
    item: any, 
    category: 'lackOfDocumentation' | 'conflictingRequirements' | 'outdatedDocs' | 'bestPracticeImprovements'
  ) => (
    <div className="flex space-x-2 mt-2">
      <Button 
        size="sm" 
        variant={item.status === 'accepted' ? 'default' : 'outline'}
        onClick={() => handleAction(item.id, 'accepted', category)}
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Accept
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline">
            <Edit className="mr-2 h-4 w-4" />
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
            onChange={(e) => handleAction(item.id, 'modified', category, e.target.value)}
          />
          <DialogFooter>
            <Button onClick={() => handleAction(item.id, 'modified', category)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button 
        size="sm" 
        variant={item.status === 'rejected' ? 'default' : 'outline'}
        onClick={() => handleAction(item.id, 'rejected', category)}
      >
        <XCircle className="mr-2 h-4 w-4" />
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
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.requirement}</h3>
                  <RadioGroup 
                    onValueChange={(value) => handleAction(item.id, 'selected', 'conflictingRequirements', value)}
                    value={item.selectedDoc}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <RadioGroupItem value={item.doc1.name} id={`${item.id}-doc1`} />
                      <Label htmlFor={`${item.id}-doc1`}>{item.doc1.name}: {item.doc1.content}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={item.doc2.name} id={`${item.id}-doc2`} />
                      <Label htmlFor={`${item.id}-doc2`}>{item.doc2.name}: {item.doc2.content}</Label>
                    </div>
                  </RadioGroup>
                  {item.selectedDoc && (
                    <p className="mt-2 text-sm text-green-600">Selected: {item.selectedDoc}</p>
                  )}
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Suggested Modification:</h4>
                    <p className="mb-2">{item.suggestedModification}</p>
                    {renderActionButtons(item, 'conflictingRequirements')}
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
              <CardDescription>Add header text to outdated documents and notes pointing to the correct documentation.</CardDescription>
            </CardHeader>
            <CardContent>
              {outdatedDocs.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.name}</h3>
                  <p className="mb-2">Last Updated: {item.lastUpdated}</p>
                  <p className="mb-2">Replacement: {item.replacementDoc}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Suggested Header Text:</h4>
                    <p className="mb-2 p-2 bg-yellow-100 border border-yellow-300 rounded">{item.suggestedHeaderText}</p>
                    {renderActionButtons(item, 'outdatedDocs')}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Additional Note:</h4>
                    <Textarea
                      placeholder="Add a note for users of this document..."
                      value={item.note}
                      onChange={(e) => handleAction(item.id, 'modified', 'outdatedDocs', e.target.value)}
                    />
                  </div>
                </div>
              ))}
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
