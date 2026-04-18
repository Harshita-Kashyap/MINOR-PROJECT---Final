import LandingLayout from "../layouts/LandingLayout";

const payData = [
  {
    grade: "Scientist 'B'",
    level: "Level 10",
    pay: "56,100/-",
  },
  {
    grade: "Scientist 'C'",
    level: "Level 11",
    pay: "67,700/-",
  },
  {
    grade: "Scientist 'D'",
    level: "Level 12",
    pay: "78,800/-",
  },
  {
    grade: "Scientist 'E'",
    level: "Level 13",
    pay: "1,23,100/-",
  },
  {
    grade: "Scientist 'F'",
    level: "Level 13A",
    pay: "1,31,100/-",
  },
  {
    grade: "Scientist 'G'",
    level: "Level 14",
    pay: "1,44,200/-",
  },
  {
    grade: "Scientist 'H' (Outstanding Scientist)",
    level: "Level 15",
    pay: "1,82,200/-",
  },
  {
    grade: "Distinguished Scientist (DS)",
    level: "Level 16",
    pay: "2,05,400/-",
  },
  {
    grade:
      "Secretary DD R&D, DG R&D and Scientific Adviser to Raksha Mantri (SA to RM)",
    level: "Level 17",
    pay: "2,25,000/-",
  },
];

export default function DRDS() {
  return (
    <LandingLayout>
      <div className="w-full rounded-sm border border-sky-300 bg-white px-6 py-6 shadow-sm text-gray-800 dark:border-sky-900 dark:bg-gray-800 dark:text-gray-200">
        <h1 className="mb-6 text-4xl font-bold text-amber-900 dark:text-amber-400">
          DRDS (Defence Research and Development Services)
        </h1>

        <div className="space-y-5 text-[15px] leading-8">
          <p>
            In pursuit of self-reliance in critical technologies relevant to
            national security, DRDO formulates and executes programmes of
            scientific research, design, development, testing and evaluation of
            various systems, subsystems, devices and products required for
            defence of the nation. DRDO employs highly qualified and competent
            scientists and technologists who constitute the Group 'A' (Class I
            Gazetted) Service known as Defence Research &amp; Development
            Service (DRDS). The emoluments of DRDS Scientists as per 7th Central
            Pay Commission are as given below in INR:
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[15px]">
            <thead>
              <tr className="bg-gray-200 text-gray-900 dark:bg-gray-900 dark:text-white">
                <th className="px-4 py-3 font-medium">Grade</th>
                <th className="px-4 py-3 font-medium">Level in Pay Matrix</th>
                <th className="px-4 py-3 font-medium">
                  Initial Pay in Pay Matrix ₹
                </th>
              </tr>
            </thead>
            <tbody>
              {payData.map((row, index) => (
                <tr
                  key={row.grade}
                  className={
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "bg-gray-200/60 dark:bg-gray-900/70"
                  }
                >
                  <td className="px-4 py-3">{row.grade}</td>
                  <td className="px-4 py-3">{row.level}</td>
                  <td className="px-4 py-3">{row.pay}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            Salient features of DRDS
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>
              DRDO takes utmost care of the career-advancement of its scientists
              and operates a merit based promotion scheme under Flexible
              Complementing Scheme (FCS) upto the level of Scientist 'H' which
              means that with each promotion is based purely on merit basis of
              the scientist in the assessment board/ Peer Committee.
            </p>

            <p>
              In addition to the Basic Pay, DRDS scientists are entitled to get
              House Rent Allowance upto 24% of Basic Pay in case of
              non-availability of Government accommodation and other allowances
              viz, DA, Transport Allowance with DA on it etc. as admissible to
              Central Government employees.
            </p>

            <p>
              Perquisites like Leave Travel Concession, Medical facilities,
              Advances for PCs/ House Building are also admissible. Professional
              update allowance of Rs 22,500/- (for Scientist 'B', 'C' and 'D'),
              Rs 45,000/- (for Scientist 'E' and Scientist 'F') Rs 67,500/-
              (for Scientist G onwards) per annum and reimbursement of
              expenditures on newspapers/periodicals also admissible in
              accordance with provisions of relevant Rules.
            </p>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
            Facility for Higher Qualification &amp; Training
          </h2>

          <div className="space-y-5 text-[15px] leading-8">
            <p>
              DRDO not only offers employment but also lays emphasis on Human
              Resource Development. DRDO trains its personnel at training
              institutions in Pune (DIAT) and Mussoorie (ITM) and also at
              prestigious academic institutions viz, IITs, IISc Bangalore etc.
              for acquiring higher educational qualifications. Opportunities
              also arise for foreign deputations for training/presentation of
              papers/specific assignments.
            </p>
          </div>
        </section>
      </div>
    </LandingLayout>
  );
}