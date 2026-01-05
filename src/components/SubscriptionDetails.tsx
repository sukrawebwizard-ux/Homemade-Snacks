import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";
import { useLanguage } from "../lib/LanguageContext";

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

interface PartyItem {
  name: string;
  quantity: number;
  price: number;
}

interface SubscriptionDetailsProps {
  plan: Plan;
  onSuccess: () => void; // e.g. navigate to /subscribe/thank-you
}

const SNACK_CUSTOMIZATION = {
  sweets: [
    "Banana chips (sweet) - 150g / €3",
    "Achappam - 10 pcs / €3",
  ],
  spicy: [
    "Mixture - 170g / €3",
    "Pakkavada - 150g / €3",
  ],
  salt: [
    "Banana chips (salt) - 150g / €3",
    "Bombe mixture - 170g / €3",
  ],
};

const PARTY_ITEMS = [
  { name: "Vegetable Cutlet", price: 2.0, popular: false },
  { name: "Chicken Cutlet", price: 2.0, popular: true },
  { name: "Beef Cutlet", price: 2.50, popular: false },
  { name: "Unniyappam", price: 0.30, popular: true },
];

const PARTY_QUANTITIES = [50, 100, 150, 200];

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

// Helper function to get the nth occurrence of a day in a month
const getNthDayOfMonth = (year: number, month: number, dayOfWeek: number, nth: number): Date | null => {
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay();

  // Calculate the date of the first occurrence of the target day
  let diff = dayOfWeek - firstDayOfWeek;
  if (diff < 0) diff += 7;

  const firstOccurrence = 1 + diff;
  const nthOccurrence = firstOccurrence + (nth - 1) * 7;

  // Check if this date exists in the month
  const date = new Date(year, month, nthOccurrence);
  if (date.getMonth() !== month) return null;

  return date;
};

// Check if a date is a valid delivery date (2nd or 4th Saturday/Sunday)
const isValidDeliveryDate = (date: Date): boolean => {
  const day = date.getDay();
  const dateNum = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();

  // Must be Saturday (6) or Sunday (0)
  if (day !== 0 && day !== 6) return false;

  // Check if it's the 2nd or 4th occurrence
  const secondOccurrence = getNthDayOfMonth(year, month, day, 2);
  const fourthOccurrence = getNthDayOfMonth(year, month, day, 4);

  if (secondOccurrence && dateNum === secondOccurrence.getDate()) return true;
  if (fourthOccurrence && dateNum === fourthOccurrence.getDate()) return true;

  return false;
};

