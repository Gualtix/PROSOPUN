//import * as React from 'react';
import  React, {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import BarGraph from "./BarGraph"
import StockGrap from "./StockGraph"
import LineGraph from "./LineGraph"
import ColumGraph from "./ColumGraphjs"
import socket from "./Socket";
import MultiGrap from "./MultiGraph"

export default function NativeSelectDemo() {
  const [barras,setBarras] = useState( "" );
  useEffect(()=>{			
    socket.on('barras',bar =>{
      setBarras(bar) 
      
    })
  },[])
  var array = []
  var array2 = []
  var fecha = []
  var numero = 0;
    const [valor,setValue] = React.useState("");
    const handleChange = e => setValue(e.target.value);
    const [name,setFecha] = React.useState("");
    const handleChange2 = e => setFecha(e.target.value);
    
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Graficas
        </InputLabel>
        <NativeSelect
          defaultValue={60}
          inputProps={{
            name: 'Grafica',
            id: 'option',
          }} onChange = {handleChange}
        >
          <option  value={60}>Selecciona una gráfica</option>
          <option value={40}>Columnas</option>
          <option value={10}>Barras</option>
          
          <option value={20}>Lineas</option>
          <option value={30}>StockCharts</option>
          <option value={50}>Multi-Linea</option>
        </NativeSelect>
      </FormControl> 
            
      <FormControl >

        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Fecha para Columnas y Barras
        </InputLabel>
        <NativeSelect
          defaultValue={60}
          onChange = {handleChange2}
        >
          <option  value={60}>Selecciona una Fecha</option>
          {
               ( barras === "" ? " " : 
                ( barras.barras.map((el,index)=>{
                  fecha = new Date(el.fecha)
                  numero = fecha.getMonth() + 1
                  
                  return(
                    <option  value={el.fecha}>{fecha.getFullYear()+"-"+numero+"-"+fecha.getDate()}</option>
                  )                                    
                  })))   
            }
          
        </NativeSelect>
      </FormControl>

      {/*<p>yOUR SELECTED : {name}</p>*/}
      
      {(valor === '10' ?( 
        ( barras === "" ? " " : 
          ( barras.barras.map((el,index)=>(
            <>
            
           { 
           /*array.push({ "x": new Date(el.fecha) ,"y":el.ups}),
           array2.push({ "x": new Date (el.fecha),"y":el.downV}) ,
           console.log(name),*/
           el.fecha === name ?
            (
            array.splice(0, array.length), array2.splice(0, array2.length),
             array.push({ "x": new Date(el.fecha) ,"y":el.ups}),
             array2.push({ "x": new Date (el.fecha),"y":el.downV})
            )  : ""
          }
            </>
                                            
        )))),
        <BarGraph arreglo1={array} arreglo2 = {array2} />  
        
      ): 
      valor === '40' ?(
        ( barras === "" ? " " : 
           ( barras.barras.map((el,index)=>(
             <>
             {
             el.fecha === name ?
              (fecha = new Date(el.fecha),
              numero = fecha.getMonth() + 1,
              
                array.push({ "label": "Up "+fecha.getFullYear()+"-"+numero+"-"+fecha.getDate(),"y":el.ups}),
                array.push({ "label": "Down "+fecha.getFullYear()+"-"+numero+"-"+fecha.getDate(),"y":el.downV}))
                : ""
              }
                
            </>                                   
        )))),
         <ColumGraph arreglo = {array}/>
      ):(valor === '20' ? (
        ( barras === "" ? " " : 
          ( barras.barras.map((el,index)=>{
            return(
             array.push({ "x": new Date(el.fecha) ,"y":el.ups}),
             array2.push({ "x": new Date (el.fecha),"y":el.downV})
            )                                    
       }))),
      <StockGrap arreglo1={array} arreglo2 = {array2} />
      ) : (valor === '30' ?(
        ( barras === "" ? " " : 
          ( barras.barras.map((el,index)=>{
            return(
             array.push({ "x": new Date(el.fecha) ,"y":el.ups}),
             array2.push({ "x": new Date (el.fecha),"y":el.downV})
            )                                    
       }))),
      <LineGraph arreglo1={array} arreglo2 = {array2} />
      
      ): (valor === '50' ?(
        ( barras === "" ? " " : 
           ( barras.barras.map((el,index)=>{
            fecha = new Date(el.fecha)
            numero = fecha.getMonth() + 1
             return(
              array.push({ "y":el.ups,"label": fecha.getFullYear()+"-"+numero+"-"+fecha.getDate(),}),
              array2.push({ "y":el.downV,"label": fecha.getFullYear()+"-"+numero+"-"+fecha.getDate()})
             )                                    
        }))),
      <MultiGrap arreglo1={array} arreglo2 = {array2} />
      
      ): " " ) )))
      }
      
      
    </Box>
    
  );
}
