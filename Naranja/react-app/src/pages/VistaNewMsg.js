

import React,{useEffect,useState} from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import './VistaNewMsg.css'
import MediaCard from '../componentes/Card';
import socket from "../componentes/Socket";


function ElementoLista(props){
  /*  const [hashs,setHash] = useState("");
    useEffect(()=>{
      socket.on('hashs',data =>{
        setHash(data) 
      });
  },[]);*/
  /*var hashss = ""
  hashss = " "
  hashss = 
    (hashs === "" ? " " : (hashs.hashs.map((h)=>{
        return(
        props.el.id === h.id_noti_tweet ? (hashss + h.hashtag + " " ) : " "
        )      
    })))  
    */

    return(
        
        <Grid item xs={8}>
            <Item>
                <MediaCard
                nombre ={ props.el.humano}
                comentario = {props.el.comentario}
                fecha = {props.el.fecha}
                hastags = {props.hashtagss} 
                upvotes = {props.el.up}
                downvotes = {props.el.down}
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
    var hashss = ""
  hashss = " "
    const [hashs,setHash] = useState("");
    useEffect(()=>{
      socket.on('hashs',data =>{
        setHash(data) 
      });
  },[]);

    const [contenido,setDatos] = useState(
        {'contenido':[{
            "humano": "",
            "comentario":"",
            "fecha":"",
            "id": "",
            "up": 0,
            "down": 0
        }]}
    );
    
     useEffect(()=>{
        socket.on('contenido',contenido =>{
           setDatos(contenido) 
        });
    },[contenido]);
   


    return(
        
        //aqui deberia tratar con un map para poder reutilizar el grid item con la info
        <div class = "left" >
            {console.log(contenido)}
            <Grid container spacing = {2} columns = {35} >
                 
                 { //text.url === "home"? "\\":text.url
                 
                     contenido.contenido.slice(0).reverse().map((el)=>(
                        hashss = " ",
                        hashss = 
                        (hashs === "" ? " " : (hashs.hashs.map((h)=>{
                            return(
                            el.id === h.id_noti_tweet ? (hashss + h.hashtag + " " ) :  ""
                            )      
                        }))), 
                         <ElementoLista el ={el} hashtagss ={hashss} />
                     ))
                 }

                {/*
                    <Grid item xs={8}>
                    <Item>
                    <Card />
                    </Item>
                </Grid>*/}
                
            </Grid>
            <br />
        </div>
 

    )
}

export default VistaNewMsg;
      
        

        

        
