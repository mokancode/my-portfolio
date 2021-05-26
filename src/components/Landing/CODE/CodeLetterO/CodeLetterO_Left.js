import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterO_Left extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterO_Left", {
                    "codeLetterO_Left_Animate": animate
                    , "codeLetterO_Left_Reveal": reveal
                    , "codeLetterO_Left_Opacity": keepOpacity
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
                    <path d="M13.4,92.68c-5-2-5-7-1-10c1,8,9,8,10,16c0,1-4,0-3,3c3-1,7-1,7-1c0.78-2.51,1.51-5.01,2.17-7.52
            c-2.8-8.74-4.22-18.27-4.22-28.61c0-4.65,0.3-9,0.87-13.08c-2.49,1.12-4.26,2.79-4.81,7.21c-1-3-2-7-2-10c-4,2-6,5-5,10
            c-2.96-1.48-5.91-4.59-8.06-5.31c-1.59,5.68-2.4,11.8-2.4,18.38c0,4.98,0.48,9.8,1.43,14.46c0.53-2.06,0.47-4.3,1.03-6.54
            C9.4,83.68,4.4,92.68,13.4,92.68z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterO_Left;