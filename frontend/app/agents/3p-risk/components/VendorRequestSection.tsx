'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/subframe/components/Button"
import { VendorRequest, VendorCompletedRequest, VendorRequests, VendorCompletedRequests } from '../data/vendor-request-data'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { VendorRequestDetail } from './VendorRequestDetail'

interface ConfirmedAssociations {
  [questionId: number]: {
    [docName: string]: boolean;
  };
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export function RequestTable() {
  const [showResolved, setShowResolved] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<VendorRequest | VendorCompletedRequest | null>(null)
  const [response, setResponse] = useState('')
  const [confirmedAssociations, setConfirmedAssociations] = useState<ConfirmedAssociations>({})
  const [selectedTriage, setSelectedTriage] = useState<string>('')
  const [sortConfig, setSortConfig] = useState<SortConfig>(null)
  const [isTeamExpanded, setIsTeamExpanded] = useState(false)
  const [isContactExpanded, setIsContactExpanded] = useState(false)

  const requests = showResolved ? VendorCompletedRequests : VendorRequests

  const handleUseResponse = () => {
    if (selectedRequest && 'suggestedResponse' in selectedRequest) {
      setResponse(selectedRequest.suggestedResponse)
    }
  }

  const handleModifyResponse = () => {
    if (selectedRequest && 'suggestedResponse' in selectedRequest) {
      setResponse(selectedRequest.suggestedResponse)
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

  const sortRequests = (requests: (VendorRequest | VendorCompletedRequest)[]): (VendorRequest | VendorCompletedRequest)[] => {
    if (!sortConfig) return requests

    return [...requests].sort((a, b) => {
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

  const filterRequests = (requests: (VendorRequest | VendorCompletedRequest)[]) => {
    if (!selectedTriage) return requests
    return requests.filter(q => q.triage === selectedTriage)
  }

  const filteredRequests = filterRequests(requests)
  const sortedRequests = sortRequests(filteredRequests)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold">Vendor Requests</h2>
          <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2" >
              <Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "brand-primary" : "brand-secondary"}
                icon={!showResolved ? "FeatherCheck" : undefined}
                onClick={() => setShowResolved(false)}
              >
                Oustanding
              </Button>
              < Button
                className="h-auto w-auto flex-none self-stretch"
                variant={!showResolved ? "brand-secondary" : "brand-primary"}
                icon={!showResolved ? undefined : "FeatherCheck"}
                onClick={() => setShowResolved(true)}
              >
                Resolved
              </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App Name</TableHead>
              <TableHead>Requestor</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>SLA Status</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedRequests.map((request) => (
              <TableRow key={request.id} className="cursor-pointer hover:bg-muted" onClick={() => setSelectedRequest(request)}>
                <TableCell>{request.appName}</TableCell>
                <TableCell>{request.requestor}</TableCell>
                <TableCell>{request.type}</TableCell>
                <TableCell>{request.stage}</TableCell>
                <TableCell>{request.users} users</TableCell>
                <TableCell>
                  {(() => {
                    const status = getSLAStatus(request)
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
                <TableCell>
                  {String('resolvedDate' in request ? request.resolvedDate : request.dueDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <VendorRequestDetail 
        request={selectedRequest}
        showResolved={showResolved}
        onClose={() => setSelectedRequest(null)}
        setSelectedRequest={setSelectedRequest}
      />
    </Card>
  )
}
