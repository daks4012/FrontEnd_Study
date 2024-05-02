// Product.js

import perfumeData from '../assets/data/perfume';
import Card from '../components/Card'
import { Container, Col, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios'

function Product() {
    let [perfume, setPerfume] = useState(perfumeData);
    useEffect(() => {
        axios.get('https://daks4012.github.io/REACT/shop/dummy/newPerfume.js')
            .then((result) => {
                setPerfume([...perfumeData, ...result.data]);
            })
            .catch((error) => {
                console.error('Error fetching perfume data:', error);
            });
    }, []);
    return (
        <>
            <div className='porductTitle'>
                <h4>Product</h4>
            </div>
            <Container>
                <Row>
                    {perfume.map((product, index) => (
                        <Col key={index} sm={4}>
                            <Card
                                title={product.title}
                                content={product.content}
                                price={product.price}
                                index={index}
                                imageUrl={`${process.env.PUBLIC_URL}/assets/img/perfume${index}.png`}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    )
}

export default Product;
