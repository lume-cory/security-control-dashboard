'use client'

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, ExternalLink } from "lucide-react"
import type { ClientRequirement } from "../data/mock-client-requirements"
import { Button } from "@/subframe/components/Button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'
import { cn } from "@/lib/utils"

interface ClientRequirementsDrawerProps {
  client: ClientRequirement | null;
  onOpenChange: () => void;
}

type RecommendationAction = 'accept' | 'ignore' | 'modify' | null;
type Recommendation = {
  action: RecommendationAction;
  modifiedSuggestion?: string;
  justification?: string;
};

export function ClientRequirementsDrawer({
  client,
  onOpenChange
}: ClientRequirementsDrawerProps) {
  const [recommendations, setRecommendations] = useState<Record<string, Recommendation>>({});

  const handleRecommendationChange = (
    requirementId: string,
    action: RecommendationAction,
    text?: string,
    isJustification: boolean = false
  ) => {
    setRecommendations(prev => ({
      ...prev,
      [requirementId]: {
        ...prev[requirementId],
        action,
        ...(isJustification
          ? { justification: text }
          : text ? { modifiedSuggestion: text } : {})
      }
    }));
  };

  const generateContractReport = () => {
    if (!client) return;

    const report = client.requirements.map((req) => ({
      category: req.category,
      status: req.status,
      description: req.description,
      evidence: req.evidence,
      matchedPolicy: req.policy,
      currentPolicy: req.policyLink,
      suggestedPolicy: req.suggestedPolicy,
      suggestedText: req.suggestion,
      action: recommendations[req.id]?.action || null,
      modifiedSuggestion: recommendations[req.id]?.modifiedSuggestion,
      justification: recommendations[req.id]?.justification,
      beyondFramework: req.exceedingFrameworks,
      policyReference: req.policyLink
    }));

    const summary = {
      clientName: client.name,
      totalRequirements: report.length,
      metRequirements: report.filter(r => r.status === 'met').length,
      unmetRequirements: report.filter(r => r.status === 'unmet').length,
      report
    };

    console.log("Contract Analysis Report:", summary);
    alert("Report generated! Check the console for details.");
  };

  const handleUpdateContract = () => {
    if (!client) return;

    // TODO: Implement contract update logic
    console.log("Updating contract with recommendations:", recommendations);
    alert("Updates have been added to the contract. A new contract will be generated and downloaded shortly");
  };

  return (
    <Sheet open={!!client} onOpenChange={onOpenChange}>
      <SheetContent style={{ maxWidth: 'min(50vw, 1200px)' }} className="w-full overflow-hidden" side="right">
        <SheetHeader>
          <SheetTitle>{client?.name} Requirements</SheetTitle>
          <SheetDescription className="flex gap-4">
            <span className={cn(
              "px-2 py-1 rounded-full text-sm capitalize",
              {
                "bg-green-100 text-green-800": client?.status === 'active',
                "bg-yellow-100 text-yellow-800": client?.status === 'pending',
                "bg-gray-100 text-gray-800": client?.status === 'inactive'
              }
            )}>
              {client?.status}
            </span>
            <a
              href={client?.contractLink}
              className="text-blue-500 hover:underline flex items-center"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Contract <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </SheetDescription>
          <SheetDescription>
            Requirements met: {client?.requirements.filter(r => r.status === 'met').length ?? 0} / {client?.requirements?.length ?? 0}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-280px)] mt-6">
          {client?.requirements.map((req) => (
            <div key={req.id} className="mb-4 p-4 border rounded">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{req.category}</h3>
                {req.status === "met" ? (
                  <Badge variant="outline" className="bg-green-100 text-green-800">Met</Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-100 text-red-800">Unmet</Badge>
                )}
              </div>
              <p className="mb-2"><strong>Requirement:</strong> {req.description}</p>
              {req.status === "met" ? (
                <>
                  <p><strong>Matched Policy:</strong> {req.policy}</p>
                  <p className="mt-2"><strong>Policy Language:</strong> {req.policyLanguage}</p>
                  <a href={req.policyLink} className="text-blue-500 hover:underline flex items-center mt-2">
                    View Policy <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </>
              ) : (
                <>
                  <p className="mt-2"><strong>Suggested Policy:</strong> {req.suggestedPolicy}</p>
                  <a href={req.suggestedPolicyLink} className="text-blue-500 hover:underline flex items-center mt-2 mb-4">
                    View Current Policy <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </>
              )}

              {/* Framework and Regulation Associations - moved outside status check */}
              {(req.frameworkAssociations?.length ?? 0) > 0 && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Framework Associations</h4>
                    {req.frameworkAssociations?.map((assoc, idx) => (
                      <div key={idx} className="bg-gray-50 p-2 rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{assoc.framework} - {assoc.article}</span>
                          <a
                            href={assoc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline flex items-center text-sm"
                          >
                            View <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                        <p className="text-sm text-gray-600">{assoc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(req.regulationAssociations?.length ?? 0) > 0 && (
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Regulation Associations</h4>
                    {req.regulationAssociations?.map((assoc, idx) => (
                      <div key={idx} className="bg-gray-50 p-2 rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{assoc.regulation} - {assoc.article}</span>
                          <a
                            href={assoc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline flex items-center text-sm"
                          >
                            View <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        </div>
                        <p className="text-sm text-gray-600">{assoc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Continue with unmet requirement content */}
              {req.status !== "met" && (
                <>
                  <p className="text-green-600 mt-4"><strong>Suggested Text:</strong> {req.suggestion}</p>
                  <div className="flex space-x-2 mt-4 mb-4">
                    <Button
                      variant={recommendations[req.id]?.action === 'accept' ? 'brand-primary' : 'brand-secondary'}
                      onClick={() => handleRecommendationChange(req.id, 'accept')}
                    >
                      Accept
                    </Button>
                    <Button
                      variant={recommendations[req.id]?.action === 'ignore' ? 'brand-primary' : 'brand-secondary'}
                      onClick={() => handleRecommendationChange(req.id, 'ignore')}
                    >
                      Ignore
                    </Button>
                    <Button
                      variant={recommendations[req.id]?.action === 'modify' ? 'brand-primary' : 'brand-secondary'}
                      onClick={() => handleRecommendationChange(req.id, 'modify')}
                    >
                      Modify
                    </Button>
                  </div>
                  {recommendations[req.id]?.action === 'modify' && (
                    <Textarea
                      value={recommendations[req.id]?.modifiedSuggestion || ''}
                      onChange={(e) => handleRecommendationChange(req.id, 'modify', e.target.value)}
                      placeholder="Enter your modified suggestion here"
                      className="mt-2"
                    />
                  )}
                  {recommendations[req.id]?.action === 'ignore' && (
                    <Textarea
                      value={recommendations[req.id]?.justification || ''}
                      onChange={(e) => handleRecommendationChange(req.id, 'ignore', e.target.value, true)}
                      placeholder="Please provide justification"
                      className="mt-2"
                    />
                  )}
                  {req.exceedsFramework && (
                    <Alert className="mt-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Exceeds Standard Frameworks</AlertTitle>
                      <AlertDescription>
                        This requirement goes beyond standard cybersecurity control frameworks including: {req.exceedingFrameworks?.join(", ") || "N/A"}
                      </AlertDescription>
                    </Alert>
                  )}
                </>
              )}
            </div>
          ))}
        </ScrollArea>

        <SheetFooter className="flex gap-2">
          <Button
            variant="brand-secondary"
            icon="FeatherFileText"
            onClick={generateContractReport}
            className="mt-4"
          >
            Generate Report
          </Button>
          <Button
            variant="brand-primary"
            icon="FeatherSave"
            onClick={handleUpdateContract}
            className="mt-4"
          >
            Update Contract
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
} 