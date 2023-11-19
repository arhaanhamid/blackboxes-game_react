import React, { useState, useEffect } from "react";
import BoxesData from "./BoxesData";
import Box from "./Box";
import Confetti from "react-confetti";

export default function App() {
  const [arrBoxes, setArrBoxes] = useState(BoxesData);
  const [win, setWin] = useState(false);

  useEffect(() => {
    arrBoxes.flat().every((box) => box.switch) ? setWin(true) : setWin(false);
  }, [arrBoxes]);

  function toggle(r, c) {
    setArrBoxes((prevArrBoxes) => {
      return prevArrBoxes.map((boxes) => {
        const arrRow = [];
        for (let i = 0; i < 3; i++) {
          boxes[i].id === prevArrBoxes[r][c].id ||
          (r + 1 <= 2 && boxes[i].id === prevArrBoxes[r + 1][c].id) ||
          (r - 1 >= 0 && boxes[i].id === prevArrBoxes[r - 1][c].id) ||
          (c + 1 <= 2 && boxes[i].id === prevArrBoxes[r][c + 1].id) ||
          (c - 1 >= 0 && boxes[i].id === prevArrBoxes[r][c - 1].id)
            ? arrRow.push({ ...boxes[i], switch: !boxes[i].switch })
            : arrRow.push({ ...boxes[i] });
        }
        return arrRow;
      });
    });
  }

  const boxElements = arrBoxes.map((boxes, index) => {
    const arrRow = [];
    for (let i = 0; i < 3; i++) {
      arrRow[i] = (
        <Box
          key={boxes[i].id}
          switch={boxes[i].switch}
          toggle={() => toggle(index, i)}
        />
      );
    }
    return arrRow;
  });

  function Randomize() {
    setArrBoxes((prevArrBoxes) => {
      return prevArrBoxes.map((boxes) => {
        const arrRow = [];
        for (let i = 0; i < 3; i++) {
          arrRow.push({
            ...boxes[i],
            switch: Math.random() > 0.5 ? true : false,
          });
        }
        return arrRow;
      });
    });
  }
  function Restart() {
    setArrBoxes((prevArrBoxes) => {
      return prevArrBoxes.map((boxes) => {
        const arrRow = [];
        for (let i = 0; i < 3; i++) {
          arrRow.push({ ...boxes[i], switch: false });
        }
        return arrRow;
      });
    });
  }

  return (
    <main>
      {win && <Confetti />}
      <div className="boxes">{boxElements}</div>
      <button type="button" className="but-refresh" onClick={Randomize}>
        Refresh
      </button>
      <button type="button" className="but-restart" onClick={Restart}>
        Restart
      </button>
    </main>
  );
}
