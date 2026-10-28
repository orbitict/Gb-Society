import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Clock, Layers, Signal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { courseImage, feeLabel, isFreeCourse, type Course } from "@/lib/api";
import { StorageImage } from "@/components/site/StorageImage";

export function CourseCard({ course }: { course: Course }) {
  const category = course.categories;
  const instructor = course.instructors;
  const free = isFreeCourse(course);

  return (
    <article className="group card-premium lift flex h-full flex-col overflow-hidden">
      <Link
        to="/course/$slug"
        params={{ slug: course.slug }}
        className="relative block aspect-[3/2] overflow-hidden bg-muted"
      >
        <StorageImage
          src={courseImage(course)}
          alt={course.title_bn}
          loading="lazy"
          width={1200}
          height={800}
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-deep/80 via-deep/10 to-transparent" />

        {category ? (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-deep backdrop-blur">
            <span
              className="mr-1.5 inline-block size-2 rounded-full align-middle"
              style={{ backgroundColor: category.color }}
            />
            {category.name_bn}
          </span>
        ) : null}

        {course.is_scholarship ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-[11px] font-semibold text-gold-foreground shadow-[var(--shadow-gold)]">
            <Award className="size-3" /> স্কলারশিপ
          </span>
        ) : null}

        <span
          className={
            free
              ? "absolute bottom-3 left-3 rounded-lg bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground"
              : "absolute bottom-3 left-3 rounded-lg bg-gold px-3 py-1.5 text-sm font-bold text-gold-foreground shadow-[var(--shadow-gold)]"
          }
        >
          {feeLabel(course)}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg leading-snug">
          <Link
            to="/course/$slug"
            params={{ slug: course.slug }}
            className="transition-colors hover:text-primary"
          >
            {course.title_bn}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {course.short_description_bn}
        </p>

        <ul className="mb-5 mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1">
            <Clock className="size-3.5 text-primary" /> {course.duration_bn}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1">
            <Layers className="size-3.5 text-primary" /> {Number(course.total_classes).toLocaleString("bn-BD")} ক্লাস
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1">
            <Signal className="size-3.5 text-primary" /> {course.level_bn}
          </li>
        </ul>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          {instructor ? (
            <div className="flex min-w-0 items-center gap-2.5">
              {instructor.photo_url ? (
                <StorageImage
                  src={instructor.photo_url}
                  alt={instructor.name_bn}
                  loading="lazy"
                  className="size-9 shrink-0 rounded-full object-cover ring-2 ring-gold/40"
                />
              ) : (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary ring-2 ring-gold/40">
                  {instructor.name_bn.slice(0, 1)}
                </span>
              )}
              <span className="truncate text-xs font-medium text-foreground">
                {instructor.name_bn}
              </span>
            </div>
          ) : (
            <span />
          )}
          <Button asChild size="sm" className="shrink-0 rounded-full px-4">
            <Link to="/apply/$slug" params={{ slug: course.slug }}>
              আবেদন <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}
