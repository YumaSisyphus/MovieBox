import ChairIcon from "@mui/icons-material/Chair";

const Seats = () => {
  const seats = [];
  
  for (let i = 0; i < 100; i++) {
    seats.push(<ChairIcon key={i} />);
  }

  return <div>{seats}</div>;
};

export default Seats;