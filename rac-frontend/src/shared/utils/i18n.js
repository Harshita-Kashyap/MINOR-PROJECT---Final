import i18n from "i18next";
import { initReactI18next } from "react-i18next";

/* ---------------------------------------------
   BRAND CONSTANTS
--------------------------------------------- */
const brandEn = {
  rac: "RAC",
  drdo: "DRDO",
  racFull: "Recruitment & Assessment Centre",
  drdoFull: "Defence Research and Development Organisation",
};

const brandHi = {
  rac: "RAC",
  drdo: "DRDO",
  racFull: "भर्ती एवं मूल्यांकन केंद्र",
  drdoFull: "रक्षा अनुसंधान एवं विकास संगठन",
};

/* ---------------------------------------------
   ENGLISH TRANSLATIONS
--------------------------------------------- */
const enCommon = {
  ...brandEn,

  login: "Login",
  logout: "Logout",
  register: "Register",
  registering: "Registering...",
  vacancies: "Vacancies",
  notices: "Notices",
  disclaimer: "Disclaimer",
  disclaimerText: "This is official RAC website. Avoid fake portals.",
  search: "Search vacancies...",
  applyNow: "Apply Now",
  viewAd: "View Advertisement",
  activeAds: "Active Advertisements",
  view: "View",
  hide: "Hide",
  eligibility: "Eligibility",
  selection: "Selection",
  latest: "Latest",
  status: "Status",
  dates: "Dates",
  queryStatus: "Query Status",
  interviewSchedule: "Interview schedule released",
  resultsDeclared: "Final results declared",
  home: "Home",
  about: "About RAC",
  programmes: "Programmes",
  careerOpportunity: "Career Opportunity",
  drds: "DRDS",
  faqs: "FAQs",
  grahpatrika: "Grihpatrika",
  deadline: "Deadline",

  tableNo: "No.",
  tableName: "Name",
  tableFrom: "From",
  tableTo: "To",

  grade: "Grade",
  levelInPayMatrix: "Level in Pay Matrix",
  initialPay: "Initial Pay in Pay Matrix ₹",
};

const enLanding = {
  heroTitle: "Recruitment of Scientist ‘B’ in DRDO",
  heroSubtitle: "Direct recruitment for various scientific disciplines",
  videoText: "DRDO Recruitment Process",

  headerTitle: `${brandEn.racFull}, ${brandEn.drdo}`,
  headerLine1: "Department of Defence Research & Development",
  headerLine2: "Ministry of Defence, Government of India",
  headerIso: "An ISO 9001 Certified Establishment",

  navAboutRac: "About RAC",
  navProgrammes: "Programmes",
  navCareer: "Career Opportunity",

  dropdownAboutTitle: "About RAC",
  dropdownChairman: "Chairman",
  dropdownDirector: "Director",
  dropdownApproach: "Our Approach",
  dropdownAboutUs: "About Us",
  dropdownProgrammesTitle: "Programmes",
  dropdownRecruitment: "Recruitment",
  dropdownAssessment: "Assessment",
  dropdownSelectionPg: "Selection for PG",
  dropdownLdce: "LDCE",
  dropdownCareerTitle: "Career Opportunity",
  dropdownLateral: "Lateral Entry",
  dropdownDirectRecruitment: "Direct Recruitment",

  leftVideoPlaceholder: "Video Placeholder",
  leftVideoSubtext: "Add RAC overview video here",
  leftDisclaimerIntro:
    "This is an educational project and is not the official RAC website.",
  leftDisclaimerP1:
    "URL https://rac.gov.in is the official website of the Recruitment & Assessment Centre (RAC).",
  leftDisclaimerP2:
    "Please be aware that unauthorized websites may mislead users while displaying https://rac.gov.in as a hyperlink that redirects to their own web pages.",
  leftDisclaimerP3:
    "RAC shall not be responsible for any misinformation arising out of the use, reference to, or reliance on any information contained in any fake hyperlink or website operating in its name.",
  leftDisclaimerP4:
    "For authentic and up-to-date information on DRDO recruitments, as issued by RAC, please visit the official RAC website by typing https://rac.gov.in directly in the browser address bar.",

  centerViewAll: "View All",
  centerGeneralInfoTitle: "General Information",
  centerGeneralInfoSub: "Important guidance for applicants and students",
  centerImportant: "Important",
  centerInfo1:
    "For latest updates, applicants are requested to visit this website at least twice a week.",
  centerInfo2:
    "All advertisements for inviting applications for Junior Research Fellowships and Apprenticeship positions are regularly posted on the DRDO website https://drdo.gov.in.",
  centerInfo3:
    "RAC will not be addressing Junior Research Fellowship, Apprenticeship and Student Internship requests or queries. Students requesting Junior Research Fellowship, Apprenticeship or Internship are advised to visit the DRDO website https://drdo.gov.in for the guidelines.",
  centerInfo4:
    "For the Direct Recruitment to the post of Scientist B in DRDO, candidates are required to possess a valid GATE score in the relevant discipline for which GATE is conducted, including the disciplines of Engineering Sciences, Life Sciences, and Humanities & Social Sciences.",

  adTitle: "Junior Research Fellow (JRF)",
  adEligibility: "B.Tech / M.Tech",
  adSelection: "Interview",
  adStatus: "Open",

  rightPublicNotice: "Public Notice",
  rightPublishedOn: "Published on:",
  rightLastUpdated: "Last updated on:",
  rightClosingDate: "Closing date:",
  rightLatestTab: "Latest",
  rightStatusTab: "Status",
  rightNoticesTab: "Notices",
  rightQueryStatusTab: "Query Status",
  rightNoticeText:
    "Requirement of Valid GATE Score for Direct Recruitment of Scientist 'B' in DRDO",
  rightStatusText:
    "Application status and latest recruitment-related updates will appear here.",
  rightNoticesText:
    "Important notices, corrigendums, and public announcements will appear here.",
  rightQueryText: "Candidate query status information will appear here.",
  rightTentativeSchedule: "Tentative Schedule",
  rightCheckUpdates: "Check latest updates",
  rightAdvertisement: "Advertisement",
  rightFaq: "FAQ",
  rightPayEquivalence: "Pay Equivalence Criteria",
  rightAdv156: "Advertisement No. 156",
  rightAdv152: "Advertisement No. 152",
  rightAdv154: "Advertisement No. 154",
  rightAdv156Title:
    "Direct Recruitment for the posts of Scientist ‘B’ in DRDO & other establishments of Ministry of Defence",
  rightAdv152Title:
    "RAC invites applications for Scientist posts in the DRDS cadre of DRDO.",
  rightAdv154Title:
    "Recruitment of Project Scientists on Contractual Basis for DRDO, Hyderabad.",
  rightAdv156Btn3:
    "Addendum to Advt. no. 156 : Notice / Addendum Post Induction Training for Selected Candidates",
  rightAdv156Btn4:
    "Addendum to Advt. no. 156 : Additional Information on 3 posts under Department of Science & Technology",
  rightAdv156Closing:
    "04 July 2025 (16:00 hrs. IST). The closing date for receiving applications is extended up to 08 August 2025 (16:00 Hrs). Candidates pursuing their degrees can also upload their final semester results by 08 August 2025.",
  rightAdv152Closing:
    "09 May 2025 (16:00 hrs. IST). Extended upto 16-May-2025 (16:00 hrs. IST).",
  rightAdv154Closing:
    "01 April 2025. Extended upto 03-April-2025 (16:00 hrs. IST).",
};

const enAuth = {
  authPortalSub: "Recruitment & Assessment Portal",
  authMainTitle: "Recruitment & Assessment Centre",
  authMainLine1: "Department of Defence Research & Development",
  authMainLine2: "Ministry of Defence, Government of India",
  authDescription:
    "Access recruitment-related information, sign in securely, and continue your application process through a structured and user-friendly portal.",
  authSupportTitle: "Registration Support",
  authSupportText:
    "For registration-related issues or corrections (Date of Birth, Mobile Number, Email, etc.), please contact:",
  authCertificates: "Certificates & Declaration Formats",
  authFooter: "© 2026 RAC-DRDO, Govt. of India. All Rights Reserved.",

  loginTitle: "Login",
  loginSelectMethod: "Select Login Method",
  loginMethodEmail: "Email",
  loginMethodMobile: "Mobile",
  loginMethodIdentity: "Identity",
  mobileNumber: "Mobile Number",
  email: "Email",
  password: "Password",
  enterCaptcha: "Enter Captcha",
  noAccount: "Don’t have an account?",
  alreadyAccount: "Already have an account?",
  createApplicantAccount: "Create your applicant account",
  fullName: "Full Name",
  identityDetails: "Identity Details",
  confirmPassword: "Confirm Password",
  show: "Show",
  refresh: "Refresh",
  captchaLabel: "CAPTCHA",

  dob: "Date of Birth",
  rollNumber10: "10th Roll Number",
  passingYear10: "10th Passing Year",
};

