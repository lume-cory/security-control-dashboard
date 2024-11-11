'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/subframe/components/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Upload, FileText, CheckSquare, ExternalLink, Send, MessageSquare, ArrowLeft } from 'lucide-react'
import { DefaultPageLayout } from '@/components/ui/subframe/layouts/DefaultPageLayout'
import { IconWithBackground } from '@/components/ui/subframe/components/IconWithBackground'
import { Breadcrumbs } from '@/components/ui/subframe/components/Breadcrumbs'

// Mock data and functions
const mockPolicies = {
  "Data Retention": {
    description: "All data must be retained for a minimum of 1 year.",
    customers: ["Bravo Corp", "SecureData Ltd", "Global Banc", "FinServ"]
  },
  "Access Control": {
    description: "Multi-factor authentication is required for all user accounts.",
    customers: ["Tech Inc", "Design Co", "FinServ"]
  },
  "Encryption": {
    description: "All data must be encrypted at rest and in transit using industry-standard protocols.",
    customers: ["Bravo Corp", "Tech Inc", "SecureData Ltd", "Health US"]
  }
}

const mockCustomers = ["Bravo Corp", "Tech Inc", "SecureData Ltd", "Design Co", "FinServ", "Global Banc"]

const mockConflicts = [
  { 
    requirement: "Data Retention", 
    customers: [
      { name: "Acme Corp", requirement: "3 months", compliant: true, evidence: "Retention policy set to 90 days in data management tool" },
      { name: "TechGiant Inc", requirement: "3 years", compliant: false, evidence: "Current retention period set to 1 year in data management tool" },
      { name: "SecureData Ltd", requirement: "5 years", compliant: false, evidence: "Current retention period set to 1 year in data management tool" }
    ],
    currentPolicy: "All data must be retained for a minimum of 1 year."
  },
  { 
    requirement: "Password Policy", 
    customers: [
      { name: "SecureData Ltd", requirement: "90 days expiration", compliant: true, evidence: "Password expiration set to 90 days in IAM system" },
      { name: "Acme Corp", requirement: "30 days expiration", compliant: false, evidence: "Current password expiration set to 90 days in IAM system" }
    ],
    currentPolicy: "Passwords must be changed every 90 days."
  }
]

const analyzeContract = (_content: File) => {
  // Mock contract analysis function
  return {
    totalRequirements: 5,
    metRequirements: 3,
    unmetRequirements: 2,
    details: [
      { 
        requirement: "Data encryption",
        requirementText: "All customer data must be encrypted at rest and in transit.",
        status: "Met", 
        policy: "Encryption", 
        policyLanguage: "All data must be encrypted at rest and in transit using industry-standard protocols.",
        policyLink: "/policies/encryption"
      },
      { 
        requirement: "Multi-factor authentication",
        requirementText: "Multi-factor authentication must be implemented for all user accounts.",
        status: "Met", 
        policy: "Access Control",
        policyLanguage: "Multi-factor authentication is required for all user accounts.",
        policyLink: "/policies/access-control"
      },
      { 
        requirement: "Annual security audit",
        requirementText: "An independent third-party security audit must be conducted annually.",
        status: "Unmet", 
        suggestion: "Add annual third-party security audit to policies",
        suggestedPolicy: "Security Audit",
        suggestedPolicyLink: "/policies/security-audit",
        exceedsFramework: false
      },
      { 
        requirement: "Data retention for 5 years",
        requirementText: "All customer data must be retained for a minimum of 5 years.",
        status: "Unmet", 
        suggestion: "Update Data Retention policy to extend retention period to 5 years",
        suggestedPolicy: "Data Retention",
        suggestedPolicyLink: "/policies/data-retention",
        exceedsFramework: true,
        exceedingFrameworks: ["NIST CSF", "CIS RAM"]
      },
      { 
        requirement: "Access logs retention",
        requirementText: "Access logs must be retained for at least 1 year.",
        status: "Met", 
        policy: "Data Retention",
        policyLanguage: "All data must be retained for a minimum of 1 year.",
        policyLink: "/policies/data-retention"
      }
    ]
  }
}

