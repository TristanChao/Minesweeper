import { useEffect, useState } from 'react';
import { BiSolidBomb } from 'react-icons/bi';

function checkAdj(array: number[], i: number): number[] {
  const indexes = [];

  // above
  if (array.includes(i - 21)) indexes.push(i - 21);
  if (array.includes(i - 20)) indexes.push(i - 20);
  if (array.includes(i - 19)) indexes.push(i - 19);

  // next
  if (array.includes(i - 1)) indexes.push(i - 1);
  if (array.includes(i + 1)) indexes.push(i + 1);

  // below
  if (array.includes(i + 19)) indexes.push(i + 19);
  if (array.includes(i + 20)) indexes.push(i + 20);
  if (array.includes(i + 21)) indexes.push(i + 21);

  return indexes;
}

export function GameBoard() {
  const [board, setBoard] = useState<JSX.Element[]>();

  // this effect will generate an array of numbers that represents the tiles that have bombs
  // it will then create a grid of tiles
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

    const board: JSX.Element[] = [];
    let row: JSX.Element[] = [];

    const blankTiles: number[] = [];

    for (let i = 0; i < 400; i++) {
      if (i > 0 && i % 20 === 0) {
        board.push(
          <div key={i} className="row">
            {row}
          </div>,
        );
        row = [];
      }

      const numAdjBombs = checkAdj(bombArray, i).length;

      if (numAdjBombs === 0 && !bombArray.includes(i)) {
        blankTiles.push(i);
      }

      row.push(
        <Tile key={i} hasBomb={bombArray.includes(i)} tileNum={numAdjBombs} />,
      );
    }

    setBoard(board);
  }, []);

  return <div className="board">{board}</div>;
}

type TileProps = {
  hasBomb: boolean;
  tileNum: number;
};

function Tile({ hasBomb, tileNum }: TileProps) {
  const [isClicked, setIsClicked] = useState(false);

  let numLabel = '';
  let clickedColor = '';
  if (tileNum > 0) {
    numLabel = tileNum.toString();
  } else if (!hasBomb) {
    clickedColor = 'lightgrey';
  }

  const content = hasBomb ? <BiSolidBomb /> : numLabel;

  // return (
  //   <div
  //     onClick={() => setIsClicked(onClick(index))}
  //     className={`tile ${clickedColor}`}>
  //     {content}
  //   </div>
  // );
  return (
    <div
      className={`tile ${isClicked && clickedColor}`}
      onClick={() => {
        setIsClicked(true);
      }}>
      {isClicked && content}
    </div>
  );
}
