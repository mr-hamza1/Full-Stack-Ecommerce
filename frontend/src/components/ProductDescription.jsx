"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { Check } from "@mui/icons-material";

import img1 from "../assets/Home/recommended/1.png"
import { useNavigate, useParams } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api/productApi";
import { useErrors } from "../Hooks/Hook";

// TabPanel Component
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// Data
const relatedProducts = [
  { id: 1, name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/placeholder.svg?text=Product1" },
  { id: 2, name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/placeholder.svg?text=Product2" },
  { id: 3, name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/placeholder.svg?text=Product3" },
  { id: 4, name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/placeholder.svg?text=Product4" },
  { id: 5, name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/placeholder.svg?text=Product5" },
  { id: 6, name: "Xiaomi Redmi 8 Original", price: "$32.00-$40.00", image: "/placeholder.svg?text=Product6" },
];


export default function ProductDescription({like, related}) {

    const navigate = useNavigate();
   console.log(like)

  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  const specifications = [
    { label: "Model", value: "MT6B8857" },
    { label: "Style", value: "Classic style" },
    { label: "Certificate", value: "ISO 9001:2012" },
    { label: "Size", value: "34mm x 450mm x 18mm" },
    { label: "Memory", value: "32GB RAM" },
  ];

  const features = [
    "Some great feature name here",
    "Lorem ipsum dolor sit amet, consectetur",
    "Duis aute irure dolor in reprehenderit",
    "Some great feature name here",
  ];

  return (
    <Box pt={3}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 , }}>
        
        {/* Left Section - Main Content */}
        <Box sx={{ flex: 1, backgroundColor:"white",
          border:"1px solid rgba(222, 226, 231, 1)",
          borderRadius: "6px",
         }} pt={2} pl={2} pr={2}  >
          {/* Tabs */}
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 1, borderBottom: 1, borderColor: "divider" }}>
            {["Description", "Reviews", "Shipping", "About seller"].map((label, i) => (
              <Tab key={i} label={label} id={`tab-${i}`} aria-controls={`tabpanel-${i}`} />
            ))}
          </Tabs>

          {/* Tab Content */}
          <TabPanel value={tabValue} index={0}>
       
            <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6, color: "text.secondary" }}>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore...
 Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>

            {/* Specs Table */}
            <TableContainer  sx={{ mb: 1, border: "1px solid #e0e0e0", width: "70%" }}>
              <Table>
                <TableBody>
                  {specifications.map((spec, i) => (
                    <TableRow key={i}>
                      <TableCell sx={{ fontWeight: 600, width: "35%", bgcolor: "#f9f9f9" }}>{spec.label}</TableCell>
                      <TableCell>{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Features */}
            <List pb={0}>
              {features.map((feature, i) => (
                <ListItem key={i} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    <Check sx={{ color: "success.main", fontSize: 20 }} />
                  </ListItemIcon>
                  <ListItemText primary={feature} primaryTypographyProps={{ variant: "body2", color: "text.secondary" }} />
                </ListItem>
              ))}
            </List>
          </TabPanel>

          {/* Other Tabs */}
          <TabPanel value={tabValue} index={1}><Typography>Reviews content goes here...</Typography></TabPanel>
          <TabPanel value={tabValue} index={2}><Typography>Shipping info goes here...</Typography></TabPanel>
          <TabPanel value={tabValue} index={3}><Typography>About seller info goes here...</Typography></TabPanel>
        </Box>

        {/* Right Section - Sidebar */}
        <Box sx={{ flex: "0 0 280px", backgroundColor:"white", border:"1px solid rgba(222, 226, 231, 1)",
          borderRadius: "6px", }} p={2} height={"20%"}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>You may like</Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {like.map((p) => (
              <Box 
               onClick={()=> navigate(`/productDetails/${p._id}`)}
              sx={{     
                display: "flex", p: 1.5, 
                               "&:hover": {
      transform: "translateY(5px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.4)",
    }}}
              >
                <Box sx={{ width: 60, height: 60, border:"1px solid rgba(222, 226, 231, 1)",
                 borderRadius: "6px", mr: 1.5, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src={p.images.urls[0]} alt={p.name} style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ mb: 0.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.name}</Typography>
                  <Typography variant="body2" color="rgba(139, 150, 165, 1)" sx={{ fontWeight: 600 }}>{p.pricing.amount}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>


      </Box>

      
                 {/* Related Products */}
<Box
  sx={{
    mt: 3,
    mb: 2,
    border: "1px solid rgba(222, 226, 231, 1)",
    borderRadius: "6px",
    backgroundColor: "white"
  }}
>
  <Stack p={2} width="100%">
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
      Related products
    </Typography>

    <Stack direction="row" alignItems="center" spacing={2} width="100%" sx={{
                     overflowX: "auto", pb: 1 ,
   }}>
      {related.map((p, index) => (
        <Stack
          key={index}
          alignItems="center"
          sx={{
            p: 1,
            width: "200px",
            height:"50%",
            
             "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
    }

          }}
                         onClick={()=> navigate(`/productDetails/${p._id}`)}

        >
         <Box bgcolor={"rgba(238, 238, 238, 1)"} sx={{  
           border: "1px solid #eee",
            borderRadius: "4px",
            }} width={"100%"}  display={"flex"} alignContent={"center"} justifyContent={"center"}>
           <Box
            component="img"
            src={p.images.urls[0]}  // use p.image if available
            alt={p.name}
            sx={{ width: 120, height: 150, objectFit: "cover", borderRadius: "4px", p:0.5 }}
          />
         </Box>
          <Stack sx={{ ml: 1.5, mt: 1.5,  }} width={"80%"}>
            <Typography variant="body2" color="rgba(80, 80, 80, 1)" sx={{ mb: 0.5 }}>
              {p.name}
            </Typography>
            <Typography variant="body2" color="rgba(139, 150, 165, 1)" sx={{ fontWeight: 600 }}>
              {p.pricing.amount}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  </Stack>
</Box>

    </Box>
  );
}
