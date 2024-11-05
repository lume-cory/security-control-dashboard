'use client';

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { AlertTriangle, Shield, ShieldAlert, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DefaultPageLayout } from "@/subframe/layouts/DefaultPageLayout";
import { IconWithBackground } from "@/subframe/components/IconWithBackground";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { Button } from "@/subframe/components/Button";
import { useRouter } from "next/navigation";

// Mock data for demonstration
const teams = ['Frontend', 'Backend', 'DevOps', 'Mobile']
const vulnerabilityTypes = ['XSS', 'SQL Injection', 'CSRF', 'Broken Authentication', 'Sensitive Data Exposure', 'Insecure Direct Object References', 'Security Misconfiguration', 'Unvalidated Redirects and Forwards']
const criticalityLevels = ['Critical', 'High', 'Medium', 'Low']

const mockEngVulnerabilities = [
  // Frontend Team
  { id: 1, team: 'Frontend', type: 'XSS', criticality: 'High', feature: 'User Profile', daysOpen: 5, slaTimeLeft: '2 days', description: 'Potential XSS vulnerability in user profile rendering', impact: 'High', remediation: 'Implement proper input sanitization and output encoding' },
  { id: 2, team: 'Frontend', type: 'CSRF', criticality: 'Medium', feature: 'Comment System', daysOpen: 6, slaTimeLeft: '6 days', description: 'CSRF vulnerability in comment submission', impact: 'Medium', remediation: 'Implement anti-CSRF tokens for all state-changing operations' },
  { id: 3, team: 'Frontend', type: 'Insecure Direct Object References', criticality: 'High', feature: 'User Settings', daysOpen: 4, slaTimeLeft: '3 days', description: 'Direct object reference allows unauthorized access to user settings', impact: 'High', remediation: 'Implement proper authorization checks for all user-specific resources' },
  { id: 4, team: 'Frontend', type: 'Security Misconfiguration', criticality: 'Medium', feature: 'Error Handling', daysOpen: 7, slaTimeLeft: '5 days', description: 'Verbose error messages reveal sensitive information', impact: 'Medium', remediation: 'Implement custom error pages and log detailed errors server-side' },
  { id: 5, team: 'Frontend', type: 'Unvalidated Redirects and Forwards', criticality: 'Low', feature: 'Login Redirect', daysOpen: 9, slaTimeLeft: '7 days', description: 'Unvalidated redirect after login could lead to phishing attacks', impact: 'Low', remediation: 'Implement a whitelist of allowed redirect URLs' },
  { id: 6, team: 'Frontend', type: 'XSS', criticality: 'Medium', feature: 'Search Results', daysOpen: 3, slaTimeLeft: '4 days', description: 'Potential XSS in search result display', impact: 'Medium', remediation: 'Implement proper output encoding for search results' },

  // Backend Team
  { id: 7, team: 'Backend', type: 'SQL Injection', criticality: 'Critical', feature: 'Data API', daysOpen: 2, slaTimeLeft: '1 day', description: 'SQL injection vulnerability in data retrieval endpoint', impact: 'Critical', remediation: 'Use parameterized queries or ORM to prevent SQL injection' },
  { id: 8, team: 'Backend', type: 'Broken Authentication', criticality: 'High', feature: 'User Authentication', daysOpen: 4, slaTimeLeft: '2 days', description: 'Session fixation vulnerability in login process', impact: 'High', remediation: 'Regenerate session ID after successful authentication' },
  { id: 9, team: 'Backend', type: 'Sensitive Data Exposure', criticality: 'High', feature: 'User Data API', daysOpen: 3, slaTimeLeft: '2 days', description: 'Sensitive user data transmitted in cleartext', impact: 'High', remediation: 'Implement TLS for all sensitive data transmissions' },
  { id: 10, team: 'Backend', type: 'Insecure Direct Object References', criticality: 'Medium', feature: 'Order Management', daysOpen: 5, slaTimeLeft: '4 days', description: 'Direct object reference allows unauthorized access to orders', impact: 'Medium', remediation: 'Implement proper authorization checks for all order-related endpoints' },
  { id: 11, team: 'Backend', type: 'Security Misconfiguration', criticality: 'High', feature: 'Server Configuration', daysOpen: 2, slaTimeLeft: '1 day', description: 'Default server configuration exposes sensitive information', impact: 'High', remediation: 'Review and harden server configuration, disable unnecessary features' },
  { id: 12, team: 'Backend', type: 'Broken Access Control', criticality: 'Critical', feature: 'Admin Panel', daysOpen: 1, slaTimeLeft: '1 day', description: 'Improper access control allows regular users to access admin functions', impact: 'Critical', remediation: 'Implement robust role-based access control for all admin functions' },

  // DevOps Team
  { id: 13, team: 'DevOps', type: 'Sensitive Data Exposure', criticality: 'Medium', feature: 'Logging System', daysOpen: 8, slaTimeLeft: '4 days', description: 'Sensitive user data being logged in plaintext', impact: 'Medium', remediation: 'Implement data masking for sensitive information in logs' },
  { id: 14, team: 'DevOps', type: 'Security Misconfiguration', criticality: 'High', feature: 'Cloud Infrastructure', daysOpen: 3, slaTimeLeft: '2 days', description: 'Misconfigured cloud storage allows public access to private data', impact: 'High', remediation: 'Review and correct all cloud resource permissions, implement least privilege principle' },
  { id: 15, team: 'DevOps', type: 'Insufficient Logging & Monitoring', criticality: 'Medium', feature: 'Monitoring System', daysOpen: 6, slaTimeLeft: '5 days', description: 'Lack of proper logging for critical system events', impact: 'Medium', remediation: 'Implement comprehensive logging and real-time alerting for critical events' },
  { id: 16, team: 'DevOps', type: 'Insecure Deserialization', criticality: 'High', feature: 'Data Processing Pipeline', daysOpen: 4, slaTimeLeft: '3 days', description: 'Insecure deserialization in data processing could lead to remote code execution', impact: 'High', remediation: 'Implement secure deserialization practices, validate and sanitize all input data' },
  { id: 17, team: 'DevOps', type: 'Using Components with Known Vulnerabilities', criticality: 'Critical', feature: 'Third-party Libraries', daysOpen: 2, slaTimeLeft: '1 day', description: 'Critical vulnerability in a widely used third-party library', impact: 'Critical', remediation: 'Immediately update affected libraries, implement automated dependency scanning' },
  { id: 18, team: 'DevOps', type: 'Insufficient Logging & Monitoring', criticality: 'Low', feature: 'Audit Logs', daysOpen: 10, slaTimeLeft: '8 days', description: 'Audit logs not retained for sufficient duration', impact: 'Low', remediation: 'Increase log retention period and implement secure log archiving' },

  // Mobile Team
  { id: 19, team: 'Mobile', type: 'Broken Authentication', criticality: 'High', feature: 'Login Flow', daysOpen: 3, slaTimeLeft: '3 days', description: 'Weak password policy in mobile app login', impact: 'High', remediation: 'Enforce stronger password requirements and implement multi-factor authentication' },
  { id: 20, team: 'Mobile', type: 'Insecure Data Storage', criticality: 'High', feature: 'Local Data Storage', daysOpen: 4, slaTimeLeft: '2 days', description: 'Sensitive user data stored in plaintext on device', impact: 'High', remediation: 'Implement secure local storage using encryption' },
  { id: 21, team: 'Mobile', type: 'Insufficient Transport Layer Protection', criticality: 'Medium', feature: 'API Communication', daysOpen: 5, slaTimeLeft: '4 days', description: 'Insecure communication with backend APIs', impact: 'Medium', remediation: 'Implement certificate pinning and ensure all API communications use TLS' },
  { id: 22, team: 'Mobile', type: 'Insecure Authorization', criticality: 'High', feature: 'In-App Purchases', daysOpen: 2, slaTimeLeft: '2 days', description: 'Improper authorization checks for in-app purchases', impact: 'High', remediation: 'Implement server-side validation for all in-app purchases' },
  { id: 23, team: 'Mobile', type: 'Client Code Quality', criticality: 'Low', feature: 'Error Handling', daysOpen: 7, slaTimeLeft: '6 days', description: 'Improper error handling leaks sensitive information', impact: 'Low', remediation: 'Implement proper exception handling and create user-friendly error messages' },
  { id: 24, team: 'Mobile', type: 'Code Tampering', criticality: 'Medium', feature: 'App Integrity', daysOpen: 6, slaTimeLeft: '5 days', description: 'Lack of runtime application self-protection', impact: 'Medium', remediation: 'Implement code obfuscation and runtime integrity checks' },
]

