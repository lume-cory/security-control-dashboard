'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/subframe/components/Button"
import { Textarea } from "@/components/ui/textarea"
import { AlertTriangle, ExternalLink } from 'lucide-react'

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

  return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
  )
} 