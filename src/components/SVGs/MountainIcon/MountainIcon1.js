import React, { Component } from 'react'
import classnames from 'classnames';
import './MountainIcon1.css';

export class MountainIcon1 extends Component {
    render() {
        return (
            <svg className="mountainIcon1SVG" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 864.28 841.89" style={{"enableBackground":"new 0 0 864.28 841.89"}} xmlSpace="preserve">
            
            <linearGradient
            id={`mountainIcon1Gradient`}
            gradientTransform="rotate(90)"
            >
            <stop
            offset="10%"
            // stopColor={color1} />
            stopColor="var(--color-stop-1)" />
            <stop
            offset="90%"
            // stopColor={color2} />
            stopColor="var(--color-stop-2)" />
            {/* <stop
            offset="300%"
            // stopColor={color3} />
            stopColor="var(--color-stop-3)" /> */}
            </linearGradient>
            
            <path className="mountainIconPath0" d="M0,717c44.14-88.17,148.55-205.96,297-334c98.78-85.2,208-195,251-170c95.21,55.36,225,266,322,511l27,137H-26
            L0,717z"/>
            </svg>
            )
        }
    }
    
    export default MountainIcon1;