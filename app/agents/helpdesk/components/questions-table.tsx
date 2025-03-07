'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/subframe/components/Button"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, MessageSquare, Mail, Ticket, Phone, Fish, ArrowUpDown, NotebookPen, Code, Mic} from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion } from "@/subframe/components/Accordion";
import { ScrollArea } from "@/components/ui/scroll-area"
import { outstandingQuestions, resolvedQuestions, OutstandingQuestion, ResolvedQuestion } from '../data/questions-data'

interface ConfirmedAssociations {
  [questionId: number]: {
    [docName: string]: boolean;
  };
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export function QuestionsTable() {
  const [showResolved, setShowResolved] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<OutstandingQuestion | ResolvedQuestion | null>(null)
  const [response, setResponse] = useState('')
  const [confirmedAssociations, setConfirmedAssociations] = useState<ConfirmedAssociations>({})
  const [selectedTriage, setSelectedTriage] = useState<string>('')
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [isTeamExpanded, setIsTeamExpanded] = useState(false)
  const [isContactExpanded, setIsContactExpanded] = useState(false)

  const questions = showResolved ? resolvedQuestions : outstandingQuestions

  const handleUseResponse = () => {
    if (selectedQuestion && 'suggestedResponse' in selectedQuestion) {
      setResponse(selectedQuestion.suggestedResponse.map(section => section.text).join('\n'))
    }
  }

  const handleModifyResponse = () => {
    if (selectedQuestion && 'suggestedResponse' in selectedQuestion) {
      setResponse(selectedQuestion.suggestedResponse.map(section => section.text).join('\n'))
    }
  }

  const handleConfirmAssociation = (questionId: number, docName: string, isAssociated: boolean) => {
    setConfirmedAssociations(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        [docName]: isAssociated
      }
    }))
    // Here you would typically send this information back to your AI model or backend
    console.log(`Document "${docName}" is ${isAssociated ? '' : 'not '}associated with question ${questionId}`)
  }

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Slack #ask-security channel':
        return <MessageSquare className="h-4 w-4 mr-2" />
      case 'Slack #mobile-engineering channel':
        return <MessageSquare className="h-4 w-4 mr-2" />
      case 'Email to security-helpdesk alias':
        return <Mail className="h-4 w-4 mr-2" />  
      case 'Security review ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Zendesk ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Phishing report button':
        return <Fish className="h-4 w-4 mr-2" />
      case 'Emergency hotline':
        return <Phone className="h-4 w-4 mr-2" />
      case 'Architecture Review Meeting':
        return <Mic className="h-4 w-4 mr-2" />
      case 'DevSecOps Planning Meeting':
        return <Mic className="h-4 w-4 mr-2" />
      case 'Architecture Review Ticket':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Code Review':
        return <Code className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  const getSLAStatus = (question: OutstandingQuestion) => {
    const due = new Date(question.dueDate)
    const now = new Date()
    const diffHours = (due.getTime() - now.getTime()) / (1000 * 60 * 60)
    
    const slaHours = {
      urgent: 72,
      high: 150,
      medium: 300,
      low: 720
    }
    
    const triage = question.triage || 'medium'
    const targetHours = slaHours[triage as keyof typeof slaHours]
    
    return {
      hours: targetHours,
      onTrack: diffHours > 0,
      remaining: Math.abs(Math.round(diffHours))
    }
  }

  const sortQuestions = (questions: (OutstandingQuestion | ResolvedQuestion)[]) => {
    if (!sortConfig) return questions

    return [...questions].sort((a, b) => {
      if (sortConfig.key === 'triage') {
        const triageOrder = {
          urgent: 0,
          high: 1,
          medium: 2,
          low: 3
        }
        const aValue = triageOrder[a.triage as keyof typeof triageOrder] ?? 4
        const bValue = triageOrder[b.triage as keyof typeof triageOrder] ?? 4
        
        return sortConfig.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue
      }

      if (sortConfig.key === 'slaStatus' && !showResolved) {
        const aStatus = getSLAStatus(a as OutstandingQuestion)
        const bStatus = getSLAStatus(b as OutstandingQuestion)
        
        // Sort by on track first, then by remaining hours
        if (aStatus.onTrack !== bStatus.onTrack) {
          return sortConfig.direction === 'asc'
            ? (aStatus.onTrack ? -1 : 1)
            : (aStatus.onTrack ? 1 : -1)
        }
        
        return sortConfig.direction === 'asc'
          ? aStatus.remaining - bStatus.remaining
          : bStatus.remaining - aStatus.remaining
      }

      const aValue = a[sortConfig.key as keyof typeof a]
      const bValue = b[sortConfig.key as keyof typeof b]

      if (aValue === bValue) return 0
      
      if (sortConfig.direction === 'asc') {
        return (aValue ?? '') < (bValue ?? '') ? -1 : 1
      } else {
        return (aValue ?? '') > (bValue ?? '') ? -1 : 1
      }
    })
  }

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }

  const filterQuestions = (questions: (OutstandingQuestion | ResolvedQuestion)[]) => {
    if (!selectedTriage) return questions
    return questions.filter(q => q.triage === selectedTriage)
  }

  const filteredQuestions = filterQuestions(questions)
  const sortedQuestions = sortQuestions(filteredQuestions)

  return (
    <div className="space-y-4 w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Requests for Assistance</h2>
        < div className="flex grow shrink-0 basis-0 items-center justify-end gap-2" >
              <Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "brand-secondary" : "neutral-secondary"}
                icon={!showResolved ? "FeatherCheck" : undefined}
                onClick={() => setShowResolved(false)}
              >
                Oustanding
              </Button>
              < Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "neutral-secondary" : "brand-secondary"}
                icon={!showResolved ? undefined : "FeatherCheck"}
                onClick={() => setShowResolved(true)}
              >
                Resolved
              </Button>
            </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead onClick={() => handleSort('question')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Question</span>
                {sortConfig?.key === 'question' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('user')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>User</span>
                {sortConfig?.key === 'user' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('stage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Type</span>
                {sortConfig?.key === 'stage' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('triage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Triage</span>
                {sortConfig?.key === 'triage' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            {!showResolved && (
              <TableHead onClick={() => handleSort('slaStatus')} className="cursor-pointer hover:bg-muted">
                <div className="flex items-center space-x-1">
                  <span>SLA Status</span>
                  {sortConfig?.key === 'slaStatus' && (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </div>
              </TableHead>
            )}
            <TableHead 
              onClick={() => handleSort(showResolved ? 'resolvedDate' : 'dueDate')} 
              className="cursor-pointer hover:bg-muted"
            >
              <div className="flex items-center space-x-1">
                <span>{showResolved ? 'Resolved Date' : 'Due By'}</span>
                {sortConfig?.key === (showResolved ? 'resolvedDate' : 'dueDate') && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('source')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Source</span>
                {sortConfig?.key === 'source' && (
                  <ArrowUpDown className="h-4 w-4" />
                )}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedQuestions.map((question) => (
            <TableRow key={question.id} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedQuestion(question)}>
              <TableCell>{question.question}</TableCell>
              <TableCell>{question.user}</TableCell>
              <TableCell>{question.stage}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100`}>
                  <div className={`w-2 h-2 rounded-full ${
                    question.triage === 'urgent' ? 'bg-red-500' :
                    question.triage === 'high' ? 'bg-orange-500' :
                    question.triage === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`} />
                  {question.triage || 'medium'}
                </span>
              </TableCell>
              {!showResolved && 'dueDate' in question && (
                <TableCell>
                  {(() => {
                    const status = getSLAStatus(question as OutstandingQuestion)
                    return (
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${status.onTrack ? 'text-green-600' : 'text-red-600'}`}>
                          {status.onTrack ? '✓' : '⚠'}
                        </span>
                        <span className="text-sm text-gray-600">
                          {status.onTrack ? 
                            `${status.remaining}hrs left` : 
                            `${status.remaining}hrs over`
                          }
                        </span>
                      </div>
                    )
                  })()}
                </TableCell>
              )}
              <TableCell>
                {'resolvedDate' in question ? question.resolvedDate : question.dueDate}
              </TableCell>
              <TableCell className="flex items-center">
                {getSourceIcon(question.source)}
                {question.source}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedQuestion && (
        <Sheet open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
          <SheetContent 
            style={{ maxWidth: 'min(50vw, 800px)' }} 
            className="w-full flex flex-col h-full"
            side="right"
          >
            <SheetHeader>
              <SheetTitle>{selectedQuestion.question}</SheetTitle>
            </SheetHeader>

            <ScrollArea className="flex-1 -mx-6 px-6">
            {'aiSummary' in selectedQuestion && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-blue-700">AI Summary</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    {selectedQuestion.aiSummary}
                  </p>
                </div>
              )}
              {'aiNextSteps' in selectedQuestion && selectedQuestion.aiNextSteps && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedQuestion.aiNextSteps.map((step, index) => (
                    <Button
                      key={index}
                      variant="brand-secondary"
                      size="small"
                      className="h-8"
                      icon="FeatherSparkles"
                      onClick={() => {/* Handle AI action */}}
                    >
                        {step}
                    </Button>
                  ))}
                </div>
              )}
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Submitted by:</Label>
                  <span className="col-span-3">{selectedQuestion.user}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Stage:</Label>
                  <span className="col-span-3">{selectedQuestion.stage}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">{showResolved ? 'Resolved on:' : 'Due by:'}</Label>
                  <span className="col-span-3">
                    {showResolved ? 
                      ('resolvedDate' in selectedQuestion ? selectedQuestion.resolvedDate : '') : 
                      ('dueDate' in selectedQuestion ? selectedQuestion.dueDate : '')}
                  </span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Source:</Label>
                  <div className="col-span-3 flex items-center">
                    {getSourceIcon(selectedQuestion.source)}
                    <a href={selectedQuestion.sourceLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                      {selectedQuestion.source}
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </div>
                {!showResolved && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Triage Level:</Label>
                      <div className="col-span-3">
                        <Select 
                          value={selectedTriage || (selectedQuestion?.triage || 'medium')} 
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
                    {!showResolved && 'dueDate' in selectedQuestion && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">SLA Status:</Label>
                        <div className="col-span-3">
                          {(() => {
                            const status = getSLAStatus(selectedQuestion as OutstandingQuestion)
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
                    <div className="border-t pt-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-semibold self-start pt-1">Policy Owner:</Label>
                        <div className="col-span-3 space-y-4">
                          <div className="space-y-2">
                            <div>
                              <div className="flex items-center gap-4">
                                  <label className="text-sm font-semibold text-gray-600">Team</label>
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100`}>
                                    <div className={`w-2 h-2 rounded-full ${
                                      selectedQuestion.policyOwner.teamConfidence.level === 'high' ? 'bg-green-500' :
                                      selectedQuestion.policyOwner.teamConfidence.level === 'medium' ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`} />
                                    {selectedQuestion.policyOwner.teamConfidence.level} confidence
                                  </span>
                              </div>
                              <p>
                                {selectedQuestion.policyOwner.team} (
                                <a href={`mailto:${selectedQuestion.policyOwner.teamEmail}`} className="text-blue-600 hover:underline">
                                  {selectedQuestion.policyOwner.teamEmail}
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
                                          {selectedQuestion.policyOwner.teamConfidence.reasons.map((reason, i) => (
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
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100`}>
                                    <div className={`w-2 h-2 rounded-full ${
                                      selectedQuestion.policyOwner.contactConfidence.level === 'high' ? 'bg-green-500' :
                                      selectedQuestion.policyOwner.contactConfidence.level === 'medium' ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`} />
                                    {selectedQuestion.policyOwner.contactConfidence.level} confidence
                                  </span>
                              </div>
                              <p>
                                {selectedQuestion.policyOwner.contact} (
                                <a href={`mailto:${selectedQuestion.policyOwner.email}`} className="text-blue-600 hover:underline">
                                  {selectedQuestion.policyOwner.email}
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
                                          {selectedQuestion.policyOwner.contactConfidence.reasons.map((reason, i) => (
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
                                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100`}>
                                    <div className={`w-2 h-2 rounded-full ${
                                      selectedQuestion.policyOwner.signOffStatus === 'Yes' ? 'bg-green-500' :
                                      selectedQuestion.policyOwner.signOffStatus === 'No' ? 'bg-red-500' :
                                      selectedQuestion.policyOwner.signOffStatus === 'Pending' ? 'bg-yellow-500' :
                                      'bg-gray-500'
                                    }`} />
                                    {selectedQuestion.policyOwner.signOffStatus || 'Pending'}
                                  </span>
                              </div>
                              <div className="col-span-3 flex items-center gap-2">
                                  <Button
                                      variant="brand-secondary"
                                      disabled={selectedQuestion.policyOwner.signOffStatus === 'Yes'}
                                      onClick={() => {
                                          // Add your request sign off logic here
                                          console.log('Requesting sign off');
                                      }}
                                      >
                                      Request Sign Off
                                      </Button>
                                      <Button
                                      variant="neutral-secondary"
                                      disabled={selectedQuestion.policyOwner.signOffStatus === 'N/A'}
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
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right font-semibold self-start pt-1">Suggested Response:</Label>
                      <div className="col-span-3 space-y-4">
                        {'suggestedResponse' in selectedQuestion && (
                          <>
                            {selectedQuestion.suggestedResponse.map((section, index) => (
                              <div key={index} className="space-y-2">
                                <p className="text-sm text-gray-700">{section.text}</p>
                                <div className="flex gap-2">
                                  {section.supportingDocs.map((doc, docIndex) => (
                                    <a 
                                      key={docIndex}
                                      href={doc.link} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="text-xs text-blue-500 hover:underline flex items-center bg-blue-50 px-2 py-1 rounded"
                                    >
                                      <span>{doc.name}</span>
                                      <ExternalLink className="h-3 w-3 ml-1" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            ))}
                            <div className="flex space-x-2 mt-4">
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
                        {'suggestedResponse' in selectedQuestion && selectedQuestion.suggestedResponse.map((section, index) => (
                          <div key={index} className="flex items-center space-x-2 mb-2">
                            <a href={section.supportingDocs[0].link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                              {section.supportingDocs[0].name}
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right self-start pt-1">
                        <span className="font-semibold">Other Content:</span>
                        <span className="block text-sm text-gray-500">This content may be related, but was not used. Should it be referenced for topics like this in the future?</span>
                      </Label>
                      <div className="col-span-3">
                        {('otherDocs' in selectedQuestion && selectedQuestion.otherDocs?.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between mb-2">
                            <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center">
                              {doc.name}
                              <ExternalLink className="h-4 w-4 ml-1" />
                            </a>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="small"
                                icon="FeatherCheck"
                                variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === true ? "brand-primary" : "brand-secondary"}
                                onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, true)}
                              >
                              </Button>
                              <Button
                                size="small"
                                icon="FeatherX"
                                variant={confirmedAssociations[selectedQuestion.id]?.[doc.name] === false ? "brand-primary" : "brand-secondary"}
                                onClick={() => handleConfirmAssociation(selectedQuestion.id, doc.name, false)}
                              >
                              </Button>
                            </div>
                          </div>
                        )))}
                      </div>
                    </div>
                  </>
                )}
                {showResolved ? (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Response:</Label>
                      <span className="col-span-3">{'response' in selectedQuestion ? selectedQuestion.response : ''}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Decision:</Label>
                      <span className="col-span-3">{'decision' in selectedQuestion ? selectedQuestion.decision : ''}</span>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Documentation:</Label>
                      {'documentationLink' in selectedQuestion && (
                        <a href={selectedQuestion.documentationLink} className="col-span-3 text-blue-500 hover:underline flex items-center">
                          {selectedQuestion.documentationLink}
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
                  </div>
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="border-t pt-4 mt-4">
              <div className="flex justify-end gap-4">
                <Button
                  variant="neutral-secondary"
                  onClick={() => setSelectedQuestion(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="brand-primary"
                  onClick={() => {
                    console.log('Approving question:', selectedQuestion?.id);
                    setSelectedQuestion(null);
                  }}
                >
                  Post Response to Source
                </Button>
              </div>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
