import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { organizationalRisks } from "../data/risk-data"
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export function OrganizationRisksSection({ onSelectRisk }: { onSelectRisk: (risk: typeof organizationalRisks[0]) => void }) {
  const getTrendIcon = (trend: 'INCREASING' | 'DECREASING' | 'STABLE') => {
    switch (trend) {
      case 'INCREASING':
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case 'DECREASING':
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case 'STABLE':
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getSeverityColor = (severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW') => {
    switch (severity) {
      case 'CRITICAL': return 'bg-red-500'
      case 'HIGH': return 'bg-orange-500'
      case 'MEDIUM': return 'bg-yellow-500'
      case 'LOW': return 'bg-green-500'
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <h2 className="text-lg font-semibold">Top 10 Organizational Risks</h2>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {organizationalRisks.map(risk => (
            <div
              key={risk.id}
              onClick={() => onSelectRisk(risk)}
              className="p-4 border rounded-lg hover:bg-neutral-50 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">{risk.category}</h3>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
                    <div className={`w-2 h-2 rounded-full ${getSeverityColor(risk.severity)}`} />
                    {risk.severity}
                  </span>
                  {getTrendIcon(risk.trend)}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {risk.description}
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Owner:</span>
                  <span>{risk.owner.team}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last Assessment:</span>
                  <span>{new Date(risk.lastAssessment).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Next Review:</span>
                  <span>{new Date(risk.nextAssessment).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 