"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  IconButton,
  Breadcrumbs,
  Link,
  Pagination,
  FormControlLabel,
  Checkbox,
  Collapse,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Radio,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material"
import {
  Favorite,
  FavoriteBorder,
  ExpandLess,
  ExpandMore,
  ViewModule,
  ViewList,
  NavigateNext,
  FilterList,
  GridView,
  Close,
  Search,
} from "@mui/icons-material"
import img1 from "../assets/Home/tech/1.jpg"
import img2 from "../assets/Home/tech/2.jpg"
import img3 from "../assets/Home/tech/3.jpg"
import img4 from "../assets/Home/tech/4.jpg"
import img5 from "../assets/Home/tech/5.jpg"
import img6 from "../assets/Home/tech/6.jpg"
import ProductCard from "../components/ProductCard"
import PriceRangeFilter from "../modules/Filtering/Range"
import AllFiltering from "../modules/Filtering/AllFiltering"
import CustomPagination from "../modules/pagination"
import { useDispatch, useSelector } from "react-redux"
import { useCategoriesQuery, useSearchProductsQuery } from "../redux/api/productApi"
import { useErrors } from "../Hooks/Hook"
import { useDebounce } from "../modules/Debouncing"
import { useLocation, useParams } from "react-router-dom"
import Recommended from "../modules/Home/Recommended"
import { mobileCategoriesHome, mobileSearchWord } from "../redux/reducer/cartReducer"
import Loader from "../layout/Loader"
import NoProductFound from "../modules/Empty"



const conditons = ["Any", "Refurbished", "Brand new", "Old items"]


export default function ProductListing() {
 const dispatch = useDispatch();

  const [selectedBrands, setSelectedBrands] = useState([]);
const [selectedCategory, setSelectedCategory] = useState("");
const [selectedFeatured, setSelectedFeatured] = useState([]);
const [mobileSearching, setMobileSearching] = useState("");


    const { search } = useLocation();
  const params = new URLSearchParams(search);

 
  const keyWord = params.get("keyword") || "";
  const category = params.get("category") || "all" ;

  const [searchCategory, setSearchCategory] = useState(category)
  const [searchWord, setSearchWord] = useState(keyWord)


useEffect(()=>{
    if(selectedCategory){
      setSearchCategory(selectedCategory)
      setSearchWord()
      // dispatch(mobileSearchWord(""))
    }
    else if(keyWord && category){
      setSearchWord(keyWord)
      setSearchCategory(category)
    }
    // else{
    //       setSearchCategory(category)
    // }
  

},[selectedCategory,keyWord, category])

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchWord(mobileSearching);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [mobileSearching]);

 
  const {minPrice, maxPrice} = useSelector((state) => state.cartReducer)
   const [products, setProducts] = useState([])
   const [recommendedData, setRecommendedData] = useState([])


  const debouncedMinPrice = useDebounce(minPrice, 1000);
  const debouncedMaxPrice = useDebounce(maxPrice, 1000)


 
  const { data, isLoading, isError, error } =
   useSearchProductsQuery({ minPrice: debouncedMinPrice,
     maxPrice: debouncedMaxPrice, search: searchWord,
      category: searchCategory, featureds: selectedFeatured, brands: selectedBrands })
  useErrors([{ isError, error }])
  console.log(data)
  useEffect(() => {
  if (data) {
    setProducts(data.products);
    setRecommendedData(data.recommended)
  }
}, [debouncedMinPrice, debouncedMaxPrice, searchWord, category, data, selectedBrands, selectedFeatured]);


      const [categories, setCategories] = useState([])
      const [brands, setBrands] = useState([])
      const [featured, setFeatured] = useState([])

const { data: data1, isLoading: isLoading1, isError: isError1, error: error1 } = useCategoriesQuery();
useErrors([{ isError: isError1, error: error1 }]);

console.log(data1)


