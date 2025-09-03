"use client";

export default function Rules() {
  return (
    <div className="mt-6 text-sm text-gray-700 max-w-lg">
      <h2 className="font-bold mb-2">Game Rules:</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Choose board size at the start (e.g. 3×3, 5×5).</li>
        <li>Players take turns placing their marks.</li>
        <li>To win, align your marks in a row, column, or diagonal equal to the board size.</li>
        <li>
          You can only keep <strong>board size</strong> active marks at once —
          when placing the next, the oldest disappears.
        </li>
        <li>If you align before your oldest disappears, you win immediately.</li>
      </ul>
    </div>
  );
}
