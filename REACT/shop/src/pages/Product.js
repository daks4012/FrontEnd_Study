// Product.js

import Card from '../components/Card'
import { Container, Col, Row } from 'react-bootstrap';

function Product(props) {
    return (
        <>
            <div className='porductTitle'>
                <h4>Product</h4>
            </div>
            <Container>
                <Row>
                    {props.perfume.map((perfume, index) => (
                        <Col key={index} sm={4}>
                            <Card
                                title={perfume.title}
                                content={perfume.content}
                                price={perfume.price}
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
