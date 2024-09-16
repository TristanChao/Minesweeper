import { useEffect, useState } from 'react';
import { BiSolidBomb } from 'react-icons/bi';

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

      let numAdjBombs = 0;

      // above
      if (bombArray.includes(i - 21)) numAdjBombs++;
      if (bombArray.includes(i - 20)) numAdjBombs++;
      if (bombArray.includes(i - 19)) numAdjBombs++;

      // next
      if (bombArray.includes(i - 1)) numAdjBombs++;
      if (bombArray.includes(i + 1)) numAdjBombs++;

      // below
      if (bombArray.includes(i + 19)) numAdjBombs++;
      if (bombArray.includes(i + 20)) numAdjBombs++;
      if (bombArray.includes(i + 21)) numAdjBombs++;

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
  // const [isClicked, setIsClicked] = useState(false);

  let numLabel = '';
  let clickedColor = '';
  if (tileNum > 0) {
    numLabel = tileNum.toString();
  } else if (!hasBomb) {
    clickedColor = 'lightgrey';
  }

  const content = hasBomb ? <BiSolidBomb /> : numLabel;

  return <div className={`tile ${clickedColor}`}>{content}</div>;
  // return (
  //   <div
  //     className={`tile ${isClicked && clickedColor}`}
  //     onClick={() => setIsClicked(true)}>
  //     {isClicked && content}
  //   </div>
  // );
}
