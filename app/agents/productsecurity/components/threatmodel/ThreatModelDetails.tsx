import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ThreatModelAssessment } from "../../data/threat-model-data"

export function ThreatModelDetails({ assessment }: { assessment: ThreatModelAssessment }) {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">{assessment.name}</h2>
                <p className="text-muted-foreground">{assessment.projectTeam}</p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Threat Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-red-600">
                                    {assessment.criticalThreats}
                                </div>
                                <div>Critical</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-orange-600">
                                    {assessment.highThreats}
                                </div>
                                <div>High</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">
                                    {assessment.mediumThreats}
                                </div>
                                <div>Medium</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    {assessment.lowThreats}
                                </div>
                                <div>Low</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Add more sections for system description, data flows, etc. */}
            </div>
        </div>
    )
} 