import { Container, Typography, Link } from "@mui/material";
// import { theme } from "../../../utils/theme";
import styles from "./style.module.css";
import logo from "../../assets/logo2.png";
// import ReactSearchBox from "react-search-box";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
  return (
    <div style={{ backgroundColor: "#0d2129" }}>
      <Container maxWidth="lg">
        <ul className={styles.Navbar}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <li>
              <Link underline="none" href="/">
                <img width={60} height={60} src={logo} alt="logo" />
              </Link>
            </li>
            <li>
              <Link underline="none" href="/">
                <Typography variant="h4" className={styles.NavbarHeader} ml={1}>
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
              <Link underline="none" href="/Profile">
                <Typography variant="body1" className={styles.NavbarText}>
                  Profile
                </Typography>
              </Link>
            </li>
            <li>
              <Link underline="none" href="/">
                <Typography variant="body1" className={styles.NavbarText}>
                  Films
                </Typography>
              </Link>
            </li>
            <li>
              <Link underline="none" href="/">
                <Typography variant="body1" className={styles.NavbarText}>
                  Lists
                </Typography>
              </Link>
            </li>
            <li>
              <Link underline="none" href="/">
                <Typography variant="body1" className={styles.NavbarText}>
                  Members
                </Typography>
              </Link>
            </li>
            <li>
              <Link underline="none" href="/">
                <Typography variant="body1" className={styles.NavbarText}>
                  Theatres
                </Typography>
              </Link>
            </li>
            {/* <li>
                            <ReactSearchBox
                                placeholder="Search..."
                                leftIcon={<SearchIcon />}
                                data={[
                                    {
                                        key: "enemy",
                                        value: "Enemy"
                                    },
                                    {
                                        key: "Hive",
                                        value: "Hive"
                                    },
                                ]}
                            />
                        </li> */}
          </div>
        </ul>
      </Container>
    </div>
  );
};

export default Header;