useEffect(() => {
  if (data1?.categories) {
    setCategories(data1.categories.categoriesByProductType);
    setFeatured(data1.categories.categoriesByType);
    dispatch(mobileCategoriesHome(data1.categories.categoriesByProductType))

    // If category is "all", show all brands
    if (category?.toLowerCase() === "all") {
      setBrands(data1.categories.brands);
    } 
    // If category is one of the allowed ones, filter brands
    else if (["electronics", "accessories", "fashion", "home"].includes(category?.toLowerCase())) {
      const filteredBrands = data1.categories.brands.filter(
        (b) => b.category?.toLowerCase() === category?.toLowerCase()
      );
      console.log(filteredBrands)
      setBrands(filteredBrands);
    } 
    // Otherwise, no brands
    if(selectedCategory) {
      setBrands(data1.categories.brands);
    }
  }
}, [data1, category, selectedCategory]);




    // ✅ Pagination State
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("list")
  const [opened, setOpened] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(6);
  // ✅ Pagination Logic
  const totalPages = Math.ceil(products.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + rowsPerPage);
  const [value, setValue] = useState("");


const handleBrandChange = (brand) => {
  setSelectedBrands((prev) =>
    prev.includes(brand)
      ? prev.filter((b) => b !== brand) // remove if already selected
      : [...prev, brand]               // add if not selected
  );
};
const handleFeaturedChange = (featured) => {
  setSelectedFeatured((prev) =>
    prev.includes(featured)
      ? prev.filter((b) => b !== featured) // remove if already selected
      : [...prev, featured]               // add if not selected
  );
};

console.log(selectedBrands, selectedCategory, selectedFeatured)

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [favorites, setFavorites] = useState([])
  const toggleFavorite = (productId) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryName) ? prev.filter((name) => name !== categoryName) : [...prev, categoryName],
    )
  }

    const toggleCategoryBox = () => {
    setOpen((prev) => !prev);
  };

    const [open, setOpen] = useState(true);

const applyViewModeSettings = (mode) => {
  setRowsPerPage(mode === "grid" ? 9 : 6);
  setOpened(mode !== "grid");
};

useEffect(() => {
  applyViewModeSettings(viewMode);
}, [viewMode]);

