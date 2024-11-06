'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { PlusCircle, ArrowLeft } from 'lucide-react'

type Requirement = typeof hardcodedRequirements[0];

const hardcodedOptions = {
  regulation: ['Digital Operational Resilience Act (DORA)', 'UK General Data Protection Regulation (UK GDPR)', 'EU General Data Protection Regulation (EU GDPR)', 'California Consumer Privacy Act (CCPA)', 'NIS2 Directive', 'Federal Information Security Management Act (FISMA)', 'Payment Card Industry Data Security Standard (PCI DSS)', 'Health Insurance Portability and Accountability Act (HIPAA)'],
  securityControl: ['Cyber Risk Institute (CRI) Profile v2', 'Center for Internet Security (CIS) Critical Security Controls v8.1', 'NIST Cybersecurity Framework (CSF)', 'Center for Internet Security (CIS) Risk Assessment Method (RAM)', 'NIST Risk Management Framework (RMF)', 'SOC2 Type 1', 'SOC2 Type 2', 'ISO 31000 - Risk Management', 'ISO 27001'],
  companyPolicy: ['Information Security Policy v7', 'Data Privacy Policy', 'Incident Response Policy', 'Access Control Policy', 'Acceptable Use Policy'],
}

const hardcodedRequirements = [
  {
    id: '1',
    article: 'Article 4',
    subArticle: '4.1',
    regulationText: 'Establish an ICT risk management framework to cover risk identification, protection, detection, recovery, and response.',
    controlId: 'GV.OC-04.03 ',
    controlCategory: 'Governance',
    controlText: `GV.OC-04.03: Resilience requirements to support the delivery of critical services are established for all operating states (e.g., under duress/attack, during recovery, and normal operations).`,
    policyId: 'GV.OC.SSE-01',
    policyCategory: 'GOVERN / Organizational Context / Stakeholder Service Expectations',
    confidenceInterval: 95,
    policyText: `01.1. Establishment of Cyber Resilience Requirements
01.1.1. All critical services must have defined cyber resilience requirements that support their delivery across all operating states, including under duress/attack, during recovery, and normal operations.
01.1.2. Cyber resilience requirements must be documented and approved by the relevant Service Owner and reviewed annually.

01.2. Documentation of Critical Services and Dependencies
01.2.1. A comprehensive inventory of all critical services and their related dependencies (systems, applications, infrastructure, and third-party services) must be maintained.
01.2.2. The inventory must be updated quarterly or upon significant changes and made accessible to authorized personnel.
01.3. Alternative Operating Scenarios

01.3.1. Reasonably expected scenarios and conditions of alternative operating states (e.g., ransomware attack, extended site recovery, site loss) must be identified and documented for each critical service.
01.3.2. Scenario planning must include impact assessments and response strategies.

01.4. Service Continuity Plans
01.4.1. Service Continuity Plans (SCPs) must be developed for all critical services, outlining procedures to maintain or restore services during disruptions.
01.4.2. SCPs must include roles and responsibilities, communication plans, recovery objectives, and step-by-step recovery procedures.
01.4.3. SCPs must be reviewed, updated, and approved annually or when significant changes occur.

01.5. Resiliency Testing Plans and Schedule
01.5.1. Resiliency testing must be conducted at least annually for all critical services to validate the effectiveness of SCPs and cyber resilience measures.
01.5.2. A testing schedule must be developed, documented, and approved by the relevant stakeholders.
01.5.3. Test results, including identified gaps and remediation actions, must be documented and reported to senior management.

01.6. Inventory Management Reporting
01.6.1. Regular inventory management reports must be generated to verify the accuracy and completeness of critical services and their dependencies.
01.6.2. Discrepancies identified in the inventory must be investigated and corrected promptly.

01.7. Resiliency Degradation Scenarios
01.7.1. Potential resiliency degradation scenarios must be identified for each critical service.
01.7.2. Plans to address resiliency degradation, including mitigation strategies and contingency options, must be developed and documented.
01.7.3. These scenarios and plans must be reviewed and updated annually.`,
  },
  {
    id: '2',
    article: 'Article 5',
    subArticle: '5.1',
    regulationText: 'Establish internal governance to manage ICT risks.',
    controlId: 'GV.RM-01.01 ',
    controlCategory: 'Governance',
    controlText: `GV.RM-01.01: Technology and cybersecurity risk management strategies and frameworks are approved by the governing authority (e.g., the Board or one of its committees) and incorporated into the overall business strategy and enterprise risk management framework.`,
    policyId: 'GV.RMS.RMOA-01',
    policyCategory: 'GOVERN / Risk Management Strategy / Risk Management Objectives Agreement',
    confidenceInterval: 92,
    policyText: `01.1. Establishment of Cyber Resilience Requirements
01.1.1. All critical services must have defined cyber resilience requirements that support their delivery across all operating states, including under duress/attack, during recovery, and normal operations.
01.1.2. Cyber resilience requirements must be documented and approved by the relevant Service Owner and reviewed annually.

01.2. Documentation of Critical Services and Dependencies
01.2.1. A comprehensive inventory of all critical services and their related dependencies (systems, applications, infrastructure, and third-party services) must be maintained.
01.2.2. The inventory must be updated quarterly or upon significant changes and made accessible to authorized personnel.
01.3. Alternative Operating Scenarios

01.3.1. Reasonably expected scenarios and conditions of alternative operating states (e.g., ransomware attack, extended site recovery, site loss) must be identified and documented for each critical service.
01.3.2. Scenario planning must include impact assessments and response strategies.

01.4. Service Continuity Plans
01.4.1. Service Continuity Plans (SCPs) must be developed for all critical services, outlining procedures to maintain or restore services during disruptions.
01.4.2. SCPs must include roles and responsibilities, communication plans, recovery objectives, and step-by-step recovery procedures.
01.4.3. SCPs must be reviewed, updated, and approved annually or when significant changes occur.

01.5. Resiliency Testing Plans and Schedule
01.5.1. Resiliency testing must be conducted at least annually for all critical services to validate the effectiveness of SCPs and cyber resilience measures.
01.5.2. A testing schedule must be developed, documented, and approved by the relevant stakeholders.
01.5.3. Test results, including identified gaps and remediation actions, must be documented and reported to senior management.

01.6. Inventory Management Reporting
01.6.1. Regular inventory management reports must be generated to verify the accuracy and completeness of critical services and their dependencies.
01.6.2. Discrepancies identified in the inventory must be investigated and corrected promptly.

01.7. Resiliency Degradation Scenarios
01.7.1. Potential resiliency degradation scenarios must be identified for each critical service.
01.7.2. Plans to address resiliency degradation, including mitigation strategies and contingency options, must be developed and documented.
01.7.3. These scenarios and plans must be reviewed and updated annually.`,
  },
  {
    id: '3',
    article: 'Article 5',
    subArticle: '5.4',
    regulationText: 'Allocate budget for ICT security awareness programs and training. ',
    controlId: null,
    controlCategory: 'N/A',
    controlText: `PR.AT-01.01: All personnel receive cybersecurity awareness training upon hire and on a regular basis.`,
    policyId: null,
    suggestedPolicyCategory: 'PROTECT / Awareness and Training / User Awareness & Training',    
    confidenceInterval: 88,
    suggestedPolicyText: `1. Cybersecurity Training Program
1.1. Morgan Stanley shall implement a cybersecurity training program that covers situational awareness and competencies in:
  Data protection
  Personal data handling
  Compliance obligations
  Working securely with third parties
  Detecting cyber risks
  Reporting unusual activities or incidents
1.2. The training program shall be designed to address the specific roles and responsibilities of personnel, including any additional job-relevant requirements.

2. Training Frequency and Delivery
2.1. All personnel must complete mandatory cybersecurity training upon hire and annually thereafter.
2.2. Additional training sessions may be required based on changes in roles, responsibilities, or emerging threats.
2.3. Training shall be delivered through various formats, including but not limited to e-learning modules, workshops, webinars, and situational awareness campaigns.

3. Training Content Updates
3.1. The training content shall be reviewed and updated at least annually to reflect:
  New risks and threats identified by Morgan Stanley
  Changes in the organization's security policies and standards
  Updates in applicable laws and regulations
  Changes in individual responsibilities
3.2. Updates shall be approved by the Chief Information Security Officer (CISO) or designated authority.

4. Training Records and Compliance
4.1. Morgan Stanley shall maintain accurate records of all cybersecurity training completed by personnel.
4.2. Training completion rates and effectiveness metrics shall be monitored and reported to senior management.
4.3. Personnel who fail to complete mandatory training may be subject to disciplinary actions.

5. Job-Relevant Training
5.1. Additional job-specific cybersecurity training shall be provided to personnel in roles with elevated access or responsibilities, such as IT administrators, developers, and data analysts.
5.2. The scope and content of job-relevant training shall be defined based on risk assessments.

6. Exceptions
6.1. Any exceptions to this policy must be documented, justified, and approved by the CISO or designated authority.
6.2. Approved exceptions shall include a mitigation plan to address any associated risks.`,
  },
  {
    id: '4',
    article: 'Article 7',
    subArticle: '7.1',
    regulationText: 'Use reliable and resilient ICT systems that can handle stress and peak demand.',
    controlId: null,
    controlCategory: 'N/A',
    controlText: `PR.PS-01.04: The organization documents its requirements for accurate and resilient time services (e.g., synchronization to a mandated or appropriate authoritative time source) and adopts best practice guidance in implementing and using these services for logging, event correlation, forensic analysis, authentication, transactional processing, and other purposes.`,
    policyId: 'PR.PS-01.04  ',
    policyCategory: 'PROTECT / Platform Security / Configuration Management',    
    confidenceInterval: 90,
    policyText: `1. Time Synchronization Requirements
1.1. All systems must synchronize their clocks to an approved authoritative time source, typically Coordinated Universal Time (UTC).
1.2. The authoritative time source must be accurate, reliable, and secured against unauthorized access or tampering.
1.3. Systems must maintain time accuracy within predefined tolerances appropriate for their function.
1.4. Time synchronization requirements must be documented, including business, technical, and security considerations.

2. Documentation of Requirements
2.1. Morgan Stanley shall document its business, technical, and security requirements for authoritative time sources, time accuracy, and synchronization.
2.2. Documentation must include:
  Business-related requirements (e.g., precise timestamping for financial transactions).
  Technical needs for availability, capacity, scalability, and redundancy.
  Security considerations for network components, authentication, and protocols.
  Alignment needs with external and cloud-based services.

3. Time Services Infrastructure Design
3.1. The time synchronization infrastructure must be designed with resilience and redundancy to ensure continuous availability.
3.2. Design documents must detail the time synchronization infrastructure, including network flows, services, and redundant components.
3.3. The design must comply with industry best practices and relevant regulatory requirements.

4. Operations and Maintenance
4.1. Operations and maintenance procedures must be established for time synchronization infrastructure and services.
4.2. These procedures must include:
  Regular monitoring of time services integrity and performance.
  Scheduled maintenance and updates.
  Incident response protocols for time synchronization failures or anomalies.
  Access control measures to restrict unauthorized modifications.

5. Hardware and Software Configuration Standards
5.1. Configuration standards for synchronizing system clocks must be established and documented.
5.2. All hardware and software components must be configured according to these standards.
5.3. Changes to configuration standards must follow the organization's change management processes.

6. Testing and Validation
6.1. Regular testing of time synchronization solutions must be conducted to ensure they meet organizational requirements.
6.2. Testing activities may include control tests, tabletop exercises, and disaster recovery tests.
6.3. Evidence of testing, including results and remediation actions, must be documented and retained for audit purposes.

7. Security Measures
7.1. Time synchronization communications must use secure protocols and authentication mechanisms to prevent unauthorized access or tampering.
7.2. Access to time services infrastructure must be restricted to authorized personnel.
7.3. Security controls must be in place to protect against threats such as spoofing, interception, and denial-of-service attacks.

8. Alignment with External Services
8.1. Dependencies on external time sources or cloud-based services must be identified and managed.
8.2. Contracts with third-party providers must include provisions for time synchronization accuracy and integrity.`,
  },
  {
    id: '5',
    article: 'Article 7',
    subArticle: '7.2',
    regulationText: 'Ensure systems are technologically resilient under adverse conditions.',
    controlId: null,
    controlCategory: 'N/A',
    controlText: `RC.RP-02.01: The organization's response plans are used as informed guidance to develop and manage task plans, response actions, priorities, and assignments for responding to incidents, but are adapted as necessary to address incident-specific characteristics.`,
    policyId: null,
    suggestedPolicyCategory: 'RECOVER / Incident Recovery Plan Execution / Recovery Action Performance',
    confidenceInterval: 85,
    suggestedPolicyText: `1. Incident Response Plan Structure
1.1. The Incident Response Plan (IRP) shall outline the following phases:
  Preparation
  Detection and Analysis
  Containment
  Eradication
  Recovery
  Post-Incident Activities

2. Development and Management of Task Plans
2.1. The IRP shall be used as guidance to develop incident-specific task plans and response activities.
2.2. Task plans must be adaptable to the specific characteristics of each incident.
2.3. Documentation for each incident must include:
  Specific actions taken
  Assigned responsibilities
  Timelines and deadlines
  Communication plans

3. Prioritization of Response Activities
3.1. Response activities shall be prioritized based on:
  Impact on business operations
  Severity and scope of the incident
  Legal and regulatory requirements
  Potential risks to clients, partners, and stakeholders
3.2. A clear escalation process must be in place to address high-priority incidents promptly.

4. Roles and Responsibilities
4.1. Defined roles within the Incident Response Team (IRT) include:
  Incident Response Manager
  Technical Lead
  Communications Coordinator
  Legal and Compliance Advisor
  Business Unit Representatives
4.2. Responsibilities for each role must be clearly documented and communicated.
4.3. Assignments shall be made based on expertise and relevance to the incident.

5. Adaptation of Plans and Assignments
5.1. The IRP must be flexible to adapt plans, actions, priorities, and assignments as necessary.
5.2. During an incident, the IRT shall assess the situation continuously and adjust the response accordingly.
5.3. Changes to the plan must be documented, including the rationale and approval by the Incident Response Manager.`,
  },
]