const enAbout = {
  aboutUsTitle: "About Us",
  aboutP1:
    "RAC, the Recruitment and Assessment Centre of DRDO was set up on 23 July 1985 after getting exemption from the purview of Union Public Service Commission (UPSC). It is situated at Lucknow Road, Timarpur, Delhi.",
  aboutP2:
    "RAC has undertaken various recruitment programmes to induct scientists each year in variety of scientific and engineering disciplines relevant to DRDO Laboratories and assessed the suitability of DRDO scientists for promotion to next higher grade through duly constituted Assessment Boards/Peer Committee.",
  aboutPrimaryResp: "The primary responsibilities of RAC",
  aboutLi1:
    "Recruitment of Scientists (Group 'A' Class I Gazetted Post) in DRDO",
  aboutLi2:
    "Assessments of Scientists of DRDO for promotion to the next higher grades",
  aboutLi3:
    "Selection of candidates for higher study course (ME/ M. Tech/ MSc Engg) under Research & Training Scheme of DRDO and Post Graduate Training scheme of Army, Navy and Air Force",
  aboutLi4:
    "Any other assignment specified by Secretary, Department of Defence R&D and Chairman, DRDO",
};

const enChairman = {
  chairmanTitle: "Chairman",
  briefProfile: "Brief Profile",
  formerChairmen: "Former Chairmen",
  chairmanP1:
    "Dr. Samir V Kamat, Secretary, Department of Defence Research & Development (DDR&D) and Chairperson DRDO has been entrusted with the additional charge of the post of Chairman RAC with effect from 13-Jun-2025.",
  chairmanP2:
    "Recruitment and Assessment Centre (RAC) is the corporate body of DRDO that manages scientific recruitment, assessment activities, and related manpower functions for technical and research roles.",
  chairmanP3:
    "Under the leadership of the Chairman, RAC supports transparent, merit-based, and efficient selection processes for various scientific and technical positions.",
  formerChairmenText:
    "Information about former Chairmen can be added here in list form.",
};

const enDirector = {
  directorTitle: "Director",
  formerDirector: "Former Director",
  directorP1:
    "Smt. KV Prabha, Scientist H took over as Director RAC on 1st Mar 2023. She is a post graduate in Computer Science and MPhil in Computer Science with Data Mining as specialization.",
  directorP2:
    "She has undergone training in Advanced Leadership courses in IIM(A) and ASCI. She joined DRDO in the year 1990 at DRDL Hyderabad and has extensively contributed to knowledge management initiatives and institutional development.",
  directorP3:
    "She has contributed to various non-IT and IT initiatives such as knowledge sharing platforms, surveys, technical forums, document management systems, and innovation programs across DRDO labs.",
  directorP4:
    "She played a major role in process re-engineering and implementation of workflow-based approvals, improving efficiency in project execution, procurement, testing, and administration.",
  directorP5:
    "She also led initiatives for cluster-level online clearances, monitoring systems, and has experience in ISO, CMMI, and Information Security Management Systems.",
  directorP6:
    "At RAC, she has established modern infrastructure including data centers, structured LAN systems, and has contributed to recruitment automation using AI-based systems.",
  directorP7:
    "She has received recognition including National Science Day award for her contributions.",
  formerDirectorText: "List of former Directors can be added here.",
};

const enApproach = {
  approachTitle: "Our Approach",
  vision: "Vision",
  mission: "Mission",
  motto: "Motto",
  qualityPolicy: "Quality Policy",
  qualityObjectives: "Quality Objectives",
  visionIntro: "To become a centre of excellence and",
  missionIntro: "To realise the vision by",
  visionLi1: "Provider of Quality deliverables in stipulated functional domains",
  visionLi2: "Generator of new knowledge in Scientific Performance Measurement",
  visionLi3:
    "Trainer to create a seamless community of HRD practitioners in advanced selection techniques",
  missionLi1: "Adopting highly professional approach in our job execution",
  missionLi2: "Acquiring state of art capabilities and facilities",
  missionLi3: "Strengthening our knowledge generation competencies through R&D",
  missionLi4: "Nurturing total quality management culture",
  missionLi5: "Establishing strategic linkage with the world's best agencies",
  mottoLi1: "Acting with Accuracy, Confidentiality and Timeliness",
  qualityPolicyIntro:
    "We are committed to provide quality services to DRDO in terms of smooth execution, timely completion and delivery of output for:",
  qualityPolicyLi1: "Recruitment of Scientists",
  qualityPolicyLi2:
    "Assessment of Scientists for promotion to the next higher grades",
  qualityPolicyLi3:
    "Selection of candidates for Research & Training scheme of DRDO and Post Graduate Training scheme of Indian Armed Forces",
  qualityPolicyEnd:
    "We are also committed to effect Continual Improvement in our services for the enhanced customer satisfaction",
  qualityObjectivesLi1:
    "To accomplish Recruitments and Assessments within the stipulated period as defined by HQ or estimated by RAC",
  qualityObjectivesLi2:
    "To enhance the customer satisfaction in providing the recruitment and assessment services by maintaining Customer Satisfaction Index more than 80%",
  qualityObjectivesLi3: "To minimise & rectify the customer complaints",
};

const enDrds = {
  drdsTitle: "DRDS (Defence Research and Development Services)",
  drdsIntro:
    "In pursuit of self-reliance in critical technologies relevant to national security, DRDO formulates and executes programmes of scientific research, design, development, testing and evaluation of various systems, subsystems, devices and products required for defence of the nation. DRDO employs highly qualified and competent scientists and technologists who constitute the Group 'A' (Class I Gazetted) Service known as Defence Research & Development Service (DRDS). The emoluments of DRDS Scientists as per 7th Central Pay Commission are as given below in INR:",
  salientFeatures: "Salient features of DRDS",
  drdsP1:
    "DRDO takes utmost care of the career-advancement of its scientists and operates a merit based promotion scheme under Flexible Complementing Scheme (FCS) upto the level of Scientist 'H' which means that with each promotion is based purely on merit basis of the scientist in the assessment board/ Peer Committee.",
  drdsP2:
    "In addition to the Basic Pay, DRDS scientists are entitled to get House Rent Allowance upto 24% of Basic Pay in case of non-availability of Government accommodation and other allowances viz, DA, Transport Allowance with DA on it etc. as admissible to Central Government employees.",
  drdsP3:
    "Perquisites like Leave Travel Concession, Medical facilities, Advances for PCs/ House Building are also admissible. Professional update allowance of Rs 22,500/- (for Scientist 'B', 'C' and 'D'), Rs 45,000/- (for Scientist 'E' and Scientist 'F') Rs 67,500/- (for Scientist G onwards) per annum and reimbursement of expenditures on newspapers/periodicals also admissible in accordance with provisions of relevant Rules.",
  higherQualificationTraining: "Facility for Higher Qualification & Training",
  drdsP4:
    "DRDO not only offers employment but also lays emphasis on Human Resource Development. DRDO trains its personnel at training institutions in Pune (DIAT) and Mussoorie (ITM) and also at prestigious academic institutions viz, IITs, IISc Bangalore etc. for acquiring higher educational qualifications. Opportunities also arise for foreign deputations for training/presentation of papers/specific assignments.",
};

const enFaq = {
  faqTitle: "Frequently Asked Questions",
  faqIntro:
    "Find quick answers related to RAC, DRDO scientific recruitment, eligibility, application process, qualifications, and interview requirements.",
};

