import * as LucideIcons from "lucide-react";
import { Mail, Phone, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFooter } from "../../context/FooterContext";

/* ================= ICON RESOLVER ================= */
const getIcon = (iconName) => {
  if (!iconName) return LucideIcons.Github;

  // Convert "fa-github" / "Github" / "facebook" → Lucide format
  const formatted =
    iconName
      .replace("fa-", "")
      .replace(/(^\w|-\w)/g, (m) =>
        m.replace("-", "").toUpperCase()
      );

  return LucideIcons[formatted] || LucideIcons.Github;
};

function Footer() {
  const navigate = useNavigate();
  const { footer } = useFooter();

  /* ✅ SAFE FALLBACK */
  const data = footer || {
    message:
      "Currently open to new opportunities and collaborations. Feel free to reach out!",
    email: "contact@vinodkumar.com",
    phone: "+91 98765 43210",
    adminIcon: "Shield",
    socials: [
      { label: "Github", link: "https://github.com", icon: "github" },
      { label: "Linkedin", link: "https://linkedin.com", icon: "linkedin" },
      { label: "Instagram", link: "https://instagram.com", icon: "instagram" },
      { label: "Twitter", link: "https://twitter.com", icon: "twitter" },
    ],
  };

  const { message, email, phone, socials, adminIcon } = data;

  const copyright =
    `© ${new Date().getFullYear()} Vinod Kumar. All rights reserved.`;

  const AdminIconComponent =
    LucideIcons[adminIcon] || Shield;

  return (
    <footer id="contact" className="w-full bg-slate-900 border-2 border-white">
      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-12 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 text-white">

        {/* LEFT — MESSAGE */}
        <div className="space-y-6">
          <h3 className="text-[26px] font-semibold">Let’s Connect</h3>
          <p className="text-white/80 leading-relaxed max-w-md">
            {message}
          </p>
        </div>

        {/* CENTER — CONTACT */}
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => (window.location.href = `mailto:${email}`)}
          >
            <Mail className="text-[#F5C77A]" size={20} />
            <span className="group-hover:text-[#F5C77A] transition">
              {email}
            </span>
          </div>

          <div
            className="flex items-center gap-4 group cursor-pointer"
            onClick={() => (window.location.href = `tel:${phone}`)}
          >
            <Phone className="text-[#F5C77A]" size={20} />
            <span className="group-hover:text-[#F5C77A] transition">
              {phone}
            </span>
          </div>
        </div>

        {/* RIGHT — SOCIALS */}
        <div className="flex flex-col items-center md:items-end gap-6">
          <h3 className="text-[22px] font-semibold">Follow Me</h3>

          <div className="flex gap-4">
            {socials.map((item, index) => {
              const SocialIcon = getIcon(item.icon);

              return (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.label}
                  className="p-3 rounded-full bg-white/10 hover:bg-[#F5C77A]/20 hover:scale-110 transition-all duration-300"
                >
                  <SocialIcon size={20} />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-white/10 px-12 py-6 relative flex items-center justify-center text-white/60">
        <span>{copyright}</span>

        {/* ADMIN BUTTON */}
        <div className="absolute right-12">
          <button
            className="p-2 rounded-full bg-white/5 hover:bg-[#F5C77A]/40 transition-colors"
            title="Admin Panel"
            onClick={() => window.open("/admin", "_blank")}
          >
            <AdminIconComponent size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
