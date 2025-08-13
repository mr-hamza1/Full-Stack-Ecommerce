import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  Select,
  MenuItem,
  FormControl,
  Divider,
  Link,
  Grid,
  Paper,
} from "@mui/material"
import { ArrowBack, Security, Support, LocalShipping } from "@mui/icons-material"

import img1 from "../assets/Home/recommended/1.png"
import img2 from "../assets/Home/interior/1.jpg"
import { useDeleteCartItemMutation } from "../redux/api/productApi"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Loader from "../layout/Loader"




export default function ShoppingCart({products, isLoading, refetch}) {

    const { user, loading } = useSelector((state) => state.userReducer)
   
    const navigate = useNavigate()

   const [deleteItem] = useDeleteCartItemMutation()

    const handleDeleteItem = async(id)=>{
            if (!user?._id) {
        toast.error("Please login to add or remove items to wishlist")
        navigate("/login")
        return
      }
  
   
      try {
        const res = await deleteItem({
          userId: user?._id,
          id: id,
        })
  
        if (res.data?.success) {
          refetch()
          toast.success(res.data.message)
        } else {
          toast.error(res.data?.error || "Something Went Wrong")
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message || "Something Went Wrong")
      }
    }


  const subtotal = 1403.97
  const discount = 60.0
  const tax = 14.0
  const total = 1357.97

  console.log(products)

  return (
    <Box width={"100%"}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", mt: 6 }} >
        My cart (3)
      </Typography>
      <Stack direction={{xs: "column",md:"row"}} width={"100%"} >
        {/* Cart Items Section */}
           <Stack bgcolor={"white"} width={{xs:"100%", md:"70%"}} p={3} sx={{  border:"1px solid rgba(222, 226, 231, 1)",
          borderRadius: "6px", maxHeight: "450px",
        overflowY: "auto",}} >
        <Stack spacing={2} bgcolor={"white"} width={"100%"} sx={{
           }} >
            {isLoading?  <Loader  variant="cart"/> : products.length<= 0? 
           < Typography textAlign={"center"} fontWeight={"bold"} fontSize={"20px"} mb={20}>
            No Product in cart
           </Typography>
            : products?.map((item) => (
              <Card key={item.id} sx={{ p: 2,             "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    } }}>
      
      <Stack
  direction="column"
  spacing={2}
  sx={{
    display: { xs: "flex", sm: "flex", md: "none", lg: "none" },
    p: 2,
    border: "1px solid #eee",
    borderRadius: 1
  }}
>
  {/* Image + Info */}
  <Stack direction="row" spacing={2} alignItems="flex-start">
    <Box
      component="img"
      src={item.productId.images.urls[0]}
      alt={item.productId.name}
      sx={{
        width: 150,
        height: 120,
        objectFit: "cover",
        borderRadius: 1,
        p: 1
      }}
    />

    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
        {item.productId.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {item.productId?.size && `Size: ${item.productId.size}, `}
        {item.productId?.color && `Color: ${item.productId.color}, `}
        Material: Best Quality
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Seller: {item.productId.brand}
      </Typography>
    </Box>
  </Stack>

  {/* Price + Qty + Remove */}
  <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      ${item.productId.pricing.amount.toFixed(2)}
    </Typography>

    <FormControl size="small" sx={{ minWidth: 80 }}>
      <Select value={item.quantity} displayEmpty>
        <MenuItem value={item.quantity}>Qty: {item.quantity}</MenuItem>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <MenuItem key={num} value={num}>
            Qty: {num}
          </MenuItem>
        ))}
      </Select>
    </FormControl>

    <Button color="error" variant="outlined" onClick={() =>handleDeleteItem(item._id)}>
      Remove
    </Button>
  </Stack>
</Stack>


                <Box sx={{ display: {xs:"none",md:"flex"}, gap: 2 }}>
                  <Box
                    component="img"
                    src={item.productId.images.urls[0]}
                    alt={item.productId.name}
                    sx={{
                      width: 150,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: 1,
                      p:1
                    }}
                  />

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500, mb: 1 }}>
                      {item.productId.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {item.productId?.size && `Size: ${item.productId?.size},`}
                      {item.productId?.color && `Color: ${item.productId.color},`}
                       Material: Best Quality
                                           </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Seller: {item.productId.brand}
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Button  color="error" variant="outlined"onClick={() => handleDeleteItem(item._id)}
>
                        Remove
                      </Button>
                      {/* <Link href="#" color="primary" underline="hover" variant="body2">
                        Save for later
                      </Link> */}
                    </Stack>
                  </Box>

                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                      ${item.productId.pricing.amount.toFixed(2)}
                    </Typography>

                    <FormControl size="small" sx={{ minWidth: 80 }}>
                      <Select value={item.quantity} displayEmpty>
                        <MenuItem value={item.quantity}>Qty: {item.quantity}</MenuItem>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <MenuItem key={num} value={num}>
                            Qty: {num}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
          
      {/* Bottom Actions */}
   {!isLoading &&
    products?.length> 0 &&
       <Box sx={{ mt: 4, mb: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Button startIcon={<ArrowBack />} variant="outlined" onClick={()=> navigate("/")} sx={{ textTransform: "none" }}>
            Back to shop
          </Button>

        </Stack>
      </Box>
   }
           </Stack>

        {/* Order Summary Section */}
           <Stack width={{xs:"88%",md:"28%"} } mt={{xs:3, md:"none"}} height={"50%"} ml={3} sx={{            
             "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }
    }}>
             <Card sx={{ p: 3, top: 20 }}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Have a coupon?
                </Typography>
                <Stack direction={{md:"column", lg:"row"}} spacing={1}>
                  <Box
                    component="input"
                    placeholder="Add coupon"
                    sx={{
                      flex: 1,
                      p: 1,
                      border: "1px solid #ddd",
                      borderRadius: 1,
                      fontSize: "14px",
                    }}
                  />
                  <Button variant="text" size="small" sx={{ border: "1px solid #ddd",
                      borderRadius: 1,
                      bgcolor:"#f7fafc"
                      }}>
                    Apply
                  </Button>
                </Stack>
              </Box>

              <Divider />

              <Stack spacing={1}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Subtotal:</Typography>
                  <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Discount:</Typography>
                  <Typography variant="body2" color="success.main">
                    -${discount.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Tax:</Typography>
                  <Typography variant="body2" color="success.main">
                    +${tax.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>

              <Divider />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Total:
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "rgba(0, 181, 23, 1)",
                  "&:hover": { bgcolor: "rgba(0, 181, 23, 1)" },
                  py: 1,
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Checkout
              </Button>

              <Stack
  direction="row"
  spacing={3}
  justifyContent="center"
  sx={{ mt: 3 }}
>
  <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" sx={{ height: 20 }} />
  <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="Mastercard" sx={{ height: 24 }} />
  <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" sx={{ height: 20 }} />
  <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" sx={{ height: 24 }} />
</Stack>

            </Stack>
          </Card>
           </Stack>
       </Stack>


      {/* Feature Cards */}
      <Grid container spacing={2} sx={{ mt: 4,mb:2 }} gap={{md:5, lg:18}} display={{xs:"none",md:"flex"}}>
        <Grid item xs={12} md={4}> 
          <Paper sx={{ p: 2, textAlign: "center",
             "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    } }}>
            <Security sx={{ fontSize: 30, color: "text.secondary", mb: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Secure payment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Have you ever finally just
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center",
             "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    } }}>
            <Support sx={{ fontSize: 30, color: "text.secondary", mb: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Customer support
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Have you ever finally just
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, textAlign: "center",
             "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    } }}>
            <LocalShipping sx={{ fontSize: 30, color: "text.secondary", mb: 1 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
              Free delivery
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Have you ever finally just
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
 