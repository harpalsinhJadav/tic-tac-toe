"use client";

import { BoardProps } from "@/types/types";
import Square from "./Square";



export default function Board({ squares, size, onSquareClick }: BoardProps) {
  return (
    <div
      className="grid gap-0.5 border border-black"
      style={{
        gridTemplateColumns: `repeat(${size}, 1fr)`,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      {squares.map((val, idx) => (
        <Square key={idx} value={val} onClick={() => onSquareClick(idx)} />
      ))}
    </div>
  );
}
