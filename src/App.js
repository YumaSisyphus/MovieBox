import { ThemeProvider } from "@mui/material";
import WelcomeScreen from "./components/templates/WelcomeScreen";
import { theme } from "./utils/theme";

function App() {
  return (
    <div className="App">
    <ThemeProvider theme={theme}>
      <WelcomeScreen/>
    </ThemeProvider>
    </div>
  );
}

export default App;
