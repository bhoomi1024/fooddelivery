import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Maps from "./Maps";

function App() {
  const [originPosition, setOriginPosition] = useState(null);
  const [destinationPosition, setDestinationPosition] = useState(null);

  return (
    <div className="bg-gradient-to-r from-white via-yellow-100 to-white flex items-center justify-center h-screen">
      <div className="flex flex-col w-full max-w-6xl p-8 bg-white shadow-lg hover:shadow-xl transition-shadow border border-yellow-300 relative z-10">
        <div className="fixed top-0 w-full bg-white z-20 p-4 border-b border-yellow-300">
          <h2 className="text-yellow-500 font-bold mb-4">Origin</h2>
          <SearchBox
            label="Origin"
            setSelectPosition={setOriginPosition}
          />
          <h2 className="text-yellow-500 font-bold mb-4 mt-8">Destination</h2>
          <SearchBox
            label="Destination"
            setSelectPosition={setDestinationPosition}
          />
        </div>
        <div className="flex-grow mt-32">
          <Maps
            originPosition={originPosition}
            destinationPosition={destinationPosition}
            style={{ width: "100%" }} // Increase the width of the map
          />
        </div>
      </div>
    </div>
  );
}

export default App;
