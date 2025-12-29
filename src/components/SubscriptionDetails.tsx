import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

// Local types — structural, so they will work with your existing Plan shape
export type Frequency = "bi-weekly" | "monthly" | "sample";
export type DeliveryDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Plan {
  id: number | string;
  name: string;
  description: string;
  default_frequency: Frequency;
  delivery_days_available: DeliveryDay[];
}

interface SnackPreferences {
  sweets: string[];
  spicy: string[];
  salt: string[];
}

interface SubscriptionDetailsProps {
  plan: Plan;
  onSuccess: () => void; // e.g. navigate to /subscribe/thank-you
}

const SNACK_CUSTOMIZATION = {
  sweets: [
    "Unniyappam - 10 pcs / €3",
    "Banana chips (sweet) - 150g / €3",
    "Achappam - 10 pcs / €3",
  ],
  spicy: [
    "Cutlets (Chicken) - 3 pcs / €5",
    "Cutlets (Beef) - 3 pcs / €5",
    "Cutlets (Veg) - 3 pcs / €5",
    "Mixture - 170g / €3",
    "Pakkavada - 150g / €3",
  ],
  salt: [
    "Banana chips (salt) - 150g / €3",
    "Bombe mixture - 170g / €3",
  ],
};

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getNextDeliveryDate = (start: Date, dayOfWeek: DeliveryDay): string => {
  const map: Record<DeliveryDay, number> = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 0,
  };

  const target = map[dayOfWeek];
  const current = start.getDay(); // 0 (Sun) - 6 (Sat)

  let diff = target - current;
  if (diff < 0) diff += 7;

  const next = new Date(start);
  next.setDate(start.getDate() + diff);
  return formatDate(next);
};

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  plan,
  onSuccess,
}) => {
  const isSampleBox = String(plan.id) === "3";

  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    address: "",
    // for sample box, we still store a valid frequency internally (monthly)
    frequency: (plan.default_frequency || "monthly") as Frequency,
    delivery_day:
      (plan.delivery_days_available?.[0] || "wednesday") as DeliveryDay,
    preferred_payment_method: "cash",
    notes: "",
  });

  const [snackPreferences, setSnackPreferences] = useState<SnackPreferences>({
    sweets: [],
    spicy: [],
    salt: [],
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      frequency: plan.default_frequency || "monthly",
      delivery_day:
        (plan.delivery_days_available?.[0] || prev.delivery_day) ?? "wednesday",
    }));
  }, [plan.id, plan.default_frequency, plan.delivery_days_available]);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleSnackPreference = (
    category: keyof SnackPreferences,
    item: string
  ) => {
    setSnackPreferences((prev) => {
      const current = prev[category] || [];
      const exists = current.includes(item);
      const next = exists
        ? current.filter((i) => i !== item)
        : [...current, item];
      return { ...prev, [category]: next };
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.customer_name.trim())
      newErrors.customer_name = "Full name is required";
    if (!form.phone.trim())
      newErrors.phone = "Phone (WhatsApp) is required";
    if (!form.address.trim())
      newErrors.address = "Address / delivery area is required";
    if (!form.delivery_day)
      newErrors.delivery_day = "Delivery day is required";
    if (!form.preferred_payment_method)
      newErrors.preferred_payment_method =
        "Preferred payment method is required";

    // frequency is always set internally; we don't need a separate error for sample box
    return newErrors;
  };

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    setSubmitError("");
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    const today = new Date();
    const start_date = formatDate(today);
    const next_delivery_date = getNextDeliveryDate(
      today,
      form.delivery_day as DeliveryDay
    );

    const apiFrequency =
      form.frequency === "bi-weekly" ? "biweekly" : form.frequency; // "monthly" or for sample box treated as monthly

    const payload = {
      subscription_plan_id: Number(plan.id),
      plan_name: plan.name,
      customer_name: form.customer_name.trim(),
      customer_phone: form.phone.trim(),
      customer_email: form.email.trim() || null,
      address: form.address.trim(),
      frequency: apiFrequency,
      delivery_day_of_week: form.delivery_day,
      preferred_payment_method: form.preferred_payment_method,
      start_date,
      next_delivery_date,
      notes: form.notes.trim() || null,
      source: "website",
      customer_external_id: null,
      status: "pending",
      snack_preferences: snackPreferences,

      plan_id: plan.id,
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      delivery_day: form.delivery_day,
    };

    try {
      console.log("Submitting subscription payload", payload);

      const body = {
        subscription_plan_id: payload.subscription_plan_id,
        plan_name: payload.plan_name,
        customer_name: payload.customer_name,
        customer_phone: payload.customer_phone,
        customer_email: payload.customer_email,
        address: payload.address,
        frequency: payload.frequency,
        delivery_day_of_week: payload.delivery_day_of_week,
        preferred_payment_method: payload.preferred_payment_method,
        start_date: payload.start_date,
        next_delivery_date: payload.next_delivery_date,
        notes: payload.notes,
        status: payload.status,
        source: payload.source,
        customer_external_id: payload.customer_external_id,
        snack_preferences: snackPreferences,
      };

      const { data, error } = await supabase
        .from("customer_subscriptions")
        .insert([body])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error", error);
        setSubmitting(false);
        setSubmitError(
          "Something went wrong while saving your subscription. Please try again."
        );
        return;
      }

      console.log("Supabase insert success", data);
      setSubmitting(false);
      onSuccess();
    } catch (err) {
      console.error(err);
      setSubmitting(false);
      setSubmitError(
        "Something went wrong while submitting your subscription. Please try again."
      );
    }
  };

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Subscription Details
      </h2>
      <p className="text-xs text-slate-600 mb-4">
        Fill in your details and we’ll confirm your{" "}
        {isSampleBox ? "sample box order via WhatsApp." : "subscription via WhatsApp."}
      </p>

      {submitError && (
        <div className="mb-3 rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3 text-xs">
        {/* name, phone, email, address = unchanged */}

        <div>
          <label className="block font-medium text-slate-800 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={form.customer_name}
            onChange={(e) => updateField("customer_name", e.target.value)}
          />
          {errors.customer_name && (
            <p className="mt-1 text-[11px] text-rose-600">
              {errors.customer_name}
            </p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block font-medium text-slate-800">
              Phone (WhatsApp) <span className="text-rose-500">*</span>
            </label>
            <p className="text-[10px] text-slate-500">
              We will confirm via WhatsApp.
            </p>
          </div>
          <input
            type="tel"
            className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
          {errors.phone && (
            <p className="mt-1 text-[11px] text-rose-600">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block font-medium text-slate-800 mb-1">
            Email (optional)
          </label>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium text-slate-800 mb-1">
            Address / Delivery Area{" "}
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            className="w-full rounded-md border px-3 py-2 text-xs min-h-[70px] resize-y focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
          {errors.address && (
            <p className="mt-1 text-[11px] text-rose-600">
              {errors.address}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {/* Frequency field behaves differently for Sample Box */}
          <div>
            <label className="block font-medium text-slate-800 mb-1">
              Select Frequency <span className="text-rose-500">*</span>
            </label>
            {isSampleBox ? (
              <div className="w-full rounded-md border bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-900">
                Sample box (one-time)
              </div>
            ) : (
              <select
                className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
                value={form.frequency}
                onChange={(e) => updateField("frequency", e.target.value)}
              >
                <option value="monthly">Monthly</option>
                <option value="bi-weekly">
                  Bi-Weekly
                </option>
              </select>
            )}
          </div>

          <div>
            <label className="block font-medium text-slate-800 mb-1">
              Select Delivery Day <span className="text-rose-500">*</span>
            </label>
            <select
              className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={form.delivery_day}
              onChange={(e) => updateField("delivery_day", e.target.value)}
            >
              {[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].map((day) => (
                <option key={day} value={day}>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </option>
              ))}
            </select>
            {errors.delivery_day && (
              <p className="mt-1 text-[11px] text-rose-600">
                {errors.delivery_day}
              </p>
            )}
          </div>
        </div>

        {/* rest of the form stays same (payment, customization, notes, submit) */}
        <div>
          <label className="block font-medium text-slate-800 mb-1">
            Preferred Payment Method{" "}
            <span className="text-rose-500">*</span>
          </label>
          <div className="flex flex-wrap gap-3 text-xs">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="payment_method"
                value="cash"
                checked={form.preferred_payment_method === "cash"}
                onChange={(e) =>
                  updateField("preferred_payment_method", e.target.value)
                }
              />
              Cash
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="payment_method"
                value="revolut"
                checked={form.preferred_payment_method === "revolut"}
                onChange={(e) =>
                  updateField("preferred_payment_method", e.target.value)
                }
              />
              Revolut
            </label>
          </div>
          {errors.preferred_payment_method && (
            <p className="mt-1 text-[11px] text-rose-600">
              {errors.preferred_payment_method}
            </p>
          )}
        </div>

        {/* Snack customization */}
        <div>
          <p className="block font-medium text-slate-800 mb-1">
            Customize your snack box
          </p>
          <p className="text-[11px] text-slate-500 mb-2">
            Choose what you’d like to see more often in your subscription.
            We’ll do our best to match your preferences.
          </p>
          <div className="grid md:grid-cols-3 gap-3 text-[11px]">
            {/* Sweets */}
            <div className="rounded-xl border bg-slate-50 p-3">
              <p className="font-semibold text-slate-800 mb-1 flex items-center gap-1">
                <span>🍬</span> Sweets
              </p>
              <div className="space-y-1">
                {SNACK_CUSTOMIZATION.sweets.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={snackPreferences.sweets.includes(item)}
                      onChange={() =>
                        toggleSnackPreference("sweets", item)
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Spicy */}
            <div className="rounded-xl border bg-slate-50 p-3">
              <p className="font-semibold text-slate-800 mb-1 flex items-center gap-1">
                <span>🌶️</span> Spicy
              </p>
              <div className="space-y-1">
                {SNACK_CUSTOMIZATION.spicy.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={snackPreferences.spicy.includes(item)}
                      onChange={() =>
                        toggleSnackPreference("spicy", item)
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Salt */}
            <div className="rounded-xl border bg-slate-50 p-3">
              <p className="font-semibold text-slate-800 mb-1 flex items-center gap-1">
                <span>🧂</span> Salt
              </p>
              <div className="space-y-1">
                {SNACK_CUSTOMIZATION.salt.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={snackPreferences.salt.includes(item)}
                      onChange={() =>
                        toggleSnackPreference("salt", item)
                      }
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          {errors.snack_preferences && (
            <p className="mt-1 text-[11px] text-rose-600">
              {errors.snack_preferences}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium text-slate-800 mb-1">
            Notes (optional)
          </label>
          <textarea
            className="w-full rounded-md border px-3 py-2 text-xs min-h-[60px] resize-y focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={form.notes}
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 text-sm font-semibold shadow-sm"
          >
            {submitting ? "Submitting..." : "Confirm Subscription"}
          </button>

          <div className="mt-4 flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <div className="text-lg">✨</div>
            <div>
              <p className="text-[11px] font-semibold text-slate-800">No payment required now</p>
              <p className="text-[11px] text-slate-500 leading-tight">
                We do not ask for credit card details. You will only pay via Cash or Revolut upon delivery.
              </p>
            </div>
          </div>
        </div>
        {/* ... existing code from your version for payment + snacks + notes + submit ... */}
      </form>
    </section>
  );
};

export default SubscriptionDetails;
