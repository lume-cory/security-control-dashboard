import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/subframe/components/Button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FrameworkAlignmentItem } from "../data/framework-alignment-data"

interface FrameworkSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  items: FrameworkAlignmentItem[];
  selected: Record<string, boolean>;
  onSelectionChange: (newSelection: Record<string, boolean>) => void;
}

export function FrameworkSelector({ 
  isOpen, 
  onClose,
  items,
  selected,
  onSelectionChange 
}: FrameworkSelectorProps) {
  const frameworks = items.filter(item => item.type === 'framework');
  const regulations = items.filter(item => item.type === 'regulation');
  
  const [tempSelected, setTempSelected] = useState<Record<string, boolean>>(selected);

  useEffect(() => {
    if (isOpen) {
      setTempSelected(selected);
    }
  }, [isOpen, selected]);

  const handleToggle = (name: string) => {
    setTempSelected(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSelectAll = () => {
    setTempSelected(
      items.reduce((acc, item) => ({
        ...acc,
        [item.name]: true
      }), {})
    );
  };

  const handleDeselectAll = () => {
    setTempSelected(
      items.reduce((acc, item) => ({
        ...acc,
        [item.name]: false
      }), {})
    );
  };

  const handleUpdate = () => {
    onSelectionChange(tempSelected);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Applicable Frameworks & Regulations</DialogTitle>
          <div className="flex justify-end space-x-2 mt-2">
            <Button 
              variant="brand-secondary" 
              size="small"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
            <Button 
              variant="brand-secondary" 
              size="small"
              onClick={handleDeselectAll}
            >
              Deselect All
            </Button>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-3">Frameworks</h3>
            <ScrollArea className="h-[300px] pr-4">
              {frameworks.map((item) => (
                <div key={item.name} className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id={item.name}
                    checked={tempSelected[item.name]}
                    onCheckedChange={() => handleToggle(item.name)}
                  />
                  <label htmlFor={item.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {item.name}
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Regulations</h3>
            <ScrollArea className="h-[300px] pr-4">
              {regulations.map((item) => (
                <div key={item.name} className="flex items-center space-x-2 mb-2">
                  <Checkbox 
                    id={item.name}
                    checked={tempSelected[item.name]}
                    onCheckedChange={() => handleToggle(item.name)}
                  />
                  <label htmlFor={item.name} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {item.name}
                  </label>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="brand-secondary" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 