
import React, {useEffect, useState} from "react";
import CompDrawer from './CompDrawer'
import { BrowserRouter  as Router,Route,Switch} from "react-router-dom";
import './Menu.css'
import VistaNewMsg from "../pages/VistaNewMsg";
import Reportes from "../pages/Reportes";
import socket from "./Socket";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


/*function Menu(){
    const [dats,setDatos] = useState([]);
     useEffect(()=>{
        socket.on('contenido',dats =>{
           setDatos(dats) 
        })
    },[dats])

}*/


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
         
        socket.on('ReEnvio',re =>{
            setReEnvio(re) 
        })
    },[])//aqui tenia [ReEnvio]

    const [AzureE,setAzureE] = useState( "");
     useEffect(()=>{
         
        socket.on('azuC',ac1 =>{
            setAzureE(ac1) 
        })
    },[])//aqui tenia [ReEnvio]
    

    return( 
        
        <>
        {
            console.log('salida en azure'),
            console.log(AzureE)
        }
        <div class = "left"  > 
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
                            {

                                ( ReEnvio === "" ? " " : 
                                ( ReEnvio.ReEnvio.map((el)=>(
                                    <>
                                    <Typography fontSize="1rem" color="text.secondary">
                                    API: {el.Api}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                    GUARDADOS:{el.Guardados}
                                    </Typography>
                                    <Typography  fontSize="1rem" color="text.secondary">
                                    TIEMPO DE CARGA:{el.TiempoDeCarga}
                                    </Typography>
                                    <Typography variant="body2" color="text.primary">
                                    BASE DE DATOS:{el.DB}
                                    </Typography>
{
                                       /* <h4>API: </h4> {el.Api}
                                        <h4>GUARDADOS: </h4> {el.Guardados}
                                        <h4>TIEMPO DE CARGA: </h4> {el.TiempoDeCarga}
                                        <h4>BASE DE DATOS: </h4> {el.DB}*/}
                                    </>
                                ))))
                            }

                            
                        </CardContent>
                        </Card>
                    </div>
                     
            {/*

               ( ReEnvio === "" ? " " : 
                ( ReEnvio.ReEnvio.map((el)=>(
                     <>
                     

                        <h4>API: </h4> {el.Api}
                        <h4>GUARDADOS: </h4> {el.Guardados}
                        <h4>TIEMPO DE CARGA: </h4> {el.TiempoDeCarga}
                        <h4>BASE DE DATOS: </h4> {el.DB}
                    </>
                 ))))
                */ }

                    
                    
                    
                    
                </Route>
                <Route exact path ="/VistaNewsMsgs">
                    <VistaNewMsg />
                </Route>
                <Route exact path ="/Reportes">
                  
                Reportes en CloudSQL
                         <Reportes />
                   
                </Route>
                <Route exact path ="/Reportes2">
                  
                Reportes en CosmosDB
                         <Reportes />
                   
                </Route>
                
                
                </Switch>
    </Router>
      <br />
      <br />
      <br />
      <br />
      </div>
        </>
     
    )
}