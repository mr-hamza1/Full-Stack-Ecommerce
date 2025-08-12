import React from "react";
import {
  Box,
  Grid,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Chip,
  Rating,
  IconButton,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import CardView from "./CardView";
import GridView from "../modules/Filtering/GridView";

const ProductCard = ({ products, favorites, toggleFavorite, viewMode }) => {
  console.log(viewMode)
  return (
<Grid container spacing={2}>
  {viewMode === "list" && (
    <Grid item xs={12}>
      <GridView
        products={products}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </Grid>
  )}

  {viewMode === "grid" &&
    products.map((product) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={4}
        key={product._id}
        width={{xs: "45%" , md: "30%", lg: "31%" }}
        ml={{xs:0.8 , md: 1.4}}

      >
        <CardView product={product} />
      </Grid>
    ))}
</Grid>


      
  );
};

export default ProductCard;
