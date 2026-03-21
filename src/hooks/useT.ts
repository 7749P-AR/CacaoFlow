"use client";

import { useLangStore } from "@/store/langStore";
import en from "@/lib/i18n/en.json";
import es from "@/lib/i18n/es.json";

const dictionaries = { en, es } as const;

type DeepValue = string | Record<string, unknown>;

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[part];
  }
  if (typeof current === "string") return current;
  return path;
}

export function useT() {
  const lang = useLangStore((s) => s.lang);
  const dict = dictionaries[lang] as unknown as Record<string, unknown>;

  function t(key: string, vars?: Record<string, string | number>): string {
    let value = getNestedValue(dict, key);
    if (value === key) {
      // fallback to English
      const enDict = dictionaries["en"] as unknown as Record<string, unknown>;
      value = getNestedValue(enDict, key);
    }
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        value = value.replace(`{{${k}}}`, String(v));
      });
    }
    return value;
  }

  return { t, lang };
}