const enRecruitment = {
  recruitmentTitle: "Recruitment",
  recruitmentP1:
    "Every year RAC recruits Scientists in DRDS mostly at entry level (Scientist 'B'). However, depending on the requirements in specialized areas of research & development, limited number of scientists are also recruited in higher grades (Scientist 'C' to Scientist 'H').",
  recruitmentP2:
    "One of additional responsibilities of RAC includes the induction of Project Engineers on contract basis and Scientists / Engineers on regular basis for various Grades for ADA (Aeronautical Development Agency). ADA, Department of Defence R&D is the nodal agency for the design & development of LCA. RAC also assess the suitability of ADA scientists / engineers for promotion to next higher grade through duly constituted Assessment Boards.",
  recruitmentP3: "For more information visit",
  recruitmentAdaLink: "ADA website www.ada.gov.in",
  recruitmentSection1:
    "Induction of Scientists in Science/ Engineering category",
  recruitmentEssentialQualifications: "Essential Qualifications",
  recruitmentS1Li1:
    "At least first class Master's Degree in Science Subjects, Mathematics or Psychology or First Class Bachelor's Degree in Engineering or Technology or Metallurgy from a recognised University or equivalent.",
  recruitmentS1Li2:
    "Experience of at least 3 years for Scientist 'C', 7 years for Scientist 'D', 10 years for Scientist 'E', 13 years for Scientist 'F' and 15 years for Scientist 'G'/Scientist 'H' in research/ design/ development or production in the required area.",
  recruitmentDesirableQualifications: "Desirable qualifications",
  recruitmentS1Li3: "Knowledge of Chinese, French, German, Japanese or Russian",
  recruitmentS1Li4:
    "Doctorate degree in Science, Mathematics or Psychology or Master's degree in Engineering or Technology or Metallurgy in the subject concerned (applicable for Scientist 'C' & above).",
  recruitmentClickHere:
    "Click here to know the list of recognised universities or equivalent as per AICTE guidelines",
  recruitmentSource: "(Source: AICTE website)",
  recruitmentSection2:
    "Induction of Scientists in Medical/ Veterinary Science category",
  recruitmentMedicalEssential: "Essential qualifications",
  recruitmentS2Li1:
    "A medical qualification included in the First Schedule or the Second Schedule or Part II of the Third Schedule to the Indian Medical Council Act, 1956 (102 of 1956). Holders of medical qualifications included in the Part II of the said Third Schedule should also fulfill the conditions specified in Sub-section (3) of Section 13 of the said Act.",
  recruitmentOr: "Or",
  recruitmentS2Li2:
    "A dental qualification included in the Part I, Part II or Part III of the Schedule to the Dentist Act, 1948 (16 of 1948).",
  recruitmentS2Li3:
    "A Bachelor's Degree in Veterinary Science & Animal Husbandry (BVSc&AH) duly recognised by Veterinary Council of India.",
  recruitmentS2Li4: "Completion of compulsory rotating Internship.",
  recruitmentS2Li5:
    "Post-graduate degree and (applicable for Scientist 'C' & above) experience of at least 3 years for Scientist 'C', 7 years for Scientist 'D', 10 years for Scientist 'E', 13 years for Scientist 'F' and 15 years for Scientist 'G'/Scientist 'H' in practical & administrative field and also in the required field of medical relief, medical research, medical education or public health organisation.",
  recruitmentAgeLimit: "Age Limit",
  recruitmentAge1: "For Scientist 'B': not exceeding 28 years",
  recruitmentAge2: "For Scientist 'C': not exceeding 35 years",
  recruitmentAge3: "For Scientist 'D' and Scientist 'E': not exceeding 45 years",
  recruitmentAge4: "For Scientist 'F' and 'G': not exceeding 50 years.",
  recruitmentAge5: "For Scientist 'H': not exceeding 54 years.",
  recruitmentAgeNote:
    "The upper age limit is relaxable upto 5 years in case of Scheduled Caste/ Scheduled Tribe candidates and 3 years for Other Backward Communities (OBC) against the post reserved for them. Relaxation of age for candidates in regular service of Central / Union Territory is as per rules in vogue. The upper age limit in addition to above is also relaxable by 5 yrs. for persons with disability in identical disciplines whether the posts are reserved for them or not. The offer of appointment is subject to verification of requisite certificates and medical fitness required for Group 'A' (Class I Gazetted) technical posts of Government of India with field service liability.",
};

const enAssessment = {
  assessmentTitle: "Assessment",
  assessmentP1:
    "Assessment Boards for promotion of DRDS Scientists in the grades 'B'/'C'/'D'/'E' to next higher grade are held during mid April to mid June at locations of major concentration of DRDO Labs/ Estts. viz Bangalore, Delhi, Hyderabad, and Pune. Depending on number of candidates in different disciplines, the interviews may be conducted at other locations also viz Balasore, Chandigarh and Dehradun. In Delhi, interview boards are conducted at RAC.",
  assessmentP2:
    "The Assessment Boards are chaired by Chairman RAC or a Co-Chairperson from a panel which consists of reputed Scientists & Technologists. The Core Committee constitutes a Chairperson, two Core Members and the other members includes a Departmental Expert and two External Experts from the Subject. Normally, one External Expert of the Subject is from an academic institution and the other one from a scientific institution engaged in activities similar to DRDO, to assess both academic foundation as well as applied research & development. For each candidate Director of the Lab or his Representative is also the Member of the Assessment Board and SC/ ST rep is co-opted on requirement basis.",
  assessmentProcedure: "Procedure for Interview",
  assessmentProc1:
    "The Lab Director is requested by the Chairperson to brief the Board on the type of responsibilities entrusted to the candidate and the contributions made by the Scientist appearing in the interview. The board is supposed to interview the Scientist in the discipline indicated for assessment in the APAR.",
  assessmentProc2:
    "After the Scientist enters the Board Room, the Chairperson reviews the Bio-data, and then invites the Scientist to make a brief presentation (10-15 minutes) of the achievements and the future plans of action. The Scientist is required to highlight only personal contributions and achievements. After the presentation all the members of the Board are requested to interact with the Scientist turn-wise.",
  assessmentProc3:
    "The Assessment Board, which consists of carefully selected Departmental and External Experts can help converge to a satisfactory judgment. There are some situations in which the Assessment Boards take adequate precaution to arrive at a decision e.g.",
  assessmentLi1:
    "In a joint project, the contribution of the individual has to be clearly identified. An individual may have done very little in a highly successful and prestigious project.",
  assessmentLi2:
    "Some candidates are good speakers and excellent presenters. Other are not so well endowed. The gift of good oration should not overshadow the real merit of the candidate.",
  assessmentProc4:
    "If the overall caliber of the Scientist as judged by the Assessment Board matches with the prescribed qualifying marks required for the current residency period, the candidate is recommended as 'Fit For Promotion'. Otherwise the recommendation is 'Not Yet Fit For Promotion'.",
  assessmentProc5:
    "Hindi may be used as a medium at the interview if desired by the candidate.",
  assessmentPeerReview: "Peer Review",
  assessmentPeer1:
    "The promotion of DRDS Scientists in the grades 'F' to 'G' and 'G' to 'H' is made w.e.f. 1st July under the Flexible Complementing scheme (FCS) on the basis of the evaluation of their Annual Performance Assessment Report (APAR) by the Internal Screening Committee and assessment by the Peer committee.",
  assessmentPeer2:
    "The minimum residency period is five years as on 30 June of the year to which assessment pertains. Relaxation up to three months in qualifying service is given to those who joined after 01 July due to reasons beyond their control. Relaxation of one year residency period is granted to Scientists 'F' who have been consistently assessed as \"Exceptionally Brilliant\" having secured 90% or above marks in four successive CPARs.",
  assessmentPeer3:
    "The Peer committee takes holistic view of the contributions made by the Scientists in the present grade and evaluates attributes such as quality of scientific R & D activity, timely completion of tasks assigned, management ability and leadership quality, motivation in facing challenges, dedication to work, potential for undertaking higher responsibility and areas of strength.",
  assessmentPeer4:
    "Peer Committee may also recommend the special pay of Rs. 4000/- per month to Scientists 'F' recommended for promotion to Scientists 'G'.",
  assessmentPeer5:
    "The same Peer Committee shall assess the Scientists 'G' for promotion to the post of Scientist 'H' (Outstanding Scientist) who have completed 3 years regular service in the Grade and have been recommended by ISC, based on merit, achievements, leadership and managerial qualities. The Same Committee will also recommend conferring the Grade of Distinguished Scientists.",
};

const enSelectionPg = {
  selectionPgTitle:
    "Selection for DRDO Employees and Service Officers of Armed Forces for Sponsored Post-Graduate Courses",
  selectionPgP1:
    "Selection of DRDO Employees to be sponsored by DRDO for pursuing ME/ MTech under the Research & Training (R&T) scheme of DRDO is carried out through RAC. The number of vacancies in different disciplines against various institutes/universities where ME/ MTech courses are sponsored, are announced for every academic year.",
  selectionPgP2:
    "Applicants from DRDO who are meeting eligibility criteria and other terms and conditions (as applicable), are selected for the course through an interview process by duly constituted Interview Board for that particular year.",
  selectionPgP3:
    "Similarly, RAC also conducts interviews for selection of candidates for ME/ MTech courses under Post Graduate Training (PGT) Scheme for Army, Navy and Air Force Personnel.",
  selectionPgP4:
    "The interviews for R&T and PGT Scheme are conducted during April/ May, every year.",
};

const enLdce = {
  ldceTitle: "Limited Departmental Competitive Examination (LDCE)",
  ldceP1:
    "RAC conducts LDCE for entry to Defence Research & Development Service (DRDS) as Scientist 'B'. Any person holding the post of Technical Officers 'A' or Technical Officers 'B' and having five years regular service and other technical personnel in the lower grades with ten years regular service in DRDO and possessing the educational qualifications prescribed for the post of Scientist 'B' in Schedule-III of DRDS Rules shall be eligible to appear at the said examination for which there shall be no upper age limit. Unless otherwise specified by the Government in this behalf, no candidate shall be allowed to avail of more than five chances at the said departmental examination.",
};

