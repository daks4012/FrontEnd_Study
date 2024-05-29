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
`

function Cart() {
    let perfume = useSelector((state) => { return state })
    let dispatch = useDispatch() //store.js에 요청을 보내는 함수 

    return (<>
        <Container>
            <Table>
                <thead>
                    <TRtextCenter>
                        <th>No</th>
                        <th>상품명</th>
                        <th>용량</th>
                        <th>수량</th>
                    </TRtextCenter>
                </thead>
                <tbody>
                    {
                        perfume.cartState.map((a, i) => {
                            return (
                                <TRtextCenter key={i}>
                                    <td>{i + 1}</td>
                                    <td>{perfume.cartState[i].name}</td>
                                    <td>{perfume.cartState[i].volume}</td>
                                    <td>
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
        </Container>
    </>)
}

export default Cart;