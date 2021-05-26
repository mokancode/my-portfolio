import React, { Component } from 'react';
import classnames from 'classnames';

class CodeLetterCBody extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keepOpacity: false
        };
    }

    render() {

        const { reveal } = this.props;
        const { keepOpacity } = this.state;

        return (
            <div className={classnames("codeShatterPieceWrapper codeLetterC_Body", {
                "codeLetterC_Body_Reveal": reveal
                , "codeLetterC_Body_Opacity": keepOpacity
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

                    <path className="codeShatterPath" d="M107.58,119.8c0,1,0,3,2,3c-1-4,2-8,7-9c1-1-1-3,1-4c0,2.13,2.02,2.75,3.55,3.65l1.8-16.57c0-0.27-0.33-0.46-1-0.6
		c-0.67-0.13-1.07,0-1.2,0.4c-4.93,11.2-10.63,19.37-17.1,24.5c-6.47,5.13-14.57,7.7-24.3,7.7c-9.87,0-18.73-2.6-26.6-7.8
		c-7.87-5.2-14.07-12.5-18.6-21.9c-4.53-9.4-6.8-20.1-6.8-32.1c0-12.13,2.13-22.77,6.4-31.9c4.27-9.13,10.23-16.13,17.9-21
		c7.67-4.87,16.37-7.3,26.1-7.3c10.13,0,18.63,2.87,25.5,8.6c6.87,5.73,12.03,14.07,15.5,25c0.27,0.53,0.73,0.73,1.4,0.6
		c0.67-0.13,1-0.4,1-0.8l-1.65-18.15c-2.34-0.19-4.85-1.28-6.89-3.32c-1,1,1,3-1,3c-4-2-1-7-2-11c-2-2-5-1-7,0c-1,2,1,0,2,1
		c-5,3-6-2-7-5c-1,1-2-1-2,1c0-1.77-1.04-2.84-1.69-4.04c-4.28-0.45-8.86-0.69-13.77-0.69c-14,0-26.67,2.77-38,8.3
		c-9.73,4.75-17.67,11.1-23.86,19.04c2.88,4.07,5.72,8.31,10.32,11.38c-2,0-5,0-7,0c2,1,4,2,4,5c-2-1-4-2-6-2c4,7,4,15,6,22
		c-4-1-12,0-10,6c1,1,1,0,1-1c1,3-1,5,0,8c-3.28-1.97-7-2.65-10.58-3.45c1.09,9.34,4.05,17.81,8.92,25.42
		c6.27,9.8,15,17.4,26.2,22.8c11.2,5.4,23.93,8.1,38.2,8.1c4.91,0,9.71-0.33,14.42-0.99c-0.17-0.98-0.17-1.89-0.17-1.89
		C100.58,127.8,103.58,124.8,107.58,119.8z"/>
                </svg>
            </div>
        );
    }
}

export default CodeLetterCBody;