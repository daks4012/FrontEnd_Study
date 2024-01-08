import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

function Card(props) {
    let navigate = useNavigate();
    return (<Col className='productItem'>
        <img className='productImg' onClick={() => { navigate('/detail/' + props.i) }} src={process.env.PUBLIC_URL + '/assets/img/perfume' + props.i + '.png'} alt='pixabay'></img>
        <h5 onClick={() => { navigate('/detail/' + props.i) }}>{props.perfume[props.i].title}</h5>
        <h6>{props.perfume[props.i].content}</h6>
        <p>{props.perfume[props.i].price}$</p>
    </Col>)
}

export default Card;