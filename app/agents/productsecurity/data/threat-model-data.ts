import { getRelativeDate } from "@/app/agents/3p-risk/utils/date-utils"

export interface ThreatModelAssessment {
    id: string;
    name: string;
    date: string;
    status: 'COMPLETED' | 'IN_PROGRESS' | 'NEEDS_REVIEW';
    projectTeam: string;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    designDocumentLink?: string;
    repositoryLink?: string;
    
    // From SystemDescription
    systemDescription: string;
    
    // From DataAnalysis
    dataAnalysis: Array<{
        type: string;
        description: string;
        sensitivity: string;
    }>;
    
    // From DataflowsTable
    dataFlows: Array<{
        name: string;
        source: string;
        destination: string;
        type: string;
        protocol: string;
        port: number | string;
    }>;
    
    // From ThreatsAnalysis
    threats: Array<{
        category: string;
        threat: string;
        riskLevel: string;
    }>;
    
    // From SeverityAssessment
    severityAssessments: Array<{
        threat: string;
        severity: string;
        reasoning: string;
    }>;
    
    // From MitigationProposals
    mitigations: Array<{
        threat: string;
        mitigation: string;
        status: 'IMPLEMENTED' | 'IN_PROGRESS' | 'PLANNED' | 'NOT_STARTED';
    }>;
    
    // From References
    references: Array<{
        name: string[];
        link: string;
    }>;
}

