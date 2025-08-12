import { myCache } from "../app.js";
import { TryCatch } from "../middelwares/error.js";
import { Product } from "../models/product.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { deleteFromCloudinary, invalidateCache, uploadFileToCloudinary } from "../utils/feature.js";
import { Wishlist } from "../models/wishlist.js";
import { Cart } from "../models/cart.js";



const newProduct = TryCatch(async (req, res, next) => {
    const {
        name,
        category,
        productType,
        productDesign,
        warranty,
        searchCategory,
        stock,
        details,
        priceType,
        price,
        discount,
        brand,
        shipping,
        priceRange
    } = req.body;

    const photos = req.files;

    // ===== VALIDATIONS =====

    if (!priceType) {
        return next(new ErrorHandler("Please Select Price Type", 400));
    }

    if (priceType === 'fixed' && !price) {
        return next(new ErrorHandler("Please Enter Price for Fixed Pricing", 400));
    }

    if (priceType === 'range' && !priceRange) {
        return next(new ErrorHandler("Please Select Price Range", 400));
    }

    if (!photos || photos.length === 0) {
        return next(new ErrorHandler("Please Upload At Least One Photo", 400));
    }

    // ===== UPLOAD IMAGES TO CLOUDINARY =====

    const photoUploadPromises = photos.map(photo => uploadFileToCloudinary(photo));
    const uploadResults = await Promise.all(photoUploadPromises);
    console.log(uploadResults)

    // ===== PARSE DETAILS =====

    let parsedDetails;
    try {
        parsedDetails = typeof details === 'string' ? JSON.parse(details) : details;
    } catch (err) {
        return next(new ErrorHandler("Invalid details format", 400));
    }

    if (category.toLowerCase() === 'electronics' && !parsedDetails.model) {
        return next(new ErrorHandler("Model is required for electronics", 400));
    }

    // ===== PRICING OBJECT =====

    const pricingData = { type: priceType };

    if (priceType === 'fixed') {
        pricingData.amount = parseFloat(price);
    } else if (priceType === 'range') {
        pricingData.range = priceRange;
        pricingData.amount = parseFloat(price);
    } else  {
        pricingData.amount = parseFloat(price);
    }

    // ===== PHOTOS OBJECT =====

    const photosData = {
        urls: uploadResults.map(result => result.url),
        image_ids: uploadResults.map(result => result.image_id)
    };

    // ===== CREATE PRODUCT =====

    await Product.create({
        name: name.trim(),
        category: category.toLowerCase(),
        productType: productType.trim(),
        productDesign: productDesign?.trim() || undefined,
        warranty: warranty || 'no-warranty',
        searchCategory: searchCategory?.trim() || category.toLowerCase(),
        pricing: pricingData,
        shipping,
        discount,
        brand,
        stock: parseInt(stock),
        images: photosData,
        details: {
            info: parsedDetails.info || '',
            colors: parsedDetails.colors || [],
            sizes: parsedDetails.sizes || parsedDetails.size || [],
            model: parsedDetails.model || undefined
        },
        tags: parsedDetails.tags || [],
        metaDescription: parsedDetails.metaDescription || undefined
    });

    // ===== INVALIDATE CACHE =====

    invalidateCache({ product: true, admin: true });

    return res.status(201).json({
        success: true,
        message: "Product Created Successfully!"
    });
});

const getLatestProduct = TryCatch(async (req, res, next) => {
  let products;

  if (myCache.has("latest-products")) {
    products = JSON.parse(myCache.get("latest-products"));
  } else {
    const deals = await Product.find({
  discount: { $gte: 8 } // Filter products with discount >= 8
})
.sort({ createdAt: -1 }) // Sort by most recent first
.limit(5); // Only return 5 products


    const electronics = await Product.find({ category: "electronics" })
      .sort({ createdAt: -1 })
      .limit(8);

    const home = await Product.find({ category: "home" })
      .sort({ createdAt: -1 })
      .limit(8);

    const recommendedFashion = await Product.find({ category: "fashion" })
      .sort({ createdAt: -1 })
      .limit(10);

    products = {
      deals,
      electronics,
      home,
      recommendedFashion,
    };

    myCache.set("latest-products", JSON.stringify(products));
  }

  return res.status(200).json({
    success: true,
    products,
  });
});

