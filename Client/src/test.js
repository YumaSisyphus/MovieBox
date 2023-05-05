import './test.css';
import {useState} from 'react';
const Test = () => {

    const[name, setName] = useState("");
    const[hours, setHours] = useState(0);
    const[minutes, setMinutes] = useState(0);
    const[rating, setRating] = useState(0);
    const[numberReviews, setNumberReviews] = useState(0);
    const[price, setPrice] = useState(0);
    const[image, setImage] = useState(null);
    return (  
            
        <div className="test">

            <div className="info">
            <label> name</label>
            <input type ="text" onChange= {(e) => {
                setName(e.target.value);
            }} 
            />
            <label> hours</label>
            <input type ="number"
            onChange= {(e) => {
                setHours(e.target.value);
            }}  />
            <label> minutes</label>
            <input type ="number" 
            onChange= {(e) => {
                setMinutes(e.target.value);
            }} />
            <label> rating</label>
            <input type ="number" 
            onChange= {(e) => {
                setRating(e.target.value);
            }} />
            <label> numberOfReviews</label>
            <input type ="number"
            onChange= {(e) => {
                setNumberReviews(e.target.value);
            }}  />
            <label> price</label>
            <input type ="number" 
            onChange= {(e) => {
                setPrice(e.target.value);
            }} />
            <label> image</label>
            <input type ="file"
            onChange= {(e) => {
                setImage(e.target.files);
            }}  />
            <button> Add movie</button>
            </div>
        </div>
    );
}
 
export default Test ;