const analyzeUpdatedPolicy = (_content: File) => {
  // Mock updated policy analysis function
  return {
    nonCompliantClients: 3,
    unmetRequirements: [
      { 
        policyName: "Data Retention",
        currentPolicyText: "All data must be retained for a minimum of 1 year.",
        outOfComplianceText: "Data retention period is insufficient for some clients.",
        affectedClients: ["Acme Corp", "TechGiant Inc"],
        clientRequirementSample: "All customer data must be retained for a minimum of 5 years.",
        existingPolicyMeetsRequirement: false,
        currentPolicyLink: "/policies/data-retention",
        suggestedPolicyText: "All data must be retained for a minimum of 5 years to meet the most stringent client requirements.",
        requirement: "Data retention"
      },
      { 
        policyName: "Encryption",
        currentPolicyText: "All data must be encrypted at rest and in transit using industry-standard protocols.",
        outOfComplianceText: "Current policy does not specify key rotation frequency.",
        affectedClients: ["SecureData Ltd"],
        clientRequirementSample: "Encryption keys must be rotated quarterly.",
        existingPolicyMeetsRequirement: false,
        currentPolicyLink: "/policies/encryption",
        suggestedPolicyText: "All data must be encrypted at rest and in transit using industry-standard protocols. Encryption keys must be rotated quarterly.",
        requirement: "Encryption key rotation"
      },
      { 
        policyName: "Access Logging",
        currentPolicyText: "Access logs must be maintained for all systems.",
        outOfComplianceText: "Current policy does not specify retention period for access logs.",
        affectedClients: ["FinServ"],
        clientRequirementSample: "Access logs must be retained for at least 2 years.",
        existingPolicyMeetsRequirement: false,
        currentPolicyLink: "/policies/access-logging",
        suggestedPolicyText: "Access logs must be maintained for all systems and retained for a minimum of 2 years.",
        requirement: "Access log retention"
      }
    ]
  }
}

