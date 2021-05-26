import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterO_Bottom extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterO_Bottom", {
                    "codeLetterO_Bottom_Animate": animate
                    , "codeLetterO_Bottom_Reveal": reveal
                    , "codeLetterO_Bottom_Opacity": keepOpacity
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
                    <path d="M107.37,110.73c-3.38,6.16-7.61,11.02-12.73,14.52c-6.33,4.33-13.5,6.5-21.5,6.5c-9.33,0-17.7-2.9-25.1-8.7
            c-7.4-5.8-13.2-13.83-17.4-24.1c-0.77-1.89-1.45-3.83-2.08-5.79c-0.66,2.51-1.38,5.01-2.17,7.52c0,0-4,0-7,1c-1-3,3-2,3-3
            c-1-8-9-8-10-16c-4,3-4,8,1,10c-9,0-4-9-8-13c-0.56,2.24-0.49,4.48-1.03,6.54c1.29,6.31,3.44,12.32,6.47,18.04
            c5.27,9.93,12.73,17.8,22.4,23.6c9.67,5.8,20.7,8.7,33.1,8.7c12.53,0,24.17-2.93,34.9-8.8c5.22-2.85,9.91-6.22,14.11-10.08
            C112.08,115.91,109.48,113.53,107.37,110.73z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterO_Bottom;