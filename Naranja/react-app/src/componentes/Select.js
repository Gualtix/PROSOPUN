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

export default function NativeSelectDemo() {
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
          <option value={40}>Columnas</option>
          <option value={10}>Barras</option>
          
          <option value={20}>Lineas</option>
          <option value={30}>StockCharts</option>
        </NativeSelect>
      </FormControl>       
      <FormControl >
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Fecha
        </InputLabel>
        <NativeSelect
          defaultValue={60}
          onChange = {handleChange2}
        >
          <option  value={"hola"}>Ten</option>
          
          <option  value={"ahino"}>Twenty</option>
          <option value={30}>Thirty</option>
        </NativeSelect>
      </FormControl>

      <p>yOUR SELECTED : {valor}</p>
      <p>yOUR SELECTED : {name}</p>
      {(valor === '10' ? <BarGraph />  : valor === '40' ? <ColumGraph />:(valor === '20' ? <StockGrap /> : <LineGraph />))
      }
      
      
    </Box>
    
  );
}
