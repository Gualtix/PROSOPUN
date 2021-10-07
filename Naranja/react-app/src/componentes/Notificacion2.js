
import React, {useState,useEffect}from "react";

import { Typography,Card,CardContent } from "@mui/material";
import io from "socket.io-client";
//const ENDPOINT = "//localhost:8080"
const ENDPOINT = 'https://pure-ethos-325501.uc.r.appspot.com'



export default function Notificacion2(){
    const [ReEnvio,setReEnvio] = useState( 
        {'ReEnvio':[{
            "Api": "",
            "Guardados":"",
            "TiempoDeCarga":"",
            "DB": ""
        }]}
     );
    useEffect(()=>{     
        const socket = io(ENDPOINT);  
        socket.on('ReEnvio',re =>{
            setReEnvio(re) 
        })
    },[ReEnvio])//aqui tenia [ReEnvio]

    return (
        <>
        {console.log("el no es reloj"), console.log(ReEnvio)}
        <Card sx={{ maxWidth: 370 }} >
                           
                            <CardContent >
                                <Typography gutterBottom variant="h6" component="div">
                                  Notificación de Carga  
                                </Typography>
                                <hr />
                                {
    
                                    ( ReEnvio === "" ? " " : 
                                    ( ReEnvio.ReEnvio.map((el)=>(
                                        <>
                                        <Typography fontSize="1rem" color="text.secondary">
                                        API: {el.Api}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                        GUARDADOS:{el.Guardados}
                                        </Typography>
                                        <Typography  fontSize="1rem" color="text.secondary">
                                        TIEMPO DE CARGA:{el.TiempoDeCarga}
                                        </Typography>
                                        <Typography variant="body2" color="text.primary">
                                        BASE DE DATOS:{el.DB}
                                        </Typography>
    
                                        </>
                                    ))))
                                }
    
                                
                            </CardContent>
                            </Card>
                        
        </>
        )

    
    
}