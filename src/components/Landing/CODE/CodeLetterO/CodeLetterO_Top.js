import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterO_Top extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterO_Top", {
                    "codeLetterO_Top_Animate": animate
                    , "codeLetterO_Top_Reveal": reveal
                    , "codeLetterO_Top_Opacity": keepOpacity
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
                    <path d="M136.54,70.35c0-10.93-2.57-21.27-7.7-31c-5.13-9.73-12.5-17.57-22.1-23.5c-9.6-5.93-20.73-8.9-33.4-8.9
            c-11.33,0-22.43,2.47-33.3,7.4c-10.87,4.93-19.77,12.3-26.7,22.1c-3.61,5.1-6.27,10.75-8,16.92c2.15,0.72,5.1,3.83,8.06,5.31
            c-1-5,1-8,5-10c0,3,1,7,2,10c0.55-4.42,2.33-6.09,4.81-7.21c1.45-10.3,4.72-18.78,9.83-25.42c7.13-9.27,17.17-13.9,30.1-13.9
            c10.13,0,18.97,2.73,26.5,8.2c5.56,4.04,10.17,9.24,13.84,15.6c0.83-0.85,1.48-1.96,1.92-3.28c-4,0-2-6-6-6c2,0,5,0,7,1
            c5,4,2,10,4,13c4,4,12-2,15,6c0,1,1,5-2,4c-1-1-2-5-4-2c-1,2,0,5,1,5c12,3,13,8,11,18c0-5-5-5-8-7c4.85,9.7,1.25,19.41,2.85,29.11
            c0.14,0.12,0.15,0.37,0.15,0.89c-0.06-0.3-0.1-0.59-0.15-0.89c-0.13-0.11-0.38-0.11-0.85-0.11c-1,1-1,2-1,4c-2-3-5-4-6-8
            c-6,5-1,13,0,19c0,1.36-0.23,2.94-0.58,4.45c2.6-2.9,4.99-6,7.12-9.37C133.34,93.62,136.54,82.49,136.54,70.35z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterO_Top;