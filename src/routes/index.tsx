import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  CreditCard,
  GraduationCap,
  MonitorPlay,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";

import { SiteLayout } from "@/components/site/SiteLayout";
import { CourseCard } from "@/components/site/CourseCard";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  categoriesQuery,
  coursesQuery,
  instructorsQuery,
  isFreeCourse,
  settingsMap,
  settingsQuery,
} from "@/lib/api";
import { StorageImage } from "@/components/site/StorageImage";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Green Bangla Learning Academy — কুরআন, ব্যবসা ও ব্যক্তিগত উন্নয়ন কোর্স" },
      {
        name: "description",
        content:
          "কুরআন শিক্ষা, ব্যবসা শিক্ষা ও ব্যক্তিগত উন্নয়নের মানসম্মত অনলাইন কোর্স। আবেদন করুন, অনুমোদনের পর ভর্তি হোন।",
      },
      { property: "og:title", content: "Green Bangla Learning Academy" },
      {
        property: "og:description",
        content: "কুরআন, ব্যবসা এবং ব্যক্তিগত উন্নয়নে প্রয়োজনীয় জ্ঞান ও দক্ষতা অর্জন করুন।",
      },
    ],
  }),
  component: HomePage,
});

const categoryIcon = (icon: string) => {
  if (icon === "Briefcase") return Briefcase;
  if (icon === "Sparkles") return Sparkles;
  return BookOpen;
};

const bn = (n: number) => n.toLocaleString("bn-BD");

const reasons = [
  {
    icon: Award,
    title: "অভিজ্ঞ শিক্ষকমণ্ডলী",
    text: "প্রতিটি বিষয়ে দীর্ঘ অভিজ্ঞতাসম্পন্ন শিক্ষকের সরাসরি তত্ত্বাবধান।",
  },
  {
    icon: Users,
    title: "ছোট ব্যাচ",
    text: "সীমিত আসনে ব্যক্তিগত মনোযোগ ও নিয়মিত ফিডব্যাক নিশ্চিত করা হয়।",
  },
  {
    icon: CheckCircle2,
    title: "যাচাই করা ভর্তি প্রক্রিয়া",
    text: "আবেদন পর্যালোচনার পর উপযুক্ত শিক্ষার্থীদের ভর্তির সুযোগ।",
  },
  {
    icon: GraduationCap,
    title: "স্কলারশিপ সুবিধা",
    text: "নির্বাচিত কোর্সে সম্পূর্ণ ফ্রি বা স্কলারশিপে অংশগ্রহণের সুযোগ।",
  },
];

const steps = [
  { icon: BookOpen, title: "কোর্স বাছাই", text: "আপনার লক্ষ্য অনুযায়ী উপযুক্ত কোর্স নির্বাচন করুন।" },
  { icon: ClipboardList, title: "আবেদন জমা", text: "সংক্ষিপ্ত ফর্ম পূরণ করে আবেদন পাঠান।" },
  { icon: UserCheck, title: "অনুমোদন", text: "আমাদের টিম আবেদন যাচাই করে সিদ্ধান্ত জানাবে।" },
  { icon: CreditCard, title: "পেমেন্ট ও ভর্তি", text: "অনুমোদনের পর ফি পরিশোধ করে ক্লাস শুরু করুন। ফ্রি কোর্সে পেমেন্ট লাগবে না।" },
];

