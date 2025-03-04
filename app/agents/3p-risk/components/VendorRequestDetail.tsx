import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/subframe/components/Button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion } from "@/subframe/components/Accordion"
import { VendorRequest, VendorCompletedRequest } from '../data/vendor-request-data'
import { useState } from 'react'

interface VendorRequestDetailProps {
  request: VendorRequest | VendorCompletedRequest | null;
  showResolved: boolean;
  onClose: () => void;
  setSelectedRequest: React.Dispatch<React.SetStateAction<VendorRequest | VendorCompletedRequest | null>>;
}

const getSLAStatus = (request: VendorRequest | VendorCompletedRequest) => {
  const due = new Date(request.dueDate)
  const now = new Date()
  const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  const slaHours = {
    urgent: 72,
    high: 150,
    medium: 300,
    low: 720
  }
  
  const triage = request.triage || 'medium'
  const targetHours = slaHours[triage as keyof typeof slaHours]
  
  return {
    hours: targetHours,
    onTrack: diffHours > 0,
    remaining: Math.abs(Math.round(diffHours))
  }
}

export function VendorRequestDetail({ request, showResolved, onClose, setSelectedRequest }: VendorRequestDetailProps) {
  const [response, setResponse] = useState('')
  const [selectedTriage, setSelectedTriage] = useState<string>('')
  const [showConversation, setShowConversation] = useState(false)

  const handleUseResponse = () => {
    if (request && 'suggestedResponse' in request) {
      setResponse(request.suggestedResponse)
    }
  }

  const handleModifyResponse = () => {
    if (request && 'suggestedResponse' in request) {
      setResponse(request.suggestedResponse)
    }
  }

  if (!request) return null;

  return (
    <Sheet open={!!request} onOpenChange={onClose}>
          <SheetContent style={{ maxWidth: 'min(50vw, 800px)' }} className="w-full overflow-y-auto" side="right">
            <SheetHeader>
              <SheetTitle>{request.appName}</SheetTitle>
              <SheetDescription>Review and respond to this request to use this vendor</SheetDescription>
            </SheetHeader>

            <ScrollArea className="h-[calc(100vh-180px)] pr-4">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-semibold self-start pt-1">Requested by:</Label>
                  <span className="col-span-3">{request.requestor}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-semibold self-start pt-1">Stage:</Label>
                  <div className="col-span-3">
                    <Select 
                      value={request.stage} 
                      onValueChange={(value: "New Request" | "Requestor Followup" | "Vendor Assessment" | "Pending" | "Approved" | "Denied") => 
                        setSelectedRequest(prev => prev ? {...prev, stage: value} : prev)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New Request">New Request</SelectItem>
                        <SelectItem value="Requestor Followup">Requestor Followup</SelectItem>
                        <SelectItem value="Vendor Assessment">Vendor Assessment</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Approved">Approved</SelectItem>
                        <SelectItem value="Denied">Denied</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-semibold self-start pt-1">Type:</Label>
                  <div className="col-span-3">
                    <Select 
                      value={request.type} 
                      onValueChange={(value: 'New Vendor' | 'New User' | 'Renewal') => 
                        setSelectedRequest(prev => prev ? {...prev, type: value} : prev)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New Vendor">New Vendor</SelectItem>
                        <SelectItem value="New User">New User</SelectItem>
                        <SelectItem value="Renewal">Renewal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-semibold self-start pt-1">Users:</Label>
                  <a href="#" className="col-span-3 text-blue-500 hover:underline" onClick={() => alert(request.users)}>{request.users} users</a>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right font-semibold self-start pt-1">{showResolved ? 'Resolved on:' : 'Due by:'}</Label>
                  <span className="col-span-3">
                    {showResolved ? 
                      ('resolvedDate' in request ? String(request.resolvedDate) : '') : 
                      ('dueDate' in request ? String(request.dueDate) : '')}
                  </span>
                </div>
                {!showResolved && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold self-start pt-1">Triage Level:</Label>
                      <div className="col-span-3">
                        <Select 
                          value={selectedTriage || (request?.triage || 'medium')} 
                          onValueChange={setSelectedTriage}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select triage level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="low">Low</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    {!showResolved && 'dueDate' in request && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold self-start pt-1">SLA Status:</Label>
                        <div className="col-span-3">
                          {(() => {
                            const status = getSLAStatus(request)
                            return (
                              <div className="flex items-center space-x-2">
                                <span className={`font-medium ${status.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                                  {status.onTrack ? '✓ On Track' : '⚠ SLA Missed'}
                                </span>
                                <span className="text-gray-600">
                                  ({status.hours}hr SLA, {status.onTrack ? `${status.remaining}hrs remaining` : `${status.remaining}hrs overdue`})
                                </span>
                              </div>
                            )
                          })()}
                        </div>
                      </div>
                    )}
                    <hr className="border-t border-gray-200 my-4" />
                    <div className="pt-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold self-start pt-1">Request Form:</Label>
                        <div className="col-span-3">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-semibold text-lg">Form Details</h3>
                            <Button 
                              variant="neutral-secondary" 
                              onClick={() => setShowConversation(!showConversation)}
                              className="text-sm"
                            >
                              {showConversation ? "Hide Conversation" : "Show Conversation History"}
                            </Button>
                          </div>
                          
                          {showConversation ? (
                            <div className="border rounded-md p-4 mb-4 bg-gray-50">
                              <h4 className="font-medium mb-3">AI Agent Conversation</h4>
                              <div className="space-y-4 max-h-[800px] overflow-y-auto">
                                {request.conversation && request.conversation.map((msg, index) => (
                                  <div key={index} className={`flex gap-3 ${msg.sender !== 'AI Agent' ? 'justify-end' : ''}`}>
                                    <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'AI Agent' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                                      <p className={`text-sm font-semibold ${msg.sender === 'AI Agent' ? 'text-blue-800' : ''}`}>
                                        {msg.sender}
                                      </p>
                                      <p>{msg.message}</p>
                                      <p className="text-xs text-gray-500 mt-1">
                                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-4">
                              <div>
                                <strong>Overview:</strong>
                                <p>{request.requestForm.overview.appName} - {request.requestForm.overview.reasonForAccess}</p>
                              </div>
                              <div>
                                <strong>Financial:</strong>
                                <p>Cost: ${request.requestForm.financial.cost}</p>
                                <p>Existing License: {request.requestForm.financial.existingLicense ? 'Yes' : 'No'}</p>
                                <p>Manager Approval: {request.requestForm.financial.managerApproval ? 'Yes' : 'No'}</p>
                                <p>Cost Center Approved: {request.requestForm.financial.costCenterApproved ? 'Yes' : 'No'}</p>
                              </div>
                              <div>
                                <strong>Users:</strong>
                                <p>Number of Users: {request.requestForm.users.numberOfUsers}</p>
                                <p>Team Roles: {request.requestForm.users.teamRoles.join(', ')}</p>
                              </div>
                              <div>
                                <strong>Resource:</strong>
                                <p>Access Duration: {request.requestForm.resource.accessDuration}</p>
                              </div>
                              <div>
                                <strong>Security:</strong>
                                <p>Login Method: {request.requestForm.security.loginMethod}</p>
                                <p>Integrations: {request.requestForm.security.integrations.join(', ')}</p>
                                <p>SSO: {request.requestForm.security.sso ? 'Yes' : 'No'}</p>
                                <p>SCIM: {request.requestForm.security.scim ? 'Yes' : 'No'}</p>
                                <p>Data Ingestion: {request.requestForm.security.dataIngestion}</p>
                                <p>Data Type: {request.requestForm.security.dataType}</p>
                                <p>Data Classification: {request.requestForm.security.dataClassification}</p>
                              </div>
                              {request.requestForm.documentation && (
                                <div>
                                  <strong>Documentation:</strong>
                                  <div className="mt-2 space-y-3">
                                    {request.requestForm.documentation.designDocs && request.requestForm.documentation.designDocs.length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-medium text-gray-700">Design Documents</h4>
                                        <ul className="list-disc list-inside pl-2">
                                          {request.requestForm.documentation.designDocs.map((doc, idx) => (
                                            <li key={`design-${idx}`}>
                                              <a href={doc.link} target="_blank" rel="noopener noreferrer" 
                                                 className="text-blue-600 hover:underline flex items-center inline-flex">
                                                {doc.name}
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {request.requestForm.documentation.procurementDocs && request.requestForm.documentation.procurementDocs.length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-medium text-gray-700">Procurement Documents</h4>
                                        <ul className="list-disc list-inside pl-2">
                                          {request.requestForm.documentation.procurementDocs.map((doc, idx) => (
                                            <li key={`proc-${idx}`}>
                                              <a href={doc.link} target="_blank" rel="noopener noreferrer" 
                                                 className="text-blue-600 hover:underline flex items-center inline-flex">
                                                {doc.name}
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {request.requestForm.documentation.assessmentDocs && request.requestForm.documentation.assessmentDocs.length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-medium text-gray-700">Vendor Assessment Resources</h4>
                                        <ul className="list-disc list-inside pl-2">
                                          {request.requestForm.documentation.assessmentDocs.map((doc, idx) => (
                                            <li key={`assess-${idx}`}>
                                              <a href={doc.link} target="_blank" rel="noopener noreferrer" 
                                                 className="text-blue-600 hover:underline flex items-center inline-flex">
                                                {doc.name}
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                    
                                    {request.requestForm.documentation.toolNeedsDocs && request.requestForm.documentation.toolNeedsDocs.length > 0 && (
                                      <div>
                                        <h4 className="text-sm font-medium text-gray-700">Tool Requirements</h4>
                                        <ul className="list-disc list-inside pl-2">
                                          {request.requestForm.documentation.toolNeedsDocs.map((doc, idx) => (
                                            <li key={`needs-${idx}`}>
                                              <a href={doc.link} target="_blank" rel="noopener noreferrer" 
                                                 className="text-blue-600 hover:underline flex items-center inline-flex">
                                                {doc.name}
                                                <ExternalLink className="h-3 w-3 ml-1" />
                                              </a>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 items-center gap-4 mt-4">
                        <Label className="text-right font-semibold self-start pt-1">Follow-up Questions:</Label>
                        <div className="col-span-3">
                          <Textarea
                            placeholder="Ask follow-up questions or request more information..."
                            className="w-full"
                          />
                          <Button type="submit" variant="brand-secondary" className="mt-2">Submit</Button>
                        </div>
                      </div>
                    </div>
                    
                    <hr className="border-t border-gray-200 my-4" />
                    <div className="pt-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold self-start pt-1">Vendor Trust Info:</Label>
                        <div className="col-span-3 space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Compliance Frameworks</h4>
                            {request.trustInfo.compliance.map((framework, idx) => (
                              <div key={idx} className="mb-2">
                                <a href={framework.link} target="_blank" rel="noopener noreferrer" 
                                   className="text-blue-600 hover:underline flex items-center">
                                  {framework.framework} - {framework.status}
                                  <ExternalLink className="h-4 w-4 ml-1" />
                                </a>
                                <span className="text-sm text-gray-500">Last updated: {framework.lastUpdated}</span>
                              </div>
                            ))}
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Data Policies</h4>
                            <div className="space-y-2">
                              <div>
                                <span className="text-sm font-medium">Retention: </span>
                                <a href={request.trustInfo.dataRetention.link} target="_blank" 
                                   rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {request.trustInfo.dataRetention.policy}
                                </a>
                              </div>
                              <div>
                                <span className="text-sm font-medium">Protection: </span>
                                <a href={request.trustInfo.dataProtection.link} target="_blank" 
                                   rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                  {request.trustInfo.dataProtection.policy}
                                </a>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Service Level</h4>
                            <a href={request.trustInfo.uptime.link} target="_blank" 
                               rel="noopener noreferrer" className="text-blue-600 hover:underline">
                              Uptime: {request.trustInfo.uptime.percentage}
                            </a>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Risk Assessment</h4>
                            <Select 
                              value={request.trustInfo.riskLevel} 
                              onValueChange={(value: 'Low' | 'Medium' | 'High' | 'Critical') => 
                                setSelectedRequest(prev => prev ? {...prev, trustInfo: {...prev.trustInfo, riskLevel: value}} : prev)}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select risk level" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Low">Low</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Critical">Critical</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Button
                              variant="brand-secondary"
                              onClick={() => {
                                // Add your security questionnaire generation logic here
                                console.log('Generating security questionnaire');
                              }}
                            >
                              Generate Security Questionnaire
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>                  
                    <div className="border-t pt-4">
                      {request.policyOwner && (
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label className="text-right font-semibold self-start pt-1">Policy Owner:</Label>
                          <div className="col-span-3 space-y-4">
                            <div className="space-y-2">
                              <div>
                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-semibold text-gray-600">Team</label>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    request.policyOwner.teamConfidence.level === 'high' ? 'bg-green-100 text-green-800' :
                                    request.policyOwner.teamConfidence.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                    }`}>
                                    {request.policyOwner.teamConfidence.level} confidence
                                    </span>
                                </div>
                                <p>
                                  {request.policyOwner.team} (
                                  <a href={`mailto:${request.policyOwner.teamEmail}`} className="text-blue-600 hover:underline">
                                    {request.policyOwner.teamEmail}
                                  </a>)
                                </p>
                              </div>
                              <Accordion
                                    trigger={
                                    <div>
                                        <span className="grow shrink-0 basis-0 text-body font-body text-primary">
                                        Why this team?
                                        </span>
                                        <Accordion.Chevron />
                                    </div>
                                    }
                                    defaultOpen={false}
                                    >
                                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-6 pb-6">
                                        <ul className="list-disc list-inside">
                                            {request.policyOwner.teamConfidence.reasons.map((reason, i) => (
                                            <li key={i}>{reason}</li>
                                            ))}
                                        </ul>
                                        <Button
                                            variant="brand-secondary"
                                            onClick={() => null}
                                        >
                                            Update team?
                                        </Button>
                                    </div>
                              </Accordion>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <div className="flex items-center gap-4">
                                    <label className="text-sm font-semibold text-gray-600">Contact</label>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    request.policyOwner.contactConfidence.level === 'high' ? 'bg-green-100 text-green-800' :
                                    request.policyOwner.contactConfidence.level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                    }`}>
                                    {request.policyOwner.contactConfidence.level} confidence
                                    </span>
                                </div>
                                <p>
                                  {request.policyOwner.contact} (
                                  <a href={`mailto:${request.policyOwner.email}`} className="text-blue-600 hover:underline">
                                    {request.policyOwner.email}
                                  </a>)
                                </p>
                              </div>
                              <Accordion
                                    trigger={
                                    <div>
                                        <span className="grow shrink-0 basis-0 text-body font-body text-primary">
                                        Why this contact?
                                        </span>
                                        <Accordion.Chevron />
                                    </div>
                                    }
                                    defaultOpen={false}
                                    >
                                    <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-2 px-6 pb-6">
                                        <ul className="list-disc list-inside">
                                            {request.policyOwner.contactConfidence.reasons.map((reason, i) => (
                                            <li key={i}>{reason}</li>
                                            ))}
                                        </ul>
                                        <Button
                                            variant="brand-secondary"
                                            onClick={() => null}
                                        >
                                            Update contact?
                                        </Button>
                                    </div>
                              </Accordion>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4 mt-4">
                                <div className="col-span-3 flex items-center gap-4">
                                    <label className="text-sm font-semibold text-gray-600">Sign Off Status:</label>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    request.policyOwner.signOffStatus === 'Yes' ? 'bg-green-100 text-green-800' :
                                    request.policyOwner.signOffStatus === 'No' ? 'bg-red-100 text-red-800' :
                                    request.policyOwner.signOffStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-gray-100 text-gray-800'
                                    }`}>
                                    {request.policyOwner.signOffStatus || 'Pending'}
                                    </span>
                                </div>
                                <div className="col-span-3 flex items-center gap-2">
                                    <Button
                                        variant="brand-secondary"
                                        disabled={request.policyOwner.signOffStatus === 'Yes'}
                                        onClick={() => {
                                            // Add your request sign off logic here
                                            console.log('Requesting sign off');
                                        }}
                                        >
                                        Request Sign Off
                                    </Button>
                                    <Button
                                    variant="neutral-secondary"
                                    disabled={request.policyOwner.signOffStatus === 'N/A'}
                                    onClick={() => {
                                        // Add your not needed logic here
                                        console.log('Sign off not needed');
                                    }}
                                    >
                                    Not Required
                                </Button>
                                </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold self-start pt-1">Suggested Response:</Label>
                      <div className="col-span-3 space-y-2">
                        {'suggestedResponse' in request && (
                          <>
                            <p>{request.suggestedResponse}</p>
                            <div className="flex space-x-2">
                              <Button variant="brand-secondary" onClick={handleUseResponse}>Use This Response</Button>
                              <Button variant="neutral-secondary" onClick={handleModifyResponse}>Modify Response</Button>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right self-start pt-1">
                        <span className="font-semibold">Supporting Content:</span>
                        <span className="block text-sm text-gray-500">Content that was referenced to create this response</span>
                      </Label>
                      <div className="col-span-3">
                        {'supportingDocs' in request && request.supportingDocs.map((doc, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                              {doc.name}
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {showResolved ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Response:</Label>
                      <span className="col-span-3">{'response' in request ? String(request.response) : ''}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Decision:</Label>
                      <span className="col-span-3">{typeof request.decision === 'string' ? request.decision : ''}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Documentation:</Label>
                      {'documentationLink' in request && (
                        <a href={String(request.documentationLink)} className="col-span-3 text-blue-500 hover:underline flex items-center">
                          {String(request.documentationLink)}
                          <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="grid gap-2">
                    <Label htmlFor="response" className="font-semibold">Your Response:</Label>
                    <Textarea
                      id="response"
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      placeholder="Enter your response here..."
                    />
                    <Label htmlFor="residualRisk" className="font-semibold">Residual Risk:</Label>
                    <Select
                      value={request.residualRisk} 
                      onValueChange={(value: 'Low' | 'Medium' | 'High') => 
                        setSelectedRequest(prev => prev ? {...prev, residualRisk: value} : prev)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="flex justify-end gap-4 border-t pt-4 mt-4">
              <Button
                variant="neutral-secondary"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </Button>
              <Button
                variant="brand-primary"
                onClick={() => {
                  // Add approval logic here
                  console.log('Approving vendor request:', request?.id);
                  setSelectedRequest(null);
                }}
              >
                Approve Request
              </Button>
            </SheetFooter>
          </SheetContent>
    </Sheet>
  )
} 