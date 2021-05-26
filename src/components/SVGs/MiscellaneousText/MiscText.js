import React, { Component } from 'react'
import classnames from 'classnames';

export class WorksText extends Component {
    constructor(props) {
        super(props);

        this.miscTextFinishedFunc = this.props.miscTextFinishedFunc;
    }

    render() {

        const { expand, index } = this.props;

        return (
            <div className="miscTextWrapper">
                <svg className={classnames("miscTextSVG", {
                    "animateMiscText": expand
                })} x="0px" y="0px" viewBox="0 0 331 109" style={{ "enableBackground": "new 0 0 331 109" }}
                    // onTransitionEnd={function () { if (index === 0) this.miscTextFinishedFunc(); }.bind(this)}
                    preserveAspectRatio="none"
                >
                    <g>
                        <path className="miscTextPath0" d="M101.54,5.38v99.98H73.56V35.78l-19.48,69.58H37.89l-20-68.41v68.41H8.16V5.38H37.6l17.14,60.35L71.8,5.38
		H101.54z"/>
                        <path className="miscTextPath0" d="M147.9,5.38v99.98h-29V5.38H147.9z" />
                        <path className="miscTextPath0" d="M230.59,33.36l-13.48,2.49c0.59-2.68,0.88-4.93,0.88-6.74c0-11.62-7.06-17.43-21.17-17.43
		c-11.13,0-16.7,4-16.7,12.01c0,6.01,6.23,11.16,18.68,15.45c24.02,8.25,36.04,20.46,36.04,36.62c0,9.47-3.37,17.08-10.11,22.81
		c-6.74,5.74-15.7,8.61-26.88,8.61c-24.76,0-37.13-9.59-37.13-28.78c0-1.56,0.12-3.49,0.37-5.79l13.99-3.08
		c-1.07,4.25-1.61,7.94-1.61,11.06c0,12.4,7.1,18.6,21.31,18.6c11.38,0,17.07-4.47,17.07-13.4c0-6.64-6.81-12.48-20.43-17.5
		c-19.68-7.23-29.52-18.77-29.52-34.64c0-8.98,3.28-16.22,9.85-21.72c6.57-5.49,15.2-8.24,25.89-8.24
		C219.61,3.7,230.59,13.58,230.59,33.36z"/>
                        <path className="miscTextPath0" d="M313.8,65.22l12.38,3.22c0.19,2.54,0.29,4.74,0.29,6.59c0,9.72-3.52,17.48-10.55,23.29
		c-7.03,5.81-16.46,8.72-28.27,8.72c-29.64,0-44.46-16.67-44.46-50.02c0-15.82,4.32-28.65,12.96-38.49
		c8.64-9.84,19.9-14.76,33.76-14.76c21.63,0,32.45,10.4,32.45,31.2l-12.45,5.71c0.15-2.93,0.22-5.2,0.22-6.81
		c0-14.75-5.91-22.12-17.72-22.12c-12.5,0-18.75,15.65-18.75,46.95c0,26.91,6.98,40.36,20.95,40.36c5.76,0,10.56-2.29,14.39-6.88
		c3.83-4.59,5.75-10.33,5.75-17.21C314.75,72.76,314.43,69.52,313.8,65.22z"/>
                    </g>
                </svg>
            </div>
        )
    }
}

export default WorksText;