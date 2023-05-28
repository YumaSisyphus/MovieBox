import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider} from '@mui/material';
import { Link } from "react-router-dom";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


const theme = createTheme({
    components: {
        MuiTypography:{
            variants: [
                {
                    props: {
                        variant: "body2"
                    },
                    style: {
                        fontSize: 11,
                    },
                },
                {
                    props: {
                        variant: "body3"
                    },
                    style: {
                        fontSize: 9,
                    },
                },
            
             ]
        }
    }
})

const MovieListCard = ({movies}) => {

    return ( 
        
        <Grid item xs={3} sx={{
           height: 225
            
        }}>
            <ThemeProvider theme={theme}>
            <Link  to={`/movies/${movies.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
            <Paper elevation  = {3} sx={{
                 position: "relative",
                 boxShadow: 3,
                 transition: "transform 0.3s",
                 "&:hover": {
                   transform: "scale(1.02)",
                   "&::before": {
                     content: "''",
                     top: "75%",
                     left: "50%",
                     transform: "translate(-50%, -50%)",
                     position: "absolute",
                     fontSize: "1rem",
                     fontWeight: "bold",
                     color: "#A020F0",
                     fontFamily: "monospace",
                   }},
  "&:hover": {
   
    background:"black"
  
  },
  "&:hover img": {
    opacity:0.5,
   
  },
  '.hidden': {
    display:'none'
  },
  "&:hover .card-text": {
    color: "#3E3E3E",
    display:'block',
    marginBottom:'0px',
   
    
  },
  
  
}}> 

        <div class="image-container">
            <img src={movies.image} alt="" class="img" style={{height: 200, width: '355px', objectFit: 'contain'}}/>
         <div class="image-overlay">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <p style={{ marginBottom: 0 }}>See More</p>
                <ArrowCircleRightIcon sx={{ width: 300, height: 50, color: '#6F1694' }} />
            </div>
        </div>
    </div>
                

               
                
            </Paper>
            </Link>
            </ThemeProvider>
            
        </Grid>
        
     );
}
 
export default MovieListCard;