import { useState } from "react";
import styles from "./style.module.css";

const Movie = () => {
    const [activeList, setActiveList] = useState('cast');
    return (  
        <div className={styles.movie_page}> 
        <div className={styles.movie}>
            <div className={styles.movie_background}> </div>
            <div className={styles.container}>
            <div className={styles.movie_img}>
                <img src="/images/movie.jpg"/>
            </div>
            <div className={styles.movie_details}>
                <h1 className={styles.movie_title}> John Wick: Chapter 4</h1>
                
                <p className={styles.movie_desc}> With the price on his head ever increasing,
                 John Wick uncovers a path to defeating The High Table. 
                But before he can earn his freedom,
                 Wick must face off against a new enemy with powerful alliances across the globe and forces that turn old friends into foes.</p>
                 
                 <ul className={styles.movie_labels}>
                <li className={activeList === 'cast' ? `${styles.active}` : ''} onClick={() => setActiveList('cast')}>Cast</li>
                 <li className={activeList === 'crew' ? `${styles.active}` : ''} onClick={() => setActiveList('crew')}>Crew</li>
                 <li className={activeList === 'genres' ? `${styles.active}` : ''} onClick={() => setActiveList('genres')}>Genres</li>
                 <li className={activeList === 'details' ? `${styles.active}` : ''} onClick={() => setActiveList('details')}>Details</li>
          </ul>
                 { activeList === 'cast' && <ul className={styles.movie_cast}>
                    
                    <li> Keanu Reeves </li>
                    <li> Donnie Yen </li>
                    <li> Bill Skarsgard</li>
                    <li> Ian  McShane</li>
                    <li> Laurence Fishburne</li>
                    <li> Lance Reddick </li>
                    <li> Clancy Brown </li>
                    <li> Hirouky Sanada</li>
                    <li> Actor 8</li>
                    <li> Actor 8</li>
                    <li> Actor 8</li>
                    <li> Actor 8</li>
                    <li> Actor 8</li>   
                 </ul>

    }

                 { activeList === 'crew' && <ul className={styles.movie_crew}>
                 <li> Crew 1</li>
                 <li>Crew 2</li>
                 </ul>}

                 {activeList === 'genres' && <ul className={styles.movie_genres}>
                    <li> Genre 1</li>
                    <li> Genre 2</li>
                 </ul>}

                 {activeList ==='details' &&<ul className={styles.movie_det}>
                    <li> Detail 1C</li>
                     </ul>}


            </div>
            <div className={`${styles.logged_out} ${styles.review}`}>
                <div className={styles.review_1}> Sign in to leave a review</div>
                <div className={styles.review_2}> Share</div>
            </div>

            {/* <div className={`${styles.logged_in} ${styles.review}`} >
                <div> Watch -  Watchlist </div>
                <div>  Rate </div>
                <div> Add to a list</div>
                 </div> */}

            

            </div>
            
        </div>
        
        <div className={styles.ticket}>
            Buy a Ticket
        </div>

        

        </div>
    
    );
}
 
export default Movie;