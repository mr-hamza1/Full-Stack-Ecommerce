"use client"

import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Paper,
  Select,
  MenuItem,
  FormControl,
  Container,
  Grid,
} from "@mui/material"
import { useState } from "react"
import quotes from "../../assets/Home/quotes.png"

export default function Quotes() {
  const [item, setItem] = useState("")
  const [details, setDetails] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("Pcs")

  return (
    <Box sx={{ minHeight: "448px" }} >
      {/* Main Hero Section with Background Image */}
      <Box
        sx={{
          height: "480px",
          backgroundImage: `linear-gradient(rgba(44, 124, 241, 1), rgba(0, 209, 255, 0.5)),url(${quotes})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      borderRadius={"5px"}>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            {/* Left Content */}
            <Grid item xs={12} md={6}>
              <Stack spacing={2} sx={{ pr: { md: 4 },      position: "relative",
                    top: {md: 100, lg:-100, }
                    }} >
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 700,
                    fontSize: { xs: "32px", md: "42px" },
                    lineHeight: 1.2,
                    letterSpacing: "-0.5px",
                    maxWidth: "490px",           
                  }}
                >
                  An easy way to send requests to all suppliers
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255, 255, 255, 0.95)",
                    fontSize: {md: "16px", lg:"18px"},
                    lineHeight: 1.6,
                    maxWidth: "490px",
                    mt: 2,
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
                </Typography>
              </Stack>
            </Grid>

            {/* Right Form */}
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: "400px",
                    width: "100%",
                    maxWidth: "500px",
                    backgroundColor: "white",
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                    position: "relative",
                    right: {md: -505, lg: -230},
                    top:{md: -105, lg:0},
                  }}
                >
                  <Stack spacing={3}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        color: "#1a1a1a",
                        fontSize: "20px",
                        mb: 0.5,
                      }}
                    >
                      Send quote to suppliers
                    </Typography>

                    <Box>

                      <TextField
                        fullWidth
                        variant="outlined"
                        size="small"
                        value={item}
                        placeholder={"What item you need?"}
                        onChange={(e) => setItem(e.target.value)}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "10px",
                            backgroundColor: "#f8f9fa",
                            height: "40px",
                            "& fieldset": {
                              borderColor: "#e1e5e9",
                              borderWidth: "1px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#c1c7cd",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#4285f4",
                              borderWidth: "2px",
                            },
                          },
                        }}
                      />
                    </Box>

                    <TextField
                      fullWidth
                      placeholder="Type more details"
                      variant="outlined"
                      multiline
                      rows={2}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "10px",
                          backgroundColor: "#f8f9fa",
                          "& fieldset": {
                            borderColor: "#e1e5e9",
                            borderWidth: "1px",
                          },
                          "&:hover fieldset": {
                            borderColor: "#c1c7cd",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#4285f4",
                            borderWidth: "2px",
                          },
                        },
                        "& .MuiInputBase-input::placeholder": {
                          color: "#9ca3af",
                          opacity: 1,
                        },
                      }}
                    />

                    <Stack direction="row" spacing={2}>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#666",
                            mb: 0.5,
                            fontWeight: 500,
                          }}
                        >
                          Quantity
                        </Typography>
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="medium"
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              borderRadius: "10px",
                              backgroundColor: "#f8f9fa",
                              height: "48px",
                              "& fieldset": {
                                borderColor: "#e1e5e9",
                                borderWidth: "1px",
                              },
                              "&:hover fieldset": {
                                borderColor: "#c1c7cd",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4285f4",
                                borderWidth: "2px",
                              },
                            },
                          }}
                        />
                      </Box>
                      <FormControl sx={{ minWidth: 100 }}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            color: "#666",
                            mb: 0.5,
                            fontWeight: 500,
                          }}
                        >
                          &nbsp;
                        </Typography>
                        <Select
                          value={unit}
                          onChange={(e) => setUnit(e.target.value)}
                          sx={{
                            borderRadius: "10px",
                            backgroundColor: "#f8f9fa",
                            height: "48px",
                            "& fieldset": {
                              borderColor: "#e1e5e9",
                              borderWidth: "1px",
                            },
                            "&:hover fieldset": {
                              borderColor: "#c1c7cd",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#4285f4",
                              borderWidth: "2px",
                            },
                          }}
                        >
                          <MenuItem value="Pcs">Pcs</MenuItem>
                          <MenuItem value="Kg">Kg</MenuItem>
                          <MenuItem value="Tons">Tons</MenuItem>
                          <MenuItem value="Meters">Meters</MenuItem>
                        </Select>
                      </FormControl>
                    </Stack>

                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        padding: "0.5 13px 0.5 13px",
                        borderRadius: "10px",
                        textTransform: "none",
                        width: "110px",
                        fontSize: "13px",
                        fontWeight: 500,
                        backgroundColor: "primary-gradient",
                        boxShadow: "0 4px 12px rgba(66, 133, 244, 0.3)",
                        "&:hover": {
                          backgroundColor: "#1976d2",
                          boxShadow: "0 6px 16px rgba(66, 133, 244, 0.4)",
                        },
                      }}
                    >
                      Send Inquiry
                    </Button>
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
