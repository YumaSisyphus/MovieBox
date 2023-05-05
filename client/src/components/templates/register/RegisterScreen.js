import {
  Button,
  Checkbox,
  Container,
  Grid,
  Link,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BoxStyle,
  FormControlLabelStyle,
  TypographyStyle,
} from "./RegisterScreenStyle";
import theme, { Colors } from "../../../utils/Themes";
const Register = () => {
  const [clicked, setClicked] = useState(true);
  const [errorMessage, setError] = useState(null);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleClick = () => {
    setClicked(!clicked);
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to bottom, #111111, #444444)",
        height: "100%",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container
          sx={{
            border: "2px solid black",
            height: "auto",
          }}
        >
          <Grid
            container
            spacing={12}
            sx={{
              border: "2px solid blue",
              justifyContent: "center",
              width: "100%",
              height: "100",
              margin: "0 0 0 0",
            }}
          >
            <Grid
              mt={"12%"}
              md={6}
              xs={12}
              sx={{
                // border: "2px solid red",
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <BoxStyle sx={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 1)" }}>
                <TypographyStyle variant="h4">Sign up</TypographyStyle>
                <TextField
                  sx={{ width: "80%" }}
                  color="white"
                  margin="normal"
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  variant="filled"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  sx={{ width: "80%" }}
                  color="white"
                  margin="normal"
                  label="Email"
                  placeholder="Enter your email"
                  type="text"
                  variant="filled"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  InputProps={{
                    style: {
                      color: "white",
                    },
                  }}
                />
                <TextField
                  sx={{ width: "80%" }}
                  color="white"
                  margin="normal"
                  label="Password"
                  placeholder="Enter your password"
                  variant="filled"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    style: {
                      color: "white",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? (
                            <VisibilityOff color="white" />
                          ) : (
                            <Visibility color="white" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  sx={{ width: "80%" }}
                  color="white"
                  margin="normal"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  variant="filled"
                  InputLabelProps={{
                    style: { color: "white" },
                  }}
                  type={showConfirmPassword ? "text" : "password"}
                  InputProps={{
                    style: {
                      color: "white",
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff color="white" />
                          ) : (
                            <Visibility color="white" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <LocalizationProvider
                  sx={{ borderColor: "#fff" }}
                  dateAdapter={AdapterDateFns}
                >
                  <DatePicker
                    sx={{
                      marginTop: "1vh",
                      "& input": { color: "#fff" },
                      "& .MuiSvgIcon-root": { color: "#fff" },
                    }}
                    format="dd/MM/yyyy"
                    defaultValue={new Date()}
                    maxDate={new Date()}
                    onError={(newError) => setError(newError)}
                    slotProps={{
                      textField: {
                        helperText: errorMessage,
                      },
                    }}
                    views={["year", "month", "day"]}
                  />
                </LocalizationProvider>
                <FormControlLabelStyle
                  control={
                    <Checkbox
                      sx={{
                        color: theme.palette.light.main,
                        "&.Mui-checked": {
                          color: theme.palette.light.main,
                        },
                      }}
                      disableRipple
                    />
                  }
                  label="Remember me"
                />
                <Button
                  onClick={handleClick}
                  style={{
                    marginTop: "8%",
                    marginBottom: "10%",
                  }}
                  color="white"
                  variant={clicked ? "outlined" : "contained"}
                >
                  Sign up
                </Button>
                <Typography color={Colors.white}>
                  Already have an account?
                </Typography>
                <Link
                  marginBottom={"5%"}
                  component={RouterLink}
                  to={`/Login`}
                  color={Colors.white}
                >
                  Sign in here!
                </Link>
              </BoxStyle>
            </Grid>
            {/* <Grid
              item
              height={"100%"}
              mt={"12%"}
              md={8}
              xs={0}
              sx={{
                border: "2px solid green",
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
              }}
            >
              {isMatch ? (
                <></>
              ) : (
                <BoxStyle>
                  Lorem ipsum dolor sit am Lorem ipsum dolor sit am Lorem ipsum
                  dolor sit am Lorem ipsum dolor sit am Lorem ipsum dolor sit am
                  Lorem ipsum dolor sit am Lorem ipsum dolor sit am Lorem ipsum
                  dolor sit am Lorem ipsum dolor sit am Lorem ipsum dolor sit am
                  v Lorem ipsum dolor sit am Lorem ipsum dolor sit am Lorem
                  ipsum dolor sit am
                </BoxStyle>
              )}
            </Grid> */}
          </Grid>
          <Grid
            item
            height={"100%"}
            mt={"12%"}
            sx={{
              border: "2px solid green",
              display: "flex",
              flexDirection: "row",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            {isMatch ? (
              <></>
            ) : (
              <BoxStyle>
                Foote Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
                Footer Footer Footer Footer Footer Footer Footer Footer Footer
              </BoxStyle>
            )}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};
export default Register;
