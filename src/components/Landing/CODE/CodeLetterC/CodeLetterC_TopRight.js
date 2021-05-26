import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterC_TopRight extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const { animate, reveal } = this.props;
        const { keepOpacity } = this.state;

        return (
            <div className={classnames("codeShatterPieceWrapper codeLetterC_TopRight", {
                "codeLetterC_TopRight_Animate": animate
                , "codeLetterC_TopRight_Reveal": reveal
                , "codeLetterC_TopRight_Opacity": keepOpacity
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
                    <path className="codeShatterPath" d="M117.93,10.78c-0.27-0.47-0.93-0.97-2-1.5c-6.06-2.76-13.41-4.6-22.03-5.51c0.65,1.2,1.69,2.27,1.69,4.04c0-2,1,0,2-1
		c1,3,2,8,7,5c-1-1-3,1-2-1c2-1,5-2,7,0c1,4-2,9,2,11c2,0,0-2,1-3c2.05,2.05,4.55,3.14,6.89,3.32l-0.75-8.25
		C118.46,12.28,118.19,11.25,117.93,10.78z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterC_TopRight;