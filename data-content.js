// ============================================================================
// PE PREP — SUPPORTING DEMO CONTENT
// Exams, subject taxonomy, sports-rules reference DB, flashcards, formulas,
// current affairs capsules, previous-year papers, study notes, badges,
// leaderboard demo rows. All clearly-marked demo data.
// ============================================================================

const EXAMS = [
  {id:"kvs-pgt", name:"KVS PGT Physical Education", short:"KVS PGT PE", body:"Kendriya Vidyalaya Sangathan", tests:42, questions:6200, difficulty:"Moderate–Hard", syllabus:["Anatomy & Physiology","Sports Training","Yoga","Olympic Movement","Sports Rules","Test & Measurement","Teaching Methods"], pattern:"100 MCQs · 120 minutes · +1 / −0.25", color:"navy"},
  {id:"ugc-net", name:"UGC NET Physical Education", short:"UGC NET PE", body:"National Testing Agency", tests:38, questions:7400, difficulty:"Hard", syllabus:["10 Units per NTA Syllabus","Research & Statistics","Biomechanics & Kinesiology","Sports Psychology & Sociology","Sports Management"], pattern:"Paper 1 (50Q) + Paper 2 (100Q) · 3 hours · No negative marking", color:"indigo"},
  {id:"nvs", name:"NVS Physical Education", short:"NVS PE", body:"Navodaya Vidyalaya Samiti", tests:24, questions:3600, difficulty:"Moderate", syllabus:["General Awareness","PE Core Subjects","Teaching Aptitude","Current Affairs"], pattern:"150 MCQs · 150 minutes · +1 / −0.25", color:"teal"},
  {id:"dsssb", name:"DSSSB Physical Education", short:"DSSSB PE", body:"Delhi Subordinate Services Selection Board", tests:20, questions:3100, difficulty:"Moderate–Hard", syllabus:["PE Core Subjects","General Knowledge","Reasoning","Delhi-specific GK"], pattern:"200 MCQs · 150 minutes · +1 / −0.25", color:"maroon"},
  {id:"state-psc", name:"State PSC Physical Education", short:"State PSC PE", body:"Various State Public Service Commissions", tests:16, questions:2400, difficulty:"Moderate", syllabus:["PE Core Subjects","State GK","General Studies"], pattern:"Varies by state · typically 100–150 MCQs", color:"forest"},
  {id:"bped", name:"B.P.Ed Entrance", short:"B.P.Ed", body:"University / State-level Entrance", tests:18, questions:2800, difficulty:"Easy–Moderate", syllabus:["General PE Awareness","Sports Skill Knowledge","Basic Anatomy & Physiology","Aptitude"], pattern:"100 MCQs · 90 minutes", color:"amber"},
  {id:"mped", name:"M.P.Ed Entrance", short:"M.P.Ed", body:"University / State-level Entrance", tests:14, questions:2100, difficulty:"Moderate–Hard", syllabus:["Advanced Anatomy & Physiology","Research Methodology","Sports Training","Biomechanics"], pattern:"100 MCQs · 90 minutes", color:"plum"},
  {id:"university", name:"University Entrance Exams", short:"University PE", body:"Various Central & State Universities", tests:12, questions:1900, difficulty:"Moderate", syllabus:["Core PE Subjects","General Awareness","Sports Skill Test (practical)"], pattern:"Varies by university", color:"slate"},
  {id:"set", name:"SET Physical Education", short:"SET PE", body:"State Eligibility Test — Various State Universities", tests:16, questions:2200, difficulty:"Hard", syllabus:["10 Units per UGC-aligned Syllabus","Research & Statistics","Biomechanics & Kinesiology","Sports Psychology & Sociology","State-specific Notification Rules"], pattern:"Paper 1 (50Q) + Paper 2 (100Q) · 3 hours · No negative marking", color:"crimson"},
  {id:"ctet", name:"CTET Physical Education", short:"CTET PE", body:"Central Board of Secondary Education (CBSE)", tests:22, questions:2600, difficulty:"Moderate", syllabus:["Child Development & Pedagogy","PE Core Subjects","Language I & II","General Awareness"], pattern:"150 MCQs · 150 minutes · No negative marking", color:"steel"},
  {id:"emrs", name:"EMRS TGT/PGT Physical Education", short:"EMRS PE", body:"National Education Society for Tribal Students (NESTS)", tests:18, questions:2400, difficulty:"Moderate", syllabus:["PE Core Subjects","General Awareness","Reasoning","Tribal Welfare & Education Policy"], pattern:"150 MCQs · 150 minutes · +1 / −0.25", color:"olive"},
  {id:"sainik-school", name:"Sainik School PGT/TGT Physical Education", short:"Sainik School PE", body:"National Testing Agency (NTA)", tests:14, questions:1800, difficulty:"Moderate–Hard", syllabus:["PE Core Subjects","General Knowledge","Reasoning","Teaching Aptitude"], pattern:"150 MCQs · 150 minutes · +1 / −0.33", color:"coral"},
  {id:"awes", name:"AWES PGT/TGT Physical Education", short:"AWES PE", body:"Army Welfare Education Society (Army Public Schools)", tests:16, questions:2000, difficulty:"Moderate", syllabus:["PE Core Subjects","General English","Reasoning & Numerical Ability","General Awareness"], pattern:"100 MCQs · 90 minutes · +1 / −0.25", color:"violet"},
];

