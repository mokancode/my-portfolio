import React, { Component } from 'react';
import './FormSubmittedDiv.scss';
import anime from 'animejs';
import classnames from 'classnames';

class FormSubmittedDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var path = anime.path("#letterTPath");

        var animeObjUpper = anime({
            targets: ".T1Flare",
            translateX: path('x'),
            translateY: path('y'),
            // rotate: path('angle'),
            easing: 'easeInOutBounce',
            duration: 20000,
            // direction: "reverse",
            loop: true,
            autoplay: true
        });

        var path = anime.path(".letterY .formSubmittedLetterSVG path");

        var animeObjUpper2 = anime({
            targets: ".Y1Flare",
            translateX: path('x'),
            translateY: path('y'),
            // rotate: path('angle'),
            easing: 'easeInOutBounce',
            duration: 20000,
            // delay: 100000,
            direction: "reverse",
            loop: true,
            autoplay: false
        });

        animeObjUpper2.seek(10000);
        animeObjUpper2.play();

        // animeObjUpper.seek(2000);
        // animeObjUpper.reverse();

        // setTimeout(() => {
        // this.setState({
        //     showFlare: true,
        //     animeObjUpper
        // });
        // }, 1000);
    }

    render() {

        const { showDiv } = this.props;

        return (
            <div className={classnames("formSubmittedDiv", {
                "formSubmittedDivShow": showDiv
            })}>

                <div className="waveCirclePicWrapper">
                    <div className="waveCirclePicInnerWrapper">
                        <img className="waveCirclePic" src="./images/waveCircle.png" alt="waveCircle" />
                    </div>
                </div>

                <div className="textWrapper">

                    <div className="bigLettersWrapper">
                        <div className="bigLetterWrapper letterT">
                            {/* <div className="bigLetterFlare T1Flare"></div> */}
                            <svg preserveAspectRatio={"xMinYMin"} className="formSubmittedLetterSVG" x="0px" y="0px" viewBox="0 0 211 233" style={{ "enableBackground": "new 0 0 211 233" }}>
                                <linearGradient
                                    id={`formSubmittedLetterSVGGradient`}
                                    gradientTransform="rotate(80)"
                                >
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-stop-1)" />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-stop-2)" />
                                </linearGradient>
                                <g>
                                    <path id="letterTPath" d="M201.15,50.29h-68.12v175.93H76.79V50.29H8.67V8.11h192.48V50.29z" />
                                </g>


                            </svg>
                            <svg preserveAspectRatio={"xMinYMin"} className="formSubmittedLetterSVG" x="0px" y="0px" viewBox="0 0 211 233" style={{ "enableBackground": "new 0 0 211 233" }}>
                                <linearGradient
                                    id={`formSubmittedLetterSVGGradient`}
                                    gradientTransform="rotate(80)"
                                >
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-stop-1)" />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-stop-2)" />
                                </linearGradient>
                                <g>
                                    <path d="M201.15,50.29h-68.12v175.93H76.79V50.29H8.67V8.11h192.48V50.29z" />
                                </g>
                            </svg>
                            <svg preserveAspectRatio={"xMinYMin"} className="formSubmittedLetterSVG" x="0px" y="0px" viewBox="0 0 211 233" style={{ "enableBackground": "new 0 0 211 233" }}>
                                <linearGradient
                                    id={`formSubmittedLetterSVGGradient`}
                                    gradientTransform="rotate(80)"
                                >
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-stop-1)" />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-stop-2)" />
                                </linearGradient>
                                <g>
                                    <path d="M201.15,50.29h-68.12v175.93H76.79V50.29H8.67V8.11h192.48V50.29z" />
                                </g>
                                <g className="bigLetterFlare T1Flare">
                                    <circle cx="0" cy="0" r="3" />
                                </g>
                            </svg>
                            <p>hank</p>
                        </div>

                        <div className="bigLetterWrapper letterY">
                            {/* <div className="bigLetterFlare Y1Flare"></div> */}
                            <svg preserveAspectRatio={"xMinYMin"} className="formSubmittedLetterSVG" x="0px" y="0px" viewBox="0 0 211 233" style={{ "enableBackground": "new 0 0 211 233" }}>
                                <linearGradient
                                    id={`formSubmittedLetterSVGGradient`}
                                    gradientTransform="rotate(80)"
                                >
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-stop-1)" />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-stop-2)" />
                                </linearGradient>
                                <g>
                                    <path d="M197.76,13.89l-68.41,135.35v74.71H82.04v-73.83L15.39,13.89h54.05l33.84,78.37c0.59,1.46,2.2,7.18,4.83,17.14h0.59
            c1.27-7.03,2.78-12.55,4.54-16.55l34.42-78.96H197.76z"/>
                                </g>
                            </svg>
                            <svg preserveAspectRatio={"xMinYMin"} className="formSubmittedLetterSVG" x="0px" y="0px" viewBox="0 0 211 233" style={{ "enableBackground": "new 0 0 211 233" }}>
                                <linearGradient
                                    id={`formSubmittedLetterSVGGradient`}
                                    gradientTransform="rotate(80)"
                                >
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-stop-1)" />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-stop-2)" />
                                </linearGradient>
                                <g>
                                    <path d="M197.76,13.89l-68.41,135.35v74.71H82.04v-73.83L15.39,13.89h54.05l33.84,78.37c0.59,1.46,2.2,7.18,4.83,17.14h0.59
            c1.27-7.03,2.78-12.55,4.54-16.55l34.42-78.96H197.76z"/>
                                </g>
                            </svg>
                            <svg preserveAspectRatio={"xMinYMin"} className="formSubmittedLetterSVG" x="0px" y="0px" viewBox="0 0 211 233" style={{ "enableBackground": "new 0 0 211 233" }}>
                                <linearGradient
                                    id={`formSubmittedLetterSVGGradient`}
                                    gradientTransform="rotate(80)"
                                >
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-stop-1)" />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-stop-2)" />
                                </linearGradient>
                                <g>
                                    <path d="M197.76,13.89l-68.41,135.35v74.71H82.04v-73.83L15.39,13.89h54.05l33.84,78.37c0.59,1.46,2.2,7.18,4.83,17.14h0.59
            c1.27-7.03,2.78-12.55,4.54-16.55l34.42-78.96H197.76z"/>
                                </g>
                                <g className="bigLetterFlare Y1Flare">
                                    <circle cx="0" cy="0" r="3" />
                                </g>
                            </svg>
                            <p>ou</p>
                        </div>
                    </div>

                    <div className="reachingOutTextWrapper">
                        <p className="reachingOutText">for reaching out! <span>Talk to you soon.</span></p>
                    </div>
                </div>


            </div >
        );
    }
}

export default FormSubmittedDiv;