'use client'

import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/subframe/components/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertTriangle, Upload, CheckSquare } from 'lucide-react'
import { DefaultPageLayout } from '@/components/ui/subframe/layouts/DefaultPageLayout'
import { IconWithBackground } from '@/components/ui/subframe/components/IconWithBackground'
import { Breadcrumbs } from '@/components/ui/subframe/components/Breadcrumbs'
import { mockChatHistory } from './data/mock-chatbot'
import { ChatDrawer } from './components/chat-drawer'
import { mockPolicies } from './data/mock-policies'
import { PolicyDetailDrawer } from './components/policy-detail-drawer'
import type { Policy } from './components/policy-detail-drawer'
import { mockConflicts } from './data/mock-conflicts'
import { ClientConflictDrawer } from './components/client-conflict-drawer'
import type { ClientConflict } from './components/client-conflict-drawer'
import { analyzeContract } from './data/contract-analysis'
import { ContractAnalysisDrawer } from './components/contract-analysis-drawer'
import { analyzeUpdatedPolicy } from './data/policy-analysis'
import { PolicyAnalysisDrawer } from './components/policy-analysis-drawer'

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
  const [selectedConflict, setSelectedConflict] = useState<ClientConflict | null>(null)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState(mockChatHistory)

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

  const handlePolicyClick = (policy: { name: string; description: string; customers: string[] }) => {
    setSelectedPolicy(policy)
  }

  const handleConflictClick = (clientConflict: ClientConflict) => {
    setSelectedConflict(clientConflict)
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
              Client Contract Review
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
      <ContractAnalysisDrawer
        isOpen={isContractDrawerOpen}
        onOpenChange={setIsContractDrawerOpen}
        contractAnalysis={contractAnalysis}
        contractRecommendations={contractRecommendations}
        onRecommendationChange={handleContractRecommendationChange}
      />

      {/* Updated Policy Analysis Drawer */}
      <PolicyAnalysisDrawer
        isOpen={isPolicyDrawerOpen}
        onOpenChange={setIsPolicyDrawerOpen}
        policyAnalysis={updatedPolicyAnalysis}
        policyRecommendations={policyRecommendations}
        onRecommendationChange={handlePolicyRecommendationChange}
      />

      {/* Company Policy Detail Drawer */}
      <PolicyDetailDrawer 
        policy={selectedPolicy}
        onOpenChange={() => setSelectedPolicy(null)}
      />

      {/* Conflicting Requirements Detail Drawer */}
      <ClientConflictDrawer 
        requirement={selectedConflict?.requirement || ''}
        customers={selectedConflict?.customers || null}
        currentPolicy={selectedConflict?.currentPolicy}
        onOpenChange={() => setSelectedConflict(null)}
      />

      {/* AI Chatbot Button */}
      <Button 
        onClick={() => setIsChatbotOpen(true)} 
        size="large"
        className="fixed bottom-4 right-4 rounded-full p-4"
        icon="FeatherMessageSquare"
        variant="brand-primary"
      />

      {/* AI Chatbot Drawer */}
      <ChatDrawer 
        isOpen={isChatbotOpen}
        onOpenChange={setIsChatbotOpen}
        chatHistory={chatHistory}
        onChatHistoryChange={setChatHistory}  // Add this prop to allow ChatDrawer to update the history
      />
    </div>
    </div>
    </DefaultPageLayout>
  )
}