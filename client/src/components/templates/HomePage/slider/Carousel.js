import React from "react";
import Carousel from "react-material-ui-carousel";
import styles from "./Carousel.module.css"
import Item from "./Item";
import Hive from "../../../../assets/HIVE.png"
import BeauAfraid from "../../../../assets/movies/BeauAfraid.jpg"
import Midsommar from "../../../../assets/movies/Midsommar.png"

function Slider() {
  var items = [
    {
      id: 1,
      image: Hive,
      title: "Watch In Cinemas Now",
    },
    {
      id: 2,
      image: BeauAfraid,
      title: "Grab Some Snacks",
    },
    {
      id: 3,
      image: Midsommar,
      title: "Have Some Drinks",
    }
  ];

  return (
    <Carousel
      className={styles.carouselDisplay}
      autoPlay={true}
      indicators={false}
      navButtonsAlwaysInvisible={true}
    >
      {items.map((item, i) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}

export default Slider;
