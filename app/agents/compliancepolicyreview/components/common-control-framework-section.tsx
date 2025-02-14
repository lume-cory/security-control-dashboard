import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { commonControlFrameworkData, CCFRequirement } from "../data/common-control-framework"


interface CommonControlFrameworkSectionProps {
  selectedItems: Record<string, boolean>;
  onRequirementClick: (requirement: CCFRequirement) => void;
}

export function CommonControlFrameworkSection({ selectedItems, onRequirementClick }: CommonControlFrameworkSectionProps) {
  // Filter requirements that have at least one selected regulation
  const filteredRequirements = commonControlFrameworkData
    .map(requirement => {
      const filteredRegulations = requirement.associatedRegulations
        .filter(reg => selectedItems[reg.name]);
      
      // Only keep non-compliant instances related to selected frameworks
      const filteredNonCompliantInstances = requirement.nonCompliantInstances
        .filter(instance => 
          filteredRegulations.some(reg => 
            requirement.associatedRegulations.find(r => r.name === reg.name)
          )
        );

      return {
        ...requirement,
        associatedRegulations: filteredRegulations,
        nonCompliantInstances: filteredNonCompliantInstances
      };
    })
    // Only show requirements that have at least one selected regulation
    .filter(requirement => requirement.associatedRegulations.length > 0);

  // Calculate totals using filtered requirements
  const totalActivePolicies = filteredRequirements.reduce((count, req) => 
    count + req.policies.filter(policy => policy.status === 'active').length, 0
  );
  
  const totalSuggestedPolicies = filteredRequirements.reduce((count, req) => 
    count + req.policies.filter(policy => policy.status === 'suggested').length, 0
  );

  const totalNonCompliantSystems = filteredRequirements.reduce((count, req) => 
    count + req.nonCompliantInstances.length, 0
  );

  const totalFrameworks = new Set(
    filteredRequirements.flatMap(req => req.associatedRegulations.map(reg => reg.name))
  ).size;

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Common Control Framework</CardTitle>
        </CardHeader>
        <CardContent>
          
          {/* Policy Status Overview */}
          <div className="mb-8">
            <Card className="border-0">
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {totalActivePolicies}
                    </div>
                    <div className="text-sm text-gray-500">Active Policies</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">
                      {totalSuggestedPolicies}
                    </div>
                    <div className="text-sm text-gray-500">Suggested Policy Updates</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {totalNonCompliantSystems}
                    </div>
                    <div className="text-sm text-gray-500">Non-compliant Systems</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {totalFrameworks}
                    </div>
                    <div className="text-sm text-gray-500">Associated Frameworks</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Non-Compliant Requirements */}
          <div className="mb-8">
            <h3 className="text-md font-semibold mb-4">Non-Compliant Requirements</h3>
            <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredRequirements
                .filter(req => req.nonCompliantInstances.length > 0)
                .map(req => (
                  <Card key={req.id} className="cursor-pointer" onClick={() => onRequirementClick(req)}>
                    <CardHeader>
                      <CardTitle className="text-base">{req.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Non-compliant instances</span>
                        <span className="text-lg font-bold text-red-600">
                          {req.nonCompliantInstances.length}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>

          <h3 className="text-md font-semibold mb-4">Common Control Requirements</h3>

          {/* Requirements List */}
          <div className="space-y-4">
            {filteredRequirements.map(requirement => (
              <div 
                key={requirement.id} 
                className="border rounded-lg p-4 cursor-pointer" 
                onClick={() => onRequirementClick(requirement)}
              >
                <h4 className="font-semibold">{requirement.summary}</h4>
                <p className="text-sm text-gray-500">Associated Frameworks: {requirement.associatedRegulations.map(reg => reg.name).join(', ')}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 