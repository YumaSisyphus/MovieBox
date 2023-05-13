import {
    Box,
    FormControlLabel,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import theme, { Colors } from "../../../utils/Theme";

export const BoxStyle = styled(Box)(() => ({
    overflow: "hidden",
    borderRadius: "2.5%",
    display: "flex",
    flexDirection: "column",
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: "10%",
    marginTop: "-15%",
    [theme.breakpoints.down("md")]: {
        marginTop: "45%",
    },
    backgroundColor: Colors.shaft,
}));

export const FormControlLabelStyle = styled(FormControlLabel)(() => ({
    marginTop: "5%",
    alignItems: "center",
    color: Colors.white,
    [theme.breakpoints.down("md")]: {},
}));

export const TypographyStyle = styled(Typography)(() => ({
    marginBottom: "5%",
    background: "#444",
    width: "100%",
    color: "white",
    textAlign: "center"
}));

