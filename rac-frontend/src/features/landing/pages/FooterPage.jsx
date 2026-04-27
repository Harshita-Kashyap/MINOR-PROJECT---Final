import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

const pages = {
  archive: {
    title: "footerArchiveTitle",
    type: "archive",
  },
  "web-information-manager": {
    title: "footerWebInfoTitle",
    type: "webInfo",
  },
  "footer-about-us": {
    title: "footerAboutTitle",
    type: "about",
  },
  "interface-desk": {
    title: "footerInterfaceTitle",
    type: "interface",
  },
  sitemap: {
    title: "footerSitemapTitle",
    type: "sitemap",
  },
  help: {
    title: "footerHelpTitle",
    type: "help",
  },
  "refund-cancellation": {
    title: "footerRefundTitle",
    type: "refund",
  },
  disclaimer: {
    title: "footerDisclaimerTitle",
    type: "disclaimer",
  },
  "website-policies": {
    title: "footerPoliciesTitle",
    type: "policies",
  },
};

const archiveRows = [
  { no: 1, title: "Advertisement No. 157 - For the post of Chairperson RAC, Delhi.", davp: "10301/11/0164/2425", period: "22- 28 Feb 2025", size: "160.52 KB", start: "3 Mar, 2025", close: "24 Mar, 2025", extra: "Extended till - 4 Apr, 2025" },
  { no: 2, title: "Advertisement No. 156", davp: "", period: "", size: "326.13 KB", start: "-", close: "-" },
  { no: 3, title: "Advertisement No. 154 - Recruitment of Project Scientists on Contractual Basis for DRDO, Hyderabad.", davp: "", period: "", size: "265.75 KB", start: "10 Mar, 2025", close: "1 Apr, 2025", extra: "Extended till - 3 Apr, 2025" },
  { no: 4, title: "Advertisement No. 153 - Deputation for the Post of Scientist ‘D’ (Radiology) in DRDO.", davp: "10301/11/0178/2425", period: "29 Mar - 04 Apr 2025", size: "660.29 KB", start: "28 Mar, 2025", close: "12 May, 2025" },
  { no: 5, title: "Advertisement No. 152", davp: "", period: "", size: "908.75 KB", start: "-", close: "-" },
  { no: 6, title: "Advertisement No. 151 - Recruitment of Scientist 'D' on Deputation Basis", davp: "10301/11/0066/2425", period: "20 Jul - 26 Jul 2024", size: "638.83 KB", start: "26 Jul, 2024", close: "2 Sep, 2024", extra: "Extended till - 30 Sep, 2024" },
  { no: 7, title: "Advertisement No. 150 - Appointment of Chairperson Recruitment & Assessment Centre (RAC, DRDO)", davp: "10301/11/0021/2425", period: "11 May - 17 May 2024", size: "1.11 MB", start: "11 May, 2024", close: "9 Jun, 2024", extra: "Extended till - 28 Jun, 2024" },
  { no: 8, title: "Advertisement No. 149 - for award of Junior Research Fellowship (JRF)", davp: "10301/11/0025/2425", period: "11 May - 17 May 2024", size: "595.40 KB", start: "8 May, 2024", close: "31 May, 2024" },
  { no: 9, title: "Advertisement No. 148 - Recruitment for the post of Scientists in INMAS, DRDO (Delhi)", davp: "EN 29/100", period: "14 Oct - 20 Oct 2023", size: "901.55 KB", start: "14 Oct, 2023", close: "3 Nov, 2023" },
  { no: 10, title: "Advertisement No. 147 - Recruitment for the post of Scientists under Lateral Recruitment Scheme (51 Vacancies)", davp: "10301/11/0115/2324", period: "21 Oct - 27 Oct 2023", curtain: "11.00 MB", size: "403.00 KB", start: "21 Oct, 2023", close: "17 Nov, 2023" },

  { no: 11, title: "Advertisement No. 146 - Recruitment of Project Scientists on Contractual Basis for DRDO, Hyderabad", davp: "EN 17/101", period: "22 July - 28 July 2023", size: "855.00 KB", start: "22 Jul, 2023", close: "11 Aug, 2023" },
  { no: 12, title: "Advertisement No. 145 - Direct Recruitment for the posts of Scientist ‘B’ In DRDO (204 Vacancies)", davp: "10301/11/0029/2324", period: "10 June - 16 June 2023", size: "1.45 MB", start: "10 Aug, 2023", close: "31 Aug, 2023", extra: "Extended till - 29 Sep, 2023" },
  { no: 13, title: "Advertisement No. 144 - Recruitment of Project Scientists on Contractual Basis For NMRL, Mumbai (12 vacancies)", davp: "10301/11/0020/2324", period: "27 May -16 Jun 2023", size: "191.36 KB", start: "27 May, 2023", close: "16 Jun, 2023", extra: "Extended till - 23 Jun, 2023" },
  { no: 14, title: "Advertisement No. 143 - Appointment for the post of Vice-Chancellor of Defence Institute of Advanced Technology (DIAT), Pune", davp: "10301/11/0012/2324", period: "13 May -02 Jun 2023", size: "682.88 KB", start: "13 May, 2023", close: "2 Jun, 2023" },
  { no: 15, title: "Advertisement No. 142 - Recruitment to the posts of Scientist-D (Radiology) and Scientist-C (Nuclear Medicine) for INMAS, DRDO (03 vacancies)", davp: "10301/11/0009/2324", period: "06 May -02 Jun 2023", size: "778.75 KB", start: "6 May, 2023", close: "2 Jun, 2023", extra: "Extended till - 16 Jun, 2023" },
  { no: 16, title: "Advertisement No. 141 - Recruitment for the post of Scientist ‘B’ (37 vacancies in eight disciplines of Life Sciences)", davp: "10301/11/0125/2223", period: "29 Oct - 04 Nov 2022", size: "1.55 MB", start: "31 Oct, 2022", close: "27 Nov, 2022" },
  { no: 17, title: "Advertisement No. 140 - Recruitment of Recruitment of Scientist B in DRDO, Scientist B in DST and Scientist / Engineer B in ADA (630 vacancies)", davp: "10301/11/0062/2223", period: "16 - 22 Jul 2022", size: "374.43 KB", start: "6 Jul, 2022", close: "29 Jul, 2022", extra: "Extended till - 5 Aug, 2022" },
  { no: 18, title: "Advertisement No. 139 - Recruitment of Scientists in DRDO (58 vacancies)", davp: "10301/11/0044/2223", period: "11 - 17 Jun 2022", size: "1.29 MB", start: "26 May, 2022", close: "28 Jun, 2022" },
  { no: 19, title: "Advertisement No. 138 - for award of Junior Research Fellowship (JRF)", davp: "10301/11/0069/2122", period: "09 - 15 Oct 2021", size: "713.70 KB", start: "1 Oct, 2021", close: "29 Oct, 2021" },
  { no: 20, title: "Advertisement No. 137 - Direct Recruitment for Scientist 'B' in DRDO & Scientist / Engineer B in ADA", davp: "10301/11/0007/2021\n10301/11/0012/2021", period: "30 May - 05 Jun 2020\n27 Jun - 03 Jul 2020", size: "2.38 MB", start: "29 May, 2020", close: "10 Jul, 2020", extra: "Extended till - 17 Aug, 2020" },

  { no: 21, title: "Advertisement No. 136 - Recruitment of Scientist B in DRDO, Scientist B in DST, Scientist / Engineer B in ADA & Executive Engineer in GAETEC", davp: "10301/11/0053/1920", period: "10 - 16 Aug 2019", size: "260.35 KB", start: "10 Aug, 2019", close: "30 Aug, 2019" },
  { no: 22, title: "Advertisement No. 135 - Recruitment of Scientists in DRDO", davp: "10301/11/0031/1920", period: "29 Jun - 05 Jul 2019", size: "776.21 KB", start: "29 Jun, 2019", close: "19 Jul, 2019" },
  { no: 23, title: "Advertisement No. 134 - Recruitment of Scientists in DRDO", davp: "10301/11/0156/1819", period: "10 - 16 Nov 2018", size: "181.60 KB", start: "2 Nov, 2018", close: "30 Nov, 2018" },
  { no: 24, title: "Advertisement No. 133 - Direct Recruitment for Scientist 'B' in DRDO", davp: "10301/11/0064/1819", period: "16 - 22 Jun 2018", curtain: "1,001.59 KB", size: "220.43 KB", start: "16 Jun, 2018", close: "6 Jul, 2018" },
  { no: 25, title: "Advertisement No. 132 - Direct Recruitment for Scientist 'B' in DRDO", davp: "10301/11/0035/1819", period: "12 - 18 May 2018", curtain: "1,001.38 KB", size: "256.66 KB", start: "15 May, 2018", close: "5 Jun, 2018" },
  { no: 26, title: "Advertisement No. 131 - Walk-in interview for JRFs", davp: "10301/11/0345/1718", period: "27 Jan - 2 Feb 2018", size: "241.39 KB", start: "27 Jan, 2018", close: "15 Feb, 2018" },
  { no: 27, title: "Advertisement No. 130 - Direct Recruitment for Scientist 'B' in DRDO and Scientist/ Engineer 'B' in ADA", davp: "10301/11/0311/1718", period: "16 - 22 Dec 2017", curtain: "430.84 KB", size: "469.65 KB", start: "13 Dec, 2017", close: "5 Jan, 2018" },
  { no: 28, title: "Advertisement No. 129", davp: "10301/11/0291/1718", period: "2 - 8 Dec 2017", curtain: "122.83 KB", size: "125.16 KB", start: "17 Nov, 2017", close: "22 Dec, 2017" },
  { no: 29, title: "Advertisement No. 128 - Appointment to the post of Chairperson RAC", davp: "10301/11/0252/1718", period: "07-13 Oct 2017", size: "598.34 KB", start: "25 Sep, 2017", close: "5 Nov, 2017" },
  { no: 30, title: "Advertisement No. 127 - Deputation for the posts of Scientists for CEMILAC, Bengaluru", davp: "10301/11/0110/1718", period: "24 - 30 Jun 2017", curtain: "171.00 KB", size: "206.65 KB", start: "24 Jun, 2017", close: "14 Jul, 2017" },

  { no: 31, title: "Advertisement No. 126 - Appointment for the post of Vice Chancellor DIAT, Pune", davp: "10301/11/0076/1718", period: "13 - 19 May 2017", curtain: "106.59 KB", size: "136.39 KB", start: "13 May, 2017", close: "2 Jun, 2017" },
  { no: 32, title: "Advertisement No. 125 - Backlog vacancies for OBC/SC/ST", davp: "10301/11/0046/1718", period: "29 Apr - 5 May 2017", curtain: "427.15 KB", size: "947.59 KB", start: "29 Apr, 2017", close: "19 May, 2017" },
  { no: 33, title: "Advertisement No. 124 - Scientist posts in DRDO (CABS, Bengaluru)", davp: "10301/11/0002/1718", period: "15 - 21 Apr 2017", curtain: "114.64 KB", size: "67.23 KB", start: "15 Apr, 2017", close: "5 May, 2017" },
  { no: 34, title: "Advertisement No. 123 - Scientist 'F' posts in DRDO (CABS, Bengaluru)", davp: "10301/11/0886/1617", period: "03 - 9 Dec 2016", curtain: "165.70 KB", size: "200.60 KB", start: "3 Dec, 2016", close: "23 Dec, 2016" },
  { no: 35, title: "Advertisement No. 122 - Corrigendum/ Addendum", davp: "10301/11/1228/1617", period: "25 - 31 Mar 2017", size: "405.98 KB", start: "18 Mar, 2017", close: "7 Apr, 2017" },
  { no: 36, title: "Advertisement No. 122 - Armed Forces Medical College(AFMC)/ Service Selection Board (Army)", davp: "10301/11/0571/1617", period: "10 - 16 Sep 2016", size: "112.44 KB", start: "9 Sep, 2016", close: "29 Sep, 2016" },
  { no: 37, title: "Advertisement No. 120 - Corrigendum/ Addendum", davp: "10301/11/0342/1617", period: "", size: "123.38 KB", start: "20 Jul, 2016", close: "10 Aug, 2016" },
  { no: 38, title: "Advertisement No. 120 - Direct Recruitment for Scientist 'B' in DRDO and Scientist/ Engineer 'B' in ADA", davp: "10301/11/0967/1516", period: "05 - 11 Mar 2016", curtain: "178.12 KB\n329.07 KB", size: "255.15 KB", start: "20 Mar, 2016", close: "10 Apr, 2016" },
  { no: 39, title: "Advertisement No. 119 - Notification", davp: "", period: "", size: "379.00 KB", start: "-", close: "-" },
  { no: 40, title: "Advertisement No. 119 - Corrigendum", davp: "10301/11/0527/1516", period: "03 - 9 Oct 2015", size: "85.63 KB", start: "-", close: "17 Oct, 2015" },

  { no: 41, title: "Advertisement No. 119 - for fellowships (JRF)", davp: "10301/11/0389/1516", period: "29 Aug - 4 Sep 2015", size: "121.13 KB", start: "29 Aug, 2015", close: "19 Sep, 2015" },
  { no: 42, title: "Advertisement No. 118 - Corrigendum", davp: "10310/11/0435/1516", period: "05 - 11 Sep 2015", size: "980.36 KB", start: "-", close: "24 Sep, 2015" },
  { no: 43, title: "Advertisement No. 118 - for the post of Chairman RAC / DRDO", davp: "10301/11/0251/1516", period: "25 - 31 Jul 2015", curtain: "1.32 MB", size: "396.75 KB", start: "25 Jul, 2015", close: "24 Aug, 2015" },
  { no: 44, title: "Advertisement No. 117 - Special recruitment drive for OBC/SC/ST candidates", davp: "10301/11/0975/1415", period: "21 - 27 Mar 2015", curtain: "1.19 MB", size: "147.00 KB", start: "21 Mar, 2015", close: "10 Apr, 2015" },
  { no: 45, title: "Advertisement No. 116", davp: "10301/11/0672/1415", period: "20 - 26 Dec 2014", curtain: "415.00 KB", size: "163.85 KB", start: "20 Dec, 2014", close: "9 Jan, 2015" },
  { no: 46, title: "Advertisement No. 115 - Corrigendum", davp: "", period: "", size: "44.78 KB", start: "30 Jun, 2014", close: "19 Jul, 2014" },
  { no: 47, title: "Advertisement No. 115", davp: "10301/11/0096/1415", period: "31 May - 6 Jun 2014", curtain: "1.10 MB", size: "278.23 KB", start: "30 May, 2014", close: "21 Jun, 2014" },
  { no: 48, title: "Advertisement No. 114 - Vice Chancellor of DIAT", davp: "10301/11/0022/1415", period: "", size: "71.95 KB", start: "28 Apr, 2014", close: "16 May, 2014" },
  { no: 49, title: "Advertisement No. 113 - for fellowships (JRF)", davp: "10301/11/0478/1314", period: "", size: "275.26 KB", start: "10 Nov, 2013", close: "29 Nov, 2013" },
  { no: 50, title: "Advertisement No. 112 - vacancies for Scientists and Addl CCE", davp: "10301/11/0448/1314", period: "", curtain: "3.78 MB", size: "235.82 KB", start: "19 Oct, 2013", close: "7 Nov, 2013" },

  { no: 51, title: "Advertisement No. 111 - for fellowships (JRF)", davp: "10301/11/0671/1213", period: "", size: "112.29 KB", start: "2 Mar, 2013", close: "22 Mar, 2013" },
  { no: 52, title: "Advertisement No. 110", davp: "", period: "", size: "91.00 KB", start: "9 Dec, 2012", close: "27 Dec, 2012" },
  { no: 53, title: "Advertisement No. 109", davp: "", period: "", size: "81.74 KB", start: "20 Oct, 2012", close: "8 Nov, 2012" },
  { no: 54, title: "Advertisement No. 108 - vacancies for Civil Works Officer Cadre of DRDO", davp: "10301/11/0148/1213", period: "", size: "331.95 KB", start: "16 Jun, 2012", close: "6 Jul, 2012" },
  { no: 55, title: "Advertisement No. 107 - for the post of Scientist 'H'", davp: "10301/11/0804/1112", period: "", size: "184.22 KB", start: "10 Feb, 2012", close: "20 Mar, 2012" },
  { no: 56, title: "Advertisement No. 106", davp: "", period: "", size: "208.93 KB", start: "28 Jan, 2012", close: "16 Feb, 2012" },
  { no: 57, title: "Advertisement No. 104", davp: "", period: "", size: "165.81 KB", start: "5 Nov, 2011", close: "24 Nov, 2011" },
  { no: 58, title: "Advertisement No. 103 - for fellowships (JRF)", davp: "", period: "", size: "89.05 KB", start: "23 Jul, 2011", close: "12 Aug, 2011" },
  { no: 59, title: "Advertisement No. 102 - Corrigendum - 2", davp: "", period: "", size: "99.67 KB", start: "21 May, 2012", close: "8 Jun, 2012" },
  { no: 60, title: "Advertisement No. 102 - Corrigendum - 1", davp: "", period: "16 - 22 Jul 2011", size: "66.22 KB", start: "-", close: "-" },

  { no: 61, title: "Advertisement No. 102 - Addendum", davp: "", period: "", size: "63.53 KB", start: "2 Jul, 2011", close: "21 Jul, 2011" },
  { no: 62, title: "Advertisement No. 102", davp: "10301/11/0047/1112", period: "21 - 27 May 2011", size: "50.99 KB", start: "20 May, 2011", close: "9 Jun, 2011" },
  { no: 63, title: "Advertisement No. 101", davp: "", period: "", size: "252.53 KB", start: "23 Oct, 2010", close: "11 Nov, 2010" },
  { no: 64, title: "Advertisement No. 100", davp: "", period: "", size: "148.26 KB", start: "24 Sep, 2010", close: "14 Oct, 2010" },
  { no: 65, title: "Advertisement No. 99", davp: "", period: "", size: "223.81 KB", start: "24 Apr, 2010", close: "14 May, 2010" },
];

