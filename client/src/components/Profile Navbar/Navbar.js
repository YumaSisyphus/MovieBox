import { ThemeProvider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () =>{

    return(
            <ul className={styles.Navbar1}>
          <li>
              <Link to="/profile" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Profile
                </Typography>
              </Link>
            </li>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "70%",
              justifyContent: "space-around",
            }}
          >
            <li>
              <Link to="/usermovie" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText} display="flex" style={{ marginTop: "1px" }}>
                  Watched
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/watchlist" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Watchlist
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/favorite" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText} display="flex" style={{ marginTop: "1px" }}>
                  Favorite
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/userlists" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Lists
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/cinemas" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Reviews
                </Typography>
              </Link>
            </li>
            <li>
              <Link to="/cinemas" className={styles.Links}>
                <Typography variant="body1" className={styles.NavbarText}>
                  Payment history
                </Typography>
              </Link>
            </li>
          </div>
        </ul>
    )
}

export default Navbar;