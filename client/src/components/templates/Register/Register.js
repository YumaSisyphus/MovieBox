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
import Footer from "../../footer/Footer";
import Header from "../../header/Header"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
    BoxStyle,
    FormControlLabelStyle,
    TypographyStyle,
} from "./RegisterStyle";
import theme, { Colors } from "../../../utils/Theme";
import { toast } from "react-toastify";
import axios from "axios";
const currentDate = new Date();
const minDate = new Date(
    currentDate.getFullYear() - 16,
    currentDate.getMonth(),
    currentDate.getDate()
);
const initalState = {
    username: "",
    email: "",
    password: "",
    birthday: "",
};

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

    const [state, setState] = useState(initalState);
    const { username, email, password, birthday } = state;
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !email || !password || !birthday) {
            toast.error("please fill all the fields");
        } else {
            axios
                .post("http://localhost:5000/api/post", {
                    username,
                    email,
                    password,
                    birthday,
                })
                .then(() => {
                    setState({ username: "", email: "", password: "", birthday: "" });
                })
                .catch((err) => toast.error(err.response.data));

            setTimeout(() => {
                navigate("/WelcomeScreen");
            }, 500);
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
    console.log(birthday);
    return (
        <div
            style={{
                backgroundImage: "linear-gradient(to top, #303036, #16161c)",
                height: "100%",
            }}
        >
            <ThemeProvider theme={theme}>
                <Header />
                <Container
                    sx={{
                        // border: "2px solid black",
                        height: "auto",
                    }}
                >
                    <Grid
                        container
                        spacing={12}
                        sx={{
                            // border: "2px solid blue",
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
                            <BoxStyle sx={{ boxShadow: "0px 0px 15px rgba(0, 0, 0, 1)", display: "flex", justifyContent: "center" }}>
                                <TypographyStyle variant="h4">Sign up</TypographyStyle>
                                <form
                                    style={{
                                        width: "100%",
                                        marginLeft: "25%"
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
                                </form>
                                <form
                                    style={{
                                        width: "100%",
                                        marginLeft: "25%"
                                    }}
                                    onSubmit={handleSubmit}
                                >
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
                                </form>
                                <form
                                    style={{
                                        width: "100%",
                                        marginLeft: "25%"
                                    }}
                                    onSubmit={handleSubmit}
                                >
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
                                </form>
                                <form
                                    style={{
                                        width: "100%",
                                        marginLeft: "25%"
                                    }}
                                    onSubmit={handleSubmit}
                                >
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
                                </form>
                                <form
                                    style={{
                                        width: "100%",
                                        marginLeft: "25%"
                                    }}
                                    onSubmit={handleSubmit}
                                >
                                    <Typography>
                                        Enter your birthday. You must be at last 16 years old!
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
                                        marginTop: "8%",
                                        marginBottom: "10%",
                                    }}
                                    color="white"
                                    variant={clicked ? "outlined" : "contained"}
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
        </div>
    );
};
export default Register;