const handleGridClick = () => setViewMode("grid");
const handleListClick = () => setViewMode("list");





  return (
    <Box sx={{ backgroundColor: "#f7fafc",width:"100%", height: "100%", display: "flex" }}>
       <Box sx={{display: {md:"none"}, backgroundColor: "#f7fafc" }} width={"100%"} mt={{xs:7.2, sm: 8}}
       overflow={"hidden"}
       >
 <Box 
      sx={{ 
        display: { xs: 'block', sm: 'block', md: 'none' },
        minHeight: '100vh',
        width:"100%"

      }}
    >
            <Box sx={{ p: 2, bgcolor: "white" }}>
              <TextField
                fullWidth
                placeholder="Search"
                variant="outlined"
                value={mobileSearching}
                onChange={(e)=> setMobileSearching(e.target.value)}
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#999" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    bgcolor: "#f5f5f5",
                    borderRadius: 2,
                  },
                }}
              />
              {/* <Button onClick={()=> navigate(`/search?keyword=${search}`)}>Search</Button>t */}
            </Box>
      {/* Navigation Tabs */}
      <Stack 
        direction="row" 
        sx={{ 
          bgcolor: 'white',
          borderBottom: '1px solid #e0e0e0',
          overflowX: 'auto'
        }}
      >
      {  data1?.categories.categoriesByProductType.map((tab, index) => (
          <Box 
            key={tab}
            sx={{ 
              px: 2, 
              py: 0.5, 
              borderBottom: index === 1 ? '2px solid #1976d2' : 'none',
              color: index === 1 ? '#1976d2' : '#666',
              fontWeight: index === 1 ? 600 : 400,
              fontSize: '14px',
              whiteSpace: 'nowrap',
               color: "#2196f3",
      bgcolor: "#eff2f4",
      border: "1px solid #eff2f4",
      borderRadius: "6px",
      margin: "4px"
            }}
            onClick={()=> setSelectedCategory(tab)}
          >
            {tab}
          </Box>
        ))}
      </Stack>

      {/* Sort and Filter Controls */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="center"
        sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="body2" color="text.secondary">
            Sort: Newest
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <FilterList fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Filter (3)
            </Typography>
          </Stack>
        </Stack>
      
<Box sx={{ display: "flex", gap: 0.1}}>
  <IconButton
    size="small"
onClick={handleGridClick}  
  color={viewMode === "grid" ? "primary" : "default"}
    sx={{
      border: "1px solid #ddd",
      borderRadius: "3px",
      bgcolor:`${viewMode === "grid" ? "#eff2f4" : "default"}`,
    }}
  >
    <ViewModule fontSize="small" />
  </IconButton>

  <IconButton
    size="small"
onClick={handleListClick} 
   color={viewMode === "list" ? "primary" : "default"}
    sx={{
      border: "1px solid #ddd",
      borderRadius: "3px",
      bgcolor:`${viewMode === "list" ? "#eff2f4" : "default"}`,
    }}
  >
    <ViewList fontSize="small" />
  </IconButton>
</Box>
      </Stack>

      {/* Filter Tags */}
      <Stack 
        direction="row" 
        spacing={1} 
        sx={{ p: 2, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}
      >
        <Chip
          label="Huawei" 
          onDelete={() => {}} 
          size="small"
          deleteIcon={<Close />}
        />
        <Chip 
          label="Apple" 
          onDelete={() => {}} 
          size="small"
          deleteIcon={<Close />}
        />
        <Chip
          label="64GB" 
          onDelete={() => {}} 
          size="small"
          deleteIcon={<Close />}
        />
      </Stack>

      {/* Product List */}
      <Stack spacing={0}>
{    isLoading? <Loader variant="product" /> : 
             <ProductCard viewMode={viewMode} products={paginatedProducts} favorites={favorites} toggleFavorite={toggleFavorite} />
         }    
           </Stack>

           <Stack position={"relative"} right={-210} mt={2}>
                <CustomPagination page={page} setPage={setPage}  rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalPages={totalPages} />

           </Stack>

           <Stack position={"relative"} p={1}
           mt={2}>
           <Recommended recommendedData={recommendedData} isLoading={isLoading} />
           </Stack>


    </Box>
           </Box>



      <Box
        height={"100%"}
        width={{md:"86%",lg:"1250px"}}

        sx={{
          position: "relative",
          left:{md:80, lg:140},
          pt: 2.3,
          display: {xs:"none",md:"block"} 
        }}
      >
                {/* Breadcrumbs */}
        <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/" sx={{ fontSize: "0.875rem" }}>
            Category
          </Link>
          <Link underline="hover" color="inherit" href="/electronics" sx={{ fontSize: "0.875rem" }}>
            Electronics
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "0.875rem" }}>
            Mobile accessories
          </Typography>
        </Breadcrumbs>

        
        <Stack width={"100%"} direction={"row"}>

        <Stack width={"240px"}>
            
                                
              {/* Categories */}
<Divider />
<AllFiltering title="Category">
  {categories.map((category) => {
    const isSelected = selectedCategory === category;

    return (
      <ListItem
        key={category}
        button
        onClick={() => {
          setSelectedCategory(category);
          toggleCategory(category);
        }}
        sx={{
          px: 0, 
          pl: 1.5,
          py: 0.5,
          cursor: "pointer",
          borderRadius:"5px",
          backgroundColor: isSelected ? "white" : "transparent",
          color: isSelected ? "black" : "inherit",
          "&:hover": {
            backgroundColor: isSelected ? "white" : "#f5f5f5",
          },
        }}
      >
        <ListItemText
          primary={category}
          primaryTypographyProps={{
            fontSize: "0.875rem",
            fontWeight: isSelected ? "bold" : "normal",
          }}
        />
      </ListItem>
    );
  })}
</AllFiltering>

<Divider />

<AllFiltering title="Brands">
  {brands.map((i) => (
    <ListItem key={i.brand} sx={{ py: 0.10, px: 0 }}>
      <FormControlLabel
        control={<Checkbox size="small" />}
        label={i.brand}
        onChange={() => handleBrandChange(i.brand)}
        checked={selectedBrands.includes(i.brand)}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "0.875rem",
          },
        }}
      />
    </ListItem>
  ))}
</AllFiltering>


<Divider />

