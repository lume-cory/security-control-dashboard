export interface FrameworkAlignmentItem {
  name: string;
  type: 'framework' | 'regulation';
  alignment: number;
  effectiveDate: string;
  status: string;
  nonAlignedCount: number;
  color: string;
}

export const frameworkAlignmentData: FrameworkAlignmentItem[] = [
  { name: 'NIS2', type: 'regulation' as const, alignment: 92, effectiveDate: 'October 17, 2024', status: 'Active', nonAlignedCount: 4, color: 'hsl(var(--chart-2))' },
  { name: 'DORA', type: 'regulation' as const, alignment: 88, effectiveDate: 'January 1, 2025', status: 'Active', nonAlignedCount: 6, color: 'hsl(var(--chart-3))' },
  { name: 'HIPPA', type: 'regulation' as const, alignment: 95, effectiveDate: 'April 14, 2003', status: 'Active', nonAlignedCount: 2, color: 'hsl(var(--chart-4))' },
  { name: 'UK GDPR', type: 'regulation' as const, alignment: 99, effectiveDate: 'May 25, 2018', status: 'Active', nonAlignedCount: 1, color: 'hsl(var(--chart-5))' },
  { name: 'EU GDPR', type: 'regulation' as const, alignment: 99, effectiveDate: 'May 25, 2018', status: 'Active', nonAlignedCount: 1, color: 'hsl(var(--chart-6))' },
  { name: 'CCPA', type: 'regulation' as const, alignment: 99, effectiveDate: 'January 1, 2020', status: 'Active', nonAlignedCount: 1, color: 'hsl(var(--chart-7))' },
  { name: 'SOC2 Type 1', type: 'framework' as const, alignment: 99, effectiveDate: 'June 15, 2022', status: 'Active', nonAlignedCount: 1, color: 'hsl(var(--chart-8))' },
  { name: 'NIST CSF 2.0', type: 'framework' as const, alignment: 97, effectiveDate: 'February 12, 2023', status: 'Active', nonAlignedCount: 3, color: 'hsl(var(--chart-9))' },
  { name: 'ISO 27001', type: 'framework' as const, alignment: 98, effectiveDate: 'October 1, 2023', status: 'Active', nonAlignedCount: 2, color: 'hsl(var(--chart-10))' },
  { name: 'SEBI', type: 'regulation' as const, alignment: 89, effectiveDate: 'March 1, 2024', status: 'Active', nonAlignedCount: 11, color: 'hsl(var(--chart-11))' },
  { name: 'ISO 42001', type: 'framework' as const, alignment: 90, effectiveDate: 'June 15, 2022', status: 'Active', nonAlignedCount: 10, color: 'hsl(var(--chart-12))' },
  { name: 'NIST AI RMF', type: 'framework' as const, alignment: 85, effectiveDate: 'February 12, 2023', status: 'Active', nonAlignedCount: 15, color: 'hsl(var(--chart-13))' },
  { name: 'EU AI Act', type: 'regulation' as const, alignment: 72, effectiveDate: 'October 1, 2023', status: 'Active', nonAlignedCount: 8, color: 'hsl(var(--chart-14))' },
  { name: 'EU Cyber Resilience Act', type: 'regulation' as const, alignment: 75, effectiveDate: 'March 1, 2024', status: 'Active', nonAlignedCount: 11, color: 'hsl(var(--chart-15))' },
  { name: 'NY DFS', type: 'regulation' as const, alignment: 87, effectiveDate: 'April 15, 2024', status: 'Active', nonAlignedCount: 5, color: 'hsl(var(--chart-1))' }
]; 