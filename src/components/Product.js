import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from "./Rating";

function Product(props) {
  const { product } = props;
  return (
    <Card key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
        rating={product.rating} 
        numReviews={product.numReviews} />
        <Card.Text>$ {product.price}</Card.Text>
        <Button>Agregar al carrito</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;