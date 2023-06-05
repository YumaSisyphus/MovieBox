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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./AddPage.module.css";
import {  useNavigate } from "react-router-dom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  useState } from "react";

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

const EditProfile = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState(null);
  const [profilePic, setProfilePic] = useState("Profile/user.png");
  const [birthday, setBirthday] = useState(null);
  const [userType, setUserType] = useState();
  const [errorMessage, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleDateChange = (date) => {
    const formattedDate = format(date, "dd/MM/yyyy");
    setBirthday(formattedDate);
  };
  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      if (!username || !email || !password || !userType) {
        toast.error("Please fill the required* fields");
      } else if (username.length < 5) {
        toast.error("Username must be at least 5 characters");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please check if you have written your email correctly");
      } else if (
        password.length < 8 ||
        !/[A-Z]/.test(password) ||
        !/[a-z]/.test(password) ||
        !/[0123456789]/.test(password)
      ) {
        toast.error(
          "Password should be at least 8 characters long, contain one uppercase letter, one lowercase letter and one special character"
        );
      } else if (password !== confirmPassword) {
        toast.error("Please check if you've typed your password correctly");
      } else {
        axios
          .get(`/api/checkUserRegister?username=${username}&email=${email}`)
          .then((response) => {
            const userExists = response.data.exists;
            if (userExists) {
              toast.error(
                "User already exists. Please choose a different username or email."
              );
            } else {
              axios
                .post("/api/addUser", {
                  username,
                  email,
                  password,
                  bio,
                  profilePic,
                  userType,
                  birthday,
                })
                .then(() => {
                  setTimeout(() => {
                    navigate("/Dashboard");
                  }, 500);
                })
                .catch((err) => toast.error(err.response.data));
            }
          });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred while creating this user");
    }
  };
  console.log(userType);
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundImage: `linear-gradient(to top, rgba(26, 26, 36), rgba(22, 22, 28))`,
          gap: "5%",
        }}
      >
        <Container maxWidth="md" sx={{ display: "flex", flexDirection: "row" }}>
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
                      backgroundImage: `url(${profilePic})`,
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
                        {avatars.slice(0, 4).map((avatarItem, index) => (
                          <Box
                            component="img"
                            name="profilepic"
                            id="profilepic"
                            width={100}
                            height={100}
                            borderRadius={50}
                            key={index}
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
                        {avatars.slice(4).map((avatarItem, index) => (
                          <Box
                            component="img"
                            name="profilepic"
                            id="profilepic"
                            width={100}
                            height={100}
                            borderRadius={50}
                            key={index}
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
                </Box>

                <Box mt={5}>
                  <TextField
                    id="username"
                    name="username"
                    label="Username*"
                    variant="filled"
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
                    label="Email*"
                    variant="filled"
                    value={email}
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
                  <FormControl
                    sx={{
                      minWidth: 140,
                      backgroundColor: "#ebebeb",
                      borderRadius: "4px",
                    }}
                    size="small"
                  >
                    <InputLabel>User type*</InputLabel>
                    <Select
                      name="userType"
                      id="userType"
                      label="User type*"
                      onChange={handleUserTypeChange}
                      defaultValue=""
                    >
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Theatre">Theatre</MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box mt={5}>
                  <LocalizationProvider
                    sx={{ borderColor: "#ebebeb" }}
                    dateAdapter={AdapterDateFns}
                  >
                    <DatePicker
                      sx={{
                        backgroundColor: "#ebebeb",
                        borderRadius: "4px",
                        "& .MuiSvgIcon-root": { color: "rgba(0,0,0,0.6)" },
                        "& .MuiFormLabel-root": {
                          color: "rgba(0,0,0,0.6)",
                          marginTop: "10px",
                        },
                        input: {
                          padding: "20px",
                          borderColor: "#ccc",
                          borderRadius: "4px",
                          backgroundColor: "#ebebeb",
                        },
                        label: {
                          backgroundColor: "rgba(200,200,200,0)",
                        },
                      }}
                      format="dd/MM/yyyy"
                      variant="filled"
                      label="Birthday"
                      maxDate={minDate}
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
                </Box>
              </Box>
            </Container>
          </div>
          <div
            style={{
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
                    label="Password*"
                    variant="filled"
                    type={showPassword ? "text" : "password"}
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
                    id="confirmpassword"
                    name="confirmpassword"
                    label="Confirm Password*"
                    variant="filled"
                    type={showConfirmPassword ? "text" : "password"}
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
        </Container>
      </div>
      <Footer />
      <ToastContainer theme="colored" />
    </ThemeProvider>
  );
};

export default EditProfile;
