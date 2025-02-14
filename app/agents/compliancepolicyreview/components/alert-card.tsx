import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AlertCardProps {
  title: string;
  description: string;
  aligned: number;
  nonAligned: number;
  onClick: () => void;
}

export function AlertCard({ title, description, aligned, nonAligned, onClick }: AlertCardProps) {
  return (
    <Card className="cursor-pointer" onClick={onClick}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{aligned}%</p>
            <p className="text-sm text-gray-500">Aligned</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{nonAligned}</p>
            <p className="text-sm text-gray-500">Non-aligned instances</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 