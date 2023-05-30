import styled from "@emotion/styled";
import { Button, Link, Box, ListItemIcon } from "@mui/material";
import {createTheme} from "@mui/material/styles";


export const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#64748B',
        contrastText: '#fff',
      },
      button:{
        main:"#DC143C"
      }
    },
  });
  
  
    export const LabelList = styled("ul")({
          marginTop:"20px",
          display:"flex",
          flexDirection:"row",
          marginBottom:10,
          
          
  
      });
  
    export const Label = styled("li")({
    display: "inline-block",
    fontSize: "20px",
    paddingLeft: "30px",
    ":hover":{
      cursor:"pointer",
      color:"#fff",
      
  
    }
    
      });
  
     export const StyledList=styled("li")({
          fontSize: "14px",
    color: "#99AABB",
    display: "inline",
    paddingLeft: "10px",
    
  
  //   verticalAlign: "bottom",
  //   justifyContent: "flex-start"
  
      });
  
      export const LoggedOutBox = styled(Box)({
          display:"flex",
          flexDirection:"row",
          height:"50%",
          gap : "10px",
          justifyContent: "center",
           alignItems:"center",
          
      
         
          
      })
  
     export const StyledLink = styled(Link)({
          textDecoration:"none",
          color: "#fff",
          ":hover":{
              cursor:"pointer"
          }
      })
  
      export const LoggedInBox = styled(Box)({
        display:"flex",
      flexDirection:"row",
      justifyContent: "center",
           alignItems:"center",
          //  height:"33.3%",
           gap:"10px",
           ":not(:last-child)": {
              borderBottom: "1px solid #c7bcb1",
  
      }});

      export const StyledListItemIcon = styled(ListItemIcon)({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap:"2px"
      })



      




      export const StyledButton = styled(Button)({
        height:"50%",
        color:"#fff",
        gap:"20px",
        fontSize:"14px",
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        borderRadius:"20px",
      });


      export const TrailerBox = styled(Box)({
        height:"600px",
        width:"1000px",
    margin:"auto",
    marginTop:"120px"
      })