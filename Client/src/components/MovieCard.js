import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { AccessTime } from '@mui/icons-material'
import Rating from '@mui/material/Rating';
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

const MovieCard = ({movie}) => {

    return ( 
        
        <Grid item xs={3} sx={{
           height: 335
            
        }}>
            <ThemeProvider theme={theme}>
            <Link  to={`/movies/${movie.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
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
            <img src={movie.image} alt="" class="img" />
         <div class="image-overlay">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                 <p style={{ marginBottom: 0 }}>See More</p>
                <ArrowCircleRightIcon sx={{ width: 300, height: 50, color: '#9400D3' }} />
            </div>
        </div>
    </div>
                

                {/* <Box paddingX={1} sx={{
                  
                   
                  
                }}>
               
                <Typography variant="subtitle2" component="h2" className="card-text " >
                    {movie.name}
             
                    
                </Typography>
                <Box
                    sx ={{
                        display: "flex",
                        alignItems: "center"
                    }}
                 >
                    <AccessTime sx={{width:12.5}} className="card-text hidden" />
                        <Typography variant="body2" component="p" marginLeft={0.5} className="card-text hidden" >
                            {movie.hours}h {movie.minutes}m
                        </Typography>
                </Box>
                <Box
                sx ={{
                    display: "flex",
                    alignItems: "center"
                    
                }}
                marginTop= {3}
                >
                    
                   <Rating name="read-only" value={movie.rating} readOnly precision={0.5} size="small"  sx={{
                                
                                  
                    }}/>
                   <Typography variant="body2" component="p" marginLeft={0.5}  >
                      {movie.rating}/5
                        </Typography>  
                        <Typography variant="body3" component="p" marginLeft={1.5} className="card-text hidden">
                           ({movie.numberOfReviews} reviews)
                        </Typography>  

                </Box>
                <Box>
                <Typography variant="h6" component="h3" marginTop={0} className="card-text hidden">
                        ${movie.price}
                    </Typography>
                    
                           
                     </Box>
                </Box>
                 */}
                
            </Paper>
            </Link>
            </ThemeProvider>
            
        </Grid>
        
     );
}
 
export default MovieCard;