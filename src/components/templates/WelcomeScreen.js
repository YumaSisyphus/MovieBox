import { Container, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { theme } from "../../utils/theme";
import logo from "../../assets/logo1.png"

const WelcomeScreen = () => {
    return (
        <div >
            <ThemeProvider theme={theme}>
                <div style={{height: "90vh", backgroundImage: `url(${logo})`}}>

                    <Container
                        maxWidth="md"
                        sx={{ backgroundColor: "#2A9D8F4D" }}
                    >
                        <ul style={{ display: "flex", alignItems: "center", justifyContent: "space-between", listStyle: "none", marginTop: "0" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>

                                <li>
                                    <img width={60} height={60} src={logo} alt="logo" />

                                </li>
                                <li>
                                    <Typography
                                        variant="h4"
                                        color="#ffffff"
                                    >
                                        MovieBox
                                    </Typography>
                                </li>
                            </div>

                            <div style={{ display: "flex", alignItems: "center" }}>

                                <li>
                                    <Typography
                                        variant="body1"
                                        color="secondary"
                                    >
                                        Sign in
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="body1"
                                        color="secondary"
                                    >
                                        Create Account
                                    </Typography>
                                </li>
                                <li>
                                    <Typography
                                        variant="body1"
                                        color="secondary"
                                    >
                                        MovieBox
                                    </Typography>
                                </li>
                            </div>

                        </ul>

                    </Container>

                </div>

            </ThemeProvider>
        </div>
    );
};

export default WelcomeScreen;