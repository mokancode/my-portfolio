import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterC_BottomRight extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { animate, reveal } = this.props;
        const { keepOpacity } = this.state;

        return (
            <div className={classnames("codeShatterPieceWrapper codeLetterC_BottomRight", {
                "codeLetterC_BottomRight_Animate": animate
                , "codeLetterC_BottomRight_Reveal": reveal
                , "codeLetterC_BottomRight_Opacity": keepOpacity
            })}
                onAnimationEnd={function () {
                    if (reveal) {
                        this.setState({ keepOpacity: true });
                    }
                }.bind(this)}
            >
                <svg viewBox="0 0 130.72 135.76">
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
                    <path className="codeShatterPath" d="M119.63,123.88c0.33-0.4,0.57-1.4,0.7-3l0.8-7.43c-1.53-0.9-3.55-1.52-3.55-3.65c-2,1,0,3-1,4c-5,1-8,5-7,9c-2,0-2-2-2-3
		c-4,5-7,8-14,10c0,0,0,0.91,0.17,1.89c8.22-1.14,16.15-3.28,23.78-6.41C118.59,124.75,119.29,124.28,119.63,123.88z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterC_BottomRight;