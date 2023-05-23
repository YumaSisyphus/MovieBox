import { Box, Container, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import ChrisPratt from "../../../assets/actors/ChrisPratt.jpg";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import theme from "../../../utils/Themes";

const ActorPage = () => {
  const [showMovies, setShowMovies] = useState(false);
  const handleInput = (e) => {
    setShowMovies(!showMovies);
  };
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          backgroundImage: `linear-gradient(to top, rgba(48, 48, 54), rgba(22, 22, 28))`,
        }}
      >
        <Container
          sx={{
            marginTop: "1%",
            border: "2px solid red",
            width: "80%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div
              style={{
                marginTop: "2%",
                marginRight: "15%",
                width: "25%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  borderRadius: "5%",
                  width: "100%",
                  border: "2px solid blue",
                  // maxHeight: { xs: 203, md: 167 },
                  // maxWidth: { xs: 350, md: 250 },
                }}
                alt="Chriss Pratt"
              // src={`images/actors/${actor.ActorPic}`}//nuk po bon me thirr foton pej DBs kurqysh, fotoja osht edhe te C:\Users\Admin\Lab1\moviebox\client\src\assets\actors\ChrisPratt.jpg
              ></Box>
              <Typography
                style={{
                  marginTop: "5%",
                  fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                  color: "white",
                }}
              >
                Chris Pratt (21.06.1979)
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "60%",
                marginTop: "2%",
              }}
            >
              <Typography
                variant="h4"
                style={{
                  display: "flex",
                  alignSelf: "flex-start",
                  fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                  color: "white",
                }}
                marginBottom="1%"
              >
                Bio
              </Typography>
              <Typography
                style={{
                  fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                  color: "white",
                  marginBottom: "2%",
                }}
              >
                Christopher Michael Pratt (born 21 June 1979) is an American
                actor, known for starring in both television and action films.
                He rose to prominence for his television roles, particularly in
                the NBC sitcom Parks and Recreation (2009–2015), for which he
                received critical acclaim and was nominated for the Critics'
                Choice Television Award for Best Supporting Actor in a Comedy
                Series in 2013. He also starred earlier in his career as Bright
                Abbott in The WB drama series Everwood (2002–2006) and had roles
                in Wanted (2008), Jennifer's Body (2009), Moneyball (2011), The
                Five-Year Engagement (2012), Zero Dark Thirty (2013), Delivery
                Man (2013), and Her (2013). Pratt achieved leading man status in
                2014, starring in two critically and commercially successful
                films: The Lego Movie as Emmet Brickowski, and Marvel Studios'
                Guardians of the Galaxy as Star-Lord. He starred in Jurassic
                World (2015) and Jurassic World: Fallen Kingdom (2018), and he
                reprised his Marvel role in Guardians of the Galaxy Vol. 2
                (2017), Avengers: Infinity War (2018), Avengers: Endgame (2019),
                and the planned Guardians of the Galaxy Vol. 3. Meanwhile, in
                2016 he was part of an ensemble cast in The Magnificent Seven
                and the male lead in Passengers. Description above is from the
                Wikipedia article Chris Pratt, licensed under CC-BY-SA, full
                list of contributors on Wikipedia.
              </Typography>
            </div>
          </div>
          <div
            style={{
              marginTop: "5%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              border: "2px solid green",
            }}
          >
            <Box
              component="img"
              sx={{
                borderRadius: "5%",
                width: "20%",
                border: "2px solid blue",
                // maxHeight: { xs: 203, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="Chriss Pratt"
              src={ChrisPratt}
            />
            <Box
              component="img"
              sx={{
                borderRadius: "5%",
                width: "20%",
                border: "2px solid blue",
                // maxHeight: { xs: 203, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="Chriss Pratt"
              src={ChrisPratt}
            />
            <Box
              component="img"
              sx={{
                borderRadius: "5%",
                width: "20%",
                border: "2px solid blue",
                // maxHeight: { xs: 203, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="Chriss Pratt"
              src={ChrisPratt}
            />
            <Box
              component="img"
              sx={{
                borderRadius: "5%",
                width: "20%",
                border: "2px solid blue",
                // maxHeight: { xs: 203, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
              alt="Chriss Pratt"
              src={ChrisPratt}
            />
          </div>
          <IconButton
            onClick={handleInput}
            disableRipple
            disableFocusRipple
            style={{ marginBottom: "2%", marginTop: "2%" }}
          >
            <Typography
              style={{
                fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                color: "white",
              }}
            >
              Load more movies
            </Typography>
            {showMovies ? (
              <ArrowDropDownIcon color="white" />
            ) : (
              <ArrowDropUpIcon color="white" />
            )}
          </IconButton>
          {showMovies ? (
            <></>
          ) : (
            <div style={{ marginTop: "-5%" }}>
              {" "}
              <div
                style={{
                  marginTop: "5%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "2px solid green",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
              </div>
              <div
                style={{
                  marginTop: "5%",
                  marginBottom: "5%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "2px solid green",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
              </div>
              <div
                style={{
                  marginTop: "5%",
                  marginBottom: "5%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  border: "2px solid green",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
                <Box
                  component="img"
                  sx={{
                    borderRadius: "5%",
                    width: "20%",
                    border: "2px solid blue",
                    // maxHeight: { xs: 203, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
                  alt="Chriss Pratt"
                  src={ChrisPratt}
                />
              </div>
            </div>
          )}
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  );
};
export default ActorPage;
