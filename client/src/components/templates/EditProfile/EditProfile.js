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
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./EditProfile.module.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";

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
  "bear.png",
  "cat.png",
  "dog.png",
  "koala.png",
  "panda.png",
  "rabbit.png",
  "sea-lion.png",
  "giraffe.png",
];

const EditProfile = () => {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { UserID } = token[0];
  const [user, setUser] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const handleShowChangePassword = () => {
    setShowChangePassword((prev) => !prev);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };
  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword((prev) => !prev);
  };
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/getUser/${UserID}`);
        setUser(response.data);
        setUsername(response.data.Username);
        setEmail(response.data.Email);
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
    setProfilePic("user.png");
    setOpen(false);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
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
      });
      toast.success("Username, Bio, ProfilePic and Email changed successfully");
      if (showChangePassword) {
        if (
          newPassword.length < 8 ||
          !/[A-Z]/.test(newPassword) ||
          !/[a-z]/.test(newPassword) ||
          !/[0123456789]/.test(newPassword)
        ) {
          toast.error(
            "Password should be at least 8 characters long, contain one uppercase letter, one lowercase letter and one special character"
          );
          return;
        }
        if (newPassword !== confirmPassword) {
          toast.error(
            "Please check if you've typed your new password correctly"
          );
          return;
        }
        await axios
          .put(`/api/editPassword/${UserID}`, {
            password,
            newPassword,
          })
          .then((response) => {
            toast(response.data.msg);
          });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating your profile");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Container maxWidth="md">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "5%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Container maxWidth="md">
              <Box
                mt={5}
                mb={5}
                ml={2}
                sx={{ display: "flex", flexDirection: "column" }}
              >
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

                  <Button onClick={handleOpen} className={styles.changeButton}>
                    Change Avatar
                  </Button>
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
                            src={`images/profile/${avatarItem}`}
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
                            src={`images/profile/${avatarItem}`}
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
                </Box>

                <Box mt={5}>
                  <TextField
                    id="username"
                    name="username"
                    label="Username"
                    variant="filled"
                    defaultValue={username}
                    value={username}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DriveFileRenameOutlineIcon />
                        </InputAdornment>
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
                    id="email"
                    name="email"
                    label="Email"
                    variant="filled"
                    value={email}
                    defaultValue={email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <DriveFileRenameOutlineIcon />
                        </InputAdornment>
                      ),
                      style: {
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        width: "400px",
                      },
                    }}
                    onChange={handleEmailChange}
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
                  <Button
                    className={styles.SaveButton}
                    onClick={handleSaveChanges}
                    sx={{
                      marginRight: "20px",
                    }}
                  >
                    <Typography
                      color={Colors.white}
                      className={styles.SaveText}
                    >
                      Save Changes
                    </Typography>
                  </Button>
                  <Button
                    className={styles.SaveButton}
                    onClick={handleShowChangePassword}
                  >
                    <Typography
                      color={Colors.white}
                      className={styles.SaveText}
                    >
                      Change Password
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Container>
          </div>
          <div
            style={{
              display: showChangePassword ? "flex" : "none",
              flexDirection: "column",
            }}
          >
            <Container maxWidth="md">
              <Box mt={45.5} mb={5} ml={2}>
                <Box mt={5}>
                  <Typography color={Colors.white} variant="h6" mb={2}>
                    Privacy
                  </Typography>
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    variant="filled"
                    type={showPassword ? "text" : "password"}
                    defaultValue=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff color="black" />
                            ) : (
                              <Visibility color="black" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        width: "400px",
                      },
                    }}
                    onChange={handlePasswordChange}
                  />
                </Box>
                <Box mt={5}>
                  <TextField
                    id="newpassword"
                    name="newpassword"
                    label="New Password"
                    variant="filled"
                    type={showNewPassword ? "text" : "password"}
                    defaultValue=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowNewPassword}
                            onMouseDown={handleMouseDownNewPassword}
                            edge="end"
                          >
                            {showNewPassword ? (
                              <VisibilityOff color="black" />
                            ) : (
                              <Visibility color="black" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        width: "400px",
                      },
                    }}
                    onChange={handleNewPasswordChange}
                  />
                </Box>
                <Box mt={5}>
                  <TextField
                    id="confirmpassword"
                    name="confirmpassword"
                    label="Confirm Password"
                    variant="filled"
                    type={showConfirmPassword ? "text" : "password"}
                    defaultValue=""
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start"></InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff color="black" />
                            ) : (
                              <Visibility color="black" />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {
                        backgroundColor: "#ebebeb",
                        borderRadius: "5px",
                        width: "400px",
                      },
                    }}
                    onChange={handleConfirmPasswordChange}
                  />
                </Box>
              </Box>
            </Container>
          </div>
        </div>
      </Container>

      <Footer />
      <ToastContainer theme="colored" />
    </ThemeProvider>
  );
};

export default EditProfile;
