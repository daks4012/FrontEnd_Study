import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';
import perfumeData from './assets/data/perfume.js';
import navLogo from './assets/logo/Daks.png';

const Home = lazy(() => import('./components/Home.js'))
const Product = lazy(() => import('./pages/Product.js'))
const Detail = lazy(() => import('./components/Detail.js'))
const Cart = lazy(() => import('./pages/Cart.js'))

function App() {
  let navigate = useNavigate();
  let [perfume, setPerfume] = useState(perfumeData);
  let lastView = JSON.parse(localStorage.getItem("latestView"));


  useEffect(() => {
    axios.get('https://daks4012.github.io/REACT/shop/dummy/newPerfume.js')
      .then((result) => {
        setPerfume([...perfumeData, ...result.data]);
      })
      .catch((error) => {
        console.error('Error fetching perfume data:', error);
      });

    if (lastView === null) {
      return localStorage.setItem("latestView", JSON.stringify([]))
    } else {
      return
    }
  })

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/REACT/shop">
            <img src={navLogo} className='navLogo' alt='nav로고'></img>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('./REACT/shop') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('./product') }}>Product</Nav.Link>
            <Nav.Link onClick={() => { navigate('./cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>Loading . . .</div>}>
        <Routes>
          <Route path="/REACT/shop" element={<Home perfume={perfume} />} />
          <Route path="/product" element={<Product perfume={perfume} />} />
          <Route path="/detail/:productId" element={<Detail perfume={perfume} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </div >
  );
}

export default App;

