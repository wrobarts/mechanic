import './HomeHero.css';

const HomeHero = props => {
    return (
        <article ref={props.innerRef} className="home-hero">
            {props.children}
        </article>
    );
};

export default HomeHero;