import React from 'react';
import styles from './ProfileContainer.module.css';
import Header from '../../header/Header';
import { Box, Button, Container, Typography } from '@mui/material';
import Footer from '../../footer/Footer';
import { Link } from 'react-router-dom';
import JohnWick from '../../../assets/JohnWick.jpg'
import Everything from '../../../assets/EverythingEverywhere.jpg'
import GoodWill from '../../../assets/GoodWillHuntingCover.png'
import DeadPoets from '../../../assets/DeadPoetsSocietyCover.jpg'
import GrandBudapest from '../../../assets/GrandBudapest.jpg'
import Parasite from '../../../assets/Parasite.jpg'

function ProfileContainer() {
    return (
        <div style={{ backgroundColor: "#16161c" }}>
            <Header />
            <Container maxWidth="md">

                <Box mt={5} mb={8}>
                    <Box display={"flex"}>

                        <Box display={"flex"} flex={1}>
                            <img
                                src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                                alt="Profile picture"
                                className={styles.profilePicture} />
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                alignItems={"center"}
                                justifyContent={"center"}>
                                <Typography
                                    variant='h3'
                                    mb={"10px"}
                                    className={styles.username}>Erblin Ymeri</Typography>

                                <Button className={styles.editButton} size="small">Edit Profile</Button>
                            </Box>

                        </Box>



                        <Box display={"flex"} justifyContent="space-around" mt={2}>
                            <div className={styles.statsItem}>
                                <Typography mr={1} fontSize="16px" className={styles.statsTitle}>Films</Typography>
                                <Typography className={styles.statsNumber}>128</Typography>
                            </div>
                            <div className={styles.statsItem}>
                                <Typography mr={1} fontSize="16px" className={styles.statsTitle}>Watchlist</Typography>
                                <Typography className={styles.statsNumber}>25</Typography>
                            </div>
                            <div className={styles.statsItem}>
                                <Typography fontSize="16px" className={styles.statsTitle}>Reviews</Typography>
                                <Typography className={styles.statsNumber}>12</Typography>
                            </div>
                        </Box>

                    </Box>
                    <Typography className={styles.bio} mt={2}>A cinephile that loves exploring the world of movies.</Typography>

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

                        <Box display="flex" mt={2}>
                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%", marginLeft: "5%" }}>
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

                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%" }}>
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

                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%" }}>
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

                        <Box display="flex" mt={2}>
                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%", marginLeft: "5%" }}>
                                <Box
                                    width="100%"
                                    height="100%"
                                    className={styles.MovieBorder}
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundImage: `url(${JohnWick})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}>
                                </Box>
                            </Link>

                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%" }}>
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
                                        backgroundPosition: "center"
                                    }}>
                                </Box>
                            </Link>

                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%" }}>
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
                                        backgroundImage: `url(${JohnWick})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}>
                                </Box>
                            </Link>

                        </Box>
                    </Box>
                    <Box mt={5}>

                        <Box display={"flex"} justifyContent="space-between">
                            <Typography fontWeight="bold" color="#ebebeb">
                                Watchlist:
                            </Typography>
                            <Link to="/" className={styles.Links}>
                                <Typography fontWeight="bold" color="#ebebeb">
                                    More...
                                </Typography>
                            </Link>
                        </Box>

                        <Box display="flex" mt={2}>
                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%", marginLeft: "5%" }}>
                                <Box
                                    width="100%"
                                    height="100%"
                                    className={styles.MovieBorder}
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundImage: `url(${JohnWick})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}>
                                </Box>
                            </Link>

                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%" }}>
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
                                        backgroundPosition: "center"
                                    }}>
                                </Box>
                            </Link>

                            <Link to="/" style={{ width: "170px", height: "220px", marginRight: "5%" }}>
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
                                        backgroundImage: `url(${JohnWick})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center"
                                    }}>
                                </Box>
                            </Link>

                        </Box>
                    </Box>

                </Box>


            </Container>

            <Footer />

        </div >

    );
}

export default ProfileContainer;
