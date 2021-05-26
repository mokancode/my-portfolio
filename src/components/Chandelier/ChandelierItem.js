import React, { Component } from 'react'
// import styled, { keyframes, css } from 'styled-components';
import classnames from 'classnames';

export class ChandelierItem extends Component {
    constructor(props) {
        super(props)
        this.state = {};

        // refs
        this.chandelierItemWrapperRef = React.createRef();
        this.chandelierItemInnerRef = React.createRef();
        this.chandelierItemRef = React.createRef();
        this.energyDotRef = React.createRef();
    }

    componentDidMount() {
        const { index } = this.props;

        var pageHeight = window.innerHeight;

        var height = Math.abs(Math.sin(index) * pageHeight * this.generateRandomDecimalInterval(0.7, 0.2));
        if (height < 100) height = 100;

        var boost = height < 100 ? height * 2 : height * .1;
        const delay = index * this.generateRandomDecimalInterval(1, 0.1);

        this.chandelierItemRef.current.style.height = `${height}px`;
        this.chandelierItemRef.current.style.marginTop = `${boost}px`;
        this.chandelierItemRef.current.style.animationDelay = `${delay}s`;
        this.chandelierItemInnerRef.current.style.animationDelay = `${delay}s`;
        this.chandelierItemWrapperRef.current.style.animationDelay = `${delay}s`;

        // setTimeout(function () {
        //     this.setState({ chandelierItemInnerReveal: true }, function () {
        //     }.bind(this));
        //     // }.bind(this), (delay + 3000));
        // }.bind(this), (delay));

        this.setState({ height, delay, boost });
    }

    generateRandomDecimalInterval(max, min) {
        return Math.random() * (max - min) + min;
    }

    generateRandomInterval(max, min) {
        return Math.random() * (max - min + 1) + min;
    }

    componentDidUpdate() {
        const { boost, energyDotAnimationDelaySet, chandelierRendered } = this.state;
        const { index } = this.props;
        // if (!energyDotAnimationDelaySet && chandelierRendered) {
        //     this.setState({ energyDotAnimationDelaySet: true });
        //     var delayEnergyDot = this.generateRandomInterval(5, 0.1);
        //     // this.energyDotRef.current.style.animationDelay = `${delayEnergyDot}s`;
        //     this.setState({ delayEnergyDot });
        //     this.energyDotRef.current.style.transform = `translateY(${boost}px)`;
        //     // this.chandelierItemWrapperRef.current.style.animationDelay = `${delayEnergyDot}s`;
        // }
    }

    render() {

        const { boost, height, delay, delayEnergyDot, chandelierItemInnerReveal, glowAnim } = this.state;
        var ChanderlierLine, ChanderlierLineOuter;

        const { pageVisited } = this.props;

        return (
            <div className="chandelierItemWrapper" ref={this.chandelierItemWrapperRef}>
                {/* {ChanderlierLine ? */}
                <div className={classnames("chandelierItemInner", {
                    "chandelierItemInnerReveal": chandelierItemInnerReveal
                    , "chandelierItemInnerRevealVisited": pageVisited
                    // , "chandelierItemInnerHide": pageVisited === false
                    , "chandelierItemWrapperGlow": glowAnim
                })}
                    // onTransitionEnd={function () {
                    //     this.setState({ glowAnim: true });
                    // }.bind(this)}
                    ref={this.chandelierItemInnerRef}
                >
                    {/* <ChanderlierLine className="chandelierItem"></ChanderlierLine> */}
                    <div ref={this.chandelierItemRef} className="chandelierItem">
                        <div className="chandelierItemShadow"></div>
                        <div className="chandelierLineEnergyDotWrapper" style={{ animationDelay: `${delay}s` }}>
                            <span ref={this.energyDotRef} className="chandelierLineEnergyDot"></span>
                        </div>
                    </div>
                </div>
                {/* : null} */}
            </div>
        )
    }
}

export default ChandelierItem;