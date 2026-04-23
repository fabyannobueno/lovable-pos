import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import logoLight from "@/assets/logo-light.webp";
import logoDark from "@/assets/logo-dark.webp";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Light theme uses logo-light (designed for light backgrounds)
  // Dark theme uses logo-dark (designed for dark backgrounds)
  const src = mounted && resolvedTheme === "dark" ? logoDark : logoLight;

  return (
    <div className={cn("flex items-center", className)}>
      <img
        src={src}
        alt="PDVio"
        className={cn("h-9 w-auto select-none", !showText && "h-9")}
        draggable={false}
      />
    </div>
  );
}
