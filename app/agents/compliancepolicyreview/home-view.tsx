'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
// import { Button } from "@/components/ui/button"

const regulationsData = [
  { name: 'NIS2', alignment: 95, effectiveDate: 'October 17, 2024', status: 'Upcoming', nonAlignedCount: 3, color: 'hsl(var(--chart-2))' },
  { name: 'DORA', alignment: 98, effectiveDate: 'January 2025', status: 'Upcoming', nonAlignedCount: 2, color: 'hsl(var(--chart-1))' },
  { name: 'UK GDPR', alignment: 100, effectiveDate: 'May 2018', status: 'Active', nonAlignedCount: 0, color: 'hsl(var(--chart-3))' },
  { name: 'EU GDPR', alignment: 100, effectiveDate: 'May 2018', status: 'Active', nonAlignedCount: 0, color: 'hsl(var(--chart-4))' },
  { name: 'CCPA', alignment: 100, effectiveDate: 'January 2020', status: 'Active', nonAlignedCount: 0, color: 'hsl(var(--chart-5))' },
]

const alignmentOverTime = [
  { month: 'Nov', NIS2: 75, UKGDPR: 95, EUGDPR: 98, CCPA: 90 },
  { month: 'Dec', NIS2: 75, UKGDPR: 95, EUGDPR: 98, CCPA: 90 },
  { month: 'Jan', NIS2: 75, UKGDPR: 95, EUGDPR: 98, CCPA: 90 },
  { month: 'Feb', NIS2: 80, UKGDPR: 98, EUGDPR: 100, CCPA: 95 },
  { month: 'Mar', NIS2: 85, UKGDPR: 100, EUGDPR: 100, CCPA: 98 },
  { month: 'Apr', NIS2: 88, UKGDPR: 100, EUGDPR: 100, CCPA: 100 },
  { month: 'May', NIS2: 90, UKGDPR: 100, EUGDPR: 100, CCPA: 98 },
  { month: 'Jun', NIS2: 86, UKGDPR: 95, EUGDPR: 92, CCPA: 90 },
  { month: 'Jul', DORA: 72, NIS2: 92, UKGDPR: 100, EUGDPR: 96, CCPA: 92 },
  { month: 'Aug', DORA: 75, NIS2: 95, UKGDPR: 100, EUGDPR: 100, CCPA: 100 },
  { month: 'Sept', DORA: 88, NIS2: 95, UKGDPR: 100, EUGDPR: 100, CCPA: 100 },
  { month: 'Oct', DORA: 95, NIS2: 98, UKGDPR: 100, EUGDPR: 100, CCPA: 100 },
]

function RegulationCard({ name, alignment, effectiveDate, status, nonAlignedCount, color, onClick }: {
  name: string;
  alignment: number;
  effectiveDate: string;
  status: string;
  nonAlignedCount: number;
  color: string;
  onClick: () => void;
}) {
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
            <p className="text-sm font-medium text-gray-500">Effective Date</p>
            <p className="text-sm">{effectiveDate}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500">Status</p>
            <p className={`text-sm ${status === 'Active' ? 'text-green-600' : 'text-yellow-600'}`}>{status}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-gray-500">Non-aligned Requirements</p>
            <p className="text-sm font-bold text-red-600">{nonAlignedCount}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertCard({ title, description, aligned, nonAligned, onClick }: {
  title: string;
  description: string;
  aligned: number;
  nonAligned: number;
  onClick: () => void;
}) {
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
  )
}

interface HomeViewComponentProps {
  onNavigateToComplianceMapper: () => void;
}

export const HomeViewComponent: React.FC<HomeViewComponentProps> = ({ onNavigateToComplianceMapper }) => {
  const handleRegulationClick = (regulation: string) => {
    if (regulation === 'DORA' && typeof onNavigateToComplianceMapper === 'function') {
      onNavigateToComplianceMapper();
    }
  };

  const handleClick = () => {
    if (typeof onNavigateToComplianceMapper === 'function') {
      onNavigateToComplianceMapper();
    }
  };

  return (
    <div className="space-y-6 relative p-4 sm:p-6 md:p-8">
      <Card className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">
        <CardHeader>
          <CardTitle>Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertCard
              title="Security Policy v7"
              description="The latest revision of the Information Security Policy has resulted in misalignment with the NIST Cybersecurity Frameworks and 3 regulations."
              aligned={94}
              nonAligned={13}
              onClick={handleClick}
            />
            <AlertCard
              title="NIST CSF v2.0"
              description="A new version of NIST Cybersecurity Framework (CSF) v2.0 security framework was recently published. The Information Security Policy is misaligned with 4 controls."
              aligned={96}
              nonAligned={4}
              onClick={handleClick}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">
        <CardHeader>
          <CardTitle>Regulation Alignment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regulationsData.map((regulation) => (
              <RegulationCard 
                key={regulation.name}
                name={regulation.name}
                alignment={regulation.alignment}
                effectiveDate={regulation.effectiveDate}
                status={regulation.status}
                nonAlignedCount={regulation.nonAlignedCount}
                color={regulation.color}
                onClick={() => handleRegulationClick(regulation.name)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mx-6 sm:mx-8 md:mx-10 lg:mx-12">
        <CardHeader>
          <CardTitle>Alignment Trend Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              DORA: { label: "DORA", color: "hsl(var(--chart-1))" },
              NIS2: { label: "NIS2", color: "hsl(var(--chart-2))" },
              UKGDPR: { label: "UK GDPR", color: "hsl(var(--chart-3))" },
              EUGDPR: { label: "EU GDPR", color: "hsl(var(--chart-4))" },
              CCPA: { label: "CCPA", color: "hsl(var(--chart-5))" },
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={alignmentOverTime} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="month" />
                <YAxis
                  domain={[70, 100]}
                  ticks={[70, 75, 80, 85, 90, 95, 100]}
                  tickFormatter={(value) => `${value}%`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="DORA" stroke="hsl(var(--chart-1))" />
                <Line type="monotone" dataKey="NIS2" stroke="hsl(var(--chart-2))" />
                <Line type="monotone" dataKey="UKGDPR" stroke="hsl(var(--chart-3))" />
                <Line type="monotone" dataKey="EUGDPR" stroke="hsl(var(--chart-4))" />
                <Line type="monotone" dataKey="CCPA" stroke="hsl(var(--chart-5))" />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
      <button onClick={onNavigateToComplianceMapper}>Go to Compliance Mapper</button>
    </div>
  )
}
