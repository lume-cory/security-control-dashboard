import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ThreatModelAssessment } from "../../data/threat-model-data"

export function ThreatModelDetails({ assessment }: { assessment: ThreatModelAssessment }) {
    // Calculate threat counts by risk level
    const threatCounts = {
        CRITICAL: 0,
        HIGH: 0,
        MEDIUM: 0,
        LOW: 0
    }

    // Count threats by risk level
    assessment.threats.forEach(threat => {
        threatCounts[threat.riskLevel.toUpperCase() as keyof typeof threatCounts]++
    })

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold">{assessment.name}</h2>
                <p className="text-muted-foreground">{assessment.projectTeam}</p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Threat Risk Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-4 text-center">
                            <div>
                                <div className="text-2xl font-bold text-red-600">
                                    {threatCounts.CRITICAL}
                                </div>
                                <div>Critical</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-orange-600">
                                    {threatCounts.HIGH}
                                </div>
                                <div>High</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-yellow-600">
                                    {threatCounts.MEDIUM}
                                </div>
                                <div>Medium</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-green-600">
                                    {threatCounts.LOW}
                                </div>
                                <div>Low</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* System Description */}
                <div className="mb-6">
                    <p className="text-md font-bold mb-2">System Description</p>
                    <p className="whitespace-pre-wrap">{assessment.systemDescription}</p>
                </div>

                {/* Data Analysis */}
                <div className="mb-6">
                    <p className="text-md font-bold mb-2">Data Analysis</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Sensitivity</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assessment.dataAnalysis.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>{item.sensitivity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Data Flows */}
                <div className="mb-6">
                    <p className="text-md font-bold mb-2">Data Flows</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead>Destination</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Protocol</TableHead>
                                <TableHead>Port</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assessment.dataFlows.map((flow, index) => (
                                <TableRow key={index}>
                                    <TableCell>{flow.name}</TableCell>
                                    <TableCell>{flow.source}</TableCell>
                                    <TableCell>{flow.destination}</TableCell>
                                    <TableCell>{flow.type}</TableCell>
                                    <TableCell>{flow.protocol}</TableCell>
                                    <TableCell>{flow.port}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Threats Analysis */}
                <div className="mb-6">
                    <p className="text-md font-bold mb-2">Threats Analysis</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category</TableHead>
                                <TableHead>Threat</TableHead>
                                <TableHead>Risk Level</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assessment.threats.map((threat, index) => (
                                <TableRow key={index}>
                                    <TableCell>{threat.category}</TableCell>
                                    <TableCell>{threat.threat}</TableCell>
                                    <TableCell>{threat.riskLevel}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Severity Assessment */}
                <div className="mb-6">
                    <p className="text-md font-bold mb-2">Severity Assessment</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Threat</TableHead>
                                <TableHead>Severity</TableHead>
                                <TableHead>Reasoning</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assessment.severityAssessments.map((assessment, index) => (
                                <TableRow key={index}>
                                    <TableCell>{assessment.threat}</TableCell>
                                    <TableCell>{assessment.severity}</TableCell>
                                    <TableCell>{assessment.reasoning}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Mitigations */}
                <div className="mb-6">
                    <p className="text-md font-bold mb-2">Mitigations</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Threat</TableHead>
                                <TableHead>Mitigation</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {assessment.mitigations.map((mitigation, index) => (
                                <TableRow key={index}>
                                    <TableCell>{mitigation.threat}</TableCell>
                                    <TableCell>{mitigation.mitigation}</TableCell>
                                    <TableCell>{mitigation.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* References */}
                <div className="mb-6">
                    <p className="text-md font-bold mb-2">References</p>
                    <ul className="list-disc pl-5">
                        {assessment.references.map((reference, index) => (
                            <li key={index} className="mb-2">
                                <a href={reference.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                    {reference.name[0]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
} 