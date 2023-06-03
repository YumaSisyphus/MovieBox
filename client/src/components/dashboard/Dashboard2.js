import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import theme, { Colors } from "../../utils/Themes";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/users");
      setUsers(response.data);
    };
    fetchUsers();
  }, []);
  const sendUserInfo = (user) => {
    navigate("/Edit2", { state: { user } });
  };
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
        <Container maxWidth="lg">
          <Box mt={4}>
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              color="#ebebeb"
            >
              User Dashboard
            </Typography>
            <TableContainer
              component={Paper}
              sx={{ backgroundColor: Colors.shaft }}
            >
              <Table style={{ tableLayout: "fixed" }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      User ID
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      Username
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      Bio
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      Profile picture
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      Birthday
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      Created on
                    </TableCell>
                    <TableCell
                      style={{
                        width: "12.5%",
                        color: "#ebebeb",
                        fontSize: "20px",
                      }}
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.UserID}>
                      <TableCell
                        style={{ color: "#ebebeb", verticalAlign: "middle" }}
                      >
                        {user.UserID}
                      </TableCell>
                      <TableCell
                        style={{ color: "#ebebeb", verticalAlign: "middle" }}
                      >
                        {user.Username}
                      </TableCell>
                      <TableCell
                        style={{ color: "#ebebeb", verticalAlign: "middle" }}
                      >
                        {user.Email}
                      </TableCell>
                      <TableCell
                        style={{ color: "#ebebeb", verticalAlign: "middle" }}
                      >
                        {"BIO"}
                      </TableCell>
                      <TableCell
                        style={{ color: "#ebebeb", verticalAlign: "middle" }}
                      >
                        <Box
                          name="profilepic"
                          id="profilepic"
                          width={50}
                          height={50}
                          borderRadius={50}
                          sx={{
                            backgroundImage: `url(${user.ProfilePic})`,
                            backgroundSize: "cover",
                          }}
                        ></Box>
                      </TableCell>
                      <TableCell
                        style={{ color: "#ebebeb", verticalAlign: "middle" }}
                      >
                        {!user.Birthday
                          ? "NULL"
                          : new Date(user.Birthday).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell
                        style={{ color: "#ebebeb", verticalAlign: "middle" }}
                      >
                        {new Date(user.DateCreated).toLocaleDateString("en-GB")}
                      </TableCell>
                      <TableCell style={{ verticalAlign: "middle" }}>
                        <Box display="flex" justifyContent="center" gap={1}>
                          <Button
                            variant="contained"
                            color="primary"
                            style={{ width: "50%" }}
                            onClick={() => sendUserInfo(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="secondary"
                            style={{ width: "50%" }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center">
              <Button variant="contained" color="primary">
                Add User
              </Button>
            </Box>
          </Box>
        </Container>
      </div>
      <Footer />
    </ThemeProvider>
  );
};

export default Dashboard;
