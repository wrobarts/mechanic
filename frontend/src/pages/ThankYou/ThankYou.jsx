import Header from '../../components/Header';
import Button from '../../FormElements/Button';
import './ThankYou.css';

const ThankYou = () => {
    return (
        <>
            <Header />
            <section className="thank-you-section">
                <h3>Thank You!</h3>
                <p>We have received your email and will reply as soon as we can.</p>
                <Button to="/" className="thank-you-button">Back Home</Button>
            </section>
        </>
    );
};

export default ThankYou;