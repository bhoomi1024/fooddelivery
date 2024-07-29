import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";

function App() {
  const [originPosition, setOriginPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
      }}
    >
      <div style={{ width: "50vw", height: "100%" }}>
        <Maps
          originPosition={originPosition}
          destinationPosition={destinationPosition}
        />
      </div>
      <div style={{ width: "50vw", padding: "20px" }}>
        <h2>Origin</h2>
        <SearchBox
          label="Origin"
          setSelectPosition={setOriginPosition}
        />
        <h2>Destination</h2>
        <SearchBox
          label="Destination"
          setSelectPosition={setDestinationPosition}
        />
      </div>
    </div>
  );
}

export default App;
