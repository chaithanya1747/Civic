/**
 * CivicSignal AI - Demo Data Module
 * Contains verified sample public notices and bilingual UI strings (English & Telugu).
 * 
 * IMPORTANT DISCLAIMER:
 * All notices contained herein are fictional sample demonstration data created solely
 * for college hackathon presentation and evaluation under the theme 'Citizen Engagement
 * and Public Services'. These are NOT official government announcements and CivicSignal AI
 * is NOT affiliated with any municipal or government authority.
 */

const DEFAULT_NOTICES = [
  {
    id: "cs-2026-001",
    referenceNumber: "DEMO-REF: HMWSSB/OM/2026/894",
    category: "water",
    department: {
      en: "Hyderabad Metropolitan Water Supply & Sewerage Board",
      te: "హైదరాబాద్ మెట్రోపాలిటన్ నీటి సరఫరా & మురుగునీటి బోర్డు"
    },
    title: {
      en: "48-Hour Drinking Water Supply Shutdown in West Zone for Pipeline Upgradation",
      te: "పైప్‌లైన్ ఆధునీకరణ కోసం పశ్చిమ జోన్‌లో 48 గంటల తాగునీటి సరఫరా నిలిపివేత"
    },
    summary: {
      en: "Drinking water supply will be suspended for 48 hours starting Saturday 6:00 AM due to major pipeline interconnection work at the Krishna Phase-III conduit. Water supply will resume at low pressure on Monday morning. Citizens are requested to store adequate water in advance.",
      te: "కృష్ణా ఫేజ్-3 ప్రధాన పైప్‌లైన్ అనుసంధాన పనుల కారణంగా శనివారం ఉదయం 6:00 గంటల నుండి 48 గంటల పాటు తాగునీటి సరఫరా నిలిపివేయబడుతుంది. సోమవారం ఉదయం నుండి తక్కువ ఒత్తిడితో సరఫరా పునరుద్ధరించబడుతుంది. ప్రజలు ముందుగానే సరిపడా నీటిని నిల్వ చేసుకోవాలి."
    },
    date: {
      en: "Saturday, Oct 17 - Monday, Oct 19, 2026",
      te: "శనివారం, అక్టోబర్ 17 - సోమవారం, అక్టోబర్ 19, 2026"
    },
    timing: {
      en: "6:00 AM (Oct 17) to 6:00 AM (Oct 19)",
      te: "ఉదయం 6:00 (అక్టోబర్ 17) నుండి ఉదయం 6:00 (అక్టోబర్ 19)"
    },
    locations: {
      en: ["Kukatpally", "Madhapur", "Kondapur", "Gachibowli", "Jubilee Hills Ward 10", "Hitec City Phase-1"],
      te: ["కూకట్‌పల్లి", "మాదాపూర్", "కొండాపూర్", "గచ్చిబౌలి", "జూబ్లీహిల్స్ వార్డు 10", "హైటెక్ సిటీ ఫేజ్-1"]
    },
    actions: {
      en: [
        "Store drinking and domestic water by Friday evening before 9:00 PM.",
        "Request backup tanker supply through local ward assistance desks if critical water needs arise (demo reference).",
        "Avoid using washing machines and high-consumption water appliances during shutdown.",
        "Boil water for the first 3 hours after supply resumes on Monday."
      ],
      te: [
        "శుక్రవారం రాత్రి 9:00 గంటల లోపు తాగునీరు మరియు ఇతర అవసరాలకు సరిపడా నీటిని నిల్వ చేసుకోండి.",
        "అత్యవసర నీటి అవసరాల కోసం స్థానిక వార్డు సహాయ కేంద్రాన్ని సంప్రదించండి (నమూనా రిఫరెన్స్).",
        "సరఫరా నిలిచిన సమయంలో వాషింగ్ మెషీన్లు, అధిక నీరు వాడే పనులను నివారించండి.",
        "సోమవారం సరఫరా పునఃప్రారంభమైన మొదటి 3 గంటలు నీటిని కాచి చల్లార్చి తాగండి."
      ]
    },
    priority: "urgent",
    status: "upcoming",
    published: true,
    issuedDate: "2026-10-14",
    isSample: true,
    originalText: {
      en: "Official Circular Ref No: 894/Dir(Tech)/HMWSSB: In exercise of technical maintenance mandate, General Manager (E) notifies that in view of urgent pipeline alignment works on 2200mm dia Krishna Phase-III conduit at Outer Ring Road junction, pumping from Kodandapur intake will remain isolated from 0600 hrs on 17.10.2026 to 0600 hrs on 19.10.2026. Water consumers situated under West Operations circles are hereby alerted to arrange alternate reserves.",
      te: "అధికారిక సర్క్యులర్ సంఖ్య: 894/డైరెక్టర్(టెక్)/HMWSSB: ఔటర్ రింగ్ రోడ్ జంక్షన్ వద్ద 2200 మి.మీ కృష్ణా ఫేజ్-3 పైప్‌లైన్ అత్యవసర నిర్వహణ మరియు అమరిక పనుల దృష్ట్యా, కోదండపూర్ ఇన్-టేక్ వద్ద పంపింగ్ 17.10.2026 ఉదయం 06:00 గంటల నుండి 19.10.2026 ఉదయం 06:00 గంటల వరకు నిలిపివేయబడుతుంది. పశ్చిమ సర్కిల్ పరిధిలోని వినియోగదారులు తగిన ఏర్పాట్లు చేసుకోవాలని కోరడమైనది."
    }
  },
  {
    id: "cs-2026-002",
    referenceNumber: "DEMO-REF: TSSPDCL/METRO/2026/412",
    category: "electricity",
    department: {
      en: "Telangana State Southern Power Distribution Company Ltd",
      te: "తెలంగాణ దక్షిణ విద్యుత్ పంపిణీ సంస్థ (TSSPDCL)"
    },
    title: {
      en: "Scheduled 33/11 KV Sub-Station Pre-Monsoon Maintenance & Power Outage",
      te: "33/11 కేవీ సబ్-స్టేషన్ ప్రీ-మాన్సూన్ నిర్వహణ & విద్యుత్ సరఫరాలో అంతరాయం"
    },
    summary: {
      en: "Power supply will be interrupted for 4 hours on Friday morning for scheduled pre-monsoon tree trimming, feeder overhaul, and transformer testing. Power will be restored zone-by-zone upon work completion.",
      te: "ప్రీ-మాన్సూన్ చెట్ల కొమ్మల తొలగింపు, ఫీడర్ నిర్వహణ మరియు ట్రాన్స్‌ఫార్మర్ పరీక్షల నిమిత్తం శుక్రవారం ఉదయం 4 గంటల పాటు విద్యుత్ సరఫరా నిలిపివేయబడుతుంది. పనులు పూర్తయిన వెంటనే జోన్ల వారీగా విద్యుత్ పునరుద్ధరించబడుతుంది."
    },
    date: {
      en: "Friday, Oct 16, 2026",
      te: "శుక్రవారం, అక్టోబర్ 16, 2026"
    },
    timing: {
      en: "10:00 AM to 2:00 PM (4 Hours)",
      te: "ఉదయం 10:00 నుండి మధ్యాహ్నం 2:00 వరకు (4 గంటలు)"
    },
    locations: {
      en: ["Ameerpet", "SR Nagar", "Balanagar Industrial Area", "Yellareddyguda", "Panjagutta Colony"],
      te: ["అమీర్‌పేట్", "ఎస్సార్ నగర్", "బాలానగర్ ఇండస్ట్రియల్ ఏరియా", "ఎల్లారెడ్డిగూడ", "పంజాగుట్ట కాలనీ"]
    },
    actions: {
      en: [
        "Keep mobile phones, power banks, and laptops fully charged before 10:00 AM.",
        "Unplug sensitive electronic devices before 10:00 AM to prevent surge damage.",
        "Plan elevator usage in multi-story apartments to avoid mid-transit halts.",
        "Inform local electricity maintenance staff in advance if home medical equipment requires priority power restoration."
      ],
      te: [
        "ఉదయం 10:00 గంటలకు ముందే మొబైల్ ఫోన్లు, పవర్ బ్యాంకులు, ల్యాప్‌టాప్‌లను పూర్తిగా చార్జ్ చేసుకోండి.",
        "కరెంట్ వచ్చినప్పుడు వచ్చే హెచ్చుతగ్గుల నుండి రక్షణ కోసం సున్నితమైన ఎలక్ట్రానిక్ పరికరాలను అన్‌ప్లగ్ చేయండి.",
        "అపార్ట్‌మెంట్లలో లిఫ్ట్ వినియోగాన్ని ముందుగానే ప్రణాళిక చేసుకోండి.",
        "వైద్య పరికరాలు వాడేవారు ముందస్తుగా విద్యుత్ సహాయ సిబ్బందికి సమాచారం అందించండి."
      ]
    },
    priority: "normal",
    status: "upcoming",
    published: true,
    issuedDate: "2026-10-13",
    isSample: true,
    originalText: {
      en: "Operational Notification: TSSPDCL Metro Division-II alerts that under the statutory annual pre-cyclonic inspection protocol, 33/11 KV Ameerpet and Balanagar sub-stations shall remain de-energized on 16.10.2026 between 1000 hrs and 1400 hrs for conductor string replacement and isolator calibration. Inconvenience to commercial and domestic consumers is regretted.",
      te: "కార్యాచరణ ప్రకటన: TSSPDCL మెట్రో డివిజన్-II వార్షిక తనిఖీలలో భాగంగా 16.10.2026 ఉదయం 10:00 నుండి మధ్యాహ్నం 2:00 గంటల వరకు 33/11 కేవీ అమీర్‌పేట్, బాలానగర్ సబ్-స్టేషన్ల పరిధిలో విద్యుత్ సరఫరా తాత్కాలికంగా నిలిపివేయబడుతుంది. వినియోగదారులకు కలిగే అసౌకర్యానికి విచారిస్తున్నాము."
    }
  },
  {
    id: "cs-2026-003",
    referenceNumber: "DEMO-REF: DPHFW/EPI/2026/108",
    category: "health",
    department: {
      en: "Department of Public Health & Family Welfare",
      te: "ప్రజారోగ్య & కుటుంబ సంక్షేమ శాఖ"
    },
    title: {
      en: "National Pulse Polio Immunization Drive Across All Urban Primary Health Centers",
      te: "అన్ని పట్టణ ప్రాథమిక ఆరోగ్య కేంద్రాలలో జాతీయ పల్స్ పోలియో వ్యాక్సినేషన్ కార్యక్రమం"
    },
    summary: {
      en: "All children below 5 years must receive polio immunization drops on Sunday, Oct 25. Free booths are established at all Urban Primary Health Centers, metro stations, railway junctions, and major parks. Mobile teams will cover bus depots.",
      te: "అక్టోబర్ 25, ఆదివారం నాడు 5 సంవత్సరాల లోపు పిల్లలందరికీ తప్పనిసరిగా పోలియో చుక్కలు వేయించాలి. అన్ని పట్టణ ప్రాథమిక ఆరోగ్య కేంద్రాలు, మెట్రో స్టేషన్లు, రైల్వే జంక్షన్లు మరియు పార్కులలో ఉచిత పోలియో బూత్‌లు ఏర్పాటు చేయబడ్డాయి."
    },
    date: {
      en: "Sunday, Oct 25, 2026",
      te: "ఆదివారం, అక్టోబర్ 25, 2026"
    },
    timing: {
      en: "7:00 AM to 6:00 PM",
      te: "ఉదయం 7:00 నుండి సాయంత్రం 6:00 వరకు"
    },
    locations: {
      en: ["All Urban Wards", "Secunderabad Railway Station", "MGBS Bus Complex", "Miyapur Metro Hub", "Sanjeevaiah Park Booth"],
      te: ["అన్ని పట్టణ వార్డులు", "సికింద్రాబాద్ రైల్వే స్టేషన్", "ఎంజీబీఎస్ బస్ కాంప్లెక్స్", "మియాపూర్ మెట్రో హబ్", "సంజీవయ్య పార్క్ బూత్"]
    },
    actions: {
      en: [
        "Bring all children under 5 years of age to the nearest immunization booth.",
        "Carry previous child immunization cards for record stamping if available.",
        "Even if your child received polio drops recently, this booster dose is safe and required.",
        "Look for the purple ink finger mark before leaving the health booth."
      ],
      te: [
        "5 సంవత్సరాల లోపు పిల్లలందరినీ సమీపంలోని పోలియో బూత్‌కు తీసుకురండి.",
        "గతంలో ఇచ్చిన టీకా కార్డులు ఉంటే వెంట తీసుకురండి.",
        "ఇటీవల పోలియో చుక్కలు వేయించినప్పటికీ, ఈ బూస్టర్ డోస్ సురక్షితం మరియు తప్పనిసరి.",
        "బూత్ నుండి బయలుదేరే ముందు చిన్నారి వేలికి సిరా గుర్తు వేయించారో లేదో నిర్ధారించుకోండి."
      ]
    },
    priority: "advisory",
    status: "upcoming",
    published: true,
    issuedDate: "2026-10-12",
    isSample: true,
    originalText: {
      en: "Directive No: 108/EPI/Imm-2026: The Commissionerate of Family Welfare proclaims the execution of the First Round National Immunization Day (NID). All pediatric population (0-59 months) shall be administered 2 drops of bivalent Oral Polio Vaccine (bOPV) on 25.10.2026 at certified booths regardless of previous immunization status.",
      te: "ఆదేశం సంఖ్య: 108/EPI/Imm-2026: కుటుంబ సంక్షేమ శాఖ కమిషనరేట్ మొదటి విడత జాతీయ పోలియో దినోత్సవాన్ని ప్రకటించింది. 25.10.2026 నాడు 0 నుండి 59 నెలల వయస్సు గల పిల్లలందరికీ 2 చుక్కల ఓరల్ పోలియో వ్యాక్సిన్ అందించబడుతుంది."
    }
  },
  {
    id: "cs-2026-004",
    referenceNumber: "DEMO-REF: TCP/TR-DIV/2026/077",
    category: "traffic",
    department: {
      en: "City Traffic Police & Urban Roads Authority",
      te: "నగర ట్రాఫిక్ పోలీస్ & పట్టణ రోడ్ల అభివృద్ధి సంస్థ"
    },
    title: {
      en: "Nightly Traffic Diversions on Outer Ring Road Junction for Steel Flyover Girder Erection",
      te: "స్టీల్ ఫ్లైఓవర్ గిర్డర్ పనుల కోసం ఔటర్ రింగ్ రోడ్ జంక్షన్ వద్ద రాత్రివేళ ట్రాఫిక్ మళ్లింపు"
    },
    summary: {
      en: "Heavy vehicles and regular transit heading toward Financial District will be redirected nightly between 11:00 PM and 5:00 AM due to the placement of prefabricated steel flyover girders. Alternate bypass routes are operational.",
      te: "స్టీల్ ఫ్లైఓవర్ గిర్డర్ల నిర్మాణ పనుల దృష్ట్యా ఫైనాన్షియల్ డిస్ట్రిక్ట్ వైపు వెళ్లే వాహనాలను రాత్రి 11:00 నుండి ఉదయం 5:00 గంటల వరకు ప్రత్యామ్నాయ మార్గాల ద్వారా మళ్లించడం జరుగుతుంది. ప్రత్యామ్నాయ బైపాస్ రోడ్లు అందుబాటులో ఉన్నాయి."
    },
    date: {
      en: "Oct 14 - Oct 20, 2026 (Night hours only)",
      te: "అక్టోబర్ 14 - అక్టోబర్ 20, 2026 (రాత్రి వేళల్లో మాత్రమే)"
    },
    timing: {
      en: "11:00 PM to 5:00 AM Nightly",
      te: "రాత్రి 11:00 నుండి ఉదయం 5:00 వరకు ప్రతి రాత్రి"
    },
    locations: {
      en: ["Gachibowli Junction", "ORR Exit 19", "Nanakramguda Circle", "Financial District Radial Road 5"],
      te: ["గచ్చిబౌలి జంక్షన్", "ఓఆర్ఆర్ ఎగ్జిట్ 19", "నానక్‌రామ్‌గూడ సర్కిల్", "ఫైనాన్షియల్ డిస్ట్రిక్ట్ రేడియల్ రోడ్డు 5"]
    },
    actions: {
      en: [
        "Take ORR Exit 18 (Narsingi) as primary alternate route between 11:00 PM and 5:00 AM.",
        "Allow an extra 20 minutes if traveling to Rajiv Gandhi International Airport during night hours.",
        "Follow neon direction signage and heed on-ground traffic marshals.",
        "Heavy cargo multi-axle trucks must halt at outer toll plazas until 5:00 AM."
      ],
      te: [
        "రాత్రి 11:00 నుండి ఉదయం 5:00 మధ్య నార్సింగి ఎగ్జిట్ 18 ని ప్రత్యామ్నాయ మార్గంగా ఉపయోగించండి.",
        "రాత్రి వేళల్లో విమానాశ్రయానికి వెళ్లే ప్రయాణికులు అదనంగా 20 నిమిషాల సమయం కేటాయించండి.",
        "రోడ్డుపై ఏర్పాటు చేసిన దిశానిర్దేశక బోర్డులు మరియు ట్రాఫిక్ పోలీసుల సూచనలు పాటించండి.",
        "భారీ సరుకు రవాణా వాహనాలు తెల్లవారుజామున 5:00 గంటల వరకు టోల్ ప్లాజాల వద్ద వేచి ఉండాలి."
      ]
    },
    priority: "urgent",
    status: "active",
    published: true,
    issuedDate: "2026-10-14",
    isSample: true,
    originalText: {
      en: "Gazette Notification TR/2026/077: In furtherance of statutory powers under Section 115 of Motor Vehicles Act, Commissioner of Police regulates vehicular circulation at Gachibowli junction between 2300 hrs and 0500 hrs from 14.10.2026 to 20.10.2026 for heavy composite girder launches. Traffic will be routed via Radial Road 5.",
      te: "గెజిట్ నోటిఫికేషన్ TR/2026/077: మోటారు వాహనాల చట్టం సెక్షన్ 115 కింద గచ్చిబౌలి జంక్షన్ వద్ద ఫ్లైఓవర్ గిర్డర్ పనుల దృష్ట్యా 14.10.2026 నుండి 20.10.2026 వరకు రాత్రి 11:00 నుండి ఉదయం 05:00 వరకు ట్రాఫిక్ రేడియల్ రోడ్ 5 మీదుగా మళ్లించబడుతుంది."
    }
  },
  {
    id: "cs-2026-005",
    referenceNumber: "DEMO-REF: GHMC/REV/PT/2026/309",
    category: "revenue",
    department: {
      en: "Greater Municipal Corporation - Revenue Wing",
      te: "గ్రేటర్ మున్సిపల్ కార్పొరేషన్ - రెవెన్యూ విభాగం"
    },
    title: {
      en: "5% Early Bird Incentive Rebate on Full Year Property Tax Settlement",
      te: "సంవత్సరం మొత్తం ఆస్తి పన్ను ఒకేసారి చెల్లింపుపై 5% ఎర్లీ బర్డ్ రాయితీ"
    },
    summary: {
      en: "Property owners who pay their complete annual property tax before Saturday, Oct 31 can claim a 5% discount on their total tax bill. Payments can be submitted 24/7 online or at any municipal citizen service center.",
      te: "అక్టోబర్ 31, శనివారం లోపు పూర్తి సంవత్సరం ఆస్తి పన్ను చెల్లించే ఆస్తి యజమానులకు మొత్తం పన్నుపై 5% ఎర్లీ బర్డ్ తగ్గింపు లభిస్తుంది. ఈ చెల్లింపులను ఆన్‌లైన్ ద్వారా లేదా పౌర సేవా కేంద్రాలలో చెల్లించవచ్చు."
    },
    date: {
      en: "Offer valid till Saturday, Oct 31, 2026",
      te: "ఆఫర్ అక్టోబర్ 31, 2026 శనివారం వరకు చెల్లుబాటు"
    },
    timing: {
      en: "Online: 24/7 | Citizen Counters: 9:30 AM to 5:00 PM",
      te: "ఆన్‌లైన్: 24/7 | పౌర సేవా కేంద్రాలు: ఉదయం 9:30 నుండి సాయంత్రం 5:00 వరకు"
    },
    locations: {
      en: ["All Municipal Circles", "Citizen Service Centers (MeeSeva)", "Online Citizen Portal"],
      te: ["అన్ని మున్సిపల్ సర్కిళ్ళు", "సిటిజన్ సర్వీస్ సెంటర్లు (మీసేవ)", "ఆన్‌లైన్ సిటిజన్ పోర్టల్"]
    },
    actions: {
      en: [
        "Locate your 10-digit Property Tax Identification Number (PTIN) on last year's receipt.",
        "Visit the municipal online payment portal or nearest citizen counter before Oct 31.",
        "Ensure the 5% rebate calculation is reflected in the final invoice before making payment.",
        "Download and save the digital receipt with the official QR authentication code."
      ],
      te: [
        "గత సంవత్సరం రసీదుపై ఉన్న మీ 10 అంకెల పిటిన్ (PTIN) నంబర్‌ను సిద్ధంగా ఉంచుకోండి.",
        "అక్టోబర్ 31 లోపు మున్సిపల్ ఆన్‌లైన్ పోర్టల్ లేదా సమీపంలోని మీసేవ కేంద్రాన్ని సందర్శించండి.",
        "చెల్లింపు చేసే ముందు 5% తగ్గింపు వర్తించిందో లేదో సరిచూసుకోండి.",
        "చెల్లింపు పూర్తయిన తర్వాత డిజిటల్ రసీదును డౌన్‌లోడ్ చేసుకుని భద్రపరుచుకోండి."
      ]
    },
    priority: "advisory",
    status: "active",
    published: true,
    issuedDate: "2026-10-10",
    isSample: true,
    originalText: {
      en: "Statutory Order GHMC/REV/309: In pursuance of the Municipal Corporation Act incentive schemes, sanction is accorded for the grant of 5% rebate on the current year's general property tax demand to assessed owners who liquidate the complete assessment on or prior to 31.10.2026. Arrears of preceding years do not qualify for rebate.",
      te: "మున్సిపల్ కార్పొరేషన్ చట్టం కింద ప్రస్తుత ఆర్థిక సంవత్సరానికి సంబంధించి 31.10.2026 లోపు పూర్తి ఆస్తి పన్ను చెల్లించే వారికి 5% రాయితీ మంజూరు చేయబడింది. పాత బకాయిలకు ఈ రాయితీ వర్తించదు."
    }
  },
  {
    id: "cs-2026-006",
    referenceNumber: "DEMO-REF: SAN/MN-DRIVE/2026/005",
    category: "sanitation",
    department: {
      en: "Urban Sanitation & Drainage Maintenance Division",
      te: "పట్టణ పారిశుధ్యం & మురుగు కాలువల నిర్వహణ విభాగం"
    },
    title: {
      en: "Intensive Underground Drainage De-silting Drive Completed in Eastern Wards",
      te: "తూర్పు వార్డులలో భూగర్భ మురుగు కాలువల పూడికతీత పనులు విజయవంతంగా పూర్తి"
    },
    summary: {
      en: "Pre-monsoon de-silting and automated mechanical super-sucker clearing of major underground stormwater pipelines across Eastern wards was successfully completed on Oct 11. Citizens are requested to report any localized blockages.",
      te: "తూర్పు వార్డుల పరిధిలోని ప్రధాన భూగర్భ మురుగు కాలువల పూడికతీత పనులు అక్టోబర్ 11న విజయవంతంగా పూర్తయ్యాయి. స్థానికంగా ఎక్కడైనా నీటి నిల్వ సమస్యలు ఉంటే వెంటనే హెల్ప్‌లైన్‌కు తెలియజేయాలని కోరడమైనది."
    },
    date: {
      en: "Completed on Sunday, Oct 11, 2026",
      te: "అక్టోబర్ 11, 2026 ఆదివారం నాడు పూర్తయింది"
    },
    timing: {
      en: "Completed (Post-Inspection Verification Ongoing)",
      te: "పూర్తయింది (తనిఖీలు కొనసాగుతున్నాయి)"
    },
    locations: {
      en: ["LB Nagar", "Dilsukhnagar", "Nagole", "Kothapet Ward 18", "Chaitanyapuri"],
      te: ["ఎల్బీ నగర్", "దిల్‌సుఖ్‌నగర్", "నాగోలు", "కొత్తపేట వార్డు 18", "చైతన్యపురి"]
    },
    actions: {
      en: [
        "Do not dump commercial plastic, coconut shells, or construction debris into street manholes.",
        "Report localized rainwater backflow or clogged catch-pits to your local ward sanitation inspector.",
        "Ensure individual household inspection chambers have tight-fitting rodent screens."
      ],
      te: [
        "వీధి మురుగు కాలువలు మరియు మ్యాన్‌హోళ్లలో ప్లాస్టిక్, చెత్త లేదా నిర్మాణ వ్యర్థాలు వేయకండి.",
        "మురుగు లేదా వర్షపు నీరు నిలిచిపోతే స్థానిక వార్డు పారిశుధ్య పర్యవేక్షకులకు తెలియజేయండి.",
        "ఇళ్ల మురుగు కాలువల ఛాంబర్లపై సరైన మూతలు ఉండేలా చూసుకోండి."
      ]
    },
    priority: "normal",
    status: "completed",
    published: true,
    issuedDate: "2026-10-11",
    isSample: true,
    originalText: {
      en: "Field Completion Report: Superintending Engineer (Sanitation) certifies completion of trunk pipeline desilting in Circle 5 East. Total 420 metric tons of silt removed through automated jetting units. Manholes sealed in accordance with national safety guidelines.",
      te: "పని పూర్తి నివేదిక: సర్కిల్ 5 తూర్పు పరిధిలోని ప్రధాన మురుగు కాలువల పూడికతీత పనులు పూర్తయినట్లు ధృవీకరించబడింది. మొత్తం 420 మెట్రిక్ టన్నుల పూడికను తొలగించి, మ్యాన్‌హోళ్లను భద్రతా నిబంధనల ప్రకారం మూసివేయడం జరిగింది."
    }
  }
];