// New mock data for chatbot
const mockChatHistory = [
  {
    id: 1,
    question: "What is the data retention policy for Design Co?",
    conversation: [
      { role: "user", content: "What is the data retention policy for Design Co?" },
      { role: "assistant", content: "The data retention policy for Design Co requires us to retain their data for 3 years. This is longer than our standard policy of 1 year, so we have implemented specific measures to ensure compliance with their requirements." },
      { role: "user", content: "How do we manage this longer retention period?" },
      { role: "assistant", content: "We use a specialized data management system that allows us to set client-specific retention periods. For Design Co, we've configured a 3-year retention rule. The system automatically flags their data for extended storage and prevents automatic deletion until the 3-year period has elapsed." }
    ]
  },
  {
    id: 2,
    question: "How do we adhere to different data retention requirements for different clients?",
    conversation: [
      { role: "user", content: "How do we adhere to different data retention requirements for different clients?" },
      { role: "assistant", content: "We use a multi-tiered data retention system to manage varying client requirements. Here's how it works:\n\n1. Default Policy: We have a baseline retention policy of 1 year for all clients.\n2. Client-Specific Policies: For clients with longer retention requirements, we implement custom retention rules in our data management system.\n3. Data Tagging: All data is tagged with client identifiers and retention periods.\n4. Automated Enforcement: Our system automatically enforces the appropriate retention period for each piece of data based on its tags.\n5. Regular Audits: We conduct quarterly audits to ensure compliance with all retention policies." },
      { role: "user", content: "What if a client requires a shorter retention period than our default?" },
      { role: "assistant", content: "In cases where a client requires a shorter retention period than our default 1-year policy, we still maintain the data for the full year. This is to ensure we meet our own compliance and operational needs. However, we implement additional measures:\n\n1. Data Isolation: We isolate the client's data in a separate storage area.\n2. Access Restrictions: After the client's specified retention period, we restrict access to the data internally, even though it's still retained.\n3. Client Agreements: We clearly communicate our minimum 1-year retention in our client agreements, explaining the isolation and access restriction processes for shorter periods.\n\nThis approach allows us to respect client wishes while maintaining our own standards and legal obligations." }
    ]
  },
  {
    id: 3,
    question: "Is it standard for clients to enforce that we rotate the passwords for each employee every 30 days?",
    conversation: [
      { role: "user", content: "Is it standard for clients to enforce that we rotate the passwords for each employee every 30 days?" },
      { role: "assistant", content: "While some clients do request frequent password rotations, a 30-day rotation policy is not standard practice across the industry. In fact, current cybersecurity best practices often advise against such frequent mandatory password changes. Here's a breakdown:\n\n1. Industry Standards: Most modern security frameworks, including NIST guidelines, no longer recommend frequent password changes. They instead focus on strong, unique passwords and multi-factor authentication.\n2. Client Requests: Some clients, especially in highly regulated industries, may still require 30-day password rotations due to their internal policies or specific regulatory requirements.\n3. Our Policy: Our standard policy is a 90-day password rotation, which balances security with usability.\n4. Client Compliance: For clients requiring 30-day rotations, we implement this specifically for accounts accessing their systems or data, rather than for all our employees.\n5. Education: We often engage with clients to discuss modern security practices and may suggest alternative measures that provide better security without the drawbacks of frequent password changes." },
      { role: "user", content: "What are the drawbacks of frequent password changes?" },
      { role: "assistant", content: "Frequent password changes, such as every 30 days, can have several drawbacks:\n\n1. Password Fatigue: Users may struggle to create and remember new, strong passwords so frequently, leading to 'password fatigue'.\n2. Weaker Passwords: To cope with frequent changes, users often create simpler passwords or use predictable patterns, actually reducing security.\n3. Increased Support Costs: More frequent password resets typically lead to more lockouts and support tickets.\n4. Productivity Loss: Employees spend more time managing passwords instead of focusing on their work.\n5. False Sense of Security: Organizations may rely too heavily on password rotation and neglect other crucial security measures.\n6. Limited Security Benefit: Most password breaches are discovered quickly. A password that has been stolen will likely be used long before a 30-day rotation.\n\nInstead of frequent rotations, current best practices recommend:\n- Using long, complex passwords or passphrases\n- Implementing multi-factor authentication\n- Using password managers\n- Monitoring for compromised credentials\n- Providing ongoing security awareness training\n\nThese measures provide more effective security without the drawbacks of frequent mandatory changes." }
    ]
  },
  {
    id: 4,
    question: "What security certifications do we have? Do we have SOC2 Type 2?",
    conversation: [
      { role: "user", content: "What security certifications do we have? Do we have SOC2 Type 2?" },
      { role: "assistant", content: "Yes, we do have SOC2 Type 2 certification. Here's a list of our current security certifications:\n\n1. SOC2 Type 2: This is our primary certification, demonstrating our ongoing commitment to security, availability, processing integrity, confidentiality, and privacy of customer data.\n2. ISO 27001: We are certified for our Information Security Management System (ISMS).\n3. PCI DSS: For handling payment card data, we maintain PCI DSS compliance.\n4. HIPAA Compliance: While not a certification per se, we are HIPAA compliant for handling healthcare data.\n5. GDPR Compliance: We adhere to GDPR requirements for processing EU citizens' data.\n6. CCPA Compliance: We comply with the California Consumer Privacy Act.\n\nOur SOC2 Type 2 certification, in particular, involves a rigorous audit of our controls over an extended period (typically 6-12 months), providing assurance of our ongoing compliance and effective security practices." },
      { role: "user", content: "When was our last SOC2 audit?" },
      { role: "assistant", content: "Our last SOC2 Type 2 audit was completed three months ago. The audit period covered the previous 12 months of operations. Here are some key points about our SOC2 audit process:\n\n1. Frequency: We undergo SOC2 Type 2 audits annually to maintain our certification.\n2. Scope: The audit covered all five trust service criteria: security, availability, processing integrity, confidentiality, and privacy.\n3. Auditor: The audit was conducted by an independent third-party auditor, [Auditor Name], who is accredited by the AICPA.\n4. Results: We successfully passed the audit with no significant findings. Minor recommendations were made and have since been implemented.\n5. Next Audit: Our next SOC2 Type 2 audit is scheduled to begin in 9 months.\n\nThe successful completion of this recent audit demonstrates our ongoing commitment to maintaining robust security practices and compliance with industry standards. The full audit report is available for review by authorized personnel and can be shared with clients under NDA if required." }
    ]
  },
  {
    id: 5,
    question: "Where can I find the data to support our SOC2 compliance?",
    conversation: [
      { role: "user", content: "Where can I find the data to support our SOC2 compliance?" },
      { role: "assistant", content: "The data supporting our SOC2 compliance is stored in several secure locations, each serving a specific purpose. Here's a guide to finding the relevant information:\n\n1. Compliance Management System: Our primary repository for SOC2 compliance data is [ComplianceSystem Name]. You can access it at [internal URL]. This system contains:\n   - Policies and procedures\n   - Risk assessments\n   - Control documentation\n   - Evidence of control effectiveness\n\n2. Security Information and Event Management (SIEM) System: [SIEM System Name] at [internal URL] stores logs and security event data that support our continuous monitoring controls.\n\n3. HR System: Employee training records, background check information, and other personnel-related compliance data are in [HR System Name].\n\n4. Asset Management System: [Asset System Name] contains inventory and configuration data for our IT assets.\n\n5. Ticketing System: [Ticket System Name] has records of incident responses, change management, and other operational processes.\n\n6. Document Management System: [Document System Name] stores contracts, vendor assessments, and other compliance-related documents.\n\n7. Audit Reports: The final SOC2 audit reports are stored in a secure folder on our document management system. Access is restricted to authorized personnel.\n\nTo access these systems, you'll need appropriate permissions. If you don't have access and require it for your role, please submit a request through our access management system or contact the IT department.\n\nRemember, all this data is sensitive and should be handled in accordance with our data classification and handling policies." },
      { role: "user", content: "Who should I contact if I need access to the SOC2 audit reports?" },
      { role: "assistant", content: "To request access to the SOC2 audit reports, you should contact our Compliance Team. Here's the process:\n\n1. Primary Contact: Reach out to Jane Doe, our Compliance Manager. Her email is jane.doe@company.com.\n\n2. Alternative Contact: If Jane is unavailable, you can contact John Smith, the Information Security Officer, at john.smith@company.com.\n\n3. Request Process:\n   - Send an email with the subject line \"Request for SOC2 Audit Report Access\"\n   - In the body, include:\n     * Your name and position\n     * The reason for needing access\n     * The specific audit report(s) you need (e.g., most recent, or a specific year)\n     * Any deadline you're working with\n\n4. Approval Process: Your request will be reviewed by the Compliance Team. They may ask for additional information or clarification.\n\n5. Access Granting: If approved, you'll receive instructions on how to access the reports in our secure document management system.\n\n6. Confidentiality: Remember that these reports contain sensitive information. You'll be required to acknowledge our confidentiality policy before access is granted.\n\n7. Time Frame: Typically, requests are processed within 1-2 business days.\n\nIf you need urgent access, please indicate this in your email and follow up with a phone call to the Compliance Team at extension 5555.\n\nRemember, access to these reports is logged and audited regularly as part of our security practices." }
    ]
  }
]

