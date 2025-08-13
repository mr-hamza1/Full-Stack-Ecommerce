"use client";

import React, { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Rating,
  Button,
  Chip,
  Avatar,
  Card,
  CardContent,
  Stack
} from '@mui/material'
import { FavoriteBorder, Person, LocalShipping, CheckCircle, ShoppingCart } from '@mui/icons-material'

import img from "../assets/Home/recommended/1.png"
import img2 from "../assets/Home/recommended/3.png"
import ProductDescription from '../components/ProductDescription';
import Banner from '../components/Banner';
import { useAddToCartMutation, useCartPrductsQuery, useProductDetailsQuery } from '../redux/api/productApi';
import { useErrors } from '../Hooks/Hook';
import { useParams } from 'react-router-dom';
import Loader from '../layout/Loader';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

// ✅ Define thumbnails to avoid reference errors


const Product = () => {
  const { id } = useParams();
    const { data, isLoading, isError, error } = useProductDetailsQuery(id)
      useErrors([{isError,error}])
  
      const [product, setProduct] = useState("")
      const [like, setLike] = useState([])
      const [related, setRelated] = useState([])
        const [addedToCart, setAddedToCart] = useState(false)
        const [isAddingToCart, setIsAddingToCart] = useState(false)
        const [thumbnails, setThumbnails] = useState([])

      const {user, loading} = useSelector((state) => state.userReducer)
  
      console.log(data)
  
      useEffect(() => {
      if (data?.product) {
       setProduct(data.product)
       setLike(data.mayLike)
       setRelated(data.random)
       setThumbnails(data?.product?.images.urls)
      }
    }, [data])


    const [productImage, setProductImage] =useState(thumbnails[0])
    
  const [addToCart] = useAddToCartMutation();
  
      let { data: data1, isLoading: isLoading1, isError: isError1, error: error1 } = useCartPrductsQuery( { 
        userId: user?._id,
        productId: data?.product._id
        });

  useErrors([{ isError: isError1, error: error1 }]);

      useEffect(() => {
      if (data?.product) {
       setProduct(data.product)
       setThumbnails(data?.product?.images.urls)
      }
    }, [data])

    console.log(data1)

      useEffect(() => {
      if (data1?.cart == true) {
        setIsAddingToCart(true)
      }
    }, [data1])

    
 
    const handleAddToCart = async()=>{
          if (!user?._id) {
      toast.error("Please login to add or remove items to wishlist")
      navigate("/login")
      return
    }

 
    try {
      const res = await addToCart({
        userId: user?._id,
        productId: data?.product._id,
      })

      if (res.data?.success) {
        toast.success(res.data.message)
        setAddedToCart(true)
      } else {
        toast.error(res.data?.error || "Something Went Wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message || "Something Went Wrong")
    }
  }



  return (
    isLoading? <Loader /> :
        <Box sx={{ backgroundColor: "#f7fafc",width:"100%", height: "100%", display: "flex" }}
        mt={{xs: 7, md: "none"}}
        overflow={"hidden"}
        >
      <Box
        height={"100%"}
        width={{ xs:"100%" ,md:"86%", lg:"83%"}}
        sx={{
          position: "relative",
          left: {md:80, lg:140},
          pt: 2.3
        }}
      >
                

     <Box sx={{ display: 'flex', gap: 3, 
     flexWrap: { xs: 'wrap', md: 'nowrap' },
      p: 2 ,
      backgroundColor: "white",
      border:"1px solid rgba(222, 226, 231, 1)",
      borderRadius: "6px",
      width:"100%"
    }} 
      
      >
      
      {/* Left Section - Product Images */}
      <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '30%' } }}>
        {/* Main Product Image */}
        <Box
          sx={{
            width: '100%',
            height: {md:"50%", lg:"80%"},
            bgcolor: 'white',
            borderRadius: 2,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #e0e0e0',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
          }}
        >
          <Box
            component="img"
            src={`${product?.images?.urls[0]}`}
            alt="Product"
            sx={{
              maxWidth: '90%',
              maxHeight: '90%',
              objectFit: 'contain'
            }}
          />
        </Box>

        {/* Thumbnail Images */}
        <Box sx={{ display: 'flex', gap: 1, }}>
          {thumbnails.map((thumb, index) => (
            <Box
              key={index}
              sx={{
                width: 56,
                height: 56,
                bgcolor: 'white',
                borderRadius: 1,
                border:  thumb === productImage? '2px solid #046dff' : '1px solid #e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: '0.2s',
                '&:hover': {
                  border: '2px solid #1976d2'
                }
              }}
            >
              <Box
                component="img"
                src={thumb}
                alt={`Thumbnail ${index + 1}`}
                sx={{
                  width: '90%',
                  height: '90%',
                  objectFit: 'contain'
                }}
                onClick={()=> setProductImage(thumb)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Middle Section - Product Details */}
      <Box width={{md:"50%", lg:"40%"}} pl={1} pb={2}>
        {/* Stock Status */}
        <Chip
          label="✓ In stock"
          size="small"
          sx={{ bgcolor: '#e8f5e8', color: '#2e7d32', fontWeight: 'bold', mb: 2 }}
        />

        {/* Product Title */}
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          {product?.name}
        </Typography>

        {/* Rating and Reviews */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Rating value={3} precision={0.1} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">{product?.rating?.average?.toPrecision(2)}</Typography>
          <Typography variant="body2" color="text.secondary">31 reviews</Typography>
          <Typography variant="body2" color="text.secondary">({product?.rating?.count} sold)</Typography>
        </Box>

        {/* Pricing */}
        <Box sx={{ mb: 3 ,backgroundColor: "#fff0df"}} p={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
             <Stack pr={3}>
                <Typography variant="h5" sx={{ color: '#ff5722', fontWeight: 'bold',}}>
              ${product?.pricing?.amount}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} >
            50-199 pcs 
          </Typography>
             </Stack>
             <Stack borderLeft={"1px solid rgba(189, 193, 200, 1)"} pl={2} pr={4}>
                <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold',}}>
{product?.pricing?.amount != null 
  ? `$${(product.pricing.amount * 0.9).toFixed()}` 
  : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
            100-499 pcs
          </Typography>
             </Stack>
             <Stack  borderLeft={"1px solid rgba(189, 193, 200, 1)"} pl={2}>
                <Typography variant="h5" sx={{ color: 'black', fontWeight: 'bold',}}>
{product?.pricing?.amount != null 
  ? `$${(product.pricing.amount * 0.85).toFixed()}` 
  : "N/A"}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
            500+ pcs
          </Typography>
             </Stack>
            </Box>
              </Box>

        {/* Product Specifications */}
        {[
          ["Price", `${product?.pricing?.type}`],
          ["Type", `${product?.productType}`],
          ["Material", "Plastic material"],
          ["Design", `${product?.productDesign} nice`],
          ["Customization", "Customized logo and design custom"],
          ["Protection", "Refund Policy"],
          ["Warranty", `${product?.warranty} full warranty`]
        ].map(([label, value]) => (
          <Box key={label} sx={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 1, mb: 1 }}
          borderBottom={ (label === "Price" || label === "Design" || label === "Warranty") 
             ? "1px solid rgba(224, 224, 224, 1)" 
              : undefined }
          pb={ (label === "Price" || label === "Design" || label === "Warranty") 
             ?  2 
              : undefined }
          >
            <Typography variant="body2" color="text.secondary" fontSize={"16px"} fontWeight={400} pt={1}>{label}:</Typography>
            <Typography variant="body2" pt={1} fontSize={"16px"} fontWeight={400} 
            >{value}</Typography>

          </Box>
        ))}
                     <Button
                variant="contained"
                size="large"
                startIcon={addedToCart ? <CheckCircle /> : <ShoppingCart />}
                onClick={handleAddToCart}
                disabled={isAddingToCart || product?.stock <= 0}
                sx={{
                  flexGrow: 1,
                  py: 1.5,
                  px: {xs: 10,md:15},
                  mt: 1,
                  ml:4.3,
                  border: isAddingToCart && "1px solid green",
                  color: isAddingToCart && "green",
                  bgcolor: addedToCart ? "success.main" : "primary.main",
                  "&:hover": {
                    bgcolor: addedToCart ? "success.dark" : "primary.dark",
                  },
                }}
              >
                {isAddingToCart ? (
                    "Already in cart"
                ) : addedToCart ? (
                  "Added to Cart"
                ) : (
                  "Add to Cart"
                )}
              </Button>
      </Box>

      {/* Right Section - Supplier Info and Actions */}
      <Box sx={{ flex: '0 0 auto', width: { xs: '100%', md: '20%', lg:"25%" } }} pl={{md:1, lg:3}}>
        {/* Supplier Card */}
        <Card sx={{ mb: 2, boxShadow: '0 2px 6px rgba(0,0,0,0.05)' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar sx={{ bgcolor: '#4fc3f7', width: 40, height: 40 }}>R</Avatar>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">Supplier</Typography>
                <Typography variant="body2" color="text.secondary">Guangxi Trading LLC</Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Box component="img" src="/placeholder.svg?height=16&width=24" alt="Germany" sx={{ width: 20, height: 14 }} />
              <Typography variant="body2" color="text.secondary">Germany, Berlin</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
              <Person sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">Verified Seller</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <LocalShipping sx={{ fontSize: 16, color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">Worldwide shipping</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button variant="contained" fullWidth sx={{ bgcolor: '#046dff', py: 1.5, textTransform: 'none', fontWeight: 'bold' }}>
            Send Inquiry
          </Button>
          <Button variant="outlined" fullWidth sx={{ borderColor: '#046dff', color: '#046dff', py: 1.5, textTransform: 'none' }}>
            Seller's profile
          </Button>
          <Button variant="text" fullWidth startIcon={<FavoriteBorder />} sx={{ color: '#046dff', py: 1.5, textTransform: 'none' }}>
            Save for later
          </Button>
        </Box>
      </Box>
    </Box>
        <Box>
            <ProductDescription like={like} related={related} />
        </Box>
        <Banner />
        
      </Box>
      </Box>
  )
}

export default Product;
