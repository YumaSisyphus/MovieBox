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
} from "@mui/material";
import Cookies from "universal-cookie";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BoxStyle,
  FormControlLabelStyle,
  TypographyStyle,
} from "./LoginScreenStyle";
import BackGroundImage from "../../../assets/BackGroundRegister&LoginImage.jpg";
import theme, { Colors } from "../../../utils/Themes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const initalState = {
  usernameORemail: "",
  password: "",
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState(initalState);
  const { usernameORemail, password } = state;
  const navigate = useNavigate();
  const cookies = new Cookies();
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usernameORemail || !password) {
      toast.error("Please fill all the fields");
    } else {
      axios
        .post("http://localhost:5000/api/login", {
          usernameORemail,
          password,
        })
        .then((response) => {
          if (response.data.msg) {
            toast.error(response.data.msg);
          } else {
            cookies.set("token", response.data, {
              path: "/",
            });
            setState({
              usernameORemail: "",
              password: "",
            });
            setTimeout(() => {
              navigate("/home");
            }, 500);
          }
        })
        .catch((err) => toast.error(err.response.data));
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(to top, rgba(48, 48, 54, 0.5), rgba(22, 22, 28, 0.5)), url(${BackGroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
      }}
    >
      <ThemeProvider theme={theme}>
        <Header />
        <Container
          sx={{
            textAlign: "center",
            height: "77vh",
          }}
        >
          <Grid
            container
            spacing={12}
            sx={{
              justifyContent: "center",
              width: "100%",
              height: "100%",
              margin: "0 0 0 0",
            }}
          >
            <Grid
              item
              md={6}
              xs={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                padding: "0 0 !important",
              }}
            >
              <BoxStyle sx={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 1)" }}>
                <TypographyStyle variant="h4">Sign in</TypographyStyle>
                <form
                  style={{
                    width: "100%",
                  }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    name="usernameORemail"
                    id="usernameORemail"
                    sx={{ width: "80%" }}
                    color="white"
                    margin="normal"
                    label="Username or Email"
                    placeholder="Enter your username or email"
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
                    onChange={handleInput}
                  />
                  <TextField
                    name="password"
                    id="password"
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
                    onChange={handleInput}
                  />
                </form>
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
                  onClick={handleSubmit}
                  style={{
                    marginTop: "5%",
                    marginBottom: "6%",
                  }}
                  color="white"
                  variant="outlined"
                >
                  Sign in
                </Button>
                <Typography color={Colors.white}>
                  Don't have an account?
                </Typography>
                <Link
                  marginBottom={"5%"}
                  component={RouterLink}
                  to={`/Register`}
                  color={Colors.white}
                >
                  Sign up here!
                </Link>
              </BoxStyle>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </ThemeProvider>
      <ToastContainer theme="colored" />
    </div>
  );
};
export default Login;
