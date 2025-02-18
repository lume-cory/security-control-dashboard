import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import type { Vendor } from "../data/vendor-data"

interface VendorPolicyDetailsProps {
  vendor: Vendor;
  onClose: () => void;
}

export function VendorPolicyDetails({ vendor, onClose }: VendorPolicyDetailsProps) {
  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:w-[900px] sm:max-w-[90vw]">
        <SheetHeader>
          <SheetTitle>Policy Compliance Details - {vendor.name}</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {vendor.policyCompliance.map(policy => (
            <div key={policy.policyId} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">{policy.policyName}</h3>
              <div className="space-y-4">
                {policy.requirementGroups.map(group => (
                  <div key={group.groupId} className="border-b pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium">{group.groupName}</p>
                      <Badge variant={
                        group.status === 'EXCEEDED' ? 'success' :
                        group.status === 'MET' ? 'success' :
                        group.status === 'NOT_MET' ? 'error' : 'neutral'
                      }>
                        {group.status}
                      </Badge>
                    </div>
                    {group.evidence && group.evidence.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Evidence:</p>
                        <ul className="list-disc list-inside">
                          {group.evidence.map((item, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {group.gaps && group.gaps.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-error">Gaps:</p>
                        <ul className="list-disc list-inside">
                          {group.gaps.map((gap, i) => (
                            <li key={i} className="text-sm text-muted-foreground">{gap}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {group.status === 'NOT_MET' && !group.actionPlan && (
                      <div className="mt-2">
                        <Button variant="brand-primary">Create Action Plan</Button>
                      </div>
                    )}
                    {group.actionPlan && (
                      <div className="mt-2 bg-neutral-50 p-2 rounded">
                        <p className="text-sm font-medium">Action Plan:</p>
                        <p className="text-sm">{group.actionPlan.description}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex gap-2">
                            <Badge variant="neutral">{`Due: ${group.actionPlan.dueDate}`}</Badge>
                            <Badge variant={
                              group.actionPlan.status === 'COMPLETED' ? 'success' :
                              group.actionPlan.status === 'IN_PROGRESS' ? 'warning' : 'neutral'
                            }>
                              {group.actionPlan.status}
                            </Badge>
                          </div>
                          <Button variant="neutral-primary" size="small">Update Status</Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
} 