import React, { useEffect, useState } from "react";
import { Slider, TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { filteringMaxPrice, filteringMinPrice } from "../../redux/reducer/cartReducer";

export default function PriceRangeFilter() {
  const dispatch = useDispatch()

  const [value, setValue] = useState([0, 9999]);

  

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (index, event) => {
    const newValue = [...value];
    newValue[index] = Number(event.target.value);
    setValue(newValue);
  };

  const handleApply = () => {
    console.log("Applied price range:", value);
  };

  useEffect(()=>{
     dispatch(filteringMinPrice(value[0]))
     dispatch(filteringMaxPrice(value[1]))
  },[value])

  return (
    <Box >

      {/* Slider with white thumb */}
      <Slider
        value={value}
        min={0}
        max={9999}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        sx={{
          mt: 2,
          '& .MuiSlider-thumb': {
            backgroundColor: 'white',
            border: '2px solid #1976d2', // adds a blue border
          },
          '& .MuiSlider-track': {
            backgroundColor: '#1976d2',
          },
        }}
      />

      {/* Min and Max Inputs with matching height */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, gap: 1 }}>
        <TextField
          label="Min"
          type="number"
          value={value[0]}
          onChange={(e) => handleInputChange(0, e)}
          sx={{
            width: "50%",
    '& .MuiInputBase-root': {
      height: 40,
      backgroundColor: 'white',   // 🔹 inner background color
      color: '#000',                // 🔹 input text color
      borderRadius: 1,
    },
    '& .MuiInputBase-input::placeholder': {
      color: "rgba(222, 226, 231, 1)",                // 🔹 placeholder color
      opacity: 1,
    },
          }}
        />
        <TextField
          label="Max"
          type="number"
          value={value[1]}
          onChange={(e) => handleInputChange(1, e)}
          sx={{
            width: "50%",
               '& .MuiInputBase-root': {
      height: 40,
      backgroundColor: 'white',   // 🔹 inner background color
      color: '#000',                // 🔹 input text color
      borderRadius: 1,
    },
    '& .MuiInputBase-input::placeholder': {
      color: "rgba(222, 226, 231, 1)",                // 🔹 placeholder color
      opacity: 1,
    },
          }}
        />
      </Box>

      {/* Apply Button */}
      <Button
        variant="contained"
        sx={{ mt: 2, mb: 3, width: "100%", height: 40,backgroundColor: "white", color: "#1976d2", boxShadow: 0, border: "1px solid rgba(222, 226, 231, 1)"}} 
        onClick={handleApply}
      >
        Apply
      </Button>
    </Box>
  );
}
