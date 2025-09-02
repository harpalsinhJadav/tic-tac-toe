
export default function Square({value, onSquareClick}: {value:string| null; onSquareClick: any}) {

  return (
    <button
      className="aspect-square border border-black flex items-center justify-center text-2xl"
    onClick={onSquareClick}>{value}</button>
    
);
}
