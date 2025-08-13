import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NoProductFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '300px',
        bgcolor: '#f5f5f5',
        borderRadius: 4,
        p: 2,
        boxShadow: 3,
        pt: 20,
        pb: 20,
        mt: 10,
      }}
    >
      <SearchOffIcon sx={{ fontSize: 60, color: '#9e9e9e', mb: 2 }} />
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
        No Products Found
      </Typography>
      <Typography variant="body1" sx={{ color: '#757575', mb: 3 }}>
        We couldn't find any products matching your search.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          textTransform: 'none',
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontWeight: 'bold',
        }}
        onClick={() => window.location.href = '/'} // redirect to shop
      >
        Browse Products
      </Button>
    </Box>
  );
};

export default NoProductFound;
