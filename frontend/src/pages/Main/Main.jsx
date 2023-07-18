import Header from '../../components/Header';
import Home from '../../sections/Home/Home';
import About from '../../sections/About/About';
import Services from '../../sections/Services/Services';
import Reviews from '../../sections/Reviews/Reviews';
import Contact from '../../sections/Contact/Contact';
import Footer from '../../sections/Footer/Footer';
import {useScroll} from '../../hooks/scroll_hook';
import './Main.css';

const Main = () => {
    const {elementsRef, scrollToHandler} = useScroll();

    return (
        <>
            <Header main scrollToHandler={scrollToHandler} />
            <div>
                <Home innerRef={home => elementsRef.current[0] = home} scrollToHandler={scrollToHandler} />
                <About innerRef={about => elementsRef.current[1] = about} />
                <Services innerRef={services => elementsRef.current[2] = services} />
                <Reviews innerRef={reviews => elementsRef.current[3] = reviews} />
                <Contact innerRef={contact => elementsRef.current[4] = contact} />
                <Footer />
            </div>
        </>
    );
};

export default Main;