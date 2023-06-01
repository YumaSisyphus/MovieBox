import styles from "./style.module.css";
import { Container, Typography, Link, ThemeProvider } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import theme from "../../utils/Themes";

const Footer = () => {
  return (
    <div
      style={{ backgroundColor: "#212730"}}
    >
      <ThemeProvider theme={theme}>
        <Container maxWidth="md">
          <ul className={styles.Navbar}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <li>
                <Link underline="none" href="/">
                  <Typography variant="body1" className={styles.NavbarText}>
                    About
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
              <li>
                <Link underline="none" href="/">
                  <Typography variant="body1" className={styles.NavbarText}>
                    Help
                  </Typography>
                </Link>
              </li>
              <li>
                <Link underline="none" href="/">
                  <Typography variant="body1" className={styles.NavbarText}>
                    Contact
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
              <li>
                <Link underline="none" href="/">
                  <Typography variant="body1" className={styles.NavbarText}>
                    Terms
                  </Typography>
                </Link>
              </li>
              <li>
                <Link underline="none" href="/">
                  <Typography variant="body1" className={styles.NavbarText}>
                    Contact
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
              <li style={{ marginLeft: "5%" }}>
                <Link underline="none" href="/" color="secondary">
                  <TwitterIcon />
                </Link>
              </li>
              <li>
                <Link underline="none" href="/" color="secondary">
                  <FacebookIcon />
                </Link>
              </li>
              <li>
                <Link underline="none" href="/" color="secondary">
                  <InstagramIcon />
                </Link>
              </li>
              <li>
                <Link underline="none" href="/" color="secondary">
                  <YouTubeIcon />
                </Link>
              </li>
            </div>
          </ul>

          <Typography variant="body2" color="#aaaaaa" pb={6}>
            © MovieBox. Made by students from UBT. Film data from TMDb.
          </Typography>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Footer;