const SUBJECTS = [
  {id:"history",name:"History of Physical Education",group:"Foundations",count:12},
  {id:"foundations",name:"Foundations of Physical Education",group:"Foundations",count:18},
  {id:"philosophy",name:"Philosophy of Physical Education",group:"Foundations",count:10},
  {id:"sociology",name:"Sociology of Physical Education",group:"Foundations",count:12},
  {id:"sports-psychology",name:"Sports Psychology",group:"Behavioural Science",count:38},
  {id:"anatomy",name:"Anatomy",group:"Sports Science",count:64},
  {id:"physiology",name:"Physiology",group:"Sports Science",count:58},
  {id:"exercise-physiology",name:"Exercise Physiology",group:"Sports Science",count:42},
  {id:"kinesiology",name:"Kinesiology",group:"Sports Science",count:26},
  {id:"biomechanics",name:"Biomechanics",group:"Sports Science",count:24},
  {id:"sports-training",name:"Sports Training",group:"Coaching",count:52},
  {id:"training-methods",name:"Training Methods",group:"Coaching",count:30},
  {id:"fitness-wellness",name:"Fitness and Wellness",group:"Coaching",count:22},
  {id:"health-education",name:"Health Education",group:"Health",count:16},
  {id:"nutrition",name:"Nutrition",group:"Health",count:14},
  {id:"sports-nutrition",name:"Sports Nutrition",group:"Health",count:18},
  {id:"first-aid",name:"First Aid",group:"Health",count:16},
  {id:"sports-injuries",name:"Sports Injuries",group:"Health",count:14},
  {id:"rehabilitation",name:"Rehabilitation",group:"Health",count:12},
  {id:"tme",name:"Test, Measurement & Evaluation",group:"Research",count:34},
  {id:"statistics",name:"Statistics",group:"Research",count:20},
  {id:"research-methodology",name:"Research Methodology",group:"Research",count:16},
  {id:"sports-management",name:"Sports Management",group:"Administration",count:18},
  {id:"sports-administration",name:"Sports Administration",group:"Administration",count:14},
  {id:"edu-tech",name:"Educational Technology",group:"Pedagogy",count:10},
  {id:"teaching-methods",name:"Teaching Methods",group:"Pedagogy",count:20},
  {id:"curriculum",name:"Curriculum in Physical Education",group:"Pedagogy",count:12},
  {id:"adapted-pe",name:"Adapted Physical Education",group:"Pedagogy",count:10},
  {id:"yoga",name:"Yoga",group:"Indian Traditions",count:36},
  {id:"olympic-movement",name:"Olympic Movement",group:"Sports Events",count:34},
  {id:"asian-games",name:"Asian Games",group:"Sports Events",count:16},
  {id:"commonwealth-games",name:"Commonwealth Games",group:"Sports Events",count:14},
  {id:"national-sports",name:"National Sports",group:"Sports Events",count:12},
  {id:"international-sports",name:"International Sports",group:"Sports Events",count:12},
  {id:"sports-rules",name:"Rules and Regulations of Games",group:"Sports Rules",count:48},
  {id:"sports-awards",name:"Sports Awards",group:"General Awareness",count:14},
  {id:"sports-organizations",name:"Sports Organizations",group:"General Awareness",count:12},
  {id:"major-events",name:"Major Sports Events",group:"General Awareness",count:14},
  {id:"current-affairs",name:"Current Sports Affairs",group:"General Awareness",count:60},
];

