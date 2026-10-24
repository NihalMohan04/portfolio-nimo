"use client";

import React from "react";
import { motion, type MotionProps } from "framer-motion";

import { cn } from "@/lib/utils";

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 },
  animate: { "--x": "-100%", scale: 1 },
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
};

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const ShinyButton = React.forwardRef<HTMLElement, ShinyButtonProps>(
  ({ children, className, href, target, rel, ...props }, ref) => {
    const Comp = (href ? motion.a : motion.button) as typeof motion.button;
    const linkProps = href ? { href, target, rel } : {};

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(
          "relative inline-flex cursor-pointer items-center rounded-lg border border-primary/30 px-4 py-1.5 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklch,var(--primary)_14%,transparent)_0%,transparent_60%)] hover:shadow-[0_0_20px_color-mix(in_oklch,var(--primary)_25%,transparent)]",
          className,
        )}
        {...animationProps}
        {...linkProps}
        {...props}
      >
        <span
          className="relative inline-flex items-center gap-1.5 text-xs font-light tracking-wide text-primary uppercase"
          style={{
            maskImage:
              "linear-gradient(-75deg, #000 calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #000 calc(var(--x) + 100%))",
            WebkitMaskImage:
              "linear-gradient(-75deg, #000 calc(var(--x) + 20%), transparent calc(var(--x) + 30%), #000 calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>
        <span
          style={{
            mask: "linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)",
            WebkitMask:
              "linear-gradient(#000, #000) content-box exclude, linear-gradient(#000, #000)",
            backgroundImage:
              "linear-gradient(-75deg, color-mix(in oklch, var(--primary) 10%, transparent) calc(var(--x) + 20%), color-mix(in oklch, var(--primary) 70%, transparent) calc(var(--x) + 25%), color-mix(in oklch, var(--primary) 10%, transparent) calc(var(--x) + 100%))",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        />
      </Comp>
    );
  },
);

ShinyButton.displayName = "ShinyButton";
