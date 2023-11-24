import React from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import icecreamd from "../../images/icecreamd.png";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CardActions from '@mui/material/CardActions';
import { Link } from "react-router-dom";
const AdminProductCards=({product ,handleRemove})=>{
    const {title,description,images,slug}=product;
    //console.log("product",product)
return(
    <div>
        <Card sx={{ maxWidth: 345 }}>
  <CardMedia
        component="img"
        alt=""
        height="140"
        image={images && images.length ? images[0].uri : icecreamd}
      />
         <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${description && description.substring(0, 40)}...`}
        </Typography>
      </CardContent>
      
      <CardActions className="d-flex justify-content-around bg-body-secondary">
      
    <Link to={`/admin/product/${slug}`}><div> <EditIcon className="text-primary"/> </div></Link>
     
      < div className="text-danger"
       onClick={() => handleRemove(slug)}><DeleteIcon  /></div>
      
      </CardActions>
        </Card>
    
    </div>
)
}

export default AdminProductCards;