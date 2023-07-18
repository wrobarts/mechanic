import React from 'react';
import './Card.css';

const Card = props => {
    return (
        <div
            className={
                `card-container ${props.className} ${props.shadow && 'hover-shadow'} ${props.permShadow && 'perm-shadow'
            }`}
            style={props.style}
            onMouseEnter={props.onMouseEnter}
            onMouseLeave={props.onMouseLeave}
        >
            {props.children}
        </div>
    );
};

export default Card;