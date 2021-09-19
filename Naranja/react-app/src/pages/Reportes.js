import PieGraph from "../componentes/PieGraph"
import BarGraph from "../componentes/BarGraph"

import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './VistaNewMsg.css'

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Reportes() {
  return (
    <div class ="left">
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
     
                    
      <Grid item xs={2} sm={4} md={4} >
            <Item>
                <h2>NOTICIAS</h2>
                <hr/>
            <h3>total de noticias</h3>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Item>
            <h2>HASHTAGS</h2>
            <hr/>
            <h3>total de hashtags</h3>
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Item>
            <h2>UPVOTES</h2>
            <hr/>
            <h3>total de votes</h3>
            </Item>
          </Grid>
      </Grid>

      <br /> 

      <Grid  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 4, md: 8 }}>
        
          <Grid item xs={2} sm={4} md={4} >
            <Item>
                <BarGraph />
            </Item>
          </Grid>
          <Grid item xs={2} sm={4} md={4} >
            <Item>
            <PieGraph />
            </Item>
          </Grid>
        
      </Grid>
    </Box>
    <hr />
    <h2>AQUI VA LA TABLA</h2>
    <br />
    <br />
    </div>
  );
}