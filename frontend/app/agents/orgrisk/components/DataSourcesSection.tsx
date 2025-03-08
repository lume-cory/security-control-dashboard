import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { dataSources } from "../data/data-sources"
import { Zap, User, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export function DataSourcesSection() {
  const [isExpanded, setIsExpanded] = useState(false)
  const lastSync = new Date().toLocaleString()

  const getTypeIcon = (type: 'AUTOMATED' | 'MANUAL' | 'HYBRID') => {
    switch (type) {
      case 'AUTOMATED':
        return <Zap className="h-3 w-3" />
      case 'MANUAL':
        return <User className="h-3 w-3" />
      case 'HYBRID':
        return <User className="h-3 w-3" />
    }
  }

  return (
    <Card className="w-full">
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold">Data Sources & Integrations</h2>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            {`${dataSources.length} Active Sources`}
          </span>
          <span className="text-xs text-muted-foreground">
            Last synced: {lastSync}
          </span>
        </div>
        {isExpanded ? 
          <ChevronUp className="h-4 w-4 text-muted-foreground" /> : 
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        }
      </div>

      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {dataSources.map(source => (
              <div key={source.id} className="p-3 border rounded-lg flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-medium text-sm">{source.name}</h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium">
                    {getTypeIcon(source.type)}
                    {source.updateFrequency}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {source.integrations.map(integration => (
                    <span key={integration} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      {integration}
                    </span>
                  ))}
                </div>
                <div className="mt-auto text-xs text-muted-foreground text-right">
                  Last update: {new Date(source.lastUpdate).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
} 