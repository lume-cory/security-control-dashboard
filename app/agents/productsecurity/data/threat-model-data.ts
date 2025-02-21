import { getRelativeDate } from "@/app/agents/3p-risk/utils/date-utils"

export interface ThreatModelAssessment {
    id: string;
    name: string;
    date: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'NEEDS_REVIEW';
    projectTeam: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    criticalThreats: number;
    highThreats: number;
    mediumThreats: number;
    lowThreats: number;
    mitigationsImplemented: number;
    mitigationsTotal: number;
    confluenceLink?: string;
    systemDescription?: string;
    dataAnalysis?: {
        inputs: Array<{ type: string; sensitivity: string; description: string }>;
        outputs: Array<{ type: string; sensitivity: string; description: string }>;
    };
    dataFlows?: Array<{
        name: string;
        source: string;
        destination: string;
        dataType: string;
        protocol: string;
        port: string;
    }>;
    threats?: Array<{
        category: string;
        threat: string;
        severity: string;
        reasoning: string;
        mitigation: string;
        status: 'IMPLEMENTED' | 'IN_PROGRESS' | 'PLANNED' | 'NOT_STARTED';
    }>;
}

export const previousAssessments: ThreatModelAssessment[] = [
    {
        id: "1",
        name: "Customer Data API Gateway",
        date: getRelativeDate(-30),
        status: "COMPLETED",
        projectTeam: "API Platform",
        riskLevel: "HIGH",
        criticalThreats: 2,
        highThreats: 4,
        mediumThreats: 3,
        lowThreats: 5,
        mitigationsImplemented: 12,
        mitigationsTotal: 14,
        confluenceLink: "https://confluence.acme.com/security/threat-models/api-gateway",
        // ... include full assessment data
    },
    {
        id: "2",
        name: "Payment Processing Service",
        date: getRelativeDate(-45),
        status: "COMPLETED",
        projectTeam: "Payments",
        riskLevel: "CRITICAL",
        criticalThreats: 3,
        highThreats: 5,
        mediumThreats: 4,
        lowThreats: 2,
        mitigationsImplemented: 10,
        mitigationsTotal: 14,
        confluenceLink: "https://confluence.acme.com/security/threat-models/payments",
    },
    {
        id: "3",
        name: "User Authentication Service",
        date: getRelativeDate(-15),
        status: "NEEDS_REVIEW",
        projectTeam: "Identity",
        riskLevel: "MEDIUM",
        criticalThreats: 1,
        highThreats: 3,
        mediumThreats: 6,
        lowThreats: 4,
        mitigationsImplemented: 8,
        mitigationsTotal: 14,
        confluenceLink: "https://confluence.acme.com/security/threat-models/auth",
    }
]; 