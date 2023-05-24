import { useParams } from "react-router-dom";

const MovieDetails = () => {
    const{ id } = useParams()
    return ( 
        <h2>Test - {id}</h2>
     );
}
 
export default MovieDetails;