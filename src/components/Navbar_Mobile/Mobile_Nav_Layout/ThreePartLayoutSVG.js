import React, { Component } from 'react';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class ThreePartLayoutSVG extends Component {
    constructor(props) {
        super(props);

        this.hideFlareFunc = this.props.hideFlareFunc;
        this.closeMobileNav = this.props.closeMobileNav;
    }

    render() {

        const { drawLines } = this.props;
        const { currentPage } = this.props.navbar;

        return (
            <svg className={classnames("threePartLayoutSVG", {
                "drawLinesThreePartLayoutSVG": drawLines
            })} viewBox="0 0 500 700"
                style={{ "enableBackground": "new 0 0 500 700" }}
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient
                        id={`strokeGradient`}
                        gradientTransform="rotate(90)"
                    >
                        <stop
                            offset="0%"
                            // stopColor={color1} />
                            stopColor="var(--color-stop-1)" />
                        <stop
                            offset="100%"
                            // stopColor={color2} />
                            stopColor="var(--color-stop-2)" />
                        {/* <stop
                                offset="300%"
                                // stopColor={color3} />
                            stopColor="var(--color-stop-3)" /> */}
                    </linearGradient >
                </defs >
                <g id="bottom">
                    <Link to="/contact" onClick={function (e) {
                        if (currentPage === "contact") { e.preventDefault(); return; }
                        this.closeMobileNav();
                    }.bind(this)}>
                        <path className="threePartLayoutPath0" d="M500,350c-23.18,5.43-133.51,36.8-240.83,173.35C140,674.97,33.98,697.4,0,700h500V350z" />
                    </Link>
                </g>
                <g id="center">
                    <Link to="/portfolio" onClick={function (e) {
                        if (currentPage === "portfolio") { e.preventDefault(); return; }
                        this.closeMobileNav();
                    }.bind(this)}>
                        <path className="threePartLayoutPath1" d="M499.5,0l0.5,350c-23.18,5.43-133.51,36.8-240.83,173.35C140,674.97,33.98,697.4,0,700l0-350
    c33.98-2.6,140-25.03,259.17-176.65C366.49,36.8,476.32,5.43,499.5,0"/>
                    </Link>
                </g>
                <g id="top">
                    <Link to="/" onClick={function (e) {
                        if (currentPage === "landing") { e.preventDefault(); return; }
                        this.closeMobileNav();
                    }.bind(this)}>
                        <path className="threePartLayoutPath2" d="M0,0v350c33.98-2.6,140-25.03,259.17-176.65C366.49,36.8,476.82,5.43,500,0H0z" />
                    </Link>
                </g>
                <g id="splitter">
                    <path className="splitterPathLower" d="M500,350c-23.18,5.43-133.51,36.8-240.83,173.35C140,674.97,33.98,697.4,0,700"
                        onTransitionEnd={function () {
                            if (drawLines === true) this.hideFlareFunc();
                        }.bind(this)}
                    />
                    <path className="splitterPathUpper" d="M500,1.15c-23.18,5.43-133.51,36.8-240.83,173.35C140,326.13,33.98,348.55,0,351.15" />
                </g>
            </svg>

        );
    }
}

const mapStateToProps = function (state) {
    return {
        styles: state.styles,
        navbar: state.navbar
    }
}

export default connect(mapStateToProps, {})(ThreePartLayoutSVG);
// export default ThreePartLayoutSVG;