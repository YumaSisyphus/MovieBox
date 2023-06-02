import { ThemeProvider, Typography } from "@mui/material";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import styles from "./Lists.module.css";
import { Box, Container, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Lists = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { UserID } = token[0];
    const navigate = useNavigate();
    const [list, setLists] = useState([]);
    const [listMovies, setListMovies] = useState([]);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(`/api/getLists`);
                const listsData = response.data;
                console.log(listsData)
                setLists(listsData);

                // Fetch movies for each list
                const moviesPromises = listsData.map(async (list) => {
                    const moviesResponse = await axios.get(`/api/getListMovies/${list.ListID}`);
                    return moviesResponse.data;
                });

                const moviesData = await Promise.all(moviesPromises);
                console.log(moviesData)
                setListMovies(moviesData);

            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };


        fetchLists();
    }, []);

    console.log(list)
    console.log(listMovies)



    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
                }}
            >
                <Header />
                <Container maxWidth="md">

                    <Typography
                        ml={2}
                        fontSize="16px"
                        mt={7}
                        className={styles.Watched}
                    >
                        Lists
                    </Typography>
                    <hr
                        style={{
                            border: "1px solid #8f8f8f",
                            marginLeft: "2%",
                            width: "95.5%",
                        }}
                    />
                    <Box display="flex" flexWrap="wrap" mt={2} mb={9} gap={5} ml={2}>
                        {list.slice(0, 8).map((lists, index) => {
                            const movie = listMovies[index];
                            return (
                                <Box
                                    key={lists.ListID}
                                    width={240}
                                    height={200}
                                    className={styles.ListBox}
                                    sx={{
                                        borderRadius: "5px",
                                        backgroundImage: `url(${movie?.Cover || ''})`,
                                        backgroundSize: "cover",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    {movie && (
                                        <>
                                            <Typography>{movie.Title}</Typography>
                                            <Typography>{lists.Title}</Typography>
                                            <Typography>{lists.Description}</Typography>
                                        </>
                                    )}
                                </Box>
                            );
                        })}

                    </Box>
                </Container>

                <Footer />
            </div>
        </ThemeProvider>

    )
}

export default Lists;