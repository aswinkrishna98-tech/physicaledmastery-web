// ============================================================================
// PE PREP — SCHOOL TRACK: CBSE Skill Subject "Physical Activity Trainer"
// (Subject Code 845, CBSE Department of Skill Education)
// Class XI job role: "Physical Education Assistant (Primary Years)"
// Class XII job role: "Primary Years Physical Activity Facilitator"
// Content is grounded in the official NCVET/CBSE textbooks (PSSCIVE, Bhopal +
// Sports Physical Education Fitness & Leisure Sector Skill Council + Sportz
// Village Pvt. Ltd.) and the official CBSE curriculum document + the official
// Class XII Sample Question Paper (cbseacademic.nic.in, 2025-26, code 845).
// Same schema as QUESTION_BANK so these questions work everywhere that array
// is used (search, bookmarks, question detail pages, etc.)
// ============================================================================

const SCHOOL_CLASSES = [
  {
    id: "xi",
    grade: "Class XI",
    jobRole: "Physical Education Assistant (Primary Years)",
    examTag: "PAT-11",
    totalMarks: 100,
    blurb: "Works in a primary school, apartment or club teaching the basics of sports to build sports skills and fitness in children up to 12 years old.",
    units: [
      {id:"cd", name:"Role of PE in Child Development", subject:"PAT XI — Role of PE in Child Development", marks:13, subtopics:["Physical & emotional needs of children","Factors influencing physical activities","Planning physical activities for children"]},
      {id:"pe", name:"Props and Equipment", subject:"PAT XI — Props and Equipment", marks:6, subtopics:["Types & tools of assessment","Preparing an equipment list","Inspection of the playfield"]},
      {id:"hs", name:"Hygiene and Safety", subject:"PAT XI — Hygiene and Safety", marks:8, subtopics:["Maintaining hygiene in the play area","Basic first aid","Emergency response & casualty management"]},
      {id:"sf", name:"Sports and Fitness", subject:"PAT XI — Sports and Fitness", marks:13, subtopics:["Selecting yearly sports activities","Resources for organising competitions","Conducting fitness sessions"]},
    ],
    pyqSubject: "PAT XI — Practice Questions (Exam Pattern)",
    pyqNote: "CBSE does not hold a board exam for Class XI skill subjects (it's assessed internally by the school), so no official Class XI question paper is published. These are practice questions written in the same style and difficulty as the real CBSE Class XII paper below, covering the Class XI syllabus.",
  },
  {
    id: "xii",
    grade: "Class XII",
    jobRole: "Primary Years Physical Activity Facilitator",
    examTag: "PAT-12",
    totalMarks: 100,
    blurb: "An Assistant to the Sports Teacher / PE Teacher / PT Teacher who conducts play activities, coaching, mentoring, assessment and emergency response for primary-level students.",
    units: [
      {id:"ov", name:"Overview of PE & Sports Sector", subject:"PAT XII — Overview of PE & Sports Sector", marks:10, subtopics:["Career paths in the sports sector","Games, Sports, Physical Activity & Recreation","Employability skills"]},
      {id:"as", name:"Assessment of Students", subject:"PAT XII — Assessment of Students", marks:10, subtopics:["Types of assessment","Assessment tools & rubrics","Qualitative & quantitative assessment","Fitness testing","Reporting to parents"]},
      {id:"em", name:"Emergency Management", subject:"PAT XII — Emergency Management", marks:10, subtopics:["Meaning & importance of emergency response","Emergency Action Plans","Common conditions & first aid"]},
      {id:"hh", name:"Health and Hygiene in Play Area", subject:"PAT XII — Health and Hygiene in Play Area", marks:10, subtopics:["Kits for games & practice","Inspection of the play area","Maintenance of hygiene"]},
    ],
    pyqSubject: "PAT XII — Board PYQs (CBSE SQP)",
    pyqNote: "These are the real objective-type questions from CBSE's official Sample Question Paper for Physical Activity Trainer, Class XII (Subject Code 845, 2025-26 cycle, cbseacademic.nic.in) — not modeled questions.",
  },
];

