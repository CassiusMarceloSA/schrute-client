import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "text-sm font-medium rounded-sm text-center px-4 py-1 w-24",
  {
    variants: {
      variant: {
        default: "bg-neutral-800 text-neutral-300",
        amber: "bg-amber-500 text-amber-800",
        blue: "bg-blue-500 text-blue-800",
        cyan: "bg-cyan-500 text-cyan-800",
        emerald: "bg-emerald-500 text-emerald-800",
        fuchsia: "bg-fuchsia-500 text-fuchsia-800",
        gray: "bg-gray-500 text-gray-800",
        green: "bg-green-500 text-green-800",
        indigo: "bg-indigo-500 text-indigo-800",
        lime: "bg-lime-500 text-lime-800",
        neutral: "bg-neutral-500 text-neutral-800",
        orange: "bg-orange-500 text-orange-800",
        pink: "bg-pink-500 text-pink-800",
        purple: "bg-purple-500 text-purple-800",
        red: "bg-red-500 text-red-800",
        rose: "bg-rose-500 text-rose-800",
        sky: "bg-sky-500 text-sky-800",
        slate: "bg-slate-500 text-slate-800",
        stone: "bg-stone-500 text-stone-800",
        teal: "bg-teal-500 text-teal-800",
        violet: "bg-violet-500 text-violet-800",
        yellow: "bg-yellow-500 text-yellow-800",
        zinc: "bg-zinc-500 text-zinc-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}

function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {children}
    </span>
  );
}

export default Badge;
export { badgeVariants };
