import  React, {useEffect, useState} from "react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Link } from "@mui/material";

import "./Menu.css"
import { withRouter,Redirect } from "react-router";
import InsertChart from "@mui/icons-material/InsertChart";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

 const MiniDrawer = props => {
  //console.log("las props entrantes")
  //console.log(props)
  const {history} = props

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [pass2,setForm] = useState("");

  const handleChange = e=>{
      setForm( e.target.value)
  }
  const [pass,setPass] = useState("");
var estado = true;
  const handleClick = e =>{
    setPass(pass2)
    if(pass2=="admin"){
    }
    
  }
  const handleClick2 = e =>{
    setPass("")
    setForm("")
  }
 

  return (
    <>
    {/*props.visible !== "admin" ? (
                <Redirect from = "/Reportes" to="/" />) : "" */}
                {/*props.visible !== "admin" ? (
                <Redirect from = "/Reportes2" to="/" />) : "" */}

    <Box sx={{ display: 'flex' }}>

      {/*console.log("la entrada"),console.log(pass)*/}
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Sistemas Operativos 1 - 2S2021    |
            
           {
             pass === "admin" ? 
             (
               
              <button onClick = {handleClick2}>logout</button>
             ):
             (
               <>
              <label htmlFor = "nombre">Contraseña:</label>
              <input 
              type = "password" 
              id = "nombre" 
              name = "nombre" 
              value = {pass2}
              onChange ={handleChange} 
              /> 
            <button onClick = {handleClick}>Login</button>
            </>
             )
            

            }
          {console.log(handleClick.e), console.log("el valor es")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
       
        <List>
          {
            [{name:'Home',url:"/", icon:<HomeIcon /> },{name:'Notificacion',url:"/Notificacion",icon:<NotificationsActiveIcon />},{name:'NewsM/Cosmos',url:"/VistaN2",icon:<ListAltIcon />},{name:'News/Messages',url:"/VistaNewsMsgs",icon:<ListAltIcon />},{name:'CloudSQL',url:"/Reportes", icon: <InsertChartIcon />},{name:'CosmosDB',url:"/Reportes2", icon: <InsertChart />}].map((text, index) => (
              <ListItem button key={text.name} component="a" href={text.url === "home"? "\\":text.url}>
              {/*<ListItem button key={text.name} Link to="/Reportes">*/}
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            ))
          
          }
          
        </List>
        
      </Drawer>

    </Box>
    </>
  );
}

export default withRouter (MiniDrawer)
