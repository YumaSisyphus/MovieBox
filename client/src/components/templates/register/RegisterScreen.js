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
  FormControlLabel,
} from "@mui/material";
import Footer from "../../footer/Footer";
import Header from "../../header/Header";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  BoxStyle,
  FormControlLabelStyle,
  TypographyStyle,
} from "./RegisterScreenStyle";
import BackGroundImage from "../../../assets/BackGroundRegister&LoginImage.jpg";
import theme, { Colors } from "../../../utils/Themes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const curentDate = new Date();
const minDate = new Date(
  curentDate.getFullYear() - 16,
  curentDate.getMonth(),
  curentDate.getDate()
);
const initalState = {
  username: "",
  email: "",
  password: "",
  birthday: "",
  confirmPassword: "",
};

const Register = () => {
  const [clicked, setClicked] = useState(false);
  const [errorMessage, setError] = useState(null);
  const [state, setState] = useState(initalState);
  const { username, email, password, birthday, confirmPassword } = state;
  const navigate = useNavigate();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const handleChange = (event) => {
    setClicked(event.target.checked);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      toast.error("Please fill all the fields");
    } else if (username.length < 5) {
      toast.error("Username must be at least 5 characters");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please check if you have written your email correctly");
    } else if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[0123456789]/.test(password)
    ) {
      toast.error(
        "Password should be at least 8 characters long, contain one uppercase letter, one lowercase letter and one special character"
      );
    } else if (password !== confirmPassword) {
      toast.error("Please check if you've typed your password correctly");
    } else if (clicked === false) {
      toast.error("You must be at least 16 years old!");
    } else {
      axios
        .get(
          `http://localhost:5000/api/checkUserRegister?username=${username}&email=${email}`
        )
        .then((response) => {
          const userExists = response.data.exists;
          if (userExists) {
            toast.error(
              "User already exists. Please choose a different username or email."
            );
          } else {
            axios
              .post("http://localhost:5000/api/register", {
                username,
                email,
                password,
                birthday,
              })
              .then((response) => {
                console.log(response.data);
                setState({
                  username: "",
                  email: "",
                  password: "",
                  birthday: "",
                });
                setTimeout(() => {
                  navigate("/login");
                }, 500);
              })
              .catch((err) => toast.error(err.response.data));
          }
        });
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleDateChange = (date) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    setState({ ...state, birthday: formattedDate });
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
            height: "auto",
            textAlign: "center",
          }}
        >
          <Grid
            container
            spacing={12}
            sx={{
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
                display: "flex",
                flexDirection: "column",
                height: "100%",
                width: "100%",
              }}
            >
              <BoxStyle sx={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 1)" }}>
                <TypographyStyle variant="h4">Sign up</TypographyStyle>
                <form
                  style={{
                    width: "100%",
                  }}
                  onSubmit={handleSubmit}
                >
                  <TextField
                    id="username"
                    name="username"
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
                    onChange={handleInput}
                  />
                  <TextField
                    id="email"
                    name="email"
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
                    onChange={handleInput}
                  />

                  <TextField
                    id="password"
                    name="password"
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

                  <TextField
                    sx={{ width: "80%" }}
                    name="confirmPassword"
                    id="confirmPassword"
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
                    onChange={handleInput}
                  />

                  <Typography
                    marginTop="3%"
                    marginBottom="3%"
                    style={{ color: "white" }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="ageReq"
                          id="ageReq"
                          onChange={handleChange}
                          checked={clicked}
                          sx={{
                            color: theme.palette.light.main,
                            "&.Mui-checked": {
                              color: theme.palette.light.main,
                            },
                          }}
                          disableRipple
                        />
                      }
                      label={
                        <Typography variant="body1">
                          I'm at least 16 years old and accept the{" "}
                          <Link
                            marginBottom={"5%"}
                            component={RouterLink}
                            to={`/Terms`}
                            color={Colors.white}
                          >
                            <strong>Terms of Use</strong>
                          </Link>
                        </Typography>
                      }
                    />
                  </Typography>
                  <Typography sx={{ color: "gray", marginRight: "27%" }}>
                    *Not Required
                  </Typography>
                  <LocalizationProvider
                    sx={{ borderColor: "#fff" }}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      id="birthday"
                      name="birthday"
                      sx={{
                        marginTop: "1vh",
                        "& input": { color: "#fff" },
                        "& .MuiSvgIcon-root": { color: "#fff" },
                      }}
                      disabled={!clicked}
                      format="dd/MM/yyyy"
                      maxDate={minDate}
                      onError={(newError) => setError(newError)}
                      slotProps={{
                        textField: {
                          helperText: errorMessage,
                        },
                      }}
                      views={["year", "month", "day"]}
                      onChange={handleDateChange}
                    />
                  </LocalizationProvider>
                </form>
                <Button
                  onClick={handleSubmit}
                  style={{
                    marginBottom: "3%",
                    marginTop: "3%",
                  }}
                  color="white"
                  variant="outlined"
                  type="submit"
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
          </Grid>
        </Container>
        {isMatch ? <></> : <Footer />}
      </ThemeProvider>
      <ToastContainer theme="colored" />
    </div>
  );
};
export default Register;
