import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { trendValues } from "../data/trend-data"

interface AlignmentTrendSectionProps {
  selectedItems: Record<string, boolean>;
}

export function AlignmentTrendSection({ selectedItems }: AlignmentTrendSectionProps) {
  const [alignmentOverTime, setAlignmentOverTime] = useState<Array<any>>([]);

  useEffect(() => {
    const getLast12Months = () => {
      const months = [];
      const today = new Date();
      
      for (let i = 11; i >= 0; i--) {
        const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
        months.push(d.toLocaleString('default', { month: 'short' }));
      }
      
      return months;
    };

    const months = getLast12Months();
    setAlignmentOverTime(months.map((month, index) => ({
      month,
      ...trendValues[index]
    })));
  }, []);

  if (alignmentOverTime.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alignment Trend Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            'DORA': { label: "DORA", color: "hsl(var(--chart-1))" },
            'NIS2': { label: "NIS2", color: "hsl(var(--chart-2))" },
            'HIPPA': { label: "HIPPA", color: "hsl(var(--chart-6))" },
            'UK GDPR': { label: "UK GDPR", color: "hsl(var(--chart-3))" },
            'EU GDPR': { label: "EU GDPR", color: "hsl(var(--chart-4))" },
            'CCPA': { label: "CCPA", color: "hsl(var(--chart-5))" },
            'SOC2 Type 1': { label: "SOC2 Type 1", color: "hsl(var(--chart-7))" },
            'NIST CSF 2.0': { label: "NIST CSF 2.0", color: "hsl(var(--chart-8))" },
            'ISO 27001': { label: "ISO 27001", color: "hsl(var(--chart-9))" },
            'SEBI': { label: "SEBI", color: "hsl(var(--chart-13))" }
          }}
          className="h-[300px] w-full transition-all duration-200"
        >
          <ResponsiveContainer>
            <LineChart data={alignmentOverTime}>
              <XAxis dataKey="month" />
              <YAxis domain={[60, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              {Object.entries({
                'DORA': { label: "DORA", color: "hsl(var(--chart-1))" },
                'NIS2': { label: "NIS2", color: "hsl(var(--chart-2))" },
                'HIPPA': { label: "HIPPA", color: "hsl(var(--chart-6))" },
                'UK GDPR': { label: "UK GDPR", color: "hsl(var(--chart-3))" },
                'EU GDPR': { label: "EU GDPR", color: "hsl(var(--chart-4))" },
                'CCPA': { label: "CCPA", color: "hsl(var(--chart-5))" },
                'SOC2 Type 1': { label: "SOC2 Type 1", color: "hsl(var(--chart-7))" },
                'NIST CSF 2.0': { label: "NIST CSF 2.0", color: "hsl(var(--chart-8))" },
                'ISO 27001': { label: "ISO 27001", color: "hsl(var(--chart-9))" },
                'SEBI': { label: "SEBI", color: "hsl(var(--chart-13))" }
              })
                .filter(([key]) => selectedItems[key])
                .map(([key, value]) => (
                  <Line 
                    key={key}
                    type="monotone" 
                    dataKey={key} 
                    stroke={value.color}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
} 