const getAllCategories = TryCatch(async (req, res, next) => {
  let combinedCategories;

  if (myCache.has("categories")) {
    combinedCategories = JSON.parse(myCache.get("categories"));
  } else {
    const categoriesByProductType = await Product.distinct("productType");
    const categoriesByType = await Product.distinct("category");
const brands = await Product.aggregate([
  {
    $group: {
      _id: { brand: "$brand", category: "$category" }
    }
  },
  {
    $project: {
      _id: 0,
      brand: "$_id.brand",
      category: "$_id.category"
    }
  }
]);

    combinedCategories = {
      categoriesByType,
      categoriesByProductType,
      brands,
    }

    myCache.set("categories", JSON.stringify(combinedCategories));
  }

  return res.status(200).json({
    success: true,
    categories:combinedCategories,
  });
});


const getAdminProducts = TryCatch(async(req, res, next) => {
  
  let products;

  if(myCache.has("all-products")){
    products = JSON.parse(myCache.get("all-products"))
  }
  else{
    products = await Product.find({})
    myCache.set("all-products", JSON.stringify(products))
  }

   return res.status(200).json({
       success: true,
       products,
     })

} )

const getSingleProduct = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  let product;
  let mayLike = [];
  let random = [];

  if (myCache.has(`product-${id}`)) {
    product = JSON.parse(myCache.get(`product-${id}`));
  } else {
    product = await Product.findById(id);
    if (!product) {
      return next(new ErrorHandler("Product Not Found", 404));
    }

    // cache the product
    myCache.set(`product-${id}`, JSON.stringify(product));
  }

  // always fetch these fresh (not cached)
  mayLike = await Product.aggregate([{ $sample: { size: 5 } }]);
  random = await Product.aggregate([
    { $match: { productType: product.productType, _id: { $ne: product._id } } },
    { $sample: { size: 6 } }
  ]);
  if(random.length < 6){
  random = await Product.aggregate(
   [{ $sample: { size: 6 } }]
  );
 
  }

  return res.status(200).json({
    success: true,
    product,
    mayLike,
    random,
  });
});


const wishlistProduct = TryCatch(async (req, res, next) => {
  const {userId, wishlist, productId } = req.body;

  if (!userId || typeof wishlist === "undefined" || !productId) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const fav = await Wishlist.findOne({ productId, userId });

  if (fav) {
    await fav.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product removed from Favourites",
    });
  } else {
    await Wishlist.create({
      userId,
      productId,
      wishlist,
    });

    return res.status(200).json({
      success: true,
      message: "Product added to Favourites",
    });
  }
});

const addToCart = TryCatch(async (req, res, next) => {
  const { userId, productId } = req.body;


  if (!userId || !productId) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  const existingCartItem = await Cart.findOne({ productId, userId });

  if (existingCartItem) {
    return res.status(200).json({
      success: true,
      message: "Product already in Cart",
    });
  }

  await Cart.create({
    userId,
    productId,
  });

  return res.status(200).json({
    success: true,
    message: "Product added to Cart",
  });
});




const allWishlistProducts = TryCatch(async(req, res, next) => {
     
  const { productId , userId } = req.query;

  if(productId ) { /// its only used when userID not available for single cart showing its favourite or not
    
     const wish = await Wishlist.findOne({productId});


     return res.status(200).json({
       success: true,
       wish,
     })
  }

  if(!userId){
    return next(new ErrorHandler("userId missing", 404))
  }


const favourites = await Wishlist.find({ userId, wishlist: true }).populate('productId');

    if(!favourites ) {

       return res.status(200).json({
       success: true,
       favourites: false
     })   

    }

       return res.status(200).json({
       success: true,
       favourites,
     })

} )

const allCartProducts = TryCatch(async(req, res, next) => {
  const { productId , userId} = req.query;

  let cart;

  const realted = await Product.find().limit(4);

  if(productId && userId ) { 
    
      cart = await Cart.findOne({userId, productId});
      
     return res.status(200).json({
       success: true,
       cart: cart? true: false,
       
     })
  }

cart = await Cart.find({ userId }).populate('productId');


    if(!cart ) {

       return res.status(200).json({
       success: true,
       cart: false,
       realted,
     })   

    }
       return res.status(200).json({
       success: true,
       cart,
       productLength: cart.length,
       realted,
     })

} )

