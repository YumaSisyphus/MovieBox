import './Search.css';
import films from "./data.json";
import { Link } from 'react-router-dom';
import { useState } from 'react';


const Search = ({ placeholder }) => {
    const [filteredData, setFilteredData] = useState([]);
    const handleFilter = (event) => {
        const searchWord = (event.target.value).toLowerCase();

        const newFilter = films.map((film) => film.movies.filter((movie) => ((movie.name).toLowerCase()).includes(searchWord)));

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
        console.log(filteredData);
    }

    return (
        <div className="search">
            <div className="searchInputs">
                <input type="text" placeholder={placeholder} onChange={handleFilter} />
            </div>
            {filteredData.length !== 0 && (
                <div className="dataResult">
                    {filteredData.map((film) => (
                        <div>
                            {film.map((movie, id) => {
                                return <Link to={`/movies/${movie.id}`} className="dataItem" style={{ textDecoration: "none" }}>
                                    <p>{movie.name}</p></Link>
                            }
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Search;
