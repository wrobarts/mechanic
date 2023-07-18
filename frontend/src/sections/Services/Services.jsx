import ServicesImage from './components/ServicesImage';
import services from './util/services';
import './Services.css';

const Services = props => {
    return (
        <ServicesImage innerRef={props.innerRef}>
            <h3 className="services-title">Services</h3>
            <section className="services-section-container">
                <div className="services-section-text">
                    <p>
                        With years of experience and a dedication to quality workmanship,
                        we offer <strong>comprehensive auto repairs</strong>, ranging from
                        engine diagnostics and brake services to electrical system repairs
                        and more.
                    </p>
                    <p>
                        Our state-of-the-art equipment and advanced diagnostic tools enable
                        us to accurately identify and address any issues your vehicle may be
                        facing. We believe in <strong>transparent and fair pricing</strong>,
                        providing free estimates and quotes, so you know exactly what to expect.
                    </p>
                    <p>
                        At Johnson’s Auto Repair, we value your trust and strive to build
                        long-lasting relationships with our customers through <strong>reliable service</strong>,
                        attention to detail, and a commitment to your satisfaction.
                    </p>
                </div>
                <ul className="services-section-list">
                    {services.map((service, index) =>
                        <li key={index}>
                            <div className="services-section-list-item">
                                <p>{service}</p>
                            </div>
                        </li>
                    )}
                </ul>
            </section>
        </ServicesImage>
    );
};

export default Services;