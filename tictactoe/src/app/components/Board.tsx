"use client";

import { useEffect, useState } from "react";
import Square from "./Square";

export default function Board() {
  const [boardSize, setBoardSize] = useState<number>(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState<(string | null)[]>([]);
  const [moves, setMoves] = useState<{ X: number[]; O: number[] }>({
    X: [],
    O: [],
  });
  const [isGameOver, setGameOver] = useState<boolean>(false);

  // Start game with chosen size
  function startGame(size: number) {
    setBoardSize(size);
    setSquares(Array(size * size).fill(null));
    setMoves({ X: [], O: [] });
    setXIsNext(true);
  }

  function handleClick(i: number) {
    if (isGameOver || squares[i]) return;

    const player = xIsNext ? "X" : "O";
    const nextSquares = squares.slice();
    const nextMoves = { ...moves };

    nextSquares[i] = player;
    nextMoves[player] = [...nextMoves[player], i];

    // Check winner
    const result = calculateWinner(nextSquares, boardSize!);
    if (result.winner === player) {
      setSquares(nextSquares);
      setMoves(nextMoves);
      setGameOver(true);
      return;
    }

    // Enforce max = boardSize
    if (nextMoves[player].length > boardSize!) {
      const removedIndex = nextMoves[player][0];
      nextSquares[removedIndex] = null;
      nextMoves[player] = nextMoves[player].slice(1);
    }

    setSquares(nextSquares);
    setMoves(nextMoves);
    setXIsNext(!xIsNext);
  }

  function calculateWinner(squares: (string | null)[], size: number) {
    const checkLine = (indices: number[]) => {
      const first = squares[indices[0]];
      if (!first) return null;
      return indices.every((i) => squares[i] === first) ? first : null;
    };

    // Horizontal & vertical
    for (let r = 0; r < size; r++) {
      const row = Array.from({ length: size }, (_, c) => r * size + c);
      const col = Array.from({ length: size }, (_, c) => c * size + r);
      if (checkLine(row)) return { winner: squares[row[0]], line: row };
      if (checkLine(col)) return { winner: squares[col[0]], line: col };
    }

    // Diagonals
    const diag1 = Array.from({ length: size }, (_, i) => i * size + i);
    const diag2 = Array.from({ length: size }, (_, i) => i * size + (size - i - 1));
    if (checkLine(diag1)) return { winner: squares[diag1[0]], line: diag1 };
    if (checkLine(diag2)) return { winner: squares[diag2[0]], line: diag2 };

    return { winner: null, line: [] };
  }


  const winner = calculateWinner(squares, boardSize);
  let status;
  if (winner.winner) {
    status = "Winner: " + winner.winner;

  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  useEffect(() => {
    const size = prompt("Set Board Size ? Add any number (smaller then 15):");
    if(size &&parseInt(size) && parseInt(size) > 15){
      alert("please select smaller size")
    }
    size && startGame(parseInt(size));
  }, []);

  if (!boardSize) return <div className="text-center">Loading...</div>;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="mb-2 font-bold text-lg">{status}</div>

      <div className="flex flex-row items-center gap-6 ">
        <h1 >Player 1</h1>

      
      {boardSize && (
        <div
          className="relative grid"
          style={{
            gridTemplateColumns: `repeat(${boardSize}, minmax(0, 1fr))`,
            width: `${boardSize * 4}rem`,
          }}
        >
          {squares.map((val, idx) => (
            <Square
              key={idx}
              value={val}
              onSquareClick={() => handleClick(idx)}
            />
          ))}
        </div>
      )}

      <h1 >Player 2</h1>

      </div>

      {/* Rules Section */}
      <div className="mt-6 p-4 border border-gray-400 rounded-lg bg-gray-50">
        <h2 className="font-semibold text-center mb-2">Game Rules</h2>
        <ul className="list-disc list-inside text-sm space-y-1">
          <li>
            At the start, you’ll be asked to choose the board size (e.g., 3 for 3×3, 5 for 5×5).
          </li>
          <li>
            Players take turns placing <strong>X</strong> and <strong>O</strong>
          </li>
          <li>To win, a player must place their marks in a straight line (horizontal, vertical, or diagonal) equal to the chosen board size.</li>
          <li>
            Example: On a 3×3 board → 3 in a row needed.
          </li>
          <li>
            Example: On a 5×5 board → 5 in a row needed.
          </li>
          <li>
            A player can only have <strong>board size − 1</strong> active marks at a time: 
          </li>
          <li>
            Example: On a 3×3 board → max 3 marks. Adding a 4th will remove the oldest.
          </li>
          <li>
            Example: On a 5×5 board → max 5 marks. Adding a 6th will remove the oldest.
          </li>
          <li>
            If the required number of marks align before the oldest one disappears, that player wins immediately.
          </li>
          <li>
            The game continues until a winner is declared.
          </li>
        </ul>
      </div>
    </div>
  );
}
