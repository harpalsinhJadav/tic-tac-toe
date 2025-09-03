"use client";

import { SetupProps } from "@/types/types";
import { useState } from "react";

export default function Setup({ onStart }: SetupProps) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [sign, setSign] = useState<"X" | "O" | "">("");
  const [size, setSize] = useState<number | "">("");
  const [errors, setErrors] = useState<string[]>([]);

  const validate = () => {
    const newErrors: string[] = [];

    // Player 1 name validation
    if (!p1.trim()) {
      newErrors.push("Player 1 name is required.");
    } else if (!/^[A-Za-z ]+$/.test(p1)) {
      newErrors.push("Player 1 name must contain only letters.");
    }

    // Player 2 name validation
    if (!p2.trim()) {
      newErrors.push("Player 2 name is required.");
    } else if (!/^[A-Za-z ]+$/.test(p2)) {
      newErrors.push("Player 2 name must contain only letters.");
    }

    // Sign validation
    if (!sign) {
      newErrors.push("Please select a sign for Player 1.");
    }

    // Board size validation
    if (size === "" || isNaN(Number(size))) {
      newErrors.push("Board size is required and must be a number.");
    } else if (Number(size) < 3) {
      newErrors.push("Board size must be at least 3.");
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  };

  const handleStart = () => {
    if (!validate()) return;
    onStart(p1.trim(), p2.trim(), sign as "X" | "O", Number(size));
  };

  return (
    <div className="flex flex-col gap-4 items-center max-w-sm mx-auto p-6 border rounded shadow">
      <h2 className="text-lg font-bold">Game Setup</h2>

      <input
        placeholder="Player 1 Name"
        value={p1}
        onChange={(e) => setP1(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <input
        placeholder="Player 2 Name"
        value={p2}
        onChange={(e) => setP2(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <select
        value={sign}
        onChange={(e) => setSign(e.target.value as "X" | "O")}
        className="border p-2 w-full rounded"
      >
        <option value="">Select Player 1 Sign</option>
        <option value="X">X</option>
        <option value="O">O</option>
      </select>

      <input
        type="number"
        min={3}
        placeholder="Board Size (e.g. 3)"
        value={size}
        onChange={(e) => setSize(e.target.value === "" ? "" : Number(e.target.value))}
        className="border p-2 w-full rounded"
      />

      {errors.length > 0 && (
        <ul className="text-red-500 text-sm list-disc pl-5">
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      )}

      <button
        onClick={handleStart}
        className="px-4 py-2 border border-black rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        Start Game
      </button>
    </div>
  );
}
