import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterD_Bottom extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterD_Bottom", {
                    "codeLetterD_Bottom_Animate": animate
                    , "codeLetterD_Bottom_Reveal": reveal
                    , "codeLetterD_Bottom_Opacity": keepOpacity
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
                    <path d="M129.34,55.43c-0.22,5.34,0.96,10.81,0.36,15.57c-4-1-6-3-6-7c-6,4-2,10,1,14c-10-2-8-14-10-22
		c-1.12-3.93-4.44-4.71-8.21-4.99c2.62,8,3.95,16.75,3.95,26.26c0,12-2,22.3-6,30.9c-4,8.6-9.57,15.1-16.7,19.5
		c-7.13,4.4-15.3,6.6-24.5,6.6c-8.13,0-13.6-1.17-16.4-3.5c-2.8-2.33-4.2-6.23-4.2-11.7V93.95c-1.17,1.1-2.47,2.13-3.94,3.06
		c-2-4,0-6,3-9c-3-2-3-7-5-3c-3,5-2,10-2,15c0,3-1,6-6,7c0-3,2-7,0-9c-0.7-2.11-3.38-1.25-5.26-0.91v24.18c0,4-0.4,6.97-1.2,8.9
		c-0.8,1.93-2.23,3.23-4.3,3.9c-2.07,0.67-5.37,1-9.9,1c-0.27,0-0.4,0.4-0.4,1.2s0.13,1.2,0.4,1.2c4.53,0,8.07-0.07,10.6-0.2
		l14.2-0.2c3.87,0,7.33,0.07,10.4,0.2c3.07,0.13,5.6,0.27,7.6,0.4c5.47,0.4,10.27,0.6,14.4,0.6c6.87,0,13.42-0.87,19.65-2.6
		c0.8-2.46,3.94-1.94,4.81-3.68c0-2-6,4-4-1c0-2,16-1,10-8c2,0,4,2,6,1c6-5,2-17,11-15c2,0,1,4,1,6c-1-1-2-1-3,0
		c-1.58,2.37-1.44,5.06-0.94,7.62c5.1-4.33,9.48-9.47,13.08-15.45c6-9.93,9-21.37,9-34.3C131.84,66.74,131,60.92,129.34,55.43z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterD_Bottom;