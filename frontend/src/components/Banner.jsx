import { Box, Typography, Button, Stack } from "@mui/material"

export default function Banner() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #4285f4 0%, #1976d2 100%)",
        borderRadius: 2,
        p: 3,
        color: "white",
        my: 3,
        mb:4,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
      >
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              mb: 0.5,
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            Super discount on more than 100 USD
          </Typography>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
              fontSize: "0.875rem",
            }}
          >
            Save your ever-ending just while dummy info
          </Typography>
        </Box>

        <Button
          variant="contained"
          sx={{
            bgcolor: "#ff5722",
            color: "white",
            fontWeight: "bold",
            px: 3,
            py: 1,
            borderRadius: 1.5,
            textTransform: "none",
            fontSize: "0.875rem",
            minWidth: "100px",
            "&:hover": {
              bgcolor: "#e64a19",
            },
            flexShrink: 0,
          }}
        >
          Shop now
        </Button>
      </Stack>
    </Box>
  )
}
