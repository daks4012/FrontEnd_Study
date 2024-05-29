import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Nav, Container, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { addPerfume } from '../redux/store';

let PerfumeVolume = styled.select`
    border-radius: 5px;
    padding-bottom: 3px;
    width: 75px;
`;

function Detail(props) {
    let { productId } = useParams();
    let [perfumeVolume, setPerfumeVolume] = useState("50");
    let [nowTap, setNowTap] = useState(0);
    let dispatch = useDispatch();

    useEffect(() => {
        let latestViewCopy = localStorage.getItem('latestView');
        latestViewCopy = JSON.parse(latestViewCopy) || [];
        latestViewCopy.unshift(productId);
        latestViewCopy = new Set(latestViewCopy);
        latestViewCopy = Array.from(latestViewCopy);
        localStorage.setItem('latestView', JSON.stringify(latestViewCopy));
    }, [productId]);

    return (
        <>
            <Container>
                <Col className='detailItem'>
                    <img className='detailImg' src={process.env.PUBLIC_URL + '/assets/img/perfume' + productId + '.png'} alt='pixabay'></img>
                    <div className='detailText'>
                        <h3>{props.perfume[productId].title}</h3>
                        <h6>{props.perfume[productId].content}</h6>
                        <p>{props.perfume[productId].price}$</p><br></br>
                        <span>용량</span>&ensp;
                        <PerfumeVolume onChange={(e => { setPerfumeVolume(e.target.value) })}>
                            <option value={50}>50ml</option>
                            <option value={100}>100ml</option>
                            <option value={150}>150ml</option>
                        </PerfumeVolume>
                        <div className='total'>합계 : {(props.perfume[productId].price) * perfumeVolume / 50}$</div>
                        <button className='btn buyBtn' onClick={() => {
                            dispatch(addPerfume({
                                name: props.perfume[productId].title,
                                volume: perfumeVolume + 'ml',
                                quantity: 1
                            }));
                        }}>
                            구매하기
                        </button>
                    </div>
                </Col>
            </Container>
            <Container className='detailContainerNav'>
                <Nav variant="tabs" defaultActiveKey="link0" style={{ clear: 'both' }}>
                    <Nav.Item>
                        <Nav.Link eventKey="link0" className='tabLink' onClick={() => {
                            setNowTap(0);
                        }}>상세정보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" className='tabLink' onClick={() => {
                            setNowTap(1);
                        }}>상품후기</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" className='tabLink' onClick={() => {
                            setNowTap(2);
                        }}>Q&A</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
            <TabContent nowTap={nowTap} />
        </>
    )
}

function TabContent({ nowTap }) {
    let [fade, setFade] = useState('');

    useEffect(() => {
        setTimeout(() => { setFade('tapEnd') }, 100);
        return () => {
            setFade('');
        }
    }, [nowTap]);

    return (
        <div className={'tapContents tapStart ' + fade}>
            {[<div>상세정보</div>, <div>상품후기</div>, <div>Q&A</div>][nowTap]}
        </div>
    )
}

export default Detail;