const faqs = [
  {
    q: "কীভাবে ভর্তি হব?",
    a: "পছন্দের কোর্সের পেজে গিয়ে “আবেদন করুন” বাটনে ক্লিক করে সংক্ষিপ্ত ফর্মটি পূরণ করুন। আমাদের টিম আবেদন যাচাই করে আপনাকে ফোন বা WhatsApp-এ জানাবে।",
  },
  {
    q: "আবেদন করতে কি কোনো টাকা লাগে?",
    a: "না, আবেদন সম্পূর্ণ ফ্রি। আবেদন অনুমোদিত হলে তারপর কোর্স ফি পরিশোধ করতে হয়। ফ্রি ও স্কলারশিপ কোর্সে কোনো ফি নেই।",
  },
  {
    q: "স্কলারশিপ কারা পাবেন?",
    a: "নির্বাচিত কোর্সগুলোতে স্কলারশিপ দেওয়া হয়। কোর্স কার্ডে “স্কলারশিপ” ব্যাজ থাকলে সেই কোর্সে আবেদন করুন — আবেদন যাচাইয়ের পর যোগ্য শিক্ষার্থীদের নির্বাচন করা হয়।",
  },
  {
    q: "ক্লাস কীভাবে হয়?",
    a: "অভিজ্ঞ শিক্ষকের তত্ত্বাবধানে ছোট ব্যাচে ক্লাস হয়, যাতে প্রত্যেকে ব্যক্তিগত মনোযোগ ও নিয়মিত ফিডব্যাক পান। ভর্তির সময় ক্লাসের সময়সূচি জানিয়ে দেওয়া হবে।",
  },
  {
    q: "আরও প্রশ্ন থাকলে কোথায় যোগাযোগ করব?",
    a: "যোগাযোগ পেজ থেকে ফোন, ইমেইল বা WhatsApp-এ সরাসরি আমাদের সাথে কথা বলুন। আমরা দ্রুত উত্তর দেব।",
  },
];

