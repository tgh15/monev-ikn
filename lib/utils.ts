import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatCurrency = (value: number) => {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";

  const abs = Math.abs(value);

  // Gunakan compact hanya di client, hindari di server (SSR)
  if (abs >= 1_000_000) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      notation: 'compact',
    }).format(value);
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
};

export const getPercentage = (used: number, total: number) => {
  return ((used / total) * 100).toFixed(1);
};
