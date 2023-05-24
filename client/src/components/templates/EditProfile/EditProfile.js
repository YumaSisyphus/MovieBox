import { ThemeProvider } from "@emotion/react";
import theme, { Colors } from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import { Container, Typography, Box, TextField, InputAdornment, Button } from "@mui/material";
import styles from "./EditProfile.module.css"
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
// import axios from "axios";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DescriptionIcon from '@mui/icons-material/Description';

const EditProfile = () => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    const { Username, Bio, ProfilePic } = token[0];

    return (
        <ThemeProvider theme={theme}>
            <div>
                <Header />
                <Container maxWidth="md">

                    <Box mt={5} mb={5} ml={2}>
                        <Typography color={Colors.white} variant="h6">
                            Public Profile
                        </Typography>
                        <Typography color="#a6a6a6" variant="body2">
                            People visiting your profile will see the following info
                        </Typography>


                        <Typography
                            mt={5}
                            color={Colors.white}
                            variant="body2"
                            mb={1}>
                            Photo
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Box
                                width={100}
                                height={100}
                                borderRadius={50}
                                sx={{
                                    backgroundImage: `url(${ProfilePic})`,
                                    backgroundSize: "cover"
                                }}>
                            </Box>

                            <Link to="/" className={styles.changePic}>
                                <Typography
                                    color={Colors.black}
                                    className={styles.changePicbutton}
                                    ml={2}>
                                    Change
                                </Typography>
                            </Link>
                        </Box>

                        <Box mt={5}>
                            <TextField
                                label="Username"
                                variant="filled"
                                defaultValue={Username}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <DriveFileRenameOutlineIcon />
                                        </InputAdornment>
                                    ),
                                    style: { backgroundColor: "#ebebeb", borderRadius: "5px", width: "400px" }
                                }}
                            />
                        </Box>

                        <Box mt={5}>
                            <TextField
                                label="Bio"
                                variant="filled"
                                multiline
                                rows={6}
                                defaultValue={Bio}
                                InputProps={{
                                    style: { backgroundColor: "#ebebeb", borderRadius: "5px", width: "400px" }
                                }}
                            />
                        </Box>

                        <Box mt={5}>
                            <Button className={styles.SaveButton}>
                                <Typography
                                    color={Colors.black}
                                    className={styles.SaveText}
                                    ml={2}>
                                    Save Changes
                                </Typography>
                            </Button>
                        </Box>


                    </Box>

                </Container>
                <Footer />
            </div>

        </ThemeProvider>
    )

}

export default EditProfile;