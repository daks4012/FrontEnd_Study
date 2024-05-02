import perfumeData from '../assets/data/perfume';
import { useState } from 'react';
import axios from 'axios'
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import styled from 'styled-components';

let ContainerMoreBtn = styled.div`
    width : 100%;
    text-align:center;
    margin-bottom: 30px;
`;

let Lastview = styled.div`
position: fixed;
background-color: #fff;
right: 15px;
top: 75px;
width: 100px;
height: 275px;
border-radius: 10px;
text-align: center;
box-shadow: 1px 1px 5px;
`;

let LVperpumeTitle = styled.p`
    font-size: 10px;
    cursor: pointer;
`;

let LVtitle = styled.p`
    margin : 0px;
    padding: 10px 0 10px 0;
`;

let mainPerfumeCopy = [];

function Home() {
    let [perfume, setPerfume] = useState(perfumeData);
    let [perfumeNum, setPerfumeNum] = useState(3);
    let [mainPerfume, setMainPerfume] = useState(perfume.filter(perfume => perfume.id < perfumeNum));
    let lastView = JSON.parse(localStorage.getItem("latestView"));
    let navigate = useNavigate();

    return (
        <>
            <div className='main-bg'>
                <div className='main-bgIntro'>
                    <h2 className='IntroH2'>The most versatile floral perfume</h2>
                    <p className='IntroP'>Bright neroli, soft jasmine grandy Florum and Rose Centifolia Absolute</p>
                    <p className='IntroP'>The essence of floral notes is integrated</p>
                    <p className='IntroP'>There are intense and dazzling guests</p>
                </div>
            </div>
            <Lastview>
                <LVtitle>last view</LVtitle>
                {
                    lastView !== null ?
                        lastView.map((a, i) => {
                            lastView.length = 3;
                            return (
                                <div className='lastViewContainer'>
                                    <img className='lastViewIMG' onClick={() => { navigate('/detail/' + lastView[i]) }} src={process.env.PUBLIC_URL + './assets/img/perfume' + lastView[i] + '.png'} alt='pixabay'></img>
                                    <LVperpumeTitle onClick={() => { navigate('/detail/' + lastView[i]) }}>{perfume[lastView[i]].title}</LVperpumeTitle>
                                </div>
                            )
                        })
                        :
                        null
                }
            </Lastview>
            <div className='porductTitle'>
                <h4>Product</h4>
            </div>
            <Container>
                <Row>
                    {mainPerfume.map((product, index) => (
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
                <ContainerMoreBtn>
                    {mainPerfumeCopy.length < 9 ? <button className='btn moreBtn' onClick={() => {
                        perfumeNum === 3 ?
                            axios.get('https://daks4012.github.io/REACT/shop/dummy/newPerfume.js').then((result) => {
                                let perfumeSum = [...perfume, ...result.data];
                                setPerfume(perfumeSum);
                            }).catch(() => {
                                console.log('axios실패')
                            })
                            :
                            console.log()
                        setPerfumeNum(perfumeNum += 3);
                        mainPerfumeCopy = [...perfume.filter(perfume => perfume.id < perfumeNum)];
                        setMainPerfume(mainPerfumeCopy);
                    }}>상품 더 보기</button> : null}
                </ContainerMoreBtn >
            </Container >
        </>
    )
}

export default Home;
