import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterE_BottomRight extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterE_BottomRight", {
                    "codeLetterE_BottomRight_Animate": animate
                    , "codeLetterE_BottomRight_Reveal": reveal
                    , "codeLetterE_BottomRight_Opacity": keepOpacity
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
                    <path d="M106.7,130.78c-1-4,4-6,4-10c-5,5-11,9-18,12c0.89-1.79-1.41-1.98-1.9-3.43c0.39,3.33-4.15,2.54-5.1,4.43
		c-0.08,0.15-0.13,0.31-0.17,0.48h26.31c1.2,0,2-0.23,2.4-0.7c0.4-0.47,0.6-1.23,0.6-2.3c0-1.29,0.02-2.6,0.05-3.93
		C111.88,126.42,109,127.72,106.7,130.78z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterE_BottomRight;