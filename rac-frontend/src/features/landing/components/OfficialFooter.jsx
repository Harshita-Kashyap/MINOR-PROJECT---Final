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

  { label: "RTI", path: "https://rtionline.gov.in/", external: "rti" },
  { label: "GoI Directory", path: "https://igod.gov.in/", external: true },
  { label: "National Portal of India", path: "https://www.india.gov.in/", external: true },
  { label: "Public Grievances", path: "https://pgportal.gov.in/", external: true },
];

export default function OfficialFooter() {
  return (
    <footer className="mt-0 bg-black text-white">
      <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-b border-dotted border-gray-500 px-4 py-4 text-[12px] font-semibold">
        {footerLinks.map((link) =>
          link.external === "rti" ? (
            <span
              key={link.label}
              onClick={() => {
                window.location.href = link.path;
              }}
              className="cursor-pointer hover:underline"
            >
              {link.label}
            </span>
          ) : link.external ? (
            <a
              key={link.label}
              href={link.path}
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