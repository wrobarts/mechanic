import HomeHero from './components/HomeHero';
import Button from '../../FormElements/Button';
import './Home.css';

const Home = props => {
    const scrollToHandler = scrollDestination => {
        props.scrollToHandler(scrollDestination);
    };
    
    return (
        <HomeHero innerRef={props.innerRef}>
            <section className="home-content-overlay">
                <div className="home-title-section">
                    <h1>Professional Auto Services For [Location]</h1>
                    <h3>We offer comprehensive auto repairs and routine maintenace services</h3>
                </div>
                <div className="home-content-section">
                    <div className="home-content-section-left">
                        <h5>Competitive Pricing and Transparency</h5>
                        <ul className="home-content-list">
                            <li>Free estimates and quotes</li>
                            <li>Fair and competitive rates</li>
                            <li>No hidden fees or extra charges</li>
                        </ul>
                    </div>
                    <div className="home-content-section-right">
                        <Button onClick={() => scrollToHandler("contact")}>Request an Appointment</Button>
                    </div>
                </div>
                <div className="home-content-ribbon">
                    <p>
                        Johnson's Auto Repair | [Location] | [Phone Number]
                    </p>
                </div>
            </section>
        </HomeHero>
    );
};

export default Home;