import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterE_Right extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterE_Right", {
                    "codeLetterE_Right_Animate": animate
                    , "codeLetterE_Right_Reveal": reveal
                    , "codeLetterE_Right_Opacity": keepOpacity
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
                    <path d="M82.69,69.78c2,0,6,1,7-3c3,1,4,3,6-1c1,0,2,1,2,2c-2,0-2,3-4,2c-1,3,5,3,3,6c-1.45-1.45-2.43-1.26-3.06-0.57
		c4.66,2.83,7,7.44,7,13.85c0,0.27,0.4,0.4,1.2,0.4s1.2-0.13,1.2-0.4c0-2.67-0.13-6.13-0.4-10.4l-0.2-9.4l0.2-17.4
		c0-0.4-0.37-0.6-1.1-0.6c-0.73,0-1.1,0.2-1.1,0.6c0,9.16-6.33,14.06-18.95,14.72C81.37,67.77,81.45,69.16,82.69,69.78z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterE_Right;