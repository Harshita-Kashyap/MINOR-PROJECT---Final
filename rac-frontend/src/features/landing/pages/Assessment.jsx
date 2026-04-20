import { useTranslation } from "react-i18next";
import LandingLayout from "../../../layouts/LandingLayout";

export default function Assessment() {
  const { i18n } = useTranslation();
  const isHindi = i18n.language === "hi";

  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          {isHindi ? "मूल्यांकन" : "Assessment"}
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            {isHindi
              ? "DRDS वैज्ञानिकों को ग्रेड 'B'/'C'/'D'/'E' से अगले उच्च ग्रेड में पदोन्नति हेतु मूल्यांकन बोर्ड मध्य अप्रैल से मध्य जून के दौरान DRDO प्रयोगशालाओं / प्रतिष्ठानों के प्रमुख केंद्रों जैसे बैंगलोर, दिल्ली, हैदराबाद और पुणे में आयोजित किए जाते हैं। विभिन्न विषयों में उम्मीदवारों की संख्या के अनुसार साक्षात्कार अन्य स्थानों जैसे बालासोर, चंडीगढ़ और देहरादून में भी आयोजित किए जा सकते हैं। दिल्ली में साक्षात्कार बोर्ड RAC में आयोजित किए जाते हैं।"
              : "Assessment Boards for promotion of DRDS Scientists in the grades 'B'/'C'/'D'/'E' to next higher grade are held during mid April to mid June at locations of major concentration of DRDO Labs/ Estts. viz Bangalore, Delhi, Hyderabad, and Pune. Depending on number of candidates in different disciplines, the interviews may be conducted at other locations also viz Balasore, Chandigarh and Dehradun. In Delhi, interview boards are conducted at RAC."}
          </p>

          <p>
            {isHindi
              ? "मूल्यांकन बोर्ड की अध्यक्षता RAC के अध्यक्ष या सह-अध्यक्ष द्वारा की जाती है, जो प्रतिष्ठित वैज्ञानिकों एवं तकनीकी विशेषज्ञों के एक पैनल से होते हैं। कोर समिति में एक अध्यक्ष, दो कोर सदस्य तथा अन्य सदस्यों में एक विभागीय विशेषज्ञ और विषय के दो बाहरी विशेषज्ञ शामिल होते हैं। सामान्यतः विषय का एक बाहरी विशेषज्ञ किसी शैक्षणिक संस्थान से और दूसरा DRDO जैसी गतिविधियों में संलग्न किसी वैज्ञानिक संस्थान से होता है, ताकि शैक्षणिक आधार और अनुप्रयुक्त अनुसंधान एवं विकास दोनों का आकलन किया जा सके। प्रत्येक उम्मीदवार के लिए संबंधित प्रयोगशाला के निदेशक या उनका प्रतिनिधि भी मूल्यांकन बोर्ड का सदस्य होता है तथा आवश्यकता पड़ने पर SC/ST प्रतिनिधि को सह-समाविष्ट किया जाता है।"
              : "The Assessment Boards are chaired by Chairman RAC or a Co-Chairperson from a panel which consists of reputed Scientists & Technologists. The Core Committee constitutes a Chairperson, two Core Members and the other members includes a Departmental Expert and two External Experts from the Subject. Normally, one External Expert of the Subject is from an academic institution and the other one from a scientific institution engaged in activities similar to DRDO, to assess both academic foundation as well as applied research & development. For each candidate Director of the Lab or his Representative is also the Member of the Assessment Board and SC/ ST rep is co-opted on requirement basis."}
          </p>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            {isHindi ? "साक्षात्कार की प्रक्रिया" : "Procedure for Interview"}
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>
              {isHindi
                ? "प्रयोगशाला निदेशक से अध्यक्ष द्वारा अनुरोध किया जाता है कि वे बोर्ड को उम्मीदवार को सौंपी गई जिम्मेदारियों और साक्षात्कार में उपस्थित वैज्ञानिक द्वारा किए गए योगदानों के बारे में अवगत कराएँ। बोर्ड से अपेक्षा की जाती है कि वह APAR में मूल्यांकन हेतु दर्शाए गए विषय में वैज्ञानिक का साक्षात्कार ले।"
                : "The Lab Director is requested by the Chairperson to brief the Board on the type of responsibilities entrusted to the candidate and the contributions made by the Scientist appearing in the interview. The board is supposed to interview the Scientist in the discipline indicated for assessment in the APAR."}
            </p>

            <p>
              {isHindi
                ? "वैज्ञानिक के बोर्ड कक्ष में प्रवेश करने के बाद, अध्यक्ष बायोडाटा की समीक्षा करते हैं और फिर वैज्ञानिक को अपनी उपलब्धियों तथा भविष्य की कार्ययोजना का संक्षिप्त प्रस्तुतीकरण (10-15 मिनट) देने के लिए आमंत्रित करते हैं। वैज्ञानिक से अपेक्षा की जाती है कि वह केवल अपने व्यक्तिगत योगदान और उपलब्धियों को ही रेखांकित करे। प्रस्तुतीकरण के बाद बोर्ड के सभी सदस्य क्रमवार वैज्ञानिक से संवाद करते हैं।"
                : "After the Scientist enters the Board Room, the Chairperson reviews the Bio-data, and then invites the Scientist to make a brief presentation (10-15 minutes) of the achievements and the future plans of action. The Scientist is required to highlight only personal contributions and achievements. After the presentation all the members of the Board are requested to interact with the Scientist turn-wise."}
            </p>

            <p>
              {isHindi
                ? "सावधानीपूर्वक चुने गए विभागीय और बाहरी विशेषज्ञों से युक्त मूल्यांकन बोर्ड संतोषजनक निर्णय तक पहुँचने में सहायता करता है। कुछ स्थितियों में मूल्यांकन बोर्ड निर्णय तक पहुँचने से पहले विशेष सावधानी बरतते हैं, जैसे:"
                : "The Assessment Board, which consists of carefully selected Departmental and External Experts can help converge to a satisfactory judgment. There are some situations in which the Assessment Boards take adequate precaution to arrive at a decision e.g."}
            </p>

            <ol className="list-decimal space-y-2 pl-8">
              <li>
                {isHindi
                  ? "संयुक्त परियोजना में व्यक्ति के योगदान की स्पष्ट पहचान होनी चाहिए। कोई व्यक्ति अत्यंत सफल और प्रतिष्ठित परियोजना में बहुत कम योगदान भी दे सकता है।"
                  : "In a joint project, the contribution of the individual has to be clearly identified. An individual may have done very little in a highly successful and prestigious project."}
              </li>
              <li>
                {isHindi
                  ? "कुछ उम्मीदवार अच्छे वक्ता और उत्कृष्ट प्रस्तुतकर्ता होते हैं, जबकि कुछ नहीं। वाक्पटुता का गुण उम्मीदवार की वास्तविक योग्यता पर हावी नहीं होना चाहिए।"
                  : "Some candidates are good speakers and excellent presenters. Other are not so well endowed. The gift of good oration should not overshadow the real merit of the candidate."}
              </li>
            </ol>

            <p>
              {isHindi
                ? "यदि मूल्यांकन बोर्ड द्वारा आंका गया वैज्ञानिक का समग्र स्तर वर्तमान निवास अवधि के लिए निर्धारित अर्हक अंकों के अनुरूप होता है, तो उम्मीदवार को 'Fit For Promotion' की संस्तुति दी जाती है। अन्यथा संस्तुति 'Not Yet Fit For Promotion' होती है।"
                : "If the overall caliber of the Scientist as judged by the Assessment Board matches with the prescribed qualifying marks required for the current residency period, the candidate is recommended as 'Fit For Promotion'. Otherwise the recommendation is 'Not Yet Fit For Promotion'."}
            </p>

            <p>
              {isHindi
                ? "उम्मीदवार की इच्छा होने पर साक्षात्कार में हिंदी माध्यम का उपयोग किया जा सकता है।"
                : "Hindi may be used as a medium at the interview if desired by the candidate."}
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            {isHindi ? "सहकर्मी समीक्षा" : "Peer Review"}
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>
              {isHindi
                ? "DRDS वैज्ञानिकों को ग्रेड 'F' से 'G' तथा 'G' से 'H' में पदोन्नति 1 जुलाई से Flexible Complementing Scheme (FCS) के अंतर्गत की जाती है, जो उनकी Annual Performance Assessment Report (APAR) के आंतरिक स्क्रीनिंग समिति द्वारा मूल्यांकन तथा पीयर समिति द्वारा आकलन पर आधारित होती है।"
                : "The promotion of DRDS Scientists in the grades 'F' to 'G' and 'G' to 'H' is made w.e.f. 1st July under the Flexible Complementing scheme (FCS) on the basis of the evaluation of their Annual Performance Assessment Report (APAR) by the Internal Screening Committee and assessment by the Peer committee."}
            </p>

            <p>
              {isHindi
                ? "मूल्यांकन से संबंधित वर्ष की 30 जून तक न्यूनतम निवास अवधि पाँच वर्ष है। जो वैज्ञानिक 01 जुलाई के बाद अपने नियंत्रण से परे कारणों से शामिल हुए हों, उन्हें अर्हक सेवा में तीन माह तक की छूट दी जाती है। उन Scientist 'F' को एक वर्ष की निवास अवधि की छूट दी जाती है जिन्हें लगातार चार CPAR में 90% या उससे अधिक अंक प्राप्त होने पर 'Exceptionally Brilliant' आंका गया हो।"
                : "The minimum residency period is five years as on 30 June of the year to which assessment pertains. Relaxation up to three months in qualifying service is given to those who joined after 01 July due to reasons beyond their control. Relaxation of one year residency period is granted to Scientists 'F' who have been consistently assessed as \"Exceptionally Brilliant\" having secured 90% or above marks in four successive CPARs."}
            </p>

            <p>
              {isHindi
                ? "पीयर समिति वर्तमान ग्रेड में वैज्ञानिकों द्वारा किए गए योगदानों का समग्र दृष्टिकोण से मूल्यांकन करती है और वैज्ञानिक अनुसंधान एवं विकास की गुणवत्ता, सौंपे गए कार्यों की समयबद्ध पूर्ति, प्रबंधन क्षमता, नेतृत्व गुण, चुनौतियों का सामना करने की प्रेरणा, कार्य के प्रति समर्पण, उच्च दायित्व ग्रहण करने की क्षमता और विशेषज्ञता के क्षेत्रों जैसे गुणों का आकलन करती है।"
                : "The Peer committee takes holistic view of the contributions made by the Scientists in the present grade and evaluates attributes such as quality of scientific R & D activity, timely completion of tasks assigned, management ability and leadership quality, motivation in facing challenges, dedication to work, potential for undertaking higher responsibility and areas of strength."}
            </p>

            <p>
              {isHindi
                ? "पीयर समिति, Scientist 'G' के पद पर पदोन्नति हेतु अनुशंसित Scientist 'F' को प्रति माह Rs. 4000/- का विशेष वेतन देने की भी संस्तुति कर सकती है।"
                : "Peer Committee may also recommend the special pay of Rs. 4000/- per month to Scientists 'F' recommended for promotion to Scientists 'G'."}
            </p>

            <p>
              {isHindi
                ? "यही पीयर समिति Scientist 'G' को Scientist 'H' (Outstanding Scientist) के पद पर पदोन्नति हेतु आकलित करेगी, जिन्होंने ग्रेड में 3 वर्ष की नियमित सेवा पूरी कर ली हो और जिन्हें ISC द्वारा योग्यता, उपलब्धियों, नेतृत्व और प्रबंधकीय गुणों के आधार पर अनुशंसित किया गया हो। यही समिति Distinguished Scientists ग्रेड प्रदान करने की भी संस्तुति करेगी।"
                : "The same Peer Committee shall assess the Scientists 'G' for promotion to the post of Scientist 'H' (Outstanding Scientist) who have completed 3 years regular service in the Grade and have been recommended by ISC, based on merit, achievements, leadership and managerial qualities. The Same Committee will also recommend conferring the Grade of Distinguished Scientists."}
            </p>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}