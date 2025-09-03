"use client";

import { useState } from "react";
import Player from "./components/Player";
import Controls from "./components/Controls";
import Board from "./components/Board";
import Rules from "./components/Rules";
import { PlayerType } from "@/types/types";
import Setup from "./components/SetUp";

export default function Game() {
  const [player1, setPlayer1] = useState<PlayerType | null>(null);
  const [player2, setPlayer2] = useState<PlayerType | null>(null);
  const [boardSize, setBoardSize] = useState<number | null>(null);
  const [squares, setSquares] = useState<(string)[]>([]);
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [openSetUp, setOpenSetUp] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  function getDetails(p1: string, p2:string, sign: "X" | "O", size: number ) {
    const playerOne: PlayerType = { name: p1, sign, wins: 0, losses: 0 };
    const playerTwo: PlayerType = { name: p2, sign: sign === "X" ? "O" : "X", wins: 0, losses: 0 };

    setPlayer1(playerOne);
    setPlayer2(playerTwo);
    setBoardSize(size);
    setSquares(Array(size * size).fill(null));
    setXIsNext(true);
    setWinner(null);
    setOpenSetUp(false)
  }

  function newSession() {
    setOpenSetUp(true)
  }

  function resetGame() {
    if (!boardSize) return;
    setSquares(Array(boardSize * boardSize).fill(null));
    setXIsNext(true);
    setWinner(null);
  }

  function handleClick(i: number) {
    if (winner || squares[i]) return;

    const currentPlayer = xIsNext ? player1! : player2!;
    const nextSquares = squares.slice();
    nextSquares[i] = currentPlayer.sign;

    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    const win = calculateWinner(nextSquares, boardSize!);
    if (win) {
      setWinner(currentPlayer.name);
      if (currentPlayer.sign === player1!.sign) {
        setPlayer1({ ...player1!, wins: player1!.wins + 1 });
        setPlayer2({ ...player2!, losses: player2!.losses + 1 });
      } else {
        setPlayer2({ ...player2!, wins: player2!.wins + 1 });
        setPlayer1({ ...player1!, losses: player1!.losses + 1 });
      }
    }
  }

  function calculateWinner(squares: string[], size: number) {
    const lines: number[][] = [];

    // Rows
    for (let r = 0; r < size; r++) {
      lines.push([...Array(size).keys()].map((c) => r * size + c));
    }
    // Cols
    for (let c = 0; c < size; c++) {
      lines.push([...Array(size).keys()].map((r) => r * size + c));
    }
    // Diagonal TL-BR
    lines.push([...Array(size).keys()].map((i) => i * size + i));
    // Diagonal TR-BL
    lines.push([...Array(size).keys()].map((i) => i * size + (size - 1 - i)));

    for (let line of lines) {
      const first = squares[line[0]];
      if (first && line.every((idx) => squares[idx] === first)) {
        return first;
      }
    }
    return null;
  }

  if (!player1 || !player2 || !boardSize) {
    if(openSetUp){
      return (
<div className="flex justify-center items-center h-screen">
        <Setup onStart={getDetails} />
        </div>
      )
    }
      return (
        <div className="flex justify-center items-center h-screen">
          <button
            onClick={newSession}
            className="px-4 py-2 border border-black rounded"
          >
            Start New Session
          </button>
        </div>
      );
    
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <Controls onReset={resetGame} onNewSession={newSession} />

      {/* Players Info */}
      <div className="flex justify-between w-full max-w-md">
        <Player
          name={player1.name}
          sign={player1.sign}
          wins={player1.wins}
          losses={player1.losses}
          isTurn={xIsNext && !winner}
        />
        <Player
          name={player2.name}
          sign={player2.sign}
          wins={player2.wins}
          losses={player2.losses}
          isTurn={!xIsNext && !winner}
        />
      </div>

      {/* Board */}
      <Board squares={squares} size={boardSize} onSquareClick={handleClick} />

      {/* Status */}
      <div className="text-lg font-semibold">
        {winner
          ? `🎉 Winner: ${winner}`
          : `Next Player: ${xIsNext ? player1.name : player2.name}`}
      </div>

      {/* Rules */}
      <Rules />
    </div>
  );
}
