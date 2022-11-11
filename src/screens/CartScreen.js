import { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
            
        </Col>
        <Col md={4}></Col>
      </Row>
    </div>
  );
}
