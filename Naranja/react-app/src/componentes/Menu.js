
import CompDrawer from './CompDrawer'
import { BrowserRouter  as Router,Route,Switch} from "react-router-dom";
import './Menu.css'
import VistaNewMsg from "../pages/VistaNewMsg";
import Reportes from "../pages/Reportes";
import socket from "./Socket";
import React, {useEffect, useState} from "react";


/*function Menu(){
    const [dats,setDatos] = useState([]);
     useEffect(()=>{
        socket.on('contenido',dats =>{
           setDatos(dats) 
        })
    },[dats])
}*/

export default function MaterialUI (){
    const [serverEnvioMsg,setMsgs] = useState([]);
    
     useEffect(()=>{
        socket.on('serverEnvioMsg',serverEnvioMsg =>{
            setMsgs(serverEnvioMsg) 
        })
    },[serverEnvioMsg])

    const [ReEnvio,setReEnvio] = useState([]);
    
     useEffect(()=>{
        socket.on('ReEnvio',ReEnvio =>{
            setReEnvio(ReEnvio) 
        })
    },[ReEnvio])

    
    

    return(
        <>
        {
            console.log('mensaje'),
            console.log(ReEnvio),
        console.log(serverEnvioMsg)}
      <CompDrawer />
      <Router>
                <Switch>
                <Route exact path ="/">
                    <br />
                    <h3>Home</h3>
                    <p>
                        Bienvenidios a la pagina de inicio <br/>
                    </p>
                    
                    
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
    )
}