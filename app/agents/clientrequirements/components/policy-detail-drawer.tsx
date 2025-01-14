'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ExternalLink } from "lucide-react"

// Add this interface above the component
export interface Policy {
    name: string;
    description: string;
    customers: string[];
  }

interface PolicyDetailDrawerProps {
  policy: {
    name: string;
    description: string;
    customers: string[];
  } | null;
  onOpenChange: (open: boolean) => void;
}

export function PolicyDetailDrawer({
  policy,
  onOpenChange
}: PolicyDetailDrawerProps) {
  return (
    <Sheet open={!!policy} onOpenChange={onOpenChange}>
      <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
        <SheetHeader>
          <SheetTitle>{policy?.name}</SheetTitle>
          <SheetDescription>Detailed view of the company policy</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Policy Text</h3>
          <p className="mb-4">{policy?.description}</p>
          <h3 className="text-lg font-semibold mb-2">Dependent Customers</h3>
          <ul className="list-disc pl-5">
            {policy?.customers.map((customer, index) => (
              <li key={index}>{customer}</li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  )
} 