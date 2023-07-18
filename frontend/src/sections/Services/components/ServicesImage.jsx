import './ServicesImage.css';

const ServicesImage = props => {
    return (
        <article ref={props.innerRef} className="services-image">
            {props.children}
        </article>
    );
};

export default ServicesImage;