import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RegulationCardProps {
  name: string;
  alignment: number;
  effectiveDate: string;
  status: string;
  nonAlignedCount: number;
  color: string;
  onClick: () => void;
}

export function RegulationCard({ name, alignment, effectiveDate, status, nonAlignedCount, color, onClick }: RegulationCardProps) {
  return (
    <Card className="overflow-hidden cursor-pointer" onClick={onClick}>
      <div className="h-2" style={{ backgroundColor: color }}></div>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500">Alignment</p>
            <p className="text-2xl font-bold text-green-600">{alignment}%</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500">Enforcement Date</p>
            <p className="text-sm">{effectiveDate}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className={`text-sm ${status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{status}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500">Non-Compliant Requirements</p>
            <p className="text-sm font-bold text-red-600">{nonAlignedCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 