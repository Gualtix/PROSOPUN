
import React, {useEffect, useState} from "react";
import CompDrawer from './CompDrawer'
import { BrowserRouter  as Router,Route,Switch} from "react-router-dom";
import './Menu.css'
import VistaNewMsg from "../pages/VistaNewMsg";
import Reportes from "../pages/Reportes";
import socket from "./Socket";



/*function Menu(){
    const [dats,setDatos] = useState([]);
     useEffect(()=>{
        socket.on('contenido',dats =>{
           setDatos(dats) 
        })
    },[dats])
}*/

export default function MaterialUI (){
 /*   const [serverEnvioMsg,setMsgs] = useState([]);
    
     useEffect(()=>{
        socket.on('serverEnvioMsg',serverEnvioMsg =>{
            setMsgs(serverEnvioMsg) 
        })
    },[serverEnvioMsg])
*/

    const [ReEnvio,setReEnvio] = useState( "" );
     useEffect(()=>{
         
        socket.on('ReEnvio',ReEnvio =>{
            setReEnvio(ReEnvio) 
        })
    },[socket])//aqui tenia [ReEnvio]

    const [consulta1,setConsulta1] = useState( "" );
     useEffect(()=>{
         
        socket.on('consulta1',consulta1 =>{
            setConsulta1(consulta1) 
        })
    },[socket])//aqui tenia [ReEnvio]
    

    return(
        <>
        {
            console.log('mensaje'),
            console.log(ReEnvio),
            console.log('la consulta 1 es:'),
            console.log(consulta1)
        }
      <CompDrawer />
      <Router>
                <Switch>
                <Route exact path ="/">
                    <br />
                    <h3>Home</h3>
                    <p>
                        Bienvenidios a la pagina de inicio <br/>
                    </p>

                    
            
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
    )
}