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
  Modal,
} from "@mui/material";
import styles from "./EditProfile.module.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DescriptionIcon from "@mui/icons-material/Description";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "25%",
  bgcolor: "#15181c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const avatars = [
  "bear.png",
  "cat.png",
  "dog.png",
  "koala.png",
  "panda.png",
  "rabbit.png",
  "sea-lion.png",
  "user.png",
];

const EditProfile = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { UserID } = token[0];
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/getUser/${UserID}`);
        setUser(response.data);
        setUsername(response.data.Username);
        setBio(response.data.Bio);
        setProfilePic(response.data.ProfilePic);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`/api/editProfile/${UserID}`, {
        username,
        bio,
        profilePic,
      });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    }
  };

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
                  backgroundImage: `url(images/profile/${profilePic})`,
                  backgroundSize: "cover",
                }}
              ></Box>

              <Button onClick={handleOpen}>Open modal</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box display="flex" flexDirection="column" justifyContent="center" sx={style}>
                  <Box display="flex" justifyContent="space-between"  >
                  {avatars.slice(0, 4).map((avatarItem) => (
                    <Box
                      name="profilepic"
                      id="profilepic"
                      width={100}
                      height={100}
                      borderRadius={50}
                      sx={{
                        backgroundImage: `url(images/profile/${avatarItem})`,
                        backgroundSize: "cover",
                      }}
                    />
                  ))}
                  </Box>
                  <Box display="flex" justifyContent="space-between" >
                  {avatars.slice(4, ).map((avatarItem) => (
                    <Box
                      name="profilepic"
                      id="profilepic"
                      width={100}
                      height={100}
                      borderRadius={50}
                      sx={{
                        backgroundImage: `url(images/profile/${avatarItem})`,
                        backgroundSize: "cover",
                      }}
                    />
                  ))}
                </Box>
                </Box>
              </Modal>
            </Box>

            <Box mt={5}>
              <TextField
                id="username"
                name="username"
                label="Username"
                variant="filled"
                multiline
                defaultValue={username}
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
                onChange={handleUsernameChange}
              />
            </Box>

            <Box mt={5}>
              <TextField
                id="bio"
                name="bio"
                label="Bio"
                variant="filled"
                multiline
                rows={6}
                defaultValue={bio}
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
                onChange={handleBioChange}
              />
            </Box>

            <Box mt={5}>
              <Button className={styles.SaveButton} onClick={handleSaveChanges}>
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
