import theme from "../../../utils/Themes";
import React, { useEffect, useState } from "react";
import Header from "../../header/Header";
import styles from "./UserLists.module.css"
import {
    Box,
    Container,
    Grid,
    Rating,
    ThemeProvider,
    Button,
    Typography,
    Pagination
} from "@mui/material";
import Footer from "../../footer/Footer";
import Cookies from "universal-cookie";
import axios from "axios";
import Navbar from "../../Profile Navbar/Navbar";

const UserLists = () => {
    const [page, setPage] = useState(1);
    const [lists, setLists] = useState([]);
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { UserID } = token[0];

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(`/api/getUserLists/${UserID}`);
                setLists(response.data);
            } catch (error) {
                console.error("Error fetching user lists:", error);
            }
        };
        fetchLists();
    }, []);


    const ITEMS_PER_PAGE = 8;
    const totalPages = Math.ceil(lists.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedLists = lists.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <div
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
                }}
            >
                <Header />
                <Container maxWidth="md">

                    <Navbar />

                    <Typography ml={2} mt={5} variant="h6" color="#ebebeb">
                        Your Lists
                    </Typography>
                    <hr
                        style={{
                            border: "1px solid #8f8f8f",
                            marginLeft: "2%",
                            width: "95%",
                        }}
                    />
                    <Box display="flex" flexWrap="wrap" mt={2} mb={9} gap={5} ml={2}>
                        {paginatedLists.slice(0, 8).map((lists) => {
                            return (
                                <Box>
                                    <Box
                                        key={lists.ListID}
                                        width={240}
                                        height={200}
                                        className={styles.ListBox}
                                        borderRadius="5px"
                                    >
                                        <Box className={styles.ListBoxInner} pl={2} pr={2} mt={1}>
                                            <Typography color="#ebebeb">{lists.Title}</Typography>
                                            <Typography color="#b0b0b0" className={styles.ListDescription}>{lists.Description}</Typography>
                                            <Box display="flex" mt={2} gap={1} alignContent="center">
                                                <img
                                                    width="30px"
                                                    height="30px"
                                                    src={`${lists.ProfilePic}`}
                                                    alt="Profile picture"
                                                    className={lists.profilePicture}
                                                />
                                                <Typography mt={0.2} mb={5} color="#b0b0b0">{lists.Username}</Typography>
                                            </Box>
                                            <Button sx={{ marginTop: "5%", bgcolor: "#ebebeb", color: "#000", alignSelf: "flex-end", display: "flex" }} size="small" className={styles.ListButton}>Go To List</Button>

                                        </Box>
                                    </Box>
                                </Box>
                            );
                        })}

                    </Box>
                    <Box display="flex" justifyContent="center" mb={9.4}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handlePageChange}
                            color="secondary"
                            size="large"
                        />
                    </Box>
                </Container>

                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default UserLists;