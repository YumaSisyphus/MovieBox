import { Box, FormControlLabel, Typography } from "@mui/material";
import { styled } from "@mui/system";
import theme, { Colors } from "../../../utils/Themes";

export const BoxStyle = styled(Box)(() => ({
  overflow: "hidden",
  borderRadius: "2.5%",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  alignSelf: "center",
  marginTop: "-10%",
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
  paddingTop: "2%",
  paddingBottom: "2%",
  boxShadow: "0px 0px 10px  rgba(0, 0, 0, 1)",
}));
