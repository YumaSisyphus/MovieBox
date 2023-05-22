import { Paper } from "@mui/material";
import styles from "./Carousel.module.css";
import { Link } from "react-router-dom";

function Item(props) {
    return (
        <Paper>
            <div className={styles.container}>
                <img
                    className={styles.sliderImage}
                    src={props.item.image}
                    width={1600}
                    height={577}
                    alt={"Image"} />

                <div
                    className={styles.sliderShadow}>
                </div>

                <div
                    className={styles.container2}
                >


                    <h2
                        className={styles.title}
                    >
                        {props.item.title}
                    </h2>

                    <p className={styles.sliderQuote}>
                        {props.item.quote}
                    </p>

                    <Link
                        to="/">
                        <button
                            className={styles.button1}
                        >
                            Buy Tickets Now
                        </button>
                    </Link>
                </div>
            </div>
        </Paper>
    );
}

export default Item;
