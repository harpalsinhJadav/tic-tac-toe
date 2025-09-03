"use client";

import { ControlsProps } from "@/types/types";

export default function Controls({ onReset, onNewSession }: ControlsProps) {
  return (
    <div className="flex gap-4">
      <button onClick={onReset} className="px-4 py-2 border border-black rounded">
        Reset Game
      </button>
      <button onClick={onNewSession} className="px-4 py-2 border border-black rounded">
        New Session
      </button>
    </div>
  );
}
