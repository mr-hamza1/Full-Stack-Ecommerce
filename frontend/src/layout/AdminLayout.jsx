import {
  Groups as GroupsIcon,
  Inventory as InventoryIcon,
  QrCode as QrCodeIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import { Box, Drawer, Grid, Stack, Typography, styled } from '@mui/material';
import { Link as LinkComponent, useLocation } from 'react-router-dom';



const Link = styled(LinkComponent)`
  text-decoration: none;
  border-radius: 1rem;
  padding: 0.5rem 1.45rem ;
  color: black;
  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;


const adminTabs = [
{
  name: 'Product',
  icon: <InventoryIcon fontSize="small"  />,
  path: '/admin/product',
},
{
  name: 'Customer',
  icon: <GroupsIcon fontSize="small" />,
  path: '/admin/customer',
},
]

const adminApps = [{
  name: 'Stop Watch',
  icon: <TimerIcon fontSize="small" />,
  path: '/admin/app/stopwatch',
},
{
  name: 'Cupone',
  icon: <QrCodeIcon fontSize="small"  />,
  path: '/admin/app/cupon',
},

]




const Items =({items}) => {
  
  const location = useLocation();

  return  (
    <Stack marginBottom={2} spacing={0.5} marginLeft={2} >

  {
    items.map((tab, index) => (
      <Link
         key={`${tab.path}-${index}`} 
               
         to={tab.path}
         sx={
          location.pathname == tab.path && {
            bgcolor: "#E4F3FF",
            color: "#0171FF",
            padding: "0.5rem  1rem 0.5rem 2rem",
            width: "100%",
            borderRadius: "0.5rem",
            cursor: "pointer",
            "&:hover": {
              color: "#0171FF",
            }
          }
        }
      >
        <Stack direction={"row"}  alignItems={"flex-start"} spacing={"1rem"}>
          {tab.icon}
          <Typography variant="caption" paddingRight={{md :  9 , lg: 13 , xl: 14}} sx={location.pathname == tab.path && {
            bgcolor: "#E4F3FF",
            color: "#0171FF",}}  >{tab.name}</Typography>

        </Stack>

      </Link>
    ))
  }

</Stack>)
}


const SideBar = ({w="100%"}) => {
    

    return (
      <Stack position={"fixed"}  >
       
       <br />

        <Typography p={1}  paddingLeft={4} color='#8e8d8d' variant='body2'>
             DASHBOARD
          </Typography>

          <Items items={adminTabs}  />

       
          <Typography p={1}  paddingLeft={4} color='#8e8d8d' variant='body2'>
          APPS
          </Typography>

          <Items items={adminApps}/>

      </Stack>
    )
}

const AdminLayout = ({children ,menu, setMenu}) => {
  return (

<Stack direction="row" minHeight="100vh" sx={{ padding: 0, margin: 0, bgcolor: "#f5f5f5" }}>

  {/* Left Sidebar */}
  <Box
    sx={{
      display: { xs: 'none', md: 'block' },
      bgcolor: "white",
      width: { md: "25%", lg: "20%" }, // set width manually
    }}
  >
    <SideBar />
    <Drawer
      open={menu}
      onClose={() => setMenu(false)}
      PaperProps={{
        sx: { width: { xs: "60%", sm: "50%" }, p: 2 },
      }}
    >
      <SideBar />
    </Drawer>
  </Box>

  {/* Main Content */}
  <Box
    sx={{
      bgcolor: "#f5f5f5",
      flex: 1,
      padding: 2,
    }}
  >
    {children}
  </Box>
</Stack>

  )
}

export default AdminLayout