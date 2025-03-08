import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/subframe/components/Button"
import { RegulationCard } from "./regulation-card"
import { FrameworkAlignmentItem } from "../data/framework-alignment-data"

interface FrameworkAlignmentSectionProps {
  selectedItems: Record<string, boolean>;
  frameworkData: FrameworkAlignmentItem[];
  onFrameworkClick: (name: string) => void;
  onSelectorClick: () => void;
  onMapperClick: () => void;
}

export function FrameworkAlignmentSection({ 
  selectedItems, 
  frameworkData,
  onFrameworkClick,
  onSelectorClick,
  onMapperClick 
}: FrameworkAlignmentSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Framework Alignment</h2>
        <div className="flex gap-2">
            <Button
              size="medium"
              variant="brand-secondary"
              icon="FeatherFilter"
              onClick={onSelectorClick}
            >
              Select Frameworks
            </Button>
            <Button
              size="medium"
              variant="brand-primary"
              icon="FeatherMap"
              onClick={onMapperClick}
            >
              Compliance Mapper
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {frameworkData
            .filter(item => selectedItems[item.name])
            .sort((a, b) => a.alignment - b.alignment)
            .map((regulation) => (
              <RegulationCard
                key={regulation.name}
                {...regulation}
                onClick={() => onFrameworkClick(regulation.name)}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
} 