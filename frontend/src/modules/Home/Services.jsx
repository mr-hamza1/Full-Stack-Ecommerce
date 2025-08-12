import { Box, Stack, Typography, Card, CardContent, CardMedia, Container, Grid } from "@mui/material"
import { Search, Inventory, Send, Security } from "@mui/icons-material"
import Home6_1 from "../../assets/Home/Services/1.png"
import Home6_2 from "../../assets/Home/Services/2.png"
import Home6_3 from "../../assets/Home/Services/3.png"
import Home6_4 from "../../assets/Home/Services/4.png"

const servicesData = [
  {
    id: 1,
    title: "Source from Industry Hubs",
    image: `${Home6_1}`,
    icon: <Search sx={{ fontSize: 20, color: "#rgba(28, 28, 28, 1)" }} />,
  },
  {
    id: 2,
    title: "Customize Your Products",
    image: `${Home6_2}`,
    icon: <Inventory sx={{ fontSize: 20, color: "#rgba(28, 28, 28, 1)" }} />,
  },
  {
    id: 3,
    title: "Fast, reliable shipping by ocean or air",
    image: `${Home6_3}`,
    icon: <Send sx={{ fontSize: 20, color: "#rgba(28, 28, 28, 1)" }} />,
  },
  {
    id: 4,
    title: "Product monitoring and Inspection",
    image: `${Home6_4}`,
    icon: <Security sx={{ fontSize: 20, color: "#rgba(28, 28, 28, 1)" }} />,
  },
]

const suppliersData = [
  // First row
  [
    { country: "Arabic Emirates", flag: "🇦🇪" },
    { country: "Australia", flag: "🇦🇺" },
    { country: "United States", flag: "🇺🇸" },
    { country: "Russia", flag: "🇷🇺" },
    { country: "Italy", flag: "🇮🇹" },
  ],
  // Second row
  [
    { country: "Denmark", flag: "🇩🇰" },
    { country: "France", flag: "🇫🇷" },
    { country: "Arabic Emirates", flag: "🇦🇪" },
    { country: "China", flag: "🇨🇳" },
    { country: "Great Britain", flag: "🇬🇧" },
  ],
]

export default function Services() {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", py: 2 }}>
        <Stack spacing={3}>
          {/* Our extra services section */}
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 2,
                fontWeight: 600,
                color: "#333",
                fontSize: "24px",
              }}
            >
              Our extra services
            </Typography>

              <Stack direction={"row"} spacing={2} width={"100%"}>
                               {servicesData.map((service) => (
                  <Card
                    sx={{
                      height: "200px",
                      width: "25%",
                      cursor: "pointer",
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      boxShadow: "none",
                                         "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }
                    }}
                  >
                    <Box sx={{ position: "relative", height: 80 }}>
                      <CardMedia
                        component="img"
                        height="120"
                        image={service.image}
                        alt={service.title}
                        sx={{ objectFit: "cover" }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          top: 98,
                          right: 20,
                          backgroundColor: "rgba(209, 231, 255, 1)",
                          borderRadius: "50%",
                          p: 0.3,
                          minWidth: 50,
                          minHeight: 50,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #eee",
                        }}
                      >
                        {service.icon}
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 1, height: 50 }}>
                      <Typography
                        variant="body2"
                        mt={7}
                        component="p"
                        width={"165px"}
                        sx={{
                          fontWeight: 500,
                          color: "rgba(28, 28, 28, 1)",
                          fontSize: "16px",
                          lineHeight: 1.2,
                        }}
                      >
                        {service.title}
                      </Typography>
                    </CardContent>
                  </Card>
              ))}
              </Stack>
          </Box>

        </Stack>
    </Box>
  )
}
