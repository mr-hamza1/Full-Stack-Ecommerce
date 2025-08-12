"use client"

import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
  IconButton,
  FormHelperText,
  Divider,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Stack,
  Grid,
  ImageList,
  ImageListItem,
  ImageListItemBar
} from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Close as CloseIcon
} from '@mui/icons-material'
import { useNewProductMutation } from '../../../redux/api/productApi'

const NewProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    priceType: 'fixed',
    priceRange: '',
    category: '',
    searchCategory: '',
    productType: '',
    productDesign: '',
    warranty: '',
    discount: '',
    shipping: '',
    stock: '',
    brand: '',
    description: '',
    sizes: [],
    colors: [],
    model: '',
    images: []
  })

  const [newSize, setNewSize] = useState('')
  const [newColor, setNewColor] = useState('')
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }))
    }
  }

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }

  const addSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData(prev => ({ ...prev, sizes: [...prev.sizes, newSize] }))
      setNewSize('')
    }
  }

  const removeSize = (sizeToRemove) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }))
  }

  const addColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, newColor] }))
      setNewColor('')
    }
  }

  const removeColor = (colorToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required'
    if (formData.priceType === 'fixed' && !formData.price.trim()) {
      newErrors.price = 'Price is required for fixed pricing'
    }
    if (formData.priceType === 'range' && !formData.priceRange) {
      newErrors.priceRange = 'Price range is required'
    }
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.productType.trim()) newErrors.productType = 'Product type is required'
    if (!formData.stock || parseInt(formData.stock) < 0) {
      newErrors.stock = 'Valid stock quantity is required'
    }
    if (formData.images.length === 0) newErrors.images = 'At least one product image is required'
    if (formData.category === 'electronics' && !formData.model.trim()) {
      newErrors.model = 'Model is required for electronics'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

    const [addProduct] = useNewProductMutation()

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const data = new FormData();

    // Append simple fields (except arrays/images)
    Object.entries(formData).forEach(([key, value]) => {
      if (!["images", "sizes", "colors"].includes(key)) {
        data.append(key, value);
      }
    });

    // Append arrays as JSON
    data.append("sizes", JSON.stringify(formData.sizes));
    data.append("colors", JSON.stringify(formData.colors));
    data.append("details", JSON.stringify({
      info: formData.description,
      sizes: formData.sizes,
      colors: formData.colors,
      model: formData.model,
    }));

    // Append multiple images correctly
    formData.images.forEach(file => {
      data.append("images", file); // ✅ matches multerUpload.array("images", 5)
    });

    // Call the RTK Query mutation
    await addProduct({ formData: data, id: "admin123" 
    }).unwrap();

    alert("✅ Product created successfully!");
  } catch (error) {
    console.error("❌ Upload failed:", error);
    alert("Upload failed, check console.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', p: 2 }}>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Add New Product
            </Typography>
          </Stack>
          
          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', lg: 'row' }} spacing={4}>
              {/* Left Column - Product Information */}
              <Box sx={{ flex: 1 }}>
                <Stack spacing={4}>
                  {/* Basic Information Card */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium' }}>
                        Basic Information
                      </Typography>
                      
                      <Stack spacing={3}>
                        <TextField
                          label="Product Name"
                          required
                          fullWidth
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          error={!!errors.name}
                          helperText={errors.name}
                        />

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <TextField
                            label="Product Type"
                            required
                            fullWidth
                            value={formData.productType}
                            onChange={(e) => handleInputChange('productType', e.target.value)}
                            placeholder="e.g., Smartphone, T-shirt, Laptop"
                            error={!!errors.productType}
                            helperText={errors.productType}
                          />
                          <TextField
                            label="Product Design"
                            fullWidth
                            value={formData.productDesign}
                            onChange={(e) => handleInputChange('productDesign', e.target.value)}
                            placeholder="e.g., Modern, Classic, Minimalist"
                          />
                        </Stack>

                        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <FormControl fullWidth required error={!!errors.category}>
                            <InputLabel>Category</InputLabel>
                            <Select
                              value={formData.category}
                              label="Category"
                              onChange={(e) => handleInputChange('category', e.target.value)}
                            >
                              <MenuItem value="fashion">Fashion</MenuItem>
                              <MenuItem value="beauty">Beauty</MenuItem>
                              <MenuItem value="electronics">Electronics</MenuItem>
                              <MenuItem value="sports">Sports</MenuItem>
                              <MenuItem value="home">Home & Garden</MenuItem>
                              <MenuItem value="books">Books</MenuItem>
                              <MenuItem value="accessories">Accessories</MenuItem>
                            </Select>
                            {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                          </FormControl>

                          <TextField
                            label="Search Category"
                            fullWidth
                            value={formData.searchCategory}
                            onChange={(e) => handleInputChange('searchCategory', e.target.value)}
                            placeholder="Keywords for search"
                          />
                        </Stack>
                         <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                          <TextField
                            label="Brand"
                            fullWidth
                            value={formData.brand}
                            onChange={(e) => handleInputChange('brand', e.target.value)}
                            placeholder="Brand name"
                          />
                
                        {formData.category === 'electronics' && (
                          <TextField
                            label="Model"
                            required
                            fullWidth
                            value={formData.model}
                            onChange={(e) => handleInputChange('model', e.target.value)}
                            error={!!errors.model}
                            helperText={errors.model}
                          />
                        )}

                        <FormControl fullWidth>
                          <InputLabel>Warranty</InputLabel>
                          <Select
                            value={formData.warranty}
                            label="Warranty"
                            onChange={(e) => handleInputChange('warranty', e.target.value)}
                          >
                            <MenuItem value="no-warranty">No Warranty</MenuItem>
                            <MenuItem value="3-months">3 Months</MenuItem>
                            <MenuItem value="6-months">6 Months</MenuItem>
                            <MenuItem value="1-year">1 Year</MenuItem>
                            <MenuItem value="2-years">2 Years</MenuItem>
                            <MenuItem value="3-years">3 Years</MenuItem>
                            <MenuItem value="lifetime">Lifetime</MenuItem>
                          </Select>
                        </FormControl>
                                              </Stack>

                        <TextField
                          label="Description"
                          multiline
                          rows={4}
                          fullWidth
                          value={formData.description}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          placeholder="Describe your product..."
                        />
                      </Stack>
                    </CardContent>
                  </Card>

                  {/* Pricing Information Card */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium' }}>
                        Pricing & Stock
                      </Typography>
                      
                      <Stack spacing={3}>
                        <FormControl component="fieldset">
                          <FormLabel component="legend">Price Type *</FormLabel>
                          <RadioGroup
                            value={formData.priceType}
                            onChange={(e) => handleInputChange('priceType', e.target.value)}
                          >
                            <FormControlLabel value="fixed" control={<Radio />} label="Fixed Price" />
                            <FormControlLabel value="negotiable" control={<Radio />} label="Negotiable" />
                            <FormControlLabel value="range" control={<Radio />} label="Price Range" />
                          </RadioGroup>
                        </FormControl>

                    
                          <TextField
                            label="Price"
                            required
                            type="number"
                            fullWidth
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', e.target.value)}
                            placeholder="0.00"
                            error={!!errors.price}
                            helperText={errors.price}
                            InputProps={{
                              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
                            }}
                          />
                      

                        {formData.priceType === 'range' && (
                          <FormControl fullWidth required error={!!errors.priceRange}>
                            <InputLabel>Price Range</InputLabel>
                            <Select
                              value={formData.priceRange}
                              label="Price Range"
                              onChange={(e) => handleInputChange('priceRange', e.target.value)}
                            >
                              <MenuItem value="0-200">0 - 200</MenuItem>
                              <MenuItem value="200-500">200 - 500</MenuItem>
                              <MenuItem value="500+">500+</MenuItem>
                            </Select>
                            {errors.priceRange && <FormHelperText>{errors.priceRange}</FormHelperText>}
                          </FormControl>
                        )}


                      </Stack>

                       <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} mt={2}>
                                                  <TextField
                          label="Stock Quantity"
                          required
                          type="number"
                          fullWidth
                          value={formData.stock}
                          onChange={(e) => handleInputChange('stock', e.target.value)}
                          placeholder="0"
                          error={!!errors.stock}
                          helperText={errors.stock}
                        /> 
                          <TextField
                            label="Discount"
                            fullWidth
                            value={formData.discount}
                            onChange={(e) => handleInputChange('discount', e.target.value)}
                            placeholder="Discount"
                          />
                                                  <FormControl fullWidth>
                          <InputLabel>Free Shipping</InputLabel>
                          <Select
                            value={formData.shipping}
                            label="Free Shpping"
                            onChange={(e) => handleInputChange('shipping', e.target.value)}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                       </Stack>

                    </CardContent>
                  </Card>

                  {/* Product Variants Card */}
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium' }}>
                        Product Variants
                      </Typography>
                      
                      <Stack spacing={4}>
                        {/* Sizes Section */}
                        <Box>
                          <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Available Sizes
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <TextField
                              size="small"
                              value={newSize}
                              onChange={(e) => setNewSize(e.target.value)}
                              placeholder="Add size (e.g., S, M, L)"
                              sx={{ flexGrow: 1 }}
                            />
                            <Button
                              variant="contained"
                              onClick={addSize}
                              startIcon={<AddIcon />}
                            >
                              Add
                            </Button>
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                            {formData.sizes.map((size, index) => (
                              <Chip
                                key={index}
                                label={size}
                                onDelete={() => removeSize(size)}
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </Box>

                        <Divider />

                        {/* Colors Section */}
                        <Box>
                          <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Available Colors
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <TextField
                              size="small"
                              value={newColor}
                              onChange={(e) => setNewColor(e.target.value)}
                              placeholder="Add color (e.g., Red, Blue)"
                              sx={{ flexGrow: 1 }}
                            />
                            <Button
                              variant="contained"
                              onClick={addColor}
                              startIcon={<AddIcon />}
                            >
                              Add
                            </Button>
                          </Stack>
                          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                            {formData.colors.map((color, index) => (
                              <Chip
                                key={index}
                                label={color}
                                onDelete={() => removeColor(color)}
                                color="primary"
                                variant="outlined"
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Box>

              {/* Right Column - Images */}
              <Box sx={{ width: { lg: 400 } }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 'medium' }}>
                      Product Images
                    </Typography>
                    
                    <Stack spacing={3}>
                      {/* Upload Area */}
                      <Box
                        sx={{
                          border: '2px dashed',
                          borderColor: errors.images ? 'error.main' : 'divider',
                          borderRadius: 2,
                          p: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          cursor: 'pointer',
                          '&:hover': {
                            borderColor: 'primary.main',
                            backgroundColor: 'action.hover'
                          }
                        }}
                      >
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" style={{ cursor: 'pointer', textAlign: 'center' }}>
                          <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                          <Typography variant="body1" sx={{ mb: 1 }}>
                            Click to upload images
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            PNG, JPG, GIF up to 5MB each
                          </Typography>
                        </label>
                      </Box>
                      
                      {errors.images && (
                        <FormHelperText error>{errors.images}</FormHelperText>
                      )}

                      {/* Image Previews */}
                      {formData.images.length > 0 && (
                        <Box>
                          <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Image Previews ({formData.images.length})
                          </Typography>
                          <ImageList cols={2} gap={8}>
                            {formData.images.map((image, index) => (
                              <ImageListItem key={index}>
                                <img
                                  src={URL.createObjectURL(image) || "/placeholder.svg"}
                                  alt={`Preview ${index + 1}`}
                                  style={{
                                    width: '100%',
                                    height: 120,
                                    objectFit: 'cover',
                                    borderRadius: 8
                                  }}
                                />
                                <ImageListItemBar
                                  sx={{
                                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                  }}
                                  position="top"
                                  actionIcon={
                                    <IconButton
                                      sx={{ color: 'white' }}
                                      onClick={() => removeImage(index)}
                                    >
                                      <CloseIcon />
                                    </IconButton>
                                  }
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Box>
            </Stack>

            <Divider sx={{ my: 4 }} />

            {/* Form Actions */}
            <Stack direction="row" justifyContent="space-between">
              <Button
                variant="outlined"
                size="large"
                startIcon={<ArrowBackIcon />}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isLoading}
                startIcon={<SaveIcon />}
              >
                {isLoading ? 'Saving...' : 'Save Product'}
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default NewProduct
