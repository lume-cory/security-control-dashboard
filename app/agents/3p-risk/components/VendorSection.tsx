import { Button } from "@/subframe/components/Button"
import { Badge } from "@/subframe/components/Badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import * as SubframeCore from "@subframe/core"
import { vendors, type Vendor } from "@/app/agents/3p-risk/data/vendor-data"
import { VendorDetailView } from "./VendorDetailView"
import { calculateVendorComplianceSummary } from "../data/vendor-data"

export function VendorSection() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <h2 className="text-lg font-semibold">Vendors Policy & Control Compliance</h2>
          <Button 
            variant="brand-primary"
            icon="FeatherPlus"
            onClick={() => setShowAddDialog(true)}
          >
            Add Vendor
          </Button>
        </div>
      </CardHeader>
      <CardContent className="w-full">
        <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {vendors.map(vendor => (
            <div
              key={vendor.id}
              onClick={() => setSelectedVendor(vendor)}
              className="cursor-pointer rounded-md border p-4 hover:border-brand-primary hover:bg-neutral-50"
            >
              <div className="flex flex-col gap-1 mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-bold font-bold">{vendor.name}</h3>
                  <Badge variant={
                    vendor.status === 'COMPLIANT' ? 'success' :
                    vendor.status === 'NON_COMPLIANT' ? 'error' :
                    vendor.status === 'COMPLIANT_WITH_EXCEPTION' ? 'success' :
                    vendor.status === 'MORE_INFO_REQUESTED' ? 'warning' :
                    vendor.status === 'SUSPENDED' ? 'error' : 'warning'
                  } className="text-xs">
                    {vendor.status}
                  </Badge>
                </div>
                <p className="text-caption text-subtext-color">{vendor.category}</p>
              </div>

              {/* <div className="flex justify-between mb-2">
                  <p className="text-muted-foreground text-sm">Policy & Control Compliance:</p>
              </div> */}
              <div className="grid grid-cols-5 gap-2 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {calculateVendorComplianceSummary(vendor).exceeded}
                  </div>
                  <div className="text-sm text-muted-foreground">Exceeded</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-600">
                    {calculateVendorComplianceSummary(vendor).met}
                  </div>
                  <div className="text-sm text-muted-foreground">Met</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-red-600">
                    {calculateVendorComplianceSummary(vendor).notMet}
                  </div>
                  <div className="text-sm text-muted-foreground">Not Met</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-600">
                    {calculateVendorComplianceSummary(vendor).notAssessed}
                  </div>
                  <div className="text-sm text-muted-foreground">Not Assessed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-600">
                    {calculateVendorComplianceSummary(vendor).exception}
                  </div>
                  <div className="text-sm text-muted-foreground">Exception</div>
                </div>
              </div>

              <div className="space-y-2 mb-4 mt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Assessment:</span>
                  <span>{vendor.assessmentStatus.lastAssessment}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contract Renewal:</span>
                  <span>{vendor.criticalDates.contractRenewal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Assessment:</span>
                  <span>{vendor.criticalDates.nextAssessment}</span>
                </div>
              </div>

            </div>
          ))}
        </div>
      </CardContent>

      <VendorDetailView 
        vendor={selectedVendor}
        onClose={() => setSelectedVendor(null)}
      />

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Vendor</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vendor-name" className="text-right">Vendor Name</Label>
              <Input id="vendor-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="website" className="text-right">Website</Label>
              <Input id="website" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trust-center" className="text-right">Trust Center URL</Label>
              <Input id="trust-center" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contact-name" className="text-right">Point of Contact</Label>
              <Input id="contact-name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="contract" className="text-right">Contract</Label>
              <Input id="contract" type="file"  className="col-span-3"/>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowAddDialog(false)}>Add Vendor</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
} 