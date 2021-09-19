
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '../componentes/Card'
import './VistaNewMsg.css'
import data from "../helpers/data.json";
import MediaCard from '../componentes/Card';

function ElementoLista(props){
    return(
        
        <Grid item xs={8}>
            <Item>
                <MediaCard
                nombre ={ props.el.nombre}
                comentario = {props.el.Comentario}
                fecha = {props.el.fecha}
                hastags = {props.el.hastags} 
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

const VistaNewMsg = () =>{
    return(
        //aqui deberia tratar con un map para poder reutilizar el grid item con la info
        <div class = "left" >
            <Grid container spacing = {2} columns = {35} >
                 
                 {
                     data.twits.slice(0).reverse().map((el)=>(
                         <ElementoLista el ={el} />
                     ))
                 }

                <Grid item xs={8}>
                    <Item>
                    <Card />
                    </Item>
                </Grid>
                
            </Grid>
            <br />
        </div>
 

    )
}

export default VistaNewMsg;
      
        

        

        
