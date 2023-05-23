import React from "react";
import styles from "./ProfileContainer.module.css";
import Header from "../../header/Header";
import {
    Box,
    Button,
    Container,
    ThemeProvider,
    Typography,
} from "@mui/material";
import Footer from "../../footer/Footer";
import { Link, useParams } from "react-router-dom";
import JohnWick from "../../../assets/JohnWick.jpg";
import Everything from "../../../assets/EverythingEverywhere.jpg";
import GoodWill from "../../../assets/GoodWillHuntingCover.png";
import DeadPoets from "../../../assets/DeadPoetsSocietyCover.jpg";
import GrandBudapest from "../../../assets/GrandBudapest.jpg";
import Parasite from "../../../assets/Parasite.jpg";
import LinearProgress, {
    LinearProgressProps,
} from "@mui/material/LinearProgress";
import theme from "../../../utils/Themes";
import ErblinUser from "../../../assets/Profile/Erblin.jpg";
import Cookies from "universal-cookie";

function ProfileContainer() {
    const progress1 = 80;
    const progress2 = 60;
    const progress3 = 40;
    const progress4 = 30;
    let { id } = useParams();
    const cookies = new Cookies();
    const token = cookies.get("token");
    console.log(token);
    const { Username, Bio } = token[0];
    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
                }}
            >
                <Header />
                <Container maxWidth="md">
                    <Box mt={5} mb={8}>
                        <Box display={"flex"}>
                            <Box display={"flex"} flex={1}>
                                <img
                                    src={ErblinUser}
                                    alt="Profile picture"
                                    className={styles.profilePicture}
                                />
                                <Box
                                    display={"flex"}
                                    flexDirection={"column"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                >
                                    <Typography
                                        variant="h3"
                                        mb={"10px"}
                                        className={styles.username}
                                    >
                                        {Username}
                                    </Typography>

                                    <Button className={styles.editButton} size="small">
                                        Edit Profile
                                    </Button>
                                </Box>
                            </Box>

                            <Box display={"flex"} justifyContent="space-around" mt={2}>
                                <div className={styles.statsItem}>
                                    <Typography
                                        mr={1}
                                        fontSize="16px"
                                        className={styles.statsTitle}
                                    >
                                        Films
                                    </Typography>
                                    <Typography className={styles.statsNumber}>128</Typography>
                                </div>
                                <div className={styles.statsItem}>
                                    <Typography
                                        mr={1}
                                        fontSize="16px"
                                        className={styles.statsTitle}
                                    >
                                        Watchlist
                                    </Typography>
                                    <Typography className={styles.statsNumber}>25</Typography>
                                </div>
                                <div className={styles.statsItem}>
                                    <Typography fontSize="16px" className={styles.statsTitle}>
                                        Reviews
                                    </Typography>
                                    <Typography className={styles.statsNumber}>12</Typography>
                                </div>
                            </Box>
                        </Box>
                        <Typography className={styles.bio} mt={2} width={600}>
                            Lights, camera, action! Join me on this cinematic journey as we
                            dive into a world of unforgettable stories, thrilling adventures,
                            and mesmerizing moments. Get ready to escape reality and immerse
                            yourself in the magic of the silver screen.
                        </Typography>

                        <Box mt={10}>
                            <Box>
                                <Typography fontWeight="bold" color="#ebebeb">
                                    Top Genres:
                                </Typography>
                            </Box>
                            <Box display="flex" mt={3}>
                                <Box mr={7}>
                                    <Typography variant="body2" color="#ebebeb">
                                        Drama
                                    </Typography>
                                    <LinearProgress
                                        sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                                        color="secondary"
                                        variant="determinate"
                                        value={progress1}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="#ebebeb">
                                        Scifi
                                    </Typography>
                                    <LinearProgress
                                        sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                                        color="secondary"
                                        variant="determinate"
                                        value={progress3}
                                    />
                                </Box>
                            </Box>
                            <Box display="flex" mt={5}>
                                <Box mr={7}>
                                    <Typography variant="body2" color="#ebebeb">
                                        Fantasy
                                    </Typography>
                                    <LinearProgress
                                        sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                                        color="secondary"
                                        variant="determinate"
                                        value={progress2}
                                    />
                                </Box>

                                <Box>
                                    <Typography variant="body2" color="#ebebeb">
                                        Action
                                    </Typography>
                                    <LinearProgress
                                        sx={{ width: "400px", height: "10px", bgcolor: "#ebebeb" }}
                                        color="secondary"
                                        variant="determinate"
                                        value={progress4}
                                    />
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={5}>
                            <Box display={"flex"} justifyContent="space-between">
                                <Typography fontWeight="bold" color="#ebebeb">
                                    Favorite Films:
                                </Typography>
                                <Link to="/" className={styles.Links}>
                                    <Typography fontWeight="bold" color="#ebebeb">
                                        More...
                                    </Typography>
                                </Link>
                            </Box>
                            <hr style={{ border: "1px solid #8f8f8f" }} />

                            <Box display="flex" mt={2}>
                                <Link
                                    to="/"
                                    style={{ width: "170px", height: "220px", marginRight: "7%" }}
                                >
                                    <Box
                                        width="100%"
                                        height="100%"
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${Everything})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>

                                <Link
                                    to="/"
                                    style={{ width: "170px", height: "220px", marginRight: "7%" }}
                                >
                                    <Box
                                        width="100%"
                                        height="100%"
                                        mr={5}
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${GoodWill})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>

                                <Link
                                    to="/"
                                    style={{ width: "170px", height: "220px", marginRight: "7%" }}
                                >
                                    <Box
                                        width="100%"
                                        height="100%"
                                        mr={5}
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${DeadPoets})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>

                                <Link to="/" style={{ width: "170px", height: "220px" }}>
                                    <Box
                                        width="100%"
                                        height="100%"
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${GrandBudapest})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>
                            </Box>
                        </Box>
                        <Box mt={5}>
                            <Box display={"flex"} justifyContent="space-between">
                                <Typography fontWeight="bold" color="#ebebeb">
                                    Watched:
                                </Typography>

                                <Link to="/" className={styles.Links}>
                                    <Typography fontWeight="bold" color="#ebebeb">
                                        More...
                                    </Typography>
                                </Link>
                            </Box>
                            <hr style={{ border: "1px solid #8f8f8f" }} />

                            <Box display="flex" mt={2}>
                                <Link
                                    to="/"
                                    style={{ width: "170px", height: "220px", marginRight: "7%" }}
                                >
                                    <Box
                                        width="100%"
                                        height="100%"
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${JohnWick})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>

                                <Link
                                    to="/"
                                    style={{ width: "170px", height: "220px", marginRight: "7%" }}
                                >
                                    <Box
                                        width="100%"
                                        height="100%"
                                        mr={5}
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${Parasite})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>

                                <Link
                                    to="/"
                                    style={{ width: "170px", height: "220px", marginRight: "7%" }}
                                >
                                    <Box
                                        width="100%"
                                        height="100%"
                                        mr={5}
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${JohnWick})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>

                                <Link to="/" style={{ width: "170px", height: "220px" }}>
                                    <Box
                                        width="100%"
                                        height="100%"
                                        className={styles.MovieBorder}
                                        sx={{
                                            borderRadius: "5px",
                                            backgroundImage: `url(${JohnWick})`,
                                            backgroundSize: "cover",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                        }}
                                    ></Box>
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </Container>

                <Footer />
            </div>
        </ThemeProvider>
    );
}

export default ProfileContainer;