interface DetailedViewProps {
  requirement: {
    article: string;
    subArticle: string;
    regulationText: string;
    controlId: string | null;
    controlCategory: string;
    controlText: string;
    policyId: string | null;
    policyCategory?: string;
    suggestedPolicyCategory?: string;
    confidenceInterval: number;
    policyText?: string;
    suggestedPolicyText?: string;
  };
  onClose: () => void;
  regulation: string;
  securityControl: string;
  companyPolicy: string;
}

function DetailedView({ requirement, onClose, regulation, securityControl, companyPolicy }: DetailedViewProps) {
  return (
    <div className="absolute inset-0 bg-white overflow-auto">
      <div className="p-4 sm:p-6 md:p-8">
        <Button onClick={onClose} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Mapping
        </Button>
        <h1 className="text-2xl font-bold mb-4">{regulation}</h1>
        <h2 className="text-xl font-semibold mb-4">{requirement.article} - {requirement.subArticle}</h2>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Requirement Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{requirement.regulationText}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Security Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Name:</strong> {securityControl}</p>
                <p><strong>Profile ID:</strong> {requirement.controlId || 'N/A'}</p>
                <p><strong>Control Category:</strong> {requirement.controlCategory}</p>
                <div>
                  <p className="font-semibold mb-2">Control Text:</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="whitespace-pre-wrap break-words text-sm"> {requirement.controlText}</pre>
                  </div>
                </div>
         </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Company Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p><strong>Name:</strong> {companyPolicy}</p>
                <p><strong>Mapping Confidence:</strong> {requirement.confidenceInterval}%</p>
                <p><strong>{requirement.policyId ? 'Policy Category:' : 'Suggested Policy Category:'}</strong> {requirement.policyId ? requirement.policyCategory : requirement.suggestedPolicyCategory}</p>
                <div>
                  <p className="font-semibold mb-2">{requirement.policyId ? 'Policy Text:' : 'Suggested Policy Text:'}</p>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <pre className="whitespace-pre-wrap break-words text-sm">{requirement.policyId ? requirement.policyText : requirement.suggestedPolicyText}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ComplianceMapperProps {
  onBack: () => void;
}

export function ComplianceMapperComponent({ onBack }: ComplianceMapperProps) {
  const [regulation, setRegulation] = useState(hardcodedOptions.regulation[0])
  const [securityControl, setSecurityControl] = useState(hardcodedOptions.securityControl[0])
  const [companyPolicy, setCompanyPolicy] = useState(hardcodedOptions.companyPolicy[0])
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [showDashboard, setShowDashboard] = useState(false)
  const [notification, setNotification] = useState('')
  const [filterMode, setFilterMode] = useState('all')
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)

  const handleCreateMapping = () => {
    setRequirements([...hardcodedRequirements])
    setShowDashboard(true)
    setNotification('Mapping created successfully!')
  }

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])

  const filteredRequirements = filterMode === 'all'
    ? requirements
    : requirements.filter(req => req.controlId === null || req.policyId === null)

  const toggleFilter = () => {
    setFilterMode(filterMode === 'all' ? 'missing' : 'all')
  }

  const handleRowClick = (requirement: Requirement) => {
    setSelectedRequirement(requirement)
  }

  const handleUploadClick = () => {
    setIsUploadDialogOpen(true)
  }

  return (
    <div className="w-full h-full relative">
      <Card className="w-full mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <CardTitle className="mb-4 sm:mb-0">Compliance Mapper</CardTitle>
          <Button onClick={handleUploadClick} className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="regulation" className="text-sm font-medium">
                Regulation
              </label>
              <Select value={regulation} onValueChange={setRegulation}>
                <SelectTrigger id="regulation">
                  <SelectValue>{regulation}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hardcodedOptions.regulation.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="securityControl" className="text-sm font-medium">
                Security Control
              </label>
              <Select value={securityControl} onValueChange={setSecurityControl}>
                <SelectTrigger id="securityControl">
                  <SelectValue>{securityControl}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hardcodedOptions.securityControl.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="companyPolicy" className="text-sm font-medium">
                Company Policy
              </label>
              <Select value={companyPolicy} onValueChange={setCompanyPolicy}>
                <SelectTrigger id="companyPolicy">
                  <SelectValue>{companyPolicy}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {hardcodedOptions.companyPolicy.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleCreateMapping} className="w-full">
            Create Mapping
          </Button>
          {notification && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">{notification}</span>
            </div>
          )}
          {showDashboard && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h2 className="text-lg font-semibold mb-2 sm:mb-0">Mapping Results</h2>
                <Button onClick={toggleFilter} variant="outline" className="w-full sm:w-auto">
                  {filterMode === 'all' ? 'Show Missing Coverage' : 'Show All Mappings'}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Article</TableHead>
                      <TableHead>Sub-Article</TableHead>
                      <TableHead>Requirement Description</TableHead>
                      <TableHead>Control Category</TableHead>
                      <TableHead>NIST CSF v2.0</TableHead>
                      <TableHead>Security Policy ID</TableHead>
                      <TableHead>Mapping Confidence Interval</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequirements.map((req) => (
                      <TableRow key={req.id} onClick={() => handleRowClick(req)} className="cursor-pointer hover:bg-gray-100">
                        <TableCell>{req.article}</TableCell>
                        <TableCell>{req.subArticle}</TableCell>
                        <TableCell>{req.regulationText}</TableCell>
                        <TableCell>{req.controlCategory}</TableCell>
                        <TableCell>{req.controlId || 'N/A'}</TableCell>
                        <TableCell>{req.policyId || 'N/A'}</TableCell>
                        <TableCell>{req.confidenceInterval ? `${req.confidenceInterval}%` : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent  className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Content</DialogTitle>
            <DialogDescription>
              Select the type of content you want to upload or fetch.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={() => setIsUploadDialogOpen(false)}>Regulation URL</Button>
            <Button onClick={() => setIsUploadDialogOpen(false)}>Security Control URL</Button>
            <Button onClick={() => setIsUploadDialogOpen(false)}>Upload Company Policy</Button>
          </div>
        </DialogContent>
      </Dialog>
      {selectedRequirement && (
        <DetailedView 
          requirement={selectedRequirement} 
          onClose={() => setSelectedRequirement(null)}
          regulation={regulation}
          securityControl={securityControl}
          companyPolicy={companyPolicy}
        />
      )}
    </div>
  )
}
