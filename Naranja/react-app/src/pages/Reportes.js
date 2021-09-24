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
import Select from "../componentes/Select";
import Table from "../componentes/Table"


const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Reportes() {
  //para grafica de pie
  var array = []
  var val = 0 
  const [top5,setTop5] = useState( "" );
  useEffect(()=>{			
    socket.on('top5',top5 =>{
      setTop5(top5) 
    })
  },[top5])//aqui tenia [ReEnvio]

  const [consulta0,setConsulta0] = useState( "" );
     useEffect(()=>{
         
        socket.on('consulta0',consulta0 =>{
            setConsulta0(consulta0) 
        })
    },[socket])//aqui tenia [ReEnvio]

  const [consulta1,setConsulta1] = useState( "" );
     useEffect(()=>{
         
        socket.on('consulta1',consulta1 =>{
            setConsulta1(consulta1) 
        })
    },[consulta1])//aqui tenia [ReEnvio]

    const [consulta2,setConsulta2] = useState( "" );
    useEffect(()=>{
        
       socket.on('consulta2',consulta2 =>{
           setConsulta2(consulta2) 
       })
   },[consulta2])//aqui tenia [ReEnvio]

  return (
    <div class ="left">
      {
        console.log('la consulta 1 es:'),
        console.log(consulta1),
        console.log('la consulta 2 es:'),
        console.log(consulta2),
        console.log('la consulta 3 es:'),
        console.log(consulta0)
      }
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
     
                    
      <Grid item xs={2} sm={4} md={4} >
            <Item>
                <h2>NOTICIAS</h2>
                <hr/>
            {
               ( consulta0 === "" ? " " : 
                ( consulta0.consulta.map((el)=>(
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
               ( consulta1 === "" ? " " : 
                ( consulta1.consulta.map((el)=>(
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
               ( consulta2 === "" ? " " : 
                ( consulta2.consulta.map((el)=>(
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
            <Select  />
            </Item>
          </Grid>
          
          <Grid item xs={2} sm={4} md={4} > 
            <Item>
            {
               ( top5 === "" ? " " : 
                ( top5.top.map((el)=>{
                  return(
                   array.push({"y":el.total, "label": el.hashtag})
                  )                                    
                  })))   
            }
            <PieGraph arreglo = {array} />
            { /*console.log(val),
                 console.log(array)*/}
            </Item>
          </Grid>
        
      </Grid>
    </Box>
    <hr />
    <h4>AQUI VA LA TABLA</h4>
                 <Table />
    <br />
    <br />
    </div>
  );
}