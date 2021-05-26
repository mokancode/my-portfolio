import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterD_Left extends Component {
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
                className={classnames("codeShatterPieceWrapper codeLetterD_Left", {
                    "codeLetterD_Left_Animate": animate
                    , "codeLetterD_Left_Reveal": reveal
                    , "codeLetterD_Left_Opacity": keepOpacity
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
                    <path d="M28.7,98c2,2,0,6,0,9c5-1,6-4,6-7c0-5-1-10,2-15c2-4,2,1,5,3c-3,3-5,5-3,9c1.47-0.93,2.77-1.96,3.94-3.06V39.74
		C40.75,40,38.73,40,36.7,40c0,2-1,9-3,6c-2-1-4-4-5-7c-1,0-2,2-3,1c-1,3,4,5,2,6c-2.11,0.85-3.33,0.25-4.26-0.93v52.02
		C25.32,96.75,28,95.89,28.7,98z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterD_Left;