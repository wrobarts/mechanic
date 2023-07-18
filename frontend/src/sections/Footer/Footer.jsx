import {Link} from 'react-router-dom';
import {FaFacebook} from 'react-icons/fa';
import {FaTwitter} from 'react-icons/fa';
import {FaYoutube} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <section className="footer-top">
                <div className="footer-top-left">
                    <img
                        alt="footer-logo"
                        src={require("../../images/mechanic_logo.png")}
                        className="footer-logo"
                    />
                    <div className="footer-icons">
                        <FaFacebook className="footer-icon" />
                        <FaTwitter className="footer-icon" />
                        <FaYoutube className="footer-icon" />
                    </div>
                </div>
                <div className="footer-top-right">
                    <h5>Location:</h5>
                    <p>[123 Main Street]</p>
                    <p>[City, State Zip]</p>
                    <p>[Phone Number]</p>
                </div>
            </section>
            <hr></hr>
            <section className="footer-bottom">
                <p>Johnson's Auto Repair @ 2023</p>
                <p>Website by Weston Robarts</p>
                <Link to="/privacy">Privacy Policy</Link>
            </section>
        </footer>
    );
};

export default Footer;