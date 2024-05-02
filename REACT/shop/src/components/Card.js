// Card.js

import { useNavigate } from 'react-router-dom';

function Card({ title, content, price, index, imageUrl }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/detail/${index}`);
    };

    return (
        <div onClick={handleClick}>
            <img className='productImg' src={imageUrl} alt={title} />
            <h5 onClick={handleClick}>{title}</h5>
            <h6>{content}</h6>
            <p>{price}$</p>
        </div>
    );
}

export default Card;