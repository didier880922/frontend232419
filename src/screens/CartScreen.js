import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import MessageBox from "../components/MessageBox";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Carrito de compras</title>
      </Helmet>
      <h1>Carrito de compras</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Carrito de compras esta vacio.{" "}
              <Link to="/">¡Que esperas para comprar!</Link>
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
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>
                    <Col md={3}>
                      <Button variant="ligth" disabled={item.quantify === 1}>
                        <i className="fa fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantify}</span>{" "}
                      <Button
                        variant="ligth"
                        disabled={item.quantify === item.countInStock}
                      >
                        <i className="fa fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>${item.price}</Col>
                    <Col md={2}>
                      <Button variant="ligth">
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
                        type="button"
                        variant="primary"
                        disabled={cartItems.length===0}
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
