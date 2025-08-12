"use client"

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Box,
  Divider,
  Stack,
} from "@mui/material"
import {
  Home as HomeIcon,
  Category as CategoryIcon,
  Favorite as FavoriteIcon,
  Receipt as ReceiptIcon,
  Language as LanguageIcon,
  Headset as HeadsetIcon,
  Info as InfoIcon,
} from "@mui/icons-material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


export default function MenuDrawer({ open, onClose }) {

      const {user, loading} = useSelector((state) => state.userReducer)

      const navigate = useNavigate();

  const mainMenuItems = [
    { text: "Home", icon: <HomeIcon />, go:"/" },
    { text: "Categories", icon: <CategoryIcon />,go:"/search"  },
    { text: "Favorites", icon: <FavoriteIcon />, go:"/"  },
    { text: "My orders", icon: <ReceiptIcon />, go:"/"  },
  ]

  const secondaryMenuItems = [
    { text: "English | USD", icon: <LanguageIcon /> },
    { text: "Contact us", icon: <HeadsetIcon /> },
    { text: "About", icon: <InfoIcon /> },
  ]

  const footerLinks = ["User agreement", "Partnership", "Privacy policy"]

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: "#f8f9fa",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* User Section */}
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "#e0e0e0",
              mx: "auto",
              mb: 2,
            }}
            src={user?.image}
          />
 {!user?
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              cursor: "pointer",
              "&:hover": { color: "#2196f3" },
            }}
            onClick={()=> navigate(`/Login`)}
          >
            Sign in | Register
          </Typography>
        :
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              cursor: "pointer",
              "&:hover": { color: "#2196f3" },
            }}
          >
            LogOut
          </Typography>
}
        </Box>

        <Divider sx={{ mx: 2 }} />

        {/* Main Navigation */}
        <List sx={{ px: 1, py: 2 }}>
          {mainMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding 
            >
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  "&:hover": {
                    bgcolor: "rgba(33, 150, 243, 0.08)",
                  },
                }}
onClick={() => navigate(`${item.go}`)}

              >
                <ListItemIcon
                  sx={{
                    color: "#666",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    color: "#333",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2 }} />

        {/* Secondary Navigation */}
        <List sx={{ px: 1, py: 2 }}>
          {secondaryMenuItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  "&:hover": {
                    bgcolor: "rgba(33, 150, 243, 0.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "#666",
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: "0.95rem",
                    color: "#333",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* Footer Links */}
        <Box sx={{ mt: "auto", p: 2 }}>
          <Stack spacing={2}>
            {footerLinks.map((link, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  color: "#666",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  "&:hover": {
                    color: "#2196f3",
                  },
                }}
              >
                {link}
              </Typography>
            ))}
          </Stack>
        </Box>
      </Box>
    </Drawer>
  )
}
