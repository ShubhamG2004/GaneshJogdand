"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Language, marathiDictionary } from "@/lib/i18n";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (text: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
const originalText = new WeakMap<Text, string>();
const translatedAttributes = ["placeholder", "aria-label", "alt", "title"] as const;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("physiocare-language") as Language | null;
    if (saved === "mr" || saved === "en") {
      setLanguageState(saved);
    }
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    function translate(text: string) {
      return language === "mr" ? marathiDictionary[text] ?? text : text;
    }

    return {
      language,
      translate,
      setLanguage(nextLanguage) {
        window.localStorage.setItem("physiocare-language", nextLanguage);
        setLanguageState(nextLanguage);
      }
    };
  }, [language]);

  useEffect(() => {
    document.documentElement.lang = language === "mr" ? "mr" : "en";
    translateDocument(document.body, language);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => translateDocument(node, language));
        if (mutation.type === "attributes") {
          translateDocument(mutation.target, language);
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: [...translatedAttributes]
    });

    return () => observer.disconnect();
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

function translateDocument(root: Node, language: Language) {
  if (root.nodeType === Node.TEXT_NODE) {
    translateTextNode(root as Text, language);
    return;
  }

  if (!(root instanceof Element)) {
    return;
  }

  if (["SCRIPT", "STYLE", "NOSCRIPT"].includes(root.tagName)) {
    return;
  }

  translateElementAttributes(root, language);

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode() as Text | null;
  while (node) {
    translateTextNode(node, language);
    node = walker.nextNode() as Text | null;
  }

  root.querySelectorAll("*").forEach((element) => translateElementAttributes(element, language));
}

function translateTextNode(node: Text, language: Language) {
  const raw = originalText.get(node) ?? node.nodeValue ?? "";
  if (!raw.trim()) {
    return;
  }

  originalText.set(node, raw);
  const leading = raw.match(/^\s*/)?.[0] ?? "";
  const trailing = raw.match(/\s*$/)?.[0] ?? "";
  const source = raw.trim();
  node.nodeValue = `${leading}${language === "mr" ? translateToMarathi(source) : source}${trailing}`;
}

function translateElementAttributes(element: Element, language: Language) {
  translatedAttributes.forEach((attribute) => {
    const current = element.getAttribute(attribute);
    if (!current) {
      return;
    }

    const key = `data-original-${attribute}`;
    const source = element.getAttribute(key) ?? current;
    const translated = language === "mr" ? translateToMarathi(source) : source;

    if (!element.hasAttribute(key)) {
      element.setAttribute(key, source);
    }

    if (current !== translated) {
      element.setAttribute(attribute, translated);
    }
  });
}

function translateToMarathi(source: string) {
  const viewsMatch = source.match(/^([\d,]+)\sviews$/);
  if (viewsMatch) {
    return `${toMarathiDigits(viewsMatch[1])} व्ह्यूज`;
  }

  return marathiDictionary[source] ?? source;
}

function toMarathiDigits(value: string) {
  const digits: Record<string, string> = {
    "0": "०",
    "1": "१",
    "2": "२",
    "3": "३",
    "4": "४",
    "5": "५",
    "6": "६",
    "7": "७",
    "8": "८",
    "9": "९"
  };

  return value.replace(/[0-9]/g, (digit) => digits[digit]);
}
