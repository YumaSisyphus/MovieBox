import { Box, Container, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import ChrisPratt from "../../../assets/actors/ChrisPratt.jpg";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import theme from "../../../utils/Themes";
import { useLocation } from "react-router-dom";

const ActorPage = () => {
  const location = useLocation();
  const actor = location.state.actor;
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
          }}
          maxWidth="md"
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
                style={{
                  borderRadius: "5%",
                  width: "100%",
                  border: "2px solid blue",
                  // maxHeight: { xs: 203, md: 167 },
                  // maxWidth: { xs: 350, md: 250 },
                }}
                alt="Chriss Pratt"
                src="images/actors/ChrisPratt.jpg"//nuk po bon me thirr foton pej DBs kurqysh, fotoja osht edhe te C:\Users\Admin\Lab1\moviebox\client\src\assets\actors\ChrisPratt.jpg
              ></Box>
              <Typography
                style={{
                  marginTop: "5%",
                  fontFamily: "TiemposTextWeb-Regular,Georgia,serif",
                  color: "white",
                }}
              >
                {actor.FirstName} {actor.LastName} (
                {new Date(actor.DateOfBirth).toLocaleDateString()}
                {actor.DateOfDeath
                  ? ` - ${new Date(actor.DateOfDeath).toLocaleDateString()}`
                  : ""}
                )
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
                {actor.Description}
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
