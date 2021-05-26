import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterC_TopLeft extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { animate, reveal } = this.props;
        const { keepOpacity } = this.state;

        return (
            <div className={classnames("codeShatterPieceWrapper codeLetterC_TopLeft", {
                "codeLetterC_TopLeft_Animate": animate
                , "codeLetterC_TopLeft_Reveal": reveal
                , "codeLetterC_TopLeft_Opacity": keepOpacity
            })}
                onAnimationEnd={function () {
                    if (reveal) {
                        this.setState({ keepOpacity: true });
                    }
                }.bind(this)}
            >
                <svg viewBox="0 0 130.72 135.76">
                    <linearGradient
                        // id="gradientHorizontal"
                        id={`codeShatterGradient`}
                        gradientTransform="rotate(90)"
                    >


                        <stop
                            offset="10%"
                            // stopColor={color1} />
                            stopColor="var(--color-stop-1)" />
                        <stop
                            offset="20%"
                            // stopColor={color2} />
                            stopColor="var(--color-stop-2)" />
                        <stop
                            offset="300%"
                            // stopColor={color3} />
                            stopColor="var(--color-stop-3)" />
                    </linearGradient>
                    <path d="M16.58,71.8c0,1,0,2-1,1c-2-6,6-7,10-6c-2-7-2-15-6-22c2,0,4,1,6,2c0-3-2-4-4-5c2,0,5,0,7,0
		c-4.6-3.07-7.44-7.31-10.32-11.38c-1.02,1.31-2.01,2.66-2.94,4.06c-6.53,9.87-9.8,21.07-9.8,33.6c0,2.83,0.17,5.59,0.48,8.28
		c3.58,0.8,7.29,1.48,10.58,3.45C15.58,76.8,17.58,74.8,16.58,71.8z"/>
                </svg>
            </ div >
        );
    }
}

export default CodeLetterC_TopLeft;