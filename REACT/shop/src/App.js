import { Navbar, Container, Nav } from 'react-bootstrap';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/css/App.css';
import perfumeData from './assets/data/perfume';

const Home = lazy(() => import('./components/Home.js'))
const Product = lazy(() => import('./pages/Product.js'))
const Detail = lazy(() => import('./components/Detail.js'))
const Cart = lazy(() => import('./pages/Cart.js'))

function App() {
  let navigate = useNavigate();
  let [perfume] = useState(perfumeData);
  let lastView = JSON.parse(localStorage.getItem("latestView"));


  useEffect(() => {
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
          <Navbar.Brand href="#home">
            <img src='/assets/logo/Daks.png' className='navLogo' alt='nav로고'></img>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('./product') }}>Product</Nav.Link>
            <Nav.Link onClick={() => { navigate('./cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중임</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/detail/:productId" element={<Detail perfume={perfume} />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </div >
  );
}

export default App;

