import './Heading.css';

const Heading = props => {
    return (
        <div className={`heading-container ${props.inverse && 'heading-spacing-inverse'}`}>
            <h3 className={`heading-subtitle ${props.inverse ? 'text-heading-inverse' : 'text-subtitle'}`}>
                {props.subtitle}
            </h3>
            <h2 className={`heading-title ${props.inverse ? 'text-heading-inverse' : 'text-title'}`}>
                {props.title}
            </h2>
        </div>
    );
};

export default Heading;