const enLateral = {
  lateralTitle: "Lateral Entry",
  lateralP1:
    "Recruitment of Scientists in middle & senior grades (Scientist 'C' to Scientist 'H') based on qualification and experience in specialized fields relevant to DRDO is covered under this category of recruitment.",
  lateralP2:
    "RAC issues advertisement from time to time through RAC and DRDO websites & \"The Employment News\" to meet the requirement of scientific manpower having specialized experience in areas of interest to DRDO.",
};

const enDirectRecruitment = {
  directRecruitmentTitle: "Direct Recruitment",
  directRecruitmentP1:
    "The advertisement also includes Scientist 'B' posts in scientific and engineering subjects of relevance to DRDO, which are not covered under Scientist Entry Test (SET). These advertisements are issued during the second and last quarter of the calendar year.",
  directRecruitmentP2:
    "The candidates under this category of selection need not have to appear for the written test. The candidates are short-listed for interview based on their GATE Score. The selection of scientists is based on their performance ranking in the selection interviews.",
};

const enTranslation = {
  ...enCommon,
  ...enLanding,
  ...enAuth,
  ...enAbout,
  ...enChairman,
  ...enDirector,
  ...enApproach,
  ...enDrds,
  ...enFaq,
  ...enRecruitment,
  ...enAssessment,
  ...enSelectionPg,
  ...enLdce,
  ...enLateral,
  ...enDirectRecruitment,
};

/* ---------------------------------------------
   HINDI TRANSLATIONS
--------------------------------------------- */
const hiCommon = {
  ...brandHi,

  login: "लॉगिन",
  logout: "लॉगआउट",
  register: "रजिस्टर",
  registering: "रजिस्टर किया जा रहा है...",
  vacancies: "रिक्तियां",
  notices: "सूचनाएं",
  disclaimer: "अस्वीकरण",
  disclaimerText: "यह आधिकारिक RAC वेबसाइट है। फर्जी पोर्टल से बचें।",
  search: "रिक्तियां खोजें...",
  applyNow: "अभी आवेदन करें",
  viewAd: "विज्ञापन देखें",
  activeAds: "सक्रिय विज्ञापन",
  view: "देखें",
  hide: "छिपाएं",
  eligibility: "पात्रता",
  selection: "चयन प्रक्रिया",
  latest: "नवीनतम",
  status: "स्थिति",
  dates: "तिथियां",
  queryStatus: "प्रश्न स्थिति",
  interviewSchedule: "साक्षात्कार कार्यक्रम जारी",
  resultsDeclared: "अंतिम परिणाम घोषित",
  home: "होम",
  about: "RAC के बारे में",
  programmes: "कार्यक्रम",
  careerOpportunity: "कैरियर अवसर",
  drds: "DRDS",
  faqs: "अक्सर पूछे जाने वाले प्रश्न",
  grahpatrika: "गृहपत्रिका",
  deadline: "अंतिम तिथि",

  tableNo: "क्र.",
  tableName: "नाम",
  tableFrom: "से",
  tableTo: "तक",

  grade: "ग्रेड",
  levelInPayMatrix: "वेतन मैट्रिक्स स्तर",
  initialPay: "वेतन मैट्रिक्स में प्रारंभिक वेतन ₹",
};

const hiLanding = {
  heroTitle: "DRDO में वैज्ञानिक ‘B’ की भर्ती",
  heroSubtitle: "विभिन्न वैज्ञानिक विषयों में सीधी भर्ती",
  videoText: "DRDO भर्ती प्रक्रिया",

  headerTitle: `${brandHi.racFull}, ${brandHi.drdo}`,
  headerLine1: "रक्षा अनुसंधान एवं विकास विभाग",
  headerLine2: "रक्षा मंत्रालय, भारत सरकार",
  headerIso: "आईएसओ 9001 प्रमाणित प्रतिष्ठान",

  navAboutRac: "RAC के बारे में",
  navProgrammes: "कार्यक्रम",
  navCareer: "कैरियर अवसर",

  dropdownAboutTitle: "RAC के बारे में",
  dropdownChairman: "अध्यक्ष",
  dropdownDirector: "निदेशक",
  dropdownApproach: "हमारा दृष्टिकोण",
  dropdownAboutUs: "हमारे बारे में",
  dropdownProgrammesTitle: "कार्यक्रम",
  dropdownRecruitment: "भर्ती",
  dropdownAssessment: "मूल्यांकन",
  dropdownSelectionPg: "पीजी हेतु चयन",
  dropdownLdce: "एलडीसीई",
  dropdownCareerTitle: "कैरियर अवसर",
  dropdownLateral: "पार्श्व प्रवेश",
  dropdownDirectRecruitment: "सीधी भर्ती",

  leftVideoPlaceholder: "वीडियो स्थान",
  leftVideoSubtext: "यहाँ RAC परिचय वीडियो जोड़ें",
  leftDisclaimerIntro:
    "यह एक शैक्षणिक परियोजना है और आधिकारिक RAC वेबसाइट नहीं है।",
  leftDisclaimerP1:
    "URL https://rac.gov.in भर्ती एवं मूल्यांकन केंद्र (RAC) की आधिकारिक वेबसाइट है।",
  leftDisclaimerP2:
    "कृपया सावधान रहें कि अनधिकृत वेबसाइटें https://rac.gov.in को हाइपरलिंक के रूप में दिखाकर अपने पृष्ठों पर ले जा सकती हैं।",
  leftDisclaimerP3:
    "RAC अपने नाम से चलने वाली किसी भी नकली वेबसाइट या भ्रामक हाइपरलिंक की सामग्री पर आधारित गलत जानकारी के लिए जिम्मेदार नहीं होगा।",
  leftDisclaimerP4:
    "DRDO भर्ती से संबंधित प्रामाणिक और नवीनतम जानकारी के लिए कृपया ब्राउज़र के एड्रेस बार में सीधे https://rac.gov.in टाइप करें।",

  centerViewAll: "सभी देखें",
  centerGeneralInfoTitle: "सामान्य जानकारी",
  centerGeneralInfoSub: "आवेदकों और विद्यार्थियों के लिए महत्वपूर्ण मार्गदर्शन",
  centerImportant: "महत्वपूर्ण",
  centerInfo1:
    "नवीनतम अपडेट के लिए आवेदकों से अनुरोध है कि वे इस वेबसाइट को सप्ताह में कम से कम दो बार देखें।",
  centerInfo2:
    "जूनियर रिसर्च फेलोशिप और अप्रेंटिसशिप पदों के लिए सभी विज्ञापन नियमित रूप से DRDO वेबसाइट https://drdo.gov.in पर प्रकाशित किए जाते हैं।",
  centerInfo3:
    "RAC जूनियर रिसर्च फेलोशिप, अप्रेंटिसशिप और छात्र इंटर्नशिप से जुड़े अनुरोधों या प्रश्नों का उत्तर नहीं देगा। विद्यार्थी संबंधित दिशा-निर्देशों के लिए https://drdo.gov.in देखें।",
  centerInfo4:
    "DRDO में वैज्ञानिक B के पद हेतु सीधी भर्ती के लिए अभ्यर्थियों के पास संबंधित विषय में वैध GATE स्कोर होना आवश्यक है, जिसमें इंजीनियरिंग साइंसेज, लाइफ साइंसेज और ह्यूमैनिटीज एंड सोशल साइंसेज शामिल हैं।",

  adTitle: "जूनियर रिसर्च फेलो (JRF)",
  adEligibility: "बी.टेक / एम.टेक",
  adSelection: "साक्षात्कार",
  adStatus: "खुला",

  rightPublicNotice: "सार्वजनिक सूचना",
  rightPublishedOn: "प्रकाशित दिनांक:",
  rightLastUpdated: "अंतिम अद्यतन:",
  rightClosingDate: "अंतिम तिथि:",
  rightLatestTab: "नवीनतम",
  rightStatusTab: "स्थिति",
  rightNoticesTab: "सूचनाएं",
  rightQueryStatusTab: "प्रश्न स्थिति",
  rightNoticeText:
    "DRDO में वैज्ञानिक 'B' की सीधी भर्ती हेतु वैध GATE स्कोर की आवश्यकता",
  rightStatusText:
    "आवेदन स्थिति और नवीनतम भर्ती संबंधी अपडेट यहाँ दिखाई देंगे।",
  rightNoticesText:
    "महत्वपूर्ण सूचनाएं, संशोधन और सार्वजनिक घोषणाएं यहाँ दिखाई देंगी।",
  rightQueryText: "उम्मीदवार प्रश्न स्थिति संबंधी जानकारी यहाँ दिखाई देगी।",
  rightTentativeSchedule: "संभावित समय-सारणी",
  rightCheckUpdates: "नवीनतम अपडेट देखें",
  rightAdvertisement: "विज्ञापन",
  rightFaq: "FAQ",
  rightPayEquivalence: "वेतन समकक्षता मानदंड",
  rightAdv156: "विज्ञापन संख्या 156",
  rightAdv152: "विज्ञापन संख्या 152",
  rightAdv154: "विज्ञापन संख्या 154",
  rightAdv156Title:
    "रक्षा मंत्रालय के अधीन DRDO एवं अन्य प्रतिष्ठानों में वैज्ञानिक ‘B’ पदों हेतु सीधी भर्ती",
  rightAdv152Title:
    "RAC द्वारा DRDO के DRDS संवर्ग में वैज्ञानिक पदों हेतु आवेदन आमंत्रित किए जाते हैं।",
  rightAdv154Title:
    "DRDO, हैदराबाद के लिए संविदा आधार पर प्रोजेक्ट वैज्ञानिकों की भर्ती।",
  rightAdv156Btn3:
    "विज्ञापन संख्या 156 हेतु परिशिष्ट : चयनित अभ्यर्थियों के प्रशिक्षण पश्चात सूचना / परिशिष्ट",
  rightAdv156Btn4:
    "विज्ञापन संख्या 156 हेतु परिशिष्ट : विज्ञान एवं प्रौद्योगिकी विभाग के अंतर्गत 3 पदों पर अतिरिक्त जानकारी",
  rightAdv156Closing:
    "04 जुलाई 2025 (16:00 बजे IST)। आवेदन प्राप्त करने की अंतिम तिथि बढ़ाकर 08 अगस्त 2025 (16:00 बजे) कर दी गई है। डिग्री कर रहे अभ्यर्थी 08 अगस्त 2025 तक अंतिम सेमेस्टर के परिणाम भी अपलोड कर सकते हैं।",
  rightAdv152Closing:
    "09 मई 2025 (16:00 बजे IST)। बढ़ाकर 16-मई-2025 (16:00 बजे IST) तक।",
  rightAdv154Closing:
    "01 अप्रैल 2025। बढ़ाकर 03-अप्रैल-2025 (16:00 बजे IST) तक।",
};

