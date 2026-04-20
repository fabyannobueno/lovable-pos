import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, showText = true }: { className?: string; showText?: boolean }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
        <Zap className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-base font-bold tracking-tight">Caixa</span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">PDV</span>
        </div>
      )}
    </div>
  );
}