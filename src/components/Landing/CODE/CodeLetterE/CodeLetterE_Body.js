import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterE_Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keepOpacity: false
        };

        this.notifyRevealEnded = this.props.notifyRevealEnded;
    }

    render() {

        const { animate, reveal } = this.props;
        const { keepOpacity } = this.state;

        return (
            <div
                className={classnames("codeShatterPieceWrapper codeLetterE_Body", {
                    "codeLetterE_Body_Animate": animate
                    , "codeLetterE_Body_Reveal": reveal
                    , "codeLetterE_Body_Opacity": keepOpacity
                })}
                onAnimationEnd={function () {
                    if (reveal) {
                        this.setState({ keepOpacity: true });
                        this.notifyRevealEnded();
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
                    <path d="M116.34,102.95c-0.33-0.2-0.7-0.3-1.1-0.3c-0.53,0-0.8,0.13-0.8,0.4c-4.8,17.33-16.13,26-34,26h-9.8
		c-4.27,0-7.23-0.87-8.9-2.6c-1.67-1.73-2.5-4.8-2.5-9.2v-45.4h19c6.59,0,11.72,1.12,15.4,3.35c0.63-0.69,1.61-0.88,3.06,0.57
		c2-3-4-3-3-6c2,1,2-2,4-2c0-1-1-2-2-2c-2,4-3,2-6,1c-1,4-5,3-7,3c-1.24-0.62-1.33-2-1.21-3.21c-0.98,0.05-1.99,0.08-3.05,0.08
		h-19.2v-40.8c0-4.13,1-7.07,3-8.8c2-1.73,5.4-2.6,10.2-2.6h8c15.33,0,24.6,7.6,27.8,22.8c0.13,0.4,0.57,0.53,1.3,0.4
		c0.73-0.13,1.1-0.33,1.1-0.6l-0.26-17.03c-0.67,1.35-1.55,2.62-2.68,3.75c-1,0-3,1-3,0c3-5,2-13-5-12c2,3,0,5-2,7c-1-2-1-5-1-7
		c-1-1-3,3-4,2c-1.21-1.21-2.06-2.8-2.76-4.52h-64.9c-0.4,0-0.6,0.4-0.6,1.2c0,0.8,0.2,1.2,0.6,1.2c4.4,0,7.67,0.37,9.8,1.1
		c2.13,0.73,3.57,2.03,4.3,3.9c0.73,1.87,1.1,4.8,1.1,8.8v14.38c5.81,3.06,10.04,8.3,15.46,12.94c-1,0-1,0-2,0c1,6,2,12,4,18
		c-2,0-3,1-4,2c-1,6,3,11,4,16c-1,0-2,0-3,0c0-1,0-2,0-3c-5,4-6,11-4,17c-4-2-7-6-6-11c0,0,2,2,3,1c1-2,2-5,1-7c-8-8-7-17-2-25
		c0-1,2,3,4,3c0-2,1-6-1-6c-3.35-0.96-6.46-1.92-9.46-2.98v63.26c0,4-0.37,6.97-1.1,8.9c-0.73,1.93-2.13,3.23-4.2,3.9
		c-2.07,0.67-5.37,1-9.9,1c-0.4,0-0.6,0.4-0.6,1.2s0.2,1.2,0.6,1.2h60.49c0.04-0.16,0.1-0.32,0.17-0.48c0.95-1.9,5.49-1.1,5.1-4.43
		c-0.06-0.17-0.1-0.36-0.1-0.57c0.05,0.2,0.08,0.39,0.1,0.57c0.5,1.45,2.8,1.64,1.9,3.43c7-3,13-7,18-12c0,4-5,6-4,10
		c2.29-3.06,5.18-4.36,8.19-3.46c0.17-7.34,0.82-15.29,1.95-23.87C116.84,103.32,116.67,103.15,116.34,102.95z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterE_Body;