import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet"
import { previousAssessments, type ThreatModelAssessment } from "../../data/threat-model-data"
import ThreatModelAssistant from "./ThreatModelAssistant"
import { ThreatModelDetails } from "./ThreatModelDetails"

export function ThreatModelSection() {
    const [selectedAssessment, setSelectedAssessment] = useState<ThreatModelAssessment | null>(null)
    const [showNewAssessment, setShowNewAssessment] = useState(false)

    const handleSaveAssessment = () => {
        // Save assessment logic here
        setShowNewAssessment(false)
    }

    const handleDismissAssessment = () => {
        setShowNewAssessment(false)
    }

    const getRiskBadgeVariant = (risk: string) => {
        switch (risk) {
            case 'CRITICAL':
                return 'error'
            case 'HIGH':
                return 'error'
            case 'MEDIUM':
                return 'warning'
            default:
                return 'success'
        }
    }

    const getThreatCounts = (assessment: ThreatModelAssessment) => {
        const counts = {
            CRITICAL: 0,
            HIGH: 0,
            MEDIUM: 0,
            LOW: 0
        }

        // Count threats by risk level only
        assessment.threats.forEach(threat => {
            counts[threat.riskLevel.toUpperCase() as keyof typeof counts]++
        })

        return counts
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex w-full items-center justify-between">
                    <h2 className="text-lg font-semibold">Threat Model Assessments</h2>
                    <Button
                        variant="brand-primary"
                        icon="FeatherPlus"
                        onClick={() => setShowNewAssessment(true)}
                    >
                        New Threat Assessment
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {previousAssessments.map(assessment => {
                        const threatCounts = getThreatCounts(assessment)
                        
                        return (
                            <div
                                key={assessment.id}
                                onClick={() => setSelectedAssessment(assessment)}
                                className="cursor-pointer rounded-md border p-4 hover:bg-gray-50"
                            >
                                <div className="flex flex-col gap-1 mb-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-bold font-bold">{assessment.name}</h3>
                                        <Badge variant="brand">
                                            {assessment.projectTeam}
                                        </Badge>
                                    </div>
                                    <p className="text-caption text-subtext-color">Assessed: {assessment.date}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm font-semibold mb-2">Threat Risk Summary</p>
                                    <div className="grid grid-cols-4 gap-2 text-center">
                                        <div>
                                            <div className="text-lg font-bold text-red-600">
                                                {threatCounts.CRITICAL}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Critical</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-orange-600">
                                                {threatCounts.HIGH}
                                            </div>
                                            <div className="text-sm text-muted-foreground">High</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-yellow-600">
                                                {threatCounts.MEDIUM}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Medium</div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold text-green-600">
                                                {threatCounts.LOW}
                                            </div>
                                            <div className="text-sm text-muted-foreground">Low</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-sm font-semibold">Mitigations</p>
                                    <div className="space-y-1">
                                        {assessment.mitigations.map((mitigation, index) => (
                                            <div key={index} className="flex justify-between items-center text-sm">
                                                <span className="text-muted-foreground truncate pr-2">
                                                    {mitigation.name}
                                                </span>
                                                <span className="inline-flex font-base items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100">
                                                    <div className={`w-2 h-2 rounded-full ${
                                                        mitigation.status === 'IMPLEMENTED' ? 'bg-green-500' :
                                                        mitigation.status === 'IN_PROGRESS' ? 'bg-yellow-500' :
                                                        mitigation.status === 'PLANNED' ? 'bg-yellow-500' :
                                                        'bg-red-500'
                                                    }`} />
                                                    {mitigation.status.replace('_', ' ')}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </CardContent>

            <Sheet
                open={showNewAssessment || !!selectedAssessment}
                onOpenChange={() => {
                    setShowNewAssessment(false)
                    setSelectedAssessment(null)
                }}
            >
                <SheetContent className="flex flex-col h-full w-full sm:max-w-[800px]">
                    <SheetHeader className="border-b pb-4">
                        <SheetTitle>
                            {showNewAssessment ? "New Threat Assessment" : selectedAssessment?.name}
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto py-4">
                        {showNewAssessment ? (
                            <ThreatModelAssistant />
                        ) : selectedAssessment ? (
                            <ThreatModelDetails
                                assessment={selectedAssessment}
                            />
                        ) : null}
                    </div>

                    <SheetFooter className="border-t pt-4">
                        <div className="flex justify-end gap-2 w-full">
                            {showNewAssessment ? (
                                <>
                                    <Button variant="brand-secondary" onClick={handleDismissAssessment}>
                                        Dismiss
                                    </Button>
                                    <Button variant="brand-primary" onClick={handleSaveAssessment}>
                                        Save Assessment
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button variant="brand-secondary" onClick={() => setSelectedAssessment(null)}>
                                        Close
                                    </Button>
                                    <Button variant="brand-secondary">Export Report</Button>
                                    <Button variant="brand-primary">Update Assessment</Button>
                                </>
                            )}
                        </div>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </Card>
    )
} 