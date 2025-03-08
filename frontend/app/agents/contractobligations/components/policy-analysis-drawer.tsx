'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/subframe/components/Button"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink } from 'lucide-react'


interface PolicyAnalysisDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  policyAnalysis: any;
  policyRecommendations: Record<number, string>;
  onRecommendationChange: (index: number, type: string, value: string) => void;
}

interface PolicyRequirement {
  policyName: string;
  currentPolicyText: string;
  outOfComplianceText: string;
  affectedClients: string[];
  clientRequirementSample: string;
  existingPolicyMeetsRequirement: boolean;
  currentPolicyLink: string;
  suggestedPolicyText: string;
  modifiedPolicyText?: string;
}

export function PolicyAnalysisDrawer({
  isOpen,
  onOpenChange,
  policyAnalysis,
  policyRecommendations,
  onRecommendationChange,
}: PolicyAnalysisDrawerProps) {

const generateUpdatedPolicy = () => {
    if (!policyAnalysis) return;
    
    const updatedPolicies = policyAnalysis.unmetRequirements
        .filter((req: PolicyRequirement, index: number) => policyRecommendations[index] !== 'ignore')
        .map((req: PolicyRequirement, index: number) => ({
        policyName: req.policyName,
        updatedText: policyRecommendations[index] === 'modify' ? req.modifiedPolicyText : req.suggestedPolicyText
        }))

    console.log("Updated Policies:", updatedPolicies)
    // In a real application, you would generate and possibly download updated policies here
    alert("Updated policies generated! Check the console for details.")
    }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
          <SheetHeader>
            <SheetTitle>Updated Policy Analysis</SheetTitle>
            <SheetDescription>
              Non-compliant clients: {policyAnalysis ? policyAnalysis.nonCompliantClients : 0}
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-200px)] mt-6">
            {policyAnalysis && policyAnalysis.unmetRequirements.map((req: PolicyRequirement, index: number) => (
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
                    onClick={() => onRecommendationChange(index, 'accept', '')}
                  >
                    Accept
                  </Button>
                  <Button 
                    onClick={() => onRecommendationChange(index, 'ignore', '')}
                  >
                    Ignore
                  </Button>
                  <Button 
                    onClick={() => onRecommendationChange(index, 'modify', req.suggestedPolicyText)}
                  >
                    Modify
                  </Button>
                </div>
                {policyRecommendations[index] === 'modify' && (
                  <Textarea
                    value={req.modifiedPolicyText || req.suggestedPolicyText}
                    onChange={(e) => onRecommendationChange(index, 'modify', e.target.value)}
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
  )
} 