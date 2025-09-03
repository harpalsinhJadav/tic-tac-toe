
export type PlayerProps = {
  name: string;
  sign: "X" | "O";
  wins: number;
  losses: number;
  isTurn: boolean;
};

export type SquareProps = {
  value: string | null;
  onClick: () => void;
};

export type BoardProps = {
  squares: (string | null)[];
  size: number;
  onSquareClick: (i: number) => void;
};

export type ControlsProps = {
  onReset: () => void;
  onNewSession: () => void;
};

export type PlayerType = {
  name: string;
  sign: "X" | "O";
  wins: number;
  losses: number;
};

export type SetupProps = {
  onStart: (p1: string, p2: string, sign: "X" | "O", size: number) => void;
};