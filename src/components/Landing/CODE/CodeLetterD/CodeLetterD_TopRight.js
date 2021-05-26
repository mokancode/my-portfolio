import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterD_TopRight extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keepOpacity: false
        };
    }

    render() {

        const { animate, reveal } = this.props;
        const { keepOpacity } = this.state;

        return (
            <div
                className={classnames("codeShatterPieceWrapper codeLetterD_TopRight", {
                    "codeLetterD_TopRight_Animate": animate
                    , "codeLetterD_TopRight_Reveal": reveal
                    , "codeLetterD_TopRight_Opacity": keepOpacity
                })}
                onAnimationEnd={function () {
                    if (reveal) {
                        this.setState({ keepOpacity: true });
                    }
                }.bind(this)}
            >
                <svg viewBox="0 0 141.28 143.51">
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
                    <path d="M114.7,56c2,8,0,20,10,22c-3-4-7-10-1-14c0,4,2,6,6,7c0.6-4.76-0.58-10.24-0.36-15.57c-1.03-3.4-2.37-6.67-4.04-9.82
		c-3.89,0.76-7.37,1.46-8.6-1.61c-3-10-8-11-16-15c0,1,0,2,0,3c-0.59,1.18-1.87,1.31-3.23,1.23c2.85,3.79,5.28,8.1,7.27,12.95
		c0.65,1.58,1.22,3.2,1.75,4.84C110.26,51.3,113.58,52.08,114.7,56z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterD_TopRight;