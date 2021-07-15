import React, { useState } from "react";

import Dapp from "./Dapp";
import { Login } from "./Pages/Logging";
import { ThemeToggler } from "./components";

export const DappContext = React.createContext(null);

function App() {
  const [isLogged, setIsLogged] = useState("false");

  return (
    <DappContext.Provider>
      {isLogged === true ? (
        <Dapp />
      ) : (
        <>
          <ThemeToggler />
          <Login setIsLogged={setIsLogged} />
        </>
      )}
    </DappContext.Provider>
  );
}

export default App;
