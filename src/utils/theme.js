import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#264653"
        },
        secondary: {
            main: "#2A9D8F"
        },
        white: {
            main: "#ffffff"
        },
        black: {
            main: "#000000"
        },
        welcomenav: {
            main: "#2646534D"
        }
    },
    typography: {
        fontFamily: [
            'Poppins',
            'sans-serif',

        ].join(',')
    },

},);