// ---- Sports Rules reference DB ("Know Your Sport") ----
const SPORTS_RULES_DB = [
  {sport:"Athletics", players:"Individual", equipment:"Spikes, starting blocks, batons (relay)", dimensions:"400m standard track, 8-9 lanes", scoring:"Time (track) / Distance or Height (field)", officials:"Starter, Timekeepers, Judges, Referee", fouls:["False start (0.1s rule)","Stepping out of lane (track events)","Running-through / dropping baton (relay)"], terminology:["PB (Personal Best)","Split time","Baton exchange zone (20m)"], recentChanges:"Zero-tolerance false start rule since 2010; mixed-gender relay events added to global championships."},
  {sport:"Badminton", players:"1v1 (Singles) or 2v2 (Doubles)", equipment:"Racket, Shuttlecock (feather/synthetic), Net", dimensions:"Court: 13.4m x 6.1m (doubles) / 5.18m (singles)", scoring:"Rally point, 21 points/game, best of 3, win by 2 (cap 30)", officials:"Umpire, Service Judge, Line Judges", fouls:["Foot fault at service","Racket/body touching the net","Shuttle hitting outside boundary"], terminology:["Smash","Drop shot","Let","Rally"], recentChanges:"Instant Review System (IRS/Hawk-Eye) now standard at BWF World Tour events."},
  {sport:"Basketball", players:"5v5 (12-15 squad)", equipment:"Basketball, hoop at 3.05m height", dimensions:"FIBA Court: 28m x 15m", scoring:"2pts (inside arc), 3pts (beyond arc), 1pt (free throw)", officials:"2-3 Referees, Table Officials, Shot-clock operator", fouls:["Personal foul","Technical foul","Travelling","24-second shot clock violation"], terminology:["Pick and roll","Zone defense","Fast break","Rebound"], recentChanges:"FIBA now uses 4 x 10-minute quarters with extended replay review for last 2 minutes."},
  {sport:"Volleyball", players:"6v6", equipment:"Volleyball, Net (2.43m men / 2.24m women)", dimensions:"Court: 18m x 9m", scoring:"Rally point, 25 points/set (win by 2), best of 5", officials:"1st & 2nd Referee, Line Judges, Scorer", fouls:["Four touches","Double contact","Net touch","Foot fault on serve"], terminology:["Libero","Dig","Block","Rotation"], recentChanges:"Video Challenge System expanded to more FIVB-sanctioned tournaments."},
  {sport:"Football", players:"11v11 (7 substitutes)", equipment:"Football, goalposts (7.32m x 2.44m)", dimensions:"Pitch: 100-110m x 64-75m", scoring:"1 goal = 1 point, most goals wins", officials:"Referee, 2 Assistant Referees, 4th Official, VAR", fouls:["Offside","Handball","Direct/indirect free kick fouls"], terminology:["Offside trap","Nutmeg","Clean sheet","Extra time"], recentChanges:"VAR (Video Assistant Referee) now used in all major FIFA/continental tournaments."},
  {sport:"Hockey", players:"11v11 (including goalkeeper)", equipment:"Hockey stick, ball, shin guards", dimensions:"Pitch: 91.4m x 55m", scoring:"1 goal from inside the 'shooting circle'", officials:"2 Umpires, Video Umpire, Technical Officials", fouls:["Obstruction","High stick","Dangerous play","Foot foul"], terminology:["Penalty corner","Penalty stroke","Bully","Self-pass"], recentChanges:"Match format changed to 4 quarters of 15 minutes since 2019."},
  {sport:"Cricket", players:"11v11", equipment:"Bat, ball, stumps, pads, helmet", dimensions:"Pitch: 20.12m (22 yards); boundary varies", scoring:"Runs; wickets taken determine bowling success", officials:"2 On-field Umpires, 1 Third Umpire, Match Referee", fouls:["No-ball","Wide","Run-out technicalities","Obstructing the field"], terminology:["Googly","Yorker","Duck","Powerplay"], recentChanges:"DRS (Decision Review System) reviews expanded; Impact Player rule introduced in T20 leagues."},
  {sport:"Handball", players:"7v7 (6 outfield + 1 goalkeeper)", equipment:"Handball, goal (3m x 2m)", dimensions:"Court: 40m x 20m", scoring:"1 goal = 1 point", officials:"2 Court Referees, Timekeeper, Scorekeeper", fouls:["3-second/3-step violation","Charging","Double dribble"], terminology:["7m throw","Pivot","Fast break","Man-to-man defense"], recentChanges:"'Fly goalkeeper' tactic (extra attacker) rules clarified for empty-net situations."},
  {sport:"Kabaddi", players:"7v7 (12 squad)", equipment:"None (bare hands); court markings", dimensions:"Court: 13m x 10m (men)", scoring:"Touch points, bonus points, 'Lona' (all-out)", officials:"Referee, 2 Umpires, Scorer", fouls:["Crossing boundary line","Holding the lobby illegally","Not chanting 'Kabaddi' continuously (traditional format)"], terminology:["Raid","Lona","Anti (defender)","Cant (kabaddi chant)"], recentChanges:"Pro Kabaddi League introduced 'Super Tackle' and 'Do-or-Die raid' rules for professional format."},
  {sport:"Kho-Kho", players:"9 on field (12 squad)", equipment:"Two poles (called 'Kho' poles)", dimensions:"Rectangular field: 29m x 16m", scoring:"Points for dismissals & turns completed", officials:"3 Umpires, 1 Referee, Timekeeper", fouls:["Illegal 'Kho' (touching without proper turn)","Entering the wrong lane","Foul chasing"], terminology:["Kho","Chain formation","Pole dive","Active chaser"], recentChanges:"Ultimate Kho Kho league introduced turn-based limited-time format for TV broadcast."},
  {sport:"Wrestling", players:"Individual (weight categories)", equipment:"Wrestling mat, singlet", dimensions:"Circular mat: 9m diameter", scoring:"Points for takedowns, exposure, pins", officials:"Referee, Judge, Mat Chairman", fouls:["Illegal holds","Passivity","Fleeing the mat"], terminology:["Takedown","Pin (fall)","Freestyle vs Greco-Roman"], recentChanges:"Scoring/period rules revised periodically by UWW (United World Wrestling)."},
  {sport:"Boxing", players:"Individual (weight categories)", equipment:"Gloves, headgear (amateur), mouthguard", dimensions:"Ring: 6.1m x 6.1m (min. 4.9m)", scoring:"Points per round; KO/TKO ends bout", officials:"Referee (in ring), 3-5 Judges (scoring)", fouls:["Below-the-belt hit","Holding","Head-butting"], terminology:["Jab","TKO","Southpaw","Clinch"], recentChanges:"Olympic boxing scoring moved to 10-point-must system judged by 5 ringside judges."},
  {sport:"Table Tennis", players:"1v1 or 2v2", equipment:"Paddle (racket), ball (40mm)", dimensions:"Table: 2.74m x 1.525m, net height 15.25cm", scoring:"11 points/game, win by 2, best of 5/7", officials:"Umpire, Assistant Umpire", fouls:["Double bounce","Hand touching table","Illegal serve (ball toss <16cm)"], terminology:["Loop","Chop","Let","Penhold grip"], recentChanges:"Ball material changed from celluloid to plastic (poly) balls in 2014."},
  {sport:"Swimming", players:"Individual / Relay (4 members)", equipment:"Swimsuit, cap, goggles", dimensions:"Pool: 50m (long course) or 25m (short course)", scoring:"Fastest time wins", officials:"Starter, Referee, Stroke Judges, Timekeepers", fouls:["False start","Illegal stroke technique","Touching lane rope for advantage"], terminology:["Freestyle","IM (Individual Medley)","Flip turn","False start"], recentChanges:"Updated high-tech swimsuit regulations (banned post-2010 'supersuits') remain in force."},
  {sport:"Gymnastics", players:"Individual / Team", equipment:"Apparatus-specific (vault, beam, bars, floor)", dimensions:"Varies by apparatus", scoring:"D-Score (difficulty) + E-Score (execution)", officials:"Panel of Judges (D-panel & E-panel)", fouls:["Out-of-bounds landing","Fall from apparatus (deduction)","Time violations"], terminology:["Vault","Dismount","Amplitude","Landing stick"], recentChanges:"Open-ended scoring system (no perfect '10' cap) used since 2006."},
  {sport:"Archery", players:"Individual / Team", equipment:"Bow (recurve/compound), arrows", dimensions:"Target: 122cm (70m) or 80cm (indoor), 10-ring scoring", scoring:"1-10 points per arrow (X for inner 10)", officials:"Judges, Field Captains", fouls:["Shooting out of turn","Touching the shooting line early","Equipment violations"], terminology:["End","Group / grouping","X-ring","Recurve vs Compound"], recentChanges:"Mixed team events added to Olympic archery program since Tokyo 2020."},
  {sport:"Shooting", players:"Individual / Team", equipment:"Air rifle/pistol, ammunition, targets", dimensions:"10m (air events), 25m/50m (other events)", scoring:"Decimal scoring up to 10.9 in finals", officials:"Range Officers, Jury", fouls:["Unsafe weapon handling","Shooting before/after signal","Equipment non-compliance"], terminology:["Inner ten","Prone/standing/kneeling position","Finals format"], recentChanges:"Decimal (0.1) scoring adopted for electronic targets at elite competitions."},
];

