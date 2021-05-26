import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterO_RightInner extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterO_RightInner", {
                    "codeLetterO_RightInner_Animate": animate
                    , "codeLetterO_RightInner_Reveal": reveal
                    , "codeLetterO_RightInner_Opacity": keepOpacity
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
                    <path d="M120.4,89.68c1,4,4,5,6,8c0-2,0-3,1-4c0.48,0,0.72,0,0.85,0.11c-1.61-9.7,2-19.41-2.85-29.11c3,2,8,2,8,7c2-10,1-15-11-18
            c-1,0-2-3-1-5c2-3,3,1,4,2c3,1,2-3,2-4c-3-8-11-2-15-6c-2-3,1-9-4-13c-2-1-5-1-7-1c4,0,2,6,6,6c-0.44,1.32-1.09,2.43-1.92,3.28
            c1.3,2.26,2.49,4.65,3.56,7.2c4.07,9.73,6.1,20.73,6.1,33c0,11.6-1.83,21.6-5.5,30c-0.7,1.61-1.47,3.12-2.27,4.58
            c2.11,2.8,4.71,5.17,7.98,6.94c1.57-1.44,3.05-2.97,4.47-4.55c0.34-1.5,0.58-3.09,0.58-4.45C119.4,102.68,114.4,94.68,120.4,89.68z
            "/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterO_RightInner;