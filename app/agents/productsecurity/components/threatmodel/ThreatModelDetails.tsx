import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { ThreatModelAssessment } from "../../data/threat-model-data"
import { useState } from "react"

export function ThreatModelDetails({ assessment }: { assessment: ThreatModelAssessment }) {
    const [editingSections, setEditingSections] = useState<Record<string, boolean>>({})

    const toggleEdit = (section: string) => {
        setEditingSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const handleSave = (section: string) => {
        setEditingSections(prev => ({
            ...prev,
            [section]: false
        }))
    }

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
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold">System Description</p>
                        <Button
                            variant="brand-secondary"
                            size="small"
                            icon={editingSections['system'] ? 'FeatherSave' : 'FeatherEdit'}
                            onClick={() => editingSections['system'] ? handleSave('system') : toggleEdit('system')}
                        >
                            {editingSections['system'] ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                    <div>
                        <p className="border rounded-lg p-4 whitespace-pre-wrap">{assessment.systemDescription}</p>
                    </div>
                </div>

                {/* Data Analysis */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold">Data Analysis</p>
                        <Button
                            variant="brand-secondary"
                            size="small"
                            icon={editingSections['data'] ? 'FeatherSave' : 'FeatherEdit'}
                            onClick={() => editingSections['data'] ? handleSave('data') : toggleEdit('data')}
                        >
                            {editingSections['data'] ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                    <div className="border rounded-lg p-4">
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
                                        <TableCell>
                                            <span className="inline-flex font-base items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    item.sensitivity === 'High' ? 'bg-red-500' :
                                                    item.sensitivity === 'Medium' ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                                }`} />
                                                {item.sensitivity}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Data Flows */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold">Data Flows</p>
                        <Button
                            variant="brand-secondary"
                            size="small"
                            icon={editingSections['flows'] ? 'FeatherSave' : 'FeatherEdit'}
                            onClick={() => editingSections['flows'] ? handleSave('flows') : toggleEdit('flows')}
                        >
                            {editingSections['flows'] ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                    <div className="border rounded-lg p-4">
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
                </div>

                {/* Threats Analysis */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold">Threats Analysis</p>
                        <Button
                            variant="brand-secondary"
                            size="small"
                            icon={editingSections['threats'] ? 'FeatherSave' : 'FeatherEdit'}
                            onClick={() => editingSections['threats'] ? handleSave('threats') : toggleEdit('threats')}
                        >
                            {editingSections['threats'] ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                    <div className="border rounded-lg p-4">
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
                                        <TableCell>
                                            <span className="inline-flex font-base items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100">
                                                <div className={`w-2 h-2 rounded-full ${
                                                    threat.riskLevel === 'Critical' ? 'bg-red-500' :
                                                    threat.riskLevel === 'High' ? 'bg-orange-500' :
                                                    threat.riskLevel === 'Medium' ? 'bg-yellow-500' :
                                                    'bg-green-500'
                                                }`} />
                                                {threat.riskLevel}
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* Severity Assessment */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold">Severity Assessment</p>
                        <Button
                            variant="brand-secondary"
                            size="small"
                            icon={editingSections['severity'] ? 'FeatherSave' : 'FeatherEdit'}
                            onClick={() => editingSections['severity'] ? handleSave('severity') : toggleEdit('severity')}
                        >
                            {editingSections['severity'] ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                    <div className="border rounded-lg p-4">
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
                </div>

                {/* Mitigations */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold">Mitigations</p>
                        <Button
                            variant="brand-secondary"
                            size="small"
                            icon={editingSections['mitigations'] ? 'FeatherSave' : 'FeatherEdit'}
                            onClick={() => editingSections['mitigations'] ? handleSave('mitigations') : toggleEdit('mitigations')}
                        >
                            {editingSections['mitigations'] ? 'Save' : 'Edit'}
                        </Button>
                    </div>
                    <div className="border rounded-lg p-4">
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
                                    <TableCell>
                                        <span className="inline-flex font-base items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100">
                                            <div className={`w-2 h-2 rounded-full ${
                                                mitigation.status === 'IMPLEMENTED' ? 'bg-green-500' :
                                                mitigation.status === 'IN_PROGRESS' ? 'bg-yellow-500' :
                                                mitigation.status === 'PLANNED' ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`} />
                                            {mitigation.status.replace('_', ' ')}
                                        </span>
                                    </TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                {/* References */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-xl font-bold">References</p>
                    </div>
                    <div className="border rounded-lg p-4">
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
        </div>
    )
} 