// ---- Flashcards ----
const FLASHCARDS = [
  {id:"fc-1",subject:"Physiology",front:"VO₂ Max",back:"The maximum rate of oxygen consumption during intense exercise, measured in ml/kg/min. The gold-standard indicator of aerobic fitness."},
  {id:"fc-2",subject:"Sports Training",front:"Fartlek Training",back:"A Swedish term meaning 'speed play' — continuous training with unstructured variation in pace and terrain, blending aerobic and anaerobic work."},
  {id:"fc-3",subject:"Test & Measurement",front:"Validity",back:"The degree to which a test measures exactly what it is intended to measure. Considered the most important test criterion."},
  {id:"fc-4",subject:"Anatomy",front:"Gluteus Maximus",back:"The largest muscle in the human body; a primary hip extensor essential for running, jumping and climbing."},
  {id:"fc-5",subject:"Olympic Movement",front:"Baron Pierre de Coubertin",back:"French educator who founded the IOC in 1894 and is regarded as the father of the Modern Olympic Games (Athens, 1896)."},
  {id:"fc-6",subject:"Physiology",front:"Karvonen Formula",back:"THR = ((HRmax − HRrest) × Intensity%) + HRrest — used to calculate individualized target heart rate training zones."},
  {id:"fc-7",subject:"Yoga",front:"Ashtanga (8 limbs)",back:"Yama, Niyama, Asana, Pranayama, Pratyahara, Dharana, Dhyana, Samadhi — Patanjali's eight-limbed path of yoga."},
  {id:"fc-8",subject:"Sports Psychology",front:"Inverted-U Hypothesis",back:"Performance is optimal at a moderate level of arousal; too little or too much arousal impairs performance (Yerkes-Dodson Law)."},
  {id:"fc-9",subject:"Sports Training",front:"Progressive Overload",back:"Systematically increasing training demands (load, volume, frequency) over time to continue driving adaptation."},
  {id:"fc-10",subject:"Anatomy",front:"Muscle Spindle",back:"A stretch receptor within the muscle belly that detects changes in muscle length, triggering the stretch reflex."},
  {id:"fc-11",subject:"Physiology",front:"EPOC",back:"Excess Post-exercise Oxygen Consumption — the elevated oxygen use after exercise as the body restores itself to resting state ('afterburn')."},
  {id:"fc-12",subject:"Sports Rules",front:"Badminton Scoring",back:"Best of 3 games, first to 21 points, must win by 2, hard cap at 30 (30-29 wins)."},
  {id:"fc-13",subject:"First Aid",front:"RICE Protocol",back:"Rest, Ice, Compression, Elevation — standard first-aid management for acute soft-tissue injuries."},
  {id:"fc-14",subject:"Biomechanics",front:"Newton's Third Law in Sport",back:"Every action has an equal and opposite reaction — explains starting-block push-off, swimming turns, and jumping takeoffs."},
  {id:"fc-15",subject:"Olympic Movement",front:"Olympic Rings",back:"Five interlocking rings representing the union of the five inhabited continents in friendship and competition."},
  {id:"fc-16",subject:"Sports Training",front:"SAID Principle",back:"Specific Adaptation to Imposed Demand — the body adapts specifically to the type of training stress applied."},
  {id:"fc-17",subject:"Test & Measurement",front:"Cooper 12-Minute Run Test",back:"VO2 Max = (Distance in metres − 504.9) ÷ 44.73 — a field test estimating aerobic capacity from distance covered in 12 minutes."},
  {id:"fc-18",subject:"Sports Psychology",front:"Social Loafing",back:"The tendency for individuals to exert less effort in a group task than when working alone."},
];

