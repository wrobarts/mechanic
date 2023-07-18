import ContactForm from '../../components/ContactForm';
import './Contact.css';

const Contact = props => {
    return (
        <article ref={props.innerRef} className="contact-section">
            <div className="contact-triangle"></div>
            <h3>Contact Us</h3>
            <section className="contact-container">
                <div className="contact-left">
                    <img
                        alt="contact"
                        src={require("../../images/mechanic_contact.jpeg")}
                        className="contact-image"
                    />
                    <p>Call us at [Phone Number] to schedule an appointment</p>
                    <h5>Email:</h5>
                    <p>[Email Address]</p>
                    <h5>Street Address:</h5>
                    <p>[123 Main Street]</p>
                    <p>[City, State Zip]</p>
                    <h5>Hours:</h5>
                    <p>Mon - Fri: 7:00 - 5:30</p>
                    <p>Sat: 8:00 - 3:00</p>
                    <p>Sun: Closed</p>

                </div>
                <div className="contact-right">
                    <ContactForm />
                </div>
            </section>
        </article>
    );
};

export default Contact;