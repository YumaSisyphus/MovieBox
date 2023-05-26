import { ThemeProvider } from "@emotion/react";
import theme, { Colors } from "../../../utils/Themes";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import styles from "./EditProfile.module.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
// import axios from "axios";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

// const initalState = {
//   username: "",
//   bio: "",
//   profilepic: "",
// };

const EditProfile = () => {
  // const [state, setState] = useState(initalState);
  // const { username, bio, profilepic } = state;
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { UserID } = token[0];
  const handleSubmit = (e) => {
    // e.preventDefault();
    // axios
    //   .post("http://localhost:5000/api/editProfile", {
    //     userId: UserID,
    //     profilePic: state.profilepic,
    //     username: state.username,
    //     bio: state.bio,
    //   })
    //   .then((response) => {
    //     if (response.data.msg) {
    //       toast.error(response.data.msg);
    //     } else {
    //       setState(initalState);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     toast.error("An error occurred while saving changes");
    //   });
  };
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/getUser/${UserID}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
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

            <Typography mt={5} color={Colors.white} variant="body2" mb={1}>
              Photo
            </Typography>
            <Box display="flex" alignItems="center">
              <Box
                name="profilepic"
                id="profilepic"
                width={100}
                height={100}
                borderRadius={50}
                sx={{
                  backgroundImage: `url(images/profile/${user.ProfilePic})`,
                  backgroundSize: "cover",
                }}
              ></Box>

              <Link to="/" className={styles.changePic}>
                <Typography
                  color={Colors.black}
                  className={styles.changePicbutton}
                  ml={2}
                >
                  Change
                </Typography>
              </Link>
            </Box>

            <Box mt={5}>
              <TextField
                id="username"
                name="username"
                onChange={handleSubmit}
                label="Username"
                variant="filled"
                defaultValue={user.Username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  style: {
                    backgroundColor: "#ebebeb",
                    borderRadius: "5px",
                    width: "400px",
                  },
                }}
              />
            </Box>

            <Box mt={5}>
              <TextField
                id="bio"
                name="bio"
                onChange={handleSubmit}
                label="Bio"
                variant="filled"
                multiline
                rows={6}
                defaultValue={user.Bio}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  style: {
                    backgroundColor: "#ebebeb",
                    borderRadius: "5px",
                    width: "400px",
                  },
                }}
              />
            </Box>

            <Box mt={5}>
              <Button onClick={handleSubmit} className={styles.SaveButton}>
                <Typography
                  color={Colors.black}
                  className={styles.SaveText}
                  ml={2}
                >
                  Save Changes
                </Typography>
              </Button>
            </Box>
          </Box>
        </Container>
        <Footer />
      </div>
      <ToastContainer theme="colored" />
    </ThemeProvider>
  );
};

export default EditProfile;
