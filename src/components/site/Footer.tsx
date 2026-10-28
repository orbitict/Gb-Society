import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Facebook, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BrandLogo } from "@/components/site/BrandLogo";
import { categoriesQuery, settingsMap, settingsQuery } from "@/lib/api";

export function Footer() {
  const { data: settings } = useQuery(settingsQuery);
  const { data: categories = [] } = useQuery(categoriesQuery);
  const s = settingsMap(settings);

  const siteName = s("site_name", "Green Bangla Learning Academy");
  const whatsappIntl = s("contact_whatsapp_intl", "8801834757376");

  return (
    <footer className="relative isolate overflow-hidden bg-deep text-deep-foreground">
      <div className="bg-pattern absolute inset-0 -z-10 opacity-40" />
      <div className="h-1 bg-gradient-to-r from-primary via-gold to-primary" />
      <div className="container-page grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-2xl bg-white p-1.5"><BrandLogo className="h-14 w-auto" /></span>
            <span className="max-w-40 font-display text-lg font-bold leading-tight">{siteName}</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-deep-foreground/70">{s("site_tagline")}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">দ্রুত লিংক</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-deep-foreground/70">
            <li><Link to="/" className="hover:text-gold">হোম</Link></li>
            <li><Link to="/courses" className="hover:text-gold">সব কোর্স</Link></li>
            <li><Link to="/about" className="hover:text-gold">আমাদের সম্পর্কে</Link></li>
            <li><Link to="/contact" className="hover:text-gold">যোগাযোগ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">বিভাগসমূহ</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-deep-foreground/70">
            {categories.map((c) => (
              <li key={c.id}>
                <Link to="/courses" search={{ category: c.slug }} className="hover:text-gold">
                  {c.name_bn}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">যোগাযোগ</h3>
          <ul className="mt-4 space-y-3 text-sm text-deep-foreground/70">
            {s("contact_address") ? (
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {s("contact_address")}
              </li>
            ) : null}
            {s("contact_email") ? (
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`mailto:${s("contact_email")}`} className="hover:text-gold">{s("contact_email")}</a>
              </li>
            ) : null}
            {s("contact_phone") ? (
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`tel:+88${s("contact_phone").replace(/[^0-9]/g, "")}`} className="hover:text-gold">
                  {s("contact_phone")}
                </a>
              </li>
            ) : null}
            {s("contact_whatsapp") ? (
              <li className="flex items-start gap-2">
                <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={`https://wa.me/${whatsappIntl}`} target="_blank" rel="noreferrer" className="hover:text-gold">
                  {s("contact_whatsapp")}
                </a>
              </li>
            ) : null}
            {s("contact_facebook") ? (
              <li className="flex items-start gap-2">
                <Facebook className="mt-0.5 size-4 shrink-0 text-gold" />
                <a href={s("contact_facebook")} target="_blank" rel="noreferrer" className="hover:text-gold">Facebook</a>
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-deep-foreground/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {siteName}। সর্বস্বত্ব সংরক্ষিত।</p>
          <Link to="/admin" className="hover:text-gold">অ্যাডমিন</Link>
        </div>
      </div>
    </footer>
  );
}
