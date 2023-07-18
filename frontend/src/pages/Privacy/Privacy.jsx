import Header from '../../components/Header';
import Footer from '../../sections/Footer/Footer';
import privacy from './util/privacy';
import './Privacy.css';

const Privacy = () => {
    return (
        <>
            <Header />
            <h3 className="privacy-title">Privacy Policy</h3>
            <section className="privacy-policy">
                <p>Effective Date: July 17, 2023</p>
                <p>
                    At Johnson's Auto Repair, we are committed to protecting the
                    privacy and security of your personal information. This Privacy
                    Policy outlines how we collect, use, disclose, and protect the
                    information you provide to us through our website. By accessing
                    or using our website, you agree to the terms of this Privacy Policy.
                </p>
                {privacy.map((privacyItem, index) => (
                    <div key={index}>
                    <h6>{privacyItem.section}</h6>
                        {privacyItem.description.map((privacyItemDescription, indexItem) => (
                            <p key={indexItem}>{privacyItemDescription}</p>
                        ))}
                    </div>
                ))}
                <p>
                    If you have any questions or concerns regarding our Privacy Policy,
                    please contact us using the information provided on our website.
                </p>
            </section>
            <Footer />
        </>
    );
};

export default Privacy;