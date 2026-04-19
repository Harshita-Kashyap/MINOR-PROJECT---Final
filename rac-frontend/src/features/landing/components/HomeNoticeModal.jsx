export default function HomeNoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 p-4">
      <div className="w-full max-w-[760px] max-h-[88vh] overflow-hidden rounded-sm border border-gray-300 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-400 bg-white px-4 py-2 text-base text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>

          <button
            type="button"
            className="rounded-lg bg-blue-600 px-6 py-3 text-2xl font-semibold text-slate-900 shadow-md"
          >
            Join DRDO
          </button>
        </div>

        <div className="max-h-[72vh] overflow-y-auto bg-[#f3f3f3] px-6 py-5">
          <div className="mx-auto w-full max-w-[660px] border border-gray-300 bg-[#f6f1df] px-8 py-8 text-gray-900 shadow-sm">
            <p className="mb-2 text-center text-[11px] tracking-wide text-gray-700">
              Government of India, Ministry of Defence, DRDO, Recruitment and
              Assessment Centre, Lucknow Road, Timarpur, Delhi - 54
            </p>

            <div className="mb-4 border-b border-gray-700 pb-3">
              <div className="grid grid-cols-[90px_1fr_90px] items-center gap-3">
                <div className="text-center text-[11px] font-medium italic">
                  <div className="mb-2">
                    <img
                      src="https://rac.gov.in/images/rac_logo_2025_sm.png"
                      alt="RAC Logo"
                      className="mx-auto h-14 w-auto object-contain"
                    />
                  </div>
                  <div>ISO 9001 Estt.</div>
                  <div className="mt-2 font-semibold not-italic">rac.gov.in</div>
                </div>

                <div className="text-center">
                  <h2 className="text-[20px] font-black tracking-wide">
                    GOVT. OF INDIA, MINISTRY OF DEFENCE
                  </h2>
                  <h3 className="mt-1 text-[18px] font-extrabold tracking-wide">
                    DEFENCE R&amp;D ORGANIZATION (DRDO)
                  </h3>
                  <p className="mt-1 text-[18px] font-semibold">
                    Recruitment &amp; Assessment Centre (RAC)
                  </p>
                  <p className="mt-1 text-[14px]">
                    Lucknow Road. Timarpur. Delhi (India) - 110 054
                  </p>
                  <p className="mt-2 text-[16px] font-extrabold uppercase text-red-600">
                    Public Notice
                  </p>
                </div>

                <div className="text-center text-[11px] font-medium">
                  <div className="mb-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/55/Signature_of_Abdul_Kalam.svg"
                      alt="decorative emblem"
                      className="mx-auto h-10 w-auto object-contain opacity-80"
                    />
                  </div>
                  <div className="mt-8 font-semibold">drdo.gov.in</div>
                </div>
              </div>
            </div>

            <p className="text-right text-[15px] font-bold">30-May-2025</p>

            <h3 className="mt-5 text-center text-[18px] font-extrabold text-red-600">
              ALERT / सावधान
            </h3>

            <div className="mt-6 space-y-5 text-[15px] leading-8">
              <p>
                Please be aware that any official communication from RAC is done
                through following means only:
              </p>

              <div>
                <p className="font-bold">1. Email id:</p>
                <ul className="mt-2 list-disc pl-10">
                  <li>pro.recruitment@gov.in</li>
                  <li>directrec.rac@gov.in</li>
                  <li>lateral1.recruitment@gov.in</li>
                  <li>director-rac-drdo@gov.in</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">2. Phone No.:</p>
                <ul className="mt-2 list-disc pl-10">
                  <li>011-23830599</li>
                  <li>011-23889529</li>
                  <li>011-23889526</li>
                  <li>011-23812955</li>
                </ul>
              </div>

              <div>
                <p className="font-bold">3. SMS:</p>
                <p className="mt-1 pl-5">
                  Only through official DRDO / RAC communication channels.
                </p>
              </div>

              <div>
                <p className="font-bold">4. Website:</p>
                <ul className="mt-2 list-disc pl-10">
                  <li>https://rac.gov.in</li>
                  <li>https://drdo.gov.in</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded border border-amber-300 bg-amber-50 px-4 py-3 text-center text-sm text-gray-800">
              This popup is for <span className="font-semibold">educational purpose only</span> and is not an official RAC notice.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}