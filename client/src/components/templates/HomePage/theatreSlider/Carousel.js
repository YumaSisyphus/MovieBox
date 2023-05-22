import React from "react";
import Carousel from "react-material-ui-carousel";
import styles from "./Carousel.module.css";
import Item from "./Item";
import NetflixCinema from "../../../../assets/Theatres/NetflixCinema.jpeg"
import Amc from "../../../../assets/Theatres/Amc.jpeg"

function SliderTheatre() {
  var items = [
    {
      id: 1,
      image: NetflixCinema,
      title: "Cinneplex",
      quote: "Enter a realm of enchantment and witness the magic of live theatre"
    },
    {
      id: 2,
      image: Amc,
      title: "Amc Theatre",
      quote: "Discover the power of live performance as the stage comes alive with captivating stories"
    },
  ];

  return (
    <Carousel
      className={styles.carouselDisplay}
      autoPlay={false}
      navButtonsProps={{
        style: {
          backgroundColor: "#72aeb8",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#72aeb8",
        },
      }}
    >
      {items.map((item, i) => (
        <Item key={item.id} item={item} />
      ))}
    </Carousel>
  );
}

export default SliderTheatre;
