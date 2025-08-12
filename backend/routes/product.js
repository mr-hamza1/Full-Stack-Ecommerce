import express from 'express'
import { singleUpload, multipleUpload } from '../middelwares/multer.js';
import { 
    addToCart,
    allCartProducts,
    allWishlistProducts,
    deleteProduct,
     getAdminProducts, 
     getAllCategories,
     getLatestProduct, 
     getSingleProduct, 
     newProduct, 
     searchAllProduct, 
     updateProduct, 
     wishlistProduct,
     deleteFromCart,
    } from '../controllers/product.js';
import { adminOnly } from '../middelwares/auth.js';

const app = express.Router();

app.post("/new",adminOnly, multipleUpload, newProduct)

app.get("/latest", getLatestProduct)

app.get("/all", searchAllProduct)


// app.post("/wish", wishlistProduct)

app.post("/cart", addToCart)

app.delete("/deleteCart", deleteFromCart)

app.get("/cartProducts", allCartProducts)

app.get("/fav", allWishlistProducts)

app.get("/categories", getAllCategories)

app.get("/admin-products",adminOnly, getAdminProducts)

app.route("/:id")
        .get(getSingleProduct)
        .put(adminOnly,singleUpload, updateProduct)
        .delete(adminOnly,deleteProduct)





export default app;