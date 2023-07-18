import './About.css';

const About = props => {
    return (
        <article ref={props.innerRef} className="about-section">
            <img
                alt="about"
                src={require('../../images/mechanic_about.jpeg')}
                className="about-image"
            />
            <section className="about-section-text">
                <h3>About Us</h3>
                <p>
                    {`Johnson’s Auto Repair has a heartwarming origin that truly
                    embodies the spirit of family and passion for automobiles.
                    It all began when our founder, Dan Johnson, discovered his
                    love for cars while working alongside his father in their
                    garage. They shared countless hours tinkering with engines,
                    fixing cars, and bonding over their shared enthusiasm. Their
                    small garage transformed into a thriving auto mechanic shop.
                    Today, Johnson’s Auto Repair remains a family-owned and operated
                    business, built on the same values of honesty, integrity, and
                    exceptional service that inspired its inception.`}
                </p>
                <p>
                    {`At Johnson’s Auto Repair, we take pride in being the go-to destination
                    for all your auto repair and maintenance needs in [Location]. With a
                    team of skilled and certified mechanics, we provide top-notch services
                    to keep your vehicle running smoothly and safely on the road. Our
                    commitment to excellence and customer satisfaction sets us apart
                    as a trusted name in the industry.`}
                </p>
            </section>
        </article>
    );
};

export default About;