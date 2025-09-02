"use client";

import { useState } from "react";
import Square from "./Square";

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moves, setMoves] = useState<{ X: number[]; O: number[] }>({ X: [], O: [] });

  function handleClick(i: number) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const player = xIsNext ? "X" : "O";
    const nextSquares = squares.slice();
    const nextMoves = { ...moves };

    // Add new move
    nextSquares[i] = player;
    nextMoves[player] = [...nextMoves[player], i];

    // Check if this move wins
    if (calculateWinner(nextSquares) === player) {
      setSquares(nextSquares);
      setMoves(nextMoves);
      return; // keep all moves, winner found
    }

    // If player has more than 3 moves, remove oldest
    if (nextMoves[player].length > 3) {
      const removedIndex = nextMoves[player][0]; // oldest move
      nextSquares[removedIndex] = null; // remove from board
      nextMoves[player] = nextMoves[player].slice(1); // update moves list
    }

    setSquares(nextSquares);
    setMoves(nextMoves);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares: (string | null)[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="mb-2 font-bold text-lg">{status}</div>

      <div className="grid grid-cols-3 w-60">
        {squares.map((val, idx) => (
          <Square key={idx} value={val} onSquareClick={() => handleClick(idx)} />
        ))}
      </div>

      {/* Rules Section */}
      <div className="mt-6 p-4 border border-gray-400 rounded-lg w-72 bg-gray-50">
        <h2 className="font-semibold text-center mb-2">Game Rules</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>Players take turns placing <strong>X</strong> and <strong>O</strong>.</li>
          <li>The first player to align 3 marks in a row wins.</li>
          <li>Each player can only have <strong>3 marks</strong> on the board.</li>
          <li>If a 4th mark is placed without winning, the oldest mark is removed.</li>
          <li>If the 3rd mark creates a winning line, the player wins immediately.</li>
        </ul>
      </div>
    </div>
  );
}