const hiAuth = {
  authPortalSub: "भर्ती एवं मूल्यांकन पोर्टल",
  authMainTitle: "भर्ती एवं मूल्यांकन केंद्र",
  authMainLine1: "रक्षा अनुसंधान एवं विकास विभाग",
  authMainLine2: "रक्षा मंत्रालय, भारत सरकार",
  authDescription:
    "भर्ती संबंधी जानकारी प्राप्त करें, सुरक्षित रूप से साइन इन करें, और एक व्यवस्थित एवं उपयोगकर्ता-अनुकूल पोर्टल के माध्यम से अपनी आवेदन प्रक्रिया जारी रखें।",
  authSupportTitle: "पंजीकरण सहायता",
  authSupportText:
    "पंजीकरण से संबंधित समस्याओं या सुधारों (जन्मतिथि, मोबाइल नंबर, ईमेल आदि) के लिए कृपया संपर्क करें:",
  authCertificates: "प्रमाणपत्र एवं घोषणा प्रारूप",
  authFooter: "© 2026 RAC-DRDO, भारत सरकार। सर्वाधिकार सुरक्षित।",

  loginTitle: "लॉगिन",
  loginSelectMethod: "लॉगिन विधि चुनें",
  loginMethodEmail: "ईमेल",
  loginMethodMobile: "मोबाइल",
  loginMethodIdentity: "पहचान",
  mobileNumber: "मोबाइल नंबर",
  email: "ईमेल",
  password: "पासवर्ड",
  enterCaptcha: "कैप्चा दर्ज करें",
  noAccount: "क्या आपका खाता नहीं है?",
  alreadyAccount: "क्या आपका पहले से खाता है?",
  createApplicantAccount: "अपना आवेदक खाता बनाएं",
  fullName: "पूरा नाम",
  identityDetails: "पहचान विवरण",
  confirmPassword: "पासवर्ड की पुष्टि करें",
  show: "दिखाएं",
  refresh: "रिफ्रेश",
  captchaLabel: "कैप्चा",

  dob: "जन्म तिथि",
  rollNumber10: "10वीं रोल नंबर",
  passingYear10: "10वीं उत्तीर्ण वर्ष",
};

const hiAbout = {
  aboutUsTitle: "हमारे बारे में",
  aboutP1:
    "RAC, अर्थात DRDO का भर्ती एवं मूल्यांकन केंद्र, 23 जुलाई 1985 को संघ लोक सेवा आयोग (UPSC) के दायरे से छूट प्राप्त होने के बाद स्थापित किया गया। यह लखनऊ रोड, तिमारपुर, दिल्ली में स्थित है।",
  aboutP2:
    "RAC ने DRDO प्रयोगशालाओं से संबंधित विभिन्न वैज्ञानिक एवं अभियान्त्रिकी विषयों में प्रत्येक वर्ष वैज्ञानिकों की भर्ती के लिए अनेक कार्यक्रम संचालित किए हैं तथा DRDO वैज्ञानिकों की उच्चतर पदोन्नति हेतु उपयुक्तता का मूल्यांकन विधिवत गठित असेसमेंट बोर्ड/पीयर कमेटी के माध्यम से किया है।",
  aboutPrimaryResp: "RAC की मुख्य जिम्मेदारियाँ",
  aboutLi1: "DRDO में वैज्ञानिकों (ग्रुप 'A' क्लास I राजपत्रित पद) की भर्ती",
  aboutLi2: "DRDO वैज्ञानिकों का अगली उच्चतर श्रेणी में पदोन्नति हेतु मूल्यांकन",
  aboutLi3:
    "DRDO की रिसर्च एवं ट्रेनिंग योजना तथा सेना, नौसेना और वायुसेना की पोस्ट ग्रेजुएट ट्रेनिंग योजना के अंतर्गत उच्च अध्ययन पाठ्यक्रम हेतु अभ्यर्थियों का चयन",
  aboutLi4:
    "सचिव, रक्षा अनुसंधान एवं विकास विभाग तथा अध्यक्ष, DRDO द्वारा निर्दिष्ट अन्य कार्य",
};

const hiChairman = {
  chairmanTitle: "अध्यक्ष",
  briefProfile: "संक्षिप्त प्रोफ़ाइल",
  formerChairmen: "पूर्व अध्यक्ष",
  chairmanP1:
    "डॉ. समीर वी कामत, सचिव, रक्षा अनुसंधान एवं विकास विभाग (DDR&D) एवं अध्यक्ष DRDO को 13-जून-2025 से RAC अध्यक्ष पद का अतिरिक्त प्रभार सौंपा गया है।",
  chairmanP2:
    "भर्ती एवं मूल्यांकन केंद्र (RAC), DRDO की वह कॉर्पोरेट इकाई है जो वैज्ञानिक भर्ती, मूल्यांकन गतिविधियों और तकनीकी तथा अनुसंधान भूमिकाओं के लिए मानव संसाधन से जुड़े कार्यों का संचालन करती है।",
  chairmanP3:
    "अध्यक्ष के नेतृत्व में RAC विभिन्न वैज्ञानिक और तकनीकी पदों के लिए पारदर्शी, योग्यता-आधारित और कुशल चयन प्रक्रियाओं का समर्थन करता है।",
  formerChairmenText:
    "पूर्व अध्यक्षों की जानकारी यहाँ सूची रूप में जोड़ी जा सकती है।",
};

const hiDirector = {
  directorTitle: "निदेशक",
  formerDirector: "पूर्व निदेशक",
  directorP1:
    "श्रीमती के.वी. प्रभा, साइंटिस्ट H ने 1 मार्च 2023 को RAC निदेशक का पदभार संभाला। वह कंप्यूटर साइंस में परास्नातक तथा डेटा माइनिंग विशेषज्ञता के साथ एम.फिल हैं।",
  directorP2:
    "उन्होंने IIM(A) और ASCI में एडवांस्ड लीडरशिप प्रशिक्षण प्राप्त किया है। उन्होंने 1990 में DRDL हैदराबाद में DRDO ज्वाइन किया और ज्ञान प्रबंधन तथा संस्थागत विकास में व्यापक योगदान दिया।",
  directorP3:
    "उन्होंने ज्ञान साझा मंच, सर्वेक्षण, तकनीकी फोरम, दस्तावेज़ प्रबंधन प्रणाली और नवाचार कार्यक्रमों जैसे कई आईटी और गैर-आईटी उपक्रमों में योगदान दिया है।",
  directorP4:
    "उन्होंने प्रक्रिया पुनर्रचना और वर्कफ़्लो आधारित अनुमोदनों के कार्यान्वयन में महत्वपूर्ण भूमिका निभाई, जिससे परियोजना निष्पादन, क्रय, परीक्षण और प्रशासन की दक्षता बढ़ी।",
  directorP5:
    "उन्होंने क्लस्टर-स्तरीय ऑनलाइन स्वीकृतियों, मॉनिटरिंग SYSTEM का नेतृत्व किया तथा ISO, CMMI और सूचना सुरक्षा प्रबंधन प्रणालियों का अनुभव प्राप्त किया।",
  directorP6:
    "RAC में उन्होंने आधुनिक अधोसंरचना जैसे डेटा सेंटर, संरचित LAN प्रणाली स्थापित की तथा AI आधारित भर्ती स्वचालन में योगदान दिया।",
  directorP7:
    "उन्हें उनके योगदान के लिए राष्ट्रीय विज्ञान दिवस पुरस्कार सहित सम्मान प्राप्त हुए हैं।",
  formerDirectorText: "पूर्व निदेशकों की सूची यहाँ जोड़ी जा सकती है।",
};

