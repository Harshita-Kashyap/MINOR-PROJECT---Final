const footerLinks = [
  "Archive",
  "Web Information Manager",
  "About Us",
  "Interface Desk",
  "Sitemap",
  "Help",
  "Refund/Cancellation",
  "Disclaimer",
  "Website Policies",
  "RTI",
  "GoI Directory",
  "National Portal of India",
  "Public Grievances",
];

export default function OfficialFooter() {
  return (
    <footer className="mt-0 bg-black text-white">
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-b border-dotted border-gray-500 px-4 py-4 text-[12px] font-semibold">
        {footerLinks.map((link) => (
          <button
            key={link}
            type="button"
            className="hover:underline"
          >
            {link}
          </button>
        ))}
      </div>

      <div className="px-4 py-3 text-center text-[13px] font-semibold uppercase tracking-wide">
        © 2026 : Recruitment and Assessment Centre, All Rights Reserved.
      </div>
    </footer>
  );
}