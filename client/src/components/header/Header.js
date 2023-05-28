import { Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./style.module.css";
import logo from "../../assets/logo2.png";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";

const Header = () => {
  const history = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get('token');

  const handleLogout = () => {
    // Clear the token cookie
    cookies.remove("token");

    // Navigate to the "/" page
    history.push("/");
  };

  return (
    <div style={{ backgroundColor: "#212730" }}>
      <Container maxWidth="lg">
        {token ? <ul className={styles.Navbar1}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <li>
              <Link to={token ? "/" : "/welcome"} className={styles.Links}>
                <img width={60} height={60} src={logo} alt="logo" />
              </Link>
            </li>
            <li>
              <Link to={token ? "/" : "/welcome"} className={styles.Links}>
                <Typography variant="h4" className={styles.NavbarHeader1} ml={1}>
                  MovieBox
                </Typography>
              </Link>
            </li>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "50%",
              justifyContent: "space-evenly",
              paddingRight: "15%",
            }}
          >
            <li>
              <Link to="/" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText1}>
                  Home
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/Profile" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText} display="flex" style={{ marginTop: "1px" }}>
                  <AccountCircleIcon sx={{ marginTop: "-2px" }} />Profile
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/Movies" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Films
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/actorPage" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Lists
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Theatres
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout} className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Logout
                </Typography>
              </Link>
            </li>
          </div>
        </ul> : <ul className={styles.Navbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <li>
              <Link
                to={"/"}
                className={styles.Links}
                href="/"
              >
                <img width={60} height={60} src={logo} alt="logo" />
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className={styles.Links}
              >
                <Typography
                  variant="h4"
                  className={styles.NavbarHeader}
                  ml={1}
                >
                  MovieBox
                </Typography>
              </Link>
            </li>
          </div>
          <div style={{ display: "flex", alignItems: "center", width: "50%", justifyContent: "space-evenly", paddingRight: "15%" }}>
            <li>
              <Link
                className={styles.Links}
                to={"/Login"}
              >
                <Typography
                  variant="body1"
                  className={styles.NavbarText}
                >
                  Sign in
                </Typography>
              </Link>
            </li>
            <li>
              <Link
                to={"/Register"}
                className={styles.Links}>
                <Typography
                  variant="body1"
                  className={styles.NavbarText}
                >
                  Create Account
                </Typography>
              </Link>
            </li>
            <li>
              <Link
                to={"/MoviePage"}
                className={styles.Links}>
                <Typography
                  variant="body1"
                  className={styles.NavbarText}
                >
                  Films
                </Typography>
              </Link>
            </li>
            <li>
              <Link
                to={"/actorPage"}
                className={styles.Links}>
                <Typography
                  variant="body1"
                  className={styles.NavbarText}
                >
                  Lists
                </Typography>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className={styles.Links}
              >
                <Typography
                  variant="body1"
                  className={styles.NavbarText}
                >
                  Members
                </Typography>
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className={styles.Links}
              >
                <Typography
                  variant="body1"
                  className={styles.NavbarText}
                >
                  Theatres
                </Typography>
              </Link>
            </li>
            
          </div>
        </ul>}

      </Container>
    </div>
  );
};

export default Header;
