// MoSPI DIID DEMO DATASET - PAIMANA-PREDICT Infrastructure Projects

export const mockProjects = [
  {
    id: "PRJ-MORT-101",
    name: "Mumbai-Delhi Expressway Package 4 (Vadodara-Kim Section)",
    ministry: "Ministry of Road Transport & Highways",
    sector: "Transport",
    agency: "National Highways Authority of India (NHAI)",
    state: "Gujarat",
    originalCost: 4850,
    revisedCost: 5920,
    expenditure: 4440,
    physicalProgress: 58,
    financialProgress: 75,
    plannedCompletion: "2024-12",
    expectedCompletion: "2026-06",
    riskScore: 84,
    riskLevel: "CRITICAL",
    costRisk: 88,
    timeRisk: 85,
    executionRisk: 79,
    predictedCost: 6540,
    expectedDelayMonths: 18,
    riskProbability: 91,
    status: "Critical",
    riskDrivers: [
      "Financial progress (75%) significantly exceeds physical progress (58%) by 17 percentage points.",
      "Milestone 3 completion speed decelerated by 42% over the last two quarters.",
      "Structure work at Tapi river bridge hindered by environmental clearance revisions.",
      "Contractor liquidity constraints causing equipment deployment deficit."
    ],
    recommendedActions: [
      "Issue formal notice to EPC contractor for financial-physical progress disalignment audit.",
      "Establish joint MoSPI-NHAI escalation desk to expedite environmental clearance modifications.",
      "Institute weekly milestone performance monitoring forTapi river bridge civil works."
    ]
  },
  {
    id: "PRJ-RAIL-204",
    name: "Udhampur-Srinagar-Baramulla Rail Link (Chenab Bridge & Tunnel Section)",
    ministry: "Ministry of Railways",
    sector: "Transport",
    agency: "Konkan Railway Corporation / Northern Railway",
    state: "Jammu & Kashmir",
    originalCost: 19560,
    revisedCost: 27900,
    expenditure: 23150,
    physicalProgress: 89,
    financialProgress: 83,
    plannedCompletion: "2023-08",
    expectedCompletion: "2025-05",
    riskScore: 78,
    riskLevel: "HIGH",
    costRisk: 82,
    timeRisk: 76,
    executionRisk: 76,
    predictedCost: 29400,
    expectedDelayMonths: 21,
    riskProbability: 84,
    status: "Cost Escalated",
    riskDrivers: [
      "Geological surprises in Tunnel T-49 requiring specialized slope stabilization and re-boring.",
      "Historical high-altitude sector pattern indicates severe winter weather disruption buffer deficit.",
      "Subcontractor mobilization slowdown during monsoon high-discharge windows."
    ],
    recommendedActions: [
      "Deploy specialized NATM tunneling expert review panel.",
      "Re-allocate emergency contingency funds for slope stabilization works.",
      "Audit high-altitude material supply chain for winter readiness."
    ]
  },
  {
    id: "PRJ-POWR-308",
    name: "Subansiri Lower Hydroelectric Project (2000 MW)",
    ministry: "Ministry of Power",
    sector: "Energy",
    agency: "NHPC Limited",
    state: "Assam",
    originalCost: 6285,
    revisedCost: 19990,
    expenditure: 17200,
    physicalProgress: 91,
    financialProgress: 86,
    plannedCompletion: "2018-03",
    expectedCompletion: "2025-10",
    riskScore: 89,
    riskLevel: "CRITICAL",
    costRisk: 94,
    timeRisk: 91,
    executionRisk: 82,
    predictedCost: 21200,
    expectedDelayMonths: 91,
    riskProbability: 95,
    status: "Critical",
    riskDrivers: [
      "Severe cumulative cost overrun (+218% over original baseline) due to prolonged litigation and dam safety redesign.",
      "Financial progress lagging behind updated revised estimates due to contractor claims dispute.",
      "Monsoon high-water reservoir filling safety approvals pending central water commission clear-off."
    ],
    recommendedActions: [
      "Conduct high-level inter-ministerial coordination meeting with MoSPI and Ministry of Power.",
      "Fast-track Central Water Commission dam safety compliance audit.",
      "Review contractor financial claim settlement options to prevent arbitration lock."
    ]
  },
  {
    id: "PRJ-PETR-402",
    name: "Barmer Refinery & Petrochemical Complex (9 MMTPA)",
    ministry: "Ministry of Petroleum & Natural Gas",
    sector: "Energy",
    agency: "HPCL Rajasthan Refinery Ltd (HRRL)",
    state: "Rajasthan",
    originalCost: 43129,
    revisedCost: 72937,
    expenditure: 48500,
    physicalProgress: 74,
    financialProgress: 66,
    plannedCompletion: "2022-12",
    expectedCompletion: "2025-12",
    riskScore: 68,
    riskLevel: "HIGH",
    costRisk: 74,
    timeRisk: 65,
    executionRisk: 65,
    predictedCost: 77200,
    expectedDelayMonths: 36,
    riskProbability: 76,
    status: "Delayed",
    riskDrivers: [
      "Global equipment delivery delays for critical Cracking Unit vessels.",
      "Steel and alloy material price index escalation during 2021-2023 construction phase.",
      "Pipeline right-of-way (RoW) acquisition delays across 4 districts."
    ],
    recommendedActions: [
      "Initiate RoW resolution fast-track with District Collectors of Barmer & Jodhpur.",
      "Expedite import clearance for heavy process reactors at Mundra port.",
      "Monitor vendor fabrication milestones bi-weekly."
    ]
  },
  {
    id: "PRJ-URBN-512",
    name: "Delhi Metro Phase IV Priority Corridors (65 km)",
    ministry: "Ministry of Housing & Urban Affairs",
    sector: "Transport",
    agency: "Delhi Metro Rail Corporation (DMRC)",
    state: "Delhi",
    originalCost: 24948,
    revisedCost: 24948,
    expenditure: 11200,
    physicalProgress: 48,
    financialProgress: 45,
    plannedCompletion: "2025-12",
    expectedCompletion: "2026-09",
    riskScore: 38,
    riskLevel: "WATCH",
    costRisk: 32,
    timeRisk: 42,
    executionRisk: 40,
    predictedCost: 25800,
    expectedDelayMonths: 9,
    riskProbability: 45,
    status: "On Schedule",
    riskDrivers: [
      "Tree transplantation permissions delayed in Aerocity-Tughlakabad corridor.",
      "Underground tunneling TBM breakthrough schedule tight with 2-month margin."
    ],
    recommendedActions: [
      "Follow up with Delhi Forest Dept for pending tree cutting approvals.",
      "Maintain strict monitoring of Tunnel Boring Machine 4 advancement rate."
    ]
  },
  {
    id: "PRJ-WATR-601",
    name: "Ken-Betwa Inter-State River Link Project (Phase 1)",
    ministry: "Ministry of Jal Shakti",
    sector: "Water & Sanitation",
    agency: "National Water Development Agency (NWDA)",
    state: "Madhya Pradesh",
    originalCost: 44605,
    revisedCost: 44605,
    expenditure: 5200,
    physicalProgress: 14,
    financialProgress: 12,
    plannedCompletion: "2030-03",
    expectedCompletion: "2031-12",
    riskScore: 54,
    riskLevel: "WATCH",
    costRisk: 52,
    timeRisk: 58,
    executionRisk: 52,
    predictedCost: 49800,
    expectedDelayMonths: 21,
    riskProbability: 60,
    status: "On Schedule",
    riskDrivers: [
      "Panna Tiger Reserve wildlife mitigation compliance clearance stages.",
      "Large-scale land acquisition across 12 villages in Chhatarpur district."
    ],
    recommendedActions: [
      "Form dedicated Land Acquisition & Resettlement monitoring cell.",
      "Execute compensatory afforestation roadmap with MP Forest Dept."
    ]
  },
  {
    id: "PRJ-PORT-705",
    name: "Vadhavan Deep Sea Port Infrastructure Development",
    ministry: "Ministry of Ports, Shipping and Waterways",
    sector: "Transport",
    agency: "Vadhavan Port Project Ltd / JNPA",
    state: "Maharashtra",
    originalCost: 76220,
    revisedCost: 76220,
    expenditure: 2400,
    physicalProgress: 8,
    financialProgress: 3,
    plannedCompletion: "2030-12",
    expectedCompletion: "2031-06",
    riskScore: 42,
    riskLevel: "WATCH",
    costRisk: 40,
    timeRisk: 44,
    executionRisk: 42,
    predictedCost: 79500,
    expectedDelayMonths: 6,
    riskProbability: 48,
    status: "On Schedule",
    riskDrivers: [
      "Offshore breakwater engineering tender finalization.",
      "Local fishermen rehabilitation package negotiation."
    ],
    recommendedActions: [
      "Finalize public stakeholder consultation framework.",
      "Release offshore geotechnical bathymetric survey results."
    ]
  },
  {
    id: "PRJ-COAL-802",
    name: "Magadh Expansion Open Cast Coal Mine (51 MTPA)",
    ministry: "Ministry of Coal",
    sector: "Coal",
    agency: "Central Coalfields Limited (CCL / CIL)",
    state: "Jharkhand",
    originalCost: 3250,
    revisedCost: 4680,
    expenditure: 3100,
    physicalProgress: 72,
    financialProgress: 66,
    plannedCompletion: "2024-03",
    expectedCompletion: "2025-08",
    riskScore: 72,
    riskLevel: "HIGH",
    costRisk: 75,
    timeRisk: 70,
    executionRisk: 71,
    predictedCost: 4950,
    expectedDelayMonths: 17,
    riskProbability: 79,
    status: "Delayed",
    riskDrivers: [
      "Forest diversion Stage II approval pending for 142 hectares.",
      "Heavy earth moving machinery (HEMM) procurement delays due to global supply chain."
    ],
    recommendedActions: [
      "Depute CCL senior executive for MoEFCC Forest clearance push.",
      "Streamline HEMM vendor delivery schedules."
    ]
  },
  {
    id: "PRJ-STEL-903",
    name: "Bhilai Steel Plant Modernization & Expansion (7 MTPA)",
    ministry: "Ministry of Steel",
    sector: "Steel",
    agency: "Steel Authority of India Limited (SAIL)",
    state: "Chhattisgarh",
    originalCost: 17266,
    revisedCost: 20400,
    expenditure: 19800,
    physicalProgress: 97,
    financialProgress: 97,
    plannedCompletion: "2022-06",
    expectedCompletion: "2024-11",
    riskScore: 24,
    riskLevel: "LOW",
    costRisk: 22,
    timeRisk: 26,
    executionRisk: 24,
    predictedCost: 20550,
    expectedDelayMonths: 2,
    riskProbability: 20,
    status: "On Schedule",
    riskDrivers: [
      "Final commissioning trial runs of Blast Furnace 8 in progress.",
      "Minor punch-list items pending vendor sign-off."
    ],
    recommendedActions: [
      "Complete integrated performance trial run testing.",
      "Issue final operational acceptance certificate."
    ]
  },
  {
    id: "PRJ-POWER-315",
    name: "Green Energy Corridor Phase-II Interstate Transmission",
    ministry: "Ministry of Power",
    sector: "Energy",
    agency: "Power Grid Corporation of India Ltd (PGCIL)",
    state: "Tamil Nadu",
    originalCost: 12031,
    revisedCost: 12031,
    expenditure: 8900,
    physicalProgress: 79,
    financialProgress: 74,
    plannedCompletion: "2025-06",
    expectedCompletion: "2025-09",
    riskScore: 28,
    riskLevel: "LOW",
    costRisk: 25,
    timeRisk: 30,
    executionRisk: 29,
    predictedCost: 12150,
    expectedDelayMonths: 3,
    riskProbability: 25,
    status: "On Schedule",
    riskDrivers: [
      "Substation transformer stringing proceeding ahead of schedule.",
      "Localized right of way issues in 7 transmission tower locations."
    ],
    recommendedActions: [
      "Resolve localized tower RoW with district administration."
    ]
  },
  {
    id: "PRJ-MINE-1004",
    name: "Nalco Bauxite Mine Expansion & Alumina Refinery",
    ministry: "Ministry of Mines",
    sector: "Mining",
    agency: "National Aluminium Company (NALCO)",
    state: "Odisha",
    originalCost: 5540,
    revisedCost: 6450,
    expenditure: 4200,
    physicalProgress: 68,
    financialProgress: 65,
    plannedCompletion: "2024-09",
    expectedCompletion: "2025-07",
    riskScore: 48,
    riskLevel: "WATCH",
    costRisk: 46,
    timeRisk: 50,
    executionRisk: 48,
    predictedCost: 6680,
    expectedDelayMonths: 10,
    riskProbability: 52,
    status: "Delayed",
    riskDrivers: [
      "Refinery stream 5 technology partner equipment calibration delay.",
      "Stream transport conveyor belt erection progress slow."
    ],
    recommendedActions: [
      "Technical audit of OEM equipment calibration protocols.",
      "Increase civil contractor manpower deployment."
    ]
  },
  {
    id: "PRJ-TELE-1101",
    name: "BharatNet Phase-III Fiber Network (300,000 Gram Panchayats)",
    ministry: "Ministry of Communications",
    sector: "Communication",
    agency: "Bharat Broadband Network Limited (BBNL / BSNL)",
    state: "Uttar Pradesh",
    originalCost: 65000,
    revisedCost: 65000,
    expenditure: 18500,
    physicalProgress: 32,
    financialProgress: 28,
    plannedCompletion: "2026-03",
    expectedCompletion: "2027-03",
    riskScore: 62,
    riskLevel: "HIGH",
    costRisk: 58,
    timeRisk: 66,
    executionRisk: 62,
    predictedCost: 69200,
    expectedDelayMonths: 12,
    riskProbability: 68,
    status: "Delayed",
    riskDrivers: [
      "Last-mile trenching permission delays across state highways.",
      "Optical Fiber Cable (OFC) vendor supply constraint in eastern UP zones."
    ],
    recommendedActions: [
      "Single-window clearance integration with UP PWD.",
      "Re-allocate OFC supply quotas across active packages."
    ]
  },
  {
    id: "PRJ-SOCL-1201",
    name: "AIIMS Madurai Campus Development Project",
    ministry: "Ministry of Health & Family Welfare",
    sector: "Social Infrastructure",
    agency: "HITES / CPWD",
    state: "Tamil Nadu",
    originalCost: 1978,
    revisedCost: 1978,
    expenditure: 620,
    physicalProgress: 35,
    financialProgress: 31,
    plannedCompletion: "2026-10",
    expectedCompletion: "2027-12",
    riskScore: 65,
    riskLevel: "HIGH",
    costRisk: 62,
    timeRisk: 68,
    executionRisk: 65,
    predictedCost: 2240,
    expectedDelayMonths: 14,
    riskProbability: 72,
    status: "Delayed",
    riskDrivers: [
      "JICA loan funding disbursement procedural timeline.",
      "Contractor mobilization delays following structural design revisions."
    ],
    recommendedActions: [
      "Fast-track JICA tranche 2 documentation.",
      "Approve revised structural foundation drawings immediately."
    ]
  },
  {
    id: "PRJ-RAIL-209",
    name: "Dedicated Freight Corridor (East-West Connection Package 2)",
    ministry: "Ministry of Railways",
    sector: "Transport",
    agency: "Dedicated Freight Corridor Corporation of India (DFCCIL)",
    state: "West Bengal",
    originalCost: 12400,
    revisedCost: 15800,
    expenditure: 13900,
    physicalProgress: 82,
    financialProgress: 88,
    plannedCompletion: "2024-03",
    expectedCompletion: "2025-06",
    riskScore: 74,
    riskLevel: "HIGH",
    costRisk: 78,
    timeRisk: 71,
    executionRisk: 73,
    predictedCost: 16700,
    expectedDelayMonths: 15,
    riskProbability: 80,
    status: "Cost Escalated",
    riskDrivers: [
      "Financial expenditure trajectory higher than physical track laying output.",
      "Land acquisition encumbrance pockets near Dankuni hub."
    ],
    recommendedActions: [
      "Conduct joint site verification of track laying milestones.",
      "Enforce land handover compliance with West Bengal revenue authority."
    ]
  },
  {
    id: "PRJ-MORT-108",
    name: "Bengaluru-Chennai Expressway (Phase II AP Border to Walajapet)",
    ministry: "Ministry of Road Transport & Highways",
    sector: "Transport",
    agency: "National Highways Authority of India (NHAI)",
    state: "Andhra Pradesh",
    originalCost: 5600,
    revisedCost: 5600,
    expenditure: 4100,
    physicalProgress: 76,
    financialProgress: 73,
    plannedCompletion: "2025-03",
    expectedCompletion: "2025-08",
    riskScore: 32,
    riskLevel: "LOW",
    costRisk: 28,
    timeRisk: 35,
    executionRisk: 33,
    predictedCost: 5720,
    expectedDelayMonths: 5,
    riskProbability: 30,
    status: "On Schedule",
    riskDrivers: [
      "Minor quarry material supply friction in Chittoor district.",
      "Pavement bituminous laying on schedule."
    ],
    recommendedActions: [
      "Maintain local quarry permit coordination."
    ]
  },
  {
    id: "PRJ-POWER-322",
    name: "Kudankulam Nuclear Power Plant Units 3 & 4 (2x1000 MW)",
    ministry: "Department of Atomic Energy",
    sector: "Energy",
    agency: "Nuclear Power Corporation of India Limited (NPCIL)",
    state: "Tamil Nadu",
    originalCost: 39849,
    revisedCost: 49680,
    expenditure: 38200,
    physicalProgress: 78,
    financialProgress: 77,
    plannedCompletion: "2023-12",
    expectedCompletion: "2026-03",
    riskScore: 70,
    riskLevel: "HIGH",
    costRisk: 72,
    timeRisk: 75,
    executionRisk: 63,
    predictedCost: 51200,
    expectedDelayMonths: 27,
    riskProbability: 77,
    status: "Delayed",
    riskDrivers: [
      "Specialized reactor component supply delays due to geopolitical disruptions.",
      "AERB safety compliance documentation review stages."
    ],
    recommendedActions: [
      "Prioritize AERB regulatory review milestones.",
      "Accelerate domestic equipment substitution qualification."
    ]
  },
  {
    id: "PRJ-WATR-608",
    name: "Polavaram National Irrigation Project Main Dam & Canals",
    ministry: "Ministry of Jal Shakti",
    sector: "Water & Sanitation",
    agency: "Polavaram Project Authority (PPA)",
    state: "Andhra Pradesh",
    originalCost: 16010,
    revisedCost: 55548,
    expenditure: 22400,
    physicalProgress: 76,
    financialProgress: 40,
    plannedCompletion: "2019-06",
    expectedCompletion: "2026-06",
    riskScore: 86,
    riskLevel: "CRITICAL",
    costRisk: 92,
    timeRisk: 88,
    executionRisk: 78,
    predictedCost: 58900,
    expectedDelayMonths: 84,
    riskProbability: 92,
    status: "Critical",
    riskDrivers: [
      "Diaphragm wall repair requirement following Godavari flood damage.",
      "R&R (Rehabilitation & Resettlement) funding allocation deadlock.",
      "Huge cost revision (+247%) awaiting Union Cabinet formal approval."
    ],
    recommendedActions: [
      "Expedite Cabinet Committee on Economic Affairs (CCEA) cost approval.",
      "Complete Earth-cum-Rockfill dam gap filling before monsoon season."
    ]
  },
  {
    id: "PRJ-URBN-518",
    name: "Ahmedabad Metro Rail Project Phase 2 (28.2 km)",
    ministry: "Ministry of Housing & Urban Affairs",
    sector: "Transport",
    agency: "Gujarat Metro Rail Corporation (GMRC)",
    state: "Gujarat",
    originalCost: 5384,
    revisedCost: 5384,
    expenditure: 3950,
    physicalProgress: 81,
    financialProgress: 73,
    plannedCompletion: "2024-08",
    expectedCompletion: "2025-02",
    riskScore: 26,
    riskLevel: "LOW",
    costRisk: 22,
    timeRisk: 28,
    executionRisk: 27,
    predictedCost: 5450,
    expectedDelayMonths: 6,
    riskProbability: 25,
    status: "On Schedule",
    riskDrivers: [
      "Koteshwar to GNLU corridor elevated viaduct near completion.",
      "Rolling stock signaling integration testing in progress."
    ],
    recommendedActions: [
      "Conduct CMRS (Commissioner of Metro Railway Safety) inspection preparation."
    ]
  },
  {
    id: "PRJ-PETR-409",
    name: "Jagdishpur-Haldia & Bokaro-Dhamra Pipeline (Dhamra-Haldia Section)",
    ministry: "Ministry of Petroleum & Natural Gas",
    sector: "Energy",
    agency: "GAIL (India) Limited",
    state: "Odisha",
    originalCost: 12940,
    revisedCost: 12940,
    expenditure: 11400,
    physicalProgress: 92,
    financialProgress: 88,
    plannedCompletion: "2024-06",
    expectedCompletion: "2025-01",
    riskScore: 22,
    riskLevel: "LOW",
    costRisk: 19,
    timeRisk: 24,
    executionRisk: 23,
    predictedCost: 13020,
    expectedDelayMonths: 7,
    riskProbability: 18,
    status: "On Schedule",
    riskDrivers: [
      "Hydro-testing of 85 km segment complete.",
      "Final river crossing HDD boring near Haldia in final phase."
    ],
    recommendedActions: [
      "Complete final HDD pipe pull-through."
    ]
  },
  {
    id: "PRJ-MORT-115",
    name: "Zojila Tunnel Construction (14.15 km All-Weather Pass)",
    ministry: "Ministry of Road Transport & Highways",
    sector: "Transport",
    agency: "National Highways & Infrastructure Development Corp (NHIDCL)",
    state: "Jammu & Kashmir",
    originalCost: 6800,
    revisedCost: 6800,
    expenditure: 3900,
    physicalProgress: 52,
    financialProgress: 57,
    plannedCompletion: "2026-12",
    expectedCompletion: "2027-11",
    riskScore: 58,
    riskLevel: "WATCH",
    costRisk: 55,
    timeRisk: 60,
    executionRisk: 59,
    predictedCost: 7250,
    expectedDelayMonths: 11,
    riskProbability: 62,
    status: "Delayed",
    riskDrivers: [
      "Extremely harsh winter sub-zero temperature working windows.",
      "Water ingress in west portal heading."
    ],
    recommendedActions: [
      "Deploy dewatering pump systems and chemical grouting.",
      "Ensure winter ventilation heating modules remain operational."
    ]
  },
  {
    id: "PRJ-COAL-809",
    name: "North Karanpura Super Thermal Power Project Coal Conveyor",
    ministry: "Ministry of Coal",
    sector: "Coal",
    agency: "NTPC Limited / CCL",
    state: "Jharkhand",
    originalCost: 14300,
    revisedCost: 15200,
    expenditure: 13800,
    physicalProgress: 88,
    financialProgress: 90,
    plannedCompletion: "2024-03",
    expectedCompletion: "2025-04",
    riskScore: 45,
    riskLevel: "WATCH",
    costRisk: 42,
    timeRisk: 48,
    executionRisk: 45,
    predictedCost: 15450,
    expectedDelayMonths: 13,
    riskProbability: 50,
    status: "Delayed",
    riskDrivers: [
      "Overland conveyor belt crossing over forest land pending final NOC.",
      "Unit 3 trial run vibration diagnostics underway."
    ],
    recommendedActions: [
      "Obtain final NOC for overland belt from forest conservator."
    ]
  },
  {
    id: "PRJ-SOCL-1208",
    name: "IIT Hyderabad Phase-II Campus Expansion",
    ministry: "Ministry of Education",
    sector: "Social Infrastructure",
    agency: "CPWD / IIT Hyderabad",
    state: "Telangana",
    originalCost: 1140,
    revisedCost: 1140,
    expenditure: 980,
    physicalProgress: 94,
    financialProgress: 86,
    plannedCompletion: "2024-06",
    expectedCompletion: "2024-12",
    riskScore: 18,
    riskLevel: "LOW",
    costRisk: 15,
    timeRisk: 20,
    executionRisk: 19,
    predictedCost: 1150,
    expectedDelayMonths: 6,
    riskProbability: 15,
    status: "On Schedule",
    riskDrivers: [
      "Academic block B interior fit-outs phase.",
      "Landscaping and perimeter security installation."
    ],
    recommendedActions: [
      "Hand over completed hostels to campus administration."
    ]
  },
  {
    id: "PRJ-RAIL-215",
    name: "Sivok-Rangpo New Rail Line Project (Sikkim Connection)",
    ministry: "Ministry of Railways",
    sector: "Transport",
    agency: "Indian Railway Construction International (IRCON)",
    state: "West Bengal",
    originalCost: 4085,
    revisedCost: 8900,
    expenditure: 5400,
    physicalProgress: 61,
    financialProgress: 60,
    plannedCompletion: "2022-12",
    expectedCompletion: "2026-12",
    riskScore: 81,
    riskLevel: "CRITICAL",
    costRisk: 86,
    timeRisk: 84,
    executionRisk: 73,
    predictedCost: 9600,
    expectedDelayMonths: 48,
    riskProbability: 88,
    status: "Critical",
    riskDrivers: [
      "Fragile Himalayan geology with frequent tunnel crown collapses.",
      "Teesta river flash flood damage to access roads in 2023.",
      "Cost escalation (+118%) due to alignment changes and heavy rock support."
    ],
    recommendedActions: [
      "Appoint international geotechnical tunneling advisory board.",
      "Strengthen slope protection works on access arterial roads."
    ]
  },
  {
    id: "PRJ-POWER-330",
    name: "Ganges Canal Small Hydro Project Grid Interconnection",
    ministry: "Ministry of New and Renewable Energy",
    sector: "Energy",
    agency: "IREDA / UP Solar Corporation",
    state: "Uttar Pradesh",
    originalCost: 890,
    revisedCost: 890,
    expenditure: 680,
    physicalProgress: 75,
    financialProgress: 76,
    plannedCompletion: "2025-01",
    expectedCompletion: "2025-05",
    riskScore: 35,
    riskLevel: "WATCH",
    costRisk: 30,
    timeRisk: 38,
    executionRisk: 36,
    predictedCost: 910,
    expectedDelayMonths: 4,
    riskProbability: 38,
    status: "On Schedule",
    riskDrivers: [
      "Canal shut-down window approval for tailrace channel construction.",
      "Local grid substation augmentation."
    ],
    recommendedActions: [
      "Coordinate canal discharge cutoff window with Irrigation Department."
    ]
  },
  {
    id: "PRJ-MORT-122",
    name: "Delhi-Dehradun Economic Corridor Package 1 (Akshardham to EPE)",
    ministry: "Ministry of Road Transport & Highways",
    sector: "Transport",
    agency: "National Highways Authority of India (NHAI)",
    state: "Delhi",
    originalCost: 2800,
    revisedCost: 2800,
    expenditure: 2200,
    physicalProgress: 82,
    financialProgress: 78,
    plannedCompletion: "2024-11",
    expectedCompletion: "2025-03",
    riskScore: 30,
    riskLevel: "LOW",
    costRisk: 26,
    timeRisk: 33,
    executionRisk: 31,
    predictedCost: 2860,
    expectedDelayMonths: 4,
    riskProbability: 28,
    status: "On Schedule",
    riskDrivers: [
      "Elevated corridor girder launching in urban traffic zones.",
      "Night shift utility shifting completed."
    ],
    recommendedActions: [
      "Maintain traffic diversion safety signage."
    ]
  }
];

// Additional mock summary stats
export const mockSummaryStats = {
  totalProjects: 1981,
  highRiskCount: 342,
  criticalAlerts: 87,
  originalCostTotalCr: 2450890, // ₹24.50 Lakh Cr
  revisedCostTotalCr: 2912400,  // ₹29.12 Lakh Cr
  expenditureTotalCr: 1840100,  // ₹18.40 Lakh Cr
  avgCostOverrunPct: 18.8,
  avgTimeDelayMonths: 14.2
};
