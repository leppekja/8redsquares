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

  return <div className={"board" + props.boardSize}>{squaresList}</div>;
}

function BoardSize(props) {
  const [current, setCurrent] = useState(props.boardSize);

  useEffect(() => {
    setCurrent(props.boardSize);
  }, [props]);

  let sizes;
  // Add secret levels if primary levels are completed
  if (props.levelsRemaining.length <= 2) {
    sizes = [...Array(7).keys()];
  } else {
    sizes = [...Array(5).keys()];
  }

  const boardSizes = sizes.map((n) => {
    if (n + 4 === current) {
      return (
        <button key={n} className="boardSizeChangeBoxCurrent">
          {n + 4}
        </button>
      );
    } else {
      return (
        <button
          key={n}
          onClick={() => {
            props.setBoardSize(n + 4);
            setCurrent(n + 4);
          }}
          className={
            props.levelsRemaining.indexOf(n + 4) >= 0
              ? "boardSizeChangeBox"
              : "boardSizeChangeBoxSolved"
          }
        >
          {n + 4}
        </button>
      );
    }
  });
  return <div className="boardSizeList">{boardSizes}</div>;
}

function App() {
  const [boardSize, setBoardSize] = useState(4);
  const [squares, setSquares] = useState(
    Array(boardSize * boardSize).fill("box-unclicked")
  );
  const [solved, setSolved] = useState(false);
  const [levelsRemaining, setLevelsRemaining] = useState([
    4, 5, 6, 7, 8, 9, 10,
  ]);

  useEffect(() => {
    let solutionStatus = checkSquares(squares, boardSize);
    setSolved(solutionStatus);
    if (solutionStatus) {
      setSquares(Array(boardSize * boardSize).fill("box-clicked"));

      if (levelsRemaining.indexOf(boardSize) >= 0) {
        setLevelsRemaining(
          levelsRemaining.filter((level) => level !== boardSize)
        );
      }

      setTimeout(
        () => setSquares(Array(boardSize * boardSize).fill("box-unclicked")),
        500
      );

      // if (boardSize < 8) {
      //   setTimeout(() => {
      //     setBoardSize(boardSize + 1);
      //   }, 1000);
      // }

      setTimeout(() => {
        if (
          levelsRemaining.length > 1 &&
          levelsRemaining.indexOf(boardSize) === 0
        ) {
          setBoardSize(levelsRemaining[1]);
        } else if (
          levelsRemaining.length > 1 &&
          levelsRemaining.indexOf(boardSize) > 0
        ) {
          setBoardSize(levelsRemaining[0]);
        }
      }, 1000);
    }
  }, [squares]);

  useEffect(() => {
    setSquares(Array(boardSize * boardSize).fill("box-unclicked"));
  }, [boardSize]);

  return (
    <div>
      <div className="header">
        <h2>8 Red Squares</h2>
        <div className="directionsHeader">
          {levelsRemaining.length > 2
            ? "Fit red squares below so that no row, column, or diagonal has more than one red square."
            : "Congratulations! Try the bonus levels..."}
        </div>
      </div>
      <div className="playArea">
        <BoardSize
          boardSize={boardSize}
          setBoardSize={setBoardSize}
          levelsRemaining={levelsRemaining}
        />
        <Board
          boardSize={boardSize}
          squares={squares}
          setSquares={setSquares}
        />
        <button
          className="resetBoard"
          onClick={() => resetBoard(boardSize, setSquares)}
        >
          reset board.
        </button>
        {solved ? <div className="solvedText">Nice Work!</div> : <div></div>}
      </div>
    </div>
  );
}

function resetBoard(boardSize, setSquares) {
  setSquares(Array(boardSize * boardSize).fill("box-unclicked"));
}

function checkSquares(squaresArray, boardSize) {
  // https://course.ccs.neu.edu/cs5010sp15/files/Lesson%209.3%208%20Queens.pdf
  let selectedSquares = [];
  // Iterate through the board and grab the index of the selected squares
  for (let i = 0; i < squaresArray.length; i++) {
    if (squaresArray[i] === "box-clicked") {
      selectedSquares.push(i);
    }
  }

  if (selectedSquares.length === boardSize) {
    let rows = selectedSquares.map((n) => Math.floor(n / boardSize));
    let columns = selectedSquares.map((n) => n % boardSize);
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
