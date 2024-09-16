import { useEffect, useState } from 'react';

export function GameBoard() {
  const [board, setBoard] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const boardSize = 20;
    let numBombs = Math.floor(boardSize * 4.25);

    const bombArray: number[] = [];
    while (numBombs > 0) {
      const randTile = Math.floor(Math.random() * boardSize * boardSize);
      if (!bombArray.includes(randTile)) {
        bombArray.push(randTile);
        numBombs--;
      }
    }
    bombArray.sort((a, b) => a - b);
    console.log(bombArray);

    const board: JSX.Element[] = [];
    let row: JSX.Element[] = [];
    for (let i = 0; i < 400; i++) {
      if (i > 0 && i % 20 === 0) {
        board.push(
          <div key={i} className="row">
            {row}
          </div>,
        );
        row = [];
      }

      row.push(<Tile key={i} hasBomb={bombArray.includes(i)} />);
    }

    setBoard(board);
  }, []);

  return <div className="board">{board}</div>;
}

type TileProps = {
  hasBomb: boolean;
};

function Tile({ hasBomb }: TileProps) {
  return <div className="tile">{hasBomb && '|||'}</div>;
}
