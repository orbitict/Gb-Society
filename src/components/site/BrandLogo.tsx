import logoUrl from "@/assets/green-bangla-logo.png";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <img
      src={logoUrl}
      alt="Green Bangla Society logo"
      width={64}
      height={64}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      className={cn("shrink-0 object-contain", className)}
    />
  );
}