import {
Box, Grid, Typography, Link, ButtonGroup, Button, Modal, Checkbox, IconButton, ListItemButton,
List, ListItemIcon, ListItemText
 } from '@mui/material';
import Container from '@mui/material/Container';
import styled from '@emotion/styled';
import { useState } from 'react';
import styles from "./style.module.css";
import { breakpoints } from '@mui/system';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
LabelList, Label, StyledList, LoggedOutBox, StyledLink, LoggedInBox, StyledButton, TrailerBox,StyledListItemIcon

} from './MovieStyles';
import {theme}  from './MovieStyles';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';




const Movie = () => {
    const [activeList, setActiveList] = useState('cast');
    const [loggedIn,setLoggedIn] = useState(true);
    const [open, setOpen] = useState(false);
    const[movie, setMovie] = useState({});
    const {id} = useParams();
    
    useEffect( ()=>{
        axios.get(`http://localhost:5000/api/get/${id}`).then((res)=>setMovie({...res.data[0]}))

    }, [id]);





    return (
        <ThemeProvider theme={theme}> 
        <Box
        sx={{
          backgroundColor: "#14181C", 
          minHeight: "100vh",
          padding:0
        }}
      >
        <Container min sx={{
            
            // height: "100vh",
            width:"1500px",
            bgcolor:"#14181C"
            
            
        }}>
            <Box sx={{
                
                height:"500px",
                backgroundImage:`url(${movie.Cover})`,
                backgroundRepeat:"no-repeat",
                backgroundSize: "100%",
                boxShadow:"inset 10px -100px 20px 5px #14181C, inset 20px -60px 100px 50px #14181C, inset -20px -100px 100px 50px #14181C;"
            }}>
                
            </Box>
            <Box  sx={{
                display:"flex",
                
                mt:-16,
                ml:12
                
               
            }}>
                <Grid container gap={10}  >
                    <Grid item md={2.5} xs={2}  sx={{
                        height: "340px",        
                        margin:"auto", // 
                        boxShadow:"0 0 1px #def",
                        maxWidth:"none",
                       
                        
                    }}>
                        
                        <img src={movie.Thumbnail} alt="Movie" style={{ width: "100%", height: "100%" }} />
                    </Grid>
                    
                    <Grid item md={4.5} xs={4} sx={{
                        display:"block",
                        margin:"auto",
                        // border:"1px solid white",
                        maxWidth:"none",
                        height:"320px",
                        textAlign:"center",
                        mt: -1
                    }}>

                        
                       
                        <Typography variant="h4" component="p" sx={{
                            color:"#fff",
                            mb:2,
                            fontFamily:"Libre Baskerville"
                            
                            
                        }}>
                            {movie.Title}
                        </Typography>
                        
                         
                        <Typography variant="p" sx={{
                            color:"#99AABB",
                            fontSize:"16px",
                            
                        }}>
                        {movie.Description}

                        </Typography>
                        <LabelList>
                            <Label  onClick={e=>setActiveList("cast")}> Cast </Label>
                            <Label onClick={e=>setActiveList("crew")}>Crew</Label>
                            <Label onClick={e=>setActiveList("genres")} >Genres</Label>
                            <Label  onClick={e=>setActiveList("details")}>Details</Label>
                            
                        </LabelList>

                        { activeList === 'cast' && <ul >
                    
                    <StyledList> Keanu Reeves </StyledList>
                    <StyledList> Donnie Yen </StyledList>
                    <StyledList> Bill Skarsgard</StyledList>
                    <StyledList> Ian  McShane</StyledList>
                    <StyledList> Laurence Fishburne</StyledList>
                    <StyledList> Lance Reddick </StyledList>
                    <StyledList> Clancy Brown </StyledList>
                    <StyledList> Hirouky Sanada</StyledList>
                    
                 </ul>
}

                 { activeList === 'crew' && <ul>
                 <StyledList> Crew 1</StyledList>
                 <StyledList>Crew 2</StyledList>
                 </ul>}

                 { activeList === 'genres' && <ul>
                 <StyledList> Genre 1</StyledList>
                 <StyledList>Genre 2</StyledList>
                 </ul>}

                 { activeList === 'details' && <ul>
                 <StyledList> Detail 1</StyledList>
                 <StyledList>Detail 2</StyledList>
                 </ul>}

    
                    </Grid>
                   { !loggedIn && <Grid item md={3} xs={2} sx={{
                        height:"120px",
                        mt:8,
                        background: "#445566;",
                        color: "#99AABB;",
                        borderRadius: "16px"

                    }}>
                        <LoggedOutBox style={{borderBottom:"1px solid white"}}>
                             <StyledLink> Sign in to leave a review</StyledLink>
                             <RateReviewIcon/>
                             </LoggedOutBox>

                             
                        <LoggedOutBox> 
                            <StyledLink> Share</StyledLink>
                           <ShareIcon/>
                        </LoggedOutBox>

                        
                    </Grid>}

                    {/* {loggedIn && <Grid item md={3} xs={2}
                    sx={{
                        height:"200px",
                        mt:8,
                        background: "#445566;",
                        color: "#99AABB;",
                        borderRadius: "16px"}}>
                        
                        <LoggedInBox> <StyledLink> Like </StyledLink>
                        <FavoriteIcon/>
                        </LoggedInBox>
                                 
                             
                        <LoggedInBox><StyledLink> Add to watchlist  </StyledLink>
                                <MoreTimeIcon/>  </LoggedInBox>

                        <LoggedInBox> <StyledLink> Leave a review  </StyledLink>
                        <RateReviewIcon/>
                        </LoggedInBox>

                        <LoggedInBox ><StyledLink> Share</StyledLink>
                           <ShareIcon/> </LoggedInBox>
                        
                        
                        </Grid>} old */}

                        
                     {loggedIn && <Grid item md={3} xs={2}
                    sx={{
                        display:"block",
                        height:"200px",
                        mt:8,
                        background: "#445566",
                        // background: "#304244",
                        
                        color: "#99AABB",
                        borderRadius: "16px"}}>
                        
                        <LoggedInBox sx={{height:"100px"}}> 

                            <List   sx={{
                                display:"flex",
                                flexDirection:"row"
                            }}
                            > 
                                 <ListItemButton  >
                                    <StyledListItemIcon sx={{}}>
                                    <FavoriteIcon/>
                                        <ListItemText sx={{
                                            color:"#fff",
                                            
                                        }} primary="Like"  />
                                    </StyledListItemIcon>
                                 </ListItemButton>

                                 <ListItemButton  >
                                    <StyledListItemIcon>
                                        <MoreTimeIcon />
                                        <ListItemText primary="Watchlist"
                                        sx={{
                                            color:"#fff"
                                        }} />
                                    </StyledListItemIcon>
                                 </ListItemButton>

                                 <ListItemButton >
                                    <StyledListItemIcon>
                                        <RateReviewIcon/>
                                        <ListItemText primary="Review"
                                        sx={{
                                            color:"#fff"
                                        }}
                                        />
                                    </StyledListItemIcon>
                                 </ListItemButton>

                            </List>



                        </LoggedInBox>
                                 
                             
                       

                        <LoggedInBox sx={{height:"50px"}}> <StyledLink> Add to lists...  </StyledLink>
                        {/* <RateReviewIcon/> */}
                        </LoggedInBox>

                        <LoggedInBox sx={{height:"50px"}}><StyledLink> Share</StyledLink>
                           <ShareIcon/> </LoggedInBox>
                        
                        
                        </Grid>} 

                        
                           
                        
                </Grid>
            </Box>
            <Box  sx={{
               
                mt:4,
                // position:"static",
                
                
                
            }}>
                <ButtonGroup sx={{
                    height:"120px",
                    width:"220px",
                    
                    ml:"100px"
                    
                    
                }} variant="contained" size="large" orientation="vertical" color="button" >
                  <StyledButton onClick={e=>setOpen(true)}> Watch the trailer <YouTubeIcon sx={{
                    fontSize:"40px",
                    
                  }}/></StyledButton>


       <Modal
        open={open}
        onClose={e=>setOpen(false)}
        
      >
        <TrailerBox>
            <IconButton onClick={e=>setOpen(false)} >
                <CloseIcon sx={{color:"#fff",
            float:"right"}} />
            </IconButton >
            <iframe height="100%" width="100%" src={`${movie.Trailer}`}></iframe>
        </TrailerBox>
        
        
        
        
         </Modal>
                  <StyledButton> Buy a ticket <ConfirmationNumberIcon sx={{
                    fontSize:"40px",
                    }}  /> </StyledButton>
                </ButtonGroup>
            </Box>
        </Container>
        </Box>
        </ThemeProvider>
    );
}

export default Movie;
