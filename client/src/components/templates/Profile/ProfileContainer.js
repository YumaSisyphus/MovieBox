import React from 'react';
import styles from './ProfileContainer.module.css';
import Header from '../../header/Header';
import { Box, Button, Container, Typography } from '@mui/material';

function ProfileContainer() {
    return (
        <div style={{ backgroundColor: "#16161c" }}>
            <Header />
            <Container maxWidth="md">

                <Box mt={5}>
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


                    <div className={styles.activity}>
                        <h3 className={styles.activityTitle}>Activity</h3>
                        <ul className={styles.activityList}>
                            <li className={styles.activityItem}>
                                <p className={styles.activityText}>Liked Movie: <a href="https://www.imdb.com/title/tt5727208/">Uncut Gems</a></p>
                                <p className={styles.activityDate}>2 hours ago</p>
                            </li>
                            <li className={styles.activityItem}>
                                <p className={styles.activityText}>Reviews on Movie: <a href="https://www.imdb.com/title/tt5727208/">Uncut Gems</a></p>
                                <p className={styles.activityDate}>Yesterday</p>
                            </li>
                            <li className={styles.activityItem}>
                                <p className={styles.activityText}>Added to watchlist: <a href="https://www.imdb.com/title/tt5727208/">Uncut Gems</a></p>
                                <p className={styles.activityDate}>3 days ago</p>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.films}>
                        <h3 className={styles.filmsTitle}>Films</h3>
                        <div className={styles.filmsGrid}>
                            <div className={styles.filmCard}>
                                <img
                                    src="https://i.ibb.co/F0CpVZw/images.jpg"
                                    alt="image"
                                    className={styles.filmPoster}
                                />
                                <p className={styles.filmTitle}>Uncut Gems</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.reviews}>
                        <h3 className={styles.reviewsTitle}>Reviews</h3>
                        <div className={styles.reviewsGrid}>
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewInfo}>
                                    <img
                                        src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                                        alt="user"
                                        className={styles.reviewAvatar}
                                    />
                                    <div className={styles.reviewUser}>
                                        <p className={styles.reviewUsername}>Dion Berbatovci</p>
                                        <p className={styles.reviewDate}>5 days ago</p>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    "Uncut Gems is a dazzling, anxiety-inducing thriller that cements the Safdie brothers' reputation as masters of their craft."
                                </p>
                            </div>
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewInfo}>
                                    <img
                                        src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                                        alt="user"
                                        className={styles.reviewAvatar}
                                    />
                                    <div className={styles.reviewUser}>
                                        <p className={styles.reviewUsername}>Dion Berbatovci</p>
                                        <p className={styles.reviewDate}>1 week ago</p>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    "Adam Sandler delivers a career-best performance in this intense, pulse-pounding thriller."
                                </p>
                            </div>
                            <div className={styles.reviewCard}>
                                <div className={styles.reviewInfo}>
                                    <img
                                        src="https://fastly.picsum.photos/id/866/200/300.jpg?hmac=rcadCENKh4rD6MAp6V_ma-AyWv641M4iiOpe1RyFHeI"
                                        alt="user"
                                        className={styles.reviewAvatar}
                                    />
                                    <div className={styles.reviewUser}>
                                        <p className={styles.reviewUsername}>Dion Berbatovci</p>
                                        <p className={styles.reviewDate}>1 week ago</p>
                                    </div>
                                </div>
                                <p className={styles.reviewText}>
                                    "It's a thrilling ride that will have your heart racing and your palms sweating until the very end."
                                </p>
                            </div>
                        </div>
                    </div>
                </Box>

            </Container>

        </div >

    );
}

export default ProfileContainer;
