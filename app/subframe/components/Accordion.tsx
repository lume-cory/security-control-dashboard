import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggle?: () => void;
  titleAsElement?: boolean;
}

export function Accordion({ title, children, isExpanded = false, onToggle, titleAsElement = false }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(isExpanded);
  
  useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);
  
  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) onToggle();
  };
  
  return (
    <div className="border rounded-md">
      <button
        type="button"
        className="flex w-full justify-between rounded-md px-4 py-2 text-left text-sm font-medium"
        onClick={handleToggle}
      >
        {titleAsElement ? title : <span>{title}</span>}
        <span className="ml-6 flex items-center">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-4 pt-2">
          {children}
        </div>
      )}
    </div>
  );
} 