// ---- Formula & Facts Hub ----
const FORMULAS = [
  {id:"FML-001",name:"Cooper 12-Minute Run (VO2 Max estimate)",formula:"VO2 Max = (Distance in metres − 504.9) ÷ 44.73",category:"Fitness Testing",note:"Distance is the total metres covered in a 12-minute maximal run."},
  {id:"FML-002",name:"Karvonen Formula (Target Heart Rate)",formula:"THR = ((HRmax − HRrest) × %Intensity) + HRrest",category:"Training",note:"HRmax commonly estimated as 220 − age. Uses Heart Rate Reserve for individualized zones."},
  {id:"FML-003",name:"Body Mass Index (BMI)",formula:"BMI = Weight (kg) ÷ Height² (m²)",category:"Health",note:"Underweight <18.5 · Normal 18.5-24.9 · Overweight 25-29.9 · Obese ≥30."},
  {id:"FML-004",name:"Basal Metabolic Rate (Harris-Benedict, men)",formula:"BMR = 88.36 + (13.4 × weight kg) + (4.8 × height cm) − (5.7 × age)",category:"Health",note:"Separate formula exists for women; multiplied by activity factor for TDEE."},
  {id:"FML-005",name:"One-Rep Max Estimate (Epley Formula)",formula:"1RM = Weight × (1 + Reps ÷ 30)",category:"Strength Training",note:"Used to estimate maximal strength from a sub-maximal set without testing true 1RM directly."},
  {id:"FML-006",name:"Cardiac Output",formula:"Q (L/min) = Heart Rate × Stroke Volume",category:"Physiology",note:"Resting ~5 L/min; can reach 20-40 L/min at maximal exertion in trained athletes."},
  {id:"FML-007",name:"Estimated Maximum Heart Rate",formula:"HRmax = 220 − Age",category:"Training",note:"A widely used (though approximate) population estimate; individual variation is significant."},
  {id:"FML-008",name:"Power Output",formula:"Power = (Force × Distance) ÷ Time",category:"Biomechanics",note:"Measured in Watts; relevant to jump testing, cycling and Olympic lifting analysis."},
];