function SectionHead({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <span className="eyebrow">
        <span className="h-px w-6 bg-gold" /> {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl sm:text-4xl">{title}</h2>
      {text ? <p className="mt-4 leading-relaxed text-muted-foreground">{text}</p> : null}
    </div>
  );
}

function HomePage() {
  const { data: categories = [] } = useQuery(categoriesQuery);
  const { data: courses = [] } = useQuery(coursesQuery());
  const { data: instructors = [] } = useQuery(instructorsQuery);
  const { data: settings } = useQuery(settingsQuery);
  const s = settingsMap(settings);

  // Featured first, then fill with the rest so the grid is always full rows of 3
  const ordered = [...courses.filter((c) => c.is_featured), ...courses.filter((c) => !c.is_featured)];
  const shownCount = ordered.length >= 6 ? 6 : ordered.length >= 3 ? 3 : ordered.length;
  const shown = ordered.slice(0, shownCount);
  const freeCount = courses.filter(isFreeCourse).length;

  // Highlight the last two words of the hero title in gold
  const heroTitle = s("hero_title", "শিক্ষায় নতুন দিগন্ত আবিষ্কার করুন");
  const words = heroTitle.trim().split(/\s+/);
  // Gold on the middle phrase (e.g. "নতুন দিগন্ত"), keep the verb at the end plain
  const hasMid = words.length >= 4;
  const titleLead = hasMid ? words.slice(0, 1).join(" ") : heroTitle;
  const titleGold = hasMid ? words.slice(1, 3).join(" ") : "";
  const titleTail = hasMid ? words.slice(3).join(" ") : "";

  const stats = [
    { value: `${bn(courses.length)}+`, label: "মানসম্মত কোর্স" },
    { value: bn(categories.length), label: "শিক্ষা বিভাগ" },
    { value: bn(instructors.length), label: "অভিজ্ঞ শিক্ষক" },
    { value: bn(freeCount), label: "ফ্রি ও স্কলারশিপ কোর্স" },
  ];

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-deep text-deep-foreground">
        <div className="bg-pattern absolute inset-0 -z-10 opacity-70" />
        <div className="absolute -left-40 -top-40 -z-10 size-[520px] rounded-full bg-primary/40 blur-[120px]" />
        <div className="absolute -bottom-40 right-0 -z-10 size-[420px] rounded-full bg-gold/20 blur-[120px]" />

        <div className="container-page grid items-center gap-14 pb-28 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pb-36 lg:pt-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-gold" />
              </span>
              {s("hero_badge", "নতুন ব্যাচে ভর্তি চলছে")}
            </span>
            <h1 className="mt-6 text-4xl leading-[1.3] sm:text-5xl lg:text-6xl lg:leading-[1.25]">
              {titleLead}{" "}
              {titleGold ? <span className="text-gold-gradient">{titleGold}</span> : null}{" "}
              {titleTail}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-deep-foreground/75 sm:text-lg">
              {s("hero_subtitle", "কুরআন, ব্যবসা এবং ব্যক্তিগত উন্নয়নে প্রয়োজনীয় জ্ঞান ও দক্ষতা অর্জন করুন।")}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gold px-7 text-base font-semibold text-gold-foreground shadow-[var(--shadow-gold)] hover:bg-gold/90"
              >
                <Link to="/courses">
                  {s("hero_primary_cta", "কোর্স দেখুন")} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/25 bg-white/5 px-7 text-base text-deep-foreground backdrop-blur hover:bg-white/10 hover:text-deep-foreground"
              >
                <Link to="/about">{s("hero_secondary_cta", "আমাদের সম্পর্কে জানুন")}</Link>
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-deep-foreground/70">
              {["আবেদন সম্পূর্ণ ফ্রি", "অভিজ্ঞ শিক্ষক", "ছোট ব্যাচে ক্লাস"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-gold" /> {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/30" />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-white/10">
              <StorageImage
                src={s("hero_banner_image", heroImage)}
                alt="শিক্ষার্থীরা একসাথে পড়াশোনা করছে"
                width={1600}
                height={1104}
                className="aspect-[4/3] size-full object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-tr from-deep/50 via-transparent to-transparent" />
            </div>

            <div className="animate-float absolute -bottom-6 left-3 flex items-center gap-3 rounded-2xl bg-white p-3.5 pr-5 text-foreground shadow-[var(--shadow-premium)] sm:-left-8">
              <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <MonitorPlay className="size-5" />
              </span>
              <span>
                <span className="block text-lg font-bold leading-none">{bn(courses.length)}+ কোর্স</span>
                <span className="mt-1 block text-xs text-muted-foreground">কুরআন, ব্যবসা ও উন্নয়ন</span>
              </span>
            </div>

            <div
              className="animate-float absolute -top-5 right-3 flex items-center gap-2.5 rounded-2xl bg-white p-3 pr-4 text-foreground shadow-[var(--shadow-premium)] sm:-right-6"
              style={{ animationDelay: "-3s" }}
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-gold text-gold-foreground">
                <GraduationCap className="size-4" />
              </span>
              <span className="text-sm font-semibold">স্কলারশিপ সুবিধা</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="relative z-10 -mt-16">
        <div className="container-page">
          <dl className="grid grid-cols-2 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-premium)] lg:grid-cols-4">
            {stats.map((st, i) => (
              <div
                key={st.label}
                className={`px-6 py-7 text-center ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} ${i === 1 ? "lg:border-r" : ""} border-border`}
              >
                <dd className="font-display text-3xl font-bold text-primary sm:text-4xl">{st.value}</dd>
                <dt className="mt-1.5 text-sm text-muted-foreground">{st.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section-y">
        <div className="container-page">
          <SectionHead
            eyebrow="আমাদের বিশেষত্ব"
            title="কেন আমাদের বেছে নেবেন"
            text="শেখার প্রতিটি ধাপে সহজ, স্বচ্ছ ও মানসম্মত অভিজ্ঞতা নিশ্চিত করি।"
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="reveal card-premium lift group p-7">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-soft text-gold-foreground ring-1 ring-gold/30 transition-colors group-hover:bg-gold">
                  <r.icon className="size-5" />
                </span>
                <h3 className="mt-5 text-lg">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-y bg-surface">
        <div className="container-page">
          <SectionHead eyebrow="বিভাগসমূহ" title="কোর্স বিভাগ" text="আপনার আগ্রহের বিষয় বেছে নিন।" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {categories.map((c) => {
              const Icon = categoryIcon(c.icon);
              return (
                <Link
                  key={c.id}
                  to="/courses"
                  search={{ category: c.slug }}
                  className="reveal card-premium lift group relative overflow-hidden p-8"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: c.color }}
                  />
                  <Icon
                    className="absolute -bottom-6 -right-6 size-36 opacity-[0.06] transition-transform duration-500 group-hover:scale-110"
                    style={{ color: c.color }}
                  />
                  <span
                    className="flex size-14 items-center justify-center rounded-2xl"
                    style={{ backgroundColor: c.bg_color, color: c.color }}
                  >
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl">{c.name_bn}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {c.description_bn}
                  </p>
                  <span
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold"
                    style={{ color: c.color }}
                  >
                    কোর্স দেখুন
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured courses */}
      <section className="section-y">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              eyebrow="জনপ্রিয়"
              title="জনপ্রিয় কোর্সসমূহ"
              text="শিক্ষার্থীদের পছন্দের কোর্সগুলো দেখে নিন।"
            />
            <Button asChild variant="outline" className="rounded-full px-5">
              <Link to="/courses">
                সব কোর্স <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((course) => (
              <div key={course.id} className="reveal">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-y relative isolate overflow-hidden bg-deep text-deep-foreground">
        <div className="bg-pattern absolute inset-0 -z-10 opacity-50" />
        <div className="container-page">
          <SectionHead
            eyebrow="ভর্তি প্রক্রিয়া"
            title="মাত্র ৪ ধাপে ভর্তি"
            center
          />
          <div className="relative mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <span className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-gold/0 via-gold/50 to-gold/0 lg:block" />
            {steps.map((st, i) => (
              <div key={st.title} className="reveal relative text-center">
                <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-gold text-gold-foreground shadow-[var(--shadow-gold)] ring-8 ring-deep">
                  <st.icon className="size-6" />
                  <span className="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-deep">
                    {bn(i + 1)}
                  </span>
                </span>
                <h3 className="mt-6 text-lg">{st.title}</h3>
                <p className="mx-auto mt-2 max-w-60 text-sm leading-relaxed text-deep-foreground/70">
                  {st.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      {instructors.length ? (
        <section className="section-y">
          <div className="container-page">
            <SectionHead
              eyebrow="শিক্ষকমণ্ডলী"
              title="আমাদের শিক্ষকমণ্ডলী"
              text="অভিজ্ঞ ও নিবেদিতপ্রাণ শিক্ষকদের তত্ত্বাবধানে শিখুন।"
              center
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {instructors.map((i) => (
                <div key={i.id} className="reveal card-premium lift p-8 text-center">
                  <div className="mx-auto w-fit rounded-full bg-gradient-to-br from-gold via-gold/40 to-primary p-[3px]">
                    {i.photo_url ? (
                      <StorageImage
                        src={i.photo_url}
                        alt={i.name_bn}
                        loading="lazy"
                        className="size-24 rounded-full border-4 border-card object-cover"
                      />
                    ) : (
                      <span className="flex size-24 items-center justify-center rounded-full border-4 border-card bg-primary-soft font-display text-3xl font-bold text-primary">
                        {i.name_bn.slice(0, 1)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-5 text-lg">{i.name_bn}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{i.title_bn}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{i.bio_bn}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="section-y bg-surface">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead
              eyebrow="প্রশ্নোত্তর"
              title="সাধারণ জিজ্ঞাসা"
              text="ভর্তি, ফি ও স্কলারশিপ নিয়ে সবচেয়ে বেশি যে প্রশ্নগুলো আসে।"
            />
            <Button asChild variant="outline" className="mt-8 rounded-full px-5">
              <Link to="/contact">
                আরও প্রশ্ন? যোগাযোগ করুন <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <Accordion type="single" collapsible defaultValue="faq-0" className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`faq-${i}`}
                className="rounded-2xl border border-border bg-card px-6 data-[state=open]:border-gold/50 data-[state=open]:shadow-[var(--shadow-card)]"
              >
                <AccordionTrigger className="py-5 text-left text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="section-y">
        <div className="container-page">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-deep px-6 py-16 text-center text-deep-foreground shadow-[var(--shadow-premium)] sm:px-12 lg:py-20">
            <div className="bg-pattern absolute inset-0 -z-10 opacity-60" />
            <div className="absolute left-1/2 top-0 -z-10 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/25 blur-[100px]" />
            <span className="eyebrow justify-center">
              <span className="h-px w-6 bg-gold" /> ভর্তি চলছে <span className="h-px w-6 bg-gold" />
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl">{s("cta_title", "আজই আবেদন করুন")}</h2>
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-deep-foreground/75">
              {s("cta_text", "পছন্দের কোর্সে আবেদন জমা দিন। আমাদের টিম যাচাই করে দ্রুত আপনাকে জানাবে।")}
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Button
                asChild
                size="lg"
                className="h-12 rounded-full bg-gold px-7 text-base font-semibold text-gold-foreground shadow-[var(--shadow-gold)] hover:bg-gold/90"
              >
                <Link to="/courses">
                  কোর্স দেখুন <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-full border-white/25 bg-white/5 px-7 text-base text-deep-foreground hover:bg-white/10 hover:text-deep-foreground"
              >
                <Link to="/contact">যোগাযোগ করুন</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
