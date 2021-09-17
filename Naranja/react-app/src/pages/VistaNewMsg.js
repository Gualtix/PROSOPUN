
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Card from '../componentes/Card'
import './VistaNewMsg.css'


const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',

    color: theme.palette.text.secondary,
  }));

const VistaNewMsg = () =>{
    return(
        
        <div class = "left" >
            <Grid container spacing = {2} columns = {35} >
                    <Grid item xs={8}>
                    <Item>
                    <Card /> 
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                    <Card />
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                    <Card />
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                    <Card />
                    </Item>
                </Grid>
                <Grid item xs={8}>
                    <Item>
                    <Card />
                    </Item>
                </Grid>
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
      
        

        

        
