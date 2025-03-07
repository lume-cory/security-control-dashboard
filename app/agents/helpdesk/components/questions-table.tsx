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
import { RequestDetailView } from './RequestDetailView'

interface ConfirmedAssociations {
  [questionId: number]: {
    [docName: string]: boolean;
  };
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
  priority: number;
}[];

export function QuestionsTable() {
  const [showResolved, setShowResolved] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState<OutstandingQuestion | ResolvedQuestion | null>(null)
  const [response, setResponse] = useState('')
  const [confirmedAssociations, setConfirmedAssociations] = useState<ConfirmedAssociations>({})
  const [selectedTriage, setSelectedTriage] = useState<string>('')
  const [sortConfig, setSortConfig] = useState<SortConfig>([
    { key: 'triage', direction: 'asc', priority: 0 },
    { key: 'slaStatus', direction: 'desc', priority: 1 }
  ])
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

  const getSourceIcon = (sourceTool: string) => {
    switch (sourceTool) {
      case 'Slack':
        return <MessageSquare className="h-4 w-4 mr-2" />
      case 'GitHub':
        return <Code className="h-4 w-4 mr-2" />
      case 'Email':
        return <Mail className="h-4 w-4 mr-2" />  
      case 'Abnormal Security':
        return <Fish className="h-4 w-4 mr-2" />
      case 'Otter.ai':
      case 'Google Meet':
      case 'Microsoft Teams':
        return <Mic className="h-4 w-4 mr-2" />
      case 'Zendesk':
        return <Ticket className="h-4 w-4 mr-2" />
      case 'Emergency Hotline':
        return <Phone className="h-4 w-4 mr-2" />
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

  // Function to format SLA status in days instead of hours
  const formatSLAStatus = (dueDate: string | undefined) => {
    if (!dueDate) return "No due date";
    
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-red-600">⚠</span>
          <span className="text-sm text-red-600">
            {`${Math.abs(diffDays)} days over`}
          </span>
        </div>
      );
    } else if (diffDays === 0) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-yellow-600">⚠</span>
          <span className="text-sm text-yellow-600">
            Due today
          </span>
        </div>
      );
    } else if (diffDays === 1) {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-green-600">✓</span>
          <span className="text-sm text-gray-600">
            Due tomorrow
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-green-600">✓</span>
          <span className="text-sm text-gray-600">
            {`${diffDays} days left`}
          </span>
        </div>
      );
    }
  };

  const sortQuestions = (questions: (OutstandingQuestion | ResolvedQuestion)[]) => {
    if (!sortConfig.length) return questions;

    return [...questions].sort((a, b) => {
      // Sort by each criteria in priority order
      for (const { key, direction } of sortConfig) {
        let comparison = 0;

        if (key === 'triage') {
          const triageOrder = {
            urgent: 0,
            high: 1,
            medium: 2,
            low: 3
          };
          const aValue = triageOrder[a.triage as keyof typeof triageOrder] ?? 4;
          const bValue = triageOrder[b.triage as keyof typeof triageOrder] ?? 4;
          
          comparison = direction === 'asc' 
            ? aValue - bValue 
            : bValue - aValue;
        }
        else if (key === 'slaStatus' && !showResolved) {
          // Get due dates
          const aDueDate = new Date((a as OutstandingQuestion).dueDate);
          const bDueDate = new Date((b as OutstandingQuestion).dueDate);
          const now = new Date();
          
          // Calculate days remaining
          const aDaysRemaining = Math.ceil((aDueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          const bDaysRemaining = Math.ceil((bDueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          
          // First prioritize overdue items (negative days)
          if ((aDaysRemaining < 0) !== (bDaysRemaining < 0)) {
            comparison = aDaysRemaining < 0 ? -1 : 1;
          } else {
            // Then sort by days remaining (ascending = closer due dates first)
            comparison = aDaysRemaining - bDaysRemaining;
          }
          
          // Reverse if direction is desc
          if (direction === 'desc') {
            comparison = -comparison;
          }
        }
        else {
          // Other fields sorting logic remains the same
          const aValue = a[key as keyof typeof a];
          const bValue = b[key as keyof typeof b];

          if (aValue === bValue) {
            comparison = 0;
          } else if (aValue === undefined || bValue === undefined) {
            comparison = aValue === undefined ? 1 : -1;
          } else {
            comparison = direction === 'asc'
              ? (aValue < bValue ? -1 : 1)
              : (aValue > bValue ? -1 : 1);
          }
        }

        if (comparison !== 0) return comparison;
      }

      return 0;
    });
  }

  const handleSort = (key: string) => {
    setSortConfig(current => {
      const existingSort = current.find(sort => sort.key === key);
      
      if (!existingSort) {
        // Add new sort while maintaining others
        return [...current, { key, direction: 'asc', priority: current.length }];
      }

      if (existingSort.direction === 'asc') {
        // Update direction to desc
        return current.map(sort => 
          sort.key === key ? { ...sort, direction: 'desc' } : sort
        );
      }

      // Remove this sort criteria and adjust priorities
      return current
        .filter(sort => sort.key !== key)
        .map((sort, index) => ({ ...sort, priority: index }));
    });
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
            <TableHead onClick={() => handleSort('question')} className="w-[35%] cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Question</span>
                {sortConfig.find(sort => sort.key === 'question') && (
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-xs ml-1">
                      {sortConfig.findIndex(sort => sort.key === 'question') + 1}
                    </span>
                  </div>
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('user')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>User</span>
                {sortConfig.find(sort => sort.key === 'user') && (
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-xs ml-1">
                      {sortConfig.findIndex(sort => sort.key === 'user') + 1}
                    </span>
                  </div>
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('stage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Type</span>
                {sortConfig.find(sort => sort.key === 'stage') && (
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-xs ml-1">
                      {sortConfig.findIndex(sort => sort.key === 'stage') + 1}
                    </span>
                  </div>
                )}
              </div>
            </TableHead>
            <TableHead onClick={() => handleSort('triage')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Triage</span>
                {sortConfig.find(sort => sort.key === 'triage') && (
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-xs ml-1">
                      {sortConfig.findIndex(sort => sort.key === 'triage') + 1}
                    </span>
                  </div>
                )}
              </div>
            </TableHead>
            {!showResolved && (
              <TableHead onClick={() => handleSort('slaStatus')} className="cursor-pointer hover:bg-muted">
                <div className="flex items-center space-x-1">
                  <span>SLA Status</span>
                  {sortConfig.find(sort => sort.key === 'slaStatus') && (
                    <div className="flex items-center">
                      <ArrowUpDown className="h-4 w-4" />
                      <span className="text-xs ml-1">
                        {sortConfig.findIndex(sort => sort.key === 'slaStatus') + 1}
                      </span>
                    </div>
                  )}
                </div>
              </TableHead>
            )}
            {/* <TableHead 
              onClick={() => handleSort(showResolved ? 'resolvedDate' : 'dueDate')} 
              className="cursor-pointer hover:bg-muted"
            >
              <div className="flex items-center space-x-1">
                <span>{showResolved ? 'Resolved Date' : 'Due By'}</span>
                {sortConfig.find(sort => sort.key === (showResolved ? 'resolvedDate' : 'dueDate')) && (
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-xs ml-1">
                      {sortConfig.findIndex(sort => sort.key === (showResolved ? 'resolvedDate' : 'dueDate')) + 1}
                    </span>
                  </div>
                )}
              </div>
            </TableHead> */}
            <TableHead onClick={() => handleSort('source')} className="cursor-pointer hover:bg-muted">
              <div className="flex items-center space-x-1">
                <span>Source</span>
                {sortConfig.find(sort => sort.key === 'source') && (
                  <div className="flex items-center">
                    <ArrowUpDown className="h-4 w-4" />
                    <span className="text-xs ml-1">
                      {sortConfig.findIndex(sort => sort.key === 'source') + 1}
                    </span>
                  </div>
                )}
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedQuestions.map((question) => (
            <TableRow key={question.id} className="cursor-pointer hover:bg-muted" style={{ height: '4rem' }} onClick={() => setSelectedQuestion(question)}>
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
                  {formatSLAStatus(question.dueDate)}
                </TableCell>
              )}
              {/* <TableCell>
                {'resolvedDate' in question ? question.resolvedDate : question.dueDate}
              </TableCell> */}
              <TableCell>
                <div className="flex items-center justify-start h-full min-h-[3rem]">
                  {getSourceIcon(question.sourceTool)}
                  <span className="align-middle">{question.source}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <RequestDetailView 
        selectedQuestion={selectedQuestion}
        setSelectedQuestion={setSelectedQuestion}
        showResolved={showResolved}
        formatSLAStatus={formatSLAStatus}
      />
    </div>
  )
}
