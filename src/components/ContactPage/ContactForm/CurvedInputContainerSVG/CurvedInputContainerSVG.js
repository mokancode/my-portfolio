import React, { Component } from 'react';
import './CurvedInputContainerSVG.css';

class CurvedInputContainerSVG extends Component {
    render() {
        return (
            <div className="curvedInputContainerSVGWrapper">
                <svg className="curvedInputContainerSVG" x="0px" y="0px" viewBox="0 0 441 745" style={{ "enableBackground": "new 0 0 441 745" }}
                    preserveAspectRatio={"none"}
                >

                    <defs>
                        <filter id="curvedInputCOntainerPathInnerShadow" x0="-50%" y0="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="20" result="blur"></feGaussianBlur>
                            <feOffset dy="10" dx="30"></feOffset>
                            <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="0.9" result="shadowDiff"></feComposite>

                            <feFlood floodColor="var(--inset-shadow-color-1)" floodOpacity="1"></feFlood>
                            <feComposite in2="shadowDiff" operator="in"></feComposite>
                            <feComposite in2="SourceGraphic" operator="over" result="firstfilter"></feComposite>


                            {/* <feGaussianBlur in="firstfilter" stdDeviation="30" result="blur2"></feGaussianBlur>
            <feOffset dy="-30" dx="50"></feOffset>
            <feComposite in2="firstfilter" operator="arithmetic" k2="-1" k3="1" result="shadowDiff"></feComposite>
            
            <feFlood floodColor="var(--inset-shadow-color-2)" floodOpacity="0.75"></feFlood>
            <feComposite in2="shadowDiff" operator="in"></feComposite>
        <feComposite in2="firstfilter" operator="over"></feComposite> */}
                        </filter>
                    </defs>

                    <linearGradient
                        id={`curvedContainerGradient`}
                        gradientTransform="rotate(80)"
                    >
                        <stop
                            offset="10%"
                            stopColor="var(--color-stop-1)" />
                        <stop
                            offset="90%"
                            stopColor="var(--color-stop-2)" />
                    </linearGradient>
                    <path className="curvedInputContainerPath0" filter={`url(#curvedInputCOntainerPathInnerShadow)`}
                        d="M50.5,377.5c1.29-122.41,276-24,347-24c51.04,0,46.36-167.54,16-206c-15-19-326-16-326,2
                    c0,36.01,47.58,11.71,39,21c-85,92-75-62.53-75-64c-0.2-114,349,19,349-107l-369.08,1c0,22-7.75,154.92,0.08,188
                    c18,76,276-72,359,47c117.73,168.8-364-1-374,83c-20.56,141.67,142.6,140.7,264,128c86-9,141,1,122.12,159.78
                    c-8.95,75.29-106.48,77.63-87.12,103.22c45.26,59.81,84,36,98-35c11.16-56.61,45-213-4-254C360.55,379.55,49.5,472.5,50.5,377.5z"/>
                </svg >
            </div>
        );
    }
}

export default CurvedInputContainerSVG;