// ---- Current Affairs capsules ----
const CURRENT_AFFAIRS = [
  {id:"ca-1",category:"Olympics",date:"2026-08-28",title:"IOC confirms sport additions for LA 2028 Olympic programme",summary:"The International Olympic Committee finalized the addition of new events to the Los Angeles 2028 roster as part of the ongoing push for gender parity and youth appeal.",tags:["IOC","LA2028"]},
  {id:"ca-2",category:"Indian Sports",date:"2026-08-25",title:"Khelo India Youth Games concludes with record participation",summary:"The latest edition of the Khelo India Youth Games saw record state-level participation across athletics, wrestling, and traditional games including Kho-Kho and Kabaddi.",tags:["Khelo India","Indian Sports"]},
  {id:"ca-3",category:"Sports Awards",date:"2026-08-20",title:"Major National Sports Awards announced ahead of National Sports Day",summary:"National Sports Day (29 August, marking Major Dhyan Chand's birth anniversary) saw the announcement of the Khel Ratna, Arjuna, and Dronacharya awardees for the year.",tags:["Awards","National Sports Day"]},
  {id:"ca-4",category:"Asian Games",date:"2026-08-15",title:"Preparations intensify for the next Asian Games cycle",summary:"The Olympic Council of Asia and host organizers continued venue and qualification-pathway announcements for the upcoming Asian Games cycle.",tags:["Asian Games","OCA"]},
  {id:"ca-5",category:"Athletics",date:"2026-08-10",title:"World Athletics updates competition calendar for the season",summary:"World Athletics released updates to the Diamond League and Continental Tour calendar, with implications for Indian athletes' qualification pathways.",tags:["Athletics","World Athletics"]},
  {id:"ca-6",category:"Government Sports Schemes",date:"2026-08-05",title:"TOPS scheme review highlights support for Olympic-bound athletes",summary:"The Target Olympic Podium Scheme (TOPS) under the Sports Authority of India reviewed funding and support structures for athletes preparing for major international events.",tags:["TOPS","SAI","Government Scheme"]},
];

