import Image from "next/image";
import { assetPath } from "@/lib/assets";

type LogoProps = {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md" | "lg" | "hero";
};

const sizes = {
  sm: { width: 140, height: 46 },
  md: { width: 180, height: 60 },
  lg: { width: 240, height: 80 },
  hero: { width: 360, height: 120 },
};

export function Logo({ className = "", priority = false, size = "md" }: LogoProps) {
  const dim = sizes[size];
  return (
    <Image
      src={assetPath("/brand/logo.png")}
      alt="Brand Professor"
      width={dim.width}
      height={dim.height}
      priority={priority}
      className={`h-auto w-auto object-contain ${className}`}
    />
  );
}
