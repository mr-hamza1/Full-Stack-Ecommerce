"use client"

import { Box, Card, CardContent, CardMedia, Stack, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Recommended = ({recommendedData, isLoading}) => {
     const navigate = useNavigate();
   
  return (
    <Box
      sx={{
        width: "100%",
        // maxWidth: "1200px",
        mx: "auto",
        pt: 2,
        pb: 2,
        backgroundColor: "#f7fafc",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#1a1a1a",
            fontSize: "18px",
          }}
        >
          Recommended Items
        </Typography>

      </Box>

      {/* Products Grid - Fixed 5 columns */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {xs:"repeat(2, 1fr)",sm:"repeat(3, 1fr)", md:"repeat(5, 1fr)",},
          gap: 2,
        }}
      >
        {isLoading? "loading" : recommendedData?.map((product) => (
          <Card
            key={product._id}
            sx={{
              width: "100%",
              height: "250px", // Fixed height for all cards
              border: "1px solid #e0e0e0",
              borderRadius: "5px",
              boxShadow: "none",
              transition: "box-shadow 0.2s ease-in-out",
              display: "flex",
              flexDirection: "column",
                                 "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }
            }}
                onClick={()=> navigate(`/productDetails/${product._id}`)}
 >
            <CardMedia
              sx={{
                position: "relative",
                mt:0.6,
                ml:{xs:4, sm:8, md: 2.5, lg:5.8},
                top: 10,
                height: "130px", // Fixed image height
                width: "130px",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              image={product.images.urls[0]}
              title={product?.details.info}
            />
            <CardContent
              sx={{
                flex: 1,
                p: 2,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                "&:last-child": {
                },
              }}
            >
              <Stack spacing={0.5}   position={"relative"}
                top={20}
                >
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                  }}
                >
                  ${product?.pricing.amount}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "15px",
                    color: "#666",
                    lineHeight: 1.3,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: 350,
                  }}
                >
                  {product?.details.info}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  )
}

export default Recommended
