import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Vendor, VendorStatus } from "../data/vendor-data"
import { VendorPolicyDetails } from "./VendorPolicyDetails"
import { useState, useEffect, useMemo } from "react"
import { calculateVendorComplianceSummary } from "../data/vendor-data"

interface VendorDetailViewProps {
  vendor: Vendor | null;
  onClose: () => void;
}

export function VendorDetailView({ vendor, onClose }: VendorDetailViewProps) {
  const [showPolicyDetails, setShowPolicyDetails] = useState(false)
  const [sortByStatus, setSortByStatus] = useState(true);
  
  useEffect(() => {
    if (!vendor) {
      setShowPolicyDetails(false)
    }
  }, [vendor])

  const sortedRequirements = useMemo(() => {
    if (!vendor) return [];
    
    const allRequirements = vendor.policyCompliance.flatMap(policy =>
      policy.requirementGroups.map(group => ({
        policyName: policy.policyName,
        policyId: policy.policyId,
        ...group
      }))
    );

    if (sortByStatus) {
      return allRequirements.sort((a, b) => {
        const order = {
          'NOT_MET': 0,
          'NOT_ASSESSED': 1,
          'EXCEPTION': 2,
          'MET': 3,
          'EXCEEDED': 4
        };
        return order[a.status] - order[b.status];
      });
    } else {
      return allRequirements.sort((a, b) => {
        const policyCompare = a.policyId.localeCompare(b.policyId);
        if (policyCompare !== 0) return policyCompare;
        return a.groupId.localeCompare(b.groupId);
      });
    }
  }, [vendor, sortByStatus]);

  const calculateComplianceSummary = (vendor: Vendor) => {
    const allRequirements = vendor.policyCompliance.flatMap(policy =>
      policy.requirementGroups.map(group => group.status)
    );

    return {
      exceeded: allRequirements.filter(status => status === 'EXCEEDED').length,
      met: allRequirements.filter(status => status === 'MET').length,
      notMet: allRequirements.filter(status => status === 'NOT_MET').length,
      notAssessed: allRequirements.filter(status => status === 'NOT_ASSESSED').length,
      exception: allRequirements.filter(status => status === 'EXCEPTION').length
    };
  };

  if (!vendor) return null;

  const getStatusBadgeVariant = (status: VendorStatus): "neutral" | "error" | "success" | "warning" => {
    const variants: Record<VendorStatus, "neutral" | "error" | "success" | "warning"> = {
      'COMPLIANT': 'success',
      'NON_COMPLIANT': 'error',
      'COMPLIANT_WITH_EXCEPTION': 'warning',
      'MORE_INFO_REQUESTED': 'warning',
      'PENDING_REVIEW': 'neutral',
      'SUSPENDED': 'error'
    }
    return variants[status] || 'neutral'
  }

  return (
    <Sheet open={!!vendor} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[750px] sm:max-w-[90vw] flex flex-col"
      >
        {!showPolicyDetails ? (
          <>
            <SheetHeader className="border-b pb-4 shrink-0">
              <div className="flex items-center pr-8">
                <SheetTitle className="flex-1">{vendor.name}</SheetTitle>
                <Badge variant={getStatusBadgeVariant(vendor.status)}>{vendor.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{vendor.description}</p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              
              {/* Assessment Status */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Assessment Status</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Last Assessment</p>
                    <p className="font-medium">{vendor.assessmentStatus.lastAssessment}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Next Due</p>
                    <p className="font-medium">{vendor.assessmentStatus.nextAssessmentDue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Frequency</p>
                    <p className="font-medium">{vendor.assessmentStatus.assessmentFrequency}</p>
                  </div>
                </div>
              </Card>

              {/* Critical Dates */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Critical Dates</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Contract Renewal</p>
                    <p>{vendor.criticalDates.contractRenewal}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="font-medium">Next Assessment</p>
                    <p>{vendor.criticalDates.nextAssessment}</p>
                  </div>
                  {vendor.criticalDates.certificationRenewals.map((renewal, i) => (
                    <div key={i} className="flex justify-between">
                      <p className="font-medium">{renewal.certificationType} Renewal</p>
                      <p>{renewal.dueDate}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Compliance Summary */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Compliance Summary</h3>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {calculateVendorComplianceSummary(vendor).exceeded}
                      </div>
                      <div className="text-sm text-gray-500">Exceeded</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {calculateVendorComplianceSummary(vendor).met}
                      </div>
                      <div className="text-sm text-gray-500">Met</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {calculateVendorComplianceSummary(vendor).notMet}
                      </div>
                      <div className="text-sm text-gray-500">Not Met</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-600">
                        {calculateVendorComplianceSummary(vendor).notAssessed}
                      </div>
                      <div className="text-sm text-gray-500">Not Assessed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {calculateVendorComplianceSummary(vendor).exception}
                      </div>
                      <div className="text-sm text-gray-500">Exception</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Policy Compliance */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Policy Compliance</h3>
                <div className="space-y-4">
                  {sortedRequirements.slice(0, 2).map(group => (
                    <div key={`${group.policyId}-${group.groupId}`} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium">{group.groupId} - {group.groupName}</p>
                          <p className="text-sm text-muted-foreground">{group.policyName} - {group.policyId}</p>
                        </div>
                        <Badge variant={
                          group.status === 'EXCEEDED' ? 'success' :
                          group.status === 'MET' ? 'success' :
                          group.status === 'EXCEPTION' ? 'warning' :
                          group.status === 'NOT_ASSESSED' ? 'neutral' :
                          'error'
                        }>
                          {group.status}
                        </Badge>
                      </div>
                      {group.status === 'NOT_MET' && group.gaps && (
                        <div className="mt-2">
                          <p className="text-sm text-error">Gaps:</p>
                          {group.gaps.map((gap, i) => (
                            <p key={i} className="text-sm text-muted-foreground">• {gap}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <Button 
                    variant="brand-secondary" 
                    className="w-fit mx-auto" 
                    onClick={() => setShowPolicyDetails(true)}
                  >
                    View All Requirements
                  </Button>
                </div>
              </Card>

              {/* Certifications & Documents */}
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Certifications & Documents</h3>
                <div className="space-y-4">
                  {vendor.certifications.map(cert => (
                    <div key={cert.name} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">Valid until: {cert.validUntil}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">Issued by {cert.issuer}</p>
                        {cert.documentUrl && (
                          <a href={cert.documentUrl} target="_blank" className="text-brand-primary text-sm">
                            View Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Documents</h4>
                    {vendor.documents.map(doc => (
                      <div key={doc.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">Last verified: {doc.lastVerified}</p>
                        </div>
                        <div>
                          <Badge className="mx-auto text-center" variant={doc.status === 'CURRENT' ? 'success' : 'warning'}>
                            {doc.status}
                          </Badge>
                          {doc.url && (
                          <a href={doc.url} target="_blank" className="text-brand-primary text-sm">
                            View Document
                          </a>
                        )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="border-t pt-4 mt-auto shrink-0">
              <div className="flex justify-end gap-2">
                <Button variant="brand-primary">Generate Report</Button>
                {/* <Button variant="brand-secondary">Request Information</Button>
                <Button variant="destructive-primary">Report Issue</Button> */}
              </div>
            </div>
          </>
        ) : (
          <VendorPolicyDetails 
            vendor={vendor} 
            onBack={() => setShowPolicyDetails(false)} 
          />
        )}
      </SheetContent>
    </Sheet>
  )
} 