import LandingLayout from "../layouts/LandingLayout";

export default function Assessment() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          Assessment
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            Assessment Boards for promotion of DRDS Scientists in the grades
            &apos;B&apos;/&apos;C&apos;/&apos;D&apos;/&apos;E&apos; to next higher
            grade are held during mid April to mid June at locations of major
            concentration of DRDO Labs/ Estts. viz Bangalore, Delhi, Hyderabad,
            and Pune. Depending on number of candidates in different disciplines,
            the interviews may be conducted at other locations also viz Balasore,
            Chandigarh and Dehradun. In Delhi, interview boards are conducted at
            RAC.
          </p>

          <p>
            The Assessment Boards are chaired by Chairman RAC or a Co-Chairperson
            from a panel which consists of reputed Scientists &amp; Technologists.
            The Core Committee constitutes a Chairperson, two Core Members and the
            other members includes a Departmental Expert and two External Experts
            from the Subject. Normally, one External Expert of the Subject is from
            an academic institution and the other one from a scientific institution
            engaged in activities similar to DRDO, to assess both academic
            foundation as well as applied research &amp; development. For each
            candidate Director of the Lab or his Representative is also the Member
            of the Assessment Board and SC/ ST rep is co-opted on requirement
            basis.
          </p>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            Procedure for Interview
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>
              The Lab Director is requested by the Chairperson to brief the Board
              on the type of responsibilities entrusted to the candidate and the
              contributions made by the Scientist appearing in the interview. The
              board is supposed to interview the Scientist in the discipline
              indicated for assessment in the APAR.
            </p>

            <p>
              After the Scientist enters the Board Room, the Chairperson reviews
              the Bio-data, and then invites the Scientist to make a brief
              presentation (10-15 minutes) of the achievements and the future
              plans of action. The Scientist is required to highlight only
              personal contributions and achievements. After the presentation all
              the members of the Board are requested to interact with the
              Scientist turn-wise.
            </p>

            <p>
              The Assessment Board, which consists of carefully selected
              Departmental and External Experts can help converge to a
              satisfactory judgment. There are some situations in which the
              Assessment Boards take adequate precaution to arrive at a decision
              e.g.
            </p>

            <ol className="list-decimal space-y-2 pl-8">
              <li>
                In a joint project, the contribution of the individual has to be
                clearly identified. An individual may have done very little in a
                highly successful and prestigious project.
              </li>
              <li>
                Some candidates are good speakers and excellent presenters. Other
                are not so well endowed. The gift of good oration should not
                overshadow the real merit of the candidate.
              </li>
            </ol>

            <p>
              If the overall caliber of the Scientist as judged by the Assessment
              Board matches with the prescribed qualifying marks required for the
              current residency period, the candidate is recommended as &apos;Fit
              For Promotion&apos;. Otherwise the recommendation is &apos;Not Yet
              Fit For Promotion&apos;.
            </p>

            <p>
              Hindi may be used as a medium at the interview if desired by the
              candidate.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            Peer Review
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>
              The promotion of DRDS Scientists in the grades &apos;F&apos; to
              &apos;G&apos; and &apos;G&apos; to &apos;H&apos; is made w.e.f.
              1st July under the Flexible Complementing scheme (FCS) on the basis
              of the evaluation of their Annual Performance Assessment Report
              (APAR) by the Internal Screening Committee and assessment by the
              Peer committee.
            </p>

            <p>
              The minimum residency period is five years as on 30 June of the
              year to which assessment pertains. Relaxation up to three months in
              qualifying service is given to those who joined after 01 July due
              to reasons beyond their control. Relaxation of one year residency
              period is granted to Scientists &apos;F&apos; who have been
              consistently assessed as &quot;Exceptionally Brilliant&quot; having
              secured 90% or above marks in four successive CPARs.
            </p>

            <p>
              The Peer committee takes holistic view of the contributions made by
              the Scientists in the present grade and evaluates attributes such as
              quality of scientific R &amp; D activity, timely completion of
              tasks assigned, management ability and leadership quality,
              motivation in facing challenges, dedication to work, potential for
              undertaking higher responsibility and areas of strength.
            </p>

            <p>
              Peer Committee may also recommend the special pay of Rs. 4000/- per
              month to Scientists &apos;F&apos; recommended for promotion to
              Scientists &apos;G&apos;.
            </p>

            <p>
              The same Peer Committee shall assess the Scientists &apos;G&apos;
              for promotion to the post of Scientist &apos;H&apos; (Outstanding
              Scientist) who have completed 3 years regular service in the Grade
              and have been recommended by ISC, based on merit, achievements,
              leadership and managerial qualities. The Same Committee will also
              recommend conferring the Grade of Distinguished Scientists.
            </p>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}