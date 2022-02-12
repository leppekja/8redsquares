import "./App.css";
import { useEffect, useState } from "react";

function Box(props) {
  return (
    <button
      className={props.value}
      key={props.id}
      onClick={() =>
        props.handleClick((prev) => {
          let array_to_update = [...prev];
          if (props.value === "box-unclicked") {
            array_to_update[props.id] = "box-clicked";
          } else {
            array_to_update[props.id] = "box-unclicked";
          }
          return array_to_update;
        })
      }
    ></button>
  );
}

function Board(props) {
  const squaresList = props.squares.map((value, index) => {
    return (
      <Box
        key={index}
        id={index}
        value={value}
        handleClick={props.setSquares}
      />
    );
  });

  return <div className="board">{squaresList}</div>;
}

function BoardSize(props) {
  const [current, setCurrent] = useState(props.boardSize);

  const sizes = [...Array(5).keys()];

  const boardSizes = sizes.map((n) => {
    if (n + 4 === current) {
      return (
        <button key={n} className="boardSizeChangeBoxCurrent">
          {n + 4}
        </button>
      );
    } else {
      return (
        <button key={n} className="boardSizeChangeBox">
          {n + 4}
        </button>
      );
    }
  });
  return <div className="boardSizeList">{boardSizes}</div>;
}

function App() {
  const [boardSize, setBoardSize] = useState(8);
  const [squares, setSquares] = useState(Array(64).fill("box-unclicked"));
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    setSolved(checkSquares(squares));
  }, squares);

  return (
    <div>
      <div className="header">
        <h2>8 Red Squares</h2>
        <div className="directionsHeader">
          fit red squares below so that no row, column, or diagonal has more
          than one red square.
        </div>
        <div className="boardSizeHeader">current board size.</div>
      </div>
      <div className="playArea">
        <BoardSize boardSize={boardSize} setCurrent={setBoardSize} />
        <button className="resetBoard" onClick={() => resetBoard(setSquares)}>
          reset board.
        </button>
        <Board squares={squares} setSquares={setSquares} />
        {solved ? <div>Nice Work!</div> : <div></div>}
      </div>
    </div>
  );
}

function resetBoard(setSquares) {
  setSquares(Array(64).fill("box-unclicked"));
}

function checkSquares(squaresArray) {
  // https://course.ccs.neu.edu/cs5010sp15/files/Lesson%209.3%208%20Queens.pdf
  let selectedSquares = [];

  // Iterate through the board and grab the index of the selected squares
  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i] === "box-clicked") {
      selectedSquares.push(i);
    }
  }

  if (selectedSquares.length === 8) {
    let rows = selectedSquares.map((n) => Math.floor(n / 8));
    let columns = selectedSquares.map((n) => n % 8);
    let nwSeDiag = rows.map((n, i) => n + columns[i]);
    let neSwDiag = rows.map((n, i) => n - columns[i]);

    if (
      Array.from(new Set(rows)).length !== rows.length ||
      Array.from(new Set(columns)).length !== columns.length ||
      Array.from(new Set(nwSeDiag)).length !== nwSeDiag.length ||
      Array.from(new Set(neSwDiag)).length !== neSwDiag.length
    ) {
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
}

export default App;
