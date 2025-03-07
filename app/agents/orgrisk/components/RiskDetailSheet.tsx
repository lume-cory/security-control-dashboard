import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/subframe/components/Button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, TrendingDown, Minus, MessageSquare, AlertCircle, Send, Bell } from 'lucide-react'
import { Risk } from "../data/risk-data"
import { dataSources } from "../data/data-sources"

interface RiskDetailSheetProps {
  risk: Risk | null
  onClose: () => void
}

interface OwnerUpdateSuggestion {
  currentOwner: string;
  suggestedOwner: string;
  reason: string;
  supportingDataSources: string[];
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'NO_RESPONSE';
  suggestedDate: string;
  lastFollowUp?: string;
}

interface EnhancedDataSource extends Omit<typeof dataSources[0], 'link'> {
  link?: string;
}

// Add this function to find the data source by ID
function getDataSourceById(id: string): EnhancedDataSource | undefined {
  return dataSources.find(source => source.id === id) as EnhancedDataSource;
}

export function RiskDetailSheet({ risk, onClose }: RiskDetailSheetProps) {
  if (!risk) return null

  const getTrendIcon = (trend: 'INCREASING' | 'DECREASING' | 'STABLE') => {
    switch (trend) {
      case 'INCREASING':
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'DECREASING':
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case 'STABLE':
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getOwnerUpdateStatus = (status: OwnerUpdateSuggestion['status']) => {
    switch (status) {
      case 'PENDING':
        return <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">Pending Review</span>
      case 'APPROVED':
        return <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">Approved</span>
      case 'REJECTED':
        return <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">Rejected</span>
      case 'NO_RESPONSE':
        return <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">No Response</span>
    }
  }

  // Mock data - in real app this would come from your data source
  const ownerUpdateSuggestion: OwnerUpdateSuggestion = {
    currentOwner: "Sarah Chen",
    suggestedOwner: "Michael Rodriguez",
    reason: "Based on recent IoT security initiatives and team restructuring",
    supportingDataSources: ["DS-001", "DS-008", "DS-009"],
    status: "NO_RESPONSE",
    suggestedDate: new Date().toISOString(),
  }

  return (
    <Sheet open={!!risk} onOpenChange={() => onClose()}>
      <SheetContent 
        style={{ maxWidth: 'min(50vw, 800px)' }} 
        className="w-full flex flex-col h-full"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>{risk.category}</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 -mx-6 px-6">
          {/* AI Summary */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-semibold text-blue-700">AI Risk Analysis</span>
            </div>
            <p className="text-sm text-blue-700">
              {risk.aiSummary}
            </p>
          </div>

          {/* Risk Details */}
          <div className="grid gap-4 py-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                <div className={`w-2 h-2 rounded-full ${
                  risk.severity === 'CRITICAL' ? 'bg-red-500' :
                  risk.severity === 'HIGH' ? 'bg-orange-500' :
                  risk.severity === 'MEDIUM' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`} />
                {risk.severity}
              </span>
              {getTrendIcon(risk.trend)}
            </div>

            <div className="space-y-4">
              <p className="text-sm">{risk.description}</p>

              {/* Owner Information */}
              <div>
                <h3 className="text-sm font-bold mb-2">Risk Owner</h3>
                <div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-muted-foreground text-xs">Current Owner</p>
                      <p className="text-sm">{risk.owner.name}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Team</p>
                      <p className="text-sm">{risk.owner.team}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Email</p>
                      <p className="text-sm">{risk.owner.email}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Slack</p>
                      <p className="text-sm">{risk.owner.slack}</p>
                    </div>
                  </div>

                  {risk.ownerUpdateReport && (
                    <>
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold">Owner Update Report</h4>
                            <span className="text-xs text-muted-foreground">
                              Last Update: {new Date(risk.ownerUpdateReport.lastFollowUp).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {risk.ownerUpdateReport.status === 'OPEN' && (
                              <Button
                                variant="brand-secondary"
                                size="small"
                                icon="FeatherSend"
                                onClick={() => {/* Handle send update */}}
                              >
                                Send For Review
                              </Button>
                            )}
                            
                            {risk.ownerUpdateReport.status === 'AWAITING_RESPONSE' && (
                              <Button
                                variant="neutral-primary"
                                size="small"
                                icon="FeatherBell"
                                onClick={() => {/* Handle follow up */}}
                              >
                                Follow Up
                              </Button>
                            )}
                            
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                              <div className={`w-2 h-2 rounded-full ${
                                risk.ownerUpdateReport.status === 'OPEN' ? 'bg-blue-500' :
                                risk.ownerUpdateReport.status === 'AWAITING_RESPONSE' ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`} />
                              {risk.ownerUpdateReport.status}
                            </span>
                          </div>
                        </div>

                        <div className="bg-white border rounded-lg p-4 space-y-4">
                          <div>
                            <p className="text-sm font-bold mb-1">Summary</p>
                            <p className="text-sm text-muted-foreground">{risk.ownerUpdateReport.report.summary}</p>
                          </div>

                          <div>
                            <p className="text-sm font-bold mb-1">Business Context</p>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{risk.ownerUpdateReport.report.businessContext}</p>
                          </div>

                          <div>
                            <p className="text-sm font-bold mb-2">Supporting Evidence</p>
                            <div className="space-y-2">
                              {risk.ownerUpdateReport.report.evidence.map((evidence, index) => (
                                <div key={index} className="bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-start justify-between gap-2">
                                    <div>
                                      <p className="text-sm">{evidence.description}</p>
                                      <p className="text-xs text-muted-foreground mt-1">Relevance: {evidence.relevance}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                                        {evidence.sourceName}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {new Date(evidence.date).toLocaleDateString()}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-bold mb-1">Operational Impact</p>
                              <p className="text-sm text-muted-foreground">{risk.ownerUpdateReport.report.impact.operational}</p>
                            </div>
                            <div>
                              <p className="text-sm font-bold mb-1">Financial Impact</p>
                              <p className="text-sm text-muted-foreground">{risk.ownerUpdateReport.report.impact.financial}</p>
                            </div>
                            <div>
                              <p className="text-sm font-bold mb-1">Strategic Impact</p>
                              <p className="text-sm text-muted-foreground">{risk.ownerUpdateReport.report.impact.strategic}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm font-bold mb-1">Recommendations</p>
                            <div className="space-y-2">
                              <p className="text-sm text-muted-foreground">{risk.ownerUpdateReport.report.recommendations.rationale}</p>
                              <p className="text-sm text-muted-foreground">{risk.ownerUpdateReport.report.recommendations.timeline}</p>
                              <div className="mt-2">
                                <p className="text-sm font-bold mb-1">Next Steps:</p>
                                <ul className="list-disc list-inside text-sm text-muted-foreground">
                                  {risk.ownerUpdateReport.report.recommendations.nextSteps.map((step, index) => (
                                    <li key={index}>{step}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h3 className="text-sm font-bold mb-2">Key Metrics</h3>
                <div className="space-y-3">
                  {risk.metrics.map((metric, index) => {
                    // Get the corresponding data source
                    const dataSource = getDataSourceById(metric.dataSource);
                    
                    return (
                      <div key={index} className="border border-gray-200 p-3 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium ${
                              metric.trend === 'INCREASING' ? 'text-red-600' : 
                              metric.trend === 'DECREASING' ? 'text-green-600' : 
                              'text-gray-600'
                            }`}>
                              {metric.trend} (30d)
                            </span>
                            {getTrendIcon(metric.trend)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex-1 flex items-center justify-between bg-white rounded-md p-2 border">
                            <span className="text-xs text-muted-foreground">Current</span>
                            <span className={`text-sm font-medium ${
                              (metric.name.toLowerCase().includes('violation') && metric.value > metric.target) || 
                              (!metric.name.toLowerCase().includes('violation') && metric.value < metric.target) 
                                ? 'text-red-600' 
                                : 'text-green-600'
                            }`}>
                              {metric.value}
                            </span>
                          </div>
                          
                          <div className="flex-1 flex items-center justify-between bg-white rounded-md p-2 border">
                            <span className="text-xs text-muted-foreground">Target</span>
                            <span className="text-sm font-medium">{metric.target}</span>
                          </div>
                        </div>
                        
                        <div className="mt-3 text-xs text-muted-foreground border-t pt-2">
                          <p className="mb-1.5">{metric.context}</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <div className="flex items-center gap-1">
                              <span className="text-muted-foreground">Source:</span>
                              <a 
                                href={(dataSource as any)?.link || "#"} 
                                className="text-blue-600 hover:underline flex items-center gap-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {dataSource?.name || metric.dataSourceName}
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-blue-100 text-blue-700 whitespace-nowrap">
                                  {metric.dataSource}
                                </span>
                              </a>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                              <span className="text-muted-foreground">Updated:</span>
                              <span>{new Date(dataSource?.lastUpdate || metric.lastUpdated).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          {dataSource?.integrations && dataSource.integrations.length > 0 && (
                            <div className="mt-2 flex items-center gap-1">
                              <span className="text-muted-foreground">Integrations:</span>
                              <div className="flex flex-wrap gap-1">
                                {dataSource.integrations.map(integration => (
                                  <span key={integration} className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                                    {integration}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Mitigation Activities */}
              <div>
                <h3 className="text-sm font-bold mb-2">Mitigation Activities</h3>
                <div className="space-y-3">
                  {risk.mitigationActivities.map((activity, index) => (
                    <div key={index} className="border border-gray-200 p-3 rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-sm font-medium">{activity.description}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Owner: {activity.owner}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          activity.status === 'ON_TRACK' ? 'bg-green-100 text-green-800' :
                          activity.status === 'AT_RISK' ? 'bg-yellow-100 text-yellow-800' :
                          activity.status === 'OFF_TRACK' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`rounded-full h-1.5 ${
                            activity.status === 'ON_TRACK' ? 'bg-green-500' :
                            activity.status === 'AT_RISK' ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${activity.progress}%` }}
                        />
                      </div>
                      
                      <div className="flex justify-between text-xs text-muted-foreground mt-1 mb-2">
                        <span>{activity.progress}% Complete</span>
                        <span>Due: {new Date(activity.dueDate).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="border-t pt-2 flex flex-wrap gap-y-2">
                        <div className="w-full flex items-center justify-between">
                          {activity.ticketId ? (
                            <a 
                              href={activity.ticketLink} 
                              className="text-xs text-blue-600 hover:underline flex items-center gap-1"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded">
                                {activity.ticketSystem} {activity.ticketId}
                              </span>
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">No ticket assigned</span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Updated: {new Date(activity.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                        
                        <div className="w-full flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-muted-foreground">System:</span>
                            <span className="text-xs font-medium">{activity.affectedSystem}</span>
                          </div>
                          
                          {activity.relatedSources && activity.relatedSources.length > 0 && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Related sources:</span>
                              <div className="flex flex-wrap gap-1">
                                {activity.relatedSources.map(sourceId => {
                                  const source = getDataSourceById(sourceId);
                                  return (
                                    <a 
                                      key={sourceId} 
                                      href={(source as any)?.link || "#"}
                                      className="text-xs px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {source?.name || sourceId}
                                    </a>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Recommendations */}
              {risk.aiRecommendations && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-700 mb-2">AI Recommendations</h3>
                  <ul className="space-y-2">
                    {risk.aiRecommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-blue-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-700 mt-1.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        <div className="border-t pt-4 mt-4 flex justify-between">
          <Button
            variant="brand-secondary"
            icon="FeatherSparkles"
            onClick={() => {/* Handle chat */}}
          >
            Ask Org Risk AI Assistant
          </Button>
          <Button
            variant="brand-primary"
            onClick={() => {/* Handle generate report */}}
          >
            Generate Report
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
} 