"use client"

import { Box, Button, Stack, Typography } from "@mui/material"
import ShoppingCart from "../components/ShoppingCart"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import Banner from "../components/Banner"
import { useAddToCartMutation, useCartPrductsQuery } from "../redux/api/productApi"
import { useErrors } from "../Hooks/Hook"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import Loader from "../layout/Loader"


const Cart = () => {
  const { user, loading } = useSelector((state) => state.userReducer)

  console.log(user)

   const [isAddingToCart,setIsAddingToCart] = useState(false)
    const [addToCart] = useAddToCartMutation();
    
  
   
      
   
      const handleAddToCart = async(id)=>{
            if (!user?._id) {
        toast.error("Please login to add or remove items to wishlist")
        navigate("/login")
        return
      }
  
   
      try {
        const res = await addToCart({
          userId: user?._id,
          productId: id,
        })
  
        if (res.data?.success) {
          refetch()
          toast.success(res.data.message)
          setIsAddingToCart(true)
        } else {
          toast.error(res.data?.error || "Something Went Wrong")
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message || "Something Went Wrong")
      }
    }

  const [products, setProducts] = useState([])

  const {
    data: data1,
    isLoading: isLoading1,
    isError: isError1,
    error: error1,
    refetch
  } = useCartPrductsQuery({
    userId: user?._id,
  })

  console.log(data1)

  useErrors([{ isError: isError1, error: error1 }])

  useEffect(() => {
    if (data1?.cart) {
      setProducts(data1.cart)
      refetch()
    }
  }, [data1,refetch])

  return (
    <Box sx={{ backgroundColor: "#f7fafc", width: "100%", height: "100%", display: "flex" }}>
      <Box
        height={"100%"}
        width={{ xs: "100%", sm: "100%", md: "86%", lg: "83%" }}
        sx={{
          position: "relative",
          left: { xs: 0, sm: 0, md: 80, lg: 140 },
          pt: 2.3,
          px: { xs: 1, sm: 2 },
        }}
      >
        <ShoppingCart products={products} isLoading={isLoading1} refetch={refetch} />
        <Box
          sx={{
            mt: 3,
            mb: 2,
            border: "1px solid rgba(222, 226, 231, 1)",
            borderRadius: "6px",
            backgroundColor: "white",
          }}
        >
          <Stack p={2} width="100%">
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Saved for later
            </Typography>

            <Stack direction={{ xs: "column", sm: "column", md: "row" }} alignItems="center" spacing={2} width="100%">
              {isLoading1? <Loader variant="product"/> : data1?.realted.map((p, index) => (
                <Stack
                  key={index}
                  alignItems="center"
                  sx={{
                    p: 1,
                    width: { xs: "100%", sm: "100%", md: "30%" },
                    height: "50%",
                    borderRadius: "6px",

                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 4px 10px rgba(112, 69, 69, 0.15)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid #eee",
                      borderRadius: "4px",
                    }}
                    width={"100%"}
                    display={"flex"}
                    alignContent={"center"}
                    justifyContent={"center"}
                    p={2}
                  >
                    <Box
                      component="img"
                      src={`${p.images.urls[0]}`}
                      alt={p.name}
                      sx={{
                        width: { xs: 250, sm: 130, md: 160 },
                        height: { xs: 200, sm: 150, md: 160 },
                        objectFit: "cover",
                        borderRadius: "4px",
                        p: 0.5,
                      }}
                    />
                  </Box>
                  <Stack
                    sx={{
                      mt: 1.5,
                      width: { xs: "100%", sm: "100%", md: "80%" },
                      position: "relative",
                      left: { xs: 0, sm: 0, md: -22 },
                      alignItems: { xs: "center", sm: "center", md: "flex-start" },
                    }}
                  >
                    <Typography variant="body2" color="rgba(80, 80, 80, 1)" sx={{ mb: 0.5 }}>
                      {p?.pricing.amount}
                    </Typography>

                    <Typography variant="body2" color="rgba(139, 150, 165, 1)" sx={{ fontWeight: 500 }}>
                      {p?.name}
                    </Typography>

                    <Button
                      sx={{
                        border: "1px solid rgba(222, 226, 231, 1)",
                        borderRadius: "6px",
                        width: { xs: "200px", sm: "200px", md: "180px" },
                        fontSize: "14px",
                        mt: 1,
                      }}
                    
                                      onClick={()=>handleAddToCart(p._id)}

                    >
                      <ShoppingCartIcon /> 
                      &nbsp;  Move to cart
                    </Button>
                  </Stack>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Box>

        <Banner />
      </Box>
    </Box>
  )
}

export default Cart
