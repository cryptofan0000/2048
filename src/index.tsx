import React, { useState } from "react";
import { render } from "react-dom";

import Game from "./components/Game";
import Lobby from "./components/Lobby";

function App() {
  const [screenState, setScreenState] = useState(0)
  const handleScreen = (screenState) => {
    setScreenState(screenState)
  }

  return (
    <>
      {(screenState === 0 &&
        <Lobby onStartGame={handleScreen}/>
      )}
      {(screenState === 1 &&
        <Game onStartGame={handleScreen}/>
      )}
    </>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
