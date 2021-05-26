import React, { Component } from 'react';
import './NavbarMobile.css';
import classnames from 'classnames';
import Mobile_Nav_Layout from './Mobile_Nav_Layout/Mobile_Nav_Layout';
import MobileNavbarHamburgerButton from './MobileNavbarHamburgerButton/MobileNavbarHamburgerButton';

class NavbarMobile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarMobileOpenState: false
            , hideMobileNav: true
        };

        this.openNavbarMobileFunc = this.openNavbarMobileFunc.bind(this);
        this.closeMobileNav = this.closeMobileNav.bind(this);
    }

    openNavbarMobileFunc() {
        const { navbarMobileOpenState } = this.state;
        if (navbarMobileOpenState) this.setState({ hideContent: true }, function () {
            this.setState(function (prevState) {
                return {
                    navbarMobileOpenState: !prevState.navbarMobileOpenState
                }
            }.bind(this))
        }.bind(this))
        else this.setState({ hideContent: false }, function () {
            this.setState(function (prevState) {
                return {
                    navbarMobileOpenState: !prevState.navbarMobileOpenState
                }
            }.bind(this))
        }.bind(this))

        setTimeout(function () {
            this.setState({ showIcon: true });
        }.bind(this), 2000);
    }

    closeMobileNav() {
        this.setState({ hideContent: false }, function () {
            this.setState({ navbarMobileOpenState: false })
        }.bind(this))
    }

    render() {

        const { navbarMobileOpenState, hideMobileNav } = this.state;

        return (
            <div className={classnames("navbarMobileDiv", {
                "navbarMobileDivHidden": hideMobileNav
            })}>
                <MobileNavbarHamburgerButton navbarMobileOpenState={navbarMobileOpenState} openNavbarMobileFunc={this.openNavbarMobileFunc} />

                <div className={classnames("navbarMobileScreen", {
                    "navbarMobileScreenShow": navbarMobileOpenState
                })}
                    onTransitionEnd={function () {
                        if (!navbarMobileOpenState) {
                            this.setState({ hideMobileNav: true });
                        } else this.setState({ hideMobileNav: false });
                    }.bind(this)}
                >

                    {!hideMobileNav ? <div className="navbarMobileInnerContainer">
                        <Mobile_Nav_Layout navbarMobileOpenState={navbarMobileOpenState} closeMobileNav={this.closeMobileNav} />
                        {/* <div className="mobileNavIcon"><AboutIcon showIcon={this.state.showIcon} /></div> */}
                        {/* <div className="mobileNavIcon"><PortfolioIcon showIcon={this.state.showIcon} /></div> */}
                        {/* <div className="mobileNavIcon"><ContactIcon showIcon={this.state.showIcon} /></div> */}

                        {/* <button onClick={function () { console.log("1") }}>1</button> */}
                        {/* <button onClick={function () { console.log("2") }}>2</button> */}
                        {/* <button onClick={function () { console.log("3") }}>3</button> */}
                    </div> : null}
                </div>


            </div>
        );
    }
}

export default NavbarMobile;