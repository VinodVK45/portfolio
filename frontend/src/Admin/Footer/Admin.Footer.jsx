import { useEffect, useState } from "react";
import { useFooter } from "../../context/FooterContext";

/* 🔹 Icon names from react-icons/fa (fa-*) */
const ICON_OPTIONS = [
  "fa-github",
  "fa-linkedin",
  "fa-instagram",
  "fa-twitter",
  "fa-facebook",
  "fa-youtube",
  "fa-discord",
  "fa-telegram",
  "fa-whatsapp",
  "fa-envelope",
];

function AdminFooter() {
  const { footer, updateFooter } = useFooter();

  const [form, setForm] = useState({
    message: "",
    email: "",
    phone: "",
    adminIcon: "Shield",
  });

  const [socials, setSocials] = useState([]);

  /* ================= LOAD FOOTER ================= */
  useEffect(() => {
    if (footer) {
      setForm({
        message: footer.message || "",
        email: footer.email || "",
        phone: footer.phone || "",
        adminIcon: footer.adminIcon || "Shield",
      });
      setSocials(footer.socials || []);
    }
  }, [footer]);

  /* ================= SOCIAL HANDLERS ================= */
  const addSocial = () => {
    setSocials([
      ...socials,
      { label: "", link: "", icon: "fa-github" },
    ]);
  };

  const updateSocial = (index, key, value) => {
    const updated = [...socials];
    updated[index][key] = value;
    setSocials(updated);
  };

  const removeSocial = (index) => {
    setSocials(socials.filter((_, i) => i !== index));
  };

  /* ================= SUBMIT ================= */
  const submit = async () => {
    await updateFooter({ ...form, socials });
    alert("Footer Updated ✅");
  };

  return (
    <div className="p-10 text-white max-w-4xl">
      <h1 className="text-3xl mb-8">Edit Footer</h1>

      {/* BASIC FIELDS */}
      {Object.keys(form).map((key) => (
        <input
          key={key}
          value={form[key]}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
          placeholder={key}
          className="block mb-4 p-3 w-full bg-black border border-white/10 rounded-lg"
        />
      ))}

      {/* SOCIALS */}
      <div className="mt-10">
        <h2 className="text-xl mb-4">Social Media</h2>

        {socials.map((social, index) => (
          <div
            key={index}
            className="mb-4 p-4 border border-white/10 rounded-lg grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            {/* ICON */}
            <select
              value={social.icon}
              onChange={(e) =>
                updateSocial(index, "icon", e.target.value)
              }
              className="bg-black p-3 rounded border border-white/10"
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>
                  {icon}
                </option>
              ))}
            </select>

            {/* LABEL */}
            <input
              placeholder="Label (Facebook)"
              value={social.label}
              onChange={(e) =>
                updateSocial(index, "label", e.target.value)
              }
              className="bg-black p-3 rounded border border-white/10"
            />

            {/* LINK */}
            <input
              placeholder="https://..."
              value={social.link}
              onChange={(e) =>
                updateSocial(index, "link", e.target.value)
              }
              className="bg-black p-3 rounded border border-white/10"
            />

            {/* REMOVE */}
            <button
              onClick={() => removeSocial(index)}
              className="bg-red-500/20 hover:bg-red-500/40 transition rounded font-bold"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={addSocial}
          className="mt-4 px-5 py-2 bg-white/10 hover:bg-white/20 rounded-lg"
        >
          + Add Social
        </button>
      </div>

      {/* SAVE */}
      <button
        onClick={submit}
        className="mt-10 px-8 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition"
      >
        Save Changes
      </button>
    </div>
  );
}

export default AdminFooter;