interface ContractDetail {
  requirement: string;
  requirementText: string;
  status: string;
  policy?: string;
  policyLanguage?: string;
  policyLink?: string;
  suggestion?: string;
  suggestedPolicy?: string;
  suggestedPolicyLink?: string;
  exceedsFramework?: boolean;
  exceedingFrameworks?: string[];
}

// Add this interface above the component
interface Policy {
  name: string;
  description: string;
  customers: string[];
}

// Add this interface near the top with other interfaces
interface Conflict {
  requirement: string;
  customers: Array<{
    name: string;
    requirement: string;
    compliant: boolean;
    evidence: string;
  }>;
  currentPolicy: string;
}

// Add this interface near the top with other interfaces
interface Chat {
  id: number;
  question: string;
  conversation: Array<{
    role: string;
    content: string;
  }>;
}

export default function ClientSecurityRequirementsCheck() {
  const router = useRouter()

  const [contractAnalysis, setContractAnalysis] = useState<any>(null)
  const [updatedPolicyAnalysis, setUpdatedPolicyAnalysis] = useState<{
    nonCompliantClients: number;
    unmetRequirements: Array<{
      policyName: string;
      currentPolicyText: string;
      outOfComplianceText: string;
      affectedClients: string[];
      clientRequirementSample: string;
      existingPolicyMeetsRequirement: boolean;
      currentPolicyLink: string;
      suggestedPolicyText: string;
      requirement: string;
      modifiedPolicyText?: string;
    }>;
  } | null>(null);
  const [isContractDrawerOpen, setIsContractDrawerOpen] = useState(false)
  const [isPolicyDrawerOpen, setIsPolicyDrawerOpen] = useState(false)
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false)
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false)
  const [contractRecommendations, setContractRecommendations] = useState<Record<number, { action: string; modifiedSuggestion: string }>>({})
  const [policyRecommendations, setPolicyRecommendations] = useState<Record<number, string>>({})
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [newMessage, setNewMessage] = useState("")

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>, type: string) => {
    const files = event.target.files
    if (!files) return
    const file = files[0]
    if (file) {
      // Simulate file reading and analysis
      setTimeout(() => {
        if (type === 'contract') {
          const analysis = analyzeContract(file)
          setContractAnalysis(analysis)
          const initialRecommendations: Record<number, { action: string; modifiedSuggestion: string }> = {}
          analysis.details.forEach((detail, index) => {
            if (detail.status === "Unmet") {
              initialRecommendations[index] = { action: 'accept', modifiedSuggestion: detail.suggestion || '' }
            }
          })
          setContractRecommendations(initialRecommendations)
          setIsContractDialogOpen(false)
          setIsContractDrawerOpen(true)
        } else if (type === 'updatedPolicy') {
          const analysis = analyzeUpdatedPolicy(file)
          setUpdatedPolicyAnalysis(analysis)
          const initialRecommendations: Record<number, string> = {}
          analysis.unmetRequirements.forEach((req, index) => {
            initialRecommendations[index] = 'accept'
          })
          setPolicyRecommendations(initialRecommendations)
          setIsPolicyDialogOpen(false)
          setIsPolicyDrawerOpen(true)
        }
      }, 1000)
    }
  }

  const handleContractRecommendationChange = (index: number, action: 'accept' | 'ignore' | 'modify', modifiedSuggestion?: string) => {
    setContractRecommendations(prev => ({
      ...prev,
      [index]: { action, modifiedSuggestion: modifiedSuggestion || prev[index].modifiedSuggestion }
    }))
  }

  const handlePolicyRecommendationChange = (index: number, value: string, modifiedText?: string) => {
    setPolicyRecommendations(prev => ({ 
      ...prev, 
      [index]: modifiedText || value 
    }))
  }

  const generateContractReport = () => {
    const acceptedChanges = contractAnalysis.details
      .filter((detail: ContractDetail, index: number) => detail.status === "Unmet" && contractRecommendations[index].action !== 'ignore')
      .map((detail: ContractDetail, index: number) => ({
        requirement: detail.requirement,
        action: contractRecommendations[index].action,
        suggestion: contractRecommendations[index].action === 'modify' 
          ? contractRecommendations[index].modifiedSuggestion 
          : detail.suggestion
      }))

    console.log("Contract Analysis Report:", acceptedChanges)
    // In a real application, you would generate and possibly download a report here
    alert("Report generated! Check the console for details.")
  }

  const generateUpdatedPolicy = () => {
    if (!updatedPolicyAnalysis) return;
    
    const updatedPolicies = updatedPolicyAnalysis.unmetRequirements
      .filter((req: any, index: number) => policyRecommendations[index] !== 'ignore')
      .map((req: any, index: number) => ({
        policyName: req.policyName,
        updatedText: policyRecommendations[index] === 'modify' ? req.modifiedPolicyText : req.suggestedPolicyText
      }))

    console.log("Updated Policies:", updatedPolicies)
    // In a real application, you would generate and possibly download updated policies here
    alert("Updated policies generated! Check the console for details.")
  }

  const handlePolicyClick = (policy: { name: string; description: string; customers: string[] }) => {
    setSelectedPolicy(policy)
  }

  const handleConflictClick = (conflict: Conflict) => {
    setSelectedConflict(conflict)
  }

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    let updatedChat
    if (selectedChat) {
      updatedChat = {
        ...selectedChat,
        conversation: [
          ...selectedChat.conversation,
          { role: "user", content: newMessage },
          { role: "assistant", content: "I'm processing your request. Please wait for a moment..." } // Placeholder response
        ]
      }
    } else {
      updatedChat = {
        id: mockChatHistory.length + 1,
        question: newMessage,
        conversation: [
          { role: "user", content: newMessage },
          { role: "assistant", content: "I'm processing your request. Please wait for a moment..." } // Placeholder response
        ]
      }
      mockChatHistory.unshift(updatedChat)
    }
    
    setSelectedChat(updatedChat)
    setNewMessage("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = "This is a simulated AI response. In a real implementation, this would be generated by an AI model based on the user's input and the conversation context."
      const finalUpdatedChat = {
        ...updatedChat,
        conversation: [
          ...updatedChat.conversation.slice(0, -1),
          { role: "assistant", content: aiResponse }
        ]
      }
      setSelectedChat(finalUpdatedChat)
      if (!selectedChat) {
        mockChatHistory[0] = finalUpdatedChat
      }
    }, 1000)
  }

  return (
    <DefaultPageLayout>
      <div className="flex h-full w-full flex-col items-start gap-6 p-4 sm:p-6" >
        <div className="flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center" >
          <IconWithBackground size="medium" icon="FeatherRocket" />
          <span className="text-heading-2 font-heading-2 text-default-font text-center sm:text-left" >
            Acme Inc
          </span>
        </div>
        <div className="flex w-full items-center justify-between overflow-x-auto" >
          <Breadcrumbs>
            <Breadcrumbs.Item onClick={() => router.push('/agents')}>Agents </Breadcrumbs.Item>
            < Breadcrumbs.Divider />
            <Breadcrumbs.Item active={true}>
              Compliance & Policy Reviewer
            </Breadcrumbs.Item>
          </Breadcrumbs>
        </div>

    <div className="container mx-auto p-4">
      
      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unmet Client Requirements</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractAnalysis ? contractAnalysis.unmetRequirements : 0}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Client Requirements Met</CardTitle>
            <CheckSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contractAnalysis ? contractAnalysis.metRequirements : 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mb-6">
        <Dialog open={isContractDialogOpen} onOpenChange={setIsContractDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="large"
              variant="brand-secondary"
              icon="FeatherCheckSquare"
            >
              Check Contract Requirements
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Check Contract Requirements</DialogTitle>
              <DialogDescription>Upload a contract to check its requirements against existing policies.</DialogDescription>
            </DialogHeader>
            <Label htmlFor="contract-check" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              </div>
              <Input id="contract-check" type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'contract')} />
            </Label>
          </DialogContent>
        </Dialog>
        <Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="large"
              variant="brand-secondary"
              icon="FeatherCheckSquare"
            >
              Check Updated Policy
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Check Updated Policy</DialogTitle>
              <DialogDescription>Upload an updated policy to check its impact on client compliance.</DialogDescription>
            </DialogHeader>
            <Label htmlFor="policy-upload" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
              </div>
              <Input id="policy-upload" type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'updatedPolicy')} />
            </Label>
          </DialogContent>
        </Dialog>
      </div>

      {/* Company Policies Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Company Policies</CardTitle>
          <CardDescription>Company security policies and clients that require it</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Clients</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(mockPolicies).map(([policy, policyData]) => (
                <TableRow key={policy} className="cursor-pointer hover:bg-muted" onClick={() => handlePolicyClick({ name: policy, description: policyData.description, customers: policyData.customers })}>
                  <TableCell className="font-medium">{policy}</TableCell>
                  <TableCell>{policyData.description}</TableCell>
                  <TableCell>
                    {policyData.customers.slice(0, 3).join(", ")}
                    {policyData.customers.length > 3 && (
                      <Badge variant="outline" className="ml-2">
                        +{policyData.customers.length - 3} {policyData.customers.length === 4 ? 'more' : 'others'}
                      </Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Requirement Conflicts Section */}
      <Card>
        <CardHeader>
          <CardTitle>Conflicting Requirements</CardTitle>
          <CardDescription>Conflicts across different client contract requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requirement</TableHead>
                <TableHead>Conflicting Client Requirements</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConflicts.map((conflict, index) => (
                <TableRow key={index} className="cursor-pointer hover:bg-muted" onClick={() => handleConflictClick(conflict)}>
                  <TableCell className="font-medium">{conflict.requirement}</TableCell>
                  <TableCell>
                    <div className="flex flex-col space-y-1">
                      {conflict.customers.map((customer, customerIndex) => (
                        <span key={customerIndex}>{customer.name}: {customer.requirement}</span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Contract Analysis Drawer */}
      <Sheet open={isContractDrawerOpen} onOpenChange={setIsContractDrawerOpen}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>Contract Analysis</SheetTitle>
            <SheetDescription>
              Requirements met: {contractAnalysis ? `${contractAnalysis.metRequirements} / ${contractAnalysis.totalRequirements}` : ''}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-200px)] mt-6">
            {contractAnalysis && contractAnalysis.details.map((detail: ContractDetail, index: number) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{detail.requirement}</h3>
                  {detail.status === "Met"? (
                    <Badge variant="outline" className="bg-green-100 text-green-800">Met</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800">Unmet</Badge>
                  )}
                </div>
                <p className="mb-2"><strong>Requirement:</strong> {detail.requirementText}</p>
                {detail.status === "Met" ? (
                  <>
                    <p><strong>Matched Policy:</strong> {detail.policy}</p>
                    <p className="mt-2"><strong>Policy Language:</strong> {detail.policyLanguage}</p>
                    <a href={detail.policyLink} className="text-blue-500 hover:underline flex items-center mt-2">
                      View Policy <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </>
                ) : (
                  <>
                    <p className="mt-2"><strong>Suggested Policy:</strong> {detail.suggestedPolicy}</p>
                    <a href={detail.suggestedPolicyLink} className="text-blue-500 hover:underline flex items-center mt-2 mb-4">
                      View Current Policy <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                    <p className="text-green-600 mt-2"><strong>Suggested Text:</strong> {detail.suggestion}</p>
                    <div className="flex space-x-2 mt-4 mb-4">
                      <Button 
                        variant={contractRecommendations[index]?.action === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                        onClick={() => handleContractRecommendationChange(index, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button 
                        variant={contractRecommendations[index]?.action === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                        onClick={() => handleContractRecommendationChange(index, 'ignore')}
                      >
                        Ignore
                      </Button>
                      <Button 
                        variant={contractRecommendations[index]?.action === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                        onClick={() => handleContractRecommendationChange(index, 'modify')}
                      >
                        Modify
                      </Button>
                    </div>
                    {contractRecommendations[index]?.action === 'modify' && (
                      <Textarea
                        value={contractRecommendations[index].modifiedSuggestion}
                        onChange={(e) => handleContractRecommendationChange(index, 'modify', e.target.value)}
                        placeholder="Enter your modified suggestion here"
                        className="mt-2"
                      />
                    )}
                    {detail.exceedsFramework && (
                      <Alert className="mt-4">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Exceeds Standard Frameworks</AlertTitle>
                        <AlertDescription>
                          This requirement goes beyond standard cybersecurity control frameworks including: {detail.exceedingFrameworks?.join(", ") || "N/A"}
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </div>
            ))}
          </ScrollArea>
          <SheetFooter>
            <Button 
              variant="brand-secondary"
              icon="FeatherFileText"
              onClick={generateContractReport} 
              className="mt-4"
            >
              Generate Report
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Updated Policy Analysis Drawer */}
      <Sheet open={isPolicyDrawerOpen} onOpenChange={setIsPolicyDrawerOpen}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>Updated Policy Analysis</SheetTitle>
            <SheetDescription>
              Non-compliant clients: {updatedPolicyAnalysis ? updatedPolicyAnalysis.nonCompliantClients : 0}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-200px)] mt-6">
            {updatedPolicyAnalysis && updatedPolicyAnalysis.unmetRequirements.map((req, index) => (
              <div key={index} className="mb-8 p-4 border rounded">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">{req.policyName}</h3>
                  <Badge variant="outline" className="bg-red-100 text-red-800">Unmet</Badge>
                </div>
                <p className="mb-2"><strong>Policy Text:</strong> {req.currentPolicyText}</p>
                <p className="mb-2"><strong>Out of Compliance:</strong> {req.outOfComplianceText}</p>
                <p className="mb-2"><strong>Affected Clients:</strong> {req.affectedClients.join(", ")}</p>
                <p className="mb-2"><strong>Sample Client Requirement:</strong> {req.clientRequirementSample}</p>
                <a href={req.currentPolicyLink} className="text-blue-500 hover:underline flex items-center mb-4">
                  View Client Requirement <ExternalLink className="ml-1 h-4 w-4" />
                </a>

                <div className="w-3/4 h-px bg-gray-200 my-4"></div>

                {req.existingPolicyMeetsRequirement ? (
                  <p className="mb-2">The existing policy meets these customer requirements.</p>
                ) : (
                  <p className="mb-2">The existing policy does not meet these customer requirements.</p>
                )}
                <a href={req.currentPolicyLink} className="text-blue-500 hover:underline flex items-center mb-4">
                  View Current Policy <ExternalLink className="ml-1 h-4 w-4" />
                </a>
                <p className="mb-2"><strong>Suggested Policy Text:</strong> {req.suggestedPolicyText}</p>
                <div className="flex space-x-2 mt-4 mb-4">
                  <Button 
                    variant={policyRecommendations[index] === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                    onClick={() => handlePolicyRecommendationChange(index, 'accept')}
                  >
                    Accept
                  </Button>
                  <Button 
                    variant={policyRecommendations[index] === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                    onClick={() => handlePolicyRecommendationChange(index, 'ignore')}
                  >
                    Ignore
                  </Button>
                  <Button 
                    variant={policyRecommendations[index] === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                    onClick={() => handlePolicyRecommendationChange(index, 'modify')}
                  >
                    Modify
                  </Button>
                </div>
                {policyRecommendations[index] === 'modify' && (
                  <Textarea
                    value={req.modifiedPolicyText || req.suggestedPolicyText}
                    onChange={(e) => handlePolicyRecommendationChange(index, 'modify', e.target.value)}
                    placeholder="Enter your modified policy text here"
                    className="mt-2"
                  />
                )}
              </div>
            ))}
          </ScrollArea>
          <SheetFooter>
            <Button onClick={generateUpdatedPolicy} className="mt-4">
              Generate Updated Policy
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      {/* Company Policy Detail Drawer */}
      <Sheet open={!!selectedPolicy} onOpenChange={() => setSelectedPolicy(null)}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>{selectedPolicy?.name}</SheetTitle>
            <SheetDescription>Detailed view of the company policy</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2">Policy Text</h3>
            <p className="mb-4">{selectedPolicy?.description}</p>
            <h3 className="text-lg font-semibold mb-2">Dependent Customers</h3>
            <ul className="list-disc pl-5">
              {selectedPolicy?.customers.map((customer, index) => (
                <li key={index}>{customer}</li>
              ))}
            </ul>
          </div>
        </SheetContent>
      </Sheet>

      {/* Conflicting Requirements Detail Drawer */}
      <Sheet open={!!selectedConflict} onOpenChange={() => setSelectedConflict(null)}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>{selectedConflict?.requirement}</SheetTitle>
            <SheetDescription>Detailed view of conflicting requirements</SheetDescription>
          </SheetHeader>
          <div className="py-4">
            <h3 className="text-lg font-semibold mb-2">Current Company Policy</h3>
            <p className="mb-4">{selectedConflict?.currentPolicy}</p>
            <h3 className="text-lg font-semibold mb-2">Client Requirements</h3>
            {selectedConflict?.customers.map((customer, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <h4 className="font-semibold">{customer.name}</h4>
                <p><strong>Requirement:</strong> {customer.requirement}</p>
                <a href="#" className="text-blue-500 hover:underline flex items-center mt-2">
                  View Requirement Details <ExternalLink className="ml-1 h-4 w-4" />
                </a>
                <p><strong>Compliance Status:</strong> {customer.compliant ? 'Compliant' : 'Non-compliant'}</p>
                <p><strong>Evidence:</strong> {customer.evidence}</p>
                <a href="#" className="text-blue-500 hover:underline flex items-center mt-2">
                  View Supporting Evidence <ExternalLink className="ml-1 h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* AI Chatbot Button */}
      <Button 
        onClick={() => setIsChatbotOpen(true)} 
        size="large"
        className="fixed bottom-4 right-4 rounded-full p-4"
        icon="FeatherMessageSquare"
        variant="brand-primary"
      />

      {/* AI Chatbot Drawer */}
      <Sheet open={isChatbotOpen} onOpenChange={setIsChatbotOpen}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>AI Security Assistant</SheetTitle>
            <SheetDescription>Ask questions about security policies and compliance</SheetDescription>
          </SheetHeader>
          <div className="flex flex-col mt-4 h-[calc(100vh-200px)]">
            {selectedChat ? (
              <>
                <Button 
                  size="medium"
                  variant="brand-secondary" 
                  className="self-start mb-4" 
                  icon="FeatherArrowLeft"
                  onClick={() => setSelectedChat(null)}
                >
                 Back to Questions
                </Button>
                <ScrollArea className="flex-grow mb-4">
                  {selectedChat.conversation.map((message, index) => (
                    <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`inline-block p-2 rounded-lg ${message.role === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </>
            ) : (
              <ScrollArea className="flex-grow mb-4">
                <h3 className="font-semibold mb-2">Recent Questions</h3>
                {mockChatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className="p-2 mb-2 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() => handleChatSelect(chat)}
                  >
                    {chat.question}
                  </div>
                ))}
              </ScrollArea>
            )}
            <div className="flex">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={selectedChat ? "Type your message here..." : "Start a new thread..."}
                className="flex-grow mr-2"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button 
                variant="brand-secondary"
                icon="FeatherArrowUp"
                onClick={handleSendMessage}
              >
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
    </div>
    </DefaultPageLayout>
  )
}