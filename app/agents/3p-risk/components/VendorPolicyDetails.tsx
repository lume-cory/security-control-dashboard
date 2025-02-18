import { SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import type { Vendor, ComplianceStatus } from "../data/vendor-data"
import { useState, useMemo } from "react"
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import { Icon } from "@/components/ui/icon"

interface VendorPolicyDetailsProps {
  vendor: Vendor;
  onBack: () => void;
}

interface QueuedAction {
  groupId: string;
  type: 'EXCEPTION_REQUEST' | 'QUESTIONNAIRE';
  status: ComplianceStatus;
  description: string;
}

interface StatusUpdate {
  evidenceId: string;
  responseId?: string;
  newStatus: 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT';
  comment: string;
}

export function VendorPolicyDetails({ vendor, onBack }: VendorPolicyDetailsProps) {
  const [sortByStatus, setSortByStatus] = useState(true);
  const [queuedActions, setQueuedActions] = useState<QueuedAction[]>([]);
  const [expandedEvidence, setExpandedEvidence] = useState<Record<string, boolean>>({});
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([]);

  const sortedRequirements = useMemo(() => {
    const allRequirements = vendor.policyCompliance.flatMap(policy =>
      policy.requirementGroups.map(group => ({
        policyName: policy.policyName,
        policyId: policy.policyId,
        ...group
      }))
    );

    if (sortByStatus) {
      return allRequirements.sort((a, b) => {
        const order = {
          'NOT_MET': 0,
          'NOT_ASSESSED': 1,
          'EXCEPTION': 2,
          'MET': 3,
          'EXCEEDED': 4
        };
        return order[a.status] - order[b.status];
      });
    } else {
      return allRequirements.sort((a, b) => {
        const policyCompare = a.policyId.localeCompare(b.policyId);
        if (policyCompare !== 0) return policyCompare;
        return a.groupId.localeCompare(b.groupId);
      });
    }
  }, [vendor.policyCompliance, sortByStatus]);

  const handleQueueAction = (group: typeof sortedRequirements[0], type: QueuedAction['type']) => {
    setQueuedActions(prev => [...prev, {
      groupId: group.groupId,
      type,
      status: group.status,
      description: group.actionPlan?.description || ''
    }]);
  };

  const hasQueuedExceptions = queuedActions.some(a => a.type === 'EXCEPTION_REQUEST');
  const hasQueuedQuestionnaires = queuedActions.some(a => a.type === 'QUESTIONNAIRE');

  return (
    <>
      <SheetHeader className="flex flex-col gap-4 shrink-0 border-b pb-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="brand-secondary"
            onClick={onBack}
            icon="FeatherArrowLeft"
          >
            Vendor Information
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <SheetTitle>Policy Compliance Details - {vendor.name}</SheetTitle>
          <Button
            variant="brand-secondary"
            onClick={() => setSortByStatus(!sortByStatus)}
            icon={sortByStatus ? "FeatherList" : "FeatherAlertTriangle"}
          >
            {`Sort by ${sortByStatus ? "Policy ID" : "Status"}`}
          </Button>
        </div>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto py-6 space-y-6">
        {sortedRequirements.map(group => (
          <div key={`${group.policyId}-${group.groupId}`} className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-lg font-bold">{group.groupId} - {group.groupName}</p>
                <p className="text-base text-muted-foreground mt-1">{group.policyName} - {group.policyId}</p>
              </div>
              <Badge className="text-base px-3 py-1" variant={
                group.status === 'EXCEEDED' ? 'success' :
                group.status === 'MET' ? 'success' :
                group.status === 'EXCEPTION' ? 'warning' :
                group.status === 'NOT_ASSESSED' ? 'neutral' :
                'error'
              }>
                {group.status}
              </Badge>
            </div>

            {/* Evidence */}
            {group.evidence && (
              <div className="mt-4">
                <p className="text-md font-medium mb-2">Evidence:</p>
                <Accordion type="multiple" className="space-y-2">
                  {group.evidence.map((evidence) => (
                    <AccordionItem 
                      key={evidence.id} 
                      value={evidence.id}
                      className="border rounded-md overflow-hidden"
                    >
                      <AccordionTrigger className="p-3 hover:bg-neutral-50 hover:no-underline">
                        <div className="flex items-center justify-between flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{evidence.name}</span>
                            {evidence.isNew && (
                              <Badge variant="success">New</Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            Collected: {evidence.collectedDate}
                          </span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="p-3">
                        <div className="flex items-start justify-between mb-3">
                          <p className="text-base text-muted-foreground">{evidence.description}</p>
                          {evidence.url && (
                            <a 
                              href={evidence.url} 
                              target="_blank" 
                              className="text-brand-primary text-sm hover:underline ml-4"
                            >
                              View Evidence
                            </a>
                          )}
                        </div>

                        {/* Only show evidence status if there are no responses */}
                        {!evidence.responses && (
                          <div className="mt-2">
                            <div className="flex items-center gap-2">
                              <Select
                                value={evidence.status}
                                onValueChange={(value: 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT') => {
                                  setStatusUpdates(prev => {
                                    const existing = prev.find(u => u.evidenceId === evidence.id);
                                    if (existing) {
                                      return prev.map(u => u.evidenceId === evidence.id ? {...u, newStatus: value} : u);
                                    }
                                    return [...prev, { evidenceId: evidence.id, newStatus: value, comment: '' }];
                                  });
                                }}
                              >
                                <SelectTrigger className="w-[140px] border-none p-0">
                                  <Badge variant={
                                    evidence.status === 'ACCEPTABLE' ? 'success' :
                                    evidence.status === 'NEEDS_REVIEW' ? 'warning' :
                                    'error'
                                  }>
                                    {evidence.status}
                                  </Badge>
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ACCEPTABLE">
                                    <Badge variant="success">ACCEPTABLE</Badge>
                                  </SelectItem>
                                  <SelectItem value="NEEDS_REVIEW">
                                    <Badge variant="warning">NEEDS REVIEW</Badge>
                                  </SelectItem>
                                  <SelectItem value="INSUFFICIENT">
                                    <Badge variant="error">INSUFFICIENT</Badge>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        )}

                        {/* Evidence Responses */}
                        {evidence.responses && (
                          <div className="space-y-2 mt-2">
                            {evidence.responses.map((response, i) => (
                              <div key={i} className="bg-white p-2">
                                <p className="font-bold text-sm">{response.question}</p>
                                <p className="text-sm mt-1">{response.response}</p>
                                <div className="flex items-center justify-between mt-1">
                                  <Select
                                    value={response.status}
                                    onValueChange={(value: 'ACCEPTABLE' | 'NEEDS_REVIEW' | 'INSUFFICIENT') => {
                                      setStatusUpdates(prev => {
                                        const existing = prev.find(u => u.evidenceId === evidence.id && u.responseId === i.toString());
                                        if (existing) {
                                          return prev.map(u => u.evidenceId === evidence.id && u.responseId === i.toString() ? 
                                            {...u, newStatus: value} : u);
                                        }
                                        return [...prev, { 
                                          evidenceId: evidence.id, 
                                          responseId: i.toString(),
                                          newStatus: value, 
                                          comment: '' 
                                        }];
                                      });
                                    }}
                                  >
                                    <SelectTrigger className="w-[140px] border-none p-0">
                                      <Badge className="w-fit" variant={
                                        response.status === 'ACCEPTABLE' ? 'success' :
                                        response.status === 'NEEDS_REVIEW' ? 'warning' :
                                        'error'
                                      }>
                                        {response.status}
                                      </Badge>
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="ACCEPTABLE">
                                        <Badge variant="success">ACCEPTABLE</Badge>
                                      </SelectItem>
                                      <SelectItem value="NEEDS_REVIEW">
                                        <Badge variant="warning">NEEDS REVIEW</Badge>
                                      </SelectItem>
                                      <SelectItem value="INSUFFICIENT">
                                        <Badge variant="error">INSUFFICIENT</Badge>
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            )}

            {/* Gaps */}
            {group.gaps && (
              <div className="mt-4">
                <p className="text-md font-medium text-error mb-2">Gaps:</p>
                <div className="border rounded-md p-3">
                  {group.gaps.map((gap, i) => (
                    <p key={i} className="text-base text-muted-foreground leading-relaxed">• {gap}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Action Plan */}
            {group.actionPlan && (
              <div className="mt-8">
                <p className="text-md font-medium mb-2">Action Plan:</p>
                <div className="border rounded-md p-3">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className="text-base px-3" variant={
                      group.actionPlan.status === 'COMPLETED' ? 'success' :
                      group.actionPlan.status === 'IN_PROGRESS' ? 'warning' : 
                      'error'
                    }>
                      {group.actionPlan.status}
                    </Badge>
                    {group.actionPlan.dueDate !== 'N/A' && (
                      <Badge className="text-base px-3" variant="neutral">
                        {`Last Updated: ${group.actionPlan.lastUpdated}`}
                      </Badge>
                    )}
                  </div>
                  <p className="text-base leading-relaxed">{group.actionPlan.description}</p>
                  
                  {group.actionPlan.status === 'IN_PROGRESS' && (
                    <p className="text-base text-muted-foreground italic mt-3">
                      Request for more information sent to vendor
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons - moved to bottom and shown based on status */}
            {(group.status === 'NOT_MET' || group.status === 'NOT_ASSESSED') && (
              <div className="mt-6 pt-4 border-t">
                <div className="flex gap-3">
                  <Button 
                    variant={queuedActions.some(a => a.groupId === group.groupId && a.type === 'EXCEPTION_REQUEST') 
                      ? "neutral-primary" 
                      : "brand-primary"} 
                    size="medium"
                    onClick={() => handleQueueAction(group, 'EXCEPTION_REQUEST')}
                  >
                    {queuedActions.some(a => a.groupId === group.groupId && a.type === 'EXCEPTION_REQUEST')
                      ? "Exception Request Queued"
                      : "Request Exception"}
                  </Button>
                  <Button 
                    variant={queuedActions.some(a => a.groupId === group.groupId && a.type === 'QUESTIONNAIRE') 
                      ? "neutral-primary" 
                      : "brand-primary"}
                    size="medium"
                    onClick={() => handleQueueAction(group, 'QUESTIONNAIRE')}
                  >
                    {queuedActions.some(a => a.groupId === group.groupId && a.type === 'QUESTIONNAIRE')
                      ? "Added to Questionnaire"
                      : group.actionPlan?.status === 'IN_PROGRESS' ? "Update Questionnaire" : "Add to Questionnaire"}
                  </Button>
                  <Button variant="neutral-primary" size="medium">Add Evidence</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t mt-auto pt-4 px-6 pb-6 bg-white">
          <div className="flex items-center mb-4 gap-2">
            {hasQueuedExceptions && (
              <Badge variant="warning">
                {`${queuedActions.filter(a => a.type === 'EXCEPTION_REQUEST').length} Exception Requests`}
              </Badge>
            )}
            {hasQueuedQuestionnaires && (
              <Badge variant="warning">
                {`${queuedActions.filter(a => a.type === 'QUESTIONNAIRE').length} Questionnaire Items`}
              </Badge>
            )}
          </div>
          <div className="flex gap-3">
            <Button variant="brand-primary">Generate Report</Button>
            <Button 
              variant="brand-primary"
              disabled={!hasQueuedExceptions}
            >
              Send Exception Requests
            </Button>
            <Button 
              variant="brand-primary"
              disabled={!hasQueuedQuestionnaires}
            >
              Generate & Send Questionnaire
            </Button>
          </div>
      </div>
    </>
  )
} 