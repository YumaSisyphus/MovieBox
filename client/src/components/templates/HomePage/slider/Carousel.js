import React from "react";
import Carousel from "react-material-ui-carousel";
import styles from "./Carousel.module.css"
import Item from "./Item";
import Hive from "../../../../assets/movies/HiveCover.png"
import BeauAfraid from "../../../../assets/movies/BeauAfraid.jpg"
import FastX from "../../../../assets/movies/FastX.jpg"

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
      title: "Watch In Cinemas Now",
    },
    {
      id: 3,
      image: FastX,
      title: "Watch In Cinemas Now",
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