export default function FooterPage({ page }) {
  const { t, i18n } = useTranslation();
  const config = pages[page];
  const isHi = i18n.language === "hi";

  if (!config) return null;

  const policyMenu = [
    isHi ? "1. कॉपीराइट नीति" : "1. Copyright Policy",
    isHi
      ? "2. सामग्री योगदान, मॉडरेशन और अनुमोदन नीति (CMAP)"
      : "2. Content Contribution, Moderation & Approval Policy (CMAP)",
    isHi ? "3. सामग्री अभिलेखीकरण नीति (CAP)" : "3. Content Archival Policy (CAP)",
    isHi ? "4. सामग्री समीक्षा नीति (CRP)" : "4. Content Review Policy (CRP)",
    isHi ? "5. हाइपरलिंकिंग नीति" : "5. Hyper linking Policy",
    isHi ? "6. गोपनीयता नीति" : "6. Privacy Policy",
    isHi ? "7. नियम और शर्तें" : "7. Terms & Conditions",
    isHi ? "8. वेबसाइट निगरानी योजना" : "8. Website Monitoring Plan",
    isHi ? "9. आकस्मिक प्रबंधन योजना" : "9. Contingency Management Plan",
    isHi ? "10. सुरक्षा नीति" : "10. Security Policy",
  ];

  const policyContent = [
    [policyMenu[0], "footerPolicyCopyright"],
    [policyMenu[1], "footerPolicyCmap"],
    [policyMenu[2], "footerPolicyCap"],
    [policyMenu[3], "footerPolicyCrp"],
    [policyMenu[4], "footerPolicyHyper"],
    [policyMenu[5], "footerPolicyPrivacy"],
    [isHi ? "हम क्या एकत्र करते हैं" : "What we collect", "footerPolicyCollect"],
    [
      isHi ? "हम एकत्रित जानकारी का क्या करते हैं" : "What we do with the information we gather",
      "footerPolicyGather",
    ],
    [policyMenu[6], "footerPolicyTerms"],
    [policyMenu[7], "footerPolicyMonitoring"],
    [policyMenu[8], "footerPolicyContingency"],
    [policyMenu[9], "footerPolicySecurity"],
  ];

  return (
    <LandingLayout>
      <div className="min-h-[360px] border border-sky-300 bg-white p-6 text-[15px] leading-7 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {t(config.title)}
        </h1>

        {config.type === "archive" && (
          <div className="overflow-x-auto">
            <p className="mb-4">
              {isHi
                ? "नीचे दिए गए सभी विज्ञापनों के लिए आवेदन करने की अंतिम तिथि समाप्त हो चुकी है।"
                : "Last date to apply for all the below advertisements is over."}
            </p>

            <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th className="p-3">{isHi ? "क्र." : "Sl. No."}</th>
                  <th className="p-3">{isHi ? "विज्ञापन" : "Advertisement"}</th>
                  <th className="p-3">DAVP No.</th>
                  <th className="p-3">
                    {isHi ? "रोजगार समाचार अवधि" : "Employment News Period"}
                  </th>
                  <th className="p-3">{isHi ? "देखें / डाउनलोड" : "View/Download"}</th>
                  <th className="p-3">{isHi ? "आरंभ तिथि" : "Start Date"}</th>
                  <th className="p-3">{isHi ? "अंतिम तिथि" : "Closing Date"}</th>
                </tr>
              </thead>

              <tbody>
                {archiveRows.map((row, index) => (
                  <tr
                    key={`${row.no}-${index}`}
                    className={index % 2 ? "bg-gray-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"}
                  >
                    <td className="border-b border-gray-200 p-3 align-top dark:border-gray-700">
                      {row.no}
                    </td>
                    <td className="border-b border-gray-200 p-3 align-top dark:border-gray-700">
                      {row.title}
                    </td>
                    <td className="border-b border-gray-200 p-3 align-top dark:border-gray-700">
                      {row.davp}
                    </td>
                    <td className="border-b border-gray-200 p-3 align-top dark:border-gray-700">
                      {row.period}
                    </td>
                    <td className="border-b border-gray-200 p-3 align-top dark:border-gray-700">
                      <button className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
                        {isHi ? "विज्ञापन देखें" : "View Advertisement"}
                      </button>
                    </td>
                    <td className="border-b border-gray-200 p-3 align-top dark:border-gray-700">
                      {row.start}
                    </td>
                    <td className="border-b border-gray-200 p-3 align-top dark:border-gray-700">
                      <p>{row.close}</p>
                      {row.extra && <p className="text-xs text-gray-500">{row.extra}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {config.type === "webInfo" && (
          <div>
            <p className="font-bold">{t("footerWebInfoDirector")}</p>
            <p>{t("footerWebInfoLine1")}</p>
            <p>{t("footerWebInfoLine2")}</p>
            <p>{t("footerWebInfoLine3")}</p>
            <p>{t("footerWebInfoLine4")}</p>
            <p>{t("footerWebInfoLine5")}</p>

            <br />

            <p>{t("footerWebInfoTel")}</p>
            <p>{t("footerWebInfoFax")}</p>
            <p>
              email:{" "}
              <span className="font-bold italic text-blue-700">
                director.rac@gov.in
              </span>
            </p>
          </div>
        )}

        {config.type === "about" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
            <div>
              <div className="inline-block border border-gray-300 bg-white p-2 shadow-md">
                <img
                  src="https://rac.gov.in/images/content/about.jpg"
                  alt="RAC Building"
                  className="w-full max-w-[280px]"
                />
              </div>
            </div>

            <div>
              <p>{t("footerAboutP1")}</p>

              <h2 className="mt-5 text-2xl text-red-500">
                {t("footerAboutResp")}
              </h2>

              <ol className="ml-6 mt-2 list-decimal">
                <li>{t("footerAboutLi1")}</li>
                <li>{t("footerAboutLi2")}</li>
                <li>{t("footerAboutLi3")}</li>
                <li>{t("footerAboutLi4")}</li>
              </ol>
            </div>
          </div>
        )}

        {config.type === "interface" && (
          <div>
            <h1 className="mb-5 text-4xl font-bold text-amber-900 dark:text-amber-400">
              {t("footerInterfaceHeading")}
            </h1>

            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-200 dark:bg-gray-800">
                  <th className="p-3">{t("footerDesignation")}</th>
                  <th className="p-3">{t("footerTelEmail")}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    isHi ? "निदेशक RAC" : "Director RAC",
                    "+91-11-23817833, 23810314, 23889507, Fax: +91-11-23812690",
                    "director.rac@gov.in",
                  ],
                  [
                    isHi ? "शिकायत अधिकारी" : "Grievance Officer",
                    "+91-11-23933013, 23889550",
                    "cpio.rac@gov.in",
                  ],
                  [
                    isHi ? "एचआरडी समन्वयक" : "HRD Coordinator",
                    "+91-11-23971049, 23889520",
                    "",
                  ],
                  [
                    isHi ? "सतर्कता अधिकारी" : "Vigilance Officer",
                    "+91-11-23933013, 23889550",
                    "security.recruitment@gov.in",
                  ],
                  [
                    isHi ? "केंद्रीय लोक सूचना अधिकारी (CPIO)" : "Central Public Information Officer (CPIO)",
                    "+91-11-23933013, 23889550",
                    "cpio.rac@gov.in",
                  ],
                  [
                    isHi ? "जनसंपर्क अधिकारी (PRO)" : "Public Relations Officer (PRO)",
                    "+91-11-23889526, 23830599",
                    "pro.recruitment@gov.in",
                  ],
                  [isHi ? "सुरक्षा अधिकारी" : "Security Officer", "+91-11-23971049, 23889520", ""],
                  [isHi ? "लेखा अधिकारी" : "Accounts Officer", "+91-11-23811882, 23889571", ""],
                  [isHi ? "भंडार अधिकारी" : "Stores Officer", "+91-11-23889580", ""],
                  [
                    isHi ? "कार्य एवं अग्नि सुरक्षा अधिकारी" : "Works, Fire Safety Officer",
                    "+91-11-23889523",
                    "works.rac@gov.in",
                  ],
                  ["MTO", "+91-11-23889525", ""],
                ].map(([designation, phone, email], index) => (
                  <tr
                    key={designation}
                    className={index % 2 ? "bg-gray-100 dark:bg-gray-800" : ""}
                  >
                    <td className="p-3">{designation}</td>
                    <td className="p-3">
                      <p>{phone}</p>
                      {email && (
                        <p className="font-bold italic text-blue-700">{email}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-5 bg-gray-100 p-4 dark:bg-gray-800">
              <p className="font-bold">{t("footerCorrespondence")}</p>
              <p>{isHi ? "निदेशक" : "DIRECTOR"}</p>
              <p>{t("footerWebInfoLine1")}</p>
              <p>{t("footerWebInfoLine2")}</p>
              <p>{t("footerWebInfoLine3")}</p>
              <p>{t("footerWebInfoLine4")}</p>
              <p>{t("footerWebInfoLine5")}</p>
            </div>
          </div>
        )}

        {config.type === "sitemap" && (
          <div>
            <h2 className="text-3xl">RAC</h2>
            <ul className="ml-8 mt-3 list-disc">
              <li>{isHi ? "हमारे बारे में" : "About Us"}</li>
              <li>
                {isHi ? "प्रबंधन" : "Management"}
                <ul className="ml-8 list-[circle]">
                  <li>{isHi ? "अध्यक्ष" : "Chairman"}</li>
                  <li>{isHi ? "निदेशक" : "Director"}</li>
                </ul>
              </li>
              <li>
                {isHi ? "कार्यक्रम" : "Programmes"}
                <ul className="ml-8 list-[circle]">
                  <li>{isHi ? "भर्ती" : "Recruitment"}</li>
                  <li>{isHi ? "मूल्यांकन" : "Assessment"}</li>
                  <li>{isHi ? "पीजी प्रशिक्षण हेतु चयन" : "Selection for PG Training"}</li>
                </ul>
              </li>
              <li>{isHi ? "हमारा दृष्टिकोण" : "Our Approach"}</li>
              <li>DRDS</li>
              <li>FAQs</li>
            </ul>

            <h2 className="mt-6 text-3xl">
              {isHi ? "कैरियर अवसर" : "Career Opportunity"}
            </h2>
            <ul className="ml-8 mt-3 list-disc">
              <li>{isHi ? "पार्श्व प्रवेश" : "Lateral Entry"}</li>
              <li>{isHi ? "एनआरआई इंडक्शन" : "NRI Induction"}</li>
            </ul>

            <h2 className="mt-6 text-3xl">
              {isHi ? "विभागीय परीक्षाएँ" : "Departmental Exams"}
            </h2>
            <ul className="ml-8 mt-3 list-disc">
              <li>LDCE</li>
            </ul>
          </div>
        )}

        {config.type === "help" && (
          <div className="space-y-5">
            <p>{t("footerHelpIntro")}</p>
            <h2 className="text-3xl">{t("footerAccessibility")}</h2>
            <p>{t("footerHelpP1")}</p>
            <p>{t("footerHelpP2")}</p>
            <p>{t("footerHelpP3")}</p>
            <p>{t("footerHelpP4")}</p>

            <h2 className="text-3xl">{t("footerSearchFacility")}</h2>
            <p>{t("footerSearchText")}</p>

            <h2 className="text-3xl">{t("footerSitemapTitle")}</h2>
            <p>{t("footerSitemapText")}</p>

            <h2 className="text-3xl">{t("footerFeedback")}</h2>
            <p>{t("footerFeedbackText")}</p>

            <h2 className="text-3xl">{t("footerFurtherHelp")}</h2>
            <p>{t("footerFurtherHelpText")}</p>
          </div>
        )}

        {config.type === "refund" && <p>{t("footerRefundText")}</p>}

        {config.type === "disclaimer" && (
          <div className="space-y-6">
            <p>{t("footerDisclaimerP1")}</p>
            <p>{t("footerDisclaimerP2")}</p>
          </div>
        )}

        {config.type === "policies" && (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[330px_1fr]">
            <div className="border border-gray-200">
              {policyMenu.map((item, index) => (
                <div
                  key={item}
                  className={`border-b px-4 py-3 ${
                    index === 0
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {policyContent.map(([heading, text]) => (
                <section key={heading} className="border-b border-gray-300 pb-4">
                  <h2 className="mb-3 text-3xl">{heading}</h2>
                  <p>{t(text)}</p>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    </LandingLayout>
  );
}