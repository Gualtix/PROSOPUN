import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';


export default function MediaCard(props) {
  return (
    <Card sx={{ maxWidth: 345 }}>
     { /*<CardMedia
        component="img"
        marginLeft = "30"
        margin right = "30"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      */}
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {props.nombre}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          {props.hastags}
        </Typography>
        <hr />
        <Typography variant="body2" color="text.primary">
          {props.comentario}
        </Typography>
        <Typography variant="h7" color="text.secondary">
          {props.fecha}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"><ThumbUpIcon /> {props.upvotes} upvotes</Button>
        <Button size="small"><ThumbDownIcon /> {props.downvotes} downvotes</Button>
      </CardActions>
    </Card>
  );
}
