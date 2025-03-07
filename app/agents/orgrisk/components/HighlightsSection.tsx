import { Card, CardContent } from "@/components/ui/card"
import { organizationalRisks } from "../data/risk-data"
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react'

export function HighlightsSection() {
  const increasingRisks = organizationalRisks.filter(risk => risk.trend === 'INCREASING')
  const decreasingRisks = organizationalRisks.filter(risk => risk.trend === 'DECREASING')
  const criticalRisks = organizationalRisks.filter(risk => risk.severity === 'CRITICAL')
  const highRisks = organizationalRisks.filter(risk => risk.severity === 'HIGH')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
      {/* Risk Breakdown - Takes up 2 columns */}
      <Card className="lg:col-span-2 h-full">
        <CardContent className="pt-6 h-full flex flex-col justify-center">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-muted-foreground mb-6">Risk Breakdown</p>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2 text-center">
                <span className="text-4xl font-bold text-red-500 block">
                  {criticalRisks.length}
                </span>
                <span className="text-sm text-muted-foreground">Critical</span>
              </div>
              <div className="space-y-2 text-center">
                <span className="text-4xl font-bold text-orange-500 block">
                  {highRisks.length}
                </span>
                <span className="text-sm text-muted-foreground">High</span>
              </div>
              <div className="space-y-2 text-center">
                <span className="text-4xl font-bold text-yellow-500 block">
                  {organizationalRisks.filter(risk => risk.severity === 'MEDIUM').length}
                </span>
                <span className="text-sm text-muted-foreground">Medium</span>
              </div>
              <div className="space-y-2 text-center">
                <span className="text-4xl font-bold text-green-500 block">
                  {organizationalRisks.filter(risk => risk.severity === 'LOW').length}
                </span>
                <span className="text-sm text-muted-foreground">Low</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Summary - Takes up remaining 4 columns */}
      <div className="lg:col-span-4">
        <Card className="h-full">
          <CardContent className="pt-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-6">Risk Summary</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">This month, 3 risks increased in severity:</span> {' '}
                    {increasingRisks.map(risk => risk.category).join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">This month, 2 risks decreased in severity:</span> {' '}
                    {decreasingRisks.map(risk => risk.category).join(', ')} due to improved mitigation measures
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5" />
                <div>
                  <p className="text-sm">
                    <span className="font-medium">New regulatory developments</span> requiring immediate attention:
                    <span className="block mt-1 text-muted-foreground">NIS2, DORA, and updated GDPR enforcement</span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 