const hiApproach = {
  approachTitle: "हमारा दृष्टिकोण",
  vision: "दृष्टि",
  mission: "मिशन",
  motto: "मूल मंत्र",
  qualityPolicy: "गुणवत्ता नीति",
  qualityObjectives: "गुणवत्ता उद्देश्य",
  visionIntro: "उत्कृष्टता का केंद्र बनना और",
  missionIntro: "दृष्टि को साकार करने हेतु",
  visionLi1: "निर्धारित कार्य क्षेत्रों में गुणवत्तापूर्ण परिणाम प्रदान करना",
  visionLi2: "वैज्ञानिक प्रदर्शन मापन में नए ज्ञान का सृजन करना",
  visionLi3:
    "उन्नत चयन तकनीकों में HRD विशेषज्ञों का एक समन्वित समुदाय तैयार करना",
  missionLi1: "कार्य निष्पादन में अत्यंत व्यावसायिक दृष्टिकोण अपनाना",
  missionLi2: "आधुनिक क्षमताओं और सुविधाओं का अधिग्रहण करना",
  missionLi3: "R&D के माध्यम से ज्ञान सृजन क्षमताओं को सुदृढ़ करना",
  missionLi4: "संपूर्ण गुणवत्ता प्रबंधन संस्कृति का पोषण करना",
  missionLi5: "विश्व की श्रेष्ठ एजेंसियों के साथ रणनीतिक संबंध स्थापित करना",
  mottoLi1: "सटीकता, गोपनीयता और समयबद्धता के साथ कार्य करना",
  qualityPolicyIntro:
    "हम DRDO को निम्नलिखित कार्यों हेतु गुणवत्तापूर्ण सेवाएँ प्रदान करने के लिए प्रतिबद्ध हैं:",
  qualityPolicyLi1: "वैज्ञानिकों की भर्ती",
  qualityPolicyLi2:
    "वैज्ञानिकों का अगली उच्चतर श्रेणी में पदोन्नति हेतु मूल्यांकन",
  qualityPolicyLi3:
    "DRDO की रिसर्च एवं ट्रेनिंग योजना तथा भारतीय सशस्त्र बलों की पोस्ट ग्रेजुएट ट्रेनिंग योजना हेतु अभ्यर्थियों का चयन",
  qualityPolicyEnd:
    "हम ग्राहक संतुष्टि में वृद्धि हेतु अपनी सेवाओं में सतत सुधार के लिए भी प्रतिबद्ध हैं।",
  qualityObjectivesLi1:
    "मुख्यालय द्वारा निर्धारित अथवा RAC द्वारा अनुमानित समयसीमा के भीतर भर्ती और मूल्यांकन पूरा करना",
  qualityObjectivesLi2:
    "ग्राहक संतुष्टि सूचकांक 80% से अधिक बनाए रखते हुए भर्ती एवं मूल्यांकन सेवाओं में ग्राहक संतुष्टि बढ़ाना",
  qualityObjectivesLi3: "ग्राहक शिकायतों को न्यूनतम करना एवं सुधारना",
};

const hiDrds = {
  drdsTitle: "DRDS (रक्षा अनुसंधान एवं विकास सेवा)",
  drdsIntro:
    "राष्ट्रीय सुरक्षा से संबंधित महत्वपूर्ण प्रौद्योगिकियों में आत्मनिर्भरता के उद्देश्य से DRDO वैज्ञानिक अनुसंधान, डिजाइन, विकास, परीक्षण एवं मूल्यांकन के कार्यक्रम संचालित करता है। DRDO अत्यंत योग्य और सक्षम वैज्ञानिकों एवं प्रौद्योगिकी विशेषज्ञों को नियुक्त करता है, जो ग्रुप 'A' (क्लास I राजपत्रित) सेवा का हिस्सा होते हैं, जिसे रक्षा अनुसंधान एवं विकास सेवा (DRDS) कहा जाता है। 7वें केंद्रीय वेतन आयोग के अनुसार DRDS वैज्ञानिकों का वेतनमान नीचे INR में दिया गया है:",
  salientFeatures: "DRDS की प्रमुख विशेषताएँ",
  drdsP1:
    "DRDO अपने वैज्ञानिकों के करियर उन्नयन का विशेष ध्यान रखता है और साइंटिस्ट 'H' स्तर तक फ्लेक्सिबल कॉम्प्लिमेंटिंग स्कीम (FCS) के अंतर्गत योग्यता-आधारित पदोन्नति योजना संचालित करता है।",
  drdsP2:
    "मूल वेतन के अतिरिक्त, सरकारी आवास उपलब्ध न होने पर DRDS वैज्ञानिकों को मूल वेतन का 24% तक HRA तथा DA, परिवहन भत्ता आदि अन्य अनुमन्य भत्ते प्राप्त होते हैं।",
  drdsP3:
    "एलटीसी, चिकित्सा सुविधाएँ, पीसी/गृह निर्माण अग्रिम भी अनुमन्य हैं। प्रोफेशनल अपडेट भत्ता तथा समाचारपत्र/पत्रिकाओं पर व्यय प्रतिपूर्ति भी संबंधित नियमों के अनुसार उपलब्ध है।",
  higherQualificationTraining: "उच्च योग्यता एवं प्रशिक्षण की सुविधा",
  drdsP4:
    "DRDO केवल रोजगार ही नहीं देता, बल्कि मानव संसाधन विकास पर भी जोर देता है। अपने कर्मचारियों को पुणे (DIAT), मसूरी (ITM), IITs, IISc बेंगलुरु आदि संस्थानों में उच्च शैक्षणिक योग्यता हेतु प्रशिक्षण देता है।",
};

const hiFaq = {
  faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
  faqIntro:
    "RAC, DRDO वैज्ञानिक भर्ती, पात्रता, आवेदन प्रक्रिया, योग्यता और साक्षात्कार संबंधी त्वरित उत्तर यहाँ प्राप्त करें।",
};

