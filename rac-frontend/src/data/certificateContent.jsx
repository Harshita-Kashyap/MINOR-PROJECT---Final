const certificateContent = {
  bonafideCertificate: {
    title: "Bonafide Certificate",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold underline">Certificate</h2>
          <p className="text-xl font-semibold">(on the Institute’s letter head)</p>
        </div>

        <h3 className="mt-10 text-center text-2xl font-bold underline">
          To whom it may concern
        </h3>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            This is to certify that Mr/Ms
            <span className="inline-block min-w-[280px] border-b border-gray-800 align-middle">&nbsp;</span>
            ,
          </p>

          <p>
            Enrolment/Registration no.
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            {" "}is a bonafide student of final year/semester of this college.
            On completion of the course and subject to his/her fulfilling all
            other criteria, he/she will be awarded the following degree:
          </p>

          <div className="mt-8 min-h-[60px] border-b border-gray-800" />

          <div className="mt-16 flex items-start justify-between gap-8">
            <p className="text-[18px]">Date:</p>

            <div className="text-center text-[18px] leading-8">
              <p>Name, Signature and stamp of</p>
              <p>Head of the Institution</p>
            </div>
          </div>

          <div className="mt-20 text-[16px] font-semibold leading-8">
            <p>
              ** Note: Please mention the exact degree name that shall appear on
              the degree certificate/ provisional degree/ certificate eg.
              B.Tech Mechanical Engineering
            </p>
          </div>
        </div>
      </div>
    ),
  },

  intimationLetter: {
    title: "Intimation to CCA Format",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <div className="space-y-5 text-[18px] leading-10">
          <div>
            <p>To</p>
            <p>&lt;Designation of Cadre Controlling Authority&gt;</p>
            <p>&lt;Address of Cadre Controlling Authority&gt;</p>
            <p>__________________________________</p>
            <p>__________________________________</p>
          </div>

          <div className="pt-4">
            <p className="font-semibold">
              Subject: Intimation for applying for Post of Scientist ‘B’ in Advt. no. 145
            </p>
          </div>

          <p>Sir/Madam,</p>

          <div className="space-y-5">
            <p>
              1. It is to inform that I, &lt;name of candidate&gt;, have applied
              for the post of Scientist ‘B’ in RAC Advt. no. 145 on
              &lt;date of application&gt;, which was published recently.
            </p>

            <p>
              2. As per the advertisement, RAC may be directly contacted in case
              of any objection to my application for the said post or for any
              clarification needed.
            </p>

            <p>
              3. Kindly acknowledge receipt of this letter in the space below.
            </p>
          </div>

          <div className="pt-8 space-y-2">
            <p>&lt;Signature of candidate&gt;</p>
            <p>&lt;Name of candidate&gt;</p>
            <p>&lt;Designation of candidate&gt;</p>
            <p>&lt;Name of the Institution&gt;</p>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8">
            <h3 className="text-xl font-bold underline">Acknowledgement Receipt</h3>
            <p className="mt-4">Receipt of above intimation letter is acknowledged.</p>

            <div className="mt-8 flex items-start justify-between gap-8">
              <p>&lt;&lt;Date&gt;&gt;</p>

              <div className="text-right">
                <p>&lt;&lt;Signature with Stamp of Office&gt;&gt;</p>
                <p>&lt;&lt;Name&gt;&gt;</p>
                <p>&lt;&lt;Designation&gt;&gt;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  obcProof: {
    title: "OBC Certificate Proforma",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline leading-10">
          Form of Certificate to be Produced by Other Backward Classes
          <br />
          Applying for Appointment to Posts Under the Government of India
        </h2>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            This is to certify that Shri/Smt./Kumari{" "}
            <span className="inline-block min-w-[260px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            son/daughter of{" "}
            <span className="inline-block min-w-[250px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            of village/town{" "}
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            in District/Division{" "}
            <span className="inline-block min-w-[250px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            in the State/Union Territory{" "}
            <span className="inline-block min-w-[250px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            belongs to the{" "}
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            community which is recognized as a backward class under the
            Government of India resolution dated{" "}
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <p>
            Shri/Smt./Kumari{" "}
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            and/or his/her family ordinarily reside(s) in the{" "}
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            District/Division of the{" "}
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>{" "}
            State/Union Territory. This is also to certify that he/she does not
            belong to the persons/ sections (Creamy Layer).
          </p>

          <div className="mt-14 flex justify-end">
            <div className="text-right text-[18px] leading-10">
              <p>District Magistrate</p>
              <p>Deputy Commissioner etc.</p>
            </div>
          </div>

          <div className="mt-10">
            <p className="text-[18px]">Dated:</p>
            <p className="mt-10 text-[18px]">Seal</p>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-6 text-[16px] leading-8">
            <p>* Mention the exact Government of India OBC resolution details.</p>
            <p>** As amended from time to time.</p>
            <p className="mt-6">
              Note:- The term “Ordinarily” used here will have the same meaning
              as in Section 20 of the Representation of the People Act, 1950.
            </p>
          </div>
        </div>
      </div>
    ),
  },

  obcDeclaration: {
    title: "OBC Declaration",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration
        </h2>
        <p className="mt-2 text-center text-lg font-semibold">
          (For OBC candidates)
        </p>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            I,
            <span className="inline-block min-w-[240px] border-b border-gray-800 align-middle">&nbsp;</span>
            son/daughter of Shri
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            resident of village/town/city
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            district
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            state
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            hereby declare that I belong to the
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            community contained in the relevant DoPT OBC memorandum.
          </p>

          <p>
            It is also declared that I do not belong to persons/sections
            (Creamy layer) mentioned in the schedule to the applicable Office
            Memorandum, as amended from time to time.
          </p>

          <div className="mt-14 flex items-start justify-between gap-8">
            <div className="space-y-6 text-[18px]">
              <p>Place: ____________________</p>
              <p>Date: _____________________</p>
            </div>

            <div className="pt-10 text-center text-[18px]">
              <p>Signature of Candidate</p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 text-[16px] leading-8">
            <p>* Declaration not signed by the OBC candidates will be rejected.</p>
          </div>
        </div>
      </div>
    ),
  },

  ewsCertificate: {
    title: "EWS Certificate Proforma",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline leading-10">
          Income & Asset Certificate
          <br />
          for Economically Weaker Sections
        </h2>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            Certificate No.
            <span className="inline-block min-w-[160px] border-b border-gray-800 align-middle">&nbsp;</span>
            {" "}Date:
            <span className="inline-block min-w-[160px] border-b border-gray-800 align-middle">&nbsp;</span>
          </p>

          <p>
            This is to certify that Shri/Smt./Kumari
            <span className="inline-block min-w-[240px] border-b border-gray-800 align-middle">&nbsp;</span>
            son/daughter/wife of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            permanent resident of
            <span className="inline-block min-w-[260px] border-b border-gray-800 align-middle">&nbsp;</span>
            whose photograph is attested below belongs to Economically Weaker
            Sections, since the gross annual income of his/her family is
            below Rs. 8 lakh for the financial year
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <p>His/her family does not own or possess any of the following assets:</p>

          <div className="pl-6 text-[18px] leading-10">
            <p>1. 5 acres of agricultural land and above</p>
            <p>2. Residential flat of 1000 sq. ft. and above</p>
            <p>3. Residential plot of 100 sq. yards and above in notified municipalities</p>
            <p>4. Residential plot of 200 sq. yards and above in areas other than notified municipalities</p>
          </div>

          <p>
            Shri/Smt./Kumari
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            belongs to the
            <span className="inline-block min-w-[200px] border-b border-gray-800 align-middle">&nbsp;</span>
            caste which is not recognized as a Scheduled Caste, Scheduled Tribe
            or Other Backward Class (Central List).
          </p>

          <div className="mt-14 flex items-start justify-between gap-8">
            <div className="h-28 w-24 border border-gray-500 text-center text-sm flex items-center justify-center">
              Attested
              <br />
              Photograph
            </div>

            <div className="text-right text-[18px] leading-10">
              <p>Signature with seal of Office</p>
              <p>Name:</p>
              <p>Designation:</p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 text-[16px] leading-8">
            <p>Note 1: Income covers all sources i.e. salary, agriculture, business, profession, etc.</p>
            <p>Note 2: Family includes the candidate, parents, spouse and minor children.</p>
            <p>Note 3: Property held by the family in different places is clubbed for EWS status.</p>
          </div>
        </div>
      </div>
    ),
  },

  ewsDeclaration: {
    title: "EWS Declaration",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration
        </h2>
        <p className="mt-2 text-center text-lg font-semibold">
          (For EWS Candidates)
        </p>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            I
            <span className="inline-block min-w-[240px] border-b border-gray-800 align-middle">&nbsp;</span>
            son/daughter of Shri
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            resident of village/town/city
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            district
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            state
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            hereby declare that I belong to the Economically Weaker Sections.
          </p>

          <p>
            If at any stage the information given by me is found to be
            incorrect, my candidature may be treated as cancelled.
          </p>

          <div className="mt-14 flex items-start justify-between gap-8 text-[18px]">
            <div className="space-y-6">
              <p>Place: ___________________</p>
              <p>Date: ____________________</p>
            </div>

            <div className="space-y-6">
              <p>Signature: ___________________</p>
              <p>Name: _______________________</p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 text-[16px] leading-8">
            <p>* Declaration not signed by the EWS candidates will be rejected.</p>
          </div>
        </div>
      </div>
    ),
  },

  scstProof: {
    title: "SC/ST Proforma",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline leading-10">
          The Form of the Certificate to be Produced by
          <br />
          Scheduled Castes and Scheduled Tribes Candidates
          <br />
          Applying for Appointment to Posts under Government of India
        </h2>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            This is to certify that Shri/Shrimati/Kumari*
            <span className="inline-block min-w-[240px] border-b border-gray-800 align-middle">&nbsp;</span>
            son/daughter* of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            of village/town*
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            in District/Division
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            of the State/Union Territory*
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            belongs to the Caste/Tribe*
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            which is recognized as a Scheduled Caste/Scheduled Tribe*.
          </p>

          <p>
            This certificate is issued on the basis of the caste/tribe
            certificate issued to the parent/guardian, where applicable.
          </p>

          <p>
            Shri/Shrimati/Kumari
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            and/or his/her family ordinarily reside(s) in village/town*
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            of District/Division*
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            of the State/Union Territory of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <div className="mt-14 flex items-start justify-between gap-8">
            <div className="space-y-6 text-[18px]">
              <p>Place: ____________________</p>
              <p>Date: _____________________</p>
            </div>

            <div className="text-center text-[18px] leading-10">
              <p>Signature _____________________</p>
              <p>Designation ___________________</p>
              <p>(with seal of office)</p>
              <p>State / Union Territory</p>
            </div>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6 text-[16px] leading-8">
            <p>* Please delete the words which are not applicable.</p>
            <p>Note: “ordinarily resides” has the same meaning as in the Representation of the People Act, 1950.</p>
          </div>
        </div>
      </div>
    ),
  },

  pwdProof: {
    title: "PWD Certificate Proforma",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold uppercase underline">
            Certificate for the Persons with Disabilities
          </h2>
          <p className="mt-2 text-lg font-semibold">
            Standard Format of the Certificate
          </p>
        </div>

        <div className="mt-10 space-y-6 text-[18px] leading-10">
          <div>
            <p>NAME & ADDRESS OF THE INSTITUTE, issuing the Certificate</p>
            <div className="mt-3 border-b border-gray-800" />
            <div className="mt-6 border-b border-gray-800" />
          </div>

          <p>
            Certificate No.
            <span className="inline-block min-w-[160px] border-b border-gray-800 align-middle">&nbsp;</span>
            {" "}Date
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
          </p>

          <p>
            This is to certify that Shri/Smt/Km
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            Son/wife/daughter of Shri
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            Age
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            old, Registration No.
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            is a case of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <p>
            He/She has
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            % permanent disability in relation to his/her
            <span className="inline-block min-w-[160px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <div className="space-y-4">
            <p>1. This condition is progressive / non-progressive / likely to improve / not likely to improve.</p>
            <p>2. Re-assessment is not recommended / is recommended after a period of months / years.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="space-y-10">
              <p>Signature / Thumb impression of the patient</p>
              <p>(Doctor) ____________________</p>
              <p>Seal</p>
              <p>(Doctor) ____________________</p>
              <p>Seal</p>
              <p>(Doctor) ____________________</p>
              <p>Seal</p>
            </div>

            <div className="flex flex-col items-end justify-between">
              <div className="h-36 w-32 border border-gray-500 text-center text-sm flex items-center justify-center">
                Affix here recent
                <br />
                attested photograph
                <br />
                showing the disability
              </div>

              <p className="mt-10 text-right">
                Countersigned by the Medical Supdt./
                <br />
                CMO/Head of Hospital (with seal)
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  ccaDeclaration142: {
    title: "Declaration Regarding Intimation to Cadre Controlling Authority",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration Regarding Intimation to Cadre Controlling Authority
        </h2>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            Certified that I
            <span className="inline-block min-w-[150px] border-b border-gray-800 align-middle">&nbsp;</span>
            am working as
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the office of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            on regular / ad-hoc / contract basis since
            <span className="inline-block min-w-[130px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the pay band
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            with Grade Pay Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            / on consolidated salary Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            per month.
          </p>

          <p>
            It is certified that I have intimated my cadre controlling authority
            (CCA) that I am applying for the post of
            <span className="inline-block min-w-[200px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Item No.
            <span className="inline-block min-w-[70px] border-b border-gray-800 align-middle">&nbsp;</span>
            against Advt. No.
            <span className="inline-block min-w-[90px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <p>
            I also understand that I will be required to produce a copy of proof
            of my communication with my employer (intimation and acknowledgement)
            regarding application for the desired post at the time of interview.
          </p>

          <p>
            I have also informed my CCA that in case they have any objection to
            my application, they may communicate to RAC directly within 15 days
            of the closing date of online application submission.
          </p>

          <p>
            I also understand that in case a communication from my employer is
            received by RAC withholding the permission, my candidature will be
            liable for cancellation.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="text-[18px] font-semibold">Signature of the Candidate</p>
            </div>
          </div>

          <p className="pt-16 text-[17px]">
            (To be signed, scanned and uploaded with online application, if
            applicable as per advertisement)
          </p>
        </div>
      </div>
    ),
  },

  declarationIntimation145: {
    title: "Declaration Intimation to CCA Format (ADVT-145)",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration Regarding Intimation to Cadre Controlling Authority
        </h2>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            Certified that I
            <span className="inline-block min-w-[150px] border-b border-gray-800 align-middle">&nbsp;</span>
            am working as
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the office of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            on regular / ad-hoc / contract basis since
            <span className="inline-block min-w-[130px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the pay band
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            with Grade Pay Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            / on consolidated salary Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            per month.
          </p>

          <p>
            It is certified that I have intimated my cadre controlling authority
            that I am applying for the post of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Item No.
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            against Advt. No.
            <span className="inline-block min-w-[90px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <p>
            I have also informed my CCA that in case they have any objection to
            my application, they may communicate to RAC directly.
          </p>

          <p>
            I understand that I will be required to produce a copy of the
            intimation letter to my employer regarding application for the
            desired post at the time of interview.
          </p>

          <p>
            I hereby declare that the above information furnished by me is true
            and correct. If the information given by me is found to be false or
            incorrect, my candidature shall be liable for cancellation.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="text-[18px] font-semibold">Signature of the Candidate</p>
            </div>
          </div>

          <p className="pt-16 text-[17px]">
            (To be signed, scanned and uploaded with online application, if applicable as per advertisement)
          </p>
        </div>
      </div>
    ),
  },

  intimationAda123: {
    title: "Intimation Letter to CCA Format (ADA ADVT-123)",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration Regarding Intimation to Cadre Controlling Authority
        </h2>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            Certified that I
            <span className="inline-block min-w-[150px] border-b border-gray-800 align-middle">&nbsp;</span>
            am working as
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the office of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            on regular / ad-hoc / contract basis since
            <span className="inline-block min-w-[130px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the pay band
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            with Grade Pay Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            / on consolidated salary Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            per month.
          </p>

          <p>
            It is certified that I have intimated my cadre controlling authority
            (CCA) that I am applying for the post of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Post Serial No.
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            against ADA Advt. No. 123.
          </p>

          <p>
            I will be required to produce proof of communication with my employer
            (intimation and acknowledgement) at the time of interview.
          </p>

          <p>
            In case my employer communicates withholding permission, my
            candidature will be liable for cancellation.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="text-[18px] font-semibold">Signature of the Candidate</p>
            </div>
          </div>

          <p className="pt-16 text-[17px]">
            (To be signed, scanned and uploaded with online application, if applicable as per advertisement)
          </p>

          <p className="text-[17px]">
            Communication to ADA shall be made through email to admin-hr.ada@gov.in only
          </p>
        </div>
      </div>
    ),
  },

  noRecording147: {
    title: "No Recording Undertaking (147)",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <div className="text-center">
          <p className="text-3xl font-bold underline">ADVT. NO. 147</p>
          <p className="mt-2 text-2xl font-semibold">ONLINE PRELIMINARY INTERVIEW</p>
          <p className="text-2xl font-semibold">TECHNICAL SCREENING (Second level)</p>
          <h2 className="mt-4 text-3xl font-bold underline">UNDERTAKING</h2>
        </div>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            Name of the candidate:
            <span className="inline-block min-w-[420px] border-b border-gray-800 align-middle">&nbsp;</span>
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p>
              Item No.
              <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            </p>
            <p>
              Application No.
              <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <p>
              Date of Interview
              <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            </p>
            <p>
              Venue
              <span className="inline-block min-w-[230px] border-b border-gray-800 align-middle">&nbsp;</span>
            </p>
          </div>

          <p>
            Discipline
            <span className="inline-block min-w-[520px] border-b border-gray-800 align-middle">&nbsp;</span>
          </p>

          <p className="pt-6 text-center text-[20px] font-semibold leading-[3rem]">
            I hereby undertake not to carry any mechanical/electronic/other
            recording device(s) to the interview place / virtual board room,
            and will not audio or video record the interview proceedings in any
            manner. I fully understand that I am liable to be proceeded against
            and disciplined, if at any point of time, I am found to be involved
            / helping anyone in recording the interview proceedings in any form
            or manner.
          </p>

          <div className="mt-12 ml-auto w-fit space-y-3 text-[18px]">
            <p>Signature:</p>
            <p>Name:</p>
            <p>Date:</p>
            <p>Place:</p>
          </div>
        </div>
      </div>
    ),
  },

  ccaDeclaration154: {
    title: "Intimation Letter to CCA Format (ADVT-154)",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration Regarding Intimation to Cadre Controlling Authority
        </h2>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            Certified that I
            <span className="inline-block min-w-[150px] border-b border-gray-800 align-middle">&nbsp;</span>
            am working as
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the office of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            on regular / ad-hoc / contract basis since
            <span className="inline-block min-w-[130px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the pay band
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            with Grade Pay Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            / on consolidated salary Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            per month.
          </p>

          <p>
            It is certified that I have intimated my cadre controlling authority
            (CCA) that I am applying for the post of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Item No.
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            against Advt. No. 154.
          </p>

          <p>
            I also understand that I will be required to produce proof of my
            communication with my employer (intimation and acknowledgement).
          </p>

          <p>
            I have informed my CCA that in case they have any objection, they
            may communicate to RAC directly within the prescribed period.
          </p>

          <p>
            If communication from my employer withholding permission is received,
            my candidature will be liable for cancellation.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="text-[18px] font-semibold">Signature of the Candidate</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  ccaDeclarationAda128: {
    title: "Intimation Letter to CCA Format (ADA ADVT-128)",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration Regarding Intimation to Cadre Controlling Authority
        </h2>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            Certified that I
            <span className="inline-block min-w-[150px] border-b border-gray-800 align-middle">&nbsp;</span>
            am working as
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the office of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            on regular / ad-hoc / contract basis since
            <span className="inline-block min-w-[130px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the pay band
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            with Grade Pay Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            / on consolidated salary Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            per month.
          </p>

          <p>
            It is certified that I have intimated my cadre controlling authority
            (CCA) that I am applying for the post of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Post Serial No.
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            against ADA Advt. No. 128.
          </p>

          <p>
            I will be required to produce proof of communication with my employer
            (intimation and acknowledgement) at the time of interview.
          </p>

          <p>
            In case a communication from my employer withholding permission is
            received by ADA, my candidature will be liable for cancellation.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="text-[18px] font-semibold">Signature of the Candidate</p>
            </div>
          </div>

          <p className="pt-16 text-[17px]">
            Communication to ADA shall be made through email to admin-hr.ada@gov.in only
          </p>
        </div>
      </div>
    ),
  },

  ccaDeclaration152: {
    title: "CCA Declaration (Advt-152)",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration Regarding Intimation to Cadre Controlling Authority
        </h2>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            Certified that I
            <span className="inline-block min-w-[150px] border-b border-gray-800 align-middle">&nbsp;</span>
            am working as
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the office of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            on regular / ad-hoc / contract basis since
            <span className="inline-block min-w-[130px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the pay band
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            with Grade Pay Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            / on consolidated salary Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            per month.
          </p>

          <p>
            It is certified that I have intimated my cadre controlling authority
            (CCA) that I am applying for the post of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Item No.
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            against Advt. No.
            <span className="inline-block min-w-[100px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <p>
            I will be required to produce proof of communication with my employer
            (intimation and acknowledgement) at the time of interview.
          </p>

          <p>
            I have informed my CCA that any objection may be communicated to RAC
            directly within 15 days of the closing date.
          </p>

          <p>
            If communication withholding permission is received by RAC, my
            candidature will be liable for cancellation.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="text-[18px] font-semibold">Signature of the Candidate</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  intimationUndertaking156: {
    title: "Intimation-cum-Undertaking (Advt-156)",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold underline">
          Intimation-cum-Undertaking
        </h2>
        <p className="mt-2 text-center text-lg font-semibold">
          (for temporary government employee unable to get NOC) – Advt. 156
        </p>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            I,
            <span className="inline-block min-w-[240px] border-b border-gray-800 align-middle">&nbsp;</span>
            working as
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            in
            <span className="inline-block min-w-[260px] border-b border-gray-800 align-middle">&nbsp;</span>
            hereby intimate that I have applied for the post of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Advt. No. 156.
          </p>

          <p>
            I declare that I am presently unable to obtain No Objection
            Certificate from my employer before the closing date.
          </p>

          <p>
            I undertake that, if called for further selection process, I shall
            produce the requisite intimation / acknowledgement / NOC or any other
            document as required by RAC.
          </p>

          <p>
            I understand that if permission is withheld by my employer or if the
            declaration furnished by me is found incorrect, my candidature will
            be liable for cancellation.
          </p>

          <div className="mt-12 flex items-start justify-between gap-8">
            <div className="space-y-4">
              <p>Date: __________________</p>
              <p>Place: _________________</p>
            </div>
            <div className="text-right">
              <p>Signature of Candidate</p>
              <p>Name: __________________</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  intimationLetter156: {
    title: "Intimation Letter (Advt-156)",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <div className="space-y-5 text-[18px] leading-10">
          <div>
            <p>To</p>
            <p>&lt;Cadre Controlling Authority / Employer&gt;</p>
            <p>&lt;Address&gt;</p>
            <p>__________________________________</p>
            <p>__________________________________</p>
          </div>

          <div className="pt-4">
            <p className="font-semibold">
              Subject: Intimation for applying to RAC against Advt. No. 156
            </p>
          </div>

          <p>Sir/Madam,</p>

          <p>
            I hereby intimate that I have applied for the post of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            against Advt. No. 156.
          </p>

          <p>
            This intimation is being submitted as required under the terms of
            the advertisement. Kindly acknowledge receipt.
          </p>

          <div className="pt-8 space-y-2">
            <p>Signature of candidate</p>
            <p>Name: ______________________</p>
            <p>Designation: ________________</p>
            <p>Office: _____________________</p>
          </div>

          <div className="mt-12 border-t border-gray-800 pt-8">
            <h3 className="text-xl font-bold underline">Acknowledgement</h3>
            <p className="mt-4">Receipt of this intimation is acknowledged.</p>

            <div className="mt-8 flex items-start justify-between gap-8">
              <p>Date: __________________</p>

              <div className="text-right">
                <p>Signature with seal of office</p>
                <p>Name: __________________</p>
                <p>Designation: _____________</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  ccaDeclaration156: {
    title: "Declaration to CCA (Advt-156)",
    content: (
      <div className="mx-auto max-w-5xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold uppercase underline">
          Declaration Regarding Intimation to Cadre Controlling Authority
        </h2>

        <div className="mt-12 space-y-8 text-[18px] leading-10">
          <p>
            Certified that I
            <span className="inline-block min-w-[150px] border-b border-gray-800 align-middle">&nbsp;</span>
            am working as
            <span className="inline-block min-w-[170px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the office of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            on regular / ad-hoc / contract basis since
            <span className="inline-block min-w-[130px] border-b border-gray-800 align-middle">&nbsp;</span>
            in the pay band
            <span className="inline-block min-w-[140px] border-b border-gray-800 align-middle">&nbsp;</span>
            with Grade Pay Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            / on consolidated salary Rs.
            <span className="inline-block min-w-[120px] border-b border-gray-800 align-middle">&nbsp;</span>
            per month.
          </p>

          <p>
            It is certified that I have intimated my cadre controlling authority
            (CCA) that I am applying for the post of
            <span className="inline-block min-w-[180px] border-b border-gray-800 align-middle">&nbsp;</span>
            under Item No.
            <span className="inline-block min-w-[80px] border-b border-gray-800 align-middle">&nbsp;</span>
            against Advt. No. 156.
          </p>

          <p>
            I will be required to produce proof of communication with my employer
            (intimation and acknowledgement) at the time of interview.
          </p>

          <p>
            If any objection is received from my employer or permission is
            withheld, my candidature will be liable for cancellation.
          </p>

          <div className="mt-12 flex justify-end">
            <div className="text-center">
              <p className="text-[18px] font-semibold">Signature of the Candidate</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  netDeclaration: {
    title: "NET Declaration",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold underline">
          Declaration by Candidate Due to Appear / Awaiting NET Result
        </h2>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            I,
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            son/daughter of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            hereby declare that I have appeared / am due to appear in the
            National Eligibility Test (NET) relevant to the advertised post.
          </p>

          <p>
            I undertake that I shall submit the proof of qualifying NET as and
            when required by the recruiting authority.
          </p>

          <p>
            I understand that if I fail to qualify / produce valid proof within
            the prescribed time, my candidature will be liable to cancellation.
          </p>

          <p>
            I further declare that the information furnished by me is true and
            correct to the best of my knowledge.
          </p>

          <div className="mt-12 flex items-start justify-between gap-8">
            <div className="space-y-4">
              <p>Date: __________________</p>
              <p>Place: _________________</p>
            </div>
            <div className="text-right">
              <p>Signature of Candidate</p>
              <p>Name: __________________</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  finalYearDeclaration: {
    title: "Declaration for Final Year Candidates",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-center text-2xl font-bold underline">
          Declaration for Final Year / Final Semester Candidates
        </h2>

        <div className="mt-12 space-y-6 text-[18px] leading-10">
          <p>
            I,
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            son/daughter of
            <span className="inline-block min-w-[220px] border-b border-gray-800 align-middle">&nbsp;</span>
            hereby declare that I am currently studying in the final year /
            final semester of
            <span className="inline-block min-w-[260px] border-b border-gray-800 align-middle">&nbsp;</span>
            at
            <span className="inline-block min-w-[260px] border-b border-gray-800 align-middle">&nbsp;</span>
            .
          </p>

          <p>
            I undertake that on successful completion of the course, and subject
            to fulfilling all academic requirements, I shall submit the final
            degree / provisional certificate / mark sheets as required.
          </p>

          <p>
            I understand that if I fail to complete the essential qualification
            or fail to produce documentary proof within the stipulated time, my
            candidature will be liable for cancellation.
          </p>

          <div className="mt-12 flex items-start justify-between gap-8">
            <div className="space-y-4">
              <p>Date: __________________</p>
              <p>Place: _________________</p>
            </div>
            <div className="text-right">
              <p>Signature of Candidate</p>
              <p>Name: __________________</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  centralGovtDeclaration: {
    title: "Central Government Civilian Employee",
    content: (
      <div className="mx-auto max-w-4xl bg-white px-8 py-10 text-[15px] leading-8 text-gray-900">
        <h2 className="text-2xl font-bold">Content not finalized</h2>
        <p className="mt-4 text-[18px] leading-9">
          A clear matching PDF for this key was not identifiable from the set of
          links provided. Please upload or resend the exact RAC PDF for
          “Central Government Civilian Employee”, and only this block will need replacement.
        </p>
      </div>
    ),
  },
};

export default certificateContent;