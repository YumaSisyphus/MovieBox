import { ThemeProvider, Typography, Box, Container, Rating, Button, Pagination } from "@mui/material";
import theme from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import styles from "./Lists.module.css";
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
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const response = await axios.get(`/api/getLists`);
                const listsData = response.data;
                setLists(listsData);
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };
        fetchLists();
    }, []);

    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedLists = list.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setPage(value);
    };


    return (
        <ThemeProvider theme={theme}>
            <div
               style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
                backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
              }}
            >
                <Header />
                <Container maxWidth="md" style={{ flex: "1 0 auto" }}>

                    <Typography ml={2} mt={7} variant="h5" color="#ebebeb">
                        Lists
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
                                        sx={{
                                            borderRadius: "5px",
                                            // backgroundImage: `url(${lists.Cover})`,
                                            // backgroundSize: "cover",
                                            // backgroundRepeat: "no-repeat",
                                            // backgroundPosition: "center",
                                            // filter: "brightness(30%)",
                                            // cursor: "pointer"
                                        }}
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
                                                <Typography mt={0.2} color="#b0b0b0" mb={5}>{lists.Username}</Typography>
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

export default Lists;