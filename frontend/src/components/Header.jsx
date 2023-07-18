import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import NavBar from '../UIElements/NavBar';
import SideDrawer from '../UIElements/SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import './Header.css';

const Header = props => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    const scrollToHandler = scrollDestination => {
        props.scrollToHandler(scrollDestination);
    };

    return (
        <>
            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavBar
                        main={props.main}
                        scrollToHandler={scrollToHandler}
                    />
                </nav>
            </SideDrawer>

            <div className="main-navbar-container">
                <nav className="main-navigation__header-nav">
                    {props.main ? (
                        <img
                            alt="Logo"
                            src={require("../images/mechanic_logo.png")}
                            className="header-logo"
                            onClick={() => scrollToHandler("home")}
                        />
                    ) : (
                        <Link to="/">
                            <img
                                alt="Logo"
                                src={require("../images/mechanic_logo.png")}
                                className="header-logo"
                            />
                        </Link>
                    )}
                    {props.main && <NavBar
                        main={props.main}
                        scrollToHandler={scrollToHandler}
                    />}
                </nav>

                <div className="main-header-content-small">
                    {props.main ? (
                        <img
                            alt="Logo"
                            src={require("../images/mechanic_logo.png")}
                            className="header-logo"
                            onClick={() => scrollToHandler("home")}
                        />
                    ) : (
                        <Link to="/">
                            <img
                                alt="Logo"
                                src={require("../images/mechanic_logo.png")}
                                className="header-logo"
                            />
                        </Link>
                    )}
                    {props.main && <button className="main-navigation__menu-button" onClick={openDrawerHandler}>
                        <span />
                        <span />
                        <span />
                    </button>}
                </div>
            </div>
        </>
    );
};

export default Header;