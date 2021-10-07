
import React, {useEffect, useState} from "react";


import { BrowserRouter  as Router,Route,Switch,Redirect} from "react-router-dom";
import './Menu.css'
import VistaNewMsg from "../pages/VistaNewMsg";
import VistaN2 from "../pages/VistaN2"
import Reportes from "../pages/Reportes";
import Reportes2 from "../pages/Reportes2";
//import socket from "./Socket";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CompDrawer from "./CompDrawer";
import Notificacion2 from "./Notificacion2"
import io from "socket.io-client";
const ENDPOINT = "//localhost:8080"


export default function MaterialUI (props){
   
  
  
    return( 
        
        <>
      
        <div class = "left"  > 
       
      
      <Router>
          <CompDrawer />
                <Switch>
                <Route exact path ="/">
                    <br />
                    Bienvenidos
                    <br/>
                    Pagina de inicio
                    <br/>
                    <br/>
                    </Route>
                
                <Route exact path ="/Notificacion">
                    
                    <p>
                        <h6>Notificaciones de Carga </h6>
                    </p>
                    
                   {/* width: 300, height: 300,minWidth: 75, marginLeft: 50, */}
                 
                    <div style={{ display:'flex',justifyContent:'center' }}>
                    {
                        <Notificacion2 />
                        }
                    </div>
    
                    
                </Route>
                <Route exact path ="/VistaNewsMsgs">
                    <VistaNewMsg />
                </Route>
                <Route exact path ="/VistaN2">
                    <VistaN2 />
                </Route>
                <Route exact path ="/Reportes">
                  
                Reportes en CloudSQL
                         <Reportes />
                   
                </Route>
                <Route exact path ="/Reportes2">
                  
                Reportes en CosmosDB
                         <Reportes2 />
                   
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
