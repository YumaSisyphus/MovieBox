import { Container, Typography, ThemeProvider, Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.css"
import AdbIcon from '@mui/icons-material/Adb';
import AppleIcon from '@mui/icons-material/Apple';
import logo from "../../../assets/logo2.png"
import JohnWick from "../../../assets/JohnWick.jpg"
import TheBatman from "../../../assets/TheBatman.jpg"
// import DecisionToLeave from "../../../assets/DecisionToLeave.jpg"
import Everything from "../../../assets/everything.jpg"
import GrandBudapest from "../../../assets/GrandBudapest.jpg"
import Footer from "../../footer/Footer";
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import RateReviewIcon from '@mui/icons-material/RateReview';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Babylon from '../../../assets/Babylon.jpg'
import { useEffect, useState } from "react";
import theme from "../../../utils/Themes";

const WelcomeScreen = () => {

    const [backendData, setBackendData] = useState([{}])

    useEffect(() => {
        fetch("/api").then(
            response => response.json()
        ).then(data => setBackendData(data))
    }, [])

    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "#0c0c0f" }}>
            <ThemeProvider theme={theme}>
                <Container
                    maxWidth="lg"
                >
                    <div className={styles.BackgroundImage}>
                        <Container
                            maxWidth="lg"
                        >
                            <ul className={styles.Navbar}>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <li>
                                        <Link
                                            to={"/"}
                                            className={styles.Links}


                                            href="/"
                                        >
                                            <img width={60} height={60} src={logo} alt="logo" />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={"/"}
                                            className={styles.Links}
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
                                            className={styles.Links}
                                            to={"/Login"}
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
                                            to={"/Register"}
                                            className={styles.Links}>
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
                                            to={"/MoviePage"}
                                            className={styles.Links}>
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
                                            to={"/MovieList"}
                                            className={styles.Links}>
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
                                            to={"/"}
                                            className={styles.Links}
                                        >
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
                                            to={"/"}
                                            className={styles.Links}
                                        >
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
                        {/* {backendData.users.map((user, i) => (
                            <p key={i}>{user}</p>
                        ))} */}
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
                    mt={4}
                    sx={{ paddingTop: "5px" }}
                    bgcolor="#0c0c0f">
                    <Container
                        maxWidth="md">
                        <Grid
                            container
                            mt={8}
                            display="flex"
                            justifyContent="space-between">
                            <Link
                                to={"/"}
                                className={styles.Links}
                            >
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
                            </Link>
                            <Link
                                to={"/"}
                                className={styles.Links}
                            >
                                <Box
                                    width={150}
                                    height={200}
                                    className={styles.MovieBorder}
                                    sx={{
                                        backgroundImage: `url(${TheBatman})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}
                                    borderRadius="5px">
                                </Box>
                            </Link>
                            <Link
                                to={"/"}
                                className={styles.Links}
                            >
                                <Box
                                    width={150}
                                    height={200}
                                    className={styles.MovieBorder}
                                    sx={{
                                        backgroundImage: `url(${Babylon})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}
                                    borderRadius="5px">
                                </Box>
                            </Link>
                            <Link
                                to={"/"}
                                className={styles.Links}
                            >
                                <Box
                                    width={150}
                                    height={200}
                                    className={styles.MovieBorder}
                                    sx={{
                                        backgroundImage: `url(${Everything})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}
                                    borderRadius="5px">
                                </Box>
                            </Link>
                            <Link
                                to={"/"}
                                className={styles.Links}
                            >
                                <Box
                                    width={150}
                                    height={200}
                                    className={styles.MovieBorder}
                                    sx={{
                                        backgroundImage: `url(${GrandBudapest})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right"
                                    }}
                                    borderRadius="5px">
                                </Box>
                            </Link>

                        </Grid>
                        <Box mt={8}>
                            <Typography
                                color="#aaaaaa"
                                letterSpacing="2px"
                                variant="body2">
                                MovieBox lets you...
                            </Typography>
                        </Box>
                        <Grid container
                            spacing={1}
                            mb={10}
                            sx={{ paddingTop: "5px" }}>
                            <Grid item
                                lg={4}
                            >
                                <Link
                                    to={"/"}
                                    className={styles.Links}
                                    href="/"
                                >
                                    <Box
                                        className={styles.servicesBox}
                                    >
                                        <Typography>
                                            <BookOnlineIcon
                                                className={styles.ServiceIcon}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#e6f5f4">
                                            Book your Tickets online whenever you want for any movie you want</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                            <Grid item
                                lg={4}>
                                <Link
                                    to={"/"}
                                    className={styles.Links}
                                    href="/"
                                >
                                    <Box
                                        className={styles.servicesBox}>
                                        <Typography>
                                            <VisibilityIcon
                                                className={styles.ServiceIcon}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#e6f5f4">
                                            Watched Movie online whenever you want for any movie you want</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                            <Grid item
                                lg={4}>
                                <Link
                                    to={"/"}
                                    className={styles.Links}
                                >
                                    <Box
                                        className={styles.servicesBox}>
                                        <Typography>
                                            <RateReviewIcon
                                                className={styles.ServiceIcon}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#e6f5f4">
                                            Leave a Review whenever you want for any movie you want</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                            <Grid item
                                lg={4}>
                                <Link
                                    to={"/"}
                                    className={styles.Links}
                                >
                                    <Box
                                        className={styles.servicesBox}>
                                        <Typography>
                                            <FavoriteIcon
                                                className={styles.ServiceIcon}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#e6f5f4">
                                            Favorite your movies whenever you want for any movie you want</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                            <Grid item
                                lg={4}>
                                <Link
                                    to={"/"}
                                    className={styles.Links}
                                >
                                    <Box
                                        className={styles.servicesBox}>
                                        <Typography>
                                            <TheaterComedyIcon
                                                className={styles.ServiceIcon}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#e6f5f4">
                                            Theatres online whenever you want for any movie you want</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                            <Grid item
                                lg={4}>
                                <Link
                                    to={"/"}
                                    className={styles.Links}
                                >
                                    <Box
                                        className={styles.servicesBox}>
                                        <Typography>
                                            <FormatListBulletedIcon
                                                className={styles.ServiceIcon}
                                            />
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="#e6f5f4">
                                            List Favorite Movies whenever you want for any movie you want</Typography>
                                    </Box>
                                </Link>
                            </Grid>
                        </Grid>


                    </Container>
                    <Footer />
                </Box>
            </ThemeProvider>
        </div>
    );
};

export default WelcomeScreen;