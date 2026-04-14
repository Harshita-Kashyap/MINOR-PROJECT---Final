import homeNotice from "../../assets/home-notice.png";

export default function HomeNoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/45 flex items-center justify-center p-4">
      <div className="w-full max-w-[700px] max-h-[82vh] overflow-hidden rounded-sm bg-white shadow-2xl border border-gray-300">
        <div className="flex items-center justify-between px-8 py-7">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-400 bg-white px-4 py-2 text-lg text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>

          <button
            type="button"
            className="rounded-lg bg-blue-600 px-8 py-3 text-2xl font-semibold text-black shadow-md"
          >
            Join DRDO
          </button>
        </div>

        <div className="max-h-[58vh] overflow-y-auto px-10 pb-6">
          <div className="bg-[#f6f1df]">
            <img
              src={homeNotice}
              alt="RAC Public Notice"
              className="block w-full h-auto"
            />
          </div>
        </div>

        <div className="flex justify-end px-8 py-4">
          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-800 hover:text-black"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}