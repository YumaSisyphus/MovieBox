import { ThemeProvider } from "@mui/material";
import WelcomeScreen from "./components/templates/WelcomeScreen/WelcomeScreen";
import { theme } from "./utils/theme";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <WelcomeScreen />
      </ThemeProvider>
    </div>
  );
}

export default App;
