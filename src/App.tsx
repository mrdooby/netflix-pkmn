import React, { useState } from "react";
import Row from "./Row";

function App() {
  const [nationalIds, setNationalIds] = useState([1, 2, 3, 4, 5]);

  const handleNext = () => {
    const temp: number[] = [];
    nationalIds.forEach((id) => {
      temp.push(id + 5);
    });
    console.log(temp);
    setNationalIds(temp);
  };
  return (
    <div>
      <button onClick={handleNext}>Next</button>
      {nationalIds.map((natId: number) => {
        return <Row natId={natId} />;
      })}
    </div>
  );
}

export default App;
