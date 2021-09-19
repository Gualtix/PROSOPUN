import Card from "./Card";
import React from 'react';
import CompDrawer from './CompDrawer'
import { BrowserRouter  as Router,Route,Switch} from "react-router-dom";
import './Menu.css'
import VistaNewMsg from "../pages/VistaNewMsg";
import Reportes from "../pages/Reportes";

export default function MaterialUI (){
    return(
        <>
        
      <CompDrawer />
      <Router>
                <Switch>
                <Route exact path ="/">
                    <br />
                    <h3>Home</h3>
                    <p><h4>Bienvenidios a la pagina de inicio, <br/>
                        para ver algunos de los<br/>
                        reportes ver al Menu<br/>
                    </h4></p>
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