const UI_TRANSLATIONS = {
  en: {
    appTitle: "CivicSignal AI",
    tagline: "Important local information, made easy for everyone.",
    demoBadge: "💡 College Hackathon Demonstration | Demonstration Data Only | Not Connected to Government Systems",
    sampleNoticeBadge: "⚠️ SAMPLE — NOT AN OFFICIAL GOVERNMENT NOTICE",
    sampleModalWarning: "⚠️ DEMONSTRATION NOTICE: Fictional content for academic hackathon demonstration only. Not an official municipal circular.",
    navNotices: "Public Notices",
    navHowItWorks: "How It Works",
    navAdmin: "Admin Demo",
    navAdminBadge: "Demo",
    heroHeading: "Understand Government Circulars in Seconds",
    heroSubheading: "Important local information, made easy for everyone. Official announcements simplified into clear dates, affected localities, and practical action steps.",
    statTotalNotices: "Total Notices",
    statActiveAlerts: "Active Notices",
    statUpcomingAlerts: "Upcoming Notices",
    statLocations: "Localities Covered",
    statLanguages: "Languages Supported",
    searchPlaceholder: "Search by locality, keyword, department, or notice reference...",
    filterAll: "All Categories",
    filterWater: "Water Supply",
    filterElectricity: "Electricity",
    filterHealth: "Public Health",
    filterTraffic: "Traffic & Transit",
    filterRevenue: "Taxes & Schemes",
    filterSanitation: "Sanitation",
    statusAll: "All Statuses",
    statusActive: "Active",
    statusUpcoming: "Upcoming",
    statusCompleted: "Completed",
    sortNewest: "Newest First",
    sortOldest: "Oldest First",
    clearFilters: "Clear Filters",
    noNoticesTitle: "No Notices Found",
    noNoticesDesc: "No public notices matched your search query or selected filters.",
    btnViewDetails: "View Citizen Breakdown",
    btnCopySummary: "Copy Summary",
    btnPrintNotice: "Print Notice",
    btnClose: "Close",
    labelImportantDate: "Important Date / Window",
    labelTiming: "Specific Timing",
    labelAffectedLocations: "Affected Locations & Wards",
    labelRequiredActions: "What Citizens Need To Do",
    labelOriginalExcerpt: "Original Official Circular Text (Before Simplification)",
    labelDept: "Department / Issuing Authority",
    labelRef: "Reference No",
    labelIssued: "Issued Date",
    labelSummaryHeader: "Plain-Language Citizen Summary",
    labelVerificationStatus: "Verification Status",
    verificationDemoText: "Simulated Demonstration Notice • Based on fictional hackathon scenario",
    qLocality: "Does this affect my locality?",
    qWhen: "When does it happen?",
    qWhatToDo: "What should I do?",
    adminTitle: "Administrator Demo Console",
    adminSubtitle: "Simulate publishing, updating notice statuses, and testing citizen view updates. Changes persist in your browser localStorage.",
    tabAddNotice: "Publish New Notice",
    tabManageNotices: "Manage Notices",
    formTitleEn: "Notice Title (English) *",
    formTitleTe: "Notice Title (Telugu)",
    formCategory: "Category *",
    formDeptEn: "Issuing Department (English) *",
    formDeptTe: "Issuing Department (Telugu)",
    formDateEn: "Important Date / Schedule (English) *",
    formDateTe: "Important Date (Telugu)",
    formTimingEn: "Timing (e.g. 10:00 AM - 2:00 PM)",
    formLocationsEn: "Affected Locations (comma separated) *",
    formLocationsTe: "Affected Locations (Telugu, comma separated)",
    formActionsEn: "Required Citizen Actions (one per line or comma separated) *",
    formActionsTe: "Citizen Actions (Telugu, one per line)",
    formOriginalTextEn: "Original Circular Text (English) *",
    formOriginalTextTe: "Original Circular Text (Telugu)",
    formSummaryEn: "Simplified Summary (English) *",
    formSummaryTe: "Simplified Summary (Telugu)",
    formPriority: "Urgency / Priority *",
    formStatus: "Notice Status *",
    btnAutoSummarize: "✨ Demo AI Summary Assistant — Simulated",
    btnSubmitNotice: "Publish Notice to Feed",
    btnResetDefaultData: "Reset to Sample Demo Data",
    confirmReset: "Are you sure you want to restore the original 6 sample demo notices? Any custom notices you added will be removed.",
    confirmDelete: "Are you sure you want to delete this notice?",
    tableRef: "Ref / ID",
    tableTitle: "Notice Title",
    tableCategory: "Category",
    tableStatus: "Status",
    tablePublished: "Visibility",
    tableActions: "Actions",
    btnDelete: "Delete",
    statusUrgent: "Urgent",
    statusNormal: "Standard",
    statusAdvisory: "Advisory",
    visPublished: "Published",
    visUnpublished: "Draft / Hidden",
    howStep1Title: "1. Complex Official Circular",
    howStep1Desc: "Government announcements are released as dense 5-10 page PDF orders with heavy administrative and legal jargon.",
    howStep2Title: "2. Structured Civic Extraction",
    howStep2Desc: "CivicSignal AI extracts what matters: Does this affect my ward? When does it happen? What practical steps must I take?",
    howStep3Title: "3. Bilingual Citizen Accessibility",
    howStep3Desc: "Citizens read concise summaries in English or Telugu on any mobile device with interactive task checklists.",
    footerDisclaimer: "CivicSignal AI is an academic hackathon prototype. All presented notices are demonstration data designed for presentation and evaluation.",
    checklistHint: "Interactive Checklist: Check off items as you complete them to track readiness."
  },
  te: {
    appTitle: "CivicSignal AI",
    tagline: "ముఖ్యమైన స్థానిక సమాచారం, అందరికీ సులభంగా.",
    demoBadge: "💡 కాలేజీ హ్యాకథాన్ ప్రాజెక్ట్ | ప్రదర్శన నమూనా డేటా మాత్రమే | ప్రభుత్వ అధికారిక వ్యవస్థలతో అనుసంధానం లేదు",
    sampleNoticeBadge: "⚠️ నమూనా — ఇది అధికారిక ప్రభుత్వ నోటీసు కాదు",
    sampleModalWarning: "⚠️ ప్రదర్శన నమూనా నోటీసు: విద్యా హ్యాకథాన్ ప్రదర్శన కోసం రూపొందించిన కల్పిత సమాచారం మాత్రమే. ఇది అధికారిక మున్సిపల్ సర్క్యులర్ కాదు.",
    navNotices: "ప్రజా నోటీసులు",
    navHowItWorks: "ఇది ఎలా పనిచేస్తుంది",
    navAdmin: "నిర్వాహక డెమో",
    navAdminBadge: "డెమో",
    heroHeading: "ప్రభుత్వ సర్క్యులర్లను క్షణాల్లో అర్థం చేసుకోండి",
    heroSubheading: "ముఖ్యమైన స్థానిక సమాచారం, అందరికీ సులభంగా. అధికారిక ప్రకటనల నుండి స్పష్టమైన తేదీలు, ప్రభావిత ప్రాంతాలు మరియు పౌరులు చేయవలసిన ముఖ్యమైన పనుల సులువైన సారాంశం.",
    statTotalNotices: "మొత్తం నోటీసులు",
    statActiveAlerts: "అమలులో ఉన్నవి",
    statUpcomingAlerts: "రాబోయే నోటీసులు",
    statLocations: "కవర్ చేయబడిన ప్రాంతాలు",
    statLanguages: "భాషల మద్దతు",
    searchPlaceholder: "ప్రాంతం, కీవర్డ్, విభాగం లేదా రిఫరెన్స్ నంబర్ ద్వారా శోధించండి...",
    filterAll: "అన్ని రంగాలు",
    filterWater: "నీటి సరఫరా",
    filterElectricity: "విద్యుత్ సరఫరా",
    filterHealth: "ప్రజారోగ్యం",
    filterTraffic: "ట్రాఫిక్ & రవాణా",
    filterRevenue: "పన్నులు & పథకాలు",
    filterSanitation: "పారిశుధ్యం",
    statusAll: "అన్ని స్థితులు",
    statusActive: "అమలులో ఉన్నవి",
    statusUpcoming: "రాబోయేవి",
    statusCompleted: "పూర్తయినవి",
    sortNewest: "తాజావి ముందు",
    sortOldest: "పాతవి ముందు",
    clearFilters: "ఫిల్టర్లు తొలగించు",
    noNoticesTitle: "నోటీసులు ఏవీ కనుగొనబడలేదు",
    noNoticesDesc: "మీరు ఎంచుకున్న శోధనకు సరిపోలే ప్రజా నోటీసులు ఏవీ లేవు.",
    btnViewDetails: "పూర్తి వివరాలు చూడండి",
    btnCopySummary: "సారాంశం కాపీ చేయండి",
    btnPrintNotice: "నోటీసు ప్రింట్ చేయండి",
    btnClose: "మూసివేయి",
    labelImportantDate: "ముఖ్యమైన తేదీ / సమయం",
    labelTiming: "నిర్దిష్ట సమయం",
    labelAffectedLocations: "ప్రభావిత ప్రాంతాలు & వార్డులు",
    labelRequiredActions: "పౌరులు చేయవలసిన ముఖ్యమైన పనులు",
    labelOriginalExcerpt: "అధికారిక సర్క్యులర్ అసలు పాఠం (సులభతరం చేయడానికి ముందు)",
    labelDept: "జారీ చేసిన విభాగం / సంస్థ",
    labelRef: "రిఫరెన్స్ సంఖ్య",
    labelIssued: "జారీ చేసిన తేదీ",
    labelSummaryHeader: "సులువైన పౌర సారాంశం",
    labelVerificationStatus: "ధృవీకరణ స్థితి",
    verificationDemoText: "డెమో ప్రదర్శన నోటీసు • హ్యాకథాన్ నమూనా ఆధారంగా రూపొందించబడింది",
    qLocality: "ఇది నా ప్రాంతాన్ని ప్రభావితం చేస్తుందా?",
    qWhen: "ఇది ఎప్పుడు జరుగుతుంది?",
    qWhatToDo: "నేను ఏమి చేయాలి?",
    adminTitle: "నిర్వాహక డెమో కన్సోల్ (Admin Demo)",
    adminSubtitle: "కొత్త నోటీసులను జోడించడం, స్థితిని మార్చడం మరియు పౌర ఫీడ్ మార్పులను పరీక్షించడానికి అనుకరణ కన్సోల్. డేటా బ్రౌజర్ localStorage లో సేవ్ అవుతుంది.",
    tabAddNotice: "కొత్త నోటీసు ప్రచురణ",
    tabManageNotices: "నోటీసుల నిర్వహణ",
    formTitleEn: "నోటీసు శీర్షిక (English) *",
    formTitleTe: "నోటీసు శీర్షిక (తెలుగు)",
    formCategory: "విభాగం / వర్గం *",
    formDeptEn: "జారీ చేసిన శాఖ (English) *",
    formDeptTe: "జారీ చేసిన శాఖ (తెలుగు)",
    formDateEn: "ముఖ్యమైన తేదీ (English) *",
    formDateTe: "ముఖ్యమైన తేదీ (తెలుగు)",
    formTimingEn: "సమయం (ఉదా: 10:00 AM - 2:00 PM)",
    formLocationsEn: "ప్రభావిత ప్రాంతాలు (కామాలతో విభజించండి) *",
    formLocationsTe: "ప్రభావిత ప్రాంతాలు (తెలుగు)",
    formActionsEn: "చేయవలసిన పనులు (ప్రతి లైనుకు ఒకటి లేదా కామాలతో) *",
    formActionsTe: "చేయవలసిన పనులు (తెలుగు)",
    formOriginalTextEn: "అసలు సర్క్యులర్ పాఠం (English) *",
    formOriginalTextTe: "అసలు సర్క్యులర్ పాఠం (తెలుగు)",
    formSummaryEn: "సులువైన సారాంశం (English) *",
    formSummaryTe: "సులువైన సారాంశం (తెలుగు)",
    formPriority: "ప్రాధాన్యత / తీవ్రత *",
    formStatus: "నోటీసు స్థితి *",
    btnAutoSummarize: "✨ డెమో AI సారాంశ సహాయకం — అనుకరణ (Simulated)",
    btnSubmitNotice: "నోటీసును ప్రచురించు",
    btnResetDefaultData: "నమూనా డెమో డేటాను పునరుద్ధరించు",
    confirmReset: "మీరు ప్రారంభ 6 నమూనా నోటీసులను పునరుద్ధరించాలనుకుంటున్నారా? మీరు జోడించిన తాజా నోటీసులు తొలగించబడతాయి.",
    confirmDelete: "ఈ నోటీసును ఖచ్చితంగా తొలగించాలనుకుంటున్నారా?",
    tableRef: "రిఫరెన్స్ / ID",
    tableTitle: "నోటీసు శీర్షిక",
    tableCategory: "వర్గం",
    tableStatus: "స్థితి",
    tablePublished: "ప్రచురణ",
    tableActions: "చర్యలు",
    btnDelete: "తొలగించు",
    statusUrgent: "అత్యవసరం",
    statusNormal: "సాధారణం",
    statusAdvisory: "సమాచారార్థం",
    visPublished: "ప్రచురించబడింది",
    visUnpublished: "డ్రాఫ్ట్ / దాచబడింది",
    howStep1Title: "1. క్లిష్టమైన అధికారిక సర్క్యులర్",
    howStep1Desc: "ప్రభుత్వ ప్రకటనలు సాధారణంగా 10+ పేజీల న్యాయ, పరిపాలనా పదాలతో కూడి ఉంటాయి.",
    howStep2Title: "2. సులభమైన వర్గీకరణ",
    howStep2Desc: "సివిక్ సిగ్నల్ ముఖ్యమైన తేదీలు, ప్రభావిత ప్రాంతాలు మరియు ప్రజలు చేయవలసిన పనులను మాత్రమే సంగ్రహిస్తుంది.",
    howStep3Title: "3. బహుభాషా ప్రాప్యత",
    howStep3Desc: "తెలుగు-ఇంగ్లీష్ ద్విభాషా సదుపాయం ద్వారా ప్రతి ఒక్కరికీ సమాచారం సులభంగా చేరుతుంది.",
    footerDisclaimer: "సివిక్ సిగ్నల్ AI అనేది ఒక విద్యా పరిశోధన మరియు హ్యాకథాన్ నమూనా ప్రాజెక్ట్. ఇక్కడ చూపించబడిన వివరాలు ప్రదర్శన కోసం రూపొందించిన నమూనాలు మాత్రమే.",
    checklistHint: "ఇంటరాక్టివ్ చెక్‌లిస్ట్: మీరు పూర్తి చేసిన పనులపై టిక్ చేయవచ్చు."
  }
};
