import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Archive", path: "/footer/archive" },
  { label: "Web Information Manager", path: "/footer/web-information-manager" },
  { label: "About Us", path: "/footer/footer-about-us" },
  { label: "Interface Desk", path: "/footer/interface-desk" },
  { label: "Sitemap", path: "/footer/sitemap" },
  { label: "Help", path: "/footer/help" },
  { label: "Refund/Cancellation", path: "/footer/refund-cancellation" },
  { label: "Disclaimer", path: "/footer/disclaimer" },
  { label: "Website Policies", path: "/footer/website-policies" },
  { label: "RTI", path: "/footer/rti" },
  { label: "GoI Directory", path: "https://www.goidirectory.gov.in/" },
  { label: "National Portal of India", path: "https://www.india.gov.in/" },
  { label: "Public Grievances", path: "https://pgportal.gov.in/" },
];

export default function OfficialFooter() {
  return (
    <footer className="mt-0 bg-black text-white">
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-b border-dotted border-gray-500 px-4 py-4 text-[12px] font-semibold">
        {footerLinks.map((link) =>
          link.path.startsWith("http") ? (
            <a
              key={link.label}
              href={link.path}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} to={link.path} className="hover:underline">
              {link.label}
            </Link>
          )
        )}
      </div>

      <div className="px-4 py-3 text-center text-[13px] font-semibold uppercase tracking-wide">
        © 2026 : Recruitment and Assessment Centre, All Rights Reserved.
      </div>
    </footer>
  );
}