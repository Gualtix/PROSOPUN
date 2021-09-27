import PieGraph from "../componentes/PieGraph"
import BarGraph from "../componentes/BarGraph"
//import * as React from 'react';
import  React, {useEffect, useState} from "react";

import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './VistaNewMsg.css'
import socket from "../componentes/Socket";
import Select2 from "../componentes/Select2";
import Table2 from "../componentes/Table2"



const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Reportes2() {
  //para grafica de pie
  

  var val = 0 
  const [AzureC1,setAzureE] = useState( "");
     useEffect(()=>{
         
        socket.on('azuC1',ac1 =>{
            setAzureE(ac1) 
        })
    },[])//aqui tenia [ReEnvio]
//Upvotes
    const [AzureC2,setAzureC2] = useState( "");
     useEffect(()=>{
         
        socket.on('azuC2',ac2 =>{
            setAzureC2(ac2) 
        })
    },[])//aqui tenia [ReEnvio]
  ///top5
  const [AzureC3,setAzureC3] = useState( "");
  useEffect(()=>{
      
     socket.on('azuC3',ac3 =>{
         setAzureC3(ac3) 
     })
 },[])//aqui tenia [ReEnvio]
 var array = []
  
  return (
    <div >
      
      {
        console.log('la consulta 1 es:'),
        console.log(AzureC1),
        console.log('la consulta 2 es:'),
        console.log(AzureC2),
        console.log('la consulta 3 es:'),
        console.log(AzureC3)
        
      }

   
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
     
                    
      <Grid item xs={2} sm={4} md={4} >
            <Item>
                <h2>NOTICIAS</h2>
                <hr/>
            {
               ( AzureC1 === "" ? " " : 
                ( AzureC1.data.map((el)=>(
                     <>
                    <h3>Total:  {el.CountNew} </h3>
                    </>
                 ))))
            }
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Item>
            <h2>HASHTAGS</h2>
            <hr/>
            {
               ( AzureC2 === "" ? " " : 
                ( AzureC2.data.map((el)=>(
                     <>
                    <h3>Total:  {el.CountHash} DIFERENTES</h3>
                    </>
                 ))))
            }
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Item>
            <h2>UPVOTES</h2>
            <hr/>
            {
               ( AzureC1 === "" ? " " : 
                ( AzureC1.data.map((el)=>(
                     <>
                    <h3>Total:  {el.CountUp} </h3>
                    </>
                 ))))
            }
            </Item>
          </Grid>
      </Grid>

      <br /> 

      <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }}>
        
          <Grid item xs={2} sm={4} md={4} >
            <Item>
            <Select2  />
            </Item>
          </Grid>
          
          <Grid item xs={2} sm={4} md={4} > 
            <Item>
            {
               ( AzureC3 === "" ? " " : 
                ( AzureC3.data.map((el)=>{
                  return(
                   array.push({"y":el.upv, "label": el.hash})
                  )                                    
                  })))   
            }
            <PieGraph arreglo = {array} />
            {/*array.splice(0, array.length),
                console.log(array)*/}
            { /*console.log(val),
                 console.log(array)*/}
            </Item>
          </Grid>
        
      </Grid>
    </Box>
    <hr />
                 <Table2 />
    <br />
    <br />
    </div>
  );
}