<AllFiltering title="Featured">
  {featured.map((featured) => (
    <ListItem key={featured} sx={{ py: 0.10, px: 0 }}>
      <FormControlLabel
        control={<Checkbox size="small" />}
        label={featured}
        onChange={() => handleFeaturedChange(featured)}
        checked={selectedFeatured.includes(featured)}
        sx={{
          "& .MuiFormControlLabel-label": {
            fontSize: "0.875rem",
          },
        }}
      />
    </ListItem>
  ))}
</AllFiltering>


              <Divider  />


              {/* Price Range */}

       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={toggleCategoryBox}>
        <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: 600, mb: 1, mt: 1 }}>
          Price range
        </Typography>
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </Box>
  

               <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense sx={{ p: 0 }}>
          <PriceRangeFilter />
        </List>
      </Collapse>

                <Divider  />

         <AllFiltering title="Condition" show={false} opened={opened}>
              <List dense sx={{ p: 0 }}>
                {conditons.map((brand) => (
                  <ListItem key={brand} sx={{ py: 0.10, px: 0 }}>
                    <FormControlLabel
                      control={<Radio size="small" />}
                      label={brand}
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontSize: "0.875rem",
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
         </AllFiltering>
                           <Divider  />

              {/* Ratings */}

             <AllFiltering title="Ratings" show={false} opened={opened}>
                   <List dense sx={{ p: 0 }}>
                {[5, 4, 3, 2, 1].map((stars) => (
                  <ListItem key={stars} sx={{ py: 0.25, px: 0 }}>
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Rating value={stars} readOnly size="medium" />
              
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
                </AllFiltering>

     </Stack>

          <Stack  width={"90%"} ml={3}>

            
        {/* Header with view controls */}
        <Box sx={{ display: "flex",  alignItems: "center", mb: 2 ,
            backgroundColor: "white",
            height: "62px",
            justifyContent: "space-between",
         }}>
           <Stack direction={"row"} alignItems={"center"} fontSize={"16px"}>
                 <Typography  color="black" pl={3}>
            1221 items in  &nbsp;
          </Typography>
          <Typography  fontWeight={550} color="black" fontSize={"16px"}>
            Mobile 
          </Typography>
           </Stack>
            
            <Stack direction={"row"} alignItems={"center"} height={"100%"} gap={2} pr={2}>
              <Stack>
                    <label htmlFor="verified" >
      <input
        type="checkbox"
        id="verified"
        style={{ accentColor: "#046dff" }}
      />
      Verified only
    </label>

              </Stack>
              <Stack>
                <FormControl sx={{ minWidth: 172,}} size={"small"}>
      <InputLabel id="dropdown-label">Featured</InputLabel>
      <Select
        labelId="dropdown-label"
        value={value}
        onChange={handleChange}
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>

              </Stack>

<Box sx={{ display: "flex", gap: 0.1}}>
  <IconButton
    size="small"
onClick={handleGridClick}  
  color={viewMode === "grid" ? "primary" : "default"}
    sx={{
      border: "1px solid #ddd",
      borderRadius: "3px",
      bgcolor:`${viewMode === "grid" ? "#eff2f4" : "default"}`,
    }}
  >
    <ViewModule fontSize="small" />
  </IconButton>

  <IconButton
    size="small"
onClick={handleListClick} 
   color={viewMode === "list" ? "primary" : "default"}
    sx={{
      border: "1px solid #ddd",
      borderRadius: "3px",
      bgcolor:`${viewMode === "list" ? "#eff2f4" : "default"}`,
    }}
  >
    <ViewList fontSize="small" />
  </IconButton>
</Box>
            </Stack>
            
          
        </Box>
      {    isLoading? "loader" : paginatedProducts.length > 0? 
             <ProductCard viewMode={viewMode} products={paginatedProducts} favorites={favorites} toggleFavorite={toggleFavorite} />
         : <NoProductFound />
            } </Stack>
        </Stack>
            {/* ✅ Pagination */}
            <Stack width={"100%"} direction={"row"}  pt={4} pb={5}>
              <Box flexGrow={1}/>
            <CustomPagination page={page} setPage={setPage}  rowsPerPage={rowsPerPage} setRowsPerPage={setRowsPerPage} totalPages={totalPages} />

            </Stack>

      </Box>
    </Box>
  )
}
