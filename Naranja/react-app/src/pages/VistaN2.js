

import React,{useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './VistaNewMsg.css'
import MediaCard from '../componentes/Card';
import socket from "../componentes/Socket";
import { Box } from '@mui/system';


function ElementoLista(props){
 
    return(
        
        <Grid item xs={2} sm={4} md={4} >
            <Item>
                <MediaCard
                nombre ={ props.el.nombre}
                comentario = {props.el.comentario}
                fecha = {props.el.fecha}
                hastags = {props.el.hashtags} 
                upvotes = {props.el.upvotes}
                downvotes = {props.el.downvotes}
                />
            
            </Item>
        </Grid>
       
    )
}


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',

    color: theme.palette.text.secondary,
  }));



const VistaN2 = () =>{
   
    const [AzureE,setAzureE] = useState(
        {'data':[{
            "nombre": "",
            "comentario":"",
            "fecha":"",
            "id": "",
            "hashtags": "",
            "up": 0,
            "down": 0
        }]}
    );
     useEffect(()=>{
         
        socket.on('azuC',ac1 =>{
            setAzureE(ac1) 
        })
    },[AzureE])//aqui tenia [ReEnvio]
   


    return(
        
        //aqui deberia tratar con un map para poder reutilizar el grid item con la info
        <div class = "left" >
            {console.log(AzureE)}
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 16 }}>
     
                    
            {
                AzureE === "" ? "" : ( AzureE.data.slice(0).map((e)=>(
                    <ElementoLista el ={e} />
                 )))
            }
                 
        </Grid>

    </Box>
            <br />
        </div>
 

    )
}

export default VistaN2;
      
        

        

        
