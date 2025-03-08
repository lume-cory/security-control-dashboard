export interface NistCSFControl {
    id: number;
    category: string;
    subCategory: string;
    subCategoryStatement: string;
    controlId: string;
    controlStatement: string;
    implemenationExamples: string;
  }
  
export const nistCsfV2Controls: NistCSFControl[] = [
    {
      "id": 1,
      "category": "GOVERN",
      "subCategory": "Organizational Context (GV.OC)",
      "subCategoryStatement": "Organizational Context (GV.OC): The circumstances - mission, stakeholder expectations, dependencies, and legal, regulatory, and contractual requirements - surrounding the organization's cybersecurity risk management decisions are understood",
      "controlId": "GV.OC-01",
      "controlStatement": "GV.OC-01: The organizational mission is understood and informs cybersecurity risk management",
      "implemenationExamples": "Ex1: Share the organization's mission (e.g., through vision and mission statements, marketing, and service strategies) to provide a basis for identifying risks that may impede that mission"
    },
    {
      "id": 2,
      "category": "GOVERN",
      "subCategory": "Organizational Context (GV.OC)",
      "subCategoryStatement": "Organizational Context (GV.OC): The circumstances - mission, stakeholder expectations, dependencies, and legal, regulatory, and contractual requirements - surrounding the organization's cybersecurity risk management decisions are understood",
      "controlId": "GV.OC-02",
      "controlStatement": "GV.OC-02: Internal and external stakeholders are understood, and their needs and expectations regarding cybersecurity risk management are understood and considered",
      "implemenationExamples": "Ex1: Identify relevant internal stakeholders and their cybersecurity-related expectations (e.g., performance and risk expectations of officers, directors, and advisors; cultural expectations of employees)\nEx2: Identify relevant external stakeholders and their cybersecurity-related expectations (e.g., privacy expectations of customers, business expectations of partnerships, compliance expectations of regulators, ethics expectations of society)"
    },
    {
      "id": 3,
      "category": "GOVERN",
      "subCategory": "Organizational Context (GV.OC)",
      "subCategoryStatement": "Organizational Context (GV.OC): The circumstances - mission, stakeholder expectations, dependencies, and legal, regulatory, and contractual requirements - surrounding the organization's cybersecurity risk management decisions are understood",
      "controlId": "GV.OC-03",
      "controlStatement": "GV.OC-03: Legal, regulatory, and contractual requirements regarding cybersecurity - including privacy and civil liberties obligations - are understood and managed",
      "implemenationExamples": "Ex1: Determine a process to track and manage legal and regulatory requirements regarding protection of individuals' information (e.g., Health Insurance Portability and Accountability Act, California Consumer Privacy Act, General Data Protection Regulation)\nEx2: Determine a process to track and manage contractual requirements for cybersecurity management of supplier, customer, and partner information\nEx3: Align the organization's cybersecurity strategy with legal, regulatory, and contractual requirements"
    },
    {
      "id": 4,
      "category": "GOVERN",
      "subCategory": "Organizational Context (GV.OC)",
      "subCategoryStatement": "Organizational Context (GV.OC): The circumstances - mission, stakeholder expectations, dependencies, and legal, regulatory, and contractual requirements - surrounding the organization's cybersecurity risk management decisions are understood",
      "controlId": "GV.OC-04",
      "controlStatement": "GV.OC-04: Critical objectives, capabilities, and services that external stakeholders depend on or expect from the organization are understood and communicated",
      "implemenationExamples": "Ex1: Establish criteria for determining the criticality of capabilities and services as viewed by internal and external stakeholders\nEx2: Determine (e.g., from a business impact analysis) assets and business operations that are vital to achieving mission objectives and the potential impact of a loss (or partial loss) of such operations\nEx3: Establish and communicate resilience objectives (e.g., recovery time objectives) for delivering critical capabilities and services in various operating states (e.g., under attack, during recovery, normal operation)"
    },
    {
      "id": 5,
      "category": "GOVERN",
      "subCategory": "Organizational Context (GV.OC)",
      "subCategoryStatement": "Organizational Context (GV.OC): The circumstances - mission, stakeholder expectations, dependencies, and legal, regulatory, and contractual requirements - surrounding the organization's cybersecurity risk management decisions are understood",
      "controlId": "GV.OC-05",
      "controlStatement": "GV.OC-05: Outcomes, capabilities, and services that the organization depends on are understood and communicated",
      "implemenationExamples": "Ex1: Create an inventory of the organization's dependencies on external resources (e.g., facilities, cloud-based hosting providers) and their relationships to organizational assets and business functions\nEx2: Identify and document external dependencies that are potential points of failure for the organization's critical capabilities and services, and share that information with appropriate personnel"
    },
    {
      "id": 6,
      "category": "GOVERN",
      "subCategory": "Risk Management Strategy (GV.RM)",
      "subCategoryStatement": "Risk Management Strategy (GV.RM): The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions",
      "controlId": "GV.RM-01",
      "controlStatement": "GV.RM-01: Risk management objectives are established and agreed to by organizational stakeholders",
      "implemenationExamples": "Ex1: Update near-term and long-term cybersecurity risk management objectives as part of annual strategic planning and when major changes occur\nEx2: Establish measurable objectives for cybersecurity risk management (e.g., manage the quality of user training, ensure adequate risk protection for industrial control systems)\nEx3: Senior leaders agree about cybersecurity objectives and use them for measuring and managing risk and performance"
    },
    {
      "id": 7,
      "category": "GOVERN",
      "subCategory": "Risk Management Strategy (GV.RM)",
      "subCategoryStatement": "Risk Management Strategy (GV.RM): The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions",
      "controlId": "GV.RM-02",
      "controlStatement": "GV.RM-02: Risk appetite and risk tolerance statements are established, communicated, and maintained",
      "implemenationExamples": "Ex1: Determine and communicate risk appetite statements that convey expectations about the appropriate level of risk for the organization\nEx2: Translate risk appetite statements into specific, measurable, and broadly understandable risk tolerance statements\nEx3: Refine organizational objectives and risk appetite periodically based on known risk exposure and residual risk"
    },
    {
      "id": 8,
      "category": "GOVERN",
      "subCategory": "Risk Management Strategy (GV.RM)",
      "subCategoryStatement": "Risk Management Strategy (GV.RM): The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions",
      "controlId": "GV.RM-03",
      "controlStatement": "GV.RM-03: Cybersecurity risk management activities and outcomes are included in enterprise risk management processes",
      "implemenationExamples": "Ex1: Aggregate and manage cybersecurity risks alongside other enterprise risks (e.g., compliance, financial, operational, regulatory, reputational, safety)\nEx2: Include cybersecurity risk managers in enterprise risk management planning\nEx3: Establish criteria for escalating cybersecurity risks within enterprise risk management"
    },
    {
      "id": 9,
      "category": "GOVERN",
      "subCategory": "Risk Management Strategy (GV.RM)",
      "subCategoryStatement": "Risk Management Strategy (GV.RM): The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions",
      "controlId": "GV.RM-04",
      "controlStatement": "GV.RM-04: Strategic direction that describes appropriate risk response options is established and communicated",
      "implemenationExamples": "Ex1: Specify criteria for accepting and avoiding cybersecurity risk for various classifications of data\nEx2: Determine whether to purchase cybersecurity insurance\nEx3: Document conditions under which shared responsibility models are acceptable (e.g., outsourcing certain cybersecurity functions, having a third party perform financial transactions on behalf of the organization, using public cloud-based services)"
    },
    {
      "id": 10,
      "category": "GOVERN",
      "subCategory": "Risk Management Strategy (GV.RM)",
      "subCategoryStatement": "Risk Management Strategy (GV.RM): The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions",
      "controlId": "GV.RM-05",
      "controlStatement": "GV.RM-05: Lines of communication across the organization are established for cybersecurity risks, including risks from suppliers and other third parties",
      "implemenationExamples": "Ex1: Determine how to update senior executives, directors, and management on the organization's cybersecurity posture at agreed-upon intervals\nEx2: Identify how all departments across the organization - such as management, operations, internal auditors, legal, acquisition, physical security, and HR - will communicate with each other about cybersecurity risks"
    },
    {
      "id": 11,
      "category": "GOVERN",
      "subCategory": "Risk Management Strategy (GV.RM)",
      "subCategoryStatement": "Risk Management Strategy (GV.RM): The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions",
      "controlId": "GV.RM-06",
      "controlStatement": "GV.RM-06: A standardized method for calculating, documenting, categorizing, and prioritizing cybersecurity risks is established and communicated",
      "implemenationExamples": "Ex1: Establish criteria for using a quantitative approach to cybersecurity risk analysis, and specify probability and exposure formulas\nEx2: Create and use templates (e.g., a risk register) to document cybersecurity risk information (e.g., risk description, exposure, treatment, and ownership)\nEx3: Establish criteria for risk prioritization at the appropriate levels within the enterprise\nEx4: Use a consistent list of risk categories to support integrating, aggregating, and comparing cybersecurity risks"
    },
    {
      "id": 12,
      "category": "GOVERN",
      "subCategory": "Risk Management Strategy (GV.RM)",
      "subCategoryStatement": "Risk Management Strategy (GV.RM): The organization's priorities, constraints, risk tolerance and appetite statements, and assumptions are established, communicated, and used to support operational risk decisions",
      "controlId": "GV.RM-07",
      "controlStatement": "GV.RM-07: Strategic opportunities (i.e., positive risks) are characterized and are included in organizational cybersecurity risk discussions",
      "implemenationExamples": "Ex1: Define and communicate guidance and methods for identifying opportunities and including them in risk discussions (e.g., strengths, weaknesses, opportunities, and threats [SWOT] analysis)\nEx2: Identify stretch goals and document them\nEx3: Calculate, document, and prioritize positive risks alongside negative risks"
    },
    {
      "id": 13,
      "category": "GOVERN",
      "subCategory": "Roles, Responsibilities, and Authorities (GV.RR)",
      "subCategoryStatement": "Roles, Responsibilities, and Authorities (GV.RR): Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated",
      "controlId": "GV.RR-01",
      "controlStatement": "GV.RR-01: Organizational leadership is responsible and accountable for cybersecurity risk and fosters a culture that is risk-aware, ethical, and continually improving",
      "implemenationExamples": "Ex1: Leaders (e.g., directors) agree on their roles and responsibilities in developing, implementing, and assessing the organization's cybersecurity strategy\nEx2: Share leaders' expectations regarding a secure and ethical culture, especially when current events present the opportunity to highlight positive or negative examples of cybersecurity risk management\nEx3: Leaders direct the CISO to maintain a comprehensive cybersecurity risk strategy and review and update it at least annually and after major events\nEx4: Conduct reviews to ensure adequate authority and coordination among those responsible for managing cybersecurity risk"
    },
    {
      "id": 14,
      "category": "GOVERN",
      "subCategory": "Roles, Responsibilities, and Authorities (GV.RR)",
      "subCategoryStatement": "Roles, Responsibilities, and Authorities (GV.RR): Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated",
      "controlId": "GV.RR-02",
      "controlStatement": "GV.RR-02: Roles, responsibilities, and authorities related to cybersecurity risk management are established, communicated, understood, and enforced",
      "implemenationExamples": "Ex1: Document risk management roles and responsibilities in policy\nEx2: Document who is responsible and accountable for cybersecurity risk management activities and how those teams and individuals are to be consulted and informed\nEx3: Include cybersecurity responsibilities and performance requirements in personnel descriptions\nEx4: Document performance goals for personnel with cybersecurity risk management responsibilities, and periodically measure performance to identify areas for improvement\nEx5: Clearly articulate cybersecurity responsibilities within operations, risk functions, and internal audit functions"
    },
    {
      "id": 15,
      "category": "GOVERN",
      "subCategory": "Roles, Responsibilities, and Authorities (GV.RR)",
      "subCategoryStatement": "Roles, Responsibilities, and Authorities (GV.RR): Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated",
      "controlId": "GV.RR-03",
      "controlStatement": "GV.RR-03: Adequate resources are allocated commensurate with the cybersecurity risk strategy, roles, responsibilities, and policies",
      "implemenationExamples": "Ex1: Conduct periodic management reviews to ensure that those given cybersecurity risk management responsibilities have the necessary authority\nEx2: Identify resource allocation and investment in line with risk tolerance and response\nEx3: Provide adequate and sufficient people, process, and technical resources to support the cybersecurity strategy"
    },
    {
      "id": 16,
      "category": "GOVERN",
      "subCategory": "Roles, Responsibilities, and Authorities (GV.RR)",
      "subCategoryStatement": "Roles, Responsibilities, and Authorities (GV.RR): Cybersecurity roles, responsibilities, and authorities to foster accountability, performance assessment, and continuous improvement are established and communicated",
      "controlId": "GV.RR-04",
      "controlStatement": "GV.RR-04: Cybersecurity is included in human resources practices",
      "implemenationExamples": "Ex1: Integrate cybersecurity risk management considerations into human resources processes (e.g., personnel screening, onboarding, change notification, offboarding)\nEx2: Consider cybersecurity knowledge to be a positive factor in hiring, training, and retention decisions\nEx3: Conduct background checks prior to onboarding new personnel for sensitive roles, and periodically repeat background checks for personnel with such roles\nEx4: Define and enforce obligations for personnel to be aware of, adhere to, and uphold security policies as they relate to their roles"
    },
    {
      "id": 17,
      "category": "GOVERN",
      "subCategory": "Policy (GV.PO)",
      "subCategoryStatement": "Policy (GV.PO): Organizational cybersecurity policy is established, communicated, and enforced",
      "controlId": "GV.PO-01",
      "controlStatement": "GV.PO-01: Policy for managing cybersecurity risks is established based on organizational context, cybersecurity strategy, and priorities and is communicated and enforced",
      "implemenationExamples": "Ex1: Create, disseminate, and maintain an understandable, usable risk management policy with statements of management intent, expectations, and direction\nEx2: Periodically review policy and supporting processes and procedures to ensure that they align with risk management strategy objectives and priorities, as well as the high-level direction of the cybersecurity policy\nEx3: Require approval from senior management on policy\nEx4: Communicate cybersecurity risk management policy and supporting processes and procedures across the organization\nEx5: Require personnel to acknowledge receipt of policy when first hired, annually, and whenever policy is updated"
    },
    {
      "id": 18,
      "category": "GOVERN",
      "subCategory": "Policy (GV.PO)",
      "subCategoryStatement": "Policy (GV.PO): Organizational cybersecurity policy is established, communicated, and enforced",
      "controlId": "GV.PO-02",
      "controlStatement": "GV.PO-02: Policy for managing cybersecurity risks is reviewed, updated, communicated, and enforced to reflect changes in requirements, threats, technology, and organizational mission",
      "implemenationExamples": "Ex1: Update policy based on periodic reviews of cybersecurity risk management results to ensure that policy and supporting processes and procedures adequately maintain risk at an acceptable level\nEx2: Provide a timeline for reviewing changes to the organization's risk environment (e.g., changes in risk or in the organization's mission objectives), and communicate recommended policy updates\nEx3: Update policy to reflect changes in legal and regulatory requirements\nEx4: Update policy to reflect changes in technology (e.g., adoption of artificial intelligence) and changes to the business (e.g., acquisition of a new business, new contract requirements)"
    },
    {
      "id": 19,
      "category": "GOVERN",
      "subCategory": "Oversight (GV.OV)",
      "subCategoryStatement": "Oversight (GV.OV): Results of organization-wide cybersecurity risk management activities and performance are used to inform, improve, and adjust the risk management strategy",
      "controlId": "GV.OV-01",
      "controlStatement": "GV.OV-01: Cybersecurity risk management strategy outcomes are reviewed to inform and adjust strategy and direction",
      "implemenationExamples": "Ex1: Measure how well the risk management strategy and risk results have helped leaders make decisions and achieve organizational objectives\nEx2: Examine whether cybersecurity risk strategies that impede operations or innovation should be adjusted"
    },
    {
      "id": 20,
      "category": "GOVERN",
      "subCategory": "Oversight (GV.OV)",
      "subCategoryStatement": "Oversight (GV.OV): Results of organization-wide cybersecurity risk management activities and performance are used to inform, improve, and adjust the risk management strategy",
      "controlId": "GV.OV-02",
      "controlStatement": "GV.OV-02: The cybersecurity risk management strategy is reviewed and adjusted to ensure coverage of organizational requirements and risks",
      "implemenationExamples": "Ex1: Review audit findings to confirm whether the existing cybersecurity strategy has ensured compliance with internal and external requirements\nEx2: Review the performance oversight of those in cybersecurity-related roles to determine whether policy changes are necessary\nEx3: Review strategy in light of cybersecurity incidents"
    },
    {
      "id": 21,
      "category": "GOVERN",
      "subCategory": "Oversight (GV.OV)",
      "subCategoryStatement": "Oversight (GV.OV): Results of organization-wide cybersecurity risk management activities and performance are used to inform, improve, and adjust the risk management strategy",
      "controlId": "GV.OV-03",
      "controlStatement": "GV.OV-03: Organizational cybersecurity risk management performance is evaluated and reviewed for adjustments needed",
      "implemenationExamples": "Ex1: Review key performance indicators (KPIs) to ensure that organization-wide policies and procedures achieve objectives\nEx2: Review key risk indicators (KRIs) to identify risks the organization faces, including likelihood and potential impact\nEx3: Collect and communicate metrics on cybersecurity risk management with senior leadership"
    },
    {
      "id": 22,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-01",
      "controlStatement": "GV.SC-01: A cybersecurity supply chain risk management program, strategy, objectives, policies, and processes are established and agreed to by organizational stakeholders",
      "implemenationExamples": "Ex1: Establish a strategy that expresses the objectives of the cybersecurity supply chain risk management program\nEx2: Develop the cybersecurity supply chain risk management program, including a plan (with milestones), policies, and procedures that guide implementation and improvement of the program, and share the policies and procedures with the organizational stakeholders\nEx3: Develop and implement program processes based on the strategy, objectives, policies, and procedures that are agreed upon and performed by the organizational stakeholders\nEx4: Establish a cross-organizational mechanism that ensures alignment between functions that contribute to cybersecurity supply chain risk management, such as cybersecurity, IT, operations, legal, human resources, and engineering"
    },
    {
      "id": 23,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-02",
      "controlStatement": "GV.SC-02: Cybersecurity roles and responsibilities for suppliers, customers, and partners are established, communicated, and coordinated internally and externally",
      "implemenationExamples": "Ex1: Identify one or more specific roles or positions that will be responsible and accountable for planning, resourcing, and executing cybersecurity supply chain risk management activities\nEx2: Document cybersecurity supply chain risk management roles and responsibilities in policy\nEx3: Create responsibility matrixes to document who will be responsible and accountable for cybersecurity supply chain risk management activities and how those teams and individuals will be consulted and informed\nEx4: Include cybersecurity supply chain risk management responsibilities and performance requirements in personnel descriptions to ensure clarity and improve accountability\nEx5: Document performance goals for personnel with cybersecurity risk management-specific responsibilities, and periodically measure them to demonstrate and improve performance\nEx6: Develop roles and responsibilities for suppliers, customers, and business partners to address shared responsibilities for applicable cybersecurity risks, and integrate them into organizational policies and applicable third-party agreements\nEx7: Internally communicate cybersecurity supply chain risk management roles and responsibilities for third parties\nEx8: Establish rules and protocols for information sharing and reporting processes between the organization and its suppliers"
    },
    {
      "id": 24,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-03",
      "controlStatement": "GV.SC-03: Cybersecurity supply chain risk management is integrated into cybersecurity and enterprise risk management, risk assessment, and improvement processes",
      "implemenationExamples": "Ex1: Identify areas of alignment and overlap with cybersecurity and enterprise risk management\nEx2: Establish integrated control sets for cybersecurity risk management and cybersecurity supply chain risk management\nEx3: Integrate cybersecurity supply chain risk management into improvement processes\nEx4: Escalate material cybersecurity risks in supply chains to senior management, and address them at the enterprise risk management level"
    },
    {
      "id": 25,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-04",
      "controlStatement": "GV.SC-04: Suppliers are known and prioritized by criticality",
      "implemenationExamples": "Ex1: Develop criteria for supplier criticality based on, for example, the sensitivity of data processed or possessed by suppliers, the degree of access to the organization's systems, and the importance of the products or services to the organization's mission\nEx2: Keep a record of all suppliers, and prioritize suppliers based on the criticality criteria"
    },
    {
      "id": 26,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-05",
      "controlStatement": "GV.SC-05: Requirements to address cybersecurity risks in supply chains are established, prioritized, and integrated into contracts and other types of agreements with suppliers and other relevant third parties",
      "implemenationExamples": "Ex1: Establish security requirements for suppliers, products, and services commensurate with their criticality level and potential impact if compromised\nEx2: Include all cybersecurity and supply chain requirements that third parties must follow and how compliance with the requirements may be verified in default contractual language\nEx3: Define the rules and protocols for information sharing between the organization and its suppliers and sub-tier suppliers in agreements\nEx4: Manage risk by including security requirements in agreements based on their criticality and potential impact if compromised\nEx5: Define security requirements in service-level agreements (SLAs) for monitoring suppliers for acceptable security performance throughout the supplier relationship lifecycle\nEx6: Contractually require suppliers to disclose cybersecurity features, functions, and vulnerabilities of their products and services for the life of the product or the term of service\nEx7: Contractually require suppliers to provide and maintain a current component inventory (e.g., software or hardware bill of materials) for critical products\nEx8: Contractually require suppliers to vet their employees and guard against insider threats\nEx9: Contractually require suppliers to provide evidence of performing acceptable security practices through, for example, self-attestation, conformance to known standards, certifications, or inspections\nEx10: Specify in contracts and other agreements the rights and responsibilities of the organization, its suppliers, and their supply chains, with respect to potential cybersecurity risks"
    },
    {
      "id": 27,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-06",
      "controlStatement": "GV.SC-06: Planning and due diligence are performed to reduce risks before entering into formal supplier or other third-party relationships",
      "implemenationExamples": "Ex1: Perform thorough due diligence on prospective suppliers that is consistent with procurement planning and commensurate with the level of risk, criticality, and complexity of each supplier relationship\nEx2: Assess the suitability of the technology and cybersecurity capabilities and the risk management practices of prospective suppliers\nEx3: Conduct supplier risk assessments against business and applicable cybersecurity requirements\nEx4: Assess the authenticity, integrity, and security of critical products prior to acquisition and use"
    },
    {
      "id": 28,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-07",
      "controlStatement": "GV.SC-07: The risks posed by a supplier, their products and services, and other third parties are understood, recorded, prioritized, assessed, responded to, and monitored over the course of the relationship",
      "implemenationExamples": "Ex1: Adjust assessment formats and frequencies based on the third party's reputation and the criticality of the products or services they provide\nEx2: Evaluate third parties' evidence of compliance with contractual cybersecurity requirements, such as self-attestations, warranties, certifications, and other artifacts\nEx3: Monitor critical suppliers to ensure that they are fulfilling their security obligations throughout the supplier relationship lifecycle using a variety of methods and techniques, such as inspections, audits, tests, or other forms of evaluation\nEx4: Monitor critical suppliers, services, and products for changes to their risk profiles, and reevaluate supplier criticality and risk impact accordingly\nEx5: Plan for unexpected supplier and supply chain-related interruptions to ensure business continuity"
    },
    {
      "id": 29,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-08",
      "controlStatement": "GV.SC-08: Relevant suppliers and other third parties are included in incident planning, response, and recovery activities",
      "implemenationExamples": "Ex1: Define and use rules and protocols for reporting incident response and recovery activities and the status between the organization and its suppliers\nEx2: Identify and document the roles and responsibilities of the organization and its suppliers for incident response\nEx3: Include critical suppliers in incident response exercises and simulations\nEx4: Define and coordinate crisis communication methods and protocols between the organization and its critical suppliers\nEx5: Conduct collaborative lessons learned sessions with critical suppliers"
    },
    {
      "id": 30,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-09",
      "controlStatement": "GV.SC-09: Supply chain security practices are integrated into cybersecurity and enterprise risk management programs, and their performance is monitored throughout the technology product and service life cycle",
      "implemenationExamples": "Ex1: Policies and procedures require provenance records for all acquired technology products and services\nEx2: Periodically provide risk reporting to leaders about how acquired components are proven to be untampered and authentic\nEx3: Communicate regularly among cybersecurity risk managers and operations personnel about the need to acquire software patches, updates, and upgrades only from authenticated and trustworthy software providers\nEx4: Review policies to ensure that they require approved supplier personnel to perform maintenance on supplier products\nEx5: Policies and procedure require checking upgrades to critical hardware for unauthorized changes"
    },
    {
      "id": 31,
      "category": "GOVERN",
      "subCategory": "Cybersecurity Supply Chain Risk Management (GV.SC)",
      "subCategoryStatement": "Cybersecurity Supply Chain Risk Management (GV.SC): Cyber supply chain risk management processes are identified, established, managed, monitored, and improved by organizational stakeholders",
      "controlId": "GV.SC-10",
      "controlStatement": "GV.SC-10: Cybersecurity supply chain risk management plans include provisions for activities that occur after the conclusion of a partnership or service agreement",
      "implemenationExamples": "Ex1: Establish processes for terminating critical relationships under both normal and adverse circumstances\nEx2: Define and implement plans for component end-of-life maintenance support and obsolescence\nEx3: Verify that supplier access to organization resources is deactivated promptly when it is no longer needed\nEx4: Verify that assets containing the organization's data are returned or properly disposed of in a timely, controlled, and safe manner\nEx5: Develop and execute a plan for terminating or transitioning supplier relationships that takes supply chain security risk and resiliency into account\nEx6: Mitigate risks to data and systems created by supplier termination\nEx7: Manage data leakage risks associated with supplier termination"
    },
    {
      "id": 32,
      "category": "IDENTIFY",
      "subCategory": "Asset Management (ID.AM)",
      "subCategoryStatement": "Asset Management (ID.AM): Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy",
      "controlId": "ID.AM-01",
      "controlStatement": "ID.AM-01: Inventories of hardware managed by the organization are maintained",
      "implemenationExamples": "Ex1: Maintain inventories for all types of hardware, including IT, IoT, OT, and mobile devices\nEx2: Constantly monitor networks to detect new hardware and automatically update inventories"
    },
    {
      "id": 33,
      "category": "IDENTIFY",
      "subCategory": "Asset Management (ID.AM)",
      "subCategoryStatement": "Asset Management (ID.AM): Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy",
      "controlId": "ID.AM-02",
      "controlStatement": "ID.AM-02: Inventories of software, services, and systems managed by the organization are maintained",
      "implemenationExamples": "Ex1: Maintain inventories for all types of software and services, including commercial-off-the-shelf, open-source, custom applications, API services, and cloud-based applications and services\nEx2: Constantly monitor all platforms, including containers and virtual machines, for software and service inventory changes\nEx3: Maintain an inventory of the organization's systems"
    },
    {
      "id": 34,
      "category": "IDENTIFY",
      "subCategory": "Asset Management (ID.AM)",
      "subCategoryStatement": "Asset Management (ID.AM): Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy",
      "controlId": "ID.AM-03",
      "controlStatement": "ID.AM-03: Representations of the organization's authorized network communication and internal and external network data flows are maintained",
      "implemenationExamples": "Ex1: Maintain baselines of communication and data flows within the organization's wired and wireless networks\nEx2: Maintain baselines of communication and data flows between the organization and third parties\nEx3: Maintain baselines of communication and data flows for the organization's infrastructure-as-a-service (IaaS) usage\nEx4: Maintain documentation of expected network ports, protocols, and services that are typically used among authorized systems"
    },
    {
      "id": 35,
      "category": "IDENTIFY",
      "subCategory": "Asset Management (ID.AM)",
      "subCategoryStatement": "Asset Management (ID.AM): Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy",
      "controlId": "ID.AM-04",
      "controlStatement": "ID.AM-04: Inventories of services provided by suppliers are maintained",
      "implemenationExamples": "Ex1: Inventory all external services used by the organization, including third-party infrastructure-as-a-service (IaaS), platform-as-a-service (PaaS), and software-as-a-service (SaaS) offerings; APIs; and other externally hosted application services\nEx2: Update the inventory when a new external service is going to be utilized to ensure adequate cybersecurity risk management monitoring of the organization's use of that service"
    },
    {
      "id": 36,
      "category": "IDENTIFY",
      "subCategory": "Asset Management (ID.AM)",
      "subCategoryStatement": "Asset Management (ID.AM): Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy",
      "controlId": "ID.AM-05",
      "controlStatement": "ID.AM-05: Assets are prioritized based on classification, criticality, resources, and impact on the mission",
      "implemenationExamples": "Ex1: Define criteria for prioritizing each class of assets\nEx2: Apply the prioritization criteria to assets\nEx3: Track the asset priorities and update them periodically or when significant changes to the organization occur"
    },
    {
      "id": 37,
      "category": "IDENTIFY",
      "subCategory": "Asset Management (ID.AM)",
      "subCategoryStatement": "Asset Management (ID.AM): Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy",
      "controlId": "ID.AM-07",
      "controlStatement": "ID.AM-07: Inventories of data and corresponding metadata for designated data types are maintained",
      "implemenationExamples": "Ex1: Maintain a list of the designated data types of interest (e.g., personally identifiable information, protected health information, financial account numbers, organization intellectual property, operational technology data)\nEx2: Continuously discover and analyze ad hoc data to identify new instances of designated data types\nEx3: Assign data classifications to designated data types through tags or labels\nEx4: Track the provenance, data owner, and geolocation of each instance of designated data types"
    },
    {
      "id": 38,
      "category": "IDENTIFY",
      "subCategory": "Asset Management (ID.AM)",
      "subCategoryStatement": "Asset Management (ID.AM): Assets (e.g., data, hardware, software, systems, facilities, services, people) that enable the organization to achieve business purposes are identified and managed consistent with their relative importance to organizational objectives and the organization's risk strategy",
      "controlId": "ID.AM-08",
      "controlStatement": "ID.AM-08: Systems, hardware, software, services, and data are managed throughout their life cycles",
      "implemenationExamples": "Ex1: Integrate cybersecurity considerations throughout the life cycles of systems, hardware, software, and services\nEx2: Integrate cybersecurity considerations into product life cycles\nEx3: Identify unofficial uses of technology to meet mission objectives (i.e., shadow IT)\nEx4: Periodically identify redundant systems, hardware, software, and services that unnecessarily increase the organization's attack surface\nEx5: Properly configure and secure systems, hardware, software, and services prior to their deployment in production\nEx6: Update inventories when systems, hardware, software, and services are moved or transferred within the organization\nEx7: Securely destroy stored data based on the organization's data retention policy using the prescribed destruction method, and keep and manage a record of the destructions\nEx8: Securely sanitize data storage when hardware is being retired, decommissioned, reassigned, or sent for repairs or replacement\nEx9: Offer methods for destroying paper, storage media, and other physical forms of data storage"
    },
    {
      "id": 39,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-01",
      "controlStatement": "ID.RA-01: Vulnerabilities in assets are identified, validated, and recorded",
      "implemenationExamples": "Ex1: Use vulnerability management technologies to identify unpatched and misconfigured software\nEx2: Assess network and system architectures for design and implementation weaknesses that affect cybersecurity\nEx3: Review, analyze, or test organization-developed software to identify design, coding, and default configuration vulnerabilities\nEx4: Assess facilities that house critical computing assets for physical vulnerabilities and resilience issues\nEx5: Monitor sources of cyber threat intelligence for information on new vulnerabilities in products and services\nEx6: Review processes and procedures for weaknesses that could be exploited to affect cybersecurity"
    },
    {
      "id": 40,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-02",
      "controlStatement": "ID.RA-02: Cyber threat intelligence is received from information sharing forums and sources",
      "implemenationExamples": "Ex1: Configure cybersecurity tools and technologies with detection or response capabilities to securely ingest cyber threat intelligence feeds\nEx2: Receive and review advisories from reputable third parties on current threat actors and their tactics, techniques, and procedures (TTPs)\nEx3: Monitor sources of cyber threat intelligence for information on the types of vulnerabilities that emerging technologies may have"
    },
    {
      "id": 41,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-03",
      "controlStatement": "ID.RA-03: Internal and external threats to the organization are identified and recorded",
      "implemenationExamples": "Ex1: Use cyber threat intelligence to maintain awareness of the types of threat actors likely to target the organization and the TTPs they are likely to use\nEx2: Perform threat hunting to look for signs of threat actors within the environment\nEx3: Implement processes for identifying internal threat actors"
    },
    {
      "id": 42,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-04",
      "controlStatement": "ID.RA-04: Potential impacts and likelihoods of threats exploiting vulnerabilities are identified and recorded",
      "implemenationExamples": "Ex1: Business leaders and cybersecurity risk management practitioners work together to estimate the likelihood and impact of risk scenarios and record them in risk registers\nEx2: Enumerate the potential business impacts of unauthorized access to the organization's communications, systems, and data processed in or by those systems\nEx3: Account for the potential impacts of cascading failures for systems of systems"
    },
    {
      "id": 43,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-05",
      "controlStatement": "ID.RA-05: Threats, vulnerabilities, likelihoods, and impacts are used to understand inherent risk and inform risk response prioritization",
      "implemenationExamples": "Ex1: Develop threat models to better understand risks to the data and identify appropriate risk responses\nEx2: Prioritize cybersecurity resource allocations and investments based on estimated likelihoods and impacts"
    },
    {
      "id": 44,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-06",
      "controlStatement": "ID.RA-06: Risk responses are chosen, prioritized, planned, tracked, and communicated",
      "implemenationExamples": "Ex1: Apply the vulnerability management plan's criteria for deciding whether to accept, transfer, mitigate, or avoid risk\nEx2: Apply the vulnerability management plan's criteria for selecting compensating controls to mitigate risk\nEx3: Track the progress of risk response implementation (e.g., plan of action and milestones [POA&M], risk register, risk detail report)\nEx4: Use risk assessment findings to inform risk response decisions and actions\nEx5: Communicate planned risk responses to affected stakeholders in priority order"
    },
    {
      "id": 45,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-07",
      "controlStatement": "ID.RA-07: Changes and exceptions are managed, assessed for risk impact, recorded, and tracked",
      "implemenationExamples": "Ex1: Implement and follow procedures for the formal documentation, review, testing, and approval of proposed changes and requested exceptions\nEx2: Document the possible risks of making or not making each proposed change, and provide guidance on rolling back changes\nEx3: Document the risks related to each requested exception and the plan for responding to those risks\nEx4: Periodically review risks that were accepted based upon planned future actions or milestones"
    },
    {
      "id": 46,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-08",
      "controlStatement": "ID.RA-08: Processes for receiving, analyzing, and responding to vulnerability disclosures are established",
      "implemenationExamples": "Ex1: Conduct vulnerability information sharing between the organization and its suppliers following the rules and protocols defined in contracts\nEx2: Assign responsibilities and verify the execution of procedures for processing, analyzing the impact of, and responding to cybersecurity threat, vulnerability, or incident disclosures by suppliers, customers, partners, and government cybersecurity organizations"
    },
    {
      "id": 47,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-09",
      "controlStatement": "ID.RA-09: The authenticity and integrity of hardware and software are assessed prior to acquisition and use",
      "implemenationExamples": "Ex1: Assess the authenticity and cybersecurity of critical technology products and services prior to acquisition and use"
    },
    {
      "id": 48,
      "category": "IDENTIFY",
      "subCategory": "Risk Assessment (ID.RA)",
      "subCategoryStatement": "Risk Assessment (ID.RA): The cybersecurity risk to the organization, assets, and individuals is understood by the organization",
      "controlId": "ID.RA-10",
      "controlStatement": "ID.RA-10: Critical suppliers are assessed prior to acquisition",
      "implemenationExamples": "Ex1: Conduct supplier risk assessments against business and applicable cybersecurity requirements, including the supply chain"
    },
    {
      "id": 49,
      "category": "IDENTIFY",
      "subCategory": "Improvement (ID.IM)",
      "subCategoryStatement": "Improvement (ID.IM): Improvements to organizational cybersecurity risk management processes, procedures and activities are identified across all CSF Functions",
      "controlId": "ID.IM-01",
      "controlStatement": "ID.IM-01: Improvements are identified from evaluations",
      "implemenationExamples": "Ex1: Perform self-assessments of critical services that take current threats and TTPs into consideration\nEx2: Invest in third-party assessments or independent audits of the effectiveness of the organization's cybersecurity program to identify areas that need improvement\nEx3: Constantly evaluate compliance with selected cybersecurity requirements through automated means"
    },
    {
      "id": 50,
      "category": "IDENTIFY",
      "subCategory": "Improvement (ID.IM)",
      "subCategoryStatement": "Improvement (ID.IM): Improvements to organizational cybersecurity risk management processes, procedures and activities are identified across all CSF Functions",
      "controlId": "ID.IM-02",
      "controlStatement": "ID.IM-02: Improvements are identified from security tests and exercises, including those done in coordination with suppliers and relevant third parties",
      "implemenationExamples": "Ex1: Identify improvements for future incident response activities based on findings from incident response assessments (e.g., tabletop exercises and simulations, tests, internal reviews, independent audits)\nEx2: Identify improvements for future business continuity, disaster recovery, and incident response activities based on exercises performed in coordination with critical service providers and product suppliers\nEx3: Involve internal stakeholders (e.g., senior executives, legal department, HR) in security tests and exercises as appropriate\nEx4: Perform penetration testing to identify opportunities to improve the security posture of selected high-risk systems as approved by leadership\nEx5: Exercise contingency plans for responding to and recovering from the discovery that products or services did not originate with the contracted supplier or partner or were altered before receipt\nEx6: Collect and analyze performance metrics using security tools and services to inform improvements to the cybersecurity program"
    },
    {
      "id": 51,
      "category": "IDENTIFY",
      "subCategory": "Improvement (ID.IM)",
      "subCategoryStatement": "Improvement (ID.IM): Improvements to organizational cybersecurity risk management processes, procedures and activities are identified across all CSF Functions",
      "controlId": "ID.IM-03",
      "controlStatement": "ID.IM-03: Improvements are identified from execution of operational processes, procedures, and activities",
      "implemenationExamples": "Ex1: Conduct collaborative lessons learned sessions with suppliers\nEx2: Annually review cybersecurity policies, processes, and procedures to take lessons learned into account\nEx3: Use metrics to assess operational cybersecurity performance over time"
    },
    {
      "id": 52,
      "category": "IDENTIFY",
      "subCategory": "Improvement (ID.IM)",
      "subCategoryStatement": "Improvement (ID.IM): Improvements to organizational cybersecurity risk management processes, procedures and activities are identified across all CSF Functions",
      "controlId": "ID.IM-04",
      "controlStatement": "ID.IM-04: Incident response plans and other cybersecurity plans that affect operations are established, communicated, maintained, and improved",
      "implemenationExamples": "Ex1: Establish contingency plans (e.g., incident response, business continuity, disaster recovery) for responding to and recovering from adverse events that can interfere with operations, expose confidential information, or otherwise endanger the organization's mission and viability\nEx2: Include contact and communication information, processes for handling common scenarios, and criteria for prioritization, escalation, and elevation in all contingency plans\nEx3: Create a vulnerability management plan to identify and assess all types of vulnerabilities and to prioritize, test, and implement risk responses\nEx4: Communicate cybersecurity plans (including updates) to those responsible for carrying them out and to affected parties\nEx5: Review and update all cybersecurity plans annually or when a need for significant improvements is identified"
    },
    {
      "id": 53,
      "category": "PROTECT",
      "subCategory": "Identity Management, Authentication, and Access Control (PR.AA)",
      "subCategoryStatement": "Identity Management, Authentication, and Access Control (PR.AA): Access to physical and logical assets is limited to authorized users, services, and hardware and  managed commensurate with the assessed risk of unauthorized access",
      "controlId": "PR.AA-01",
      "controlStatement": "PR.AA-01: Identities and credentials for authorized users, services, and hardware are managed by the organization",
      "implemenationExamples": "Ex1: Initiate requests for new access or additional access for employees, contractors, and others, and track, review, and fulfill the requests, with permission from system or data owners when needed\nEx2: Issue, manage, and revoke cryptographic certificates and identity tokens, cryptographic keys (i.e., key management), and other credentials\nEx3: Select a unique identifier for each device from immutable hardware characteristics or an identifier securely provisioned to the device\nEx4: Physically label authorized hardware with an identifier for inventory and servicing purposes"
    },
    {
      "id": 54,
      "category": "PROTECT",
      "subCategory": "Identity Management, Authentication, and Access Control (PR.AA)",
      "subCategoryStatement": "Identity Management, Authentication, and Access Control (PR.AA): Access to physical and logical assets is limited to authorized users, services, and hardware and  managed commensurate with the assessed risk of unauthorized access",
      "controlId": "PR.AA-02",
      "controlStatement": "PR.AA-02: Identities are proofed and bound to credentials based on the context of interactions",
      "implemenationExamples": "Ex1: Verify a person's claimed identity at enrollment time using government-issued identity credentials (e.g., passport, visa, driver's license)\nEx2: Issue a different credential for each person (i.e., no credential sharing)"
    },
    {
      "id": 55,
      "category": "PROTECT",
      "subCategory": "Identity Management, Authentication, and Access Control (PR.AA)",
      "subCategoryStatement": "Identity Management, Authentication, and Access Control (PR.AA): Access to physical and logical assets is limited to authorized users, services, and hardware and  managed commensurate with the assessed risk of unauthorized access",
      "controlId": "PR.AA-03",
      "controlStatement": "PR.AA-03: Users, services, and hardware are authenticated",
      "implemenationExamples": "Ex1: Require multifactor authentication\nEx2: Enforce policies for the minimum strength of passwords, PINs, and similar authenticators\nEx3: Periodically reauthenticate users, services, and hardware based on risk (e.g., in zero trust architectures)\nEx4: Ensure that authorized personnel can access accounts essential for protecting safety under emergency conditions"
    },
    {
      "id": 56,
      "category": "PROTECT",
      "subCategory": "Identity Management, Authentication, and Access Control (PR.AA)",
      "subCategoryStatement": "Identity Management, Authentication, and Access Control (PR.AA): Access to physical and logical assets is limited to authorized users, services, and hardware and  managed commensurate with the assessed risk of unauthorized access",
      "controlId": "PR.AA-04",
      "controlStatement": "PR.AA-04: Identity assertions are protected, conveyed, and verified",
      "implemenationExamples": "Ex1: Protect identity assertions that are used to convey authentication and user information through single sign-on systems\nEx2: Protect identity assertions that are used to convey authentication and user information between federated systems\nEx3: Implement standards-based approaches for identity assertions in all contexts, and follow all guidance for the generation (e.g., data models, metadata), protection (e.g., digital signing, encryption), and verification (e.g., signature validation) of identity assertions"
    },
    {
      "id": 57,
      "category": "PROTECT",
      "subCategory": "Identity Management, Authentication, and Access Control (PR.AA)",
      "subCategoryStatement": "Identity Management, Authentication, and Access Control (PR.AA): Access to physical and logical assets is limited to authorized users, services, and hardware and  managed commensurate with the assessed risk of unauthorized access",
      "controlId": "PR.AA-05",
      "controlStatement": "PR.AA-05: Access permissions, entitlements, and authorizations are defined in a policy, managed, enforced, and reviewed, and incorporate the principles of least privilege and separation of duties",
      "implemenationExamples": "Ex1: Review logical and physical access privileges periodically and whenever someone changes roles or leaves the organization, and promptly rescind privileges that are no longer needed\nEx2: Take attributes of the requester and the requested resource into account for authorization decisions (e.g., geolocation, day/time, requester endpoint's cyber health)\nEx3: Restrict access and privileges to the minimum necessary (e.g., zero trust architecture)\nEx4: Periodically review the privileges associated with critical business functions to confirm proper separation of duties"
    },
    {
      "id": 58,
      "category": "PROTECT",
      "subCategory": "Identity Management, Authentication, and Access Control (PR.AA)",
      "subCategoryStatement": "Identity Management, Authentication, and Access Control (PR.AA): Access to physical and logical assets is limited to authorized users, services, and hardware and  managed commensurate with the assessed risk of unauthorized access",
      "controlId": "PR.AA-06",
      "controlStatement": "PR.AA-06: Physical access to assets is managed, monitored, and enforced commensurate with risk",
      "implemenationExamples": "Ex1: Use security guards, security cameras, locked entrances, alarm systems, and other physical controls to monitor facilities and restrict access\nEx2: Employ additional physical security controls for areas that contain high-risk assets\nEx3: Escort guests, vendors, and other third parties within areas that contain business-critical assets"
    },
    {
      "id": 59,
      "category": "PROTECT",
      "subCategory": "Awareness and Training (PR.AT)",
      "subCategoryStatement": "Awareness and Training (PR.AT): The organization's personnel are provided with cybersecurity awareness and training so that they can perform their cybersecurity-related tasks",
      "controlId": "PR.AT-01",
      "controlStatement": "PR.AT-01: Personnel are provided with awareness and training so that they possess the knowledge and skills to perform general tasks with cybersecurity risks in mind",
      "implemenationExamples": "Ex1: Provide basic cybersecurity awareness and training to employees, contractors, partners, suppliers, and all other users of the organization's non-public resources\nEx2: Train personnel to recognize social engineering attempts and other common attacks, report attacks and suspicious activity, comply with acceptable use policies, and perform basic cyber hygiene tasks (e.g., patching software, choosing passwords, protecting credentials)\nEx3: Explain the consequences of cybersecurity policy violations, both to individual users and the organization as a whole\nEx4: Periodically assess or test users on their understanding of basic cybersecurity practices\nEx5: Require annual refreshers to reinforce existing practices and introduce new practices"
    },
    {
      "id": 60,
      "category": "PROTECT",
      "subCategory": "Awareness and Training (PR.AT)",
      "subCategoryStatement": "Awareness and Training (PR.AT): The organization's personnel are provided with cybersecurity awareness and training so that they can perform their cybersecurity-related tasks",
      "controlId": "PR.AT-02",
      "controlStatement": "PR.AT-02: Individuals in specialized roles are provided with awareness and training so that they possess the knowledge and skills to perform relevant tasks with cybersecurity risks in mind",
      "implemenationExamples": "Ex1: Identify the specialized roles within the organization that require additional cybersecurity training, such as physical and cybersecurity personnel, finance personnel, senior leadership, and anyone with access to business-critical data\nEx2: Provide role-based cybersecurity awareness and training to all those in specialized roles, including contractors, partners, suppliers, and other third parties\nEx3: Periodically assess or test users on their understanding of cybersecurity practices for their specialized roles\nEx4: Require annual refreshers to reinforce existing practices and introduce new practices"
    },
    {
      "id": 61,
      "category": "PROTECT",
      "subCategory": "Data Security (PR.DS)",
      "subCategoryStatement": "Data Security (PR.DS): Data are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information",
      "controlId": "PR.DS-01",
      "controlStatement": "PR.DS-01: The confidentiality, integrity, and availability of data-at-rest are protected",
      "implemenationExamples": "Ex1: Use encryption, digital signatures, and cryptographic hashes to protect the confidentiality and integrity of stored data in files, databases, virtual machine disk images, container images, and other resources\nEx2: Use full disk encryption to protect data stored on user endpoints\nEx3: Confirm the integrity of software by validating signatures\nEx4: Restrict the use of removable media to prevent data exfiltration\nEx5: Physically secure removable media containing unencrypted sensitive information, such as within locked offices or file cabinets"
    },
    {
      "id": 62,
      "category": "PROTECT",
      "subCategory": "Data Security (PR.DS)",
      "subCategoryStatement": "Data Security (PR.DS): Data are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information",
      "controlId": "PR.DS-02",
      "controlStatement": "PR.DS-02: The confidentiality, integrity, and availability of data-in-transit are protected",
      "implemenationExamples": "Ex1: Use encryption, digital signatures, and cryptographic hashes to protect the confidentiality and integrity of network communications\nEx2: Automatically encrypt or block outbound emails and other communications that contain sensitive data, depending on the data classification\nEx3: Block access to personal email, file sharing, file storage services, and other personal communications applications and services from organizational systems and networks\nEx4: Prevent reuse of sensitive data from production environments (e.g., customer records) in development, testing, and other non-production environments"
    },
    {
      "id": 63,
      "category": "PROTECT",
      "subCategory": "Data Security (PR.DS)",
      "subCategoryStatement": "Data Security (PR.DS): Data are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information",
      "controlId": "PR.DS-10",
      "controlStatement": "PR.DS-10: The confidentiality, integrity, and availability of data-in-use are protected",
      "implemenationExamples": "Ex1: Remove data that must remain confidential (e.g., from processors and memory) as soon as it is no longer needed\nEx2: Protect data in use from access by other users and processes of the same platform"
    },
    {
      "id": 64,
      "category": "PROTECT",
      "subCategory": "Data Security (PR.DS)",
      "subCategoryStatement": "Data Security (PR.DS): Data are managed consistent with the organization's risk strategy to protect the confidentiality, integrity, and availability of information",
      "controlId": "PR.DS-11",
      "controlStatement": "PR.DS-11: Backups of data are created, protected, maintained, and tested",
      "implemenationExamples": "Ex1: Continuously back up critical data in near-real-time, and back up other data frequently at agreed-upon schedules\nEx2: Test backups and restores for all types of data sources at least annually\nEx3: Securely store some backups offline and offsite so that an incident or disaster will not damage them\nEx4: Enforce geographic separation and geolocation restrictions for data backup storage"
    },
    {
      "id": 65,
      "category": "PROTECT",
      "subCategory": "Platform Security (PR.PS)",
      "subCategoryStatement": "Platform Security (PR.PS): The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization's risk strategy to protect their confidentiality, integrity, and availability",
      "controlId": "PR.PS-01",
      "controlStatement": "PR.PS-01: Configuration management practices are established and applied",
      "implemenationExamples": "Ex1: Establish, test, deploy, and maintain hardened baselines that enforce the organization's cybersecurity policies and provide only essential capabilities (i.e., principle of least functionality)\nEx2: Review all default configuration settings that may potentially impact cybersecurity when installing or upgrading software\nEx3: Monitor implemented software for deviations from approved baselines"
    },
    {
      "id": 66,
      "category": "PROTECT",
      "subCategory": "Platform Security (PR.PS)",
      "subCategoryStatement": "Platform Security (PR.PS): The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization's risk strategy to protect their confidentiality, integrity, and availability",
      "controlId": "PR.PS-02",
      "controlStatement": "PR.PS-02: Software is maintained, replaced, and removed commensurate with risk",
      "implemenationExamples": "Ex1: Perform routine and emergency patching within the timeframes specified in the vulnerability management plan\nEx2: Update container images, and deploy new container instances to replace rather than update existing instances\nEx3: Replace end-of-life software and service versions with supported, maintained versions\nEx4: Uninstall and remove unauthorized software and services that pose undue risks\nEx5: Uninstall and remove any unnecessary software components (e.g., operating system utilities) that attackers might misuse\nEx6: Define and implement plans for software and service end-of-life maintenance support and obsolescence"
    },
    {
      "id": 67,
      "category": "PROTECT",
      "subCategory": "Platform Security (PR.PS)",
      "subCategoryStatement": "Platform Security (PR.PS): The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization's risk strategy to protect their confidentiality, integrity, and availability",
      "controlId": "PR.PS-03",
      "controlStatement": "PR.PS-03: Hardware is maintained, replaced, and removed commensurate with risk",
      "implemenationExamples": "Ex1: Replace hardware when it lacks needed security capabilities or when it cannot support software with needed security capabilities\nEx2: Define and implement plans for hardware end-of-life maintenance support and obsolescence\nEx3: Perform hardware disposal in a secure, responsible, and auditable manner"
    },
    {
      "id": 68,
      "category": "PROTECT",
      "subCategory": "Platform Security (PR.PS)",
      "subCategoryStatement": "Platform Security (PR.PS): The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization's risk strategy to protect their confidentiality, integrity, and availability",
      "controlId": "PR.PS-04",
      "controlStatement": "PR.PS-04: Log records are generated and made available for continuous monitoring",
      "implemenationExamples": "Ex1: Configure all operating systems, applications, and services (including cloud-based services) to generate log records\nEx2: Configure log generators to securely share their logs with the organization's logging infrastructure systems and services\nEx3: Configure log generators to record the data needed by zero-trust architectures"
    },
    {
      "id": 69,
      "category": "PROTECT",
      "subCategory": "Platform Security (PR.PS)",
      "subCategoryStatement": "Platform Security (PR.PS): The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization's risk strategy to protect their confidentiality, integrity, and availability",
      "controlId": "PR.PS-05",
      "controlStatement": "PR.PS-05: Installation and execution of unauthorized software are prevented",
      "implemenationExamples": "Ex1: When risk warrants it, restrict software execution to permitted products only or deny the execution of prohibited and unauthorized software\nEx2: Verify the source of new software and the software's integrity before installing it\nEx3: Configure platforms to use only approved DNS services that block access to known malicious domains\nEx4: Configure platforms to allow the installation of organization-approved software only"
    },
    {
      "id": 70,
      "category": "PROTECT",
      "subCategory": "Platform Security (PR.PS)",
      "subCategoryStatement": "Platform Security (PR.PS): The hardware, software (e.g., firmware, operating systems, applications), and services of physical and virtual platforms are managed consistent with the organization's risk strategy to protect their confidentiality, integrity, and availability",
      "controlId": "PR.PS-06",
      "controlStatement": "PR.PS-06: Secure software development practices are integrated, and their performance is monitored throughout the software development life cycle",
      "implemenationExamples": "Ex1: Protect all components of organization-developed software from tampering and unauthorized access\nEx2: Secure all software produced by the organization, with minimal vulnerabilities in their releases\nEx3: Maintain the software used in production environments, and securely dispose of software once it is no longer needed"
    },
    {
      "id": 71,
      "category": "PROTECT",
      "subCategory": "Technology Infrastructure Resilience (PR.IR)",
      "subCategoryStatement": "Technology Infrastructure Resilience (PR.IR): Security architectures are managed with the organization's risk strategy to protect asset confidentiality, integrity, and availability, and organizational resilience",
      "controlId": "PR.IR-01",
      "controlStatement": "PR.IR-01: Networks and environments are protected from unauthorized logical access and usage",
      "implemenationExamples": "Ex1: Logically segment organization networks and cloud-based platforms according to trust boundaries and platform types (e.g., IT, IoT, OT, mobile, guests), and permit required communications only between segments\nEx2: Logically segment organization networks from external networks, and permit only necessary communications to enter the organization's networks from the external networks\nEx3: Implement zero trust architectures to restrict network access to each resource to the minimum necessary\nEx4: Check the cyber health of endpoints before allowing them to access and use production resources"
    },
    {
      "id": 72,
      "category": "PROTECT",
      "subCategory": "Technology Infrastructure Resilience (PR.IR)",
      "subCategoryStatement": "Technology Infrastructure Resilience (PR.IR): Security architectures are managed with the organization's risk strategy to protect asset confidentiality, integrity, and availability, and organizational resilience",
      "controlId": "PR.IR-02",
      "controlStatement": "PR.IR-02: The organization's technology assets are protected from environmental threats",
      "implemenationExamples": "Ex1: Protect organizational equipment from known environmental threats, such as flooding, fire, wind, and excessive heat and humidity\nEx2: Include protection from environmental threats and provisions for adequate operating infrastructure in requirements for service providers that operate systems on the organization's behalf"
    },
    {
      "id": 73,
      "category": "PROTECT",
      "subCategory": "Technology Infrastructure Resilience (PR.IR)",
      "subCategoryStatement": "Technology Infrastructure Resilience (PR.IR): Security architectures are managed with the organization's risk strategy to protect asset confidentiality, integrity, and availability, and organizational resilience",
      "controlId": "PR.IR-03",
      "controlStatement": "PR.IR-03: Mechanisms are implemented to achieve resilience requirements in normal and adverse situations",
      "implemenationExamples": "Ex1: Avoid single points of failure in systems and infrastructure\nEx2: Use load balancing to increase capacity and improve reliability\nEx3: Use high-availability components like redundant storage and power supplies to improve system reliability"
    },
    {
      "id": 74,
      "category": "PROTECT",
      "subCategory": "Technology Infrastructure Resilience (PR.IR)",
      "subCategoryStatement": "Technology Infrastructure Resilience (PR.IR): Security architectures are managed with the organization's risk strategy to protect asset confidentiality, integrity, and availability, and organizational resilience",
      "controlId": "PR.IR-04",
      "controlStatement": "PR.IR-04: Adequate resource capacity to ensure availability is maintained",
      "implemenationExamples": "Ex1: Monitor usage of storage, power, compute, network bandwidth, and other resources\nEx2: Forecast future needs, and scale resources accordingly"
    },
    {
      "id": 75,
      "category": "DETECT",
      "subCategory": "Continuous Monitoring (DE.CM)",
      "subCategoryStatement": "Continuous Monitoring (DE.CM): Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events",
      "controlId": "DE.CM-01",
      "controlStatement": "DE.CM-01: Networks and network services are monitored to find potentially adverse events",
      "implemenationExamples": "Ex1: Monitor DNS, BGP, and other network services for adverse events\nEx2: Monitor wired and wireless networks for connections from unauthorized endpoints\nEx3: Monitor facilities for unauthorized or rogue wireless networks\nEx4: Compare actual network flows against baselines to detect deviations\nEx5: Monitor network communications to identify changes in security postures for zero trust purposes"
    },
    {
      "id": 76,
      "category": "DETECT",
      "subCategory": "Continuous Monitoring (DE.CM)",
      "subCategoryStatement": "Continuous Monitoring (DE.CM): Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events",
      "controlId": "DE.CM-02",
      "controlStatement": "DE.CM-02: The physical environment is monitored to find potentially adverse events",
      "implemenationExamples": "Ex1: Monitor logs from physical access control systems (e.g., badge readers) to find unusual access patterns (e.g., deviations from the norm) and failed access attempts\nEx2: Review and monitor physical access records (e.g., from visitor registration, sign-in sheets)\nEx3: Monitor physical access controls (e.g., locks, latches, hinge pins, alarms) for signs of tampering\nEx4: Monitor the physical environment using alarm systems, cameras, and security guards"
    },
    {
      "id": 77,
      "category": "DETECT",
      "subCategory": "Continuous Monitoring (DE.CM)",
      "subCategoryStatement": "Continuous Monitoring (DE.CM): Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events",
      "controlId": "DE.CM-03",
      "controlStatement": "DE.CM-03: Personnel activity and technology usage are monitored to find potentially adverse events",
      "implemenationExamples": "Ex1: Use behavior analytics software to detect anomalous user activity to mitigate insider threats\nEx2: Monitor logs from logical access control systems to find unusual access patterns and failed access attempts\nEx3: Continuously monitor deception technology, including user accounts, for any usage"
    },
    {
      "id": 78,
      "category": "DETECT",
      "subCategory": "Continuous Monitoring (DE.CM)",
      "subCategoryStatement": "Continuous Monitoring (DE.CM): Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events",
      "controlId": "DE.CM-06",
      "controlStatement": "DE.CM-06: External service provider activities and services are monitored to find potentially adverse events",
      "implemenationExamples": "Ex1: Monitor remote and onsite administration and maintenance activities that external providers perform on organizational systems\nEx2: Monitor activity from cloud-based services, internet service providers, and other service providers for deviations from expected behavior"
    },
    {
      "id": 79,
      "category": "DETECT",
      "subCategory": "Continuous Monitoring (DE.CM)",
      "subCategoryStatement": "Continuous Monitoring (DE.CM): Assets are monitored to find anomalies, indicators of compromise, and other potentially adverse events",
      "controlId": "DE.CM-09",
      "controlStatement": "DE.CM-09: Computing hardware and software, runtime environments, and their data are monitored to find potentially adverse events",
      "implemenationExamples": "Ex1: Monitor email, web, file sharing, collaboration services, and other common attack vectors to detect malware, phishing, data leaks and exfiltration, and other adverse events\nEx2: Monitor authentication attempts to identify attacks against credentials and unauthorized credential reuse\nEx3: Monitor software configurations for deviations from security baselines\nEx4: Monitor hardware and software for signs of tampering\nEx5: Use technologies with a presence on endpoints to detect cyber health issues (e.g., missing patches, malware infections, unauthorized software), and redirect the endpoints to a remediation environment before access is authorized"
    },
    {
      "id": 80,
      "category": "DETECT",
      "subCategory": "Adverse Event Analysis (DE.AE)",
      "subCategoryStatement": "Adverse Event Analysis (DE.AE): Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents",
      "controlId": "DE.AE-02",
      "controlStatement": "DE.AE-02: Potentially adverse events are analyzed to better understand associated activities",
      "implemenationExamples": "Ex1: Use security information and event management (SIEM) or other tools to continuously monitor log events for known malicious and suspicious activity\nEx2: Utilize up-to-date cyber threat intelligence in log analysis tools to improve detection accuracy and characterize threat actors, their methods, and indicators of compromise\nEx3: Regularly conduct manual reviews of log events for technologies that cannot be sufficiently monitored through automation\nEx4: Use log analysis tools to generate reports on their findings"
    },
    {
      "id": 81,
      "category": "DETECT",
      "subCategory": "Adverse Event Analysis (DE.AE)",
      "subCategoryStatement": "Adverse Event Analysis (DE.AE): Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents",
      "controlId": "DE.AE-03",
      "controlStatement": "DE.AE-03: Information is correlated from multiple sources",
      "implemenationExamples": "Ex1: Constantly transfer log data generated by other sources to a relatively small number of log servers\nEx2: Use event correlation technology (e.g., SIEM) to collect information captured by multiple sources\nEx3: Utilize cyber threat intelligence to help correlate events among log sources"
    },
    {
      "id": 82,
      "category": "DETECT",
      "subCategory": "Adverse Event Analysis (DE.AE)",
      "subCategoryStatement": "Adverse Event Analysis (DE.AE): Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents",
      "controlId": "DE.AE-04",
      "controlStatement": "DE.AE-04: The estimated impact and scope of adverse events are understood",
      "implemenationExamples": "Ex1: Use SIEMs or other tools to estimate impact and scope, and review and refine the estimates\nEx2: A person creates their own estimates of impact and scope"
    },
    {
      "id": 83,
      "category": "DETECT",
      "subCategory": "Adverse Event Analysis (DE.AE)",
      "subCategoryStatement": "Adverse Event Analysis (DE.AE): Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents",
      "controlId": "DE.AE-06",
      "controlStatement": "DE.AE-06: Information on adverse events is provided to authorized staff and tools",
      "implemenationExamples": "Ex1: Use cybersecurity software to generate alerts and provide them to the security operations center (SOC), incident responders, and incident response tools\nEx2: Incident responders and other authorized personnel can access log analysis findings at all times\nEx3: Automatically create and assign tickets in the organization's ticketing system when certain types of alerts occur\nEx4: Manually create and assign tickets in the organization's ticketing system when technical staff discover indicators of compromise"
    },
    {
      "id": 84,
      "category": "DETECT",
      "subCategory": "Adverse Event Analysis (DE.AE)",
      "subCategoryStatement": "Adverse Event Analysis (DE.AE): Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents",
      "controlId": "DE.AE-07",
      "controlStatement": "DE.AE-07: Cyber threat intelligence and other contextual information are integrated into the analysis",
      "implemenationExamples": "Ex1: Securely provide cyber threat intelligence feeds to detection technologies, processes, and personnel\nEx2: Securely provide information from asset inventories to detection technologies, processes, and personnel\nEx3: Rapidly acquire and analyze vulnerability disclosures for the organization's technologies from suppliers, vendors, and third-party security advisories"
    },
    {
      "id": 85,
      "category": "DETECT",
      "subCategory": "Adverse Event Analysis (DE.AE)",
      "subCategoryStatement": "Adverse Event Analysis (DE.AE): Anomalies, indicators of compromise, and other potentially adverse events are analyzed to characterize the events and detect cybersecurity incidents",
      "controlId": "DE.AE-08",
      "controlStatement": "DE.AE-08: Incidents are declared when adverse events meet the defined incident criteria",
      "implemenationExamples": "Ex1: Apply incident criteria to known and assumed characteristics of activity in order to determine whether an incident should be declared\nEx2: Take known false positives into account when applying incident criteria"
    },
    {
      "id": 86,
      "category": "RESPOND",
      "subCategory": "Incident Management (RS.MA)",
      "subCategoryStatement": "Incident Management (RS.MA): Responses to detected cybersecurity incidents are managed",
      "controlId": "RS.MA-01",
      "controlStatement": "RS.MA-01: The incident response plan is executed in coordination with relevant third parties once an incident is declared",
      "implemenationExamples": "Ex1: Detection technologies automatically report confirmed incidents\nEx2: Request incident response assistance from the organization's incident response outsourcer\nEx3: Designate an incident lead for each incident\nEx4: Initiate execution of additional cybersecurity plans as needed to support incident response (for example, business continuity and disaster recovery)"
    },
    {
      "id": 87,
      "category": "RESPOND",
      "subCategory": "Incident Management (RS.MA)",
      "subCategoryStatement": "Incident Management (RS.MA): Responses to detected cybersecurity incidents are managed",
      "controlId": "RS.MA-02",
      "controlStatement": "RS.MA-02: Incident reports are triaged and validated",
      "implemenationExamples": "Ex1: Preliminarily review incident reports to confirm that they are cybersecurity-related and necessitate incident response activities\nEx2: Apply criteria to estimate the severity of an incident"
    },
    {
      "id": 88,
      "category": "RESPOND",
      "subCategory": "Incident Management (RS.MA)",
      "subCategoryStatement": "Incident Management (RS.MA): Responses to detected cybersecurity incidents are managed",
      "controlId": "RS.MA-03",
      "controlStatement": "RS.MA-03: Incidents are categorized and prioritized",
      "implemenationExamples": "Ex1: Further review and categorize incidents based on the type of incident (e.g., data breach, ransomware, DDoS, account compromise)\nEx2: Prioritize incidents based on their scope, likely impact, and time-critical nature\nEx3: Select incident response strategies for active incidents by balancing the need to quickly recover from an incident with the need to observe the attacker or conduct a more thorough investigation"
    },
    {
      "id": 89,
      "category": "RESPOND",
      "subCategory": "Incident Management (RS.MA)",
      "subCategoryStatement": "Incident Management (RS.MA): Responses to detected cybersecurity incidents are managed",
      "controlId": "RS.MA-04",
      "controlStatement": "RS.MA-04: Incidents are escalated or elevated as needed",
      "implemenationExamples": "Ex1: Track and validate the status of all ongoing incidents\nEx2: Coordinate incident escalation or elevation with designated internal and external stakeholders"
    },
    {
      "id": 90,
      "category": "RESPOND",
      "subCategory": "Incident Management (RS.MA)",
      "subCategoryStatement": "Incident Management (RS.MA): Responses to detected cybersecurity incidents are managed",
      "controlId": "RS.MA-05",
      "controlStatement": "RS.MA-05: The criteria for initiating incident recovery are applied",
      "implemenationExamples": "Ex1: Apply incident recovery criteria to known and assumed characteristics of the incident to determine whether incident recovery processes should be initiated\nEx2: Take the possible operational disruption of incident recovery activities into account"
    },
    {
      "id": 91,
      "category": "RESPOND",
      "subCategory": "Incident Analysis (RS.AN)",
      "subCategoryStatement": "Incident Analysis (RS.AN): Investigations are conducted to ensure effective response and support forensics and recovery activities",
      "controlId": "RS.AN-03",
      "controlStatement": "RS.AN-03: Analysis is performed to establish what has taken place during an incident and the root cause of the incident",
      "implemenationExamples": "Ex1: Determine the sequence of events that occurred during the incident and which assets and resources were involved in each event\nEx2: Attempt to determine what vulnerabilities, threats, and threat actors were directly or indirectly involved in the incident\nEx3: Analyze the incident to find the underlying, systemic root causes\nEx4: Check any cyber deception technology for additional information on attacker behavior"
    },
    {
      "id": 92,
      "category": "RESPOND",
      "subCategory": "Incident Analysis (RS.AN)",
      "subCategoryStatement": "Incident Analysis (RS.AN): Investigations are conducted to ensure effective response and support forensics and recovery activities",
      "controlId": "RS.AN-06",
      "controlStatement": "RS.AN-06: Actions performed during an investigation are recorded, and the records' integrity and provenance are preserved",
      "implemenationExamples": "Ex1: Require each incident responder and others (e.g., system administrators, cybersecurity engineers) who perform incident response tasks to record their actions and make the record immutable\nEx2: Require the incident lead to document the incident in detail and be responsible for preserving the integrity of the documentation and the sources of all information being reported"
    },
    {
      "id": 93,
      "category": "RESPOND",
      "subCategory": "Incident Analysis (RS.AN)",
      "subCategoryStatement": "Incident Analysis (RS.AN): Investigations are conducted to ensure effective response and support forensics and recovery activities",
      "controlId": "RS.AN-07",
      "controlStatement": "RS.AN-07: Incident data and metadata are collected, and their integrity and provenance are preserved",
      "implemenationExamples": "Ex1: Collect, preserve, and safeguard the integrity of all pertinent incident data and metadata (e.g., data source, date/time of collection) based on evidence preservation and chain-of-custody procedures"
    },
    {
      "id": 94,
      "category": "RESPOND",
      "subCategory": "Incident Analysis (RS.AN)",
      "subCategoryStatement": "Incident Analysis (RS.AN): Investigations are conducted to ensure effective response and support forensics and recovery activities",
      "controlId": "RS.AN-08",
      "controlStatement": "RS.AN-08: An incident's magnitude is estimated and validated",
      "implemenationExamples": "Ex1: Review other potential targets of the incident to search for indicators of compromise and evidence of persistence\nEx2: Automatically run tools on targets to look for indicators of compromise and evidence of persistence"
    },
    {
      "id": 95,
      "category": "RESPOND",
      "subCategory": "Incident Response Reporting and Communication (RS.CO)",
      "subCategoryStatement": "Incident Response Reporting and Communication (RS.CO): Response activities are coordinated with internal and external stakeholders as required by laws, regulations, or policies",
      "controlId": "RS.CO-02",
      "controlStatement": "RS.CO-02: Internal and external stakeholders are notified of incidents",
      "implemenationExamples": "Ex1: Follow the organization's breach notification procedures after discovering a data breach incident, including notifying affected customers\nEx2: Notify business partners and customers of incidents in accordance with contractual requirements\nEx3: Notify law enforcement agencies and regulatory bodies of incidents based on criteria in the incident response plan and management approval"
    },
    {
      "id": 96,
      "category": "RESPOND",
      "subCategory": "Incident Response Reporting and Communication (RS.CO)",
      "subCategoryStatement": "Incident Response Reporting and Communication (RS.CO): Response activities are coordinated with internal and external stakeholders as required by laws, regulations, or policies",
      "controlId": "RS.CO-03",
      "controlStatement": "RS.CO-03: Information is shared with designated internal and external stakeholders",
      "implemenationExamples": "Ex1: Securely share information consistent with response plans and information sharing agreements\nEx2: Voluntarily share information about an attacker's observed TTPs, with all sensitive data removed, with an Information Sharing and Analysis Center (ISAC)\nEx3: Notify HR when malicious insider activity occurs\nEx4: Regularly update senior leadership on the status of major incidents\nEx5: Follow the rules and protocols defined in contracts for incident information sharing between the organization and its suppliers\nEx6: Coordinate crisis communication methods between the organization and its critical suppliers"
    },
    {
      "id": 97,
      "category": "RESPOND",
      "subCategory": "Incident Mitigation (RS.MI)",
      "subCategoryStatement": "Incident Mitigation (RS.MI): Activities are performed to prevent expansion of an event and mitigate its effects",
      "controlId": "RS.MI-01",
      "controlStatement": "RS.MI-01: Incidents are contained",
      "implemenationExamples": "Ex1: Cybersecurity technologies (e.g., antivirus software) and cybersecurity features of other technologies (e.g., operating systems, network infrastructure devices) automatically perform containment actions\nEx2: Allow incident responders to manually select and perform containment actions\nEx3: Allow a third party (e.g., internet service provider, managed security service provider) to perform containment actions on behalf of the organization\nEx4: Automatically transfer compromised endpoints to a remediation virtual local area network (VLAN)"
    },
    {
      "id": 98,
      "category": "RESPOND",
      "subCategory": "Incident Mitigation (RS.MI)",
      "subCategoryStatement": "Incident Mitigation (RS.MI): Activities are performed to prevent expansion of an event and mitigate its effects",
      "controlId": "RS.MI-02",
      "controlStatement": "RS.MI-02: Incidents are eradicated",
      "implemenationExamples": "Ex1: Cybersecurity technologies and cybersecurity features of other technologies (e.g., operating systems, network infrastructure devices) automatically perform eradication actions\nEx2: Allow incident responders to manually select and perform eradication actions\nEx3: Allow a third party (e.g., managed security service provider) to perform eradication actions on behalf of the organization"
    },
    {
      "id": 99,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Plan Execution (RC.RP)",
      "subCategoryStatement": "Incident Recovery Plan Execution (RC.RP): Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents",
      "controlId": "RC.RP-01",
      "controlStatement": "RC.RP-01: The recovery portion of the incident response plan is executed once initiated from the incident response process",
      "implemenationExamples": "Ex1: Begin recovery procedures during or after incident response processes\nEx2: Make all individuals with recovery responsibilities aware of the plans for recovery and the authorizations required to implement each aspect of the plans"
    },
    {
      "id": 100,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Plan Execution (RC.RP)",
      "subCategoryStatement": "Incident Recovery Plan Execution (RC.RP): Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents",
      "controlId": "RC.RP-02",
      "controlStatement": "RC.RP-02: Recovery actions are selected, scoped, prioritized, and performed",
      "implemenationExamples": "Ex1: Select recovery actions based on the criteria defined in the incident response plan and available resources\nEx2: Change planned recovery actions based on a reassessment of organizational needs and resources"
    },
    {
      "id": 101,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Plan Execution (RC.RP)",
      "subCategoryStatement": "Incident Recovery Plan Execution (RC.RP): Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents",
      "controlId": "RC.RP-03",
      "controlStatement": "RC.RP-03: The integrity of backups and other restoration assets is verified before using them for restoration",
      "implemenationExamples": "Ex1: Check restoration assets for indicators of compromise, file corruption, and other integrity issues before use"
    },
    {
      "id": 102,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Plan Execution (RC.RP)",
      "subCategoryStatement": "Incident Recovery Plan Execution (RC.RP): Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents",
      "controlId": "RC.RP-04",
      "controlStatement": "RC.RP-04: Critical mission functions and cybersecurity risk management are considered to establish post-incident operational norms",
      "implemenationExamples": "Ex1: Use business impact and system categorization records (including service delivery objectives) to validate that essential services are restored in the appropriate order\nEx2: Work with system owners to confirm the successful restoration of systems and the return to normal operations\nEx3: Monitor the performance of restored systems to verify the adequacy of the restoration"
    },
    {
      "id": 103,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Plan Execution (RC.RP)",
      "subCategoryStatement": "Incident Recovery Plan Execution (RC.RP): Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents",
      "controlId": "RC.RP-05",
      "controlStatement": "RC.RP-05: The integrity of restored assets is verified, systems and services are restored, and normal operating status is confirmed",
      "implemenationExamples": "Ex1: Check restored assets for indicators of compromise and remediation of root causes of the incident before production use\nEx2: Verify the correctness and adequacy of the restoration actions taken before putting a restored system online"
    },
    {
      "id": 104,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Plan Execution (RC.RP)",
      "subCategoryStatement": "Incident Recovery Plan Execution (RC.RP): Restoration activities are performed to ensure operational availability of systems and services affected by cybersecurity incidents",
      "controlId": "RC.RP-06",
      "controlStatement": "RC.RP-06: The end of incident recovery is declared based on criteria, and incident-related documentation is completed",
      "implemenationExamples": "Ex1: Prepare an after-action report that documents the incident itself, the response and recovery actions taken, and lessons learned\nEx2: Declare the end of incident recovery once the criteria are met"
    },
    {
      "id": 105,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Communication (RC.CO)",
      "subCategoryStatement": "Incident Recovery Communication (RC.CO): Restoration activities are coordinated with internal and external parties",
      "controlId": "RC.CO-03",
      "controlStatement": "RC.CO-03: Recovery activities and progress in restoring operational capabilities are communicated to designated internal and external stakeholders",
      "implemenationExamples": "Ex1: Securely share recovery information, including restoration progress, consistent with response plans and information sharing agreements\nEx2: Regularly update senior leadership on recovery status and restoration progress for major incidents\nEx3: Follow the rules and protocols defined in contracts for incident information sharing between the organization and its suppliers\nEx4: Coordinate crisis communication between the organization and its critical suppliers"
    },
    {
      "id": 106,
      "category": "RECOVER",
      "subCategory": "Incident Recovery Communication (RC.CO)",
      "subCategoryStatement": "Incident Recovery Communication (RC.CO): Restoration activities are coordinated with internal and external parties",
      "controlId": "RC.CO-04",
      "controlStatement": "RC.CO-04: Public updates on incident recovery are shared using approved methods and messaging",
      "implemenationExamples": "Ex1: Follow the organization's breach notification procedures for recovering from a data breach incident\nEx2: Explain the steps being taken to recover from the incident and to prevent a recurrence"
    }
  ];