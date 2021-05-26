import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterD_Top extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterD_Top", {
                    "codeLetterD_Top_Animate": animate
                    , "codeLetterD_Top_Reveal": reveal
                    , "codeLetterD_Top_Opacity": keepOpacity
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
                    <path d="M100.7,32c0-1,0-2,0-3c8,4,13,5,16,15c1.23,3.06,4.71,2.37,8.6,1.61c-0.67-1.26-1.38-2.51-2.16-3.73
		c-5.8-9.2-13.97-16.47-24.5-21.8c-10.54-5.33-22.6-8-36.2-8c-2.27,0-6.73,0.13-13.4,0.4c-5.47,0.4-10.87,0.6-16.2,0.6
		c-3.47,0-8.13-0.13-14-0.4l-10.6-0.2c-0.27,0-0.4,0.4-0.4,1.2c0,0.8,0.13,1.2,0.4,1.2c4.4,0,7.67,0.37,9.8,1.1
		c2.13,0.73,3.57,2.03,4.3,3.9c0.73,1.87,1.1,4.8,1.1,8.8v16.4c0.93,1.18,2.15,1.77,4.26,0.93c2-1-3-3-2-6c1,1,2-1,3-1c1,3,3,6,5,7
		c2,3,3-4,3-6c2.02,0,4.05,0,5.94-0.26V29.08c0-3.73,0.7-6.5,2.1-8.3c1.4-1.8,3.63-3.03,6.7-3.7c3.07-0.67,7.4-1,13-1
		c9.2,0,17.27,2.7,24.2,8.1c3.3,2.57,6.24,5.6,8.83,9.05C98.83,33.31,100.11,33.18,100.7,32z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterD_Top;