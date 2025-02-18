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

export function VendorSection() {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null)
  const [showAddDialog, setShowAddDialog] = useState(false)

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <span className="text-heading-3 font-heading-3">Third Party Vendors</span>
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
        <div className="grid grid-cols-3 gap-4 w-full">
          {vendors.map(vendor => (
            <div
              key={vendor.id}
              onClick={() => setSelectedVendor(vendor)}
              className="cursor-pointer rounded-md border p-4 hover:border-brand-primary hover:bg-neutral-50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-body-bold font-body-bold">{vendor.name}</h3>
                  <p className="text-caption text-subtext-color">{vendor.category}</p>
                </div>
                <Badge variant={
                  vendor.status === 'COMPLIANT' ? 'success' :
                  vendor.status === 'NON_COMPLIANT' ? 'error' :
                  vendor.status === 'COMPLIANT_WITH_EXCEPTION' ? 'warning' :
                  vendor.status === 'MORE_INFO_REQUESTED' ? 'warning' :
                  vendor.status === 'SUSPENDED' ? 'error' : 'neutral'
                }>
                  {vendor.status}
                </Badge>
              </div>
              <p className="mt-2 text-sm text-subtext-color">{vendor.description}</p>
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