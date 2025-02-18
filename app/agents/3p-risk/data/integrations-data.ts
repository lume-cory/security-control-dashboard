export interface Integration {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'pending' | 'error';
  lastSync?: string;
  errorMessage?: string;
}

export const integrations: Integration[] = [
  {
    id: "1",
    name: "SecurityScorecard",
    description: "Vendor security ratings and monitoring",
    status: "active",
    lastSync: "2024-03-15 09:00 AM"
  },
  {
    id: "2", 
    name: "OneTrust",
    description: "Vendor risk assessments and documentation",
    status: "error",
    lastSync: "2024-03-14 02:00 PM",
    errorMessage: "API authentication failed"
  },
  {
    id: "3",
    name: "Whistic",
    description: "Security profile sharing and validation",
    status: "pending"
  }
]; 