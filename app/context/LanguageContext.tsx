'use client';
import { createContext, useContext, useState, ReactNode } from "react";

type lang = "en" | "ar";

interface LanguageContextProps {
  lang: lang;
  setLanguage: (lang: lang) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLanguage] = useState<lang>("en");

  return (
    <LanguageContext.Provider value={{ lang, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
