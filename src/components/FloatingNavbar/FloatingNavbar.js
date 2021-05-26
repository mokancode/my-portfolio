import React, { Component } from 'react';
import './FloatingNavbar.css';
import classnames from 'classnames';
import NavbarBlockController from './NavbarBlockController/NavbarBlockController';
import NavBlockRemotePullBtn from './NavBlockRemotePullBtn/NavBlockRemotePullBtn';

class FloatingNavbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.pullNavbarFunc = this.pullNavbarFunc.bind(this);
        this.returnNavBlockRemotePullBtn = this.returnNavBlockRemotePullBtn.bind(this);
        this.notifyInitiatePullNav = this.notifyInitiatePullNav.bind(this);
        this.returnNavbar = this.returnNavbar.bind(this);

        // refs
        this.contentRef = React.createRef();
        this.nabarBlockControllerRef = React.createRef();
        this.floatingNavbarContentRef = React.createRef();
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({ pullOutBtn: true })
        }.bind(this), 10);
    }

    pullNavbarFunc() {
        // console.log("pullNavbar");
        this.setState({ pullNavbar: true });
    }

    returnNavBlockRemotePullBtn(positionY) {
        // console.log("positionY", positionY);
        this.setState({ navbarBlockControllerVerticalPosition: positionY });
    }

    notifyInitiatePullNav(status) {
        if (status) this.setState({ initiatePullNav: true })
        else this.setState({ initiatePullNav: false })

    }

    returnNavbar() {
        if (this.state.navbarIsShowingInPosition) this.setState({ pullNavbar: false, navbarBlockControllerVerticalPosition: null })
    }

    render() {

        const { pullNavbar, navbarIsShowingInPosition, cursorOnContent, pullIndicatorIconShow, getInPosition, pullOutBtn,
            navbarBlockControllerVerticalPosition, initiatePullNav } = this.state;

        return (
            <div className={classnames("floatingNavbar", {
                "floatingNavbarPulled": pullNavbar
            })}
            >
                {/* {pullNavbar ? */}
                <div className={classnames("floatingNavbarContent", {
                    "floatingNavbarContentPulled": pullNavbar && navbarBlockControllerVerticalPosition
                })}
                    onMouseLeave={function (e) {
                        if (pullNavbar) this.setState({ pullNavbar: false, navbarBlockControllerVerticalPosition: null })
                    }.bind(this)}

                    onTransitionEnd={function (e) {
                        if (pullNavbar && navbarBlockControllerVerticalPosition) { this.setState({ navbarIsShowingInPosition: true }) }
                        else if (navbarIsShowingInPosition && this.floatingNavbarContentRef.current === e.target) this.setState({ navbarIsShowingInPosition: false })
                    }.bind(this)}
                    ref={this.floatingNavbarContentRef}
                >
                    <NavbarBlockController
                        refProp={this.nabarBlockControllerRef}
                        navbarBlockControllerVerticalPosition={navbarBlockControllerVerticalPosition}
                        navbarIsShowingInPosition={navbarIsShowingInPosition}
                        returnNavbar={this.returnNavbar}
                    />
                </div>
                {/* : null
                } */}

                <div className="animArea"
                    onMouseMove={function (e) {
                        if (!pullNavbar && !initiatePullNav
                            // && !navbarBlockControllerVerticalPosition
                        ) {
                            this.contentRef.current.style.transform = `translateX(0%) translateY(${e.clientY - 75}px)`;
                        }
                        // console.log("y: ", e.clientY);
                    }.bind(this)}
                >
                    <NavBlockRemotePullBtn
                        getInPosition={this.state.getInPosition}
                        pullOutBtn={pullOutBtn}
                        refProp={this.contentRef}
                        pullNavbarFunc={this.pullNavbarFunc}
                        pullNavbar={pullNavbar}
                        returnNavBlockRemotePullBtn={this.returnNavBlockRemotePullBtn}
                        notifyInitiatePullNav={this.notifyInitiatePullNav}
                    />
                    {/* <button onClick={() => {
                        this.setState((prevState) => {
                            return {
                                getInPosition: !prevState.getInPosition
                            }
                        })
                    }}>{this.state.getInPosition ? "In" : "Not"}</button> */}

                </div>
                <button className={classnames("clickOutsideArea", {
                    "activate": pullNavbar
                })} onClick={function (e) {
                    if (this.state.navbarIsShowingInPosition) this.setState({ pullNavbar: false, navbarBlockControllerVerticalPosition: null })
                }.bind(this)}></button>
            </div >
        );
    }
}

export default FloatingNavbar;