import { Container, ThemeProvider } from "@mui/material";
import theme from "../../../utils/Themes";
import styles from "./CinemaPage.module.css";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Box, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import Thisio from "../../../assets/Theatres/Thisio.jpg"
import { useEffect, useState } from "react";

const CinemaPage = () => {
    const { id } = useParams();
    const [cinemaData, setCinemaData] = useState(null);
  
    const fetchCinemaData = async () => {
      try {
        const response = await fetch(`/api/getCinema/${id}`);
        const data = await response.json();
        setCinemaData(data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchCinemaData();
    }, [id]);

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header />
                <Box width="100%" height="80vh" sx={{ position: "relative" }}>
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${Thisio})`,
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center",
                            filter: "brightness(40%)",
                            position: "absolute",
                            zIndex: "0"
                        }}>
                    </Box>
                    <Typography
                        pt={15}
                        pl={10}
                        className={styles.BannerQuote}>Cinema Thisio
                    </Typography>

                    <Typography
                        zIndex="10"
                        position="inherit"
                        width={700}
                        mt={3}
                        pl={10}
                        mb={10}
                        fontSize="34px"
                        letterSpacing="2px"
                        color="#ebebeb">
                        Built in 1935, this spring–summer outdoor movie theater features gourmet nibbles & Acropolis views
                    </Typography>
                    <Link className={styles.CinemaButton}>
                        Get Tickets Here
                    </Link>
                </Box>
                <Container maxWidth="md">

                </Container>

                <Box mb={20}>

                </Box>

                <Footer />
            </div>
        </ThemeProvider>
    )
}

export default CinemaPage;