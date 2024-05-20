import perfumeData from '../assets/data/perfume';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';
import styled from 'styled-components';

const ContainerMoreBtn = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 30px;
`;

const Lastview = styled.div`
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

const LVperpumeTitle = styled.p`
    font-size: 10px;
    cursor: pointer;
`;

const LVtitle = styled.p`
    margin: 0px;
    padding: 10px 0 10px 0;
`;

function Home() {
  const [perfume, setPerfume] = useState(perfumeData);
  const [perfumeNum, setPerfumeNum] = useState(3);
  const [mainPerfume, setMainPerfume] = useState([]);
  const [isAllProductsLoaded, setIsAllProductsLoaded] = useState(false);
  const lastView = JSON.parse(localStorage.getItem("latestView"));
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://daks4012.github.io/REACT/shop/dummy/newPerfume.js')
      .then((result) => {
        const newPerfumeData = [...perfume, ...result.data];
        setPerfume(newPerfumeData);
        if (result.data.length === 0 || newPerfumeData.length >= 12) {
          setIsAllProductsLoaded(true);
        }
      })
      .catch((error) => {
        console.error('Error fetching perfume data:', error);
      });
  }, []); // 빈 배열로 종속성 설정

  useEffect(() => { //mainPerfume은 화면에 상품을 출력함. perfume, perfumeNum가 감지되면 필터된 상품을 출력
    setMainPerfume(perfume.filter((product, index) => index < perfumeNum));
  }, [perfume, perfumeNum]);

  const handleLoadMoreProducts = () => { //버튼이 눌렸을 때 작동하며 숫자를 +3해 필터함
    //현재 index보다 낮은 상품들만 필터한다.
    setPerfumeNum(prevNum => prevNum + 3);
    setMainPerfume(perfume.filter((product, index) => index < perfumeNum + 3));
  };

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
                <div className='lastViewContainer' key={i}>
                  <img className='lastViewIMG' onClick={() => { navigate('/detail/' + lastView[i]) }}
                    //src={process.env.PUBLIC_URL + '/assets/img/perfume' + lastView[i] + '.png'
                    src={'https://daks4012.github.io/REACT/shop/assets/img/perfume' + lastView[i] + '.png'} alt='pixabay'></img>
                  <LVperpumeTitle onClick={() => { navigate('/detail/' + lastView[i]) }}>
                    {perfume[lastView[i]] && perfume[lastView[i]].title}
                  </LVperpumeTitle>
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
        {isAllProductsLoaded || mainPerfume.length >= perfume.length ? (
          <ContainerMoreBtn>
            <button className='btn moreBtn' onClick={() => navigate('/product')}>상품 페이지로 이동</button>
          </ContainerMoreBtn>
        ) : (
          <ContainerMoreBtn>
            <button className='btn moreBtn' onClick={handleLoadMoreProducts}>상품 더 보기</button>
          </ContainerMoreBtn>
        )}
      </Container>
    </>
  );
}

export default Home;