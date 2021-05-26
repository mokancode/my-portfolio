import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterD_BottomRight extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterD_BottomRight", {
                    "codeLetterD_BottomRight_Animate": animate
                    , "codeLetterD_BottomRight_Reveal": reveal
                    , "codeLetterD_BottomRight_Opacity": keepOpacity
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
                    <path d="M110.7,115c1-1,2-1,3,0c0-2,1-6-1-6c-9-2-5,10-11,15c-2,1-4-1-6-1c6,7-10,6-10,8c-2,5,4-1,4,1
		c-0.87,1.74-4.01,1.21-4.81,3.68c4.77-1.33,9.36-3.16,13.75-5.5c4.04-2.15,7.73-4.68,11.11-7.55
		C109.26,120.06,109.12,117.37,110.7,115z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterD_BottomRight;