// ---- Previous Year Papers (metadata) ----
const PYQ_PAPERS = [
  {id:"pyq-1",exam:"KVS PGT PE",year:2025,questions:100,duration:120,attempted:0,tag:"Latest"},
  {id:"pyq-2",exam:"KVS PGT PE",year:2023,questions:100,duration:120,attempted:0,tag:""},
  {id:"pyq-3",exam:"KVS PGT PE",year:2021,questions:100,duration:120,attempted:0,tag:""},
  {id:"pyq-4",exam:"UGC NET PE",year:2025,questions:150,duration:180,attempted:0,tag:"Latest"},
  {id:"pyq-5",exam:"UGC NET PE",year:2024,questions:150,duration:180,attempted:0,tag:""},
  {id:"pyq-6",exam:"UGC NET PE",year:2022,questions:150,duration:180,attempted:0,tag:""},
  {id:"pyq-7",exam:"NVS PE",year:2024,questions:150,duration:150,attempted:0,tag:""},
  {id:"pyq-8",exam:"DSSSB PE",year:2023,questions:200,duration:150,attempted:0,tag:""},
  {id:"pyq-9",exam:"State PSC PE",year:2022,questions:120,duration:150,attempted:0,tag:""},
  {id:"pyq-10",exam:"SET PE",year:2025,questions:150,duration:180,attempted:0,tag:"Latest"},
  {id:"pyq-11",exam:"SET PE",year:2023,questions:150,duration:180,attempted:0,tag:""},
  {id:"pyq-12",exam:"CTET PE",year:2025,questions:150,duration:150,attempted:0,tag:"Latest"},
  {id:"pyq-13",exam:"CTET PE",year:2024,questions:150,duration:150,attempted:0,tag:""},
  {id:"pyq-14",exam:"EMRS PE",year:2024,questions:150,duration:150,attempted:0,tag:""},
  {id:"pyq-15",exam:"Sainik School PE",year:2023,questions:150,duration:150,attempted:0,tag:""},
  {id:"pyq-16",exam:"AWES PE",year:2024,questions:100,duration:90,attempted:0,tag:""},
];

