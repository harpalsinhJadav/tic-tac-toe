import Image from "next/image";
import Square from "./components/Square";
import Board from "./components/Board";

export default function Home() {
  return (
    <div className="items-center justify-items-center align-items-center">
      <main className="items-center">
        <Board />
        
      </main>
    </div>
  );
}
