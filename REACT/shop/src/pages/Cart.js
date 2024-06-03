import { Container, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components';
import { quantityPlus, quantityMinus, deletePerfume } from '../redux/store';

let TRtextCenter = styled.tr`
    text-align: center;
`;

let DelContainer = styled.div`
    width: 30px;
    float: right;
`;

let Total = styled.div`
    position: fixed;
    bottom: 30px;
`;

let TotalOrder = styled.button`
    margin-left: 10px;
    border-radius: 5px;
    width: 80px;
    height: 33px;
    box-shadow: 1px 1px 3px gray;
    background-color: #212529;
    color: #9B9D9E;
    font-size: 13px;
`;

function Cart() {
    let perfume = useSelector((state) => { return state })
    let cartItems = useSelector((state) => state.cartState);
    let dispatch = useDispatch() //store.js에 요청을 보내는 함수 
    let totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * (parseInt(item.volume) / 50) * item.quantity;
    }, 0);

    return (<>
        <Container>
            <Table>
                <thead>
                    <TRtextCenter>
                        <th>No</th>
                        <th>상품명</th>
                        <th>용량</th>
                        <th>수량</th>
                        <th>가격</th>
                    </TRtextCenter>
                </thead>
                <tbody>
                    {
                        perfume.cartState.map((a, i) => {
                            return (
                                <TRtextCenter key={i}>
                                    <td>{i + 1}</td>
                                    <td>{perfume.cartState[i].name}</td>
                                    <td>{perfume.cartState[i].volume}ml</td>
                                    <td style={{ width: '150px' }}>
                                        {
                                            // perfume.cartState[i].id로 접근해 액션에 디스패치 함. 정확하게 참조 가능
                                        }
                                        <button className='btn cartBtn' onClick={() => {
                                            dispatch(quantityMinus(perfume.cartState[i].id));
                                        }}>-</button>
                                        &ensp;{perfume.cartState[i].quantity}&ensp;
                                        <button className='btn cartBtn' onClick={() => {
                                            dispatch(quantityPlus(perfume.cartState[i].id));
                                        }}>+</button>
                                    </td>
                                    <td style={{ width: '150px' }}
                                    >{perfume.cartState[i].price * (perfume.cartState[i].volume) / 50 * perfume.cartState[i].quantity}$</td>
                                    <DelContainer>
                                        <button className='btn' onClick={() => {
                                            dispatch(deletePerfume(perfume.cartState[i].id));
                                        }}>삭제</button>
                                    </DelContainer>
                                </TRtextCenter>
                            )
                        })
                    }
                </tbody>
            </Table>
            <Total>total : {totalPrice}$
                <TotalOrder onClick={(e) => { alert('미구현') }}>주문하기</TotalOrder>
            </Total>
        </Container>
    </>)
}

export default Cart;