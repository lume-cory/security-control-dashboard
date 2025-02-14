'use client'

import { useState, useEffect } from 'react'
import { getSelectedFrameworks, saveSelectedFrameworks } from './data/selected-framework-state'
import { AlertsSection } from './components/alerts-section'
import { FrameworkAlignmentSection } from './components/framework-alignment-section'
import { AlignmentTrendSection } from './components/alignment-trend-section'
import { frameworkAlignmentData } from './data/framework-alignment-data'
import { FrameworkSelector } from './components/framework-selector'

export type DetailViewType = 'compliance-mapper' | 'hippa' | 'dora' | null;

interface HomeViewProps {
  activeView: DetailViewType;
  setActiveView: (view: DetailViewType) => void;
}

export const HomeViewComponent: React.FC<HomeViewProps> = ({ activeView, setActiveView }) => {
  const handleRegulationClick = (regulation: string) => {
    switch (regulation) {
      case 'DORA':
        setActiveView('dora');
        break;
      case 'HIPPA':
        setActiveView('hippa');
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
      
      <AlignmentTrendSection selectedItems={selectedItems} />

      <FrameworkSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        items={frameworkAlignmentData}
        selected={selectedItems}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}
