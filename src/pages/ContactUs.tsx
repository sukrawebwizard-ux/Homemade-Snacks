import React from "react";

const ContactUs: React.FC = () => {
  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900 mb-2">
        Contact Us
      </h1>
      <p className="text-sm text-slate-600 mb-4">
        Have a question about our homemade snack subscription, delivery areas or plans? Send us
        a message and we’ll get back to you via WhatsApp or email.
      </p>
      <div className="space-y-2 text-sm text-slate-700">
        <p>
          <span className="font-semibold">WhatsApp: </span>
          +356 0000 0000
        </p>
        <p>
          <span className="font-semibold">Email: </span>
          hello@example.com
        </p>
        <p>
          <span className="font-semibold">Location: </span>
          Birkirkara, Malta
        </p>
      </div>
    </aside>
  );
};

export default ContactUs;
