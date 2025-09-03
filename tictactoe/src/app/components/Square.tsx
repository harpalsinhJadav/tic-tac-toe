"use client";

import { SquareProps } from "@/types/types";

export default function Square({ value, onClick }: SquareProps) {
  return (
    <button
      onClick={onClick}
      className="aspect-square border border-black flex items-center justify-center text-xl"
    >
      {value}
    </button>
  );
}