// ---- Study Material (notes library) ----
const STUDY_NOTES = [
  {id:"note-1",type:"Short Notes",subject:"Anatomy",title:"Skeletal System — Quick Reference",summary:"Bone count, classification, and joint types condensed into a one-page revision sheet."},
  {id:"note-2",type:"One-Liners",subject:"Olympic Movement",title:"100 Olympic One-Liners",summary:"Founders, host cities, symbols, mottos and India-specific Olympic facts in quick-fire format."},
  {id:"note-3",type:"Formula Sheets",subject:"Test & Measurement",title:"All Fitness-Test Formulas in One Page",summary:"Cooper test, Harvard Step Test, BMI, Karvonen — every formula with worked examples."},
  {id:"note-4",type:"Sports Rules",subject:"Sports Rules",title:"Scoring Systems Across 15 Sports",summary:"Side-by-side comparison of scoring, match duration and player counts across major sports.",},
  {id:"note-5",type:"Yoga Charts",subject:"Yoga",title:"Asana Reference Chart",summary:"Visual-style reference of 25 key asanas with benefits and classification (balance/backbend/forward-fold)."},
  {id:"note-6",type:"Anatomy Diagrams",subject:"Anatomy",title:"Labelled Muscular System Diagram Set",summary:"Anterior and posterior muscle-group diagrams with names and primary actions."},
  {id:"note-7",type:"Physiology Tables",subject:"Physiology",title:"Energy Systems Comparison Table",summary:"ATP-PC vs Glycolytic vs Aerobic systems — duration, fuel, and byproducts side by side."},
  {id:"note-8",type:"Training Methods",subject:"Sports Training",title:"Training Methods At a Glance",summary:"Fartlek, Interval, Continuous, Circuit and Plyometric training compared for exam-ready recall."},
  {id:"note-9",type:"Sports Psychology Concepts",subject:"Sports Psychology",title:"Core Theories Cheat-Sheet",summary:"Inverted-U, Drive Theory, Catastrophe Theory and goal-setting theory summarized with examples."},
  {id:"note-10",type:"Important Facts",subject:"Current Affairs",title:"This Month's Must-Know Sports Facts",summary:"Curated list of the 30 most exam-relevant current-affairs facts from this month's capsule."},
];

// ---- Badges / Gamification ----
const BADGES = [
  {id:"b1",icon:"🏆",name:"PE Master",desc:"Complete 10 full mock tests",earned:true},
  {id:"b2",icon:"🔥",name:"30-Day Streak",desc:"Practice for 30 consecutive days",earned:false},
  {id:"b3",icon:"🎯",name:"90% Accuracy",desc:"Achieve 90%+ accuracy in a mock test",earned:true},
  {id:"b4",icon:"📚",name:"10,000 Questions",desc:"Attempt 10,000 practice questions",earned:false},
  {id:"b5",icon:"⚡",name:"Speed Demon",desc:"Average under 40 sec/question in a mock",earned:true},
  {id:"b6",icon:"🥇",name:"Mock Test Champion",desc:"Rank #1 on a weekly mock leaderboard",earned:false},
  {id:"b7",icon:"🧠",name:"Concept Collector",desc:"Complete 50 'Learn the Concept' modules",earned:true},
  {id:"b8",icon:"🌅",name:"Early Bird",desc:"Complete the Daily Challenge before 8 AM, 10 times",earned:false},
];

// ---- Leaderboard demo rows ----
function makeLeaderboard(seedNames){
  return seedNames.map((n,i)=>({
    rank:i+1, name:n.name, xp: Math.round(12800 - i*310 - (i%3)*40), accuracy: Math.round(94 - i*1.1), streak: Math.max(1, 41 - i*2), tests: Math.max(3, 58 - i*2)
  }));
}
const LEADERBOARD_ALLTIME = makeLeaderboard([
  {name:"Rahul Menon"},{name:"Anjali Sharma"},{name:"Arjun Verma"},{name:"Sneha Reddy"},{name:"Vikram Singh"},
  {name:"Pooja Nair"},{name:"Karthik Iyer"},{name:"Divya Pillai"},{name:"Rohit Yadav"},{name:"Meera Joshi"},
  {name:"You"},{name:"Aman Gupta"},{name:"Priya Das"},{name:"Suresh Kumar"},{name:"Neha Kapoor"}
]);
