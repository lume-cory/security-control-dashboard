'use client'

import { useState } from 'react'
import { Button } from "@/subframe/components/Button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  type LackOfDocumentation,
  type ConflictingRequirement,
  type BestPracticeImprovement,
  type OutdatedDoc,
  lackOfDocumentation as defaultLackOfDocumentation,
  conflictingRequirements as defaultConflictingRequirements,
  bestPracticeImprovements as defaultBestPracticeImprovements,
  outdatedDocs as defaultOutdatedDocs
} from '../data/knowledge-base-updates'

export function SuggestedModifications({ onBack }: { onBack: () => void }) {

  const [dialogOpen, setDialogOpen] = useState<{ [key: string]: boolean }>({})

  const [lackOfDocumentation, setLackOfDocumentation] = useState<LackOfDocumentation[]>(defaultLackOfDocumentation)
  const [conflictingRequirements, setConflictingRequirements] = useState<ConflictingRequirement[]>(defaultConflictingRequirements)
  const [bestPracticeImprovements, setBestPracticeImprovements] = useState<BestPracticeImprovement[]>(defaultBestPracticeImprovements)
  const [outdatedDocs, setOutdatedDocs] = useState<OutdatedDoc[]>(defaultOutdatedDocs)

  const getOutdatedPolicyDocs = () => {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    return outdatedDocs.filter(doc => {
      const lastUpdated = new Date(doc.lastUpdated);
      return lastUpdated < oneYearAgo;
    });
  }

  const handleAction = (
    id: number, 
    action: 'pending' | 'accepted' | 'modified' | 'rejected', 
    category: string, 
    groupIndex?: number, 
    value?: string
  ) => {
    switch (category) {
      case 'conflictingRequirements':
        setConflictingRequirements(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action === 'accepted' ? 'accepted' : item.status,
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent,
                  baselineControl: groupIndex === -1 && action === 'modified'
                    ? { ...item.baselineControl, content: value || item.baselineControl.content }
                    : item.baselineControl,
                  otherControlGroups: groupIndex !== undefined && groupIndex >= 0 && action === 'modified'
                    ? item.otherControlGroups.map((group, index) =>
                        index === groupIndex
                          ? { ...group, content: value || group.content }
                          : group
                      )
                    : item.otherControlGroups
                }
              : item
          )
        )
        break;
      case 'lackOfDocumentation':
        setLackOfDocumentation(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action as 'pending' | 'accepted' | 'modified' | 'rejected',
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent
                }
              : item
          )
        )
        break;
      case 'outdatedDocs':
        setOutdatedDocs(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action,
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent,
                  note: action === 'modified' ? (value || item.note) : item.note,
                  prbStatus: action === 'accepted' ? 'Pending' : item.prbStatus
                }
              : item
          )
        )
        break;
      case 'bestPracticeImprovements':
        setBestPracticeImprovements(prevState =>
          prevState.map(item =>
            item.id === id
              ? {
                  ...item,
                  status: action as 'pending' | 'accepted' | 'modified' | 'rejected',
                  modifiedContent: action === 'modified' ? (value || item.modifiedContent) : item.modifiedContent
                }
              : item
          )
        )
        break;
    }
  }

  const renderUpdateDialog = (item: any, groupIndex: number, isBaseline: boolean) => {
    const dialogKey = `${item.id}-${isBaseline ? 'baseline' : groupIndex}`

    return (
      <>
        <Button
          size="medium"
          variant="brand-secondary"
          onClick={() => setDialogOpen(prev => ({ ...prev, [dialogKey]: true }))}
          icon="FeatherEdit"
        >
          Update Control
        </Button>
        <Dialog open={dialogOpen[dialogKey]} onOpenChange={(open) => setDialogOpen(prev => ({ ...prev, [dialogKey]: open }))}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Update {isBaseline ? 'Baseline' : 'Other'} Control</DialogTitle>
              <DialogDescription>Make changes to the control content.</DialogDescription>
            </DialogHeader>
            <Textarea
              value={isBaseline ? item.baselineControl.content : item.otherControlGroups[groupIndex].content}
              onChange={(e) => handleAction(item.id, 'modified', 'conflictingRequirements', groupIndex, e.target.value)}
            />
            <DialogFooter>
              <Button 
                size="medium"
                variant="brand-primary"
                onClick={() => {
                  handleAction(item.id, 'modified', 'conflictingRequirements', groupIndex)
                  setDialogOpen(prev => ({ ...prev, [dialogKey]: false }))
              }}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  const renderActionButtons = (
    item: any, 
    category: 'lackOfDocumentation' | 'conflictingRequirements' | 'outdatedDocs' | 'bestPracticeImprovements'
  ) => (
    <div className="flex space-x-2 mt-2">
      <Button 
        size="small"
        icon="FeatherCheckCircle"
        variant="brand-secondary"
        onClick={() => handleAction(item.id, 'accepted', category)}
      >
        Accept
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="small" variant="brand-secondary" icon="FeatherEdit">
            Modify
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Suggestion</DialogTitle>
            <DialogDescription>Make changes to the suggested update.</DialogDescription>
          </DialogHeader>
          <Textarea 
            value={item.modifiedContent || item.suggestedHeaderText || item.suggestedModification || item.suggestedUpdate || item.note} 
            onChange={(e) => handleAction(item.id, 'modified', category, undefined, e.target.value)}
          />
          <DialogFooter>
            <Button onClick={() => handleAction(item.id, 'modified', category)}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button 
        size="small" 
        variant="brand-secondary"
        onClick={() => handleAction(item.id, 'rejected', category)}
        icon="FeatherXCircle"
      >
        Reject
      </Button>
    </div>
  )

  const getPrbStatusVariant = (status?: string) => {
    switch (status) {
      case 'Pending':
        return 'secondary'
      case 'Approved':
        return 'default'
      case 'Rejected':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const hasModifications = () => {
    return (
      lackOfDocumentation.some(item => (item.status === 'accepted' || item.status === 'modified') && !item.prbStatus) ||
      conflictingRequirements.some(item => (item.status === 'accepted' || item.status === 'modified') && !item.prbStatus) ||
      bestPracticeImprovements.some(item => (item.status === 'accepted' || item.status === 'modified') && !item.prbStatus)
    )
  }

  const hasActiveRequests = () => {
    return (
      lackOfDocumentation.some(item => item.prbStatus === 'Pending') ||
      conflictingRequirements.some(item => item.prbStatus === 'Pending') ||
      bestPracticeImprovements.some(item => item.prbStatus === 'Pending')
    )
  }

  const handleRequestApproval = () => {
    // Implementation for submitting to PRB
    // This would update the prbStatus of selected items to 'Pending'
  }

  const handleRevokeRequest = () => {
    // Implementation for revoking PRB request
    // This would clear the prbStatus of selected items
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Suggested Modifications to Security Documentation</h1>
      </div>
      
      <Tabs defaultValue="lack-of-documentation">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="lack-of-documentation">Lack of Documentation</TabsTrigger>
          <TabsTrigger value="conflicting-requirements">Conflicting Requirements</TabsTrigger>
          <TabsTrigger value="outdated-docs">Outdated Documentation</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practice Improvements</TabsTrigger>
          <TabsTrigger value="approvals">Leadership Approvals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="lack-of-documentation">
          <Card>
            <CardHeader>
              <CardTitle>Lack of Documentation</CardTitle>
              <CardDescription>Suggestions for updates to security policies or design review docs to fill gaps.</CardDescription>
            </CardHeader>
            <CardContent>
              {lackOfDocumentation.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.question}</h3>
                  <p className="mb-2">{item.suggestedUpdate}</p>
                  {renderActionButtons(item, 'lackOfDocumentation')}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conflicting-requirements">
          <Card>
            <CardHeader>
              <CardTitle>Conflicting Requirements</CardTitle>
              <CardDescription>Resolve conflicts between different documentation and suggest modifications.</CardDescription>
            </CardHeader>
            <CardContent>
              {conflictingRequirements.map((item) => (
                <div key={item.id} className="mb-8 p-4 border rounded">
                  <h3 className="font-semibold mb-4">{item.requirement}</h3>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-bold">Baseline Control: {item.baselineControl.name}</h4>
                      {renderUpdateDialog(item, -1, true)}
                    </div>
                    <p>{item.baselineControl.content}</p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-bold mb-2">Other Control Groups:</h4>
                    {item.otherControlGroups.map((group, index) => (
                      <div key={index} className="mb-4 ml-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold">{group.name}</h5>
                          <div className="flex space-x-2">
                            <Button
                              size="medium"
                              variant="brand-secondary"
                              onClick={() => handleAction(item.id, 'accepted', 'conflictingRequirements')}
                              icon="FeatherCheckCircle"
                            >
                              Accept Differences
                            </Button>
                            {renderUpdateDialog(item, index, false)}
                          </div>
                        </div>
                        <p>{group.content}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <h4 className="font-bold mb-2">Suggested Modification:</h4>
                    <p>{item.suggestedModification}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="outdated-docs">
          <Card>
            <CardHeader>
              <CardTitle>Outdated Documentation</CardTitle>
              <CardDescription>Review and update outdated policy documents.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8 p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-4">Outdated Policy Docs</h3>
                <p className="mb-2">Policy documents not updated in the past year:</p>
                <ul className="list-disc pl-5 space-y-2">
                  {getOutdatedPolicyDocs().map(doc => (
                    <li key={doc.id} className="flex items-center">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <a href={doc.url} className="text-primary hover:underline">
                        {doc.name} (Last updated: {doc.lastUpdated})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Outdated Doc Updates</h3>
                <p className="mb-2">Suggested modifications to stale or outdated docs:</p>
                {outdatedDocs.map((item) => (
                  <div key={item.id} className="mb-8 p-4 border rounded">
                    <h4 className="font-semibold mb-2">{item.name}</h4>
                    <p className="mb-2">Last Updated: {item.lastUpdated}</p>
                    <p className="mb-2">Replacement: {item.replacementDoc}</p>
                    <div className="mb-4">
                      <h5 className="font-semibold mb-2">Suggested Header Text:</h5>
                      <p className="mb-2 p-2 bg-yellow-100 border border-yellow-100 rounded">{item.suggestedHeaderText}</p>
                      {renderActionButtons(item, 'outdatedDocs')}
                    </div>
                    <div className="mt-4">
                      <h5 className="font-semibold mb-2">Additional Note:</h5>
                      <Textarea
                        placeholder="Add a note for users of this document..."
                        value={item.note}
                        onChange={(e) => handleAction(item.id, 'modified', 'outdatedDocs', undefined, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="best-practices">
          <Card>
            <CardHeader>
              <CardTitle>Best Practice Improvements</CardTitle>
              <CardDescription>Suggestions for aligning with industry best practices.</CardDescription>
            </CardHeader>
            <CardContent>
              {bestPracticeImprovements.map((item) => (
                <div key={item.id} className="mb-4 p-4 border rounded">
                  <h3 className="font-semibold mb-2">{item.currentPractice}</h3>
                  <p className="mb-2">{item.suggestedImprovement}</p>
                  <p className="mb-2 text-sm text-gray-600">Framework: {item.framework}</p>
                  {renderActionButtons(item, 'bestPracticeImprovements')}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Policy Review Board Approvals</CardTitle>
              <CardDescription>Review and submit policy modifications for PRB approval.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Lack of Documentation Updates */}
                {lackOfDocumentation.filter(item => item.status === 'accepted' || item.status === 'modified').length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Documentation Updates</h3>
                    {lackOfDocumentation
                      .filter(item => item.status === 'accepted' || item.status === 'modified')
                      .map(item => (
                        <div key={item.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{item.question}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.modifiedContent || item.suggestedUpdate}
                              </p>
                            </div>
                            <Badge variant={getPrbStatusVariant(item.prbStatus)}>
                              {item.prbStatus || 'Not Submitted'}
                            </Badge>
                          </div>
                        </div>
                    ))}
                  </div>
                )}

                {/* Conflicting Requirements Updates */}
                {conflictingRequirements.filter(item => item.status === 'accepted' || item.status === 'modified').length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Requirement Conflict Resolutions</h3>
                    {conflictingRequirements
                      .filter(item => item.status === 'accepted' || item.status === 'modified')
                      .map(item => (
                        <div key={item.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{item.requirement}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.modifiedContent || item.suggestedModification}
                              </p>
                            </div>
                            <Badge variant={getPrbStatusVariant(item.prbStatus)}>
                              {item.prbStatus || 'Not Submitted'}
                            </Badge>
                          </div>
                        </div>
                    ))}
                  </div>
                )}

                {/* Best Practice Updates */}
                {bestPracticeImprovements.filter(item => item.status === 'accepted' || item.status === 'modified').length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Best Practice Improvements</h3>
                    {bestPracticeImprovements
                      .filter(item => item.status === 'accepted' || item.status === 'modified')
                      .map(item => (
                        <div key={item.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{item.currentPractice}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.modifiedContent || item.suggestedImprovement}
                              </p>
                            </div>
                            <Badge variant={getPrbStatusVariant(item.prbStatus)}>
                              {item.prbStatus || 'Not Submitted'}
                            </Badge>
                          </div>
                        </div>
                    ))}
                  </div>
                )}

                {/* Outdated Doc Updates */}
                {outdatedDocs.filter(item => item.status === 'accepted' || item.status === 'modified').length > 0 && (
                  <div className="border rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4">Outdated Doc Updates</h3>
                    {outdatedDocs
                      .filter(item => item.status === 'accepted' || item.status === 'modified')
                      .map(item => (
                        <div key={item.id} className="mb-4 last:mb-0">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {item.modifiedContent || item.suggestedHeaderText}
                              </p>
                            </div>
                            <Badge variant={getPrbStatusVariant(item.prbStatus)}>
                              {item.prbStatus || 'Not Submitted'}
                            </Badge>
                          </div>
                        </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 mt-6">
                  <Button
                    variant="brand-primary"
                    icon="FeatherCheckCircle2"
                    onClick={() => handleRequestApproval()}
                    disabled={!hasModifications()}
                  >
                    Request PRB Approval
                  </Button>
                  <Button
                    variant="brand-secondary"
                    icon="FeatherXCircle"
                    onClick={() => handleRevokeRequest()}
                    disabled={!hasActiveRequests()}
                  >
                    Revoke Request
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
