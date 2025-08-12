import { Box, Stack, Typography, Container } from "@mui/material"
import Home7_1 from "../../assets/Home/regions/1.png"
import Home7_2 from "../../assets/Home/regions/2.png"
import Home7_3 from "../../assets/Home/regions/3.png"
import Home7_4 from "../../assets/Home/regions/4.png"
import Home7_5 from "../../assets/Home/regions/5.png"
import Home7_6 from "../../assets/Home/regions/6.png"
import Home7_7 from "../../assets/Home/regions/7.png"
import Home7_9 from "../../assets/Home/regions/9.png"
import Home7_10 from "../../assets/Home/regions/10.png"

const suppliersData = [
  // First row
  [
    { country: "Arabic Emirates", flag: `${Home7_1}`, website: "shopname.ae" },
    { country: "Australia", flag: `${Home7_2}`, website: "shopname.com.au" },
    { country: "United States", flag: `${Home7_3}`, website: "shopname.ae" },
    { country: "Russia", flag: `${Home7_4}`, website: "shopname.ru" },
    { country: "Italy", flag: `${Home7_5}`, website: "shopname.it" },
  ],
  // Second row
  [
    { country: "Denmark", flag: `${Home7_6}`, website: "denmark.com.dk" },
    { country: "France", flag: `${Home7_7}`, website: "shopname.com.fr" },
    { country: "Arabic Emirates", flag: `${Home7_1}`, website: "shopname.ae" },
    { country: "China", flag: `${Home7_9}`, website: "shopname.ae" },
    { country: "Great Britain", flag: `${Home7_10}`, website: "shopname.co.uk" },
  ],
]

export default function Suppliers() {
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", py: 3, pb: 7 }}>
        <Stack spacing={3}>
          {/* Suppliers by region section */}
          <Box>
            <Typography
              variant="h6"
              component="h2"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: "#333",
                fontSize: "24px",
              }}
            >
              Suppliers by region
            </Typography>

            <Stack spacing={3}>
              {suppliersData.map((row, rowIndex) => (
                <Stack key={rowIndex} direction="row" spacing={{md: 1, lg:10}} sx={{ flexWrap: "wrap" }}>
                  {row.map((supplier, index) => (
                    <Box
                      key={`${supplier.country}-${rowIndex}-${index}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        minWidth: 180,
                        "&:hover": {
                          "& .country-name": {
                            color: "#1976d2",
                          },
                        },
                      }}
                    >
     <Box
  component="span" // or div, image is not a valid component
  sx={{
    width: 30,
    height: 20,
    display: 'inline-block',
    backgroundImage: `url(${supplier.flag})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    borderRadius: '2px' // optional if you want slightly rounded corners
  }}
/>

                      <Stack spacing={0}>
                        <Typography
                          className="country-name"
                          variant="body1"
                          sx={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: "#333",
                            lineHeight: 1.2,
                          }}
                        >
                          {supplier.country}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#888",
                            lineHeight: 1.2,
                          }}
                        >
                          {supplier.website}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Box>
        </Stack>
    </Box>
  )
}