const hiRecruitment = {
  recruitmentTitle: "भर्ती",
  recruitmentP1:
    "प्रत्येक वर्ष RAC मुख्यतः प्रवेश स्तर (Scientist 'B') पर DRDS में वैज्ञानिकों की भर्ती करता है। तथापि, अनुसंधान एवं विकास के विशिष्ट क्षेत्रों की आवश्यकताओं के अनुसार उच्च श्रेणियों (Scientist 'C' से Scientist 'H') में भी सीमित संख्या में वैज्ञानिकों की भर्ती की जाती है।",
  recruitmentP2:
    "RAC की अतिरिक्त जिम्मेदारियों में ADA (एरोनॉटिकल डेवलपमेंट एजेंसी) हेतु विभिन्न ग्रेडों में संविदा आधार पर प्रोजेक्ट इंजीनियरों तथा नियमित आधार पर वैज्ञानिकों / इंजीनियरों की नियुक्ति भी शामिल है। ADA, रक्षा अनुसंधान एवं विकास विभाग के अंतर्गत LCA के डिजाइन एवं विकास की नोडल एजेंसी है। RAC, विधिवत गठित असेसमेंट बोर्डों के माध्यम से ADA वैज्ञानिकों / इंजीनियरों की उच्चतर ग्रेड में पदोन्नति हेतु उपयुक्तता का भी आकलन करता है।",
  recruitmentP3: "अधिक जानकारी के लिए देखें",
  recruitmentAdaLink: "ADA वेबसाइट www.ada.gov.in",
  recruitmentSection1: "विज्ञान / इंजीनियरिंग श्रेणी में वैज्ञानिकों की भर्ती",
  recruitmentEssentialQualifications: "आवश्यक योग्यताएँ",
  recruitmentS1Li1:
    "मान्यता प्राप्त विश्वविद्यालय या समकक्ष से विज्ञान विषयों, गणित या मनोविज्ञान में कम से कम प्रथम श्रेणी की मास्टर डिग्री अथवा इंजीनियरिंग / टेक्नोलॉजी / मेटलर्जी में प्रथम श्रेणी की स्नातक डिग्री।",
  recruitmentS1Li2:
    "आवश्यक क्षेत्र में अनुसंधान / डिजाइन / विकास या उत्पादन का अनुभव: Scientist 'C' हेतु कम से कम 3 वर्ष, Scientist 'D' हेतु 7 वर्ष, Scientist 'E' हेतु 10 वर्ष, Scientist 'F' हेतु 13 वर्ष और Scientist 'G'/Scientist 'H' हेतु 15 वर्ष।",
  recruitmentDesirableQualifications: "वांछनीय योग्यताएँ",
  recruitmentS1Li3: "चीनी, फ्रेंच, जर्मन, जापानी या रूसी भाषा का ज्ञान",
  recruitmentS1Li4:
    "विज्ञान, गणित या मनोविज्ञान में डॉक्टरेट अथवा संबंधित विषय में इंजीनियरिंग / टेक्नोलॉजी / मेटलर्जी में मास्टर डिग्री (Scientist 'C' एवं उससे ऊपर हेतु लागू)।",
  recruitmentClickHere:
    "AICTE दिशानिर्देशों के अनुसार मान्यता प्राप्त विश्वविद्यालयों या समकक्ष की सूची जानने के लिए यहाँ क्लिक करें",
  recruitmentSource: "(स्रोत: AICTE वेबसाइट)",
  recruitmentSection2:
    "चिकित्सा / पशु चिकित्सा विज्ञान श्रेणी में वैज्ञानिकों की भर्ती",
  recruitmentMedicalEssential: "आवश्यक योग्यताएँ",
  recruitmentS2Li1:
    "भारतीय चिकित्सा परिषद अधिनियम, 1956 की प्रथम अनुसूची, द्वितीय अनुसूची या तृतीय अनुसूची के भाग-II में सम्मिलित चिकित्सा योग्यता। तृतीय अनुसूची के भाग-II में सम्मिलित योग्यताओं के धारकों को उक्त अधिनियम की धारा 13 की उपधारा (3) की शर्तें भी पूरी करनी होंगी।",
  recruitmentOr: "या",
  recruitmentS2Li2:
    "दंत चिकित्सक अधिनियम, 1948 की अनुसूची के भाग I, भाग II या भाग III में सम्मिलित दंत योग्यता।",
  recruitmentS2Li3:
    "पशु चिकित्सा परिषद भारत द्वारा मान्यता प्राप्त बैचलर डिग्री इन वेटरिनरी साइंस एंड एनिमल हसबेंड्री (BVSc&AH)।",
  recruitmentS2Li4: "अनिवार्य रोटेटिंग इंटर्नशिप की पूर्णता।",
  recruitmentS2Li5:
    "स्नातकोत्तर डिग्री तथा (Scientist 'C' एवं उससे ऊपर हेतु लागू) Scientist 'C' के लिए कम से कम 3 वर्ष, Scientist 'D' के लिए 7 वर्ष, Scientist 'E' के लिए 10 वर्ष, Scientist 'F' के लिए 13 वर्ष और Scientist 'G'/Scientist 'H' के लिए 15 वर्ष का व्यावहारिक एवं प्रशासनिक अनुभव तथा चिकित्सा राहत, चिकित्सा अनुसंधान, चिकित्सा शिक्षा या सार्वजनिक स्वास्थ्य संगठन के आवश्यक क्षेत्र में अनुभव।",
  recruitmentAgeLimit: "आयु सीमा",
  recruitmentAge1: "Scientist 'B' के लिए: 28 वर्ष से अधिक नहीं",
  recruitmentAge2: "Scientist 'C' के लिए: 35 वर्ष से अधिक नहीं",
  recruitmentAge3:
    "Scientist 'D' और Scientist 'E' के लिए: 45 वर्ष से अधिक नहीं",
  recruitmentAge4: "Scientist 'F' और 'G' के लिए: 50 वर्ष से अधिक नहीं",
  recruitmentAge5: "Scientist 'H' के लिए: 54 वर्ष से अधिक नहीं",
  recruitmentAgeNote:
    "अनुसूचित जाति / अनुसूचित जनजाति अभ्यर्थियों हेतु अधिकतम आयु सीमा में 5 वर्ष तथा अन्य पिछड़ा वर्ग (OBC) के अभ्यर्थियों हेतु 3 वर्ष की छूट है, जहाँ पद आरक्षित हों। केंद्रीय / संघ राज्य क्षेत्र की नियमित सेवा में उम्मीदवारों को नियमों के अनुसार छूट मिलेगी। दिव्यांग व्यक्तियों को भी समान विषयों में 5 वर्ष तक की अतिरिक्त छूट प्राप्त होगी। नियुक्ति का प्रस्ताव आवश्यक प्रमाणपत्रों के सत्यापन तथा भारत सरकार के Group 'A' (Class I Gazetted) तकनीकी पदों हेतु चिकित्सीय उपयुक्तता पर निर्भर करेगा।",
};

const hiAssessment = {
  assessmentTitle: "मूल्यांकन",
  assessmentP1:
    "DRDS वैज्ञानिकों की 'B'/'C'/'D'/'E' श्रेणियों से अगली उच्चतर श्रेणी में पदोन्नति हेतु असेसमेंट बोर्ड मध्य अप्रैल से मध्य जून के दौरान DRDO प्रयोगशालाओं / प्रतिष्ठानों के प्रमुख केंद्रों जैसे बेंगलुरु, दिल्ली, हैदराबाद और पुणे में आयोजित किए जाते हैं। विभिन्न विषयों में अभ्यर्थियों की संख्या के अनुसार साक्षात्कार अन्य स्थानों जैसे बालासोर, चंडीगढ़ और देहरादून में भी हो सकते हैं। दिल्ली में साक्षात्कार बोर्ड RAC में आयोजित किए जाते हैं।",
  assessmentP2:
    "असेसमेंट बोर्ड की अध्यक्षता RAC अध्यक्ष या प्रतिष्ठित वैज्ञानिकों एवं प्रौद्योगिकी विशेषज्ञों के पैनल से किसी सह-अध्यक्ष द्वारा की जाती है। कोर समिति में एक अध्यक्ष, दो कोर सदस्य, एक विभागीय विशेषज्ञ और विषय के दो बाहरी विशेषज्ञ होते हैं। सामान्यतः एक बाहरी विशेषज्ञ शैक्षणिक संस्थान से और दूसरा ऐसे वैज्ञानिक संस्थान से होता है जो DRDO जैसी गतिविधियों में संलग्न हो, ताकि शैक्षणिक आधार और अनुप्रयुक्त अनुसंधान एवं विकास दोनों का आकलन किया जा सके। प्रत्येक उम्मीदवार के लिए प्रयोगशाला निदेशक या उनका प्रतिनिधि भी बोर्ड का सदस्य होता है तथा आवश्यकता होने पर SC/ST प्रतिनिधि को सह-समाविष्ट किया जाता है।",
  assessmentProcedure: "साक्षात्कार की प्रक्रिया",
  assessmentProc1:
    "अध्यक्ष द्वारा प्रयोगशाला निदेशक से अनुरोध किया जाता है कि वे बोर्ड को अभ्यर्थी को सौंपी गई जिम्मेदारियों और साक्षात्कार में उपस्थित वैज्ञानिक के योगदान के बारे में संक्षिप्त जानकारी दें। बोर्ड APAR में उल्लिखित विषय में वैज्ञानिक का साक्षात्कार करता है।",
  assessmentProc2:
    "वैज्ञानिक के बोर्ड कक्ष में प्रवेश करने के बाद, अध्यक्ष बायोडाटा की समीक्षा करता है और फिर वैज्ञानिक को अपनी उपलब्धियों तथा भविष्य की कार्ययोजना का संक्षिप्त प्रस्तुतीकरण (10-15 मिनट) देने के लिए आमंत्रित करता है। वैज्ञानिक को केवल अपने व्यक्तिगत योगदान और उपलब्धियों को ही रेखांकित करना होता है। प्रस्तुतीकरण के बाद बोर्ड के सभी सदस्य क्रमवार वैज्ञानिक से प्रश्नोत्तर करते हैं।",
  assessmentProc3:
    "सावधानीपूर्वक चुने गए विभागीय और बाहरी विशेषज्ञों से युक्त असेसमेंट बोर्ड संतोषजनक निर्णय तक पहुँचने में सहायक होता है। कुछ परिस्थितियों में बोर्ड निर्णय लेते समय विशेष सावधानी बरतता है, जैसे:",
  assessmentLi1:
    "संयुक्त परियोजना में व्यक्तिगत योगदान को स्पष्ट रूप से पहचानना आवश्यक है। किसी अत्यंत सफल और प्रतिष्ठित परियोजना में किसी व्यक्ति का योगदान बहुत कम भी हो सकता है।",
  assessmentLi2:
    "कुछ अभ्यर्थी अच्छे वक्ता और उत्कृष्ट प्रस्तुतकर्ता होते हैं, जबकि कुछ उतने सक्षम नहीं होते। अच्छी वक्तृत्व कला अभ्यर्थी की वास्तविक योग्यता पर हावी नहीं होनी चाहिए।",
  assessmentProc4:
    "यदि असेसमेंट बोर्ड द्वारा आंका गया वैज्ञानिक का समग्र स्तर वर्तमान निवास अवधि हेतु निर्धारित योग्यता अंकों के अनुरूप है, तो अभ्यर्थी को 'Fit For Promotion' की संस्तुति दी जाती है। अन्यथा संस्तुति 'Not Yet Fit For Promotion' होती है।",
  assessmentProc5:
    "यदि अभ्यर्थी चाहे तो साक्षात्कार में हिंदी को माध्यम के रूप में उपयोग किया जा सकता है।",
  assessmentPeerReview: "पीयर रिव्यू",
  assessmentPeer1:
    "DRDS वैज्ञानिकों की 'F' से 'G' और 'G' से 'H' श्रेणियों में पदोन्नति 1 जुलाई से फ्लेक्सिबल कॉम्प्लिमेंटिंग स्कीम (FCS) के अंतर्गत वार्षिक प्रदर्शन मूल्यांकन रिपोर्ट (APAR) के आंतरिक स्क्रीनिंग समिति द्वारा मूल्यांकन तथा पीयर समिति द्वारा आकलन के आधार पर की जाती है।",
  assessmentPeer2:
    "मूल निवास अवधि उस वर्ष की 30 जून तक पाँच वर्ष है जिससे मूल्यांकन संबंधित हो। जो उम्मीदवार 01 जुलाई के बाद अपने नियंत्रण से बाहर कारणों से जुड़े, उन्हें पात्र सेवा में तीन माह तक की छूट दी जाती है। Scientist 'F' को एक वर्ष की निवास अवधि में छूट दी जाती है यदि उन्हें लगातार चार CPARs में 90% या अधिक अंक के साथ 'Exceptionally Brilliant' आंका गया हो।",
  assessmentPeer3:
    "पीयर समिति वर्तमान ग्रेड में वैज्ञानिकों के योगदान का समग्र दृष्टिकोण से आकलन करती है और वैज्ञानिक R&D की गुणवत्ता, सौंपे गए कार्यों की समय पर पूर्णता, प्रबंधन क्षमता, नेतृत्व गुण, चुनौतियों का सामना करने की प्रेरणा, कार्य के प्रति समर्पण, उच्चतर जिम्मेदारी निभाने की क्षमता और विशेष दक्षता क्षेत्रों जैसे गुणों का मूल्यांकन करती है।",
  assessmentPeer4:
    "पीयर समिति Scientist 'F' से Scientist 'G' पदोन्नति हेतु अनुशंसित वैज्ञानिकों के लिए ₹4000/- प्रति माह विशेष वेतन की भी अनुशंसा कर सकती है।",
  assessmentPeer5:
    "यही पीयर समिति Scientist 'G' को Scientist 'H' (Outstanding Scientist) पद हेतु भी आंकेगी, जिन्होंने ग्रेड में 3 वर्ष की नियमित सेवा पूर्ण की हो और ISC द्वारा योग्यता, उपलब्धि, नेतृत्व और प्रबंधकीय गुणों के आधार पर अनुशंसित हों। यही समिति Distinguished Scientist ग्रेड प्रदान करने की अनुशंसा भी करेगी।",
};

