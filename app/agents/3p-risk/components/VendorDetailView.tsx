import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import { Card } from "@/components/ui/card"
import type { Vendor, VendorStatus } from "../data/vendor-data"
import { VendorPolicyDetails } from "./VendorPolicyDetails"
import { useState } from "react"

interface VendorDetailViewProps {
  vendor: Vendor | null;
  onClose: () => void;
}

export function VendorDetailView({ vendor, onClose }: VendorDetailViewProps) {
  const [showPolicyDetails, setShowPolicyDetails] = useState(false)
  
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

  const unmetPolicies = vendor.policyCompliance
    .flatMap(policy => policy.requirementGroups
      .filter(group => group.status === 'NOT_MET')
      .map(group => ({
        policyName: policy.policyName,
        ...group
      })))
    .slice(0, 2);

  return (
    <Sheet open={!!vendor} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:w-[600px] sm:max-w-[75vw]"
        >
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle>{vendor.name}</SheetTitle>
            <Badge variant={getStatusBadgeVariant(vendor.status)}>{vendor.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">{vendor.description}</p>
        </SheetHeader>

        <div className="mt-6 space-y-6">

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
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Badge variant="success">{`${vendor.complianceSummary.exceeded} Exceeded`}</Badge>
              </div>
              <div>
                <Badge variant="success">{`${vendor.complianceSummary.met} Met`}</Badge>
              </div>
              <div>
                <Badge variant="error">{`${vendor.complianceSummary.notMet} Not Met`}</Badge>
              </div>
              <div>
                <Badge variant="neutral">{`${vendor.complianceSummary.notAssessed} Not Assessed`}</Badge>
              </div>
            </div>
          </Card>

          {/* Policy Compliance */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Policy Compliance</h3>
            <div className="space-y-4">
              {vendor.policyCompliance.slice(0, 2).map(policy => (
                <div key={policy.policyId} className="border-b pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium">{policy.policyName}</p>
                      <p className="text-sm text-muted-foreground">
                        {policy.requirementGroups.filter(g => g.status === 'MET').length} of {policy.requirementGroups.length} requirements met
                      </p>
                    </div>
                    <Badge variant={
                      policy.requirementGroups.every(g => g.status === 'MET' || g.status === 'EXCEEDED') ? 'success' :
                      policy.requirementGroups.some(g => g.status === 'NOT_MET') ? 'error' : 'warning'
                    }>
                      {policy.requirementGroups.some(g => g.status === 'NOT_MET') ? 'NOT MET' : 
                       policy.requirementGroups.some(g => g.status === 'EXCEEDED') ? 'EXCEEDED' : 'MET'}
                    </Badge>
                  </div>
                  {policy.requirementGroups.some(g => g.status === 'NOT_MET') && (
                    <div className="mt-2">
                      <p className="text-sm text-error">Unmet Requirements:</p>
                      {policy.requirementGroups
                        .filter(g => g.status === 'NOT_MET')
                        .map(group => (
                          <div key={group.groupId} className="mt-1">
                            <p className="text-sm text-muted-foreground">• {group.groupName}</p>
                            {group.actionPlan && (
                              <div className="mt-1 bg-neutral-50 p-2 rounded">
                                <p className="text-sm">Action: {group.actionPlan.description}</p>
                                <div className="flex gap-2 mt-1">
                                  <Badge variant="neutral">{`Due: ${group.actionPlan.dueDate}`}</Badge>
                                  <Badge variant={group.actionPlan.status === 'COMPLETED' ? 'success' : 'warning'}>
                                    {group.actionPlan.status}
                                  </Badge>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
              <Button 
                variant="neutral-primary" 
                className="w-full" 
                onClick={() => setShowPolicyDetails(true)}
              >
                View All Policies
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
                    <p className="text-sm text-muted-foreground">Issued by {cert.issuer}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">Valid until: {cert.validUntil}</p>
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
                    <Badge variant={doc.status === 'CURRENT' ? 'success' : 'warning'}>
                      {doc.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button variant="brand-primary">Generate Questionnaire</Button>
            <Button variant="brand-secondary">Request Information</Button>
            <Button variant="destructive-primary">Report Issue</Button>
          </div>
        </div>
      </SheetContent>

      {showPolicyDetails && (
        <VendorPolicyDetails 
          vendor={vendor} 
          onClose={() => setShowPolicyDetails(false)} 
        />
      )}
    </Sheet>
  )
} 