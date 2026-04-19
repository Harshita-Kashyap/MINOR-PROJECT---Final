import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
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
        heroTitle: "Recruitment of Scientist ‘B’ in DRDO",
        heroSubtitle:
          "Direct recruitment for various scientific disciplines",
        videoText: "DRDO Recruitment Process",

        headerTitle: "Recruitment & Assessment Centre, DRDO",
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
        rightQueryText:
          "Candidate query status information will appear here.",
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

        approachTitle: "Our Approach",
        vision: "Vision",
        mission: "Mission",
        motto: "Motto",
        qualityPolicy: "Quality Policy",
        qualityObjectives: "Quality Objectives",
        visionIntro: "To become a centre of excellence and",
        missionIntro: "To realise the vision by",
        visionLi1:
          "Provider of Quality deliverables in stipulated functional domains",
        visionLi2:
          "Generator of new knowledge in Scientific Performance Measurement",
        visionLi3:
          "Trainer to create a seamless community of HRD practitioners in advanced selection techniques",
        missionLi1:
          "Adopting highly professional approach in our job execution",
        missionLi2:
          "Acquiring state of art capabilities and facilities",
        missionLi3:
          "Strengthening our knowledge generation competencies through R&D",
        missionLi4: "Nurturing total quality management culture",
        missionLi5:
          "Establishing strategic linkage with the world's best agencies",
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

        drdsTitle:
          "DRDS (Defence Research and Development Services)",
        drdsIntro:
          "In pursuit of self-reliance in critical technologies relevant to national security, DRDO formulates and executes programmes of scientific research, design, development, testing and evaluation of various systems, subsystems, devices and products required for defence of the nation. DRDO employs highly qualified and competent scientists and technologists who constitute the Group 'A' (Class I Gazetted) Service known as Defence Research & Development Service (DRDS). The emoluments of DRDS Scientists as per 7th Central Pay Commission are as given below in INR:",
        grade: "Grade",
        levelInPayMatrix: "Level in Pay Matrix",
        initialPay: "Initial Pay in Pay Matrix ₹",
        salientFeatures: "Salient features of DRDS",
        drdsP1:
          "DRDO takes utmost care of the career-advancement of its scientists and operates a merit based promotion scheme under Flexible Complementing Scheme (FCS) upto the level of Scientist 'H' which means that with each promotion is based purely on merit basis of the scientist in the assessment board/ Peer Committee.",
        drdsP2:
          "In addition to the Basic Pay, DRDS scientists are entitled to get House Rent Allowance upto 24% of Basic Pay in case of non-availability of Government accommodation and other allowances viz, DA, Transport Allowance with DA on it etc. as admissible to Central Government employees.",
        drdsP3:
          "Perquisites like Leave Travel Concession, Medical facilities, Advances for PCs/ House Building are also admissible. Professional update allowance of Rs 22,500/- (for Scientist 'B', 'C' and 'D'), Rs 45,000/- (for Scientist 'E' and Scientist 'F') Rs 67,500/- (for Scientist G onwards) per annum and reimbursement of expenditures on newspapers/periodicals also admissible in accordance with provisions of relevant Rules.",
        higherQualificationTraining:
          "Facility for Higher Qualification & Training",
        drdsP4:
          "DRDO not only offers employment but also lays emphasis on Human Resource Development. DRDO trains its personnel at training institutions in Pune (DIAT) and Mussoorie (ITM) and also at prestigious academic institutions viz, IITs, IISc Bangalore etc. for acquiring higher educational qualifications. Opportunities also arise for foreign deputations for training/presentation of papers/specific assignments.",

        faqTitle: "Frequently Asked Questions",
        faqIntro:
          "Find quick answers related to RAC, DRDO scientific recruitment, eligibility, application process, qualifications, and interview requirements.",
      },
    },
    hi: {
      translation: {
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
        heroTitle: "DRDO में वैज्ञानिक ‘B’ की भर्ती",
        heroSubtitle: "विभिन्न वैज्ञानिक विषयों में सीधी भर्ती",
        videoText: "DRDO भर्ती प्रक्रिया",

        headerTitle: "भर्ती एवं मूल्यांकन केंद्र, DRDO",
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
        rightQueryText:
          "उम्मीदवार प्रश्न स्थिति संबंधी जानकारी यहाँ दिखाई देगी।",
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

        aboutUsTitle: "हमारे बारे में",
        aboutP1:
          "RAC, अर्थात DRDO का भर्ती एवं मूल्यांकन केंद्र, 23 जुलाई 1985 को संघ लोक सेवा आयोग (UPSC) के दायरे से छूट प्राप्त होने के बाद स्थापित किया गया। यह लखनऊ रोड, तिमारपुर, दिल्ली में स्थित है।",
        aboutP2:
          "RAC ने DRDO प्रयोगशालाओं से संबंधित विभिन्न वैज्ञानिक एवं अभियान्त्रिकी विषयों में प्रत्येक वर्ष वैज्ञानिकों की भर्ती के लिए अनेक कार्यक्रम संचालित किए हैं तथा DRDO वैज्ञानिकों की उच्चतर पदोन्नति हेतु उपयुक्तता का मूल्यांकन विधिवत गठित असेसमेंट बोर्ड/पीयर कमेटी के माध्यम से किया है।",
        aboutPrimaryResp: "RAC की मुख्य जिम्मेदारियाँ",
        aboutLi1:
          "DRDO में वैज्ञानिकों (ग्रुप 'A' क्लास I राजपत्रित पद) की भर्ती",
        aboutLi2:
          "DRDO वैज्ञानिकों का अगली उच्चतर श्रेणी में पदोन्नति हेतु मूल्यांकन",
        aboutLi3:
          "DRDO की रिसर्च एवं ट्रेनिंग योजना तथा सेना, नौसेना और वायुसेना की पोस्ट ग्रेजुएट ट्रेनिंग योजना के अंतर्गत उच्च अध्ययन पाठ्यक्रम हेतु अभ्यर्थियों का चयन",
        aboutLi4:
          "सचिव, रक्षा अनुसंधान एवं विकास विभाग तथा अध्यक्ष, DRDO द्वारा निर्दिष्ट अन्य कार्य",

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
          "उन्होंने क्लस्टर-स्तरीय ऑनलाइन स्वीकृतियों, मॉनिटरिंग सिस्टम का नेतृत्व किया तथा ISO, CMMI और सूचना सुरक्षा प्रबंधन प्रणालियों का अनुभव प्राप्त किया।",
        directorP6:
          "RAC में उन्होंने आधुनिक अधोसंरचना जैसे डेटा सेंटर, संरचित LAN प्रणाली स्थापित की तथा AI आधारित भर्ती स्वचालन में योगदान दिया।",
        directorP7:
          "उन्हें उनके योगदान के लिए राष्ट्रीय विज्ञान दिवस पुरस्कार सहित सम्मान प्राप्त हुए हैं।",
        formerDirectorText: "पूर्व निदेशकों की सूची यहाँ जोड़ी जा सकती है।",

        approachTitle: "हमारा दृष्टिकोण",
        vision: "दृष्टि",
        mission: "मिशन",
        motto: "मूल मंत्र",
        qualityPolicy: "गुणवत्ता नीति",
        qualityObjectives: "गुणवत्ता उद्देश्य",
        visionIntro: "उत्कृष्टता का केंद्र बनना और",
        missionIntro: "दृष्टि को साकार करने हेतु",
        visionLi1:
          "निर्धारित कार्य क्षेत्रों में गुणवत्तापूर्ण परिणाम प्रदान करना",
        visionLi2:
          "वैज्ञानिक प्रदर्शन मापन में नए ज्ञान का सृजन करना",
        visionLi3:
          "उन्नत चयन तकनीकों में HRD विशेषज्ञों का एक समन्वित समुदाय तैयार करना",
        missionLi1:
          "कार्य निष्पादन में अत्यंत व्यावसायिक दृष्टिकोण अपनाना",
        missionLi2:
          "आधुनिक क्षमताओं और सुविधाओं का अधिग्रहण करना",
        missionLi3:
          "R&D के माध्यम से ज्ञान सृजन क्षमताओं को सुदृढ़ करना",
        missionLi4: "संपूर्ण गुणवत्ता प्रबंधन संस्कृति का पोषण करना",
        missionLi5:
          "विश्व की श्रेष्ठ एजेंसियों के साथ रणनीतिक संबंध स्थापित करना",
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

        drdsTitle:
          "DRDS (रक्षा अनुसंधान एवं विकास सेवा)",
        drdsIntro:
          "राष्ट्रीय सुरक्षा से संबंधित महत्वपूर्ण प्रौद्योगिकियों में आत्मनिर्भरता के उद्देश्य से DRDO वैज्ञानिक अनुसंधान, डिजाइन, विकास, परीक्षण एवं मूल्यांकन के कार्यक्रम संचालित करता है। DRDO अत्यंत योग्य और सक्षम वैज्ञानिकों एवं प्रौद्योगिकी विशेषज्ञों को नियुक्त करता है, जो ग्रुप 'A' (क्लास I राजपत्रित) सेवा का हिस्सा होते हैं, जिसे रक्षा अनुसंधान एवं विकास सेवा (DRDS) कहा जाता है। 7वें केंद्रीय वेतन आयोग के अनुसार DRDS वैज्ञानिकों का वेतनमान नीचे INR में दिया गया है:",
        grade: "ग्रेड",
        levelInPayMatrix: "वेतन मैट्रिक्स स्तर",
        initialPay: "वेतन मैट्रिक्स में प्रारंभिक वेतन ₹",
        salientFeatures: "DRDS की प्रमुख विशेषताएँ",
        drdsP1:
          "DRDO अपने वैज्ञानिकों के करियर उन्नयन का विशेष ध्यान रखता है और साइंटिस्ट 'H' स्तर तक फ्लेक्सिबल कॉम्प्लिमेंटिंग स्कीम (FCS) के अंतर्गत योग्यता-आधारित पदोन्नति योजना संचालित करता है।",
        drdsP2:
          "मूल वेतन के अतिरिक्त, सरकारी आवास उपलब्ध न होने पर DRDS वैज्ञानिकों को मूल वेतन का 24% तक HRA तथा DA, परिवहन भत्ता आदि अन्य अनुमन्य भत्ते प्राप्त होते हैं।",
        drdsP3:
          "एलटीसी, चिकित्सा सुविधाएँ, पीसी/गृह निर्माण अग्रिम भी अनुमन्य हैं। प्रोफेशनल अपडेट भत्ता तथा समाचारपत्र/पत्रिकाओं पर व्यय प्रतिपूर्ति भी संबंधित नियमों के अनुसार उपलब्ध है।",
        higherQualificationTraining:
          "उच्च योग्यता एवं प्रशिक्षण की सुविधा",
        drdsP4:
          "DRDO केवल रोजगार ही नहीं देता, बल्कि मानव संसाधन विकास पर भी जोर देता है। अपने कर्मचारियों को पुणे (DIAT), मसूरी (ITM), IITs, IISc बेंगलुरु आदि संस्थानों में उच्च शैक्षणिक योग्यता हेतु प्रशिक्षण देता है।",

        faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
        faqIntro:
          "RAC, DRDO वैज्ञानिक भर्ती, पात्रता, आवेदन प्रक्रिया, योग्यता और साक्षात्कार संबंधी त्वरित उत्तर यहाँ प्राप्त करें।",
      },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;