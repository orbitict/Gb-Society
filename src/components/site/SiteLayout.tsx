import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { MessageCircle } from "lucide-react";

import { settingsMap, settingsQuery } from "@/lib/api";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

function WhatsAppButton() {
  const { data: settings } = useQuery(settingsQuery);
  const s = settingsMap(settings);
  const number = s("contact_whatsapp_intl", "8801834757376");
  if (!number) return null;

  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp-এ যোগাযোগ করুন"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_10px_30px_-6px_rgb(37_211_102/60%)] transition-transform hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle className="size-6" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 group-hover:pr-1 sm:inline">
        WhatsApp করুন
      </span>
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
