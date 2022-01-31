import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function Box() {
  const [clicked, setClicked] = useState(false);

  return (
    <div>
      {clicked ? (
        <button
          className="box-clicked"
          onClick={() => setClicked(!clicked)}
        ></button>
      ) : (
        <button
          className="box-unclicked"
          onClick={() => setClicked(!clicked)}
        ></button>
      )}
    </div>
  );
}

function Row() {
  return (
    <div className="row">
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>8 Red Squares</h2>
        <p>
          Fit 8 Red Squares below so that no row, column, or diagonal have more
          than one red square.
        </p>
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
        <Row />
      </header>
    </div>
  );
}

export default App;
