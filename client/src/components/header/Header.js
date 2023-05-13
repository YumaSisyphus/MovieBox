import { Container, Typography } from "@mui/material";
// import { theme } from "../../../utils/theme";
import styles from "./style.module.css"
import logo from "../../assets/logo2.png"
// import ReactSearchBox from "react-search-box";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div style={{ backgroundColor: "#212730" }}>
            <Container
                maxWidth="lg"
            >
                <ul className={styles.Navbar}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <li>
                            <Link
                                to={1}
                            >
                                <img width={60} height={60} src={logo} alt="logo" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={"/"}
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
                                to={"/Profile"}
                            >
                                <Typography
                                    variant="body1"
                                    className={styles.NavbarText}
                                >
                                    Profile
                                </Typography>
                            </Link>
                        </li>
                        <li>
                            <Link to={"/MoviePage"}>
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
                                to={"/MovieList"}>
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
                                underline="none"
                                href="/">
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
                                underline="none"
                                href="/">
                                <Typography
                                    variant="body1"
                                    className={styles.NavbarText}
                                >
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

    )
}

export default Header;