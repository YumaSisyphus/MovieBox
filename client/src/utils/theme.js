import { createTheme } from "@mui/material/styles";
export const Colors = {
    primary: "#5f2c3e",
    secondary: "#2A9D8F",
    success: "#4CAF50",
    info: "#00a2ff",
    danger: "#FF5722",
    warning: "#FFC107",
    // Dark is background for header and footer
    dark: "#212730",
    light: "#aaa",
    muted: "#abafb3",
    border: "#DDDFE1",
    inverse: "#2F3D4A",
    shaft: "#333",
    dim_grey: "#696969",
    dove_grey: "#d5d5d5",
    // bg for everypage
    body_bg: "#16161c",
    light_grey: "rgb(230,230,230)",
    white: "#fff",
    black: "#000",

};
const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary,
        },
        secondary: {
            main: Colors.secondary,
        },
        success: {
            main: Colors.success,
        },
        info: {
            main: Colors.info,
        },
        danger: {
            main: Colors.danger,
        },
        warning: {
            main: Colors.warning,
        },
        dark: {
            main: Colors.dark,
        },
        light: {
            main: Colors.light,
        },
        muted: {
            main: Colors.muted,
        },
        border: {
            main: Colors.border,
        },
        inverse: {
            main: Colors.inverse,
        },
        shaft: {
            main: Colors.shaft,
        },
        dim_grey: {
            main: Colors.dim_grey,
        },
        dove_grey: {
            main: Colors.dove_grey,
        },
        body_bg: {
            main: Colors.body_bg,
        },
        light_grey: {
            main: Colors.light_grey,
        },
        white: {
            main: Colors.white,
        },
        black: {
            main: Colors.black,
        },
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true,
            },
        },
    },
});
export default theme;

