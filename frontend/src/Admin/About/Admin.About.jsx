import { useEffect, useState } from "react";
import { useAbout } from "../../context/AboutContext";

function AboutAdmin() {
  const { about, updateAbout } = useAbout();

  const [form, setForm] = useState({
    subtitle: "",
    paragraph1: "",
    paragraph2: "",
    paragraph3: "",
    highlightText: "",
    services: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  /* ================= LOAD DATA INTO FORM ================= */
  useEffect(() => {
    if (about) {
      setForm({
        subtitle: about.subtitle || "",
        paragraph1: about.paragraph1 || "",
        paragraph2: about.paragraph2 || "",
        paragraph3: about.paragraph3 || "",
        highlightText: about.highlightText || "",
        services: about.services?.join(", ") || "",
        location: about.location || "",
      });
    }
  }, [about]);

  /* ================= SUBMIT ================= */
  const submit = async () => {
    const fd = new FormData();

    fd.append("subtitle", form.subtitle);
    fd.append("paragraph1", form.paragraph1);
    fd.append("paragraph2", form.paragraph2);
    fd.append("paragraph3", form.paragraph3);
    fd.append("highlightText", form.highlightText);
    fd.append("location", form.location);

    fd.append(
      "services",
      JSON.stringify(
        form.services.split(",").map(s => s.trim())
      )
    );

    if (image) fd.append("image", image);

    const success = await updateAbout(fd);

    if (success) {
      alert("About section updated successfully ✅");
    } else {
      alert("Update failed ❌");
    }
  };

  return (
    <div className="p-10 text-white">
      <h1 className="text-3xl mb-6">Edit About Section</h1>

      {Object.keys(form).map((key) => (
        <input
          key={key}
          value={form[key]}
          onChange={(e) =>
            setForm({ ...form, [key]: e.target.value })
          }
          placeholder={key}
          className="block mb-3 p-3 w-full bg-black border border-white/10 rounded-lg"
        />
      ))}

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="mt-4"
      />

      <button
        onClick={submit}
        className="mt-6 px-6 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition"
      >
        Save Changes
      </button>
    </div>
  );
}

export default AboutAdmin;
