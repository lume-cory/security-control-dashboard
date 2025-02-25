'use client'

import { useState, useEffect } from 'react'
import { getSelectedFrameworks, saveSelectedFrameworks } from './data/selected-framework-state'
import { AlertsSection } from './components/alerts-section'
import { FrameworkAlignmentSection } from './components/framework-alignment-section'
import { AlignmentTrendSection } from './components/alignment-trend-section'
import { frameworkAlignmentData } from './data/framework-alignment-data'
import { FrameworkSelector } from './components/framework-selector'
import { CommonControlFrameworkSection } from './components/common-control-framework-section'
import { CCFRequirement } from './data/common-control-framework'
import { AuditChat } from './components/audit-chat'
import { SecurityControlGroupCards } from '../controlgroups/components/security-control-group-cards'
import { securityControlGroups } from '../controlgroups/data/security-control-groups'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"


export type DetailViewType = 'compliance-mapper' | 'hippa' | 'dora' | 'soc2' | 'ccf' | null;

interface HomeViewProps {
  activeView: DetailViewType;
  setActiveView: (view: DetailViewType) => void;
  setSelectedCCFRequirement?: (requirement: CCFRequirement | null) => void;
}

export const HomeViewComponent: React.FC<HomeViewProps> = ({ 
  activeView, 
  setActiveView,
  setSelectedCCFRequirement 
}) => {
  const handleRegulationClick = (regulation: string) => {
    switch (regulation) {
      case 'DORA':
        setActiveView('dora');
        break;
      case 'HIPPA':
        setActiveView('hippa');
        break;
      case 'SOC2 Type 1':
        setActiveView('soc2');
        break;
      default:
        setActiveView(null);
    }
  };

  // Add state for selection modal and selected items
  const [showSelector, setShowSelector] = useState(false);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(() => {
    return getSelectedFrameworks();
  });

  // Add handler for selection changes
  const handleSelectionChange = (newSelection: Record<string, boolean>) => {
    setSelectedItems(newSelection);
    saveSelectedFrameworks(newSelection);
  };

  const handleCCFClick = (requirement: CCFRequirement) => {
    setActiveView('ccf');
    setSelectedCCFRequirement?.(requirement);
  };

  return (
    <div className="w-full transition-all duration-200 space-y-6">
      <AlertsSection onAlertClick={() => setActiveView('compliance-mapper')} />
      
      <FrameworkAlignmentSection 
        selectedItems={selectedItems}
        frameworkData={frameworkAlignmentData}
        onFrameworkClick={handleRegulationClick}
        onSelectorClick={() => setShowSelector(true)}
        onMapperClick={() => setActiveView('compliance-mapper')}
      />

      <CommonControlFrameworkSection 
        selectedItems={selectedItems} 
        onRequirementClick={handleCCFClick}
      />

      <Card>
        <CardHeader>
        <h2 className="text-xl font-bold">Security Control Groups</h2>
        </CardHeader>
        <CardContent>
          <SecurityControlGroupCards securityControlGroups={securityControlGroups} />
        </CardContent>
      </Card>

      <AlignmentTrendSection selectedItems={selectedItems} />

      <FrameworkSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        items={frameworkAlignmentData}
        selected={selectedItems}
        onSelectionChange={handleSelectionChange}
      />

      <AuditChat />

    </div>
  )
}
