'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/subframe/components/Button"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, ExternalLink, Mail } from 'lucide-react'
import { useState } from 'react'
import { Input } from "@/components/ui/input"

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
    owner: {
      team: string;
      contact: string;
      email: string;
      approvalStatus: 'approved' | 'pending' | 'not_requested';
    };
  }

interface ContractAnalysisDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contractAnalysis: any;
  contractRecommendations: Record<number, { 
    action: string; 
    modifiedSuggestion: string; 
  }>;
  onRecommendationChange: (
    index: number, 
    action: 'accept' | 'ignore' | 'modify', 
    modifiedSuggestion?: string
  ) => void;
}

export function ContractAnalysisDrawer({
  isOpen,
  onOpenChange,
  contractAnalysis,
  contractRecommendations,
  onRecommendationChange,
}: ContractAnalysisDrawerProps) {

const [editState, setEditState] = useState<{ field: 'team' | 'contact' | 'email' | null, index: number | null }>({ field: null, index: null })

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

const handleUpdateContract = () => {
    if (!contractAnalysis) return;
    
    // TODO: Implement contract update logic
    console.log("Updating contract with recommendations:", contractRecommendations);
    alert("Updates have been added to the contract. A new contract will be generated and downloaded shortly");
    };

const handleRequestApproval = (email: string, requirement: string) => {
  console.log(`Requesting approval from ${email} for requirement: ${requirement}`);
  alert(`Approval request sent to ${email}`);
};

const handleSaveEdit = (index: number, field: 'team' | 'contact' | 'email', value: string) => {
  // TODO: Implement actual update logic
  console.log(`Updating ${field} to:`, value);
  setEditState({ field: null, index: null });
};

  return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>Customer Requirement Analysis</SheetTitle>
            <SheetDescription>
              Requirements met: {contractAnalysis ? 
                `${contractAnalysis.details.filter((detail: ContractDetail) => detail.status === "Met").length} / ${contractAnalysis.details.length}` 
                : ''}
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

                {/* Rest of the requirement details */}
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
                        onClick={() => onRecommendationChange(index, 'accept')}
                      >
                        Accept
                      </Button>
                      <Button 
                        variant={contractRecommendations[index]?.action === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                        onClick={() => onRecommendationChange(index, 'ignore')}
                      >
                        Ignore
                      </Button>
                      <Button 
                        variant={contractRecommendations[index]?.action === 'brand-secondary' ? 'brand-secondary' : 'brand-secondary'}
                        onClick={() => onRecommendationChange(index, 'modify')}
                      >
                        Modify
                      </Button>
                    </div>
                    {contractRecommendations[index]?.action === 'modify' && (
                      <Textarea
                        value={contractRecommendations[index].modifiedSuggestion}
                        onChange={(e) => onRecommendationChange(index, 'modify', e.target.value)}
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
                {/* Requirement Owner Section */}
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Requirement Owner</h4>
                    {detail.owner.approvalStatus === 'approved' && (
                      <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>
                    )}
                    {detail.owner.approvalStatus === 'pending' && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>
                    )}
                    {detail.owner.approvalStatus === 'not_requested' && (
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">Not Requested</Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center justify-left">
                      <p><strong>Team:</strong></p>
                      {editState.field === 'team' && editState.index === index ? (
                        <Input
                          className="w-[150px] h-7 text-sm"
                          defaultValue={detail.owner.team}
                          autoFocus
                          onBlur={(e) => handleSaveEdit(index, 'team', e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit(index, 'team', e.currentTarget.value);
                            }
                          }}
                        />
                      ) : (
                        <span 
                          className="cursor-pointer hover:text-blue-500"
                          onClick={() => setEditState({ field: 'team', index })}
                        >
                          {detail.owner.team}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center justify-left">
                      <p><strong>Contact:</strong></p>
                      {editState.field === 'contact' && editState.index === index ? (
                        <Input
                          className="w-[150px] h-7 text-sm"
                          defaultValue={detail.owner.contact}
                          autoFocus
                          onBlur={(e) => handleSaveEdit(index, 'contact', e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveEdit(index, 'contact', e.currentTarget.value);
                            }
                          }}
                        />
                      ) : (
                        <span 
                          className="cursor-pointer hover:text-blue-500"
                          onClick={() => setEditState({ field: 'contact', index })}
                        >
                          {detail.owner.contact}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    {detail.owner.approvalStatus === 'not_requested' && (
                      <Button
                        size="medium"
                        variant="brand-secondary"
                        onClick={() => handleRequestApproval(detail.owner.email, detail.requirement)}
                      >
                        Request Approval
                      </Button>
                    )}
                    {detail.owner.approvalStatus === 'pending' && (
                      <Button
                        size="medium"
                        variant="brand-secondary"
                        onClick={() => handleRequestApproval(detail.owner.email, detail.requirement)}
                      >
                        Modify Approval
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <SheetFooter className="flex gap-2">
            <Button 
              variant="brand-primary"
              icon="FeatherSave"
              onClick={handleUpdateContract} 
              className="mt-4"
            >
              Generate Response to Request
            </Button>
          </SheetFooter>
        </SheetContent>
    </Sheet>
  )
} 