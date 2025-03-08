import { useState, useRef, useEffect } from 'react';
import { Button } from "@/subframe/components/Button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ConnectorFilterProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedStatuses: ('connected' | 'available' | 'coming-soon')[];
  setSelectedStatuses: (statuses: ('connected' | 'available' | 'coming-soon')[]) => void;
}

export function ConnectorFilter({
  categories,
  selectedCategories,
  setSelectedCategories,
  selectedStatuses,
  setSelectedStatuses
}: ConnectorFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleStatusChange = (status: 'connected' | 'available' | 'coming-soon') => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== status));
    } else {
      setSelectedStatuses([...selectedStatuses, status]);
    }
  };

  const handleSelectAll = () => {
    setSelectedCategories(categories);
    setSelectedStatuses(['connected', 'available', 'coming-soon']);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedStatuses([]);
  };

  const activeFiltersCount = 
    (selectedCategories.length < categories.length ? selectedCategories.length : 0) + 
    (selectedStatuses.length < 3 ? selectedStatuses.length : 0);

  return (
    <div className="relative" ref={dropdownRef}>
      <>
        <Button 
          variant="brand-secondary" 
          icon="FeatherFilter" 
          onClick={() => setIsOpen(!isOpen)}
          className="flex-shrink-0"
        >
          Filter
        </Button>
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-brand-primary rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 border">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Filters</h3>
              <div className="flex gap-2">
                <button 
                  onClick={handleSelectAll}
                  className="text-xs text-brand-primary hover:underline"
                >
                  Select All
                </button>
                <button 
                  onClick={handleClearAll}
                  className="text-xs text-brand-primary hover:underline"
                >
                  Clear All
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="text-sm font-bold mb-2">Status</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox 
                    id="status-connected" 
                    checked={selectedStatuses.includes('connected')}
                    onCheckedChange={() => handleStatusChange('connected')}
                  />
                  <Label htmlFor="status-connected" className="ml-2 text-sm">Connected</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    id="status-available" 
                    checked={selectedStatuses.includes('available')}
                    onCheckedChange={() => handleStatusChange('available')}
                  />
                  <Label htmlFor="status-available" className="ml-2 text-sm">Available</Label>
                </div>
                <div className="flex items-center">
                  <Checkbox 
                    id="status-coming-soon" 
                    checked={selectedStatuses.includes('coming-soon')}
                    onCheckedChange={() => handleStatusChange('coming-soon')}
                  />
                  <Label htmlFor="status-coming-soon" className="ml-2 text-sm">Coming Soon</Label>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold mb-2">Categories</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <Checkbox 
                      id={`category-${category}`} 
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => handleCategoryChange(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="ml-2 text-sm">{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* <div className="mt-4 flex justify-end">
              <Button 
                variant="brand-primary" 
                size="small"
                onClick={() => setIsOpen(false)}
              >
                Apply
              </Button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
} 