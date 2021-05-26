import React, { Component } from 'react'
import classnames from 'classnames';

export class WorksText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hideGlow: true
        };

        this.finishedMyWorksTextAnim = this.props.finishedMyWorksTextAnim;
    }

    render() {

        const { index, expand, withinRange, readyToLoad, shutdown, hideGlow } = this.props;

        return (
            <div className="worksTextWrapper">
                <svg className={classnames("worksTextSVG", {
                    "animateWorksText": readyToLoad
                    , "shutdownWorksText": shutdown
                    // expand && withinRange && readyToLoad
                    // "animateWorksText": true
                    , "worksTextWillChange": !this.state.worksTextWillChange
                    , "hideGlow": hideGlow
                })} x="0px" y="0px" viewBox="0 0 506 120" style={{ "enableBackground": "new 0 0 506 120" }} xmlSpace="preserve"
                    onTransitionEnd={function () {
                        // if (index === 0) this.finishedMyWorksTextAnim();
                        this.setState({ worksTextWillChange: true });
                        // console.log("work text transition end");

                        if (hideGlow) this.setState({ hideGlow: false });
                    }.bind(this)}
                >
                    <g>
                        <path className="worksTextPath" d="M129.07,10.02L101.82,110h-18.9L69.01,55.43L54.87,110h-18.9L10.19,10.02h29.15l15.16,60.64l15.16-60.64h17.07
            l14.94,60.86l15.97-60.86H129.07z"/>
                        <path className="worksTextPath" d="M177.55,8.27c29.1,0,43.65,17.24,43.65,51.71c0,34.47-14.82,51.71-44.46,51.71
            c-29.64,0-44.46-17.63-44.46-52.88C132.29,25.11,147.38,8.27,177.55,8.27z M176.75,16.25c-5.47,0-9.17,3.02-11.1,9.05
            c-1.93,6.03-2.89,17.59-2.89,34.68c0,17.09,0.96,28.65,2.89,34.68c1.93,6.03,5.63,9.05,11.1,9.05c5.47,0,9.17-3.01,11.1-9.05
            c1.93-6.03,2.89-17.59,2.89-34.68c0-17.04-0.96-28.59-2.89-34.64C185.91,19.28,182.21,16.25,176.75,16.25z"/>
                        <path className="worksTextPath" d="M234.02,110V10.02h42.99c11.18,0,20.12,2.36,26.81,7.07c6.69,4.71,10.03,11.02,10.03,18.93
            c0,12.11-7.18,20-21.53,23.66c7.37,2.74,12.15,5.74,14.32,9.01c2.17,3.27,3.65,9.62,4.43,19.04c0.93,11.23,2.81,18.65,5.64,22.27
            h-31.49c-2-4.64-3-10.42-3-17.36l-0.15-5.93l-0.15-7.47c0-11.52-4.64-17.29-13.92-17.29h-4.98V110H234.02z M263.03,53.68h5.86
            c10.99,0,16.48-5.74,16.48-17.21c0-11.47-5.49-17.21-16.48-17.21h-5.86V53.68z"/>
                        <path className="worksTextPath" d="M405.78,10.02L380.8,41.59L417.64,110h-32.3L361.9,66.2l-4.17,4.69V110h-29V10.02h29v44.53l34.42-44.53H405.78
            z"/>
                        <path className="worksTextPath" d="M490.44,38l-13.48,2.49c0.59-2.68,0.88-4.93,0.88-6.74c0-11.62-7.06-17.43-21.17-17.43
            c-11.13,0-16.7,4-16.7,12.01c0,6.01,6.23,11.16,18.68,15.45c24.02,8.25,36.04,20.46,36.04,36.62c0,9.47-3.37,17.08-10.11,22.81
            c-6.74,5.74-15.7,8.61-26.88,8.61c-24.76,0-37.13-9.59-37.13-28.78c0-1.56,0.12-3.49,0.37-5.79l13.99-3.08
            c-1.07,4.25-1.61,7.94-1.61,11.06c0,12.4,7.1,18.6,21.31,18.6c11.38,0,17.07-4.47,17.07-13.4c0-6.64-6.81-12.48-20.43-17.5
            c-19.68-7.23-29.52-18.77-29.52-34.64c0-8.98,3.28-16.22,9.85-21.72c6.57-5.49,15.2-8.24,25.89-8.24
            C479.46,8.34,490.44,18.23,490.44,38z"/>
                    </g>
                </svg>
            </div>
        )
    }
}

export default WorksText;