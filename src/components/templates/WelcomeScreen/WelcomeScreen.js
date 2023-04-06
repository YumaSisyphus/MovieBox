import { Container, Typography, ThemeProvider, Link, Box, Button, Grid } from "@mui/material";
import { theme } from "../../../utils/theme";
import styles from "./style.module.css"
import AdbIcon from '@mui/icons-material/Adb';
import AppleIcon from '@mui/icons-material/Apple';
import logo from "../../../assets/logo2.png"
import JohnWick from "../../../assets/JohnWick.jpg"
import TheBatman from "../../../assets/TheBatman.jpg"
import DecisionToLeave from "../../../assets/DecisionToLeave.jpg"
import Everything from "../../../assets/everything.jpg"
import Seven from "../../../assets/Seven.jpg"
import Header from "../../header/Header";

const WelcomeScreen = () => {
    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "#09090e" }}>
            <ThemeProvider theme={theme}>
                <Container
                    maxWidth="lg"
                >
                    <Header />
                    <div className={styles.BackgroundImage}>
                        <Container
                            maxWidth="lg"
                        >
                            <ul className={styles.Navbar}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/"
                                        >
                                            <img width={60} height={60} src={logo} alt="logo" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/"
                                        >
                                            <Typography
                                                variant="h4"
                                                className={styles.NavbarHeader}
                                                ml={1}
                                            >
                                                MovieBox
                                            </Typography>
                                        </Link>
                                    </li>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", width: "50%", justifyContent: "space-evenly", paddingRight: "15%" }}>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/"
                                        >
                                            <Typography
                                                variant="body1"
                                                className={styles.NavbarText}
                                            >
                                                Sign in
                                            </Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/">
                                            <Typography
                                                variant="body1"
                                                className={styles.NavbarText}
                                            >
                                                Create Account
                                            </Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/">
                                            <Typography
                                                variant="body1"
                                                className={styles.NavbarText}
                                            >
                                                Films
                                            </Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/">
                                            <Typography
                                                variant="body1"
                                                className={styles.NavbarText}
                                            >
                                                Lists
                                            </Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/">
                                            <Typography
                                                variant="body1"
                                                className={styles.NavbarText}
                                            >
                                                Members
                                            </Typography>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            underline="none"
                                            href="/">
                                            <Typography
                                                variant="body1"
                                                className={styles.NavbarText}
                                            >
                                                Theatres
                                            </Typography>
                                        </Link>
                                    </li>
                                </div>
                            </ul>
                        </Container>
                    </div>
                    <Box
                        className={styles.Description}>
                        <Typography
                            className={styles.DescriptionText}
                        >
                            Track films you’ve watched.
                        </Typography>
                        <Typography
                            className={styles.DescriptionText}
                        >
                            Save those you want to see.
                        </Typography>
                        <Typography
                            className={styles.DescriptionText}
                            mb={5}
                        >
                            Tell your friends what’s good.
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            backgroundColor="#264653">
                            GET STARTED - IT'S FREE!!
                        </Button>
                        <Typography
                            mt={5}
                            className={styles.QuoteText}
                        >
                            The social network for cinema lovers.  Also available on <AdbIcon sx={{ marginBottom: "-5px" }} /> <AppleIcon sx={{ marginBottom: "-5px" }} />
                        </Typography>

                    </Box>





                </Container>

                <Box
                    mt={8}
                    bgcolor="#09090e">
                    <Container
                        maxWidth="md">


                        <Grid
                            container
                            mt={8}
                            display="flex"
                            justifyContent="space-between">

                            <Box
                                width={150}
                                height={200}
                                className={styles.MovieBorder}
                                sx={{
                                    backgroundImage: `url(${JohnWick})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                                borderRadius="5px">
                            </Box>
                            <Box
                                width={150}
                                height={200}
                                sx={{
                                    backgroundImage: `url(${TheBatman})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                                borderRadius="5px">
                            </Box>
                            <Box
                                width={150}
                                height={200}
                                sx={{
                                    backgroundImage: `url(${DecisionToLeave})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                                borderRadius="5px">
                            </Box>
                            <Box
                                width={150}
                                height={200}
                                sx={{
                                    backgroundImage: `url(${Everything})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}
                                borderRadius="5px">
                            </Box>
                            <Box
                                width={150}
                                height={200}
                                sx={{
                                    backgroundImage: `url(${Seven})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "right"
                                }}
                                borderRadius="5px">
                            </Box>

                        </Grid>

                        <Box mt={8}>
                            <Typography
                                color="#aaaaaa">
                                MovieBox lets you...
                            </Typography>
                        </Box>

                    </Container>

                </Box>


            </ThemeProvider>
        </div>
    );
};

export default WelcomeScreen;