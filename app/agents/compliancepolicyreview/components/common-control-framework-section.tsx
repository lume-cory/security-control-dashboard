import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { commonControlFrameworkData, CCFRequirement } from "../data/common-control-framework"
import { frameworkAlignmentData } from "../data/framework-alignment-data"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/subframe/components/Button"
import { Badge } from "@/components/ui/badge"
import { ContractualObligation } from "../data/contractual-obligations"

interface CommonControlFrameworkSectionProps {
  selectedItems: Record<string, boolean>;
  onRequirementClick: (requirement: CCFRequirement) => void;
}

export function CommonControlFrameworkSection({ selectedItems, onRequirementClick }: CommonControlFrameworkSectionProps) {
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [selectedControls, setSelectedControls] = useState<Record<string, boolean>>({})

  // Filter requirements that have at least one selected regulation
  const filteredRequirements = commonControlFrameworkData
    .map(requirement => {
      const filteredRegulations = requirement.associatedRegulations
        .filter(reg => selectedItems[reg.name]);
      
      // Only keep non-compliant instances related to selected frameworks
      const filteredNonCompliantInstances = requirement.nonCompliantInstances
        .filter(instance => 
          filteredRegulations.some(reg => 
            requirement.associatedRegulations.find(r => r.name === reg.name)
          )
        );

      return {
        ...requirement,
        associatedRegulations: filteredRegulations,
        nonCompliantInstances: filteredNonCompliantInstances
      };
    })
    // Only show requirements that have at least one selected regulation
    .filter(requirement => requirement.associatedRegulations.length > 0);

  // Calculate totals using filtered requirements
  const totalActivePolicies = filteredRequirements.reduce((count, req) => 
    count + req.policies.filter(policy => policy.status === 'active').length, 0
  );
  
  const totalSuggestedPolicies = filteredRequirements.reduce((count, req) => 
    count + req.policies.filter(policy => policy.status === 'suggested').length, 0
  );

  const totalNonCompliantSystems = filteredRequirements.reduce((count, req) => 
    count + req.nonCompliantInstances.length, 0
  );

  const totalFrameworks = new Set(
    filteredRequirements.flatMap(req => req.associatedRegulations.map(reg => reg.name))
  ).size;

  const handleSelectAll = () => {
    const allSelected = Object.values(selectedControls).every(v => v)
    const newState = filteredRequirements.reduce((acc, req) => ({
        ...acc,
        [req.id]: !allSelected
    }), {})
    setSelectedControls(newState)
  }

  const handleGenerateReport = () => {
    // Handle report generation
    setShowReportDialog(false)
  }

  const handleObligationClick = (obligation: {
    entity: string;
    type: string;
    category: string;
    summary: string;
    text: string[];
    link: string;
  }) => {
    console.log('Obligation clicked:', obligation);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Common Control Framework</h2>
            <Button
              variant="brand-primary"
              icon="FeatherFileText"
              onClick={() => {
                setSelectedControls(
                  filteredRequirements.reduce((acc, req) => ({
                    ...acc,
                    [req.id]: false
                  }), {})
                )
                setShowReportDialog(true)
              }}
            >
              Generate Assessment Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          
          {/* Policy Status Overview */}
          <div className="mb-8">
            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {totalActivePolicies}
                  </div>
                  <div className="text-sm text-gray-500">Active Policies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {totalSuggestedPolicies}
                  </div>
                  <div className="text-sm text-gray-500">Suggested Policy Updates</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {totalNonCompliantSystems}
                  </div>
                  <div className="text-sm text-gray-500">Non-compliant Systems</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {totalFrameworks}
                  </div>
                  <div className="text-sm text-gray-500">Associated Frameworks</div>
                </div>
              </div>
            </div>
          </div>

          {/* Non-Compliant Requirements
          <div className="mb-8">
            <h3 className="text-md font-semibold mb-4">Non-Compliant Requirements</h3>
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRequirements
                .filter(req => req.nonCompliantInstances.length > 0)
                .map(req => (
                  <Card key={req.id} className="cursor-pointer hover:bg-gray-50" onClick={() => onRequirementClick(req)}>
                    <CardHeader>
                      <CardTitle className="text-base">{req.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Non-compliant instances</span>
                        <span className="text-lg font-bold text-red-600">
                          {req.nonCompliantInstances.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div> */}


          {/* Requirements List */}
          <div className="mb-8">
            {/* <h3 className="text-md font-semibold mb-4">Common Control Requirements</h3> */}
            <div className="space-y-4">
              {filteredRequirements.map((requirement) => (
                <Card key={requirement.id} className="cursor-pointer hover:bg-muted/50" onClick={() => onRequirementClick(requirement)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      {/* Left side - Title and Summary */}
                      <div className="space-y-1">
                        <CardTitle className="text-xl font-semibold">
                          {requirement.name}
                        </CardTitle>
                        <p className="text-sm text-gray-500">{requirement.summary}</p>
                      </div>

                      {/* Right side - Obligation Badges */}
                      <div className="flex flex-col gap-2">
                        {/* Framework Obligation Derivatives */}
                        <div className="flex justify-end">
                          {/* <span className="text-sm text-gray-500">Frameworks: </span> */}
                          <div className="flex flex-wrap gap-2 justify-end">
                            {requirement.associatedRegulations.slice(0, 3).map(reg => {
                              const frameworkData = frameworkAlignmentData.find(f => f.name === reg.name);
                              const color = frameworkData?.color || 'hsl(var(--chart-1))';
                              return (
                                <span key={reg.name} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-gray-100">
                                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}/>
                                  {reg.name}
                                </span>
                              );
                            })}
                            {requirement.associatedRegulations.length > 3 && (
                              <span className="text-xs text-gray-500">+{requirement.associatedRegulations.length - 3} more</span>
                            )}
                          </div>
                        </div>

                        {/* Contractual Obligation Badges */}
                        <div className="flex justify-end">
                        {/* <span className="text-sm text-gray-500">Contractual: </span> */}
                          <div className="flex flex-wrap gap-2 justify-end">
                            {requirement.associatedContractualObligations?.slice(0, 3).map((obligation, idx) => (
                              obligation && (
                                <span 
                                  key={idx}
                                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-gray-100 cursor-pointer hover:bg-gray-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleObligationClick(obligation);
                                  }}
                                >
                                  <div className="w-2 h-2 rounded-full bg-green-500"/>
                                  {obligation.entity}
                                </span>
                              )
                            ))}
                            {requirement.associatedContractualObligations?.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{requirement.associatedContractualObligations.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>

                    {/* Two-column Grid */}
                    <div className="grid grid-cols-2 gap-4 relative">
                      {/* Left Side */}
                      <div>
                        {/* Active Policies */}
                        <div className="text-sm mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Active Policies</span>
                            <span className="text-lg font-bold">
                              {requirement.policies.filter(p => p.status === 'active').length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {requirement.policies
                              .filter(p => p.status === 'active')
                              .slice(0, 3)
                              .map(policy => (
                                <span 
                                  key={policy.id} 
                                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-gray-100"
                                >
                                  <div className="w-2 h-2 rounded-full bg-green-600" />
                                  {policy.name}
                                </span>
                              ))}
                            {requirement.policies.filter(p => p.status === 'active').length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{requirement.policies.filter(p => p.status === 'active').length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Suggested Policy Updates */}
                        <div className="text-sm">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">Suggested Policy Updates</span>
                            <span className="text-lg font-bold">
                              {requirement.policies.filter(p => p.status === 'suggested').length}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {requirement.policies
                              .filter(p => p.status === 'suggested')
                              .slice(0, 3)
                              .map(policy => (
                                <span 
                                  key={policy.id} 
                                  className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-gray-100"
                                >
                                  <div className="w-2 h-2 rounded-full bg-yellow-600" />
                                  {policy.name}
                                </span>
                              ))}
                            {requirement.policies.filter(p => p.status === 'suggested').length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{requirement.policies.filter(p => p.status === 'suggested').length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Vertical Divider */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

                      {/* Right Side */}
                      <div className="pl-4">
                        {/* Top Right - Tools */}
                        <div className="text-sm mb-4">
                          {requirement.supportingEvidence?.configurations && (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Security Tools & Controls</span>
                                <span className="text-lg font-bold">
                                  {requirement.supportingEvidence.configurations.length}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {requirement.supportingEvidence.configurations.slice(0, 3).map((config, idx) => (
                                  <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100">
                                    {config.tool}
                                  </span>
                                ))}
                                {requirement.supportingEvidence.configurations.length > 3 && (
                                  <span className="text-xs text-gray-500">+{requirement.supportingEvidence.configurations.length - 3} more</span>
                                )}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Bottom Right - Non-compliant */}
                        <div className="text-sm">
                          {requirement.nonCompliantInstances.length > 0 && (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500">Non-Compliant Instances</span>
                                <span className="text-lg font-bold text-red-600">
                                  {requirement.nonCompliantInstances.length}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {requirement.nonCompliantInstances.slice(0, 3).map((instance, idx) => (
                                  <span key={idx} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100">
                                    {instance.system.name}
                                  </span>
                                ))}
                                {requirement.nonCompliantInstances.length > 3 && (
                                  <span className="text-xs text-gray-500">+{requirement.nonCompliantInstances.length - 3} more</span>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Generate Assessment Report</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">Select Control Obligations</h4>
              <Button
                variant="brand-secondary"
                size="small"
                onClick={handleSelectAll}
              >
                {Object.values(selectedControls).every(v => v) ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {filteredRequirements.map(req => (
                <div key={req.id} className="flex items-start space-x-3">
                  <Checkbox
                    id={req.id}
                    checked={selectedControls[req.id]}
                    onCheckedChange={(checked) => {
                      setSelectedControls(prev => ({
                        ...prev,
                        [req.id]: checked === true
                      }))
                    }}
                  />
                  <label
                    htmlFor={req.id}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    <div className="font-medium">{req.name}</div>
                    <div className="text-muted-foreground text-xs mt-1">{req.summary}</div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="brand-secondary"
              onClick={() => setShowReportDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="brand-primary"
              onClick={handleGenerateReport}
              disabled={!Object.values(selectedControls).some(v => v)}
            >
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 