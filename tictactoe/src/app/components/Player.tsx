"use client";

import { PlayerProps } from "@/types/types";

export default function Player({ name, sign, wins, losses, isTurn }: PlayerProps) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-bold">{name} ({sign})</span>
      <span>Wins: {wins} | Losses: {losses}</span>
      {isTurn && <span className="text-blue-500">⬆ Your Turn</span>}
    </div>
  );
}
