"use client";

import { useCallback } from "react";

export function useToast() {
  const toast = useCallback(
    ({
      title,
      description,
      variant = "default",
    }: {
      title: string;
      description?: string;
      variant?: "default" | "destructive";
    }) => {
      alert(`${variant.toUpperCase()}: ${title}${description ? " - " + description : ""}`);
    },
    []
  );

  return { toast };
}
