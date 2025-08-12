"use client"

import { Avatar, Box, Button, List, ListItem, ListItemText, Stack, Typography } from "@mui/material"
import Home1st from "../assets/Home/Home1st.png"
import Home3_main from "../assets/Home/interior/main.jpg"
import Home4_main from "../assets/Home/interior/main2.png"


import { useEffect, useState } from "react"
import { useErrors } from "../Hooks/Hook"
import Quotes from "../modules/Home/Quotes"
import Recommended from "../modules/Home/Recommended"
import Services from "../modules/Home/Services"
import Suppliers from "../modules/Home/Suppliers"
import { useLatestProductsQuery } from "../redux/api/productApi"
import MobileHome from "./mobile/MobileHome"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {userNotExist} from '../redux/reducer/userReducer'
import toast from "react-hot-toast"
import axios from "axios"



const Home = () => {
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [dealsData, setDealsData] = useState([])
  const [homeOutdoorData, setHomeOutdoorData] = useState([])
  const [electronicsData, setElectronicsData] = useState([])
  const [recommendedData, setRecommendedData] = useState([])

    const {user, loading} = useSelector((state) => state.userReducer)
  

  const navigate = useNavigate();

  const categories = [
    "Automobiles",
    "Clothes and wear",
    "Home interiors",
    "Computer and tech",
    "Tools, equipments",
    "Sports and outdoor",
    "Animal and pets",
    "Machinery tools",
    "More category",
  ]
  const dispatch = useDispatch();

    const logoutHandler = async() => {
      try {
        const {data} = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/logout`, { withCredentials: true })
        dispatch(userNotExist());
        toast.success(data.message);
      } catch (error) {
        toast.error(error || "Something Went Wrong");
      }
    };
  


   const { data, isLoading, isError, error } = useLatestProductsQuery()
  useErrors([{ isError, error }])
  

  useEffect(()=>{
    if(data?.products){
      setDealsData(data.products.deals)
      setElectronicsData(data.products.electronics)
      setHomeOutdoorData(data.products.home)
      setRecommendedData(data.products.recommendedFashion)
    }

  },[data])

  return (
    <Box  width={"100%"}> 
    <Box height={"100%"} width={"100%"} bgcolor={"#f7fafc"}  display={{xs:"none", md:"flex"}}>
      <Box
        height={"100%"}
        width={{md:"85%", lg:"82%"}}
        sx={{
          position: "relative",
          left: {md:80, lg:140},
          pt: 2.3
        }}
      >
        <Stack
          direction={"row"}
          width={"100%"}
          height={"400px"}
          backgroundColor={"white"}
          pt={2}
          pl={1}
          pr={1}
          pb={2}
          border={"2px solid #e0e0e0"}
          borderRadius={"6px"}
        >
          <Box height={"400px"} width={{md:"20%", lg:"18%"}}>
            <List dense>
              {categories.map((category, index) => (
                <ListItem
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  sx={{
                    py: {md:0.5, lg:0.7},
                    borderRadius: "6px",
                    backgroundColor: selectedIndex === index ? "rgba(229, 241, 255, 1)" : "transparent",
                    "&:hover": {
                      backgroundColor: "rgba(229, 241, 255, 0.5)",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemText
                    primary={category}
                    primaryTypographyProps={{
                      fontSize: "14px",
                      color: "text.secondary",
                      fontWeight: selectedIndex === index ? "bold" : "normal",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Box
            sx={{
              position: "relative",
              width: "75%",
              height: "365px",
              backgroundImage: `url(${Home1st})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right center",
              display: "flex",
              alignItems: "center",
              ml: 1,
              mr: 2,
              borderRadius: 0.3,
            }}
          >
            <Box
              sx={{
                maxWidth: 300,
                display: "flex",
                flexDirection: "column",
                marginLeft: "50px",
              }}
              top={-70}
              position={"relative"}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 500,
                  color: "#2a2a2a",
                }}
              >
                Latest trending
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: "#000",
                }}
              >
                Electronic items
              </Typography>
              <Button
                size="small"
                sx={{
                  mt: 1,
                  width: 100,
                  color: "#000",
                  textTransform: "none",
                  fontSize: "13px",
                  p: 0.3,
                  backgroundColor: "white",
                }}
              >
                Learn more
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }} width={"20%"} height={"100%"} pr={2}>
            {/* Welcome Card */}
            <Box
              height={"180px"}
              width={{md:"180px", lg:"200px"}}
              sx={{
                backgroundColor: "#e3f2fd",
                borderRadius: "6px",
                           "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }
              }}
              p={1}
            >
     {     !user?._id?                  <Box display={"flex"} alignItems={"center"} top={-10} position={"relative"}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#1976d2",
                    mr:1,
                               "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }
                  }}
                >
                  U
                </Avatar>
                <p>
                  Hi, user <br /> let's get started
                </p>
              </Box> : 
                  <Box display={"flex"} alignItems={"center"} top={-10} position={"relative"}>
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#1976d2",
                    mr:1,
                               "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }
                  }}
                  src={user?.photo}
                />
                <p>
                  Hi, {user?.name.split(" ")[0]} <br /> let's get started
                </p>
              </Box>
              }
  {     !user?._id?       <Box top={-10} position={"relative"}>
                <Button variant="contained" size="small" 
                                  onClick={() => navigate(`/Login`)}
                fullWidth sx={{ textTransform: "none", mb: 1 }}>
                  Join now
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="black"
                  onClick={() => navigate(`/Login`)}
                  mb={2}
                  fullWidth
                  sx={{ textTransform: "none", backgroundColor: "rgba(255, 255, 255, 1)" }}
                >
                  Log in
                </Button>
              </Box> :
                          <Box top={-10} position={"relative"}>
                <Button variant="contained" size="small" fullWidth sx={{ textTransform: "none", mb: 1 }}>
                  Get free cupons
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  color="black"
                  mb={2}
                  fullWidth
                  sx={{ textTransform: "none", backgroundColor: "rgba(255, 255, 255, 1)" }}
                onClick={logoutHandler}
                >
                  Log out
                </Button>
              </Box>
              }
            </Box>

            {/* Promo Card */}
            <Box
              height={"95px"}
              width={{md:"180px", lg:"200px"}}
              sx={{
                backgroundColor: "#ff9800",
                color: "white",
                borderRadius: "6px",
                           "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }
              }}
              p={2}
            >
              <Typography variant="body1" sx={{ fontWeight: "" }}>
                Get US $10 off
              </Typography>
              <Typography variant="body2">with a new</Typography>
              <Typography variant="body2" mb={1}>
                supplier
              </Typography>
            </Box>

            {/* Quotes Card */}
            <Box
              height={"95px"}
              width={{md:"180px", lg:"200px"}}
              sx={{
                backgroundColor: "#4fc3f7",
                color: "white",
                borderRadius: "6px",
                           "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }
              }}
              pt={2}
              pl={2}
            >
              <Typography variant="body2">Send quotes with</Typography>
              <Typography variant="body2">supplier</Typography>
              <Typography variant="body2" mb={1}>
                preferences
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* New Deals and Offers Section */}
        <Box width={"100%"} mt={3} >
          {/* Deals and Offers */}
          <Box backgroundColor={"white"} border={"2px solid #e0e0e0"} width={"100%"}  borderRadius={"6px"} mb={2}
             sx={{
              display: "flex",
              alignItems: "center",
             }}
          >
             <Stack width={"25%"}>
             <Stack ml={2.4} mt={-6} >
               <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Deals and offers
                </Typography>
                <Typography sx={{ color: "rgba(139, 150, 165, 1)", mb: 1 , position: "relative", top: -8, fontSize: "14px"}}>
                  Hygiene equipments
                </Typography>

            <Box display={"flex"} gap={1} mb={2} >
              {["04", "13", "34", "56"].map((time, index) => (
                <Stack  direction={"column"} justifyContent={"center"} alignItems={"center"}
                  key={index}
                  sx={{
                    backgroundColor: "rgba(96, 96, 96, 1)",
                    color: "white",
                    px: 1,
                    py: 0.5,
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    width:"45px",
                    height: "50px",
                  }}
                >
                  {time}
                 <span>
                   {
                    index==0 && "Days" 
                  }
                  {
                    index==1 && "Hour" 
                  }
                  {
                    index==2 && "Min" 
                  }
                  {
                    index==3 && "Sec" 
                  }
                 </span>
                </Stack>
              ))}
            </Box>
             </Stack>
             </Stack>
             <Stack direction={"row"} width={"75%"} >
               {isLoading?  "hi": 
               dealsData.map((item, index) => (
                  <Box textAlign={"center"} gap={2} borderLeft={"2px solid #e0e0e0"} width={"25%"} pt={2} pb={2}
                  sx={{           "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }}}
       onClick={()=> navigate(`/productDetails/${item._id}`)}
                  >
                    <Box
                      component="img"
                      src={item.images.urls[0]}
                      alt={item.name}
                      sx={{
                        width: 120,
                        height: 120,
                        objectFit: "contain",
                        borderRadius: "1px",
                        mb: 0.5,
                      }}
                    />
                    <Typography variant="body2" sx={{ fontSize: "12px", mb: 0.5 }}>
                      {item.name}
                    </Typography>
                        <Button 
                          variant="contained"
                          sx={{
                            width: "10px",
                            height: "25px",
                            fontSize: "10px",
                            color: "red",
                            fontWeight: "bold",
                            backgroundColor: "rgba(255, 227, 227, 1)",
                            borderRadius: "29px",        // better for a circle than 45%
                            pointerEvents: "none",      // makes it unclickable
                            cursor: "default"           // avoids hover pointer
                          }}
                        >
                          {item.discount}%
                        </Button>

         
                  </Box>
              ))}
             </Stack>
          </Box>

          {/* Home and Outdoor Section */}
          <Box backgroundColor={"white"} width={"100%"} border={"2px solid #e0e0e0"} borderRadius={"6px"}  mb={2}
             display={"flex"} 
          >
                  <Box
                    sx={{
                      position: "relative",
                      width: "25%",
                      height: "265px",
                      overflow: "hidden",  
                      "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }
                    }}
                  >
                    {/* Background Image Layer (flipped) */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${Home3_main})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        transform: "scaleX(-1)", // only this flips
                      }}
                    />
                  
                    {/* Content Layer (normal text) */}
                    <Box sx={{ position: "relative", p: 2 }} mb={2}> 
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "20px", lineHeight: "26px" }} mb={2}>
                        Home and <br /> outdoor
                      </Typography>
                      <Button   size="large" sx={{ textTransform: "none",backgroundColor: "white", color:"black", fontSize: "12px", 
                        pt: 0.7,
                        pb: 0.7,
                        pl: 2,
                        pr: 2,

                         }}>
                        Source now
                      </Button>
                    </Box>
                  </Box>

                 <Stack width={"75%"}>
                  <Stack direction={"row"} width={"100%"} >
                    {isLoading?  "hi": 
                    homeOutdoorData.map((item, index) => (
          index<4 &&
                  <Box width={"25%"} borderLeft={"2px solid #e0e0e0"}  borderBottom={"2px solid #e0e0e0"}
                  sx={{                    "&:hover": {
      transform: "translateY(5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }}}
           onClick={()=> navigate(`/productDetails/${item._id}`)}

    >
                     <Box >
                        <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: 400, mb: 0.5 , mt: 1.5 ,ml: 2 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 400, color: "text.secondary", ml :2 }}>
                      From <br /> USD {item.pricing.amount}
                    </Typography>
                     </Box>
                    <Box
                      component="img"
                      src={item.images.urls[0]}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        display: "block",
                        objectFit: "cover",
                        borderRadius: "4px",
                        position: "relative",
                        right: {md: -105, lg:-160},
                        top: -20,
                        p: 0
                      }}
                    />
                
                  </Box>
              ))}
                  </Stack>
                                   <Stack direction={"row"} width={"100%"} >
                    {isLoading?  "hi": homeOutdoorData.map((item, index) => (
          index>=4 && 
                  <Box width={"25%"} borderLeft={"2px solid #e0e0e0"} sx={{                    "&:hover": {
      transform: "translateY(5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }}} 
           onClick={()=> navigate(`/productDetails/${item._id}`)}

     >
                     <Box >
                        <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: 400, mb: 0.5 , mt: 1.5 ,ml: 2 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 400, color: "text.secondary", ml :2 }}>
                      From <br /> USD {item.pricing.amount}
                    </Typography>
                     </Box>
                    <Box
                      component="img"
                      src={item.images.urls[0]}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        display: "block",
                        borderRadius: "4px",
                        position: "relative",
                        right: {md: -105, lg:-160},
                        top: -20,
                      }}
                    />
                
                  </Box>
              ))}
                  </Stack>
                 </Stack>
          </Box>
          {/* Home and Outdoor Section */}
          <Box backgroundColor={"white"} width={"100%"} border={"2px solid #e0e0e0"} borderRadius={"6px"}  mb={2}
             display={"flex"} 
          >
                  <Box
                    sx={{
                      position: "relative",
                      width: "25%",
                      height: "265px",
                      overflow: "hidden",
                                          "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }
                    }}
                  >
                    {/* Background Image Layer (flipped) */}
                    <Box
                      sx={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `url(${Home4_main})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        transform: "scaleX(-1)", // only this flips
                      }}
                    />
                  
                    {/* Content Layer (normal text) */}
                    <Box sx={{ position: "relative", p: 2 }} mb={2}>
                      <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "20px", lineHeight: "26px" }} mb={2}>
                                         Consumer <br /> electronics and <br /> gadgets
                      </Typography>
                      <Button   size="large" sx={{ textTransform: "none",backgroundColor: "white", color:"black", fontSize: "12px", 
                        pt: 0.7,
                        pb: 0.7,
                        pl: 2,
                        pr: 2,

                         }}>
                        Source now
                      </Button>
                    </Box>
                  </Box>

                 <Stack width={"75%"}>
                  <Stack direction={"row"} width={"100%"} >
                    {isLoading?  "hi": electronicsData.map((item, index) => (
          index<4 &&
                  <Box width={"25%"} borderLeft={"2px solid #e0e0e0"}  borderBottom={"2px solid #e0e0e0"}
                  sx={{                    "&:hover": {
      transform: "translateY(5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }}}
                         onClick={()=> navigate(`/productDetails/${item._id}`)}
>
                     <Box >
                        <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: 400, mb: 0.5 , mt: 1.5 ,ml: 2 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 400, color: "text.secondary", ml :2 }}>
                      From <br /> USD {item.pricing.amount}
                    </Typography>
                     </Box>
                    <Box
                      component="img"
                      src={item.images.urls[0]}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        display: "block",
                        objectFit: "contain",
                        borderRadius: "4px",
                        position: "relative",
                        right: {md: -105, lg:-160},
                        top: -20,
                        p: 0
                      }}
                    />
                
                  </Box>
              ))}
                  </Stack>
                                   <Stack direction={"row"} width={"100%"} >
                    {isLoading?  "hi": electronicsData.map((item, index) => (
          index>=4 && 
                  <Box width={"25%"} borderLeft={"2px solid #e0e0e0"} sx={{
                   "&:hover": {
      transform: "translateY(5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }
                  }}        onClick={()=> navigate(`/productDetails/${item._id}`)}
 >
                     <Box >
                        <Typography variant="body1" sx={{ fontSize: "14px", fontWeight: 400, mb: 0.5 , mt: 1.5 ,ml: 2 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: "12px", fontWeight: 400, color: "text.secondary", ml :2 }}>
                      From <br /> USD {item.pricing.amount}
                    </Typography>
                     </Box>
                    <Box
                      component="img"
                      src={item.images.urls[0]}
                      alt={item.name}
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "contain",
                        display: "block",
                        borderRadius: "4px",
                        position: "relative",
                        right: {md: -105, lg:-160},
                        top: -20,
                      }}
                    />
                
                  </Box>
              ))}
                  </Stack>
                 </Stack>
          </Box>


             <Quotes />
             <Recommended recommendedData={recommendedData} isLoading={isLoading} />
             <Services />
             <Suppliers />


        </Box>
      </Box>
    </Box>
    <MobileHome  Home1st={Home1st} dealsData={dealsData} isLoading={isLoading} electronicsData={electronicsData} recommendedData={recommendedData} homeOutdoorData={homeOutdoorData}  />
    </Box> 
  )
}

export default Home