// Get all valid delivery dates for the next 3 months
const getAvailableDeliveryDates = (): Date[] => {
  const dates: Date[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Look ahead 3 months
  for (let monthOffset = 0; monthOffset < 3; monthOffset++) {
    const targetDate = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();

    // Get 2nd and 4th Saturday and Sunday
    [0, 6].forEach(dayOfWeek => { // 0 = Sunday, 6 = Saturday
      [2, 4].forEach(nth => {
        const date = getNthDayOfMonth(year, month, dayOfWeek, nth);
        if (date && date >= today) {
          dates.push(date);
        }
      });
    });
  }

  return dates.sort((a, b) => a.getTime() - b.getTime());
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
      (plan.delivery_days_available?.[0] || "saturday") as DeliveryDay,
    delivery_date: "", // New field for selected delivery date
    preferred_payment_method: "cash",
    notes: "",
  });

  const [snackPreferences, setSnackPreferences] = useState<SnackPreferences>({
    sweets: [],
    spicy: [],
    salt: [],
  });

  const [partyItems, setPartyItems] = useState<PartyItem[]>([]);

  const [activeSnackTab, setActiveSnackTab] = useState<"sweets" | "spicy" | "salt">("sweets");

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { t } = useLanguage();

  const calculateTotal = () => {
    let total = 0;
    const allSelected = [
      ...snackPreferences.sweets,
      ...snackPreferences.spicy,
      ...snackPreferences.salt,
    ];

    allSelected.forEach((item) => {
      // Extract price from string like "Unniyappam - 10 pcs / €3"
      const match = item.match(/€(\d+(\.\d+)?)/);
      if (match && match[1]) {
        total += parseFloat(match[1]);
      }
    });

    // Add party items total
    partyItems.forEach((item) => {
      total += item.quantity * item.price;
    });

    return total;
  };

  const totalAmount = calculateTotal();

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      frequency: plan.default_frequency || "monthly",
      delivery_day:
        (plan.delivery_days_available?.[0] || prev.delivery_day) ?? "saturday",
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

  const updatePartyItem = (name: string, quantity: number, price: number) => {
    setPartyItems((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (quantity === 0) {
        // Remove item if quantity is 0
        return prev.filter((item) => item.name !== name);
      }
      if (existing) {
        // Update existing item
        return prev.map((item) =>
          item.name === name ? { ...item, quantity, price } : item
        );
      }
      // Add new item
      return [...prev, { name, quantity, price }];
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
    if (!form.delivery_date)
      newErrors.delivery_date = "Delivery date is required";
    if (!form.preferred_payment_method)
      newErrors.preferred_payment_method =
        "Preferred payment method is required";

    // For sample box (one-time orders), require at least one selection
    if (isSampleBox) {
      const hasSnackSelection =
        snackPreferences.sweets.length > 0 ||
        snackPreferences.spicy.length > 0 ||
        snackPreferences.salt.length > 0;
      const hasPartySelection = partyItems.length > 0;

      if (!hasSnackSelection && !hasPartySelection) {
        newErrors.snack_preferences =
          "Please select at least one item from 'Customize your snack box' or 'Party Orders'";
      }
    }

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
    const next_delivery_date = form.delivery_date; // Use the selected date directly

    // Extract day of week from selected date
    const selectedDate = new Date(form.delivery_date);
    const dayOfWeek = selectedDate.getDay();
    const dayNames: DeliveryDay[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const delivery_day_of_week = dayNames[dayOfWeek];

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
      delivery_day_of_week: delivery_day_of_week,
      preferred_payment_method: form.preferred_payment_method,
      start_date,
      next_delivery_date,
      notes: form.notes.trim() || null,
      source: "website",
      customer_external_id: null,
      status: "pending",
      snack_preferences: snackPreferences,
      party_items: partyItems,

      plan_id: plan.id,
      phone: form.phone.trim(),
      email: form.email.trim() || null,
      delivery_day: delivery_day_of_week,
    };

    try {
      console.log("Submitting subscription payload", payload);
      console.log("Party Items:", partyItems);
      console.log("Snack Preferences:", snackPreferences);

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
        party_items: partyItems,
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
        {isSampleBox ? "One-Time Order Details" : "Subscription Details"}
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
              Select Delivery Date <span className="text-rose-500">*</span>
            </label>
            <select
              className="w-full rounded-md border px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
              value={form.delivery_date}
              onChange={(e) => updateField("delivery_date", e.target.value)}
            >
              <option value="">-- Select a delivery date --</option>
              {getAvailableDeliveryDates().map((date) => {
                const dateStr = formatDate(date);
                const dayName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];
                const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
                const displayText = `${dayName}, ${monthName} ${date.getDate()}, ${date.getFullYear()}`;

                return (
                  <option key={dateStr} value={dateStr}>
                    {displayText}
                  </option>
                );
              })}
            </select>
            {errors.delivery_date && (
              <p className="mt-1 text-[11px] text-rose-600">
                {errors.delivery_date}
              </p>
            )}
            <p className="mt-1 text-[10px] text-slate-500">
              Only 2nd & 4th Saturday/Sunday of each month are available
            </p>
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
          <p className="text-[11px] text-slate-500 mb-3">
            Choose what you'd like to see more often in your subscription.
            We'll do our best to match your preferences.
          </p>

          {/* Unified Card Container */}
          <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            {/* Tab Navigation */}
            <div className="flex gap-1 border-b border-slate-200 bg-slate-50/50 px-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveSnackTab("sweets")}
                className={`relative px-4 py-2 text-xs font-medium transition-all rounded-t-lg ${activeSnackTab === "sweets"
                  ? "text-amber-700 bg-white"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>🍬</span> Sweets
                </span>
                {activeSnackTab === "sweets" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSnackTab("spicy")}
                className={`relative px-4 py-2 text-xs font-medium transition-all rounded-t-lg ${activeSnackTab === "spicy"
                  ? "text-amber-700 bg-white"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>🌶️</span> Spicy
                </span>
                {activeSnackTab === "spicy" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveSnackTab("salt")}
                className={`relative px-4 py-2 text-xs font-medium transition-all rounded-t-lg ${activeSnackTab === "salt"
                  ? "text-amber-700 bg-white"
                  : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
                  }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>🧂</span> Salt
                </span>
                {activeSnackTab === "salt" && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400" />
                )}
              </button>
            </div>

            {/* Tab Content with Glassmorphism */}
            <div className="snack-tab-content p-4 min-h-[140px]">
              {activeSnackTab === "sweets" && (
                <div className="grid md:grid-cols-2 gap-3 text-[11px]">
                  {SNACK_CUSTOMIZATION.sweets.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/80 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={snackPreferences.sweets.includes(item)}
                        onChange={() => toggleSnackPreference("sweets", item)}
                        className="snack-checkbox"
                      />
                      <span className="text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
              )}

              {activeSnackTab === "spicy" && (
                <div className="grid md:grid-cols-2 gap-3 text-[11px]">
                  {SNACK_CUSTOMIZATION.spicy.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/80 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={snackPreferences.spicy.includes(item)}
                        onChange={() => toggleSnackPreference("spicy", item)}
                        className="snack-checkbox"
                      />
                      <span className="text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
              )}

              {activeSnackTab === "salt" && (
                <div className="grid md:grid-cols-2 gap-3 text-[11px]">
                  {SNACK_CUSTOMIZATION.salt.map((item) => (
                    <label
                      key={item}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/80 cursor-pointer transition-all"
                    >
                      <input
                        type="checkbox"
                        checked={snackPreferences.salt.includes(item)}
                        onChange={() => toggleSnackPreference("salt", item)}
                        className="snack-checkbox"
                      />
                      <span className="text-slate-700">{item}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Party Orders - Bulk Items - Only for Sample Box (One-time orders) */}
          {isSampleBox && (
            <div className="mt-4">
              <p className="block font-medium text-slate-800 mb-1 flex items-center gap-2">
                <span>🎉</span> Party Orders (Bulk)
              </p>
              <p className="text-[11px] text-slate-500 mb-3">
                Minimum order quantities for events and parties.
              </p>

              {/* Party Items List */}
              <div className="space-y-3">
                {PARTY_ITEMS.map((item) => {
                  const currentItem = partyItems.find((p) => p.name === item.name);
                  const currentQty = currentItem?.quantity || 0;
                  const totalPrice = currentQty * item.price;

                  return (
                    <div
                      key={item.name}
                      className="relative rounded-xl border border-slate-200 bg-gradient-to-br from-white to-amber-50/20 p-4 hover:shadow-md transition-all"
                    >
                      {item.popular && (
                        <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                          ⭐ Popular
                        </span>
                      )}

                      {/* Item Info */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 text-sm mb-0.5">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-500">
                            €{item.price.toFixed(2)} per piece
                          </p>
                        </div>
                        {currentQty > 0 && (
                          <div className="text-right">
                            <p className="text-xs font-semibold text-amber-700">
                              €{totalPrice.toFixed(2)}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {currentQty} pcs
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2">
                        <label className="text-[11px] text-slate-600 font-medium whitespace-nowrap">
                          Quantity:
                        </label>
                        <select
                          className="party-select flex-1 max-w-[200px] rounded-lg border border-slate-300 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all"
                          value={currentQty}
                          onChange={(e) => {
                            const qty = parseInt(e.target.value);
                            updatePartyItem(item.name, qty, item.price);
                          }}
                        >
                          <option value="0" className="party-option">Select quantity</option>
                          {PARTY_QUANTITIES.map((qty) => (
                            <option key={qty} value={qty} className="party-option">
                              {qty} pieces
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

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
          <div className="flex items-center gap-4 mb-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-6 py-2 text-sm font-semibold shadow-sm"
            >
              {submitting ? "Submitting..." : "Confirm Subscription"}
            </button>

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">{t('label_total')}</span>
              <span className="text-xl font-bold text-amber-600">€{totalAmount.toFixed(2)}</span>
            </div>
          </div>

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
      </form>
    </section>
  );
};



export default SubscriptionDetails;
