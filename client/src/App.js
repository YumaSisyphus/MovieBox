import { ThemeProvider } from "@mui/material";
import WelcomeScreen from "./components/templates/WelcomeScreen/WelcomeScreen";
import { theme } from "./utils/theme";
import Header from "./components/header/Header";
import { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <WelcomeScreen />
      </ThemeProvider>
      {/* {(typeof backendData.users === 'undefined') ? (
        <p>Loading...</p>
      ) : (
        backendData.users.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )} */}
    </div>
  );
}

export default App;
