import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "ghost";
};

export function Button({ children, className = "", variant = "solid", ...props }: ButtonProps) {
  const variants = {
    solid: "bg-brass text-ink hover:bg-chalk",
    ghost: "border border-chalk/15 bg-chalk/5 text-chalk hover:border-brass/70 hover:text-brass"
  };

  return (
    <button
      className={`focus-ring inline-flex h-11 items-center justify-center gap-2 rounded-full px-4 text-sm font-bold transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
