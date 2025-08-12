import { Box, IconButton, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from "react-router-dom";


const HeaderBottom = () => {
  return (
        <Box width={{xs:"21px", md:"100%", lg:"100%"}} height={{xs:"3.5px", md:"35px"}}
         elevation={0}
         sx={{
            backgroundColor: "#FFFFFF",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "10px",
            paddingTop: "10px",
            display: "flex",
            alignItems: "center",
         }}
         >
            
            <Box  
              sx={{
                 left: {md:68, lg:128},
                 position: "relative",
              }}
              display={"flex"}
              alignItems={"center"}
              gap={{md:1.5, lg:3}}
              
            >
              <Box sx={{ display: "flex", alignItems: "center", }}>
                   <IconButton>
                    <MenuIcon  sx={{fontSize: "20px", color:"black", position: "relative" , top: -1}}/>
                </IconButton>
                <Typography 
                 component={Link}
                 to={`/search`}
                    sx={{
                      color: "black",
                      textDecoration: "none",
                        fontSize: "14px",     
                        height: "22px",    
                        width: "79px",  
                      }}>All category</Typography>
              </Box>
                <Typography sx={{
                        fontSize: "14px",     
                        height: "22px",    
                        width: "79px",  
                      }}>Hot offers</Typography>
                <Typography  sx={{
                        fontSize: "14px",     
                        height: "22px",    
                        width: "79px",  
                      }}>Gift boxes</Typography>
                <Typography  sx={{
                        fontSize: "14px",     
                        height: "22px",    
                        width: "79px",  
                      }}>Projects</Typography>
                <Typography  sx={{
                        fontSize: "14px",     
                        height: "22px",    
                        width: "79px",  
                      }}>MenuItems</Typography>
               
                     
                     <Box sx={{ display: "flex", alignItems: "center", }}>
          
                          <Typography  sx={{
                                  fontSize: "14px",     
                                  height: "22px",    
                                  width: "23px",  
                                }}>Help</Typography>
                                 <IconButton>
                              < KeyboardArrowDownIcon sx={{fontSize: "20px",}}/>
                              </IconButton>
                      </Box>

            </Box>

            <Box            
               display={"flex"}
               alignItems={"center"}
               sx={{
                 left: {md:300, lg:586},
                 position: "relative",
               }}
               gap={{md:1, lg:2}}
               >
                  <Box sx={{ display: "flex", alignItems: "center", }}>         
                         <Typography  sx={{
                                  fontSize: "14px",     
                                  height: "22px",    
                                  width: "72px",  
                                }}>English,USD</Typography>
                                 <IconButton>
                              < KeyboardArrowDownIcon sx={{fontSize: "20px",}}/>
                              </IconButton>
                      </Box>
                  <Box sx={{ display: "flex", alignItems: "center", }}>         
                         <Typography  sx={{
                                  fontSize: "14px",     
                                  height: "22px",    
                                  width: "50px",  
                                }}>Ship to</Typography>
                                 <IconButton>
                              < KeyboardArrowDownIcon sx={{fontSize: "20px",position: "relative", left:-13}}/>
                              </IconButton>
                      </Box>

            </Box>

        </Box>
  )
}

export default HeaderBottom