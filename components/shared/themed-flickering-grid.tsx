"use client";

import { useSyncExternalStore } from "react";

import { FlickeringGrid } from "@/components/ui/flickering-grid";

const FALLBACK = "oklch(0.92 0.24 128)";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function readPrimary() {
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--primary")
      .trim() || FALLBACK
  );
}

type Props = Omit<React.ComponentProps<typeof FlickeringGrid>, "color">;

export function ThemedFlickeringGrid(props: Props) {
  const color = useSyncExternalStore(subscribe, readPrimary, () => FALLBACK);
  return <FlickeringGrid color={color} {...props} />;
}
