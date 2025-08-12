import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Stack,
  IconButton,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material"
import { Facebook, Twitter, LinkedIn, Instagram, YouTube, Email, KeyboardArrowUp, ShoppingBag } from "@mui/icons-material"

const footerLinks = {
  about: [
    { label: "About Us", href: "#" },
    { label: "Find store", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Blogs", href: "#" },
  ],
  partnership: [
    { label: "About Us", href: "#" },
    { label: "Find store", href: "#" },
    { label: "Categories", href: "#" },
    { label: "Blogs", href: "#" },
  ],
  information: [
    { label: "Privacy Policy", href: "#" },
    { label: "Money Refund", href: "#" },
    { label: "Shipping", href: "#" },
    { label: "Contact us", href: "#" },
  ],
  forUsers: [
    { label: "Login", href: "#" },
    { label: "Register", href: "#" },
    { label: "Settings", href: "#" },
    { label: "My Orders", href: "#" },
  ],
}

export default function Footer() {
  return (
    <Box >
        <Stack spacing={4} sx={{backgroundColor: "#eff2f4"}} width={"100%"}  display={{xs:"none", md:"flex"}}>
          {/* Newsletter Section */}
          <Box sx={{ textAlign: "center", py: 3 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                color: "#333",
                mb: 1,
              }}
            >
              Subscribe on our newsletter
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mb: 3,
                maxWidth: 400,
                mx: "auto",
              }}
            >
              Get daily news on upcoming offers from many suppliers all over the world
            </Typography>

            <Stack
              direction="row"
              spacing={1}
              sx={{
                maxWidth: 400,
                mx: "auto",
                alignItems: "center",
              }}
            >
              <TextField
                placeholder="Email"
                variant="outlined"
                size="small"
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                  },
                }}
                InputProps={{
                  startAdornment: <Email sx={{ color: "#ccc", mr: 1, fontSize: 20 }} />,
                }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#2196f3",
                  px: 3,
                  py: 1,
                  "&:hover": {
                    backgroundColor: "#1976d2",
                  },
                }}
              >
                Subscribe
              </Button>
            </Stack>
          </Box>

          {/* Main Footer Content */}
          <Grid container spacing={{md:5, lg:12}} sx={{backgroundColor: "rgba(255, 255, 255, 1)"}} pt={5} pb={5} pl={15} >
            {/* Brand Section */}
            <Grid item xs={12} md={3} >
              <Stack spacing={2} mr={6} >
                            <Box
                          sx={{
                            height: {xs:"36px", md:"46px"},
                            width: {xs:"116px", md:"150px"},
                            position: "relative", // 👈 Add this
                            top: 5,
                            
                          }}
                           display={"flex"}
                           gap={1}
                           alignItems={"center"}
                           justifyContent={"center"}
                        >
                          <Box
                            sx={{
                              position: "relative",
                              width: {xs:"34px", md:"44px"},
                              height: {xs:"34px", md:"44px"},
                            }}
                          >
                            {/* Back (lighter) box */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: "6px", // slight offset
                                width: {xs:"28px", md:"36.35px"},
                                height: {xs:"31px", md:"40.17px"},
                                backgroundColor: "rgba(13, 110, 253, 0.2)",
                                borderRadius: {xs:"7px", md:"11px"},
                              }}
                            />
                          
                            {/* Front (main) box */}
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: {xs:"29px", md:"38.26px"},
                                height: {xs:"31px", md:"40.17px"},
                                backgroundColor: "#0D6EFD",
                                borderRadius: {xs:"7px", md:"11px"},
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "white",
                              }}
                            >
                              <ShoppingBag height={{xs:"16px", md:"17px"}} width={{xs:"13px", md:"20px"}} fontSize="small" />
                            </Box>
                          </Box>
                          

                           <Typography
                             color="#8CB7F5"
                             variant="inherit"
                             sx={{
                               width: {xs:"59px", md:"77px"},
                               height: {xs:"16px", md:"21.1px"},
                               position: "relative", 
                               top: -8,
                               fontSize: {xs:"1.3rem", md:"1.5rem"},
                               fontWeight: "bold"
                             }}
                           >
                             Brand
                           </Typography>

                    </Box>

                <Typography
                  variant="body2"
                  sx={{
                    color: "#666",
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  Best information about the company <br /> gies here but now lorem ipsum is
                </Typography>

                <Stack direction="row" spacing={1}>
                  <IconButton size="small" sx={{ backgroundColor: "rgba(189, 196, 205, 1)" }}>
                    <Facebook sx={{ fontSize: 16, color: "white" }} />
                  </IconButton>
                  <IconButton size="small" sx={{ backgroundColor: "rgba(189, 196, 205, 1)" }}>
                    <Twitter sx={{ fontSize: 16, color: "white" }} />
                  </IconButton>
                  <IconButton size="small" sx={{ backgroundColor: "rgba(189, 196, 205, 1)" }}>
                    <LinkedIn sx={{ fontSize: 16, color: "white" }} />
                  </IconButton>
                  <IconButton size="small" sx={{ backgroundColor: "rgba(189, 196, 205, 1)" }}>
                    <Instagram sx={{ fontSize: 16, color: "white" }} />
                  </IconButton>
                  <IconButton size="small" sx={{ backgroundColor: "rgba(189, 196, 205, 1)" }}>
                    <YouTube sx={{ fontSize: 16, color: "white" }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>

            {/* About */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
                About
              </Typography>
              <Stack spacing={1}>
                {footerLinks.about.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 400, 
                      fontSize: "16px",
                      "&:hover": { color: "#2196f3" },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Partnership */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
                Partnership
              </Typography>
              <Stack spacing={1}>
                {footerLinks.partnership.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 400, 
                      fontSize: "16px",
                      "&:hover": { color: "#2196f3" },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Information */}
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
                Information
              </Typography>
              <Stack spacing={1}>
                {footerLinks.information.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 400, 
                      fontSize: "16px",
                      "&:hover": { color: "#2196f3" },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* For users */}
            <Grid item xs={6} md={1.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
                For users
              </Typography>
              <Stack spacing={1}>
                {footerLinks.forUsers.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    sx={{
                      color: "#666",
                      textDecoration: "none",
                      fontWeight: 400, 
                      fontSize: "16px",
                      "&:hover": { color: "#2196f3" },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Get app */}
            <Grid item xs={12} md={1.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#333", mb: 2 }}>
                Get app
              </Typography>
              <Stack spacing={1}>
           
                <Button sx={{backgroundColor: "rgba(28, 28, 28, 1)", color:"white", fontSize:"10px"}}>
                   Download on <br /> App Store
                </Button>
                <Button sx={{backgroundColor: "rgba(28, 28, 28, 1)", color:"white", fontSize:"10px"}}>
                   Get on <br /> Goole Play
                </Button>
              </Stack>
            </Grid>
          </Grid>

          {/* Bottom Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "62px",
            }}
          >
            <Typography variant="body2"  sx={{ color: "#666", fontWeight: 400, fontSize: "16px", pl: 15, mb: 3}}>
              © 2023 Ecommerce.
            </Typography>
              <Box  pr={15} mb={3}>     
            <FormControl size="small" >
              <Select
                value="English"
                sx={{
                  fontSize: "13px",
                  "& .MuiSelect-select": {
                    pr: 20,
                  },
                }}
                IconComponent={KeyboardArrowUp}
              >
                <MenuItem value="English">🇺🇸 English</MenuItem>
                <MenuItem value="Spanish">🇪🇸 Spanish</MenuItem>
                <MenuItem value="French">🇫🇷 French</MenuItem>
              </Select>
            </FormControl>
              </Box>
          </Box>
        </Stack>
    </Box>
  )
}
