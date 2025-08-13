import { Box, CircularProgress, Typography, Skeleton, Card, CardContent, Grid, Backdrop } from "@mui/material"
import { ShoppingCart, ShoppingBag, Store, Payment } from "@mui/icons-material"

const Loader = ({ variant = "page", message = "Loading...", size = "medium" }) => {
  const getIcon = () => {
    switch (variant) {
      case "cart":
        return <ShoppingCart sx={{ fontSize: 40, color: "primary.main" }} />
      case "product":
        return <ShoppingBag sx={{ fontSize: 40, color: "primary.main" }} />
      case "checkout":
        return <Payment sx={{ fontSize: 40, color: "primary.main" }} />
      default:
        return <Store sx={{ fontSize: 40, color: "primary.main" }} />
    }
  }

  const getProgressSize = () => {
    switch (size) {
      case "small":
        return 30
      case "large":
        return 60
      default:
        return 40
    }
  }

  if (variant === "skeleton") {
    return (
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={30} />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                    <Skeleton variant="text" height={25} width="40%" />
                    <Skeleton variant="rectangular" height={36} width={80} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        p: 4,
        minHeight: size === "large" ? 300 : 600,
      }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress
          size={getProgressSize()}
          thickness={4}
          sx={{
            color: "primary.main",
            animationDuration: "1.5s",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {getIcon()}
        </Box>
      </Box>

      <Typography
        variant={size === "small" ? "body2" : "h6"}
        color="text.secondary"
        sx={{
          textAlign: "center",
          fontWeight: 500,
        }}
      >
        {message}
      </Typography>

      <Box sx={{ display: "flex", gap: 0.5 }}>
        {[0, 1, 2].map((dot) => (
          <Box
            key={dot}
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: "primary.main",
              animation: "pulse 1.5s ease-in-out infinite",
              animationDelay: `${dot * 0.2}s`,
              "@keyframes pulse": {
                "0%, 80%, 100%": {
                  opacity: 0.3,
                  transform: "scale(0.8)",
                },
                "40%": {
                  opacity: 1,
                  transform: "scale(1)",
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  )
}

const EcommerceOverlayLoader = ({ isVisible = false, message = "Processing..." }) => {
  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      open={isVisible}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Box sx={{ position: "relative" }}>
          <CircularProgress size={60} thickness={4} sx={{ color: "white" }} />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <ShoppingCart sx={{ fontSize: 30, color: "white" }} />
          </Box>
        </Box>

        <Typography
          variant="h6"
          sx={{
            color: "white",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  )
}

export { EcommerceOverlayLoader }
export default Loader 
