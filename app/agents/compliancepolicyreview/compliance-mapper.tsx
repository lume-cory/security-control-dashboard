'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { PlusCircle, ArrowLeft, FileText, ExternalLink } from 'lucide-react'
import { options as hardcodedOptions, getRequirements, type Requirement } from './compliance-data';
import { ComplianceDetailsView } from "./compliance-details-view";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DetailedViewProps {
  requirement: {
    article?: string;
    subArticle?: string;
    regulationText?: string;
    controlId?: string | null;
    controlCategory?: string;
    controlText?: string;
    policyId?: string | null;
    policyCategory?: string;
    suggestedPolicyCategory?: string;
    confidenceInterval?: number;
    policyText?: string;
    suggestedPolicyText?: string;
  };
  onClose: () => void;
  regulation: string;
  securityControl: string;
  companyPolicy: string;
}

const DetailedView: React.FC<DetailedViewProps> = ({ requirement, onClose, regulation, securityControl, companyPolicy }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedReportFields, setSelectedReportFields] = useState({
    regulation: true,
    securityControl: true,
    companyPolicy: true,
    detailedAnalysis: true,
    securityResources: true,
    supportingMetrics: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedPolicyText, setEditedPolicyText] = useState(requirement.suggestedPolicyText || '');

  const handleReportFieldChange = (field: keyof typeof selectedReportFields) => {
    setSelectedReportFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const generateReport = () => {
    console.log('Generating report with fields:', selectedReportFields);
    setIsReportDialogOpen(false);
  };

  // Sample data for demonstration
  const securityTools = requirement.controlId === 'PR.DS-01.01' ? [
    {
      name: 'BitLocker (Windows)',
      category: 'Disk Encryption',
      currentConfig: [
        'BitLocker enabled with AES128 encryption',
        'No PIN requirement',
        'TPM not enforced',
        'Group Policy not configured'
      ],
      recommendedConfig: [
        'Enable BitLocker with 256-bit AES encryption',
        'Require TPM and PIN for authentication',
        'Configure Group Policy to enforce encryption',
        'Enable-BitLocker -MountPoint "C:" -EncryptionMethod Aes256 -UsedSpaceOnlyEncryption'
      ],
      configDriftPercentage: 33.33
    },
    {
      name: 'AWS Key Management Service (KMS)',
      category: 'Cloud Encryption',
      currentConfig: [
        'S3 buckets encrypted',
        'No policies to enforce encryption for uploads',
        'Key rotation not automated',
        'No bucket policy for encryption enforcement'
      ],
      recommendedConfig: [
        'Enable encryption at-rest for all S3 buckets',
        'Implement bucket policy to enforce KMS encryption',
        'Rotate encryption keys every 6 months',
        'Configure S3 default encryption with KMS'
      ],
      configDriftPercentage: 33.33
    },
    {
      name: 'Oracle Transparent Data Encryption (TDE)',
      category: 'Database Encryption',
      currentConfig: [
        'Tablespaces encrypted',
        'Access control not fully implemented',
        'No monitoring for unauthorized decryption attempts',
        'Key management not centralized'
      ],
      recommendedConfig: [
        'Encrypt sensitive tablespaces with AES256',
        'Enforce access control policies',
        'Enable monitoring for unauthorized decryption',
        'ALTER TABLESPACE sensitive_data ENCRYPTION USING \'AES256\' ENCRYPT'
      ],
      configDriftPercentage: 33.33
    },
    {
      name: 'Splunk SIEM',
      category: 'Security Monitoring',
      currentConfig: [
        'Basic monitoring enabled',
        'Lacks integrity checks for critical directories',
        'No automated alerts configured',
        'File hash verification not implemented'
      ],
      recommendedConfig: [
        'Enable File Integrity Monitoring (FIM)',
        'Configure monitoring for critical directories',
        'Set alerts for unauthorized access',
        'Implement file hash verification'
      ],
      configDriftPercentage: 33.33
    },
    {
      name: 'Vormetric Data Security Manager',
      category: 'Data Protection',
      currentConfig: [
        'Encryption implemented',
        'Tokenization not applied',
        'Role-based access not enforced',
        'Key rotation not automated'
      ],
      recommendedConfig: [
        'Tokenize sensitive data fields',
        'Mask sensitive data (e.g., XXXXXXXXXXXX####)',
        'Centralize encryption key management',
        'Enforce role-based access to keys'
      ],
      configDriftPercentage: 33.33
    },
    {
      name: 'Active Directory',
      category: 'Access Control',
      currentConfig: [
        'Group policies in place',
        'Auditing not enabled for sensitive files',
        'Basic Kerberos configuration',
        'No automated alerts'
      ],
      recommendedConfig: [
        'Enforce group-based access policies',
        'Configure auditing for sensitive files',
        'Enable Kerberos authentication',
        'AuditPol /set /subcategory:"File System" /success:enable /failure:enable'
      ],
      configDriftPercentage: 33.33
    },
    {
      name: 'Tripwire Enterprise',
      category: 'File Integrity',
      currentConfig: [
        'Monitoring baseline exists',
        'Automated alerts not configured',
        'Limited directory coverage',
        'No integration with SIEM'
      ],
      recommendedConfig: [
        'Define baseline integrity for critical files',
        'Monitor /data/critical directory',
        'Configure automated email alerts',
        'Integrate with SIEM for centralized monitoring'
      ],
      configDriftPercentage: 33.33
    }
  ] : [
    // Original NTP configuration for other controls
    {
      name: 'Network Time Protocol (NTP) Servers',
      category: 'Time Synchronization',
      currentConfig: [
        'server pool.ntp.org iburst',
        'driftfile /var/lib/ntp/drift',
        'No authentication configured',
        'Single NTP source'
      ],
      recommendedConfig: [
        'Multiple redundant NTP servers (time.google.com, time.cloudflare.com)',
        'Enable symmetric key authentication',
        'Configure drift monitoring',
        'Restrict default access (nomodify, nopeer, noquery)',
        'Enable monitoring and alerts for sync failures'
      ],
      configDriftPercentage: 60
    },
    {
      name: 'Splunk SIEM',
      category: 'Log Management',
      currentConfig: [
        'UTC timezone configured',
        'Basic timestamp settings',
        'No drift monitoring'
      ],
      recommendedConfig: [
        'Configure props.conf for timestamp extraction',
        'Set TIME_FORMAT and TIMEZONE in configuration',
        'Implement drift alerts (>5 seconds)',
        'Enable timestamp validation checks'
      ],
      configDriftPercentage: 66.67
    },
    {
      name: 'Active Directory (Windows Server)',
      category: 'Domain Services',
      currentConfig: [
        'Single NTP source (pool.ntp.org)',
        'Basic time sync settings',
        'No Group Policy enforcement'
      ],
      recommendedConfig: [
        'Configure multiple secure NTP sources',
        'Enable w32tm with manual peer list',
        'Set Group Policy for domain-wide enforcement',
        'Enable reliable time source flag'
      ],
      configDriftPercentage: 66.67
    },
    {
      name: 'Palo Alto Networks Firewall',
      category: 'Network Security',
      currentConfig: [
        'Single NTP server (pool.ntp.org)',
        'No authentication',
        'No secondary server configured'
      ],
      recommendedConfig: [
        'Configure primary and secondary NTP servers',
        'Enable NTP authentication',
        'Configure syslog messages for failed time updates',
        'Set up monitoring alerts for sync issues'
      ],
      configDriftPercentage: 66.67
    }
  ];

  const supportingMetrics = requirement.controlId === 'PR.DS-01.01' ? [
    {
      name: 'Data Encryption Coverage',
      value: 85.5,
      trend: [75.0, 78.5, 80.0, 83.0, 85.5],
      unit: '%',
      description: 'Percentage of sensitive data protected by encryption'
    },
    {
      name: 'Access Control Compliance',
      value: 92.0,
      trend: [85.0, 87.5, 89.0, 90.5, 92.0],
      unit: '%',
      description: 'Percentage of data access controls meeting policy requirements'
    },
    {
      name: 'Key Rotation Status',
      value: 78.5,
      trend: [65.0, 68.0, 72.0, 75.0, 78.5],
      unit: '%',
      description: 'Percentage of encryption keys rotated on schedule'
    },
    {
      name: 'File Integrity Violations',
      value: 12,
      trend: [25, 20, 18, 15, 12],
      unit: '',
      description: 'Number of detected file integrity violations in last 30 days'
    },
    {
      name: 'Unauthorized Access Attempts',
      value: 45,
      trend: [65, 58, 52, 48, 45],
      unit: '',
      description: 'Number of blocked attempts to access encrypted data'
    },
    {
      name: 'Mean Time to Detect',
      value: 2.5,
      trend: [5.0, 4.2, 3.5, 3.0, 2.5],
      unit: 'hours',
      description: 'Average time to detect data security incidents'
    }
  ] : [
    // Original metrics for other controls
    {
      name: 'Mean Time to Detection',
      value: 2.5,
      trend: [4.2, 3.8, 3.2, 2.8, 2.5],
      unit: 'hours',
      description: 'Average time to detect security incidents'
    },
    {
      name: 'Mean Time to Remediate',
      value: 8.5,
      trend: [12, 11, 10, 9, 8.5],
      unit: 'hours',
      description: 'Average time to fix security issues'
    },
    {
      name: 'Last Recovery Test',
      value: 15,
      trend: [45, 30, 25, 20, 15],
      unit: 'days ago',
      description: 'Time since last disaster recovery test'
    },
    {
      name: 'Risks Detected',
      value: 28,
      trend: [15, 18, 22, 25, 28],
      unit: '',
      description: 'Total number of security risks identified'
    },
    {
      name: 'Encrypted Assets',
      value: 94.5,
      trend: [90, 91, 92.5, 93.8, 94.5],
      unit: '%',
      description: 'Percentage of assets with encryption enabled'
    },
    {
      name: 'Outstanding Risks',
      value: 8,
      trend: [12, 11, 10, 9, 8],
      unit: '',
      description: 'Number of unresolved security risks'
    },
    {
      name: 'Risks Outside of SLA',
      value: 3,
      trend: [6, 5, 4, 3, 3],
      unit: '',
      description: 'Number of risks exceeding resolution SLA'
    }
  ];

  return (
    <div className="absolute inset-0 bg-white overflow-auto">
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={onClose}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-2xl font-bold ml-4">
              {requirement.article && requirement.subArticle ? `${requirement.article} - ${requirement.subArticle} | ` : requirement.article || requirement.subArticle || ''}
              {requirement.controlId ? `${requirement.controlId}` : ''}
            </h2>
          </div>
          <Button onClick={() => setIsReportDialogOpen(true)}>
            <FileText className="mr-2 h-4 w-4" /> Create Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            {/* Only show Regulation card if regulation data exists */}
            {requirement.regulationText && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Regulation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Regulation Name:</strong> {regulation}</p>
                    <p><strong>Article:</strong> {requirement.article} - {requirement.subArticle}</p>
                    <div>
                      <p className="font-semibold mb-2">Requirement:</p>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <pre className="whitespace-pre-wrap break-words text-sm">{requirement.regulationText}</pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Only show Security Control card if control data exists */}
            {requirement.controlText && (
              <Card className="mb-6">
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
                        <pre className="whitespace-pre-wrap break-words text-sm">{requirement.controlText}</pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Only show Company Policy card if policy data exists */}
            {(requirement.policyText || requirement.suggestedPolicyText) && (
              <Card>
                <CardHeader>
                  <CardTitle>Company Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p>
                      <strong>Policy Name:</strong>{' '}
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                        onClick={(e) => {
                          e.preventDefault()
                          console.log('Policy link clicked:', companyPolicy)
                        }}
                      >
                        {companyPolicy}
                        <ExternalLink className="h-4 w-4 ml-1" />
                      </a>
                    </p>
                    {requirement.confidenceInterval && (
                      <p><strong>Mapping Confidence:</strong> {requirement.confidenceInterval}%</p>
                    )}
                    {(requirement.policyCategory || requirement.suggestedPolicyCategory) && (
                      <p><strong>{requirement.policyId ? 'Policy Category:' : 'Suggested Policy Category:'}</strong> {requirement.policyId ? requirement.policyCategory : requirement.suggestedPolicyCategory}</p>
                    )}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-semibold">{requirement.policyId ? 'Policy Text:' : 'Suggested Policy Text:'}</p>
                        {!requirement.policyId && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              if (isEditing) {
                                // Save changes
                                console.log('Saving edited policy:', editedPolicyText);
                                setIsEditing(false);
                              } else {
                                setIsEditing(true);
                              }
                            }}
                          >
                            {isEditing ? 'Save Changes' : 'Modify Suggestion'}
                          </Button>
                        )}
                      </div>
                      <div className="bg-gray-50 p-4 rounded-md">
                        {isEditing ? (
                          <Textarea
                            value={editedPolicyText}
                            onChange={(e) => setEditedPolicyText(e.target.value)}
                            className="min-h-[200px] w-full font-mono text-sm"
                            placeholder="Enter suggested policy text..."
                          />
                        ) : (
                          <pre className="whitespace-pre-wrap break-words text-sm">
                            {requirement.policyId ? requirement.policyText : editedPolicyText}
                          </pre>
                        )}
                      </div>
                    </div>

                    {/* Add Submit for Review button only for suggested policies */}
                    {!requirement.policyId && (
                      <div className="mt-6 pt-4 border-t">
                        <p className="text-md text-gray-500 mb-2">Once approved by the policy approval board, this change will be applied to the policy document listed above. </p>
                        <Button 
                          className="w-full"
                          onClick={() => {
                            // Add your submit for review logic here
                            console.log('Submit for review clicked with text:', editedPolicyText)
                          }}
                        >
                          Submit for Policy Change Approval
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          <TabsContent value="details">
            <ComplianceDetailsView 
              securityTools={securityTools}
              supportingMetrics={supportingMetrics}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Compliance Report</DialogTitle>
              <DialogDescription>
                Select the fields you want to include in the report.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="regulation"
                  checked={selectedReportFields.regulation}
                  onCheckedChange={() => handleReportFieldChange('regulation')}
                />
                <Label htmlFor="regulation">Regulation Details</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="securityControl"
                  checked={selectedReportFields.securityControl}
                  onCheckedChange={() => handleReportFieldChange('securityControl')}
                />
                <Label htmlFor="securityControl">Security Control</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="companyPolicy"
                  checked={selectedReportFields.companyPolicy}
                  onCheckedChange={() => handleReportFieldChange('companyPolicy')}
                />
                <Label htmlFor="companyPolicy">Company Policy</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="detailedAnalysis"
                  checked={selectedReportFields.detailedAnalysis}
                  onCheckedChange={() => handleReportFieldChange('detailedAnalysis')}
                />
                <Label htmlFor="detailedAnalysis">Detailed Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="securityResources"
                  checked={selectedReportFields.securityResources}
                  onCheckedChange={() => handleReportFieldChange('securityResources')}
                />
                <Label htmlFor="securityResources">Security Resources</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="supportingMetrics"
                  checked={selectedReportFields.supportingMetrics}
                  onCheckedChange={() => handleReportFieldChange('supportingMetrics')}
                />
                <Label htmlFor="supportingMetrics">Supporting Metrics</Label>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={generateReport}>
                Generate Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

interface ComplianceMapperProps {
  onBack: () => void;
}

export function ComplianceMapperComponent({ onBack }: ComplianceMapperProps) {
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null)
  const [selectedSecurityControl, setSelectedSecurityControl] = useState<string | null>(null)
  const [selectedCompanyPolicy, setSelectedCompanyPolicy] = useState<string | null>(null)
  const [requirements, setRequirements] = useState<Requirement[]>([])
  const [showDashboard, setShowDashboard] = useState(false)
  const [notification, setNotification] = useState('')
  const [filterMode, setFilterMode] = useState('all')
  const [selectedRequirement, setSelectedRequirement] = useState<Requirement | null>(null)
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedReportFields, setSelectedReportFields] = useState({
    regulation: true,
    securityControl: true,
    companyPolicy: true,
    detailedAnalysis: true,
    securityResources: true,
    supportingMetrics: true
  });

  const handleCreateMapping = () => {
    const matchedRequirements = getRequirements(selectedRegulation, selectedSecurityControl, selectedCompanyPolicy)
    setRequirements(matchedRequirements)
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

  const handleSelectChange = (value: string, setter: (value: string | null) => void) => {
    setter(value === 'none' ? null : value);
  };

  const handleReportFieldChange = (field: keyof typeof selectedReportFields) => {
    setSelectedReportFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const generateReport = () => {
    // TODO: Implement actual report generation logic
    console.log('Generating report with fields:', selectedReportFields);
    // Could use a library like jspdf or export to CSV/Excel
    setIsReportDialogOpen(false);
  };

  return (
    <div className="w-full h-full relative">
      {selectedRequirement ? (
        <DetailedView 
          requirement={selectedRequirement} 
          onClose={() => setSelectedRequirement(null)}
          regulation={selectedRegulation || ''}
          securityControl={selectedSecurityControl || ''}
          companyPolicy={selectedCompanyPolicy || ''}
        />
      ) : (
        <Card className="w-full mx-auto">
          <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
            <CardTitle className="mb-4 sm:mb-0">Compliance Mapper</CardTitle>
            <div className="flex space-x-2">
              <Button onClick={() => setIsReportDialogOpen(true)}>
                <FileText className="mr-2 h-4 w-4" /> Create Report
              </Button>
              <Button onClick={handleUploadClick} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="regulation" className="text-sm font-medium">
                  Regulation
                </label>
                <Select 
                  value={selectedRegulation || 'none'} 
                  onValueChange={(value) => handleSelectChange(value, setSelectedRegulation)}
                >
                  <SelectTrigger id="regulation">
                    <SelectValue>{selectedRegulation || 'Select Regulation'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
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
                <Select 
                  value={selectedSecurityControl || 'none'} 
                  onValueChange={(value) => handleSelectChange(value, setSelectedSecurityControl)}
                >
                  <SelectTrigger id="securityControl">
                    <SelectValue>{selectedSecurityControl || 'Select Security Control'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
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
                <Select 
                  value={selectedCompanyPolicy || 'none'} 
                  onValueChange={(value) => handleSelectChange(value, setSelectedCompanyPolicy)}
                >
                  <SelectTrigger id="companyPolicy">
                    <SelectValue>{selectedCompanyPolicy || 'Select Company Policy'}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
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
                        {selectedRegulation && (
                          <>
                            <TableHead>Regulation Article</TableHead>
                            <TableHead>Sub-Article</TableHead>
                            <TableHead>Requirement Description</TableHead>
                          </>
                        )}
                        <TableHead>Control Category</TableHead>
                        <TableHead>Control ID</TableHead>
                        <TableHead>Control Text</TableHead>
                        <TableHead>Security Policy ID</TableHead>
                        <TableHead>Mapping Confidence</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRequirements.map((requirement) => (
                        <TableRow
                          key={requirement.id}
                          className="cursor-pointer hover:bg-gray-100"
                          onClick={() => handleRowClick(requirement)}
                        >
                          {selectedRegulation && (
                            <>
                              <TableCell>{requirement.article}</TableCell>
                              <TableCell>{requirement.subArticle}</TableCell>
                              <TableCell>{requirement.regulationText}</TableCell>
                            </>
                          )}
                          <TableCell>{requirement.controlCategory}</TableCell>
                          <TableCell>{requirement.controlId}</TableCell>
                          <TableCell>{requirement.controlText}</TableCell>
                          <TableCell>{requirement.policyId}</TableCell>
                          <TableCell>{requirement.confidenceInterval}%</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
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
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Compliance Report</DialogTitle>
            <DialogDescription>
              Select the fields you want to include in the report.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="regulation"
                checked={selectedReportFields.regulation}
                onCheckedChange={() => handleReportFieldChange('regulation')}
              />
              <Label htmlFor="regulation">Regulation Details</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="securityControl"
                checked={selectedReportFields.securityControl}
                onCheckedChange={() => handleReportFieldChange('securityControl')}
              />
              <Label htmlFor="securityControl">Security Control</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="companyPolicy"
                checked={selectedReportFields.companyPolicy}
                onCheckedChange={() => handleReportFieldChange('companyPolicy')}
              />
              <Label htmlFor="companyPolicy">Company Policy</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="detailedAnalysis"
                checked={selectedReportFields.detailedAnalysis}
                onCheckedChange={() => handleReportFieldChange('detailedAnalysis')}
              />
              <Label htmlFor="detailedAnalysis">Detailed Analysis</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="securityResources"
                checked={selectedReportFields.securityResources}
                onCheckedChange={() => handleReportFieldChange('securityResources')}
              />
              <Label htmlFor="securityResources">Security Resources</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="supportingMetrics"
                checked={selectedReportFields.supportingMetrics}
                onCheckedChange={() => handleReportFieldChange('supportingMetrics')}
              />
              <Label htmlFor="supportingMetrics">Supporting Metrics</Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              type="submit" 
              onClick={generateReport}
            >
              Generate Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
