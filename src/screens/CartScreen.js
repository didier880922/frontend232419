import { useContext } from "react";
import { Store } from "../Store";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import axios from "axios";

const baseURL = "http://localhost:30000";

export default function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantify) => {
    const { data } = await axios.get(`${baseURL}/api/products/${item._id}`);
    if (data.countInStock < quantify ) {
      window.alert('El producto esta fuera de stock');
      return;
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantify },
    });
  };

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate ('/signin?redirect=/shipping');
  };

  return (
    <div>
      <h1>Carrito de compras</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Carrito de compras no tiene productos.{" "}
              <Link to="/">Ir a comprar</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button 
                      onClick={() => updateCartHandler(item, item.quantify - 1)
                      }
                      variant="ligth" disabled={item.quantity === 1}>
                        <i className="fa fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantify}</span>{' '}
                      <Button variant="ligth" 
                      onClick={() => updateCartHandler(item, item.quantify + 1)
                      }
                      disabled={item.quantify === item.countInStock}>
                        <i className="fa fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>$ {item.price}</Col>
                    <Col md={2}>
                      <Button 
                      onClick={() => removeItemHandler(item)}
                      variant="ligth">
                        <i className="fa fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantify, 0)}{" "}
                    item) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantify, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    onClick={checkoutHandler}
                    type="button"
                    variant="primary"
                    disabled={cartItems.length === 0}
                  >
                    Ir a pagar
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
