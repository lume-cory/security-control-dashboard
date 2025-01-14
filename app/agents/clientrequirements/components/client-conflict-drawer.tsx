'use client'

import { useState } from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ExternalLink } from "lucide-react"

// Add this interface near the top with other interfaces
export interface ClientConflict {
    requirement: string;
    customers: Array<{
      name: string;
      requirement: string;
      compliant: boolean;
      evidence: string;
    }>;
    currentPolicy: string;
  }

interface ClientConflictDrawerProps {
  requirement: string;
  customers: Array<{
    name: string;
    requirement: string;
    compliant: boolean;
    evidence: string;
  }> | null;
  currentPolicy?: string;
  onOpenChange: () => void;
}

export function ClientConflictDrawer({
  requirement,
  customers,
  currentPolicy,
  onOpenChange
}: ClientConflictDrawerProps) {
  return (
    <Sheet open={!!customers} onOpenChange={onOpenChange}>
      <SheetContent style={{ maxWidth: 'min(33vw, 1200px)' }} className="w-full overflow-hidden" side="right">
        <SheetHeader>
          <SheetTitle>{requirement}</SheetTitle>
          <SheetDescription>Detailed view of conflicting requirements</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <h3 className="text-lg font-semibold mb-2">Current Company Policy</h3>
          <p className="mb-4">{currentPolicy}</p>
          <h3 className="text-lg font-semibold mb-2">Client Requirements</h3>
          {customers?.map((customer, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <h4 className="font-semibold">{customer.name}</h4>
              <p><strong>Requirement:</strong> {customer.requirement}</p>
              <a href="#" className="text-blue-500 hover:underline flex items-center mt-2">
                View Requirement Details <ExternalLink className="ml-1 h-4 w-4" />
              </a>
              <p><strong>Compliance Status:</strong> {customer.compliant ? 'Compliant' : 'Non-compliant'}</p>
              <p><strong>Evidence:</strong> {customer.evidence}</p>
              <a href="#" className="text-blue-500 hover:underline flex items-center mt-2">
                View Supporting Evidence <ExternalLink className="ml-1 h-4 w-4" />
              </a>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
} 