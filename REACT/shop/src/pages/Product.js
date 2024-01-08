import perfumeData from '../assets/data/perfume';
import Card from '../components/Card'
import { Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios'

function Product() {
    let [perfume, setPerfume] = useState(perfumeData);
    useEffect(() => {
        axios.get('https://daks4012.github.io/REACT/shop/dummy/newPerfume.js').then((result) => {
            let perfumeSum = [...perfume, ...result.data];
            setPerfume(perfumeSum);
        })
    }, [])
    return (
        <>
            <div className='porductTitle'>
                <h4>Product</h4>
            </div>
            <Container>
                {perfume.map(function (a, i) {
                    return (
                        i % 3 === 0 ?
                            <Row>
                                <Card perfume={perfume} i={i} />
                                <Card perfume={perfume} i={i + 1} />
                                <Card perfume={perfume} i={i + 2} />
                            </Row>
                            :
                            null
                    )
                })}
            </Container>
        </>
    )
}

export default Product;