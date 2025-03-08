// Initial state with all frameworks selected
const DEFAULT_SELECTED_STATE = {
  'NIS2': true,
  'DORA': true,
  'HIPPA': true,
  'UK GDPR': true,
  'EU GDPR': true,
  'CCPA': true,
  'SOC2 Type 1': true,
  'NIST CSF 2.0': true,
  'ISO 27001': true,
  'EU AI Act': true,
  'ISO 42001': true,
  'NIST AI RMF': true,
  'SEBI': true,
  'NY DFS': true,
  'EU Cyber Resilience Act': true
};

export function getSelectedFrameworks(): Record<string, boolean> {
  if (typeof window === 'undefined') return DEFAULT_SELECTED_STATE;
  
  const stored = localStorage.getItem('selectedFrameworks');
  return stored ? JSON.parse(stored) : DEFAULT_SELECTED_STATE;
}

export function saveSelectedFrameworks(selected: Record<string, boolean>): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('selectedFrameworks', JSON.stringify(selected));
} 