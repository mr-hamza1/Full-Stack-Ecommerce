"use client"
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Grid,
  Container,
  Avatar,
} from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import Home1st from "../../assets/Home1st.png"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#ff9800",
    },
  },
})

const categories = [
  "Automobiles",
  "Clothes and wear",
  "Home interiors",
  "Computer and tech",
  "Tools, equipments",
  "Sports and outdoor",
  "Animal and pets",
  "Machinery tools",
  "More category",
]

export default function FirstHomeCard() {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100%", backgroundColor: "#f5f5f5", py: 3 }}>
        <Grid container spacing={3} sx={{ maxWidth: "1200px", margin: "0 auto" }}>
          {/* Left Sidebar */}
          <Grid item xs={7} md={3} lg={2}>
            <Card sx={{ height: "fit-content" }}>
        
            </Card>
          </Grid>

          {/* Main Image Section */}
          <Grid item xs={12} md={6} lg={7}>

          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} md={3} lg={3}>

          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}
