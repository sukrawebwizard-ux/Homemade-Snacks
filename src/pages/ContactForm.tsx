import React, { useState } from "react";
import { supabase } from "../lib/supabaseClient"; // 👈 make sure this path is correct

const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSubmitted(false);

    // Basic validation: require name + message
    if (!name.trim() || !message.trim()) {
      console.warn("Name and message are required");
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim() || null,
      phone: phone.trim() || null,
      message: message.trim(),
      source: "website", // matches the column default
      status: "new",     // optional, you can rely on default
    };

    try {
      setSubmitting(true);

      const { data, error } = await supabase
        .from("contact_messages")
        .insert([payload])
        .select()
        .single();

      if (error) {
        console.error("Supabase contact insert error", error);
        setSubmitting(false);
        return;
      }

      console.log("Contact message stored", data);

      // Success: clear form + show success banner
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setSubmitting(false);
      setSubmitted(true);

      // Hide the success message after 4 seconds (optional)
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error("Unexpected error submitting contact form", err);
      setSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Send us a message
      </h2>
      <p className="text-xs text-slate-600 mb-4">
        Fill in the form and we’ll reach out as soon as we can.
      </p>

      {submitted && (
        <div className="mb-3 rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
          Thank you! Your message has been sent.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        <div>
          <label className="block font-medium text-slate-800 mb-1">
            Name
          </label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div>
            <label className="block font-medium text-slate-800 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium text-slate-800 mb-1">
              Phone / WhatsApp Number
            </label>
            <input
              type="tel"
              className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block font-medium text-slate-800 mb-1">
            Message
          </label>
          <textarea
            className="w-full rounded-md border px-3 py-2 text-xs min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 text-sm font-semibold shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