const SCHOOL_QUESTION_BANK = [

// =====================================================================
// CLASS XI — UNIT: ROLE OF PE IN CHILD DEVELOPMENT
// =====================================================================
{id:"PAT11-CD-001",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Physical & Emotional Needs",subtopic:"Health Triangle",difficulty:"Easy",type:"MCQ",year:2026,
question:"The 'Health Triangle' taught in this unit divides a child's overall health into which three components?",
options:["Physical, Mental, Social","Physical, Emotional, Financial","Mental, Spiritual, Academic","Physical, Social, Academic"],correctIndex:0,
explanation:"The textbook's Health Triangle diagram splits overall health into Physical, Mental and Social health — all three must be balanced for a child's holistic wellbeing.",
concept:{title:"The Health Triangle",definition:"A model showing that true health is not just the absence of illness but a balance of physical, mental and social wellbeing.",points:["Physical Health — built from exercise, nutrition and rest","Mental Health traits — confidence, resilience, positive outlook","Social Health — the ability to form healthy relationships"],memoryTrick:"Think 'Body, Mind, Friends' — the three corners of the triangle.",sportsRelevance:"A Physical Education Assistant plans activities that build all three sides of the triangle, not just physical fitness."},
relatedIds:["PAT11-CD-002"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.1",tags:["child-development","health"]},

{id:"PAT11-CD-002",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Physical & Emotional Needs",subtopic:"Physical Health",difficulty:"Easy",type:"MCQ",year:2026,
question:"According to the Physical Health diagram in the textbook, which three elements make up a child's physical health?",
options:["Exercise, Nutrition, Rest","Exercise, Sleep, Screen-time","Diet, Height, Weight","Strength, Speed, Stamina"],correctIndex:0,
explanation:"The Physical Health sub-diagram lists Exercise, Nutrition and Rest as its three pillars.",
concept:{title:"Pillars of Physical Health",definition:"Physical health in children is built and maintained through a balance of activity, food intake and recovery.",points:["Exercise — regular age-appropriate physical activity","Nutrition — quality and quantity of food intake","Rest — adequate sleep and recovery time"],memoryTrick:"E-N-R: Exercise, Nutrition, Rest.",sportsRelevance:"A PE Assistant's fitness sessions only work if nutrition and rest are also in place — fitness advice should always cover all three."},
relatedIds:["PAT11-CD-001"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.1",tags:["child-development","health"]},

{id:"PAT11-CD-003",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Course Overview",subtopic:"About the Course",difficulty:"Easy",type:"MCQ",year:2026,
question:"As per the course description, a 'Physical Education Assistant (Primary Years)' builds sports skills and fitness in children up to what age?",
options:["8 years","10 years","12 years","15 years"],correctIndex:2,
explanation:"The course overview states the role covers children 'up to the age of 12 years' at the primary level.",
concept:{title:"Scope of the Job Role",definition:"The Class XI job role is specifically scoped to primary-years children, distinguishing it from secondary-level PE roles.",points:["Works in primary schools, apartments and clubs","Target age group: up to 12 years","Focus: basic sports skills and general fitness, not specialization"],memoryTrick:"'Primary Years' = up to 12.",sportsRelevance:"Knowing the age scope tells you which activities are appropriate — see the 'Structuring Physical Activity Sessions' diamond model."},
relatedIds:["PAT11-CD-008"],source:"CBSE Physical Activity Trainer — Class XI Textbook, About the Course",tags:["child-development","course-overview"]},

{id:"PAT11-CD-004",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Factors Influencing Physical Activity",subtopic:"Factors Affecting Fitness",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of the following is NOT listed in the textbook as a factor affecting an individual's physical fitness?",
options:["Age","Body composition","Climatic conditions","Handwriting"],correctIndex:3,
explanation:"The textbook lists seven factors affecting physical fitness: Age, Gender, Body composition, Nutrition, Climatic conditions, Lifestyle habits and Physical activity itself. Handwriting is not one of them.",
concept:{title:"Factors Affecting Physical Fitness",definition:"Physical fitness varies between individuals because of a combination of biological and lifestyle factors.",points:["Age & Gender — biological/physiological differences","Body composition — somatotype (Endomorph, Mesomorph, Ectomorph)","Nutrition, Climatic conditions, Lifestyle habits, Physical activity"],memoryTrick:"'A-G-B-N-C-L-P' — Age, Gender, Body, Nutrition, Climate, Lifestyle, Physical activity.",sportsRelevance:"A PE Assistant adapts session plans differently for different body types and lifestyles rather than using one plan for every child."},
relatedIds:["PAT11-CD-005"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.2",tags:["child-development","fitness-factors"]},

{id:"PAT11-CD-005",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Factors Influencing Physical Activity",subtopic:"Body Composition",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which somatotype is described in the textbook as having a 'lean and thin body frame', making it unrealistic to expect the same muscular strength as another type?",
options:["Endomorph","Mesomorph","Ectomorph","Isomorph"],correctIndex:2,
explanation:"The textbook explicitly describes the Ectomorph as a lean, thin body frame, contrasting it with the more muscular Mesomorph and heavier-set Endomorph.",
concept:{title:"The Three Somatotypes",definition:"Somatotyping classifies body shape/physique into three broad categories, each with different natural fitness advantages.",points:["Ectomorph — lean, thin frame","Mesomorph — naturally muscular frame","Endomorph — larger, rounder frame"],memoryTrick:"'Ecto = Extra thin.'",sportsRelevance:"Understanding somatotypes helps a PE Assistant set realistic, encouraging expectations rather than comparing children unfairly."},
relatedIds:["PAT11-CD-004"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.2",tags:["child-development","body-composition"]},

{id:"PAT11-CD-006",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Factors Influencing Physical Activity",subtopic:"Influence of Society",difficulty:"Moderate",type:"MCQ",year:2026,
question:"The textbook cites the rise of the IPL and BCCI's wealth as an example of which societal factor influencing sport?",
options:["Environment","Economy","Political stability","Technology"],correctIndex:1,
explanation:"The textbook discusses the Economy as a factor, explaining how BCCI's revenue enabled high-quality tournaments like the IPL, attracting top global talent.",
concept:{title:"Society's Influence on Sport",definition:"The textbook identifies four broad societal factors shaping which sports thrive in a region: Environment, Economy, Technology and Political conditions.",points:["Environment — e.g. water sports in Kerala, volleyball in Ladakh","Economy — infrastructure spend, media/advertising revenue","Technology — e.g. astro-turf's impact on Indian hockey","Political — e.g. Olympic boycotts, regional instability"],memoryTrick:"'E-E-T-P' — Environment, Economy, Technology, Political.",sportsRelevance:"Recognising these factors helps explain why certain sports are more accessible or popular in different communities."},
relatedIds:["PAT11-CD-007"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.2",tags:["child-development","society-and-sport"]},

{id:"PAT11-CD-007",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Factors Influencing Physical Activity",subtopic:"Influence of Society",difficulty:"Moderate",type:"MCQ",year:2026,
question:"The textbook attributes the decline of Indian hockey's dominance partly to the country's slow adoption of which factor?",
options:["Coaching methods","Technology (e.g. astro-turf)","Player salaries","Television coverage"],correctIndex:1,
explanation:"The textbook links India's slow adoption of astro-turf technology to the decline of its once-dominant hockey team, in contrast to Australia and Germany.",
concept:{title:"Technology and Sport",definition:"Advances in playing surfaces, equipment and training tools directly affect which nations lead in a given sport.",points:["Astro-turf changed the technical demands of field hockey","Countries that adopted it early (Australia, Germany) gained an edge","India's slower adoption coincided with its declining results"],memoryTrick:"'No turf, no team.'",sportsRelevance:"A PE Assistant should understand that access to modern equipment/facilities directly affects a school's sporting outcomes."},
relatedIds:["PAT11-CD-006"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.2",tags:["child-development","society-and-sport"]},

{id:"PAT11-CD-008",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Planning Physical Activities",subtopic:"Structuring Sessions",difficulty:"Moderate",type:"MCQ",year:2026,
question:"In the textbook's 'diamond' model for structuring physical activity by grade, what is the focus for Grades 9–12?",
options:["Building fundamental movement concepts","Exploring multiple games","Sports of choice (specialization)","Free play only"],correctIndex:2,
explanation:"The diamond model progresses from movement concepts (N–2) to fundamental/sports skills (3–5) to exploring multiple games (6–8) to sports of choice/specialization (9–12).",
concept:{title:"Structuring Physical Activity by Grade",definition:"A progressive model matching the type of physical activity to a child's developmental stage.",points:["Grade N–2 — movement concepts (action, balance, coordination)","Grade 3–5 — fundamental & sports skills","Grade 6–8 — exploring multiple sports","Grade 9–12 — specialization / sport of choice"],memoryTrick:"'Move → Build → Explore → Choose.'",sportsRelevance:"This model explains why the Class XI/XII job roles (Primary Years) intentionally avoid early specialization."},
relatedIds:["PAT11-CD-009"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.3",tags:["child-development","session-planning"]},

{id:"PAT11-CD-009",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Planning Physical Activities",subtopic:"Macro/Meso/Micro Planning",difficulty:"Moderate",type:"MCQ",year:2026,
question:"In the textbook's Macro–Meso–Micro planning model, 'Meso-planning' refers to a breakdown covering roughly what period?",
options:["A single day","A week or pair of weeks","An entire academic year","A single activity session"],correctIndex:1,
explanation:"Meso-planning is defined as a breakdown of each week (or pair of weeks) targeting one or two specific improvements.",
concept:{title:"Macro, Meso and Micro Planning",definition:"A three-level planning hierarchy that moves from a long-term goal down to daily execution.",points:["Macro — the big-picture, long-term goal","Meso — weekly (or fortnightly) breakdown of that goal","Micro — a single day or session's specific plan"],memoryTrick:"'Macro = Months, Meso = Weeks, Micro = Minutes (a session).'",sportsRelevance:"A PE Assistant uses this hierarchy to turn a broad skill goal (e.g. 'learn basic football') into an actual weekly lesson-plan table."},
relatedIds:["PAT11-CD-008"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.3",tags:["child-development","session-planning"]},

{id:"PAT11-CD-010",exam:["PAT-11"],subject:"PAT XI — Role of PE in Child Development",topic:"Planning Physical Activities",subtopic:"Yoga",difficulty:"Easy",type:"MCQ",year:2026,
question:"According to the textbook, how many steps make up the Surya Namaskar (Sun Salutation) sequence?",
options:["8 steps","10 steps","12 steps","14 steps"],correctIndex:2,
explanation:"The textbook lists exactly 12 steps of Surya Namaskar, from Pranamasana through to returning the hands to prayer position.",
concept:{title:"Surya Namaskar",definition:"A sequence of 12 postures performed as a 'worship to the sun', best practised in the morning.",points:["Step 1: Pranamasana (prayer position)","Step 6: Ashtanga Namaskara — 8 body parts touch the floor","Step 12: return to prayer position"],memoryTrick:"'12 steps, 12 hours in a sun cycle.'",sportsRelevance:"Yoga is included in the syllabus as part of a well-rounded physical activity plan for children, alongside sports skills."},
relatedIds:["PAT11-SF-005"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.3",tags:["child-development","yoga"]},

// =====================================================================
// CLASS XI — UNIT: PROPS AND EQUIPMENT
// =====================================================================
{id:"PAT11-PE-001",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Props vs Equipment",subtopic:"Definitions",difficulty:"Easy",type:"MCQ",year:2026,
question:"How does the textbook distinguish 'Props' from 'Equipment'?",
options:["Props are tools/learning aids used to mark spaces and build skills; Equipment is the material needed to actually play the sport","Props are expensive; Equipment is cheap","Props are for indoor use only; Equipment is for outdoor use only","There is no difference — the terms are interchangeable"],correctIndex:0,
explanation:"The textbook defines Props as tools/learning aids (to mark spaces, practice skills, improve fitness) while Equipment is the material associated with the sport needed to actually play it.",
concept:{title:"Props vs Equipment",definition:"Two related but distinct categories of training material used in physical education.",points:["Props — cones, hoops, agility ladders, bean bags (teaching aids)","Equipment — balls, bats, nets, goalposts (needed to play the sport)","Props also add variety, colour and age-appropriate challenge"],memoryTrick:"'Props help you PRACTISE; Equipment lets you PLAY.'",sportsRelevance:"Choosing the right mix of props and equipment keeps sessions engaging and safe for different age groups."},
relatedIds:["PAT11-PE-002"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2",tags:["props-equipment"]},

{id:"PAT11-PE-002",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Factors Affecting Selection",subtopic:"Selection Criteria",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these is NOT one of the six factors the textbook lists for selecting sports props and equipment?",
options:["Age appropriateness","Industry standard","Group size","Player's favourite colour"],correctIndex:3,
explanation:"The six factors are: Age appropriateness, Industry standard, Sports type, Infrastructure, Group size and Budget. Colour preference is not among them.",
concept:{title:"Factors Affecting Selection of Props & Equipment",definition:"A checklist to guide any purchase or usage decision for sports material.",points:["Age appropriateness & Industry standard (e.g. rubber tennis balls, wooden cricket bats)","Sports type & Infrastructure (indoor vs outdoor, permanent vs mobile)","Group size & Budget"],memoryTrick:"'A-I-S-I-G-B.'",sportsRelevance:"Getting this wrong (e.g. using adult-size equipment for young children) directly causes injuries or disengagement."},
relatedIds:["PAT11-PE-003"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.2",tags:["props-equipment"]},

{id:"PAT11-PE-003",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Factors Affecting Selection",subtopic:"Age Appropriateness",difficulty:"Moderate",type:"MCQ",year:2026,
question:"If age-inappropriate props (meant for an older group) are given to younger children, what does the textbook say this can lead to?",
options:["Injury","Better performance","Lower cost","Faster skill acquisition"],correctIndex:0,
explanation:"The textbook states that using higher-age-bracket props on a younger group can lead to injury, while lower-age-bracket props on an older group leads to lack of interest.",
concept:{title:"Consequences of Wrong Age-Fit",definition:"Age-appropriateness in equipment selection is a safety issue, not just an engagement issue.",points:["Props for a higher age bracket used on younger children → risk of injury","Props for a lower age bracket used on an older group → boredom/disengagement"],memoryTrick:"'Too big = danger. Too small = boring.'",sportsRelevance:"This is a direct safety responsibility of the Physical Education Assistant when planning sessions."},
relatedIds:["PAT11-PE-002"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.2",tags:["props-equipment","safety"]},

{id:"PAT11-PE-004",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Common Props",subtopic:"Prop Usage",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which prop, according to the textbook's equipment table, is used for 'teaching various levels of space awareness and coordination among team members'?",
options:["Saucer cone","Parachute","Agility ladder","Skipping rope"],correctIndex:1,
explanation:"The Parachute is listed specifically for teaching space awareness (high, mid, low) and coordination among team members.",
concept:{title:"Common Props and Their Uses",definition:"Each prop in the equipment list has a specific developmental purpose.",points:["Parachute — space awareness & team coordination","Agility ladder — jumping, hopping, twist & turn","Sit and Reach box — measuring back flexibility"],memoryTrick:"Picture a parachute needing the WHOLE team to move it together.",sportsRelevance:"Matching the right prop to the right skill is core to writing an effective session/lesson plan."},
relatedIds:["PAT11-PE-005"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.2",tags:["props-equipment"]},

{id:"PAT11-PE-005",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Ball Maintenance",subtopic:"Inflation Pressure",difficulty:"Hard",type:"MCQ",year:2026,
question:"As per the textbook's ball-maintenance chart, which range is the correct inflation pressure for a basketball?",
options:["5.5–16 PSI","7–9 PSI","5.8–6.5 PSI","10–20 PSI"],correctIndex:1,
explanation:"The textbook specifies: Football 5.5–16 PSI, Basketball 7–9 PSI, Volleyball 5.8–6.5 PSI.",
concept:{title:"Correct Ball Pressures",definition:"Balls must be inflated within their specified pressure range to avoid damaging the bladder or affecting play.",points:["Football — 5.5 to 16 PSI","Basketball — 7 to 9 PSI","Volleyball — 5.8 to 6.5 PSI"],memoryTrick:"'Football has the widest range; volleyball the narrowest and lowest.'",sportsRelevance:"Over-inflating with a machine can damage the ball — the textbook warns to inflate gradually by hand."},
relatedIds:["PAT11-PE-006"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.3",tags:["props-equipment","maintenance"]},

{id:"PAT11-PE-006",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Inspection & Maintenance",subtopic:"Inspection Frequency",difficulty:"Moderate",type:"MCQ",year:2026,
question:"'Low frequency' inspections of playfields and equipment, per the textbook, are typically performed how often?",
options:["Daily","Weekly","Quarterly or semi-annually","Only once a decade"],correctIndex:2,
explanation:"Low frequency inspections are in-depth investigations for wear and tear, typically performed quarterly or semi-annually. High frequency inspections are done daily or weekly.",
concept:{title:"Inspection Frequency",definition:"Playfields need both routine and periodic in-depth checks to stay safe.",points:["High frequency — daily/weekly, checks changing conditions (litter, loose surfacing)","Low frequency — quarterly/semi-annually, in-depth wear-and-tear checks"],memoryTrick:"'Low frequency = Long gap.'",sportsRelevance:"A PE Assistant is expected to know which checklist items belong to daily checks versus periodic deep inspections."},
relatedIds:["PAT11-PE-005"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.3",tags:["props-equipment","maintenance"]},

{id:"PAT11-PE-007",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Inspection & Maintenance",subtopic:"Cleaning Rules",difficulty:"Moderate",type:"MCQ",year:2026,
question:"According to the textbook's care instructions, what should NEVER be applied to leather props and equipment when cleaning them?",
options:["Water","A dry cloth","Sunlight-free storage","Regular condition checks"],correctIndex:0,
explanation:"The textbook explicitly instructs: 'Do not apply water on any leather props and equipment. Always use dry cloth to clean.'",
concept:{title:"Caring for Leather Equipment",definition:"Leather items (like leather cricket balls) require dry-cleaning methods to avoid damage.",points:["Never use water on leather props/equipment","Always use a dry cloth","Store away from direct sunlight and dampness (to prevent rust on metal parts)"],memoryTrick:"'Leather + water = damage.'",sportsRelevance:"Following correct maintenance extends the life of expensive sports equipment on a school's limited budget."},
relatedIds:["PAT11-PE-006"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.3",tags:["props-equipment","maintenance"]},

{id:"PAT11-PE-008",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Common Equipment",subtopic:"Equipment Usage",difficulty:"Easy",type:"MCQ",year:2026,
question:"In the textbook's equipment list, what is a 'Bib' used for?",
options:["Storage of props","To differentiate team members from opponents, like a jersey","Measuring distance","Inflating balls"],correctIndex:1,
explanation:"The textbook lists Bibs as used in team games as a jersey substitute to visually differentiate a team from its opponents.",
concept:{title:"Common Equipment Uses",definition:"Every listed item of equipment has a defined role in organising a session.",points:["Bib — differentiates teams","Duffle/Tote bag — storage of props","Foot pump — inflating balls"],memoryTrick:"Bib = 'Badge' for a team.",sportsRelevance:"Using bibs is a quick, low-cost way to run organised team games with large class sizes."},
relatedIds:["PAT11-PE-004"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.2",tags:["props-equipment"]},

{id:"PAT11-PE-009",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Playfield Maintenance",subtopic:"Surface Care",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of the following is listed as a regular maintenance task to keep the quality of a sports surface?",
options:["Removing leaves, stones and sharp objects from the pitch","Watering the pitch with salt water","Leaving the goal posts unchecked","Avoiding all cleaning to preserve the turf"],correctIndex:0,
explanation:"The textbook lists removing leaves/stones/sharp objects, sweeping cemented floors daily, and periodically checking goal posts and poles as regular maintenance tasks.",
concept:{title:"Maintaining Sports Surfaces",definition:"Routine surface maintenance prevents both injuries and long-term damage to the playfield.",points:["Remove debris from the pitch regularly","Sweep cemented floors daily","Periodically check goal posts, volleyball poles, basketball posts","Special maintenance (e.g. drainage repair) at least once a year"],memoryTrick:"'Clear it, sweep it, check it.'",sportsRelevance:"A well-maintained surface directly reduces the risk of trips, falls and equipment failure during play."},
relatedIds:["PAT11-PE-006"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.3",tags:["props-equipment","maintenance"]},

{id:"PAT11-PE-010",exam:["PAT-11"],subject:"PAT XI — Props and Equipment",topic:"Common Props",subtopic:"Measurement Equipment",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which piece of equipment from the textbook's list is used specifically 'to measure back flexibility'?",
options:["Weighing scale","Height chart","Sit and Reach box","Measuring tape"],correctIndex:2,
explanation:"The Sit and Reach box is listed with the usage 'to measure back flexibility', distinct from the weighing scale (weight), height chart (height) and measuring tape (distance).",
concept:{title:"Measurement Equipment",definition:"Fitness assessment relies on specific, purpose-built measuring tools.",points:["Weighing scale — weight","Height chart — height","Sit and Reach box — back flexibility","Measuring tape — distance"],memoryTrick:"'Sit, Reach, Stretch' → flexibility.",sportsRelevance:"These same tools reappear in Class XII's fitness-testing unit for quantitative assessment."},
relatedIds:["PAT12-AS-006"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 2.2",tags:["props-equipment","measurement"]},

// =====================================================================
// CLASS XI — UNIT: HYGIENE AND SAFETY
// =====================================================================
{id:"PAT11-HS-001",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Personal Hygiene",subtopic:"Definition",difficulty:"Easy",type:"MCQ",year:2026,
question:"How does the textbook define 'Hygiene'?",
options:["The practice of keeping yourself and your surroundings clean, especially to prevent the spread of disease","A type of sports equipment","A category of physical fitness test","A rule used only in swimming pools"],correctIndex:0,
explanation:"The textbook defines hygiene as the practice of keeping yourself and your surroundings clean, especially to prevent the spread of disease.",
concept:{title:"What is Hygiene?",definition:"Hygiene practices protect both the individual and the people around them from illness.",points:["Personal hygiene: bathing, washing hands, brushing, clean clothes","Protects you from poor health","Protects others around you too"],memoryTrick:"'Hygiene = Health Guard.'",sportsRelevance:"A PE Assistant models and enforces good hygiene habits as part of every session, not as a separate topic."},
relatedIds:["PAT11-HS-002"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3",tags:["hygiene-safety"]},

{id:"PAT11-HS-002",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Playground Hygiene",subtopic:"Waste Management",difficulty:"Easy",type:"MCQ",year:2026,
question:"The textbook asks students to segregate playground waste into which two categories?",
options:["Plastic and paper","Biodegradable and non-biodegradable","Wet and dry only","Recyclable and food waste"],correctIndex:1,
explanation:"Among the playground hygiene rules, the textbook lists 'Segregate waste into biodegradable and non-biodegradable categories.'",
concept:{title:"Playground Hygiene Rules",definition:"Simple daily habits that keep a shared play area clean and safe.",points:["Never litter — carry a bag for waste","Throw garbage only in a dustbin","Don't spit in public places","Segregate waste: biodegradable vs non-biodegradable"],memoryTrick:"'Bio vs Non-bio.'",sportsRelevance:"Teaching this habit to children builds long-term civic responsibility alongside sports skills."},
relatedIds:["PAT11-HS-001"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3.1",tags:["hygiene-safety"]},

{id:"PAT11-HS-003",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Safety While Playing",subtopic:"General Safety Rules",difficulty:"Easy",type:"MCQ",year:2026,
question:"Per the 'Safety while playing' guidelines, what should never be started without a proper warm-up?",
options:["A cool-down stretch","Vigorous physical activity","Filling out an attendance sheet","Watching a demonstration video"],correctIndex:1,
explanation:"The textbook states: 'Do not start a vigorous physical activity without a proper warm-up.'",
concept:{title:"Safety While Playing",definition:"A short set of rules to prevent avoidable injuries during any activity session.",points:["Always warm up before vigorous activity","Wear correct sports attire (shoes, clothes)","Never use sports equipment as weapons","Seek immediate help from a teacher/coach if injured"],memoryTrick:"'Warm up first, play safe after.'",sportsRelevance:"Enforcing warm-ups is one of the most basic, high-impact safety duties of a PE Assistant."},
relatedIds:["PAT11-HS-004"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3",tags:["hygiene-safety"]},

{id:"PAT11-HS-004",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Safety in the Swimming Pool",subtopic:"Pool Safety Rules",difficulty:"Moderate",type:"MCQ",year:2026,
question:"According to the textbook's swimming pool safety list, what should a child do if they are suffering from an infection, skin disease or open wound?",
options:["Swim only in the shallow end","Not go to the pool","Wear extra swimming gear and swim as normal","Ask a friend to supervise them"],correctIndex:1,
explanation:"The textbook states clearly: 'If you are suffering from any infections/skin disease/open wounds, do not go to the pool.'",
concept:{title:"Swimming Pool Safety",definition:"Pool-specific safety rules protect both the individual and other swimmers from injury and infection.",points:["Never dive in shallow water","Never enter without proper supervision, even if a good swimmer","Skip the pool if you have an infection, skin disease, or open wound","Never try to rescue a drowning person yourself — call for help"],memoryTrick:"'Sick? Skip the swim.'",sportsRelevance:"This rule protects the health of the whole group, not just the individual child."},
relatedIds:["PAT11-HS-003"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3",tags:["hygiene-safety"]},

{id:"PAT11-HS-005",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Safety in the Swimming Pool",subtopic:"Pool Safety Rules",difficulty:"Moderate",type:"MCQ",year:2026,
question:"If someone is drowning, what does the textbook instruct you to do?",
options:["Try to rescue them yourself immediately","Do not try to rescue them yourself — call for help","Imitate drowning to alert others","Ignore it if you are not a lifeguard"],correctIndex:1,
explanation:"The textbook specifically warns: 'Do not try to rescue a drowning person, call for help' and also 'Do not imitate drowning.'",
concept:{title:"Responding to a Drowning Emergency",definition:"Untrained rescue attempts can put the rescuer at risk too — calling trained help is the safer first response.",points:["Do not attempt a solo rescue if untrained","Call for help immediately","Never imitate drowning as a prank — it causes real panic"],memoryTrick:"'Call, don't fall in yourself.'",sportsRelevance:"This is the core reason pools must always have proper, supervised staffing during school activities."},
relatedIds:["PAT11-HS-004"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3",tags:["hygiene-safety","emergency"]},

{id:"PAT11-HS-006",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Playground Equipment Safety",subtopic:"Equipment Condition",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Per the equipment safety checklist, what condition should wooden playground equipment NOT be in?",
options:["Painted","Cracked or splintered","Recently installed","Age-appropriate"],correctIndex:1,
explanation:"The textbook checklist states 'wooden equipment should not be cracked or splintered' and 'metal equipment should not be rusted.'",
concept:{title:"Equipment Condition Checks",definition:"Regular visual inspection prevents equipment failure from causing injury.",points:["Wooden equipment — check for cracks/splinters","Metal equipment — check for rust","No broken equipment or props should remain in use","Report any damaged equipment immediately"],memoryTrick:"'Wood cracks, metal rusts — check both.'",sportsRelevance:"This overlaps directly with the Props & Equipment unit's inspection checklist."},
relatedIds:["PAT11-PE-006"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3.1",tags:["hygiene-safety"]},

{id:"PAT11-HS-007",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Personal Hygiene",subtopic:"General Rules",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of these is listed among the textbook's 'general hygiene and sanitation rules'?",
options:["Wash hands before and after meals with water and soap","Skip bathing on non-school days","Eat fruits and vegetables without washing them to save time","Reuse the same clothes for multiple days to save water"],correctIndex:0,
explanation:"The textbook lists washing hands before and after meals with soap and water as one of the core sanitation rules, along with daily bathing and not eating unwashed produce.",
concept:{title:"General Hygiene & Sanitation Rules",definition:"A basic personal-hygiene checklist recommended for every student.",points:["Bathe every day","Wash hands before/after meals","Wash hands, face and feet after playing a game","Don't eat unwashed fruits/vegetables"],memoryTrick:"'Before you eat, wash your hands — every time.'",sportsRelevance:"Post-game hand/face/feet washing is specifically called out because sports activity increases contact with dirt and sweat."},
relatedIds:["PAT11-HS-001"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3",tags:["hygiene-safety"]},

{id:"PAT11-HS-008",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Playground Hygiene",subtopic:"Sandpit Safety",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What does the textbook recommend doing to a playground sandpit when it is not in use?",
options:["Leave it uncovered for ventilation","Cover it to prevent contamination from animals","Fill it with water","Remove all the sand permanently"],correctIndex:1,
explanation:"The textbook advises covering sand pits when not in use to prevent contamination from animals, and checking for hazardous debris like sharp sticks or broken glass.",
concept:{title:"Sandpit Safety & Hygiene",definition:"Sandpits are a common playground feature but need active upkeep to remain safe and hygienic.",points:["Cover when not in use — prevents animal contamination","Check regularly for broken glass or sharp sticks","Ensure sand is free of bugs"],memoryTrick:"'Cover it, or animals will discover it.'",sportsRelevance:"This directly connects to the Class XII 'Health and Hygiene in Play Area' unit's play-area inspection checklist."},
relatedIds:["PAT12-HH-003"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3.1",tags:["hygiene-safety"]},

{id:"PAT11-HS-009",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Safety While Playing",subtopic:"General Safety Rules",difficulty:"Easy",type:"MCQ",year:2026,
question:"What does the textbook say a child should carry to the ground and use to 'stay hydrated'?",
options:["A first-aid kit","A water bottle","A spare pair of shoes","A stopwatch"],correctIndex:1,
explanation:"The safety-while-playing list instructs: 'Always carry your water bottle to the ground and stay hydrated.'",
concept:{title:"Staying Hydrated During Play",definition:"Hydration is treated as a basic, non-negotiable safety habit, not an optional extra.",points:["Carry a water bottle to every session","Stay alert to moving people/objects on the ground","Never push your body beyond its limit"],memoryTrick:"'No bottle, no ground time.'",sportsRelevance:"Dehydration risk connects directly to the Class XII Emergency Management unit's coverage of heatstroke."},
relatedIds:["PAT12-EM-002"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3",tags:["hygiene-safety"]},

{id:"PAT11-HS-010",exam:["PAT-11"],subject:"PAT XI — Hygiene and Safety",topic:"Safety While Playing",subtopic:"General Safety Rules",difficulty:"Easy",type:"MCQ",year:2026,
question:"According to the textbook, sports equipment should never be used as what?",
options:["A prop for a game","Weapons","A demonstration tool","A measuring device"],correctIndex:1,
explanation:"The safety-while-playing rules explicitly state: 'Do not use sports equipment as weapons.'",
concept:{title:"Proper Use of Sports Equipment",definition:"Equipment must always be used only for its intended sporting purpose.",points:["Never use equipment as weapons","Keep the playground free of sharp objects (nails, stones, glass, metal)","Never use damaged or worn-out equipment"],memoryTrick:"'A bat is for batting, not for hitting.'",sportsRelevance:"This rule is enforced strictly by PE staff to avoid deliberate or accidental injury during play."},
relatedIds:["PAT11-HS-003"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 3",tags:["hygiene-safety"]},

// =====================================================================
// CLASS XI — UNIT: SPORTS AND FITNESS
// =====================================================================
{id:"PAT11-SF-001",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Session Structure",subtopic:"Lesson Plan Format",difficulty:"Easy",type:"MCQ",year:2026,
question:"In the textbook's standard lesson-plan format (e.g. 'Ball Control – 1'), what comes immediately after the Warm-Up segment?",
options:["Cool-Down","Team Activity","Game Play","EduQuette"],correctIndex:1,
explanation:"Every sample lesson plan follows the order: EduQuette → Warm-Up → Team Activity → Game Play → Cool-Down.",
concept:{title:"The Standard Lesson Plan Format",definition:"A consistent five-part structure used across every sport-skill lesson in the textbook.",points:["EduQuette (2 min) — brief discussion/etiquette talk","Warm-Up (5 min)","Team Activity (10 min)","Game Play (15 min)","Cool-Down (3 min)"],memoryTrick:"'Educate, Warm, Team, Play, Cool.'",sportsRelevance:"Following this exact structure ensures every 35-minute session has a safe warm-up and cool-down built in."},
relatedIds:["PAT11-SF-002"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 4",tags:["sports-fitness","lesson-planning"]},

{id:"PAT11-SF-002",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Session Structure",subtopic:"Lesson Plan Timing",difficulty:"Easy",type:"MCQ",year:2026,
question:"Adding up the standard segment durations (EduQuette 2 + Warm-Up 5 + Team Activity 10 + Game Play 15 + Cool-Down 3), how long is a full sample lesson in the textbook?",
options:["25 minutes","30 minutes","35 minutes","45 minutes"],correctIndex:2,
explanation:"2 + 5 + 10 + 15 + 3 = 35 minutes, matching every sample lesson plan (Football, Basketball, Volleyball, Cricket) in the textbook.",
concept:{title:"Lesson Plan Duration",definition:"The textbook's sample sessions are consistently timed at 35 minutes total.",points:["Consistent across all sample sports (football, basketball, volleyball, cricket)","Game Play gets the largest time share (15 of 35 minutes)","Cool-down is always kept short but non-negotiable (3 minutes)"],memoryTrick:"'35 minutes, every time.'",sportsRelevance:"This fits within a typical school period, making the format easy to slot into a timetable."},
relatedIds:["PAT11-SF-001"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 4",tags:["sports-fitness","lesson-planning"]},

{id:"PAT11-SF-003",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Athletics",subtopic:"Sprint Technique",difficulty:"Moderate",type:"MCQ",year:2026,
question:"In the sprint-start sequence taught in the textbook, what is the correct order of commands?",
options:["Set → On your marks → Go","On your marks → Set → Go/Clap/Fire","Go → Set → On your marks","On your marks → Go → Set"],correctIndex:1,
explanation:"The textbook's sprint-start coaching sequence is: 'On your marks' → 'Set' → 'Go/Clap/Fire'.",
concept:{title:"The Sprint Start Sequence",definition:"A fixed three-command sequence used to start a fair, safe sprint race.",points:["'On your marks' — assume the crouch position","'Set' — raise the seat, weight equally on arms and legs","'Go/Clap/Fire' — vigorously extend the front leg and drive forward"],memoryTrick:"'Marks, Set, Go' — the universal race start.",sportsRelevance:"Teaching this exact sequence prepares children for real athletics meets and PE assessments."},
relatedIds:["PAT11-SF-004"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 4",tags:["sports-fitness","athletics"]},

{id:"PAT11-SF-004",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Athletics",subtopic:"Sprint Technique",difficulty:"Moderate",type:"MCQ",year:2026,
question:"At the 'Set' position of a sprint start, how should the athlete's body weight be distributed, per the textbook?",
options:["Entirely on the arms","Entirely on the legs","Equally supported by arms and legs","Entirely on the front foot"],correctIndex:2,
explanation:"The textbook states that at 'Set', the body weight is equally supported by arms and legs, comparing the position to 'a coiled spring'.",
concept:{title:"The 'Set' Position",definition:"A balanced, tensed posture that allows an explosive start on the 'Go' command.",points:["Seat raised above the shoulders","Weight equally on arms and legs — 'like a coiled spring'","Back and head form a straight line, eyes looking at the ground"],memoryTrick:"'Coiled spring = ready to release.'",sportsRelevance:"Correct 'Set' posture prevents false starts and improves reaction time off the blocks."},
relatedIds:["PAT11-SF-003"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 4",tags:["sports-fitness","athletics"]},

{id:"PAT11-SF-005",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Yoga",subtopic:"Asanas",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which asana does the textbook say should be performed at the very end, after completion of all yogic exercises?",
options:["Vrikshasana","Bhujangasana","Shavasana","Trikonasana"],correctIndex:2,
explanation:"The textbook specifies Shavasana ('corpse pose') is performed after all yogic exercises are complete, lying on the back with eyes closed for 2–3 minutes.",
concept:{title:"Shavasana — The Closing Pose",definition:"A relaxation posture that allows the body to absorb the benefits of a yoga session.",points:["Performed after completing all other asanas","Lie on the back, arms slightly apart, palms up","Stay in position for 2–3 minutes with natural breathing"],memoryTrick:"'Sha-vasana' sounds like 'shhh' — total stillness.",sportsRelevance:"Ending every yoga session with Shavasana mirrors the cool-down principle used in sports lesson plans."},
relatedIds:["PAT11-CD-010"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.3",tags:["sports-fitness","yoga"]},

{id:"PAT11-SF-006",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Yoga",subtopic:"Surya Namaskar",difficulty:"Hard",type:"MCQ",year:2026,
question:"In Surya Namaskar's Step 6 ('Ashtanga Namaskara'), how many body parts touch the floor?",
options:["Four","Six","Eight","Ten"],correctIndex:2,
explanation:"The textbook explains that in Ashtanga Namaskara, eight body parts — feet, knees, palms, chest and forehead — touch the floor, hence it is also called 'Sastanga Namaskara' (eight-limbed salutation).",
concept:{title:"Ashtanga Namaskara",definition:"A specific pose within the Surya Namaskar sequence named for the eight points of body contact with the ground.",points:["'Ashta' = eight in Sanskrit","Feet, knees, palms, chest, forehead touch the floor","Buttocks stay raised in this position"],memoryTrick:"'Ashta = 8.'",sportsRelevance:"Correct form here avoids strain on the lower back and shoulders during the pose."},
relatedIds:["PAT11-SF-005"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.3",tags:["sports-fitness","yoga"]},

{id:"PAT11-SF-007",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Session Planning",subtopic:"Timing Guidance",difficulty:"Easy",type:"MCQ",year:2026,
question:"The textbook recommends that on-ground physical activities be performed at what point relative to a meal?",
options:["Immediately after eating","2 hours after having a meal","On a completely empty stomach only","It doesn't matter"],correctIndex:1,
explanation:"The textbook's activity instructions specify: 'Best Time to perform these activities: 2 hours after having a meal — it will provide sufficient energy to the body for these kinds of activities.'",
concept:{title:"Timing Physical Activity Around Meals",definition:"Timing activity correctly around meals balances energy availability with digestive comfort.",points:["2 hours after a meal is the recommended gap for ground activities","This allows enough energy without digestive discomfort","Yoga specifically is best practised early morning"],memoryTrick:"'Eat, wait 2 hours, then play.'",sportsRelevance:"A PE Assistant scheduling sessions after lunch periods should build in this gap."},
relatedIds:["PAT11-SF-001"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.3",tags:["sports-fitness"]},

{id:"PAT11-SF-008",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Game Modifications",subtopic:"Throwball",difficulty:"Moderate",type:"MCQ",year:2026,
question:"When teaching Volleyball basics to young children, the textbook modifies the game into 'Throwball' by allowing what?",
options:["Two bounces before returning the ball","One drop before playing the ball","Unlimited touches per side","Only underarm serves"],correctIndex:1,
explanation:"The textbook's Volleyball Basics sessions modify the rules to a 'Throwball' format, allowing one drop, to make the game accessible for beginners.",
concept:{title:"Modifying Games for Beginners",definition:"Simplifying official rules helps young or beginner players stay engaged while learning core skills.",points:["Throwball = Volleyball with one drop allowed","Reduces point targets so all teams get a turn to play","Builds toward the full-rules version over time"],memoryTrick:"'One drop, still counts.'",sportsRelevance:"Modifying games for age/skill level is a core coaching competency for the Physical Education Assistant role."},
relatedIds:["PAT11-SF-001"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 4",tags:["sports-fitness"]},

{id:"PAT11-SF-009",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Basketball Skills",subtopic:"Ball Handling Drills",difficulty:"Moderate",type:"MCQ",year:2026,
question:"In the textbook's basketball warm-up drills, exercises named 'Crab Walk' and 'Make Figure-8' are primarily designed to build which skill?",
options:["Shooting accuracy","Ball handling / dribbling control around the body","Rebounding technique","Defensive footwork only"],correctIndex:1,
explanation:"Both drills are listed under 'Group C and D' ball-handling warm-ups, focused on moving the ball skilfully around the body and between the legs.",
concept:{title:"Ball-Handling Warm-Up Drills",definition:"Basic ball-control drills build the foundation needed before introducing game play.",points:["Dribble around the body — alternating hands behind the back","Figure-8 — pass the ball around each leg in a figure-eight pattern","Crab Walk — pass the ball hand-to-hand under each leg while stepping"],memoryTrick:"'Crab and Figure-8 = control, not speed.'",sportsRelevance:"These drills come before any team activity or game play in the lesson-plan structure."},
relatedIds:["PAT11-SF-001"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 4",tags:["sports-fitness"]},

{id:"PAT11-SF-010",exam:["PAT-11"],subject:"PAT XI — Sports and Fitness",topic:"Child Development",subtopic:"Avoiding Early Specialization",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Per the textbook, why should children aged 8–11 years NOT be encouraged to specialize in a single sport, even if they show talent in it?",
options:["Specialization is too expensive for schools","Their bodies are still developing and need practice across all skills for holistic development","Rules only allow specialization after age 15","Single-sport training is banned by CBSE"],correctIndex:1,
explanation:"The textbook states that at this age the body is still developing, so all skills need to be practised for holistic development, and children should be encouraged to try different sports rather than specialize.",
concept:{title:"Why Avoid Early Specialization",definition:"The textbook's core coaching philosophy for the primary years age group.",points:["Body is still developing at 8–11 years","Practising varied skills supports holistic (all-round) development","Specialization is appropriate later — see the Grade 9–12 stage of the diamond model"],memoryTrick:"'Young body, wide skills — not one sport yet.'",sportsRelevance:"This principle underpins the entire Class XI 'Primary Years' philosophy of the job role."},
relatedIds:["PAT11-CD-008"],source:"CBSE Physical Activity Trainer — Class XI Textbook, Unit 1.3",tags:["sports-fitness","child-development"]},

// =====================================================================
// CLASS XI — PRACTICE QUESTIONS (EXAM PATTERN) — no official Class XI SQP exists
// =====================================================================
{id:"PAT11-PYQ-001",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Employability Skills",subtopic:"Communication",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of the following is an example of non-verbal communication?",
options:["Sending a text message","Maintaining eye contact","Writing an email","Making a phone call"],correctIndex:1,
explanation:"Maintaining eye contact is a form of non-verbal communication — it conveys attention and confidence without using words.",
concept:{title:"Verbal vs Non-Verbal Communication",definition:"Employability Skills (a common part of every CBSE skill subject) distinguishes spoken/written communication from body-language cues.",points:["Verbal — speaking, writing, emailing","Non-verbal — eye contact, posture, gestures, tone"],memoryTrick:"'No words = non-verbal.'",sportsRelevance:"A good PE Assistant reads children's non-verbal cues (hesitation, discomfort) to adjust a session in real time."},
relatedIds:["PAT12-OV-006"],source:"Modelled on the CBSE Employability Skills curriculum (common to all skill subjects)",tags:["practice","employability"]},

{id:"PAT11-PYQ-002",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Employability Skills",subtopic:"Self-Management",difficulty:"Easy",type:"MCQ",year:2026,
question:"A student exercises daily purely because they enjoy how it makes them feel, not for any reward. This is an example of:",
options:["Extrinsic motivation","Intrinsic motivation","Peer pressure","Time management"],correctIndex:1,
explanation:"Intrinsic motivation comes from genuine personal enjoyment or interest, as opposed to extrinsic motivation, which is driven by external rewards or recognition.",
concept:{title:"Intrinsic vs Extrinsic Motivation",definition:"Understanding the two motivation types helps a PE Assistant encourage children in the right way.",points:["Intrinsic — done for personal enjoyment/interest","Extrinsic — done for a reward, grade or praise"],memoryTrick:"'Intrinsic = Inside; Extrinsic = External reward.'",sportsRelevance:"Building intrinsic motivation in children creates lifelong fitness habits, not just short-term compliance."},
relatedIds:["PAT12-OV-007"],source:"Modelled on the CBSE Employability Skills curriculum (common to all skill subjects)",tags:["practice","employability"]},

{id:"PAT11-PYQ-003",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Child Development",subtopic:"Health Triangle",difficulty:"Easy",type:"MCQ",year:2026,
question:"A child who eats well, exercises regularly, sleeps enough, has healthy friendships and manages stress well is demonstrating balance across which model?",
options:["The Fitness Pyramid","The Health Triangle","The Skill Diamond","The Assessment Rubric"],correctIndex:1,
explanation:"This scenario reflects balance across all three sides of the Health Triangle: Physical (eating, exercise, sleep), Social (friendships) and Mental (stress management).",
concept:{title:"Applying the Health Triangle",definition:"Real-world scenarios are used in exams to test whether students can identify the Health Triangle in practice, not just recite its definition.",points:["Physical — nutrition, exercise, rest","Mental — stress management, positive outlook","Social — friendships and relationships"],memoryTrick:"'Body-Mind-Friends, all in balance.'",sportsRelevance:"Exam questions often frame concepts as short scenarios — practise spotting the underlying concept."},
relatedIds:["PAT11-CD-001"],source:"Modelled on the CBSE Physical Activity Trainer exam pattern",tags:["practice","child-development"]},

{id:"PAT11-PYQ-004",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Props and Equipment",subtopic:"Selection Factors",difficulty:"Moderate",type:"MCQ",year:2026,
question:"A school with only 15 children in a class decides to buy smaller, lighter goal posts than a school with 40 children per class. Which factor primarily explains this decision?",
options:["Budget only","Group size","Industry standard","Climatic conditions"],correctIndex:1,
explanation:"Group size directly affects equipment selection — smaller groups can use smaller, more customizable equipment (like mobile/mini goal posts) without needing to split into many sub-groups.",
concept:{title:"Group Size and Equipment Choice",definition:"The number of learners affects both the size and quantity of equipment needed for a session.",points:["Large groups need more (or larger) equipment, or division into smaller groups","Small groups can use compact, customized equipment"],memoryTrick:"'More kids, more/bigger kit.'",sportsRelevance:"This is a practical planning decision a PE Assistant makes before every term."},
relatedIds:["PAT11-PE-002"],source:"Modelled on the CBSE Physical Activity Trainer exam pattern",tags:["practice","props-equipment"]},

{id:"PAT11-PYQ-005",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Hygiene and Safety",subtopic:"Applying Pool Rules",difficulty:"Moderate",type:"MCQ",year:2026,
question:"A child wants to enter the swimming pool wearing inflatable arm floats even though they claim to be a confident swimmer, and no lifeguard is present. What should happen?",
options:["They should be allowed to swim since floats make it safe","They should not enter without proper supervision, regardless of floats or swimming ability","They should swim only in the deep end","They should remove the floats and swim without them"],correctIndex:1,
explanation:"The textbook rule is explicit: never enter a pool without proper supervision, 'even if you have inflated teaching aids (floats) or are a good swimmer.'",
concept:{title:"Supervision Overrides Confidence or Aids",definition:"Pool safety rules apply uniformly regardless of a child's stated skill level or use of flotation aids.",points:["Supervision is mandatory, always","Floats and swimming skill do not replace supervision"],memoryTrick:"'No lifeguard, no swim — no exceptions.'",sportsRelevance:"This scenario style (applying a rule to a specific situation) is common in the real Class XII SQP."},
relatedIds:["PAT11-HS-004"],source:"Modelled on the CBSE Physical Activity Trainer exam pattern",tags:["practice","hygiene-safety"]},

{id:"PAT11-PYQ-006",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Sports and Fitness",subtopic:"Session Timing",difficulty:"Moderate",type:"MCQ",year:2026,
question:"A PE Assistant has a 35-minute period and wants to follow the standard lesson-plan format. How many minutes should be allocated to 'Game Play'?",
options:["5 minutes","10 minutes","15 minutes","20 minutes"],correctIndex:2,
explanation:"In the standard 35-minute format (EduQuette 2 + Warm-Up 5 + Team Activity 10 + Game Play 15 + Cool-Down 3), Game Play always receives the largest share: 15 minutes.",
concept:{title:"Time Allocation in a Lesson Plan",definition:"Applying the standard format to a real scheduling scenario.",points:["EduQuette — 2 min","Warm-Up — 5 min","Team Activity — 10 min","Game Play — 15 min","Cool-Down — 3 min"],memoryTrick:"'Game Play always gets the biggest slice.'",sportsRelevance:"Being able to reconstruct this breakdown from memory is a common exam-style application question."},
relatedIds:["PAT11-SF-002"],source:"Modelled on the CBSE Physical Activity Trainer exam pattern",tags:["practice","sports-fitness"]},

{id:"PAT11-PYQ-007",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Employability Skills",subtopic:"Green Skills",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of these is the most responsible way to dispose of old, broken sports equipment containing electronic parts (e.g. a digital stopwatch)?",
options:["Throw it in the regular household dustbin","Recycle it through an authorized e-waste program","Burn it to dispose of it quickly","Bury it in the school garden"],correctIndex:1,
explanation:"Recycling electronic waste through an authorized program prevents environmental contamination — a core 'Green Skills' concept in the employability curriculum.",
concept:{title:"Responsible E-Waste Disposal",definition:"Green Skills is one of the five common employability modules in every CBSE skill subject.",points:["E-waste needs authorized recycling, not regular trash","Burning or burying releases harmful substances into soil/air"],memoryTrick:"'E-waste needs a special place.'",sportsRelevance:"A PE department accumulates electronic gear (stopwatches, scales) over time that eventually needs proper disposal."},
relatedIds:["PAT12-OV-005"],source:"Modelled on the CBSE Employability Skills curriculum (common to all skill subjects)",tags:["practice","employability"]},

{id:"PAT11-PYQ-008",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Props and Equipment",subtopic:"Maintenance",difficulty:"Moderate",type:"MCQ",year:2026,
question:"After a football session, a PE Assistant notices the football has lost some air. What is the correct next step per the textbook's ball-care instructions?",
options:["Leave it deflated until the next session","Deflate it further to prevent any expansion","Re-inflate it to the correct pressure and store it in a well-ventilated place away from sunlight","Store it in a hot, closed cupboard to keep it warm"],correctIndex:2,
explanation:"The textbook instructs inflating balls to correct pressure and storing them in a well-ventilated place, out of direct sunlight, to prevent expansion, deformity or damage.",
concept:{title:"Ball Storage Best Practice",definition:"Proper storage extends equipment life and keeps balls ready for the next session.",points:["Inflate to correct pressure before storing","Store in a well-ventilated place","Keep out of direct sunlight and damp/hot places"],memoryTrick:"'Right pressure, cool and dry.'",sportsRelevance:"This is a routine end-of-session task expected of anyone managing school sports equipment."},
relatedIds:["PAT11-PE-005"],source:"Modelled on the CBSE Physical Activity Trainer exam pattern",tags:["practice","props-equipment"]},

{id:"PAT11-PYQ-009",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Child Development",subtopic:"Session Design",difficulty:"Hard",type:"MCQ",year:2026,
question:"A PE Assistant is designing a session for Grade 7 students. According to the textbook's diamond model, what should the primary focus of this session be?",
options:["Basic movement concepts like action and balance","Building fundamental sports skills for the first time","Exploring multiple different games","Specializing in one competitive sport"],correctIndex:2,
explanation:"Per the diamond model, Grades 6–8 are in the 'Exploring multiple games' stage — building on fundamentals learned in Grades 3–5, before specialization begins at Grades 9–12.",
concept:{title:"Applying the Diamond Model",definition:"Matching a grade level to its correct stage in the progression model.",points:["Grade N–2 — movement concepts","Grade 3–5 — fundamental skills","Grade 6–8 — exploring multiple games","Grade 9–12 — specialization"],memoryTrick:"'Grade 7 sits in the exploring stage, not yet specializing.'",sportsRelevance:"This kind of 'which grade, which stage' question tests real understanding, not memorization."},
relatedIds:["PAT11-CD-008"],source:"Modelled on the CBSE Physical Activity Trainer exam pattern",tags:["practice","child-development"]},

{id:"PAT11-PYQ-010",exam:["PAT-11"],subject:"PAT XI — Practice Questions (Exam Pattern)",topic:"Hygiene and Safety",subtopic:"Equipment Safety",difficulty:"Moderate",type:"MCQ",year:2026,
question:"During a routine equipment check, a PE Assistant finds a basketball post with a visibly rusted, loose bolt. What is the correct immediate action?",
options:["Continue using it since it still stands","Designate it off-limits, report it, and follow up until it is repaired","Tighten the bolt yourself using any available tool and continue the session","Ignore it since rust does not affect safety"],correctIndex:1,
explanation:"The textbook instructs that any equipment that seems broken, loose or in need of maintenance should be designated off-limits immediately, reported to the appropriate authorities, and followed up until repaired.",
concept:{title:"Responding to Unsafe Equipment",definition:"A clear, three-step protocol for handling damaged or hazardous equipment.",points:["Designate the item off-limits immediately","Report the problem to the appropriate authority","Follow up until the repair is completed"],memoryTrick:"'Stop it, Report it, Track it.'",sportsRelevance:"This protocol appears almost identically in both the Class XI Hygiene & Safety unit and the Class XII Health & Hygiene in Play Area unit."},
relatedIds:["PAT12-HH-002"],source:"Modelled on the CBSE Physical Activity Trainer exam pattern",tags:["practice","hygiene-safety"]},

// =====================================================================
// CLASS XII — UNIT: OVERVIEW OF PE & SPORTS SECTOR
// (grounded in the real CBSE Class XII SQP, subject code 845)
// =====================================================================
{id:"PAT12-OV-001",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Career Paths",subtopic:"Sports Sector Careers",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of the following is NOT a recognized career path within the Physical Education and Sports sector?",
options:["Sports Psychology","Sports Nutritionist","Engineering","Fitness Sector roles"],correctIndex:2,
explanation:"Engineering is unrelated to the sports sector career map, whereas Sports Psychology, Sports Nutrition and the Fitness Sector are all recognized specializations within it.",
concept:{title:"Careers in the Sports Sector",definition:"The sports and physical education industry supports many specialized, non-coaching careers.",points:["Sports Medicine — diagnosis/treatment of sports injuries","Sports Psychology — mental performance and wellbeing","Sports Nutritionist — diet planning for athletes","Sports Journalism, Equipment Management, Fitness Sector roles"],memoryTrick:"'Sport touches medicine, mind, food, media and gear.'",sportsRelevance:"A Class XII graduate of this course can see a clear map of where a PE career can lead beyond just teaching."},
relatedIds:["PAT12-OV-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q3.1",tags:["overview","careers"]},

{id:"PAT12-OV-002",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Career Paths",subtopic:"Sports Medicine",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which career path is primarily responsible for the diagnosis and treatment of sports injuries?",
options:["Sports Journalism","Sports Psychology","Sports Medicine","Equipment Management"],correctIndex:2,
explanation:"Sports Medicine professionals specialize in diagnosing and treating injuries that occur during sports and physical activity.",
concept:{title:"Sports Medicine as a Career",definition:"A specialized medical field focused specifically on injuries and conditions related to physical activity.",points:["Diagnoses and treats sports injuries","Works closely with coaches and physiotherapists","Distinct from general sports coaching roles"],memoryTrick:"'Medicine = treats the injury.'",sportsRelevance:"A PE Assistant/Facilitator often coordinates with sports medicine professionals when a child is injured."},
relatedIds:["PAT12-OV-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q5.2",tags:["overview","careers"]},

{id:"PAT12-OV-003",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Games, Sports & Recreation",subtopic:"Definitions",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What is the key distinguishing feature that separates a 'Sport' from a general 'Game'?",
options:["The level of physical exertion required","Whether it involves a team","The presence of official rules and regulations","Whether it is played outdoors"],correctIndex:2,
explanation:"The official curriculum distinguishes Sport from Game primarily by the presence of official rules and regulations governing how it is played and officiated.",
concept:{title:"Games vs Sports vs Recreation",definition:"Three related but distinct categories of physical activity.",points:["Game — a structured but informal form of play","Sport — governed by official rules and regulations, often competitive","Recreation — activity done for leisure/enjoyment (e.g. hiking, gardening)"],memoryTrick:"'Sport = rules + regulation.'",sportsRelevance:"This distinction matters for how each activity is officiated, scored and organized at a school level."},
relatedIds:["PAT12-OV-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q4.2",tags:["overview","terminology"]},

{id:"PAT12-OV-004",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Games, Sports & Recreation",subtopic:"Recreation",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Activities like hiking and gardening are best categorized under which term in the sports sector framework?",
options:["Physical Activity","Games","Sports","Recreation"],correctIndex:3,
explanation:"Hiking and gardening are classified as Recreation — activities done for leisure and enjoyment, distinct from structured Games or rule-bound Sports.",
concept:{title:"Recreation as a Category",definition:"Recreation covers leisure-based physical activities that aren't necessarily competitive or rule-governed.",points:["Recreation — leisure activities like hiking, gardening","Physical Activity — any bodily movement using energy (broadest category)","Games and Sports are more structured subsets"],memoryTrick:"'Recreation = Re-creating yourself through leisure.'",sportsRelevance:"Understanding this hierarchy helps categorize the huge variety of activities a Facilitator might introduce to children."},
relatedIds:["PAT12-OV-003"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q4.3",tags:["overview","terminology"]},

{id:"PAT12-OV-005",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Employability Skills",subtopic:"Green Skills",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is the responsible way to dispose of old electronic equipment (e-waste) used in a sports facility?",
options:["Donate it to anyone who wants it, regardless of condition","Sell it online without checking its safety","Recycle it via an authorized recycling program","Bury it in the backyard"],correctIndex:2,
explanation:"Recycling e-waste through an authorized program is the environmentally responsible approach, preventing hazardous materials from contaminating soil or water.",
concept:{title:"E-Waste Disposal",definition:"Part of the Green Skills employability module common across CBSE skill subjects.",points:["Use authorized e-waste recycling programs","Avoid burying or informally discarding electronics"],memoryTrick:"'Authorized recycling, always.'",sportsRelevance:"Sports facilities accumulate electronic gear (timers, scales, scoreboards) that eventually need safe disposal."},
relatedIds:["PAT11-PYQ-007"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q1.6",tags:["overview","employability"]},

{id:"PAT12-OV-006",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Employability Skills",subtopic:"Communication",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of the following best exemplifies non-verbal communication?",
options:["Sending a text message","Speaking loudly","Maintaining eye contact","Writing an email"],correctIndex:2,
explanation:"Maintaining eye contact is a classic example of non-verbal communication, conveying attentiveness and confidence without spoken or written words.",
concept:{title:"Non-Verbal Communication",definition:"Communication that happens through means other than words — body language, posture, gestures and eye contact.",points:["Eye contact conveys confidence and attentiveness","Posture and gestures are also non-verbal signals"],memoryTrick:"'No words spoken = non-verbal.'",sportsRelevance:"A Facilitator relies heavily on non-verbal cues when working with very young children who may not verbalize discomfort."},
relatedIds:["PAT11-PYQ-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q1.1",tags:["overview","employability"]},

{id:"PAT12-OV-007",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Employability Skills",subtopic:"Self-Management",difficulty:"Easy",type:"MCQ",year:2026,
question:"A student exercises purely for the health benefits, not for a reward. This best illustrates:",
options:["Extrinsic motivation","Enjoying the subject genuinely (intrinsic motivation)","Peer pressure","Poor time management"],correctIndex:1,
explanation:"Genuinely exercising for personal health benefit, rather than for an external reward, reflects intrinsic motivation.",
concept:{title:"Motivation Types",definition:"Recognizing motivation types helps design better engagement strategies for students.",points:["Intrinsic — internal enjoyment or value","Extrinsic — external reward, praise or recognition"],memoryTrick:"'Health benefit = internal reward = intrinsic.'",sportsRelevance:"Facilitators aim to nurture intrinsic motivation so fitness habits continue beyond school years."},
relatedIds:["PAT11-PYQ-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q1.2",tags:["overview","employability"]},

{id:"PAT12-OV-008",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Employability Skills",subtopic:"Leadership",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of the following is considered a key leadership trait?",
options:["Shyness","Aggressiveness","Empathy","Introversion"],correctIndex:2,
explanation:"Empathy — the ability to understand and share the feelings of others — is identified as a key leadership trait in the employability skills curriculum.",
concept:{title:"Leadership Traits",definition:"Core qualities that make someone effective at guiding and motivating a team or group.",points:["Empathy — understanding others' feelings and perspectives","Contrasts with traits like aggressiveness or shyness, which are not leadership strengths here"],memoryTrick:"'Empathy = Every-body's feelings matter.'",sportsRelevance:"A Facilitator leading a group of children benefits directly from empathetic leadership."},
relatedIds:["PAT12-OV-006"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q1.3",tags:["overview","employability"]},

{id:"PAT12-OV-009",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Career Paths",subtopic:"PE Assistant Careers",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Career opportunities for a Physical Education Assistant include which combination of roles?",
options:["Teaching only","Teaching, Coaching and Equipment Management","Teaching and Journalism only","Sports Medicine and Journalism only"],correctIndex:1,
explanation:"The official SQP identifies Teaching, Coaching and Equipment Management as realistic career pathways stemming from the PE Assistant role.",
concept:{title:"Career Progression from PE Assistant",definition:"The Class XI/XII qualification opens multiple related career pathways, not just classroom teaching.",points:["Teaching — classroom/PE instruction","Coaching — sport-specific skill development","Equipment Management — overseeing sports facilities and gear"],memoryTrick:"'Teach, Coach, Manage.'",sportsRelevance:"Knowing this career map helps students see the qualification's real-world value beyond the exam."},
relatedIds:["PAT12-OV-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q2.1",tags:["overview","careers"]},

{id:"PAT12-OV-010",exam:["PAT-12"],subject:"PAT XII — Overview of PE & Sports Sector",topic:"Physical Activity",subtopic:"Definitions",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of these is the clearest example of 'physical activity' as defined in the syllabus?",
options:["Watching a soccer match on TV","Playing chess","Running a marathon","Reading a sports magazine"],correctIndex:2,
explanation:"Physical activity is any bodily movement that uses energy — running a marathon clearly qualifies, unlike watching sport, playing chess, or reading about sport.",
concept:{title:"What Counts as Physical Activity",definition:"Physical activity is defined broadly as any energy-using bodily movement, distinct from passive or purely mental activities.",points:["Physical activity — uses energy through bodily movement","Watching or reading about sport does not count, however sport-related it feels"],memoryTrick:"'If your body isn't moving and burning energy, it isn't physical activity.'",sportsRelevance:"This basic distinction underlies how PE curricula define and measure 'active minutes' for children."},
relatedIds:["PAT12-OV-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q2.2",tags:["overview","terminology"]},

// =====================================================================
// CLASS XII — UNIT: ASSESSMENT OF STUDENTS
// =====================================================================
{id:"PAT12-AS-001",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Meaning of Assessment",subtopic:"Purpose",difficulty:"Easy",type:"MCQ",year:2026,
question:"According to the textbook, assessment should answer which two core questions?",
options:["'Who taught it?' and 'When was it taught?'","'What was learnt?' and 'How well was it learnt?'","'Is it graded?' and 'Is it optional?'","'Who is the best student?' and 'Who is the worst?'"],correctIndex:1,
explanation:"The textbook states assessment should answer: 'What was learnt?' and 'How well was it learnt?' — it is about understanding learning, not ranking students.",
concept:{title:"The Purpose of Assessment",definition:"Assessment exists to measure and improve learning, not simply to assign grades or rank students.",points:["Answers 'what' was learnt and 'how well'","Is an ongoing process, not a one-off event","Should never be designed without a clear teaching goal behind it"],memoryTrick:"'What + How well = Assessment.'",sportsRelevance:"This mindset shift — from grading to understanding learning — is central to the Facilitator's assessment role."},
relatedIds:["PAT12-AS-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q3.3 & Textbook Unit 1.1",tags:["assessment"]},

{id:"PAT12-AS-002",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Types of Assessment",subtopic:"Teacher Observation",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which type of assessment is described in the textbook as 'the most common form of assessment utilised in physical education classes'?",
options:["Peer observation","Self-assessment","Teacher observation","Homework"],correctIndex:2,
explanation:"The textbook explicitly states teacher observation is the most common form of assessment used in PE classes, well-suited for assessing psychomotor performance.",
concept:{title:"Types of Assessment in PE",definition:"Multiple assessment methods are used together to build a complete picture of a student's progress.",points:["Teacher observation — most common, assesses psychomotor skill","Peer observation — students observe and give feedback to each other","Self-assessment — students evaluate their own performance","Homework — practice or written tasks done outside class"],memoryTrick:"'Teacher watches most; peers and self also help.'",sportsRelevance:"A Facilitator uses checklists (like the running skill checklist) to structure teacher observation objectively."},
relatedIds:["PAT12-AS-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q3.3",tags:["assessment"]},

{id:"PAT12-AS-003",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Assessment Tools",subtopic:"Rubrics",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What is the primary purpose of a rubric in skill assessment?",
options:["To measure how many answers were correct on a written test","To provide clear performance criteria that describe levels of skill quality","To evaluate the colour of the equipment used","To replace the need for any assessment at all"],correctIndex:1,
explanation:"A rubric is a coherent set of criteria describing levels of performance quality — its purpose is to provide clear, consistent performance criteria, not to grade written tests.",
concept:{title:"Rubrics as an Assessment Tool",definition:"Rubrics translate subjective observation into consistent, describable performance levels.",points:["The word 'rubric' comes from the Latin word for 'red'","Provides criteria describing different quality levels (e.g. Proficient / Developing / Needs Development)","Used heavily in qualitative, skill-based assessment"],memoryTrick:"'Rubric = Ruler for skill quality.'",sportsRelevance:"Every skill checklist and grading table in the textbook (e.g. the running skill rubric) is built on this principle."},
relatedIds:["PAT12-AS-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q3.3 & Textbook Unit 1.4",tags:["assessment","rubrics"]},

{id:"PAT12-AS-004",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Assessment Tools",subtopic:"Grading Scales",difficulty:"Moderate",type:"MCQ",year:2026,
question:"On the textbook's 3-point grading rubric, what does a grade of 'B' represent?",
options:["Proficient","Developing","Needs Development","Excellent"],correctIndex:1,
explanation:"On the 3-point scale, A = Proficient (3 points), B = Developing (2 points), C = Needs Development (1 point).",
concept:{title:"The 3-Point Grading Scale",definition:"A simple qualitative scale used to record a student's skill level against a rubric.",points:["A — Proficient (3 points)","B — Developing (2 points)","C — Needs Development (1 point)"],memoryTrick:"'A is Ahead, B is Building, C is Coming along.'",sportsRelevance:"This scale is used directly in sample report cards shown in the textbook (e.g. skill grades for running, catching)."},
relatedIds:["PAT12-AS-003"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q4.1 & Textbook Unit 1.4",tags:["assessment","rubrics"]},

{id:"PAT12-AS-005",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Qualitative vs Quantitative Assessment",subtopic:"Assessment vs Evaluation",difficulty:"Hard",type:"MCQ",year:2026,
question:"What is the key difference between 'assessment' and 'evaluation' as explained in the textbook?",
options:["They mean exactly the same thing","Evaluation improves learning quality while assessment judges the final level reached","Assessment is ongoing and provides feedback; evaluation provides closure and judges the outcome","Assessment only applies to written tests"],correctIndex:2,
explanation:"The textbook explains: 'Assessment is ongoing and evaluation provides closure', 'Assessment improves learning quality and evaluation judges learning level', and 'Assessment provides feedback and evaluation shows shortfalls.'",
concept:{title:"Assessment vs Evaluation",definition:"Two related but functionally different processes in tracking student progress.",points:["Assessment — ongoing, feedback-oriented, process-focused","Evaluation — a final review/closure, judgment-oriented, outcome-focused"],memoryTrick:"'Assessment = Along the way. Evaluation = End of the way.'",sportsRelevance:"A Facilitator assesses continuously through the term, then evaluates at reporting time (e.g. before a Parent-Teacher Meeting)."},
relatedIds:["PAT12-AS-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q5.3 & Textbook Unit 1.5",tags:["assessment"]},

{id:"PAT12-AS-006",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Fitness Testing",subtopic:"Aerobic Capacity",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these fitness tests is used to measure a child's aerobic capacity?",
options:["Sit and Reach test","Beep Test / 600m Run-Walk","Standing Broad Jump","Overhead Medicine Ball Throw"],correctIndex:1,
explanation:"The textbook's Fitness Assessment table lists the Beep Test and 600m Run/Walk (among others) as tests for Aerobic Capacity.",
concept:{title:"Matching Fitness Tests to Capacities",definition:"Each physical capacity in the textbook's fitness framework has its own specific, standardized test.",points:["Aerobic Capacity — Beep Test, 600m Run/Walk","Anaerobic Capacity — 30m Sprint","Flexibility — Sit & Reach Test","Explosive Strength (Lower) — Standing Broad Jump","Explosive Strength (Upper) — Overhead Medicine Ball Throw","Abdominal Strength — Sit-ups/Curl-ups"],memoryTrick:"'Beep for breath (aerobic).'",sportsRelevance:"Facilitators use exactly these tests to fill in the quantitative assessment input sheets shown in the textbook."},
relatedIds:["PAT12-AS-007"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 1.7",tags:["assessment","fitness-testing"]},

{id:"PAT12-AS-007",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Fitness Testing",subtopic:"Flexibility & Strength Tests",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which test does the textbook use to measure explosive strength of the upper body?",
options:["Standing Broad Jump","Sit and Reach Test","Overhead Medicine Ball Throw","30m Sprint"],correctIndex:2,
explanation:"The textbook specifies the Overhead Medicine Ball Throw (measured by the maximum distance the ball travels at its first bounce) as the test for upper-body explosive strength.",
concept:{title:"Explosive Strength Tests",definition:"Explosive strength is tested separately for upper and lower body using distance-based throws/jumps.",points:["Upper body — Overhead Medicine Ball Throw","Lower body — Standing Broad Jump","Both measured in metres, at first bounce/landing point"],memoryTrick:"'Throw = upper. Jump = lower.'",sportsRelevance:"These same two tests appear in the Class XI Props & Equipment list — the Medicine Ball is the key prop involved."},
relatedIds:["PAT12-AS-006"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 1.7",tags:["assessment","fitness-testing"]},

{id:"PAT12-AS-008",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Assessment Planning",subtopic:"Pre-Assessment Steps",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Before an assessment day, the textbook requires that students with any physical or medical issue be identified and:",
options:["Made to participate anyway to avoid special treatment","Not allowed to participate, with the information shared with the school coordinator","Given extra credit automatically","Excluded from the school records"],correctIndex:1,
explanation:"The Pre-Assessment checklist states that students having any physical/medical issue should be identified, should not participate in the test, and this information should be provided to the school coordinator.",
concept:{title:"Pre-Assessment Safety Steps",definition:"Careful preparation before an assessment day protects students with medical conditions from harm.",points:["Identify students with physical/medical issues in advance","Exclude them from participating in that specific test","Inform the school coordinator of the exclusion"],memoryTrick:"'Identify, exclude, inform.'",sportsRelevance:"This is a direct safety safeguard tied into the Emergency Management unit's broader risk-prevention philosophy."},
relatedIds:["PAT12-EM-001"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 1.6",tags:["assessment","safety"]},

{id:"PAT12-AS-009",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Types of Evaluation",subtopic:"Formative & Summative",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which type of evaluation is used to monitor a student's learning progress DURING instruction, with the purpose of giving ongoing feedback?",
options:["Summative Evaluation","Diagnostic Evaluation","Formative Evaluation","Final Evaluation"],correctIndex:2,
explanation:"Formative Evaluation is an ongoing process used to monitor learning progress during instruction and give continuous feedback to students and teachers.",
concept:{title:"Formative, Summative & Diagnostic Evaluation",definition:"Three evaluation types serve different purposes across a course.",points:["Formative — ongoing, during instruction, feedback-focused","Summative — at the end, evaluates final mastery of outcomes","Diagnostic — finds the exact problem/cause behind a learning difficulty"],memoryTrick:"'Formative = Forming (in progress). Summative = Summary (final).'",sportsRelevance:"A Facilitator uses formative checks weekly, but a summative evaluation feeds into the term report card."},
relatedIds:["PAT12-AS-005"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 1.5",tags:["assessment"]},

{id:"PAT12-AS-010",exam:["PAT-12"],subject:"PAT XII — Assessment of Students",topic:"Reporting to Parents",subtopic:"Parent-Teacher Meetings",difficulty:"Easy",type:"MCQ",year:2026,
question:"During a Parent-Teacher Meeting (PTM), what does the textbook recommend if you don't know the answer to a parent's question?",
options:["Make up a plausible-sounding answer","Politely say you don't know and direct them to write in for an answer","Avoid the parent for the rest of the meeting","End the meeting immediately"],correctIndex:1,
explanation:"The textbook advises: 'Understand the question first before you answer it. If you don't have an answer, ask them to write to us at the designated email for a proper response.'",
concept:{title:"Managing a Parent-Teacher Meeting",definition:"PTMs require professionalism, honesty and a two-way conversation approach.",points:["Treat it as a two-way conversation, not a lecture","Be honest when you don't know an answer — offer to follow up","Stay positive when discussing the child, school or program"],memoryTrick:"'Don't know? Say so, and follow up properly.'",sportsRelevance:"Honest communication builds parent trust in the Facilitator's professional judgment."},
relatedIds:["PAT12-AS-001"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 1.8",tags:["assessment","parent-communication"]},

// =====================================================================
// CLASS XII — UNIT: EMERGENCY MANAGEMENT
// =====================================================================
{id:"PAT12-EM-001",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"Emergency Response",subtopic:"Emergency Action Plans",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What is the primary purpose of an Emergency Action Plan (EAP) in a school sports setting?",
options:["To organize sports equipment inventory","To guide a quick, appropriate response to serious or life-threatening medical events","To help win sports competitions","To determine the yearly sports schedule"],correctIndex:1,
explanation:"An Emergency Action Plan provides a systematic approach for responding quickly to sports-related injuries and medical conditions that are serious or life-threatening.",
concept:{title:"Emergency Action Plans (EAPs)",definition:"A pre-prepared, systematic plan that guides staff response during medical, environmental or security emergencies.",points:["Addresses medical, environmental and security emergencies","Puts critical training, equipment and protocols in place before they are needed","Reduces panic and delay during a real emergency"],memoryTrick:"'Plan before the panic.'",sportsRelevance:"Every Facilitator should know their school's EAP before running any physical session, especially outdoors."},
relatedIds:["PAT12-EM-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q2.4 & Textbook Unit 2",tags:["emergency-management"]},

{id:"PAT12-EM-002",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"Common Conditions",subtopic:"Heatstroke",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which combination of signs is characteristic of heatstroke, per the textbook and official curriculum?",
options:["Runny nose and coughing","Rapid pulse and flushed skin","Cold extremities and shivering","Nausea and vomiting only"],correctIndex:1,
explanation:"The textbook lists heatstroke signs including fever of 104°F or greater, hot/dry or heavily sweating skin, rapid pulse, rapid breathing, flushed skin and confusion — rapid pulse and flushed skin are hallmark signs.",
concept:{title:"Recognizing Heatstroke",definition:"Heatstroke is a life-threatening condition caused by rapid, uncontrolled rise in body temperature.",points:["Fever of 104°F or greater","Hot, dry skin or heavy sweating; flushed skin","Rapid pulse and rapid breathing","Confusion, agitation or slurred speech; fainting"],memoryTrick:"'Hot, Fast, Flushed, Confused.'",sportsRelevance:"Facilitators running outdoor sessions in hot weather must watch for these exact signs and act immediately."},
relatedIds:["PAT12-EM-003"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q2.5 & Textbook Unit 2",tags:["emergency-management","heatstroke"]},

{id:"PAT12-EM-003",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"Common Conditions",subtopic:"Heatstroke First Aid",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these is a recommended first-aid step for a child showing signs of heatstroke?",
options:["Wrap them in extra warm blankets","Place ice packs or cool wet towels on the neck, armpits and groin","Give them a hot drink immediately","Make them continue light exercise to 'sweat it out'"],correctIndex:1,
explanation:"The textbook lists placing ice packs or cool wet towels on the neck, armpits and groin (along with cool showers, sponging, and misting with cool water) as emergency first aid for heatstroke.",
concept:{title:"First Aid for Heatstroke",definition:"The goal of first aid is to cool the body down as quickly and safely as possible.",points:["Cool shower or tub of cool water","Sponge with cool water / spray with a water pipe","Ice packs or cool wet towels on neck, armpits, groin","Fan while misting with cool water"],memoryTrick:"'Cool it down, fast — never warm it up.'",sportsRelevance:"Quick, correct first aid can prevent heatstroke from becoming life-threatening while waiting for medical help."},
relatedIds:["PAT12-EM-002"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 2",tags:["emergency-management","first-aid"]},

{id:"PAT12-EM-004",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"First Aid Procedures",subtopic:"DRABC",difficulty:"Hard",type:"MCQ",year:2026,
question:"In the DRABC first-aid sequence, what does the 'R' stand for?",
options:["Rescue","Response","Recovery","Resuscitation"],correctIndex:1,
explanation:"DRABC stands for Danger, Response, Airway, Breathing, Circulation — 'R' stands for Response (checking if the casualty is responsive).",
concept:{title:"The DRABC First Aid Sequence",definition:"A standard step-by-step check used before administering further first aid.",points:["D — Danger (check the scene is safe)","R — Response (check if the person responds)","A — Airway (check it's clear)","B — Breathing (check they are breathing)","C — Circulation (check for pulse/severe bleeding)"],memoryTrick:"'D-R-A-B-C: Danger, Response, Airway, Breathing, Circulation.'",sportsRelevance:"This is the very first check any Facilitator performs before doing anything else in a medical emergency."},
relatedIds:["PAT12-EM-005"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q5.4",tags:["emergency-management","first-aid"]},

{id:"PAT12-EM-005",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"First Aid Procedures",subtopic:"DRABC",difficulty:"Hard",type:"MCQ",year:2026,
question:"Which of the following is NOT a step in the DRABC first-aid sequence?",
options:["D for Danger","R for Response","A for Airways","M for Medication"],correctIndex:3,
explanation:"DRABC consists of Danger, Response, Airway, Breathing and Circulation — 'Medication' is not part of this sequence at all.",
concept:{title:"What DRABC Does NOT Include",definition:"DRABC is a safety and vital-signs check — it does not involve administering medication.",points:["DRABC = Danger, Response, Airway, Breathing, Circulation","Administering medication is a separate, specialized action — never part of basic first aid checks"],memoryTrick:"'DRABC has 5 letters, and none of them is M.'",sportsRelevance:"Untrained first-aiders should never administer medication — this is explicitly excluded from the basic response sequence."},
relatedIds:["PAT12-EM-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q3.4",tags:["emergency-management","first-aid"]},

{id:"PAT12-EM-006",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"First Aid Procedures",subtopic:"CPR",difficulty:"Hard",type:"MCQ",year:2026,
question:"As per the official curriculum's marking scheme, what is the recommended minimum chest compression depth during CPR?",
options:["At least 1 inch (2.5 cm)","At least 2 inches (5 cm)","At least 3 inches (7.5 cm)","At least 4 inches (10 cm)"],correctIndex:1,
explanation:"The official CBSE marking scheme confirms the correct answer is 'at least 2 inches (5 cm)' for adult CPR chest compression depth.",
concept:{title:"CPR Chest Compressions",definition:"Correct compression depth is critical for CPR to be effective without causing unnecessary injury.",points:["Minimum depth: at least 2 inches (5 cm)","Compressions should be firm and at a steady rate","CPR is only ever a bridge to professional medical help, not a replacement for it"],memoryTrick:"'2 inches, every time.'",sportsRelevance:"CPR knowledge is core first-aid training expected of anyone supervising children's physical activity."},
relatedIds:["PAT12-EM-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q5.4",tags:["emergency-management","first-aid","cpr"]},

{id:"PAT12-EM-007",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"First Aid Procedures",subtopic:"First Aid Kit",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is the primary purpose of keeping a first-aid kit at the sports field?",
options:["As decoration for the equipment shed","To respond to common injuries quickly","To store extra sports equipment","To demonstrate props during a lesson"],correctIndex:1,
explanation:"A first-aid kit's core purpose is to allow a quick response to common injuries occurring during physical activity, not as a demonstration prop or storage item.",
concept:{title:"The Role of a First Aid Kit",definition:"A readily-available first-aid kit is a baseline safety requirement at any sports session.",points:["Must be available before every assessment/session (per the Pre-Assessment checklist)","Used to respond immediately to common injuries","Should be checked regularly for missing/expired items"],memoryTrick:"'Kit ready = respond ready.'",sportsRelevance:"The Pre-Assessment checklist explicitly requires confirming first-aid availability before any session begins."},
relatedIds:["PAT12-AS-008"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q4.4",tags:["emergency-management","first-aid"]},

{id:"PAT12-EM-008",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"Common Conditions",subtopic:"Allergic Reactions",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these is listed as a symptom of a severe allergic reaction in the textbook?",
options:["Improved breathing","Swelling of the tongue","Increased appetite","Better colour vision"],correctIndex:1,
explanation:"The textbook lists difficult or noisy breathing and swelling of the tongue among the symptoms of a severe allergic reaction.",
concept:{title:"Recognizing a Severe Allergic Reaction",definition:"Severe allergic reactions (anaphylaxis) require immediate recognition and emergency response.",points:["Difficult or noisy breathing","Swelling of the tongue","Requires urgent medical attention"],memoryTrick:"'Swelling + struggling to breathe = emergency.'",sportsRelevance:"Facilitators should know which children in their group have known allergies before starting any activity."},
relatedIds:["PAT12-EM-002"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 2",tags:["emergency-management"]},

{id:"PAT12-EM-009",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"Emergency Response",subtopic:"Meaning & Importance",difficulty:"Easy",type:"MCQ",year:2026,
question:"According to the textbook, emergency response is best described as what kind of process?",
options:["A one-time event that never repeats","A cyclical process involving repeated assessment, planning, action and review","A purely administrative paperwork exercise","An activity only relevant to professional athletes"],correctIndex:1,
explanation:"The textbook describes emergency response as 'sometimes a cyclical process, involving repeated assessment, planning, action and review.'",
concept:{title:"Emergency Response as a Cycle",definition:"Emergency preparedness is never 'finished' — it's continuously reassessed and improved.",points:["Assessment → Planning → Action → Review, repeated over time","Can start with an initial assessment or be triggered by an actual event"],memoryTrick:"'Assess, Plan, Act, Review — then repeat.'",sportsRelevance:"Schools review and update their Emergency Action Plans periodically, not just once."},
relatedIds:["PAT12-EM-001"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 2.1",tags:["emergency-management"]},

{id:"PAT12-EM-010",exam:["PAT-12"],subject:"PAT XII — Emergency Management",topic:"Common Conditions",subtopic:"Hygiene's Role in Prevention",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is described as the core purpose of maintaining good hygiene in a play/sports setting?",
options:["To impress visiting officials","To protect yourself and others from illness","To save money on cleaning supplies","To pass a written exam only"],correctIndex:1,
explanation:"Good hygiene's core purpose, per the official curriculum, is to protect yourself and others from illness — a preventive measure, not just a formality.",
concept:{title:"Hygiene as Illness Prevention",definition:"Hygiene practices directly reduce the risk of infections spreading in group physical activity settings.",points:["Prevents spread of illness between children","Reduces risk during shared equipment use","Is a proactive, preventive form of 'emergency management'"],memoryTrick:"'Clean now, prevent illness later.'",sportsRelevance:"This links Emergency Management directly to the separate Health & Hygiene in Play Area unit."},
relatedIds:["PAT12-HH-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q2.6",tags:["emergency-management","hygiene"]},

// =====================================================================
// CLASS XII — UNIT: HEALTH AND HYGIENE IN PLAY AREA
// =====================================================================
{id:"PAT12-HH-001",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Kits for Games & Practice",subtopic:"Cleaning PPE",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these should NEVER be used to clean sports protective equipment (PPE)?",
options:["Warm soapy water","Baby soap","Harsh chemicals","White vinegar"],correctIndex:2,
explanation:"The official curriculum specifically excludes harsh chemicals from acceptable PPE cleaning methods, favouring gentler options like warm soapy water, baby soap or white vinegar.",
concept:{title:"Cleaning Sports PPE Safely",definition:"Protective gear must be cleaned gently to avoid damaging materials that protect the wearer.",points:["Acceptable: warm soapy water, baby soap, white vinegar","Not acceptable: harsh chemicals, which can degrade protective materials"],memoryTrick:"'Gentle in, harsh out.'",sportsRelevance:"Damaged PPE from harsh cleaning agents can fail to protect a child properly during play."},
relatedIds:["PAT12-HH-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q3.5",tags:["health-hygiene","ppe"]},

{id:"PAT12-HH-002",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Inspection of Play Area",subtopic:"Reporting Damage",difficulty:"Easy",type:"MCQ",year:2026,
question:"If damaged playground equipment is discovered during an inspection, what is the correct action?",
options:["Leave it as is until the next scheduled inspection","Report it to the authorities and follow up on repairs","Use it carefully to avoid wasting resources","Discard it immediately without informing anyone"],correctIndex:1,
explanation:"The correct protocol is to report damaged equipment to the relevant authorities and follow up until it is repaired — not to keep using it or quietly discard it.",
concept:{title:"Responding to Damaged Equipment",definition:"A clear reporting protocol ensures hazards are fixed rather than ignored or hidden.",points:["Report damage to the relevant authority immediately","Follow up to confirm the repair is completed","Never continue using clearly damaged equipment"],memoryTrick:"'See damage, report damage, track the fix.'",sportsRelevance:"This mirrors the same protocol taught in the Class XI Hygiene & Safety unit."},
relatedIds:["PAT11-PYQ-010"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q3.6",tags:["health-hygiene"]},

{id:"PAT12-HH-003",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Inspection of Play Area",subtopic:"Sandpit & Surfacing",difficulty:"Moderate",type:"MCQ",year:2026,
question:"A playground sandpit should be covered when not in use primarily to prevent:",
options:["Sand from blowing away in the wind","Contamination from animals","The sand from getting too dry","Children from finding it"],correctIndex:1,
explanation:"Covering a sandpit when not in use is specifically recommended to prevent contamination from animals, alongside checking regularly for hazardous debris.",
concept:{title:"Sandpit Hygiene",definition:"Sandpits require active management to remain a safe, hygienic play surface.",points:["Cover when not in use — prevents animal contamination","Regularly check for sharp debris like glass or sticks","Ensure sand is kept free of bugs"],memoryTrick:"'Cover it, or critters discover it.'",sportsRelevance:"This exact rule also appears in the Class XI Hygiene & Safety unit — the two units reinforce each other."},
relatedIds:["PAT11-HS-008"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 3",tags:["health-hygiene"]},

{id:"PAT12-HH-004",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Maintenance of Hygiene",subtopic:"Disinfection",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is the main goal of using disinfectants and cleaning agents in a play area?",
options:["To improve the smell of the equipment room","To add colour to worn equipment","To provide a germ-free environment","To make equipment shinier for photos"],correctIndex:2,
explanation:"The core goal of disinfectants and cleaners in a play area is to provide a germ-free environment, protecting health rather than serving cosmetic purposes.",
concept:{title:"Purpose of Disinfection",definition:"Regular disinfection is a proactive hygiene measure, not a cosmetic one.",points:["Goal: a germ-free environment","Prevents the spread of illness among children sharing equipment/space"],memoryTrick:"'Germ-free, not just nice-smelling.'",sportsRelevance:"This directly supports the Emergency Management unit's framing of hygiene as illness prevention."},
relatedIds:["PAT12-EM-010"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q5.6",tags:["health-hygiene"]},

{id:"PAT12-HH-005",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Maintenance of Hygiene",subtopic:"Waste Disposal",difficulty:"Easy",type:"MCQ",year:2026,
question:"Where should waste generated in the play area be disposed of?",
options:["Left where it is for groundskeepers to find later","Buried underground","In a dustbin","Thrown into any nearby water source"],correctIndex:2,
explanation:"Waste in the play area should always be disposed of properly in a dustbin — never left on the ground, buried, or thrown into water.",
concept:{title:"Correct Waste Disposal",definition:"Simple, consistent waste disposal keeps a play area both hygienic and safe from tripping/slipping hazards.",points:["Always use a dustbin","Never leave waste on the ground or bury it","Never dispose of waste in water sources"],memoryTrick:"'Waste belongs in the bin — always.'",sportsRelevance:"Litter left on a playground is both a hygiene issue and a physical safety hazard (tripping, cuts)."},
relatedIds:["PAT11-HS-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Q5.5",tags:["health-hygiene"]},

{id:"PAT12-HH-006",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Inspection of Play Area",subtopic:"Walkway Standards",difficulty:"Hard",type:"MCQ",year:2026,
question:"Per the playground inspection checklist, what is the minimum recommended width for a walkway/pathway?",
options:["0.5 metres","1.22 metres","2.5 metres","5 metres"],correctIndex:1,
explanation:"The inspection checklist specifically asks whether 'pathways are at least 1.22 m wide', setting this as the minimum recommended standard.",
concept:{title:"Walkway Width Standards",definition:"Adequate walkway width prevents overcrowding and collisions near active play equipment.",points:["Minimum recommended width: 1.22 metres","Walkways should be located away from equipment in active use","Walkways should be free of loose materials, irregularities or slippery substances"],memoryTrick:"'1.22 — the magic number for pathway width.'",sportsRelevance:"This kind of precise numeric standard is exactly the type of detail CBSE tests in objective questions."},
relatedIds:["PAT12-HH-002"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 3 (Playground Inspection Checklist)",tags:["health-hygiene","inspection"]},

{id:"PAT12-HH-007",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Inspection of Play Area",subtopic:"Equipment Hazards",difficulty:"Hard",type:"MCQ",year:2026,
question:"The playground inspection checklist asks whether adjacent structural elements of equipment form a vertex angle greater than a certain threshold, to avoid head-entrapment risk. What is that threshold?",
options:["25 degrees","45 degrees","55 degrees","90 degrees"],correctIndex:2,
explanation:"The checklist specifically asks: 'Do adjacent structural elements form a vertex angle greater than 55 degrees?' — angles equal to or below this threshold pose a greater entrapment risk.",
concept:{title:"Head-Entrapment Hazard Checks",definition:"Certain playground equipment geometries can trap a child's head if angles are too narrow.",points:["Checklist threshold: vertex angle greater than 55 degrees is the safer standard","Equipment should also be fabricated to eliminate head-entrapment areas generally"],memoryTrick:"'55 degrees — the entrapment checkpoint.'",sportsRelevance:"This shows the level of technical detail a Facilitator's inspection checklist actually covers — not just visible damage."},
relatedIds:["PAT12-HH-006"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 3 (Playground Inspection Checklist)",tags:["health-hygiene","inspection"]},

{id:"PAT12-HH-008",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Kits for Games & Practice",subtopic:"Food & Drinking Supply",difficulty:"Easy",type:"MCQ",year:2026,
question:"Why is ensuring a drinking water supply near the play area considered a hygiene and safety priority?",
options:["It is only relevant for competitive athletes","It helps prevent dehydration-related conditions like heatstroke during activity","It has no real safety relevance","It is only needed once a year during sports day"],correctIndex:1,
explanation:"Access to drinking water helps prevent dehydration-related conditions, directly connecting the Health & Hygiene unit to the Emergency Management unit's coverage of heatstroke.",
concept:{title:"Drinking Water as a Safety Priority",definition:"Hydration access is treated as a basic safety requirement, not an optional convenience.",points:["Directly reduces the risk of dehydration and heatstroke","Checked as part of the pre-assessment safety checklist","Should be located close to the playground for quick access"],memoryTrick:"'No water, higher risk.'",sportsRelevance:"This is one of the clearest links between the Health & Hygiene unit and the Emergency Management unit."},
relatedIds:["PAT12-EM-002"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 3",tags:["health-hygiene"]},

{id:"PAT12-HH-009",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Inspection of Play Area",subtopic:"Supervision",difficulty:"Moderate",type:"MCQ",year:2026,
question:"According to the playground inspection checklist, which of these is a required 'Supervision' check?",
options:["Whether the playground is actively supervised and the supervisor is trained","Whether the playground has colourful equipment","Whether the equipment is imported","Whether attendance was taken in class that day"],correctIndex:0,
explanation:"Under the 'Supervision' section, the checklist asks whether the playground is actively supervised and whether the supervisor is trained to perform the required duties.",
concept:{title:"Supervision Standards",definition:"Active, trained supervision is treated as its own dedicated inspection category, alongside equipment and hygiene checks.",points:["Is the playground actively supervised?","Is the supervisor trained for the required duties?","Are records kept of playground and equipment repairs?"],memoryTrick:"'Supervised AND trained — both matter.'",sportsRelevance:"This is a direct professional responsibility of the Physical Activity Facilitator role itself."},
relatedIds:["PAT12-HH-002"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 3 (Playground Inspection Checklist)",tags:["health-hygiene","inspection"]},

{id:"PAT12-HH-010",exam:["PAT-12"],subject:"PAT XII — Health and Hygiene in Play Area",topic:"Maintenance of Hygiene",subtopic:"Personal Strengths",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of these best reflects 'personal strengths of individuals' as a topic within this unit?",
options:["A student's exam marks only","A student's individual physical and hygiene habits that support their own wellbeing","A student's family's income level","A student's popularity among peers"],correctIndex:1,
explanation:"'Personal strengths of individuals' in this unit refers to the individual habits and practices (hygiene, self-care) that support a student's own health and wellbeing — not academic or social metrics.",
concept:{title:"Personal Strengths and Hygiene",definition:"This sub-topic connects individual self-care habits to the broader goal of a hygienic, healthy play environment.",points:["Focuses on the individual's own hygiene and self-care habits","Complements the play-area-level hygiene and inspection topics in the same unit"],memoryTrick:"'Personal strength starts with personal habits.'",sportsRelevance:"A Facilitator models these personal habits for children, reinforcing what's taught in the Class XI Hygiene unit."},
relatedIds:["PAT11-HS-001"],source:"CBSE Physical Activity Trainer Class XII Textbook, Unit 3.1",tags:["health-hygiene"]},

// =====================================================================
// CLASS XII — REAL BOARD PYQs (Official CBSE Sample Question Paper, 2025-26,
// Subject Code 845, sourced from cbseacademic.nic.in — verbatim options,
// correct answers verified against the official marking scheme)
// =====================================================================
{id:"PAT12-PYQ-001",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Employability Skills",subtopic:"Communication",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of the following is an example of non-verbal communication?",
options:["Sending a text message","Speaking loudly","Maintaining eye contact","Writing an email"],correctIndex:2,
explanation:"Official answer: Maintaining eye contact — a form of non-verbal communication.",
concept:{title:"Real CBSE Exam Question",definition:"This is an unmodified question from the official 2025-26 Sample Question Paper, Section A (Objective), Q1.1.",points:["Tests basic Employability Skills concepts common to all CBSE skill subjects","Section A carries 24 of the paper's 50 marks"],memoryTrick:"N/A — this is a real exam question, memorize the concept directly.",sportsRelevance:"Practising real board questions builds familiarity with the actual exam's phrasing and difficulty."},
relatedIds:["PAT12-OV-006"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q1.1",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-002",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Employability Skills",subtopic:"Self-Management",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of the following best describes extrinsic motivation?",
options:["Enjoying a subject genuinely","Exercising for personal health","Completing a task for a reward or praise","Pursuing a hobby purely for personal interest"],correctIndex:2,
explanation:"Official answer: Completing a task for a reward or praise defines extrinsic motivation.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q1.2.",points:["Extrinsic motivation = driven by external reward or recognition"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Understanding motivation types is directly useful when designing engagement strategies for young students."},
relatedIds:["PAT12-OV-007"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q1.2",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-003",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Employability Skills",subtopic:"Leadership",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of the following is considered a leadership trait?",
options:["Shyness","Aggressiveness","Empathy","Introversion"],correctIndex:2,
explanation:"Official answer: Empathy.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q1.3.",points:["Empathy is identified as a core leadership trait in the employability curriculum"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Empathetic leadership is central to effectively guiding groups of young children."},
relatedIds:["PAT12-OV-008"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q1.3",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-004",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Employability Skills",subtopic:"ICT Skills",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which set correctly matches the Microsoft Word keyboard shortcuts — A: New document, B: Save, C: Undo?",
options:["A→Ctrl+N; B→Ctrl+S; C→Ctrl+Z","A→Ctrl+S; B→Ctrl+N; C→Ctrl+Z","A→Ctrl+N; B→Ctrl+Z; C→Ctrl+S","A→Ctrl+Z; B→Ctrl+S; C→Ctrl+N"],correctIndex:0,
explanation:"Official answer: A→Ctrl+N (New); B→Ctrl+S (Save); C→Ctrl+Z (Undo).",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q1.4 — tests basic ICT/MS Word shortcuts.",points:["Ctrl+N — New document","Ctrl+S — Save","Ctrl+Z — Undo"],memoryTrick:"N/A — real exam question.",sportsRelevance:"MS Excel/Word skills are directly required for the 'maintenance of records' course outcome."},
relatedIds:[],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q1.4",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-005",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Employability Skills",subtopic:"Entrepreneurial Skills",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Priya's small sports-equipment business faced a supply shortage, but she quickly found an alternate supplier and kept the business running smoothly. This best demonstrates:",
options:["Leadership","Resilience","Creativity","Time management"],correctIndex:1,
explanation:"Official answer: Resilience — the ability to adapt and recover quickly from a setback.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q1.5.",points:["Resilience is a core entrepreneurial trait: recovering from setbacks quickly"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Entrepreneurial thinking applies to running an independent coaching or equipment business after graduation."},
relatedIds:[],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q1.5",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-006",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Employability Skills",subtopic:"Green Skills",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is the responsible way to dispose of e-waste?",
options:["Donate it locally without checking condition","Sell it online","Recycle it via an authorized program","Bury it in the backyard"],correctIndex:2,
explanation:"Official answer: Recycle via an authorized program.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q1.6.",points:["Authorized recycling is the correct, environmentally responsible disposal method for e-waste"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Applies to disposing of old digital fitness-tracking or scoring equipment."},
relatedIds:["PAT12-OV-005"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q1.6",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-007",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Careers",subtopic:"PE Assistant Careers",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Career opportunities for a Physical Education Assistant include:",
options:["Teaching only","Sports Medicine, Teaching","Teaching, Coaching, Journalism","Teaching, Coaching, Equipment Management"],correctIndex:3,
explanation:"Official answer: Teaching, Coaching, Equipment Management.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q2.1.",points:["Official career map for this specific job role: Teaching, Coaching, Equipment Management"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Directly answers 'what can I do with this qualification?'"},
relatedIds:["PAT12-OV-009"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q2.1",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-008",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Overview",subtopic:"Physical Activity",difficulty:"Easy",type:"MCQ",year:2026,
question:"Which of the following qualifies as a physical activity?",
options:["Watching a soccer match","Running a marathon","Playing chess","Reading about sports"],correctIndex:1,
explanation:"Official answer: Running a marathon qualifies as physical activity (the source paper also notes a basketball match would qualify).",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q2.2.",points:["Physical activity requires actual bodily movement using energy"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Basic terminology question testing the Physical Activity vs Sport vs Recreation distinctions."},
relatedIds:["PAT12-OV-010"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q2.2",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-009",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Assessment",subtopic:"Purpose of Assessment",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What is the primary purpose of assessment?",
options:["To compete with students","To measure learned content","To assign grades randomly","To create competition among teachers"],correctIndex:1,
explanation:"Official answer: To measure learned content.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q2.3.",points:["Assessment's core function is measuring what has actually been learned"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Reinforces the 'what was learnt / how well' framing from the textbook's Unit 1."},
relatedIds:["PAT12-AS-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q2.3",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-010",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Emergency Management",subtopic:"EAP",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What is the purpose of an Emergency Action Plan?",
options:["To win competitions","To guide response to medical events","To organize equipment","To determine schedules"],correctIndex:1,
explanation:"Official answer: To guide response to medical events.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q2.4.",points:["Confirms the core purpose of an EAP as tested in the actual board exam"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Matches directly with the textbook's Unit 2 introduction."},
relatedIds:["PAT12-EM-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q2.4",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-011",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Emergency Management",subtopic:"Heatstroke",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these are signs/symptoms of heatstroke?",
options:["Runny nose, coughing","Rapid pulse, flushed skin","Cold extremities, shivering","Nausea, vomiting"],correctIndex:1,
explanation:"Official answer: Rapid pulse, flushed skin.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q2.5.",points:["Rapid pulse and flushed skin are hallmark heatstroke signs"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Critical safety knowledge for outdoor sessions in hot weather."},
relatedIds:["PAT12-EM-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q2.5",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-012",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Health & Hygiene",subtopic:"Purpose of Hygiene",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is the purpose of good hygiene?",
options:["Prevent clothing damage","Impress others","Protect self/others from illness","Save money"],correctIndex:2,
explanation:"Official answer: Protect self/others from illness.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q2.6.",points:["Confirms hygiene's core preventive purpose as tested in the actual board exam"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Ties together the Hygiene, Emergency Management and Health & Hygiene in Play Area units."},
relatedIds:["PAT12-EM-010"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q2.6",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-013",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Careers",subtopic:"Sports Sector Careers",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these is NOT a career path in the Physical Education/Sports sector?",
options:["Sports Psychology","Sports Nutritionist","Engineering","Fitness Sector"],correctIndex:2,
explanation:"Official answer: Engineering.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q3.1.",points:["Engineering is unrelated to the sports-sector career map tested here"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Reinforces the career-path map covered in the Overview unit."},
relatedIds:["PAT12-OV-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q3.1",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-014",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Assessment",subtopic:"Fitness Testing",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which tests are used to measure Upper Body Strength?",
options:["Seated Medicine Ball Throw, Pushups","Lower Body Strength tests","Anaerobic Capacity tests","Flexibility tests"],correctIndex:0,
explanation:"Official answer: Seated Medicine Ball Throw, Pushups.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q3.2.",points:["Confirms Seated Medicine Ball Throw and Pushups as Upper Body Strength tests"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Complements the Overhead Medicine Ball Throw test also covered for upper-body explosive strength."},
relatedIds:["PAT12-AS-007"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q3.2",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-015",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Assessment",subtopic:"Rubrics",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What is the purpose of a rubric?",
options:["Measure correct answers","Evaluate colours","Provide performance criteria","Assess physical fitness"],correctIndex:2,
explanation:"Official answer: Provide performance criteria.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q3.3.",points:["Confirms a rubric's purpose is to provide performance criteria, not to grade fitness or written answers directly"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Matches the textbook's definition of a rubric exactly."},
relatedIds:["PAT12-AS-003"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q3.3",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-016",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Emergency Management",subtopic:"DRABC",difficulty:"Hard",type:"MCQ",year:2026,
question:"Which of the following is NOT part of DRABC first aid?",
options:["D for Danger","R for Response","A for Airways","M for Medication"],correctIndex:3,
explanation:"Official answer: M for Medication (not part of DRABC).",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q3.4.",points:["DRABC = Danger, Response, Airway, Breathing, Circulation — no 'M'"],memoryTrick:"N/A — real exam question.",sportsRelevance:"A commonly tested exclusion-style question in first-aid sections."},
relatedIds:["PAT12-EM-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q3.4",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-017",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Health & Hygiene",subtopic:"PPE Cleaning",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which of these should NOT be used for cleaning PPE?",
options:["Warm soapy water","Baby soap","Harsh chemicals","White vinegar"],correctIndex:2,
explanation:"Official answer: Harsh chemicals.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q3.5.",points:["Harsh chemicals damage protective equipment materials and are excluded"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Directly matches the Health & Hygiene unit's PPE cleaning guidance."},
relatedIds:["PAT12-HH-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q3.5",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-018",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Health & Hygiene",subtopic:"Reporting Damage",difficulty:"Easy",type:"MCQ",year:2026,
question:"If playground equipment is damaged, what should you do?",
options:["Leave as is","Report to authorities, follow repairs","Use carefully","Discard in trash"],correctIndex:1,
explanation:"Official answer: Report to authorities, follow repairs.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q3.6.",points:["Confirms the correct damaged-equipment protocol as tested on the real exam"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Same protocol appears in both Class XI and Class XII units."},
relatedIds:["PAT12-HH-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q3.6",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-019",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Assessment",subtopic:"Grading Scales",difficulty:"Moderate",type:"MCQ",year:2026,
question:"On a 3-point rubric, what does grade 'B' represent?",
options:["Proficient","Developing","Needs Improvement","Excellent"],correctIndex:1,
explanation:"Official answer: Developing.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q4.1.",points:["Confirms B = Developing on the official 3-point grading scale"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Matches the textbook's rubric definitions exactly."},
relatedIds:["PAT12-AS-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q4.1",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-020",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Overview",subtopic:"Games vs Sports",difficulty:"Moderate",type:"MCQ",year:2026,
question:"What distinguishes Games from Sports?",
options:["Competitive element","Physical exertion","Team involvement","Official rules/regulations"],correctIndex:3,
explanation:"Official answer: Official rules/regulations.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q4.2.",points:["Official rules/regulations is the key distinguishing feature between the two terms"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Frequently tested terminology distinction."},
relatedIds:["PAT12-OV-003"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q4.2",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-021",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Overview",subtopic:"Recreation",difficulty:"Easy",type:"MCQ",year:2026,
question:"Hiking and gardening are categorized under which term?",
options:["Physical Activity","Games","Sports","Recreation"],correctIndex:3,
explanation:"Official answer: Recreation.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q4.3.",points:["Confirms hiking/gardening are classified as Recreation, not Sport or Game"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Matches the Overview unit's terminology hierarchy exactly."},
relatedIds:["PAT12-OV-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q4.3",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-022",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Health & Hygiene",subtopic:"First Aid Kit",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is the purpose of a first aid kit?",
options:["Equipment for sports","Demonstration prop","Respond to common injuries","Store snacks"],correctIndex:2,
explanation:"Official answer: Respond to common injuries.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q4.4.",points:["Confirms a first-aid kit's role is responding to common injuries, not storage or demonstration"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Basic but frequently tested safety-equipment question."},
relatedIds:["PAT12-EM-007"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q4.4",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-023",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Emergency Management",subtopic:"ABC First Aid",difficulty:"Hard",type:"MCQ",year:2026,
question:"In ABC first aid, what does 'B' stand for?",
options:["Breathing","Bandaging","Broken bones","Bleeding"],correctIndex:0,
explanation:"Official answer: Breathing.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q4.5.",points:["Confirms 'B' in ABC/DRABC first aid stands for Breathing, not bandaging or bleeding"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Consistent with the fuller DRABC sequence tested elsewhere in the paper."},
relatedIds:["PAT12-EM-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q4.5",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-024",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Health & Hygiene",subtopic:"Equipment Storage",difficulty:"Moderate",type:"MCQ",year:2026,
question:"How should leather equipment be stored?",
options:["Expose to sunlight","Keep damp","Use wet cloth","Store away from direct sunlight"],correctIndex:3,
explanation:"Official answer: Store away from direct sunlight.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q4.6.",points:["Confirms leather equipment storage rule as tested on the real exam"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Matches the Class XI Props & Equipment unit's leather-care instructions exactly."},
relatedIds:["PAT11-PE-007"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q4.6",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-025",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Assessment",subtopic:"Planning",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Why is a clear assessment plan important?",
options:["Confuse students","Make assessment difficult","Ensure all pieces connected","Eliminate assessment"],correctIndex:2,
explanation:"Official answer: Ensure all pieces connected.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q5.1.",points:["A clear plan ensures assessment activities form a coherent, connected whole"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Matches the textbook's warning against unplanned, disconnected assessment pieces."},
relatedIds:["PAT12-AS-001"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q5.1",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-026",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Careers",subtopic:"Sports Injury Careers",difficulty:"Moderate",type:"MCQ",year:2026,
question:"Which career path focuses on diagnosis and treatment of sports injuries?",
options:["Sports Journalism","Sports Psychology","Equipment Managers","Sports Medicine"],correctIndex:3,
explanation:"Official answer: Sports Medicine.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q5.2.",points:["Confirms Sports Medicine as the correct career path for injury diagnosis/treatment"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Direct repeat of the concept tested earlier in the paper (Q3.1) from a different angle."},
relatedIds:["PAT12-OV-002"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q5.2",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-027",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Assessment",subtopic:"Assessment vs Evaluation",difficulty:"Hard",type:"MCQ",year:2026,
question:"What is the difference between Assessment and Evaluation?",
options:["Assessment grades; evaluation is product-oriented","Same concepts","Evaluation is ongoing; assessment provides closure","Evaluation improves quality; assessment judges level"],correctIndex:3,
explanation:"Official answer (per the marking scheme): Evaluation improves quality; assessment judges level. Note this option phrasing is the official paper's own wording of the distinction — it is the credited answer choice.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q5.3 — a deliberately tricky, close-option question.",points:["Read this question's options very carefully — the phrasing differs subtly from the textbook's own explanation","Always check the official marking scheme's exact credited option when two options sound similar"],memoryTrick:"N/A — real exam question; practise the exact official phrasing.",sportsRelevance:"This question style — subtly reworded options — is common in board exams and worth practising specifically."},
relatedIds:["PAT12-AS-005"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q5.3",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-028",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Emergency Management",subtopic:"CPR",difficulty:"Hard",type:"MCQ",year:2026,
question:"What is the recommended CPR chest compression depth?",
options:["At least 3 inches (7.5 cm)","At least 2 inches (5 cm)","At least 4 inches (10 cm)","At least 1 inch (2.5 cm)"],correctIndex:1,
explanation:"Official answer: At least 2 inches (5 cm).",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q5.4.",points:["Confirms the standard 2-inch/5cm minimum compression depth"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Same fact tested from a slightly different question angle elsewhere in this bank — repetition aids retention."},
relatedIds:["PAT12-EM-006"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q5.4",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-029",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Health & Hygiene",subtopic:"Waste Disposal",difficulty:"Easy",type:"MCQ",year:2026,
question:"Where should play area waste be disposed of?",
options:["Leave where it is","Bury underground","Dispose in dustbin","Throw in water"],correctIndex:2,
explanation:"Official answer: Dispose in dustbin.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q5.5.",points:["Confirms proper dustbin disposal as the only correct option tested"],memoryTrick:"N/A — real exam question.",sportsRelevance:"Basic hygiene fact tested plainly — an easy mark if the rule is known."},
relatedIds:["PAT12-HH-005"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q5.5",tags:["pyq","real-exam"]},

{id:"PAT12-PYQ-030",exam:["PAT-12"],subject:"PAT XII — Board PYQs (CBSE SQP)",topic:"Health & Hygiene",subtopic:"Disinfectants",difficulty:"Easy",type:"MCQ",year:2026,
question:"What is the goal of using disinfectants/cleaners in a play area?",
options:["Improve smell","Add colour","Provide germ-free environment","Shine equipment"],correctIndex:2,
explanation:"Official answer: Provide germ-free environment.",
concept:{title:"Real CBSE Exam Question",definition:"From the official 2025-26 Sample Question Paper, Section A, Q5.6 — the final objective question in the sample paper.",points:["Confirms the health-focused (not cosmetic) purpose of disinfection"],memoryTrick:"N/A — real exam question.",sportsRelevance:"A fitting close to the objective section, tying hygiene back to health outcomes."},
relatedIds:["PAT12-HH-004"],source:"CBSE Physical Activity Trainer Class XII — Official Sample Question Paper 2025-26 (Subject Code 845), Section A, Q5.6",tags:["pyq","real-exam"]},

];

// Merge into the main bank + subject taxonomy (both already loaded by build.py
// before this file). Using push (not reassignment) since QUESTION_BANK and
// SUBJECTS are declared with `const` in data-questions.js / data-content.js.
QUESTION_BANK.push(...SCHOOL_QUESTION_BANK);

const SCHOOL_SUBJECT_ENTRIES = [];
SCHOOL_CLASSES.forEach(cls=>{
  cls.units.forEach(u=>{
    SCHOOL_SUBJECT_ENTRIES.push({id:"school-"+cls.id+"-"+u.id, name:u.subject, group:"School — Physical Activity Trainer ("+cls.grade+")", count: u.marks});
  });
  SCHOOL_SUBJECT_ENTRIES.push({id:"school-"+cls.id+"-pyq", name:cls.pyqSubject, group:"School — Physical Activity Trainer ("+cls.grade+")", count: 20});
});
SUBJECTS.push(...SCHOOL_SUBJECT_ENTRIES);