export const previousAssessments: ThreatModelAssessment[] = [
    {
        id: "1",
        name: "Vehicle Detection System",
        date: getRelativeDate(-30),
        status: "COMPLETED",
        projectTeam: "IoT Platform",
        riskLevel: "HIGH",
        designDocumentLink: "https://confluence.acme.com/security/threat-models/vehicle-detection",
        repositoryLink: "https://github.com/acme/vehicle-detection-system",
        
        systemDescription: `The system is an advanced video content analysis application designed for a city government's IoT camera network. It processes video feeds from cameras installed throughout the city to identify and track vehicles based on characteristics from uploaded images.

Key components of the system include:
1. IoT Camera Network: Distributed across the city, capturing real-time video footage.
2. Video Ingestion Service: Receives and processes incoming video streams from the IoT cameras.
3. Image Upload Interface: Allows users to upload reference images of vehicles.
4. Computer Vision Engine: Analyzes video content and compares it with uploaded images.
5. Vehicle Tracking Module: Identifies and tracks vehicles matching the specified characteristics.
6. Data Storage: Stores processed video data, vehicle information, and tracking results.
7. User Interface: Provides access to search, view results, and manage the system.
8. API Layer: Enables integration with other city systems and services.`,

        dataAnalysis: [
            { type: "Input", description: "Video feeds from IoT cameras", sensitivity: "High" },
            { type: "Input", description: "Uploaded vehicle images", sensitivity: "Medium" },
            { type: "Created", description: "Processed video metadata", sensitivity: "Medium" },
            { type: "Created", description: "Vehicle location data", sensitivity: "High" },
            { type: "Output", description: "Vehicle location reports", sensitivity: "High" }
        ],

        dataFlows: [
            {
                name: "Camera Feed Ingestion",
                source: "IoT Cameras",
                destination: "Video Ingestion Service",
                type: "Video Stream",
                protocol: "RTSP",
                port: 554
            },
            {
                name: "Video Analysis",
                source: "Video Ingestion Service",
                destination: "Computer Vision Engine",
                type: "Processed Video Data",
                protocol: "Internal",
                port: "N/A"
            },
            {
                name: "Data Storage",
                source: "Vehicle Tracking Module",
                destination: "Data Storage",
                type: "Structured Data",
                protocol: "Internal",
                port: "N/A"
            }
        ],

        threats: [
            { category: "Spoofing", threat: "Fake camera feeds injection", riskLevel: "High" },
            { category: "Information Disclosure", threat: "Leakage of sensitive vehicle location data", riskLevel: "Critical" },
            { category: "Denial of Service", threat: "Overwhelming the video ingestion service", riskLevel: "High" },
            { category: "Elevation of Privilege", threat: "Unauthorized access to admin functions", riskLevel: "Critical" }
        ],

        severityAssessments: [
            {
                threat: "Fake camera feeds injection",
                severity: "High",
                reasoning: "Could lead to false vehicle tracking and compromised decision-making"
            },
            {
                threat: "Leakage of sensitive vehicle location data",
                severity: "Critical",
                reasoning: "Violates privacy laws and could lead to misuse of information"
            },
            {
                threat: "Overwhelming the video ingestion service",
                severity: "High",
                reasoning: "May cause system-wide disruption and loss of real-time tracking capabilities"
            },
            {
                threat: "Unauthorized access to admin functions",
                severity: "Critical",
                reasoning: "Could lead to complete system compromise and data manipulation"
            }
        ],

        mitigations: [
            {
                threat: "Fake camera feeds injection",
                mitigation: "Implement strong authentication for IoT cameras and use digital signatures for video streams",
                status: "IN_PROGRESS"
            },
            {
                threat: "Leakage of sensitive vehicle location data",
                mitigation: "Enforce end-to-end encryption, implement data masking, and establish strict data access policies",
                status: "PLANNED"
            },
            {
                threat: "Overwhelming the video ingestion service",
                mitigation: "Implement rate limiting, use load balancers, and set up auto-scaling for the ingestion service",
                status: "IMPLEMENTED"
            },
            {
                threat: "Unauthorized access to admin functions",
                mitigation: "Enforce multi-factor authentication, implement least privilege access, and regularly audit admin accounts",
                status: "IMPLEMENTED"
            }
        ],

        references: [
            { name: ["OWASP Top 10 for IoT: https://owasp.org/www-project-internet-of-things/"], link: "https://owasp.org/www-project-internet-of-things/" },
            { name: ["NIST Special Publication 800-53: Security and Privacy Controls for Information Systems and Organizations"], link: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-4/final" },
            { name: ["ISO/IEC 27001:2013 Information Security Management Systems"], link: "https://www.iso.org/standard/54534.html" },
            { name: ["GDPR (General Data Protection Regulation) for handling personal data"], link: "https://gdpr.eu/" },
            { name: ["CISA Cybersecurity Best Practices for IoT Devices"], link: "https://www.cisa.gov/cybersecurity-best-practices-for-iot-devices" }
        ]
    },
    {
        id: "2",
        name: "Payment Processing Service",
        date: getRelativeDate(-45),
        status: "COMPLETED",
        projectTeam: "Payments",
        riskLevel: "CRITICAL",
        designDocumentLink: "https://confluence.acme.com/security/threat-models/payments",
        repositoryLink: "https://github.com/acme/payment-processing",
        
        systemDescription: `The Payment Processing Service is a critical financial system that handles all payment transactions for Acme Inc's e-commerce platform. It processes credit card payments, bank transfers, and digital wallet transactions.

Key components include:
1. Payment Gateway Integration
2. Transaction Processing Engine
3. Fraud Detection System
4. Payment Data Storage
5. Reconciliation System
6. Reporting Interface
7. Admin Dashboard
8. API Gateway for External Services`,

        dataAnalysis: [
            { type: "Input", description: "Credit card information", sensitivity: "High" },
            { type: "Input", description: "Bank account details", sensitivity: "High" },
            { type: "Created", description: "Transaction records", sensitivity: "High" },
            { type: "Created", description: "Payment tokens", sensitivity: "High" },
            { type: "Output", description: "Transaction receipts", sensitivity: "Medium" }
        ],

        dataFlows: [
            {
                name: "Payment Gateway Communication",
                source: "Payment Service",
                destination: "External Payment Gateway",
                type: "Payment Data",
                protocol: "HTTPS",
                port: 443
            },
            {
                name: "Database Storage",
                source: "Payment Service",
                destination: "Secure Database",
                type: "Transaction Data",
                protocol: "Internal",
                port: "N/A"
            },
            {
                name: "Fraud Check",
                source: "Payment Service",
                destination: "Fraud Detection System",
                type: "Transaction Metadata",
                protocol: "Internal",
                port: "N/A"
            }
        ],

        threats: [
            { category: "Spoofing", threat: "Unauthorized payment initiation", riskLevel: "Critical" },
            { category: "Tampering", threat: "Transaction amount modification", riskLevel: "Critical" },
            { category: "Information Disclosure", threat: "Credit card data exposure", riskLevel: "Critical" },
            { category: "Denial of Service", threat: "Payment service disruption", riskLevel: "High" }
        ],

        severityAssessments: [
            {
                threat: "Unauthorized payment initiation",
                severity: "Critical",
                reasoning: "Could result in financial loss and regulatory violations"
            },
            {
                threat: "Transaction amount modification",
                severity: "Critical",
                reasoning: "Direct financial impact and loss of customer trust"
            },
            {
                threat: "Credit card data exposure",
                severity: "Critical",
                reasoning: "PCI DSS violations and severe reputational damage"
            },
            {
                threat: "Payment service disruption",
                severity: "High",
                reasoning: "Revenue loss and customer dissatisfaction"
            }
        ],

        mitigations: [
            {
                threat: "Unauthorized payment initiation",
                mitigation: "Implement multi-factor authentication and request signing",
                status: "IMPLEMENTED"
            },
            {
                threat: "Transaction amount modification",
                mitigation: "Use digital signatures for all transaction data",
                status: "IMPLEMENTED"
            },
            {
                threat: "Credit card data exposure",
                mitigation: "Implement end-to-end encryption and tokenization",
                status: "IN_PROGRESS"
            },
            {
                threat: "Payment service disruption",
                mitigation: "Deploy redundant systems and DDoS protection",
                status: "IMPLEMENTED"
            }
        ],

        references: [
            { name: ["PCI DSS Requirements"], link: "https://www.pcisecuritystandards.org/" },
            { name: ["OWASP Top 10 Financial Application Risks"], link: "https://owasp.org/www-project-top-10/" },
            { name: ["NIST Guidelines for Financial Services Security"], link: "https://www.nist.gov/financial-services" }
        ]
    },
    {
        id: "3",
        name: "User Authentication Service",
        date: getRelativeDate(-15),
        status: "NEEDS_REVIEW",
        projectTeam: "Identity",
        riskLevel: "MEDIUM",
        designDocumentLink: "https://confluence.acme.com/security/threat-models/auth",
        repositoryLink: "https://github.com/acme/auth-service",
        
        systemDescription: `The User Authentication Service is a centralized authentication system that manages user identity and access control across all Acme Inc applications. It provides single sign-on capabilities and supports multiple authentication methods.

Key components include:
1. Identity Provider
2. OAuth 2.0 Authorization Server
3. Multi-factor Authentication System
4. User Directory Integration
5. Session Management
6. Password Policy Enforcement
7. Audit Logging System
8. Admin Console`,

        dataAnalysis: [
            { type: "Input", description: "User credentials", sensitivity: "High" },
            { type: "Input", description: "MFA tokens", sensitivity: "High" },
            { type: "Created", description: "Session tokens", sensitivity: "High" },
            { type: "Created", description: "Access logs", sensitivity: "Medium" },
            { type: "Output", description: "Authentication responses", sensitivity: "Medium" }
        ],

        dataFlows: [
            {
                name: "User Login",
                source: "Client Applications",
                destination: "Auth Service",
                type: "Credentials",
                protocol: "HTTPS",
                port: 443
            },
            {
                name: "Directory Sync",
                source: "Auth Service",
                destination: "LDAP Server",
                type: "User Data",
                protocol: "LDAPS",
                port: 636
            },
            {
                name: "Token Validation",
                source: "Resource Servers",
                destination: "Auth Service",
                type: "JWT Tokens",
                protocol: "HTTPS",
                port: 443
            }
        ],

        threats: [
            { category: "Spoofing", threat: "Credential stuffing attacks", riskLevel: "High" },
            { category: "Information Disclosure", threat: "Token exposure", riskLevel: "Medium" },
            { category: "Denial of Service", threat: "Authentication service disruption", riskLevel: "Medium" },
            { category: "Elevation of Privilege", threat: "Session hijacking", riskLevel: "High" }
        ],

        severityAssessments: [
            {
                threat: "Credential stuffing attacks",
                severity: "High",
                reasoning: "Could lead to unauthorized access to multiple accounts"
            },
            {
                threat: "Token exposure",
                severity: "Medium",
                reasoning: "Limited token lifetime reduces impact"
            },
            {
                threat: "Authentication service disruption",
                severity: "Medium",
                reasoning: "Affects all applications but has failover mechanisms"
            },
            {
                threat: "Session hijacking",
                severity: "High",
                reasoning: "Could result in unauthorized access to user accounts"
            }
        ],

        mitigations: [
            {
                threat: "Credential stuffing attacks",
                mitigation: "Implement rate limiting and CAPTCHA protection",
                status: "IN_PROGRESS"
            },
            {
                threat: "Token exposure",
                mitigation: "Use short-lived tokens and secure storage",
                status: "IMPLEMENTED"
            },
            {
                threat: "Authentication service disruption",
                mitigation: "Deploy in multiple regions with automatic failover",
                status: "PLANNED"
            },
            {
                threat: "Session hijacking",
                mitigation: "Implement secure session management and token binding",
                status: "IMPLEMENTED"
            }
        ],

        references: [
            { name: ["OAuth 2.0 Security Best Practices"], link: "https://oauth.net/2/security-best-practices/" },
            { name: ["NIST Digital Identity Guidelines"], link: "https://pages.nist.gov/800-63-3/" },
            { name: ["OWASP Authentication Cheat Sheet"], link: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html" }
        ]
    }
]; 