// Generate mock data for the past 12 months
const generateMockTrendData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currentMonth = new Date().getMonth()
  const data = []

  for (let i = 11; i >= 0; i--) {
    const monthIndex = (currentMonth - i + 12) % 12
    data.push({
      name: months[monthIndex],
      Critical: Math.floor(Math.random() * 5),
      High: Math.floor(Math.random() * 8),
      Medium: Math.floor(Math.random() * 12),
      Low: Math.floor(Math.random() * 20),
    })
  }

  return data
}

const mockTrendData = generateMockTrendData()

export default function EngVulnReport() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState('All')
  const [selectedCriticality, setSelectedCriticality] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({})
  const [selectedVulnerability, setSelectedVulnerability] = useState<typeof mockEngVulnerabilities[0] | null>(null)

  const filteredVulnerabilities = mockEngVulnerabilities.filter(vuln => 
    (selectedTeam === 'All' || vuln.team === selectedTeam) &&
    (selectedCriticality === 'All' || vuln.criticality === selectedCriticality) &&
    (selectedType === 'All' || vuln.type === selectedType)
  )

  const getCriticalityIcon = (criticality: string) => {
    switch (criticality) {
      case 'Critical': return <ShieldAlert className="h-4 w-4 text-destructive" />
      case 'High': return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'Medium': return <Shield className="h-4 w-4 text-yellow-500" />
      case 'Low': return <ShieldCheck className="h-4 w-4 text-green-500" />
      default: return null
    }
  }

  const toggleTeamExpansion = (team: string) => {
    setExpandedTeams(prev => ({ ...prev, [team]: !prev[team] }))
  }

  return (
    <DefaultPageLayout>
    <div className="flex h-full w-full flex-col items-start gap-6 px-6 py-6">
      <div className="flex w-full items-start gap-4 mobile:flex-col mobile:items-center mobile:justify-start mobile:gap-6">
        <IconWithBackground size="medium" icon="FeatherRocket" />
        <span className="text-heading-2 font-heading-2 text-default-font mobile:text-center">
          Acme Inc
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <Breadcrumbs>
          <Breadcrumbs.Item onClick={() => router.push('/reports')}>
            Reports
          </Breadcrumbs.Item>
          <Breadcrumbs.Divider />
          <Breadcrumbs.Item active={true}>
            Vulnerability Resolution
          </Breadcrumbs.Item>
        </Breadcrumbs>
        <div className="flex items-center gap-2">
          <Button
            disabled={false}
            variant="brand-primary"
            size="medium"
            icon="FeatherShare"
            loading={false}
            onClick={() => setIsDialogOpen(true)}
            >
            Share Report
          </Button>
          <Button
            disabled={false}
            variant="brand-primary"
            size="medium"
            icon="FeatherDownload"
            loading={false}
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
          >
            Download Report
          </Button>
        </div>
      </div>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Security Vulnerability Report</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Select onValueChange={setSelectedTeam}>
          <SelectTrigger>
            <SelectValue placeholder="Select Team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Teams</SelectItem>
            {teams.map(team => (
              <SelectItem key={team} value={team}>{team}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedCriticality}>
          <SelectTrigger>
            <SelectValue placeholder="Select Criticality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Criticalities</SelectItem>
            {criticalityLevels.map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={setSelectedType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Vulnerability Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
            {vulnerabilityTypes.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {teams.map(team => {
          const teamVulnerabilities = filteredVulnerabilities.filter(v => v.team === team)
          const isExpanded = expandedTeams[team]
          const displayedVulnerabilities = isExpanded ? teamVulnerabilities : teamVulnerabilities.slice(0, 5)

          return (
            <Card key={team}>
              <CardHeader>
                <CardTitle>{team} Team</CardTitle>
                <CardDescription>
                  {teamVulnerabilities.length} outstanding vulnerabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Criticality</TableHead>
                      
                      <TableHead>Type</TableHead>
                      <TableHead>Feature</TableHead>
                      <TableHead>Days Open</TableHead>
                      <TableHead>SLA Time Left</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayedVulnerabilities.map(vuln => (
                      <TableRow 
                        key={vuln.id} 
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedVulnerability(vuln)}
                      >
                        <TableCell>
                          <Badge variant="outline" className="flex items-center gap-1">
                            {getCriticalityIcon(vuln.criticality)}
                            {vuln.criticality}
                          </Badge>
                        </TableCell>
                        <TableCell>{vuln.type}</TableCell>
                        <TableCell>{vuln.feature}</TableCell>
                        <TableCell>{vuln.daysOpen}</TableCell>
                        <TableCell>{vuln.slaTimeLeft}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {teamVulnerabilities.length > 5 && (
                  <Button
                    variant="brand-secondary"
                    className="w-full mt-4"
                    onClick={() => toggleTeamExpansion(team)}
                    icon={isExpanded ? "FeatherChevronUp" : "FeatherChevronDown"}
                  >
                    {isExpanded ? "Show Less" : "See More"}
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vulnerability Trend</CardTitle>
          <CardDescription>12-month trend of vulnerabilities by criticality</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Critical" stroke="#ff4d4f" strokeWidth={2} />
              <Line type="monotone" dataKey="High" stroke="#ffa940" strokeWidth={2} />
              <Line type="monotone" dataKey="Medium" stroke="#fadb14" strokeWidth={2} />
              <Line type="monotone" dataKey="Low" stroke="#52c41a" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Dialog open={!!selectedVulnerability} onOpenChange={() => setSelectedVulnerability(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Vulnerability Details</DialogTitle>
          </DialogHeader>
          {selectedVulnerability && (
            <div className="grid gap-4">
              <div className="grid grid-cols-2 items-center gap-4">
                <span className="font-semibold">Team:</span>
                <span>{selectedVulnerability.team}</span>
                <span className="font-semibold">Type:</span>
                <span>{selectedVulnerability.type}</span>
                <span className="font-semibold">Criticality:</span>
                <Badge variant="outline" className="flex items-center gap-1 w-fit">
                  {getCriticalityIcon(selectedVulnerability.criticality)}
                  {selectedVulnerability.criticality}
                </Badge>
                <span className="font-semibold">Feature:</span>
                <span>{selectedVulnerability.feature}</span>
                <span className="font-semibold">Days Open:</span>
                <span>{selectedVulnerability.daysOpen}</span>
                <span className="font-semibold">SLA Time Left:</span>
                <span>{selectedVulnerability.slaTimeLeft}</span>
              </div>
              <div>
                <span className="font-semibold">Description:</span>
                <p>{selectedVulnerability.description}</p>
              </div>
              <div>
                <span className="font-semibold">Impact:</span>
                <p>{selectedVulnerability.impact}</p>
              </div>
              <div>
                <span className="font-semibold">Remediation:</span>
                <p>{selectedVulnerability.remediation}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
    </div>
    </DefaultPageLayout>
  )
}