import Card from "./Card";
import React from 'react';
import CompDrawer from './CompDrawer'
import { BrowserRouter  as Router,Route,Switch} from "react-router-dom";

//import {Circular} from "../pages/Reportes";
import './Menu.css'
import VistaNewMsg from "../pages/VistaNewMsg";
import Reportes from "../pages/Reportes";

export default function MaterialUI (){
    return(
        <>
       {/*   <h2>Menu principal</h2>
      <Card />*/}
      <CompDrawer />
      <Router>
                <Switch>
                <Route exact path ="/">
                    <h3>Home</h3>
                    <p>Bienvenidios al tema de las Rutas con React</p>
                </Route>
                <Route exact path ="/Reportes">
                    <Reportes />
                </Route>
                <Route exact path ="/VistaNewsMsgs">
                    <VistaNewMsg />
                </Route>
                {/*<Route exact path ="/contacto" component = {<Contacto />}>*/}
                {/*<Route exact path = "/contacto"
                    children = {
                        <>
                        <Contacto />
                        <p>eejejejejejejeje</p>
                        </>
                    } >
                    </Route>*/
                }    
                
                
                </Switch>
    </Router>
      
        
        </>
    )
}