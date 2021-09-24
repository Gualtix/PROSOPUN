
import React, {useEffect, useState} from "react";
import CompDrawer from './CompDrawer'
import { BrowserRouter  as Router,Route,Switch} from "react-router-dom";
//import './Menu.css'
import VistaNewMsg from "../pages/VistaNewMsg";
import Reportes from "../pages/Reportes";
import socket from "./Socket";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


/*function Menu(){
    const [dats,setDatos] = useState([]);
     useEffect(()=>{
        socket.on('contenido',dats =>{
           setDatos(dats) 
        })
    },[dats])

}*/
const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  

export default function MaterialUI (){

    const [ReEnvio,setReEnvio] = useState( 
        {'ReEnvio':[{
            "Api": "",
            "Guardados":"",
            "TiempoDeCarga":"",
            "DB": ""
        }]}
     );
     useEffect(()=>{
         
        socket.on('ReEnvio',ReEnvio =>{
            setReEnvio(ReEnvio) 
        })
    },[ReEnvio])//aqui tenia [ReEnvio]

    
    

    return( 
        <div class = "left"  > 
        <>
        
        {
            console.log('mensaje'),
            console.log(ReEnvio)
        }
      <CompDrawer />
      <Router>
                <Switch>
                <Route exact path ="/">
                    
                    <p>
                        <h6>Notificaciones de Carga </h6>
                    </p>
                    
                   {/* width: 300, height: 300,minWidth: 75, marginLeft: 50, */}
                   
                    <div style={{ display:'flex',justifyContent:'center' }}>
                    <Card sx={{ maxWidth: 370 }} >
                        { /*<CardMedia
                            component="img"
                            marginLeft = "30"
                            margin right = "30"
                            height="140"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        */}
                        <CardContent >
                            <Typography gutterBottom variant="h6" component="div">
                              Notificación de Carga  
                            </Typography>
                            <hr />
                            <Typography fontSize="1rem" color="text.secondary">
                            API: 
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                            GUARDADOS:
                            </Typography>
                            <Typography  fontSize="1rem" color="text.secondary">
                            TIEMPO DE CARGA:
                            </Typography>
                            <Typography variant="body2" color="text.primary">
                            BASE DE DATOS:
                            </Typography>
                        </CardContent>
                        </Card>
                    </div>
                     
            {

               ( ReEnvio === "" ? " " : 
                ( ReEnvio.ReEnvio.map((el)=>(
                     <>
                     

                        <h4>API: </h4> {el.Api}
                        <h4>GUARDADOS: </h4> {el.Guardados}
                        <h4>TIEMPO DE CARGA: </h4> {el.TiempoDeCarga}
                        <h4>BASE DE DATOS: </h4> {el.DB}
                    </>
                 ))))
                 }

                    
                    
                    
                    
                </Route>
                <Route exact path ="/VistaNewsMsgs">
                    <VistaNewMsg />
                </Route>
                <Route exact path ="/Reportes">
                    <Reportes />
                </Route>
                
                
                </Switch>
    </Router>
      <br />
      <br />
      <br />
      <br />
       
        </>
     </div>
    )
}