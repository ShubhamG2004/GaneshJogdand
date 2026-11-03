"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const isMarathi = language === "mr";

  return (
    <button
      type="button"
      className="focus-ring inline-flex items-center gap-2 rounded border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50"
      onClick={() => setLanguage(isMarathi ? "en" : "mr")}
      aria-label="Change language"
    >
      <Languages size={18} />
      {isMarathi ? "English" : "मराठी"}
    </button>
  );
}
