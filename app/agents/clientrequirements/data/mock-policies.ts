import { mockClientRequirements } from './mock-client-requirements'

// Generate policies from client requirements
const generatePoliciesFromRequirements = () => {
  const policies: Record<string, {
    description: string;
    policyLanguage: string;
    customers: string[];
  }> = {};

  mockClientRequirements.forEach(client => {
    client.requirements.forEach(req => {
      // Only include requirements that have an associated policy
      if (req.policy) {
        if (!policies[req.policy]) {
          policies[req.policy] = {
            description: req.description,
            policyLanguage: req.policyLanguage || '',
            customers: [client.name]
          };
        } else {
          // Add client to existing policy if not already included
          if (!policies[req.policy].customers.includes(client.name)) {
            policies[req.policy].customers.push(client.name);
          }
        }
      }
    });
  });

  return policies;
};

export const mockPolicies = generatePoliciesFromRequirements();