import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterE_TopRight extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterE_TopRight", {
                    "codeLetterE_TopRight_Animate": animate
                    , "codeLetterE_TopRight_Reveal": reveal
                    , "codeLetterE_TopRight_Opacity": keepOpacity
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
                    <path d="M96.7,11.78c0,2,0,5,1,7c2-2,4-4,2-7c7-1,8,7,5,12c0,1,2,0,3,0c1.13-1.13,2.01-2.4,2.68-3.75l-0.14-8.97
		c0-1.2-0.67-1.8-2-1.8h-18.3c0.7,1.73,1.54,3.31,2.76,4.52C93.7,14.78,95.7,10.78,96.7,11.78z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterE_TopRight;