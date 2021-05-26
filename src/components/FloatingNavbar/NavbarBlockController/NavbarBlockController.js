import React, { Component } from 'react';
import './NavbarBlockController.scss';
import classnames from 'classnames';
import NavbarBlockBtn from './NavbarBlockBtn';

class NavbarBlockController extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleOn: false
        };

        this.returnNavbar = this.props.returnNavbar;

        this.controllerRef = React.createRef();
    }

    componentDidUpdate() {
        const { navbarBlockControllerVerticalPosition } = this.props;
        const { navbarBlockControllerVerticalPositionState } = this.state;
        if (navbarBlockControllerVerticalPosition !== navbarBlockControllerVerticalPositionState) {
            this.setState({ navbarBlockControllerVerticalPositionState: navbarBlockControllerVerticalPosition });
            this.controllerRef.current.style.transform = `translateY(${navbarBlockControllerVerticalPosition}px)`;
            // console.log("setting position");
        }
    }

    render() {

        const { navbarIsShowingInPosition } = this.props;
        const { toggleOn } = this.state;

        return (
            <div className={classnames("navbarBlockController", {
                "toggledOn": toggleOn
            })} ref={this.controllerRef}>
                {/* <button className="toggleBtn" onClick={function (e) {
                    this.setState(function (prevState) {
                        return {
                            toggleOn: !prevState.toggleOn
                        }
                    }.bind(this))
                }.bind(this)}>{toggleOn ? "off" : "on"}</button> */}
                <div className={classnames("navbarBlockControllerInnerWrapper", {
                    "hover": navbarIsShowingInPosition
                })}>
                    <div className="navbarSides">
                        <div className="navbarSide front">
                            <NavbarBlockBtn index={1} navbarIsShowingInPosition={navbarIsShowingInPosition} link="" returnNavbar={this.returnNavbar} />
                            <NavbarBlockBtn index={2} navbarIsShowingInPosition={navbarIsShowingInPosition} link="portfolio" returnNavbar={this.returnNavbar} />
                            <NavbarBlockBtn index={3} navbarIsShowingInPosition={navbarIsShowingInPosition} link="contact" returnNavbar={this.returnNavbar} />
                        </div>

                        <div className="navbarSide left"></div>
                        <div className="navbarSide bottom"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NavbarBlockController;;