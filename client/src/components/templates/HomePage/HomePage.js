import { Container, Box, Typography } from "@mui/material"
import Header from "../../header/Header"
import Avatar from '../../../assets/Avatar.jpg'
import AvatarTexture from '../../../assets/AvatarTexture.jpg'
import styles from "./style.module.css"
import Everything from '../../../assets/EverythingEverywhere.jpg'
import GoodWill from '../../../assets/GoodWillHuntingCover.png'
import DeadPoets from '../../../assets/DeadPoetsSocietyCover.jpg'
import GrandBudapest from '../../../assets/GrandBudapest.jpg'
import { Link } from "react-router-dom"
import Footer from "../../footer/Footer"
import BrendanFraser from "../../../assets/actors/BrendanFraser.jpg"
import Slider from "./slider/Carousel"
import SliderTheatre from "./theatreSlider/Carousel"

const HomePage = () => {

    return (
        <div style={{ backgroundColor: "#16161c" }}>
            <Header />

            <Box width="100%" height="80vh" sx={{ position: "relative" }}>
                <Box
                    sx={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${Avatar})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "top",
                        filter: "brightness(50%)",
                        position: "absolute",
                        zIndex: "0"
                    }}>
                </Box>
                <Typography
                    ml={100}
                    pt={15}
                    pr={20}
                    className={styles.AvatarQuote}>UP AHEAD LIES PANDORA</Typography>

                <Typography
                    zIndex="10"
                    position="inherit"
                    ml={117}
                    mt={3}
                    fontSize="34px"
                    letterSpacing="2px"
                    color="#ebebeb">
                    NOW IN CINEMAS
                </Typography>
            </Box>

            <Container maxWidth="md">

                <Box mt={10}>

                    <Typography
                        color="#ebebeb">
                        New On Moviebox
                    </Typography>

                    <hr />

                    <Box display="flex" mt={2}>
                        <Link to="/" style={{ width: "170px", height: "220px", marginRight: "7%" }}>
                            <Box
                                width="100%"
                                height="100%"
                                className={styles.MovieBorder}
                                sx={{
                                    borderRadius: "5px",
                                    backgroundImage: `url(${Everything})`,
                                    backgroundSize: "cover",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center"
                                }}>
                            </Box>
                        </Link>

                        <Link to="/" style={{ width: "170px", height: "220px", marginRight: "7%" }}>
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
                                    backgroundPosition: "center"
                                }}>
                            </Box>
                        </Link>

                        <Link to="/" style={{ width: "170px", height: "220px", marginRight: "7%" }}>
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
                                    backgroundPosition: "center"
                                }}>
                            </Box>
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
                                    backgroundPosition: "center"
                                }}>
                            </Box>
                        </Link>

                    </Box>
                </Box>

                <Box display="flex" mt={10}>

                    <Box
                        width="300px"
                        height="220px"
                        className={styles.MovieBorder}
                        sx={{
                            borderRadius: "5px",
                            backgroundImage: `url(${BrendanFraser})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center"
                        }}>
                    </Box>

                    <Box width={500}
                        ml={5}
                        mt={10}>
                        <Typography
                            mb={2}
                            variant="h5"
                            color="#ebebeb">
                            Brendan Fraser
                        </Typography>
                        <Typography
                            color="#ebebeb">
                            Brendan Fraser has won the best actor Oscar for The Whale at the Academy Awards in Los Angeles. Fraser stars as a morbidly obese teacher in the film, which was directed by Darren Aronofsky and adapted by Samuel D Hunter from his own play.
                        </Typography>
                    </Box>

                </Box>

                <Box mt={10}>
                    <Slider />
                </Box>

                <Box mt={10}>
                    <Typography
                        color="#b8b6b6"
                        mb={2}
                        fontSize="24px"
                        textAlign="center">
                        Dive into Sensational Cinemas
                    </Typography>
                    <SliderTheatre />
                </Box>


            </Container>

            <Box mb={10}>

            </Box>
            <Footer />
        </div>
    )
}


export default HomePage