const updateProduct = TryCatch(async(req, res, next) => {

  const { id } = req.params


  const {name, category, price,  stock} = req.body;
  const photo = req.file

  if(!name && !category && !price && !stock && !photo){
    return next(new ErrorHandler("Nothing to Update", 400))
}

  const product = await Product.findById(id)

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404))
  }

  if (photo) {
    await deleteFromCloudinary(product.images.image_ids[0]);
    const result = await uploadFileToCloudinary(photo);
    product.images.urls[0] = result.url;
    product.images.image_ids[0] = result.image_id;
  }

  if(name) product.name = name;
  if(price) product.pricing.amount = price;
  if(stock) product.stock = stock;
  if(category) product.category = category;

  await product.save();

  invalidateCache({product : true, admin: true,  productId: String(product._id) });


  return res.status(200).json({
      success: true,
      message: "Product Updated Successfully!"
    })

} )


const deleteProduct = TryCatch(async(req, res, next) => {
   
  const id = req.params.id
  const product = await Product.findById(id)

 if (!product) {
  return next(new ErrorHandler("Product Not Found", 404))
}

  await deleteFromCloudinary(product.images.image_ids[0])
  
  await product.deleteOne();

  invalidateCache({product : true, admin: true,  productId: String(product._id) });

  return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully!"
    })

} )

const searchAllProduct = TryCatch(async (req, res, next) => {
  const { search, category, maxPrice, sort, brands, featureds } = req.query;
    
  let { minPrice } = req.query;

  if (!minPrice || minPrice === "undefined") minPrice = 0;

  const page = Number(req.query.page) || 1;
  const limit = Number(process.env.LIMIT) || 12;
  const skip = (page - 1) * limit;

  const baseQuery = {};

  // Search filter
  if (search) {
    baseQuery.name = { $regex: search, $options: "i" };
  }
    if (brands) {
      // brands can be a string or array (thanks to frontend code)
      const brandsArray = Array.isArray(brands) ? brands : [brands];
      baseQuery.brand = { $in: brandsArray };
    }
    if (featureds) {
      // featureds can be a string or array (thanks to frontend code)
      const featuredsArray = Array.isArray(featureds) ? featureds : [featureds];
      baseQuery.category = { $in: featuredsArray };
    }

  // Price filter (works even if minPrice is 0)
  if (minPrice !== undefined && maxPrice !== undefined) {
    baseQuery["pricing.amount"] = {
      $gte: Number(minPrice),
      $lte: Number(maxPrice)
    };
  }

  // Category filter
  if (category  &&  category != "all") {
    if (["electronics", "fashion", "beauty", "sports", "accessories"].includes(category)) {
      baseQuery["category"] = category;
    } else  {
      baseQuery.productType = category;
    }
      
  }

  // Fetch data
  const [products, totalCount, recommended] = await Promise.all([
    Product.find(baseQuery)
      .sort(sort ? { "pricing.amount": sort === "asc" ? 1 : -1 } : {})
      .limit(limit)
      .skip(skip),
    Product.countDocuments(baseQuery),
    Product.aggregate([{ $sample: { size: 4 } }]),
]);

  const totalPages = Math.ceil(totalCount / limit);

  return res.status(200).json({
    success: true,
    products,
    totalPages,
    recommended,
  });
});


const deleteFromCart = TryCatch(async(req, res, next) => {
   
  const {id, userId} = req.query
  const product = await Cart.findOne({_id: id, userId: userId })


 if (!product) {
  return next(new ErrorHandler("Product Not Found", 404))
}

  await product.deleteOne();


  return res.status(200).json({
      success: true,
      message: `Product Deleted From Cart`,
    })

} )


export {
  newProduct,
  deleteFromCart,
  getLatestProduct,
  getAllCategories, 
  getAdminProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchAllProduct,
  wishlistProduct,
  allWishlistProducts,
  addToCart,
  allCartProducts,
}