const hiSelectionPg = {
  selectionPgTitle:
    "प्रायोजित स्नातकोत्तर पाठ्यक्रमों हेतु DRDO कर्मचारियों तथा सशस्त्र बलों के सेवा अधिकारियों का चयन",
  selectionPgP1:
    "DRDO के अनुसंधान एवं प्रशिक्षण (R&T) योजना के अंतर्गत ME/ MTech करने हेतु DRDO द्वारा प्रायोजित किए जाने वाले कर्मचारियों का चयन RAC के माध्यम से किया जाता है। विभिन्न संस्थानों / विश्वविद्यालयों में प्रायोजित ME/ MTech पाठ्यक्रमों हेतु विभिन्न विषयों में रिक्तियों की संख्या प्रत्येक शैक्षणिक वर्ष घोषित की जाती है।",
  selectionPgP2:
    "जो DRDO अभ्यर्थी पात्रता मानदंड और अन्य लागू नियम एवं शर्तें पूरी करते हैं, उनका चयन उस वर्ष के लिए विधिवत गठित साक्षात्कार बोर्ड द्वारा साक्षात्कार प्रक्रिया के माध्यम से किया जाता है।",
  selectionPgP3:
    "इसी प्रकार, RAC सेना, नौसेना और वायुसेना के कार्मिकों के लिए पोस्ट ग्रेजुएट ट्रेनिंग (PGT) योजना के अंतर्गत ME/ MTech पाठ्यक्रमों हेतु अभ्यर्थियों के चयन के लिए भी साक्षात्कार आयोजित करता है।",
  selectionPgP4:
    "R&T और PGT योजना हेतु साक्षात्कार प्रतिवर्ष अप्रैल / मई के दौरान आयोजित किए जाते हैं।",
};

const hiLdce = {
  ldceTitle: "सीमित विभागीय प्रतियोगी परीक्षा (LDCE)",
  ldceP1:
    "RAC, रक्षा अनुसंधान एवं विकास सेवा (DRDS) में Scientist 'B' के रूप में प्रवेश हेतु LDCE आयोजित करता है। Technical Officer 'A' या Technical Officer 'B' पद पर कार्यरत कोई भी व्यक्ति, जिसके पास पाँच वर्ष की नियमित सेवा हो, तथा निम्न ग्रेडों में अन्य तकनीकी कार्मिक जिनके पास DRDO में दस वर्ष की नियमित सेवा हो और जो DRDS Rules की Schedule-III में Scientist 'B' पद हेतु निर्धारित शैक्षणिक योग्यताएँ रखते हों, उक्त परीक्षा में बैठने के पात्र होंगे। इसके लिए कोई ऊपरी आयु सीमा नहीं होगी। जब तक सरकार द्वारा अन्यथा निर्दिष्ट न किया जाए, कोई भी अभ्यर्थी उक्त विभागीय परीक्षा में पाँच से अधिक अवसर प्राप्त नहीं कर सकेगा।",
};

const hiLateral = {
  lateralTitle: "पार्श्व प्रवेश",
  lateralP1:
    "इस भर्ती श्रेणी के अंतर्गत DRDO से संबंधित विशिष्ट क्षेत्रों में योग्यता एवं अनुभव के आधार पर मध्य एवं वरिष्ठ ग्रेड (Scientist 'C' से Scientist 'H') में वैज्ञानिकों की भर्ती की जाती है।",
  lateralP2:
    'RAC समय-समय पर RAC और DRDO वेबसाइटों तथा "The Employment News" के माध्यम से विज्ञापन जारी करता है ताकि DRDO की रुचि के क्षेत्रों में विशेष अनुभव रखने वाले वैज्ञानिक जनशक्ति की आवश्यकता पूरी की जा सके।',
};

const hiDirectRecruitment = {
  directRecruitmentTitle: "सीधी भर्ती",
  directRecruitmentP1:
    "इस विज्ञापन में वैज्ञानिक एवं इंजीनियरिंग विषयों में Scientist 'B' के पद भी शामिल होते हैं, जो Scientist Entry Test (SET) के अंतर्गत नहीं आते। ऐसे विज्ञापन कैलेंडर वर्ष की दूसरी और अंतिम तिमाही में जारी किए जाते हैं।",
  directRecruitmentP2:
    "इस चयन श्रेणी के अंतर्गत अभ्यर्थियों को लिखित परीक्षा में बैठने की आवश्यकता नहीं होती। अभ्यर्थियों को उनके GATE स्कोर के आधार पर साक्षात्कार हेतु शॉर्टलिस्ट किया जाता है। वैज्ञानिकों का चयन चयन साक्षात्कार में उनके प्रदर्शन के क्रम के आधार पर किया जाता है।",
};

const hiTranslation = {
  ...hiCommon,
  ...hiLanding,
  ...hiAuth,
  ...hiAbout,
  ...hiChairman,
  ...hiDirector,
  ...hiApproach,
  ...hiDrds,
  ...hiFaq,
  ...hiRecruitment,
  ...hiAssessment,
  ...hiSelectionPg,
  ...hiLdce,
  ...hiLateral,
  ...hiDirectRecruitment,
};

/* ---------------------------------------------
   I18N INIT
--------------------------------------------- */
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    hi: {
      translation: hiTranslation,
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;