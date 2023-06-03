import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Paper,
  ThemeProvider,
  Modal,
} from "@mui/material";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import theme from "../../utils/Themes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#15181c",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const avatars = [
  "Profile/bear.png",
  "Profile/cat.png",
  "Profile/dog.png",
  "Profile/koala.png",
  "Profile/panda.png",
  "Profile/rabbit.png",
  "Profile/sea-lion.png",
  "Profile/giraffe.png",
];
const curentDate = new Date();
const minDate = new Date(
  curentDate.getFullYear() - 16,
  curentDate.getMonth(),
  curentDate.getDate()
);

const EditPage = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setError] = useState(null);

  const location = useLocation();
  const userinfo = location.state?.user;

  useEffect(() => {
    const fetchUser = async () => {
      const UserID = userinfo?.UserID;
      const response = await axios.get(`/api/getUser/${UserID}`);
      setUser(response.data);
      setUsername(response.data.Username);
      setEmail(response.data.Email);
      setBio(response.data.Bio);
      setProfilePic(response.data.ProfilePic);
      const tempDate = new Date(response.data.Birthday);
      setBirthday(tempDate);
      setLoading(false);
    };
    fetchUser();
  }, []);
  console.log(birthday);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };
  const handleProfilePicChange = (avatarItem) => {
    setProfilePic(avatarItem);
    setOpen(false);
  };
  const handleProfilePicDelete = () => {
    setProfilePic("Profile/user.png");
    setOpen(false);
  };
  const handleDateChange = (date) => {
    setBirthday(date);
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async () => {
    try {
      const UserID = userinfo?.UserID;
      const responseUsername = await axios.get(
        `/api/checkUsernameEdit/${username}`
      );
      const responseUsernameID = await axios.get(
        `/api/checkUsernameEditID/${UserID}`
      );
      const responseEmail = await axios.get(`/api/checkEmailEdit/${email}`);
      const responseEmailID = await axios.get(
        `/api/checkEmailEditID/${UserID}`
      );
      const emailExists = responseEmail.data.exists;
      const usernameExists = responseUsername.data.exists;
      if (usernameExists && username !== responseUsernameID.data) {
        toast.error(
          "Username already exists. Please choose a different username."
        );
        return;
      }
      if (emailExists && email !== responseEmailID.data) {
        toast.error("Email already exists. Please choose a different email.");
        return;
      }
      if (!username && !email) {
        toast.error("Please fill all the fileds");
        return;
      }
      if (username.length < 5) {
        toast.error("Username must be at least 5 characters");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please check if you have written your email correctly");
        return;
      }
      await axios.put(`/api/editProfile/${UserID}`, {
        username,
        bio,
        profilePic,
        email,
        birthday: format(birthday, "dd/MM/yyyy"),
      });
      toast.success("Username, Bio, ProfilePic and Email changed successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    }
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Typography>Loading...</Typography>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          height: "77vh",
          backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="sm">
          <Paper style={{ padding: "2rem" }}>
            <Typography variant="h4" align="center" gutterBottom>
              Edit User
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center" mb={2}>
                  <Grid item>
                    <Box
                      width={100}
                      height={100}
                      borderRadius={50}
                      sx={{
                        backgroundImage: `url(${profilePic})`,
                        backgroundSize: "cover",
                      }}
                    ></Box>
                  </Grid>
                  <Grid item>
                    <Button onClick={handleOpen}>Change Avatar</Button>
                  </Grid>
                </Grid>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    sx={style}
                  >
                    <Button
                      onClick={handleClose}
                      style={{
                        display: "flex",
                        alignSelf: "flex-end",
                        color: "white",
                        marginTop: "-6%",
                        marginRight: "-9%",
                      }}
                    >
                      <CloseIcon />
                    </Button>
                    <Box display="flex" justifyContent="space-between">
                      {avatars.slice(0, 4).map((avatarItem) => (
                        <Box
                          component="img"
                          name="profilepic"
                          id="profilepic"
                          width={100}
                          height={100}
                          borderRadius={50}
                          src={`${avatarItem}`}
                          alt={`${avatarItem}`}
                          sx={{
                            cursor: "pointer",
                            border: "3px solid transparent",
                            transition:
                              "border-color 0.4s, height 0.4s, width 0.4s",
                            "&:hover": {
                              height: 110,
                              width: 110,
                              borderColor: "#2A9D8F",
                            },
                          }}
                          onClick={() => handleProfilePicChange(avatarItem)}
                        />
                      ))}
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      {avatars.slice(4).map((avatarItem) => (
                        <Box
                          component="img"
                          name="profilepic"
                          id="profilepic"
                          width={100}
                          height={100}
                          borderRadius={50}
                          src={`${avatarItem}`}
                          alt={`${avatarItem}`}
                          sx={{
                            cursor: "pointer",
                            border: "3px solid transparent",
                            transition:
                              "border-color 0.4s, height 0.4s, width 0.4s",
                            "&:hover": {
                              height: 110,
                              width: 110,
                              borderColor: "#2A9D8F",
                            },
                          }}
                          onClick={() => handleProfilePicChange(avatarItem)}
                        />
                      ))}
                    </Box>
                    <Button
                      onClick={handleProfilePicDelete}
                      style={{
                        display: "flex",
                        alignSelf: "flex-start",
                        color: "white",
                        marginBottom: "-5%",
                      }}
                    >
                      Delete avatar
                    </Button>
                  </Box>
                </Modal>
                <TextField
                  label="Username"
                  variant="outlined"
                  defaultValue={username}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  defaultValue={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Bio"
                  fullWidth
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue={bio}
                  onChange={handleBioChange}
                />
              </Grid>
              <LocalizationProvider
                sx={{ borderColor: "#fff" }}
                dateAdapter={AdapterDateFns}
              >
                <DatePicker
                  sx={{
                    marginTop: "1vh",
                    "& input": {},
                    "& .MuiSvgIcon-root": {},
                  }}
                  format="dd/MM/yyyy"
                  maxDate={minDate}
                  defaultValue={birthday}
                  onError={(newError) => setError(newError)}
                  slotProps={{
                    textField: {
                      helperText: errorMessage,
                    },
                  }}
                  views={["year", "month", "day"]}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Grid>
            <Box mt={2} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
              >
                Update
              </Button>
            </Box>
          </Paper>
        </Container>
      </div>
      <Footer />
      <ToastContainer theme="colored" />
    </ThemeProvider>
  );
};

export default EditPage;
