import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterE_Left extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterE_Left", {
                    "codeLetterE_Left_Animate": animate
                    , "codeLetterE_Left_Reveal": reveal
                    , "codeLetterE_Left_Opacity": keepOpacity
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
                    <path d="M50.7,63.78c-2,0-4-4-4-3c-5,8-6,17,2,25c1,2,0,5-1,7c-1,1-3-1-3-1c-1,5,2,9,6,11c-2-6-1-13,4-17c0,1,0,2,0,3c1,0,2,0,3,0
		c-1-5-5-10-4-16c1-1,2-2,4-2c-2-6-3-12-4-18c1,0,1,0,2,0c-5.42-4.65-9.65-9.88-15.46-12.94V54.8c3,1.07,6.11,2.02,9.46,2.98
		C51.7,57.78,50.7,61.78,50.7,63.78z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterE_Left;