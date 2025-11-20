import React, { useEffect, useState } from "react";
import Header from "./general/Header";
import Footer from "./general/Footer";
import HeroSection from "./pages/HeroSection";
import HowItWorks from "./pages/HowItWorks";
import FeaturedSnacks from "./pages/FeaturedSnacks";
import ContactUs from "./pages/ContactUs";
import ContactForm from "./pages/ContactForm";
import FAQ from "./pages/FAQ";
import ChooseYourSubscriptionPlan from "./components/ChooseYourSubscriptionPlan";
import NotSureWhichPlanCTA from "./components/NotSureWhichPlanCTA";
import SubscriptionDetails from "./components/SubscriptionDetails";
import { MOCK_PLANS, type Plan } from "./subscriptionData";

const getRelativePath = (): string => {
  const base = import.meta.env.BASE_URL || "/"; // "/" locally, "/Homemade-Snacks/" on GitHub
  const basePath = base.endsWith("/") ? base.slice(0, -1) : base; // "/Homemade-Snacks"
  const { pathname, search } = window.location; // e.g. "/Homemade-Snacks/subscribe"

  let relative = pathname;

  // Strip "/Homemade-Snacks" part if present
  if (basePath && relative.startsWith(basePath)) {
    relative = relative.slice(basePath.length);
  }

  if (relative === "") relative = "/";
  if (!relative.startsWith("/")) relative = "/" + relative;

  return relative + search; // e.g. "/subscribe?plan_id=3"
};


// const useRoute = () => {
//   const [path, setPath] = useState<string>(
//     () => window.location.pathname + window.location.search
//   );

//   useEffect(() => {
//     const handler = () => {
//       setPath(window.location.pathname + window.location.search);
//     };
//     window.addEventListener("popstate", handler);
//     return () => window.removeEventListener("popstate", handler);
//   }, []);

//   const navigate = (to: string) => {
//     if (to === path) return;
//     window.history.pushState({}, "", to);
//     setPath(to);
//   };

//   return { path, navigate };
// };

const useRoute = () => {
  const [path, setPath] = useState<string>(() => getRelativePath());

  useEffect(() => {
    const handler = () => {
      setPath(getRelativePath());
    };
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  const navigate = (to: string) => {
    // Always work with a leading "/"
    if (!to.startsWith("/")) {
      to = "/" + to;
    }

    if (to === path) return;

    const base = import.meta.env.BASE_URL || "/";
    const basePath = base.endsWith("/") ? base.slice(0, -1) : base; // "" or "/Homemade-Snacks"

    const fullPath = `${basePath}${to}`; // e.g. "/Homemade-Snacks" + "/plans"

    window.history.pushState({}, "", fullPath);
    setPath(to);
  };

  return { path, navigate };
};

const parseQuery = (search: string | null) => {
  const params = new URLSearchParams(search || window.location.search);
  const result: Record<string, string> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
};

const App: React.FC = () => {
  const { path, navigate } = useRoute();
  const [plans, setPlans] = useState<Plan[]>(MOCK_PLANS);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [plansError, setPlansError] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      setLoadingPlans(true);
      setPlansError("");
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setPlans(MOCK_PLANS);
      } catch (err) {
        console.error(err);
        setPlansError(
          "Could not load plans. Showing default plans for now."
        );
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const cleanPath = path.split("?")[0];
  let page: React.ReactNode = null;

  if (cleanPath === "/") {
    page = (
      <main className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <HeroSection onNavigate={navigate} />
        <HowItWorks onNavigate={navigate} />
        <FeaturedSnacks />
      </main>
    );
  } else if (cleanPath === "/plans") {
    page = (
      <main className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <ChooseYourSubscriptionPlan plans={plans} onNavigate={navigate} />
        <NotSureWhichPlanCTA />
      </main>
    );
  } else if (cleanPath === "/contact") {
    page = (
      <main className="max-w-5xl mx-auto px-4 pt-8 pb-16">
        <section className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.3fr)] gap-8 items-start mb-12">
          <ContactUs />
          <ContactForm />
        </section>
        <FAQ />
      </main>
    );
  } else if (cleanPath === "/subscribe") {
    const query = parseQuery(path.split("?")[1] ? "?" + path.split("?")[1] : "");
    const planId = query.plan_id ? Number(query.plan_id) : null;
    const selectedPlan = plans.find((p) => p.id === planId) || plans[0];

    if (!selectedPlan) {
      page = (
        <main className="max-w-3xl mx-auto px-4 pt-8 pb-16">
          <p className="text-sm text-slate-600 mb-4">
            We couldn’t find that subscription plan.
          </p>
          <button
            onClick={() => navigate("/plans")}
            className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 text-sm font-semibold shadow-sm"
          >
            View All Plans
          </button>
        </main>
      );
    } else {
      page = (
        <main className="max-w-5xl mx-auto px-4 pt-8 pb-16">
          <SubscriptionDetails
            plan={selectedPlan}
            onSuccess={() => navigate("/subscribe/thank-you")}
          />
        </main>
      );
    }
  } else if (cleanPath === "/subscribe/thank-you") {
    page = (
      <main className="max-w-xl mx-auto px-4 pt-16 pb-20">
        <section className="rounded-2xl border bg-white p-8 shadow-sm text-center flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl mb-1">
            ✅
          </div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Thank you!
          </h1>
          <p className="text-sm text-slate-600 max-w-sm">
            Your subscription request has been received. We will confirm your
            subscription via WhatsApp shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 text-sm font-semibold shadow-sm"
          >
            Back to Home
          </button>
        </section>
      </main>
    );
  } else {
    page = (
      <main className="max-w-xl mx-auto px-4 pt-16 pb-20 text-center">
        <h1 className="text-xl font-semibold text-slate-900 mb-2">
          Page not found
        </h1>
        <p className="text-sm text-slate-600 mb-4">
          The page you’re looking for doesn’t exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center justify-center rounded-full bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 text-sm font-semibold shadow-sm"
        >
          Go to Home
        </button>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/60 via-white to-slate-50 text-slate-900">
      <Header onNavigate={navigate} />
      {loadingPlans && (
        <div className="max-w-5xl mx-auto px-4 pt-3 text-[11px] text-slate-500">
          Loading latest subscription plans...
        </div>
      )}
      {plansError && (
        <div className="max-w-5xl mx-auto px-4 pt-3 text-[11px] text-amber-700">
          {plansError}
        </div>
      )}
      <div className="flex-1">{page}</div>
      <Footer />
    </div>
  );
};

export default App;
