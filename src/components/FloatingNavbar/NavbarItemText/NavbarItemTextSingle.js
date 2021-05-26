import React, { Component } from 'react'
import classnames from 'classnames';

export class NavbarItemTextSingle extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // refs
        this.wrapperRef = React.createRef();
        this.letterRef = React.createRef();
    }

    componentDidMount() {
        const { itemIndex, wordIndex } = this.props;

        // const delay = itemIndex * 0.1 + wordIndex / 15;
        const delay = itemIndex * 0.1;
        this.wrapperRef.current.style.animationDelay = `${delay}s`
        this.letterRef.current.style.animationDelay = `${delay + .5}s`;

        // this.setState({ navbarItemTextSingleDivShow: true });
    }

    render() {

        const { letter, wordIndex, itemIndex, animateHue } = this.props;

        return (
            <div className={classnames("navbarItemTextSingleWrapper", {
                "navbarItemTextSingleDivShow": animateHue
                //  this.state.navbarItemTextSingleDivShow 
            })}
                ref={this.wrapperRef}
            >
                <p className={classnames("navbarItemTextSingle", {
                    "navbarItemTextSingleAnimateHue": animateHue
                })} ref={this.letterRef}
                // onAnimationEnd={function () {
                //     // console.log("animation ended");
                //     var newDelay = itemIndex * 0.1;
                //     this.letterRef.current.style.transitionDelay = `${newDelay}s`;
                // }.bind(this)}
                >{letter}</p>
            </div>
        )
    }
}

export default NavbarItemTextSingle;