import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { commonControlFrameworkData, CCFRequirement } from '../data/common-control-framework'
import { useState } from 'react'
import { ArticleDetailView } from './article-detail-view'
import { Button } from "@/subframe/components/Button"
import { FileText, FolderSearch } from "lucide-react"

function mapRequirementToArticle(requirement: typeof commonControlFrameworkData[0]): any {
  return {
    id: requirement.id,
    name: requirement.name,
    text: requirement.summary,
    type: 'ccf',
    policies: requirement.policies,
    impactedSystems: requirement.impactedSystems,
    nonCompliantInstances: requirement.nonCompliantInstances,
    supportingEvidence: requirement.supportingEvidence
  };
}

export function CCFDetailView({ requirement }: { requirement: CCFRequirement | null }) {
  const [selectedRequirement, setSelectedRequirement] = useState<CCFRequirement | null>(null);
  const currentRequirement = requirement || commonControlFrameworkData[0];

  const teamNonComplianceData = currentRequirement.nonCompliantInstances.reduce((acc: { team: string, count: number }[], instance) => {
    const team = instance.system.team;
    const existingTeam = acc.find(item => item.team === team);
    
    if (existingTeam) {
      existingTeam.count++;
    } else {
      acc.push({ team, count: 1 });
    }
    
    return acc;
  }, []);

  if (selectedRequirement) {
    return (
      <ArticleDetailView 
        article={mapRequirementToArticle(selectedRequirement)} 
        onClose={() => setSelectedRequirement(null)}
      />
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)]">
      <div className="flex items-center space-x-4 flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold">{currentRequirement.name}</h2>
          <p className="text-sm text-gray-500">ID: {currentRequirement.id}</p>
        </div>
      </div>

      <ScrollArea className="flex-1 mt-8">
        <div className="space-y-6 pr-6">

          {/* Non-Compliance by Team */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Non-Compliance by Team</h3>
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {teamNonComplianceData.map(item => (
                    <div 
                    key={item.team} 
                    className="text-center cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedRequirement(currentRequirement)}
                    >
                      <div className="text-2xl font-bold text-red-600">{item.count}</div>
                      <div className="text-sm text-gray-500">{item.team}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Associated Regulations & Frameworks */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Associated Regulations & Frameworks</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
              {currentRequirement.associatedRegulations.map(reg => (
                <div 
                  key={reg.name}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedRequirement(currentRequirement)}
                >
                  <h4 className="font-semibold">{reg.name}</h4>
                  <p className="text-sm text-gray-600">{reg.summary}</p>
                  <a href={reg.link} className="text-sm text-blue-600 hover:underline">View Obligations</a>
                </div>
              ))}
            </div>
          </div>

          {/* Contractual Obligations */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Contractual Obligations</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
              {currentRequirement.associatedContractualObligations.map((obligation, idx) => (
                <div 
                  key={`${obligation.entity}-${idx}`}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedRequirement(currentRequirement)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{obligation.entity}</h4>
                    <span className="text-sm text-muted-foreground">{obligation.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{obligation.summary}</p>
                  <div className="space-y-1">
                    {obligation.text.map((item, i) => (
                      <p key={i} className="text-sm text-gray-500">• {item}</p>
                    ))}
                  </div>
                  <a href={obligation.link} className="text-sm text-blue-600 hover:underline mt-2 inline-block">
                    View Contract Details
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Organization Policies */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Organization Policies</h3>
            <div className="space-y-4">
              {currentRequirement.policies.map((policy) => (
                <div 
                  key={policy.id}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedRequirement(currentRequirement)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{policy.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{policy.id}</span>
                      {policy.status === 'suggested' && (
                        <span className="text-sm text-yellow-600">(Suggested Update)</span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{policy.description}</p>
                  <p className="text-sm text-gray-700 mb-2">{policy.policyText}</p>
                  {currentRequirement.associatedRegulations.length <= 3 && (
                    <p className="text-sm text-gray-600 mb-2">
                      This policy is applicable for the {
                        currentRequirement.associatedRegulations.length === 1 
                          ? `${currentRequirement.associatedRegulations[0].name} regulation`
                          : currentRequirement.associatedRegulations.length === 2
                            ? `${currentRequirement.associatedRegulations[0].name} and ${currentRequirement.associatedRegulations[1].name} regulations`
                            : `${currentRequirement.associatedRegulations[0].name}, ${currentRequirement.associatedRegulations[1].name}, and ${currentRequirement.associatedRegulations[2].name} regulations`
                      }.
                    </p>
                  )}
                  <a 
                    href={policy.link}
                    className="text-sm text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Policy Document
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Security Tools */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Security Tools</h3>
            <div className="grid grid-cols-2 gap-4">
              {currentRequirement.supportingEvidence?.configurations.map((config) => (
                <div 
                  key={config.tool}
                  className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => setSelectedRequirement(currentRequirement)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{config.tool}</h4>
                    <span className="text-sm text-muted-foreground">{config.type}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-1">
                      {config.evidence.settings.map((setting, index) => (
                        <div key={index} className="text-sm">
                          <span className="text-gray-500">{setting.name}:</span>{' '}
                          <span className="text-gray-700">{setting.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Last Updated: {config.evidence.lastUpdated} (v{config.evidence.version})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="flex justify-end gap-4 p-6">
        <Button variant="brand-primary" icon="FeatherFolderSearch" onClick={() => setSelectedRequirement(currentRequirement)}>
          Collect Supporting Evidence
        </Button>
        <Button variant="brand-primary" icon="FeatherFile" onClick={() => console.log('Generate Report')}>
          Generate Report
        </Button>
      </div>
    </div>
  );
} 