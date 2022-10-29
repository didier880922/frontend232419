import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import logger from 'use-reducer-logger';
//import data from "../data";

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_REQUEST':
      return {...state, loading: true};
    case 'FETCH_SUCCESS':
      return {...state, products: action.payload, loading: false};
    case 'FETCH_FAIL':
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
};

function HomeScreen() {
  const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true, error: '',
  });

  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      dispatch({type: 'FETCH_REQUEST'});
      try {
        const result = await axios.get('http://localhost:5000/api/products')
        dispatch({type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({type: 'FETCH_FAIL', payload: err.message});
      }
    };
    fecthData();
  }, []);
  return (
    <div>
      <h1>Lista de productos</h1>
      <div className="products">
        {loading ? (
             <div>Cargando datos...</div>
          ) : error ? ( 
          <div>{error}</div>
          ) : (
        products.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <a href={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </a>
              <p>{product.price}</p>
              <button>Agregar al carrito</button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}

export default HomeScreen;
