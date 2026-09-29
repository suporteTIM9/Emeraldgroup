import { useEffect, useState } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "emerald-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (private browsing, blocked storage) — skip the banner
    }
  }, []);

  const respond = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore — banner will just reappear next visit
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[200] border-t"
      style={{ background: "#1e1f1f", borderColor: "rgba(255,255,255,0.08)" }}
      role="dialog"
      aria-label="Cookie consent"
    >
      <div className="container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed sm:text-sm" style={{ color: "rgba(255,255,255,0.75)", fontFamily: "Nunito Sans, sans-serif" }}>
          We use cookies to enhance your experience and analyse website traffic. By clicking "Accept",
          you consent to our use of cookies. See our{" "}
          <Link href="/legal" className="underline transition-colors hover:text-white" style={{ color: "#02f9ba" }}>
            Cookie Policy
          </Link>{" "}
          for details.
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => respond("declined")}
            className="text-xs font-semibold transition-colors hover:text-white sm:text-sm"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => respond("accepted")}
            className="rounded-sm px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-opacity hover:opacity-90 sm:text-sm"
            style={{ background: "#02d49e" }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
