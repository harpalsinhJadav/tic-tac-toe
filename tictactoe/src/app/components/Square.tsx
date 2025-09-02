
export default function Square({value, onSquareClick}: {value:string; onSquareClick: any}) {

  return (
    <button
      className="w-20 h-20 border border-black flex items-center justify-center text-2xl"
    onClick={onSquareClick}>{value}</button>
    
);
}
