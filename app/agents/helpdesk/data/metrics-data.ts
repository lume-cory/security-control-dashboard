export interface MetricCard {
  title: string;
  count?: number | string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    variant: 'success' | 'error' | 'neutral';
  };
  badges?: Array<{
    label: string;
    count: string;
    trend?: {
      value: number;
      direction: 'up' | 'down' | 'neutral';
      variant: 'success' | 'error' | 'neutral';
    };
  }>;
}

export const helpDeskMetrics: MetricCard[] = [
  {
    title: "Outstanding questions",
    badges: [
      {
        label: "Urgent",
        count: "3",
        trend: {
          value: 13,
          direction: 'up',
          variant: 'error'
        }
      },
      {
        label: "High",
        count: "2",
        trend: {
          value: 5,
          direction: 'down',
          variant: 'success'
        }
      },
      {
        label: "Medium",
        count: "2",
        trend: {
          value: 0,
          direction: 'neutral',
          variant: 'neutral'
        }
      },
      {
        label: "Low",
        count: "1",
        trend: {
          value: 25,
          direction: 'down',
          variant: 'success'
        }
      }
    ]
  },
  {
    title: "Average response time(past - 30 days)",
    count: "2.5 hours",
    trend: {
      value: 25,
      direction: 'up',
      variant: 'error'
    }
  },
  {
    title: "Missed SLAs(past - 30 days)",
    count: "9",
    trend: {
      value: 33,
      direction: 'down',
      variant: 'success'
    }
  },
  {
    title: "Average time to resolve(past - 30 days)",
    count: "4.4 days",
    trend: {
      value: 25,
      direction: 'down',
      variant: 'success'
    }
  },
  {
    title: "Resolved(past - 30 days)",
    count: "75",
    trend: {
      value: 33,
      direction: 'up',
      variant: 'neutral'
    }
  }
] 